# Only Gifts

A birthday gift list that lives in your Instagram bio.

> **Status:** Demo. Frontend only, no backend, no real auth, no payments.
> Built to show friends what the experience would feel like. Pre-product.

## What it does (today, in mock)

- **Landing** (`/`) — marketing page with hero + how-it-works
- **Public registry** (`/[username]`) — the centerpiece. The page your IG bio link points to. Three gift types: claim-an-item, group-fund, send-cash. Mock action sheet on every CTA.
- **Signup** (`/signup`) — two-step mock onboarding (handle + birthday)
- **Dashboard** (`/dashboard`) — owner view with add/edit/delete (all inert)

## Demo users seeded

- `/pieter` — the primary demo
- `/demo` — a second user, so you can show two profiles side-by-side

Both live in [`lib/mock-data.ts`](./lib/mock-data.ts). Swap in real gifts and a real birthday by editing that file.

## Stack

- Next.js 15 (App Router) + React 18 + TypeScript
- Tailwind v3 + custom palette (cream / ink / rose / mint)
- Lucide icons
- No DB, no backend, no auth. All state is mock.

## Run it

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Deploy

Connect this repo to Vercel — it auto-detects Next.js. No env vars
needed for the demo. The build command is `next build`.

## Decisions (parked until after demo)

- **Name** — "Only Gifts" is a working title. Earlier competitive research
  flagged 5 platform risks (OnlyFans trademark, Stripe underwriting, Meta
  ads, App Store / Google Play, SEO) and the `.com` is taken since 2006.
  Easy to rename before launch.
- **Auth (v2)** — Magic-link via Resend is the recommended starting point.
  Real Instagram OAuth via Clerk only if/when there's real demand to justify
  the Meta-app review process.
- **Payments (v2)** — MVP starts with deep links to Venmo / Cash App / PayPal.
  Stripe Connect added only when platform fee revenue justifies the KYC burden.

## Folder map

```
.
├── app/
│   ├── layout.tsx            ← root (metadata + viewport)
│   ├── page.tsx              ← landing
│   ├── globals.css
│   ├── signup/page.tsx       ← mock onboarding flow
│   ├── dashboard/page.tsx    ← logged-in owner view
│   └── [username]/page.tsx   ← public registry (the centerpiece)
├── components/
│   ├── profile-header.tsx
│   ├── gift-card.tsx
│   ├── action-sheet.tsx      ← claim / chip-in / cash bottom sheet
│   └── share-button.tsx
├── lib/
│   ├── utils.ts
│   └── mock-data.ts          ← demo users + gifts
└── public/
```

## License

UNLICENSED. Private to Pieter Le Roux / Accenzio LLC.
