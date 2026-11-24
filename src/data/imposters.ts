import type { Difficulty, Imposter } from './types'
import spiderImg from '../assets/imposters/spider.png'

/** The one imposter the player faces. Change the name, tagline and stats here. */
export const SPIDER = {
  name: 'Spinner the Scam Spider',
  tagline: 'He traps people with fake prizes and sneaky links.',
  scammed: 58_900,
  image: spiderImg,
  motion: 'bob',
} as const

export const LEVEL_LABEL: Record<Difficulty, string> = { easy: 'Easy', normal: 'Medium', hard: 'Hard' }

/** The spider at each difficulty (used by the quiz and results screens). */
export const IMPOSTERS: Imposter[] = (['easy', 'normal', 'hard'] as const).map((difficulty) => ({
  difficulty,
  name: SPIDER.name,
  scammed: SPIDER.scammed,
  image: SPIDER.image,
  motion: SPIDER.motion,
}))
