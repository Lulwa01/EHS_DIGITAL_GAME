/**
 * Game audio. Everything is synthesized with the Web Audio API so the game
 * works with no audio files. To use your own recordings instead, put MP3s in
 * /public/sounds and set the paths below. A file path always wins over the synth.
 */
export type Sfx =
  | 'click'
  | 'select'
  | 'correct'
  | 'wrong'
  | 'win'
  | 'lose'
  | 'timerStart'
  | 'tick'
  | 'tickUrgent'
  | 'bonus'
  | 'timeUp'

const FILES: { music: string | null } & Record<Sfx, string | null> = {
  music: null, // e.g. '/sounds/bg-music.mp3'
  click: null,
  select: null,
  correct: null,
  wrong: null,
  win: null,
  lose: null,
  timerStart: null, // timer bar appears after the grace period
  tick: null, // last 10 seconds
  tickUrgent: null, // last 5 seconds
  bonus: null, // speed bonus earned
  timeUp: null,
}

const MUSIC_VOLUME = 0.32
const SFX_VOLUME = 0.6

// A minor synthwave progression: Am - F - C - G (MIDI root notes).
const CHORDS = [
  [57, 60, 64],
  [53, 57, 60],
  [48, 52, 55],
  [55, 59, 62],
]
const BPM = 96
const STEP = 60 / BPM / 4 // sixteenth note
const STEPS_PER_CHORD = 16

const midi = (n: number) => 440 * Math.pow(2, (n - 69) / 12)

class SoundEngine {
  private ctx: AudioContext | null = null
  private master!: GainNode
  private musicBus!: GainNode
  private sfxBus!: GainNode
  private musicEl: HTMLAudioElement | null = null
  private timer: number | null = null
  private nextTime = 0
  private step = 0
  muted = false

  private ensure(): AudioContext {
    if (!this.ctx) {
      this.ctx = new AudioContext()
      this.master = this.ctx.createGain()
      this.master.connect(this.ctx.destination)
      this.musicBus = this.ctx.createGain()
      this.musicBus.gain.value = MUSIC_VOLUME
      this.musicBus.connect(this.master)
      this.sfxBus = this.ctx.createGain()
      this.sfxBus.gain.value = SFX_VOLUME
      this.sfxBus.connect(this.master)
    }
    if (this.ctx.state === 'suspended') void this.ctx.resume()
    return this.ctx
  }

  setMuted(muted: boolean) {
    this.muted = muted
    if (this.ctx) this.master.gain.setTargetAtTime(muted ? 0 : 1, this.ctx.currentTime, 0.05)
    if (this.musicEl) this.musicEl.muted = muted
  }

  /** Must be called from a user gesture (browsers block autoplay). Safe to call repeatedly. */
  startMusic() {
    this.ensure()
    if (FILES.music) {
      if (!this.musicEl) {
        this.musicEl = new Audio(FILES.music)
        this.musicEl.loop = true
        this.musicEl.volume = MUSIC_VOLUME
        this.musicEl.muted = this.muted
      }
      void this.musicEl.play().catch(() => {})
      return
    }
    if (this.timer !== null) return
    this.nextTime = this.ctx!.currentTime + 0.1
    this.timer = window.setInterval(() => this.schedule(), 25)
  }

  play(name: Sfx) {
    const file = FILES[name]
    if (file) {
      if (this.muted) return
      const a = new Audio(file)
      a.volume = SFX_VOLUME
      void a.play().catch(() => {})
      return
    }
    const ctx = this.ensure()
    const t = ctx.currentTime
    switch (name) {
      case 'click':
        this.tone(880, t, 0.06, 'square', 0.18, 1320)
        break
      case 'select':
        this.tone(660, t, 0.08, 'triangle', 0.3)
        break
      case 'correct':
        ;[72, 76, 79, 84].forEach((n, i) => this.tone(midi(n), t + i * 0.07, 0.18, 'triangle', 0.35))
        break
      case 'wrong':
        this.tone(220, t, 0.18, 'sawtooth', 0.22, 160)
        this.tone(165, t + 0.16, 0.32, 'sawtooth', 0.22, 110)
        break
      case 'timerStart':
        this.tone(660, t, 0.1, 'square', 0.16)
        this.tone(990, t + 0.14, 0.16, 'square', 0.16)
        break
      case 'tick':
        this.tone(1200, t, 0.035, 'square', 0.1)
        break
      case 'tickUrgent':
        this.tone(1600, t, 0.05, 'square', 0.16)
        break
      case 'bonus':
        ;[84, 88, 91, 96].forEach((n, i) => this.tone(midi(n), t + i * 0.05, 0.14, 'sine', 0.25))
        break
      case 'timeUp':
        this.tone(140, t, 0.7, 'sawtooth', 0.25, undefined, 900)
        this.tone(147, t, 0.7, 'square', 0.12, undefined, 900)
        break
      case 'win':
        ;[60, 64, 67, 72, 76, 79, 84].forEach((n, i) =>
          this.tone(midi(n), t + i * 0.09, i === 6 ? 0.7 : 0.2, 'triangle', 0.3),
        )
        break
      case 'lose':
        ;[67, 63, 60, 55].forEach((n, i) =>
          this.tone(midi(n), t + i * 0.22, i === 3 ? 0.8 : 0.24, 'sawtooth', 0.16, undefined, 1200),
        )
        break
    }
  }

