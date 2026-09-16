import { useState, useMemo } from 'react'
import {
  Volume2,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  X,
  Search,
  Eye,
  EyeOff,
  Flame,
  RotateCcw,
} from 'lucide-react'
import {
  seionKana,
  dakuonKana,
  yoonKana,
  playKanaAudio,
  type KanaEntry,
} from '@/data/kana/kana-data'

type ScriptMode = 'hiragana' | 'katakana' | 'both'
type SoundGroup = 'seion' | 'dakuon' | 'yoon'

// ─── Row definitions for Gojūon (50-sound) matrix ─────────────────────────────

const SEION_ROWS = [
  { id: 'a',  name: 'A-row (あ行)',  label: 'Vowels' },
  { id: 'ka', name: 'Ka-row (か行)', label: 'K-sounds' },
  { id: 'sa', name: 'Sa-row (さ行)', label: 'S-sounds' },
  { id: 'ta', name: 'Ta-row (た行)', label: 'T-sounds' },
  { id: 'na', name: 'Na-row (な行)', label: 'N-sounds' },
  { id: 'ha', name: 'Ha-row (は行)', label: 'H-sounds' },
  { id: 'ma', name: 'Ma-row (ま行)', label: 'M-sounds' },
  { id: 'ya', name: 'Ya-row (や行)', label: 'Y-sounds' },
  { id: 'ra', name: 'Ra-row (ら行)', label: 'R-sounds' },
  { id: 'wa', name: 'Wa-row (わ行)', label: 'W-sounds' },
  { id: 'n',  name: 'N (ん / ン)',   label: 'Nasal N' },
]

const DAKUON_ROWS = [
  { id: 'ga', name: 'Ga-row (が行)', label: 'G-sounds (k + ゛)' },
  { id: 'za', name: 'Za-row (ざ行)', label: 'Z-sounds (s + ゛)' },
  { id: 'da', name: 'Da-row (だ行)', label: 'D-sounds (t + ゛)' },
  { id: 'ba', name: 'Ba-row (ば行)', label: 'B-sounds (h + ゛)' },
  { id: 'pa', name: 'Pa-row (ぱ行)', label: 'P-sounds (h + ゜)' },
]

const YOON_ROWS = [
  { id: 'kya', name: 'Kya / Kyu / Kyo', label: 'き + ゃ/ゅ/ょ' },
  { id: 'sha', name: 'Sha / Shu / Sho', label: 'し + ゃ/ゅ/ょ' },
  { id: 'cha', name: 'Cha / Chu / Cho', label: 'ち + ゃ/ゅ/ょ' },
  { id: 'nya', name: 'Nya / Nyu / Nyo', label: 'に + ゃ/ゅ/ょ' },
  { id: 'hya', name: 'Hya / Hyu / Hyo', label: 'ひ + ゃ/ゅ/ょ' },
  { id: 'mya', name: 'Mya / Myu / Myo', label: 'み + ゃ/ゅ/ょ' },
  { id: 'rya', name: 'Rya / Ryu / Ryo', label: 'り + ゃ/ゅ/ょ' },
  { id: 'gya', name: 'Gya / Gyu / Gyo', label: 'ぎ + ゃ/ゅ/ょ' },
  { id: 'ja',  name: 'Ja / Ju / Jo',    label: 'じ + ゃ/ゅ/ょ' },
  { id: 'bya', name: 'Bya / Byu / Byo', label: 'び + ゃ/ゅ/ょ' },
  { id: 'pya', name: 'Pya / Pyu / Pyo', label: 'ぴ + ゃ/ゅ/ょ' },
]

// ─── Character Detail Inspector Modal ─────────────────────────────────────────

