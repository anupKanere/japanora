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
  grammarExplanation: `**Telling the time:**
Hours: 〜じ (o'clock)
- いちじ(1:00) / にじ(2:00) / さんじ(3:00) / よじ(4:00) / ごじ(5:00)
- ろくじ(6:00) / しちじ(7:00) / はちじ(8:00) / くじ(9:00)
- じゅうじ(10:00) / じゅういちじ(11:00) / じゅうにじ(12:00)

Minutes: 〜ふん / 〜ぷん (sound change!)
- いっぷん(1分) / にふん(2分) / さんぷん(3分) / よんふん(4分)
- ごふん(5分) / ろっぷん(6分) / ななふん(7分) / はっぷん(8分)
- きゅうふん(9分) / じゅっぷん/じっぷん(10分)

Half past: 〜じはん (e.g. さんじはん = 3:30)

AM/PM: ごぜん (AM) / ごご (PM)
→ ごぜん はちじ = 8:00 AM
→ ごご さんじ じゅうごふん = 3:15 PM

**Days of the week:**
にちようび(日) / げつようび(月) / かようび(火) / すいようび(水)
もくようび(木) / きんようび(金) / どようび(土)

**Months:** いちがつ〜じゅうにがつ (Jan–Dec)
**Dates:** ついたち(1日), ふつか(2日), みっか(3日)…はつか(20日)…

**Time particle に:**
Specific time → に is required: ろくじに おきます
Relative time → に is NOT used: まいにち / きのう / あした + NO に`,
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
