const { randomUUID } = require('node:crypto');
const { getDatabase } = require('./_db');

const FRAMES = {
  1: { name: 'Aether Classic', price: 1499 },
  2: { name: 'Nova Round', price: 1799 },
  3: { name: 'Vertex Square', price: 1299 },
  4: { name: 'Skyline Aviator', price: 1999 },
  5: { name: 'Luxe Cat Eye', price: 1699 },
  6: { name: 'Urban Wayfarer', price: 1399 },
  7: { name: 'Clarity Rimless', price: 2199 },
  8: { name: 'Pulse Half Rim', price: 1599 },
  9: { name: 'Coastline Polarized', price: 1799 },
  10: { name: 'Solstice Round', price: 1599 },
  11: { name: 'Metro Shield', price: 1899 },
  12: { name: 'ScreenEase Pro', price: 1499 },
  13: { name: 'Focus Lite', price: 1299 },
  14: { name: 'Digital Comfort', price: 1699 },
  15: { name: 'Little Explorer', price: 999 },
  16: { name: 'Junior Flex', price: 1099 },
  17: { name: 'Playday Colour', price: 899 }
};
const CONTACTS = {
  101: { name: 'Daily Comfort', price: 899, pack: 30 },
  102: { name: 'Monthly Clear', price: 599, pack: 6 },
  103: { name: 'Toric Precision', price: 1299, pack: 6 },
  104: { name: 'Colour Glow', price: 499, pack: 2 }
};
const LENSES = { basic: 0, ar: 499, blue: 699, photo: 1499, progressive: 2499 };
const LENS_MATERIALS = { standard: 0, thin: 700, ultrathin: 1400, premium: 2400 };
const LENS_COATINGS = { none: 0, ar: 399, blue: 599, uv: 299 };
const PAYMENTS = new Set(['upi', 'card', 'net-banking', 'wallet', 'cod']);
const text = (value, max = 180) => typeof value === 'string' ? value.trim().slice(0, max) : '';