function KanaDetailModal({
  kana,
  scriptMode,
  onClose,
  onPrev,
  onNext,
}: {
  kana: KanaEntry
  scriptMode: ScriptMode
  onClose: () => void
  onPrev?: () => void
  onNext?: () => void
}) {
  const displayChar = scriptMode === 'katakana' ? kana.katakana : kana.hiragana

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-surface rounded-2xl border border-border max-w-lg w-full shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header strip */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-surface-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-accent font-mono">
              {kana.type.toUpperCase()} KANA
            </span>
            <span className="text-xs text-text-tertiary">• {kana.romaji}</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-text-tertiary hover:text-text-primary hover:bg-surface transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5">
          {/* Main Character Hero Display */}
          <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-gradient-to-b from-accent/5 to-transparent border border-accent/20 relative">
            <button
              onClick={() => playKanaAudio(displayChar)}
              className="absolute top-3 right-3 p-2 rounded-xl bg-surface border border-border text-accent hover:bg-accent hover:text-white transition-all shadow-xs flex items-center gap-1.5 text-xs font-semibold"
              title="Listen to pronunciation"
            >
              <Volume2 size={15} />
              <span>Listen</span>
            </button>

            <div className="flex items-baseline gap-4 mb-2">
              <span className="text-7xl font-japanese font-black text-text-primary leading-none tracking-tight">
                {displayChar}
              </span>
              {scriptMode === 'both' && (
                <span className="text-5xl font-japanese font-bold text-accent/80 leading-none">
                  {kana.katakana}
                </span>
              )}
            </div>

            <p className="text-2xl font-mono font-bold text-accent mt-2">{kana.romaji}</p>

            <div className="flex items-center gap-3 mt-3 text-xs text-text-secondary">
              <span className="px-2.5 py-1 rounded-md bg-surface border border-border">
                Hiragana: <strong className="font-japanese text-text-primary">{kana.hiragana}</strong> ({kana.strokeCount.hiragana} strokes)
              </span>
              <span className="px-2.5 py-1 rounded-md bg-surface border border-border">
                Katakana: <strong className="font-japanese text-text-primary">{kana.katakana}</strong> ({kana.strokeCount.katakana} strokes)
              </span>
            </div>
          </div>

          {/* Visual Mnemonic / Memory Hook */}
          <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
            <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-bold text-xs mb-1">
              <Sparkles size={14} />
              <span>Memory Trick & Association</span>
            </div>
            <p className="text-xs text-text-secondary leading-relaxed">
              <strong className="text-text-primary">Hiragana ({kana.hiragana}):</strong>{' '}
              {kana.mnemonic.hiragana}
            </p>
            <p className="text-xs text-text-secondary leading-relaxed mt-1">
              <strong className="text-text-primary">Katakana ({kana.katakana}):</strong>{' '}
              {kana.mnemonic.katakana}
            </p>
          </div>

          {/* Real Japanese Example Vocabulary */}
          <div className="p-4 rounded-xl bg-surface-2 border border-border">
            <p className="text-xs font-bold text-text-tertiary uppercase tracking-wider mb-2">
              Example Vocabulary
            </p>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-lg font-bold font-japanese text-text-primary">
                  {kana.exampleWord.japanese}
                </p>
                <p className="text-xs text-text-secondary font-mono">
                  {kana.exampleWord.romaji} — <span className="italic text-text-primary">{kana.exampleWord.meaning}</span>
                </p>
              </div>
              <button
                onClick={() => playKanaAudio(kana.exampleWord.japanese)}
                className="p-2 rounded-lg bg-surface border border-border hover:text-accent hover:border-accent transition-colors"
                title="Hear example word"
              >
                <Volume2 size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Modal Footer Controls */}
        <div className="px-6 py-3.5 border-t border-border bg-surface-2 flex items-center justify-between">
          <button
            onClick={onPrev}
            disabled={!onPrev}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-surface hover:bg-surface-2 text-xs font-semibold text-text-secondary hover:text-text-primary disabled:opacity-30 transition-colors"
          >
            <ChevronLeft size={15} />
            <span>Previous</span>
          </button>
          <button
            onClick={() => playKanaAudio(displayChar)}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-accent text-white hover:opacity-90 text-xs font-bold transition-all shadow-xs"
          >
            <Volume2 size={14} />
            <span>Play Audio</span>
          </button>
          <button
            onClick={onNext}
            disabled={!onNext}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-surface hover:bg-surface-2 text-xs font-semibold text-text-secondary hover:text-text-primary disabled:opacity-30 transition-colors"
          >
            <span>Next</span>
            <ChevronRight size={15} />
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── Interactive Speed Quiz Drill ─────────────────────────────────────────────

