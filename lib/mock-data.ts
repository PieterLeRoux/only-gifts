/**
 * Mock data for the demo. No backend yet — these are hand-seeded users
 * so the UI can be shown to friends end-to-end.
 *
 * To make this YOURS: replace the `pieter` user below with your actual
 * birthday + gifts. The route /[username] reads from MOCK_USERS[slug].
 */

export type GiftType = 'item' | 'pool' | 'cash'

export type Gift = {
  id: string
  type: GiftType
  title: string
  description?: string
  /** USD; for `pool` gifts this is the target. For `cash` it's the suggested amount. */
  price: number
  imageUrl: string
  /** External link to buy the item — Amazon, Target, etc. Empty for `cash`. */
  buyUrl?: string
  /** Status — only relevant for `item` and `pool`. */
  claimed?: { byName: string; date: string }
  pool?: { raised: number; contributors: number }
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
    bio: 'Austin, TX · Turning 34 · AI systems architect',
    avatarUrl: '/pieter-avatar.png',
    venmoHandle: 'pieter-leroux',
    cashAppHandle: 'pieterleroux',
    paypalHandle: 'pieterleroux',
    note:
      'Turning 34 on August 9. I never know what to ask for, so I made a list. Anything off this means more than you know — and if you just send me a happy birthday text, that counts too.',
    gifts: [
      {
        id: 'g1',
        type: 'pool',
        title: 'PlayStation 5 Pro — 2TB',
        description:
          'The big one. 2TB internal, full Pro spec. Group-fund it and I\'ll name a save-file after each of you.',
        price: 899,
        imageUrl:
          'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=900&q=80',
        buyUrl:
          'https://www.amazon.com/PlayStation-5-Pro-Console-2TB/dp/B0FTMY4YZ2',
        pool: { raised: 120, contributors: 2 },
      },
      {
        id: 'g2',
        type: 'item',
        title: 'Glenmorangie 18 — The Infinita',
        description:
          '18-year Highland single malt. 750ml. The good stuff for the cigar bar nights.',
        price: 120,
        imageUrl:
          'https://images.unsplash.com/photo-1582819509237-d6cf2af52d97?auto=format&fit=crop&w=900&q=80',
        buyUrl:
          'https://www.totalwine.com/scotch/glenmorangie-18yr-the-infinita-750ml/p/2126252308-1',
      },
      {
        id: 'g3',
        type: 'pool',
        title: 'Vietnam trip — June 16–23',
        description:
          'Going to Vietnam in June with the boys. Anything you chip in covers a dinner, a dive, a temple, a phở with my name on it. $2k target across the whole trip.',
        price: 2000,
        imageUrl:
          'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=900&q=80',
        pool: { raised: 320, contributors: 4 },
      },
      {
        id: 'g4',
        type: 'cash',
        title: 'Just send me cash',
        description:
          'No item, no group, no judgment. Venmo, Cash App, or PayPal — pick your weapon.',
        price: 50,
        imageUrl:
          'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=900&q=80',
      },
    ],
  },

  sarah_k_: {
    username: 'sarah_k_',
    displayName: 'Sarah K.',
    birthday: '2026-06-04',
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
        buyUrl: 'https://www.stanley1913.com/products/classic-easy-carry-lunchbox',
      },
      {
        id: 's2',
        type: 'pool',
        title: 'AirPods Max (Midnight)',
        description: 'For the train. For the gym. For drowning out the open-plan office.',
        price: 549,
        imageUrl:
          'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f37?auto=format&fit=crop&w=900&q=80',
        buyUrl: 'https://www.apple.com/shop/buy-airpods/airpods-max',
        pool: { raised: 320, contributors: 7 },
      },
      {
        id: 's3',
        type: 'cash',
        title: 'For the cake',
        description: 'I want a really nice cake from Lady M. $25 covers a slice for two.',
        price: 25,
        imageUrl:
          'https://images.unsplash.com/photo-1535254973040-607b474cb50d?auto=format&fit=crop&w=900&q=80',
      },
    ],
  },
}
