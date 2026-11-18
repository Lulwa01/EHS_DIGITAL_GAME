import { useEffect, useRef } from 'react'
import { GRACE_SECONDS, LIGHTNING_BONUS_SECONDS, QUICK_BONUS_SECONDS } from '../data/timer'
import { ShieldMeter } from './ShieldMeter'

const STEPS: { title: string; text: string }[] = [
  { title: 'Pick your level', text: 'Choose Kids, Teens or Adults, then enter your name or a nickname.' },
  { title: 'Choose an imposter', text: 'Each imposter is a scammer. They get harder from left to right.' },
  { title: 'Spot the scam', text: 'Read each story and pick the safest thing to do. There are 5 questions.' },
  { title: 'Earn shields', text: 'Every right answer lights up a shield. Light all 5 to beat the imposter!' },
  {
    title: 'Beat the clock',
    text: `The timer starts after ${GRACE_SECONDS} seconds and stops while you read each tip. Tap the timer bar if you need a short break. If time runs out, the round ends.`,
  },
  {
    title: 'Be quick for a bonus',
    text: `Answer right fast to win extra time: +${LIGHTNING_BONUS_SECONDS}s for “Lightning fast!” or +${QUICK_BONUS_SECONDS}s for “Quick thinking!”`,
  },
]

export function HelpDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const d = ref.current
    if (!d) return
    if (open && !d.open) d.showModal()
    if (!open && d.open) d.close()
  }, [open])

  return (
    <dialog
      ref={ref}
      className="help"
      aria-labelledby="help-title"
      onClose={onClose}
      // Clicking the dark backdrop (outside the panel) closes it.
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="help-panel">
        <button className="help-x" onClick={onClose} aria-label="Close instructions">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="m6 6 12 12M18 6 6 18" />
          </svg>
        </button>
        <h2 id="help-title" className="display help-title">
          How to Play
        </h2>
        <ol className="help-steps">
          {STEPS.map((s, i) => (
            <li key={s.title}>
              <span className="help-num" aria-hidden="true">
                {i + 1}
              </span>
              <div>
                <strong>{s.title}</strong>
                <p>{s.text}</p>
                {i === 3 && (
                  <div className="help-shields" aria-hidden="true">
                    <ShieldMeter states={['earned', 'earned', 'earned', 'missed', 'upcoming']} />
                  </div>
                )}
              </div>
            </li>
          ))}
        </ol>
        <button className="btn-primary help-ok" onClick={onClose} autoFocus>
          Got it!
        </button>
      </div>
    </dialog>
  )
}
