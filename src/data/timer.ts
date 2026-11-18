import type { Audience, Difficulty } from './types'

/** Seconds before the timer bar appears and starts counting. */
export const GRACE_SECONDS = 10

/**
 * Total seconds for the whole round (all 5 questions), counted after the grace period.
 * The clock pauses while the player reads the feedback after each answer.
 * More time for kids and easier imposters, less for adults and harder ones.
 */
export const ROUND_SECONDS: Record<Audience, Record<Difficulty, number>> = {
  kids: { easy: 200, normal: 175, hard: 150 },
  teens: { easy: 150, normal: 135, hard: 115 },
  adults: { easy: 125, normal: 110, hard: 90 },
}

/**
 * Speed bonus for a correct answer, based on how many seconds it took after the
 * question appeared. Kids get more relaxed cut-offs since they read slower.
 */
export const SPEED_BONUS: Record<Audience, { lightning: number; quick: number }> = {
  kids: { lightning: 14, quick: 24 },
  teens: { lightning: 10, quick: 18 },
  adults: { lightning: 10, quick: 18 },
}
export const LIGHTNING_BONUS_SECONDS = 10
export const QUICK_BONUS_SECONDS = 5

/** At or under this many seconds the bar turns red, pulses and ticks. */
export const DANGER_SECONDS = 10

/** 75000 -> "1:15" */
export const formatTime = (ms: number) => {
  const s = Math.max(0, Math.ceil(ms / 1000))
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`
}
