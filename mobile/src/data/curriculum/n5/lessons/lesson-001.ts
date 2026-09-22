import type { LessonContent } from '@/types'

const lesson001: LessonContent = {
  id: 'n5-lesson-001',
  unitId: 'n5-unit-01',
  lessonNumber: 1,
  title: 'Basic Sentence Building',
  titleJa: 'きほんぶんけい',
  description:
    'Build your first complete Japanese sentences using the Time + Place + Object + Verb pattern.',
  estimatedMinutes: 30,

  objectives: [
    'Build complete sentences using [Time] + [Place] + [Object] + [Verb]',
    'Use the particles は, を, で, and に correctly',
    'Use の to connect two nouns (e.g. にほんごの ほん)',
    'Correctly use common everyday verbs in ます form',
    'Describe daily routines in Japanese',
  ],

  pattern: '[Time] + [Place] + [Object] + [Verb]',
  patternJa: '[じかん] + [ばしょ] + [もくてき] + [どうし]',

  grammarExplanation: `Japanese sentences follow a different word order from English.

The most important rule: **the verb always comes last**.

A typical full sentence pattern is:

[Time] + [Place] + [Object] + [Verb]

This is sometimes called SOV (Subject–Object–Verb) order.

Note: The subject (わたしは) is often placed at the very beginning, before the time word.

Full order: わたしは + [Time] + [Place] + [Object] + [Verb]

Japanese is a very flexible language — you can rearrange some parts — but the verb must stay at the end.`,

  notes: [
    'Time words usually come before place words.',
    'The particle を marks the direct object — what you are doing the action to.',
    'The particle で marks where an action happens.',
    'The particle に marks a destination (with いく, くる, かえる).',
    'の connects two nouns: にほんごの ほん = a Japanese-language book.',
    'Verbs in this lesson are all in polite ます form, suitable for most everyday conversation.',
  ],

  examples: [
    {
      hiragana: 'わたしは まいにち にほんごを べんきょうします。',
      kanji: '私は毎日日本語を勉強します。',
      meaning: 'I study Japanese every day.',
      breakdown: [
        { segment: 'わたしは', reading: 'わたし は', meaning: 'I (topic)', role: 'topic' },
        { segment: 'まいにち', reading: 'まいにち', meaning: 'every day', role: 'time' },
        { segment: 'にほんごを', reading: 'にほんご を', meaning: 'Japanese (object)', role: 'object' },
        { segment: 'べんきょうします', reading: 'べんきょうします', meaning: 'study', role: 'verb' },
      ],
    },
    {
      hiragana: 'わたしは まいあさ うちで ごはんを たべます。',
      kanji: '私は毎朝家でご飯を食べます。',
      meaning: 'I eat rice at home every morning.',
      breakdown: [
        { segment: 'わたしは', reading: 'わたし は', meaning: 'I (topic)', role: 'topic' },
        { segment: 'まいあさ', reading: 'まいあさ', meaning: 'every morning', role: 'time' },
        { segment: 'うちで', reading: 'うち で', meaning: 'at home', role: 'place' },
        { segment: 'ごはんを', reading: 'ごはん を', meaning: 'rice/meal (object)', role: 'object' },
        { segment: 'たべます', reading: 'たべます', meaning: 'eat', role: 'verb' },
      ],
    },
    {
      hiragana: 'わたしは としょかんで ほんを よみます。',
      kanji: '私は図書館で本を読みます。',
      meaning: 'I read books at the library.',
      breakdown: [
        { segment: 'わたしは', reading: 'わたし は', meaning: 'I (topic)', role: 'topic' },
        { segment: 'としょかんで', reading: 'としょかん で', meaning: 'at the library', role: 'place' },
        { segment: 'ほんを', reading: 'ほん を', meaning: 'books (object)', role: 'object' },
        { segment: 'よみます', reading: 'よみます', meaning: 'read', role: 'verb' },
      ],
    },
    {
      hiragana: 'わたしは まいばん テレビを みます。',
      kanji: '私は毎晩テレビを見ます。',
      meaning: 'I watch TV every evening.',
      breakdown: [
        { segment: 'わたしは', reading: 'わたし は', meaning: 'I (topic)', role: 'topic' },
        { segment: 'まいばん', reading: 'まいばん', meaning: 'every evening', role: 'time' },
        { segment: 'テレビを', reading: 'テレビ を', meaning: 'TV (object)', role: 'object' },
        { segment: 'みます', reading: 'みます', meaning: 'watch/see', role: 'verb' },
      ],
    },
    {
      hiragana: 'わたしは まいにち スーパーに いきます。',
      kanji: '私は毎日スーパーに行きます。',
      meaning: 'I go to the supermarket every day.',
      breakdown: [
        { segment: 'わたしは', reading: 'わたし は', meaning: 'I (topic)', role: 'topic' },
        { segment: 'まいにち', reading: 'まいにち', meaning: 'every day', role: 'time' },
        { segment: 'スーパーに', reading: 'スーパー に', meaning: 'to the supermarket (destination)', role: 'destination' },
        { segment: 'いきます', reading: 'いきます', meaning: 'go', role: 'verb' },
      ],
    },
  ],

  vocabulary: [],   // populated from n5Vocabulary by IDs
  grammarPoints: [], // populated from n5Grammar by IDs

  exercises: [
    {
      id: 'ex-001-01',
      type: 'particleSelect',
      prompt: 'Choose the correct particle.',
      sentence: 'わたしは まいにち にほんご___ べんきょうします。',
      blankIndex: 0,
      options: ['は', 'を', 'に', 'で'],
      correctAnswer: 'を',
      explanation: 'にほんご (Japanese) is the direct object of べんきょうします. Objects take the particle を.',
      mistakeCategory: 'particle',
    },
    {
      id: 'ex-001-02',
      type: 'particleSelect',
      prompt: 'Choose the correct particle.',
      sentence: 'わたしは としょかん___ ほんを よみます。',
      blankIndex: 0,
      options: ['に', 'を', 'で', 'は'],
      correctAnswer: 'で',
      explanation: 'としょかん (library) is where the action of reading takes place. The action-location particle is で.',
      mistakeCategory: 'particle',
    },
    {
      id: 'ex-001-03',
      type: 'particleSelect',
      prompt: 'Choose the correct particle.',
      sentence: 'わたしは まいにち スーパー___ いきます。',
      blankIndex: 0,
      options: ['で', 'を', 'に', 'が'],
      correctAnswer: 'に',
      explanation: 'スーパー (supermarket) is the destination of いきます (to go). Destinations take the particle に.',
      mistakeCategory: 'particle',
    },
    {
      id: 'ex-001-04',
      type: 'fillBlank',
      prompt: 'Fill in the blank with the correct noun modifier.',
      sentence: 'わたしは としょかんで にほんごの___を よみます。',
      blankIndex: 0,
      correctAnswer: 'ほん',
      alternativeAnswers: ['本'],
      explanation: 'にほんごの ___ = a ___ about Japanese. にほんごの ほん = a Japanese-language book. の connects the two nouns.',
      mistakeCategory: 'nounModification',
    },
    {
      id: 'ex-001-05',
      type: 'translation',
      prompt: 'Translate into Japanese using the sentence pattern.',
      promptJa: '英語から日本語に',
      hint: 'Pattern: [Time] + [Place] + [Object] + [Verb]',
      correctAnswer: 'わたしは まいあさ みずを のみます。',
      alternativeAnswers: [
        'まいあさ みずを のみます。',
        'わたしは まいあさ うちで みずを のみます。',
      ],
      explanation: 'まいあさ (every morning) + みず (water) + を (object marker) + のみます (drink).',
      mistakeCategory: 'verbConjugation',
    },
    {
      id: 'ex-001-06',
      type: 'multipleChoice',
      prompt: 'Which sentence correctly says "I watch TV every evening"?',
      options: [
        'わたしは まいばん テレビを みます。',
        'わたしは まいばん テレビに みます。',
        'わたしは まいばん テレビで みます。',
        'わたしは まいばん テレビが みます。',
      ],
      correctAnswer: 'わたしは まいばん テレビを みます。',
      explanation: 'テレビ is the object of みます (to watch), so it takes を. みます does not take a destination (に) — you watch TV, you don\'t go to TV.',
      mistakeCategory: 'particle',
    },
    {
      id: 'ex-001-07',
      type: 'sentenceOrder',
      prompt: 'Arrange the words to make a correct sentence.',
      words: ['わたしは', 'うちで', 'まいあさ', 'ごはんを', 'たべます'],
      correctAnswer: 'わたしは まいあさ うちで ごはんを たべます。',
      alternativeAnswers: ['わたしは うちで まいあさ ごはんを たべます。'],
      explanation: 'Standard order: topic (わたしは) → time (まいあさ) → place (うちで) → object (ごはんを) → verb (たべます). The verb must be last.',
      mistakeCategory: 'wordOrder',
    },
    {
      id: 'ex-001-08',
      type: 'sentenceProduction',
      prompt: 'Write a Japanese sentence about what you do every day. Use the pattern: [Topic] + [Time] + [Place] + [Object] + [Verb].',
      hint: 'Try using: まいにち / まいあさ / まいばん and a verb like たべます, のみます, よみます, みます, or べんきょうします。',
      correctAnswer: '',
      explanation: 'Good sentences include a time word, use を for the object, use で or に for location, and end with a ます-form verb.',
      mistakeCategory: 'other',
    },
  ],

  homework: [
    {
      exerciseId: 'hw-001-01',
      prompt: 'Write a sentence about drinking something in the morning.',
      userAnswer: 'watashi wa maiasa mizu o nomimasu',
      correctedAnswer: 'わたしは まいあさ みずを のみます。',
      isCorrect: true,
      score: 10,
      mistakeCategories: [],
      explanation:
        'Perfect! まいあさ (every morning) + みず + を + のみます. Correct particle を and correct verb のみます.',
      teacherNotes: 'Excellent sentence. Note that romanization is accepted for input but you should practice writing in hiragana.',
      submittedAt: '2024-01-15T10:00:00Z',
    },
    {
      exerciseId: 'hw-001-02',
      prompt: 'Write a sentence about reading something at home.',
      userAnswer: 'watashi wa uchi de nihongo o hon o yomimasu',
      correctedAnswer: 'わたしは うちで にほんごの ほんを よみます。',
      isCorrect: false,
      score: 7,
      mistakeCategories: ['nounModification', 'particle'],
      explanation:
        'Good structure and correct verb. The issue is "nihongo o hon o" — you cannot use を twice in a row for two objects. にほんご modifies ほん using の: にほんごの ほん (a Japanese-language book). So the sentence should be: にほんごの ほんを よみます.',
      teacherNotes: 'Key learning: の connects nouns. にほんごの ほん = a book OF Japanese. を marks one object at a time.',
      submittedAt: '2024-01-15T10:05:00Z',
    },
    {
      exerciseId: 'hw-001-03',
      prompt: 'Write a sentence about watching TV every evening.',
      userAnswer: 'watashi wa maiyoru terebi mimasu',
      correctedAnswer: 'わたしは まいばん テレビを みます。',
      isCorrect: false,
      score: 7,
      mistakeCategories: ['particle', 'vocabulary'],
      explanation:
        'Two corrections: (1) まいよる → まいばん: The standard word for "every evening/night" is まいばん (毎晩), not まいよる. まいよる is not natural. (2) テレビ みます → テレビを みます: テレビ is the object of みます, so it needs the particle を. Never skip を before a transitive verb.',
      teacherNotes: 'Particles cannot be omitted in polite speech. を is required between the object and the verb.',
      submittedAt: '2024-01-15T10:10:00Z',
    },
    {
      exerciseId: 'hw-001-04',
      prompt: 'Write a sentence about eating lunch at home.',
      userAnswer: 'watashi wa uchi de herugohan o tabemasu',
      correctedAnswer: 'わたしは うちで ひるごはんを たべます。',
      isCorrect: false,
      score: 8,
      mistakeCategories: ['vocabulary', 'spelling'],
      explanation:
        '"herugohan" is not a Japanese word. The word is ひるごはん (昼ご飯) — lunch. ひる (noon/daytime) + ごはん (meal). The rest of the sentence is correct: うちで (at home) + ひるごはんを (lunch, object) + たべます (eat).',
      teacherNotes: 'Review vocabulary: あさごはん (breakfast), ひるごはん (lunch), ばんごはん (dinner).',
      submittedAt: '2024-01-15T10:15:00Z',
    },
    {
      exerciseId: 'hw-001-05',
      prompt: 'Write a sentence about studying Japanese at the library.',
      userAnswer: 'watashi wa toshokan de nihongo o benkyoshimasu',
      correctedAnswer: 'わたしは としょかんで にほんごを べんきょうします。',
      isCorrect: true,
      score: 10,
      mistakeCategories: [],
      explanation:
        'Excellent! としょかんで (at the library) + にほんごを (Japanese, object) + べんきょうします (study). Perfect sentence.',
      submittedAt: '2024-01-15T10:20:00Z',
    },
    {
      exerciseId: 'hw-001-06',
      prompt: 'Write a sentence about going to the supermarket every day.',
      userAnswer: 'watashi wa mainichi supa o ikimasu',
      correctedAnswer: 'わたしは まいにち スーパーに いきます。',
      isCorrect: false,
      score: 7,
      mistakeCategories: ['particle'],
      explanation:
        'Critical correction: スーパーを → スーパーに. いきます (to go) takes a destination, and destinations use に, NOT を. を marks the object of an action, but you cannot "do an action TO" the supermarket — you GO TO it. Pattern: [Destination] + に + いきます.',
      teacherNotes: 'Remember: に + いきます/きます/かえります for destinations. を is for direct objects of transitive verbs.',
      submittedAt: '2024-01-15T10:25:00Z',
    },
    {
      exerciseId: 'hw-001-07',
      prompt: 'Write a sentence about drinking coffee in the morning at home.',
      userAnswer: 'watashi uchi de asa ni koohi o nomimasu',
      correctedAnswer: 'わたしは うちで あさ コーヒーを のみます。',
      isCorrect: false,
      score: 8,
      mistakeCategories: ['particle', 'wordOrder'],
      explanation:
        'Two issues: (1) watashi → わたしは: The topic marker は after わたし is required. It cannot be omitted in polite formal speech. (2) "asa ni" → あさ: In this context, あさ (morning) is a time word that works without に. に is added to specific clock times (はちじに = at 8 o\'clock), not general time words like あさ, ひる, よる. The sentence structure and vocabulary are otherwise very good.',
      teacherNotes: 'Never omit は after the topic. General time words (あさ, ひる, よる, まいにち) do not need に. Specific times (はちじ, ごじ) do need に.',
      submittedAt: '2024-01-15T10:30:00Z',
    },
    {
      exerciseId: 'hw-001-08',
      prompt: 'Write a sentence about reading a book at 8 o\'clock.',
      userAnswer: 'watashi wa hachiji ni hon o yomimmasu',
      correctedAnswer: 'わたしは はちじに ほんを よみます。',
      isCorrect: false,
      score: 9,
      mistakeCategories: ['spelling'],
      explanation:
        'Almost perfect! One small spelling error: yomimmasu → よみます. There is only one む (mu) sound — よみます, not よみまます. The structure is excellent: はちじに (at 8 o\'clock) + ほんを (book, object) + よみます (read). Correct use of に with a clock time.',
      teacherNotes: 'Spelling/phonetic accuracy: よみます has a single み (mi) not double mm. Japanese long consonants use っ for doubled consonants, not a doubled romaji letter.',
      submittedAt: '2024-01-15T10:35:00Z',
    },
  ],

  reviewItems: [
    'The verb always comes last in a Japanese sentence.',
    'を marks the direct object of a transitive verb.',
    'で marks where an action takes place.',
    'に marks a destination with いく, くる, かえる.',
    'の connects two nouns: A の B = B that relates to A.',
    'まいばん (not まいよる) = every evening.',
    'ひるごはん = lunch.',
    'は after わたし cannot be omitted in polite speech.',
    'Specific clock times (はちじ) need に; general time words (あさ, よる) do not.',
  ],
}

export default lesson001
