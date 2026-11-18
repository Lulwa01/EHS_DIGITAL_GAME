import { useId, type CSSProperties } from 'react'

export type ShieldState = 'earned' | 'missed' | 'current' | 'upcoming'

const TIP: Record<ShieldState, string> = {
  earned: 'Scam blocked!',
  missed: 'The imposter got through',
  current: 'In progress',
  upcoming: 'Not played yet',
}

function ShieldIcon() {
  const id = useId()
  return (
    <svg viewBox="0 0 100 112" aria-hidden="true">
      <defs>
        <linearGradient id={`${id}-fill`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#33198f" />
          <stop offset="0.55" stopColor="#6a32d4" />
          <stop offset="1" stopColor="#cdb8f5" />
        </linearGradient>
      </defs>
      <path
        d="M50 4C64 12 79 15 94 15V50C94 79 74 97 50 107C26 97 6 79 6 50V15C21 15 36 12 50 4Z"
        fill={`url(#${id}-fill)`}
        stroke="#a796e0"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path d="M30 57L45 72L72 41" fill="none" stroke="#c9c4da" strokeWidth="17" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M30 57L45 72L72 41" fill="none" stroke="#fff" strokeWidth="11" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

interface ShieldMeterProps {
  states: ShieldState[]
  size?: 'md' | 'lg'
  /** Delay each shield's light-up so they fill in one after another (results screen). */
  staggerMs?: number
}

export function ShieldMeter({ states, size = 'md', staggerMs = 0 }: ShieldMeterProps) {
  const earned = states.filter((s) => s === 'earned').length
  return (
    <div className={`shields shields-${size}`} role="group" aria-label={`${earned} of ${states.length} shields earned`}>
      {states.map((state, i) => (
        <span
          key={i}
          className={`shield is-${state}`}
          tabIndex={0}
          role="img"
          aria-label={`Question ${i + 1}: ${TIP[state]}`}
          style={{ '--delay': `${i * staggerMs}ms` } as CSSProperties}
        >
          <ShieldIcon />
          <span className="shield-tip" aria-hidden="true">
            Q{i + 1} · {TIP[state]}
          </span>
        </span>
      ))}
    </div>
  )
}
