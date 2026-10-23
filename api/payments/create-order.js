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
  const reference = typeof req.body?.reference === 'string' ? req.body.reference.trim() : '';
  if (!/^HP-[A-F0-9]{12}$/.test(reference)) return fail(res, 400, 'Valid order reference is required.');
  try {
    const db = await getDatabase();
    const orders = db.collection('orders');
    const order = await orders.findOne({ reference });
    if (!order) return fail(res, 404, 'Order not found.');
    if (order.paymentMethod === 'cod') return fail(res, 400, 'Cash on delivery orders do not need online payment.');
    if (order.paymentStatus === 'paid') return fail(res, 409, 'This order is already paid.');
    if (order.razorpay?.orderId) {
      return res.status(200).json({ ok: true, keyId: process.env.RAZORPAY_KEY_ID, paymentOrder: { id: order.razorpay.orderId, amount: order.total * 100, currency: 'INR' }, customer: { name: order.customer.fullName, email: order.customer.email, contact: order.customer.mobile }, reference });
    }
    const credentials = requireRazorpay();
    if (!credentials) return fail(res, 503, 'Online payments are not configured. Please choose Cash on Delivery or try again later.');
    const response = await fetch('https://api.razorpay.com/v1/orders', {
      method: 'POST',
      headers: { Authorization: 'Basic ' + Buffer.from(credentials.keyId + ':' + credentials.keySecret).toString('base64'), 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: order.total * 100, currency: 'INR', receipt: reference, notes: { orderReference: reference } })
    });
    const gatewayOrder = await response.json().catch(() => ({}));
    if (!response.ok || !gatewayOrder.id) {
      console.error('Razorpay order creation failed:', gatewayOrder.error?.code || response.status);
      return fail(res, 502, 'Payment provider could not create a payment order. Your order is saved but remains unpaid.');
    }
    await orders.updateOne({ reference, paymentStatus: { $ne: 'paid' } }, { $set: { razorpay: { orderId: gatewayOrder.id, createdAt: new Date() }, updatedAt: new Date() } });
    return res.status(201).json({ ok: true, keyId: credentials.keyId, paymentOrder: { id: gatewayOrder.id, amount: gatewayOrder.amount, currency: gatewayOrder.currency }, customer: { name: order.customer.fullName, email: order.customer.email, contact: order.customer.mobile }, reference });
  } catch (error) {
    console.error('Payment order creation failed:', error.message);
    return fail(res, error.statusCode || 503, error.statusCode === 503 ? error.message : 'Payment service is temporarily unavailable.');
  }
};
