const { getDatabase } = require('../_db');
const { requireAdmin } = require('../_admin');

const ORDER_STATUSES = new Set(['pending-confirmation', 'awaiting-payment', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled']);
const PAYMENT_STATUSES = new Set(['unpaid', 'pending', 'paid', 'failed', 'refunded']);

function fail(res, status, error) {
  return res.status(status).json({ ok: false, error });
}

module.exports = async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store, max-age=0');
  if (!['GET', 'PATCH'].includes(req.method)) {
    res.setHeader('Allow', 'GET, PATCH');
    return fail(res, 405, 'Method not allowed');
  }
  if (!requireAdmin(req, res)) return;

  try {
    const db = await getDatabase();
    const collection = db.collection('orders');

    if (req.method === 'GET') {
      const page = Math.max(1, Math.min(100000, Number.parseInt(req.query?.page, 10) || 1));
      const limit = Math.max(1, Math.min(50, Number.parseInt(req.query?.limit, 10) || 20));
      const status = typeof req.query?.status === 'string' ? req.query.status : '';
      const search = typeof req.query?.q === 'string' ? req.query.q.trim().slice(0, 100) : '';
      const filter = {};
      if (status) {
        if (!ORDER_STATUSES.has(status)) return fail(res, 400, 'Invalid order status filter.');
        filter.status = status;
      }
      if (search) {
        const escaped = search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        filter.$or = [
          { reference: { $regex: escaped, $options: 'i' } },
          { 'customer.fullName': { $regex: escaped, $options: 'i' } },
          { 'customer.email': { $regex: escaped, $options: 'i' } },
          { 'customer.mobile': { $regex: escaped, $options: 'i' } }
        ];
      }
      const [totalCount, statusCounts, orders] = await Promise.all([
        collection.countDocuments(filter),
        collection.aggregate([{ $group: { _id: '$status', count: { $sum: 1 } } }]).toArray(),
        collection.find(filter, { projection: { _id: 0 } }).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit).toArray()
      ]);
      const totals = statusCounts.reduce((acc, row) => { acc[row._id || 'unknown'] = row.count; return acc; }, {});
      return res.status(200).json({ ok: true, page, limit, totalCount, totalPages: Math.max(1, Math.ceil(totalCount / limit)), statusCounts: totals, orders });
    }

    const body = req.body && typeof req.body === 'object' ? req.body : {};
    const reference = typeof body.reference === 'string' ? body.reference.trim().slice(0, 40) : '';
    const status = typeof body.status === 'string' ? body.status : '';
    const paymentStatus = typeof body.paymentStatus === 'string' ? body.paymentStatus : '';
    if (!reference) return fail(res, 400, 'Order reference is required.');
    if (status && !ORDER_STATUSES.has(status)) return fail(res, 400, 'Invalid order status.');
    if (paymentStatus && !PAYMENT_STATUSES.has(paymentStatus)) return fail(res, 400, 'Invalid payment status.');
    if (!status && !paymentStatus) return fail(res, 400, 'Provide an order status or payment status.');

    const update = { $set: { updatedAt: new Date() } };
    if (status) update.$set.status = status;
    if (paymentStatus) update.$set.paymentStatus = paymentStatus;
    const result = await collection.updateOne({ reference }, update);
    if (!result.matchedCount) return fail(res, 404, 'Order not found.');
    return res.status(200).json({ ok: true, reference, message: 'Order updated.' });
  } catch (error) {
    console.error('Admin order API failed:', error.message);
    return fail(res, error.statusCode || 503, error.statusCode === 503 ? error.message : 'Admin order service is unavailable.');
  }
};
