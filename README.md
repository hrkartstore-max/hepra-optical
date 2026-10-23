# HEPRA OPTICAL — Premium Eyewear E-commerce Website

**See Better. Look Better.**

A production-ready, conversion-focused optical & eyewear e-commerce experience for the Indian market.

## Brand

- **Name:** HEPRA OPTICAL  
- **Tagline:** See Better. Look Better.  
- **Market:** India | Currency: ₹ INR  
- **Primary colour:** `#400378`  
- **Typography:** Manrope  

## Features Implemented

### Core Experience
- Sticky header + rotating announcement bar
- Premium full-width hero with dual CTAs
- Horizontal category navigation (6 categories)
- Shop by Face Shape (Oval, Round, Square, Heart, Diamond, Oblong)
- Shop by Frame Shape filters
- Best-sellers product grid with full product cards
- Virtual Try-On modal (camera privacy messaging)
- Lens Collection (8 lens types with starting prices)
- Contact Lenses section with BC/DIA/Power specs
- Book Eye Test (Store + Home visit)
- Store Locator
- Promotional offers banner
- Why HEPRA trust cards
- Customer reviews
- Optical Guide (10 educational articles)
- FAQ accordion with schema markup
- Full footer with all required links

### Product Cards
- Image, name, rating, review count
- MRP, selling price, discount %
- Frame colour dots, size & dimensions (52 □ 18 – 140)
- Wishlist, Quick View, Try-On, Add to Cart
- **BUY WITH PRESCRIPTION** and **FRAME ONLY** CTAs

### Prescription Flow (3-step guided)
1. **Select Frame** — confirm chosen frame  
2. **Select Lens** — Basic, Anti-Reflection, Blue Light, Photochromic, Progressive with live price summary  
3. **Prescription** — Upload (JPG/PNG/PDF) or Enter Manually (OD/OS SPH, CYL, AXIS, ADD, PD) with tooltips  

### Cart Drawer
- Product details, lens & prescription status  
- Free-shipping progress bar (₹999 threshold)  
- Subtotal, discount, shipping, total  

### Mobile UX
- Bottom navigation: Home | Shop | Try On | Wishlist | Cart  
- Mobile menu  
- Responsive grids & touch-friendly controls  

### SEO & Performance
- Homepage title & meta description  
- Organization + FAQ JSON-LD schema  
- Semantic HTML, lazy-loaded images  
- Manrope via Google Fonts  
- Accessible focus styles & reduced-motion support  

## File Structure

```
hepra-optical/
├── index.html          # Full homepage + modals
├── css/
│   └── styles.css      # Complete design system
├── js/
│   └── app.js          # Cart, Rx flow, filters, UI logic
├── assets/             # (ready for images)
└── README.md
```

## How to Run

Open `index.html` in any modern browser, or serve locally:

```bash
cd hepra-optical
npx serve .
# or
python3 -m http.server 8080
```

## Design System

| Token        | Value     |
|-------------|-----------|
| Primary     | `#400378` |
| Secondary   | `#FFFFFF` |
| Background  | `#FAF9FC` |
| Text        | `#171717` |
| Accent      | `#E8DDF0` |
| Font        | Manrope   |

## Notes

- Product images use Unsplash placeholders (premium optical aesthetic).
- Virtual Try-On is a simulated UI (real face-tracking would integrate a WebAR / MediaPipe solution).
- Cart state persists in `localStorage`.
- All interactive flows (Rx, cart, try-on, filters, FAQ) are fully functional.

## Serverless API (Vercel)

The repository includes an initial Node.js serverless API:

- `GET /api/health` — reports whether database configuration is present.
- `POST /api/orders` — validates customer/address fields, re-prices known catalogue items on the server, and saves an unpaid order in MongoDB.
- `POST /api/payments/create-order` — creates a Razorpay payment order for a previously saved order.
- `POST /api/payments/verify` — validates the Razorpay signature and independently checks payment status, amount, currency, and order ID before marking an order paid.
- `POST /api/payments/webhook` — verifies Razorpay webhook signatures against the raw request body and updates captured/failed payment states.
- `GET /api/admin/orders` and `PATCH /api/admin/orders` — authenticated order dashboard APIs.
- Orders are stored in the `orders` collection of the database selected by `MONGODB_DB` (defaults to `hepra_optical`).
- Order creation alone never counts as payment. Online payments require Razorpay verification; COD orders remain unpaid until separately reconciled.

### Required Vercel configuration

1. Create a MongoDB Atlas database and a database user with least-privilege access to the order database.
2. In Vercel → Project → Settings → Environment Variables, add:
   - `MONGODB_URI` — MongoDB connection URI (keep this secret; never commit it).
   - `MONGODB_DB` — database name, for example `hepra_optical`.
   - `ADMIN_API_KEY` — a unique, high-entropy secret (at least 32 characters) for `/admin.html` and admin APIs.
   - `RAZORPAY_KEY_ID` — Razorpay API key ID (test key first, e.g. `rzp_test_…`).
   - `RAZORPAY_KEY_SECRET` — Razorpay API secret. Never expose this in frontend code.
   - `RAZORPAY_WEBHOOK_SECRET` — a separate secret configured on the Razorpay webhook endpoint.
3. Redeploy and verify `/api/health` returns `200` with `databaseConfigured: true`.

The checkout now creates a server-side order and opens Razorpay for non-COD methods. It only clears the cart after the server confirms a captured payment; if verification is pending or fails, the cart is retained. COD orders are saved without processing a payment. Prescription file uploads are not implemented, and prescription data is not currently stored with the order. Before production, add rate limiting, payment/order reconciliation, privacy and retention controls, monitoring, and an authenticated admin user system; the shared admin API key is a minimal private admin gate, not a full identity system.

---

© 2026 HEPRA Optical. Built as a premium D2C optical experience.


### Razorpay setup and testing

1. Add the Razorpay environment variables above in Vercel, initially using **test mode** credentials.
2. In the Razorpay dashboard, configure a webhook pointing to `https://YOUR-DOMAIN/api/payments/webhook` and subscribe to `payment.captured`, `order.paid`, and `payment.failed`. Set its secret as `RAZORPAY_WEBHOOK_SECRET` in Vercel.
3. Redeploy after changing environment variables. Test with Razorpay's test payment methods; do not use live credentials until the full order, payment, refund, and webhook lifecycle has been tested.
4. Visit `/api/health` to check database configuration and `/admin.html` for order management.

**Important:** Razorpay checkout is not a payment guarantee by itself. The server checks the signature and retrieves the payment from Razorpay before setting `paymentStatus: paid`; the webhook independently updates captured/failed payment events. Keep secrets server-side and never mark an order paid solely because the browser says payment succeeded.
