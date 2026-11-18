import type { Imposter } from './types'
import antImg from '../assets/imposters/ant.png'
import spiderImg from '../assets/imposters/spider.png'
import mosquitoImg from '../assets/imposters/mosquito.png'

export const IMPOSTERS: Imposter[] = [
  { difficulty: 'easy', name: 'Phishy Phil', scammed: 128, image: antImg, motion: 'sway' },
  { difficulty: 'normal', name: 'Captain Clickbait', scammed: 2_450, image: spiderImg, motion: 'bob' },
  { difficulty: 'hard', name: 'The Shadow Admin', scammed: 58_900, image: mosquitoImg, motion: 'hover' },
]
