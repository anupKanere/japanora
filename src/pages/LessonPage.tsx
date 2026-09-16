import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowRight,
  Clock,
  Target,
  BookOpen,
  PenLine,
  ChevronDown,
  ChevronUp,
  Eye,
  EyeOff,
  CheckCircle2,
} from 'lucide-react'
import { getNextLesson, getUnitByLessonId } from '@/data/curriculum/n5/units'
import lesson001 from '@/data/curriculum/n5/lessons/lesson-001'
import lesson002 from '@/data/curriculum/n5/lessons/lesson-002'
import lesson003 from '@/data/curriculum/n5/lessons/lesson-003'
import lesson004 from '@/data/curriculum/n5/lessons/lesson-004'
import lesson005 from '@/data/curriculum/n5/lessons/lesson-005'
import lesson006 from '@/data/curriculum/n5/lessons/lesson-006'
import lesson007 from '@/data/curriculum/n5/lessons/lesson-007'
import lesson008 from '@/data/curriculum/n5/lessons/lesson-008'
import lesson009 from '@/data/curriculum/n5/lessons/lesson-009'
import lesson010 from '@/data/curriculum/n5/lessons/lesson-010'
import lesson011 from '@/data/curriculum/n5/lessons/lesson-011'
import lesson012 from '@/data/curriculum/n5/lessons/lesson-012'
import lesson013 from '@/data/curriculum/n5/lessons/lesson-013'
import lesson014 from '@/data/curriculum/n5/lessons/lesson-014'
import lesson015 from '@/data/curriculum/n5/lessons/lesson-015'
import { ExerciseRenderer } from '@/features/exercises/ExerciseRenderer'
import { HomeworkReview } from '@/features/lessons/HomeworkReview'
import { useApp } from '@/app/AppContext'
import { progressService } from '@/services/progressService'
import type { LessonContent } from '@/types'

// ─── Lesson registry — add new lesson files here ────────────────────────────
const LESSON_REGISTRY: Record<string, LessonContent> = {
  'n5-lesson-001': lesson001,
  'n5-lesson-002': lesson002,
  'n5-lesson-003': lesson003,
  'n5-lesson-004': lesson004,
  'n5-lesson-005': lesson005,
  'n5-lesson-006': lesson006,
  'n5-lesson-007': lesson007,
  'n5-lesson-008': lesson008,
  'n5-lesson-009': lesson009,
  'n5-lesson-010': lesson010,
  'n5-lesson-011': lesson011,
  'n5-lesson-012': lesson012,
  'n5-lesson-013': lesson013,
  'n5-lesson-014': lesson014,
  'n5-lesson-015': lesson015,
}

type Tab = 'objectives' | 'explanation' | 'examples' | 'practice' | 'homework' | 'review'

const TABS: { id: Tab; label: string }[] = [
  { id: 'objectives', label: 'Objectives' },
  { id: 'explanation', label: 'Explanation' },
  { id: 'examples', label: 'Examples' },
  { id: 'practice', label: 'Practice' },
  { id: 'homework', label: 'Homework' },
  { id: 'review', label: 'Review' },
]

