import type {
  LearnerProgress,
  LessonProgress,
  LessonStatus,
  MistakeCategory,
  VocabProgress,
  KanjiProgress,
  GrammarProgress,
  StudySession,
  FamiliarityLevel,
} from '@/types'
import { storageService } from './storageService'
import { getAllLessons, TOTAL_LESSONS } from '@/data/curriculum/n5/units'

const PROGRESS_KEY = 'learner_progress'

const DEMO_LEARNER_ID = 'demo-learner-001'

function createInitialProgress(): LearnerProgress {
  // Seed lesson-001 as completed with the real homework data
  const lesson001Progress: LessonProgress = {
    lessonId: 'n5-lesson-001',
    status: 'completed',
    startedAt: '2024-01-15T09:00:00Z',
    completedAt: '2024-01-15T10:40:00Z',
    exerciseScores: {
      'ex-001-01': 1,
      'ex-001-02': 1,
      'ex-001-03': 1,
      'ex-001-04': 0.8,
      'ex-001-05': 1,
      'ex-001-06': 1,
      'ex-001-07': 1,
      'ex-001-08': 0.7,
    },
    homeworkScore: 8.75,
    attempts: 1,
    lastAccessedAt: '2024-01-15T10:40:00Z',
  }

  const lesson002Progress: LessonProgress = {
    lessonId: 'n5-lesson-002',
    status: 'available',
    attempts: 0,
    exerciseScores: {},
    lastAccessedAt: undefined,
  }

  const today = new Date().toISOString().split('T')[0]

  return {
    learnerId: DEMO_LEARNER_ID,
    currentLevel: 'N5',
    currentLessonId: 'n5-lesson-002',
    lessonProgress: {
      'n5-lesson-001': lesson001Progress,
      'n5-lesson-002': lesson002Progress,
    },
    vocabProgress: {
      'vocab-001': makeVocabProgress('vocab-001', 'familiar', 5, 0),
      'vocab-010': makeVocabProgress('vocab-010', 'familiar', 4, 0),
      'vocab-011': makeVocabProgress('vocab-011', 'familiar', 4, 0),
      'vocab-020': makeVocabProgress('vocab-020', 'familiar', 3, 0),
      'vocab-021': makeVocabProgress('vocab-021', 'familiar', 3, 0),
      'vocab-030': makeVocabProgress('vocab-030', 'familiar', 3, 0),
      'vocab-031': makeVocabProgress('vocab-031', 'learning', 2, 2),
      'vocab-034': makeVocabProgress('vocab-034', 'familiar', 4, 0),
      'vocab-035': makeVocabProgress('vocab-035', 'familiar', 3, 0),
      'vocab-040': makeVocabProgress('vocab-040', 'familiar', 4, 0),
      'vocab-042': makeVocabProgress('vocab-042', 'learning', 2, 1),
      'vocab-043': makeVocabProgress('vocab-043', 'familiar', 4, 0),
      'vocab-050': makeVocabProgress('vocab-050', 'familiar', 5, 0),
      'vocab-051': makeVocabProgress('vocab-051', 'familiar', 4, 0),
      'vocab-052': makeVocabProgress('vocab-052', 'familiar', 5, 0),
      'vocab-053': makeVocabProgress('vocab-053', 'familiar', 4, 0),
      'vocab-054': makeVocabProgress('vocab-054', 'learning', 3, 2),
      'vocab-055': makeVocabProgress('vocab-055', 'learning', 2, 3),
    },
    kanjiProgress: {
      'kanji-002': makeKanjiProgress('kanji-002', 'familiar', 3, 0),
      'kanji-005': makeKanjiProgress('kanji-005', 'familiar', 3, 0),
      'kanji-006': makeKanjiProgress('kanji-006', 'learning', 2, 1),
      'kanji-007': makeKanjiProgress('kanji-007', 'learning', 2, 0),
      'kanji-008': makeKanjiProgress('kanji-008', 'familiar', 3, 0),
      'kanji-009': makeKanjiProgress('kanji-009', 'learning', 2, 2),
      'kanji-010': makeKanjiProgress('kanji-010', 'learning', 2, 1),
    },
    grammarProgress: {
      'grammar-wa': makeGrammarProgress('grammar-wa', 'familiar', 5, 0),
      'grammar-wo': makeGrammarProgress('grammar-wo', 'learning', 3, 3),
      'grammar-ni': makeGrammarProgress('grammar-ni', 'learning', 2, 4),
      'grammar-de': makeGrammarProgress('grammar-de', 'familiar', 4, 1),
      'grammar-no': makeGrammarProgress('grammar-no', 'learning', 2, 3),
      'grammar-masu': makeGrammarProgress('grammar-masu', 'familiar', 5, 1),
    },
    studyStreak: 3,
    longestStreak: 5,
    lastStudyDate: today,
    studySessions: [
      {
        id: 'session-001',
        date: '2024-01-15',
        durationMinutes: 45,
        lessonsStudied: ['n5-lesson-001'],
        itemsReviewed: 20,
        exercisesCompleted: 8,
        accuracy: 0.875,
      },
    ],
    weakAreas: ['particle', 'nounModification', 'verbConjugation', 'vocabulary'],
    totalStudyMinutes: 45,
  }
}

function makeVocabProgress(
  id: string,
  familiarity: FamiliarityLevel,
  correct: number,
  incorrect: number
): VocabProgress {
  return {
    vocabId: id,
    familiarity,
    correctCount: correct,
    incorrectCount: incorrect,
    lastReviewedAt: '2024-01-15T10:40:00Z',
    mistakeCategories: incorrect > 0 ? ['vocabulary'] : [],
  }
}

