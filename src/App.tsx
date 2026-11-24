import { useEffect, useState } from 'react'
import { Shell } from './components/Shell'
import { HomeScreen, ImposterScreen, NameScreen, QuizScreen, ResultScreen } from './components/screens'
import { QUESTIONS } from './data/questions'
import { QUESTIONS_AR } from './data/questions.ar'
import type { Audience, Imposter } from './data/types'
import { LangContext, type Lang } from './i18n'
import { sound } from './audio/sound'

type Screen = 'home' | 'name' | 'imposter' | 'quiz' | 'result'

export default function App() {
  const [screen, setScreen] = useState<Screen>('home')
  const [lang, setLang] = useState<Lang>('en')
  const [audience, setAudience] = useState<Audience>('kids')
  const [name, setName] = useState('')
  const [imposter, setImposter] = useState<Imposter | null>(null)
  const [score, setScore] = useState(0)
  const [timeLeftMs, setTimeLeftMs] = useState(0)
  const [round, setRound] = useState(0) // remounts the quiz on replay
  const [muted, setMuted] = useState(false)
  const [helpOpen, setHelpOpen] = useState(false)

  // Browsers only allow audio after a user gesture, so start the music on the first interaction.
  useEffect(() => {
    const start = () => sound.startMusic()
    window.addEventListener('pointerdown', start, { once: true })
    window.addEventListener('keydown', start, { once: true })
    return () => {
      window.removeEventListener('pointerdown', start)
      window.removeEventListener('keydown', start)
    }
  }, [])

  // Arabic flips the whole page right-to-left and switches fonts (see :root[lang='ar'] in index.css).
  useEffect(() => {
    document.documentElement.lang = lang
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'
  }, [lang])

  const go = (s: Screen) => {
    sound.play('click')
    setScreen(s)
  }

  const bank = lang === 'ar' ? QUESTIONS_AR : QUESTIONS
  const questions = imposter ? bank[audience][imposter.difficulty] : []

  return (
    <LangContext.Provider value={lang}>
      <Shell
        muted={muted}
        helpOpen={helpOpen}
        isHome={screen === 'home'}
        onHelp={(open) => {
          sound.play('click')
          setHelpOpen(open)
        }}
        onHome={() => go('home')}
        onToggleLang={() => {
          sound.play('select')
          setLang((l) => (l === 'en' ? 'ar' : 'en'))
        }}
        onToggleSound={() => {
          sound.setMuted(!muted)
          setMuted(!muted)
          if (muted) sound.play('select')
        }}
      >
        {screen === 'home' && (
          <HomeScreen
            onStart={(a) => {
              setAudience(a)
              go('name')
            }}
          />
        )}
        {screen === 'name' && (
          <NameScreen
            initial={name}
            onNext={(n) => {
              setName(n)
              go('imposter')
            }}
          />
        )}
        {screen === 'imposter' && (
          <ImposterScreen
            audience={audience}
            onSelect={(imp) => {
              setImposter(imp)
              setRound((r) => r + 1)
              go('quiz')
            }}
          />
        )}
        {screen === 'quiz' && imposter && (
          <QuizScreen
            key={round}
            audience={audience}
            imposter={imposter}
            questions={questions}
            frozen={helpOpen}
            onFinish={(s, left) => {
              setScore(s)
              setTimeLeftMs(left)
              setScreen('result')
              sound.play(s === 0 ? 'lose' : 'win')
            }}
          />
        )}
        {screen === 'result' && imposter && (
          <ResultScreen
            name={name}
            score={score}
            total={questions.length}
            timeLeftMs={timeLeftMs}
            onPlayAgain={() => go('imposter')}
            onHome={() => go('home')}
          />
        )}
      </Shell>
    </LangContext.Provider>
  )
}
