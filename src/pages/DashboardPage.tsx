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
} from 'lucide-react'
import { useApp } from '@/app/AppContext'
import { progressService } from '@/services/progressService'
import { n5Units, getLessonById } from '@/data/curriculum/n5/units'
import { visitorService } from '@/services/visitorService'
import { useState, useEffect } from 'react'

// ─── Progress ring ────────────────────────────────────────────────────────────

function ProgressRing({ percent, size = 100, strokeWidth = 8 }: {
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
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="#f1f0ed" strokeWidth={strokeWidth} />
        <circle
          cx={size / 2} cy={size / 2} r={radius} fill="none"
          stroke="#b91c1c" strokeWidth={strokeWidth}
          strokeDasharray={circumference} strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-700 ease-out"
        />
      </svg>
      <div className="absolute text-center">
        <p className="text-xl font-bold text-text-primary leading-none">{percent}%</p>
        <p className="text-[9px] text-text-secondary font-japanese mt-0.5">N5</p>
      </div>
    </div>
  )
}

// ─── Quick-action card ────────────────────────────────────────────────────────

function QuickCard({
  icon, label, labelJa, sub, to, color,
}: {
  icon: React.ReactNode
  label: string
  labelJa: string
  sub: string
  to: string
  color: string
}) {
  const navigate = useNavigate()
  return (
    <button
      onClick={() => navigate(to)}
      className="bg-surface border border-border rounded-2xl p-4 text-left hover:shadow-card-hover hover:border-border-strong transition-all group"
    >
      <div className={`w-10 h-10 rounded-xl ${color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
        {icon}
      </div>
      <p className="text-sm font-bold text-text-primary group-hover:text-accent transition-colors">{label}</p>
      <p className="text-[11px] font-japanese text-text-tertiary">{labelJa}</p>
      <p className="text-[11px] text-text-secondary mt-1 leading-snug">{sub}</p>
    </button>
  )
}

// ─── DASHBOARD ────────────────────────────────────────────────────────────────

export default function DashboardPage() {
  const { progress } = useApp()
  const navigate = useNavigate()

  const overallPercent  = progressService.getOverallProgress()
  const vocabLearned    = progressService.getVocabLearnedCount()
  const grammarMastered = progressService.getGrammarMasteredCount()

  const completedLessons = Object.values(progress.lessonProgress).filter(lp => lp.status === 'completed').length

  const currentLesson = getLessonById(progress.currentLessonId)
  const currentUnit   = n5Units.find(u => u.lessons.some(l => l.id === progress.currentLessonId))

  // Time-based greeting
  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'おはようございます' : hour < 18 ? 'こんにちは' : 'こんばんは'
  const greetingEn = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening'

  // ── Visitor counter ──────────────────────────────────────────────────────────
  const [visitorCount, setVisitorCount] = useState<number | null>(null)
  const [visitorLoading, setVisitorLoading] = useState(true)

  useEffect(() => {
    visitorService.hitAndGet().then((count) => {
      setVisitorCount(count)
      setVisitorLoading(false)
    })
  }, [])

  return (
    <div className="space-y-6 animate-fade-in">

      {/* ── HERO ──────────────────────────────────────────────────────────────── */}
      <div className="bg-surface rounded-2xl border border-border shadow-card overflow-hidden relative">
        {/* Decorative kanji watermark */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[100px] font-japanese font-bold text-accent/5 select-none pointer-events-none leading-none">
          学
        </div>
        {/* Top accent strip */}
        <div className="h-1 bg-gradient-to-r from-accent via-red-400 to-rose-300" />

        <div className="p-6 flex flex-col sm:flex-row items-start sm:items-center gap-5">
          <div className="flex-1">
            {/* Greeting */}
            <div className="flex items-center gap-2 mb-3">
              <img
                src="/images/japanora-logo.jpg"
                alt="JAPANORA"
                className="w-7 h-7 rounded-lg object-contain bg-white border border-border"
              />
              <span className="text-xs font-black tracking-widest text-text-primary">JAPANORA</span>
              <span className="w-1 h-1 rounded-full bg-border-strong" />
              <span className="text-xs text-text-tertiary font-japanese">JLPT N5</span>
            </div>
            <p className="text-2xl font-bold text-accent font-japanese mb-0.5">{greeting}！</p>
            <p className="text-sm text-text-secondary mb-4">{greetingEn}! Ready to continue your Japanese journey?</p>

            {/* Current lesson */}
            {currentLesson ? (
              <div className="bg-accent-soft border border-accent/20 rounded-xl p-4 mb-4 max-w-sm">
                <p className="text-[10px] font-bold text-accent uppercase tracking-wider mb-1">
                  ▶ Continue · {currentUnit?.title}
                </p>
                <p className="text-base font-bold text-text-primary font-japanese">{currentLesson.titleJa}</p>
                <p className="text-sm text-text-primary">{currentLesson.title}</p>
                <div className="flex items-center gap-1.5 mt-1">
                  <Clock size={11} className="text-text-tertiary" />
                  <span className="text-[11px] text-text-secondary">~{currentLesson.estimatedMinutes} min</span>
                </div>
              </div>
            ) : (
              <div className="bg-success/10 border border-success/20 rounded-xl p-4 mb-4 max-w-sm">
                <p className="text-sm font-semibold text-success flex items-center gap-2">
                  <CheckCircle2 size={16} /> All lessons complete! おめでとう🎉
                </p>
              </div>
            )}

            <button
              onClick={() => navigate(`/learn/${progress.currentLessonId}`)}
              className="inline-flex items-center gap-2 bg-accent hover:bg-accent-light text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-colors shadow-sm"
            >
              Continue Learning
              <ArrowRight size={16} />
            </button>
          </div>

          {/* Progress ring */}
          <div className="flex flex-col items-center gap-2 flex-shrink-0">
            <ProgressRing percent={overallPercent} size={108} />
            <p className="text-[11px] text-text-secondary font-japanese">学習進捗</p>
          </div>
        </div>
      </div>

      {/* ── STATS ROW ─────────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { icon: <Flame size={16} className="text-warning" />, label: 'Streak', labelJa: '連続', value: `${progress.studyStreak}d`, bg: 'bg-warning-soft', color: 'text-warning' },
          { icon: <CheckCircle2 size={16} className="text-success" />, label: 'Lessons Done', labelJa: 'レッスン', value: completedLessons, bg: 'bg-success-soft', color: 'text-success' },
          { icon: <BookMarked size={16} className="text-info" />, label: 'Vocab', labelJa: '語彙', value: vocabLearned, bg: 'bg-info-soft', color: 'text-info' },
          { icon: <FileText size={16} className="text-accent" />, label: 'Grammar', labelJa: '文法', value: grammarMastered, bg: 'bg-accent-soft', color: 'text-accent' },
        ].map((s, i) => (
          <div key={i} className="bg-surface border border-border rounded-2xl p-4 shadow-card">
            <div className={`w-8 h-8 rounded-lg ${s.bg} flex items-center justify-center mb-2`}>
              {s.icon}
            </div>
            <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-xs font-semibold text-text-primary">{s.label}</p>
            <p className="text-[10px] font-japanese text-text-tertiary">{s.labelJa}</p>
          </div>
        ))}
      </div>

      {/* ── VISITOR COUNTER BANNER ─────────────────────────────────────────────── */}
      <div className="bg-surface border border-border rounded-2xl p-4 shadow-card flex items-center gap-4">
        <div className="w-10 h-10 rounded-xl bg-info-soft flex items-center justify-center flex-shrink-0">
          <Users size={18} className="text-info" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-bold text-text-primary">Global Visitors</p>
          <p className="text-[10px] font-japanese text-text-tertiary">訪問者数 — people who have visited JAPANORA</p>
        </div>
        <div className="text-right flex-shrink-0">
          {visitorLoading ? (
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-info animate-pulse" />
              <span className="text-xs text-text-secondary">Counting…</span>
            </div>
          ) : (
            <>
              <p className="text-2xl font-bold text-info tabular-nums">
                {visitorCount !== null && visitorCount > 0
                  ? visitorCount.toLocaleString()
                  : '—'}
              </p>
              <p className="text-[10px] text-text-tertiary">total visits</p>
            </>
          )}
        </div>
        {/* Live dot */}
        <div className="flex-shrink-0 flex flex-col items-center gap-1">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-success" />
          </span>
          <span className="text-[8px] text-success font-bold uppercase tracking-widest">Live</span>
        </div>
      </div>

      {/* ── STUDY PLAN — Quick actions ─────────────────────────────────────────── */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-base font-bold text-text-primary">Study Sections</h2>
            <p className="text-[11px] font-japanese text-text-tertiary">学習セクション</p>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <QuickCard
            icon={<BookOpen size={18} className="text-accent" />}
            label="Learn" labelJa="まなぶ"
            sub="Structured N5 lessons by unit"
            to="/learn"
            color="bg-accent-soft"
          />
          <QuickCard
            icon={<FileText size={18} className="text-blue-600" />}
            label="Grammar" labelJa="文法"
            sub="N5 grammar patterns with examples"
            to="/grammar"
            color="bg-blue-50"
          />
          <QuickCard
            icon={<BookMarked size={18} className="text-emerald-600" />}
            label="Vocabulary" labelJa="語彙"
            sub="800+ N5 words with meanings"
            to="/vocabulary"
            color="bg-emerald-50"
          />
          <QuickCard
            icon={<BookText size={18} className="text-purple-600" />}
            label="N5 Reference" labelJa="参照"
            sub="Greetings, kanji, verbs, adjectives…"
            to="/reference"
            color="bg-purple-50"
          />
          <QuickCard
            icon={<Dumbbell size={18} className="text-orange-600" />}
            label="Practice" labelJa="練習"
            sub="Test what you've learned"
            to="/practice"
            color="bg-orange-50"
          />
          <QuickCard
            icon={<RefreshCcw size={18} className="text-teal-600" />}
            label="Revision" labelJa="復習"
            sub="Spaced repetition review"
            to="/revision"
            color="bg-teal-50"
          />
        </div>
      </div>

      {/* ── N5 CURRICULUM OVERVIEW ────────────────────────────────────────────── */}
      <div className="bg-surface border border-border rounded-2xl p-5 shadow-card">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <BookOpen size={15} className="text-text-secondary" />
            <div>
              <h2 className="text-sm font-bold text-text-primary">N5 Curriculum</h2>
              <p className="text-[10px] font-japanese text-text-tertiary">カリキュラム</p>
            </div>
          </div>
          <button onClick={() => navigate('/learn')} className="text-xs text-accent hover:underline flex items-center gap-1">
            View all <ChevronRight size={12} />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {n5Units.map((unit) => {
            const done = unit.lessons.filter(l => progress.lessonProgress[l.id]?.status === 'completed').length
            const pct  = Math.round((done / unit.lessons.length) * 100)
            return (
              <button
                key={unit.id}
                onClick={() => navigate('/learn')}
                className="text-left p-3 rounded-xl border border-border hover:border-accent/30 hover:shadow-card-hover transition-all group"
              >
                <div className="flex items-start justify-between mb-1.5">
                  <div>
                    <span className="text-[9px] font-bold text-text-tertiary uppercase tracking-wider">Unit {unit.unitNumber}</span>
                    <p className="text-sm font-semibold text-text-primary group-hover:text-accent transition-colors">{unit.title}</p>
                    <p className="text-[10px] font-japanese text-text-tertiary">{unit.titleJa}</p>
                  </div>
                  <span className="text-[10px] font-semibold text-text-tertiary">{done}/{unit.lessons.length}</span>
                </div>
                <div className="h-1.5 bg-surface-2 rounded-full overflow-hidden">
                  <div className="h-full bg-accent rounded-full transition-all duration-500" style={{ width: `${pct}%` }} />
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* ── RECENT SESSIONS ───────────────────────────────────────────────────── */}
      {progress.studySessions.length > 0 && (
        <div className="bg-surface border border-border rounded-2xl p-5 shadow-card">
          <div className="flex items-center gap-2 mb-3">
            <Clock size={14} className="text-text-secondary" />
            <h2 className="text-sm font-bold text-text-primary">Recent Sessions</h2>
            <span className="text-[10px] font-japanese text-text-tertiary">最近の学習</span>
          </div>
          <div className="space-y-0">
            {progress.studySessions.slice(-3).reverse().map((session) => (
              <div key={session.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                <div>
                  <p className="text-sm text-text-primary">{session.date}</p>
                  <p className="text-xs text-text-secondary">{session.durationMinutes} min · {session.exercisesCompleted} exercises</p>
                </div>
                <p className="text-sm font-bold text-success">{Math.round(session.accuracy * 100)}%</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── JAPANESE PROVERB FOOTER ───────────────────────────────────────────── */}
      <div className="text-center py-4">
        <p className="text-lg font-japanese text-text-tertiary">学べば学ぶほど、知らないことがわかる</p>
        <p className="text-xs text-text-tertiary mt-1 italic">"The more you learn, the more you realize how much you don't know."</p>
      </div>
    </div>
  )
}
