'use client'

import { useState } from 'react'
import { Check, Gift as GiftIcon, ExternalLink, Users, Heart } from 'lucide-react'
import { cn, formatCurrency } from '@/lib/utils'
import { type Gift, type User, poolRaised } from '@/lib/mock-data'
import { ActionSheet } from './action-sheet'
import { ContributorsPopover } from './contributors-popover'

export function GiftCard({ gift, owner }: { gift: Gift; owner: User }) {
  const [sheetOpen, setSheetOpen] = useState(false)
  const isClaimed = gift.type === 'item' && !!gift.claimed

  const contributions = gift.contributions ?? []
  const raised = poolRaised(gift)
  const poolPct =
    gift.type === 'pool'
      ? Math.min(100, Math.round((raised / gift.price) * 100))
      : 0

  return (
    <>
      <article
        className={cn(
          'group relative overflow-hidden rounded-2xl border border-line bg-white shadow-card transition-all duration-200',
          'hover:shadow-lift hover:-translate-y-0.5',
          isClaimed && 'opacity-80',
        )}
      >
        {/* Image */}
        <div className="relative aspect-[16/10] overflow-hidden bg-line">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={gift.imageUrl}
            alt={gift.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
            loading="lazy"
          />
          {/* Type badge */}
          <div className="absolute top-3 left-3">
            <TypeBadge type={gift.type} />
          </div>
          {isClaimed && (
            <div className="absolute inset-0 bg-ink/45 backdrop-blur-[2px] flex items-center justify-center">
              <div className="rounded-full bg-mint text-white px-3 py-1.5 text-xs font-semibold inline-flex items-center gap-1.5 shadow-lift">
                <Check className="w-3.5 h-3.5" />
                Claimed by {gift.claimed!.byName}
              </div>
            </div>
          )}
        </div>

        {/* Body */}
        <div className="p-5">
          <div className="flex items-start justify-between gap-4 mb-1.5">
            <h3 className="text-base font-semibold text-ink leading-snug tracking-tight">
              {gift.title}
            </h3>
            {gift.price > 0 && (
              <div className="font-bold text-ink tabular-nums text-base whitespace-nowrap">
                {gift.type === 'cash' ? `~${formatCurrency(gift.price)}` : formatCurrency(gift.price)}
              </div>
            )}
          </div>
          {gift.description && (
            <p className="text-sm text-muted leading-relaxed mb-4">
              {gift.description}
            </p>
          )}

          {/* Pool progress */}
          {gift.type === 'pool' && (
            <div className="mb-3">
              <div className="flex items-baseline justify-between mb-2 text-xs">
                <span className="text-muted">
                  <span className="font-semibold text-ink tabular-nums">
                    {formatCurrency(raised)}
                  </span>{' '}
                  of {formatCurrency(gift.price)}
                </span>
                <span className="font-bold text-rose tabular-nums">
                  {poolPct}%
                </span>
              </div>
              <div className="h-2 rounded-full bg-line overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{
                    width: `${poolPct}%`,
                    background:
                      'linear-gradient(90deg, #FCAF45 0%, #FD1D1D 35%, #E1306C 70%, #833AB4 100%)',
                  }}
                />
              </div>
            </div>
          )}

          {/* Cash: running total */}
          {gift.type === 'cash' && contributions.length > 0 && (
            <div className="mb-3">
              <div className="text-xs text-muted">
                <span className="font-semibold text-ink tabular-nums">
                  {formatCurrency(raised)}
                </span>{' '}
                sent so far
              </div>
            </div>
          )}

          {/* Contributors disclosure — shown for pool + cash */}
          {(gift.type === 'pool' || gift.type === 'cash') && (
            <div className="mb-4">
              <ContributorsPopover
                contributions={contributions}
                label={gift.type === 'cash' ? 'sent cash' : 'chipped in'}
              />
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center gap-2 mt-1">
            {!isClaimed && (
              <button
                onClick={() => setSheetOpen(true)}
                className={cn(
                  'flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl px-4 py-3 text-sm font-semibold transition-all',
                  'bg-ink text-cream hover:bg-rose hover:shadow-rose active:scale-[0.98]',
                )}
              >
                {gift.type === 'item' && (
                  <>
                    <GiftIcon className="w-4 h-4" />
                    I&apos;ll get this one
                  </>
                )}
                {gift.type === 'pool' && (
                  <>
                    <Users className="w-4 h-4" />
                    Chip in
                  </>
                )}
                {gift.type === 'cash' && (
                  <>
                    <Heart className="w-4 h-4" />
                    Send cash
                  </>
                )}
              </button>
            )}
            {isClaimed && (
              <div className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl px-4 py-3 text-sm font-medium text-muted bg-line/40">
                <Check className="w-4 h-4" />
                Already claimed
              </div>
            )}
            {gift.buyUrl && (
              <a
                href={gift.buyUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View product"
                className="inline-flex items-center justify-center w-12 h-12 rounded-xl border border-line text-muted hover:text-ink hover:border-ink transition-colors flex-shrink-0"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      </article>

      {sheetOpen && (
        <ActionSheet
          gift={gift}
          owner={owner}
          onClose={() => setSheetOpen(false)}
        />
      )}
    </>
  )
}

function TypeBadge({ type }: { type: Gift['type'] }) {
  const map = {
    item: { label: 'Gift', cls: 'bg-white/95 text-ink border-white/50' },
    pool: { label: 'Group fund', cls: 'bg-rose text-white border-rose-soft' },
    cash: { label: 'Cash', cls: 'bg-mint text-white border-mint-soft' },
  }
  const { label, cls } = map[type]
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border backdrop-blur-md',
        cls,
      )}
    >
      {label}
    </span>
  )
}
