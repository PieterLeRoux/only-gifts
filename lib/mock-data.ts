/**
 * Mock data for the demo. No backend yet — these are hand-seeded users
 * so the UI can be shown to friends end-to-end.
 *
 * To make this YOURS: replace the `pieter` user below with your actual
 * birthday + gifts. The route /[username] reads from MOCK_USERS[slug].
 */

export type GiftType = 'item' | 'pool' | 'cash'

export type Contribution = {
  name: string
  amount: number
  date?: string
}

export type Gift = {
  id: string
  type: GiftType
  title: string
  description?: string
  /** USD. For `pool` it's the target. For `cash` it's the suggested per-tip amount. */
  price: number
  imageUrl: string
  /** External link to buy the item — Amazon, Target, etc. Empty for `cash`. */
  buyUrl?: string
  /** Single-claim items only. */
  claimed?: { byName: string; date: string }
  /**
   * Named contributors who've chipped in. Used by:
   * - `pool` gifts (to show progress + who contributed)
   * - `cash` gifts (to show a running total + who sent cash)
   * The card UI reveals this list on tap/hover.
   */
  contributions?: Contribution[]
}

/** Derived helper. Sums contributions to compute the raised total. */
export function poolRaised(gift: Gift): number {
  return (gift.contributions ?? []).reduce((s, c) => s + c.amount, 0)
}

export type User = {
  /**
   * Always equal to the user's Instagram handle. This is the URL slug AND
   * the IG handle — there is no separate "choose a username" step. When a
   * user signs up with Instagram, we read their handle and use it directly.
   */
  username: string
  displayName: string
  /** YYYY-MM-DD format. */
  birthday: string
  /** Age the user will be on this upcoming birthday (e.g. "Turning 34"). */
  turningAge?: number
  bio: string
  avatarUrl?: string
  venmoHandle?: string
  cashAppHandle?: string
  paypalHandle?: string
  /** Personal note that shows on the public registry page above the gift list. */
  note?: string
  gifts: Gift[]
}

// ---------------------------------------------------------------------------
// Today is 2026-05-19. Pieter's demo birthday is 2026-07-18 → 60 days out.
// Swap the date when you have a real one.
// ---------------------------------------------------------------------------

