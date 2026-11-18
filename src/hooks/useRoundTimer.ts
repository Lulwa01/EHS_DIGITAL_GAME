import { useCallback, useEffect, useRef, useState } from 'react'

interface Options {
  totalMs: number
  graceMs: number
  paused: boolean
  /** onTick fires once per whole second at or below this many seconds. */
  tickFrom: number
  onStart?: () => void
  onTick?: (secondsLeft: number) => void
  onExpire: () => void
}

/**
 * One countdown for the whole round. Nothing counts during the grace period;
 * after that the clock runs, except while `paused`.
 */
export function useRoundTimer({ totalMs, graceMs, paused, tickFrom, onStart, onTick, onExpire }: Options) {
  const state = useRef({ grace: graceMs, remaining: totalMs, done: false, lastTick: -1 })
  const [view, setView] = useState({ started: graceMs <= 0, remaining: totalMs })

  // Latest props, read by the interval so it never sees stale values.
  const live = useRef({ paused, tickFrom, onStart, onTick, onExpire })
  useEffect(() => {
    live.current = { paused, tickFrom, onStart, onTick, onExpire }
  })

  useEffect(() => {
    let last = performance.now()
    const id = window.setInterval(() => {
      const now = performance.now()
      const dt = now - last
      last = now
      const s = state.current
      const l = live.current
      if (s.done || l.paused) return

      if (s.grace > 0) {
        s.grace -= dt
        if (s.grace > 0) return
        s.remaining += s.grace // carry the overshoot into the round
        s.grace = 0
        l.onStart?.()
      } else {
        s.remaining -= dt
      }

      const secs = Math.ceil(s.remaining / 1000)
      if (secs > 0 && secs <= l.tickFrom && secs !== s.lastTick) {
        s.lastTick = secs
        l.onTick?.(secs)
      }
      if (s.remaining <= 0) {
        s.remaining = 0
        s.done = true
        l.onExpire()
      }
      setView({ started: true, remaining: s.remaining })
    }, 100)
    return () => window.clearInterval(id)
  }, [])

  const addTime = useCallback((ms: number) => {
    const s = state.current
    if (s.done) return
    s.remaining += ms
    s.lastTick = -1
    setView((v) => ({ ...v, remaining: s.remaining }))
  }, [])

  /** Freezes the clock and returns the time left. */
  const stop = useCallback(() => {
    state.current.done = true
    return state.current.remaining
  }, [])

  return { started: view.started, remaining: view.remaining, addTime, stop }
}
