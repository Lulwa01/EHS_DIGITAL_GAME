import { useEffect, useRef } from 'react'
import { useT } from '../i18n'
import { ShieldMeter } from './ShieldMeter'

export function HelpDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const t = useT()
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
        <button className="help-x" onClick={onClose} aria-label={t.closeHelp}>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="m6 6 12 12M18 6 6 18" />
          </svg>
        </button>
        <h2 id="help-title" className="display help-title">
          {t.helpTitle}
        </h2>
        <ol className="help-steps">
          {t.helpSteps.map((s, i) => (
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
          {t.gotIt}
        </button>
      </div>
    </dialog>
  )
}
