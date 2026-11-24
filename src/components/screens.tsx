import { useEffect, useRef, useState } from 'react'
import { AUDIENCES, type Audience, type Imposter, type Question } from '../data/types'
import { IMPOSTERS, SPIDER } from '../data/imposters'
import { useLang, useT } from '../i18n'
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
import titleLogo from '../assets/title-logo.png'
import titleLogoAr from '../assets/title-logo-ar.png'
/* ---------- Home: choose audience ---------- */

export function HomeScreen({ onStart }: { onStart: (a: Audience) => void }) {
  const [audience, setAudience] = useState<Audience | null>(null)
  const lang = useLang()
  const t = useT()
  return (
    <section className="screen center home">
      <h1 className={`title-logo${lang === 'ar' ? ' is-ar' : ''}`}>
        <img src={lang === 'ar' ? titleLogoAr : titleLogo} alt={t.logoAlt} draggable={false} />
      </h1>
      <p className="lead">{t.tagline}</p>
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
            {t.audience[a.id]}
          </button>
        ))}
      </div>
      <button className="btn-primary" disabled={!audience} onClick={() => audience && onStart(audience)}>
        {t.start}
      </button>
    </section>
  )
}

/* ---------- Name entry ---------- */

export function NameScreen({ initial, onNext }: { initial: string; onNext: (name: string) => void }) {
  const [name, setName] = useState(initial)
  const t = useT()
  const trimmed = name.trim()
  return (
    <form
      className="screen center name-screen"
      onSubmit={(e) => {
        e.preventDefault()
        if (trimmed) onNext(trimmed)
      }}
    >
      <h1 className="display title-md">{t.enterName}</h1>
      <input
        className="text-input"
        value={name}
        maxLength={20}
        autoFocus
        dir="auto"
        placeholder={t.namePlaceholder}
        aria-label={t.nameAria}
        onChange={(e) => setName(e.target.value)}
      />
      <button className="btn-primary" type="submit" disabled={!trimmed}>
        {t.next}
      </button>
    </form>
  )
}

/* ---------- Choose an imposter: meet the spider, then pick a level ---------- */

interface ImposterScreenProps {
  audience: Audience
  onSelect: (imp: Imposter) => void
}

export function ImposterScreen({ audience, onSelect }: ImposterScreenProps) {
  const t = useT()
  return (
    <section className="screen center">
      <h1 className="display title-md">{t.chooseDifficulty}</h1>

      <article className="card villain">
        <div className="villain-art">
          <img src={SPIDER.image} alt={t.spiderName} className={`idle-${SPIDER.motion}`} draggable={false} />
        </div>
        <div className="villain-info">
          <h2 className="villain-name">{t.spiderName}</h2>
          <p className="villain-tagline">{t.spiderTagline}</p>
          <p className="scammed">
            <strong>{SPIDER.scammed.toLocaleString('en-US')}</strong> {t.peopleScammed}
          </p>

          <div className="levels" role="group" aria-label={t.chooseLevel}>
            {IMPOSTERS.map((imp) => (
              <button key={imp.difficulty} className={`level badge-${imp.difficulty}`} onClick={() => onSelect(imp)}>
                <span>{t.level[imp.difficulty]}</span>
                <span className="level-time">⏱ {formatTime(ROUND_SECONDS[audience][imp.difficulty] * 1000)}</span>
              </button>
            ))}
          </div>
        </div>
      </article>
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
  const t = useT()
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
  const [orders] = useState(() => questions.map((q) => shuffle(q.options.map((_, i) => i))))
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
        ? { seconds: LIGHTNING_BONUS_SECONDS, label: t.lightning }
        : secs <= limits.quick
          ? { seconds: QUICK_BONUS_SECONDS, label: t.quick }
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
      <p className="sr-only" aria-live="polite">{t.questionOf(index + 1, questions.length)}</p>

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
          <h2 className="display tone-lose">{t.timesUp}</h2>
        </div>
      )}

      <article className="card scenario" key={index}>
        <ImposterArt imposter={imposter} />
        <div className="scenario-text">
          <p>{q.scenario}</p>
          {q.quote && <p className="quote">{t.quoted(q.quote)}</p>}
          <p className="prompt">{q.prompt}</p>
        </div>
      </article>

      <div className="options" role="group" aria-label={t.answers}>
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
            <strong>{picked === q.answer ? t.correct : t.notQuite}</strong>
            {q.tip}
          </>
        )}
      </p>

      <button className="btn-primary" disabled={!answered || timeUp} onClick={next}>
        {index + 1 < questions.length ? t.next : t.seeResults}
      </button>
    </section>
  )
}

/* ---------- Result ---------- */

interface ResultProps {
  name: string
  score: number
  total: number
  timeLeftMs: number
  onPlayAgain: () => void
  onHome: () => void
}

export function ResultScreen({ name, score, total, timeLeftMs, onPlayAgain, onHome }: ResultProps) {
  const t = useT()
  // One title per score (every level has 5 questions). Texts live in i18n.ts.
  const result = t.results[Math.round((score / Math.max(total, 1)) * 5)]

  return (
    <section className="screen center result-screen">
      <h1 className={`display title-md tone-${result.tone}`}>{result.title}</h1>
      <div className="card score-box">
        <ShieldMeter
          size="lg"
          staggerMs={220}
          colorByResult
          states={Array.from({ length: total }, (_, i) => (i < score ? 'earned' : 'missed'))}
        />
      </div>
      <p className={`time-chip${timeLeftMs <= 0 ? ' is-out' : ''}`}>
        {timeLeftMs <= 0 ? t.timeRanOut : t.timeLeftOnClock(formatTime(timeLeftMs))}
      </p>
      <p className="lead narrow">{result.text(name, t.spiderName)}</p>
      <div className="row">
        <button className="btn-primary" onClick={onPlayAgain}>
          {t.playAgain}
        </button>
        <button className="btn-outline" onClick={onHome}>
          {t.home}
        </button>
      </div>
    </section>
  )
}
