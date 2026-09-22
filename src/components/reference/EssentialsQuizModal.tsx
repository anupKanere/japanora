import { useState, useMemo, useEffect, useCallback } from 'react'
import {
  Flame,
  X,
  Volume2,
  CheckCircle2,
  XCircle,
  RotateCcw,
  ArrowRight,
  Languages,
} from 'lucide-react'
import { audioService } from '@/services/audioService'
import {
  n5Greetings,
  n5BodyParts,
  n5DaysOfWeek,
  n5DateWords,
  n5Numbers,
  n5ClockHours,
  n5ClockMinutes,
  n5TimeWords,
  n5FamilyOwn,
  n5FamilyOthers,
  n5WHQuestions,
  n5Particles,
  n5Adjectives,
  n5VerbChart,
  n5Kanji110,
} from '@/data/reference/n5-reference'

export interface UniversalQuizItem {
  id: string
  hasKanji: boolean
  displayKanji?: string   // Clean Kanji only or numbers (used when testing Hiragana readings)
  displayFull: string     // Full display with furigana/hiragana (used for Meaning mode & review)
  reading: string         // Hiragana reading / answer
  meaning: string         // English meaning / answer
  audioText: string       // Text for TTS audio
  hint?: string
}

interface EssentialsQuizModalProps {
  tabId: string
  onClose: () => void
}

