'use client'

import { useEffect, useState } from 'react'
import { X, ExternalLink, DollarSign } from 'lucide-react'
import { cn, formatCurrency } from '@/lib/utils'
import type { Gift, User } from '@/lib/mock-data'

/**
 * Mobile-first bottom sheet (slides up on phones, centers on desktop).
 * All actions are mocked — confirmation just closes the sheet with a flash.
 */
export function ActionSheet({
  gift,
  owner,
  onClose,
}: {
  gift: Gift
  owner: User
  onClose: () => void
}) {
  const [amount, setAmount] = useState(
    gift.type === 'pool'
      ? Math.min(50, gift.price - (gift.pool?.raised ?? 0))
      : gift.price,
  )
  const [name, setName] = useState('')
  const [step, setStep] = useState<'form' | 'confirm'>('form')

  // Lock scroll while open
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStep('confirm')
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop */}
      <button
        onClick={onClose}
        aria-label="Close"
        className="absolute inset-0 bg-ink/50 backdrop-blur-[2px] animate-fade-up"
      />

      {/* Sheet */}
      <div
        className={cn(
          'relative w-full sm:max-w-md bg-cream rounded-t-3xl sm:rounded-3xl shadow-lift',
          'animate-fade-up',
          'sm:m-4',
        )}
        style={{ paddingBottom: 'calc(1.5rem + var(--safe-bottom))' }}
      >
        {/* Drag handle (mobile) */}
        <div className="flex justify-center pt-3 pb-1 sm:hidden">
          <div className="w-10 h-1 rounded-full bg-line" />
        </div>

        {/* Close button (desktop) */}
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center text-muted hover:text-ink hover:bg-line/40 transition-colors hidden sm:flex"
        >
          <X className="w-4 h-4" />
        </button>

        {step === 'form' ? (
          <form onSubmit={handleSubmit} className="px-6 py-5 sm:px-7 sm:py-7">
            <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-rose mb-2">
              {gift.type === 'item' && "Claim this gift"}
              {gift.type === 'pool' && 'Chip in'}
              {gift.type === 'cash' && 'Send cash'}
            </div>
            <h2 className="text-xl font-bold text-ink mb-1 leading-tight">
              {gift.title}
            </h2>
            <p className="text-sm text-muted mb-6">
              for {owner.displayName}&apos;s birthday
            </p>

            {/* Amount field for pool and cash */}
            {(gift.type === 'pool' || gift.type === 'cash') && (
              <div className="mb-5">
                <label
                  htmlFor="amount"
                  className="block text-xs font-semibold text-ink mb-2 uppercase tracking-wider"
                >
                  Amount
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                  <input
                    id="amount"
                    type="number"
                    min={1}
                    inputMode="numeric"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    className="w-full rounded-xl border border-line bg-white pl-10 pr-4 py-3.5 text-lg font-semibold text-ink tabular-nums focus:outline-none focus:ring-2 focus:ring-rose/30 focus:border-rose"
                  />
                </div>
                {gift.type === 'pool' && gift.pool && (
                  <div className="flex gap-2 mt-3">
                    {[25, 50, 100].map((v) => (
                      <button
                        key={v}
                        type="button"
                        onClick={() => setAmount(v)}
                        className={cn(
                          'flex-1 py-2 rounded-lg text-sm font-semibold transition-colors',
                          amount === v
                            ? 'bg-ink text-cream'
                            : 'bg-white border border-line text-ink hover:border-ink',
                        )}
                      >
                        {formatCurrency(v)}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Name */}
            <div className="mb-5">
              <label
                htmlFor="name"
                className="block text-xs font-semibold text-ink mb-2 uppercase tracking-wider"
              >
                Your name
              </label>
              <input
                id="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="So they know who it's from"
                className="w-full rounded-xl border border-line bg-white px-4 py-3.5 text-base text-ink placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-rose/30 focus:border-rose"
              />
            </div>

            {/* Payment method picker */}
            <div className="mb-6">
              <div className="text-xs font-semibold text-ink mb-2 uppercase tracking-wider">
                Send via
              </div>
              <div className="grid grid-cols-3 gap-2">
                <PaymentChip label="Venmo" handle={owner.venmoHandle} />
                <PaymentChip label="Cash App" handle={owner.cashAppHandle} />
                <PaymentChip label="PayPal" handle={owner.paypalHandle} />
              </div>
            </div>

            <button
              type="submit"
              disabled={!name}
              className={cn(
                'w-full inline-flex items-center justify-center gap-2 rounded-xl py-4 text-base font-semibold transition-all',
                name
                  ? 'bg-ink text-cream hover:bg-rose hover:shadow-rose active:scale-[0.99]'
                  : 'bg-line/60 text-muted cursor-not-allowed',
              )}
            >
              {gift.type === 'item' ? 'Confirm — I&apos;ll get it' : `Send ${formatCurrency(amount)}`}
              {gift.buyUrl && gift.type === 'item' && <ExternalLink className="w-4 h-4" />}
            </button>

            <p className="text-[11px] text-muted/80 text-center mt-3 leading-relaxed">
              Demo: nothing actually charges. In production this opens your
              Venmo/Cash App/PayPal app prefilled, or buys the item from the linked store.
            </p>
          </form>
        ) : (
          // Confirmation
          <div className="px-6 py-10 text-center sm:px-7">
            <div className="w-14 h-14 rounded-full bg-mint mx-auto flex items-center justify-center mb-4 shadow-lift">
              <Check className="w-7 h-7 text-white" strokeWidth={3} />
            </div>
            <h2 className="text-xl font-bold text-ink mb-2">
              You&apos;re a legend, {name.split(' ')[0]}.
            </h2>
            <p className="text-sm text-muted leading-relaxed mb-6 max-w-xs mx-auto">
              {gift.type === 'item' &&
                `${owner.displayName.split(' ')[0]} will see "${gift.title}" was claimed.`}
              {gift.type === 'pool' &&
                `Your ${formatCurrency(amount)} is on its way toward ${gift.title}.`}
              {gift.type === 'cash' &&
                `${formatCurrency(amount)} sent. They'll know who it's from.`}
            </p>
            <button
              onClick={onClose}
              className="w-full bg-ink text-cream rounded-xl py-3.5 text-sm font-semibold hover:bg-rose transition-colors"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

function PaymentChip({ label, handle }: { label: string; handle?: string }) {
  const disabled = !handle
  return (
    <button
      type="button"
      disabled={disabled}
      className={cn(
        'rounded-lg px-2 py-2.5 text-xs font-semibold border transition-colors',
        disabled
          ? 'bg-line/40 text-muted/50 border-line cursor-not-allowed'
          : 'bg-white text-ink border-line hover:border-ink active:bg-line/40',
      )}
    >
      {label}
    </button>
  )
}

function Check(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}
