'use client'

import { useState } from 'react'
import { Users, ChevronDown } from 'lucide-react'
import { cn, formatCurrency } from '@/lib/utils'
import type { Contribution } from '@/lib/mock-data'

/**
 * A small expandable disclosure that shows who's contributed to a gift,
 * and how much each. Works on mobile (tap) and desktop (tap or hover via
 * the trigger button). Falls back to an empty state when there are no
 * contributions yet.
 */
export function ContributorsPopover({
  contributions,
  label = 'chipped in',
}: {
  contributions: Contribution[]
  label?: string
}) {
  const [open, setOpen] = useState(false)
  const count = contributions.length

  if (count === 0) {
    return (
      <div className="text-xs text-muted italic">
        Be the first to {label}.
      </div>
    )
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={cn(
          'inline-flex items-center gap-1.5 text-xs font-semibold transition-colors rounded-full px-2.5 py-1 -ml-2.5',
          'text-muted hover:text-rose hover:bg-rose-tint/40',
          open && 'text-rose bg-rose-tint/40',
        )}
        aria-expanded={open}
      >
        <Users className="w-3 h-3" />
        <span>
          {count} {count === 1 ? 'person' : 'people'} {label}
        </span>
        <ChevronDown
          className={cn(
            'w-3 h-3 transition-transform',
            open && 'rotate-180',
          )}
        />
      </button>

      {open && (
        <div
          className="mt-2 rounded-xl border border-rose/20 bg-rose-tint/30 p-3 animate-fade-up"
          role="list"
        >
          <ul className="space-y-1.5">
            {contributions.map((c, i) => (
              <li
                key={i}
                className="flex items-center justify-between text-sm"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <Initials name={c.name} />
                  <span className="font-medium text-ink truncate">
                    {c.name}
                  </span>
                </div>
                <span className="font-bold text-rose tabular-nums whitespace-nowrap">
                  {formatCurrency(c.amount)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

function Initials({ name }: { name: string }) {
  const letters = name
    .split(/\s+/)
    .map((p) => p[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase()
  // Pick a stable color based on name length so each contributor has a
  // consistent initials chip across renders.
  const palette = ['#E1306C', '#833AB4', '#FCAF45', '#FD1D1D']
  const color = palette[name.length % palette.length]
  return (
    <span
      className="inline-flex items-center justify-center w-6 h-6 rounded-full text-[10px] font-bold text-white flex-shrink-0"
      style={{ background: color }}
    >
      {letters}
    </span>
  )
}
