import { useState, useMemo, useEffect, useCallback } from 'react'
import {
  Flame,
  X,
  Volume2,
  CheckCircle2,
  XCircle,
  RotateCcw,
  ArrowRight,
  ShieldAlert,
  Sparkles,
  Filter,
} from 'lucide-react'
import { audioService } from '@/services/audioService'
import {
  ESSENTIALS_QUIZ_DATA,
  type EssentialsQuizItem,
} from '@/data/reference/essentialsQuizData'

interface JLPTTrapDrillModalProps {
  onClose: () => void
}

const CATEGORY_TABS: { id: string; label: string; emoji: string }[] = [
  { id: 'all', label: 'All Mixed', emoji: '⭐' },
  { id: 'kanji', label: 'Kanji Traps', emoji: '漢' },
  { id: 'verbs', label: 'Verb Shifts', emoji: '動' },
  { id: 'body', label: 'Body Pairs', emoji: '🧍' },
  { id: 'numbers', label: 'Counter Shifts', emoji: '🔢' },
  { id: 'clock', label: 'Clock & Time', emoji: '🕐' },
  { id: 'days', label: 'Calendar Traps', emoji: '📅' },
  { id: 'family', label: 'Uchi-Soto', emoji: '👨‍👩‍👧' },
  { id: 'adjectives', label: 'Adjectives', emoji: '✏️' },
  { id: 'particles', label: 'Particles', emoji: '📌' },
  { id: 'wh', label: '5W1H Words', emoji: '❓' },
  { id: 'greetings', label: 'Greetings', emoji: '🗣️' },
]

