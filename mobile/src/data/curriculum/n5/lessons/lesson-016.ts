import type { LessonContent } from '@/types'

const lesson016: LessonContent = {
  id: 'n5-lesson-016',
  unitId: 'n5-unit-07',
  lessonNumber: 1,
  title: 'ない Form: Plain Negative & Rules',
  titleJa: 'ないけい (否定の普通形)',
  description: 'Master the plain negative ない form across all three verb groups, and learn how to make negative requests with 〜ないでください.',
  estimatedMinutes: 35,

  objectives: [
    'Conjugate Group 1 (Godan), Group 2 (Ichidan), and Irregular verbs into plain negative ない form',
    'Understand the あ-column sound shift rule and the special う → わ rule',
    'Memorize the special irregular verbs (ある → ない, くる → こない, する → しない)',
    'Use 〜ないでください to make polite negative requests (Please don’t...)',
    'Recognize casual negative speech in daily conversations',
  ],

  pattern: '[Verb stem in あ-row / drop る] + ない (+ でください)',
  patternJa: '[あ段 / るを取る] + ない (+ でください)',

  grammarExplanation: `**How to Form the ない (Nai) Form:**

The ない form is the plain/casual present negative form of verbs. It is essential for JLPT N5 grammar patterns like 〜ないでください (please don't), 〜なければなりません (must do), and casual speech.

### 1. Group 2 (Ichidan / る-verbs)
The simplest group: simply drop る and add ない.
- たべる → たべない (do not eat)
- みる → みない (do not see / watch)
- おきる → おきない (do not wake up)
- ねる → ねない (do not sleep)

### 2. Group 1 (Godan / う-verbs)
Change the final う-column sound to the corresponding あ-column sound, then add ない.

| Dictionary Ending | Shift to あ-row | Dictionary Example | ない Form |
| :--- | :--- | :--- | :--- |
| く | か + ない | かく (write) | かかない |
| ぐ | が + ない | およぐ (swim) | およがない |
| す | さ + ない | はなす (speak) | はなさない |
| つ | た + ない | まつ (wait) | またない |
| ぬ | な + ない | しぬ (die) | しなない |
| ぶ | ば + ない | あそぶ (play) | あそばない |
| む | ま + ない | のむ (drink) | のまない |
| る (Godan) | ら + ない | とる (take) | とらない |
| う ⭐ | わ + ない (Special!) | かう (buy) | かわない (not かあない!) |

> ⚠️ Critical Rule for verbs ending in う: They change to わ, NOT あ! (かう → かわない, いう → いわない, すう → すわない)

### 3. Irregular Verbs (Must Memorize!)
- する → しない (do not do)
- くる → こない (do not come [sound shifts to ko!])
- ある → ない (does not exist [irregular])

### Key Pattern: 〜ないでください (Please don’t...)
Attach でください to the ない-form to politely request someone NOT to do something:
- ここで たばこを すわないで ください。 (Please don't smoke here.)
- まだ いかないで ください。 (Please don't go yet.)
- しゃしんを とらないで ください。 (Please don't take photos.)`,

  notes: [
    'ある (to exist inanimate) becomes just ない — there is no such word as "あらない" in standard modern Japanese.',
    'くる becomes こない — pay attention to the kanji reading change (来る is pronounced こない).',
    'Verbs ending in う shift to わ, not あ (e.g. 買う → 買わない, 会う → 会わない).',
    'In casual conversation with close friends, using just the ない form expresses a friendly negative (e.g. たべない？ = Won\'t you eat?).',
  ],

  examples: [
    {
      hiragana: 'ここで しゃしんを とらないで ください。',
      kanji: 'ここで写真を撮らないでください。',
      meaning: 'Please do not take photographs here.',
      breakdown: [
        { segment: 'ここで', meaning: 'here (at this place)', role: 'location' },
        { segment: 'しゃしんを', meaning: 'photograph (object)', role: 'object' },
        { segment: 'とらないで ください', meaning: 'please do not take', role: 'verb' },
      ],
    },
    {
      hiragana: 'きょうは なにも たべない。',
      kanji: '今日は何も食べない。',
      meaning: 'I will not eat anything today (casual).',
      breakdown: [
        { segment: 'きょうは', meaning: 'today', role: 'topic' },
        { segment: 'なにも', meaning: 'nothing / anything', role: 'object' },
        { segment: 'たべない', meaning: 'not eat (plain negative)', role: 'verb' },
      ],
    },
    {
      hiragana: 'しんぱい しないで ください。',
      kanji: '心配しないでください。',
      meaning: 'Please do not worry.',
    },
    {
      hiragana: 'あした がっこうに こないで ください。',
      kanji: '明日学校に来ないでください。',
      meaning: 'Please do not come to school tomorrow.',
    },
    {
      hiragana: 'あぶないですから、はいらないで ください。',
      kanji: '危ないですから、入らないでください。',
      meaning: 'Because it is dangerous, please do not enter.',
    },
  ],

  vocabulary: [],
  grammarPoints: [],

  exercises: [
    {
      id: 'l016-ex-01',
      type: 'multipleChoice',
      prompt: 'What is the correct ない form of かう (to buy)?',
      options: ['かあない', 'かわない', 'かいない', 'かかない'],
      correctAnswer: 'かわない',
      explanation: 'Verbs ending in う shift to わ (not あ), so かう becomes かわ + ない → かわない.',
      difficulty: 'easy',
    },
    {
      id: 'l016-ex-02',
      type: 'fillBlank',
      prompt: 'Conjugate into ない form: のむ (to drink)',
      sentence: 'のむ → ___',
      correctAnswer: 'のまない',
      explanation: 'Group 1 (Godan): む shifts to its あ-row counterpart ま, adding ない → のまない.',
      difficulty: 'easy',
    },
    {
      id: 'l016-ex-03',
      type: 'multipleChoice',
      prompt: 'What is the negative plain form of ある (to exist)?',
      options: ['あらない', 'あれない', 'ない', 'ありない'],
      correctAnswer: 'ない',
      explanation: 'ある is an irregular exception in the negative: it becomes simply ない (not あらない).',
      difficulty: 'medium',
    },
    {
      id: 'l016-ex-04',
      type: 'translation',
      prompt: 'Translate: "Please do not push."',
      correctAnswer: 'おさないで ください。',
      alternativeAnswers: ['押さないでください', 'おさないでください'],
      explanation: 'おす (to push) is Group 1: す → さ + ない = おさない + でください → おさないでください.',
      difficulty: 'medium',
    },
  ],
}

export default lesson016
