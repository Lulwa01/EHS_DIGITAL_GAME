import type { ReactNode } from 'react'
import { HelpDialog } from './HelpDialog'
const HOUSE = 'M12 3.6 3.4 11.2h2.4v7.6a1.4 1.4 0 0 0 1.4 1.4h9.6a1.4 1.4 0 0 0 1.4-1.4v-7.6h2.4Z'
const SPEAKER = 'M3.6 9.4h3.3l4.7-4v13.2l-4.7-4H3.6Z'

interface Props {
  muted: boolean
  helpOpen: boolean
  onHome: () => void
  onToggleSound: () => void
  onHelp: (open: boolean) => void
  children: ReactNode
}

export function Shell({ muted, helpOpen, onHome, onToggleSound, onHelp, children }: Props) {
  return (
    <div className="shell">
      <header className="topbar">
        <button className="icon-btn" onClick={onHome} aria-label="Home">
          <svg viewBox="0 0 24 24" aria-hidden="true" strokeLinejoin="round" strokeLinecap="round">
            {/* soft lavender outline, then white fill on top (same look as the shield tick) */}
            <path className="ico-edge" d={HOUSE} />
            <path className="ico-fill" d={HOUSE} />
            <rect x="10.2" y="14.2" width="3.6" height="5.6" rx="1.2" fill="#3a2380" />
          </svg>
        </button>
        <div className="topbar-right">
        <button className="icon-btn" onClick={() => onHelp(true)} aria-label="How to play" aria-haspopup="dialog">
          <svg viewBox="0 0 24 24" aria-hidden="true" strokeLinejoin="round" strokeLinecap="round">
            <path d="M8.6 8.8a3.4 3.4 0 1 1 5 3c-1 .55-1.6 1.2-1.6 2.3v.7" fill="none" stroke="#fff" strokeWidth="2.6" />
            <circle cx="12" cy="18.6" r="1.6" fill="#fff" />
          </svg>
        </button>
        <button className={`icon-btn${muted ? ' is-muted' : ''}`} onClick={onToggleSound} aria-label={muted ? 'Unmute' : 'Mute'}>
          <svg viewBox="0 0 24 24" aria-hidden="true" strokeLinejoin="round" strokeLinecap="round">
            <path className="ico-edge" d={SPEAKER} />
            <path className="ico-fill" d={SPEAKER} />
            {muted ? (
              <g className="ico-x">
                <path d="m16.2 9.6 4.6 4.8m0-4.8-4.6 4.8" />
              </g>
            ) : (
              <g className="ico-waves">
                <path d="M15.6 9.4a3.6 3.6 0 0 1 0 5.2" />
                <path d="M18.3 6.9a7.2 7.2 0 0 1 0 10.2" />
              </g>
            )}
          </svg>
        </button>
        </div>
      </header>
      <HelpDialog open={helpOpen} onClose={() => onHelp(false)} />
      <main className="stage">
        {children}
      </main>
    </div>
  )
}
