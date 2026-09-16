import { Dumbbell, ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function PracticePage() {
  const navigate = useNavigate()


  return (
    <div className="space-y-5 animate-fade-in">
      <div>
        <h2 className="text-xl font-bold text-text-primary">Practice</h2>
        <p className="text-sm text-text-secondary mt-1">
          Drill exercises, sentence building, and timed quizzes.
        </p>
      </div>

      <div className="bg-info-soft border border-info/20 rounded-xl p-5">
        <div className="flex items-start gap-3">
          <Dumbbell size={20} className="text-info flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-text-primary mb-1">Practice Mode Coming Soon</p>
            <p className="text-sm text-text-secondary leading-relaxed">
              Standalone practice drills (particle flashcards, timed sentence building, verb conjugation drills)
              will be built in Phase 3. For now, use the Practice tab inside each lesson.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <button
          onClick={() => navigate('/learn/n5-lesson-001')}
          className="bg-surface rounded-xl border border-border p-5 shadow-card text-left hover:shadow-card-hover hover:border-accent/30 transition-all group"
        >
          <p className="text-sm font-bold text-text-primary group-hover:text-accent transition-colors mb-1">
            Lesson 1 Exercises
          </p>
          <p className="text-xs text-text-secondary mb-3">
            8 exercises: particle selection, sentence ordering, translation, production.
          </p>
          <div className="flex items-center gap-1 text-xs text-accent font-semibold">
            Practice now <ArrowRight size={12} />
          </div>
        </button>

        <button
          onClick={() => navigate('/revision')}
          className="bg-surface rounded-xl border border-border p-5 shadow-card text-left hover:shadow-card-hover hover:border-accent/30 transition-all group"
        >
          <p className="text-sm font-bold text-text-primary group-hover:text-accent transition-colors mb-1">
            Revision Queue
          </p>
          <p className="text-xs text-text-secondary mb-3">
            Review vocabulary and grammar items flagged for revision.
          </p>
          <div className="flex items-center gap-1 text-xs text-accent font-semibold">
            Start revision <ArrowRight size={12} />
          </div>
        </button>
      </div>
    </div>
  )
}
