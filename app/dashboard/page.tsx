'use client'

import Link from 'next/link'
import { useState } from 'react'
import {
  Gift as GiftIcon,
  ExternalLink,
  Plus,
  Eye,
  Pencil,
  Trash2,
  Sparkles,
} from 'lucide-react'
import { MOCK_USERS } from '@/lib/mock-data'
import { cn, formatCurrency, daysUntil } from '@/lib/utils'
import { CopyableLink } from '@/components/share-button'

/**
 * Owner dashboard mock. Reads the "pieter" user as if they were signed in.
 * All add/edit/delete actions are inert — purely for the demo.
 */
export default function DashboardPage() {
  const user = MOCK_USERS.pieter
  const [gifts, setGifts] = useState(user.gifts)
  const days = daysUntil(user.birthday)
  const url = `onlygifts.app/@${user.username}`

  return (
    <main className="min-h-screen pb-24">
      {/* Top nav */}
      <nav className="sticky top-0 z-30 backdrop-blur-md bg-cream/85 border-b border-line/60">
        <div className="max-w-3xl mx-auto px-5 sm:px-7 h-14 flex items-center justify-between">
          <Link href="/" className="inline-flex items-center gap-1.5 text-sm font-bold text-ink">
            <GiftIcon className="w-4 h-4 text-rose" />
            Only Gifts
          </Link>
          <Link
            href={`/${user.username}`}
            className="inline-flex items-center gap-1.5 rounded-full bg-white border border-line text-ink px-3.5 py-2 text-xs font-semibold hover:border-ink transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            Preview public
          </Link>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-5 sm:px-7 pt-8 sm:pt-12">
        {/* Header */}
        <header className="mb-8">
          <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-rose mb-2">
            Your dashboard
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-ink mb-1">
            Hi {user.displayName.split(' ')[0]}.
          </h1>
          <p className="text-base text-muted">
            <span className="text-rose font-semibold tabular-nums">{days} days</span>{' '}
            until your birthday. Time to add some stuff.
          </p>
        </header>

        {/* Share strip */}
        <section className="mb-8">
          <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-ink mb-2">
            Your link
          </div>
          <CopyableLink url={url} />
          <p className="text-xs text-muted mt-2">
            Paste this in your Instagram bio. That&apos;s the whole pitch.
          </p>
        </section>

        {/* Stats */}
        <section className="grid grid-cols-3 gap-3 mb-8">
          <StatTile label="Items" value={gifts.length} />
          <StatTile
            label="Claimed"
            value={gifts.filter((g) => g.claimed).length}
            accent="mint"
          />
          <StatTile
            label="In group fund"
            value={`$${gifts
              .filter((g) => g.type === 'pool')
              .reduce((sum, g) => sum + (g.pool?.raised ?? 0), 0)}`}
            accent="rose"
          />
        </section>

        {/* Gifts list */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-ink">
              Your list
            </div>
            <button
              onClick={() => alert('Demo: this would open the add-gift modal.')}
              className="inline-flex items-center gap-1.5 rounded-full bg-ink text-cream px-3.5 py-2 text-xs font-semibold hover:bg-rose hover:shadow-rose transition-all"
            >
              <Plus className="w-3.5 h-3.5" />
              Add gift
            </button>
          </div>

          <ul className="space-y-3">
            {gifts.map((gift) => (
              <li
                key={gift.id}
                className="flex items-center gap-4 rounded-2xl border border-line bg-white p-4 shadow-card hover:shadow-lift transition-shadow"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={gift.imageUrl}
                  alt=""
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline justify-between gap-3 mb-0.5">
                    <h3 className="font-semibold text-ink text-sm sm:text-base truncate">
                      {gift.title}
                    </h3>
                    {gift.price > 0 && (
                      <span className="text-xs sm:text-sm font-bold text-ink tabular-nums whitespace-nowrap">
                        {formatCurrency(gift.price)}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <TypePill type={gift.type} />
                    {gift.claimed && (
                      <span className="inline-flex items-center text-[11px] font-semibold text-mint">
                        Claimed by {gift.claimed.byName}
                      </span>
                    )}
                    {gift.pool && (
                      <span className="inline-flex items-center text-[11px] font-semibold text-rose">
                        {formatCurrency(gift.pool.raised)} / {formatCurrency(gift.price)}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-1 flex-shrink-0">
                  {gift.buyUrl && (
                    <a
                      href={gift.buyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="View product"
                      className="w-9 h-9 rounded-full text-muted hover:text-ink hover:bg-line/40 flex items-center justify-center transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                  <button
                    aria-label="Edit"
                    className="w-9 h-9 rounded-full text-muted hover:text-ink hover:bg-line/40 flex items-center justify-center transition-colors"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    aria-label="Delete"
                    onClick={() => setGifts((g) => g.filter((x) => x.id !== gift.id))}
                    className="w-9 h-9 rounded-full text-muted hover:text-rose hover:bg-rose-tint flex items-center justify-center transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </li>
            ))}
          </ul>

          {gifts.length === 0 && (
            <div className="rounded-2xl border-2 border-dashed border-line bg-white/40 p-10 text-center">
              <Sparkles className="w-6 h-6 text-rose mx-auto mb-3" />
              <p className="text-sm text-muted">Your list is empty. Add something you actually want.</p>
            </div>
          )}
        </section>
      </div>
    </main>
  )
}

function StatTile({
  label,
  value,
  accent,
}: {
  label: string
  value: string | number
  accent?: 'rose' | 'mint'
}) {
  return (
    <div className="rounded-2xl border border-line bg-white p-4 shadow-card">
      <div className="text-[10px] font-bold uppercase tracking-[0.15em] text-muted mb-1.5">
        {label}
      </div>
      <div
        className={cn(
          'text-2xl font-bold tabular-nums leading-none',
          accent === 'rose' && 'text-rose',
          accent === 'mint' && 'text-mint',
          !accent && 'text-ink',
        )}
      >
        {value}
      </div>
    </div>
  )
}

function TypePill({ type }: { type: 'item' | 'pool' | 'cash' }) {
  const map = {
    item: 'bg-line/60 text-ink',
    pool: 'bg-rose-tint text-rose',
    cash: 'bg-mint-tint text-mint',
  }
  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider',
        map[type],
      )}
    >
      {type === 'item' ? 'Gift' : type === 'pool' ? 'Pool' : 'Cash'}
    </span>
  )
}
