module.exports = async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }
  const configured = Boolean(process.env.MONGODB_URI);
  return res.status(configured ? 200 : 503).json({
    ok: configured,
    service: 'hepra-optical-api',
    databaseConfigured: configured,
    message: configured ? 'API configuration is present.' : 'Set MONGODB_URI and MONGODB_DB in Vercel Environment Variables.'
  });
};
