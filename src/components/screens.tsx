import { useEffect, useRef, useState } from 'react'
import { AUDIENCES, type Audience, type Imposter, type Question } from '../data/types'
import { IMPOSTERS } from '../data/imposters'
import {
  DANGER_SECONDS,
  formatTime,
  GRACE_SECONDS,
  LIGHTNING_BONUS_SECONDS,
  QUICK_BONUS_SECONDS,
  ROUND_SECONDS,
  SPEED_BONUS,
} from '../data/timer'
import { useRoundTimer } from '../hooks/useRoundTimer'
import { ImposterArt } from './ImposterArt'
import { RoundTimer, type Bonus } from './RoundTimer'
import { ShieldMeter, type ShieldState } from './ShieldMeter'
import { sound } from '../audio/sound'
/* ---------- Home: choose audience ---------- */

export function HomeScreen({ onStart }: { onStart: (a: Audience) => void }) {
  const [audience, setAudience] = useState<Audience | null>(null)
  return (
    <section className="screen center">
      <h1 className="display title-xl">Cyber Sleuth</h1>
      <p className="lead">Beat the imposter and stay cyber-safe. Choose your level to start!</p>
      <div className="row">
        {AUDIENCES.map((a) => (
          <button
            key={a.id}
            className={`btn-outline${audience === a.id ? ' is-selected' : ''}`}
            aria-pressed={audience === a.id}
            onClick={() => {
              sound.play('select')
              setAudience(a.id)
            }}
          >
            {a.label}
          </button>
        ))}
      </div>
      <button className="btn-primary" disabled={!audience} onClick={() => audience && onStart(audience)}>
        Start
      </button>
    </section>
  )
}

/* ---------- Name entry ---------- */

export function NameScreen({ initial, onNext }: { initial: string; onNext: (name: string) => void }) {
  const [name, setName] = useState(initial)
  const trimmed = name.trim()
  return (
    <form
      className="screen center"
      onSubmit={(e) => {
        e.preventDefault()
        if (trimmed) onNext(trimmed)
      }}
    >
      <h1 className="display title-md">Enter your name</h1>
      <input
        className="text-input"
        value={name}
        maxLength={20}
        autoFocus
        placeholder="Enter your name or a nickname"
        aria-label="Your name or nickname"
        onChange={(e) => setName(e.target.value)}
      />
      <button className="btn-primary" type="submit" disabled={!trimmed}>
        Next
      </button>
    </form>
  )
}

/* ---------- Choose an imposter (difficulty) ---------- */

const LABEL = { easy: 'Easy', normal: 'Normal', hard: 'Hard' } as const

export function ImposterScreen({ onSelect }: { onSelect: (imp: Imposter) => void }) {
  return (
    <section className="screen center">
      <h1 className="display title-md">Challenge an Imposter</h1>
      <p className="lead">Select an imposter to defeat. Difficulty goes from left to right.</p>
      <div className="cards">
        {IMPOSTERS.map((imp) => (
          <article key={imp.difficulty} className="card imposter-card">
            <span className={`badge badge-${imp.difficulty}`}>{LABEL[imp.difficulty]}</span>
            <ImposterArt imposter={imp} />
            <h2 className="imposter-name">{imp.name}</h2>
            <p className="scammed">
              <strong>{imp.scammed.toLocaleString()}</strong> people scammed
            </p>
            <button className="btn-outline btn-sm" onClick={() => onSelect(imp)}>
              Select
            </button>
          </article>
        ))}
      </div>
    </section>
  )
}

/* ---------- Quiz ---------- */


function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

interface QuizProps {
  audience: Audience
  imposter: Imposter
  questions: Question[]
  /** True while the instructions popup is open: the clock stops. */
  frozen?: boolean
  /** timeLeftMs is 0 when the round ended because time ran out. */
  onFinish: (score: number, timeLeftMs: number) => void
}