function BreakdownTable({ items }: { items: { segment: string; meaning: string; role?: string }[] }) {
  const roleColor: Record<string, string> = {
    topic: 'text-info bg-info-soft border-info/20',
    object: 'text-accent bg-accent-soft border-accent/20',
    verb: 'text-success bg-success-soft border-success/20',
    place: 'text-warning bg-warning-soft border-warning/20',
    destination: 'text-warning bg-warning-soft border-warning/20',
    time: 'text-text-secondary bg-surface-2 border-border',
    particle: 'text-text-tertiary bg-surface-2 border-border',
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border">
            <th className="pb-2 text-left text-xs font-semibold text-text-secondary">Japanese</th>
            <th className="pb-2 text-left text-xs font-semibold text-text-secondary">Meaning</th>
            <th className="pb-2 text-left text-xs font-semibold text-text-secondary">Role</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {items.map((item, i) => (
            <tr key={i}>
              <td className="py-2 pr-4 font-japanese text-text-primary font-medium">{item.segment}</td>
              <td className="py-2 pr-4 text-text-secondary">{item.meaning}</td>
              <td className="py-2">
                {item.role && (
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${roleColor[item.role] ?? 'text-text-tertiary bg-surface-2 border-border'}`}>
                    {item.role}
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function ExampleCard({ example, index }: { example: LessonContent['examples'][0]; index: number }) {
  const [showBreakdown, setShowBreakdown] = useState(false)
  const { showKanji } = useApp()

  return (
    <div className="bg-surface rounded-xl border border-border p-5 shadow-card">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <span className="text-[10px] font-bold text-text-tertiary uppercase tracking-wider mb-2 block">
            Example {index + 1}
          </span>

          {/* Main sentence */}
          <p className="text-japanese-lg font-japanese text-text-primary leading-loose mb-1">
            {example.hiragana}
          </p>
          {showKanji && example.kanji && (
            <p className="text-sm font-japanese text-text-secondary mb-1">
              （{example.kanji}）
            </p>
          )}
          <p className="text-sm text-text-secondary italic">{example.meaning}</p>
        </div>
      </div>

      {/* Breakdown toggle */}
      {example.breakdown && example.breakdown.length > 0 && (
        <div className="mt-4">
          <button
            onClick={() => setShowBreakdown(!showBreakdown)}
            className="flex items-center gap-1.5 text-xs text-accent hover:text-accent-light transition-colors font-medium"
          >
            {showBreakdown ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
            {showBreakdown ? 'Hide' : 'Show'} sentence breakdown
          </button>
          {showBreakdown && (
            <div className="mt-3 animate-fade-in">
              <BreakdownTable items={example.breakdown} />
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default function LessonPage() {
  const { lessonId } = useParams<{ lessonId: string }>()
  const navigate = useNavigate()
  const { showKanji, updateSettings } = useApp()
  const [activeTab, setActiveTab] = useState<Tab>('objectives')
  const [exerciseScores, setExerciseScores] = useState<Record<string, number>>({})

  const lesson = lessonId ? LESSON_REGISTRY[lessonId] : null
  const unit = lessonId ? getUnitByLessonId(lessonId) : null
  const nextLesson = lessonId ? getNextLesson(lessonId) : null

  // Mark lesson as started
  useEffect(() => {
    if (lessonId) {
      progressService.markLessonStarted(lessonId)
    }
  }, [lessonId])

  if (!lesson) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <BookOpen size={40} className="text-text-tertiary mb-4" />
        <h2 className="text-lg font-bold text-text-primary mb-2">Lesson Coming Soon</h2>
        <p className="text-sm text-text-secondary mb-6 max-w-sm">
          This lesson is being prepared. Check back soon, or continue with an available lesson.
        </p>
        <button
          onClick={() => navigate('/learn')}
          className="inline-flex items-center gap-2 px-4 py-2 bg-accent text-white rounded-lg text-sm font-semibold"
        >
          <ArrowLeft size={14} />
          Back to Curriculum
        </button>
      </div>
    )
  }

  const completedExercises = Object.keys(exerciseScores).length
  const totalExercises = lesson.exercises.length
  const avgScore = completedExercises > 0
    ? Object.values(exerciseScores).reduce((a, b) => a + b, 0) / completedExercises
    : 0

  function handleExerciseComplete(exerciseId: string, score: number) {
    setExerciseScores((prev) => ({ ...prev, [exerciseId]: score }))
    if (lessonId) {
      progressService.recordExerciseScore(lessonId, exerciseId, score)
    }
  }

  function handleMarkComplete() {
    if (lessonId) {
      progressService.markLessonCompleted(lessonId, Math.round(avgScore * 10))
    }
    if (nextLesson) {
      navigate(`/learn/${nextLesson.id}`)
    } else {
      navigate('/learn')
    }
  }

  return (
    <div className="space-y-5 animate-fade-in">
      {/* ── Breadcrumb ────────────────────────────────── */}
      <div className="flex items-center gap-2 text-sm">
        <button
          onClick={() => navigate('/learn')}
          className="flex items-center gap-1 text-text-secondary hover:text-accent transition-colors"
        >
          <ArrowLeft size={14} />
          Curriculum
        </button>
        <span className="text-text-tertiary">/</span>
        <span className="text-text-secondary">{unit?.title}</span>
        <span className="text-text-tertiary">/</span>
        <span className="text-text-primary font-medium">{lesson.title}</span>
      </div>

      {/* ── Lesson header ─────────────────────────────── */}
      <div className="bg-surface rounded-2xl border border-border p-6 shadow-card">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold text-text-tertiary uppercase tracking-wider">
                Unit {unit?.unitNumber} · Lesson {lesson.lessonNumber}
              </span>
            </div>
            <h2 className="text-2xl font-bold text-text-primary mb-1">{lesson.title}</h2>
            <p className="text-base font-japanese text-accent">{lesson.titleJa}</p>
            <p className="text-sm text-text-secondary mt-2">{lesson.description}</p>

            {/* Metadata */}
            <div className="flex items-center gap-4 mt-3">
              <div className="flex items-center gap-1.5 text-xs text-text-secondary">
                <Clock size={12} />
                <span>{lesson.estimatedMinutes} min</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-text-secondary">
                <Target size={12} />
                <span>{lesson.exercises.length} exercises</span>
              </div>
            </div>
          </div>

          {/* Kanji toggle */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => updateSettings({ displayMode: showKanji ? 'hiragana-only' : 'hiragana-kanji' })}
              className={[
                'flex items-center gap-2 px-3 py-2 rounded-lg border text-sm font-medium transition-all',
                showKanji
                  ? 'bg-accent-soft border-accent/30 text-accent'
                  : 'bg-surface-2 border-border text-text-secondary hover:border-border-strong',
              ].join(' ')}
              title={showKanji ? 'Hide kanji' : 'Show kanji'}
            >
              {showKanji ? <Eye size={14} /> : <EyeOff size={14} />}
              <span>{showKanji ? 'Kanji ON' : 'Kanji OFF'}</span>
            </button>
          </div>
        </div>

        {/* Pattern */}
        {lesson.pattern && (
          <div className="mt-4 p-3 bg-accent-soft border border-accent/20 rounded-xl">
            <p className="text-[10px] font-bold text-accent uppercase tracking-wider mb-1">Sentence Pattern</p>
            <p className="text-sm font-japanese font-semibold text-text-primary">{lesson.pattern}</p>
            {lesson.patternJa && (
              <p className="text-xs text-text-secondary font-japanese mt-0.5">{lesson.patternJa}</p>
            )}
          </div>
        )}
      </div>

      {/* ── Tab navigation ────────────────────────────── */}
      <div className="flex overflow-x-auto gap-1 bg-surface-2 p-1 rounded-xl border border-border no-scrollbar">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={[
              'px-3 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all flex-shrink-0',
              activeTab === tab.id
                ? 'bg-surface text-text-primary shadow-sm border border-border'
                : 'text-text-secondary hover:text-text-primary',
            ].join(' ')}
          >
            {tab.label}
            {tab.id === 'practice' && completedExercises > 0 && (
              <span className="ml-1.5 text-[10px] text-accent font-bold">
                {completedExercises}/{totalExercises}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* ── Tab content ───────────────────────────────── */}

      {activeTab === 'objectives' && (
        <div className="bg-surface rounded-xl border border-border p-6 shadow-card animate-fade-in">
          <h3 className="text-base font-bold text-text-primary mb-4 flex items-center gap-2">
            <Target size={16} className="text-accent" />
            Learning Objectives
          </h3>
          <p className="text-sm text-text-secondary mb-4">By the end of this lesson you will be able to:</p>
          <ul className="space-y-2">
            {lesson.objectives.map((obj, i) => (
              <li key={i} className="flex items-start gap-3">
                <CheckCircle2 size={16} className="text-success flex-shrink-0 mt-0.5" />
                <span className="text-sm text-text-primary">{obj}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {activeTab === 'explanation' && (
        <div className="space-y-4 animate-fade-in">
          <div className="bg-surface rounded-xl border border-border p-6 shadow-card">
            <h3 className="text-base font-bold text-text-primary mb-4 flex items-center gap-2">
              <BookOpen size={16} className="text-accent" />
              Grammar Explanation
            </h3>
            <div className="text-sm text-text-primary leading-relaxed whitespace-pre-line">
              {lesson.grammarExplanation}
            </div>
          </div>

          {lesson.notes && lesson.notes.length > 0 && (
            <div className="bg-info-soft border border-info/20 rounded-xl p-5">
              <h4 className="text-xs font-bold text-info uppercase tracking-wider mb-3">Key Notes</h4>
              <ul className="space-y-2">
                {lesson.notes.map((note, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-text-primary">
                    <span className="text-info font-bold flex-shrink-0">•</span>
                    <span className="font-japanese leading-relaxed">{note}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {activeTab === 'examples' && (
        <div className="space-y-4 animate-fade-in">
          <h3 className="text-base font-bold text-text-primary">Example Sentences</h3>
          {lesson.examples.map((example, i) => (
            <ExampleCard key={i} example={example} index={i} />
          ))}
        </div>
      )}

      {activeTab === 'practice' && (
        <div className="space-y-4 animate-fade-in">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-text-primary">Practice Exercises</h3>
            {completedExercises > 0 && (
              <div className="text-sm text-text-secondary">
                Score: <span className="font-bold text-accent">{Math.round(avgScore * 100)}%</span>
                {' '}({completedExercises}/{totalExercises} done)
              </div>
            )}
          </div>
          {lesson.exercises.map((exercise, i) => (
            <ExerciseRenderer
              key={exercise.id}
              exercise={exercise}
              number={i + 1}
              onComplete={(score) => handleExerciseComplete(exercise.id, score)}
            />
          ))}

          {completedExercises === totalExercises && (
            <div className="bg-success-soft border border-success/30 rounded-xl p-5 text-center">
              <CheckCircle2 size={32} className="text-success mx-auto mb-2" />
              <h4 className="text-base font-bold text-success mb-1">All exercises complete!</h4>
              <p className="text-sm text-text-secondary mb-4">
                Score: {Math.round(avgScore * 100)}%
              </p>
              <button
                onClick={handleMarkComplete}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-success text-white rounded-lg text-sm font-semibold hover:bg-success-light transition-colors"
              >
                Mark Lesson Complete
                <ArrowRight size={14} />
              </button>
            </div>
          )}
        </div>
      )}

      {activeTab === 'homework' && (
        <div className="space-y-4 animate-fade-in">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-text-primary">Homework Review</h3>
            {lesson.homework && (
              <span className="text-sm text-text-secondary">
                Overall: <span className="font-bold text-accent">
                  {(lesson.homework.reduce((s, h) => s + h.score, 0) / lesson.homework.length).toFixed(1)}/10
                </span>
              </span>
            )}
          </div>
          {lesson.homework && lesson.homework.length > 0 ? (
            <HomeworkReview submissions={lesson.homework} />
          ) : (
            <div className="text-center py-10 text-text-secondary">
              <PenLine size={32} className="mx-auto mb-3 text-text-tertiary" />
              <p className="text-sm">No homework submitted yet.</p>
            </div>
          )}
        </div>
      )}

      {activeTab === 'review' && (
        <div className="bg-surface rounded-xl border border-border p-6 shadow-card animate-fade-in">
          <h3 className="text-base font-bold text-text-primary mb-4">Key Takeaways</h3>
          <ul className="space-y-3">
            {(lesson.reviewItems ?? []).map((item, i) => (
              <li key={i} className="flex items-start gap-3 p-3 bg-surface-2 rounded-lg">
                <span className="w-5 h-5 rounded-full bg-accent text-white text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <span className="text-sm font-japanese text-text-primary leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex gap-3">
            <button
              onClick={handleMarkComplete}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-accent text-white rounded-lg text-sm font-semibold hover:bg-accent-light transition-colors"
            >
              Mark Complete & Continue
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
