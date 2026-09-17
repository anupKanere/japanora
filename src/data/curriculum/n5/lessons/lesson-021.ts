import type { LessonContent } from '@/types'

const lesson021: LessonContent = {
  id: 'n5-lesson-021',
  unitId: 'n5-unit-06',
  lessonNumber: 1,
  title: 'Japanese Counters & Shopping: ひとつ, 〜枚, 〜本, 〜杯',
  titleJa: 'じょすうし・かいもの (Counters & Shopping)',
  description: 'Master the Japanese counting system, essential counters for daily life, and how to order or buy items in stores and restaurants.',
  estimatedMinutes: 35,

  objectives: [
    'Count generic objects from 1 to 10 using the native Japanese count (ひとつ, ふたつ...)',
    'Use specific counters: 〜枚 (flat items), 〜本 (cylindrical items), 〜杯 (drinks/cups), 〜人 (people)',
    'Ask for quantities using いくつ (how many) and 何枚 / 何本 / 何人',
    'Order food and items in Japanese using [Item] を [Quantity] ください',
  ],

  pattern: '[Noun] を [Counter / Number] ください / これを [Quantity] おねがいします',
  patternJa: '[めいし] を [かず] ください',

  grammarExplanation: `In Japanese, you cannot simply say "two papers" or "three beers". You must attach a specific **counter word (助数詞 · Josuushi)** suited to the shape or nature of the object.

**1. The Native Universal Counting System (1 to 10)**
Use these for general items, ordering food, or when you don't know the specific counter:
- 1つ: ひとつ (hitotsu)
- 2つ: ふたつ (futatsu)
- 3つ: みっつ (mittsu)
- 4つ: よっつ (yottsu)
- 5つ: いつつ (itsutsu)
- 6つ: むっつ (muttsu)
- 7つ: ななつ (nanatsu)
- 8つ: やっつ (yattsu)
- 9つ: ここのつ (kokonotsu)
- 10: とお (too)
- Question word: **いくつ (ikutsu)** = How many?

**2. The Most Essential N5 Counters**
- **〜枚 (まい · mai)**: Thin, flat objects (tickets, paper, shirts, plates, pizza slices).
- **〜本 (ほん / ぼん / ぽん · hon)**: Long, cylindrical objects (pens, bottles, trees, umbrellas, bananas).
  - 1本 (いっぽん), 2本 (にほん), 3本 (さんぼん!), 6本 (ろっぽん), 8本 (はっぽん), 10本 (じゅっぽん).
- **〜杯 (はい / ばい / ぱい · hai)**: Cups, glasses, and bowls of liquid.
  - 1杯 (いっぱい), 2杯 (にはい), 3杯 (さんばい!).
- **〜人 (にん · nin)**: Counting people.
  - Special exceptions: 1人 = **ひとり (hitori)**, 2人 = **ふたり (futari)**. From 3 onwards: 3人 (さんにん), 4人 (よにん!), 5人 (ごにん).
- **〜冊 (さつ · satsu)**: Bound paper (books, magazines, notebooks).

**3. Ordering & Buying: [Item] を [Quantity] ください**
Notice that in Japanese, the counter usually follows the particle を:
- りんご を **ふたつ** ください。 → Please give me two apples.
- コーヒー を **いっぱい** ください。 → One cup of coffee, please.
- シャツ を **にまい** かいました。 → I bought two shirts.`,

  notes: [
    'Notice the sound changes (rendaku) on 〜本: 1本 is いっぽん, 3本 is さんぼん, 何本 is なんぼん.',
    '4 people is よにん (NOT しにん or よんにん).',
    'At a restaurant, you can simply point and say: これを ひとつ おねがいします (One of this, please).',
  ],

  examples: [
    {
      hiragana: 'みずを いっぱい ください。',
      kanji: '水を一杯ください。',
      meaning: 'Please give me one glass of water.',
      breakdown: [
        { segment: 'みずを', meaning: 'water (object)', role: 'object' },
        { segment: 'いっぱい', meaning: 'one cup/glass', role: 'time' },
        { segment: 'ください', meaning: 'please give me', role: 'verb' },
      ],
    },
    {
      hiragana: 'ペンを にほん かいました。',
      kanji: 'ペンを二本買いました。',
      meaning: 'I bought two pens.',
      breakdown: [
        { segment: 'ペンを', meaning: 'pens (object)', role: 'object' },
        { segment: 'にほん', meaning: 'two (cylindrical)', role: 'time' },
        { segment: 'かいました', meaning: 'bought', role: 'verb' },
      ],
    },
    {
      hiragana: 'へやに がくせいが よにん います。',
      kanji: '部屋に学生が四人います。',
      meaning: 'There are four students in the room.',
      breakdown: [
        { segment: 'へやに', meaning: 'in the room', role: 'place' },
        { segment: 'がくせいが', meaning: 'students (subject)', role: 'topic' },
        { segment: 'よにん', meaning: 'four people', role: 'time' },
        { segment: 'います', meaning: 'there are (animate)', role: 'verb' },
      ],
    },
  ],

  vocabulary: [],
  grammarPoints: [],

  exercises: [
    {
      id: 'ex-021-1',
      type: 'multipleChoice',
      prompt: 'Which counter is used for flat items like paper, tickets, and t-shirts?',
      options: ['〜枚 (まい)', '〜本 (ほん)', '〜杯 (はい)', '〜冊 (さつ)'],
      correctAnswer: '〜枚 (まい)',
      explanation: '〜枚 (mai) is the counter for flat objects.',
      difficulty: 'easy',
    },
    {
      id: 'ex-021-2',
      type: 'multipleChoice',
      prompt: 'How do you say "two people" in Japanese?',
      options: ['ふたり (futari)', 'ににん (ninin)', 'ふたつ (futatsu)', 'にほん (nihon)'],
      correctAnswer: 'ふたり (futari)',
      explanation: '1 person is ひとり and 2 people is ふたり (irregular readings).',
      difficulty: 'easy',
    },
    {
      id: 'ex-021-3',
      type: 'multipleChoice',
      prompt: 'How do you say "Please give me three beers"?',
      options: [
        'ビールを さんぼん ください。',
        'ビールを さんまい ください。',
        'ビールを さんさつ ください。',
        'ビールを さんにん ください。',
      ],
      correctAnswer: 'ビールを さんぼん ください。',
      explanation: 'Bottles and cans of beer use the long/cylindrical counter 〜本 (さんぼん).',
      difficulty: 'medium',
    },
  ],
}

export default lesson021
