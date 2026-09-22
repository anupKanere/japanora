import type { LessonContent } from '@/types'

const lesson004: LessonContent = {
  id: 'n5-lesson-004',
  unitId: 'n5-unit-02',
  lessonNumber: 1,
  title: 'ます Form: Polite Verbs',
  titleJa: 'ていねいけい (〜ます)',
  description: 'Learn the three verb groups and conjugate them into the polite ます form for daily conversation.',
  estimatedMinutes: 35,

  objectives: [
    'Identify Group 1, Group 2, and Irregular verbs',
    'Conjugate any verb into polite ます form',
    'Conjugate into polite negative ません',
    'Use the object particle を with transitive verbs',
    'Describe daily routine activities',
  ],

  pattern: '[Verb stem] + ます',
  patternJa: '[どうしのごかん] + ます',

  grammarExplanation: `Japanese verbs are divided into three groups:

**Group 2 (る-verbs / ichidan)**
The easiest group — simply drop る and add ます.
- たべる → たべます (eat)
- みる → みます (see/watch)
- おきる → おきます (wake up)
- ねる → ねます (sleep)

**Group 1 (う-verbs / godan)**
Change the final vowel sound to the い row, then add ます.
- のむ → のみます (drink) [む→み]
- かく → かきます (write) [く→き]
- よむ → よみます (read) [む→み]
- いく → いきます (go) [く→き]
- はなす → はなします (speak) [す→し]
- まつ → まちます (wait) [つ→ち]
- かう → かいます (buy) [う→い]

**Irregular verbs (only 2!)**
- する → します (do)
- くる → きます (come)

**Polite forms:**
- ます (present/future positive)
- ません (present/future negative)
- ました (past positive)
- ませんでした (past negative)`,

  notes: [
    'The vast majority of verbs ending in る are Group 2, but some exceptions exist (はいる、はしる are Group 1).',
    'A safe rule: if the syllable before る is an い or え sound, it is likely Group 2.',
    'します is by far the most common irregular — it forms hundreds of compound verbs.',
    'The object particle を always marks what the action is done to.',
  ],

  examples: [
    {
      hiragana: 'まいにち コーヒーを のみます。',
      kanji: '毎日コーヒーを飲みます。',
      meaning: 'I drink coffee every day.',
      breakdown: [
        { segment: 'まいにち', meaning: 'every day', role: 'time' },
        { segment: 'コーヒーを', meaning: 'coffee (object)', role: 'object' },
        { segment: 'のみます', meaning: 'drink (polite)', role: 'verb' },
      ],
    },
    {
      hiragana: 'としょかんで ほんを よみます。',
      kanji: '図書館で本を読みます。',
      meaning: 'I read books at the library.',
      breakdown: [
        { segment: 'としょかんで', meaning: 'at the library', role: 'location' },
        { segment: 'ほんを', meaning: 'book (object)', role: 'object' },
        { segment: 'よみます', meaning: 'read (polite)', role: 'verb' },
      ],
    },
    {
      hiragana: 'にほんごで はなします。',
      kanji: '日本語で話します。',
      meaning: 'I speak in Japanese.',
    },
    {
      hiragana: 'ともだちと えいがを みます。',
      kanji: '友達と映画を見ます。',
      meaning: 'I watch movies with a friend.',
    },
    {
      hiragana: 'あした がっこうに きます。',
      kanji: '明日学校に来ます。',
      meaning: 'I will come to school tomorrow.',
    },
  ],

  vocabulary: [],
  grammarPoints: [],

  exercises: [
    {
      id: 'l004-ex-01',
      type: 'multipleChoice',
      prompt: 'Which group does たべる (eat) belong to?',
      options: ['Group 1 (う-verb)', 'Group 2 (る-verb)', 'Irregular', 'None of the above'],
      correctAnswer: 'Group 2 (る-verb)',
      explanation: 'たべる ends in る and the syllable before る is べ (え sound) → Group 2. Drop る, add ます → たべます.',
      difficulty: 'easy',
    },
    {
      id: 'l004-ex-02',
      type: 'fillBlank',
      prompt: 'Conjugate to ます form: のむ (drink)',
      sentence: 'のむ → ___',
      correctAnswer: 'のみます',
      explanation: 'のむ is Group 1 (う-verb). む → み, then add ます → のみます.',
      difficulty: 'easy',
    },
    {
      id: 'l004-ex-03',
      type: 'fillBlank',
      prompt: 'Conjugate to ます form: みる (see)',
      sentence: 'みる → ___',
      correctAnswer: 'みます',
      explanation: 'みる is Group 2. Drop る, add ます → みます.',
      difficulty: 'easy',
    },
    {
      id: 'l004-ex-04',
      type: 'multipleChoice',
      prompt: 'What is the ます form of する?',
      options: ['すます', 'しります', 'します', 'するます'],
      correctAnswer: 'します',
      explanation: 'する is an irregular verb. Its polite form is します (not formed by regular rules).',
      difficulty: 'easy',
    },
    {
      id: 'l004-ex-05',
      type: 'sentenceOrder',
      prompt: 'Arrange: テレビを / よる / みます / わたしは',
      words: ['わたしは', 'よる', 'テレビを', 'みます'],
      correctAnswer: 'わたしは よる テレビを みます',
      explanation: 'わたしは よる テレビを みます。= I watch TV in the evening. [Topic] [Time] [Object] [Verb].',
      difficulty: 'medium',
    },
    {
      id: 'l004-ex-06',
      type: 'translation',
      prompt: 'Translate: "I study Japanese every day."',
      correctAnswer: 'まいにち にほんごを べんきょうします。',
      alternativeAnswers: ['毎日日本語を勉強します', 'まいにちにほんごをべんきょうします'],
      explanation: 'まいにち (every day) + にほんごを (Japanese, object) + べんきょうします (study, polite).',
      difficulty: 'medium',
    },
    {
      id: 'l004-ex-07',
      type: 'multipleChoice',
      prompt: 'Which ます form is WRONG?',
      options: ['よみます (yomu→read)', 'かいます (kaku→write)', 'たべます (taberu→eat)', 'きます (kuru→come)'],
      correctAnswer: 'かいます (kaku→write)',
      explanation: 'かく (write) → かきます (not かいます). く→き for Group 1. かいます = to buy (かう → かいます).',
      difficulty: 'hard',
    },
    {
      id: 'l004-ex-08',
      type: 'sentenceProduction',
      prompt: 'Make a sentence: "I listen to music every morning." (まいあさ = every morning, おんがく = music, ききます = listen)',
      correctAnswer: 'まいあさ おんがくを ききます。',
      alternativeAnswers: ['まいあさ おんがくを きます', '毎朝音楽を聞きます'],
      explanation: 'まいあさ (every morning) + おんがくを (music, object) + ききます (listen, Group 1: く→き+ます).',
      difficulty: 'medium',
    },
  ],
}

export default lesson004
