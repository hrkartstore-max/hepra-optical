function requireRazorpay() {
  const keyId = process.env.RAZORPAY_KEY_ID || '';
  const keySecret = process.env.RAZORPAY_KEY_SECRET || '';
  if (!keyId || !keySecret || !keyId.startsWith('rzp_')) return null;
  return { keyId, keySecret };
}
module.exports = { requireRazorpay };