export const MOCK_USERS: Record<string, User> = {
  lerouxp_: {
    username: 'lerouxp_',
    displayName: 'Pieter Le Roux',
    birthday: '2026-08-09',
    turningAge: 34,
    bio: 'Austin, TX · Turning 34 · AI systems architect',
    avatarUrl: '/pieter-avatar.png',
    venmoHandle: 'pieter-leroux',
    cashAppHandle: 'pieterleroux',
    paypalHandle: 'pieterleroux',
    note:
      "I really appreciate my best friends taking the time to look at what I'd actually love. Anything off this list means more than you know — and if it's just a happy birthday text, that counts too.",
    gifts: [
      {
        id: 'g1',
        type: 'pool',
        title: 'PlayStation 5 Pro — 2TB',
        description:
          "The big one. 2TB internal, full Pro spec. Group-fund it and I'll name a save-file after each of you.",
        price: 899,
        imageUrl:
          'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=900&q=80',
        buyUrl:
          'https://www.amazon.com/PlayStation-5-Pro-Console-2TB/dp/B0FTMY4YZ2',
        contributions: [
          { name: 'Erick P.', amount: 100, date: '2026-05-17' },
          { name: 'Kyle A.', amount: 50, date: '2026-05-18' },
        ],
      },
      {
        id: 'g2',
        type: 'item',
        title: 'Glenmorangie 18 — The Infinita',
        description:
          '18-year Highland single malt. 750ml. The good stuff for the cigar bar nights.',
        price: 120,
        imageUrl:
          'https://images.unsplash.com/photo-1527281400683-1aae777175f8?auto=format&fit=crop&w=900&q=80',
        buyUrl:
          'https://www.totalwine.com/scotch/glenmorangie-18yr-the-infinita-750ml/p/2126252308-1',
        claimed: { byName: 'Erick P.', date: '2026-05-18' },
      },
      {
        id: 'g3',
        type: 'pool',
        title: 'Vietnam trip — June 16–23',
        description:
          'Going to Vietnam with the boys in June. Anything you chip in covers a dinner, a dive, a temple, a phở with my name on it. $2k target across the whole trip.',
        price: 2000,
        imageUrl:
          'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=900&q=80',
        contributions: [
          { name: 'Polina P.', amount: 100, date: '2026-05-14' },
          { name: 'Byron J.', amount: 100, date: '2026-05-15' },
          { name: 'Angelique A.', amount: 75, date: '2026-05-16' },
          { name: 'Jarred R.', amount: 50, date: '2026-05-17' },
        ],
      },
      {
        id: 'g4',
        type: 'item',
        title: 'Wilson Pro Staff 97 v14',
        description:
          'Just picked up tennis. Ready to size up from the entry racket. 315g, 16x19 string pattern.',
        price: 269,
        imageUrl:
          'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?auto=format&fit=crop&w=900&q=80',
        buyUrl:
          'https://www.tennis-warehouse.com/Wilson_Pro_Staff_97_v14/descpageRCWILSON-PS97V14.html',
      },
      {
        id: 'g5',
        type: 'item',
        title: 'Patagonia Black Hole 40L Duffel',
        description:
          'For the Vietnam trip. Bombproof, packable, looks nice enough to carry into a hotel lobby.',
        price: 179,
        imageUrl:
          'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=80',
        buyUrl:
          'https://www.patagonia.com/product/black-hole-duffel-bag-40l/49342.html',
      },
      {
        id: 'g6',
        type: 'cash',
        title: 'Just send me cash',
        description:
          "No item, no group, no judgment. Venmo, Cash App, or PayPal — whatever's easiest.",
        price: 50,
        imageUrl:
          'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=900&q=80',
        contributions: [
          { name: 'Aaron K.', amount: 50, date: '2026-05-15' },
          { name: 'Jamie L.', amount: 25, date: '2026-05-18' },
        ],
      },
    ],
  },

  sarah_k_: {
    username: 'sarah_k_',
    displayName: 'Sarah K.',
    birthday: '2026-06-04',
    turningAge: 35,
    bio: 'Brooklyn · Editor · Mid-thirties and finally making a list',
    venmoHandle: 'sarah-k',
    cashAppHandle: 'sarahk',
    note:
      'I always say "just surprise me" and then everyone gets me candles. So. Here we are.',
    gifts: [
      {
        id: 's1',
        type: 'item',
        title: 'Stanley 1913 Classic Lunchbox',
        description: 'The real one. Not the cute Stanley. The actual workhorse.',
        price: 64,
        imageUrl:
          'https://images.unsplash.com/photo-1573575155376-b5bb47cc6f0b?auto=format&fit=crop&w=900&q=80',
        buyUrl:
          'https://www.stanley1913.com/products/classic-easy-carry-lunchbox',
      },
      {
        id: 's2',
        type: 'pool',
        title: 'AirPods Max (Midnight)',
        description:
          'For the train. For the gym. For drowning out the open-plan office.',
        price: 549,
        imageUrl:
          'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80',
        buyUrl: 'https://www.apple.com/shop/buy-airpods/airpods-max',
        contributions: [
          { name: 'Maya R.', amount: 80 },
          { name: 'Daniel C.', amount: 60 },
          { name: 'Priya S.', amount: 50 },
          { name: 'Tom W.', amount: 50 },
          { name: 'Mom + Dad', amount: 80 },
        ],
      },
      {
        id: 's3',
        type: 'cash',
        title: 'For the cake',
        description:
          'I want a really nice cake from Lady M. $25 covers a slice for two.',
        price: 25,
        imageUrl:
          'https://images.unsplash.com/photo-1535254973040-607b474cb50d?auto=format&fit=crop&w=900&q=80',
      },
    ],
  },
}