export function EssentialsQuizModal({ tabId, onClose }: EssentialsQuizModalProps) {
  // Mode toggle: 'english' (Meaning Drill: JP -> EN) vs 'hiragana' (Reading/Recall Drill: Kanji/EN -> Hiragana)
  const [optionMode, setOptionMode] = useState<'english' | 'hiragana'>('english')
  const [currentIdx, setCurrentIdx] = useState(0)
  const [score, setScore] = useState(0)
  const [streak, setStreak] = useState(0)
  const [maxStreak, setMaxStreak] = useState(0)
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [isAnswered, setIsAnswered] = useState(false)
  const [isFinished, setIsFinished] = useState(false)
  const [missedItems, setMissedItems] = useState<UniversalQuizItem[]>([])
  const [deckKey, setDeckKey] = useState(0)

  // 1. Load FULL dataset for this tab with smart hasKanji & display separation
  const { items: allTabItems, title: tabTitle, emoji: tabEmoji } = useMemo(() => {
    switch (tabId) {
      case 'verbs':
        return {
          title: 'Verb Chart',
          emoji: '動',
          items: n5VerbChart.map((v, i) => ({
            id: `v_${i}`,
            hasKanji: Boolean(v.kanji),
            displayKanji: v.kanji || v.dictionary,
            displayFull: v.kanji ? `${v.kanji} (${v.dictionary})` : v.dictionary,
            reading: v.dictionary,
            meaning: v.meaning,
            audioText: v.dictionary,
            hint: `${v.group} • ます: ${v.masu}`,
          })),
        }
      case 'adj':
        return {
          title: 'Adjectives',
          emoji: '✏️',
          items: n5Adjectives.map((a, i) => ({
            id: `adj_${i}`,
            hasKanji: Boolean(a.kanji),
            displayKanji: a.kanji || a.hiragana,
            displayFull: a.kanji ? `${a.kanji} (${a.hiragana})` : a.hiragana,
            reading: a.hiragana,
            meaning: a.meaning,
            audioText: a.hiragana,
            hint: `${a.type === 'i' ? 'い-adjective' : 'な-adjective'}`,
          })),
        }
      case 'kanji':
        return {
          title: 'Kanji',
          emoji: '漢',
          items: n5Kanji110.map((k, i) => ({
            id: `k_${i}`,
            hasKanji: true,
            displayKanji: k.character,
            displayFull: k.character,
            reading: k.kunyomi[0] ? k.kunyomi[0].replace(/[.-]/g, '') : k.onyomi[0] || '',
            meaning: k.meaning,
            audioText: k.character,
            hint: `On: ${k.onyomi.join(', ') || '—'} | Kun: ${k.kunyomi.join(', ') || '—'}`,
          })),
        }
      case 'numbers':
        return {
          title: 'Numbers & Counters',
          emoji: '🔢',
          items: n5Numbers.map((n, i) => ({
            id: `n_${i}`,
            hasKanji: true,
            displayKanji: n.kanji || String(n.value),
            displayFull: n.kanji ? `${n.kanji} (${n.hiragana})` : `${n.value} (${n.hiragana})`,
            reading: n.hiragana,
            meaning: String(n.value) + (n.note ? ` (${n.note})` : ''),
            audioText: n.hiragana,
            hint: n.romaji,
          })),
        }
      case 'clock': {
        const hours = n5ClockHours.map((h, i) => ({
          id: `h_${i}`,
          hasKanji: true,
          displayKanji: `${h.hour}時`,
          displayFull: `${h.hour}時 (${h.hiragana})`,
          reading: h.hiragana,
          meaning: `${h.hour}:00 (${h.hour} o'clock)`,
          audioText: h.hiragana,
          hint: h.romaji,
        }))
        const mins = n5ClockMinutes.map((m, i) => ({
          id: `m_${i}`,
          hasKanji: true,
          displayKanji: m.kanji || `${m.minute}分`,
          displayFull: `${m.kanji || `${m.minute}分`} (${m.hiragana})`,
          reading: m.hiragana,
          meaning: `${m.minute} minute(s)`,
          audioText: m.hiragana,
          hint: m.romaji,
        }))
        const times = n5TimeWords.map((t, i) => ({
          id: `t_${i}`,
          hasKanji: Boolean(t.kanji),
          displayKanji: t.kanji || t.meaning,
          displayFull: t.kanji ? `${t.kanji} (${t.hiragana})` : t.hiragana,
          reading: t.hiragana,
          meaning: t.meaning,
          audioText: t.hiragana,
          hint: t.romaji,
        }))
        return {
          title: 'Clock & Time',
          emoji: '🕐',
          items: [...hours, ...mins, ...times],
        }
      }
      case 'days': {
        const days = n5DaysOfWeek.map((d, i) => ({
          id: `d_${i}`,
          hasKanji: true,
          displayKanji: d.kanji,
          displayFull: `${d.kanji} (${d.hiragana})`,
          reading: d.hiragana,
          meaning: `${d.meaning} (${d.element})`,
          audioText: d.hiragana,
          hint: d.romaji,
        }))
        const dates = n5DateWords.map((dt, i) => ({
          id: `dt_${i}`,
          hasKanji: Boolean(dt.kanji),
          displayKanji: dt.kanji || dt.meaning,
          displayFull: dt.kanji ? `${dt.kanji} (${dt.hiragana})` : dt.hiragana,
          reading: dt.hiragana,
          meaning: dt.meaning,
          audioText: dt.hiragana,
          hint: dt.romaji,
        }))
        return {
          title: 'Days & Dates',
          emoji: '📅',
          items: [...days, ...dates],
        }
      }
      case 'body':
        return {
          title: 'Body Parts',
          emoji: '🧍',
          items: n5BodyParts.map((b, i) => ({
            id: `b_${i}`,
            hasKanji: Boolean(b.kanji),
            displayKanji: b.kanji || b.meaning,
            displayFull: b.kanji ? `${b.kanji} (${b.hiragana})` : b.hiragana,
            reading: b.hiragana,
            meaning: b.meaning,
            audioText: b.hiragana,
            hint: `${b.region} • ${b.romaji}`,
          })),
        }
      case 'family':
      case 'family-own':
      case 'family-oth': {
        const own = n5FamilyOwn.map((f, i) => ({
          id: `fo_${i}`,
          hasKanji: Boolean(f.kanji),
          displayKanji: f.kanji || f.hiragana,
          displayFull: f.kanji ? `${f.kanji} (${f.hiragana})` : f.hiragana,
          reading: f.hiragana,
          meaning: `My ${f.meaning} (Humble / 内)`,
          audioText: f.hiragana,
          hint: 'Own family (Humble)',
        }))
        const others = n5FamilyOthers.map((f, i) => ({
          id: `foth_${i}`,
          hasKanji: Boolean(f.kanji),
          displayKanji: f.kanji || f.hiragana,
          displayFull: f.kanji ? `${f.kanji} (${f.hiragana})` : f.hiragana,
          reading: f.hiragana,
          meaning: `Someone else's ${f.meaning} (Polite / 外)`,
          audioText: f.hiragana,
          hint: "Other's family (Polite)",
        }))
        return {
          title: 'Family',
          emoji: '👨‍👩‍👧',
          items: [...own, ...others],
        }
      }
      case 'wh':
        return {
          title: 'WH Questions',
          emoji: '❓',
          items: n5WHQuestions.map((q, i) => ({
            id: `wh_${i}`,
            hasKanji: false,
            displayKanji: q.meaning,
            displayFull: q.kanji ? `${q.kanji} (${q.hiragana})` : q.hiragana,
            reading: q.hiragana,
            meaning: q.meaning,
            audioText: q.hiragana,
            hint: q.usage,
          })),
        }
      case 'greetings':
        return {
          title: 'Greetings',
          emoji: '🙏',
          items: n5Greetings.map((g, i) => ({
            id: `g_${i}`,
            hasKanji: false,
            displayKanji: g.meaning,
            displayFull: g.hiragana,
            reading: g.hiragana,
            meaning: g.meaning,
            audioText: g.hiragana,
            hint: `${g.context} • ${g.romaji}`,
          })),
        }
      case 'particles':
        return {
          title: 'Particles',
          emoji: '📌',
          items: n5Particles.map((p, i) => ({
            id: `p_${i}`,
            hasKanji: false,
            displayKanji: p.function,
            displayFull: `${p.particle} (${p.romaji})`,
            reading: p.particle,
            meaning: p.function,
            audioText: p.particle,
            hint: p.examples?.[0]?.japanese || p.romaji,
          })),
        }
      default:
        return {
          title: 'Essentials',
          emoji: '⚡',
          items: [],
        }
    }
  }, [tabId])

  // Shuffled deck of ALL items in this tab
  const shuffledDeck = useMemo(() => {
    return [...allTabItems].sort(() => 0.5 - Math.random())
  }, [allTabItems, deckKey])

  const current = shuffledDeck[currentIdx]

  // Smart prompt to prevent revealing the answer
  const questionPrompt = useMemo(() => {
    if (!current) return ''
    if (optionMode === 'english') {
      // Meaning Mode (JP -> EN): Show the Japanese word/kanji
      return current.displayFull
    }
    // Reading / Recall Mode (testing Hiragana choices):
    // 1. If word has Kanji, show ONLY the Kanji (never reveal the hiragana in parentheses!)
    if (current.hasKanji && current.displayKanji) {
      return current.displayKanji
    }
    // 2. If word has NO Kanji (greetings, WH questions, particles, adverbs),
    // reverse the prompt to the English meaning so student actively produces the Hiragana!
    return current.meaning
  }, [current, optionMode])

  const questionSubtitle = useMemo(() => {
    if (optionMode === 'english') {
      return 'Select the correct English meaning:'
    }
    if (current?.hasKanji && current?.displayKanji) {
      return 'Select the correct Hiragana reading:'
    }
    return 'Select the matching Japanese word:'
  }, [current, optionMode])

  // Correct answer depends on optionMode toggle
  const correctAnswer = useMemo(() => {
    if (!current) return ''
    return optionMode === 'english' ? current.meaning : current.reading
  }, [current, optionMode])

  // Generate 4 options (1 correct + 3 confusing distractors from same tab)
  const options = useMemo(() => {
    if (!current) return []
    const isEng = optionMode === 'english'
    const correct = isEng ? current.meaning : current.reading

    // Filter other items that have a different answer
    const otherItems = allTabItems.filter((item) => {
      const val = isEng ? item.meaning : item.reading
      return val && val.toLowerCase() !== correct.toLowerCase()
    })

    // Shuffle and pick 3 distinct distractors
    const shuffledOthers = [...otherItems].sort(() => 0.5 - Math.random())
    const distractors: string[] = []
    for (const item of shuffledOthers) {
      const val = isEng ? item.meaning : item.reading
      if (!distractors.includes(val) && val !== correct) {
        distractors.push(val)
        if (distractors.length === 3) break
      }
    }

    const allOpts = [correct, ...distractors]
    return allOpts.sort(() => 0.5 - Math.random())
  }, [current, optionMode, allTabItems])

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
    if (currentIdx < shuffledDeck.length - 1) {
      setCurrentIdx((i) => i + 1)
      setSelectedOption(null)
      setIsAnswered(false)
    } else {
      setIsFinished(true)
    }
  }, [currentIdx, shuffledDeck.length])

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

      if (!isAnswered && options.length > 0) {
        if (e.key === '1' || e.key.toLowerCase() === 'a') {
          handleSelectOption(options[0])
        } else if (e.key === '2' || e.key.toLowerCase() === 'b') {
          if (options[1]) handleSelectOption(options[1])
        } else if (e.key === '3' || e.key.toLowerCase() === 'c') {
          if (options[2]) handleSelectOption(options[2])
        } else if (e.key === '4' || e.key.toLowerCase() === 'd') {
          if (options[3]) handleSelectOption(options[3])
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isFinished, isAnswered, options, handleSelectOption, handleNext, onClose])

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
        {/* Modal Header */}
        <div className="flex flex-wrap items-center justify-between px-4 sm:px-5 py-3 border-b border-border bg-surface-2 gap-2">
          <div className="flex items-center gap-2">
            <span className="text-xl">{tabEmoji}</span>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-text-primary flex items-center gap-1.5">
                <span>{tabTitle} Practice Quiz</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-accent/10 text-accent font-semibold border border-accent/20 font-mono">
                  All {allTabItems.length} Words
                </span>
              </p>
              <p className="text-[10px] text-text-tertiary">
                {optionMode === 'english'
                  ? 'Japanese to English Meanings'
                  : 'Kanji / English to Hiragana Readings'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Mode Toggle */}
            <div className="flex items-center gap-1">
              <span className="text-[11px] text-text-tertiary flex items-center gap-1 font-medium hidden sm:inline-flex">
                <Languages size={12} />
                Mode:
              </span>
              <div className="inline-flex rounded-lg border border-border p-0.5 bg-surface text-xs font-semibold shadow-xs">
                <button
                  type="button"
                  onClick={() => {
                    setOptionMode('english')
                    setSelectedOption(null)
                    setIsAnswered(false)
                  }}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all cursor-pointer ${
                    optionMode === 'english'
                      ? 'bg-accent text-white shadow-xs'
                      : 'text-text-tertiary hover:text-text-primary'
                  }`}
                  title="Recognize Japanese words & choose English meanings"
                >
                  🇬🇧 Meaning Drill
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setOptionMode('hiragana')
                    setSelectedOption(null)
                    setIsAnswered(false)
                  }}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all cursor-pointer ${
                    optionMode === 'hiragana'
                      ? 'bg-accent text-white shadow-xs'
                      : 'text-text-tertiary hover:text-text-primary'
                  }`}
                  title="Read Kanji or recall Japanese words into Hiragana"
                >
                  あ Reading / Recall
                </button>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1 rounded-lg hover:bg-surface-3 text-text-tertiary hover:text-text-primary transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Progress & Streak Bar */}
        {!isFinished && (
          <div className="px-5 pt-3 pb-2 border-b border-border/60 bg-surface flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="font-mono text-text-secondary font-bold">
                {currentIdx + 1} / {shuffledDeck.length}
              </span>
              <div className="w-24 sm:w-36 h-1.5 bg-surface-2 rounded-full overflow-hidden border border-border">
                <div
                  className="h-full bg-accent transition-all duration-300 rounded-full"
                  style={{ width: `${((currentIdx + 1) / shuffledDeck.length) * 100}%` }}
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

        {/* Main Quiz Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4 flex-1">
          {!isFinished && current ? (
            <>
              {/* Question Card: Displays prompt ONLY (never reveals answer prematurely) */}
              <div className="bg-surface-2/70 border border-border rounded-2xl p-6 text-center relative shadow-xs">
                <span className="text-[10px] uppercase font-bold text-accent tracking-widest block mb-2">
                  {questionSubtitle}
                </span>

                <h2
                  className={`font-bold text-text-primary leading-tight ${
                    optionMode === 'hiragana' && !current.hasKanji
                      ? 'text-2xl sm:text-3xl'
                      : 'text-3xl sm:text-4xl font-japanese'
                  }`}
                >
                  {questionPrompt}
                </h2>

                {current.hint && (
                  <p className="text-xs text-text-tertiary mt-2">
                    {current.hint}
                  </p>
                )}
              </div>

              {/* 4 Choices Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {options.map((opt, i) => {
                  const isOptSelected = selectedOption === opt
                  const isCorrect = opt.toLowerCase() === correctAnswer.toLowerCase()

                  let btnStyle = 'bg-surface border-border hover:border-accent/40 hover:bg-surface-2 text-text-primary'

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
                        <span className={`text-sm ${optionMode === 'hiragana' ? 'font-japanese font-semibold' : 'font-medium'} truncate`}>
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

              {/* Answer Explanation Banner (Revealed ONLY after clicking an option) */}
              {isAnswered && (
                <div className="bg-surface-2 border border-border rounded-xl p-4 text-xs text-text-secondary space-y-2 animate-in fade-in slide-in-from-bottom-2 duration-150">
                  <div className="flex items-center justify-between border-b border-border/60 pb-2">
                    <span className="font-bold text-text-primary flex items-center gap-1.5">
                      <CheckCircle2 size={15} className="text-emerald-500" />
                      <span>Answer Breakdown:</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => handleAudio()}
                      className="px-2.5 py-1 rounded-lg bg-accent text-white hover:bg-accent/90 font-semibold flex items-center gap-1 shadow-xs active:scale-95 transition-all text-[11px] cursor-pointer"
                    >
                      <Volume2 size={13} />
                      <span>Pronounce</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-[10px] text-text-tertiary block">Japanese:</span>
                      <strong className="font-japanese text-text-primary text-sm">
                        {current.displayFull}
                      </strong>
                    </div>
                    <div>
                      <span className="text-[10px] text-text-tertiary block">English Meaning:</span>
                      <strong className="text-text-primary text-sm">
                        {current.meaning}
                      </strong>
                    </div>
                  </div>

                  <div className="text-[11px] text-text-tertiary pt-1 border-t border-border/40 flex items-center justify-between">
                    <span className="font-japanese">Reading: <strong className="text-text-primary">{current.reading}</strong></span>
                    {current.hint && <span className="text-accent font-medium">{current.hint}</span>}
                  </div>
                </div>
              )}
            </>
          ) : (
            /* Results Screen */
            <div className="text-center py-6 animate-fade-in space-y-4">
              <div className="w-16 h-16 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center mx-auto text-3xl">
                {accuracyPct >= 80 ? '🏆' : accuracyPct >= 50 ? '🎉' : '💪'}
              </div>

              <div>
                <h3 className="text-xl font-bold text-text-primary">
                  {currentIdx >= shuffledDeck.length - 1
                    ? 'All Words Completed! お疲れ様でした'
                    : 'Quiz Session Finished'}
                </h3>
                <p className="text-xs text-text-secondary mt-1">
                  Category: <strong>{tabTitle}</strong> • Mode:{' '}
                  <strong>{optionMode === 'english' ? 'Meaning Drill (EN)' : 'Reading / Recall Drill (JA)'}</strong>
                </p>
              </div>

              {/* Stats 3-Col Box */}
              <div className="grid grid-cols-3 gap-2 p-3.5 rounded-xl bg-surface-2 border border-border text-center">
                <div>
                  <p className="text-xl font-bold text-text-primary">{score} / {answeredCount}</p>
                  <p className="text-[10px] text-text-tertiary uppercase font-bold">Score</p>
                </div>
                <div>
                  <p className="text-xl font-bold text-accent">{accuracyPct}%</p>
                  <p className="text-[10px] text-text-tertiary uppercase font-bold">Accuracy</p>
                </div>
                <div>
                  <p className="text-xl font-bold text-amber-500">🔥 {maxStreak}</p>
                  <p className="text-[10px] text-text-tertiary uppercase font-bold">Best Streak</p>
                </div>
              </div>

              {/* Review Mistakes Section */}
              {missedItems.length > 0 && (
                <div className="text-left p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 max-h-48 overflow-y-auto space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-rose-600 dark:text-rose-400">
                    <span className="flex items-center gap-1.5">
                      <XCircle size={14} />
                      <span>Review Missed Words ({missedItems.length})</span>
                    </span>
                    <button
                      type="button"
                      onClick={handleRetryMissed}
                      className="text-[11px] underline hover:text-rose-700 cursor-pointer"
                    >
                      Retry Missed Only
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
                            {item.displayFull}
                          </span>
                          <span className="text-text-secondary text-[11px]">
                            {item.meaning}
                          </span>
                        </div>
                        <span className="text-[10px] text-text-tertiary font-japanese">
                          {item.reading}
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
                  <span>Play Again (Same Deck)</span>
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
                <span>{currentIdx < shuffledDeck.length - 1 ? 'Next Question' : 'Finish Quiz'}</span>
                <ArrowRight size={13} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
