import Link from 'next/link'
import { cn } from '@/lib/utils'

/**
 * Only Gifts brand mark. Two parts:
 *  - A filled gift box in the IG-gradient — primary visual anchor.
 *  - The "Only Gifts" wordmark, bold, with the IG gradient on text.
 *
 * Used in every nav bar. `size` defaults to "sm" for nav use;
 * "lg" works for hero/footer / standalone placements.
 */
export function Logo({
  size = 'sm',
  href = '/',
}: {
  size?: 'sm' | 'md' | 'lg'
  href?: string | null
}) {
  const sizes = {
    sm: { icon: 'w-7 h-7', text: 'text-base' },
    md: { icon: 'w-9 h-9', text: 'text-lg' },
    lg: { icon: 'w-12 h-12', text: 'text-2xl' },
  }[size]

  const content = (
    <span
      className={cn(
        'inline-flex items-center gap-2 group',
        href && 'cursor-pointer',
      )}
    >
      <span
        className={cn(
          sizes.icon,
          'rounded-xl flex items-center justify-center shadow-rose transition-transform group-hover:-rotate-6',
        )}
        style={{
          background:
            'linear-gradient(135deg, #FCAF45 0%, #FD1D1D 40%, #E1306C 70%, #833AB4 100%)',
        }}
      >
        <GiftBox className="text-white" />
      </span>
      <span
        className={cn(
          sizes.text,
          'font-extrabold tracking-tight',
        )}
        style={{
          background:
            'linear-gradient(90deg, #FCAF45 0%, #FD1D1D 35%, #E1306C 65%, #833AB4 100%)',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          color: 'transparent',
        }}
      >
        Only Gifts
      </span>
    </span>
  )

  if (href) {
    return <Link href={href}>{content}</Link>
  }
  return content
}

function GiftBox({ className }: { className?: string }) {
  return (
    <svg
      className={cn('w-4 h-4', className)}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20 12v10H4V12" />
      <path d="M2 7h20v5H2z" />
      <path d="M12 22V7" />
      <path d="M12 7H7.5a2.5 2.5 0 010-5C11 2 12 7 12 7z" />
      <path d="M12 7h4.5a2.5 2.5 0 000-5C13 2 12 7 12 7z" />
    </svg>
  )
}
