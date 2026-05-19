'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Gift, Instagram, ArrowRight, Check } from 'lucide-react'
import { cn } from '@/lib/utils'

/**
 * Mock signup flow.
 *
 * Step 1 — "Continue with Instagram" (decorative — we'd hit Meta OAuth
 *          here in production). On click, we pretend the OAuth returned
 *          and we've got the IG handle.
 * Step 2 — Confirm handle (pre-filled from IG, read-only) + birthday.
 *
 * Critically: the user does NOT choose a handle. Their URL on Only Gifts
 * is always onlygifts.app/@<their-instagram-handle>. One identity, one
 * link, no rename game.
 */
export default function SignupPage() {
  const router = useRouter()
  const [step, setStep] = useState<'auth' | 'confirm'>('auth')
  // Pretend the IG OAuth flow returned this handle. In production this
  // would be the actual handle from the Meta token.
  const [handle, setHandle] = useState('')
  const [birthday, setBirthday] = useState('')

  function handleInstagramAuth() {
    // Mock: pretend we just authenticated and got `lerouxp_` from Meta.
    setTimeout(() => {
      setHandle('lerouxp_')
      setStep('confirm')
    }, 600)
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    router.push('/dashboard')
  }

  return (
    <main className="min-h-screen flex flex-col">
      {/* Top */}
      <nav className="px-5 sm:px-7 pt-5">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <Link href="/" className="inline-flex items-center gap-1.5 text-sm font-bold text-ink">
            <Gift className="w-4 h-4 text-rose" />
            Only Gifts
          </Link>
        </div>
      </nav>

      <div className="flex-1 flex items-center justify-center px-5 sm:px-7 py-10">
        <div className="w-full max-w-md">
          {/* Progress dots */}
          <div className="flex items-center justify-center gap-2 mb-8">
            <Dot active={step === 'auth'} done={step !== 'auth'} />
            <div className="h-px w-8 bg-line" />
            <Dot active={step === 'confirm'} done={false} />
          </div>

          {step === 'auth' ? (
            <div className="rounded-3xl bg-white border border-line shadow-card p-7 sm:p-9 animate-fade-up">
              <div className="text-center mb-7">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-rose to-rose-soft mx-auto mb-4 flex items-center justify-center shadow-rose">
                  <Gift className="w-7 h-7 text-white" />
                </div>
                <h1 className="text-2xl font-bold tracking-tight text-ink mb-1">
                  Make your birthday list
                </h1>
                <p className="text-sm text-muted leading-relaxed">
                  Sign in with Instagram. Your handle becomes your link.
                  <br />
                  <span className="text-ink font-semibold">
                    onlygifts.app/@yourhandle
                  </span>
                </p>
              </div>

              <button
                onClick={handleInstagramAuth}
                className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-ink text-cream py-4 text-base font-semibold hover:bg-rose hover:shadow-rose active:scale-[0.98] transition-all"
              >
                <Instagram className="w-5 h-5" />
                Continue with Instagram
              </button>

              <p className="text-[11px] text-muted text-center mt-6 leading-relaxed">
                Demo: this is a mock — clicking advances to the next step
                with <code className="text-ink">@lerouxp_</code> filled in.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="rounded-3xl bg-white border border-line shadow-card p-7 sm:p-9 animate-fade-up"
            >
              <div className="text-center mb-7">
                <h1 className="text-2xl font-bold tracking-tight text-ink mb-1">
                  Welcome, @{handle}.
                </h1>
                <p className="text-sm text-muted">
                  When&apos;s your birthday?
                </p>
              </div>

              {/* Confirmed handle — read-only, pulled from IG */}
              <div className="rounded-xl bg-rose-tint/40 border border-rose/20 p-3 mb-5 flex items-center gap-3">
                <Instagram className="w-4 h-4 text-rose flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-rose mb-0.5">
                    Your link
                  </div>
                  <div className="text-sm font-mono text-ink truncate">
                    onlygifts.app/@{handle}
                  </div>
                </div>
                <Check className="w-4 h-4 text-mint flex-shrink-0" strokeWidth={3} />
              </div>

              <div className="mb-6">
                <label
                  htmlFor="birthday"
                  className="block text-xs font-bold text-ink mb-2 uppercase tracking-wider"
                >
                  Your birthday
                </label>
                <input
                  id="birthday"
                  type="date"
                  required
                  value={birthday}
                  onChange={(e) => setBirthday(e.target.value)}
                  className="w-full rounded-xl border border-line bg-white px-4 py-3.5 text-base text-ink focus:outline-none focus:ring-2 focus:ring-rose/30 focus:border-rose"
                />
              </div>

              <button
                type="submit"
                disabled={!birthday}
                className={cn(
                  'w-full inline-flex items-center justify-center gap-2 rounded-2xl py-4 text-base font-semibold transition-all',
                  birthday
                    ? 'bg-ink text-cream hover:bg-rose hover:shadow-rose active:scale-[0.98]'
                    : 'bg-line/60 text-muted cursor-not-allowed',
                )}
              >
                Make my list
                <ArrowRight className="w-4 h-4" />
              </button>

              <p className="text-[11px] text-muted text-center mt-5">
                Demo: this skips straight to the dashboard.
              </p>
            </form>
          )}
        </div>
      </div>
    </main>
  )
}

function Dot({ active, done }: { active: boolean; done: boolean }) {
  return (
    <div
      className={cn(
        'w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold transition-all',
        active && 'bg-ink text-cream scale-110',
        done && 'bg-mint text-white',
        !active && !done && 'bg-line/60 text-muted',
      )}
    >
      {done ? <Check className="w-3.5 h-3.5" strokeWidth={3} /> : active ? '·' : ''}
    </div>
  )
}
