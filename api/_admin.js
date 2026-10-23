const crypto = require('node:crypto');

function safeEqual(a, b) {
  const left = Buffer.from(String(a || ''));
  const right = Buffer.from(String(b || ''));
  return left.length === right.length && crypto.timingSafeEqual(left, right);
}

function requireAdmin(req, res) {
  const expected = process.env.ADMIN_API_KEY;
  if (!expected || expected.length < 32) {
    res.status(503).json({ ok: false, error: 'Admin API is not configured. Set a strong ADMIN_API_KEY in Vercel.' });
    return false;
  }
  const supplied = String(req.headers['x-admin-key'] || '');
  if (!safeEqual(supplied, expected)) {
    res.status(401).json({ ok: false, error: 'Admin authentication failed.' });
    return false;
  }
  return true;
}

module.exports = { requireAdmin };
