import type { LessonContent } from '@/types'

const lesson006: LessonContent = {
  id: 'n5-lesson-006',
  unitId: 'n5-unit-02',
  lessonNumber: 3,
  title: 'Past Tense: ました / ませんでした',
  titleJa: 'かこけい',
  description: 'Talk about completed and non-completed actions in the past using ました and ませんでした.',
  estimatedMinutes: 25,
  objectives: [
    'Form the polite past ました from any verb',
    'Form the polite past negative ませんでした',
    'Use time expressions for past (きのう、せんしゅう、さきほど)',
    'Ask and answer questions about past events',
  ],
  pattern: '[Verb stem] + ました / ませんでした',
  patternJa: '[どうしのごかん] + ました / ませんでした',
  grammarExplanation: `**Polite past affirmative: ました**
Replace ます with ました. Works the same for all verb groups.
- たべます → たべました (ate)
- のみます → のみました (drank)
- しました (did)
- きました (came)

**Polite past negative: ませんでした**
Replace ます with ませんでした.
- たべません → たべませんでした (did not eat)
- いきません → いきませんでした (did not go)

**Useful past time expressions:**
- きのう = yesterday
- せんしゅう = last week
- きょねん = last year
- さきほど = a little while ago
- もう = already
- まだ = not yet`,
  notes: [
    'ました and ませんでした cover all verb groups with no exceptions.',
    'もう + ました = already done: もう たべました = I already ate.',
    'まだ + ません = not yet: まだ たべていません = I haven\'t eaten yet (uses て-form).',
  ],
  examples: [
    { hiragana: 'きのう えいがを みました。', kanji: '昨日映画を見ました。', meaning: 'I watched a movie yesterday.' },
    { hiragana: 'せんしゅう にほんごを べんきょうしませんでした。', kanji: '先週日本語を勉強しませんでした。', meaning: 'I did not study Japanese last week.' },
    { hiragana: 'もう ごはんを たべましたか。', kanji: 'もうご飯を食べましたか。', meaning: 'Have you already eaten?' },
    { hiragana: 'はい、たべました。いいえ、まだです。', meaning: 'Yes, I ate. / No, not yet.' },
    { hiragana: 'きのうの よる どこに いきましたか。', kanji: '昨日の夜どこに行きましたか。', meaning: 'Where did you go last night?' },
  ],
  vocabulary: [],
  grammarPoints: [],
  exercises: [
    { id: 'l006-ex-01', type: 'multipleChoice', prompt: 'What is the past form of みます?', options: ['みたです', 'みました', 'みませんでした', 'みていました'], correctAnswer: 'みました', explanation: 'Past affirmative: replace ます with ました → みました.', difficulty: 'easy' },
    { id: 'l006-ex-02', type: 'fillBlank', prompt: 'Fill in: きのう べんきょう___。(I did not study yesterday.)', sentence: 'きのう べんきょう___。', correctAnswer: 'しませんでした', explanation: 'べんきょうします → past negative: べんきょうしませんでした.', difficulty: 'easy' },
    { id: 'l006-ex-03', type: 'translation', prompt: 'Translate: "I drank coffee this morning."', correctAnswer: 'けさ コーヒーを のみました。', alternativeAnswers: ['今朝コーヒーを飲みました', 'けさコーヒーをのみました'], explanation: 'けさ (this morning) + コーヒーを (coffee) + のみました (drank).', difficulty: 'easy' },
    { id: 'l006-ex-04', type: 'multipleChoice', prompt: 'How do you ask "Did you eat?" politely?', options: ['たべましたか。', 'たべますか。', 'たべましょうか。', 'たべませんか。'], correctAnswer: 'たべましたか。', explanation: 'Past question: ました + か → たべましたか。= Did you eat?', difficulty: 'easy' },
    { id: 'l006-ex-05', type: 'sentenceOrder', prompt: 'Arrange: せんしゅう / えきで / ともだちに / あいました', words: ['せんしゅう', 'えきで', 'ともだちに', 'あいました'], correctAnswer: 'せんしゅう えきで ともだちに あいました', explanation: 'Last week I met a friend at the station. [Time][Place][Object][Verb]', difficulty: 'medium' },
    { id: 'l006-ex-06', type: 'sentenceProduction', prompt: 'Write: "I went to the library yesterday and read a book."', correctAnswer: 'きのう としょかんに いって ほんを よみました。', alternativeAnswers: ['昨日図書館に行って本を読みました', 'きのう としょかんに いきました。そして ほんを よみました。'], explanation: 'Use て-form to connect: いって + よみました = went and then read.', difficulty: 'hard' },
  ],
}

export default lesson006
