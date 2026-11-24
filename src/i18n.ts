import { createContext, useContext } from 'react'
import type { Audience, Difficulty } from './data/types'
import type { ShieldState } from './components/ShieldMeter'
import { GRACE_SECONDS, LIGHTNING_BONUS_SECONDS, QUICK_BONUS_SECONDS } from './data/timer'

export type Lang = 'en' | 'ar'

export const LangContext = createContext<Lang>('en')
export const useLang = () => useContext(LangContext)
/** All UI text for the current language. */
export const useT = () => STRINGS[useLang()]

type Tone = 'win' | 'mid' | 'lose'

const en = {
  // Top bar
  home: 'Home',
  howToPlay: 'How to play',
  mute: 'Mute',
  unmute: 'Unmute',
  switchLang: 'التبديل إلى العربية – Switch to Arabic',

  // Home
  logoAlt: 'Cyber Heroes',
  tagline: 'Test your cybersecurity knowledge, beat the imposter and stay cyber-safe.\nChoose your level to start!',
  audience: { kids: 'Kids Level', adults: 'Adults Level' } as Record<Audience, string>,
  start: 'Start',

  // Name
  enterName: 'Enter your name',
  namePlaceholder: 'Enter your name or a nickname',
  nameAria: 'Your name or nickname',
  next: 'Next',

  // Imposter / difficulty
  chooseDifficulty: 'Choose Difficulty Level',
  spiderName: 'Spinner the Scam Spider',
  spiderTagline: 'He traps people with fake prizes and sneaky links.',
  peopleScammed: 'people scammed. Don’t be one of them!',
  chooseLevel: 'Choose a level',
  level: { easy: 'Easy', normal: 'Medium', hard: 'Hard' } as Record<Difficulty, string>,

  // Quiz
  questionOf: (n: number, total: number) => `Question ${n} of ${total}`,
  answers: 'Answers',
  quoted: (s: string) => `“${s}”`,
  timesUp: 'Time’s up!',
  correct: 'Correct! ',
  notQuite: 'Not quite. ',
  seeResults: 'See Results',
  lightning: 'Lightning fast!',
  quick: 'Quick thinking!',
  bonus: (s: number, label: string) => `⚡ +${s}s ${label}`,

  // Timer
  paused: 'Paused',
  timeLeft: 'Time left',
  pauseTimer: 'Pause timer',
  resumeTimer: 'Resume timer',
  timeLeftInRound: 'Time left in this round',

  // Shields
  shieldTip: {
    earned: 'Scam blocked!',
    missed: 'The imposter got through',
    current: 'In progress',
    upcoming: 'Not played yet',
  } as Record<ShieldState, string>,
  shieldShort: (n: number) => `Q${n}`,
  shieldAria: (n: number, tip: string) => `Question ${n}: ${tip}`,
  shieldsEarned: (earned: number, total: number) => `${earned} of ${total} shields earned`,

  // Results (index = score out of 5)
  results: [
    { title: 'Game Over', tone: 'lose', text: (n: string, imp: string) => `${imp} tricked you this time, ${n}. Every scammer leaves clues. Play again and spot them!` },
    { title: 'Keep Going', tone: 'mid', text: (n: string, imp: string) => `You stopped ${imp} once, ${n}. That's a start! Brush up on the warning signs and try again.` },
    { title: 'Nice Try', tone: 'mid', text: (n: string, imp: string) => `You stopped ${imp} twice, ${n}. Review the tips you missed and you'll catch more next time!` },
    { title: 'Well Played', tone: 'win', text: (n: string, imp: string) => `You beat ${imp}, ${n}! A few tricks got past you, so review those tips to sharpen up.` },
    { title: 'Great Job', tone: 'win', text: (n: string, imp: string) => `Nice work, ${n}! You beat ${imp}. Just one slip, so check that tip and you'll be unstoppable.` },
    { title: 'Good Game', tone: 'win', text: (n: string, imp: string) => `Perfect score, ${n}! You beat ${imp} and showed real cybersecurity awareness.` },
  ] as { title: string; tone: Tone; text: (name: string, imposter: string) => string }[],
  timeRanOut: '⏱ Time ran out',
  timeLeftOnClock: (t: string) => `⏱ ${t} left on the clock`,
  playAgain: 'Play Again',

  // Help
  helpTitle: 'How to Play',
  closeHelp: 'Close instructions',
  gotIt: 'Got it!',
  helpSteps: [
    { title: 'Pick your level', text: 'Choose Kids or Adults, then enter your name or a nickname.' },
    { title: 'Meet the imposter', text: 'Meet the scam spider, then pick difficulty level: easy, medium, or hard.' },
    { title: 'Spot the scam', text: 'Read each scenario and pick the safest thing to do. There are 5 questions per round.' },
    { title: 'Earn shields', text: 'Every right answer lights up a shield. Light all 5 to beat the imposter!' },
    {
      title: 'Beat the clock',
      text: `The timer starts after ${GRACE_SECONDS} seconds and stops while you read each tip. If time runs out, the round ends.`,
    },
    {
      title: 'Be quick for a bonus',
      text: `Answer right fast to win extra time: +${LIGHTNING_BONUS_SECONDS}s for “Lightning fast!” or +${QUICK_BONUS_SECONDS}s for “Quick thinking!”`,
    },
  ],
}

