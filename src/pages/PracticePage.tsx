import { useState, useMemo, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Dumbbell,
  Zap,
  Puzzle,
  Flame,
  ArrowRight,
  RotateCcw,
  CheckCircle2,
  XCircle,
  Volume2,
  BookOpen,
  X,
  Play,
} from 'lucide-react'
import { useApp } from '@/app/AppContext'
import { n5Units } from '@/data/curriculum/n5/units'
import {
  LESSON_REGISTRY,
  getParticleDrillExercises,
  getSentenceOrderDrillExercises,
  getRandomSprintExercises,
} from '@/data/curriculum/n5/registry'
import { playKanaAudio } from '@/data/kana/kana-data'
import type { Exercise } from '@/types'

// ─── PARTICLE DRILL MODAL ─────────────────────────────────────────────────────

function ParticleDrillModal({ onClose }: { onClose: () => void }) {
  const exercises = useMemo(() => {
    const raw = getParticleDrillExercises()
    return [...raw].sort(() => 0.5 - Math.random())
  }, [])

  const [idx, setIdx] = useState(0)
  const [selected, setSelected] = useState<string | null>(null)
  const [score, setScore] = useState(0)
  const [streak, setStreak] = useState(0)
  const [maxStreak, setMaxStreak] = useState(0)
  const [finished, setFinished] = useState(false)
  const [missed, setMissed] = useState<Exercise[]>([])

  const current = exercises[idx]
  const options = current?.options ?? ['は', 'を', 'に', 'で']

  function handleSelect(opt: string) {
    if (selected !== null || !current) return
    setSelected(opt)

    const isCorrect = opt === current.correctAnswer
    if (isCorrect) {
      const nextScore = score + 1
      const nextStreak = streak + 1
      setScore(nextScore)
      setStreak(nextStreak)
      if (nextStreak > maxStreak) setMaxStreak(nextStreak)
      // Play audio of full sentence with filled particle
      const spoken = current.sentence ? current.sentence.replace('___', opt) : opt
      playKanaAudio(spoken)
    } else {
      setStreak(0)
      setMissed((prev) => [...prev, current])
    }
  }

  function handleNext() {
    if (idx < exercises.length - 1) {
      setIdx((i) => i + 1)
      setSelected(null)
    } else {
      setFinished(true)
    }
  }

  function handleRestart() {
    setIdx(0)
    setSelected(null)
    setScore(0)
    setStreak(0)
    setMaxStreak(0)
    setFinished(false)
    setMissed([])
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in" role="dialog" aria-modal="true">
      <div className="bg-surface rounded-2xl border border-border max-w-lg w-full shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-border bg-surface-2 flex-shrink-0">
          <div className="flex items-center gap-2">
            <Zap size={18} className="text-amber-500" />
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-text-primary flex items-center gap-1.5">
                <span>Particle Master Drill</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 font-semibold border border-amber-500/20">
                  助詞特訓
                </span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {!finished && idx > 0 && (
              <button
                onClick={() => setFinished(true)}
                className="px-2.5 py-1 rounded-lg bg-surface border border-border hover:bg-surface-2 text-xs font-semibold text-text-secondary hover:text-text-primary transition-colors"
              >
                Finish
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1 rounded-lg hover:bg-surface-2 text-text-secondary hover:text-text-primary transition-colors"
              aria-label="Close"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto flex-1">
          {!finished && current ? (
            <div className="space-y-5">
              {/* Progress & Streak */}
              <div className="flex items-center justify-between text-xs">
                <span className="text-text-tertiary font-semibold">
                  Question {idx + 1} of {exercises.length}
                </span>
                <span className="flex items-center gap-1 font-bold text-amber-500">
                  <Flame size={14} />
                  <span>Streak: {streak}</span>
                </span>
              </div>

              {/* Progress Bar */}
              <div className="h-1.5 w-full bg-border rounded-full overflow-hidden">
                <div
                  className="h-full bg-amber-500 rounded-full transition-all duration-300"
                  style={{ width: `${((idx + 1) / exercises.length) * 100}%` }}
                />
              </div>

              {/* Prompt Prompt / Sentence */}
              <div className="p-5 rounded-2xl bg-surface-2 border border-border text-center space-y-3">
                <p className="text-xs text-text-tertiary uppercase tracking-wider font-semibold">
                  {current.prompt}
                </p>
                <p className="text-2xl font-japanese font-bold text-text-primary tracking-wide">
                  {current.sentence?.split('___').map((part, i, arr) => (
                    <span key={i}>
                      {part}
                      {i < arr.length - 1 && (
                        <span
                          className={`inline-block px-3 py-0.5 mx-1 rounded-lg border-2 font-mono text-xl transition-all ${
                            selected
                              ? selected === current.correctAnswer
                                ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border-emerald-500'
                                : 'bg-rose-500/20 text-rose-600 dark:text-rose-400 border-rose-500'
                              : 'bg-surface border-dashed border-accent text-accent animate-pulse'
                          }`}
                        >
                          {selected ? selected : '？'}
                        </span>
                      )}
                    </span>
                  ))}
                </p>
                {selected && (
                  <button
                    onClick={() => {
                      const spoken = current.sentence ? current.sentence.replace('___', String(current.correctAnswer)) : String(current.correctAnswer)
                      playKanaAudio(spoken)
                    }}
                    className="inline-flex items-center gap-1.5 text-xs text-accent font-semibold hover:underline mt-1"
                  >
                    <Volume2 size={14} />
                    <span>Play Japanese Audio</span>
                  </button>
                )}
              </div>

              {/* 4 Particle Choice Buttons */}
              <div className="grid grid-cols-2 gap-3">
                {options.map((opt) => {
                  let btnStyle = 'bg-surface border-border text-text-primary hover:border-accent/40 hover:bg-accent-soft/10 active:scale-95'
                  if (selected !== null) {
                    if (opt === current.correctAnswer) {
                      btnStyle = 'bg-emerald-500/15 border-emerald-500 text-emerald-600 dark:text-emerald-400 font-bold'
                    } else if (opt === selected) {
                      btnStyle = 'bg-rose-500/15 border-rose-500 text-rose-600 dark:text-rose-400'
                    } else {
                      btnStyle = 'bg-surface/50 border-border/50 text-text-tertiary opacity-40'
                    }
                  }

                  return (
                    <button
                      key={opt}
                      disabled={selected !== null}
                      onClick={() => handleSelect(opt)}
                      className={`p-4 rounded-xl border text-2xl font-japanese font-bold transition-all text-center ${btnStyle}`}
                    >
                      {opt}
                    </button>
                  )
                })}
              </div>

              {/* Feedback & Explanation */}
              {selected !== null && (
                <div className="space-y-4 animate-fade-in">
                  <div
                    className={`p-4 rounded-xl border text-sm ${
                      selected === current.correctAnswer
                        ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-700 dark:text-emerald-300'
                        : 'bg-rose-500/10 border-rose-500/30 text-rose-700 dark:text-rose-300'
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      {selected === current.correctAnswer ? (
                        <CheckCircle2 size={17} className="text-emerald-500 flex-shrink-0 mt-0.5" />
                      ) : (
                        <XCircle size={17} className="text-rose-500 flex-shrink-0 mt-0.5" />
                      )}
                      <div>
                        <p className="font-bold">
                          {selected === current.correctAnswer ? 'Correct! 正解' : 'Incorrect'}
                        </p>
                        <p className="text-xs mt-1 opacity-90 leading-relaxed">
                          {current.explanation}
                        </p>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={handleNext}
                    className="w-full py-3 rounded-xl bg-accent text-white font-bold text-sm hover:opacity-90 active:scale-98 transition-all flex items-center justify-center gap-2 shadow-sm"
                  >
                    <span>{idx < exercises.length - 1 ? 'Next Question' : 'View Results'}</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* Results Screen */
            <div className="text-center py-4 space-y-5 animate-fade-in">
              <div className="w-16 h-16 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mx-auto text-3xl">
                {score / exercises.length >= 0.8 ? '🏆' : '⚡'}
              </div>

              <div>
                <h3 className="text-xl font-bold text-text-primary">Particle Drill Complete!</h3>
                <p className="text-xs text-text-secondary mt-1">Excellent particle practice session</p>
              </div>

              <div className="grid grid-cols-3 gap-2 p-4 rounded-xl bg-surface-2 border border-border text-center">
                <div>
                  <p className="text-2xl font-bold text-text-primary">{score} / {idx + (selected ? 1 : 0)}</p>
                  <p className="text-[10px] text-text-tertiary uppercase font-bold">Score</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-accent">
                    {Math.round((score / Math.max(1, idx + (selected ? 1 : 0))) * 100)}%
                  </p>
                  <p className="text-[10px] text-text-tertiary uppercase font-bold">Accuracy</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-amber-500">🔥 {maxStreak}</p>
                  <p className="text-[10px] text-text-tertiary uppercase font-bold">Best Streak</p>
                </div>
              </div>

              {missed.length > 0 && (
                <div className="text-left p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 max-h-48 overflow-y-auto space-y-2">
                  <p className="text-xs font-bold text-rose-600 dark:text-rose-400">
                    Review Mistakes ({missed.length})
                  </p>
                  {missed.map((m, i) => (
                    <div key={i} className="p-2 rounded-lg bg-surface border border-border text-xs">
                      <p className="font-japanese font-semibold text-text-primary">
                        {m.sentence?.replace('___', `[${m.correctAnswer}]`)}
                      </p>
                      <p className="text-[11px] text-text-secondary mt-0.5">{m.explanation}</p>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex gap-2">
                <button
                  onClick={handleRestart}
                  className="flex-1 py-2.5 rounded-xl bg-surface border border-border hover:bg-surface-2 text-xs font-bold text-text-primary transition-all flex items-center justify-center gap-1.5"
                >
                  <RotateCcw size={14} />
                  <span>Drill Again</span>
                </button>
                <button
                  onClick={onClose}
                  className="flex-1 py-2.5 rounded-xl bg-accent text-white hover:opacity-90 text-xs font-bold transition-all"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// ─── SENTENCE BUILDER / WORD ORDER DRILL MODAL ────────────────────────────────

function SentenceOrderDrillModal({ onClose }: { onClose: () => void }) {
  const exercises = useMemo(() => {
    const raw = getSentenceOrderDrillExercises()
    return [...raw].sort(() => 0.5 - Math.random())
  }, [])

  const [idx, setIdx] = useState(0)
  const [selectedWords, setSelectedWords] = useState<string[]>([])
  const [availableWords, setAvailableWords] = useState<string[]>([])
  const [isEvaluated, setIsEvaluated] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)

  const current = exercises[idx]

  // Initialize pool of words for current question
  useEffect(() => {
    if (current && current.words) {
      setAvailableWords([...current.words].sort(() => 0.5 - Math.random()))
      setSelectedWords([])
      setIsEvaluated(false)
      setIsCorrect(false)
    }
  }, [current, idx])

  function handlePickWord(word: string, poolIdx: number) {
    if (isEvaluated) return
    setSelectedWords((prev) => [...prev, word])
    setAvailableWords((prev) => prev.filter((_, i) => i !== poolIdx))
  }

  function handleRemoveWord(word: string, trayIdx: number) {
    if (isEvaluated) return
    setSelectedWords((prev) => prev.filter((_, i) => i !== trayIdx))
    setAvailableWords((prev) => [...prev, word])
  }

  function handleCheck() {
    if (!current) return
    const constructed = selectedWords.join(' ') + '。'
    const cleanConstructed = constructed.replace(/[\s。]/g, '')
    const correctClean = String(current.correctAnswer).replace(/[\s。]/g, '')
    const altsClean = (current.alternativeAnswers ?? []).map((a) => a.replace(/[\s。]/g, ''))

    const correct = cleanConstructed === correctClean || altsClean.includes(cleanConstructed)
    setIsCorrect(correct)
    setIsEvaluated(true)
    if (correct) {
      setScore((s) => s + 1)
      playKanaAudio(cleanConstructed)
    }
  }

  function handleNext() {
    if (idx < exercises.length - 1) {
      setIdx((i) => i + 1)
    } else {
      setFinished(true)
    }
  }

  function handleResetCurrent() {
    if (current?.words) {
      setAvailableWords([...current.words].sort(() => 0.5 - Math.random()))
      setSelectedWords([])
      setIsEvaluated(false)
      setIsCorrect(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in" role="dialog" aria-modal="true">
      <div className="bg-surface rounded-2xl border border-border max-w-lg w-full shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-border bg-surface-2 flex-shrink-0">
          <div className="flex items-center gap-2">
            <Puzzle size={18} className="text-indigo-500" />
            <p className="text-xs font-bold uppercase tracking-wider text-text-primary flex items-center gap-1.5">
              <span>Sentence Builder Puzzle</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-semibold border border-indigo-500/20">
                文作成パズル
              </span>
            </p>
          </div>

          <button onClick={onClose} className="p-1 rounded-lg hover:bg-surface-2 text-text-secondary hover:text-text-primary transition-colors">
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto flex-1">
          {!finished && current ? (
            <div className="space-y-5">
              {/* Progress */}
              <div className="flex items-center justify-between text-xs text-text-tertiary">
                <span>Puzzle {idx + 1} of {exercises.length}</span>
                <span>Score: {score}</span>
              </div>

              {/* Target Prompt */}
              <div className="p-4 rounded-xl bg-surface-2 border border-border">
                <p className="text-xs text-text-tertiary uppercase tracking-wider font-semibold mb-1">
                  Arrange in correct Japanese order:
                </p>
                <p className="text-base font-semibold text-text-primary">
                  {current.prompt}
                </p>
              </div>

              {/* Answer Construction Tray */}
              <div>
                <p className="text-[11px] text-text-tertiary font-bold uppercase tracking-wider mb-1.5">
                  Your Sentence Tray (Click tile to remove):
                </p>
                <div className="min-h-[58px] p-2.5 rounded-xl border-2 border-dashed border-border bg-surface-2/40 flex flex-wrap gap-2 items-center">
                  {selectedWords.length === 0 ? (
                    <span className="text-xs text-text-tertiary italic">
                      Tap tiles below to build the sentence…
                    </span>
                  ) : (
                    selectedWords.map((word, i) => (
                      <button
                        key={i}
                        disabled={isEvaluated}
                        onClick={() => handleRemoveWord(word, i)}
                        className="px-3 py-1.5 rounded-lg bg-accent text-white font-japanese font-bold text-sm shadow-xs hover:opacity-90 active:scale-95 transition-all"
                      >
                        {word}
                      </button>
                    ))
                  )}
                </div>
              </div>

              {/* Available Word Tiles Pool */}
              <div>
                <p className="text-[11px] text-text-tertiary font-bold uppercase tracking-wider mb-1.5">
                  Available Tiles (Click to add):
                </p>
                <div className="flex flex-wrap gap-2 p-3 bg-surface rounded-xl border border-border min-h-[52px]">
                  {availableWords.map((word, i) => (
                    <button
                      key={i}
                      disabled={isEvaluated}
                      onClick={() => handlePickWord(word, i)}
                      className="px-3.5 py-1.5 rounded-lg bg-surface-2 hover:bg-surface-2/80 border border-border text-text-primary font-japanese font-bold text-sm hover:border-accent/40 active:scale-95 transition-all shadow-xs"
                    >
                      {word}
                    </button>
                  ))}
                </div>
              </div>

              {/* Control Buttons */}
              {!isEvaluated ? (
                <div className="flex gap-2">
                  <button
                    onClick={handleResetCurrent}
                    className="py-2.5 px-4 rounded-xl bg-surface border border-border hover:bg-surface-2 text-xs font-bold text-text-secondary hover:text-text-primary transition-all"
                  >
                    Reset
                  </button>
                  <button
                    disabled={selectedWords.length === 0}
                    onClick={handleCheck}
                    className="flex-1 py-2.5 rounded-xl bg-accent text-white font-bold text-xs hover:opacity-90 disabled:opacity-40 transition-all shadow-sm"
                  >
                    Check Order
                  </button>
                </div>
              ) : (
                <div className="space-y-4 animate-fade-in">
                  <div
                    className={`p-4 rounded-xl border text-sm ${
                      isCorrect
                        ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-700 dark:text-emerald-300'
                        : 'bg-rose-500/10 border-rose-500/30 text-rose-700 dark:text-rose-300'
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      {isCorrect ? (
                        <CheckCircle2 size={17} className="text-emerald-500 flex-shrink-0 mt-0.5" />
                      ) : (
                        <XCircle size={17} className="text-rose-500 flex-shrink-0 mt-0.5" />
                      )}
                      <div>
                        <p className="font-bold">
                          {isCorrect ? 'Excellent! 正解' : 'Incorrect sentence order'}
                        </p>
                        <p className="text-xs mt-1 font-japanese font-semibold">
                          Answer: {String(current.correctAnswer)}
                        </p>
                        <p className="text-xs mt-1 opacity-80 leading-relaxed">
                          {current.explanation}
                        </p>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={handleNext}
                    className="w-full py-3 rounded-xl bg-accent text-white font-bold text-sm hover:opacity-90 active:scale-98 transition-all flex items-center justify-center gap-2 shadow-sm"
                  >
                    <span>{idx < exercises.length - 1 ? 'Next Sentence' : 'Finish Drill'}</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-4 space-y-4 animate-fade-in">
              <div className="w-16 h-16 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mx-auto text-3xl">
                🎉
              </div>
              <h3 className="text-xl font-bold text-text-primary">Sentence Puzzles Completed!</h3>
              <p className="text-sm text-text-secondary">
                You solved {score} out of {exercises.length} sentence puzzles correctly.
              </p>
              <button
                onClick={onClose}
                className="w-full py-2.5 rounded-xl bg-accent text-white font-bold text-xs hover:opacity-90 transition-all"
              >
                Done
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// ─── QUICK-FIRE 10-QUESTION SPRINT MODAL ──────────────────────────────────────

function QuickSprintModal({ onClose }: { onClose: () => void }) {
  const exercises = useMemo(() => getRandomSprintExercises(10), [])
  const [idx, setIdx] = useState(0)
  const [selectedOpt, setSelectedOpt] = useState<string | null>(null)
  const [score, setScore] = useState(0)
  const [streak, setStreak] = useState(0)
  const [maxStreak, setMaxStreak] = useState(0)
  const [finished, setFinished] = useState(false)
  const [missed, setMissed] = useState<Exercise[]>([])

  const current = exercises[idx]

  // Normalize options for current exercise
  const options = useMemo(() => {
    if (!current) return []
    if (current.options && current.options.length > 0) return current.options
    // Fallback options if missing
    return [String(current.correctAnswer), 'は', 'を', 'に'].sort(() => 0.5 - Math.random())
  }, [current])

  function handleSelect(opt: string) {
    if (selectedOpt !== null || !current) return
    setSelectedOpt(opt)

    const isCorrect =
      opt.trim().toLowerCase() === String(current.correctAnswer).trim().toLowerCase()
    if (isCorrect) {
      setScore((s) => s + 1)
      const ns = streak + 1
      setStreak(ns)
      if (ns > maxStreak) setMaxStreak(ns)
      playKanaAudio(opt)
    } else {
      setStreak(0)
      setMissed((prev) => [...prev, current])
    }

    setTimeout(() => {
      if (idx < exercises.length - 1) {
        setIdx((i) => i + 1)
        setSelectedOpt(null)
      } else {
        setFinished(true)
      }
    }, 1200)
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in" role="dialog" aria-modal="true">
      <div className="bg-surface rounded-2xl border border-border max-w-lg w-full shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-border bg-surface-2 flex-shrink-0">
          <div className="flex items-center gap-2">
            <Flame size={18} className="text-rose-500" />
            <p className="text-xs font-bold uppercase tracking-wider text-text-primary flex items-center gap-1.5">
              <span>Quick-Fire 10-Question Sprint</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 font-semibold border border-rose-500/20">
                10問スピード
              </span>
            </p>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-surface-2 text-text-secondary hover:text-text-primary transition-colors">
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1">
          {!finished && current ? (
            <div className="space-y-5">
              {/* Progress & Streak */}
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-text-tertiary">Question {idx + 1} of 10</span>
                <span className="text-rose-500 flex items-center gap-1">
                  <Flame size={14} />
                  <span>Streak: {streak}</span>
                </span>
              </div>

              <div className="h-1.5 w-full bg-border rounded-full overflow-hidden">
                <div
                  className="h-full bg-rose-500 rounded-full transition-all duration-300"
                  style={{ width: `${((idx + 1) / 10) * 100}%` }}
                />
              </div>

              {/* Question Card */}
              <div className="p-5 rounded-xl bg-surface-2 border border-border text-center space-y-2">
                <p className="text-xs text-text-tertiary uppercase tracking-wider font-semibold">
                  {current.prompt}
                </p>
                {current.sentence && (
                  <p className="text-xl font-japanese font-bold text-text-primary">
                    {current.sentence}
                  </p>
                )}
                {current.hint && (
                  <p className="text-xs text-text-secondary italic">Hint: {current.hint}</p>
                )}
              </div>

              {/* Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {options.map((opt) => {
                  let style = 'bg-surface border-border text-text-primary hover:bg-surface-2 active:scale-95'
                  const isAnswer = opt.trim().toLowerCase() === String(current.correctAnswer).trim().toLowerCase()
                  if (selectedOpt !== null) {
                    if (isAnswer) {
                      style = 'bg-emerald-500/15 border-emerald-500 text-emerald-600 dark:text-emerald-400 font-bold'
                    } else if (opt === selectedOpt) {
                      style = 'bg-rose-500/15 border-rose-500 text-rose-600 dark:text-rose-400'
                    } else {
                      style = 'bg-surface/50 border-border/50 text-text-tertiary opacity-40'
                    }
                  }

                  return (
                    <button
                      key={opt}
                      disabled={selectedOpt !== null}
                      onClick={() => handleSelect(opt)}
                      className={`p-3.5 rounded-xl border text-sm font-semibold transition-all text-left flex items-center justify-between ${style}`}
                    >
                      <span>{opt}</span>
                      {selectedOpt !== null && isAnswer && <CheckCircle2 size={16} className="text-emerald-500 flex-shrink-0" />}
                    </button>
                  )
                })}
              </div>
            </div>
          ) : (
            <div className="text-center py-4 space-y-4 animate-fade-in">
              <div className="w-16 h-16 rounded-full bg-rose-500/10 border border-rose-500/20 flex items-center justify-center mx-auto text-3xl">
                {score >= 8 ? '🏆' : '⚡'}
              </div>
              <h3 className="text-xl font-bold text-text-primary">Sprint Completed!</h3>
              <p className="text-sm text-text-secondary">
                You scored <strong className="text-accent">{score} / 10</strong> ({score * 10}%) with a max streak of 🔥 {maxStreak}.
              </p>

              {missed.length > 0 && (
                <div className="text-left p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 max-h-48 overflow-y-auto space-y-2">
                  <p className="text-xs font-bold text-rose-600 dark:text-rose-400">
                    Review Missed Questions ({missed.length})
                  </p>
                  {missed.map((m, i) => (
                    <div key={i} className="p-2 rounded-lg bg-surface border border-border text-xs">
                      <p className="font-semibold text-text-primary">{m.prompt}</p>
                      <p className="text-emerald-600 dark:text-emerald-400 font-bold mt-0.5">
                        Answer: {String(m.correctAnswer)}
                      </p>
                      <p className="text-text-secondary text-[11px] mt-0.5">{m.explanation}</p>
                    </div>
                  ))}
                </div>
              )}

              <button
                onClick={onClose}
                className="w-full py-2.5 rounded-xl bg-accent text-white font-bold text-xs hover:opacity-90 transition-all"
              >
                Done
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// ─── MAIN PRACTICE PAGE ───────────────────────────────────────────────────────

export default function PracticePage() {
  const navigate = useNavigate()
  const { progress } = useApp()

  const [activeDrillModal, setActiveDrillModal] = useState<'particle' | 'order' | 'sprint' | null>(null)
  const [unitFilter, setUnitFilter] = useState<string>('all')

  const allLessons = useMemo(() => {
    return n5Units.flatMap((u) => u.lessons)
  }, [])

  const filteredLessons = useMemo(() => {
    if (unitFilter === 'all') return allLessons
    return allLessons.filter((l) => l.unitId === unitFilter)
  }, [allLessons, unitFilter])

  return (
    <div className="space-y-7 animate-fade-in pb-12">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-accent-soft text-accent flex items-center justify-center">
            <Dumbbell size={18} />
          </div>
          <h2 className="text-xl font-bold text-text-primary">Practice Gym</h2>
          <span className="text-xs text-text-tertiary font-japanese font-medium">練習ジム</span>
        </div>
        <p className="text-sm text-text-secondary mt-1">
          High-yield interactive drills to master particles, Japanese syntax, and JLPT test speed.
        </p>
      </div>

      {/* Motivational Stats Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-surface rounded-xl border border-border p-4 shadow-card">
          <p className="text-xs text-text-tertiary font-medium">Daily Streak</p>
          <p className="text-xl font-bold text-amber-500 mt-1 flex items-center gap-1">
            <Flame size={18} />
            <span>{progress.studyStreak} Days</span>
          </p>
        </div>
        <div className="bg-surface rounded-xl border border-border p-4 shadow-card">
          <p className="text-xs text-text-tertiary font-medium">Available Drills</p>
          <p className="text-xl font-bold text-accent mt-1">4 Modes</p>
        </div>
        <div className="bg-surface rounded-xl border border-border p-4 shadow-card">
          <p className="text-xs text-text-tertiary font-medium">Curriculum Drills</p>
          <p className="text-xl font-bold text-text-primary mt-1">{allLessons.length} Lessons</p>
        </div>
        <div className="bg-surface rounded-xl border border-border p-4 shadow-card">
          <p className="text-xs text-text-tertiary font-medium">Weak Areas</p>
          <p className="text-xl font-bold text-rose-500 mt-1">
            {progress.weakAreas.length > 0 ? `${progress.weakAreas.length} Tracked` : 'All Clear!'}
          </p>
        </div>
      </div>

      {/* Featured Drill Arenas */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold uppercase tracking-wider text-text-tertiary">
            Interactive Drill Modes
          </h3>
          <span className="text-xs text-text-secondary font-medium">
            Select a mode to begin
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* 1. Particle Master */}
          <div className="bg-surface rounded-2xl border border-border p-5 shadow-card hover:shadow-card-hover hover:border-amber-500/40 transition-all flex flex-col justify-between group">
            <div>
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center mb-3">
                <Zap size={20} />
              </div>
              <h4 className="text-base font-bold text-text-primary group-hover:text-amber-500 transition-colors">
                Particle Master Drill
              </h4>
              <p className="text-[11px] text-text-tertiary font-japanese font-medium mb-2">助詞特訓 (は・を・に・で・へ・と)</p>
              <p className="text-xs text-text-secondary leading-relaxed mb-4">
                Master the #1 stumbling block in Japanese. Rapid-fire drill testing particle usage with instant feedback.
              </p>
            </div>
            <button
              onClick={() => setActiveDrillModal('particle')}
              className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1.5 active:scale-98"
            >
              <Play size={13} fill="currentColor" />
              <span>Start Particle Drill</span>
            </button>
          </div>

          {/* 2. Sentence Builder Puzzle */}
          <div className="bg-surface rounded-2xl border border-border p-5 shadow-card hover:shadow-card-hover hover:border-indigo-500/40 transition-all flex flex-col justify-between group">
            <div>
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center mb-3">
                <Puzzle size={20} />
              </div>
              <h4 className="text-base font-bold text-text-primary group-hover:text-indigo-500 transition-colors">
                Sentence Builder Puzzle
              </h4>
              <p className="text-[11px] text-text-tertiary font-japanese font-medium mb-2">文作成パズル (語順トレーニング)</p>
              <p className="text-xs text-text-secondary leading-relaxed mb-4">
                Arrange scrambled word tiles into natural Japanese syntax (Topic + Time + Place + Object + Verb).
              </p>
            </div>
            <button
              onClick={() => setActiveDrillModal('order')}
              className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1.5 active:scale-98"
            >
              <Play size={13} fill="currentColor" />
              <span>Start Sentence Builder</span>
            </button>
          </div>

          {/* 3. Quick-Fire 10-Question Sprint */}
          <div className="bg-surface rounded-2xl border border-border p-5 shadow-card hover:shadow-card-hover hover:border-rose-500/40 transition-all flex flex-col justify-between group">
            <div>
              <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-500 flex items-center justify-center mb-3">
                <Flame size={20} />
              </div>
              <h4 className="text-base font-bold text-text-primary group-hover:text-rose-500 transition-colors">
                Quick-Fire 10 Sprint
              </h4>
              <p className="text-[11px] text-text-tertiary font-japanese font-medium mb-2">スピードテスト (総合10問)</p>
              <p className="text-xs text-text-secondary leading-relaxed mb-4">
                A high-intensity 10-question sprint testing mixed particles, vocabulary, and grammar from across N5.
              </p>
            </div>
            <button
              onClick={() => setActiveDrillModal('sprint')}
              className="w-full py-2.5 rounded-xl bg-rose-500 hover:bg-rose-600 text-white text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1.5 active:scale-98"
            >
              <Play size={13} fill="currentColor" />
              <span>Launch 10-Question Sprint</span>
            </button>
          </div>
        </div>
      </div>

      {/* Lesson Exercise Direct Hub */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-t border-border pt-6">
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-text-tertiary flex items-center gap-2">
              <BookOpen size={16} />
              <span>Lesson Exercise Hub</span>
            </h3>
            <p className="text-xs text-text-secondary mt-0.5">
              Target individual lesson practice exercises on demand.
            </p>
          </div>

          {/* Unit Filters */}
          <div className="flex gap-1.5 flex-wrap">
            <button
              onClick={() => setUnitFilter('all')}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                unitFilter === 'all'
                  ? 'bg-accent text-white'
                  : 'bg-surface border border-border text-text-secondary hover:bg-surface-2'
              }`}
            >
              All Units
            </button>
            {n5Units.map((u) => (
              <button
                key={u.id}
                onClick={() => setUnitFilter(u.id)}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                  unitFilter === u.id
                    ? 'bg-accent text-white'
                    : 'bg-surface border border-border text-text-secondary hover:bg-surface-2'
                }`}
              >
                Unit {u.unitNumber}
              </button>
            ))}
          </div>
        </div>

        {/* Lesson Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {filteredLessons.map((lesson) => {
            const lessonData = LESSON_REGISTRY[lesson.id]
            const exerciseCount = lessonData?.exercises?.length ?? 8
            const lp = progress.lessonProgress[lesson.id]
            const isCompleted = lp?.status === 'completed'

            return (
              <button
                key={lesson.id}
                onClick={() => navigate(`/learn/${lesson.id}`)}
                className="bg-surface rounded-xl border border-border p-4 shadow-card hover:shadow-card-hover hover:border-accent/40 text-left transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="text-[10px] font-bold text-text-tertiary uppercase tracking-wider">
                      Lesson {lesson.lessonNumber} · {lesson.titleJa}
                    </span>
                    {isCompleted ? (
                      <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 size={12} />
                        <span>Done</span>
                      </span>
                    ) : (
                      <span className="text-[10px] text-text-tertiary">
                        {exerciseCount} Exercises
                      </span>
                    )}
                  </div>
                  <p className="text-sm font-bold text-text-primary group-hover:text-accent transition-colors">
                    {lesson.title}
                  </p>
                  <p className="text-xs text-text-secondary line-clamp-2 mt-1">
                    {lesson.description}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-3 mt-3 border-t border-border/60 text-xs font-semibold text-accent">
                  <span>Practice Lesson Exercises</span>
                  <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Modals */}
      {activeDrillModal === 'particle' && (
        <ParticleDrillModal onClose={() => setActiveDrillModal(null)} />
      )}
      {activeDrillModal === 'order' && (
        <SentenceOrderDrillModal onClose={() => setActiveDrillModal(null)} />
      )}
      {activeDrillModal === 'sprint' && (
        <QuickSprintModal onClose={() => setActiveDrillModal(null)} />
      )}
    </div>
  )
}
