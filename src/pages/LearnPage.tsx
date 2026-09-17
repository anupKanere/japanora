import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Lock,
  Unlock,
  CheckCircle2,
  Circle,
  PlayCircle,
  Clock,
  ChevronRight,
  BookOpen,
  ArrowRight,
  Sparkles,
  Award,
} from 'lucide-react'
import { useApp } from '@/app/AppContext'
import { n5Units } from '@/data/curriculum/n5/units'
import type { LessonStatus } from '@/types'

function statusIcon(status: LessonStatus) {
  switch (status) {
    case 'completed':
      return <CheckCircle2 size={18} className="text-emerald-500" />
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
    case 'completed':
      return 'Completed'
    case 'in-progress':
      return 'In progress'
    case 'available':
      return 'Start'
    case 'locked':
      return 'Locked'
  }
}

function statusBadgeClass(status: LessonStatus): string {
  switch (status) {
    case 'completed':
      return 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20'
    case 'in-progress':
      return 'bg-accent/10 text-accent border-accent/20'
    case 'available':
      return 'bg-surface-2 text-text-secondary border-border'
    case 'locked':
      return 'bg-surface-2 text-text-tertiary border-border opacity-60'
  }
}

export default function LearnPage() {
  const { progress } = useApp()
  const navigate = useNavigate()
  const [unitFilter, setUnitFilter] = useState<string>('all')
  const [freeMode, setFreeMode] = useState<boolean>(() => {
    return localStorage.getItem('japanora_free_study_mode') === 'true'
  })

  function toggleFreeMode() {
    setFreeMode((prev) => {
      const next = !prev
      localStorage.setItem('japanora_free_study_mode', String(next))
      return next
    })
  }

  const allLessons = useMemo(() => n5Units.flatMap((u) => u.lessons), [])

  function getLessonStatus(lessonId: string): LessonStatus {
    const lp = progress.lessonProgress[lessonId]
    if (lp) return lp.status

    if (freeMode) return 'available'

    // Determine from curriculum order
    const idx = allLessons.findIndex((l) => l.id === lessonId)
    if (idx === 0) return 'available'
    const prevId = allLessons[idx - 1].id
    const prevStatus = progress.lessonProgress[prevId]?.status
    return prevStatus === 'completed' ? 'available' : 'locked'
  }

  // Active Next Lesson to Resume
  const nextLesson = useMemo(() => {
    // 1. Check for in-progress lesson
    const inProgress = allLessons.find((l) => getLessonStatus(l.id) === 'in-progress')
    if (inProgress) return inProgress

    // 2. Find first available uncompleted lesson
    const available = allLessons.find((l) => getLessonStatus(l.id) === 'available')
    if (available) return available

    // 3. Fallback
    return allLessons[0]
  }, [allLessons, progress.lessonProgress, freeMode])

  const nextLessonUnit = useMemo(() => {
    if (!nextLesson) return null
    return n5Units.find((u) => u.lessons.some((l) => l.id === nextLesson.id))
  }, [nextLesson])

  const totalCompleted = useMemo(() => {
    return allLessons.filter((l) => getLessonStatus(l.id) === 'completed').length
  }, [allLessons, progress.lessonProgress])

  const overallPct = Math.round((totalCompleted / allLessons.length) * 100)

  const filteredUnits = useMemo(() => {
    if (unitFilter === 'all') return n5Units
    return n5Units.filter((u) => u.id === unitFilter)
  }, [unitFilter])

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Header with Free Study Mode Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-accent-soft text-accent flex items-center justify-center">
              <BookOpen size={18} />
            </div>
            <h2 className="text-xl font-bold text-text-primary">N5 Curriculum</h2>
            <span className="text-xs text-text-tertiary font-japanese font-medium">コース学習</span>
          </div>
          <p className="text-sm text-text-secondary mt-1">
            A structured pedagogical path from absolute beginner to JLPT N5 certified proficiency.
          </p>
        </div>

        <button
          onClick={toggleFreeMode}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all ${
            freeMode
              ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20'
              : 'bg-surface border-border text-text-secondary hover:bg-surface-2 hover:text-text-primary'
          }`}
          title={freeMode ? 'Click to re-enable sequential locking' : 'Click to unlock all lessons for flexible review'}
        >
          {freeMode ? <Unlock size={14} className="text-emerald-500" /> : <Lock size={14} className="text-text-tertiary" />}
          <span>{freeMode ? 'Free Study Mode: ON' : 'Unlock All Lessons'}</span>
          <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${freeMode ? 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-300' : 'bg-surface-2 text-text-tertiary'}`}>
            {freeMode ? 'Unlocked' : 'Sequential'}
          </span>
        </button>
      </div>

      {/* Quick Conjugation Reference Banner */}
      <div className="bg-gradient-to-r from-purple-500/10 via-accent/5 to-surface rounded-2xl border border-purple-500/20 p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-card">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-purple-500/15 text-purple-600 dark:text-purple-400 flex items-center justify-center flex-shrink-0">
            <BookOpen size={18} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-bold text-text-primary">Conjugation & Formation Rulebooks</h4>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 font-bold">New</span>
            </div>
            <p className="text-xs text-text-secondary mt-0.5">
              Study the exact formulas for ます, て, た, ない, and なかった verb forms and 4 adjective inflections in Reference.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0 w-full sm:w-auto">
          <button
            onClick={() => navigate('/reference?tab=verbs')}
            className="flex-1 sm:flex-none px-3.5 py-2 rounded-xl bg-surface border border-border text-xs font-bold text-text-secondary hover:bg-surface-2 hover:text-accent transition-all shadow-sm"
          >
            Verb Rules
          </button>
          <button
            onClick={() => navigate('/reference?tab=adj')}
            className="flex-1 sm:flex-none px-3.5 py-2 rounded-xl bg-surface border border-border text-xs font-bold text-text-secondary hover:bg-surface-2 hover:text-accent transition-all shadow-sm"
          >
            Adjective Rules
          </button>
        </div>
      </div>

      {/* Continue Learning Active Hero Card */}
      {nextLesson && (
        <div className="bg-gradient-to-r from-accent/10 via-accent/5 to-surface rounded-2xl border border-accent/25 p-5 shadow-card flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-accent text-white flex items-center justify-center flex-shrink-0 shadow-sm mt-0.5 sm:mt-0">
              <Sparkles size={22} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-accent">
                  Continue Your Learning Path
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-accent text-white font-bold">
                  {statusLabel(getLessonStatus(nextLesson.id))}
                </span>
              </div>
              <h3 className="text-lg font-bold text-text-primary mt-0.5">
                Lesson {nextLesson.lessonNumber}: {nextLesson.title}
              </h3>
              <p className="text-xs text-text-secondary mt-0.5">
                {nextLessonUnit?.title} · {nextLesson.estimatedMinutes} mins · {nextLesson.titleJa}
              </p>
            </div>
          </div>

          <button
            onClick={() => navigate(`/learn/${nextLesson.id}`)}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-accent text-white text-xs font-bold hover:opacity-90 shadow-sm active:scale-95 transition-all flex items-center justify-center gap-2 flex-shrink-0"
          >
            <span>{getLessonStatus(nextLesson.id) === 'in-progress' ? 'Resume Lesson' : 'Start Lesson'}</span>
            <ArrowRight size={14} />
          </button>
        </div>
      )}

      {/* Curriculum Overall Stats Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-surface rounded-xl border border-border p-4 shadow-card">
          <p className="text-xs text-text-tertiary font-medium">Curriculum Progress</p>
          <p className="text-xl font-bold text-accent mt-1">{overallPct}%</p>
          <div className="mt-2 h-1 bg-border rounded-full overflow-hidden">
            <div className="h-full bg-accent rounded-full transition-all" style={{ width: `${overallPct}%` }} />
          </div>
        </div>
        <div className="bg-surface rounded-xl border border-border p-4 shadow-card">
          <p className="text-xs text-text-tertiary font-medium">Lessons Completed</p>
          <p className="text-xl font-bold text-text-primary mt-1">
            {totalCompleted} / {allLessons.length}
          </p>
          <p className="text-[10px] text-text-tertiary mt-1">Full N5 Coverage</p>
        </div>
        <div className="bg-surface rounded-xl border border-border p-4 shadow-card">
          <p className="text-xs text-text-tertiary font-medium">Total Curriculum Time</p>
          <p className="text-xl font-bold text-text-primary mt-1">~8 Hours</p>
          <p className="text-[10px] text-text-tertiary mt-1">Structured Study</p>
        </div>
        <div className="bg-surface rounded-xl border border-border p-4 shadow-card">
          <p className="text-xs text-text-tertiary font-medium">Units Mastered</p>
          <p className="text-xl font-bold text-amber-500 mt-1 flex items-center gap-1">
            <Award size={18} />
            <span>
              {n5Units.filter((u) => u.lessons.every((l) => getLessonStatus(l.id) === 'completed')).length} / {n5Units.length}
            </span>
          </p>
          <p className="text-[10px] text-text-tertiary mt-1">Units 1–{n5Units.length}</p>
        </div>
      </div>

      {/* Unit Filter Navigation */}
      <div className="flex gap-1.5 flex-wrap items-center pt-2">
        <span className="text-xs text-text-tertiary font-bold uppercase tracking-wider mr-1">
          Filter:
        </span>
        <button
          onClick={() => setUnitFilter('all')}
          className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
            unitFilter === 'all'
              ? 'bg-accent text-white'
              : 'bg-surface border border-border text-text-secondary hover:bg-surface-2'
          }`}
        >
          All Units ({allLessons.length})
        </button>
        {n5Units.map((unit) => {
          const count = unit.lessons.length
          return (
            <button
              key={unit.id}
              onClick={() => setUnitFilter(unit.id)}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                unitFilter === unit.id
                  ? 'bg-accent text-white'
                  : 'bg-surface border border-border text-text-secondary hover:bg-surface-2'
              }`}
            >
              Unit {unit.unitNumber}: {unit.titleJa} ({count})
            </button>
          )
        })}
      </div>

      {/* Units List */}
      <div className="space-y-6">
        {filteredUnits.map((unit) => {
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
                            <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">{score}/10</p>
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
    </div>
  )
}
