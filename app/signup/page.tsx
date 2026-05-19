'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Gift, Instagram, ArrowRight, Check } from 'lucide-react'
import { cn } from '@/lib/utils'

/**
 * Mock signup flow — Instagram-style auth UI but doesn't actually
 * authenticate. Two steps then drops you in the dashboard.
 */
export default function SignupPage() {
  const router = useRouter()
  const [step, setStep] = useState<'auth' | 'profile'>('auth')
  const [handle, setHandle] = useState('')
  const [birthday, setBirthday] = useState('')

  function handleAuth() {
    // Mock the Instagram OAuth flash — short pause, then advance.
    setTimeout(() => setStep('profile'), 500)
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
            <Dot active={step === 'profile'} done={false} />
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
                <p className="text-sm text-muted">
                  We&apos;ll use your IG handle as your public URL.
                </p>
              </div>

              <button
                onClick={handleAuth}
                className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-ink text-cream py-4 text-base font-semibold hover:bg-rose hover:shadow-rose active:scale-[0.98] transition-all"
              >
                <Instagram className="w-5 h-5" />
                Continue with Instagram
              </button>

              <div className="my-5 flex items-center gap-3">
                <div className="flex-1 h-px bg-line" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-muted">or</span>
                <div className="flex-1 h-px bg-line" />
              </div>

              <button
                onClick={handleAuth}
                className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-white border border-line text-ink py-4 text-base font-semibold hover:border-ink transition-colors"
              >
                Continue with email
              </button>

              <p className="text-[11px] text-muted text-center mt-6 leading-relaxed">
                Demo: this is just a mock. Nothing is sent or stored.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="rounded-3xl bg-white border border-line shadow-card p-7 sm:p-9 animate-fade-up"
            >
              <div className="text-center mb-7">
                <h1 className="text-2xl font-bold tracking-tight text-ink mb-1">
                  Almost there.
                </h1>
                <p className="text-sm text-muted">
                  Two things and your list is live.
                </p>
              </div>

              <div className="space-y-5 mb-6">
                <div>
                  <label
                    htmlFor="handle"
                    className="block text-xs font-bold text-ink mb-2 uppercase tracking-wider"
                  >
                    Your handle
                  </label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-muted">
                      onlygifts.app/@
                    </div>
                    <input
                      id="handle"
                      type="text"
                      required
                      value={handle}
                      onChange={(e) => setHandle(e.target.value.replace(/[^a-zA-Z0-9_]/g, ''))}
                      placeholder="pieter"
                      autoCapitalize="none"
                      autoCorrect="off"
                      className="w-full rounded-xl border border-line bg-white pl-[125px] pr-4 py-3.5 text-base text-ink placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-rose/30 focus:border-rose"
                    />
                  </div>
                </div>
                <div>
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
              </div>

              <button
                type="submit"
                disabled={!handle || !birthday}
                className={cn(
                  'w-full inline-flex items-center justify-center gap-2 rounded-2xl py-4 text-base font-semibold transition-all',
                  handle && birthday
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
