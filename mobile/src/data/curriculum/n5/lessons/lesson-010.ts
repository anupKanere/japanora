import type { LessonContent } from '@/types'

const lesson010: LessonContent = {
  id: 'n5-lesson-010',
  unitId: 'n5-unit-03',
  lessonNumber: 2,
  title: 'People & Animals: います',
  titleJa: 'ひと と います',
  description: 'Say where people and animals exist using います, and practice the contrast between あります and います.',
  estimatedMinutes: 25,
  objectives: [
    'Use います for people and animals correctly',
    'Contrast います vs あります correctly',
    'Describe your family composition using います',
    'Ask and answer "who is there?" and "how many?"',
  ],
  pattern: '[Location] に [Person/Animal] が います',
  patternJa: '[ばしょ] に [ひと/どうぶつ] が います',
  grammarExplanation: `**います — existence of animate beings:**
Used for people, animals, insects — anything that moves on its own.
→ こどもが います (there is a child)
→ ねこが います (there is a cat)

**Contrast: あります vs います:**
- ほんが あります (book — inanimate ✓)
- ほんが います (book — inanimate ✗ WRONG)
- せんせいが います (teacher — animate ✓)
- せんせいが あります (teacher — animate ✗ WRONG)

**Describing family composition:**
Use います + counters for people:
- きょうだいが いますか。(Do you have siblings?)
- あにが ひとり います。(I have one older brother.)
- こどもが ふたり います。(I have two children.)

**Special counters for people:**
- ひとり (1 person)
- ふたり (2 people)
- さんにん (3 people)
- よにん (4 people)
→ 5+ use number + にん (ごにん、ろくにん...)`,
  notes: [
    'ひとり and ふたり are irregular — do not use いちにん or ににん.',
    'Robot / stuffed animal / statue: convention is あります (inanimate by nature).',
    'To ask how many: なんにん いますか。= How many people are there?',
  ],
  examples: [
    { hiragana: 'こうえんに こどもが さんにん います。', kanji: '公園に子供が三人います。', meaning: 'There are three children in the park.' },
    { hiragana: 'いえに ねこが ふたり います。', kanji: '家に猫が二匹います。', meaning: 'There are two cats at home.' },
    { hiragana: 'きょうだいは なんにん いますか。', kanji: '兄弟は何人いますか。', meaning: 'How many siblings do you have?' },
    { hiragana: 'あにが ひとりと いもうとが ふたり います。', kanji: '兄が一人と妹が二人います。', meaning: 'I have one older brother and two younger sisters.' },
    { hiragana: 'だれが へやに いますか。やまださんが います。', kanji: '誰が部屋にいますか。山田さんがいます。', meaning: 'Who is in the room? Yamada-san is.' },
  ],
  vocabulary: [],
  grammarPoints: [],
  exercises: [
    { id: 'l010-ex-01', type: 'multipleChoice', prompt: 'Which is correct for "There is a dog in the park"?', options: ['こうえんに いぬが あります', 'こうえんに いぬが います', 'こうえんで いぬが います', 'こうえんに いぬを います'], correctAnswer: 'こうえんに いぬが います', explanation: 'いぬ (dog) is animate → います. Location marked with に. Subject marked with が.', difficulty: 'easy' },
    { id: 'l010-ex-02', type: 'multipleChoice', prompt: 'How do you say "two people" in Japanese?', options: ['にんに', 'にひき', 'ふたり', 'にめい'], correctAnswer: 'ふたり', explanation: 'ふたり = two people. Irregular: ひとり (1), ふたり (2). For 3+: さんにん, よにん...', difficulty: 'easy' },
    { id: 'l010-ex-03', type: 'fillBlank', prompt: 'Choose: ペンが ___ / 先生が ___  (あります or います)', sentence: 'ペンが ___。/ せんせいが ___。', correctAnswer: 'あります / います', explanation: 'ペン (pen) = inanimate → あります. せんせい (teacher) = animate → います.', difficulty: 'easy' },
    { id: 'l010-ex-04', type: 'translation', prompt: 'Translate: "How many people are in your family?"', correctAnswer: 'かぞくは なんにん いますか。', alternativeAnswers: ['家族は何人いますか', 'かぞくはなんにんいますか'], explanation: 'かぞく (family) + は + なんにん (how many people) + いますか (are there?).', difficulty: 'medium' },
    { id: 'l010-ex-05', type: 'sentenceOrder', prompt: 'Arrange: います / ともだちが / えきに / ひとり', words: ['えきに', 'ともだちが', 'ひとり', 'います'], correctAnswer: 'えきに ともだちが ひとり います', explanation: 'At the station, there is one friend. Counter (ひとり) goes before います.', difficulty: 'medium' },
    { id: 'l010-ex-06', type: 'sentenceProduction', prompt: 'Describe your family: "I have two older brothers and one younger sister."', correctAnswer: 'あにが ふたりと いもうとが ひとり います。', alternativeAnswers: ['兄が二人と妹が一人います', 'あにがふたりといもうとがひとりいます'], explanation: 'あにが ふたり (two older brothers) + と + いもうとが ひとり (one younger sister) + います.', difficulty: 'medium' },
  ],
}

export default lesson010
