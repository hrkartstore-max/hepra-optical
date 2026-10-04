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

---

© 2026 HEPRA Optical. Built as a premium D2C optical experience.
