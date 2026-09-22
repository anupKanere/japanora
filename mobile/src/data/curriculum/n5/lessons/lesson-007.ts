import type { LessonContent } from '@/types'

const lesson007: LessonContent = {
  id: 'n5-lesson-007',
  unitId: 'n5-unit-02',
  lessonNumber: 4,
  title: 'て Form & Ongoing Actions',
  titleJa: 'てけい と しているじょうたい',
  description: 'Master the て form for connecting sentences, making requests, and expressing ongoing actions with ています.',
  estimatedMinutes: 40,
  objectives: [
    'Form the て form for all three verb groups',
    'Connect sequential actions with て form',
    'Use てください for polite requests',
    'Use ています for ongoing or habitual actions',
    'Use ないでください for negative requests',
  ],
  pattern: '[Verb て-form] + ください / います',
  patternJa: '[どうし て] + ください / います',
  grammarExplanation: `The て form is the most important connecting form in Japanese, used for requests, ongoing actions, and linking sentences.

**Group 2 (Ichidan / る-verbs):**
Simply drop る and add て.
- たべる → たべて (eat)
- みる → みて (see / watch)
- おきる → おきて (wake up)
- ねる → ねて (sleep)

**Group 1 (Godan / う-verbs) — The Rhyme Rules:**
- く → いて (e.g. かく → かいて)
- ぐ → いで (e.g. およぐ → およいで)
- す → して (e.g. はなす → はなして)
- う・つ・る → って (e.g. かう → かって, まつ → まって, とる → とって)
- む・ぶ・ぬ → んで (e.g. のむ → のんで, あそぶ → あそんで, しぬ → しんで)
- Special Exception: いく → いって (to go)

**Group 3 (Irregular verbs):**
- する → して (do)
- くる → きて (come)

**Key Sentence Patterns with て Form:**
- 1. Requests: 〜てください (Please do...) e.g. てを あらって ください。
- 2. Ongoing Actions: 〜ています (Am doing...) e.g. べんきょうして います。
- 3. Sequential Actions: [Verb て]、[Verb] (Do X and then Y) e.g. ごはんを たべて ねます。`,
  notes: [
    'いく (to go) is irregular in て form: いって (not いいて).',
    'ています can mean ongoing (currently happening) OR habitual/occupational state.',
    'あいています = is open (result state); しまっています = is closed.',
    'The て form itself has no tense — tense is carried by います.',
  ],
  examples: [
    { hiragana: 'てを あらって ください。', kanji: '手を洗ってください。', meaning: 'Please wash your hands.' },
    { hiragana: 'いま にほんごを べんきょうして います。', kanji: '今日本語を勉強しています。', meaning: 'I am studying Japanese now.' },
    { hiragana: 'ごはんを たべて ねます。', kanji: 'ご飯を食べて寝ます。', meaning: 'I eat and then sleep.' },
    { hiragana: 'しんぱいしないで ください。', kanji: '心配しないでください。', meaning: "Please don't worry." },
    { hiragana: 'かいしゃに つとめて います。', kanji: '会社に勤めています。', meaning: 'I work at a company (habitual).' },
  ],
  vocabulary: [],
  grammarPoints: [],
  exercises: [
    { id: 'l007-ex-01', type: 'multipleChoice', prompt: 'What is the て form of のむ?', options: ['のんて', 'のんで', 'のみて', 'のんです'], correctAnswer: 'のんで', explanation: 'のむ (Group 1, む ending): む → んで → のんで.', difficulty: 'easy' },
    { id: 'l007-ex-02', type: 'fillBlank', prompt: 'Fill in: もういちど いって___。(Please say it one more time.)', sentence: 'もういちど ___ ください。', correctAnswer: 'いって', explanation: 'いく → て form is いって (special exception). + ください = please go / please say.', difficulty: 'easy' },
    { id: 'l007-ex-03', type: 'multipleChoice', prompt: 'What does ています express in: とうきょうに すんでいます。?', options: ['Completed action', 'Future plan', 'Habitual/ongoing state', 'Request'], correctAnswer: 'Habitual/ongoing state', explanation: 'すんでいます uses the result state meaning: "currently living" (the result of having moved there).', difficulty: 'medium' },
    { id: 'l007-ex-04', type: 'translation', prompt: 'Translate: "I am eating lunch now."', correctAnswer: 'いま ひるごはんを たべて います。', alternativeAnswers: ['今昼ご飯を食べています', 'いまひるごはんをたべています'], explanation: 'いま (now) + ひるごはんを (lunch) + たべています (am eating).', difficulty: 'easy' },
    { id: 'l007-ex-05', type: 'fillBlank', prompt: 'What is the て form of かく (write)?', sentence: 'かく → ___', correctAnswer: 'かいて', explanation: 'かく (Group 1, く ending): く → いて → かいて.', difficulty: 'medium' },
    { id: 'l007-ex-06', type: 'sentenceOrder', prompt: 'Arrange: ゆっくり / てください / はなして', words: ['ゆっくり', 'はなして', 'ください'], correctAnswer: 'ゆっくり はなして ください', explanation: 'ゆっくり はなしてください。= Please speak slowly. Adverb + て form + ください.', difficulty: 'easy' },
    { id: 'l007-ex-07', type: 'multipleChoice', prompt: 'Which て form is WRONG?', options: ['かいて (かく)', 'はなして (はなす)', 'いいて (いく)', 'のんで (のむ)'], correctAnswer: 'いいて (いく)', explanation: 'いく → いって (NOT いいて). Special exception for いく.', difficulty: 'hard' },
    { id: 'l007-ex-08', type: 'sentenceProduction', prompt: 'Write: "Please don\'t take photos here." (しゃしんを とる = to take photos, ここで = here)', correctAnswer: 'ここで しゃしんを とらないで ください。', alternativeAnswers: ['ここでしゃしんをとらないでください', 'ここで写真を撮らないでください'], explanation: 'とる → ない form: とらない + でください = please don\'t take.', difficulty: 'hard' },
  ],
}

export default lesson007
