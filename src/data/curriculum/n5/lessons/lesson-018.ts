import type { LessonContent } from '@/types'

const lesson018: LessonContent = {
  id: 'n5-lesson-018',
  unitId: 'n5-unit-07',
  lessonNumber: 3,
  title: 'なかった Form: Plain Negative Past',
  titleJa: 'なかったけい (過去否定の普通形)',
  description: 'Learn the plain negative past なかった form — how it conjugates like an い-adjective from ない, and how to talk about things you did not do.',
  estimatedMinutes: 30,

  objectives: [
    'Conjugate any verb from its ない form into its plain negative past なかった form',
    'Understand why ない conjugates like an い-adjective (drop い, add かった)',
    'Master key irregulars: ある → なかった, する → しなかった, くる → こなかった',
    'Use casual past negative in informal Japanese conversations',
  ],

  pattern: '[Verb in ない-form without い] + かった',
  patternJa: '[ない形の「い」を取る] + かった',

  grammarExplanation: `**How to Form the なかった (Nakatta) Form:**

The plain negative past (〜なかった) is the casual equivalent of 〜ませんでした (did not do).

> 💡 The Secret Trick: The negative ending ない conjugates exactly like an い-adjective! To put an い-adjective into the past tense, you drop い and add かった (たかい → たかかった, ない → なかった).

Therefore, once you know a verb's ない form, drop い and add かった to get なかった:

### 1. Group 2 (Ichidan / る-verbs)
Drop る, add なかった:
- たべる → たべない → たべなかった (did not eat)
- みる → みない → みなかった (did not see / watch)
- ねる → ねない → ねなかった (did not sleep)
- おきる → おきない → おきなかった (did not wake up)

### 2. Group 1 (Godan / う-verbs)
Shift final sound to the あ-column, add なかった:
- かく → かかない → かかなかった (did not write)
- のむ → のまない → のまなかった (did not drink)
- まつ → またない → またなかった (did not wait)
- かう → かわない → かわなかった (did not buy)
- いく → いかない → いかなかった (did not go)
- はなす → はなさない → はなさなかった (did not speak)

### 3. Irregular Verbs
- ある (to exist) → ない → なかった (there was not / did not have)
- する (to do) → しない → しなかった (did not do)
- くる (to come) → こない → こなかった (did not come)

### Comparison of All Four Plain Verb Forms:

| Verb | Plain Present (辞書形) | Plain Negative (ない) | Plain Past (た) | Plain Negative Past (なかった) |
| :--- | :--- | :--- | :--- | :--- |
| たべる (G2) | たべる | たべない | たべた | たべなかった |
| のむ (G1) | のむ | のまない | のんだ | のまなかった |
| かう (G1) | かう | かわない | かった | かわなかった |
| いく (G1) | いく | いかない | いった | いかなかった |
| する (Irr) | する | しない | した | しなかった |
| くる (Irr) | くる | こない | きた | こなかった |
| ある (G1/Irr) | ある | ない | あった | なかった |`,

  notes: [
    'ある (there is) in negative past is simply なかった (e.g. じかんが なかった = I didn\'t have time).',
    'Polite equivalent is ませんでした (e.g. たべませんでした = たべなかった).',
    'In JLPT N5, this form is frequently used in reasoning: 〜なかったから (because I did not...).',
  ],

  examples: [
    {
      hiragana: 'きのう じかんが なかった。',
      kanji: '昨日時間がなかった。',
      meaning: 'Yesterday I did not have time (casual).',
      breakdown: [
        { segment: 'きのう', meaning: 'yesterday', role: 'time' },
        { segment: 'じかんが', meaning: 'time (subject)', role: 'subject' },
        { segment: 'なかった', meaning: 'did not exist / had not', role: 'verb' },
      ],
    },
    {
      hiragana: 'あさごはんを たべなかった。',
      kanji: '朝ご飯を食べなかった。',
      meaning: 'I did not eat breakfast (casual).',
    },
    {
      hiragana: 'きのうは どこにも いかなかった。',
      kanji: '昨日はどこにも行かなかった。',
      meaning: 'Yesterday I did not go anywhere.',
    },
    {
      hiragana: 'しゅくだいを しなかった。',
      kanji: '宿題をしなかった。',
      meaning: 'I did not do homework.',
    },
  ],

  vocabulary: [],
  grammarPoints: [],

  exercises: [
    {
      id: 'l018-ex-01',
      type: 'multipleChoice',
      prompt: 'What is the plain negative past of みる (to watch)?',
      options: ['みなかった', 'みませんでした', 'みなかったです', 'みないかった'],
      correctAnswer: 'みなかった',
      explanation: 'みる is Group 2 (Ichidan): drop る, add なかった → みなかった.',
      difficulty: 'easy',
    },
    {
      id: 'l018-ex-02',
      type: 'fillBlank',
      prompt: 'Fill in: きのう かれは ___。(Yesterday he did not come - casual)',
      sentence: 'きのう かれは ___。',
      correctAnswer: 'こなかった',
      explanation: 'くる (to come) has the irregular negative stem こ, so negative past is こなかった.',
      difficulty: 'medium',
    },
    {
      id: 'l018-ex-03',
      type: 'multipleChoice',
      prompt: 'What is the negative past of ある (to exist / to have)?',
      options: ['あらない', 'あらしなかった', 'なかった', 'ありなかった'],
      correctAnswer: 'なかった',
      explanation: 'ある → negative is ない → past negative is なかった.',
      difficulty: 'medium',
    },
  ],
}

export default lesson018