const ar: typeof en = {
  // Top bar
  home: 'الرئيسية',
  howToPlay: 'طريقة اللعب',
  mute: 'كتم الصوت',
  unmute: 'تشغيل الصوت',
  switchLang: 'Switch to English – التبديل إلى الإنجليزية',

  // Home
  logoAlt: 'أبطال السايبر',
  tagline: 'اختبر معلوماتك في الأمن السيبراني، واهزم المحتال، وابقَ آمنًا على الإنترنت.\nاختر مستواك لتبدأ!',
  audience: { kids: 'مستوى الأطفال', adults: 'مستوى الكبار' },
  start: 'ابدأ',

  // Name
  enterName: 'أدخل اسمك',
  namePlaceholder: 'أدخل اسمك أو لقبك',
  nameAria: 'اسمك أو لقبك',
  next: 'التالي',

  // Imposter / difficulty
  chooseDifficulty: 'اختر مستوى الصعوبة',
  spiderName: 'عنكبوت الاحتيال',
  spiderTagline: 'يوقع الناس في شباكه بجوائز وهمية وروابط مخادعة.',
  peopleScammed: 'شخصًا وقعوا ضحية احتياله. لا تكن واحدًا منهم!',
  chooseLevel: 'اختر مستوى',
  level: { easy: 'سهل', normal: 'متوسط', hard: 'صعب' },

  // Quiz
  questionOf: (n, total) => `السؤال ${n} من ${total}`,
  answers: 'الإجابات',
  quoted: (s) => `«${s}»`,
  timesUp: 'انتهى الوقت!',
  correct: 'إجابة صحيحة! ',
  notQuite: 'ليس تمامًا. ',
  seeResults: 'عرض النتيجة',
  lightning: 'سريع كالبرق!',
  quick: 'تفكير سريع!',
  bonus: (s, label) => `⚡ +${s} ث ${label}`,

  // Timer
  paused: 'متوقف مؤقتًا',
  timeLeft: 'الوقت المتبقي',
  pauseTimer: 'إيقاف المؤقت',
  resumeTimer: 'استئناف المؤقت',
  timeLeftInRound: 'الوقت المتبقي في هذه الجولة',

  // Shields
  shieldTip: {
    earned: 'تم صد الاحتيال!',
    missed: 'نجح المحتال في خداعك',
    current: 'قيد اللعب',
    upcoming: 'لم يُلعب بعد',
  },
  shieldShort: (n) => `س${n}`,
  shieldAria: (n, tip) => `السؤال ${n}: ${tip}`,
  shieldsEarned: (earned, total) => `${earned} من ${total} دروع`,

  // Results
  results: [
    { title: 'انتهت اللعبة', tone: 'lose', text: (n, imp) => `خدعك ${imp} هذه المرة يا ${n}. كل محتال يترك أدلة، العب مرة أخرى واكتشفها!` },
    { title: 'واصل المحاولة', tone: 'mid', text: (n, imp) => `أوقفت ${imp} مرة واحدة يا ${n}. إنها بداية! راجع علامات التحذير وحاول مرة أخرى.` },
    { title: 'محاولة جيدة', tone: 'mid', text: (n, imp) => `أوقفت ${imp} مرتين يا ${n}. راجع النصائح التي فاتتك وستكتشف المزيد في المرة القادمة!` },
    { title: 'أحسنت اللعب', tone: 'win', text: (n, imp) => `هزمت ${imp} يا ${n}! فاتتك بعض الحيل، فراجع تلك النصائح لتصبح أقوى.` },
    { title: 'عمل رائع', tone: 'win', text: (n, imp) => `أحسنت يا ${n}! هزمت ${imp}. خطأ واحد فقط، راجع تلك النصيحة ولن يوقفك أحد.` },
    { title: 'لعبة رائعة', tone: 'win', text: (n, imp) => `نتيجة كاملة يا ${n}! هزمت ${imp} وأظهرت وعيًا حقيقيًا بالأمن السيبراني.` },
  ],
  timeRanOut: '⏱ انتهى الوقت',
  timeLeftOnClock: (t) => `⏱ تبقّى ${t} على الساعة`,
  playAgain: 'العب مجددًا',

  // Help
  helpTitle: 'طريقة اللعب',
  closeHelp: 'إغلاق التعليمات',
  gotIt: 'مستعد!',
  helpSteps: [
    { title: 'اختر مستواك', text: 'اختر مستوى الأطفال أو الكبار، ثم أدخل اسمك أو لقبك.' },
    { title: 'تعرّف على المحتال', text: 'تعرّف على عنكبوت الاحتيال، ثم اختر مستوى الصعوبة: سهل أو متوسط أو صعب.' },
    { title: 'اكتشف الاحتيال', text: 'اقرأ كل موقف واختر التصرف الأكثر أمانًا. هناك 5 أسئلة في كل جولة.' },
    { title: 'اجمع الدروع', text: 'كل إجابة صحيحة تضيء درعًا. أضئ الدروع الخمسة لتهزم المحتال!' },
    {
      title: 'سابق الوقت',
      text: `يبدأ المؤقت بعد ${GRACE_SECONDS} ثوانٍ ويتوقف أثناء قراءة كل نصيحة. إذا انتهى الوقت تنتهي الجولة.`,
    },
    {
      title: 'كن سريعًا لتربح وقتًا',
      text: `أجب بسرعة وبشكل صحيح لتربح وقتًا إضافيًا: +${LIGHTNING_BONUS_SECONDS} ث لـ«سريع كالبرق!» أو +${QUICK_BONUS_SECONDS} ث لـ«تفكير سريع!»`,
    },
  ],
}

export const STRINGS: Record<Lang, typeof en> = { en, ar }
