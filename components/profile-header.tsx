import { Instagram } from 'lucide-react'
import { daysUntil, formatDate } from '@/lib/utils'
import type { User } from '@/lib/mock-data'

export function ProfileHeader({ user }: { user: User }) {
  const days = daysUntil(user.birthday)
  const date = formatDate(user.birthday)

  return (
    <header className="px-5 pt-8 pb-6 sm:px-7 sm:pt-12">
      <div className="flex items-start gap-4">
        <Avatar user={user} />
        <div className="flex-1 min-w-0 pt-1">
          <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-rose mb-1">
            Birthday list
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-ink leading-tight">
            {user.displayName}
          </h1>
          {user.instagramHandle && (
            <a
              href={`https://instagram.com/${user.instagramHandle}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm text-muted mt-1 hover:text-ink transition-colors"
            >
              <Instagram className="w-3.5 h-3.5" />
              @{user.instagramHandle}
            </a>
          )}
        </div>
      </div>

      {/* Countdown band */}
      <div className="mt-6 flex items-center justify-between rounded-2xl border border-line bg-white px-5 py-4 shadow-card">
        <div>
          <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted">
            Birthday
          </div>
          <div className="text-base font-semibold text-ink mt-0.5">{date}</div>
        </div>
        <div className="text-right">
          <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-rose">
            In
          </div>
          <div className="text-2xl font-bold tabular-nums text-ink leading-none mt-1">
            {days}
            <span className="text-sm font-medium text-muted ml-1">days</span>
          </div>
        </div>
      </div>

      {/* Personal note */}
      {user.note && (
        <p className="mt-6 text-[15px] leading-relaxed text-ink/80 px-1">
          {user.note}
        </p>
      )}
    </header>
  )
}

function Avatar({ user }: { user: User }) {
  if (user.avatarUrl) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={user.avatarUrl}
        alt={user.displayName}
        className="w-16 h-16 rounded-full object-cover border border-line"
      />
    )
  }
  // Initials fallback
  const initials = user.displayName
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
  return (
    <div className="w-16 h-16 rounded-full flex items-center justify-center bg-gradient-to-br from-rose to-rose-soft text-white text-xl font-bold shadow-rose">
      {initials}
    </div>
  )
}
