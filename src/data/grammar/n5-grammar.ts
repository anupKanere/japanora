import type { GrammarPoint } from '@/types'

/**
 * Complete JLPT N5 Grammar — 50 key patterns
 * Type: GrammarPoint (pattern, meaning, structure, notes[], examples[])
 * Ordered progressively: copula → particles → verb forms → adjectives → sentence structures
 * Based on Genki I, みんなの日本語 I, and standard JLPT N5 exam content
 */
export const n5Grammar: GrammarPoint[] = [

  // ═══════════════════════════════════════════════════════
  // UNIT 1 — COPULA & BASIC IDENTITY SENTENCES
  // ═══════════════════════════════════════════════════════
  {
    id: 'grammar-desu',
    pattern: '〜です',
    patternReading: 'desu',
    meaning: 'to be (polite copula)',
    level: 'N5',
    unitId: 'n5-unit-01',
    lessonId: 'n5-lesson-001',
    structure: 'Noun + です',
    notes: [
      'The polite copula used to state that X "is" Y.',
      'Used in formal and polite speech.',
      'Negative: ではありません / じゃないです.',
      'Past: でした. Past negative: ではありませんでした.',
    ],
    examples: [
      { hiragana: 'わたしは がくせいです。', kanji: '私は学生です。', meaning: 'I am a student.' },
      { hiragana: 'これは ほんです。', kanji: 'これは本です。', meaning: 'This is a book.' },
      { hiragana: 'かのじょは せんせいです。', kanji: '彼女は先生です。', meaning: 'She is a teacher.' },
    ],
  },
  {
    id: 'grammar-dewa-arimasen',
    pattern: '〜ではありません / じゃないです',
    patternReading: 'dewa arimasen / ja nai desu',
    meaning: 'to not be (polite negative copula)',
    level: 'N5',
    unitId: 'n5-unit-01',
    lessonId: 'n5-lesson-001',
    structure: 'Noun + ではありません (formal) / Noun + じゃないです (casual)',
    notes: [
      'ではありません is the formal negative.',
      'じゃないです or じゃありません are more casual equivalents.',
    ],
    examples: [
      { hiragana: 'わたしは せんせいでは ありません。', kanji: '私は先生ではありません。', meaning: 'I am not a teacher.' },
      { hiragana: 'これは ほんじゃないです。', meaning: 'This is not a book.' },
    ],
  },
  {
    id: 'grammar-deshita',
    pattern: '〜でした / ではありませんでした',
    patternReading: 'deshita / dewa arimasen deshita',
    meaning: 'was / were (past copula)',
    level: 'N5',
    unitId: 'n5-unit-01',
    structure: 'Noun + でした (past affirmative) / Noun + ではありませんでした (past negative)',
    notes: [
      'Used to say something "was" something else in the past.',
      'Polite past tense of です.',
    ],
    examples: [
      { hiragana: 'むかし がくせいでした。', kanji: '昔学生でした。', meaning: 'I was a student in the past.' },
      { hiragana: 'きのうは やすみでした。', kanji: '昨日は休みでした。', meaning: 'Yesterday was a holiday.' },
    ],
  },
  {
    id: 'grammar-ka',
    pattern: '〜か (question marker)',
    patternReading: 'ka',
    meaning: 'question marker particle',
    level: 'N5',
    unitId: 'n5-unit-01',
    lessonId: 'n5-lesson-001',
    structure: 'Statement + か',
    notes: [
      'Add か at the end of a statement to turn it into a question.',
      'No rising intonation required in writing.',
      'In casual speech, か can be dropped and replaced by rising intonation.',
    ],
    examples: [
      { hiragana: 'これは ほんですか。', kanji: 'これは本ですか。', meaning: 'Is this a book?' },
      { hiragana: 'にほんじんですか。', kanji: '日本人ですか。', meaning: 'Are you Japanese?' },
    ],
  },
  {
    id: 'grammar-no-possession',
    pattern: 'Noun の Noun',
    patternReading: 'no',
    meaning: 'possessive / descriptive connector',
    level: 'N5',
    unitId: 'n5-unit-01',
    lessonId: 'n5-lesson-001',
    structure: 'Noun1 + の + Noun2',
    notes: [
      'の connects two nouns: Noun1 modifies or possesses Noun2.',
      'Most common use: possession — わたしの ほん = my book.',
      'Also describes type/material: にほんごの ほん = Japanese-language book.',
      'の can replace a noun: このかばんは わたしのです = This bag is mine.',
    ],
    examples: [
      { hiragana: 'わたしの ほん', kanji: '私の本', meaning: 'my book' },
      { hiragana: 'にほんごの クラス', kanji: '日本語のクラス', meaning: 'Japanese class' },
      { hiragana: 'やまださんの くるま', kanji: '山田さんの車', meaning: "Yamada-san's car" },
    ],
  },

  // ═══════════════════════════════════════════════════════
  // UNIT 1 — CORE PARTICLES
  // ═══════════════════════════════════════════════════════
  {
    id: 'grammar-wa',
    pattern: 'は (topic marker)',
    patternReading: 'wa',
    meaning: 'marks the topic of a sentence',
    level: 'N5',
    unitId: 'n5-unit-01',
    lessonId: 'n5-lesson-001',
    structure: 'Topic + は + Comment',
    notes: [
      'は marks what the sentence is "about" — the topic, not necessarily the grammatical subject.',
      'Pronounced "wa" (not "ha") when used as a particle.',
      'Contrast with が which marks the grammatical subject.',
      'Using は implies contrast or known information.',
    ],
    examples: [
      { hiragana: 'わたしは にほんじんです。', kanji: '私は日本人です。', meaning: 'I am Japanese.' },
      { hiragana: 'やまださんは せんせいです。', kanji: '山田さんは先生です。', meaning: 'Yamada-san is a teacher.' },
      { hiragana: 'このほんは おもしろいです。', kanji: 'この本は面白いです。', meaning: 'This book is interesting.' },
    ],
  },
  {
    id: 'grammar-ga',
    pattern: 'が (subject marker)',
    patternReading: 'ga',
    meaning: 'marks the grammatical subject',
    level: 'N5',
    unitId: 'n5-unit-01',
    lessonId: 'n5-lesson-001',
    structure: 'Subject + が + Predicate',
    notes: [
      'が marks the grammatical subject, often emphasising new information.',
      'Used in answers to "who/what?" questions.',
      'Required with ability/preference verbs: にほんごが すきです.',
      'Required with existence verbs: あります / います.',
    ],
    examples: [
      { hiragana: 'だれが きましたか。 → やまださんが きました。', kanji: '誰が来ましたか。 → 山田さんが来ました。', meaning: 'Who came? → Yamada-san came.' },
      { hiragana: 'にほんごが すきです。', kanji: '日本語が好きです。', meaning: 'I like Japanese.' },
      { hiragana: 'つくえの うえに ほんが あります。', kanji: '机の上に本があります。', meaning: 'There is a book on the desk.' },
    ],
  },
  {
    id: 'grammar-wo',
    pattern: 'を (object marker)',
    patternReading: 'o',
    meaning: 'marks the direct object of a transitive verb',
    level: 'N5',
    unitId: 'n5-unit-01',
    lessonId: 'n5-lesson-001',
    structure: 'Object + を + Transitive Verb',
    notes: [
      'を marks the direct object — the thing that the action is done to.',
      'Pronounced "o" (not "wo") in modern Japanese.',
      'Only used with transitive verbs (verbs that take a direct object).',
    ],
    examples: [
      { hiragana: 'ほんを よみます。', kanji: '本を読みます。', meaning: 'I read a book.' },
      { hiragana: 'コーヒーを のみます。', kanji: 'コーヒーを飲みます。', meaning: 'I drink coffee.' },
      { hiragana: 'にほんごを べんきょうします。', kanji: '日本語を勉強します。', meaning: 'I study Japanese.' },
    ],
  },
  {
    id: 'grammar-ni',
    pattern: 'に (direction / time / location)',
    patternReading: 'ni',
    meaning: 'destination, specific time, location of existence',
    level: 'N5',
    unitId: 'n5-unit-01',
    lessonId: 'n5-lesson-001',
    structure: 'Destination/Time/Location + に + Verb',
    notes: [
      '(1) Destination of movement verbs: がっこうに いきます — I go TO school.',
      '(2) Specific point in time: ろくじに おきます — I wake up AT 6.',
      '(3) Location of existence with あります/います: えきに います — I am AT the station.',
      'Contrast with で which marks where an action takes place.',
    ],
    examples: [
      { hiragana: 'がっこうに いきます。', kanji: '学校に行きます。', meaning: 'I go to school.' },
      { hiragana: 'ろくじに おきます。', kanji: '六時に起きます。', meaning: 'I wake up at 6.' },
      { hiragana: 'えきに います。', kanji: '駅にいます。', meaning: 'I am at the station.' },
    ],
  },
  {
    id: 'grammar-de',
    pattern: 'で (action location / means)',
    patternReading: 'de',
    meaning: 'location of action, method or means',
    level: 'N5',
    unitId: 'n5-unit-01',
    lessonId: 'n5-lesson-001',
    structure: 'Place + で + Action Verb / Means + で + Verb',
    notes: [
      '(1) Location where an action takes place: としょかんで よみます — I read AT the library.',
      '(2) Means or instrument: でんしゃで いきます — I go BY train; はしで たべます — I eat WITH chopsticks.',
      'Contrast with に (static location with あります/います) vs で (active location).',
    ],
    examples: [
      { hiragana: 'としょかんで ほんを よみます。', kanji: '図書館で本を読みます。', meaning: 'I read at the library.' },
      { hiragana: 'でんしゃで いきます。', kanji: '電車で行きます。', meaning: 'I go by train.' },
      { hiragana: 'にほんごで はなします。', kanji: '日本語で話します。', meaning: 'I speak in Japanese.' },
    ],
  },
  {
    id: 'grammar-to',
    pattern: 'と (and / with)',
    patternReading: 'to',
    meaning: 'lists all nouns (and); accompaniment with a person',
    level: 'N5',
    unitId: 'n5-unit-01',
    structure: 'Noun + と + Noun / Person + と + Verb',
    notes: [
      '(1) Exhaustive listing: コーヒーと ケーキ = coffee AND cake (lists all items).',
      '(2) Accompaniment: ともだちと いきます = I go WITH a friend.',
      'For non-exhaustive listing (some of many) use や instead.',
    ],
    examples: [
      { hiragana: 'コーヒーと ケーキを かいます。', kanji: 'コーヒーとケーキを買います。', meaning: 'I buy coffee and cake.' },
      { hiragana: 'ともだちと えいがを みます。', kanji: '友達と映画を見ます。', meaning: 'I watch a movie with a friend.' },
    ],
  },
  {
    id: 'grammar-mo',
    pattern: 'も (also / too)',
    patternReading: 'mo',
    meaning: 'also, too (inclusive particle)',
    level: 'N5',
    unitId: 'n5-unit-01',
    structure: 'Noun + も + Predicate',
    notes: [
      'も replaces は or が to add "also" or "too."',
      'Can be used with negative predicates: わたしも いきません = I won\'t go either.',
    ],
    examples: [
      { hiragana: 'わたしも にほんじんです。', kanji: '私も日本人です。', meaning: 'I am also Japanese.' },
      { hiragana: 'やまださんも がくせいです。', kanji: '山田さんも学生です。', meaning: 'Yamada-san is also a student.' },
    ],
  },
  {
    id: 'grammar-yo-ne',
    pattern: 'よ / ね (sentence-final particles)',
    patternReading: 'yo / ne',
    meaning: 'asserting (よ) / seeking agreement (ね)',
    level: 'N5',
    unitId: 'n5-unit-01',
    structure: 'Sentence + よ (assertion) / Sentence + ね (seeking agreement)',
    notes: [
      'よ = asserting new information to the listener; emphasis.',
      'ね = seeking agreement or confirmation — like "right?" or "isn\'t it?"',
      'よね = a combination: asserting and seeking confirmation at the same time.',
    ],
    examples: [
      { hiragana: 'これは おいしいですよ。', meaning: 'This is delicious, I tell you!' },
      { hiragana: 'いいてんきですね。', kanji: 'いい天気ですね。', meaning: "Nice weather, isn't it?" },
    ],
  },
  {
    id: 'grammar-kara-made',
    pattern: 'から〜まで',
    patternReading: 'kara ~ made',
    meaning: 'from ... to ... (time or place range)',
    level: 'N5',
    unitId: 'n5-unit-01',
    structure: 'Start + から + End + まで',
    notes: [
      'から = starting point (time or place).',
      'まで = ending point.',
      'Both can be used alone: くじから べんきょうします = I study from 9.',
    ],
    examples: [
      { hiragana: 'くじから じゅうじまで べんきょうします。', kanji: '九時から十時まで勉強します。', meaning: 'I study from 9 to 10.' },
      { hiragana: 'とうきょうから おおさかまで しんかんせんで いきます。', kanji: '東京から大阪まで新幹線で行きます。', meaning: 'I go from Tokyo to Osaka by Shinkansen.' },
    ],
  },

  // ═══════════════════════════════════════════════════════
  // UNIT 2 — POLITE VERB FORMS
  // ═══════════════════════════════════════════════════════
  {
    id: 'grammar-masu',
    pattern: '〜ます (polite present/future)',
    patternReading: '~masu',
    meaning: 'polite present or future affirmative',
    level: 'N5',
    unitId: 'n5-unit-02',
    lessonId: 'n5-lesson-001',
    structure: 'Verb stem + ます',
    notes: [
      'ます attaches to the verb stem to create the polite form.',
      'Expresses both habitual present (I eat every day) and future intention (I will eat).',
      'Verb groups: G1 — change final vowel to い row then add ます; G2 — drop る, add ます; Irregular — します, きます.',
    ],
    examples: [
      { hiragana: 'まいにち にほんごを べんきょうします。', kanji: '毎日日本語を勉強します。', meaning: 'I study Japanese every day.' },
      { hiragana: 'あした えいがを みます。', kanji: '明日映画を見ます。', meaning: 'I will watch a movie tomorrow.' },
    ],
  },
  {
    id: 'grammar-masen',
    pattern: '〜ません (polite negative)',
    patternReading: '~masen',
    meaning: 'polite present/future negative',
    level: 'N5',
    unitId: 'n5-unit-02',
    lessonId: 'n5-lesson-001',
    structure: 'Verb stem + ません',
    notes: [
      'ません is the polite negative counterpart of ます.',
      'Used to say you do not do something, or will not do something.',
    ],
    examples: [
      { hiragana: 'にくを たべません。', kanji: '肉を食べません。', meaning: 'I do not eat meat.' },
      { hiragana: 'わかりません。', meaning: 'I do not understand.' },
    ],
  },
  {
    id: 'grammar-mashita',
    pattern: '〜ました (polite past affirmative)',
    patternReading: '~mashita',
    meaning: 'polite past tense (completed action)',
    level: 'N5',
    unitId: 'n5-unit-02',
    lessonId: 'n5-lesson-001',
    structure: 'Verb stem + ました',
    notes: [
      'ました expresses a completed action in the past.',
      'The polite equivalent of the plain past (た-form).',
    ],
    examples: [
      { hiragana: 'きのう えいがを みました。', kanji: '昨日映画を見ました。', meaning: 'I watched a movie yesterday.' },
      { hiragana: 'ごはんを たべました。', kanji: 'ご飯を食べました。', meaning: 'I ate a meal.' },
    ],
  },
  {
    id: 'grammar-masen-deshita',
    pattern: '〜ませんでした (polite past negative)',
    patternReading: '~masen deshita',
    meaning: 'polite past negative (did not do)',
    level: 'N5',
    unitId: 'n5-unit-02',
    structure: 'Verb stem + ませんでした',
    notes: [
      'Used for actions that did not occur in the past.',
    ],
    examples: [
      { hiragana: 'きのう べんきょうしませんでした。', kanji: '昨日勉強しませんでした。', meaning: 'I did not study yesterday.' },
    ],
  },

  // ═══════════════════════════════════════════════════════
  // UNIT 2 — て-FORM (GERUND)
  // ═══════════════════════════════════════════════════════
  {
    id: 'grammar-te-form',
    pattern: '〜て form (gerund / connector)',
    patternReading: '~te',
    meaning: 'sequential actions, requests, ongoing states',
    level: 'N5',
    unitId: 'n5-unit-02',
    structure: 'Variable conjugation by verb group (see notes)',
    notes: [
      'The て-form connects clauses, makes requests, and forms compound grammar patterns.',
      'Group 1 conjugation rules: く→いて, ぐ→いで, す→して, つ/る/う→って, む/ぬ/ぶ→んで, く(行く)→いって.',
      'Group 2: drop る, add て. Irregular: して, きて.',
      'Key patterns with て: てください (please do), ています (ongoing), てもいいです (may), てはいけません (must not).',
    ],
    examples: [
      { hiragana: 'てを あらって ください。', kanji: '手を洗ってください。', meaning: 'Please wash your hands.' },
      { hiragana: 'ごはんを たべて がっこうに いきます。', kanji: 'ご飯を食べて学校に行きます。', meaning: 'I eat and then go to school.' },
    ],
  },
  {
    id: 'grammar-te-imasu',
    pattern: '〜ています',
    patternReading: '~te imasu',
    meaning: 'ongoing action / habitual state / resulting state',
    level: 'N5',
    unitId: 'n5-unit-02',
    structure: 'Verb て-form + います',
    notes: [
      '(1) Action in progress: いま ほんを よんでいます = I am reading now.',
      '(2) Habitual or occupational activity: かいしゃに つとめています = I work at a company.',
      '(3) Resulting state that continues: けっこんしています = I am married (result of marrying).',
    ],
    examples: [
      { hiragana: 'いま ほんを よんで います。', kanji: '今本を読んでいます。', meaning: 'I am reading a book now.' },
      { hiragana: 'とうきょうに すんで います。', kanji: '東京に住んでいます。', meaning: 'I live in Tokyo.' },
    ],
  },
  {
    id: 'grammar-te-kudasai',
    pattern: '〜てください',
    patternReading: '~te kudasai',
    meaning: 'please do (polite request)',
    level: 'N5',
    unitId: 'n5-unit-02',
    structure: 'Verb て-form + ください',
    notes: [
      'Politely asks someone to do something.',
      'ください alone means "please give me."',
      'Negative request: 〜ないでください = please don\'t do.',
    ],
    examples: [
      { hiragana: 'もういちど いって ください。', kanji: 'もう一度言ってください。', meaning: 'Please say it one more time.' },
      { hiragana: 'ゆっくり はなして ください。', kanji: 'ゆっくり話してください。', meaning: 'Please speak slowly.' },
    ],
  },

  // ═══════════════════════════════════════════════════════
  // UNIT 2 — EXISTENCE VERBS
  // ═══════════════════════════════════════════════════════
  {
    id: 'grammar-arimasu',
    pattern: 'あります (inanimate existence)',
    patternReading: 'arimasu',
    meaning: 'there is/are (for inanimate things, events)',
    level: 'N5',
    unitId: 'n5-unit-02',
    lessonId: 'n5-lesson-001',
    structure: 'Location + に + Thing + が + あります',
    notes: [
      'あります = to exist (inanimate objects, plants, and abstract things like events).',
      'Also used for schedules and appointments: テストが あります = There is a test.',
      'Contrast with います (animate beings).',
    ],
    examples: [
      { hiragana: 'つくえの うえに ほんが あります。', kanji: '机の上に本があります。', meaning: 'There is a book on the desk.' },
      { hiragana: 'らいしゅう テストが あります。', kanji: '来週テストがあります。', meaning: 'There is a test next week.' },
    ],
  },
  {
    id: 'grammar-imasu',
    pattern: 'います (animate existence)',
    patternReading: 'imasu',
    meaning: 'there is/are (for people, animals)',
    level: 'N5',
    unitId: 'n5-unit-02',
    lessonId: 'n5-lesson-001',
    structure: 'Location + に + Being + が + います',
    notes: [
      'います = to exist (animate beings: people, animals, insects).',
      'Contrast with あります (inanimate things).',
      'ロボットは あります or います? Convention: あります (inanimate machine), though varies.',
    ],
    examples: [
      { hiragana: 'こうえんに こどもが います。', kanji: '公園に子供がいます。', meaning: 'There are children in the park.' },
      { hiragana: 'いすの したに ねこが います。', kanji: '椅子の下に猫がいます。', meaning: 'There is a cat under the chair.' },
    ],
  },

  // ═══════════════════════════════════════════════════════
  // UNIT 3 — ADJECTIVE CONJUGATION
  // ═══════════════════════════════════════════════════════
  {
    id: 'grammar-i-adj',
    pattern: 'い-adjective conjugation',
    patternReading: 'i-keiyōshi',
    meaning: 'inflecting い-adjectives for tense and polarity',
    level: 'N5',
    unitId: 'n5-unit-05',
    structure: 'Root + い (present) / Root + くない (neg) / Root + かった (past) / Root + くなかった (past neg)',
    notes: [
      'い-adjectives inflect directly — they do not need です to conjugate (though it is added for politeness).',
      'Drop the final い and add: くない (negative), かった (past), くなかった (past negative).',
      'Exception: いい (good) uses よ- for conjugation: よくない, よかった, よくなかった.',
      'Modifying a noun: い-adj + Noun directly (no な needed). おおきい いぬ = big dog.',
    ],
    examples: [
      { hiragana: 'このほんは おもしろい。', meaning: 'This book is interesting.' },
      { hiragana: 'このほんは おもしろくない。', meaning: 'This book is not interesting.' },
      { hiragana: 'きのうは さむかったです。', kanji: '昨日は寒かったです。', meaning: 'Yesterday was cold.' },
    ],
  },
  {
    id: 'grammar-na-adj',
    pattern: 'な-adjective conjugation',
    patternReading: 'na-keiyōshi',
    meaning: 'inflecting な-adjectives using the copula',
    level: 'N5',
    unitId: 'n5-unit-05',
    structure: 'Adj + です (present) / Adj + じゃない (neg) / Adj + でした (past)',
    notes: [
      'な-adjectives use the copula (です) for all conjugation.',
      'When directly modifying a noun, add な between the adjective and noun: しずかな まち = quiet town.',
      'Do NOT add な before です.',
      'Despite ending in い, きれい and きらい are な-adjectives.',
    ],
    examples: [
      { hiragana: 'とうきょうは にぎやかです。', kanji: '東京は賑やかです。', meaning: 'Tokyo is lively.' },
      { hiragana: 'しずかな まちです。', kanji: '静かな町です。', meaning: 'It is a quiet town.' },
      { hiragana: 'にほんごが すきじゃない。', kanji: '日本語が好きじゃない。', meaning: 'I don\'t like Japanese. (casual)' },
    ],
  },

  // ═══════════════════════════════════════════════════════
  // UNIT 3 — QUANTITIES & COMPARISONS
  // ═══════════════════════════════════════════════════════
  {
    id: 'grammar-counters',
    pattern: 'Counters (〜つ、〜本、〜枚、〜冊 …)',
    patternReading: 'josuushi',
    meaning: 'counting objects with appropriate counters',
    level: 'N5',
    unitId: 'n5-unit-01',
    structure: 'Number + Counter',
    notes: [
      'Japanese uses different counters per object category.',
      'つ = generic (ひとつ、ふたつ、みっつ…とお up to 10).',
      '本 (ほん/ぼん/ぽん) = long cylindrical objects (pens, bottles, bananas).',
      '枚 (まい) = flat thin objects (paper, tickets, stamps).',
      '冊 (さつ) = bound books.',
      '匹 (ひき/びき/ぴき) = small animals.',
      '人 (にん) = people — exceptions: ひとり (1), ふたり (2).',
      '台 (だい) = machines, vehicles.',
    ],
    examples: [
      { hiragana: 'りんごが みっつ あります。', kanji: 'りんごが三つあります。', meaning: 'There are three apples.' },
      { hiragana: 'えんぴつが にほん あります。', kanji: '鉛筆が二本あります。', meaning: 'There are two pencils.' },
      { hiragana: 'がくせいが さんにん います。', kanji: '学生が三人います。', meaning: 'There are three students.' },
    ],
  },
  {
    id: 'grammar-yori',
    pattern: 'A より B のほうが〜',
    patternReading: 'A yori B no hō ga',
    meaning: 'B is more ~ than A (comparison)',
    level: 'N5',
    unitId: 'n5-unit-05',
    structure: 'A + より + B + のほうが + Adjective',
    notes: [
      'より = "than A" — marks the standard of comparison.',
      'のほうが = "on the side of B" — emphasises which is more.',
      'You can omit のほうが in casual speech.',
    ],
    examples: [
      { hiragana: 'すしより ラーメンのほうが すきです。', kanji: '寿司よりラーメンのほうが好きです。', meaning: 'I like ramen more than sushi.' },
      { hiragana: 'バスより でんしゃのほうが はやいです。', kanji: 'バスより電車のほうが速いです。', meaning: 'Trains are faster than buses.' },
    ],
  },
  {
    id: 'grammar-ichiban',
    pattern: '〜がいちばん〜',
    patternReading: '~ga ichiban~',
    meaning: 'the most ~ (superlative)',
    level: 'N5',
    unitId: 'n5-unit-05',
    structure: 'Scope + で + Subject + が + いちばん + Adjective',
    notes: [
      'いちばん = number one = the most.',
      'The scope (what you are comparing within) is marked with で.',
    ],
    examples: [
      { hiragana: 'クラスで やまださんが いちばん せが たかいです。', kanji: 'クラスで山田さんが一番背が高いです。', meaning: 'Yamada-san is the tallest in the class.' },
      { hiragana: 'なにが いちばん すきですか。', kanji: '何が一番好きですか。', meaning: 'What do you like the most?' },
    ],
  },

  // ═══════════════════════════════════════════════════════
  // UNIT 4 — DESIRE & INVITATION
  // ═══════════════════════════════════════════════════════
  {
    id: 'grammar-tai',
    pattern: '〜たい (want to do)',
    patternReading: '~tai',
    meaning: 'want to do (first-person desire)',
    level: 'N5',
    unitId: 'n5-unit-02',
    structure: 'Verb stem + たい (+ です)',
    notes: [
      'たい expresses the speaker\'s own desire to do something.',
      'For third-person use 〜たがっています.',
      'The object can take either を or が (が is more common for natural desire).',
      'Negative: たくない (don\'t want to).',
    ],
    examples: [
      { hiragana: 'にほんに いきたいです。', kanji: '日本に行きたいです。', meaning: 'I want to go to Japan.' },
      { hiragana: 'みずが のみたいです。', kanji: '水が飲みたいです。', meaning: 'I want to drink water.' },
    ],
  },
  {
    id: 'grammar-masen-ka',
    pattern: '〜ませんか (invitation)',
    patternReading: '~masen ka',
    meaning: 'would you like to ... (polite invitation)',
    level: 'N5',
    unitId: 'n5-unit-02',
    structure: 'Verb stem + ませんか',
    notes: [
      'Used to invite someone to do something together.',
      'More tentative and polite than a direct statement.',
      'Response accepting: ええ、ぜひ。/ はい、いいですね。',
    ],
    examples: [
      { hiragana: 'いっしょに ごはんを たべませんか。', kanji: '一緒にご飯を食べませんか。', meaning: 'Would you like to eat together?' },
      { hiragana: 'えいがを みませんか。', kanji: '映画を見ませんか。', meaning: 'Would you like to watch a movie?' },
    ],
  },
  {
    id: 'grammar-masho',
    pattern: "〜ましょう (let's)",
    patternReading: '~mashō',
    meaning: "let's do (proposal/suggestion)",
    level: 'N5',
    unitId: 'n5-unit-02',
    structure: 'Verb stem + ましょう',
    notes: [
      'Proposes doing something together — more assertive than ませんか.',
      'Also used to respond to an invitation: ましょう = let\'s do it!',
    ],
    examples: [
      { hiragana: 'はじめましょう。', kanji: '始めましょう。', meaning: "Let's begin." },
      { hiragana: 'えきで あいましょう。', kanji: '駅で会いましょう。', meaning: "Let's meet at the station." },
    ],
  },

  // ═══════════════════════════════════════════════════════
  // UNIT 4 — ABILITY
  // ═══════════════════════════════════════════════════════
  {
    id: 'grammar-ga-dekimasu',
    pattern: '〜ができます (can do — noun)',
    patternReading: '~ga dekimasu',
    meaning: 'can do, is capable of (with noun)',
    level: 'N5',
    unitId: 'n5-unit-02',
    structure: 'Noun + が + できます',
    notes: [
      'できます = to be able to, to be possible.',
      'Used with nouns for skills/languages: にほんごが できます = I can (do) Japanese.',
      'For verb ability use: verb (dictionary) + ことが できます.',
    ],
    examples: [
      { hiragana: 'にほんごが できます。', kanji: '日本語ができます。', meaning: 'I can speak Japanese.' },
      { hiragana: 'りょうりが できますか。', kanji: '料理ができますか。', meaning: 'Can you cook?' },
    ],
  },
  {
    id: 'grammar-koto-ga-dekimasu',
    pattern: '〜ことができます (can do — verb)',
    patternReading: '~koto ga dekimasu',
    meaning: 'to be able to do (nominalised verb)',
    level: 'N5',
    unitId: 'n5-unit-02',
    structure: 'Verb (dictionary form) + ことができます',
    notes: [
      'こと nominalises the verb — "the act of doing X."',
      'が できます then expresses ability.',
    ],
    examples: [
      { hiragana: 'にほんごで はなすことが できます。', kanji: '日本語で話すことができます。', meaning: 'I can speak in Japanese.' },
      { hiragana: 'ピアノを ひくことが できます。', kanji: 'ピアノを弾くことができます。', meaning: 'I can play the piano.' },
    ],
  },

  // ═══════════════════════════════════════════════════════
  // UNIT 4 — PERMISSION & PROHIBITION
  // ═══════════════════════════════════════════════════════
  {
    id: 'grammar-te-mo-ii',
    pattern: '〜てもいいです (permission)',
    patternReading: '~te mo ii desu',
    meaning: 'it is ok to, may (permission)',
    level: 'N5',
    unitId: 'n5-unit-02',
    structure: 'Verb て-form + もいいです',
    notes: [
      'Asking for permission: 〜てもいいですか。',
      'Granting permission: 〜てもいいです。',
    ],
    examples: [
      { hiragana: 'ここに すわっても いいですか。', kanji: 'ここに座ってもいいですか。', meaning: 'May I sit here?' },
      { hiragana: 'しゃしんを とっても いいです。', kanji: '写真を撮ってもいいです。', meaning: 'You may take photos.' },
    ],
  },
  {
    id: 'grammar-te-wa-ikemasen',
    pattern: '〜てはいけません (prohibition)',
    patternReading: '~te wa ikemasen',
    meaning: 'must not, not allowed',
    level: 'N5',
    unitId: 'n5-unit-02',
    structure: 'Verb て-form + はいけません',
    notes: [
      'Expresses strong prohibition — something that is not allowed.',
      'Casual equivalent: 〜ちゃだめ.',
    ],
    examples: [
      { hiragana: 'ここで たばこを すっては いけません。', kanji: 'ここでたばこを吸ってはいけません。', meaning: 'You must not smoke here.' },
    ],
  },
  {
    id: 'grammar-nakereba-narimasen',
    pattern: '〜なければなりません (obligation)',
    patternReading: '~nakereba narimasen',
    meaning: 'must do, have to do',
    level: 'N5',
    unitId: 'n5-unit-02',
    structure: 'Verb ない-form (drop い) + ければなりません',
    notes: [
      'Expresses obligation or necessity.',
      'Casual contractions: なきゃ、なければ、ないといけない.',
      'Alternative: ないといけません.',
    ],
    examples: [
      { hiragana: 'くすりを のまなければ なりません。', kanji: '薬を飲まなければなりません。', meaning: 'I must take medicine.' },
      { hiragana: 'しゅくだいを しなければ なりません。', kanji: '宿題をしなければなりません。', meaning: 'I must do my homework.' },
    ],
  },

  // ═══════════════════════════════════════════════════════
  // UNIT 4 — PURPOSE OF MOVEMENT
  // ═══════════════════════════════════════════════════════
  {
    id: 'grammar-ni-ikimasu',
    pattern: '〜に いきます / きます / かえります',
    patternReading: '~ni ikimasu',
    meaning: 'to go / come / return to do something (purpose)',
    level: 'N5',
    unitId: 'n5-unit-02',
    structure: 'Verb stem (or action noun) + に + 行きます/来ます/帰ります',
    notes: [
      'に here expresses the purpose of movement.',
      'Verb stem only (not full ます form): たべ+に (not たべます+に).',
      'Noun: かいもの + に いきます = I go shopping.',
    ],
    examples: [
      { hiragana: 'えいがを みに いきます。', kanji: '映画を見に行きます。', meaning: 'I go to watch a movie.' },
      { hiragana: 'かいものに いきます。', kanji: '買い物に行きます。', meaning: 'I go shopping.' },
    ],
  },

  // ═══════════════════════════════════════════════════════
  // UNIT 5 — LOCATION WORDS
  // ═══════════════════════════════════════════════════════
  {
    id: 'grammar-location-words',
    pattern: 'Location words: うえ・した・まえ・うしろ・なか・となり・よこ・ちかく・あいだ',
    patternReading: 'ue, shita, mae, ushiro, naka, tonari, yoko, chikaku, aida',
    meaning: 'spatial relationship words (above, below, front, back, inside, next to, beside, near, between)',
    level: 'N5',
    unitId: 'n5-unit-04',
    structure: 'Noun + の + Location word + に + あります / います',
    notes: [
      'うえ = above, on top; した = below, under; まえ = in front; うしろ = behind.',
      'なか = inside; そと = outside; となり = next to (same category); よこ = beside (physically next to).',
      'ちかく = near, nearby; あいだ = between (two things).',
      'Pattern: えきのまえに = in front of the station.',
    ],
    examples: [
      { hiragana: 'つくえの うえに ほんが あります。', kanji: '机の上に本があります。', meaning: 'There is a book on the desk.' },
      { hiragana: 'えきと デパートの あいだに カフェが あります。', kanji: '駅とデパートの間にカフェがあります。', meaning: 'There is a café between the station and the department store.' },
    ],
  },

  // ═══════════════════════════════════════════════════════
  // UNIT 5 — CHANGE OF STATE
  // ═══════════════════════════════════════════════════════
  {
    id: 'grammar-ku-naru',
    pattern: '〜くなります / になります (become)',
    patternReading: '~ku narimasu / ni narimasu',
    meaning: 'to become (change of state)',
    level: 'N5',
    unitId: 'n5-unit-05',
    structure: 'い-adj (drop い) + くなります / な-adj・Noun + になります',
    notes: [
      'Expresses a change from one state to another.',
      'い-adjective: drop い, add くなります. (さむい → さむくなります)',
      'な-adjective and noun: add になります. (じょうずに なります)',
      'Exception: いい → よくなります.',
    ],
    examples: [
      { hiragana: 'にほんごが じょうずに なりました。', kanji: '日本語が上手になりました。', meaning: 'I became good at Japanese.' },
      { hiragana: 'さむく なりました。', kanji: '寒くなりました。', meaning: 'It became cold.' },
    ],
  },

  // ═══════════════════════════════════════════════════════
  // UNIT 5 — REASON & CAUSE
  // ═══════════════════════════════════════════════════════
  {
    id: 'grammar-kara-reason',
    pattern: '〜から (because)',
    patternReading: '~kara',
    meaning: 'because, since (reason clause)',
    level: 'N5',
    unitId: 'n5-unit-05',
    structure: 'Reason (plain or polite form) + から + Result',
    notes: [
      'から at the end of a clause gives the reason for the main clause.',
      'In polite speech: ～ですから / ～ますから.',
      'から can come before or after the main clause: から sentence position is flexible.',
    ],
    examples: [
      { hiragana: 'あついから まどを あけます。', kanji: '暑いから窓を開けます。', meaning: 'I open the window because it is hot.' },
      { hiragana: 'びょうきだから がっこうを やすみます。', kanji: '病気だから学校を休みます。', meaning: 'I skip school because I am sick.' },
    ],
  },
  {
    id: 'grammar-no-de',
    pattern: '〜ので (because — polite)',
    patternReading: '~node',
    meaning: 'because, so (softer, more formal than から)',
    level: 'N5',
    unitId: 'n5-unit-05',
    structure: 'Clause (plain form) + ので + Result',
    notes: [
      'Similar to から, but softer and more polite/objective.',
      'Preferred in formal situations and writing.',
      'な-adj and nouns use な before ので: げんきなので.',
    ],
    examples: [
      { hiragana: 'やすいので かいます。', kanji: '安いので買います。', meaning: 'I\'ll buy it because it\'s cheap.' },
    ],
  },

  // ═══════════════════════════════════════════════════════
  // UNIT 5 — CONDITIONALS & TIME
  // ═══════════════════════════════════════════════════════
  {
    id: 'grammar-toki',
    pattern: '〜とき (when)',
    patternReading: '~toki',
    meaning: 'when, at the time of',
    level: 'N5',
    unitId: 'n5-unit-05',
    structure: 'Verb/Adj (plain form) + とき / Noun + の + とき',
    notes: [
      'とき marks the time when something happens.',
      'Verb tense before とき matters: present form = the main action happens at that point; past form = the main action happens after that state.',
    ],
    examples: [
      { hiragana: 'ひまな ときに ほんを よみます。', kanji: '暇なときに本を読みます。', meaning: 'When I am free, I read books.' },
      { hiragana: 'こどもの ときに にほんに いきました。', kanji: '子供のときに日本に行きました。', meaning: 'When I was a child, I went to Japan.' },
    ],
  },
  {
    id: 'grammar-tara',
    pattern: '〜たら (conditional)',
    patternReading: '~tara',
    meaning: 'if, when, after (versatile conditional)',
    level: 'N5',
    unitId: 'n5-unit-05',
    structure: 'Past/た-form + ら → たら / だら / かったら',
    notes: [
      'Versatile: "if X happens, Y" / "when X happens, do Y" / "after X happened, Y."',
      'Can be used with commands in the result clause (unlike と).',
      'Formed by adding ら to the past/た-form of any word.',
    ],
    examples: [
      { hiragana: 'にほんに いったら つれて いってください。', kanji: '日本に行ったら連れていってください。', meaning: 'If you go to Japan, please take me.' },
      { hiragana: 'やすかったら かいます。', kanji: '安かったら買います。', meaning: 'If it is cheap, I\'ll buy it.' },
    ],
  },

  // ═══════════════════════════════════════════════════════
  // UNIT 6 — GIVING & RECEIVING
  // ═══════════════════════════════════════════════════════
  {
    id: 'grammar-ageru-morau',
    pattern: 'あげます / もらいます / くれます',
    patternReading: 'agemasu / moraimasu / kuremasu',
    meaning: 'give (to others) / receive / give (to me)',
    level: 'N5',
    unitId: 'n5-unit-06',
    structure: 'Giver + が + Receiver + に + Thing + を + あげます/もらいます/くれます',
    notes: [
      'あげます = I/someone gives TO others (direction: away from speaker).',
      'もらいます = I/someone receives FROM others (direction: toward speaker).',
      'くれます = someone gives TO me/my in-group (speaker never gives with くれます).',
    ],
    examples: [
      { hiragana: 'ともだちに プレゼントを あげます。', kanji: '友達にプレゼントをあげます。', meaning: 'I give a present to a friend.' },
      { hiragana: 'ともだちから ほんを もらいました。', kanji: '友達から本をもらいました。', meaning: 'I received a book from a friend.' },
      { hiragana: 'せんせいが じしょを くれました。', kanji: '先生が辞書をくれました。', meaning: 'The teacher gave me a dictionary.' },
    ],
  },
  {
    id: 'grammar-te-ageru',
    pattern: '〜てあげます / てもらいます / てくれます',
    patternReading: '~te agemasu / te moraimasu / te kuremasu',
    meaning: 'do something for someone (action-giving/receiving)',
    level: 'N5',
    unitId: 'n5-unit-06',
    structure: 'Verb て-form + あげます / もらいます / くれます',
    notes: [
      'Same directional logic as the object-giving verbs, but applied to actions.',
      'てあげます = I do X for someone.',
      'てもらいます = I have someone do X for me.',
      'てくれます = someone does X for me (out of goodwill).',
    ],
    examples: [
      { hiragana: 'かばんを もって あげます。', kanji: '鞄を持ってあげます。', meaning: 'I will carry your bag for you.' },
      { hiragana: 'せんせいに おしえて もらいました。', kanji: '先生に教えてもらいました。', meaning: 'I had the teacher teach me.' },
    ],
  },

  // ═══════════════════════════════════════════════════════
  // UNIT 6 — EXPERIENCE & PLAIN FORMS
  // ═══════════════════════════════════════════════════════
  {
    id: 'grammar-koto-ga-aru',
    pattern: '〜たことがあります (experience)',
    patternReading: '~ta koto ga arimasu',
    meaning: 'have had the experience of doing',
    level: 'N5',
    unitId: 'n5-unit-06',
    structure: 'Verb (た/past-form) + ことがあります',
    notes: [
      'Expresses whether you have ever done something before.',
      'Negative: ことがありません = have never done.',
      'The verb must be in the た-form (past plain form).',
    ],
    examples: [
      { hiragana: 'にほんに いったことが あります。', kanji: '日本に行ったことがあります。', meaning: 'I have been to Japan.' },
      { hiragana: 'すもうを みたことが ありますか。', kanji: '相撲を見たことがありますか。', meaning: 'Have you ever watched sumo?' },
    ],
  },
  {
    id: 'grammar-mae-ato',
    pattern: '〜まえに / 〜あとで (before / after)',
    patternReading: '~mae ni / ~ato de',
    meaning: 'before doing / after doing',
    level: 'N5',
    unitId: 'n5-unit-02',
    structure: 'Verb (dict.) + まえに + Action / Verb (た) + あとで + Action',
    notes: [
      'まえに uses the dictionary/present form even when talking about the past.',
      'あとで uses the た-form (completed state).',
      'Noun + の + まえに is also correct: しょくじの まえに = before the meal.',
    ],
    examples: [
      { hiragana: 'ねる まえに はを みがきます。', kanji: '寝る前に歯を磨きます。', meaning: 'I brush my teeth before sleeping.' },
      { hiragana: 'ごはんを たべた あとで べんきょうします。', kanji: 'ご飯を食べた後で勉強します。', meaning: 'I study after eating.' },
    ],
  },

  // ═══════════════════════════════════════════════════════
  // SUPPLEMENTARY STRUCTURES
  // ═══════════════════════════════════════════════════════
  {
    id: 'grammar-n-desu',
    pattern: '〜んです / のです (explanation)',
    patternReading: '~n desu / no desu',
    meaning: 'providing or seeking an explanation, emphasis',
    level: 'N5',
    unitId: 'n5-unit-06',
    structure: 'Plain form + んです (spoken) / のです (written)',
    notes: [
      'んです = contracted の + です.',
      'Used to seek explanation, provide reasons, or add emotional emphasis.',
      'どうしたんですか = What\'s wrong? (asking for explanation).',
      'な-adj and nouns use なんです.',
    ],
    examples: [
      { hiragana: 'どうして やすんでいるんですか。 → びょうきなんです。', meaning: 'Why are you absent? → It\'s because I\'m sick.' },
    ],
  },
  {
    id: 'grammar-nai-de-kudasai',
    pattern: '〜ないでください (negative request)',
    patternReading: '~nai de kudasai',
    meaning: 'please don\'t do (negative request)',
    level: 'N5',
    unitId: 'n5-unit-02',
    structure: 'Verb ない-form + でください',
    notes: [
      'Used to politely ask someone NOT to do something.',
      'Contrast with 〜てください (positive request).',
    ],
    examples: [
      { hiragana: 'しんぱいしないで ください。', kanji: '心配しないでください。', meaning: 'Please don\'t worry.' },
      { hiragana: 'おそく こないで ください。', kanji: '遅く来ないでください。', meaning: 'Please don\'t come late.' },
    ],
  },
  {
    id: 'grammar-dono-gurai',
    pattern: 'どのぐらい (how long / how much)',
    patternReading: 'dono gurai',
    meaning: 'how long, how much, how far (degree)',
    level: 'N5',
    unitId: 'n5-unit-04',
    structure: 'どのぐらい + Predicate',
    notes: [
      'Used to ask about degree, duration, distance, or quantity.',
      'どのくらい is equally correct.',
    ],
    examples: [
      { hiragana: 'えきまで どのぐらい かかりますか。', kanji: '駅までどのぐらいかかりますか。', meaning: 'How long does it take to the station?' },
      { hiragana: 'にほんごを どのぐらい べんきょうしましたか。', kanji: '日本語をどのぐらい勉強しましたか。', meaning: 'How long have you been studying Japanese?' },
    ],
  },

  // ═══════════════════════════════════════════════════════
  // UNIT 6 — ADDITIONAL N5 PATTERNS (51–60)
  // ═══════════════════════════════════════════════════════
  {
    id: 'grammar-desho',
    pattern: '〜でしょう / でしょうか',
    patternReading: '~deshō / deshō ka',
    meaning: 'probably, I wonder (conjecture / polite question)',
    level: 'N5',
    unitId: 'n5-unit-06',
    structure: 'Plain form + でしょう / Noun・な-adj + でしょう',
    notes: [
      'でしょう expresses conjecture or assumption: "It is probably ~."',
      'でしょうか softens a question, making it more polite.',
      'Casual equivalent: だろう.',
      'With rising intonation: seeking confirmation from listener.',
    ],
    examples: [
      { hiragana: 'あしたは あめが ふるでしょう。', kanji: '明日は雨が降るでしょう。', meaning: 'It will probably rain tomorrow.' },
      { hiragana: 'かれは がくせいでしょうか。', kanji: '彼は学生でしょうか。', meaning: 'I wonder if he is a student.' },
    ],
  },
  {
    id: 'grammar-masho-ka',
    pattern: '〜ましょうか (shall I / shall we?)',
    patternReading: '~mashō ka',
    meaning: 'shall I…? / shall we…? (offer or invitation)',
    level: 'N5',
    unitId: 'n5-unit-02',
    structure: 'Verb-masu stem + ましょうか',
    notes: [
      'Offering to do something for someone: 〜ましょうか = Shall I do ~?',
      'Also used to invite or propose an action together.',
      'Distinguish from 〜ましょう (let\'s) — ましょうか seeks agreement.',
    ],
    examples: [
      { hiragana: 'にもつを もちましょうか。', kanji: '荷物を持ちましょうか。', meaning: 'Shall I carry your luggage?' },
      { hiragana: 'いっしょに かえりましょうか。', kanji: '一緒に帰りましょうか。', meaning: 'Shall we go home together?' },
    ],
  },
  {
    id: 'grammar-te-iru-tokoro',
    pattern: '〜ているところ (in the middle of)',
    patternReading: '~te iru tokoro',
    meaning: 'to be in the middle of doing (right now)',
    level: 'N5',
    unitId: 'n5-unit-02',
    structure: 'Verb て-form + いるところ',
    notes: [
      'Emphasises the action is happening at this very moment.',
      'More specific than 〜ている which can indicate ongoing habit.',
      '〜たところ = just finished. 〜るところ = about to start.',
    ],
    examples: [
      { hiragana: 'いま しゅくだいを しているところです。', kanji: '今宿題をしているところです。', meaning: 'I am in the middle of doing my homework right now.' },
      { hiragana: 'かれは ごはんを たべているところです。', kanji: '彼はご飯を食べているところです。', meaning: 'He is in the middle of eating.' },
    ],
  },
  {
    id: 'grammar-dake',
    pattern: '〜だけ (only, just)',
    patternReading: '~dake',
    meaning: 'only, just (limiting expression)',
    level: 'N5',
    unitId: 'n5-unit-01',
    structure: 'Noun / Verb plain form + だけ',
    notes: [
      'Limits the scope: "only X", "just X".',
      'Can follow nouns, verbs in plain form, and counters.',
      'More neutral than しか (which requires negative verb).',
    ],
    examples: [
      { hiragana: 'すこしだけ たべました。', kanji: '少しだけ食べました。', meaning: 'I ate just a little.' },
      { hiragana: 'わたしだけ しっています。', kanji: '私だけ知っています。', meaning: 'Only I know (about it).' },
    ],
  },
  {
    id: 'grammar-shika-nai',
    pattern: '〜しか〜ない (nothing but, only)',
    patternReading: '~shika ~nai',
    meaning: 'only (with negative — implies insufficiency or limitation)',
    level: 'N5',
    unitId: 'n5-unit-01',
    structure: 'Noun / Quantity + しか + Negative verb',
    notes: [
      'Always used with a NEGATIVE verb form.',
      'Implies "only X, and that is not enough" — contrasts with だけ (neutral).',
      'お金が100円しかない = I only have 100 yen (and that\'s too little).',
    ],
    examples: [
      { hiragana: 'じかんが いちじかんしか ありません。', kanji: '時間が1時間しかありません。', meaning: 'I only have one hour (not enough).' },
      { hiragana: 'にほんごしか はなせません。', kanji: '日本語しか話せません。', meaning: 'I can only speak Japanese.' },
    ],
  },
  {
    id: 'grammar-yori',
    pattern: '〜より (than, compared to)',
    patternReading: '~yori',
    meaning: 'than (comparison particle)',
    level: 'N5',
    unitId: 'n5-unit-01',
    structure: 'Noun A + より + Noun B + の方が + adjective',
    notes: [
      'Used to compare two things: "A より B の方が〜 = B is more ~ than A."',
      'The item after より is the one being compared FROM (the lesser).',
      'Often paired with の方が to mark the preferred/greater item.',
    ],
    examples: [
      { hiragana: 'バスより でんしゃの ほうが はやいです。', kanji: 'バスより電車の方が速いです。', meaning: 'The train is faster than the bus.' },
      { hiragana: 'きのうより きょうの ほうが さむいです。', kanji: '昨日より今日の方が寒いです。', meaning: 'Today is colder than yesterday.' },
    ],
  },
  {
    id: 'grammar-hodo',
    pattern: '〜ほど (to the extent that, as ~ as)',
    patternReading: '~hodo',
    meaning: 'to the extent of, as ~ as, about (degree)',
    level: 'N5',
    unitId: 'n5-unit-05',
    structure: 'Noun + ほど / Verb plain form + ほど',
    notes: [
      'Expresses degree: "to such an extent that..."',
      'In negatives: A ほど B ではない = B is not as ~ as A.',
      'ほど can also mean approximately: 1時間ほど = about 1 hour.',
    ],
    examples: [
      { hiragana: 'しぬほど つかれました。', kanji: '死ぬほど疲れました。', meaning: 'I am so tired I could die (to the extent of dying).' },
      { hiragana: 'このかばんは あのかばんほど たかくないです。', kanji: 'このかばんはあのかばんほど高くないです。', meaning: 'This bag is not as expensive as that one.' },
    ],
  },
  {
    id: 'grammar-nagara',
    pattern: '〜ながら (while doing, at the same time)',
    patternReading: '~nagara',
    meaning: 'while doing ~ simultaneously (two actions at once)',
    level: 'N5',
    unitId: 'n5-unit-02',
    structure: 'Verb-masu stem + ながら + main verb',
    notes: [
      'Subject of both verbs must be the SAME person.',
      'The ながら action is secondary; the main verb is the primary action.',
      'E.g.: おんがくを ききながら べんきょうします = I study while listening to music.',
    ],
    examples: [
      { hiragana: 'おんがくを ききながら べんきょうします。', kanji: '音楽を聴きながら勉強します。', meaning: 'I study while listening to music.' },
      { hiragana: 'たちながら ほんを よみました。', kanji: '立ちながら本を読みました。', meaning: 'I read a book while standing.' },
    ],
  },
  {
    id: 'grammar-te-shimau',
    pattern: '〜てしまう (end up doing, unfortunately did)',
    patternReading: '~te shimau',
    meaning: 'to end up doing, to finish completely (often with regret)',
    level: 'N5',
    unitId: 'n5-unit-02',
    structure: 'Verb て-form + しまう / しまいます',
    notes: [
      'Two nuances: (1) completion — did it fully/thoroughly. (2) regret — did something unfortunate.',
      'Colloquial contractions: 〜ちゃう (〜てしまう), 〜じゃう (〜でしまう).',
      'Context determines whether regret is implied.',
    ],
    examples: [
      { hiragana: 'さいふを わすれてしまいました。', kanji: '財布を忘れてしまいました。', meaning: 'I unfortunately forgot my wallet.' },
      { hiragana: 'ケーキを ぜんぶ たべてしまいました。', kanji: 'ケーキを全部食べてしまいました。', meaning: 'I ended up eating all the cake.' },
    ],
  },
  {
    id: 'grammar-demo',
    pattern: '〜でも (even, any~, or something like)',
    patternReading: '~demo',
    meaning: 'even; any (indefinite); how about ~ (suggestion)',
    level: 'N5',
    unitId: 'n5-unit-01',
    structure: 'Noun + でも / Question word + でも',
    notes: [
      'Noun + でも = "even X": わたしでも できます = Even I can do it.',
      'Question word + でも = "any~": だれでも = anyone, どこでも = anywhere.',
      'In suggestions: コーヒーでも のみましょうか = How about some coffee?',
    ],
    examples: [
      { hiragana: 'だれでも にほんごを まなべます。', kanji: '誰でも日本語を学べます。', meaning: 'Anyone can learn Japanese.' },
      { hiragana: 'コーヒーでも のみましょうか。', meaning: 'How about having some coffee or something?' },
    ],
  },
]