function makeKanjiProgress(
  id: string,
  familiarity: FamiliarityLevel,
  correct: number,
  incorrect: number
): KanjiProgress {
  return {
    kanjiId: id,
    familiarity,
    correctCount: correct,
    incorrectCount: incorrect,
    lastReviewedAt: '2024-01-15T10:40:00Z',
  }
}

function makeGrammarProgress(
  id: string,
  familiarity: FamiliarityLevel,
  correct: number,
  incorrect: number
): GrammarProgress {
  return {
    grammarId: id,
    familiarity,
    correctCount: correct,
    incorrectCount: incorrect,
    lastPractisedAt: '2024-01-15T10:40:00Z',
  }
}

export const progressService = {
  getProgress(): LearnerProgress {
    const stored = storageService.get<LearnerProgress | null>(PROGRESS_KEY, null)
    if (!stored) {
      const initial = createInitialProgress()
      storageService.set(PROGRESS_KEY, initial)
      return initial
    }
    return stored
  },

  saveProgress(progress: LearnerProgress): void {
    storageService.set(PROGRESS_KEY, progress)
  },

  getLessonStatus(lessonId: string): LessonStatus {
    const progress = this.getProgress()
    const lp = progress.lessonProgress[lessonId]
    if (lp) return lp.status

    // Determine if it's available based on prerequisites
    const allLessons = getAllLessons()
    const idx = allLessons.findIndex((l) => l.id === lessonId)
    if (idx === 0) return 'available'
    const prevLesson = allLessons[idx - 1]
    const prevStatus = progress.lessonProgress[prevLesson.id]?.status
    if (prevStatus === 'completed') return 'available'
    return 'locked'
  },

  markLessonStarted(lessonId: string): void {
    const progress = this.getProgress()
    if (!progress.lessonProgress[lessonId]) {
      progress.lessonProgress[lessonId] = {
        lessonId,
        status: 'in-progress',
        startedAt: new Date().toISOString(),
        attempts: 1,
        exerciseScores: {},
      }
    } else {
      progress.lessonProgress[lessonId].status = 'in-progress'
      progress.lessonProgress[lessonId].attempts += 1
    }
    progress.lessonProgress[lessonId].lastAccessedAt = new Date().toISOString()
    this.saveProgress(progress)
  },

  markLessonCompleted(lessonId: string, score: number): void {
    const progress = this.getProgress()
    if (!progress.lessonProgress[lessonId]) {
      progress.lessonProgress[lessonId] = {
        lessonId,
        status: 'completed',
        completedAt: new Date().toISOString(),
        attempts: 1,
        exerciseScores: {},
        homeworkScore: score,
      }
    } else {
      progress.lessonProgress[lessonId].status = 'completed'
      progress.lessonProgress[lessonId].completedAt = new Date().toISOString()
      progress.lessonProgress[lessonId].homeworkScore = score
    }
    this.saveProgress(progress)
  },

  recordExerciseScore(lessonId: string, exerciseId: string, score: number): void {
    const progress = this.getProgress()
    if (!progress.lessonProgress[lessonId]) {
      progress.lessonProgress[lessonId] = {
        lessonId,
        status: 'in-progress',
        attempts: 1,
        exerciseScores: {},
      }
    }
    progress.lessonProgress[lessonId].exerciseScores[exerciseId] = score
    this.saveProgress(progress)
  },

  recordMistake(category: MistakeCategory): void {
    const progress = this.getProgress()
    if (!progress.weakAreas.includes(category)) {
      progress.weakAreas.push(category)
    }
    this.saveProgress(progress)
  },

  updateStreak(): void {
    const progress = this.getProgress()
    const today = new Date().toISOString().split('T')[0]
    if (progress.lastStudyDate === today) return

    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0]
    if (progress.lastStudyDate === yesterday) {
      progress.studyStreak += 1
    } else {
      progress.studyStreak = 1
    }
    if (progress.studyStreak > progress.longestStreak) {
      progress.longestStreak = progress.studyStreak
    }
    progress.lastStudyDate = today
    this.saveProgress(progress)
  },

  getOverallProgress(): number {
    const progress = this.getProgress()
    const completed = Object.values(progress.lessonProgress).filter(
      (lp) => lp.status === 'completed'
    ).length
    return Math.round((completed / TOTAL_LESSONS) * 100)
  },

  getVocabLearnedCount(): number {
    const progress = this.getProgress()
    return Object.values(progress.vocabProgress).filter(
      (vp) => vp.familiarity === 'familiar' || vp.familiarity === 'mastered'
    ).length
  },

  getKanjiLearnedCount(): number {
    const progress = this.getProgress()
    return Object.values(progress.kanjiProgress).filter(
      (kp) => kp.familiarity !== 'new'
    ).length
  },

  getGrammarMasteredCount(): number {
    const progress = this.getProgress()
    return Object.values(progress.grammarProgress).filter(
      (gp) => gp.familiarity === 'familiar' || gp.familiarity === 'mastered'
    ).length
  },

  addStudySession(session: StudySession): void {
    const progress = this.getProgress()
    progress.studySessions.push(session)
    progress.totalStudyMinutes += session.durationMinutes
    this.saveProgress(progress)
  },

  resetProgress(): void {
    storageService.remove(PROGRESS_KEY)
  },
}
