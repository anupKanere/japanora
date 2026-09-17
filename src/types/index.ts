// ─── Core curriculum hierarchy ──────────────────────────────────────────────

export type JLPTLevel = 'N5' | 'N4' | 'N3' | 'N2' | 'N1'

export type LessonStatus = 'locked' | 'available' | 'in-progress' | 'completed'

export interface CurriculumUnit {
  id: string
  level: JLPTLevel
  unitNumber: number
  title: string
  titleJa: string
  description: string
  lessons: CurriculumLesson[]
  prerequisiteUnitIds: string[]
}

export interface CurriculumLesson {
  id: string
  unitId: string
  lessonNumber: number
  title: string
  titleJa: string
  description: string
  estimatedMinutes: number
  grammarPoints: string[]   // grammar point IDs
  vocabularyIds: string[]   // vocab entry IDs
  kanjiIds: string[]        // kanji entry IDs
  status?: LessonStatus
}

// ─── Lesson content (data-driven) ────────────────────────────────────────────

export type ExerciseType =
  | 'translation'
  | 'reading'
  | 'multipleChoice'
  | 'fillBlank'
  | 'particleSelect'
  | 'sentenceOrder'
  | 'sentenceProduction'

export interface ExampleSentence {
  hiragana: string
  kanji?: string
  romaji?: string
  meaning: string
  breakdown?: SentenceBreakdownItem[]
  audio?: string
}

export interface SentenceBreakdownItem {
  segment: string
  reading?: string
  meaning: string
  role?: string   // e.g. "topic", "object", "verb"
}

export interface Exercise {
  id: string
  type: ExerciseType
  prompt: string
  promptJa?: string
  hint?: string
  // Multiple choice
  options?: string[]
  // Fill blank / particle select
  sentence?: string
  blankIndex?: number
  // Sentence ordering
  words?: string[]
  // All types
  correctAnswer: string | string[]
  alternativeAnswers?: string[]
  explanation: string
  mistakeCategory?: MistakeCategory
  difficulty?: 'easy' | 'medium' | 'hard'
}

export interface HomeworkSubmission {
  exerciseId: string
  prompt: string
  userAnswer: string
  correctedAnswer: string
  isCorrect: boolean
  score: number          // 0–10
  mistakeCategories: MistakeCategory[]
  explanation: string
  teacherNotes?: string
  submittedAt: string    // ISO date string
}

export interface LessonContent {
  id: string
  unitId: string
  lessonNumber: number
  title: string
  titleJa: string
  description: string
  estimatedMinutes: number
  objectives: string[]
  pattern?: string          // e.g. "[Time] + [Place] + [Object] + [Verb]"
  patternJa?: string
  grammarExplanation: string
  notes?: string[]
  examples: ExampleSentence[]
  vocabulary: VocabularyEntry[]
  grammarPoints: GrammarPoint[]
  exercises: Exercise[]
  homework?: HomeworkSubmission[]
  reviewItems?: string[]    // concept strings for end-of-lesson review
}

// ─── Vocabulary ───────────────────────────────────────────────────────────────

export type PartOfSpeech =
  | 'noun'
  | 'verb'
  | 'verb-group1'
  | 'verb-group2'
  | 'verb-irregular'
  | 'verb-suffix'
  | 'i-adjective'
  | 'na-adjective'
  | 'adverb'
  | 'particle'
  | 'expression'
  | 'conjunction'
  | 'counter'
  | 'suffix'
  | 'pronoun'
  | 'number'
  | 'interjection'

export interface VocabularyEntry {
  id: string
  hiragana: string
  katakana?: string
  kanji?: string
  romaji?: string
  meaning: string
  partOfSpeech: PartOfSpeech
  level: JLPTLevel
  lessonId?: string
  unitId?: string
  examples?: ExampleSentence[]
  tags?: string[]
  notes?: string
}

// ─── Grammar ──────────────────────────────────────────────────────────────────

export interface GrammarPoint {
  id: string
  level: JLPTLevel
  pattern: string           // e.g. "〜ます"
  patternReading?: string   // hiragana version if needed
  meaning: string
  structure?: string        // e.g. "Verb stem + ます"
  notes?: string[]
  examples: ExampleSentence[]
  lessonId?: string
  unitId?: string
  relatedPatterns?: string[]
  tags?: string[]
}

