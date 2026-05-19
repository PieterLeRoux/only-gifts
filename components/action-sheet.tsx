'use client'

import { useEffect, useState } from 'react'
import { X, DollarSign, Lock, Check, ArrowRight } from 'lucide-react'
import { cn, formatCurrency } from '@/lib/utils'
import { type Gift, type User, poolRaised } from '@/lib/mock-data'

type Step = 'form' | 'checkout' | 'success'

/**
 * Mobile-first action sheet for claiming / chipping in / sending cash.
 *
 * Three steps:
 *  1. form     — name + optional note + (amount, if not an item claim)
 *  2. checkout — mocked Stripe Checkout panel (Apple Pay, Link, card)
 *  3. success  — confirmation
 *
 * Real-world: step 2 would be a Stripe Checkout Session or PaymentElement
 * mounted via @stripe/stripe-js. The mock here reproduces the visual layout
 * faithfully so we can show what the production flow will look like.
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
  const initialAmount =
    gift.type === 'item'
      ? gift.price
      : gift.type === 'pool'
        ? Math.min(50, Math.max(10, gift.price - poolRaised(gift)))
        : gift.price

  const [amount, setAmount] = useState(initialAmount)
  const [name, setName] = useState('')
  const [note, setNote] = useState('')
  const [step, setStep] = useState<Step>('form')

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  const ctaLabel = {
    item: "Claim this gift",
    pool: 'Chip in',
    cash: 'Send cash',
  }[gift.type]

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
      role="dialog"
      aria-modal="true"
    >
      <button
        onClick={onClose}
        aria-label="Close"
        className="absolute inset-0 bg-ink/50 backdrop-blur-[2px] animate-fade-up"
      />

      <div
        className="relative w-full sm:max-w-md bg-cream rounded-t-3xl sm:rounded-3xl shadow-lift animate-fade-up sm:m-4 max-h-[90vh] overflow-y-auto"
        style={{ paddingBottom: 'calc(1.5rem + var(--safe-bottom))' }}
      >
        <div className="flex justify-center pt-3 pb-1 sm:hidden">
          <div className="w-10 h-1 rounded-full bg-line" />
        </div>

        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 w-9 h-9 rounded-full hidden sm:flex items-center justify-center text-muted hover:text-ink hover:bg-line/40 transition-colors z-10"
        >
          <X className="w-4 h-4" />
        </button>

        {step === 'form' && (
          <FormStep
            gift={gift}
            owner={owner}
            ctaLabel={ctaLabel}
            amount={amount}
            setAmount={setAmount}
            name={name}
            setName={setName}
            note={note}
            setNote={setNote}
            onContinue={() => setStep('checkout')}
          />
        )}

        {step === 'checkout' && (
          <StripeCheckoutPanel
            gift={gift}
            owner={owner}
            amount={amount}
            name={name}
            onBack={() => setStep('form')}
            onPaid={() => setStep('success')}
          />
        )}

        {step === 'success' && (
          <SuccessStep
            gift={gift}
            owner={owner}
            amount={amount}
            name={name}
            onClose={onClose}
          />
        )}
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// STEP 1 — Form
// ---------------------------------------------------------------------------
function FormStep({
  gift,
  owner,
  ctaLabel,
  amount,
  setAmount,
  name,
  setName,
  note,
  setNote,
  onContinue,
}: {
  gift: Gift
  owner: User
  ctaLabel: string
  amount: number
  setAmount: (n: number) => void
  name: string
  setName: (s: string) => void
  note: string
  setNote: (s: string) => void
  onContinue: () => void
}) {
  const needsAmount = gift.type !== 'item'
  const canContinue = name.trim().length > 0 && amount > 0

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        if (canContinue) onContinue()
      }}
      className="px-6 py-5 sm:px-7 sm:py-7"
    >
      <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-rose mb-2">
        {ctaLabel}
      </div>
      <h2 className="text-xl font-bold text-ink mb-1 leading-tight">
        {gift.title}
      </h2>
      <p className="text-sm text-muted mb-6">
        for {owner.displayName}&apos;s birthday
      </p>

      {/* Amount field for pool & cash */}
      {needsAmount && (
        <div className="mb-4">
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
          {gift.type === 'pool' && (
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
      <div className="mb-4">
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

      {/* Note (optional) */}
      <div className="mb-6">
        <label
          htmlFor="note"
          className="block text-xs font-semibold text-ink mb-2 uppercase tracking-wider"
        >
          Add a note{' '}
          <span className="text-muted font-normal normal-case">— optional</span>
        </label>
        <textarea
          id="note"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          rows={3}
          maxLength={140}
          placeholder="Happy birthday Pieter, get those headphones already."
          className="w-full rounded-xl border border-line bg-white px-4 py-3 text-sm text-ink placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-rose/30 focus:border-rose resize-none"
        />
        <div className="text-[10px] text-muted text-right mt-1">
          {note.length}/140
        </div>
      </div>

      <button
        type="submit"
        disabled={!canContinue}
        className={cn(
          'w-full inline-flex items-center justify-center gap-2 rounded-xl py-4 text-base font-semibold transition-all',
          canContinue
            ? 'bg-ink text-cream hover:bg-rose hover:shadow-rose active:scale-[0.99]'
            : 'bg-line/60 text-muted cursor-not-allowed',
        )}
      >
        Continue to checkout
        <ArrowRight className="w-4 h-4" />
      </button>

      <p className="text-[11px] text-muted/80 text-center mt-3 leading-relaxed">
        Demo — Stripe Checkout will follow. No charge made.
      </p>
    </form>
  )
}

// ---------------------------------------------------------------------------
// STEP 2 — Stripe Checkout mock
// ---------------------------------------------------------------------------
function StripeCheckoutPanel({
  gift,
  owner,
  amount,
  name,
  onBack,
  onPaid,
}: {
  gift: Gift
  owner: User
  amount: number
  name: string
  onBack: () => void
  onPaid: () => void
}) {
  const [processing, setProcessing] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState<
    'card' | 'cashapp' | 'klarna' | 'afterpay'
  >('card')

  function handlePay() {
    setProcessing(true)
    setTimeout(onPaid, 1200)
  }

  return (
    <div className="px-4 py-4 sm:px-5 sm:py-5">
      {/* Back link + Test-mode chip */}
      <div className="flex items-center justify-between mb-3">
        <button
          type="button"
          onClick={onBack}
          className="text-xs font-semibold text-muted hover:text-ink transition-colors inline-flex items-center gap-1"
        >
          ← Edit details
        </button>
        <span
          className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
          style={{
            backgroundColor: '#FFF3D6',
            color: '#8C6309',
            border: '1px solid #F7D88F',
          }}
        >
          Test mode
        </span>
      </div>

      {/* Stripe-branded checkout card */}
      <div className="rounded-2xl bg-white shadow-lift overflow-hidden border border-[#E6E6EF]">
        {/* Order summary header */}
        <div
          className="p-5 border-b"
          style={{ borderColor: '#E6E6EF' }}
        >
          <div className="flex items-start gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold flex-shrink-0"
              style={{
                background:
                  'linear-gradient(135deg, #FCAF45, #E1306C, #833AB4)',
              }}
            >
              {owner.displayName
                .split(' ')
                .map((p) => p[0])
                .slice(0, 2)
                .join('')
                .toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <div
                className="text-[11px] font-semibold uppercase tracking-wider"
                style={{ color: '#697386' }}
              >
                Paying {owner.displayName.split(' ')[0]} via Only Gifts
              </div>
              <div className="text-sm text-[#1A1F36] mt-0.5 truncate">
                {gift.title}
              </div>
            </div>
          </div>
          <div className="mt-3 pt-3 border-t flex items-baseline justify-between" style={{ borderColor: '#E6E6EF' }}>
            <span
              className="text-sm font-medium"
              style={{ color: '#697386' }}
            >
              Total
            </span>
            <span
              className="text-2xl font-bold tabular-nums"
              style={{ color: '#1A1F36' }}
            >
              {formatCurrency(amount)}
              <span
                className="text-xs font-normal ml-1"
                style={{ color: '#697386' }}
              >
                USD
              </span>
            </span>
          </div>
        </div>

        <div className="p-5 space-y-4">
          {/* Express checkout */}
          <div className="space-y-2">
            <div
              className="text-[11px] font-semibold uppercase tracking-wider"
              style={{ color: '#697386' }}
            >
              Express checkout
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={handlePay}
                disabled={processing}
                className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-black text-white py-2.5 text-sm font-semibold hover:bg-black/85 transition-colors disabled:opacity-60"
              >
                <AppleIcon /> Pay
              </button>
              <button
                type="button"
                onClick={handlePay}
                disabled={processing}
                className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-white border py-2.5 text-sm font-semibold hover:border-[#1A1F36]/40 transition-colors disabled:opacity-60"
                style={{ borderColor: '#E6E6EF', color: '#1A1F36' }}
              >
                <GoogleG /> Pay
              </button>
            </div>
            <button
              type="button"
              onClick={handlePay}
              disabled={processing}
              className="w-full inline-flex items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-semibold transition-colors disabled:opacity-60"
              style={{
                backgroundColor: '#00D66F',
                color: '#0a2540',
              }}
            >
              <span
                className="inline-flex items-center justify-center px-2 py-0.5 rounded font-extrabold text-[11px]"
                style={{ backgroundColor: '#0a2540', color: '#00D66F' }}
              >
                link
              </span>
              Pay with Link
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px" style={{ background: '#E6E6EF' }} />
            <span
              className="text-[10px] uppercase tracking-wider font-semibold"
              style={{ color: '#A3ACB9' }}
            >
              or
            </span>
            <div className="flex-1 h-px" style={{ background: '#E6E6EF' }} />
          </div>

          {/* Email */}
          <Field label="Email">
            <span className="text-sm text-[#1A1F36]">friend@example.com</span>
          </Field>

          {/* Payment method radios */}
          <div className="space-y-2">
            <div
              className="text-[11px] font-semibold uppercase tracking-wider"
              style={{ color: '#697386' }}
            >
              Payment method
            </div>

            <MethodRadio
              selected={paymentMethod === 'card'}
              onClick={() => setPaymentMethod('card')}
              label="Card"
              right={
                <div className="flex items-center gap-1">
                  <BrandVisa />
                  <BrandMastercard />
                  <BrandAmex />
                  <BrandDiscover />
                </div>
              }
            />
            {paymentMethod === 'card' && (
              <div
                className="ml-7 -mt-1 mb-1 space-y-2 rounded-lg p-3"
                style={{
                  background: '#F6F9FC',
                  border: '1px solid #E6E6EF',
                }}
              >
                <Field label="Card number" inner>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[#1A1F36] font-mono tabular-nums">
                      4242 4242 4242 4242
                    </span>
                    <BrandVisa />
                  </div>
                </Field>
                <div className="grid grid-cols-2 gap-2">
                  <Field label="Expiry" inner>
                    <span className="text-[#1A1F36] font-mono">12 / 29</span>
                  </Field>
                  <Field label="CVC" inner>
                    <span className="text-[#1A1F36] font-mono">123</span>
                  </Field>
                </div>
                <Field label="Cardholder name" inner>
                  <span className="text-[#1A1F36]">{name || '—'}</span>
                </Field>
                <Field label="ZIP" inner>
                  <span className="text-[#1A1F36] font-mono">78701</span>
                </Field>
              </div>
            )}

            <MethodRadio
              selected={paymentMethod === 'cashapp'}
              onClick={() => setPaymentMethod('cashapp')}
              label="Cash App Pay"
              right={<BrandCashApp />}
            />
            <MethodRadio
              selected={paymentMethod === 'klarna'}
              onClick={() => setPaymentMethod('klarna')}
              label="Klarna · Pay over time"
              right={<BrandKlarna />}
            />
            <MethodRadio
              selected={paymentMethod === 'afterpay'}
              onClick={() => setPaymentMethod('afterpay')}
              label="Afterpay · 4 payments"
              right={<BrandAfterpay />}
            />
          </div>

          {/* Pay button */}
          <button
            type="button"
            onClick={handlePay}
            disabled={processing}
            className="w-full inline-flex items-center justify-center gap-2 rounded-lg py-3.5 text-base font-bold transition-all disabled:opacity-70"
            style={{
              background: processing
                ? '#5851E0'
                : 'linear-gradient(180deg, #6E6CE6, #5851E0)',
              color: 'white',
              boxShadow: '0 6px 18px rgba(99, 91, 255, 0.35)',
            }}
          >
            {processing ? (
              <>
                <Spinner /> Processing…
              </>
            ) : (
              <>
                <Lock className="w-3.5 h-3.5" />
                Pay {formatCurrency(amount)}
              </>
            )}
          </button>

          {/* Powered by */}
          <div
            className="flex items-center justify-center gap-1.5 pt-1 text-[11px]"
            style={{ color: '#697386' }}
          >
            <Lock className="w-3 h-3" />
            <span>Secure payment powered by</span>
            <StripeWordmark />
          </div>
        </div>
      </div>

      <p className="text-[11px] text-muted/80 text-center mt-3 leading-relaxed">
        Demo · no real charge. In production this is a Stripe Checkout
        session — same UI you see here, but live and processing payments.
      </p>
    </div>
  )
}

function Field({
  label,
  children,
  inner,
}: {
  label: string
  children: React.ReactNode
  inner?: boolean
}) {
  return (
    <div
      className={cn(
        'rounded-lg px-3 py-2 text-sm',
        inner
          ? 'bg-white'
          : 'bg-white border',
      )}
      style={!inner ? { borderColor: '#E6E6EF' } : undefined}
    >
      <div
        className="text-[10px] uppercase tracking-wider font-semibold mb-0.5"
        style={{ color: '#697386' }}
      >
        {label}
      </div>
      <div>{children}</div>
    </div>
  )
}

function MethodRadio({
  selected,
  onClick,
  label,
  right,
}: {
  selected: boolean
  onClick: () => void
  label: string
  right?: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-colors"
      style={{
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: selected ? '#635BFF' : '#E6E6EF',
        background: selected ? '#F0EFFE' : '#fff',
        color: '#1A1F36',
      }}
    >
      <span
        className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
        style={{
          borderWidth: 1,
          borderStyle: 'solid',
          borderColor: selected ? '#635BFF' : '#A3ACB9',
        }}
      >
        {selected && (
          <span
            className="w-2 h-2 rounded-full"
            style={{ background: '#635BFF' }}
          />
        )}
      </span>
      <span className="flex-1 text-left">{label}</span>
      {right}
    </button>
  )
}

// ---------------------------------------------------------------------------
// Brand logo glyphs — simplified renditions of the real cards, not licensed
// artwork. Good enough to read "this looks like Stripe Checkout."
// ---------------------------------------------------------------------------
function BrandPill({
  children,
  bg,
  color,
}: {
  children: React.ReactNode
  bg: string
  color: string
}) {
  return (
    <span
      className="inline-flex items-center justify-center px-1.5 h-5 rounded text-[9px] font-extrabold tracking-tight"
      style={{ background: bg, color }}
    >
      {children}
    </span>
  )
}

function BrandVisa() {
  return <BrandPill bg="#1A1F71" color="#F7B600">VISA</BrandPill>
}

function BrandMastercard() {
  return (
    <span className="inline-flex items-center h-5 w-7 relative">
      <span
        className="absolute left-0 w-3.5 h-3.5 rounded-full"
        style={{ background: '#EB001B' }}
      />
      <span
        className="absolute left-3 w-3.5 h-3.5 rounded-full mix-blend-multiply"
        style={{ background: '#F79E1B' }}
      />
    </span>
  )
}

function BrandAmex() {
  return <BrandPill bg="#2E77BB" color="white">AMEX</BrandPill>
}

function BrandDiscover() {
  return <BrandPill bg="#FF6000" color="white">DISC</BrandPill>
}

function BrandCashApp() {
  return (
    <span
      className="inline-flex items-center justify-center w-5 h-5 rounded font-extrabold text-white"
      style={{ background: '#00C244', fontSize: 13, lineHeight: 1 }}
    >
      $
    </span>
  )
}

function BrandKlarna() {
  return <BrandPill bg="#FFA8CD" color="#0A0A0A">Klarna.</BrandPill>
}

function BrandAfterpay() {
  return <BrandPill bg="#B2FCE4" color="#0A0A0A">afterpay</BrandPill>
}

// ---------------------------------------------------------------------------
// STEP 3 — Success
// ---------------------------------------------------------------------------
function SuccessStep({
  gift,
  owner,
  amount,
  name,
  onClose,
}: {
  gift: Gift
  owner: User
  amount: number
  name: string
  onClose: () => void
}) {
  return (
    <div className="px-6 py-10 text-center sm:px-7">
      <div className="w-14 h-14 rounded-full bg-mint mx-auto flex items-center justify-center mb-4 shadow-lift">
        <Check className="w-7 h-7 text-white" strokeWidth={3} />
      </div>
      <h2 className="text-xl font-bold text-ink mb-2">
        You&apos;re a legend, {name.split(' ')[0]}.
      </h2>
      <p className="text-sm text-muted leading-relaxed mb-6 max-w-xs mx-auto">
        {gift.type === 'item' &&
          `${formatCurrency(amount)} on its way for "${gift.title}." ${owner.displayName.split(' ')[0]} will know it's from you.`}
        {gift.type === 'pool' &&
          `${formatCurrency(amount)} added to the ${gift.title} pool. Thank you.`}
        {gift.type === 'cash' &&
          `${formatCurrency(amount)} sent. ${owner.displayName.split(' ')[0]} will see your note.`}
      </p>
      <button
        onClick={onClose}
        className="w-full bg-ink text-cream rounded-xl py-3.5 text-sm font-semibold hover:bg-rose transition-colors"
      >
        Done
      </button>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Brand glyphs
// ---------------------------------------------------------------------------
function AppleIcon() {
  return (
    <svg width="14" height="16" viewBox="0 0 14 16" fill="currentColor" aria-hidden="true">
      <path d="M11.6 8.49c-.02-2.07 1.69-3.07 1.77-3.12-.97-1.41-2.47-1.6-3-1.62-1.27-.13-2.49.75-3.13.75-.66 0-1.66-.73-2.73-.71-1.4.02-2.71.82-3.43 2.07-1.48 2.55-.38 6.32 1.06 8.39.71 1.01 1.55 2.15 2.65 2.11 1.07-.04 1.48-.69 2.77-.69 1.29 0 1.66.69 2.79.67 1.15-.02 1.88-1.03 2.58-2.05.81-1.17 1.14-2.32 1.16-2.38-.03-.01-2.22-.86-2.24-3.42zM9.55 2.18c.59-.71.98-1.7.87-2.68-.84.03-1.86.56-2.47 1.27-.54.63-1.02 1.63-.89 2.6.94.07 1.9-.47 2.49-1.19z" />
    </svg>
  )
}

function GoogleG() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M22.5 12.27c0-.79-.07-1.55-.21-2.27H12v4.3h5.87c-.25 1.33-1.01 2.46-2.16 3.22v2.68h3.5c2.04-1.88 3.21-4.66 3.21-7.93z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.91 0 5.36-.96 7.14-2.6l-3.5-2.68c-.97.65-2.21 1.04-3.64 1.04-2.8 0-5.18-1.89-6.03-4.43H2.36v2.78C4.14 20.59 7.79 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.97 14.33A6.6 6.6 0 015.65 12c0-.81.14-1.6.32-2.33V6.89H2.36A11 11 0 001 12c0 1.77.42 3.45 1.36 4.94l3.61-2.61z"
        fill="#FBBC04"
      />
      <path
        d="M12 5.38c1.58 0 3 .54 4.12 1.61l3.1-3.1C17.36 2.21 14.91 1 12 1 7.79 1 4.14 3.41 2.36 6.89l3.61 2.78C6.82 7.27 9.2 5.38 12 5.38z"
        fill="#EA4335"
      />
    </svg>
  )
}

function LinkLogo() {
  return (
    <span
      className="inline-flex items-center justify-center px-2 py-0.5 rounded font-extrabold text-[11px]"
      style={{ backgroundColor: '#0a2540', color: '#00D66F' }}
    >
      link
    </span>
  )
}

function StripeWordmark() {
  return (
    <span
      className="inline-block font-extrabold tracking-tight text-[11px]"
      style={{ color: '#635BFF' }}
    >
      stripe
    </span>
  )
}

function Spinner() {
  return (
    <svg
      className="animate-spin w-4 h-4"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="3"
        strokeOpacity="0.25"
      />
      <path
        d="M22 12a10 10 0 00-10-10"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  )
}