function KanaQuizModal({
  kanaList,
  scriptMode,
  onClose,
}: {
  kanaList: KanaEntry[]
  scriptMode: ScriptMode
  onClose: () => void
}) {
  const [currentIdx, setCurrentIdx] = useState(0)
  const [score, setScore] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [isAnswered, setIsAnswered] = useState(false)
  const [quizFinished, setQuizFinished] = useState(false)

  // Pick 10 random kana for this round
  const questions = useMemo(() => {
    const shuffled = [...kanaList].sort(() => 0.5 - Math.random())
    return shuffled.slice(0, 10)
  }, [kanaList])

  const currentQuestion = questions[currentIdx]

  // 4 Multiple Choice Options (1 correct, 3 distractors)
  const options = useMemo(() => {
    if (!currentQuestion) return []
    const distractors = kanaList
      .filter((k) => k.id !== currentQuestion.id)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3)

    const pool = [currentQuestion, ...distractors]
    return pool.sort(() => 0.5 - Math.random())
  }, [currentQuestion, kanaList])

  const targetChar =
    scriptMode === 'katakana' ? currentQuestion.katakana : currentQuestion.hiragana

  function handleSelectOption(romaji: string) {
    if (isAnswered) return
    setSelectedAnswer(romaji)
    setIsAnswered(true)

    const correct = romaji === currentQuestion.romaji
    if (correct) {
      setScore((s) => s + 1)
      playKanaAudio(targetChar)
    }

    setTimeout(() => {
      if (currentIdx < questions.length - 1) {
        setCurrentIdx((i) => i + 1)
        setSelectedAnswer(null)
        setIsAnswered(false)
      } else {
        setQuizFinished(true)
      }
    }, 1200)
  }

  function restartQuiz() {
    setCurrentIdx(0)
    setScore(0)
    setSelectedAnswer(null)
    setIsAnswered(false)
    setQuizFinished(false)
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-surface rounded-2xl border border-border max-w-md w-full shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-border bg-surface-2">
          <div className="flex items-center gap-2">
            <Flame size={16} className="text-accent" />
            <span className="text-xs font-bold uppercase tracking-wider text-text-primary">
              Kana Quick Quiz Drill
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-text-tertiary hover:text-text-primary hover:bg-surface transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          {!quizFinished ? (
            <div>
              {/* Progress bar */}
              <div className="flex items-center justify-between text-xs text-text-tertiary mb-2">
                <span>Question {currentIdx + 1} of {questions.length}</span>
                <span className="font-bold text-accent">Score: {score}</span>
              </div>
              <div className="h-1.5 bg-surface-2 rounded-full overflow-hidden mb-6">
                <div
                  className="h-full bg-accent rounded-full transition-all duration-300"
                  style={{ width: `${((currentIdx + 1) / questions.length) * 100}%` }}
                />
              </div>

              {/* Question Card */}
              <div className="flex flex-col items-center justify-center p-8 bg-surface-2 rounded-2xl border border-border mb-6">
                <span className="text-7xl font-japanese font-black text-text-primary mb-2">
                  {targetChar}
                </span>
                <button
                  onClick={() => playKanaAudio(targetChar)}
                  className="flex items-center gap-1 text-xs text-accent font-semibold hover:underline"
                >
                  <Volume2 size={13} />
                  <span>Play sound</span>
                </button>
              </div>

              {/* Options */}
              <p className="text-xs font-semibold text-text-secondary text-center mb-3">
                Select the correct romaji pronunciation:
              </p>
              <div className="grid grid-cols-2 gap-2.5">
                {options.map((opt) => {
                  const isSelected = selectedAnswer === opt.romaji
                  const isCorrect = opt.romaji === currentQuestion.romaji

                  let btnStyle = 'bg-surface border-border text-text-primary hover:border-accent hover:bg-surface-2'
                  if (isAnswered) {
                    if (isCorrect) {
                      btnStyle = 'bg-emerald-500 text-white border-emerald-600 shadow-sm'
                    } else if (isSelected) {
                      btnStyle = 'bg-rose-500 text-white border-rose-600 shadow-sm'
                    } else {
                      btnStyle = 'opacity-40 border-border text-text-tertiary'
                    }
                  }

                  return (
                    <button
                      key={opt.id}
                      onClick={() => handleSelectOption(opt.romaji)}
                      disabled={isAnswered}
                      className={`py-3 px-4 rounded-xl border text-sm font-mono font-bold transition-all ${btnStyle}`}
                    >
                      {opt.romaji}
                    </button>
                  )
                })}
              </div>
            </div>
          ) : (
            /* Result Screen */
            <div className="text-center py-6 animate-fade-in">
              <div className="w-16 h-16 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center mx-auto mb-4 text-3xl">
                {score >= 8 ? '🎉' : score >= 5 ? '👍' : '💪'}
              </div>
              <h3 className="text-xl font-bold text-text-primary mb-1">
                {score >= 8 ? '素晴らしい！ Great Job!' : 'Good Effort! お疲れ様'}
              </h3>
              <p className="text-xs text-text-secondary mb-5">
                You scored <strong className="text-accent text-sm">{score}</strong> out of{' '}
                <strong>{questions.length}</strong> ({Math.round((score / questions.length) * 100)}%)
              </p>

              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={restartQuiz}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-accent text-white font-bold text-xs hover:opacity-90 transition-all shadow-xs"
                >
                  <RotateCcw size={14} />
                  <span>Try Again</span>
                </button>
                <button
                  onClick={onClose}
                  className="px-4 py-2 rounded-xl border border-border bg-surface hover:bg-surface-2 text-xs font-semibold text-text-secondary transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// ─── MAIN KANA PAGE ───────────────────────────────────────────────────────────

export default function KanaPage() {
  const [scriptMode, setScriptMode] = useState<ScriptMode>('hiragana')
  const [soundGroup, setSoundGroup] = useState<SoundGroup>('seion')
  const [showRomaji, setShowRomaji] = useState(true)
  const [search, setSearch] = useState('')
  const [selectedKana, setSelectedKana] = useState<KanaEntry | null>(null)
  const [quizOpen, setQuizOpen] = useState(false)

  // Filter based on active sound group
  const currentDataset = useMemo(() => {
    switch (soundGroup) {
      case 'seion':  return seionKana
      case 'dakuon': return dakuonKana
      case 'yoon':   return yoonKana
      default:       return seionKana
    }
  }, [soundGroup])

  // Filter by search query if user types something
  const filteredKana = useMemo(() => {
    if (!search.trim()) return currentDataset
    const q = search.toLowerCase().trim()
    return currentDataset.filter(
      (k) =>
        k.romaji.toLowerCase().includes(q) ||
        k.hiragana.includes(q) ||
        k.katakana.includes(q) ||
        k.exampleWord.meaning.toLowerCase().includes(q)
    )
  }, [search, currentDataset])

  // Group by rows for matrix rendering
  const activeRows = useMemo(() => {
    switch (soundGroup) {
      case 'seion':  return SEION_ROWS
      case 'dakuon': return DAKUON_ROWS
      case 'yoon':   return YOON_ROWS
      default:       return SEION_ROWS
    }
  }, [soundGroup])

  function handleKanaClick(kana: KanaEntry) {
    const char = scriptMode === 'katakana' ? kana.katakana : kana.hiragana
    playKanaAudio(char)
    setSelectedKana(kana)
  }

  // Previous & Next navigation in modal
  const currentIndex = selectedKana ? filteredKana.findIndex((k) => k.id === selectedKana.id) : -1
  const hasPrev = currentIndex > 0
  const hasNext = currentIndex >= 0 && currentIndex < filteredKana.length - 1

  return (
    <div className="space-y-6 animate-fade-in pb-16">
      {/* ── 1. HEADER & INTRO ─────────────────────────────────────────────────── */}
      <div className="bg-surface rounded-2xl border border-border p-6 shadow-card relative overflow-hidden">
        <div className="h-1 bg-gradient-to-r from-accent via-rose-500 to-amber-400 absolute top-0 left-0 right-0" />
        <div className="absolute right-6 top-1/2 -translate-y-1/2 text-[110px] font-japanese font-black text-accent/[0.03] select-none pointer-events-none leading-none">
          五十音
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-xs font-bold text-accent tracking-widest uppercase">JLPT N5 Core Foundation</span>
              <span className="w-1 h-1 rounded-full bg-border-strong" />
              <span className="text-xs text-text-tertiary font-japanese">日本語の基本文字</span>
            </div>
            <h1 className="text-2xl font-black text-text-primary tracking-tight">
              Japanese Kana Alphabet · 五十音図
            </h1>
            <p className="text-xs sm:text-sm text-text-secondary mt-1 max-w-2xl leading-relaxed">
              Master the dual alphabets of Japanese: <strong>Hiragana (ひらがな)</strong> for grammar & native words, and <strong>Katakana (カタカナ)</strong> for foreign loanwords. Click any character to hear authentic pronunciation.
            </p>
          </div>

          {/* Speed Quiz Button */}
          <button
            onClick={() => setQuizOpen(true)}
            className="inline-flex items-center gap-2 bg-accent hover:opacity-90 text-white px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm active:scale-95 flex-shrink-0 self-start md:self-auto"
          >
            <Flame size={15} />
            <span>Practice Speed Quiz</span>
          </button>
        </div>
      </div>

      {/* ── 2. CONTROLS BAR: SCRIPT SELECTOR & SOUND GROUP SELECTOR ───────────── */}
      <div className="bg-surface rounded-2xl border border-border p-4 shadow-card space-y-3">
        {/* Row 1: Script Toggle (Hiragana vs Katakana vs Both) */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-border/60">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-text-tertiary uppercase tracking-wider mr-1">Script:</span>
            <div className="flex bg-surface-2 p-1 rounded-xl border border-border">
              {[
                { id: 'hiragana', label: 'Hiragana (ひらがな)', emoji: '🌸' },
                { id: 'katakana', label: 'Katakana (カタカナ)', emoji: '⚡' },
                { id: 'both',     label: 'Both (あ / ア)',      emoji: '🔄' },
              ].map((s) => (
                <button
                  key={s.id}
                  onClick={() => setScriptMode(s.id as ScriptMode)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    scriptMode === s.id
                      ? 'bg-accent text-white shadow-xs'
                      : 'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  <span className="text-xs">{s.emoji}</span>
                  <span>{s.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Romaji toggle & Search */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowRomaji(!showRomaji)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all ${
                showRomaji
                  ? 'bg-surface-2 text-text-primary border-border'
                  : 'bg-surface text-text-tertiary border-dashed border-border'
              }`}
              title={showRomaji ? 'Hide Romaji reading aids' : 'Show Romaji reading aids'}
            >
              {showRomaji ? <Eye size={14} className="text-accent" /> : <EyeOff size={14} />}
              <span>Romaji: {showRomaji ? 'ON' : 'OFF'}</span>
            </button>

            <div className="relative flex-1 sm:w-48">
              <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search kana, romaji…"
                className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl bg-surface-2 border border-border focus:outline-none focus:border-accent font-japanese"
              />
            </div>
          </div>
        </div>

        {/* Row 2: Sound Group Selector (Seion vs Dakuon vs Yoon) */}
        <div className="flex items-center gap-2 overflow-x-auto custom-scrollbar-x pb-1">
          <span className="text-xs font-bold text-text-tertiary uppercase tracking-wider mr-1 flex-shrink-0">
            Sounds:
          </span>
          {[
            { id: 'seion',  label: 'Clear Sounds (46)', count: 46, desc: 'Basic vowels & consonants (あ〜ん)' },
            { id: 'dakuon', label: 'Voiced & P-Sounds (25)', count: 25, desc: 'Tenten ゛ & Maru ゜ (が〜ぽ)' },
            { id: 'yoon',   label: 'Combos & Glides (33)', count: 33, desc: 'Small ゃ, ゅ, ょ glides (きゃ〜ぴょ)' },
          ].map((g) => (
            <button
              key={g.id}
              onClick={() => setSoundGroup(g.id as SoundGroup)}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border ${
                soundGroup === g.id
                  ? 'bg-text-primary text-background border-text-primary shadow-xs'
                  : 'bg-surface border-border text-text-secondary hover:text-text-primary hover:bg-surface-2'
              }`}
            >
              <span>{g.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ── 3. GOJŪON MATRIX GRID ─────────────────────────────────────────────── */}
      <div className="bg-surface rounded-2xl border border-border p-5 shadow-card">
        {/* Vowel Column Labels Header (for Seion and Dakuon) */}
        {soundGroup !== 'yoon' ? (
          <div className="grid grid-cols-6 gap-2 mb-3 pb-2 border-b border-border/60 text-center">
            <span className="text-[11px] font-bold text-text-tertiary uppercase tracking-wider self-center">
              Row
            </span>
            {['A (あ段)', 'I (い段)', 'U (う段)', 'E (え段)', 'O (お段)'].map((col) => (
              <span key={col} className="text-xs font-bold text-text-secondary font-japanese">
                {col}
              </span>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-2 mb-3 pb-2 border-b border-border/60 text-center">
            <span className="text-[11px] font-bold text-text-tertiary uppercase tracking-wider self-center">
              Base
            </span>
            {['-ya (〜ゃ)', '-yu (〜ゅ)', '-yo (〜ょ)'].map((col) => (
              <span key={col} className="text-xs font-bold text-text-secondary font-japanese">
                {col}
              </span>
            ))}
          </div>
        )}

        {/* Rows Rendering */}
        <div className="space-y-2.5">
          {activeRows.map((r) => {
            const rowItems = filteredKana.filter((k) => k.row === r.id)
            if (search.trim() && rowItems.length === 0) return null

            if (soundGroup === 'seion') {
              // 5 slots: colIndex 0, 1, 2, 3, 4
              const slots: (KanaEntry | null)[] = [null, null, null, null, null]
              rowItems.forEach((k) => {
                if (k.colIndex !== undefined) slots[k.colIndex] = k
              })

              return (
                <div key={r.id} className="grid grid-cols-6 gap-2 items-center">
                  {/* Row Label */}
                  <div className="text-left pr-1">
                    <p className="text-xs font-bold text-text-primary leading-tight">{r.name}</p>
                    <p className="text-[10px] text-text-tertiary">{r.label}</p>
                  </div>

                  {/* 5 columns */}
                  {slots.map((item, colIdx) => {
                    if (!item) {
                      return (
                        <div
                          key={colIdx}
                          className="h-16 rounded-xl border border-dashed border-border/40 bg-surface-2/20 flex items-center justify-center text-text-tertiary/40 select-none text-xs"
                        >
                          —
                        </div>
                      )
                    }

                    const displayMain = scriptMode === 'katakana' ? item.katakana : item.hiragana
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleKanaClick(item)}
                        className="group h-16 rounded-xl border border-border bg-surface hover:border-accent hover:bg-surface-2 flex flex-col items-center justify-center relative p-1 transition-all hover:scale-[1.03] active:scale-95 shadow-xs"
                      >
                        <span className="text-2xl font-japanese font-bold text-text-primary group-hover:text-accent transition-colors leading-none">
                          {displayMain}
                        </span>

                        {scriptMode === 'both' && (
                          <span className="text-[10px] font-japanese text-text-tertiary mt-0.5">
                            {item.katakana}
                          </span>
                        )}

                        {showRomaji && (
                          <span className="text-[11px] font-mono font-semibold text-text-secondary group-hover:text-text-primary mt-0.5 leading-none">
                            {item.romaji}
                          </span>
                        )}

                        <span className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity text-accent">
                          <Volume2 size={11} />
                        </span>
                      </button>
                    )
                  })}
                </div>
              )
            } else if (soundGroup === 'dakuon') {
              // 5 slots per row: ga, gi, gu, ge, go
              return (
                <div key={r.id} className="grid grid-cols-6 gap-2 items-center">
                  <div className="text-left pr-1">
                    <p className="text-xs font-bold text-text-primary leading-tight">{r.name}</p>
                    <p className="text-[10px] text-text-tertiary">{r.label}</p>
                  </div>
                  {rowItems.map((item) => {
                    const displayMain = scriptMode === 'katakana' ? item.katakana : item.hiragana
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleKanaClick(item)}
                        className="group h-16 rounded-xl border border-border bg-surface hover:border-accent hover:bg-surface-2 flex flex-col items-center justify-center relative p-1 transition-all hover:scale-[1.03] active:scale-95 shadow-xs"
                      >
                        <span className="text-2xl font-japanese font-bold text-text-primary group-hover:text-accent transition-colors leading-none">
                          {displayMain}
                        </span>
                        {scriptMode === 'both' && (
                          <span className="text-[10px] font-japanese text-text-tertiary mt-0.5">
                            {item.katakana}
                          </span>
                        )}
                        {showRomaji && (
                          <span className="text-[11px] font-mono font-semibold text-text-secondary group-hover:text-text-primary mt-0.5 leading-none">
                            {item.romaji}
                          </span>
                        )}
                        <span className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity text-accent">
                          <Volume2 size={11} />
                        </span>
                      </button>
                    )
                  })}
                </div>
              )
            } else {
              // Yōon: 3 items per row
              return (
                <div key={r.id} className="grid grid-cols-4 gap-2 items-center">
                  <div className="text-left pr-1">
                    <p className="text-xs font-bold text-text-primary leading-tight">{r.name}</p>
                    <p className="text-[10px] text-text-tertiary">{r.label}</p>
                  </div>
                  {rowItems.map((item) => {
                    const displayMain = scriptMode === 'katakana' ? item.katakana : item.hiragana
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleKanaClick(item)}
                        className="group h-16 rounded-xl border border-border bg-surface hover:border-accent hover:bg-surface-2 flex flex-col items-center justify-center relative p-1 transition-all hover:scale-[1.03] active:scale-95 shadow-xs"
                      >
                        <span className="text-xl font-japanese font-bold text-text-primary group-hover:text-accent transition-colors leading-none">
                          {displayMain}
                        </span>
                        {scriptMode === 'both' && (
                          <span className="text-[10px] font-japanese text-text-tertiary mt-0.5">
                            {item.katakana}
                          </span>
                        )}
                        {showRomaji && (
                          <span className="text-[11px] font-mono font-semibold text-text-secondary group-hover:text-text-primary mt-0.5 leading-none">
                            {item.romaji}
                          </span>
                        )}
                        <span className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity text-accent">
                          <Volume2 size={11} />
                        </span>
                      </button>
                    )
                  })}
                </div>
              )
            }
          })}
        </div>
      </div>

      {/* ── 4. CHARACTER INSPECTOR MODAL ─────────────────────────────────────── */}
      {selectedKana && (
        <KanaDetailModal
          kana={selectedKana}
          scriptMode={scriptMode}
          onClose={() => setSelectedKana(null)}
          onPrev={hasPrev ? () => setSelectedKana(filteredKana[currentIndex - 1]) : undefined}
          onNext={hasNext ? () => setSelectedKana(filteredKana[currentIndex + 1]) : undefined}
        />
      )}

      {/* ── 5. SPEED QUIZ MODAL ──────────────────────────────────────────────── */}
      {quizOpen && (
        <KanaQuizModal
          kanaList={currentDataset}
          scriptMode={scriptMode}
          onClose={() => setQuizOpen(false)}
        />
      )}
    </div>
  )
}
