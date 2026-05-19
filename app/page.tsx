import Link from 'next/link'
import { Gift, Instagram, ArrowRight, Heart, Users, Sparkles } from 'lucide-react'
import { Logo } from '@/components/logo'

export default function LandingPage() {
  return (
    <main className="min-h-screen">
      {/* Nav */}
      <nav className="px-5 sm:px-7 pt-5">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Logo />
          <Link
            href="/signup"
            className="rounded-full bg-ink text-cream px-4 py-2 text-xs font-semibold hover:bg-rose hover:shadow-rose transition-all"
          >
            Make your list
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="px-5 sm:px-7 pt-12 pb-16 sm:pt-20 sm:pb-24">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-rose-tint text-rose px-3 py-1 text-[11px] font-bold uppercase tracking-wider mb-6">
            <Sparkles className="w-3 h-3" />
            For the birthday you actually want
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-ink leading-[1.05] mb-5">
            A gift list for the
            <br />
            people who{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose to-rose-soft">
              actually like you.
            </span>
          </h1>
          <p className="text-lg text-muted leading-relaxed max-w-xl mx-auto mb-8">
            Drop a link in your Instagram bio. Friends claim a gift, chip in on the
            expensive ones, or just send you cash. No more &ldquo;just surprise
            me&rdquo; followed by three candles.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <Link
              href="/signup"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-ink text-cream px-6 py-4 text-base font-semibold shadow-card hover:bg-rose hover:shadow-rose hover:-translate-y-0.5 transition-all"
            >
              <Instagram className="w-4 h-4" />
              Make my list
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/lerouxp_"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-white border border-line text-ink px-6 py-4 text-base font-semibold hover:border-ink transition-colors"
            >
              See an example
            </Link>
          </div>
          <p className="text-xs text-muted/80 mt-5">
            Free forever for the people you actually invite.
          </p>
        </div>
      </section>

      {/* Three blocks */}
      <section className="px-5 sm:px-7 pb-20">
        <div className="max-w-5xl mx-auto grid sm:grid-cols-3 gap-4">
          <Feature
            icon={<Gift className="w-5 h-5" />}
            title="Claim a gift"
            desc="One person takes one item. The list updates so nobody double-buys."
          />
          <Feature
            icon={<Users className="w-5 h-5" />}
            title="Chip in together"
            desc="Big-ticket items get group-funded. Five people, fifty bucks each, one great gift."
          />
          <Feature
            icon={<Heart className="w-5 h-5" />}
            title="Just send cash"
            desc="No shame. Venmo, Cash App, PayPal — whatever you've got."
          />
        </div>
      </section>

      {/* How it works */}
      <section className="px-5 sm:px-7 pb-20">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-rose mb-2">
              How it works
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-ink">
              Three minutes. One link.
            </h2>
          </div>
          <ol className="space-y-3">
            <Step n={1} title="Make your list" desc="Add the things you actually want. Throw in a cash option if you're moving apartments." />
            <Step n={2} title="Drop the link in your IG bio" desc="onlygifts.app/@yourhandle. That's the entire URL." />
            <Step n={3} title="Friends pick what works for them" desc="No spreadsheet, no group chat, no &ldquo;wait who already got the candles.&rdquo;" />
          </ol>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-5 sm:px-7 pb-20">
        <div className="max-w-2xl mx-auto rounded-3xl bg-ink text-cream p-8 sm:p-12 text-center relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage:
                'radial-gradient(rgba(255,255,255,0.5) 1px, transparent 1px)',
              backgroundSize: '18px 18px',
            }}
          />
          <div className="relative">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3 leading-tight">
              When&apos;s your birthday?
            </h2>
            <p className="text-cream/80 mb-7 max-w-md mx-auto">
              You should probably make this before it sneaks up on you.
            </p>
            <Link
              href="/signup"
              className="inline-flex items-center gap-2 rounded-full bg-rose text-white px-6 py-3.5 text-base font-semibold shadow-rose hover:bg-rose-soft transition-all"
            >
              Start now
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-5 sm:px-7 py-10 border-t border-line">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-muted">
          <div className="inline-flex items-center gap-2">
            <Logo href={null} />
            <span>· a thing by Accenzio</span>
          </div>
          <div>© {new Date().getFullYear()} Accenzio LLC.</div>
        </div>
      </footer>
    </main>
  )
}

function Feature({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode
  title: string
  desc: string
}) {
  return (
    <div className="rounded-2xl border border-line bg-white p-5 shadow-card hover:shadow-lift transition-shadow">
      <div className="w-10 h-10 rounded-xl bg-rose-tint text-rose flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-base font-bold text-ink mb-1.5">{title}</h3>
      <p className="text-sm text-muted leading-relaxed">{desc}</p>
    </div>
  )
}

function Step({ n, title, desc }: { n: number; title: string; desc: string }) {
  return (
    <li className="flex gap-4 items-start rounded-2xl border border-line bg-white p-5 shadow-card">
      <div className="w-9 h-9 rounded-full bg-ink text-cream flex items-center justify-center text-sm font-bold flex-shrink-0">
        {n}
      </div>
      <div className="pt-1">
        <h3 className="text-base font-bold text-ink mb-0.5">{title}</h3>
        <p className="text-sm text-muted leading-relaxed">{desc}</p>
      </div>
    </li>
  )
}
