const crypto = require('node:crypto');
const { getDatabase } = require('../_db');
const { requireRazorpay } = require('./_razorpay');

function fail(res, status, error) { return res.status(status).json({ ok: false, error }); }

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') { res.setHeader('Allow', 'POST'); return fail(res, 405, 'Method not allowed'); }
  res.setHeader('Cache-Control', 'no-store');
  const origin = req.headers.origin;
  if (origin && req.headers.host) {
    try { if (new URL(origin).host !== req.headers.host) return fail(res, 403, 'Cross-origin request rejected'); }
    catch (_) { return fail(res, 403, 'Invalid request origin'); }
  }
  const { reference, razorpay_order_id: orderId, razorpay_payment_id: paymentId, razorpay_signature: signature } = req.body || {};
  if (typeof reference !== 'string' || typeof orderId !== 'string' || typeof paymentId !== 'string' || typeof signature !== 'string') return fail(res, 400, 'Payment verification details are incomplete.');
  const credentials = requireRazorpay();
  if (!credentials) return fail(res, 503, 'Payment verification is not configured.');
  try {
    const db = await getDatabase();
    const orders = db.collection('orders');
    const order = await orders.findOne({ reference });
    if (!order) return fail(res, 404, 'Order not found.');
    if (order.paymentStatus === 'paid' && order.razorpay?.paymentId === paymentId) return res.status(200).json({ ok: true, reference, paymentStatus: 'paid', status: order.status, message: 'Payment was already verified.' });
    if (order.razorpay?.orderId !== orderId) return fail(res, 400, 'Payment order does not match this order reference.');
    const expected = crypto.createHmac('sha256', credentials.keySecret).update(orderId + '|' + paymentId).digest();
    let provided;
    try { provided = Buffer.from(signature, 'hex'); } catch (_) { provided = Buffer.alloc(0); }
    if (provided.length !== expected.length || !crypto.timingSafeEqual(provided, expected)) return fail(res, 400, 'Payment signature verification failed.');
    const update = await orders.updateOne({ reference, 'razorpay.orderId': orderId, paymentStatus: { $ne: 'paid' } }, { $set: { paymentStatus: 'paid', status: 'confirmed', 'razorpay.paymentId': paymentId, 'razorpay.signatureVerifiedAt': new Date(), updatedAt: new Date() } });
    if (!update.matchedCount) {
      const latest = await orders.findOne({ reference });
      if (latest?.paymentStatus !== 'paid' || latest?.razorpay?.paymentId !== paymentId) return fail(res, 409, 'Order payment status changed. Please contact support before retrying.');
    }
    return res.status(200).json({ ok: true, reference, paymentStatus: 'paid', status: 'confirmed', message: 'Payment signature verified.' });
  } catch (error) {
    console.error('Payment verification failed:', error.message);
    return fail(res, error.statusCode || 503, error.statusCode === 503 ? error.message : 'Payment verification is temporarily unavailable.');
  }
};
