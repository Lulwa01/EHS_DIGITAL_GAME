import type { Imposter } from './types'

// When the character art is ready, put the images in src/assets/ and set `image`:
//   import phishyImg from '../assets/imposters/phishy.png'
//   { ..., image: phishyImg }
export const IMPOSTERS: Imposter[] = [
  { difficulty: 'easy', name: 'Phishy Phil', scammed: 128 },
  { difficulty: 'normal', name: 'Captain Clickbait', scammed: 2_450 },
  { difficulty: 'hard', name: 'The Shadow Admin', scammed: 58_900 },
]
