import type { LessonContent } from '@/types'

const lesson002: LessonContent = {
  id: 'n5-lesson-002',
  unitId: 'n5-unit-01',
  lessonNumber: 2,
  title: 'Nouns & Descriptions',
  titleJa: 'めいし と せつめい',
  description: 'Identify and describe things using これ / それ / あれ, the copula です, and basic nouns.',
  estimatedMinutes: 25,

  objectives: [
    'Use これ / それ / あれ to point to objects',
    'Use この / その / あの before nouns',
    'Make and answer simple identity questions (〜は なんですか)',
    'Use です and ではありません correctly',
    'Ask about ownership with だれの',
  ],

  pattern: '[これ/それ/あれ] は [Noun] です',
  patternJa: '[これ] は [めいし] です',

  grammarExplanation: `Japanese has a three-way demonstrative system based on distance:

**これ / この** — near the **speaker** ("this")
**それ / その** — near the **listener** ("that")
**あれ / あの** — far from **both** ("that over there")

**これ・それ・あれ** stand alone as pronouns:
→ これは ほんです。(This is a book.)

**この・その・あの** must be followed by a noun:
→ この ほんは おもしろいです。(This book is interesting.)

**The copula です:**
Affirmative: 〜です (is/am/are)
Negative: 〜ではありません or じゃないです (is not)
Past: 〜でした (was)
Past negative: 〜ではありませんでした (was not)`,

  notes: [
    'これ / それ / あれ are standalone pronouns; この / その / あの always precede a noun.',
    'ではありません is formal; じゃないです is casual — both are correct.',
    'To ask "what is this?": これは なんですか。',
    'To ask whose something is: これは だれの ですか。',
  ],

  examples: [
    {
      hiragana: 'これは なんですか。 — それは ほんです。',
      kanji: 'これは何ですか。 — それは本です。',
      meaning: 'What is this? — That is a book.',
      breakdown: [
        { segment: 'これは', meaning: 'this (topic)', role: 'topic' },
        { segment: 'なんですか', meaning: 'what is it?', role: 'predicate' },
        { segment: 'それは', meaning: 'that (topic)', role: 'topic' },
        { segment: 'ほんです', meaning: 'is a book', role: 'predicate' },
      ],
    },
    {
      hiragana: 'あれは だれの くるまですか。',
      kanji: 'あれは誰の車ですか。',
      meaning: 'Whose car is that over there?',
    },
    {
      hiragana: 'この ほんは わたしのでは ありません。',
      kanji: 'この本は私のではありません。',
      meaning: 'This book is not mine.',
    },
    {
      hiragana: 'それは にほんごの じしょです。',
      kanji: 'それは日本語の辞書です。',
      meaning: 'That is a Japanese dictionary.',
    },
  ],

  vocabulary: [],
  grammarPoints: [],

  exercises: [
    {
      id: 'l002-ex-01',
      type: 'multipleChoice',
      prompt: 'Which demonstrative do you use for something near the LISTENER?',
      options: ['これ', 'それ', 'あれ', 'どれ'],
      correctAnswer: 'それ',
      explanation: 'それ = "that" (near the listener). これ = near the speaker. あれ = far from both.',
      difficulty: 'easy',
    },
    {
      id: 'l002-ex-02',
      type: 'fillBlank',
      prompt: 'Fill in the blank: ___ は ほんです。(This is a book.)',
      sentence: '___ は ほんです。',
      correctAnswer: 'これ',
      alternativeAnswers: ['それ', 'あれ'],
      explanation: 'これ (this) is used for things near the speaker. それ and あれ are also grammatically possible depending on context.',
      difficulty: 'easy',
    },
    {
      id: 'l002-ex-03',
      type: 'particleSelect',
      prompt: 'Choose the correct word: ___ ほんは おもしろいです。 (This book is interesting.)',
      sentence: '___ ほんは おもしろいです。',
      options: ['これ', 'この', 'ここ', 'こっち'],
      correctAnswer: 'この',
      explanation: 'この (not これ) is used directly before a noun. この + noun = "this [noun]."',
      difficulty: 'easy',
    },
    {
      id: 'l002-ex-04',
      type: 'translation',
      prompt: 'Translate: That is a school. (near listener)',
      correctAnswer: 'それは がっこうです。',
      alternativeAnswers: ['それはがっこうです', 'それは学校です'],
      explanation: 'それは がっこうです。— それ (that, near listener) + は (topic) + がっこう (school) + です (is).',
      difficulty: 'easy',
    },
    {
      id: 'l002-ex-05',
      type: 'sentenceOrder',
      prompt: 'Arrange the words: あれ / は / くるま / です',
      words: ['あれ', 'は', 'くるま', 'です'],
      correctAnswer: 'あれ は くるま です',
      explanation: 'あれは くるまです。= That (over there) is a car.',
      difficulty: 'easy',
    },
    {
      id: 'l002-ex-06',
      type: 'multipleChoice',
      prompt: 'How do you say "This is NOT a pen" (polite)?',
      options: ['これは ペンです', 'これは ペンではありません', 'これは ペンではありました', 'これは ペンでした'],
      correctAnswer: 'これは ペンではありません',
      explanation: 'ではありません is the polite negative of です (is not). でした is past tense.',
      difficulty: 'medium',
    },
    {
      id: 'l002-ex-07',
      type: 'fillBlank',
      prompt: 'Fill in the blank: ___ かばんは やまださんのですか。(Whose bag is this?)',
      sentence: '___ かばんは だれの ですか。',
      correctAnswer: 'この',
      explanation: 'この (this) + かばん (bag). Use この when a noun follows.',
      difficulty: 'medium',
    },
    {
      id: 'l002-ex-08',
      type: 'sentenceProduction',
      prompt: 'Write a sentence: "That over there is a convenience store."',
      correctAnswer: 'あれは コンビニです。',
      alternativeAnswers: ['あれは コンビニエンスストアです。', 'あれはコンビニです'],
      explanation: 'あれは コンビニです。= That (over there) is a convenience store.',
      difficulty: 'medium',
    },
  ],
}

export default lesson002
