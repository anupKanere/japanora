import { useState, useMemo } from 'react'
import {
  RefreshCcw,
  BookMarked,
  FileText,
  AlertTriangle,
  CheckCircle2,
  Play,
  Volume2,
  X,
  ArrowRight,
  RotateCcw,
  Sparkles,
  Zap,
} from 'lucide-react'
import { useApp } from '@/app/AppContext'
import { n5Vocabulary } from '@/data/vocabulary/n5-vocab'
import { n5Grammar } from '@/data/grammar/n5-grammar'
import { ExampleBlock } from '@/components/JapaneseText'
import { playKanaAudio } from '@/data/kana/kana-data'
import { progressService } from '@/services/progressService'
import { getExercisesByMistakeCategory } from '@/data/curriculum/n5/registry'
import type { MistakeCategory, FamiliarityLevel } from '@/types'

const MISTAKE_LABELS: Record<string, string> = {
  particle: 'Particle usage (は・が・を・に・で)',
  nounModification: 'Noun modification (の)',
  verbConjugation: 'Verb conjugation (ます・て・ない)',
  vocabulary: 'Vocabulary & word choices',
  wordOrder: 'Word order (語順)',
  spelling: 'Spelling & kana reading',
  kanji: 'Kanji reading',
  meaning: 'Meaning & translation',
  counter: 'Counters (つ・本・枚・個)',
  politeness: 'Politeness level',
  other: 'Other areas',
}

type RevisionTab = 'mistakes' | 'vocab' | 'grammar'

// ─── INTERACTIVE SRS DAILY REVIEW MODAL ───────────────────────────────────────

interface ReviewItem {
  id: string
  kind: 'vocab' | 'grammar'
  title: string
  subtitle?: string
  meaning: string
  example?: {
    hiragana: string
    kanji?: string
    meaning: string
  }
}

