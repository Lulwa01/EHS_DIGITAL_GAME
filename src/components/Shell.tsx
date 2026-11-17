import type { ReactNode } from 'react'

interface Props {
  muted: boolean
  onHome: () => void
  onToggleSound: () => void
  children: ReactNode
}

export function Shell({ muted, onHome, onToggleSound, children }: Props) {
  return (
    <div className="shell">
      <header className="topbar">
        <button className="icon-btn" onClick={onHome} aria-label="Home">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round">
            <path d="M3.5 11 12 3.5l8.5 7.5" />
            <path d="M5.5 9.5V20h4.5v-5.5a2 2 0 0 1 4 0V20h4.5V9.5" />
          </svg>
        </button>
        <button className="icon-btn" onClick={onToggleSound} aria-label={muted ? 'Unmute' : 'Mute'}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round">
            <path d="M4 9h3.5L12 5v14l-4.5-4H4z" />
            {muted ? (
              <path d="m16 9.5 5 5m0-5-5 5" />
            ) : (
              <>
                <path d="M15.5 9.5a3.5 3.5 0 0 1 0 5" />
                <path d="M18 7a7 7 0 0 1 0 10" />
              </>
            )}
          </svg>
        </button>
      </header>
      <main className="stage">
        {children}
      </main>
    </div>
  )
}
