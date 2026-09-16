import type { LessonContent } from '@/types'

const lesson011: LessonContent = {
  id: 'n5-lesson-011',
  unitId: 'n5-unit-04',
  lessonNumber: 1,
  title: 'い-Adjectives',
  titleJa: 'いけいようし',
  description: 'Learn to conjugate い-adjectives in all four forms: present, negative, past, and past negative.',
  estimatedMinutes: 30,
  objectives: [
    'Conjugate い-adjectives in present, negative, past, past negative',
    'Use い-adjectives to modify nouns directly',
    'Handle the exception: いい → よ for conjugation',
    'Use adverbs formed from adjectives (〜く)',
  ],
  pattern: 'い-adj root + い/くない/かった/くなかった',
  patternJa: 'いけいようし',
  grammarExplanation: `**い-adjectives** end in い and inflect directly without need for the copula.

**Four essential forms:**
| Form | Suffix | Example (さむい = cold) |
|------|--------|------------------------|
| Present (pos) | い | さむい / さむいです |
| Present (neg) | くない | さむくない / さむくないです |
| Past (pos) | かった | さむかった / さむかったです |
| Past (neg) | くなかった | さむくなかった / さむくなかったです |

**Exception — いい (good):**
All forms use よ- not い-:
- Negative: よくない (not: いくない ✗)
- Past: よかった (not: いかった ✗)
- Past neg: よくなかった

**Modifying nouns:**
い-adjectives go directly before the noun:
→ おおきい いぬ = big dog
→ たかい やま = tall mountain

**Adverb form:**
Change い to く:
→ はやい → はやく (quickly)
→ やさしい → やさしく (gently)`,
  notes: [
    'い-adjectives NEVER use な when directly modifying a noun.',
    'きれい (pretty) and きらい (dislike) look like い-adjectives but are な-adjectives!',
    'The polite です is optional at the end: さむいです (polite) / さむい (casual).',
  ],
  examples: [
    { hiragana: 'このほんは おもしろい。', meaning: 'This book is interesting.' },
    { hiragana: 'きのうは さむかったです。', kanji: '昨日は寒かったです。', meaning: 'Yesterday was cold.' },
    { hiragana: 'この りんごは あまくない。', kanji: 'このりんごは甘くない。', meaning: 'This apple is not sweet.' },
    { hiragana: 'このえいがは おもしろくなかったです。', kanji: 'この映画は面白くなかったです。', meaning: 'This movie was not interesting.' },
    { hiragana: 'いい てんきですね。', kanji: 'いい天気ですね。', meaning: "It's nice weather, isn't it!" },
    { hiragana: 'はやく はしって ください。', kanji: 'はやく走ってください。', meaning: 'Please run quickly. (adverb form)' },
  ],
  vocabulary: [],
  grammarPoints: [],
  exercises: [
    { id: 'l011-ex-01', type: 'multipleChoice', prompt: 'What is the past form of さむい (cold)?', options: ['さむくない', 'さむかった', 'さむいだった', 'さむです'], correctAnswer: 'さむかった', explanation: 'い-adj past: drop い, add かった → さむかった. Never add だった to い-adjectives!', difficulty: 'easy' },
    { id: 'l011-ex-02', type: 'fillBlank', prompt: 'Fill in: いい → past form: ___', sentence: 'いい → past form: ___', correctAnswer: 'よかった', explanation: 'いい is exceptional — all forms use よ: よかった (past), よくない (neg), よくなかった (past neg).', difficulty: 'medium' },
    { id: 'l011-ex-03', type: 'multipleChoice', prompt: 'Which is CORRECT? (this restaurant is not expensive)', options: ['このレストランは たかいじゃないです', 'このレストランは たかくないです', 'このレストランは たかないです', 'このレストランは たかくありません'], correctAnswer: 'このレストランは たかくないです', explanation: 'い-adj negative: drop い, add くない(です). Use たかくない/たかくないです, NOT じゃない.', difficulty: 'medium' },
    { id: 'l011-ex-04', type: 'translation', prompt: 'Translate: "The test was not difficult." (むずかしい = difficult)', correctAnswer: 'テストは むずかしくなかったです。', alternativeAnswers: ['テストはむずかしくなかった', 'テストは難しくなかったです'], explanation: 'むずかしい → past negative: むずかしくなかった + です.', difficulty: 'medium' },
    { id: 'l011-ex-05', type: 'fillBlank', prompt: 'Convert to adverb: はやい (fast) → ___ はしります', sentence: '___ はしります', correctAnswer: 'はやく', explanation: 'い-adj adverb: drop い, add く → はやく. Meaning: run quickly.', difficulty: 'easy' },
    { id: 'l011-ex-06', type: 'sentenceOrder', prompt: 'Arrange: おおきい / います / こうえんに / いぬが', words: ['こうえんに', 'おおきい', 'いぬが', 'います'], correctAnswer: 'こうえんに おおきい いぬが います', explanation: 'In the park, there is a big dog. い-adj (おおきい) goes directly before the noun (いぬ).', difficulty: 'medium' },
    { id: 'l011-ex-07', type: 'sentenceProduction', prompt: 'Describe yesterday\'s weather: "Yesterday it was hot and humid." (あつい = hot, むしあつい = humid)', correctAnswer: 'きのうは あつくて むしあつかったです。', alternativeAnswers: ['きのうはあつくてむしあつかったです', '昨日は暑くて蒸し暑かったです'], explanation: 'Connect two い-adj with て form (drop い → くて): あつくて + むしあつかった.', difficulty: 'hard' },
  ],
}

export default lesson011
