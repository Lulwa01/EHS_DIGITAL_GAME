import { useId, type CSSProperties } from 'react'
import { useT } from '../i18n'

export type ShieldState = 'earned' | 'missed' | 'current' | 'upcoming'

export type ShieldTone = 'default' | 'win' | 'lose'

const PALETTE: Record<ShieldTone, { stops: [string, string, string]; stroke: string }> = {
  default: { stops: ['#33198f', '#6a32d4', '#cdb8f5'], stroke: '#a796e0' },
  win: { stops: ['#0b6b3a', '#1fa85a', '#a8f0c4'], stroke: '#6fdc9b' },
  lose: { stops: ['#8a1222', '#d12f3f', '#f7b3ba'], stroke: '#f07a86' },
}

function ShieldIcon({ tone }: { tone: ShieldTone }) {
  const id = useId()
  const { stops, stroke } = PALETTE[tone]
  return (
    <svg viewBox="0 0 100 112" aria-hidden="true">
      <defs>
        <linearGradient id={`${id}-fill`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={stops[0]} />
          <stop offset="0.55" stopColor={stops[1]} />
          <stop offset="1" stopColor={stops[2]} />
        </linearGradient>
      </defs>
      <path
        d="M50 4C64 12 79 15 94 15V50C94 79 74 97 50 107C26 97 6 79 6 50V15C21 15 36 12 50 4Z"
        fill={`url(#${id}-fill)`}
        stroke={stroke}
        strokeWidth="3"
        strokeLinejoin="round"
      />
      {tone === 'lose' ? (
        <>
          <path d="M34 40L66 72M66 40L34 72" fill="none" stroke="#e9c4c8" strokeWidth="17" strokeLinecap="round" />
          <path d="M34 40L66 72M66 40L34 72" fill="none" stroke="#fff" strokeWidth="11" strokeLinecap="round" />
        </>
      ) : (
        <>
          <path d="M30 57L45 72L72 41" fill="none" stroke="#c9c4da" strokeWidth="17" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M30 57L45 72L72 41" fill="none" stroke="#fff" strokeWidth="11" strokeLinecap="round" strokeLinejoin="round" />
        </>
      )}
    </svg>
  )
}

interface ShieldMeterProps {
  states: ShieldState[]
  size?: 'md' | 'lg'
  /** Delay each shield's light-up so they fill in one after another (results screen). */
  staggerMs?: number
  /** Results screen: correct answers green, wrong answers red (instead of purple / dimmed). */
  colorByResult?: boolean
}

export function ShieldMeter({ states, size = 'md', staggerMs = 0, colorByResult = false }: ShieldMeterProps) {
  const t = useT()
  const earned = states.filter((s) => s === 'earned').length
  const toneFor = (state: ShieldState): ShieldTone =>
    !colorByResult ? 'default' : state === 'earned' ? 'win' : state === 'missed' ? 'lose' : 'default'
  return (
    <div className={`shields shields-${size}${colorByResult ? ' shields-colored' : ''}`} role="group" aria-label={t.shieldsEarned(earned, states.length)}>
      {states.map((state, i) => (
        <span
          key={i}
          className={`shield is-${state}`}
          tabIndex={0}
          role="img"
          aria-label={t.shieldAria(i + 1, t.shieldTip[state])}
          style={{ '--delay': `${i * staggerMs}ms` } as CSSProperties}
        >
          <ShieldIcon tone={toneFor(state)} />
          <span className="shield-tip" aria-hidden="true">
            {t.shieldShort(i + 1)} · {t.shieldTip[state]}
          </span>
        </span>
      ))}
    </div>
  )
}
