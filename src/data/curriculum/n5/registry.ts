import type { LessonContent, Exercise, MistakeCategory } from '@/types'
import lesson001 from './lessons/lesson-001'
import lesson002 from './lessons/lesson-002'
import lesson003 from './lessons/lesson-003'
import lesson004 from './lessons/lesson-004'
import lesson005 from './lessons/lesson-005'
import lesson006 from './lessons/lesson-006'
import lesson007 from './lessons/lesson-007'
import lesson008 from './lessons/lesson-008'
import lesson009 from './lessons/lesson-009'
import lesson010 from './lessons/lesson-010'
import lesson011 from './lessons/lesson-011'
import lesson012 from './lessons/lesson-012'
import lesson013 from './lessons/lesson-013'
import lesson014 from './lessons/lesson-014'
import lesson015 from './lessons/lesson-015'

export const LESSON_REGISTRY: Record<string, LessonContent> = {
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

// ─── Supplementary curated high-yield exercises for standalone practice ───────

const SUPPLEMENTARY_PARTICLE_EXERCISES: Exercise[] = [
  {
    id: 'supp-part-01',
    type: 'particleSelect',
    prompt: 'Choose the correct particle for direction/destination.',
    sentence: 'らいしゅう とうきょう___ いきます。',
    blankIndex: 0,
    options: ['へ', 'を', 'で', 'が'],
    correctAnswer: 'へ',
    explanation: 'とうきょう (Tokyo) is the direction/destination of movement (いきます). へ or に marks destination.',
    mistakeCategory: 'particle',
  },
  {
    id: 'supp-part-02',
    type: 'particleSelect',
    prompt: 'Choose the correct particle for means/method of transport.',
    sentence: 'わたしは しんかんせん___ きょうとへ いきました。',
    blankIndex: 0,
    options: ['で', 'に', 'を', 'と'],
    correctAnswer: 'で',
    explanation: 'しんかんせん (bullet train) is the method/tool of transportation. The means/by-way-of particle is で.',
    mistakeCategory: 'particle',
  },
  {
    id: 'supp-part-03',
    type: 'particleSelect',
    prompt: 'Choose the correct particle for doing an action together with someone.',
    sentence: 'きのう ともだち___ えいがを みました。',
    blankIndex: 0,
    options: ['と', 'に', 'で', 'へ'],
    correctAnswer: 'と',
    explanation: 'ともだち (friend) is the person accompanying the action. The accompaniment particle is と (with).',
    mistakeCategory: 'particle',
  },
  {
    id: 'supp-part-04',
    type: 'particleSelect',
    prompt: 'Choose the correct particle for starting time.',
    sentence: 'ぎんこうは くじ___ です。',
    blankIndex: 0,
    options: ['から', 'まで', 'に', 'で'],
    correctAnswer: 'から',
    explanation: 'から means "from / starting at". くじから means "from 9 o\'clock".',
    mistakeCategory: 'particle',
  },
  {
    id: 'supp-part-05',
    type: 'particleSelect',
    prompt: 'Choose the correct particle for inclusive addition ("also / too").',
    sentence: 'たなかさんは がくせいです。わたし___ がくせいです。',
    blankIndex: 0,
    options: ['も', 'は', 'が', 'を'],
    correctAnswer: 'も',
    explanation: 'も replaces は to mean "also" or "too" (I am also a student).',
    mistakeCategory: 'particle',
  },
  {
    id: 'supp-part-06',
    type: 'particleSelect',
    prompt: 'Choose the correct particle for specific point in time.',
    sentence: 'あした しちじ___ おきます。',
    blankIndex: 0,
    options: ['に', 'で', 'を', 'は'],
    correctAnswer: 'に',
    explanation: 'Specific numeric times take the particle に (at 7:00).',
    mistakeCategory: 'particle',
  },
  {
    id: 'supp-part-07',
    type: 'particleSelect',
    prompt: 'Choose the correct particle for existence location.',
    sentence: 'へやの なか___ ねこが います。',
    blankIndex: 0,
    options: ['に', 'で', 'を', 'へ'],
    correctAnswer: 'に',
    explanation: 'Locations where living beings or objects exist (います/あります) take に, whereas actions take で.',
    mistakeCategory: 'particle',
  },
  {
    id: 'supp-part-08',
    type: 'particleSelect',
    prompt: 'Choose the correct particle for possessive/connection.',
    sentence: 'これは わたし___ かばんです。',
    blankIndex: 0,
    options: ['の', 'は', 'が', 'に'],
    correctAnswer: 'の',
    explanation: 'の connects two nouns to show possession (my bag).',
    mistakeCategory: 'particle',
  },
]

const SUPPLEMENTARY_ORDER_EXERCISES: Exercise[] = [
  {
    id: 'supp-order-01',
    type: 'sentenceOrder',
    prompt: 'Arrange the words into a natural Japanese sentence: "I study Japanese at school every day."',
    words: ['わたしは', 'まいにち', 'がっこうで', 'にほんごを', 'べんきょうします'],
    correctAnswer: 'わたしは まいにち がっこうで にほんごを べんきょうします。',
    explanation: 'Topic (わたしは) → Time (まいにち) → Place of action (がっこうで) → Object (にほんごを) → Verb (べんきょうします).',
    mistakeCategory: 'wordOrder',
  },
  {
    id: 'supp-order-02',
    type: 'sentenceOrder',
    prompt: 'Arrange the words into a natural Japanese sentence: "Tomorrow I will go to Tokyo by train."',
    words: ['あした', 'でんしゃで', 'とうきょうへ', 'いきます'],
    correctAnswer: 'あした でんしゃで とうきょうへ いきます。',
    explanation: 'Time (あした) → Means (でんしゃで) → Destination (とうきょうへ) → Verb (いきます).',
    mistakeCategory: 'wordOrder',
  },
  {
    id: 'supp-order-03',
    type: 'sentenceOrder',
    prompt: 'Arrange the words into a natural Japanese sentence: "Whose umbrella is this?"',
    words: ['これは', 'だれの', 'かさ', 'ですか'],
    correctAnswer: 'これは だれの かさ ですか。',
    explanation: 'Topic (これは) → Possessive question (だれの) → Noun (かさ) → Question copula (ですか).',
    mistakeCategory: 'wordOrder',
  },
  {
    id: 'supp-order-04',
    type: 'sentenceOrder',
    prompt: 'Arrange the words into a natural Japanese sentence: "I drink coffee with a friend every morning."',
    words: ['まいあさ', 'ともだちと', 'コーヒーを', 'のみます'],
    correctAnswer: 'まいあさ ともだちと コーヒーを のみます。',
    explanation: 'Time (まいあさ) → Partner (ともだちと) → Object (コーヒーを) → Verb (のみます).',
    mistakeCategory: 'wordOrder',
  },
  {
    id: 'supp-order-05',
    type: 'sentenceOrder',
    prompt: 'Arrange the words into a natural Japanese sentence: "There is a bookstore next to the station."',
    words: ['えきの', 'となりに', 'ほんやが', 'あります'],
    correctAnswer: 'えきの となりに ほんやが あります。',
    explanation: 'Location (えきの となりに) → Subject (ほんやが) → Inanimate existence verb (あります).',
    mistakeCategory: 'wordOrder',
  },
]

// ─── Query helpers ────────────────────────────────────────────────────────────

export function getAllCurriculumExercises(): Exercise[] {
  const exercises: Exercise[] = []
  Object.values(LESSON_REGISTRY).forEach((lesson) => {
    if (lesson.exercises) {
      exercises.push(...lesson.exercises)
    }
  })
  return exercises
}

export function getParticleDrillExercises(): Exercise[] {
  const fromLessons = getAllCurriculumExercises().filter(
    (e) => e.type === 'particleSelect' || e.mistakeCategory === 'particle'
  )
  return [...fromLessons, ...SUPPLEMENTARY_PARTICLE_EXERCISES]
}

export function getSentenceOrderDrillExercises(): Exercise[] {
  const fromLessons = getAllCurriculumExercises().filter(
    (e) => e.type === 'sentenceOrder' || e.mistakeCategory === 'wordOrder'
  )
  return [...fromLessons, ...SUPPLEMENTARY_ORDER_EXERCISES]
}

export function getExercisesByMistakeCategory(category: MistakeCategory): Exercise[] {
  const all = [...getAllCurriculumExercises(), ...SUPPLEMENTARY_PARTICLE_EXERCISES, ...SUPPLEMENTARY_ORDER_EXERCISES]
  return all.filter((e) => e.mistakeCategory === category)
}

export function getRandomSprintExercises(count = 10): Exercise[] {
  const all = [...getAllCurriculumExercises(), ...SUPPLEMENTARY_PARTICLE_EXERCISES, ...SUPPLEMENTARY_ORDER_EXERCISES]
  const shuffled = [...all].sort(() => 0.5 - Math.random())
  return shuffled.slice(0, count)
}
