import type { LessonContent } from '@/types'

const lesson014: LessonContent = {
  id: 'n5-lesson-014',
  unitId: 'n5-unit-06',
  lessonNumber: 1,
  title: 'Numbers 1–10,000',
  titleJa: 'すうじ (いちから まんまで)',
  description: 'Master Japanese numbers from 1 to 10,000, including the counting system, native Japanese counting, and common number expressions.',
  estimatedMinutes: 30,
  objectives: [
    'Count from 1 to 99 in Japanese (Sino-Japanese system)',
    'Count from 100 to 10,000',
    'Use native Japanese counting (ひとつ〜とお)',
    'Use numbers with appropriate counters (〜円、〜本、〜枚)',
    'Read and write years, phone numbers, and prices',
  ],
  pattern: '[Number] + Counter',
  patternJa: 'かず と じょすうし',
  grammarExplanation: `**Sino-Japanese numbers (used with most counters):**

1〜10: いち・に・さん・し(よん)・ご・ろく・なな(しち)・はち・く(きゅう)・じゅう

11〜19: じゅういち、じゅうに … じゅうく
20〜90: にじゅう、さんじゅう … きゅうじゅう
21: にじゅういち、39: さんじゅうく, etc.

100: ひゃく / 200: にひゃく / 300: さんびゃく / 600: ろっぴゃく / 800: はっぴゃく
1000: せん / 2000: にせん / 3000: さんぜん / 8000: はっせん
10,000: いちまん

**Native Japanese numbers (ひとつ counting):**
ひとつ(1)・ふたつ(2)・みっつ(3)・よっつ(4)・いつつ(5)・
むっつ(6)・ななつ(7)・やっつ(8)・ここのつ(9)・とお(10)

Use native numbers for: generic counting, age with さい sometimes, items without specific counter.

**Common counters:**
- 円 (えん) = yen: ひゃくえん = ¥100
- 本 (ほん/ぼん/ぽん) = long objects: いっぽん、にほん、さんぼん
- 枚 (まい) = flat objects: いちまい、にまい
- 冊 (さつ) = books: いっさつ、にさつ
- 台 (だい) = machines: いちだい、にだい`,
  notes: [
    'し and しち are less common than よん and なな in modern speech.',
    '300 (さんびゃく), 600 (ろっぴゃく), 800 (はっぴゃく) have sound changes.',
    '3000 (さんぜん), 8000 (はっせん) also have sound changes.',
    'Japanese phone numbers use の between parts: 090-1234-5678 = ゼロきゅうゼロ の いちにさんし の ごろくななはち.',
  ],
  examples: [
    { hiragana: 'このほんは さんびゃくえんです。', kanji: 'この本は三百円です。', meaning: 'This book is ¥300.' },
    { hiragana: 'えんぴつが にほん あります。', kanji: '鉛筆が二本あります。', meaning: 'There are two pencils.' },
    { hiragana: 'りんごを みっつ ください。', kanji: 'りんごを三つください。', meaning: 'Please give me three apples.' },
    { hiragana: 'ちかてつの きっぷは ひゃくよんじゅうえんです。', kanji: '地下鉄の切符は百四十円です。', meaning: 'The subway ticket is ¥140.' },
    { hiragana: 'ことしは にせんにじゅうごねんです。', kanji: '今年は二千二十五年です。', meaning: 'This year is 2025.' },
  ],
  vocabulary: [],
  grammarPoints: [],
  exercises: [
    { id: 'l014-ex-01', type: 'multipleChoice', prompt: 'How do you say "¥350"?', options: ['さんびゃくごじゅうえん', 'さんひゃくごじゅうえん', 'さんぴゃくごじゅうえん', 'みひゃくごじゅうえん'], correctAnswer: 'さんびゃくごじゅうえん', explanation: '300 = さんびゃく (sound change: ひゃく→びゃく after さん). + ごじゅう (50) + えん = ¥350.', difficulty: 'medium' },
    { id: 'l014-ex-02', type: 'fillBlank', prompt: 'Native counting: four items → ___つ', sentence: '___つ', correctAnswer: 'よっ', explanation: 'よっつ = 4 in native Japanese counting. (ひとつ, ふたつ, みっつ, よっつ, いつつ…)', difficulty: 'easy' },
    { id: 'l014-ex-03', type: 'multipleChoice', prompt: 'How many pencils? にほん', options: ['1 pencil', '2 pencils', '20 pencils', '2 things'], correctAnswer: '2 pencils', explanation: 'にほん = 2 + 本 (counter for long cylindrical objects like pencils, bottles). に = 2.', difficulty: 'easy' },
    { id: 'l014-ex-04', type: 'translation', prompt: 'Translate: "Three books, please." (ほん = book, さつ = counter for books)', correctAnswer: 'ほんを さんさつ ください。', alternativeAnswers: ['本を三冊ください', 'ほんをさんさつください'], explanation: 'ほんを (books, object) + さんさつ (3 books using 冊 counter) + ください (please).', difficulty: 'medium' },
    { id: 'l014-ex-05', type: 'multipleChoice', prompt: 'Which number has a sound change?', options: ['にひゃく (200)', 'さんびゃく (300)', 'ごひゃく (500)', 'しちひゃく (700)'], correctAnswer: 'さんびゃく (300)', explanation: 'さんびゃく (not さんひゃく) — ひゃく changes to びゃく after さん. Similarly: ろっぴゃく (600), はっぴゃく (800).', difficulty: 'hard' },
    { id: 'l014-ex-06', type: 'sentenceProduction', prompt: 'Say in Japanese: "This bag costs ¥2,500."', correctAnswer: 'このかばんは にせんごひゃくえんです。', alternativeAnswers: ['このかばんは2500円です', 'このかばんはにせんごひゃくえんです'], explanation: '2500 = にせん (2000) + ごひゃく (500). + えんです = costs ¥2,500.', difficulty: 'medium' },
  ],
}

export default lesson014
