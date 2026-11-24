export type Audience = 'kids' | 'adults'
export type Difficulty = 'easy' | 'normal' | 'hard'

export interface Question {
  /** Story setup shown above the quote. */
  scenario: string
  /** Optional message the imposter sends, shown in italics. */
  quote?: string
  /** The actual question, e.g. "What should Ali do?" */
  prompt: string
  /** Exactly four options. */
  options: [string, string, string, string]
  /** Index (0-3) of the correct option. */
  answer: number
  /** Short lesson shown after the player answers. */
  tip: string
}

export interface Imposter {
  difficulty: Difficulty
  name: string
  /** How many people this imposter has scammed, shown on the card. */
  scammed: number
  /** Image URL. Leave undefined to use the placeholder silhouette. */
  image?: string
  /** Gentle idle animation for the image: sway side to side, bob up and down, or hover like it's flying. */
  motion?: 'sway' | 'bob' | 'hover'
}

export const AUDIENCES: { id: Audience; label: string }[] = [
  { id: 'kids', label: 'Kids Level' },
  { id: 'adults', label: 'Adults Level' },
]