// ─── Kanji ────────────────────────────────────────────────────────────────────

export interface KanjiReading {
  onyomi: string[]    // Chinese-derived readings
  kunyomi: string[]   // Japanese-native readings
}

export interface KanjiEntry {
  id: string
  character: string
  meaning: string[]
  readings: KanjiReading
  strokeCount: number
  level: JLPTLevel
  exampleWords: VocabularyEntry[]
  exampleSentence?: ExampleSentence
  lessonId?: string
  unitId?: string
  tags?: string[]
}

// ─── Progress / learner state ─────────────────────────────────────────────────

export type FamiliarityLevel = 'new' | 'learning' | 'familiar' | 'mastered'

export type MistakeCategory =
  | 'particle'
  | 'verbConjugation'
  | 'vocabulary'
  | 'wordOrder'
  | 'spelling'
  | 'kanji'
  | 'meaning'
  | 'nounModification'
  | 'counter'
  | 'politeness'
  | 'other'

export interface LessonProgress {
  lessonId: string
  status: LessonStatus
  startedAt?: string
  completedAt?: string
  exerciseScores: Record<string, number>   // exerciseId → score (0–1)
  homeworkScore?: number
  attempts: number
  lastAccessedAt?: string
}

export interface VocabProgress {
  vocabId: string
  familiarity: FamiliarityLevel
  correctCount: number
  incorrectCount: number
  lastReviewedAt?: string
  nextReviewAt?: string
  mistakeCategories: MistakeCategory[]
}

export interface KanjiProgress {
  kanjiId: string
  familiarity: FamiliarityLevel
  correctCount: number
  incorrectCount: number
  lastReviewedAt?: string
  nextReviewAt?: string
}

export interface GrammarProgress {
  grammarId: string
  familiarity: FamiliarityLevel
  correctCount: number
  incorrectCount: number
  lastPractisedAt?: string
}

export interface StudySession {
  id: string
  date: string              // YYYY-MM-DD
  durationMinutes: number
  lessonsStudied: string[]
  itemsReviewed: number
  exercisesCompleted: number
  accuracy: number          // 0–1
}

export interface LearnerProgress {
  learnerId: string
  currentLevel: JLPTLevel
  currentLessonId: string
  lessonProgress: Record<string, LessonProgress>
  vocabProgress: Record<string, VocabProgress>
  kanjiProgress: Record<string, KanjiProgress>
  grammarProgress: Record<string, GrammarProgress>
  studyStreak: number
  longestStreak: number
  lastStudyDate?: string
  studySessions: StudySession[]
  weakAreas: MistakeCategory[]
  totalStudyMinutes: number
}

// ─── Revision ────────────────────────────────────────────────────────────────

export type RevisionItemType = 'vocab' | 'grammar' | 'kanji' | 'exercise' | 'mistake'

export interface RevisionItem {
  id: string
  type: RevisionItemType
  referenceId: string    // vocabId, grammarId, kanjiId, exerciseId
  dueDate: string        // ISO date string
  interval: number       // days until next review
  easeFactor: number     // SRS ease factor (future use)
  repetitions: number
  lastReviewedAt?: string
  mistakeCategory?: MistakeCategory
}

// ─── Settings ────────────────────────────────────────────────────────────────

export interface AppSettings {
  displayMode: 'hiragana-only' | 'hiragana-kanji'
  showFurigana: boolean
  showRomaji: boolean
  theme: 'light' | 'dark' | 'system'
  dailyGoalMinutes: number
  soundEnabled: boolean
  speechRate: number              // e.g. 0.75, 0.85, 1.0
  autoPlayAudio: boolean
  revisionReminderEnabled: boolean
  revisionReminderTime: string    // HH:mm
}

// ─── Evaluation ──────────────────────────────────────────────────────────────

export interface EvaluationResult {
  isCorrect: boolean
  score: number               // 0–1
  feedback: string
  mistakeCategories: MistakeCategory[]
  correctedAnswer?: string
  explanation?: string
  isPartiallyCorrect?: boolean
}

// ─── UI helpers ──────────────────────────────────────────────────────────────

export interface NavItem {
  id: string
  label: string
  path: string
  icon: string
  badge?: number
}
