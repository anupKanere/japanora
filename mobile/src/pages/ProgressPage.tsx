import { useApp } from '@/app/AppContext'
import { progressService } from '@/services/progressService'
import { n5Units } from '@/data/curriculum/n5/units'
import {
  BarChart2,
  Flame,
  CheckCircle2,
  BookMarked,
  PenLine,
  FileText,
  Clock,
  TrendingUp,
} from 'lucide-react'

const MISTAKE_LABELS: Record<string, string> = {
  particle: 'Particle usage',
  nounModification: 'Noun modification',
  verbConjugation: 'Verb conjugation',
  vocabulary: 'Vocabulary',
  wordOrder: 'Word order',
  spelling: 'Spelling',
}

function MiniBar({ value, max, color = 'bg-accent' }: { value: number; max: number; color?: string }) {
  const pct = max > 0 ? Math.min((value / max) * 100, 100) : 0
  return (
    <div className="h-2 bg-surface-2 rounded-full overflow-hidden">
      <div className={`h-full ${color} rounded-full transition-all duration-500`} style={{ width: `${pct}%` }} />
    </div>
  )
}

export default function ProgressPage() {
  const { progress } = useApp()
  const overall = progressService.getOverallProgress()
  const vocabLearned = progressService.getVocabLearnedCount()
  const kanjiLearned = progressService.getKanjiLearnedCount()
  const grammarMastered = progressService.getGrammarMasteredCount()

  const completedLessons = Object.values(progress.lessonProgress).filter(
    (lp) => lp.status === 'completed'
  ).length

  const avgAccuracy =
    progress.studySessions.length > 0
      ? Math.round(
          (progress.studySessions.reduce((s, sess) => s + sess.accuracy, 0) /
            progress.studySessions.length) *
            100
        )
      : 0

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-xl font-bold text-text-primary">Progress</h2>
        <p className="text-sm text-text-secondary mt-1">
          Your overall learning journey at a glance.
        </p>
      </div>

      {/* Overall N5 progress */}
      <div className="bg-surface rounded-2xl border border-border p-6 shadow-card">
        <div className="flex items-center gap-3 mb-4">
          <BarChart2 size={18} className="text-accent" />
          <h3 className="text-base font-bold text-text-primary">JLPT N5 Progress</h3>
        </div>
        <div className="flex items-center gap-4 mb-3">
          <div className="text-4xl font-bold text-accent">{overall}%</div>
          <div className="flex-1">
            <div className="h-3 bg-surface-2 rounded-full overflow-hidden">
              <div
                className="h-full bg-accent rounded-full transition-all duration-700"
                style={{ width: `${overall}%` }}
              />
            </div>
            <p className="text-xs text-text-secondary mt-1">{completedLessons} of 15 lessons completed</p>
          </div>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {[
          { icon: <Flame size={16} className="text-warning" />, label: 'Study streak', value: `${progress.studyStreak} days`, sub: `Best: ${progress.longestStreak}` },
          { icon: <CheckCircle2 size={16} className="text-success" />, label: 'Lessons complete', value: completedLessons, sub: 'of 15' },
          { icon: <TrendingUp size={16} className="text-info" />, label: 'Avg accuracy', value: `${avgAccuracy}%`, sub: `${progress.studySessions.length} sessions` },
          { icon: <BookMarked size={16} className="text-accent" />, label: 'Vocab learned', value: vocabLearned, sub: 'words' },
          { icon: <PenLine size={16} className="text-accent" />, label: 'Kanji seen', value: kanjiLearned, sub: 'of 12' },
          { icon: <FileText size={16} className="text-success" />, label: 'Grammar mastered', value: grammarMastered, sub: 'points' },
          { icon: <Clock size={16} className="text-text-secondary" />, label: 'Study time', value: `${progress.totalStudyMinutes}m`, sub: 'total' },
        ].map(({ icon, label, value, sub }) => (
          <div key={label} className="bg-surface rounded-xl border border-border p-4 shadow-card">
            <div className="flex items-center gap-2 mb-1 text-text-secondary">{icon}</div>
            <p className="text-2xl font-bold text-text-primary">{value}</p>
            <p className="text-xs text-text-secondary">{label}</p>
            <p className="text-[10px] text-text-tertiary">{sub}</p>
          </div>
        ))}
      </div>

      {/* Unit progress */}
      <div className="bg-surface rounded-xl border border-border p-5 shadow-card">
        <h3 className="text-sm font-bold text-text-primary mb-4">Unit Progress</h3>
        <div className="space-y-4">
          {n5Units.map((unit) => {
            const done = unit.lessons.filter(
              (l) => progress.lessonProgress[l.id]?.status === 'completed'
            ).length
            return (
              <div key={unit.id}>
                <div className="flex items-center justify-between mb-1.5">
                  <div>
                    <span className="text-xs font-semibold text-text-secondary">Unit {unit.unitNumber}: </span>
                    <span className="text-xs text-text-primary">{unit.title}</span>
                  </div>
                  <span className="text-xs font-semibold text-accent">{done}/{unit.lessons.length}</span>
                </div>
                <MiniBar value={done} max={unit.lessons.length} />
              </div>
            )
          })}
        </div>
      </div>

      {/* Weak areas */}
      {progress.weakAreas.length > 0 && (
        <div className="bg-surface rounded-xl border border-border p-5 shadow-card">
          <h3 className="text-sm font-bold text-text-primary mb-4">Weak Areas (from mistakes)</h3>
          <div className="space-y-2">
            {progress.weakAreas.map((area) => (
              <div key={area} className="flex items-center gap-3 p-3 bg-accent-soft/30 border border-accent/10 rounded-lg">
                <span className="w-2 h-2 rounded-full bg-accent flex-shrink-0" />
                <span className="text-sm text-text-primary">{MISTAKE_LABELS[area] ?? area}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Session history */}
      {progress.studySessions.length > 0 && (
        <div className="bg-surface rounded-xl border border-border p-5 shadow-card">
          <h3 className="text-sm font-bold text-text-primary mb-4">Study Sessions</h3>
          <div className="space-y-2">
            {[...progress.studySessions].reverse().map((session) => (
              <div
                key={session.id}
                className="flex items-center justify-between p-3 bg-surface-2 rounded-lg border border-border"
              >
                <div>
                  <p className="text-sm font-medium text-text-primary">{session.date}</p>
                  <p className="text-xs text-text-secondary">
                    {session.durationMinutes} min · {session.exercisesCompleted} exercises
                  </p>
                </div>
                <div className={`text-sm font-bold ${session.accuracy >= 0.8 ? 'text-success' : 'text-warning'}`}>
                  {Math.round(session.accuracy * 100)}%
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
