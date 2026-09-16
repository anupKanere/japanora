import type { LessonContent } from '@/types'

const lesson005: LessonContent = {
  id: 'n5-lesson-005',
  unitId: 'n5-unit-02',
  lessonNumber: 2,
  title: 'Negative Form: ません',
  titleJa: 'ひていけい (〜ません)',
  description: 'Express what you do not do and distinguish frequency adverbs like あまり and ぜんぜん.',
  estimatedMinutes: 20,
  objectives: [
    'Form polite negative ません from any verb',
    'Use あまり〜ません and ぜんぜん〜ません correctly',
    'Use よく、ときどき、たまに to describe frequency',
    'Answer negative questions naturally',
  ],
  pattern: '[Verb stem] + ません',
  patternJa: '[どうしのごかん] + ません',
  grammarExplanation: `**Polite negative: ません**
Simply replace ます with ません. No other changes needed.
- たべます → たべません (do not eat)
- のみます → のみません (do not drink)
- します → しません (do not do)
- きます → きません (do not come)

**Frequency adverbs with negatives:**
- あまり〜ません = not very often (I don't ~ much)
- ぜんぜん〜ません = not at all

These adverbs must be followed by a negative verb!

**Frequency scale (positive → negative):**
いつも > よく > ときどき > たまに > あまり〜ない > ぜんぜん〜ない`,
  notes: [
    'あまり and ぜんぜん ALWAYS require a negative verb form — never use them with ます.',
    'To say "I never eat meat": にくを ぜんぜん たべません。',
    'To say "I rarely drink alcohol": おさけを あまり のみません。',
  ],
  examples: [
    { hiragana: 'わたしは にくを たべません。', kanji: '私は肉を食べません。', meaning: 'I do not eat meat.' },
    { hiragana: 'あまり コーヒーを のみません。', kanji: 'あまりコーヒーを飲みません。', meaning: 'I do not drink coffee very often.' },
    { hiragana: 'ぜんぜん わかりません。', kanji: 'ぜんぜん分かりません。', meaning: 'I don\'t understand at all.' },
    { hiragana: 'やまださんは ぜんぜん にほんごを はなしません。', kanji: '山田さんは全然日本語を話しません。', meaning: 'Yamada-san does not speak Japanese at all.' },
  ],
  vocabulary: [],
  grammarPoints: [],
  exercises: [
    { id: 'l005-ex-01', type: 'multipleChoice', prompt: 'What is the polite negative of よみます?', options: ['よまません', 'よみません', 'よむません', 'よみなせん'], correctAnswer: 'よみません', explanation: 'Replace ます with ません: よみます → よみません.', difficulty: 'easy' },
    { id: 'l005-ex-02', type: 'fillBlank', prompt: 'Fill in: わたしは ___ テレビを みません。(I don\'t watch TV very often.)', sentence: 'わたしは ___ テレビを みません。', options: ['ぜんぜん', 'あまり', 'よく', 'いつも'], correctAnswer: 'あまり', explanation: 'あまり〜ません = not very often. ぜんぜん〜ません = not at all.', difficulty: 'easy' },
    { id: 'l005-ex-03', type: 'translation', prompt: 'Translate: "I don\'t understand at all."', correctAnswer: 'ぜんぜん わかりません。', alternativeAnswers: ['全然分かりません', 'ぜんぜんわかりません'], explanation: 'ぜんぜん (not at all) + わかりません (do not understand).', difficulty: 'easy' },
    { id: 'l005-ex-04', type: 'multipleChoice', prompt: 'Which sentence is INCORRECT?', options: ['ぜんぜん たべません', 'あまり のみません', 'ぜんぜん たべます', 'よく たべます'], correctAnswer: 'ぜんぜん たべます', explanation: 'ぜんぜん must always be followed by a NEGATIVE verb form. ぜんぜん たべます is grammatically incorrect.', difficulty: 'medium' },
    { id: 'l005-ex-05', type: 'sentenceOrder', prompt: 'Arrange: わたしは / おさけを / のみません / ぜんぜん', words: ['わたしは', 'ぜんぜん', 'おさけを', 'のみません'], correctAnswer: 'わたしは ぜんぜん おさけを のみません', explanation: 'I don\'t drink alcohol at all. Adverb (ぜんぜん) goes before the object.', difficulty: 'medium' },
    { id: 'l005-ex-06', type: 'sentenceProduction', prompt: 'Write: "I do not study Japanese on Sundays." (にちようびに = on Sundays)', correctAnswer: 'にちようびに にほんごを べんきょうしません。', alternativeAnswers: ['日曜日に日本語を勉強しません'], explanation: 'にちようびに (on Sundays) + にほんごを (Japanese) + べんきょうしません (do not study).', difficulty: 'medium' },
  ],
}

export default lesson005
