import type { LessonContent } from '@/types'

const lesson019: LessonContent = {
  id: 'n5-lesson-019',
  unitId: 'n5-unit-03',
  lessonNumber: 5,
  title: 'Invitations & Suggestions: ませんか & ましょう',
  titleJa: 'かんゆう・ていあん (〜ませんか・〜ましょう)',
  description: 'Learn how to politely invite someone to do an activity together and suggest ideas.',
  estimatedMinutes: 30,

  objectives: [
    'Invite friends or colleagues using [Verb stem] + ませんか',
    'Suggest or agree to an activity using [Verb stem] + ましょう',
    'Politely accept or decline invitations using いいですね and ちょっと...',
    'Use frequency and companion adverbs (いっしょに, いつも)',
  ],

  pattern: '[Verb stem] + ませんか / ましょう',
  patternJa: '[どうしのごかん] + ませんか / ましょう',

  grammarExplanation: `In Japanese, inviting someone to do something is done by politely asking in the negative question form: **〜ませんか** (Won't you do... with me?). This is considered much more polite than asking directly.

**1. Inviting Someone: 〜ませんか**
Remove ます from the verb stem and add **ませんか**.
- たべます → たべませんか (Won't you eat?)
- のみます → のみませんか (Won't you drink?)
- いきます → いきませんか (Won't you go?)
- みます → みませんか (Won't you watch?)

**2. Suggesting or Agreeing: 〜ましょう / 〜ましょうか**
To enthusiastically suggest an action ("Let's..."), replace ます with **ましょう**.
- たべます → たべましょう (Let's eat!)
- のみます → のみましょう (Let's drink!)
- いきましょう → いきましょう (Let's go!)
- はじめます → はじめましょう (Let's begin!)
Add **か** to ask "Shall I / Shall we...?": **〜ましょうか** (e.g. てつだいましょうか = Shall I help?).

**3. Common Responses to Invitations**
- Accepting: **いいですね。いきましょう！** (Sounds good. Let's go!)
- Softly declining: **すみません、ちょっと...** (I'm sorry, that's a bit difficult...)`,

  notes: [
    'Using いっしょに (together) with 〜ませんか makes invitations friendly and natural.',
    'Japanese speakers rarely say an outright "No" (いいえ). They soften refusals with ちょっと... (a bit...) and tone of voice.',
    'ましょうか can be used to volunteer assistance: まどを あけましょうか (Shall I open the window?).',
  ],

  examples: [
    {
      hiragana: 'いっしょに おちゃを のみませんか。',
      kanji: '一緒にお茶を飲みませんか。',
      meaning: 'Won\'t you drink tea with me?',
      breakdown: [
        { segment: 'いっしょに', meaning: 'together', role: 'time' },
        { segment: 'おちゃを', meaning: 'tea (object)', role: 'object' },
        { segment: 'のみませんか', meaning: 'won\'t you drink?', role: 'verb' },
      ],
    },
    {
      hiragana: 'ええ、ぜひ のみましょう！',
      kanji: 'ええ、ぜひ飲みましょう！',
      meaning: 'Yes, by all means let\'s drink!',
      breakdown: [
        { segment: 'ええ', meaning: 'yes', role: 'particle' },
        { segment: 'ぜひ', meaning: 'by all means / definitely', role: 'time' },
        { segment: 'のみましょう', meaning: 'let\'s drink!', role: 'verb' },
      ],
    },
    {
      hiragana: 'あした えいがを みに いきませんか。',
      kanji: '明日映画を見に行きませんか。',
      meaning: 'Won\'t you go to see a movie tomorrow?',
      breakdown: [
        { segment: 'あした', meaning: 'tomorrow', role: 'time' },
        { segment: 'えいがを', meaning: 'movie (object)', role: 'object' },
        { segment: 'みに', meaning: 'to see (purpose)', role: 'destination' },
        { segment: 'いきませんか', meaning: 'won\'t you go?', role: 'verb' },
      ],
    },
  ],

  vocabulary: [],
  grammarPoints: [],

  exercises: [
    {
      id: 'ex-019-1',
      type: 'multipleChoice',
      prompt: 'How do you politely ask: "Shall we drink coffee together?"',
      options: [
        'いっしょに コーヒーを のみませんか。',
        'いっしょに コーヒーを のみますか。',
        'いっしょに コーヒーを のみません。',
        'いっしょに コーヒーを のみたいです。',
      ],
      correctAnswer: 'いっしょに コーヒーを のみませんか。',
      explanation: '〜ませんか is the polite formula for inviting someone to do an activity together.',
      difficulty: 'easy',
    },
    {
      id: 'ex-019-2',
      type: 'multipleChoice',
      prompt: 'Which form means "Let\'s go!"?',
      options: [
        'いきましょう！',
        'いきました！',
        'いきません！',
        'いきたいです！',
      ],
      correctAnswer: 'いきましょう！',
      explanation: '〜ましょう attaches to the verb stem to mean "Let\'s do [verb]!".',
      difficulty: 'easy',
    },
    {
      id: 'ex-019-3',
      type: 'multipleChoice',
      prompt: 'If someone invites you and you need to politely decline, what is the most natural Japanese response?',
      options: [
        'すみません、ちょっと...',
        'ぜったいに いいえ。',
        'だめです！',
        'きらいです。',
      ],
      correctAnswer: 'すみません、ちょっと...',
      explanation: 'すみません、ちょっと... (Sorry, it\'s a bit inconvenient...) is the polite Japanese way to decline without causing embarrassment.',
      difficulty: 'medium',
    },
  ],
}

export default lesson019
