import { Instagram } from 'lucide-react'
import { daysUntil, formatDate } from '@/lib/utils'
import type { User } from '@/lib/mock-data'

export function ProfileHeader({ user }: { user: User }) {
  const days = daysUntil(user.birthday)
  const date = formatDate(user.birthday)

  return (
    <header className="px-5 pt-10 sm:pt-14 text-center">
      {/* Avatar with Instagram-gradient ring */}
      <div className="inline-block relative mb-5">
        <div
          className="rounded-full p-[3px]"
          style={{
            background:
              'conic-gradient(from 180deg at 50% 50%, #FCAF45 0deg, #FD1D1D 90deg, #E1306C 180deg, #833AB4 270deg, #FCAF45 360deg)',
          }}
        >
          <div className="rounded-full bg-cream p-[3px]">
            <Avatar user={user} />
          </div>
        </div>
      </div>

      {/* Name */}
      <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-ink leading-tight mb-1">
        {user.displayName}
      </h1>

      {/* "Birthday list" label */}
      <div className="text-[11px] font-bold uppercase tracking-[0.22em] text-rose mb-3">
        Birthday list
      </div>

      {/* Instagram link — IG brand gradient */}
      <a
        href={`https://instagram.com/${user.username}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full transition-all hover:-translate-y-0.5"
        style={{
          backgroundColor: 'rgba(225, 48, 108, 0.06)',
          border: '1px solid rgba(225, 48, 108, 0.20)',
        }}
      >
        <Instagram
          className="w-4 h-4"
          style={{ color: '#E1306C' }}
        />
        <span
          className="text-sm font-bold"
          style={{
            background:
              'linear-gradient(90deg, #FCAF45, #FD1D1D, #E1306C, #833AB4)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent',
          }}
        >
          @{user.username}
        </span>
      </a>

      {/* Highlighted birthday card */}
      <BirthdayCard
        birthday={user.birthday}
        days={days}
        date={date}
        turningAge={user.turningAge}
      />

      {/* Personal note as a quote */}
      {user.note && (
        <figure className="mt-8 mb-2 max-w-xl mx-auto">
          <blockquote className="text-[15px] sm:text-base italic text-ink/85 leading-relaxed">
            <span className="text-rose mr-1 text-xl leading-none align-baseline">&ldquo;</span>
            {user.note}
            <span className="text-rose ml-1 text-xl leading-none align-baseline">&rdquo;</span>
          </blockquote>
          <figcaption className="mt-3 text-sm font-bold tracking-tight">
            <span
              style={{
                background:
                  'linear-gradient(90deg, #FCAF45, #E1306C, #833AB4)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
              }}
            >
              — {user.displayName.split(' ')[0]}
            </span>
          </figcaption>
        </figure>
      )}
    </header>
  )
}

function BirthdayCard({
  date,
  days,
  turningAge,
}: {
  birthday: string
  date: string
  days: number
  turningAge?: number
}) {
  // "August 9, 2026" → "9th of August"
  const [month, dayStr] = date.split(' ')
  const day = parseInt(dayStr.replace(',', ''), 10)
  const ord =
    day % 10 === 1 && day !== 11
      ? 'st'
      : day % 10 === 2 && day !== 12
        ? 'nd'
        : day % 10 === 3 && day !== 13
          ? 'rd'
          : 'th'

  // Confetti pieces — fall continuously over the card.
  // Each piece picks a horizontal start, a color, a duration, and a delay.
  const confettiColors = ['#FCAF45', '#FD1D1D', '#E1306C', '#833AB4', '#10B981']
  const confettiPieces = Array.from({ length: 14 }, (_, i) => ({
    left: `${(i * 7.3 + 3) % 95}%`,
    bg: confettiColors[i % confettiColors.length],
    delay: `${(i * 0.45) % 4}s`,
    duration: `${3 + (i % 4) * 0.5}s`,
    skew: `${(i % 2 === 0 ? 1 : -1) * 12}deg`,
  }))

  return (
    <div
      className="relative overflow-hidden rounded-2xl mt-6 mx-auto max-w-md p-5 sm:p-6 text-center"
      style={{
        background:
          'linear-gradient(135deg, rgba(252, 175, 69, 0.10) 0%, rgba(225, 48, 108, 0.10) 50%, rgba(131, 58, 180, 0.10) 100%)',
        border: '1px solid rgba(225, 48, 108, 0.22)',
        boxShadow: '0 12px 36px rgba(225, 48, 108, 0.10)',
      }}
    >
      {/* Falling confetti — pure CSS, looped. */}
      {confettiPieces.map((p, i) => (
        <span
          key={i}
          className="confetti-piece"
          style={{
            left: p.left,
            background: p.bg,
            animationDelay: p.delay,
            animationDuration: p.duration,
            transform: `skewX(${p.skew})`,
          }}
          aria-hidden="true"
        />
      ))}

      {/* Static emoji accents */}
      <div
        className="absolute -top-1 -right-1 text-2xl select-none pointer-events-none"
        aria-hidden="true"
        style={{ transform: 'rotate(20deg)' }}
      >
        🎉
      </div>
      <div
        className="absolute -bottom-2 -left-2 text-2xl select-none pointer-events-none"
        aria-hidden="true"
        style={{ transform: 'rotate(-15deg)' }}
      >
        🎂
      </div>

      {/* Content */}
      <div className="relative">
        <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-rose mb-1.5">
          Birthday
        </div>
        <div className="text-2xl sm:text-3xl font-bold tracking-tight text-ink leading-tight">
          {day}
          <sup className="text-sm text-rose ml-0.5">{ord}</sup> of {month}
        </div>
        {turningAge && (
          <div
            className="mt-1.5 text-sm sm:text-base font-semibold"
            style={{
              background:
                'linear-gradient(90deg, #FCAF45, #E1306C, #833AB4)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
            }}
          >
            Turning {turningAge}
          </div>
        )}

        {/* Countdown pill */}
        <div className="mt-4 inline-flex items-center gap-2 bg-white/90 backdrop-blur rounded-full px-3.5 py-1 shadow-card border border-rose/20">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-muted">
            In
          </span>
          <span className="text-base font-bold tabular-nums text-rose">
            {days}
          </span>
          <span className="text-[10px] font-semibold text-muted">days</span>
        </div>
      </div>
    </div>
  )
}

function Avatar({ user }: { user: User }) {
  if (user.avatarUrl) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={user.avatarUrl}
        alt={user.displayName}
        className="w-32 h-32 sm:w-36 sm:h-36 rounded-full object-cover object-top"
      />
    )
  }
  const initials = user.displayName
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
  return (
    <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-full flex items-center justify-center bg-gradient-to-br from-rose to-rose-soft text-white text-4xl font-bold">
      {initials}
    </div>
  )
}
