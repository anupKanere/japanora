import type { LessonContent } from '@/types'

const lesson013: LessonContent = {
  id: 'n5-lesson-013',
  unitId: 'n5-unit-05',
  lessonNumber: 1,
  title: 'Family Members',
  titleJa: 'かぞくの ことば',
  description: 'Learn Japanese family vocabulary — the crucial distinction between in-group (humble) and out-group (respectful) terms.',
  estimatedMinutes: 30,
  objectives: [
    'Learn all core family terms for N5',
    'Understand in-group (謙譲語) vs out-group (尊敬語) family terms',
    'Introduce your own family members correctly',
    'Ask about someone else\'s family politely',
    'Use います to describe family composition',
  ],
  pattern: '[Family member] は [Description] です',
  patternJa: '[かぞく] は [せつめい] です',
  grammarExplanation: `**Japanese family vocabulary has two sets:**

The word you use depends on WHOSE family you're talking about:
- **Your OWN family** → use HUMBLE (plain) terms
- **Someone ELSE'S family** → use RESPECTFUL (polite) terms

| Relationship | My family (humble) | Their family (respectful) |
|---|---|---|
| Father | ちち | おとうさん |
| Mother | はは | おかあさん |
| Older brother | あに | おにいさん |
| Older sister | あね | おねえさん |
| Younger brother | おとうと | おとうとさん |
| Younger sister | いもうと | いもうとさん |
| Husband | おっと/しゅじん | ごしゅじん |
| Wife | つま/かない | おくさん |
| Child | こども | おこさん |
| Grandfather | そふ | おじいさん |
| Grandmother | そぼ | おばあさん |

**Introducing your family:**
→ ちちは かいしゃいんです。(My father is a company worker.)
→ はははいしゃです。(My mother is a doctor.)`,
  notes: [
    'Using respectful terms (おとうさん) for your OWN family is incorrect in formal situations.',
    'In casual conversation, many people use おとうさん/おかあさん for their own parents.',
    'さん suffix with family terms = respectful. Never add さん to humble terms.',
  ],
  examples: [
    { hiragana: 'ちちは いしゃです。', kanji: '父は医者です。', meaning: 'My father is a doctor.' },
    { hiragana: 'おかあさんは にほんじんですか。', kanji: 'お母さんは日本人ですか。', meaning: 'Is your mother Japanese?' },
    { hiragana: 'あには とうきょうに すんで います。', kanji: '兄は東京に住んでいます。', meaning: 'My older brother lives in Tokyo.' },
    { hiragana: 'かぞくは ごにん います。', kanji: '家族は五人います。', meaning: 'There are five people in my family.' },
    { hiragana: 'いもうとは こうこうせいです。', kanji: '妹は高校生です。', meaning: 'My younger sister is a high school student.' },
  ],
  vocabulary: [],
  grammarPoints: [],
  exercises: [
    { id: 'l013-ex-01', type: 'multipleChoice', prompt: 'When talking about YOUR OWN father, which word do you use?', options: ['おとうさん', 'ちち', 'とうさん', 'おやじさん'], correctAnswer: 'ちち', explanation: 'ちち = humble/plain term for your own father. おとうさん = respectful term used for someone else\'s father.', difficulty: 'easy' },
    { id: 'l013-ex-02', type: 'multipleChoice', prompt: 'When asking about your FRIEND\'s mother, you say:', options: ['ははは どこですか', 'おかあさんは どこですか', 'おかあさんさんは どこですか', 'かあさんは どこですか'], correctAnswer: 'おかあさんは どこですか', explanation: 'When referring to someone else\'s family, use the respectful form: おかあさん (not はは).', difficulty: 'easy' },
    { id: 'l013-ex-03', type: 'fillBlank', prompt: 'Fill in: ___ は とうきょうに すんでいます。(My older brother lives in Tokyo.)', sentence: '___ は とうきょうに すんでいます。', options: ['おにいさん', 'あに', 'にいさん', 'おあに'], correctAnswer: 'あに', explanation: 'あに = humble term for your own older brother. Use this when talking about your own family.', difficulty: 'easy' },
    { id: 'l013-ex-04', type: 'translation', prompt: 'Introduce: "My mother is a teacher."', correctAnswer: 'ははは せんせいです。', alternativeAnswers: ['母は先生です', 'はははせんせいです'], explanation: 'はは (humble: my mother) + は + せんせいです (is a teacher).', difficulty: 'easy' },
    { id: 'l013-ex-05', type: 'sentenceOrder', prompt: 'Arrange: います / ごにん / かぞくは', words: ['かぞくは', 'ごにん', 'います'], correctAnswer: 'かぞくは ごにん います', explanation: 'My family has five people. Counter (ごにん) goes before います.', difficulty: 'medium' },
    { id: 'l013-ex-06', type: 'sentenceProduction', prompt: 'Ask politely: "Does your (friend\'s) older sister live in Japan?"', correctAnswer: 'おねえさんは にほんに すんでいますか。', alternativeAnswers: ['お姉さんは日本に住んでいますか', 'おねえさんはにほんにすんでいますか'], explanation: 'おねえさん (respectful: older sister) + は + にほんに (in Japan) + すんでいますか.', difficulty: 'medium' },
  ],
}

export default lesson013
