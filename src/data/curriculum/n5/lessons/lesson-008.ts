import type { LessonContent } from '@/types'

const lesson008: LessonContent = {
  id: 'n5-lesson-008',
  unitId: 'n5-unit-02',
  lessonNumber: 5,
  title: 'Wants & Desires: たいです',
  titleJa: 'きぼう (〜たい)',
  description: 'Express what you want to do using たいです, and learn invitations with ませんか and ましょう.',
  estimatedMinutes: 20,
  objectives: [
    'Form たいです from any verb to express personal desire',
    'Use たくないです for negative desire',
    'Invite someone using ませんか',
    'Propose doing something together with ましょう',
  ],
  pattern: '[Verb stem] + たいです / たくないです',
  patternJa: '[どうしのごかん] + たい',
  grammarExplanation: `**Expressing desire: たい**
Attach たい to the verb stem (same as ます form stem).
- いきます → いきたい (want to go)
- たべます → たべたい (want to eat)
- します → したい (want to do)

たい inflects like an い-adjective:
- Present: たいです
- Negative: たくないです (don't want to)
- Past: たかったです (wanted to)

The object can take either を or が with たい:
→ すしを/が たべたいです

**Invitations:**
- ませんか = Would you like to? (polite invitation)
- ましょう = Let's do it! (proposal)
- ましょうか = Shall we? (checking willingness)`,
  notes: [
    'たい only works for the speaker\'s own desires. Use たがっています for third person.',
    'が is slightly more natural than を when expressing strong personal desire with たい.',
    'Response to ませんか: ええ、ぜひ (Yes, with pleasure) or すみません、ちょっと... (polite refusal).',
  ],
  examples: [
    { hiragana: 'にほんに いきたいです。', kanji: '日本に行きたいです。', meaning: 'I want to go to Japan.' },
    { hiragana: 'なにを たべたいですか。', kanji: '何を食べたいですか。', meaning: 'What do you want to eat?' },
    { hiragana: 'きょうは べんきょうしたくないです。', kanji: '今日は勉強したくないです。', meaning: "I don't want to study today." },
    { hiragana: 'いっしょに えいがを みませんか。', kanji: '一緒に映画を見ませんか。', meaning: 'Would you like to watch a movie together?' },
    { hiragana: 'はじめましょう！', kanji: '始めましょう！', meaning: "Let's begin!" },
  ],
  vocabulary: [],
  grammarPoints: [],
  exercises: [
    { id: 'l008-ex-01', type: 'multipleChoice', prompt: 'How do you say "I want to eat sushi"?', options: ['すしが たべます', 'すしを たべたいです', 'すしを たべましょう', 'すしを たべませんか'], correctAnswer: 'すしを たべたいです', explanation: 'Verb stem (たべ) + たいです = want to eat. を or が can mark the object.', difficulty: 'easy' },
    { id: 'l008-ex-02', type: 'fillBlank', prompt: 'Fill in: きょうは べんきょう___です。(I don\'t want to study today.)', sentence: 'きょうは べんきょうし___です。', correctAnswer: 'たくない', explanation: 'したい (want to do) → negative: したくない + です.', difficulty: 'easy' },
    { id: 'l008-ex-03', type: 'translation', prompt: 'Invite a friend: "Would you like to go to a cafe together?"', correctAnswer: 'いっしょに カフェに いきませんか。', alternativeAnswers: ['一緒にカフェに行きませんか', 'いっしょにかふぇにいきませんか'], explanation: 'いっしょに (together) + カフェに (to cafe) + いきませんか (would you like to go?).', difficulty: 'medium' },
    { id: 'l008-ex-04', type: 'multipleChoice', prompt: 'What is the difference between ませんか and ましょう?', options: ['No difference', 'ませんか invites; ましょう proposes/affirms', 'ましょう is more polite', 'ましょう is only for food'], correctAnswer: 'ませんか invites; ましょう proposes/affirms', explanation: 'ませんか is tentative (would you like to?); ましょう is more assertive (let\'s do it!).', difficulty: 'medium' },
    { id: 'l008-ex-05', type: 'sentenceProduction', prompt: 'Write: "I want to speak Japanese." (にほんごで はなす = speak in Japanese)', correctAnswer: 'にほんごで はなしたいです。', alternativeAnswers: ['日本語で話したいです', 'にほんごではなしたいです'], explanation: 'はなす (speak) → stem: はなし + たいです = want to speak. で marks the language used.', difficulty: 'medium' },
  ],
}

export default lesson008
