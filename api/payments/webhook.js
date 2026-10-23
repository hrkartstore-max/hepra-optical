const crypto = require('node:crypto');
const { getDatabase } = require('../_db');

function fail(res, status, error) { return res.status(status).json({ ok: false, error }); }

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') { res.setHeader('Allow', 'POST'); return fail(res, 405, 'Method not allowed'); }
  res.setHeader('Cache-Control', 'no-store');
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET || '';
  if (!secret) return fail(res, 503, 'Payment webhook is not configured.');
  const signature = String(req.headers['x-razorpay-signature'] || '');
  const raw = req.rawBody || req.bodyRaw || (Buffer.isBuffer(req.body) ? req.body : null);
  if (!raw || !signature) return fail(res, 400, 'Raw webhook body or signature is missing.');
  const expected = crypto.createHmac('sha256', secret).update(raw).digest();
  let provided;
  try { provided = Buffer.from(signature, 'hex'); } catch (_) { provided = Buffer.alloc(0); }
  if (provided.length !== expected.length || !crypto.timingSafeEqual(provided, expected)) return fail(res, 400, 'Invalid webhook signature.');
  let event;
  try { event = JSON.parse(raw.toString('utf8')); } catch (_) { return fail(res, 400, 'Invalid webhook JSON.'); }
  const payment = event.payload?.payment?.entity;
  const gatewayOrderId = payment?.order_id;
  if (!gatewayOrderId) return res.status(200).json({ ok: true, ignored: true });
  try {
    const db = await getDatabase();
    const orders = db.collection('orders');
    if (event.event === 'payment.captured' || event.event === 'order.paid') {
      await orders.updateOne({ 'razorpay.orderId': gatewayOrderId, paymentStatus: { $ne: 'paid' } }, { $set: { paymentStatus: 'paid', status: 'confirmed', 'razorpay.paymentId': payment.id, 'razorpay.webhookEventId': event.id || null, 'razorpay.webhookVerifiedAt': new Date(), updatedAt: new Date() } });
    } else if (event.event === 'payment.failed') {
      await orders.updateOne({ 'razorpay.orderId': gatewayOrderId, paymentStatus: { $ne: 'paid' } }, { $set: { paymentStatus: 'failed', 'razorpay.lastFailedPaymentId': payment.id, updatedAt: new Date() } });
    }
    return res.status(200).json({ ok: true, received: true });
  } catch (error) {
    console.error('Payment webhook processing failed:', error.message);
    return fail(res, 503, 'Webhook processing failed. Provider should retry.');
  }
};
