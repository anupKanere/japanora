import { useState } from 'react'
import { CheckCircle2, XCircle, Lightbulb, ChevronDown, ChevronUp } from 'lucide-react'
import type { Exercise, EvaluationResult } from '@/types'
import { evaluationService } from '@/services/evaluationService'

interface ExerciseProps {
  exercise: Exercise
  onComplete?: (score: number) => void
}

// ─── Feedback display ─────────────────────────────────────────────────────────

function FeedbackBlock({ result }: { result: EvaluationResult }) {
  const [showExplanation, setShowExplanation] = useState(false)

  return (
    <div
      className={[
        'mt-4 rounded-xl border p-4 text-sm',
        result.isCorrect
          ? 'bg-success-soft border-success/30 text-success'
          : result.isPartiallyCorrect
            ? 'bg-warning-soft border-warning/30 text-warning'
            : 'bg-accent-soft border-accent/30 text-accent',
      ].join(' ')}
    >
      <div className="flex items-start gap-2">
        {result.isCorrect ? (
          <CheckCircle2 size={16} className="flex-shrink-0 mt-0.5" />
        ) : (
          <XCircle size={16} className="flex-shrink-0 mt-0.5" />
        )}
        <div className="flex-1">
          <p className="font-medium">{result.feedback}</p>
          {result.correctedAnswer && (
            <p className="mt-1 text-xs opacity-80">
              Correct answer: <span className="font-japanese font-semibold">{result.correctedAnswer}</span>
            </p>
          )}
          {result.explanation && (
            <button
              onClick={() => setShowExplanation(!showExplanation)}
              className="mt-2 flex items-center gap-1 text-xs opacity-70 hover:opacity-100 transition-opacity"
            >
              <Lightbulb size={12} />
              {showExplanation ? 'Hide' : 'Show'} explanation
              {showExplanation ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
            </button>
          )}
          {showExplanation && result.explanation && (
            <p className="mt-2 text-xs opacity-80 border-t border-current/20 pt-2 leading-relaxed">
              {result.explanation}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

// ─── Multiple choice ──────────────────────────────────────────────────────────

function MultipleChoiceExercise({ exercise, onComplete }: ExerciseProps) {
  const [selected, setSelected] = useState<string | null>(null)
  const [result, setResult] = useState<EvaluationResult | null>(null)

  function handleSelect(option: string) {
    if (result) return
    setSelected(option)
    const r = evaluationService.evaluate(exercise, option)
    setResult(r)
    onComplete?.(r.score)
  }

  const correct = Array.isArray(exercise.correctAnswer) ? exercise.correctAnswer[0] : exercise.correctAnswer

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4">
        {exercise.options?.map((option) => {
          const isSelected = selected === option
          const isCorrect = result && option === correct
          const isWrong = result && isSelected && !isCorrect

          return (
            <button
              key={option}
              onClick={() => handleSelect(option)}
              disabled={!!result}
              className={[
                'p-3 rounded-xl border text-sm font-japanese font-medium text-left transition-all',
                isCorrect ? 'bg-success-soft border-success text-success' :
                isWrong ? 'bg-accent-soft border-accent text-accent' :
                isSelected ? 'border-accent bg-accent-soft' :
                'border-border hover:border-border-strong hover:bg-surface-2',
                result ? 'cursor-default' : 'cursor-pointer',
              ].join(' ')}
            >
              {option}
            </button>
          )
        })}
      </div>
      {result && <FeedbackBlock result={result} />}
    </div>
  )
}

// ─── Fill blank ───────────────────────────────────────────────────────────────

function FillBlankExercise({ exercise, onComplete }: ExerciseProps) {
  const [value, setValue] = useState('')
  const [result, setResult] = useState<EvaluationResult | null>(null)

  const parts = (exercise.sentence ?? '').split('___')

  function handleSubmit() {
    if (!value.trim() || result) return
    const r = evaluationService.evaluate(exercise, value)
    setResult(r)
    onComplete?.(r.score)
  }

  return (
    <div>
      <p className="mt-4 text-japanese-base font-japanese text-text-primary leading-loose">
        {parts[0]}
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
          disabled={!!result}
          placeholder="___"
          className="inline-block border-b-2 border-accent w-20 text-center outline-none bg-transparent font-japanese text-accent placeholder:text-text-tertiary mx-1 focus:border-accent-light"
          aria-label="Fill in the blank"
        />
        {parts[1]}
      </p>
      <button
        onClick={handleSubmit}
        disabled={!value.trim() || !!result}
        className="mt-4 px-4 py-2 bg-accent text-white rounded-lg text-sm font-semibold disabled:opacity-40 hover:bg-accent-light transition-colors"
      >
        Check
      </button>
      {result && <FeedbackBlock result={result} />}
    </div>
  )
}

// ─── Particle select ──────────────────────────────────────────────────────────

function ParticleSelectExercise({ exercise, onComplete }: ExerciseProps) {
  const [selected, setSelected] = useState<string | null>(null)
  const [result, setResult] = useState<EvaluationResult | null>(null)

  const parts = (exercise.sentence ?? '').split('___')
  const correct = Array.isArray(exercise.correctAnswer) ? exercise.correctAnswer[0] : exercise.correctAnswer

  function handleSelect(option: string) {
    if (result) return
    setSelected(option)
    const r = evaluationService.evaluate(exercise, option)
    setResult(r)
    onComplete?.(r.score)
  }

  return (
    <div>
      {/* Sentence with selected particle shown inline */}
      <p className="mt-4 text-japanese-base font-japanese text-text-primary leading-loose">
        {parts[0]}
        <span className={[
          'inline-flex items-center justify-center w-8 h-8 rounded-lg border-2 text-center font-bold mx-1 align-middle transition-colors',
          selected
            ? result?.isCorrect
              ? 'border-success bg-success-soft text-success'
              : 'border-accent bg-accent-soft text-accent'
            : 'border-accent/40 bg-accent-soft/50 text-accent'
        ].join(' ')}>
          {selected ?? '？'}
        </span>
        {parts[1]}
      </p>

      {/* Particle buttons */}
      <div className="flex flex-wrap gap-2 mt-4">
        {exercise.options?.map((option) => {
          const isSelected = selected === option
          const isCorrectOption = result && option === correct
          const isWrongOption = result && isSelected && !isCorrectOption

          return (
            <button
              key={option}
              onClick={() => handleSelect(option)}
              disabled={!!result}
              className={[
                'w-12 h-12 rounded-xl border-2 text-base font-japanese font-bold transition-all',
                isCorrectOption ? 'border-success bg-success-soft text-success' :
                isWrongOption ? 'border-accent bg-accent-soft text-accent' :
                isSelected ? 'border-accent bg-accent-soft text-accent' :
                'border-border hover:border-accent/50 hover:bg-accent-soft/30',
                result ? 'cursor-default' : 'cursor-pointer',
              ].join(' ')}
            >
              {option}
            </button>
          )
        })}
      </div>
      {result && <FeedbackBlock result={result} />}
    </div>
  )
}

// ─── Sentence order ───────────────────────────────────────────────────────────

function SentenceOrderExercise({ exercise, onComplete }: ExerciseProps) {
  const initialWords = [...(exercise.words ?? [])]
  const [available, setAvailable] = useState<string[]>([...initialWords])
  const [arranged, setArranged] = useState<string[]>([])
  const [result, setResult] = useState<EvaluationResult | null>(null)

  function addWord(word: string, idx: number) {
    if (result) return
    const newAvail = [...available]
    newAvail.splice(idx, 1)
    setAvailable(newAvail)
    setArranged([...arranged, word])
  }

  function removeWord(idx: number) {
    if (result) return
    const word = arranged[idx]
    const newArr = [...arranged]
    newArr.splice(idx, 1)
    setArranged(newArr)
    setAvailable([...available, word])
  }

  function handleCheck() {
    if (arranged.length === 0 || result) return
    const sentence = arranged.join(' ')
    const r = evaluationService.evaluate(exercise, sentence)
    setResult(r)
    onComplete?.(r.score)
  }

  function handleReset() {
    setAvailable([...initialWords])
    setArranged([])
    setResult(null)
  }

  return (
    <div>
      {/* Constructed sentence area */}
      <div className="mt-4 min-h-[56px] p-3 bg-surface-2 border-2 border-dashed border-border rounded-xl flex flex-wrap gap-2 items-center">
        {arranged.length === 0 ? (
          <p className="text-sm text-text-tertiary">Click words below to build your sentence…</p>
        ) : (
          arranged.map((word, i) => (
            <button
              key={i}
              onClick={() => removeWord(i)}
              disabled={!!result}
              className="px-3 py-1.5 bg-accent text-white rounded-lg text-sm font-japanese font-medium hover:bg-accent-light transition-colors disabled:cursor-default"
            >
              {word}
            </button>
          ))
        )}
      </div>

      {/* Available words */}
      <div className="flex flex-wrap gap-2 mt-4">
        {available.map((word, i) => (
          <button
            key={i}
            onClick={() => addWord(word, i)}
            disabled={!!result}
            className="px-3 py-1.5 bg-surface border border-border rounded-lg text-sm font-japanese font-medium hover:border-accent hover:bg-accent-soft/30 transition-all disabled:cursor-default disabled:opacity-50"
          >
            {word}
          </button>
        ))}
      </div>

      {/* Controls */}
      <div className="flex gap-2 mt-4">
        <button
          onClick={handleCheck}
          disabled={arranged.length === 0 || !!result}
          className="px-4 py-2 bg-accent text-white rounded-lg text-sm font-semibold disabled:opacity-40 hover:bg-accent-light transition-colors"
        >
          Check
        </button>
        {!result && (
          <button
            onClick={handleReset}
            className="px-4 py-2 bg-surface-2 border border-border text-text-secondary rounded-lg text-sm hover:bg-border transition-colors"
          >
            Reset
          </button>
        )}
      </div>

      {result && <FeedbackBlock result={result} />}
    </div>
  )
}

// ─── Translation / free input ─────────────────────────────────────────────────

function TranslationExercise({ exercise, onComplete }: ExerciseProps) {
  const [value, setValue] = useState('')
  const [result, setResult] = useState<EvaluationResult | null>(null)

  function handleSubmit() {
    if (!value.trim() || result) return
    const r = evaluationService.evaluate(exercise, value)
    setResult(r)
    onComplete?.(r.score)
  }

  return (
    <div>
      {exercise.hint && (
        <p className="mt-2 text-xs text-text-secondary flex items-center gap-1">
          <Lightbulb size={12} />
          {exercise.hint}
        </p>
      )}
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={!!result}
        placeholder="Type your Japanese answer here…"
        rows={3}
        className="mt-4 w-full p-3 border border-border rounded-xl text-sm font-japanese text-text-primary placeholder:text-text-tertiary bg-surface resize-none focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/20 transition-all disabled:bg-surface-2"
      />
      <button
        onClick={handleSubmit}
        disabled={!value.trim() || !!result}
        className="mt-2 px-4 py-2 bg-accent text-white rounded-lg text-sm font-semibold disabled:opacity-40 hover:bg-accent-light transition-colors"
      >
        Submit
      </button>
      {result && <FeedbackBlock result={result} />}
    </div>
  )
}

// ─── Sentence production ──────────────────────────────────────────────────────

function SentenceProductionExercise({ exercise, onComplete }: ExerciseProps) {
  const [value, setValue] = useState('')
  const [result, setResult] = useState<EvaluationResult | null>(null)

  function handleSubmit() {
    if (!value.trim() || result) return
    const r = evaluationService.evaluate(exercise, value)
    setResult(r)
    onComplete?.(r.score)
  }

  return (
    <div>
      {exercise.hint && (
        <div className="mt-2 p-3 bg-info-soft border border-info/20 rounded-lg">
          <p className="text-xs text-info flex items-start gap-1.5">
            <Lightbulb size={13} className="flex-shrink-0 mt-0.5" />
            <span className="font-japanese leading-relaxed">{exercise.hint}</span>
          </p>
        </div>
      )}
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={!!result}
        placeholder="Create your own Japanese sentence…"
        rows={4}
        className="mt-4 w-full p-3 border border-border rounded-xl text-sm font-japanese text-text-primary placeholder:text-text-tertiary bg-surface resize-none focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/20 transition-all disabled:bg-surface-2"
      />
      <button
        onClick={handleSubmit}
        disabled={!value.trim() || !!result}
        className="mt-2 px-4 py-2 bg-accent text-white rounded-lg text-sm font-semibold disabled:opacity-40 hover:bg-accent-light transition-colors"
      >
        Submit for Review
      </button>
      {result && <FeedbackBlock result={result} />}
    </div>
  )
}

// ─── Main export: exercise router ─────────────────────────────────────────────

const TYPE_LABELS: Record<string, string> = {
  translation: 'Translation',
  reading: 'Reading',
  multipleChoice: 'Multiple Choice',
  fillBlank: 'Fill in the Blank',
  particleSelect: 'Choose the Particle',
  sentenceOrder: 'Sentence Order',
  sentenceProduction: 'Sentence Production',
}

interface ExerciseRendererProps {
  exercise: Exercise
  number: number
  onComplete?: (score: number) => void
}

export function ExerciseRenderer({ exercise, number, onComplete }: ExerciseRendererProps) {
  return (
    <div className="bg-surface rounded-xl border border-border p-5 shadow-card">
      {/* Exercise header */}
      <div className="flex items-center gap-2 mb-3">
        <span className="w-6 h-6 rounded-full bg-accent text-white text-[11px] font-bold flex items-center justify-center flex-shrink-0">
          {number}
        </span>
        <span className="text-xs font-semibold text-accent uppercase tracking-wider">
          {TYPE_LABELS[exercise.type] ?? exercise.type}
        </span>
        {exercise.difficulty && (
          <span className={`ml-auto text-[10px] px-2 py-0.5 rounded-full font-medium ${
            exercise.difficulty === 'easy' ? 'bg-success-soft text-success' :
            exercise.difficulty === 'medium' ? 'bg-warning-soft text-warning' :
            'bg-accent-soft text-accent'
          }`}>
            {exercise.difficulty}
          </span>
        )}
      </div>

      {/* Prompt */}
      <p className="text-sm font-medium text-text-primary">{exercise.prompt}</p>
      {exercise.promptJa && (
        <p className="text-xs text-text-secondary font-japanese mt-0.5">{exercise.promptJa}</p>
      )}

      {/* Exercise-specific UI */}
      {exercise.type === 'multipleChoice' && (
        <MultipleChoiceExercise exercise={exercise} onComplete={onComplete} />
      )}
      {exercise.type === 'fillBlank' && (
        <FillBlankExercise exercise={exercise} onComplete={onComplete} />
      )}
      {exercise.type === 'particleSelect' && (
        <ParticleSelectExercise exercise={exercise} onComplete={onComplete} />
      )}
      {exercise.type === 'sentenceOrder' && (
        <SentenceOrderExercise exercise={exercise} onComplete={onComplete} />
      )}
      {(exercise.type === 'translation' || exercise.type === 'reading') && (
        <TranslationExercise exercise={exercise} onComplete={onComplete} />
      )}
      {exercise.type === 'sentenceProduction' && (
        <SentenceProductionExercise exercise={exercise} onComplete={onComplete} />
      )}
    </div>
  )
}
