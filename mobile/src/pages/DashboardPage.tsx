import { useState, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Flame,
  BookOpen,
  BookMarked,
  FileText,
  ArrowRight,
  Clock,
  CheckCircle2,
  ChevronRight,
  BookText,
  Dumbbell,
  RefreshCcw,
  Users,
  Sparkles,
  Target,
  Calendar,
  CheckSquare,
  Square,
  Award,
  Languages,
} from 'lucide-react'
import { useApp } from '@/app/AppContext'
import { progressService } from '@/services/progressService'
import { n5Units, getLessonById } from '@/data/curriculum/n5/units'
import { n5Vocabulary } from '@/data/vocabulary/n5-vocab'
import { n5Grammar } from '@/data/grammar/n5-grammar'
import { n5Kanji } from '@/data/kanji/n5-kanji'
import { visitorService } from '@/services/visitorService'

// ─── Theme-safe Progress ring ─────────────────────────────────────────────────

function ProgressRing({ percent, size = 104, strokeWidth = 8 }: {
  percent: number
  size?: number
  strokeWidth?: number
}) {
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (percent / 100) * circumference

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="-rotate-90">
        {/* Theme-adaptive track: text-border in Tailwind */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-border"
        />
        {/* Dynamic accent fill */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="text-accent transition-all duration-700 ease-out"
        />
      </svg>
      <div className="absolute text-center">
        <p className="text-xl font-bold text-text-primary leading-none">{percent}%</p>
        <p className="text-[9px] text-text-secondary font-japanese mt-0.5">N5</p>
      </div>
    </div>
  )
}

// ─── Enhanced Quick Action Card ───────────────────────────────────────────────

function QuickCard({
  icon,
  label,
  labelJa,
  sub,
  to,
  badge,
  iconBg,
  iconColor,
}: {
  icon: React.ReactNode
  label: string
  labelJa: string
  sub: string
  to: string
  badge?: string
  iconBg: string
  iconColor: string
}) {
  const navigate = useNavigate()
  return (
    <button
      onClick={() => navigate(to)}
      className="bg-surface border border-border rounded-2xl p-4 text-left hover:shadow-card-hover hover:border-border-strong hover:scale-[1.01] transition-all group flex flex-col justify-between"
    >
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className={`w-10 h-10 rounded-xl ${iconBg} ${iconColor} flex items-center justify-center group-hover:scale-110 transition-transform`}>
            {icon}
          </div>
          {badge && (
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-accent/10 text-accent border border-accent/20">
              {badge}
            </span>
          )}
        </div>
        <p className="text-sm font-bold text-text-primary group-hover:text-accent transition-colors flex items-center gap-1.5">
          <span>{label}</span>
          <span className="text-[11px] font-japanese font-normal text-text-tertiary">（{labelJa}）</span>
        </p>
        <p className="text-xs text-text-secondary mt-1 leading-snug">{sub}</p>
      </div>

      <div className="mt-3 pt-2.5 border-t border-border/40 flex items-center justify-between text-[11px] text-text-tertiary group-hover:text-accent transition-colors font-medium">
        <span>Explore</span>
        <ChevronRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
      </div>
    </button>
  )
}

// ─── MAIN DASHBOARD ───────────────────────────────────────────────────────────

export default function DashboardPage() {
  const { progress, settings } = useApp()
  const navigate = useNavigate()

  const overallPercent  = progressService.getOverallProgress()
  const vocabBreakdown  = useMemo(() => progressService.getVocabBreakdown(n5Vocabulary.length), [progress.vocabProgress])
  const grammarBreakdown = useMemo(() => progressService.getGrammarBreakdown(n5Grammar.length), [progress.grammarProgress])
  const vocabLearned    = vocabBreakdown.learned
  const grammarMastered = grammarBreakdown.mastered

  const totalLessons = useMemo(() => n5Units.reduce((acc, u) => acc + u.lessons.length, 0), [])
  const completedLessons = Object.values(progress.lessonProgress).filter((lp) => lp.status === 'completed').length

  const currentLesson = getLessonById(progress.currentLessonId)
  const currentUnit   = n5Units.find((u) => u.lessons.some((l) => l.id === progress.currentLessonId))

  // Time-based greeting
  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'おはようございます' : hour < 18 ? 'こんにちは' : 'こんばんは'
  const greetingEn = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening'

  // Spaced repetition due items
  const learningVocab = useMemo(() => {
    return n5Vocabulary.filter((v) => progress.vocabProgress[v.id]?.familiarity === 'learning')
  }, [progress.vocabProgress])

  const reviewGrammar = useMemo(() => {
    return n5Grammar.filter(
      (g) => !progress.grammarProgress[g.id] || progress.grammarProgress[g.id].familiarity === 'learning'
    )
  }, [progress.grammarProgress])

  const totalDue = learningVocab.length + reviewGrammar.length

  // JLPT N5 Readiness Score (Weighted: 40% Lessons, 35% Vocab, 25% Grammar)
  const readinessScore = useMemo(() => {
    const lessonPart = totalLessons > 0 ? (completedLessons / totalLessons) * 40 : 0
    const vocabPart = n5Vocabulary.length > 0 ? (vocabLearned / n5Vocabulary.length) * 35 : 0
    const grammarPart = n5Grammar.length > 0 ? (grammarMastered / n5Grammar.length) * 25 : 0
    return Math.min(100, Math.round(lessonPart + vocabPart + grammarPart))
  }, [completedLessons, totalLessons, vocabLearned, grammarMastered])

  // Deterministic Kanji of the Day (based on local calendar day of year)
  const kanjiOfTheDay = useMemo(() => {
    const now = new Date()
    const start = Date.UTC(now.getFullYear(), 0, 0)
    const current = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate())
    const oneDay = 1000 * 60 * 60 * 24
    const dayOfYear = Math.floor((current - start) / oneDay)
    return n5Kanji[dayOfYear % n5Kanji.length]
  }, [])

  // 7-day week activity streak tracker
  const weekDays = useMemo(() => {
    const today = new Date()
    const dayOfWeek = today.getDay() // 0 = Sun, 1 = Mon ...
    const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek // Adjust to Monday
    const days = []

    for (let i = 0; i < 7; i++) {
      const d = new Date(today)
      d.setDate(today.getDate() + mondayOffset + i)
      const isPastOrToday = d <= today
      const isToday = d.toDateString() === today.toDateString()
      // Has study activity if streak > 0 or has sessions today
      const hasStudied = isToday ? progress.studyStreak > 0 : isPastOrToday && i < (dayOfWeek === 0 ? 7 : dayOfWeek)
      days.push({
        name: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i],
        nameJa: ['月', '火', '水', '木', '金', '土', '日'][i],
        date: d.getDate(),
        isToday,
        hasStudied,
      })
    }
    return days
  }, [progress.studyStreak])

  // Daily Micro-Goals Checkpoints (local storage persistence)
  const [dailyGoals, setDailyGoals] = useState({
    lesson: false,
    vocab: false,
    grammar: false,
  })

  useEffect(() => {
    const saved = localStorage.getItem('japanora_daily_goals')
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        const todayStr = new Date().toDateString()
        if (parsed.date === todayStr) {
          setDailyGoals(parsed.goals)
        }
      } catch {
        // Ignore parse error
      }
    }
  }, [])

  function toggleGoal(key: 'lesson' | 'vocab' | 'grammar') {
    setDailyGoals((prev) => {
      const next = { ...prev, [key]: !prev[key] }
      localStorage.setItem('japanora_daily_goals', JSON.stringify({
        date: new Date().toDateString(),
        goals: next,
      }))
      return next
    })
  }

  // Visitor counter (relocated to footer status bar)
  const [visitorCount, setVisitorCount] = useState<number | null>(null)
  const [visitorLoading, setVisitorLoading] = useState(true)

  useEffect(() => {
    visitorService.hitAndGet().then((count) => {
      setVisitorCount(count)
      setVisitorLoading(false)
    })
  }, [])

  return (
    <div className="space-y-6 animate-fade-in pb-10">

      {/* ── 1. HERO SECTION ───────────────────────────────────────────────────── */}
      <div className="bg-surface rounded-2xl border border-border shadow-card overflow-hidden relative">
        {/* Top brand gradient accent strip */}
        <div className="h-1 bg-gradient-to-r from-accent via-rose-500 to-amber-400" />

        {/* Subtle decorative background watermark */}
        <div className="absolute right-6 top-1/2 -translate-y-1/2 text-[120px] font-japanese font-bold text-accent/[0.04] select-none pointer-events-none leading-none">
          学
        </div>

        <div className="p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div className="flex-1">
            {/* Brand pill */}
            <div className="flex items-center gap-2 mb-3">
              <img
                src="/images/japanora-logo.jpg"
                alt="JAPANORA"
                className="w-6 h-6 rounded-md object-contain bg-white border border-border shadow-sm"
              />
              <span className="text-xs font-black tracking-widest text-text-primary">JAPANORA</span>
              <span className="w-1 h-1 rounded-full bg-border-strong" />
              <span className="text-xs text-text-tertiary font-japanese">日本語 N5 コース</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold text-text-primary font-japanese mb-1">
              {greeting}！
            </h1>
            <p className="text-sm text-text-secondary mb-4">
              {greetingEn}! Ready to advance your Japanese study today?
            </p>

            {/* Current lesson progress card */}
            {currentLesson ? (
              <div className="bg-surface-2 border border-border rounded-xl p-4 mb-4 max-w-md shadow-sm">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-bold text-accent uppercase tracking-wider">
                    ▶ Up Next · {currentUnit?.title}
                  </span>
                  <div className="flex items-center gap-1 text-[11px] text-text-tertiary">
                    <Clock size={11} />
                    <span>~{currentLesson.estimatedMinutes} min</span>
                  </div>
                </div>
                <p className="text-base font-bold text-text-primary font-japanese">{currentLesson.titleJa}</p>
                <p className="text-xs text-text-secondary">{currentLesson.title}</p>
              </div>
            ) : (
              <div className="bg-success-soft border border-success/20 rounded-xl p-4 mb-4 max-w-md">
                <p className="text-sm font-semibold text-success flex items-center gap-2">
                  <CheckCircle2 size={16} /> All curriculum lessons complete! おめでとうございます🎉
                </p>
              </div>
            )}

            <div className="flex items-center gap-3 flex-wrap">
              <button
                onClick={() => navigate(`/learn/${progress.currentLessonId}`)}
                className="inline-flex items-center gap-2 bg-accent hover:opacity-90 text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-all shadow-sm active:scale-95"
              >
                Continue Learning
                <ArrowRight size={16} />
              </button>

              {totalDue > 0 && (
                <button
                  onClick={() => navigate('/revision')}
                  className="inline-flex items-center gap-1.5 bg-surface border border-accent/30 text-accent hover:bg-accent/10 px-4 py-2.5 rounded-xl text-xs font-semibold transition-colors"
                >
                  <RefreshCcw size={14} />
                  <span>Review {totalDue} Items</span>
                </button>
              )}
            </div>
          </div>

          {/* Overall curriculum progress ring */}
          <div className="flex flex-col items-center gap-2 p-4 bg-surface-2 rounded-2xl border border-border self-center md:self-auto shrink-0 shadow-sm">
            <ProgressRing percent={overallPercent} size={104} />
            <div className="text-center">
              <p className="text-xs font-bold text-text-primary">Curriculum Progress</p>
              <p className="text-[10px] text-text-tertiary font-japanese">全体の学習進捗</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── 2. CORE STATS & JLPT N5 READINESS GAUGE ───────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* 4 Stats Grid (Takes 2 cols on lg) */}
        <div className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            {
              icon: <Flame size={18} className="text-amber-500" />,
              label: 'Study Streak',
              labelJa: '連続学習',
              value: `${progress.studyStreak}d`,
              sub: 'keep it going!',
              breakdown: null,
              bg: 'bg-amber-500/10 border-amber-500/20',
              color: 'text-amber-500',
              onClick: undefined,
            },
            {
              icon: <CheckCircle2 size={18} className="text-emerald-500" />,
              label: 'Lessons Done',
              labelJa: '完了レッスン',
              value: `${completedLessons}/${totalLessons}`,
              sub: `${totalLessons - completedLessons} remaining`,
              breakdown: null,
              bg: 'bg-emerald-500/10 border-emerald-500/20',
              color: 'text-emerald-500',
              onClick: () => navigate('/learn'),
            },
            {
              icon: <BookMarked size={18} className="text-blue-500" />,
              label: 'Vocab Learned',
              labelJa: '習得語彙',
              value: vocabBreakdown.learned,
              sub: `of ${n5Vocabulary.length} total`,
              breakdown: (
                <div className="flex flex-col gap-1 mt-2 pt-2 border-t border-border/40 text-[10px]">
                  <div className="flex items-center justify-between text-text-tertiary">
                    <span className="text-blue-500 font-semibold">{vocabBreakdown.learned} Learned</span>
                    <span className="text-amber-500">{vocabBreakdown.learning} Learning</span>
                  </div>
                  <div className="flex items-center justify-between text-text-tertiary">
                    <span>{vocabBreakdown.unstudied} To Study</span>
                    <span className="text-accent hover:underline flex items-center gap-0.5 font-semibold">View →</span>
                  </div>
                </div>
              ),
              bg: 'bg-blue-500/10 border-blue-500/20',
              color: 'text-blue-500',
              onClick: () => navigate('/vocabulary'),
            },
            {
              icon: <FileText size={18} className="text-accent" />,
              label: 'Grammar Points',
              labelJa: '文法項目',
              value: grammarBreakdown.mastered,
              sub: `of ${n5Grammar.length} mastered`,
              breakdown: (
                <div className="flex flex-col gap-1 mt-2 pt-2 border-t border-border/40 text-[10px]">
                  <div className="flex items-center justify-between text-text-tertiary">
                    <span className="text-accent font-semibold">{grammarBreakdown.mastered} Mastered</span>
                    <span className="text-amber-500">{grammarBreakdown.learning} Learning</span>
                  </div>
                  <div className="flex items-center justify-between text-text-tertiary">
                    <span>{grammarBreakdown.unstudied} To Study</span>
                    <span className="text-accent hover:underline flex items-center gap-0.5 font-semibold">View →</span>
                  </div>
                </div>
              ),
              bg: 'bg-accent/10 border-accent/20',
              color: 'text-accent',
              onClick: () => navigate('/grammar'),
            },
          ].map((s, i) => (
            <div
              key={i}
              onClick={s.onClick}
              className={`bg-surface border border-border rounded-2xl p-4 shadow-card flex flex-col justify-between transition-all ${
                s.onClick ? 'cursor-pointer hover:border-accent/40 hover:shadow-md active:scale-[0.99]' : ''
              }`}
            >
              <div className={`w-9 h-9 rounded-xl ${s.bg} border flex items-center justify-center mb-3`}>
                {s.icon}
              </div>
              <div>
                <p className={`text-2xl font-bold tracking-tight ${s.color}`}>{s.value}</p>
                <p className="text-xs font-bold text-text-primary mt-0.5">{s.label}</p>
                <p className="text-[10px] font-japanese text-text-tertiary">{s.labelJa}</p>
              </div>
              {s.breakdown ? (
                s.breakdown
              ) : (
                <p className="text-[10px] text-text-secondary mt-2 pt-2 border-t border-border/40 font-medium">
                  {s.sub}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* JLPT N5 Exam Readiness Gauge */}
        <div className="bg-surface border border-border rounded-2xl p-5 shadow-card flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Target size={16} className="text-accent" />
                <h2 className="text-xs font-bold uppercase tracking-wider text-text-primary">JLPT N5 Readiness</h2>
              </div>
              <span className="text-xs font-bold text-accent font-mono px-2 py-0.5 rounded-md bg-accent/10 border border-accent/20">
                {readinessScore}%
              </span>
            </div>
            <p className="text-xs text-text-secondary mb-3">
              Calculated from your completed lessons, learned vocabulary, and grammar mastery.
            </p>

            {/* Progress Bar */}
            <div className="h-2.5 bg-surface-2 rounded-full overflow-hidden border border-border/50 mb-3">
              <div
                className="h-full bg-gradient-to-r from-accent via-rose-500 to-amber-500 rounded-full transition-all duration-700 ease-out"
                style={{ width: `${Math.max(readinessScore, 5)}%` }}
              />
            </div>
          </div>

          <div className="p-3 bg-surface-2 rounded-xl border border-border flex items-center gap-2.5">
            <Award size={18} className="text-amber-500 shrink-0" />
            <div className="min-w-0">
              <p className="text-xs font-bold text-text-primary truncate">
                {readinessScore >= 80 ? '🏆 Exam Ready (合格圏内)' : readinessScore >= 50 ? '📈 Solid Foundation (実力養成)' : '🌱 Explorer Stage (基礎固め)'}
              </p>
              <p className="text-[10px] text-text-tertiary font-japanese">Target: JLPT N5 Official Certification</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── 3. WEEKLY ACTIVITY & KANJI OF THE DAY ─────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* 7-Day Consistency & Daily Checkpoints */}
        <div className="bg-surface border border-border rounded-2xl p-5 shadow-card flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Calendar size={16} className="text-text-secondary" />
                <h2 className="text-sm font-bold text-text-primary">Weekly Consistency</h2>
                <span className="text-[10px] font-japanese text-text-tertiary">（週間記録）</span>
              </div>
              <span className="text-xs text-text-tertiary font-semibold">
                {progress.studyStreak} Day Streak 🔥
              </span>
            </div>

            {/* 7-Day Bar */}
            <div className="grid grid-cols-7 gap-1.5 mb-4">
              {weekDays.map((d, i) => (
                <div
                  key={i}
                  className={`p-2 rounded-xl text-center border transition-all ${
                    d.isToday
                      ? 'bg-accent/15 border-accent text-text-primary shadow-sm font-bold'
                      : d.hasStudied
                      ? 'bg-success/10 border-success/30 text-success'
                      : 'bg-surface-2 border-border/60 text-text-tertiary'
                  }`}
                >
                  <p className="text-[10px] uppercase font-bold">{d.name}</p>
                  <p className="text-xs font-japanese my-0.5">{d.nameJa}</p>
                  <div className="mt-1 flex justify-center">
                    {d.hasStudied ? (
                      <span className="w-2 h-2 rounded-full bg-success" />
                    ) : (
                      <span className="w-1.5 h-1.5 rounded-full bg-border" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Daily Micro-Goals Checkpoints */}
          <div className="pt-3 border-t border-border space-y-2">
            <p className="text-[10px] font-bold text-text-tertiary uppercase tracking-wider flex items-center justify-between">
              <span>Today's Checkpoints ({settings.dailyGoalMinutes}m goal) / 今日の目標</span>
              <span className="font-mono">
                {Object.values(dailyGoals).filter(Boolean).length}/3 Done
              </span>
            </p>

            <div className="space-y-1.5">
              {[
                { key: 'lesson' as const, label: 'Complete 1 Curriculum Lesson' },
                { key: 'vocab' as const, label: 'Review 10 Vocabulary Words in Themes' },
                { key: 'grammar' as const, label: 'Inspect 1 Grammar Pattern with Examples' },
              ].map((goal) => {
                const checked = dailyGoals[goal.key]
                return (
                  <button
                    key={goal.key}
                    onClick={() => toggleGoal(goal.key)}
                    className="w-full flex items-center gap-2.5 p-2 rounded-lg hover:bg-surface-2 transition-colors text-left group"
                  >
                    {checked ? (
                      <CheckSquare size={16} className="text-success shrink-0" />
                    ) : (
                      <Square size={16} className="text-text-tertiary group-hover:text-text-secondary shrink-0" />
                    )}
                    <span className={`text-xs ${checked ? 'line-through text-text-tertiary' : 'text-text-primary font-medium'}`}>
                      {goal.label}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Kanji of the Day Card */}
        {kanjiOfTheDay && (
          <div className="bg-surface border border-border rounded-2xl p-5 shadow-card flex flex-col justify-between relative overflow-hidden">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Sparkles size={16} className="text-amber-500" />
                <h2 className="text-sm font-bold text-text-primary">Kanji of the Day</h2>
                <span className="text-[10px] font-japanese text-text-tertiary">（今日の一字）</span>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-surface-2 border border-border text-text-tertiary">
                {kanjiOfTheDay.strokeCount} Strokes
              </span>
            </div>

            <div className="flex items-start gap-4 mb-4">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-accent/15 via-surface-2 to-accent/5 border border-accent/30 flex items-center justify-center shrink-0 shadow-sm">
                <span className="text-4xl font-japanese font-bold text-text-primary">{kanjiOfTheDay.character}</span>
              </div>

              <div className="flex-1 min-w-0 space-y-1">
                <p className="text-base font-bold text-text-primary capitalize">{kanjiOfTheDay.meaning.join(', ')}</p>
                <div className="text-xs text-text-secondary space-y-0.5">
                  <p>
                    <span className="text-text-tertiary font-semibold text-[10px] uppercase mr-1.5">On:</span>
                    <span className="font-japanese font-semibold">{kanjiOfTheDay.readings.onyomi.join('、 ') || '—'}</span>
                  </p>
                  <p>
                    <span className="text-text-tertiary font-semibold text-[10px] uppercase mr-1.5">Kun:</span>
                    <span className="font-japanese font-semibold">{kanjiOfTheDay.readings.kunyomi.join('、 ') || '—'}</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Example sentence */}
            {kanjiOfTheDay.exampleSentence && (
              <div className="p-3 bg-surface-2 rounded-xl border border-border text-xs mb-3">
                <p className="font-japanese font-semibold text-text-primary">{kanjiOfTheDay.exampleSentence.hiragana}</p>
                <p className="text-[11px] text-text-tertiary mt-0.5 italic">{kanjiOfTheDay.exampleSentence.meaning}</p>
              </div>
            )}

            <button
              onClick={() => navigate('/reference?category=kanji')}
              className="w-full flex items-center justify-center gap-1.5 text-xs text-accent font-semibold hover:underline py-1"
            >
              <span>Explore all 125 N5 Kanji in Essentials</span>
              <ChevronRight size={12} />
            </button>
          </div>
        )}
      </div>

      {/* ── 4. STUDY SECTIONS — Enhanced Action Cards ─────────────────────────── */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-base font-bold text-text-primary">Study Sections</h2>
            <p className="text-[11px] font-japanese text-text-tertiary">学習セクション</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <QuickCard
            icon={<Languages size={18} />}
            label="Kana (あ/ア)"
            labelJa="仮名"
            sub="Master all 104 Hiragana & Katakana with native audio, mnemonics & quiz"
            to="/kana"
            badge="104 Kana"
            iconBg="bg-rose-500/10"
            iconColor="text-rose-500 dark:text-rose-400"
          />

          <QuickCard
            icon={<BookOpen size={18} />}
            label="Learn"
            labelJa="まなぶ"
            sub="Structured curriculum: 5 units & 15 progressive lessons"
            to="/learn"
            badge={`${completedLessons}/${totalLessons} Done`}
            iconBg="bg-accent/10"
            iconColor="text-accent"
          />

          <QuickCard
            icon={<FileText size={18} />}
            label="Grammar"
            labelJa="文法"
            sub="50 essential N5 grammar patterns with interactive examples"
            to="/grammar"
            badge="50 Patterns"
            iconBg="bg-blue-500/10"
            iconColor="text-blue-500 dark:text-blue-400"
          />

          <QuickCard
            icon={<BookMarked size={18} />}
            label="Vocabulary"
            labelJa="語彙"
            sub="793 complete N5 vocabulary words categorized by 12 themes"
            to="/vocabulary"
            badge="793 Words"
            iconBg="bg-emerald-500/10"
            iconColor="text-emerald-500 dark:text-emerald-400"
          />

          <QuickCard
            icon={<BookText size={18} />}
            label="Essentials"
            labelJa="基礎"
            sub="Conjugation charts, Particles, Numbers, Time, and 12 essential guides"
            to="/reference"
            badge="12 Sections"
            iconBg="bg-purple-500/10"
            iconColor="text-purple-500 dark:text-purple-400"
          />

          <QuickCard
            icon={<Dumbbell size={18} />}
            label="Practice"
            labelJa="練習"
            sub="Drill exercises, translation tasks, and sentence building"
            to="/practice"
            badge="Interactive"
            iconBg="bg-orange-500/10"
            iconColor="text-orange-500 dark:text-orange-400"
          />

          <QuickCard
            icon={<RefreshCcw size={18} />}
            label="Revision"
            labelJa="復習"
            sub={totalDue > 0 ? `${totalDue} items currently due for spaced repetition` : 'All vocabulary and grammar reviews are up to date'}
            to="/revision"
            badge={totalDue > 0 ? `${totalDue} Due` : 'Ready'}
            iconBg="bg-teal-500/10"
            iconColor="text-teal-500 dark:text-teal-400"
          />
        </div>
      </div>

      {/* ── 5. CURRICULUM OVERVIEW ────────────────────────────────────────────── */}
      <div className="bg-surface border border-border rounded-2xl p-5 shadow-card">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <BookOpen size={15} className="text-text-secondary" />
            <div>
              <h2 className="text-sm font-bold text-text-primary">N5 Curriculum Overview</h2>
              <p className="text-[10px] font-japanese text-text-tertiary">カリキュラム進捗</p>
            </div>
          </div>
          <button onClick={() => navigate('/learn')} className="text-xs text-accent hover:underline flex items-center gap-1">
            View all lessons <ChevronRight size={12} />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {n5Units.map((unit) => {
            const done = unit.lessons.filter((l) => progress.lessonProgress[l.id]?.status === 'completed').length
            const pct  = Math.round((done / unit.lessons.length) * 100)
            return (
              <button
                key={unit.id}
                onClick={() => navigate('/learn')}
                className="text-left p-3.5 rounded-xl border border-border hover:border-accent/40 hover:shadow-card-hover transition-all group bg-surface-2/40 hover:bg-surface-2"
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <span className="text-[9px] font-bold text-text-tertiary uppercase tracking-wider">Unit {unit.unitNumber}</span>
                    <p className="text-sm font-semibold text-text-primary group-hover:text-accent transition-colors">{unit.title}</p>
                    <p className="text-[10px] font-japanese text-text-tertiary">{unit.titleJa}</p>
                  </div>
                  <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded-md bg-surface border border-border text-text-secondary">
                    {done}/{unit.lessons.length}
                  </span>
                </div>
                <div className="h-1.5 bg-surface rounded-full overflow-hidden border border-border/30">
                  <div className="h-full bg-accent rounded-full transition-all duration-500" style={{ width: `${pct}%` }} />
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* ── 6. FOOTER COMMUNITY STATUS & JAPANESE PROVERB ─────────────────────── */}
      <div className="pt-4 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-text-tertiary">
        {/* Relocated compact visitor counter */}
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-success" />
          </span>
          <Users size={13} className="text-text-tertiary" />
          <span>
            {visitorLoading ? 'Counting visitors…' : `${visitorCount?.toLocaleString() ?? '—'} total visits from learners worldwide`}
          </span>
        </div>

        {/* Proverb */}
        <div className="text-center sm:text-right">
          <p className="font-japanese text-text-secondary">学べば学ぶほど、知らないことがわかる</p>
          <p className="text-[10px] italic">"The more you learn, the more you realize how much you don't know."</p>
        </div>
      </div>

    </div>
  )
}