  // --- synthesis helpers ---------------------------------------------------

  private tone(
    freq: number,
    when: number,
    dur: number,
    type: OscillatorType,
    vol: number,
    glideTo?: number,
    cutoff = 3500,
    bus: GainNode = this.sfxBus,
  ) {
    const ctx = this.ctx!
    const osc = ctx.createOscillator()
    const filter = ctx.createBiquadFilter()
    const gain = ctx.createGain()
    osc.type = type
    osc.frequency.setValueAtTime(freq, when)
    if (glideTo) osc.frequency.exponentialRampToValueAtTime(glideTo, when + dur)
    filter.type = 'lowpass'
    filter.frequency.value = cutoff
    gain.gain.setValueAtTime(0.0001, when)
    gain.gain.exponentialRampToValueAtTime(vol, when + 0.01)
    gain.gain.exponentialRampToValueAtTime(0.0001, when + dur)
    osc.connect(filter).connect(gain).connect(bus)
    osc.start(when)
    osc.stop(when + dur + 0.05)
  }

  /** Look-ahead scheduler for the background loop. */
  private schedule() {
    const ctx = this.ctx!
    while (this.nextTime < ctx.currentTime + 0.15) {
      this.musicStep(this.step, this.nextTime)
      this.nextTime += STEP
      this.step = (this.step + 1) % (STEPS_PER_CHORD * CHORDS.length)
    }
  }

  private musicStep(step: number, t: number) {
    const chord = CHORDS[Math.floor(step / STEPS_PER_CHORD)]
    const s = step % STEPS_PER_CHORD
    const bus = this.musicBus

    // Pad: soft chord at the start of each bar.
    if (s === 0) {
      chord.forEach((n) => this.tone(midi(n), t, STEP * 16, 'sawtooth', 0.05, undefined, 900, bus))
    }
    // Bass: pulsing eighth notes on the root.
    if (s % 2 === 0) {
      this.tone(midi(chord[0] - 24), t, STEP * 1.6, 'triangle', 0.22, undefined, 600, bus)
    }
    // Arpeggio: up through the chord, an octave up.
    const pattern = [0, 1, 2, 1]
    const note = chord[pattern[s % 4]] + 12
    this.tone(midi(note), t, STEP * 0.9, 'square', 0.045, undefined, 2200, bus)
    // Hi-hat-ish tick on the off-beats.
    if (s % 4 === 2) this.noise(t, 0.04, 0.05, bus)
  }

  private noiseBuffer: AudioBuffer | null = null
  private noise(when: number, dur: number, vol: number, bus: GainNode) {
    const ctx = this.ctx!
    if (!this.noiseBuffer) {
      this.noiseBuffer = ctx.createBuffer(1, ctx.sampleRate * 0.2, ctx.sampleRate)
      const data = this.noiseBuffer.getChannelData(0)
      for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1
    }
    const src = ctx.createBufferSource()
    src.buffer = this.noiseBuffer
    const hp = ctx.createBiquadFilter()
    hp.type = 'highpass'
    hp.frequency.value = 7000
    const gain = ctx.createGain()
    gain.gain.setValueAtTime(vol, when)
    gain.gain.exponentialRampToValueAtTime(0.0001, when + dur)
    src.connect(hp).connect(gain).connect(bus)
    src.start(when)
    src.stop(when + dur)
  }
}

export const sound = new SoundEngine()
