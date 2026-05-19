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
        title: 'Bose QuietComfort Ultra Headphones',
        description:
          'The good ones. Active noise canceling for the office and the plane. Black.',
        price: 429,
        imageUrl:
          'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=900&q=80',
        buyUrl:
          'https://www.amazon.com/Bose-Cancelling-Bluetooth-Personalized-Cancellation/dp/B0CCZ1L489',
        pool: { raised: 180, contributors: 4 },
      },
      {
        id: 'g2',
        type: 'item',
        title: 'A nice bottle of mezcal',
        description:
          'Del Maguey Vida or Mezcal Vago Elote. Both around $40. Cigar bar energy.',
        price: 42,
        imageUrl:
          'https://images.unsplash.com/photo-1569529465841-dfecdab7503b?auto=format&fit=crop&w=900&q=80',
        buyUrl: 'https://www.totalwine.com/spirits/tequila/c/000909',
      },
      {
        id: 'g3',
        type: 'item',
        title: 'Wilson Pro Staff 97 v14 tennis racket',
        description:
          'Just picked up tennis. Looking for an upgrade from the entry racket.',
        price: 269,
        imageUrl:
          'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?auto=format&fit=crop&w=900&q=80',
        buyUrl: 'https://www.tennis-warehouse.com/Wilson_Pro_Staff_97_v14/descpageRCWILSON-PS97V14.html',
        claimed: { byName: 'Erick P.', date: '2026-05-16' },
      },
      {
        id: 'g4',
        type: 'item',
        title: 'Theragun Mini',
        description: 'Post-CrossFit. Tossing it in the gym bag.',
        price: 199,
        imageUrl:
          'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=900&q=80',
        buyUrl: 'https://www.therabody.com/us/en-us/theragun-mini-gen-2.html',
      },
      {
        id: 'g5',
        type: 'cash',
        title: 'Toward the Vietnam trip',
        description:
          'Heading to Vietnam in June with the boys. Any contribution toward dinners + a Phu Quoc day with Misia-equivalent dog content. 🐕',
        price: 50,
        imageUrl:
          'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=900&q=80',
      },
      {
        id: 'g6',
        type: 'item',
        title: 'A handwritten letter',
        description:
          'Honestly. If you\'ve read this far, write me one thing you remember. Free. Worth more than the headphones.',
        price: 0,
        imageUrl:
          'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?auto=format&fit=crop&w=900&q=80',
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