function fail(res, status, error) {
  return res.status(status).json({ ok: false, error });
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return fail(res, 405, 'Method not allowed');
  }

  const origin = req.headers.origin;
  const host = req.headers.host;
  if (origin && host) {
    try {
      const parsed = new URL(origin);
      if (parsed.host !== host) return fail(res, 403, 'Cross-origin request rejected');
    } catch (_) {
      return fail(res, 403, 'Invalid request origin');
    }
  }

  const body = req.body && typeof req.body === 'object' ? req.body : {};
  const customer = body.customer && typeof body.customer === 'object' ? body.customer : {};
  const address = body.address && typeof body.address === 'object' ? body.address : {};
  const fullName = text(customer.fullName, 100);
  const mobile = text(customer.mobile, 20);
  const email = text(customer.email, 180).toLowerCase();
  const line1 = text(address.line1, 180);
  const city = text(address.city, 80);
  const state = text(address.state, 80);
  const pincode = text(address.pincode, 6);
  const paymentMethod = text(body.paymentMethod, 30);
  const items = Array.isArray(body.items) ? body.items : [];

  if (fullName.length < 2 || !/^[+0-9 ()-]{10,20}$/.test(mobile) ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
      line1.length < 4 || city.length < 2 || state.length < 2 || !/^\d{6}$/.test(pincode)) {
    return fail(res, 400, 'Valid contact and delivery details are required.');
  }
  if (!PAYMENTS.has(paymentMethod)) return fail(res, 400, 'Choose a supported payment method.');
  if (!items.length || items.length > 20) return fail(res, 400, 'Cart must contain 1–20 items.');

  const normalized = [];
  for (const item of items) {
    const quantity = Number(item && item.quantity);
    if (!Number.isInteger(quantity) || quantity < 1 || quantity > 10) {
      return fail(res, 400, 'Each item quantity must be between 1 and 10.');
    }
    const rawId = String(item && item.id || '');
    const contactMatch = rawId.match(/^(10[1-4])_pack_(\d+)_(-?\d+(?:\.\d+)?)_(-?\d+(?:\.\d+)?)$/);
    if (contactMatch) {
      const product = CONTACTS[contactMatch[1]];
      const pack = Number(contactMatch[2]);
      const od = Number(contactMatch[3]);
      const os = Number(contactMatch[4]);
      const bc = item && item.bc !== undefined && item.bc !== null && item.bc !== '' ? Number(item.bc) : null;
      const dia = item && item.dia !== undefined && item.dia !== null && item.dia !== '' ? Number(item.dia) : null;
      if (![product.pack, product.pack * 3, product.pack * 6].includes(pack) ||
          !Number.isFinite(od) || !Number.isFinite(os) || od > 20 || os > 20 || od < -20 || os < -20 ||
          (bc !== null && (!Number.isFinite(bc) || bc < 8 || bc > 10)) ||
          (dia !== null && (!Number.isFinite(dia) || dia < 13 || dia > 15))) {
        return fail(res, 400, 'Invalid contact lens pack or eye power.');
      }
      const multiplier = pack === product.pack ? 1 : pack === product.pack * 3 ? 2.7 : 4.8;
      normalized.push({
        id: rawId, name: product.name + ' (' + pack + ' lenses)', quantity,
        unitPrice: Math.round(product.price * multiplier),
        prescription: { type: 'contact-lens', od, os, pack, ...(bc !== null ? { bc } : {}), ...(dia !== null ? { dia } : {}) }
      });
      continue;
    }

    const frameId = Number(rawId);
    const product = FRAMES[frameId];
    if (!product) return fail(res, 400, 'Cart contains an unknown product.');
    const lensId = text(item.lensId, 30) || 'basic';
    const materialId = text(item.lensMaterial, 30) || 'standard';
    const coatingId = text(item.lensCoating, 30) || 'none';
    if (!(lensId in LENSES)) return fail(res, 400, 'Invalid lens selection.');
    if (!(materialId in LENS_MATERIALS) || !(coatingId in LENS_COATINGS)) return fail(res, 400, 'Invalid lens material or coating.');
    const size = text(item.size, 20);
    const color = text(item.color, 20);
    normalized.push({
      id: String(frameId), name: product.name, quantity,
      unitPrice: product.price + LENSES[lensId] + LENS_MATERIALS[materialId] + LENS_COATINGS[coatingId],
      lensId, materialId, coatingId,
      ...(size ? { size } : {}),
      ...(color && /^#[0-9a-fA-F]{6}$/.test(color) ? { color } : {})
    });
  }

  const subtotal = normalized.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const shipping = subtotal >= 999 ? 0 : 99;
  const now = new Date();
  const order = {
    reference: 'HP-' + randomUUID().replace(/-/g, '').slice(0, 12).toUpperCase(),
    createdAt: now,
    updatedAt: now,
    status: paymentMethod === 'cod' ? 'pending-confirmation' : 'awaiting-payment',
    paymentStatus: 'unpaid',
    paymentMethod,
    customer: { fullName, mobile, email },
    address: { line1, city, state, pincode, country: 'IN' },
    items: normalized,
    subtotal,
    shipping,
    total: subtotal + shipping,
    currency: 'INR'
  };

  try {
    const db = await getDatabase();
    await db.collection('orders').insertOne(order);
    return res.status(201).json({
      ok: true,
      order: { reference: order.reference, status: order.status, paymentStatus: order.paymentStatus, subtotal, shipping, total: order.total, currency: order.currency },
      message: 'Order saved. Payment has not been processed.'
    });
  } catch (error) {
    console.error('Order creation failed:', error.message);
    return fail(res, error.statusCode || 503, error.statusCode === 503 ? error.message : 'Order service is temporarily unavailable.');
  }
};
