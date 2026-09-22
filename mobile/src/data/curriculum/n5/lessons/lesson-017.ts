import type { LessonContent } from '@/types'

const lesson017: LessonContent = {
  id: 'n5-lesson-017',
  unitId: 'n5-unit-07',
  lessonNumber: 2,
  title: 'た Form: Plain Past & Experience',
  titleJa: 'たけい (過去の普通形)',
  description: 'Master the plain past た form using the identical rhyme rule with the て form, and learn how to express life experiences with 〜たことがあります.',
  estimatedMinutes: 35,

  objectives: [
    'Conjugate Group 1, Group 2, and Irregular verbs into plain past た form',
    'Recognize that た-form rules are 100% identical to て-form rules (replace て with た, で with だ)',
    'Use 〜たことがあります to express past experience ("have you ever...")',
    'Use 〜たり〜たりします to list representative actions',
    'Use casual past tense in informal conversations',
  ],

  pattern: '[Verb た-form] + ことがあります / りします',
  patternJa: '[どうし た] + ことがあります / りします',

  grammarExplanation: `**The Golden Rule of the た (Ta) Form:**

> 💡 Once you know the て form, you already know the た form 100%! Simply replace て with た, and で with だ.

### 1. Group 2 (Ichidan / る-verbs)
Drop る, add た (just like adding て!):
- たべる → たべた (ate)
- みる → みた (saw / watched)
- ねる → ねた (slept)
- おきる → おきた (woke up)

### 2. Group 1 (Godan / う-verbs)
Follows the exact same sound-shift pattern as the て form:

| Verb Endings | て-form Shift | た-form Shift | Example | た Form |
| :--- | :--- | :--- | :--- | :--- |
| う・つ・る | って | った | かう / まつ / とる | かった / まった / とった |
| む・ぶ・ぬ | んで | んだ | のむ / あそぶ / しぬ | のんだ / あそんだ / しんだ |
| く | いて | いた | かく / きく | かいた / きいた |
| ぐ | いで | いだ | およぐ (swim) | およいだ |
| す | して | した | はなす (speak) | はなした |
| いく (行く) ⭐ | いって | いった | いく (go) | いった (Special!) |

### 3. Irregular Verbs
- する → した (did)
- くる (来る) → きた (came)

### Key JLPT N5 Patterns with た Form:

**1. Expressing Experience: 〜た ことが あります (Have done...)**
Affirmative: "I have had the experience of doing..."
- にほんに いった ことが あります。 (I have been to Japan.)
- ふじさんに のぼった ことが ありますか。 (Have you ever climbed Mt. Fuji?)
- さしみを たべた ことが ありません。 (I have never eaten sashimi.)

**2. Listing Representative Actions: 〜たり 〜たり します**
- にちようびは ほんを よんだり、おんがくを きいたり します。 (On Sundays, I do things like read books and listen to music.)`,

  notes: [
    'いく (to go) is irregular in both て and た forms: 行った (いった), NOT いいた.',
    '〜たことがあります is used for notable life experiences, not for routine everyday actions like "I ate breakfast this morning".',
    'The plain た form is used in casual Japanese with friends (e.g. きのう なに たべた？ = What did you eat yesterday?).',
  ],

  examples: [
    {
      hiragana: 'にほんに いった ことが あります。',
      kanji: '日本に行ったことがあります。',
      meaning: 'I have been to Japan before.',
      breakdown: [
        { segment: 'にほんに', meaning: 'to Japan', role: 'location' },
        { segment: 'いった', meaning: 'went (plain past)', role: 'verb' },
        { segment: 'ことが あります', meaning: 'have the experience of', role: 'grammar' },
      ],
    },
    {
      hiragana: 'すしを たべた ことが ありますか。',
      kanji: '寿司を食べたことがありますか。',
      meaning: 'Have you ever eaten sushi?',
      breakdown: [
        { segment: 'すしを', meaning: 'sushi (object)', role: 'object' },
        { segment: 'たべた', meaning: 'ate (plain past)', role: 'verb' },
        { segment: 'ことが ありますか', meaning: 'do you have experience?', role: 'question' },
      ],
    },
    {
      hiragana: 'きのう ともだちと えいがを みた。',
      kanji: '昨日友達と映画を見た。',
      meaning: 'Yesterday I watched a movie with a friend (casual).',
    },
    {
      hiragana: 'しゅうまつは そうじしたり、せんたくしたり しました。',
      kanji: '週末は掃除したり、洗濯したりしました。',
      meaning: 'On the weekend, I did things like cleaning and doing laundry.',
    },
  ],

  vocabulary: [],
  grammarPoints: [],

  exercises: [
    {
      id: 'l017-ex-01',
      type: 'multipleChoice',
      prompt: 'What is the た form of のむ (to drink)?',
      options: ['のんだ', 'のった', 'のみた', 'のいた'],
      correctAnswer: 'のんだ',
      explanation: 'Verbs ending in む shift to んだ (identical to んで in the て form: のんで → のんだ).',
      difficulty: 'easy',
    },
    {
      id: 'l017-ex-02',
      type: 'fillBlank',
      prompt: 'Fill in: きのう てがみを ___。(Yesterday I wrote a letter - casual)',
      sentence: 'きのう てがみを ___。',
      correctAnswer: 'かいた',
      explanation: 'かく (Group 1, く ending) becomes かいた (く → いた).',
      difficulty: 'easy',
    },
    {
      id: 'l017-ex-03',
      type: 'multipleChoice',
      prompt: 'Which sentence correctly means "Have you ever climbed Mt. Fuji?"',
      options: [
        'ふじさんに のぼる ことが ありますか。',
        'ふじさんに のぼった ことが ありますか。',
        'ふじさんに のぼって ことが ありますか。',
        'ふじさんに のぼらない ことが ありますか。'
      ],
      correctAnswer: 'ふじさんに のぼった ことが ありますか。',
      explanation: 'Experience is expressed using [Verb in た-form] + ことがありますか. のぼる → のぼった.',
      difficulty: 'medium',
    },
    {
      id: 'l017-ex-04',
      type: 'translation',
      prompt: 'Translate: "I went (casual)."',
      correctAnswer: 'いった。',
      alternativeAnswers: ['行った', 'いきました', '行きました'],
      explanation: 'いく (to go) in た form is いった (special exception, exactly like いって).',
      difficulty: 'easy',
    },
  ],
}

export default lesson017
