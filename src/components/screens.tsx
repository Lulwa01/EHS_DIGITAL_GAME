import { useState } from 'react'
import { AUDIENCES, type Audience, type Imposter, type Question } from '../data/types'
import { IMPOSTERS } from '../data/imposters'
import { ImposterArt } from './ImposterArt'
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
  imposter: Imposter
  questions: Question[]
  onFinish: (score: number) => void
}

export function QuizScreen({ imposter, questions, onFinish }: QuizProps) {
  const [index, setIndex] = useState(0)
  const [picked, setPicked] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  // Shuffle option order once per round so the right answer isn't always in the same spot.
  const [orders] = useState(() => questions.map(() => shuffle([0, 1, 2, 3])))
  const q = questions[index]
  const answered = picked !== null

  function pick(i: number) {
    if (answered) return
    setPicked(i)
    if (i === q.answer) {
      sound.play('correct')
      setScore((s) => s + 1)
    } else {
      sound.play('wrong')
    }
  }

  function next() {
    sound.play('click')
    if (index + 1 < questions.length) {
      setIndex(index + 1)
      setPicked(null)
    } else {
      onFinish(score)
    }
  }

  return (
    <section className="screen quiz">
      <div className="counter" aria-label={`Question ${index + 1} of ${questions.length}`}>
        <span>{index + 1}</span>
        <span className="counter-dim"> / {questions.length}</span>
      </div>

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
            <button key={i} className={`option${state}`} onClick={() => pick(i)} disabled={answered && i !== picked && i !== q.answer}>
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

      <button className="btn-primary" disabled={!answered} onClick={next}>
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
  onPlayAgain: () => void
  onHome: () => void
}

export function ResultScreen({ name, imposter, score, total, onPlayAgain, onHome }: ResultProps) {
  const result =
    score === total
      ? { title: 'Good Game', tone: 'win', text: `Perfect score, ${name}! You beat ${imposter.name} and showed real cybersecurity awareness.` }
      : score >= 2
        ? { title: 'Well Played', tone: 'win', text: `Nice work, ${name}! You beat ${imposter.name}. Just one slip, so check that tip and you'll be unstoppable.` }
        : score === 1
          ? { title: 'Nice Try', tone: 'mid', text: `You stopped ${imposter.name} once, ${name}. Brush up on the warning signs and try again!` }
          : { title: 'Game Over', tone: 'lose', text: `${imposter.name} tricked you this time, ${name}. Every scammer leaves clues. Play again and spot them!` }

  return (
    <section className="screen center">
      <h1 className={`display title-md tone-${result.tone}`}>{result.title}</h1>
      <div className="card score-box">
        {score} / {total}
      </div>
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
