import type { LessonContent } from '@/types'

const lesson003: LessonContent = {
  id: 'n5-lesson-003',
  unitId: 'n5-unit-01',
  lessonNumber: 3,
  title: 'Questions & Answers',
  titleJa: 'しつもん と へんとう',
  description: 'Ask and answer basic questions using the question marker か and question words なに、どこ、だれ、いつ、どれ.',
  estimatedMinutes: 30,

  objectives: [
    'Form yes/no questions by adding か to a statement',
    'Use question words: なに、どこ、だれ、いつ、どれ、いくつ、いくら',
    'Answer questions with full sentences',
    'Understand the difference between か as question marker vs particle',
    'Use では / じゃ in negative answers',
  ],

  pattern: '[Question Word] + は + [Noun] + ですか',
  patternJa: '[しつもん] は [めいし] ですか',

  grammarExplanation: `**Making yes/no questions:**
Add か to the end of any statement to form a question.
→ がくせいです → がくせいですか。(Are you a student?)

**Answering yes/no:**
→ はい、がくせいです。(Yes, I am a student.)
→ いいえ、がくせいでは ありません。(No, I am not a student.)

**Question words (疑問詞):**
- なに / なん = what
- どこ = where
- だれ = who
- いつ = when
- どれ = which one (of 3+)
- どちら / どっち = which one (of 2)
- いくつ = how many / how old
- いくら = how much (price)

**Word order with question words:**
Japanese question words stay in the position of the answer:
→ これは なんですか。(What is this?)
→ やまださんは どこに いますか。(Where is Yamada-san?)`,

  notes: [
    'In Japanese, the question word does NOT move to the front like in English.',
    'Do not raise intonation when writing — か is the question marker.',
    'いいえ answers use ではありません (formal) or じゃないです (casual).',
    'だれ = who (plain) / どなた = who (polite).',
  ],

  examples: [
    {
      hiragana: 'やまださんは にほんじんですか。はい、にほんじんです。',
      kanji: '山田さんは日本人ですか。はい、日本人です。',
      meaning: 'Is Yamada-san Japanese? Yes, she is Japanese.',
    },
    {
      hiragana: 'これは なんですか。にほんごの じしょです。',
      kanji: 'これは何ですか。日本語の辞書です。',
      meaning: 'What is this? It is a Japanese dictionary.',
    },
    {
      hiragana: 'やまださんは どこに いますか。としょかんに います。',
      kanji: '山田さんはどこにいますか。図書館にいます。',
      meaning: 'Where is Yamada-san? She is in the library.',
    },
    {
      hiragana: 'これは だれの ほんですか。わたしの ほんです。',
      kanji: 'これは誰の本ですか。私の本です。',
      meaning: 'Whose book is this? It is my book.',
    },
    {
      hiragana: 'このほんは いくらですか。にひゃくえんです。',
      kanji: 'この本はいくらですか。二百円です。',
      meaning: 'How much is this book? It is 200 yen.',
    },
  ],

  vocabulary: [],
  grammarPoints: [],

  exercises: [
    {
      id: 'l003-ex-01',
      type: 'multipleChoice',
      prompt: 'How do you ask "What is this?" in Japanese?',
      options: ['これは なんですか。', 'これが なんですか。', 'なんが これですか。', 'これを なんですか。'],
      correctAnswer: 'これは なんですか。',
      explanation: 'これは (this, topic) + なんですか (what is it?). The question word なん stays in the predicate position.',
      difficulty: 'easy',
    },
    {
      id: 'l003-ex-02',
      type: 'translation',
      prompt: 'Translate: "Where is the station?"',
      correctAnswer: 'えきは どこですか。',
      alternativeAnswers: ['えきはどこですか', 'えきは どこ ですか', '駅はどこですか'],
      explanation: 'えきは (station, topic) + どこですか (where is it?).',
      difficulty: 'easy',
    },
    {
      id: 'l003-ex-03',
      type: 'fillBlank',
      prompt: 'Fill in the question word: ___ の ほんですか。(Whose book is it?)',
      sentence: '___ の ほんですか。',
      options: ['だれ', 'どこ', 'なに', 'いつ'],
      correctAnswer: 'だれ',
      explanation: 'だれ = who. だれの ほん = whose book.',
      difficulty: 'easy',
    },
    {
      id: 'l003-ex-04',
      type: 'multipleChoice',
      prompt: 'How do you say "No, I am not a student." (polite)?',
      options: [
        'いいえ、がくせいです。',
        'いいえ、がくせいでは ありません。',
        'はい、がくせいでは ありません。',
        'いいえ、がくせいでした。',
      ],
      correctAnswer: 'いいえ、がくせいでは ありません。',
      explanation: 'Negative answers: いいえ (no) + ではありません (is not).',
      difficulty: 'easy',
    },
    {
      id: 'l003-ex-05',
      type: 'sentenceOrder',
      prompt: 'Arrange: すしは / いくら / ですか',
      words: ['すしは', 'いくら', 'ですか'],
      correctAnswer: 'すしは いくら ですか',
      explanation: 'すしは いくらですか。= How much is sushi?',
      difficulty: 'easy',
    },
    {
      id: 'l003-ex-06',
      type: 'translation',
      prompt: 'Translate: "When is the test?"',
      correctAnswer: 'テストは いつですか。',
      alternativeAnswers: ['テストはいつですか', 'しけんは いつですか'],
      explanation: 'テストは (test, topic) + いつですか (when is it?).',
      difficulty: 'easy',
    },
    {
      id: 'l003-ex-07',
      type: 'multipleChoice',
      prompt: 'Which question word asks about price?',
      options: ['いくつ', 'いくら', 'どれ', 'どのぐらい'],
      correctAnswer: 'いくら',
      explanation: 'いくら = how much (money/price). いくつ = how many / how old.',
      difficulty: 'medium',
    },
    {
      id: 'l003-ex-08',
      type: 'sentenceProduction',
      prompt: 'Ask: "What time is the class?" (じゅぎょう = class)',
      correctAnswer: 'じゅぎょうは なんじですか。',
      alternativeAnswers: ['じゅぎょうは何時ですか', 'じゅぎょうはなんじですか'],
      explanation: 'じゅぎょうは (class, topic) + なんじですか (what time is it?).',
      difficulty: 'medium',
    },
  ],
}

export default lesson003
