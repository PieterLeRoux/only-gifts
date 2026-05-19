'use client'

import { useState } from 'react'
import { Share2, Check, Link2 } from 'lucide-react'
import { cn } from '@/lib/utils'

export function ShareButton({ url }: { url: string }) {
  const [copied, setCopied] = useState(false)

  async function handleShare() {
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({ url, title: 'My birthday list' })
        return
      } catch {
        // User canceled or share unsupported — fall through to copy.
      }
    }
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      // Clipboard blocked — no-op.
    }
  }

  return (
    <button
      onClick={handleShare}
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-semibold transition-all',
        'bg-white border border-line text-ink hover:border-ink hover:shadow-card active:scale-95',
      )}
      aria-label="Share this list"
    >
      {copied ? (
        <>
          <Check className="w-3.5 h-3.5 text-mint" />
          Copied
        </>
      ) : (
        <>
          <Share2 className="w-3.5 h-3.5" />
          Share
        </>
      )}
    </button>
  )
}

export function CopyableLink({ url }: { url: string }) {
  const [copied, setCopied] = useState(false)
  async function copy() {
    await navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }
  return (
    <button
      onClick={copy}
      className="w-full inline-flex items-center justify-between gap-3 rounded-xl border border-line bg-white px-4 py-3 text-left hover:border-ink transition-colors"
    >
      <div className="flex items-center gap-2 min-w-0 flex-1">
        <Link2 className="w-4 h-4 text-muted flex-shrink-0" />
        <code className="text-sm font-mono text-ink truncate">{url}</code>
      </div>
      <span
        className={cn(
          'text-xs font-semibold flex-shrink-0 px-2 py-1 rounded-md transition-colors',
          copied ? 'bg-mint-tint text-mint' : 'bg-line/40 text-muted',
        )}
      >
        {copied ? 'Copied' : 'Copy'}
      </span>
    </button>
  )
}
