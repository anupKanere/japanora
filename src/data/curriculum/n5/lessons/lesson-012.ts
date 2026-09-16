import type { LessonContent } from '@/types'

const lesson012: LessonContent = {
  id: 'n5-lesson-012',
  unitId: 'n5-unit-04',
  lessonNumber: 2,
  title: 'な-Adjectives & Preferences',
  titleJa: 'なけいようし と すききらい',
  description: 'Learn な-adjectives, including すき and きらい, and use them to express preferences and describe things.',
  estimatedMinutes: 30,
  objectives: [
    'Identify な-adjectives and use them to describe nouns',
    'Conjugate な-adjectives through all forms using the copula',
    'Express likes and dislikes using すき and きらい',
    'Use とても、まあまあ、あまり to grade preferences',
    'Ask and answer about preferences',
  ],
  pattern: 'な-adj + な + Noun / な-adj + です',
  patternJa: 'なけいようし',
  grammarExplanation: `**な-adjectives** use the copula (です/だ) for inflection.

**Four forms:**
| Form | Pattern | Example (しずか = quiet) |
|------|---------|--------------------------|
| Present (pos) | + です | しずかです |
| Present (neg) | + じゃないです | しずかじゃないです |
| Past (pos) | + でした | しずかでした |
| Past (neg) | + じゃなかったです | しずかじゃなかったです |

**Modifying nouns — add な:**
→ しずかな まち = quiet town
→ きれいな はな = beautiful flower

**Important: Do NOT add な before です!**
✓ しずかです  ✗ しずかなです

**Tricky な-adjectives (look like い-adj but are な!):**
- きれい (pretty/clean)
- きらい (dislike)
- にぎやか (lively)
- たいせつ (important)

**Likes and dislikes:**
すき (like) and きらい (dislike) are な-adjectives.
Object takes が:
→ すしが すきです。(I like sushi.)
→ ピーマンが きらいです。(I dislike green peppers.)
→ にほんごが だいすきです！(I love Japanese!)`,
  notes: [
    'きれい ends in い but is a な-adjective — never say きれくない or きれかった.',
    'だいすき (love) and だいきらい (hate) use だい- prefix for emphasis.',
    'To ask preferences: なにが すきですか (what do you like?)',
  ],
  examples: [
    { hiragana: 'このまちは しずかです。', kanji: 'この町は静かです。', meaning: 'This town is quiet.' },
    { hiragana: 'しずかな としょかんで べんきょうします。', kanji: '静かな図書館で勉強します。', meaning: 'I study in the quiet library.' },
    { hiragana: 'にほんごが だいすきです！', kanji: '日本語が大好きです！', meaning: 'I love Japanese!' },
    { hiragana: 'にがいものが あまり すきじゃないです。', kanji: '苦いものがあまり好きじゃないです。', meaning: 'I don\'t really like bitter things.' },
    { hiragana: 'きれいな そらですね。', kanji: 'きれいな空ですね。', meaning: "It's a beautiful sky, isn't it." },
  ],
  vocabulary: [],
  grammarPoints: [],
  exercises: [
    { id: 'l012-ex-01', type: 'multipleChoice', prompt: 'How do you say "beautiful flower" (はな = flower)?', options: ['きれいい はな', 'きれいな はな', 'きれく はな', 'きれい はな'], correctAnswer: 'きれいな はな', explanation: 'きれい is a な-adjective. To modify a noun, add な: きれいな はな.', difficulty: 'easy' },
    { id: 'l012-ex-02', type: 'fillBlank', prompt: 'Fill in: わたしは ねこが ___。(I like cats.)', sentence: 'わたしは ねこが ___。', correctAnswer: 'すきです', explanation: 'すき is a な-adjective meaning "liked." Object marked with が: ねこが すきです.', difficulty: 'easy' },
    { id: 'l012-ex-03', type: 'multipleChoice', prompt: 'What is the past negative of しずか?', options: ['しずくなかった', 'しずかじゃなかった', 'しずかくなかった', 'しずかじゃないでした'], correctAnswer: 'しずかじゃなかった', explanation: 'な-adj past negative: じゃなかった(です). Never use くなかった for な-adjectives.', difficulty: 'medium' },
    { id: 'l012-ex-04', type: 'translation', prompt: 'Translate: "Japanese is important." (たいせつ = important)', correctAnswer: 'にほんごは たいせつです。', alternativeAnswers: ['日本語は大切です', 'にほんごはたいせつです'], explanation: 'たいせつ is a な-adjective. + です (not たいせつい or たいせつな).', difficulty: 'easy' },
    { id: 'l012-ex-05', type: 'sentenceProduction', prompt: 'Ask your friend: "What kind of food do you like?" (どんな = what kind)', correctAnswer: 'どんな たべものが すきですか。', alternativeAnswers: ['どんな食べ物が好きですか', 'どんなたべものがすきですか'], explanation: 'どんな (what kind of) + たべもの (food) + が すきですか (do you like?).', difficulty: 'medium' },
    { id: 'l012-ex-06', type: 'multipleChoice', prompt: 'Which word is a な-adjective (NOT an い-adjective)?', options: ['たかい', 'おもしろい', 'きれい', 'あたらしい'], correctAnswer: 'きれい', explanation: 'きれい looks like it ends in い but it is a な-adjective. All others (たかい、おもしろい、あたらしい) are genuine い-adjectives.', difficulty: 'hard' },
  ],
}

export default lesson012
