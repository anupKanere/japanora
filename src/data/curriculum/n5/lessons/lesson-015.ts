import type { LessonContent } from '@/types'

const lesson015: LessonContent = {
  id: 'n5-lesson-015',
  unitId: 'n5-unit-06',
  lessonNumber: 2,
  title: 'Telling the Time & Daily Schedule',
  titleJa: 'じかん と まいにちのせいかつ',
  description: 'Tell the time precisely, describe a daily schedule, and use time expressions with the particle に.',
  estimatedMinutes: 25,
  objectives: [
    'State the time using 〜じ and 〜ふん/ぷん',
    'Use 〜じはん for half past',
    'Use ごぜん/ごご for AM/PM',
    'Describe a daily schedule with time + に + verb',
    'Use から〜まで for time ranges',
    'Use days of the week, months, and dates correctly',
  ],
  pattern: '[Time] に [Verb]',
  patternJa: '[じかん] に [どうし]',
  grammarExplanation: `Telling time in Japanese combines hours (〜時 · ji) and minutes (〜分 · fun/pun).

**Clock Hours (1:00 to 12:00):**

| Time | Kanji | Hiragana | Special Reading Alert |
| :--- | :--- | :--- | :--- |
| 1:00 | 一時 | いちじ | Regular |
| 2:00 | 二時 | にじ | Regular |
| 3:00 | 三時 | さんじ | Regular |
| 4:00 | 四時 | よじ | ⚠️ Not よんじ or しじ! |
| 5:00 | 五時 | ごじ | Regular |
| 6:00 | 六時 | ろくじ | Regular |
| 7:00 | 七時 | しちじ | ⚠️ Commonly しちじ (not ななじ) |
| 8:00 | 八時 | はちじ | Regular |
| 9:00 | 九時 | くじ | ⚠️ Not きゅうじ! |
| 10:00 | 十時 | じゅうじ | Regular |
| 11:00 | 十一時 | じゅういちじ | Regular |
| 12:00 | 十二時 | じゅうにじ | Regular |

**Minutes & Half-Past (〜分 · ふん / ぷん):**
- 1 min: いっぷん / 2 mins: にふん / 3 mins: さんぷん / 4 mins: よんふん
- 5 mins: ごふん / 6 mins: ろっぷん / 7 mins: ななふん / 8 mins: はっぷん
- 9 mins: きゅうふん / 10 mins: じゅっぷん (or じっぷん)
- Half past (30 mins): **〜時半 (〜じはん)** (e.g. さんじはん = 3:30)

**Days of the Week (曜日 · Youbi):**

| Day | Kanji | Hiragana | Element / Meaning |
| :--- | :--- | :--- | :--- |
| Monday | 月曜日 | げつようび | Moon (月) |
| Tuesday | 火曜日 | かようび | Fire (火) |
| Wednesday | 水曜日 | すいようび | Water (水) |
| Thursday | 木曜日 | もくようび | Wood / Tree (木) |
| Friday | 金曜日 | きんようび | Gold / Metal (金) |
| Saturday | 土曜日 | どようび | Earth / Soil (土) |
| Sunday | 日曜日 | にちようび | Sun (日) |

**When to Use Particle に with Time:**
- Specific clock times or dates → **に is required**: ろくじ**に** おきます (I wake up at 6:00)
- Relative time words → **NO に**: まいにち (every day), きのう (yesterday), きょう (today), あした (tomorrow)`,
  notes: [
    'ふん vs ぷん: 1、6、8、10分 use ぷん; 2、4、5、7、9分 use ふん; 3分 = さんぷん.',
    'Relative time words (きのう、あした、まいにち) NEVER take に.',
    'Specific clock times and calendar dates DO take に.',
    'なんじ = what time, なんぷん = what minute.',
  ],
  examples: [
    { hiragana: 'まいにち ろくじに おきます。', kanji: '毎日六時に起きます。', meaning: 'I wake up at 6 every day.', breakdown: [{ segment: 'まいにち', meaning: 'every day (no に)', role: 'time' }, { segment: 'ろくじに', meaning: 'at 6 o\'clock', role: 'time' }, { segment: 'おきます', meaning: 'wake up', role: 'verb' }] },
    { hiragana: 'じゅぎょうは くじはんから じゅういちじまで です。', kanji: '授業は九時半から十一時までです。', meaning: 'Class is from 9:30 to 11:00.' },
    { hiragana: 'ごご にじに ともだちに あいます。', kanji: '午後二時に友達に会います。', meaning: 'I meet a friend at 2:00 PM.' },
    { hiragana: 'いま なんじですか。ごぜん じゅうじ じゅうごふんです。', kanji: '今何時ですか。午前十時十五分です。', meaning: 'What time is it now? It is 10:15 AM.' },
    { hiragana: 'もくようびに しけんが あります。', kanji: '木曜日に試験があります。', meaning: 'There is an exam on Thursday.' },
  ],
  vocabulary: [],
  grammarPoints: [],
  exercises: [
    { id: 'l015-ex-01', type: 'multipleChoice', prompt: 'How do you say 3:30?', options: ['さんじじゅっぷん', 'さんじはん', 'さんじごじゅっぷん', 'さんじさんじゅうぷん'], correctAnswer: 'さんじはん', explanation: 'はん = half (30 minutes). さんじはん = 3:30. You can also say さんじさんじゅっぷん.', difficulty: 'easy' },
    { id: 'l015-ex-02', type: 'fillBlank', prompt: 'Fill in: まいにち しちじ ___ おきます。(I wake up at 7 every day.)', sentence: 'まいにち しちじ ___ おきます。', options: ['に', 'は', 'を', 'で'], correctAnswer: 'に', explanation: 'Specific time (しちじ = 7 o\'clock) requires particle に. Note: まいにち (every day) does NOT take に.', difficulty: 'easy' },
    { id: 'l015-ex-03', type: 'multipleChoice', prompt: 'What time is ごご さんじ?', options: ['3:00 AM', '3:00 PM', '13:00', 'No such expression'], correctAnswer: '3:00 PM', explanation: 'ごご = afternoon/PM. ごご さんじ = 3:00 PM.', difficulty: 'easy' },
    { id: 'l015-ex-04', type: 'translation', prompt: 'Translate: "Class starts at 9 AM and ends at noon."', correctAnswer: 'じゅぎょうは ごぜん くじから じゅうにじまで です。', alternativeAnswers: ['授業は午前九時から十二時までです', 'じゅぎょうはごぜんくじからじゅうにじまでです'], explanation: 'ごぜん くじ (9 AM) + から (from) + じゅうにじ (12 o\'clock) + まで (until) + です.', difficulty: 'medium' },
    { id: 'l015-ex-05', type: 'multipleChoice', prompt: 'Which sentence is WRONG?', options: ['くじに おきます', 'きのうに えいがを みました', 'どようびに かいものします', 'はちじに ねます'], correctAnswer: 'きのうに えいがを みました', explanation: 'きのう (yesterday) is a relative time word and does NOT take に. Say: きのう えいがを みました (no に).', difficulty: 'medium' },
    { id: 'l015-ex-06', type: 'sentenceProduction', prompt: 'Write your morning routine: "I wake up at 6:30, and eat breakfast at 7."', correctAnswer: 'ろくじはんに おきて、しちじに あさごはんを たべます。', alternativeAnswers: ['六時半に起きて、七時に朝ご飯を食べます', 'ろくじはんにおきて、しちじにあさごはんをたべます'], explanation: 'ろくじはん (6:30) + に + おきて (wake up, て form) + しちじに (at 7) + あさごはんを たべます (eat breakfast).', difficulty: 'hard' },
  ],
}

export default lesson015