function DailyReviewModal({
  items,
  onClose,
  onGraded,
}: {
  items: ReviewItem[]
  onClose: () => void
  onGraded: () => void
}) {
  const [idx, setIdx] = useState(0)
  const [revealed, setRevealed] = useState(false)
  const [gradedCount, setGradedCount] = useState(0)
  const [finished, setFinished] = useState(false)

  const current = items[idx]

  function handleGrade(level: FamiliarityLevel) {
    if (!current) return
    if (current.kind === 'vocab') {
      progressService.setVocabFamiliarity(current.id, level)
    } else {
      progressService.setGrammarFamiliarity(current.id, level)
    }
    onGraded()
    setGradedCount((c) => c + 1)

    if (idx < items.length - 1) {
      setIdx((i) => i + 1)
      setRevealed(false)
    } else {
      setFinished(true)
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in" role="dialog" aria-modal="true">
      <div className="bg-surface rounded-2xl border border-border max-w-lg w-full shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-border bg-surface-2 flex-shrink-0">
          <div className="flex items-center gap-2">
            <RefreshCcw size={18} className="text-accent animate-spin-slow" />
            <p className="text-xs font-bold uppercase tracking-wider text-text-primary flex items-center gap-1.5">
              <span>Spaced Repetition Review</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-accent/10 text-accent font-semibold border border-accent/20">
                復習セッション
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
              <div className="flex items-center justify-between text-xs text-text-tertiary font-semibold">
                <span>Card {idx + 1} of {items.length}</span>
                <span className="capitalize px-2 py-0.5 rounded-full bg-surface-2 border border-border">
                  {current.kind}
                </span>
              </div>

              <div className="h-1.5 w-full bg-border rounded-full overflow-hidden">
                <div
                  className="h-full bg-accent rounded-full transition-all duration-300"
                  style={{ width: `${((idx + 1) / items.length) * 100}%` }}
                />
              </div>

              {/* Flashcard Box */}
              <div className="p-6 rounded-2xl bg-surface-2 border border-border text-center space-y-3">
                <p className="text-2xl sm:text-3xl font-japanese font-bold text-text-primary tracking-wide break-words leading-snug">
                  {current.title}
                </p>
                {current.subtitle && (
                  <p className="text-sm font-japanese text-text-tertiary">
                    {current.subtitle}
                  </p>
                )}
                <button
                  onClick={() => playKanaAudio(current.title)}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface border border-border hover:bg-surface-2 text-xs text-accent font-semibold shadow-xs transition-colors"
                >
                  <Volume2 size={13} />
                  <span>Audio</span>
                </button>
              </div>

              {/* Revealed Back */}
              {revealed ? (
                <div className="space-y-4 animate-fade-in">
                  <div className="p-4 rounded-xl bg-surface border border-border space-y-2">
                    <p className="text-xs font-bold text-text-tertiary uppercase tracking-wider">Meaning</p>
                    <p className="text-base font-semibold text-text-primary">{current.meaning}</p>
                    {current.example && (
                      <div className="pt-2 border-t border-border mt-2">
                        <ExampleBlock
                          hiragana={current.example.hiragana}
                          kanji={current.example.kanji}
                          meaning={current.example.meaning}
                        />
                      </div>
                    )}
                  </div>

                  {/* Rating Buttons */}
                  <div>
                    <p className="text-xs text-text-tertiary text-center font-semibold mb-2">
                      How well did you remember this?
                    </p>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        onClick={() => handleGrade('learning')}
                        className="py-2.5 px-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-600 dark:text-rose-400 text-xs font-bold transition-all text-center"
                      >
                        <p className="text-sm">もう一度</p>
                        <p className="text-[10px] opacity-80 mt-0.5">Hard (Learning)</p>
                      </button>
                      <button
                        onClick={() => handleGrade('familiar')}
                        className="py-2.5 px-2 rounded-xl bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 text-blue-600 dark:text-blue-400 text-xs font-bold transition-all text-center"
                      >
                        <p className="text-sm">普通</p>
                        <p className="text-[10px] opacity-80 mt-0.5">Good (Familiar)</p>
                      </button>
                      <button
                        onClick={() => handleGrade('mastered')}
                        className="py-2.5 px-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-bold transition-all text-center"
                      >
                        <p className="text-sm">完璧</p>
                        <p className="text-[10px] opacity-80 mt-0.5">Easy (Mastered)</p>
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setRevealed(true)
                    playKanaAudio(current.title)
                  }}
                  className="w-full py-3 rounded-xl bg-accent text-white font-bold text-xs hover:opacity-90 active:scale-98 transition-all shadow-sm flex items-center justify-center gap-2"
                >
                  <Sparkles size={14} />
                  <span>Reveal Meaning & Example</span>
                </button>
              )}
            </div>
          ) : (
            <div className="text-center py-4 space-y-4 animate-fade-in">
              <div className="w-16 h-16 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center mx-auto text-3xl">
                🎉
              </div>
              <h3 className="text-xl font-bold text-text-primary">Review Session Complete!</h3>
              <p className="text-sm text-text-secondary">
                You successfully reviewed {gradedCount} items in this session. Memory retention boosted!
              </p>
              <button
                onClick={onClose}
                className="w-full py-2.5 rounded-xl bg-accent text-white font-bold text-xs hover:opacity-90 transition-all"
              >
                Close & Return
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// ─── WEAK AREA TARGETED DRILL MODAL ───────────────────────────────────────────

function WeakAreaDrillModal({
  category,
  onClose,
  onResolved,
}: {
  category: MistakeCategory
  onClose: () => void
  onResolved: () => void
}) {
  const exercises = useMemo(() => {
    const raw = getExercisesByMistakeCategory(category)
    if (raw.length === 0) return []
    return [...raw].sort(() => 0.5 - Math.random()).slice(0, 5)
  }, [category])

  const [idx, setIdx] = useState(0)
  const [selectedOpt, setSelectedOpt] = useState<string | null>(null)
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)

  const current = exercises[idx]

  const options = useMemo(() => {
    if (!current) return []
    if (current.options && current.options.length > 0) return current.options
    return [String(current.correctAnswer), 'は', 'を', 'に'].sort(() => 0.5 - Math.random())
  }, [current])

  function handleSelect(opt: string) {
    if (selectedOpt !== null || !current) return
    setSelectedOpt(opt)

    const isCorrect = opt.trim().toLowerCase() === String(current.correctAnswer).trim().toLowerCase()
    if (isCorrect) {
      setScore((s) => s + 1)
      playKanaAudio(opt)
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

  function handleResolveArea() {
    progressService.resolveWeakArea(category)
    onResolved()
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in" role="dialog" aria-modal="true">
      <div className="bg-surface rounded-2xl border border-border max-w-lg w-full shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-border bg-surface-2 flex-shrink-0">
          <div className="flex items-center gap-2">
            <Zap size={18} className="text-warning" />
            <p className="text-xs font-bold uppercase tracking-wider text-text-primary">
              Drill Weakness: {MISTAKE_LABELS[category] ?? category}
            </p>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-surface-2 text-text-secondary hover:text-text-primary transition-colors">
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1">
          {exercises.length === 0 ? (
            <div className="text-center py-6 space-y-3">
              <CheckCircle2 size={36} className="text-emerald-500 mx-auto" />
              <p className="text-sm font-semibold text-text-primary">No pending drill questions found for this topic.</p>
              <button
                onClick={handleResolveArea}
                className="px-4 py-2 rounded-xl bg-accent text-white text-xs font-bold"
              >
                Mark as Mastered
              </button>
            </div>
          ) : !finished && current ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs font-semibold text-text-tertiary">
                <span>Question {idx + 1} of {exercises.length}</span>
                <span>Score: {score}</span>
              </div>

              <div className="p-4 rounded-xl bg-surface-2 border border-border text-center space-y-2">
                <p className="text-xs text-text-tertiary font-semibold uppercase">{current.prompt}</p>
                {current.sentence && (
                  <p className="text-xl font-japanese font-bold text-text-primary">{current.sentence}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                {options.map((opt) => {
                  let style = 'bg-surface border-border text-text-primary hover:bg-surface-2'
                  const isAnswer = opt.trim().toLowerCase() === String(current.correctAnswer).trim().toLowerCase()
                  if (selectedOpt !== null) {
                    if (isAnswer) {
                      style = 'bg-emerald-500/15 border-emerald-500 text-emerald-600 dark:text-emerald-400 font-bold'
                    } else if (opt === selectedOpt) {
                      style = 'bg-rose-500/15 border-rose-500 text-rose-600 dark:text-rose-400'
                    } else {
                      style = 'opacity-40'
                    }
                  }
                  return (
                    <button
                      key={opt}
                      disabled={selectedOpt !== null}
                      onClick={() => handleSelect(opt)}
                      className={`p-3 rounded-xl border text-sm font-semibold transition-all ${style}`}
                    >
                      {opt}
                    </button>
                  )
                })}
              </div>
            </div>
          ) : (
            <div className="text-center py-4 space-y-4 animate-fade-in">
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto text-3xl">
                {score >= 4 ? '🏆' : '💪'}
              </div>
              <h3 className="text-xl font-bold text-text-primary">Weak Area Drill Complete!</h3>
              <p className="text-sm text-text-secondary">
                You scored <strong className="text-accent">{score} / {exercises.length}</strong> on this targeted drill.
              </p>

              {score >= 4 ? (
                <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-xs text-emerald-700 dark:text-emerald-300">
                  <p className="font-bold">Great job! You showed strong mastery.</p>
                  <button
                    onClick={handleResolveArea}
                    className="mt-2 w-full py-2 rounded-lg bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700 transition-colors"
                  >
                    Clear from Weak Areas List
                  </button>
                </div>
              ) : (
                <p className="text-xs text-text-tertiary">
                  Keep reviewing to graduate this weak area!
                </p>
              )}

              <button
                onClick={onClose}
                className="w-full py-2.5 rounded-xl bg-surface border border-border text-text-primary font-bold text-xs hover:bg-surface-2 transition-all"
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

// ─── MAIN REVISION PAGE ───────────────────────────────────────────────────────

export default function RevisionPage() {
  const { progress, showKanji, refreshProgress } = useApp()
  const [activeTab, setActiveTab] = useState<RevisionTab>('mistakes')
  const [isDailyReviewOpen, setIsDailyReviewOpen] = useState(false)
  const [drillWeakCategory, setDrillWeakCategory] = useState<MistakeCategory | null>(null)

  // Due Vocab items in 'learning'
  const learningVocab = useMemo(() => {
    return n5Vocabulary.filter(
      (v) => progress.vocabProgress[v.id]?.familiarity === 'learning'
    )
  }, [progress.vocabProgress])

  // Due Grammar items with familiarity < 'familiar'
  const reviewGrammar = useMemo(() => {
    return n5Grammar.filter(
      (g) => !progress.grammarProgress[g.id] || progress.grammarProgress[g.id].familiarity === 'learning'
    )
  }, [progress.grammarProgress])

  const totalDue = learningVocab.length + reviewGrammar.length

  // Build combined review queue
  const reviewQueue = useMemo<ReviewItem[]>(() => {
    const vocabItems: ReviewItem[] = learningVocab.map((v) => ({
      id: v.id,
      kind: 'vocab',
      title: v.hiragana,
      subtitle: v.kanji ? `（${v.kanji}）` : undefined,
      meaning: v.meaning,
      example: v.examples?.[0],
    }))

    const grammarItems: ReviewItem[] = reviewGrammar.map((g) => ({
      id: g.id,
      kind: 'grammar',
      title: g.pattern,
      meaning: g.meaning,
      example: g.examples?.[0],
    }))

    return [...vocabItems, ...grammarItems].sort(() => 0.5 - Math.random())
  }, [learningVocab, reviewGrammar])

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-accent-soft text-accent flex items-center justify-center">
            <RefreshCcw size={18} />
          </div>
          <h2 className="text-xl font-bold text-text-primary">Revision & Weak Areas</h2>
          <span className="text-xs text-text-tertiary font-japanese font-medium">復習と弱点克服</span>
        </div>
        <p className="text-sm text-text-secondary mt-1">
          Spaced repetition reviews to solidify long-term retention and heal mistake areas.
        </p>
      </div>

      {/* Due Today Interactive Hero Card */}
      <div className="bg-gradient-to-r from-accent/10 via-accent/5 to-surface rounded-2xl border border-accent/25 p-5 shadow-card flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-accent text-white flex items-center justify-center flex-shrink-0 shadow-sm">
            <RefreshCcw size={22} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-text-primary">
                {totalDue > 0 ? `${totalDue} Items Due for Review` : 'All Caught Up! お疲れ様でした'}
              </h3>
              {totalDue > 0 && (
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-accent text-white font-bold animate-pulse">
                  Due Now
                </span>
              )}
            </div>
            <p className="text-xs text-text-secondary mt-0.5">
              {learningVocab.length} vocabulary words · {reviewGrammar.length} grammar points in learning stage
            </p>
          </div>
        </div>

        {totalDue > 0 ? (
          <button
            onClick={() => setIsDailyReviewOpen(true)}
            className="px-5 py-2.5 rounded-xl bg-accent text-white text-xs font-bold hover:opacity-90 shadow-sm active:scale-95 transition-all flex items-center gap-2 flex-shrink-0"
          >
            <Play size={14} fill="currentColor" />
            <span>Start Review Session</span>
          </button>
        ) : (
          <div className="flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
            <CheckCircle2 size={16} />
            <span>No items due today</span>
          </div>
        )}
      </div>

      {/* Navigation Tabs */}
      <div className="flex gap-1 bg-surface-2 p-1 rounded-xl border border-border">
        {([
          {
            id: 'mistakes',
            label: `Mistake Bank (${progress.weakAreas.length})`,
            icon: <AlertTriangle size={13} />,
          },
          {
            id: 'vocab',
            label: `Due Vocab (${learningVocab.length})`,
            icon: <BookMarked size={13} />,
          },
          {
            id: 'grammar',
            label: `Due Grammar (${reviewGrammar.length})`,
            icon: <FileText size={13} />,
          },
        ] as { id: RevisionTab; label: string; icon: React.ReactNode }[]).map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={[
              'flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg text-xs font-semibold transition-all',
              activeTab === tab.id
                ? 'bg-surface text-text-primary shadow-sm border border-border'
                : 'text-text-secondary hover:text-text-primary',
            ].join(' ')}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* ── 1. MISTAKES TAB ────────────────────────────────────────────────────── */}
      {activeTab === 'mistakes' && (
        <div className="space-y-3 animate-fade-in">
          {progress.weakAreas.length > 0 ? (
            <>
              <p className="text-xs text-text-secondary">
                Identified weak spots based on your homework and exercises. Drill each area to graduate it.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {progress.weakAreas.map((area) => (
                  <div
                    key={area}
                    className="bg-surface rounded-xl border border-border p-4 shadow-card flex items-center justify-between gap-3 hover:border-warning/40 transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-warning-soft text-warning flex items-center justify-center flex-shrink-0 mt-0.5">
                        <AlertTriangle size={16} />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-text-primary">
                          {MISTAKE_LABELS[area] ?? area}
                        </p>
                        <p className="text-[11px] text-text-secondary">Needs targeted exercise drill</p>
                      </div>
                    </div>

                    <button
                      onClick={() => setDrillWeakCategory(area as MistakeCategory)}
                      className="px-3 py-1.5 rounded-lg bg-surface-2 hover:bg-surface border border-border text-xs font-bold text-text-primary hover:text-accent hover:border-accent/40 transition-all flex items-center gap-1 active:scale-95 flex-shrink-0"
                    >
                      <span>Drill</span>
                      <ArrowRight size={12} />
                    </button>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-12 bg-surface rounded-2xl border border-border p-6 space-y-2">
              <CheckCircle2 size={42} className="text-emerald-500 mx-auto" />
              <p className="text-sm font-bold text-text-primary">No Weak Areas Flagged!</p>
              <p className="text-xs text-text-secondary max-w-sm mx-auto">
                You currently have zero mistake areas identified. Keep practicing in the Gym and Lessons to maintain mastery.
              </p>
            </div>
          )}
        </div>
      )}

      {/* ── 2. VOCAB TAB ──────────────────────────────────────────────────────── */}
      {activeTab === 'vocab' && (
        <div className="space-y-3 animate-fade-in">
          {learningVocab.length === 0 ? (
            <div className="text-center py-12 bg-surface rounded-2xl border border-border p-6 space-y-2">
              <CheckCircle2 size={42} className="text-emerald-500 mx-auto" />
              <p className="text-sm font-bold text-text-primary">All Vocabulary Familiar or Mastered!</p>
              <p className="text-xs text-text-secondary">
                No vocabulary words currently need review.
              </p>
            </div>
          ) : (
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <p className="text-xs text-text-secondary">
                  Vocabulary words in the active learning stage:
                </p>
                <button
                  onClick={() => setIsDailyReviewOpen(true)}
                  className="text-xs text-accent font-bold hover:underline flex items-center gap-1"
                >
                  <RotateCcw size={12} />
                  <span>Review All {learningVocab.length} Words</span>
                </button>
              </div>

              {learningVocab.map((v) => {
                const vp = progress.vocabProgress[v.id]
                return (
                  <div key={v.id} className="bg-surface rounded-xl border border-border p-4 shadow-card">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="text-base font-japanese font-bold text-text-primary">
                            {v.hiragana}
                          </p>
                          {showKanji && v.kanji && (
                            <p className="text-xs font-japanese text-text-tertiary">
                              （{v.kanji}）
                            </p>
                          )}
                          <button
                            onClick={() => playKanaAudio(v.hiragana)}
                            className="text-text-tertiary hover:text-accent transition-colors"
                            aria-label="Play pronunciation"
                          >
                            <Volume2 size={14} />
                          </button>
                        </div>
                        <p className="text-sm text-text-secondary mt-0.5">{v.meaning}</p>
                      </div>
                      <div className="text-right text-xs text-text-secondary flex-shrink-0 font-mono">
                        <span className="text-emerald-600 dark:text-emerald-400">✓ {vp?.correctCount ?? 0}</span>
                        <span className="mx-1.5 text-border">·</span>
                        <span className="text-rose-500">✗ {vp?.incorrectCount ?? 0}</span>
                      </div>
                    </div>
                    {v.examples?.[0] && (
                      <div className="mt-3 pt-3 border-t border-border">
                        <ExampleBlock
                          hiragana={v.examples[0].hiragana}
                          kanji={v.examples[0].kanji}
                          meaning={v.examples[0].meaning}
                        />
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </div>
      )}

      {/* ── 3. GRAMMAR TAB ────────────────────────────────────────────────────── */}
      {activeTab === 'grammar' && (
        <div className="space-y-3 animate-fade-in">
          {reviewGrammar.length === 0 ? (
            <div className="text-center py-12 bg-surface rounded-2xl border border-border p-6 space-y-2">
              <CheckCircle2 size={42} className="text-emerald-500 mx-auto" />
              <p className="text-sm font-bold text-text-primary">All Grammar Points Familiar!</p>
              <p className="text-xs text-text-secondary">
                No grammar points are currently pending review.
              </p>
            </div>
          ) : (
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <p className="text-xs text-text-secondary">
                  Grammar points requiring reinforcement:
                </p>
                <button
                  onClick={() => setIsDailyReviewOpen(true)}
                  className="text-xs text-accent font-bold hover:underline flex items-center gap-1"
                >
                  <RotateCcw size={12} />
                  <span>Review All {reviewGrammar.length} Points</span>
                </button>
              </div>

              {reviewGrammar.map((g) => {
                const gp = progress.grammarProgress[g.id]
                return (
                  <div key={g.id} className="bg-surface rounded-xl border border-border p-4 shadow-card hover:border-accent/30 transition-all">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-accent-soft text-accent border border-accent/20 flex-shrink-0">
                            文法
                          </span>
                          <p className="text-base font-japanese font-bold text-text-primary">
                            {g.pattern}
                          </p>
                          <button
                            onClick={() => playKanaAudio(g.pattern)}
                            className="text-text-tertiary hover:text-accent transition-colors p-1 rounded-md hover:bg-surface-2"
                            aria-label="Listen to grammar pattern"
                          >
                            <Volume2 size={14} />
                          </button>
                          {g.structure && (
                            <span className="text-[11px] text-text-tertiary bg-surface-2 px-2 py-0.5 rounded-full border border-border">
                              {g.structure}
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-text-secondary mt-1">{g.meaning}</p>
                      </div>

                      <div className="text-right text-xs text-text-secondary flex-shrink-0 font-mono pt-0.5">
                        <span className="text-emerald-600 dark:text-emerald-400">✓ {gp?.correctCount ?? 0}</span>
                        <span className="mx-1.5 text-border">·</span>
                        <span className="text-rose-500">✗ {gp?.incorrectCount ?? 0}</span>
                      </div>
                    </div>

                    {g.examples?.[0] && (
                      <div className="mt-3 pt-3 border-t border-border">
                        <ExampleBlock
                          hiragana={g.examples[0].hiragana}
                          kanji={g.examples[0].kanji}
                          meaning={g.examples[0].meaning}
                        />
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </div>
      )}

      {/* Interactive Modals */}
      {isDailyReviewOpen && (
        <DailyReviewModal
          items={reviewQueue}
          onClose={() => setIsDailyReviewOpen(false)}
          onGraded={() => refreshProgress()}
        />
      )}

      {drillWeakCategory && (
        <WeakAreaDrillModal
          category={drillWeakCategory}
          onClose={() => setDrillWeakCategory(null)}
          onResolved={() => refreshProgress()}
        />
      )}
    </div>
  )
}
