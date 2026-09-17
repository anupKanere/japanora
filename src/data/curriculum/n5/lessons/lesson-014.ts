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
  grammarExplanation: `Japanese numbers are logical and systematic. Numbers 1–10 form the building blocks for all higher numbers.

**Numbers 1 to 10 (Sino-Japanese):**

| Number | Kanji | Hiragana | Romaji |
| :--- | :--- | :--- | :--- |
| 1 | 一 | いち | ichi |
| 2 | 二 | に | ni |
| 3 | 三 | さん | san |
| 4 | 四 | よん / し | yon / shi |
| 5 | 五 | ご | go |
| 6 | 六 | ろく | roku |
| 7 | 七 | なな / しち | nana / shichi |
| 8 | 八 | はち | hachi |
| 9 | 九 | きゅう / く | kyuu / ku |
| 10 | 十 | じゅう | juu |

**Numbers 11 to 99 (The Additive Formula):**
- 11 to 19: じゅう + [1–9] (e.g. じゅういち = 11, じゅうご = 15, じゅうく = 19)
- Tens (20, 30... 90): [2–9] + じゅう (e.g. にじゅう = 20, さんじゅう = 30, はちじゅう = 80)
- Combined: [Tens] + [Ones] (e.g. にじゅうご = 25, さんじゅうく = 39, きゅうじゅうきゅう = 99)

**Larger Numbers (Hundreds, Thousands, Ten-Thousands):**

| Value | Kanji | Reading | Sound Change Alert |
| :--- | :--- | :--- | :--- |
| 100 | 百 | ひゃく | Regular |
| 200 | 二百 | にひゃく | Regular |
| 300 | 三百 | さんびゃく | ⚠️ ひゃく → びゃく |
| 600 | 六百 | ろっぴゃく | ⚠️ ひゃく → ぴゃく |
| 800 | 八百 | はっぴゃく | ⚠️ ひゃく → ぴゃく |
| 1,000 | 千 | せん | Regular |
| 3,000 | 三千 | さんぜん | ⚠️ せん → ぜん |
| 8,000 | 八千 | はっせん | ⚠️ せん → せん (geminate) |
| 10,000 | 一万 | いちまん | Base unit for Japanese counting |

**Native Japanese Numbers (ひとつ Counting System):**

| Count | Kanji | Hiragana | Meaning |
| :--- | :--- | :--- | :--- |
| 1 | 一つ | ひとつ | 1 general object |
| 2 | 二つ | ふたつ | 2 general objects |
| 3 | 三つ | みっつ | 3 general objects |
| 4 | 四つ | よっつ | 4 general objects |
| 5 | 五つ | いつつ | 5 general objects |
| 6 | 六つ | むっつ | 6 general objects |
| 7 | 七つ | ななつ | 7 general objects |
| 8 | 八つ | やっつ | 8 general objects |
| 9 | 九つ | ここのつ | 9 general objects |
| 10 | 十 | とお | 10 general objects |

**Essential Everyday Counters:**
- 円 (えん) = Japanese currency (e.g. ひゃくえん = ¥100)
- 本 (ほん) = Long cylindrical items (e.g. ペンが いっぽん = one pen)
- 枚 (まい) = Thin flat items (e.g. シャツが にまい = two shirts)
- 冊 (さつ) = Bound books (e.g. ほんが いっさつ = one book)
- 台 (だい) = Machines and vehicles (e.g. くるまが いちだい = one car)`,
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
