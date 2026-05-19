import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Gift as GiftIcon, Sparkles, ArrowLeft } from 'lucide-react'
import { MOCK_USERS } from '@/lib/mock-data'
import { ProfileHeader } from '@/components/profile-header'
import { GiftCard } from '@/components/gift-card'
import { ShareButton } from '@/components/share-button'

export async function generateStaticParams() {
  return Object.keys(MOCK_USERS).map((username) => ({ username }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ username: string }>
}) {
  const { username } = await params
  const user = MOCK_USERS[username]
  if (!user) return { title: 'Not found · Only Gifts' }
  return {
    title: `${user.displayName} — Birthday list · Only Gifts`,
    description: user.note ?? `${user.displayName}'s birthday gift list.`,
    openGraph: {
      title: `${user.displayName}'s birthday list`,
      description:
        user.note ?? `Help make ${user.displayName.split(' ')[0]}'s birthday.`,
      type: 'profile',
    },
  }
}

export default async function PublicRegistryPage({
  params,
}: {
  params: Promise<{ username: string }>
}) {
  const { username } = await params
  const user = MOCK_USERS[username]
  if (!user) notFound()

  // For the demo, the "shareable URL" is hardcoded. In V2 this is the
  // canonical user page on the production domain.
  const shareUrl = `onlygifts.app/@${user.username}`

  const totalGifts = user.gifts.length
  const claimedCount = user.gifts.filter((g) => g.claimed).length

  return (
    <main className="min-h-screen pb-24">
      {/* Top nav strip */}
      <nav className="sticky top-0 z-30 backdrop-blur-md bg-cream/85 border-b border-line/60">
        <div className="max-w-2xl mx-auto px-5 sm:px-7 h-14 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink hover:text-rose transition-colors"
          >
            <GiftIcon className="w-4 h-4" />
            Only Gifts
          </Link>
          <ShareButton url={`https://${shareUrl}`} />
        </div>
      </nav>

      <div className="max-w-2xl mx-auto">
        <ProfileHeader user={user} />

        {/* Stats strip */}
        <div className="px-5 sm:px-7 mb-6">
          <div className="flex items-center justify-between text-xs text-muted">
            <div className="inline-flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-rose" />
              <span className="text-ink font-semibold">{totalGifts}</span> things on the list
            </div>
            {claimedCount > 0 && (
              <div>
                <span className="text-mint font-semibold">{claimedCount}</span> already claimed
              </div>
            )}
          </div>
        </div>

        {/* Gifts grid — single column on mobile, two cols on sm+ for short lists */}
        <section className="px-5 sm:px-7 space-y-4">
          {user.gifts.map((gift) => (
            <GiftCard key={gift.id} gift={gift} owner={user} />
          ))}
        </section>

        {/* Footer message */}
        <footer className="px-5 sm:px-7 mt-10 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs text-muted hover:text-ink transition-colors"
          >
            <ArrowLeft className="w-3 h-3" />
            Make your own at <strong className="ml-1 text-ink">onlygifts.app</strong>
          </Link>
        </footer>
      </div>
    </main>
  )
}
