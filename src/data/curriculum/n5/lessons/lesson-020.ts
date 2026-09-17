import type { LessonContent } from '@/types'

const lesson020: LessonContent = {
  id: 'n5-lesson-020',
  unitId: 'n5-unit-05',
  lessonNumber: 3,
  title: 'Comparisons & Superlatives: ほうが / より / いちばん',
  titleJa: 'ひかく (〜のほうが・〜より・いちばん)',
  description: 'Master comparing two items ("A is more... than B") and identifying the #1 superlative ("the most").',
  estimatedMinutes: 35,

  objectives: [
    'Compare two items using [Noun A] のほうが [Noun B] より [Adjective] です',
    'Ask which of two items is more preferred using AとBと どちらが〜ですか',
    'Express superlatives ("the most...") using いちばん + [Adjective]',
    'Answer comparison questions accurately in Japanese',
  ],

  pattern: 'A のほうが B より [Adjective] です / [Category] のなかで [Item] が いちばん [Adjective] です',
  patternJa: 'Aのほうが Bより [けいようし] です',

  grammarExplanation: `In Japanese, comparisons do not change the adjective form (like "big" → "bigger" in English). Instead, helper particles **ほう** (direction/side) and **より** (than) are used.

**1. Comparing Two Items (A is more ... than B)**
The item that has more of the quality is marked with **のほうが** (the side of A). The benchmark is marked with **より** (than B).
- りんご のほうが みかん より おおきいです。 → Apples are bigger than oranges.
- にほんご のほうが えいご より むずかしいです。 → Japanese is more difficult than English.
- でんしゃ のほうが バス より はやいです。 → Trains are faster than buses.

**2. Asking "Which one is more...?" (A or B)**
Use the question word **どちら** (which of two) with **と**:
- A と B と どちらが すきですか。 → Which do you like better, A or B?
- どちらも すきです。 → I like both.

**3. Superlatives: The Most / Number 1 (いちばん)**
Use **いちばん** directly before the adjective:
- にほんりょうりの なかで すしが いちばん おいしいです。 → Among Japanese dishes, sushi is the most delicious.
- いちねんの なかで なつが いちばん すきです。 → In a whole year, I like summer the best.`,

  notes: [
    'ほう literally means "direction" or "side" — you are saying "the side of A is bigger than B".',
    'どちら (dochira) is used when choosing between TWO items. どれ (dore) is used when choosing among THREE or more.',
    'どちらも means "both", while どちらも〜ない means "neither".',
  ],

  examples: [
    {
      hiragana: 'いぬの ほうが ねこより おおきいです。',
      kanji: '犬のほうが猫より大きいです。',
      meaning: 'Dogs are bigger than cats.',
      breakdown: [
        { segment: 'いぬの ほうが', meaning: 'the dog side', role: 'topic' },
        { segment: 'ねこより', meaning: 'than cats', role: 'destination' },
        { segment: 'おおきいです', meaning: 'is big', role: 'verb' },
      ],
    },
    {
      hiragana: 'コーヒーと おちゃと どちらが すきですか。',
      kanji: 'コーヒーとお茶とどちらが好きですか。',
      meaning: 'Which do you like better, coffee or tea?',
      breakdown: [
        { segment: 'コーヒーと', meaning: 'coffee and', role: 'object' },
        { segment: 'おちゃと', meaning: 'tea and', role: 'object' },
        { segment: 'どちらが', meaning: 'which', role: 'topic' },
        { segment: 'すきですか', meaning: 'do you like?', role: 'verb' },
      ],
    },
    {
      hiragana: 'スポーツの なかで サッカーが いちばん おもしろいです。',
      kanji: 'スポーツの中でサッカーが一番面白いです。',
      meaning: 'Among sports, soccer is the most interesting.',
      breakdown: [
        { segment: 'スポーツの なかで', meaning: 'among sports', role: 'place' },
        { segment: 'サッカーが', meaning: 'soccer', role: 'topic' },
        { segment: 'いちばん', meaning: 'the most', role: 'time' },
        { segment: 'おもしろいです', meaning: 'is interesting', role: 'verb' },
      ],
    },
  ],

  vocabulary: [],
  grammarPoints: [],

  exercises: [
    {
      id: 'ex-020-1',
      type: 'multipleChoice',
      prompt: 'Complete: "Tokyo is bigger than Kyoto": とうきょうの ________ きょうと ________ おおきいです。',
      options: [
        'ほうが / より',
        'より / ほうが',
        'は / が',
        'と / も',
      ],
      correctAnswer: 'ほうが / より',
      explanation: '[More Item] の ほうが [Benchmark] より [Adjective] です.',
      difficulty: 'easy',
    },
    {
      id: 'ex-020-2',
      type: 'multipleChoice',
      prompt: 'How do you ask "Which do you prefer, meat or fish?"',
      options: [
        'にくと さかなと どちらが すきですか。',
        'にくと さかなと どれが すきですか。',
        'にくと さかなと だれが すきですか。',
        'にくと さかなと なにが すきですか。',
      ],
      correctAnswer: 'にくと さかなと どちらが すきですか。',
      explanation: 'Use どちら when comparing exactly two alternatives.',
      difficulty: 'medium',
    },
    {
      id: 'ex-020-3',
      type: 'multipleChoice',
      prompt: 'What does "いちばん すきです" mean?',
      options: [
        'I like it the most / It is my favorite.',
        'I dislike it the most.',
        'I like both of them.',
        'I only like one.',
      ],
      correctAnswer: 'I like it the most / It is my favorite.',
      explanation: 'いちばん placed before an adjective means "the most / superlative".',
      difficulty: 'easy',
    },
  ],
}

export default lesson020
