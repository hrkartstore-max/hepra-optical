# OptiKart — Eyewear, Your Way

OptiKart is an original eyewear e-commerce application. It uses its own brand identity and does not use Lenskart trademarks, logos, or product photography.

## Technology

- Next.js 15 App Router, React 19 and TypeScript
- Tailwind CSS, Poppins typography and Lucide icons
- PostgreSQL on Neon with Prisma ORM
- NextAuth for Google and email sign-in (provider setup required)
- Zustand for client-side cart and wishlist state
- Zod for request and form validation
- Razorpay for UPI/cards, with Cash on Delivery as a separate payment method
- Vercel deployment

## Prerequisites

- Node.js 20.9 or newer
- npm 10+
- A Neon PostgreSQL project
- Google OAuth credentials if Google sign-in is enabled
- A verified email sending provider for OTP
- Razorpay test credentials for payment integration

## Local setup

1. Clone the repository and install dependencies:

   ```bash
   npm install
   ```

2. Create local environment variables:

   ```bash
   cp .env.example .env.local
   ```

3. In Neon, create a PostgreSQL database. Copy the pooled connection URL into `DATABASE_URL` and the direct connection URL into `DIRECT_URL`. Keep both private.

4. Generate the Prisma client and create the first migration:

   ```bash
   npm run db:generate
   npm run db:migrate
   ```

5. Load the sample catalogue:

   ```bash
   npm run db:seed
   ```

   The seed creates 40 sample products, categories, brands, lens options, a demo coupon and an inactive sample store. Product photography and prices are placeholders; verify all supplier, inventory, clinical and commercial details before taking live orders.

6. Start the development server:

   ```bash
   npm run dev
   ```

   Open http://localhost:3000.

## Environment variables

See `.env.example`. Never commit `.env.local`, database credentials, auth secrets, Razorpay secrets, private prescription uploads, or customer data.

- `DATABASE_URL`: Neon pooled runtime URL
- `DIRECT_URL`: Neon direct connection URL for migrations
- `AUTH_SECRET`: long, random secret for NextAuth
- `AUTH_GOOGLE_ID` / `AUTH_GOOGLE_SECRET`: Google OAuth credentials
- `RESEND_API_KEY` / `EMAIL_FROM`: transactional email/OTP provider
- `RAZORPAY_KEY_ID` / `RAZORPAY_KEY_SECRET`: server-side payment credentials
- `RAZORPAY_WEBHOOK_SECRET`: verify Razorpay webhooks
- `NEXT_PUBLIC_RAZORPAY_KEY_ID`: publishable key only

## Vercel deployment

1. Push the repository to GitHub and import it into Vercel.
2. Set the framework preset to Next.js and the root directory to the repository root.
3. Add the production environment variables from `.env.example` in Vercel Project Settings. Use Neon production URLs and live Razorpay credentials only after test-mode checkout, signature verification and webhook handling have passed.
4. Deploy. Run database migrations as a controlled release step using `npm run db:deploy` against the production database. Do not run `prisma migrate dev` in production.
5. Run `npm run db:seed` only when you intentionally want the sample catalogue in that database. Never seed sample data into a live store without review.
6. Verify sign-in callback URLs, email sender/domain, Razorpay webhook URL, order confirmation, cancellation, refunds, shipping/tax rules and privacy policy before launch.

## Data and launch safety

- The catalogue seed is demonstration data. Images are third-party Unsplash placeholders and may be replaced with owned/licensed product imagery.
- Sample frame and lens prices are illustrative, not supplier quotes or a promise of clinical suitability.
- Prescription data is sensitive. Restrict access to the customer and authorized staff, avoid logging prescription payloads, and use private object storage for uploads.
- Never trust client-submitted prices. Calculate prices on the server from database records.
- Mark orders paid only after server-side Razorpay signature verification and/or verified webhook processing. A browser callback alone is not proof of payment.
- Admin routes must be protected by a server-side role check. Hiding admin links is not access control.
- Obtain legal, privacy, consumer-protection and clinical review before production use.

## Database

The Prisma schema includes user/auth records, categories, brands, products and variants, lens options and selections, prescriptions, carts, orders and line items, addresses, coupons, reviews, wishlists, stores and appointments.

## Development commands

```bash
npm run dev          # local development
npm run typecheck    # TypeScript checks
npm run lint         # ESLint
npm run build        # Prisma generate + Next.js production build
npm run db:generate  # Prisma client
npm run db:migrate   # local development migration
npm run db:deploy    # deploy committed migrations
npm run db:seed      # sample catalogue
npm run db:studio    # Prisma Studio
```

## Project layout

```text
src/
  app/          Next.js App Router routes and global layout
  components/   Reusable UI and storefront components
  lib/          Prisma client, validation, pricing and shared utilities
prisma/
  schema.prisma Relational database schema
  seed.ts       40-product sample catalogue
.env.example    Environment variable template
```
