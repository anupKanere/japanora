import type { LessonContent } from '@/types'

const lesson009: LessonContent = {
  id: 'n5-lesson-009',
  unitId: 'n5-unit-03',
  lessonNumber: 1,
  title: 'Objects & Existence: あります',
  titleJa: 'もの と あります',
  description: 'Describe where objects and things are located using あります and location words like うえ、した、まえ.',
  estimatedMinutes: 25,
  objectives: [
    'Use あります to state what exists and where',
    'Use all 9 core location words correctly',
    'Build sentences: Location に Object が あります',
    'Ask and answer where things are',
    'Use ありません for negative existence',
  ],
  pattern: '[Location] に [Object] が あります',
  patternJa: '[ばしょ] に [もの] が あります',
  grammarExplanation: `**あります — existence of inanimate things:**
Used for objects, plants, events, schedules.
→ ほんが あります (there is a book)
→ テストが あります (there is a test)

**Location structure:**
[Thing の Location word] に [Subject] が あります

**9 core location words:**
- うえ = above, on top
- した = below, under
- まえ = in front
- うしろ = behind
- なか = inside
- そと = outside
- となり = next to (same type)
- よこ = beside (side by side)
- ちかく = nearby
- あいだ = between (N と N の あいだ)

**Negative:**
あります → ありません (does not exist / there is no ~)`,
  notes: [
    'The subject of あります is marked by が (not は in standard sentences).',
    'When asking WHERE something is, the object becomes the topic (は): ほんは どこに ありますか。',
    'となり is used between things of the same category (e.g., shops); よこ is general.',
  ],
  examples: [
    { hiragana: 'つくえの うえに ほんが あります。', kanji: '机の上に本があります。', meaning: 'There is a book on the desk.', breakdown: [{ segment: 'つくえの うえに', meaning: 'on the desk', role: 'location' }, { segment: 'ほんが', meaning: 'book (subject)', role: 'subject' }, { segment: 'あります', meaning: 'exists', role: 'verb' }] },
    { hiragana: 'えきの まえに コンビニが あります。', kanji: '駅の前にコンビニがあります。', meaning: 'There is a convenience store in front of the station.' },
    { hiragana: 'つくえの したに ねこが いますか。', kanji: '机の下に猫がいますか。', meaning: 'Is there a cat under the desk? (use います for animals)' },
    { hiragana: 'ぎんこうは えきの となりに あります。', kanji: '銀行は駅の隣にあります。', meaning: 'The bank is next to the station.' },
    { hiragana: 'えきと デパートの あいだに カフェが あります。', kanji: '駅とデパートの間にカフェがあります。', meaning: 'There is a café between the station and the department store.' },
  ],
  vocabulary: [],
  grammarPoints: [],
  exercises: [
    { id: 'l009-ex-01', type: 'multipleChoice', prompt: 'Which verb do you use for "there is a pen (inanimate)"?', options: ['います', 'あります', 'です', 'します'], correctAnswer: 'あります', explanation: 'あります = existence of inanimate objects. います = animate beings (people, animals).', difficulty: 'easy' },
    { id: 'l009-ex-02', type: 'fillBlank', prompt: 'Fill in: つくえの ___ に ほんが あります。(There is a book ON the desk.)', sentence: 'つくえの ___ に ほんが あります。', options: ['うえ', 'した', 'なか', 'そと'], correctAnswer: 'うえ', explanation: 'うえ = above/on top. つくえの うえ = on the desk.', difficulty: 'easy' },
    { id: 'l009-ex-03', type: 'translation', prompt: 'Translate: "There is a park near the station."', correctAnswer: 'えきの ちかくに こうえんが あります。', alternativeAnswers: ['駅の近くに公園があります', 'えきのちかくにこうえんがあります'], explanation: 'えきの ちかく (near the station) + に + こうえん (park) + が + あります.', difficulty: 'easy' },
    { id: 'l009-ex-04', type: 'sentenceOrder', prompt: 'Arrange: カフェが / えきと / あいだに / デパートの / あります', words: ['えきと', 'デパートの', 'あいだに', 'カフェが', 'あります'], correctAnswer: 'えきと デパートの あいだに カフェが あります', explanation: 'Between the station and department store, there is a café. [N と N の あいだ に] [Subject が] [あります].', difficulty: 'medium' },
    { id: 'l009-ex-05', type: 'multipleChoice', prompt: 'How do you ask "Where is the library?"', options: ['としょかんは どこに ありますか。', 'どこは としょかんが ありますか。', 'としょかんに どこが ありますか。', 'どこが としょかんに ありますか。'], correctAnswer: 'としょかんは どこに ありますか。', explanation: 'When asking where something is: [Topic は] + どこに + ありますか。Topic marked with は (not が).', difficulty: 'medium' },
    { id: 'l009-ex-06', type: 'sentenceProduction', prompt: 'Describe: "There is a cat under the chair." (いす = chair, ねこ = cat — use います!)', correctAnswer: 'いすの したに ねこが います。', alternativeAnswers: ['椅子の下に猫がいます'], explanation: 'ねこ (cat) is animate → use います. いすの した (under the chair) + に + ねこが います.', difficulty: 'medium' },
  ],
}

export default lesson009
