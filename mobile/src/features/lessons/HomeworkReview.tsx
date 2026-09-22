import { useState } from 'react'
import { CheckCircle2, XCircle, ChevronDown, ChevronUp, AlertTriangle } from 'lucide-react'
import type { HomeworkSubmission, MistakeCategory } from '@/types'

const MISTAKE_LABELS: Record<MistakeCategory, string> = {
  particle: 'Particle',
  verbConjugation: 'Verb conjugation',
  vocabulary: 'Vocabulary',
  wordOrder: 'Word order',
  spelling: 'Spelling',
  kanji: 'Kanji',
  meaning: 'Meaning',
  nounModification: 'Noun modification',
  counter: 'Counter',
  politeness: 'Politeness',
  other: 'Other',
}

interface HomeworkCardProps {
  submission: HomeworkSubmission
  number: number
}

function HomeworkCard({ submission, number }: HomeworkCardProps) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className={[
      'rounded-xl border overflow-hidden',
      submission.isCorrect ? 'border-success/30' : 'border-border',
    ].join(' ')}>
      {/* Header */}
      <button
        className="w-full flex items-start gap-3 p-4 text-left hover:bg-surface-2/50 transition-colors"
        onClick={() => setExpanded(!expanded)}
        aria-expanded={expanded}
      >
        <div className="flex-shrink-0 mt-0.5">
          {submission.isCorrect ? (
            <CheckCircle2 size={18} className="text-success" />
          ) : (
            <XCircle size={18} className="text-accent" />
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold text-text-secondary">#{number}</span>
            <span className="text-xs text-text-secondary">·</span>
            <span className="text-xs font-semibold text-text-primary">
              {submission.score}/10
            </span>
            {submission.mistakeCategories.length > 0 && (
              <div className="flex gap-1 flex-wrap">
                {submission.mistakeCategories.map((cat) => (
                  <span key={cat} className="text-[9px] font-semibold px-1.5 py-0.5 bg-accent-soft text-accent rounded-full">
                    {MISTAKE_LABELS[cat]}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Prompt */}
          <p className="text-xs text-text-secondary mb-1">{submission.prompt}</p>

          {/* User answer */}
          <p className="text-sm font-japanese text-text-primary">{submission.userAnswer}</p>
        </div>

        <div className="flex-shrink-0 ml-2 text-text-tertiary">
          {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </div>
      </button>

      {/* Expanded details */}
      {expanded && (
        <div className="border-t border-border px-4 pb-4 pt-3 space-y-3 animate-fade-in">
          {/* Corrected answer */}
          {!submission.isCorrect && (
            <div className="p-3 bg-success-soft border border-success/20 rounded-lg">
              <p className="text-[10px] font-semibold text-success uppercase tracking-wider mb-1">Corrected</p>
              <p className="text-sm font-japanese text-text-primary">{submission.correctedAnswer}</p>
            </div>
          )}

          {/* Explanation */}
          <div className="p-3 bg-surface-2 rounded-lg">
            <p className="text-[10px] font-semibold text-text-tertiary uppercase tracking-wider mb-1">Explanation</p>
            <p className="text-sm text-text-primary leading-relaxed">{submission.explanation}</p>
          </div>

          {/* Teacher notes */}
          {submission.teacherNotes && (
            <div className="flex items-start gap-2 p-3 bg-info-soft border border-info/20 rounded-lg">
              <AlertTriangle size={13} className="text-info flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-[10px] font-semibold text-info uppercase tracking-wider mb-1">Study note</p>
                <p className="text-xs text-text-primary leading-relaxed">{submission.teacherNotes}</p>
              </div>
            </div>
          )}

          <p className="text-[10px] text-text-tertiary">
            Submitted: {new Date(submission.submittedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
        </div>
      )}
    </div>
  )
}

interface HomeworkReviewProps {
  submissions: HomeworkSubmission[]
}

export function HomeworkReview({ submissions }: HomeworkReviewProps) {
  const total = submissions.length
  const correctCount = submissions.filter((s) => s.isCorrect).length
  const avgScore = submissions.reduce((sum, s) => sum + s.score, 0) / total
  const allMistakes = submissions.flatMap((s) => s.mistakeCategories)
  const uniqueMistakes = [...new Set(allMistakes)]

  return (
    <div className="space-y-4">
      {/* Summary */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-surface-2 rounded-xl p-3 text-center border border-border">
          <p className="text-xl font-bold text-text-primary">{correctCount}/{total}</p>
          <p className="text-xs text-text-secondary">Correct</p>
        </div>
        <div className="bg-surface-2 rounded-xl p-3 text-center border border-border">
          <p className="text-xl font-bold text-accent">{avgScore.toFixed(1)}</p>
          <p className="text-xs text-text-secondary">Average score</p>
        </div>
        <div className="bg-surface-2 rounded-xl p-3 text-center border border-border">
          <p className="text-xl font-bold text-warning">{uniqueMistakes.length}</p>
          <p className="text-xs text-text-secondary">Weak areas</p>
        </div>
      </div>

      {/* Mistake summary */}
      {uniqueMistakes.length > 0 && (
        <div className="p-4 bg-warning-soft border border-warning/20 rounded-xl">
          <p className="text-xs font-semibold text-warning uppercase tracking-wider mb-2">Areas to review</p>
          <div className="flex flex-wrap gap-2">
            {uniqueMistakes.map((cat) => (
              <span key={cat} className="text-xs px-2.5 py-1 bg-surface rounded-full border border-warning/30 text-warning font-medium">
                {MISTAKE_LABELS[cat]}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Individual submissions */}
      <div className="space-y-2">
        {submissions.map((s, i) => (
          <HomeworkCard key={s.exerciseId} submission={s} number={i + 1} />
        ))}
      </div>
    </div>
  )
}
