import { DANGER_SECONDS, formatTime } from '../data/timer'

export interface Bonus {
  id: number
  seconds: number
  label: string
}

interface Props {
  visible: boolean
  remainingMs: number
  totalMs: number
  paused: boolean
  /** True when the player paused the clock by tapping the bar. */
  held: boolean
  /** Tapping the bar toggles the pause. Undefined when it can't be toggled (e.g. after answering). */
  onToggle?: () => void
  bonus: Bonus | null
  onBonusDone: () => void
}

export function RoundTimer({ visible, remainingMs, totalMs, paused, held, onToggle, bonus, onBonusDone }: Props) {
  const pct = Math.min(100, (remainingMs / totalMs) * 100)
  const secs = Math.ceil(remainingMs / 1000)
  const level = secs <= DANGER_SECONDS ? 'danger' : pct <= 50 ? 'warn' : 'ok'

  return (
    <div className="timer">
      {visible && (
        <div
          className={`timer-inner is-${level}${paused ? ' is-paused' : ''}${onToggle ? ' is-toggleable' : ''}`}
          onClick={onToggle}
          role={onToggle ? 'button' : undefined}
          tabIndex={onToggle ? 0 : undefined}
          aria-pressed={onToggle ? held : undefined}
          aria-label={onToggle ? (held ? 'Resume timer' : 'Pause timer') : undefined}
          onKeyDown={
            onToggle
              ? (e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    onToggle()
                  }
                }
              : undefined
          }
        >
          <div className="timer-head">
            <span className="timer-label">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <circle cx="12" cy="13" r="8" />
                <path d="M12 9v4l2.5 2M9.5 2.5h5" />
              </svg>
              {paused ? 'Paused' : 'Time left'}
            </span>
            <span className="timer-time">{formatTime(remainingMs)}</span>
          </div>
          <div
            className="timer-track"
            role="progressbar"
            aria-label="Time left in this round"
            aria-valuemin={0}
            aria-valuemax={Math.ceil(totalMs / 1000)}
            aria-valuenow={secs}
          >
            <div className="timer-fill" style={{ width: `${pct}%` }} />
            {bonus && <span className="timer-flash" key={bonus.id} />}
          </div>
        </div>
      )}
      {bonus && (
        <span className="bonus-chip" key={bonus.id} onAnimationEnd={onBonusDone} role="status">
          ⚡ +{bonus.seconds}s {bonus.label}
        </span>
      )}
    </div>
  )
}