export function JLPTTrapDrillModal({ onClose }: JLPTTrapDrillModalProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [optionLang, setOptionLang] = useState<'ja' | 'en'>('ja')
  const [currentIdx, setCurrentIdx] = useState(0)
  const [score, setScore] = useState(0)
  const [streak, setStreak] = useState(0)
  const [maxStreak, setMaxStreak] = useState(0)
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [isAnswered, setIsAnswered] = useState(false)
  const [isFinished, setIsFinished] = useState(false)
  const [missedItems, setMissedItems] = useState<EssentialsQuizItem[]>([])
  const [deckKey, setDeckKey] = useState(0)

  // Build items based on selected category
  const activeDeck = useMemo(() => {
    let pool: EssentialsQuizItem[] = []
    if (selectedCategory === 'all') {
      Object.values(ESSENTIALS_QUIZ_DATA).forEach((catItems) => {
        pool.push(...catItems)
      })
    } else {
      pool = ESSENTIALS_QUIZ_DATA[selectedCategory] || []
    }
    return [...pool].sort(() => 0.5 - Math.random())
  }, [selectedCategory, deckKey])

  const current = activeDeck[currentIdx]

  // Options & correct answer based on optionLang
  const currentOptions = useMemo(() => {
    if (!current) return []
    return optionLang === 'ja' ? current.optionsJa : current.optionsEn
  }, [current, optionLang])

  const correctAnswer = useMemo(() => {
    if (!current) return ''
    return optionLang === 'ja' ? current.correctJa : current.correctEn
  }, [current, optionLang])

  const handleAudio = useCallback((text?: string) => {
    if (!current) return
    audioService.speak(text || current.audioText)
  }, [current])

  const handleSelectOption = useCallback((option: string) => {
    if (isAnswered || !current) return
    setSelectedOption(option)
    setIsAnswered(true)

    const isCorrect = option.toLowerCase() === correctAnswer.toLowerCase()
    if (isCorrect) {
      setScore((s) => s + 1)
      setStreak((st) => {
        const next = st + 1
        if (next > maxStreak) setMaxStreak(next)
        return next
      })
      handleAudio(current.audioText)
    } else {
      setStreak(0)
      setMissedItems((prev) => {
        if (prev.some((m) => m.id === current.id)) return prev
        return [...prev, current]
      })
    }
  }, [isAnswered, current, correctAnswer, maxStreak, handleAudio])

  const handleNext = useCallback(() => {
    if (currentIdx < activeDeck.length - 1) {
      setCurrentIdx((i) => i + 1)
      setSelectedOption(null)
      setIsAnswered(false)
    } else {
      setIsFinished(true)
    }
  }, [currentIdx, activeDeck.length])

  const handleRestart = () => {
    setCurrentIdx(0)
    setScore(0)
    setStreak(0)
    setMaxStreak(0)
    setSelectedOption(null)
    setIsAnswered(false)
    setIsFinished(false)
    setMissedItems([])
    setDeckKey((k) => k + 1)
  }

  const handleRetryMissed = () => {
    if (missedItems.length === 0) return
    setCurrentIdx(0)
    setScore(0)
    setStreak(0)
    setMaxStreak(0)
    setSelectedOption(null)
    setIsAnswered(false)
    setIsFinished(false)
    setDeckKey((k) => k + 1)
  }

  const handleCategoryChange = (catId: string) => {
    setSelectedCategory(catId)
    setCurrentIdx(0)
    setScore(0)
    setStreak(0)
    setMaxStreak(0)
    setSelectedOption(null)
    setIsAnswered(false)
    setIsFinished(false)
    setMissedItems([])
    setDeckKey((k) => k + 1)
  }

  // Keyboard shortcuts
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (isFinished) return
      if (e.key === 'Escape') {
        onClose()
        return
      }

      if (isAnswered && (e.key === 'Enter' || e.key === ' ')) {
        e.preventDefault()
        handleNext()
        return
      }

      if (!isAnswered && currentOptions.length > 0) {
        if (e.key === '1' || e.key.toLowerCase() === 'a') {
          handleSelectOption(currentOptions[0])
        } else if (e.key === '2' || e.key.toLowerCase() === 'b') {
          if (currentOptions[1]) handleSelectOption(currentOptions[1])
        } else if (e.key === '3' || e.key.toLowerCase() === 'c') {
          if (currentOptions[2]) handleSelectOption(currentOptions[2])
        } else if (e.key === '4' || e.key.toLowerCase() === 'd') {
          if (currentOptions[3]) handleSelectOption(currentOptions[3])
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isFinished, isAnswered, currentOptions, handleSelectOption, handleNext, onClose])

  const answeredCount = currentIdx + (isAnswered ? 1 : 0)
  const accuracyPct = answeredCount > 0 ? Math.round((score / answeredCount) * 100) : 0

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-fade-in"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        className="bg-surface rounded-2xl border border-border max-w-xl w-full shadow-2xl overflow-hidden flex flex-col max-h-[92vh] animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="flex flex-wrap items-center justify-between px-4 sm:px-5 py-3.5 border-b border-border bg-surface-2 gap-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-amber-500/15 border border-amber-500/25 flex items-center justify-center text-amber-500">
              <ShieldAlert size={18} />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-text-primary flex items-center gap-1.5">
                <span>JLPT Trap Master Drill</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 font-semibold border border-amber-500/20 font-mono">
                  JLPT トラップ特訓
                </span>
              </p>
              <p className="text-[10px] text-text-tertiary">
                Deceptive options, phonetic shifts & linguistic traps from real exams
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Language toggle for choices */}
            <div className="inline-flex rounded-lg border border-border p-0.5 bg-surface text-xs font-semibold shadow-xs">
              <button
                type="button"
                onClick={() => {
                  setOptionLang('ja')
                  setSelectedOption(null)
                  setIsAnswered(false)
                }}
                className={`px-2 py-1 rounded-md text-[11px] transition-all ${
                  optionLang === 'ja'
                    ? 'bg-accent text-white shadow-xs'
                    : 'text-text-tertiary hover:text-text-primary'
                }`}
                title="Options in Japanese (testing spelling & sound shift traps)"
              >
                🇯🇵 日本語
              </button>
              <button
                type="button"
                onClick={() => {
                  setOptionLang('en')
                  setSelectedOption(null)
                  setIsAnswered(false)
                }}
                className={`px-2 py-1 rounded-md text-[11px] transition-all ${
                  optionLang === 'en'
                    ? 'bg-accent text-white shadow-xs'
                    : 'text-text-tertiary hover:text-text-primary'
                }`}
                title="Options in English (testing meaning & usage traps)"
              >
                🇬🇧 English
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-1 rounded-lg hover:bg-surface-3 text-text-tertiary hover:text-text-primary transition-colors"
              aria-label="Close"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="px-4 sm:px-5 py-2 border-b border-border bg-surface flex items-center gap-1.5 overflow-x-auto custom-scrollbar-x flex-shrink-0">
          <span className="text-[10px] font-bold text-text-tertiary uppercase tracking-wider mr-1 flex items-center gap-1 flex-shrink-0">
            <Filter size={11} />
            Category:
          </span>
          {CATEGORY_TABS.map((cat) => {
            const isSelected = selectedCategory === cat.id
            const count =
              cat.id === 'all'
                ? Object.values(ESSENTIALS_QUIZ_DATA).reduce((sum, arr) => sum + arr.length, 0)
                : (ESSENTIALS_QUIZ_DATA[cat.id] || []).length

            return (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 border cursor-pointer ${
                  isSelected
                    ? 'bg-accent text-white border-accent shadow-xs'
                    : 'bg-surface border-border text-text-secondary hover:text-text-primary hover:bg-surface-2'
                }`}
              >
                <span>{cat.emoji}</span>
                <span>{cat.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                    isSelected ? 'bg-white/20 text-white font-bold' : 'bg-surface-2 text-text-tertiary'
                  }`}
                >
                  {count}
                </span>
              </button>
            )
          })}
        </div>

        {/* Progress & Streak Bar */}
        {!isFinished && activeDeck.length > 0 && (
          <div className="px-5 pt-3 pb-2 border-b border-border/60 bg-surface flex items-center justify-between text-xs flex-shrink-0">
            <div className="flex items-center gap-2">
              <span className="font-mono text-text-secondary font-bold">
                {currentIdx + 1} / {activeDeck.length}
              </span>
              <div className="w-24 sm:w-36 h-1.5 bg-surface-2 rounded-full overflow-hidden border border-border">
                <div
                  className="h-full bg-amber-500 transition-all duration-300 rounded-full"
                  style={{ width: `${((currentIdx + 1) / activeDeck.length) * 100}%` }}
                />
              </div>
            </div>

            <div className="flex items-center gap-3">
              {streak > 1 && (
                <span className="flex items-center gap-1 font-bold text-amber-500 animate-pulse text-xs">
                  <Flame size={14} fill="currentColor" />
                  <span>{streak} Streak!</span>
                </span>
              )}
              <span className="text-[11px] text-text-tertiary">
                Score: <strong className="text-text-primary">{score}</strong> ({accuracyPct}%)
              </span>
            </div>
          </div>
        )}

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4 flex-1">
          {!isFinished && current ? (
            <>
              {/* Question Card */}
              <div className="bg-surface-2/70 border border-border rounded-2xl p-5 text-center relative shadow-xs">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-surface border border-border text-text-secondary flex items-center gap-1">
                    <span>{current.tabEmoji}</span>
                    <span>{current.tabLabel}</span>
                  </span>

                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-500 flex items-center gap-1">
                    <ShieldAlert size={12} />
                    <span>JLPT Trap Question</span>
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-bold font-japanese text-text-primary leading-tight">
                  {current.promptJa}
                </h2>

                <p className="text-xs text-text-secondary mt-1.5 font-medium">
                  {current.promptEn}
                </p>
              </div>

              {/* 4 Choices Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {currentOptions.map((opt, i) => {
                  const isOptSelected = selectedOption === opt
                  const isCorrect = opt.toLowerCase() === correctAnswer.toLowerCase()

                  let btnStyle = 'bg-surface border-border hover:border-amber-500/40 hover:bg-surface-2 text-text-primary'

                  if (isAnswered) {
                    if (isCorrect) {
                      btnStyle = 'bg-emerald-500/15 border-emerald-500 text-emerald-700 dark:text-emerald-300 font-bold shadow-xs'
                    } else if (isOptSelected) {
                      btnStyle = 'bg-rose-500/15 border-rose-500 text-rose-700 dark:text-rose-300 font-bold shadow-xs'
                    } else {
                      btnStyle = 'bg-surface/50 border-border/40 text-text-tertiary opacity-50'
                    }
                  }

                  const letter = ['A', 'B', 'C', 'D'][i]

                  return (
                    <button
                      key={i}
                      type="button"
                      disabled={isAnswered}
                      onClick={() => handleSelectOption(opt)}
                      className={`p-3.5 rounded-xl border-2 text-left transition-all flex items-center justify-between active:scale-[0.98] cursor-pointer ${btnStyle}`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span className="w-6 h-6 rounded-lg bg-surface-2 border border-border flex items-center justify-center text-[10px] font-mono font-bold text-text-secondary flex-shrink-0">
                          {letter}
                        </span>
                        <span className={`text-sm ${optionLang === 'ja' ? 'font-japanese font-semibold' : 'font-medium'} truncate`}>
                          {opt}
                        </span>
                      </div>

                      {isAnswered && (
                        <div>
                          {isCorrect && <CheckCircle2 size={18} className="text-emerald-500 flex-shrink-0" />}
                          {isOptSelected && !isCorrect && <XCircle size={18} className="text-rose-500 flex-shrink-0" />}
                        </div>
                      )}
                    </button>
                  )
                })}
              </div>

              {/* JLPT Trap Explanation Banner (Revealed ONLY after clicking an option) */}
              {isAnswered && (
                <div className="bg-amber-500/10 border border-amber-500/25 rounded-xl p-4 text-xs text-text-secondary space-y-2 animate-in fade-in slide-in-from-bottom-2 duration-150">
                  <div className="flex items-center justify-between border-b border-amber-500/20 pb-2">
                    <span className="font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
                      <Sparkles size={14} />
                      <span>JLPT Trap Insight:</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => handleAudio(current.audioText)}
                      className="inline-flex items-center gap-1 text-[11px] text-accent font-semibold hover:underline"
                    >
                      <Volume2 size={13} />
                      <span>Listen ({current.readingJa})</span>
                    </button>
                  </div>

                  <p className="text-xs text-text-primary leading-relaxed">
                    {current.trapExplanation}
                  </p>

                  <div className="pt-1 flex items-center justify-between text-[11px] text-text-tertiary">
                    <span>
                      Correct: <strong className="text-emerald-600 dark:text-emerald-400 font-japanese">{current.correctJa}</strong> ({current.correctEn})
                    </span>
                    <span className="font-mono">Reading: {current.readingJa}</span>
                  </div>
                </div>
              )}
            </>
          ) : (
            /* Results Screen */
            <div className="text-center py-6 animate-fade-in space-y-4">
              <div className="w-16 h-16 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mx-auto text-3xl">
                {accuracyPct >= 80 ? '🏆' : accuracyPct >= 60 ? '⚡' : '💪'}
              </div>

              <div>
                <h3 className="text-xl font-bold text-text-primary">
                  {accuracyPct >= 80
                    ? 'Trap Master! Excellent Precision!'
                    : accuracyPct >= 60
                    ? 'Good Effort! Keep Dodging Those Traps!'
                    : 'Practice Makes Perfect! Review Missed Items'}
                </h3>
                <p className="text-xs text-text-secondary mt-1">
                  Category: <strong>{CATEGORY_TABS.find((c) => c.id === selectedCategory)?.label}</strong>
                </p>
              </div>

              {/* Stats 3-Col Box */}
              <div className="grid grid-cols-3 gap-2 p-3.5 rounded-xl bg-surface-2 border border-border text-center">
                <div>
                  <p className="text-xl font-bold text-text-primary">
                    {score} / {activeDeck.length}
                  </p>
                  <p className="text-[10px] text-text-tertiary uppercase font-bold">Score</p>
                </div>
                <div>
                  <p className="text-xl font-bold text-amber-500">{accuracyPct}%</p>
                  <p className="text-[10px] text-text-tertiary uppercase font-bold">Accuracy</p>
                </div>
                <div>
                  <p className="text-xl font-bold text-rose-500">🔥 {maxStreak}</p>
                  <p className="text-[10px] text-text-tertiary uppercase font-bold">Best Streak</p>
                </div>
              </div>

              {/* Missed Traps Review */}
              {missedItems.length > 0 && (
                <div className="text-left p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 max-h-48 overflow-y-auto space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-rose-600 dark:text-rose-400">
                    <span className="flex items-center gap-1.5">
                      <XCircle size={14} />
                      <span>Traps That Caught You ({missedItems.length})</span>
                    </span>
                    <button
                      type="button"
                      onClick={handleRetryMissed}
                      className="text-[11px] underline hover:text-rose-700"
                    >
                      Retry These Traps
                    </button>
                  </div>
                  <div className="space-y-1.5">
                    {missedItems.map((item) => (
                      <div
                        key={item.id}
                        className="p-2 rounded-lg bg-surface border border-border text-xs flex items-center justify-between"
                      >
                        <div>
                          <span className="font-japanese font-bold text-text-primary mr-2">
                            {item.promptJa}
                          </span>
                          <span className="text-text-secondary text-[11px] font-japanese">
                            {item.correctJa}
                          </span>
                        </div>
                        <span className="text-[10px] text-text-tertiary truncate max-w-[180px]">
                          {item.readingJa}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleRestart}
                  className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-accent text-white font-bold text-xs hover:opacity-90 transition-all shadow-xs cursor-pointer"
                >
                  <RotateCcw size={14} />
                  <span>Play Again</span>
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 rounded-xl border border-border bg-surface hover:bg-surface-2 text-xs font-semibold text-text-secondary transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        {!isFinished && (
          <div className="px-4 sm:px-5 py-3 border-t border-border bg-surface-2 flex items-center justify-between flex-shrink-0">
            <div className="text-[11px] text-text-tertiary">
              <kbd className="px-1.5 py-0.5 rounded bg-surface border border-border text-[10px] font-mono">1-4</kbd> Choose &nbsp;
              <kbd className="px-1.5 py-0.5 rounded bg-surface border border-border text-[10px] font-mono">Enter</kbd> Next
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-3 py-1.5 rounded-lg border border-border text-xs font-semibold text-text-secondary hover:text-text-primary hover:bg-surface transition-colors cursor-pointer"
              >
                Exit
              </button>
              <button
                type="button"
                disabled={!isAnswered}
                onClick={handleNext}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
                  isAnswered
                    ? 'bg-accent text-white shadow-xs hover:opacity-90 active:scale-95'
                    : 'bg-surface border border-border text-text-tertiary opacity-40 cursor-not-allowed'
                }`}
              >
                <span>{currentIdx < activeDeck.length - 1 ? 'Next Trap' : 'Finish Drill'}</span>
                <ArrowRight size={13} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
