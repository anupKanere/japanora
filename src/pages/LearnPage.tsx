import { useNavigate } from 'react-router-dom'
import { Lock, CheckCircle2, Circle, PlayCircle, Clock, ChevronRight } from 'lucide-react'
import { useApp } from '@/app/AppContext'
import { n5Units } from '@/data/curriculum/n5/units'
import type { LessonStatus } from '@/types'

function statusIcon(status: LessonStatus) {
  switch (status) {
    case 'completed':
      return <CheckCircle2 size={18} className="text-success" />
    case 'in-progress':
      return <PlayCircle size={18} className="text-accent" />
    case 'available':
      return <Circle size={18} className="text-text-tertiary" />
    case 'locked':
      return <Lock size={14} className="text-text-tertiary" />
  }
}

function statusLabel(status: LessonStatus): string {
  switch (status) {
    case 'completed': return 'Completed'
    case 'in-progress': return 'In progress'
    case 'available': return 'Start'
    case 'locked': return 'Locked'
  }
}

function statusBadgeClass(status: LessonStatus): string {
  switch (status) {
    case 'completed': return 'bg-success-soft text-success border-success/20'
    case 'in-progress': return 'bg-accent-soft text-accent border-accent/20'
    case 'available': return 'bg-surface-2 text-text-secondary border-border'
    case 'locked': return 'bg-surface-2 text-text-tertiary border-border'
  }
}

export default function LearnPage() {
  const { progress } = useApp()
  const navigate = useNavigate()

  function getLessonStatus(lessonId: string): LessonStatus {
    const lp = progress.lessonProgress[lessonId]
    if (lp) return lp.status

    // Determine from curriculum order
    const allLessons = n5Units.flatMap((u) => u.lessons)
    const idx = allLessons.findIndex((l) => l.id === lessonId)
    if (idx === 0) return 'available'
    const prevId = allLessons[idx - 1].id
    const prevStatus = progress.lessonProgress[prevId]?.status
    return prevStatus === 'completed' ? 'available' : 'locked'
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-text-primary">N5 Curriculum</h2>
        <p className="text-sm text-text-secondary mt-1">
          A structured path from beginner to JLPT N5 level. Follow each unit in order.
        </p>
      </div>

      {/* Units */}
      {n5Units.map((unit) => {
        const completedInUnit = unit.lessons.filter(
          (l) => getLessonStatus(l.id) === 'completed'
        ).length
        const unitPct = Math.round((completedInUnit / unit.lessons.length) * 100)

        return (
          <div key={unit.id} className="bg-surface rounded-2xl border border-border shadow-card overflow-hidden">
            {/* Unit header */}
            <div className="px-5 py-4 border-b border-border bg-surface-2/50">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold text-text-secondary uppercase tracking-wider">
                      Unit {unit.unitNumber}
                    </span>
                    <span className="text-[10px] text-text-secondary font-japanese font-medium">{unit.titleJa}</span>
                  </div>
                  <h3 className="text-base font-bold text-text-primary">{unit.title}</h3>
                  <p className="text-xs text-text-secondary mt-0.5 max-w-lg">{unit.description}</p>
                </div>
                <div className="text-right flex-shrink-0 ml-4">
                  <p className="text-lg font-bold text-accent">{unitPct}%</p>
                  <p className="text-[11px] text-text-tertiary">{completedInUnit}/{unit.lessons.length} done</p>
                </div>
              </div>
              {/* Unit progress bar */}
              <div className="mt-3 h-1.5 bg-border rounded-full overflow-hidden">
                <div
                  className="h-full bg-accent rounded-full transition-all duration-500"
                  style={{ width: `${unitPct}%` }}
                />
              </div>
            </div>

            {/* Lessons */}
            <div className="divide-y divide-border">
              {unit.lessons.map((lesson) => {
                const status = getLessonStatus(lesson.id)
                const isLocked = status === 'locked'
                const score = progress.lessonProgress[lesson.id]?.homeworkScore

                return (
                  <button
                    key={lesson.id}
                    disabled={isLocked}
                    onClick={() => navigate(`/learn/${lesson.id}`)}
                    className={[
                      'w-full flex items-center gap-4 px-5 py-4 text-left transition-all',
                      isLocked
                        ? 'opacity-50 cursor-not-allowed'
                        : 'hover:bg-surface-2/60 group',
                    ].join(' ')}
                    aria-label={`${lesson.title}, ${statusLabel(status)}`}
                  >
                    {/* Status icon */}
                    <div className="flex-shrink-0 w-5 flex items-center justify-center">
                      {statusIcon(status)}
                    </div>

                    {/* Lesson info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-[10px] text-text-tertiary font-medium">
                          Lesson {lesson.lessonNumber}
                        </span>
                        <span className="text-[10px] text-text-tertiary font-japanese">·</span>
                        <span className="text-[10px] text-text-tertiary font-japanese">{lesson.titleJa}</span>
                      </div>
                      <p className={`text-sm font-medium ${isLocked ? 'text-text-tertiary' : 'text-text-primary group-hover:text-accent transition-colors'}`}>
                        {lesson.title}
                      </p>
                      <p className="text-xs text-text-secondary truncate mt-0.5">{lesson.description}</p>
                    </div>

                    {/* Right side */}
                    <div className="flex items-center gap-3 flex-shrink-0">
                      {score !== undefined && (
                        <div className="text-right">
                          <p className="text-xs font-semibold text-success">{score}/10</p>
                          <p className="text-[10px] text-text-tertiary">hw score</p>
                        </div>
                      )}
                      <div className="flex items-center gap-1">
                        <Clock size={12} className="text-text-tertiary" />
                        <span className="text-xs text-text-tertiary">{lesson.estimatedMinutes}m</span>
                      </div>
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${statusBadgeClass(status)}`}>
                        {statusLabel(status)}
                      </span>
                      {!isLocked && <ChevronRight size={14} className="text-text-tertiary group-hover:text-accent transition-colors" />}
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}