export function QuizScreen({ audience, imposter, questions, frozen = false, onFinish }: QuizProps) {
  const [index, setIndex] = useState(0)
  const [picked, setPicked] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  // Per-question outcome: true = correct, false = wrong, null = not answered yet.
  const [results, setResults] = useState<(boolean | null)[]>(() => questions.map(() => null))
  const [timeUp, setTimeUp] = useState(false)
  // Player tapped the timer bar to stop the clock (e.g. a struggling player needs a moment).
  const [held, setHeld] = useState(false)
  const [bonus, setBonus] = useState<Bonus | null>(null)
  // Shuffle option order once per round so the right answer isn't always in the same spot.
  const [orders] = useState(() => questions.map(() => shuffle([0, 1, 2, 3])))
  const q = questions[index]
  const answered = picked !== null
  const totalMs = ROUND_SECONDS[audience][imposter.difficulty] * 1000

  const timer = useRoundTimer({
    totalMs,
    graceMs: GRACE_SECONDS * 1000,
    paused: answered || timeUp || held || frozen,
    tickFrom: DANGER_SECONDS,
    onStart: () => sound.play('timerStart'),
    onTick: (s) => sound.play(s <= 5 ? 'tickUrgent' : 'tick'),
    onExpire: () => {
      setTimeUp(true)
      sound.play('timeUp')
    },
  })

  // When each question appeared, to measure answer speed.
  const questionStart = useRef(0)
  const bonusId = useRef(0)
  useEffect(() => {
    questionStart.current = performance.now()
  }, [index])

  // After "Time's up!" has been on screen for a moment, go to the results.
  useEffect(() => {
    if (!timeUp) return
    const id = window.setTimeout(() => onFinish(score, 0), 2200)
    return () => window.clearTimeout(id)
  }, [timeUp, score, onFinish])

  // `at` is the click's timestamp (same clock as performance.now()).
  function pick(i: number, at: number) {
    if (answered || timeUp) return
    setPicked(i)
    setResults((r) => r.map((v, k) => (k === index ? i === q.answer : v)))
    if (i !== q.answer) {
      sound.play('wrong')
      return
    }
    sound.play('correct')
    setScore((s) => s + 1)

    // Speed bonus: fast correct answers earn extra time.
    const secs = (at - questionStart.current) / 1000
    const limits = SPEED_BONUS[audience]
    const earned =
      secs <= limits.lightning
        ? { seconds: LIGHTNING_BONUS_SECONDS, label: 'Lightning fast!' }
        : secs <= limits.quick
          ? { seconds: QUICK_BONUS_SECONDS, label: 'Quick thinking!' }
          : null
    if (earned) {
      timer.addTime(earned.seconds * 1000)
      bonusId.current += 1
      setBonus({ id: bonusId.current, ...earned })
      window.setTimeout(() => sound.play('bonus'), 280)
    }
  }

  function next() {
    sound.play('click')
    if (index + 1 < questions.length) {
      setIndex(index + 1)
      setPicked(null)
      setHeld(false)
    } else {
      onFinish(score, Math.max(1, timer.stop()))
    }
  }

  return (
    <section className="screen quiz">
      <ShieldMeter
        states={results.map<ShieldState>((r, i) =>
          r === true ? 'earned' : r === false ? 'missed' : i === index && !timeUp ? 'current' : 'upcoming',
        )}
      />
      <p className="sr-only" aria-live="polite">{`Question ${index + 1} of ${questions.length}`}</p>

      <RoundTimer
        visible={timer.started}
        remainingMs={timer.remaining}
        totalMs={totalMs}
        paused={(answered || held || frozen) && !timeUp}
        held={held}
        onToggle={
          answered || timeUp
            ? undefined
            : () => {
                sound.play('click')
                setHeld((h) => !h)
              }
        }
        bonus={bonus}
        onBonusDone={() => setBonus(null)}
      />

      {timeUp && (
        <div className="timeup" role="alert">
          <h2 className="display tone-lose">Time’s up!</h2>
        </div>
      )}

      <article className="card scenario" key={index}>
        <ImposterArt imposter={imposter} />
        <div className="scenario-text">
          <p>{q.scenario}</p>
          {q.quote && <p className="quote">“{q.quote}”</p>}
          <p className="prompt">{q.prompt}</p>
        </div>
      </article>

      <div className="options" role="group" aria-label="Answers">
        {orders[index].map((i) => {
          const opt = q.options[i]
          let state = ''
          if (answered && i === q.answer) state = ' is-correct'
          else if (answered && i === picked) state = ' is-wrong'
          else if (answered) state = ' is-dim'
          return (
            <button
              key={i}
              className={`option${state}`}
              onClick={(e) => pick(i, e.timeStamp)}
              disabled={timeUp || (answered && i !== picked && i !== q.answer)}
            >
              {opt}
            </button>
          )
        })}
      </div>

      <p className={`tip${answered ? ' is-visible' : ''}`} aria-live="polite">
        {answered && (
          <>
            <strong>{picked === q.answer ? 'Correct! ' : 'Not quite. '}</strong>
            {q.tip}
          </>
        )}
      </p>

      <button className="btn-primary" disabled={!answered || timeUp} onClick={next}>
        {index + 1 < questions.length ? 'Next' : 'See Results'}
      </button>
    </section>
  )
}

/* ---------- Result ---------- */

interface ResultProps {
  name: string
  imposter: Imposter
  score: number
  total: number
  timeLeftMs: number
  onPlayAgain: () => void
  onHome: () => void
}

export function ResultScreen({ name, imposter, score, total, timeLeftMs, onPlayAgain, onHome }: ResultProps) {
  const result =
    score === total
      ? { title: 'Good Game', tone: 'win', text: `Perfect score, ${name}! You beat ${imposter.name} and showed real cybersecurity awareness.` }
      : score === total - 1
        ? { title: 'Well Played', tone: 'win', text: `Nice work, ${name}! You beat ${imposter.name}. Just one slip, so check that tip and you'll be unstoppable.` }
        : score > total / 2
          ? { title: 'Well Played', tone: 'win', text: `You beat ${imposter.name}, ${name}! A few tricks got past you, so review those tips to sharpen up.` }
          : score >= 1
            ? { title: 'Nice Try', tone: 'mid', text: `You stopped ${imposter.name} ${score === 1 ? 'once' : `${score} times`}, ${name}. Brush up on the warning signs and try again!` }
            : { title: 'Game Over', tone: 'lose', text: `${imposter.name} tricked you this time, ${name}. Every scammer leaves clues. Play again and spot them!` }

  return (
    <section className="screen center">
      <h1 className={`display title-md tone-${result.tone}`}>{result.title}</h1>
      <div className="card score-box">
        <ShieldMeter
          size="lg"
          staggerMs={220}
          states={Array.from({ length: total }, (_, i) => (i < score ? 'earned' : 'missed'))}
        />
      </div>
      <p className={`time-chip${timeLeftMs <= 0 ? ' is-out' : ''}`}>
        {timeLeftMs <= 0 ? '⏱ Time ran out' : `⏱ ${formatTime(timeLeftMs)} left on the clock`}
      </p>
      <p className="lead narrow">{result.text}</p>
      <div className="row">
        <button className="btn-primary" onClick={onPlayAgain}>
          Play Again
        </button>
        <button className="btn-outline" onClick={onHome}>
          Home
        </button>
      </div>
    </section>
  )
}
