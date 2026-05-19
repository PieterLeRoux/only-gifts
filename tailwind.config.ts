import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Only Gifts brand palette
        cream: '#FAF8F5',
        ink: '#0F172A',
        muted: '#64748B',
        line: '#E2E8F0',
        rose: {
          DEFAULT: '#F43F5E',
          soft: '#FB7185',
          deep: '#BE123C',
          tint: '#FFE4E6',
        },
        mint: {
          DEFAULT: '#10B981',
          soft: '#34D399',
          tint: '#D1FAE5',
        },
        butter: '#FEF3C7', // pale highlight for celebratory moments
      },
      fontFamily: {
        sans: [
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'sans-serif',
        ],
        display: [
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'sans-serif',
        ],
      },
      boxShadow: {
        card: '0 1px 3px rgba(15, 23, 42, 0.04), 0 4px 12px rgba(15, 23, 42, 0.06)',
        lift: '0 6px 20px rgba(15, 23, 42, 0.08), 0 2px 6px rgba(15, 23, 42, 0.04)',
        rose: '0 8px 22px rgba(244, 63, 94, 0.30)',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      animation: {
        'fade-up': 'fadeUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) both',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
