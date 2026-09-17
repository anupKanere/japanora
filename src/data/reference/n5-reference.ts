/**
 * N5 Complete Reference Data
 * All 12 tabs: Greetings, Body Parts, Days, Numbers, Clock,
 * Family (Own), Family (Others), WH Questions, Particles,
 * 110 Kanji, Adjectives, Verb Conjugation Chart
 */

// ─── 1. GREETINGS ─────────────────────────────────────────────────────────────

export type GreetingContext =
  | 'morning'
  | 'daytime'
  | 'evening'
  | 'night'
  | 'greeting'
  | 'farewell'
  | 'gratitude'
  | 'apology'
  | 'formal'
  | 'response'
  | 'celebration'
  | 'meeting'

export interface Greeting {
  hiragana: string
  kanji?: string
  romaji: string
  meaning: string
  context: GreetingContext
  note?: string
}

export const n5Greetings: Greeting[] = [
  // ── Morning / Time-based ──────────────────────────────────────────
  { hiragana: 'おはようございます', kanji: 'お早うございます', romaji: 'Ohayou gozaimasu', meaning: 'Good morning (polite)', context: 'morning' },
  { hiragana: 'おはよう', romaji: 'Ohayou', meaning: 'Good morning (casual)', context: 'morning', note: 'Used with close friends/family' },
  { hiragana: 'こんにちは', kanji: '今日は', romaji: 'Konnichiwa', meaning: 'Good afternoon / Hello', context: 'daytime' },
  { hiragana: 'こんばんは', kanji: '今晩は', romaji: 'Konbanwa', meaning: 'Good evening', context: 'evening' },
  { hiragana: 'おやすみなさい', kanji: 'お休みなさい', romaji: 'Oyasumi nasai', meaning: 'Good night (polite)', context: 'night' },
  { hiragana: 'おやすみ', kanji: 'お休み', romaji: 'Oyasumi', meaning: 'Good night (casual)', context: 'night' },

  // ── Greetings / Meetings ──────────────────────────────────────────
  { hiragana: 'はじめまして', kanji: '初めまして', romaji: 'Hajimemashite', meaning: 'Nice to meet you (first meeting)', context: 'meeting' },
  { hiragana: 'どうぞよろしくおねがいします', kanji: 'どうぞよろしくお願いします', romaji: 'Douzo yoroshiku onegaishimasu', meaning: 'Please treat me well / Nice to meet you', context: 'meeting' },
  { hiragana: 'よろしくおねがいします', kanji: 'よろしくお願いします', romaji: 'Yoroshiku onegaishimasu', meaning: 'Please treat me well (polite)', context: 'meeting' },
  { hiragana: 'よろしく', romaji: 'Yoroshiku', meaning: 'Nice to meet you (casual)', context: 'meeting' },
  { hiragana: 'おひさしぶりです', kanji: 'お久しぶりです', romaji: 'Ohisashiburi desu', meaning: 'Long time no see (polite)', context: 'greeting' },
  { hiragana: 'ひさしぶり', kanji: '久しぶり', romaji: 'Hisashiburi', meaning: 'Long time no see (casual)', context: 'greeting' },
  { hiragana: 'おげんきですか', kanji: 'お元気ですか', romaji: 'Ogenki desu ka', meaning: 'How are you?', context: 'greeting' },
  { hiragana: 'げんきです', kanji: '元気です', romaji: 'Genki desu', meaning: 'I am fine / I\'m well', context: 'response' },
  { hiragana: 'おかげさまで', romaji: 'Okage sama de', meaning: 'Thanks to you, I\'m doing well', context: 'response' },
  { hiragana: 'まあまあです', romaji: 'Maa maa desu', meaning: 'So-so / Not bad', context: 'response' },

  // ── Farewells ────────────────────────────────────────────────────
  { hiragana: 'さようなら', romaji: 'Sayounara', meaning: 'Goodbye (final/formal)', context: 'farewell', note: 'Used when parting for a long time' },
  { hiragana: 'じゃあ、また', romaji: 'Jaa, mata', meaning: 'See you later (casual)', context: 'farewell' },
  { hiragana: 'またね', romaji: 'Mata ne', meaning: 'See you again (casual)', context: 'farewell' },
  { hiragana: 'またあした', kanji: 'また明日', romaji: 'Mata ashita', meaning: 'See you tomorrow', context: 'farewell' },
  { hiragana: 'いってきます', kanji: '行ってきます', romaji: 'Ittekimasu', meaning: 'I\'m leaving (said when leaving home)', context: 'farewell' },
  { hiragana: 'いってらっしゃい', kanji: '行ってらっしゃい', romaji: 'Itterasshai', meaning: 'Take care / Have a good trip (response to ittekimasu)', context: 'farewell' },
  { hiragana: 'ただいま', romaji: 'Tadaima', meaning: 'I\'m home (said when returning)', context: 'greeting' },
  { hiragana: 'おかえりなさい', kanji: 'お帰りなさい', romaji: 'Okaerinasai', meaning: 'Welcome home (response to tadaima)', context: 'response' },
  { hiragana: 'しつれいします', kanji: '失礼します', romaji: 'Shitsurei shimasu', meaning: 'Excuse me / I\'m sorry to intrude (formal)', context: 'formal' },
  { hiragana: 'おさきにしつれいします', kanji: 'お先に失礼します', romaji: 'Osaki ni shitsurei shimasu', meaning: 'Excuse me for leaving first (office farewell)', context: 'formal' },

  // ── Gratitude ────────────────────────────────────────────────────
  { hiragana: 'ありがとうございます', romaji: 'Arigatou gozaimasu', meaning: 'Thank you very much (polite)', context: 'gratitude' },
  { hiragana: 'ありがとう', romaji: 'Arigatou', meaning: 'Thank you (casual)', context: 'gratitude' },
  { hiragana: 'どうもありがとうございます', romaji: 'Doumo arigatou gozaimasu', meaning: 'Thank you very much (very polite)', context: 'gratitude' },
  { hiragana: 'どうも', romaji: 'Doumo', meaning: 'Thanks (very casual)', context: 'gratitude' },
  { hiragana: 'どういたしまして', romaji: 'Dou itashimashite', meaning: 'You\'re welcome', context: 'response' },

  // ── Apologies ────────────────────────────────────────────────────
  { hiragana: 'すみません', romaji: 'Sumimasen', meaning: 'Excuse me / I\'m sorry (general)', context: 'apology' },
  { hiragana: 'もうしわけありません', kanji: '申し訳ありません', romaji: 'Moushiwake arimasen', meaning: 'I\'m truly sorry (very formal)', context: 'apology' },
  { hiragana: 'ごめんなさい', romaji: 'Gomen nasai', meaning: 'I\'m sorry (personal apology)', context: 'apology' },
  { hiragana: 'ごめん', romaji: 'Gomen', meaning: 'Sorry (casual)', context: 'apology' },
  { hiragana: 'だいじょうぶです', kanji: '大丈夫です', romaji: 'Daijoubu desu', meaning: 'It\'s okay / No problem', context: 'response' },

  // ── Food / Before & After Eating ──────────────────────────────────
  { hiragana: 'いただきます', romaji: 'Itadakimasu', meaning: 'Let\'s eat / Thank you for the food (before eating)', context: 'greeting', note: 'Said before every meal' },
  { hiragana: 'ごちそうさまでした', kanji: 'ご馳走様でした', romaji: 'Gochisousama deshita', meaning: 'Thank you for the meal (after eating)', context: 'gratitude' },

  // ── Celebrations / Other ──────────────────────────────────────────
  { hiragana: 'おめでとうございます', kanji: 'おめでとうございます', romaji: 'Omedetou gozaimasu', meaning: 'Congratulations (polite)', context: 'celebration' },
  { hiragana: 'おめでとう', romaji: 'Omedetou', meaning: 'Congratulations (casual)', context: 'celebration' },
  { hiragana: 'あけましておめでとうございます', kanji: '明けましておめでとうございます', romaji: 'Akemashite omedetou gozaimasu', meaning: 'Happy New Year', context: 'celebration' },
  { hiragana: 'どうぞ', romaji: 'Douzo', meaning: 'Please go ahead / Here you go', context: 'formal' },
  { hiragana: 'はい', romaji: 'Hai', meaning: 'Yes', context: 'response' },
  { hiragana: 'いいえ', romaji: 'Iie', meaning: 'No', context: 'response' },
  { hiragana: 'わかりました', kanji: '分かりました', romaji: 'Wakarimashita', meaning: 'I understand / Got it', context: 'response' },
  { hiragana: 'わかりません', kanji: '分かりません', romaji: 'Wakarimasen', meaning: 'I don\'t understand', context: 'response' },
]

// ─── 2. BODY PARTS ─────────────────────────────────────────────────────────

export interface BodyPart {
  hiragana: string
  kanji?: string
  romaji: string
  meaning: string
  region: 'head' | 'face' | 'upper-body' | 'lower-body' | 'hand' | 'internal'
}

export const n5BodyParts: BodyPart[] = [
  // Head
  { hiragana: 'あたま', kanji: '頭', romaji: 'atama', meaning: 'head', region: 'head' },
  { hiragana: 'かみ', kanji: '髪', romaji: 'kami', meaning: 'hair', region: 'head' },
  { hiragana: 'かお', kanji: '顔', romaji: 'kao', meaning: 'face', region: 'head' },
  { hiragana: 'ひたい', kanji: '額', romaji: 'hitai', meaning: 'forehead', region: 'face' },
  // Face
  { hiragana: 'め', kanji: '目', romaji: 'me', meaning: 'eye', region: 'face' },
  { hiragana: 'まゆげ', kanji: '眉毛', romaji: 'mayuge', meaning: 'eyebrow', region: 'face' },
  { hiragana: 'まつげ', kanji: '睫毛', romaji: 'matsuge', meaning: 'eyelash', region: 'face' },
  { hiragana: 'みみ', kanji: '耳', romaji: 'mimi', meaning: 'ear', region: 'face' },
  { hiragana: 'はな', kanji: '鼻', romaji: 'hana', meaning: 'nose', region: 'face' },
  { hiragana: 'くち', kanji: '口', romaji: 'kuchi', meaning: 'mouth', region: 'face' },
  { hiragana: 'くちびる', kanji: '唇', romaji: 'kuchibiru', meaning: 'lips', region: 'face' },
  { hiragana: 'は', kanji: '歯', romaji: 'ha', meaning: 'tooth / teeth', region: 'face' },
  { hiragana: 'した', kanji: '舌', romaji: 'shita', meaning: 'tongue', region: 'face' },
  { hiragana: 'あご', kanji: '顎', romaji: 'ago', meaning: 'jaw / chin', region: 'face' },
  { hiragana: 'ほほ', kanji: '頬', romaji: 'hoho', meaning: 'cheek', region: 'face' },
  { hiragana: 'くび', kanji: '首', romaji: 'kubi', meaning: 'neck', region: 'head' },
  // Upper body
  { hiragana: 'かた', kanji: '肩', romaji: 'kata', meaning: 'shoulder', region: 'upper-body' },
  { hiragana: 'むね', kanji: '胸', romaji: 'mune', meaning: 'chest', region: 'upper-body' },
  { hiragana: 'おなか', kanji: 'お腹', romaji: 'onaka', meaning: 'stomach / belly', region: 'upper-body' },
  { hiragana: 'せなか', kanji: '背中', romaji: 'senaka', meaning: 'back', region: 'upper-body' },
  { hiragana: 'こし', kanji: '腰', romaji: 'koshi', meaning: 'waist / lower back', region: 'upper-body' },
  { hiragana: 'うで', kanji: '腕', romaji: 'ude', meaning: 'arm', region: 'upper-body' },
  { hiragana: 'ひじ', kanji: '肘', romaji: 'hiji', meaning: 'elbow', region: 'upper-body' },
  // Hand
  { hiragana: 'て', kanji: '手', romaji: 'te', meaning: 'hand', region: 'hand' },
  { hiragana: 'てくび', kanji: '手首', romaji: 'tekubi', meaning: 'wrist', region: 'hand' },
  { hiragana: 'ゆび', kanji: '指', romaji: 'yubi', meaning: 'finger', region: 'hand' },
  { hiragana: 'つめ', kanji: '爪', romaji: 'tsume', meaning: 'nail / fingernail', region: 'hand' },
  // Lower body
  { hiragana: 'あし', kanji: '足', romaji: 'ashi', meaning: 'leg / foot', region: 'lower-body' },
  { hiragana: 'もも', kanji: '腿', romaji: 'momo', meaning: 'thigh', region: 'lower-body' },
  { hiragana: 'ひざ', kanji: '膝', romaji: 'hiza', meaning: 'knee', region: 'lower-body' },
  { hiragana: 'すね', kanji: '脛', romaji: 'sune', meaning: 'shin', region: 'lower-body' },
  { hiragana: 'くるぶし', kanji: '踝', romaji: 'kurubushi', meaning: 'ankle', region: 'lower-body' },
  { hiragana: 'かかと', kanji: '踵', romaji: 'kakato', meaning: 'heel', region: 'lower-body' },
  { hiragana: 'あしのゆび', kanji: '足の指', romaji: 'ashi no yubi', meaning: 'toe', region: 'lower-body' },
  // Internal
  { hiragana: 'こころ', kanji: '心', romaji: 'kokoro', meaning: 'heart / mind (emotional)', region: 'internal' },
  { hiragana: 'のど', kanji: '喉', romaji: 'nodo', meaning: 'throat', region: 'internal' },
  { hiragana: 'かわ', kanji: '皮膚', romaji: 'hifu', meaning: 'skin', region: 'internal' },
]

// ─── 3. DAYS OF THE WEEK ────────────────────────────────────────────────────

export interface DayOfWeek {
  hiragana: string
  kanji: string
  romaji: string
  meaning: string
  element: string
  dayNumber: number
}

export const n5DaysOfWeek: DayOfWeek[] = [
  { dayNumber: 1, hiragana: 'にちようび', kanji: '日曜日', romaji: 'Nichiyoubi', meaning: 'Sunday', element: '日 (Sun)' },
  { dayNumber: 2, hiragana: 'げつようび', kanji: '月曜日', romaji: 'Getsuyoubi', meaning: 'Monday', element: '月 (Moon)' },
  { dayNumber: 3, hiragana: 'かようび', kanji: '火曜日', romaji: 'Kayoubi', meaning: 'Tuesday', element: '火 (Fire)' },
  { dayNumber: 4, hiragana: 'すいようび', kanji: '水曜日', romaji: 'Suiyoubi', meaning: 'Wednesday', element: '水 (Water)' },
  { dayNumber: 5, hiragana: 'もくようび', kanji: '木曜日', romaji: 'Mokuyoubi', meaning: 'Thursday', element: '木 (Wood/Tree)' },
  { dayNumber: 6, hiragana: 'きんようび', kanji: '金曜日', romaji: 'Kinyoubi', meaning: 'Friday', element: '金 (Gold/Metal)' },
  { dayNumber: 7, hiragana: 'どようび', kanji: '土曜日', romaji: 'Doyoubi', meaning: 'Saturday', element: '土 (Earth)' },
]

export const n5DateWords = [
  { hiragana: 'きょう', kanji: '今日', romaji: 'kyou', meaning: 'today' },
  { hiragana: 'きのう', kanji: '昨日', romaji: 'kinou', meaning: 'yesterday' },
  { hiragana: 'あした', kanji: '明日', romaji: 'ashita', meaning: 'tomorrow' },
  { hiragana: 'おとつい', kanji: '一昨日', romaji: 'ototoi', meaning: 'day before yesterday' },
  { hiragana: 'あさって', kanji: '明後日', romaji: 'asatte', meaning: 'day after tomorrow' },
  { hiragana: 'まいにち', kanji: '毎日', romaji: 'mainichi', meaning: 'every day' },
  { hiragana: 'こんしゅう', kanji: '今週', romaji: 'konshuu', meaning: 'this week' },
  { hiragana: 'せんしゅう', kanji: '先週', romaji: 'senshuu', meaning: 'last week' },
  { hiragana: 'らいしゅう', kanji: '来週', romaji: 'raishuu', meaning: 'next week' },
  { hiragana: 'しゅうまつ', kanji: '週末', romaji: 'shuumatsu', meaning: 'weekend' },
  { hiragana: 'へいじつ', kanji: '平日', romaji: 'heijitsu', meaning: 'weekday' },
]

// ─── 4. NUMBERS ─────────────────────────────────────────────────────────────

export interface NumberEntry {
  value: number
  hiragana: string
  kanji?: string
  romaji: string
  note?: string
}

export const n5Numbers: NumberEntry[] = [
  { value: 0, hiragana: 'ぜろ / れい', romaji: 'zero / rei', note: 'Both readings used' },
  { value: 1, hiragana: 'いち', kanji: '一', romaji: 'ichi' },
  { value: 2, hiragana: 'に', kanji: '二', romaji: 'ni' },
  { value: 3, hiragana: 'さん', kanji: '三', romaji: 'san' },
  { value: 4, hiragana: 'し / よん', kanji: '四', romaji: 'shi / yon', note: 'し (shi) avoided as it sounds like 死 (death); よん preferred' },
  { value: 5, hiragana: 'ご', kanji: '五', romaji: 'go' },
  { value: 6, hiragana: 'ろく', kanji: '六', romaji: 'roku' },
  { value: 7, hiragana: 'しち / なな', kanji: '七', romaji: 'shichi / nana', note: 'なな often preferred to avoid confusion with いち' },
  { value: 8, hiragana: 'はち', kanji: '八', romaji: 'hachi' },
  { value: 9, hiragana: 'きゅう / く', kanji: '九', romaji: 'kyuu / ku', note: 'く (ku) avoided as it sounds like 苦 (suffering)' },
  { value: 10, hiragana: 'じゅう', kanji: '十', romaji: 'juu' },
  { value: 11, hiragana: 'じゅういち', kanji: '十一', romaji: 'juu-ichi' },
  { value: 12, hiragana: 'じゅうに', kanji: '十二', romaji: 'juu-ni' },
  { value: 13, hiragana: 'じゅうさん', kanji: '十三', romaji: 'juu-san' },
  { value: 14, hiragana: 'じゅうし / じゅうよん', kanji: '十四', romaji: 'juu-shi / juu-yon' },
  { value: 15, hiragana: 'じゅうご', kanji: '十五', romaji: 'juu-go' },
  { value: 16, hiragana: 'じゅうろく', kanji: '十六', romaji: 'juu-roku' },
  { value: 17, hiragana: 'じゅうしち / じゅうなな', kanji: '十七', romaji: 'juu-shichi / juu-nana' },
  { value: 18, hiragana: 'じゅうはち', kanji: '十八', romaji: 'juu-hachi' },
  { value: 19, hiragana: 'じゅうきゅう / じゅうく', kanji: '十九', romaji: 'juu-kyuu / juu-ku' },
  { value: 20, hiragana: 'にじゅう', kanji: '二十', romaji: 'ni-juu' },
  { value: 30, hiragana: 'さんじゅう', kanji: '三十', romaji: 'san-juu' },
  { value: 40, hiragana: 'よんじゅう', kanji: '四十', romaji: 'yon-juu' },
  { value: 50, hiragana: 'ごじゅう', kanji: '五十', romaji: 'go-juu' },
  { value: 60, hiragana: 'ろくじゅう', kanji: '六十', romaji: 'roku-juu' },
  { value: 70, hiragana: 'ななじゅう', kanji: '七十', romaji: 'nana-juu' },
  { value: 80, hiragana: 'はちじゅう', kanji: '八十', romaji: 'hachi-juu' },
  { value: 90, hiragana: 'きゅうじゅう', kanji: '九十', romaji: 'kyuu-juu' },
  { value: 100, hiragana: 'ひゃく', kanji: '百', romaji: 'hyaku' },
  { value: 200, hiragana: 'にひゃく', kanji: '二百', romaji: 'ni-hyaku' },
  { value: 300, hiragana: 'さんびゃく', kanji: '三百', romaji: 'san-byaku', note: 'Rendaku: びゃく' },
  { value: 400, hiragana: 'よんひゃく', kanji: '四百', romaji: 'yon-hyaku' },
  { value: 500, hiragana: 'ごひゃく', kanji: '五百', romaji: 'go-hyaku' },
  { value: 600, hiragana: 'ろっぴゃく', kanji: '六百', romaji: 'roppyaku', note: 'Rendaku: っぴゃく' },
  { value: 700, hiragana: 'ななひゃく', kanji: '七百', romaji: 'nana-hyaku' },
  { value: 800, hiragana: 'はっぴゃく', kanji: '八百', romaji: 'happyaku', note: 'Rendaku: っぴゃく' },
  { value: 900, hiragana: 'きゅうひゃく', kanji: '九百', romaji: 'kyuu-hyaku' },
  { value: 1000, hiragana: 'せん', kanji: '千', romaji: 'sen' },
  { value: 2000, hiragana: 'にせん', kanji: '二千', romaji: 'ni-sen' },
  { value: 3000, hiragana: 'さんぜん', kanji: '三千', romaji: 'san-zen', note: 'Rendaku: ぜん' },
  { value: 4000, hiragana: 'よんせん', kanji: '四千', romaji: 'yon-sen' },
  { value: 5000, hiragana: 'ごせん', kanji: '五千', romaji: 'go-sen' },
  { value: 6000, hiragana: 'ろくせん', kanji: '六千', romaji: 'roku-sen' },
  { value: 7000, hiragana: 'ななせん', kanji: '七千', romaji: 'nana-sen' },
  { value: 8000, hiragana: 'はっせん', kanji: '八千', romaji: 'hassen', note: 'Rendaku: っせん' },
  { value: 9000, hiragana: 'きゅうせん', kanji: '九千', romaji: 'kyuu-sen' },
  { value: 10000, hiragana: 'いちまん', kanji: '一万', romaji: 'ichi-man' },
]

// ─── 5. CLOCK / TIME ─────────────────────────────────────────────────────────

export interface ClockHour {
  hour: number
  hiragana: string
  kanji: string
  romaji: string
}

export interface ClockMinute {
  minute: number
  hiragana: string
  kanji: string
  romaji: string
  note?: string
}

export const n5ClockHours: ClockHour[] = [
  { hour: 1, hiragana: 'いちじ', kanji: '一時', romaji: 'ichi-ji' },
  { hour: 2, hiragana: 'にじ', kanji: '二時', romaji: 'ni-ji' },
  { hour: 3, hiragana: 'さんじ', kanji: '三時', romaji: 'san-ji' },
  { hour: 4, hiragana: 'よじ', kanji: '四時', romaji: 'yo-ji', },
  { hour: 5, hiragana: 'ごじ', kanji: '五時', romaji: 'go-ji' },
  { hour: 6, hiragana: 'ろくじ', kanji: '六時', romaji: 'roku-ji' },
  { hour: 7, hiragana: 'しちじ', kanji: '七時', romaji: 'shichi-ji' },
  { hour: 8, hiragana: 'はちじ', kanji: '八時', romaji: 'hachi-ji' },
  { hour: 9, hiragana: 'くじ', kanji: '九時', romaji: 'ku-ji' },
  { hour: 10, hiragana: 'じゅうじ', kanji: '十時', romaji: 'juu-ji' },
  { hour: 11, hiragana: 'じゅういちじ', kanji: '十一時', romaji: 'juu-ichi-ji' },
  { hour: 12, hiragana: 'じゅうにじ', kanji: '十二時', romaji: 'juu-ni-ji' },
]

export const n5ClockMinutes: ClockMinute[] = [
  { minute: 1, hiragana: 'いっぷん', kanji: '一分', romaji: 'ippun', note: 'っぷ' },
  { minute: 2, hiragana: 'にふん', kanji: '二分', romaji: 'ni-fun' },
  { minute: 3, hiragana: 'さんぷん', kanji: '三分', romaji: 'san-pun', note: 'ぷ' },
  { minute: 4, hiragana: 'よんふん', kanji: '四分', romaji: 'yon-fun' },
  { minute: 5, hiragana: 'ごふん', kanji: '五分', romaji: 'go-fun' },
  { minute: 6, hiragana: 'ろっぷん', kanji: '六分', romaji: 'roppun', note: 'っぷ' },
  { minute: 7, hiragana: 'ななふん', kanji: '七分', romaji: 'nana-fun' },
  { minute: 8, hiragana: 'はっぷん', kanji: '八分', romaji: 'happun', note: 'っぷ' },
  { minute: 9, hiragana: 'きゅうふん', kanji: '九分', romaji: 'kyuu-fun' },
  { minute: 10, hiragana: 'じゅっぷん', kanji: '十分', romaji: 'juppun', note: 'っぷ' },
  { minute: 15, hiragana: 'じゅうごふん', kanji: '十五分', romaji: 'juugo-fun' },
  { minute: 20, hiragana: 'にじゅっぷん', kanji: '二十分', romaji: 'ni-juppun' },
  { minute: 25, hiragana: 'にじゅうごふん', kanji: '二十五分', romaji: 'nijuugo-fun' },
  { minute: 30, hiragana: 'さんじゅっぷん / はん', kanji: '三十分 / 半', romaji: 'sanjuppun / han', note: '半 (han) means "half"' },
  { minute: 45, hiragana: 'よんじゅうごふん', kanji: '四十五分', romaji: 'yonjuugo-fun' },
]

export const n5TimeWords = [
  { hiragana: 'ごぜん', kanji: '午前', romaji: 'gozen', meaning: 'AM / morning' },
  { hiragana: 'ごご', kanji: '午後', romaji: 'gogo', meaning: 'PM / afternoon' },
  { hiragana: 'まえ', kanji: '前', romaji: 'mae', meaning: 'before / ago' },
  { hiragana: 'すぎ', kanji: '過ぎ', romaji: 'sugi', meaning: 'past / after (the hour)' },
  { hiragana: 'はん', kanji: '半', romaji: 'han', meaning: 'half (past)' },
  { hiragana: 'いま', kanji: '今', romaji: 'ima', meaning: 'now' },
  { hiragana: 'なんじ', kanji: '何時', romaji: 'nanji', meaning: 'what time?' },
  { hiragana: 'なんぷん', kanji: '何分', romaji: 'nanpun', meaning: 'how many minutes?' },
  { hiragana: 'ちょうど', romaji: 'choudo', meaning: 'exactly (on the dot)' },
]

// ─── 6. FAMILY — OWN (Kenjougo / humble) ────────────────────────────────────

export interface FamilyMember {
  hiragana: string
  kanji?: string
  romaji: string
  meaning: string
  note?: string
}

export const n5FamilyOwn: FamilyMember[] = [
  { hiragana: 'ちち', kanji: '父', romaji: 'chichi', meaning: 'my father' },
  { hiragana: 'はは', kanji: '母', romaji: 'haha', meaning: 'my mother' },
  { hiragana: 'りょうしん', kanji: '両親', romaji: 'ryoushin', meaning: 'my parents' },
  { hiragana: 'あに', kanji: '兄', romaji: 'ani', meaning: 'my older brother' },
  { hiragana: 'あね', kanji: '姉', romaji: 'ane', meaning: 'my older sister' },
  { hiragana: 'おとうと', kanji: '弟', romaji: 'otouto', meaning: 'my younger brother' },
  { hiragana: 'いもうと', kanji: '妹', romaji: 'imouto', meaning: 'my younger sister' },
  { hiragana: 'そふ', kanji: '祖父', romaji: 'sofu', meaning: 'my grandfather' },
  { hiragana: 'そぼ', kanji: '祖母', romaji: 'sobo', meaning: 'my grandmother' },
  { hiragana: 'おじ', kanji: '叔父 / 伯父', romaji: 'oji', meaning: 'my uncle', note: '叔父 = younger, 伯父 = older than parent' },
  { hiragana: 'おば', kanji: '叔母 / 伯母', romaji: 'oba', meaning: 'my aunt', note: '叔母 = younger, 伯母 = older than parent' },
  { hiragana: 'おい', kanji: '甥', romaji: 'oi', meaning: 'my nephew' },
  { hiragana: 'めい', kanji: '姪', romaji: 'mei', meaning: 'my niece' },
  { hiragana: 'むすこ', kanji: '息子', romaji: 'musuko', meaning: 'my son' },
  { hiragana: 'むすめ', kanji: '娘', romaji: 'musume', meaning: 'my daughter' },
  { hiragana: 'しゅじん / おっと', kanji: '主人 / 夫', romaji: 'shujin / otto', meaning: 'my husband', note: '主人 is traditional; 夫 is more neutral' },
  { hiragana: 'かない / つま', kanji: '家内 / 妻', romaji: 'kanai / tsuma', meaning: 'my wife', note: '家内 is traditional; 妻 is more neutral' },
  { hiragana: 'かぞく', kanji: '家族', romaji: 'kazoku', meaning: 'my family' },
]

// ─── 7. FAMILY — OTHERS' (Sonkeigo / respectful) ──────────────────────────

export const n5FamilyOthers: FamilyMember[] = [
  { hiragana: 'おとうさん', kanji: 'お父さん', romaji: 'otousan', meaning: 'your/someone\'s father' },
  { hiragana: 'おかあさん', kanji: 'お母さん', romaji: 'okaasan', meaning: 'your/someone\'s mother' },
  { hiragana: 'ごりょうしん', kanji: 'ご両親', romaji: 'goryoushin', meaning: 'your/someone\'s parents' },
  { hiragana: 'おにいさん', kanji: 'お兄さん', romaji: 'oniisan', meaning: 'your/someone\'s older brother' },
  { hiragana: 'おねえさん', kanji: 'お姉さん', romaji: 'oneesan', meaning: 'your/someone\'s older sister' },
  { hiragana: 'おとうとさん', kanji: '弟さん', romaji: 'otoutosan', meaning: 'your/someone\'s younger brother' },
  { hiragana: 'いもうとさん', kanji: '妹さん', romaji: 'imoutosan', meaning: 'your/someone\'s younger sister' },
  { hiragana: 'おじいさん', kanji: 'お祖父さん', romaji: 'ojiisan', meaning: 'your/someone\'s grandfather' },
  { hiragana: 'おばあさん', kanji: 'お祖母さん', romaji: 'obaasan', meaning: 'your/someone\'s grandmother' },
  { hiragana: 'おじさん', kanji: '叔父さん / 伯父さん', romaji: 'ojisan', meaning: 'your/someone\'s uncle' },
  { hiragana: 'おばさん', kanji: '叔母さん / 伯母さん', romaji: 'obasan', meaning: 'your/someone\'s aunt' },
  { hiragana: 'おいごさん', kanji: '甥御さん', romaji: 'oigosan', meaning: 'your/someone\'s nephew' },
  { hiragana: 'めいごさん', kanji: '姪御さん', romaji: 'meigosan', meaning: 'your/someone\'s niece' },
  { hiragana: 'むすこさん', kanji: '息子さん', romaji: 'musukosan', meaning: 'your/someone\'s son' },
  { hiragana: 'おじょうさん', kanji: 'お嬢さん', romaji: 'ojousan', meaning: 'your/someone\'s daughter' },
  { hiragana: 'ごしゅじん', kanji: 'ご主人', romaji: 'goshujin', meaning: 'your/someone\'s husband' },
  { hiragana: 'おくさん', kanji: '奥さん', romaji: 'okusan', meaning: 'your/someone\'s wife' },
  { hiragana: 'ごかぞく', kanji: 'ご家族', romaji: 'gokazoku', meaning: 'your/someone\'s family' },
]

// ─── 8. WH QUESTIONS ────────────────────────────────────────────────────────

export interface WHQuestion {
  hiragana: string
  kanji?: string
  romaji: string
  meaning: string
  usage: string
  example: { japanese: string; meaning: string }
}

export const n5WHQuestions: WHQuestion[] = [
  {
    hiragana: 'なに / なん',
    kanji: '何',
    romaji: 'nani / nan',
    meaning: 'what',
    usage: 'なに before wa/ga/o; なん before desu/counters',
    example: { japanese: 'これはなんですか。', meaning: 'What is this?' },
  },
  {
    hiragana: 'どこ',
    romaji: 'doko',
    meaning: 'where',
    usage: 'Asking about location',
    example: { japanese: 'トイレはどこですか。', meaning: 'Where is the restroom?' },
  },
  {
    hiragana: 'だれ / どなた',
    kanji: '誰',
    romaji: 'dare / donata',
    meaning: 'who',
    usage: 'どなた is polite form',
    example: { japanese: 'あのひとはだれですか。', meaning: 'Who is that person?' },
  },
  {
    hiragana: 'いつ',
    romaji: 'itsu',
    meaning: 'when',
    usage: 'Asking about time',
    example: { japanese: 'たんじょうびはいつですか。', meaning: 'When is your birthday?' },
  },
  {
    hiragana: 'なぜ / どうして',
    kanji: '何故',
    romaji: 'naze / doushite',
    meaning: 'why',
    usage: 'どうして is softer/more common in speech',
    example: { japanese: 'どうしてないているんですか。', meaning: 'Why are you crying?' },
  },
  {
    hiragana: 'どう',
    romaji: 'dou',
    meaning: 'how (in what way)',
    usage: 'Asking about manner or state',
    example: { japanese: 'きょうはどうでしたか。', meaning: 'How was today?' },
  },
  {
    hiragana: 'どうやって',
    romaji: 'douyatte',
    meaning: 'how (by what method)',
    usage: 'Asking about method or means',
    example: { japanese: 'えきまでどうやっていきますか。', meaning: 'How do you get to the station?' },
  },
  {
    hiragana: 'いくら',
    romaji: 'ikura',
    meaning: 'how much (price)',
    usage: 'Asking about price / cost',
    example: { japanese: 'これはいくらですか。', meaning: 'How much is this?' },
  },
  {
    hiragana: 'いくつ',
    romaji: 'ikutsu',
    meaning: 'how many / how old',
    usage: 'Counting things without counters / asking age informally',
    example: { japanese: 'りんごはいくつありますか。', meaning: 'How many apples are there?' },
  },
  {
    hiragana: 'なんにん',
    kanji: '何人',
    romaji: 'nan-nin',
    meaning: 'how many people',
    usage: 'Asking about number of people',
    example: { japanese: 'かぞくはなんにんですか。', meaning: 'How many people are in your family?' },
  },
  {
    hiragana: 'なんさい',
    kanji: '何歳',
    romaji: 'nan-sai',
    meaning: 'how old',
    usage: 'Asking age',
    example: { japanese: 'おいくつですか。', meaning: 'How old are you? (polite)' },
  },
  {
    hiragana: 'なんじ',
    kanji: '何時',
    romaji: 'nan-ji',
    meaning: 'what time',
    usage: 'Asking the time',
    example: { japanese: 'いまなんじですか。', meaning: 'What time is it now?' },
  },
  {
    hiragana: 'どちら / どっち',
    romaji: 'dochira / docchi',
    meaning: 'which (of two) / which way',
    usage: 'どちら is polite; どっち is casual',
    example: { japanese: 'どちらがすきですか。', meaning: 'Which one do you like?' },
  },
  {
    hiragana: 'どれ',
    romaji: 'dore',
    meaning: 'which (of three or more)',
    usage: 'Choosing from multiple options',
    example: { japanese: 'どれがあなたのですか。', meaning: 'Which one is yours?' },
  },
  {
    hiragana: 'どんな',
    romaji: 'donna',
    meaning: 'what kind of',
    usage: 'Asking about the type or nature',
    example: { japanese: 'どんなたべものがすきですか。', meaning: 'What kind of food do you like?' },
  },
]

// ─── 9. PARTICLES ────────────────────────────────────────────────────────────

export interface Particle {
  particle: string
  romaji: string
  function: string
  structure: string
  examples: { japanese: string; meaning: string }[]
  note?: string
}

export const n5Particles: Particle[] = [
  {
    particle: 'は',
    romaji: 'wa',
    function: 'Topic marker',
    structure: '[Topic] は [Comment]',
    examples: [
      { japanese: 'わたしはがくせいです。', meaning: 'I am a student.' },
      { japanese: 'これはほんです。', meaning: 'This is a book.' },
    ],
    note: 'Pronounced "wa" not "ha" when used as a particle',
  },
  {
    particle: 'が',
    romaji: 'ga',
    function: 'Subject marker',
    structure: '[Subject] が [Predicate]',
    examples: [
      { japanese: 'ねこがいます。', meaning: 'There is a cat.' },
      { japanese: 'たなかさんがきました。', meaning: 'Tanaka-san came.' },
    ],
    note: 'Marks the grammatical subject; often emphasizes new info',
  },
  {
    particle: 'を',
    romaji: 'o',
    function: 'Direct object marker',
    structure: '[Object] を [Verb]',
    examples: [
      { japanese: 'ほんをよみます。', meaning: 'I read a book.' },
      { japanese: 'みずをのみます。', meaning: 'I drink water.' },
    ],
    note: 'Pronounced "o" not "wo"',
  },
  {
    particle: 'に',
    romaji: 'ni',
    function: 'Direction / Time / Location (existence)',
    structure: '[Place/Time] に',
    examples: [
      { japanese: 'がっこうにいきます。', meaning: 'I go to school.' },
      { japanese: 'さんじにおきます。', meaning: 'I wake up at 3 o\'clock.' },
      { japanese: 'つくえのうえにほんがあります。', meaning: 'There is a book on the desk.' },
    ],
  },
  {
    particle: 'で',
    romaji: 'de',
    function: 'Location of action / Means / Method',
    structure: '[Place] で [Action verb]; [Tool] で',
    examples: [
      { japanese: 'としょかんでべんきょうします。', meaning: 'I study at the library.' },
      { japanese: 'でんしゃできます。', meaning: 'I come by train.' },
    ],
  },
  {
    particle: 'の',
    romaji: 'no',
    function: 'Possessive / Noun modifier',
    structure: '[Noun1] の [Noun2]',
    examples: [
      { japanese: 'わたしのほん', meaning: 'my book' },
      { japanese: 'にほんのくるま', meaning: 'Japanese car' },
    ],
  },
  {
    particle: 'と',
    romaji: 'to',
    function: 'And (listing) / With (companion)',
    structure: '[A] と [B]; [Person] と',
    examples: [
      { japanese: 'パンとぎゅうにゅう', meaning: 'bread and milk' },
      { japanese: 'ともだちとえいがをみます。', meaning: 'I watch a movie with my friend.' },
    ],
  },
  {
    particle: 'も',
    romaji: 'mo',
    function: 'Also / Too / Neither',
    structure: '[Topic] も',
    examples: [
      { japanese: 'わたしもがくせいです。', meaning: 'I am also a student.' },
      { japanese: 'たなかさんもいきます。', meaning: 'Tanaka-san is going too.' },
    ],
  },
  {
    particle: 'か',
    romaji: 'ka',
    function: 'Question marker',
    structure: '[Sentence] か',
    examples: [
      { japanese: 'これはなんですか。', meaning: 'What is this?' },
      { japanese: 'にほんじんですか。', meaning: 'Are you Japanese?' },
    ],
  },
  {
    particle: 'ね',
    romaji: 'ne',
    function: 'Seeking agreement / Softening',
    structure: '[Sentence] ね',
    examples: [
      { japanese: 'いいてんきですね。', meaning: 'Nice weather, isn\'t it?' },
      { japanese: 'おいしいですね。', meaning: 'It\'s delicious, isn\'t it?' },
    ],
  },
  {
    particle: 'よ',
    romaji: 'yo',
    function: 'Asserting information / Emphasis',
    structure: '[Sentence] よ',
    examples: [
      { japanese: 'これはたかいですよ。', meaning: 'This is expensive, I\'m telling you.' },
      { japanese: 'もうじゅうじですよ。', meaning: 'It\'s already 10 o\'clock, you know.' },
    ],
  },
  {
    particle: 'へ',
    romaji: 'e',
    function: 'Direction (destination)',
    structure: '[Place] へ [Motion verb]',
    examples: [
      { japanese: 'とうきょうへいきます。', meaning: 'I go to Tokyo.' },
    ],
    note: 'Similar to に for direction; へ emphasises the direction itself',
  },
  {
    particle: 'から',
    romaji: 'kara',
    function: 'From (time/place starting point)',
    structure: '[Start] から [End] まで',
    examples: [
      { japanese: 'くじからじゅうじまでべんきょうします。', meaning: 'I study from 9 to 10 o\'clock.' },
    ],
  },
  {
    particle: 'まで',
    romaji: 'made',
    function: 'Until / Up to (time/place end point)',
    structure: '[Start] から [End] まで',
    examples: [
      { japanese: 'えきまでいきます。', meaning: 'I go as far as the station.' },
    ],
  },
  {
    particle: 'より',
    romaji: 'yori',
    function: 'Than (comparison)',
    structure: '[A] より [B] の ほう が [Adjective]',
    examples: [
      { japanese: 'りんごよりオレンジのほうがすきです。', meaning: 'I like oranges more than apples.' },
    ],
  },
  {
    particle: 'だけ',
    romaji: 'dake',
    function: 'Only / Just',
    structure: '[Noun] だけ',
    examples: [
      { japanese: 'すこしだけわかります。', meaning: 'I understand just a little.' },
    ],
  },
]

// ─── 10. ADJECTIVES ─────────────────────────────────────────────────────────

export interface Adjective {
  hiragana: string
  kanji?: string
  romaji: string
  meaning: string
  type: 'i' | 'na'
  conjugation?: {
    negative: string      // e.g. たかくない
    past: string          // e.g. たかかった
    negativePast: string  // e.g. たかくなかった
  }
}

export const n5Adjectives: Adjective[] = [
  // ── い-Adjectives (83) ────────────────────────────────────────────
  { type: 'i', hiragana: 'おおきい', kanji: '大きい', romaji: 'ookii', meaning: 'big / large', conjugation: { negative: 'おおきくない', past: 'おおきかった', negativePast: 'おおきくなかった' } },
  { type: 'i', hiragana: 'ちいさい', kanji: '小さい', romaji: 'chiisai', meaning: 'small / little', conjugation: { negative: 'ちいさくない', past: 'ちいさかった', negativePast: 'ちいさくなかった' } },
  { type: 'i', hiragana: 'たかい', kanji: '高い', romaji: 'takai', meaning: 'expensive / tall / high', conjugation: { negative: 'たかくない', past: 'たかかった', negativePast: 'たかくなかった' } },
  { type: 'i', hiragana: 'やすい', kanji: '安い', romaji: 'yasui', meaning: 'cheap / inexpensive', conjugation: { negative: 'やすくない', past: 'やすかった', negativePast: 'やすくなかった' } },
  { type: 'i', hiragana: 'あたらしい', kanji: '新しい', romaji: 'atarashii', meaning: 'new', conjugation: { negative: 'あたらしくない', past: 'あたらしかった', negativePast: 'あたらしくなかった' } },
  { type: 'i', hiragana: 'ふるい', kanji: '古い', romaji: 'furui', meaning: 'old (things, not people)', conjugation: { negative: 'ふるくない', past: 'ふるかった', negativePast: 'ふるくなかった' } },
  { type: 'i', hiragana: 'いい / よい', kanji: '良い', romaji: 'ii / yoi', meaning: 'good', conjugation: { negative: 'よくない', past: 'よかった', negativePast: 'よくなかった' } },
  { type: 'i', hiragana: 'わるい', kanji: '悪い', romaji: 'warui', meaning: 'bad', conjugation: { negative: 'わるくない', past: 'わるかった', negativePast: 'わるくなかった' } },
  { type: 'i', hiragana: 'おいしい', kanji: '美味しい', romaji: 'oishii', meaning: 'delicious / tasty', conjugation: { negative: 'おいしくない', past: 'おいしかった', negativePast: 'おいしくなかった' } },
  { type: 'i', hiragana: 'まずい', romaji: 'mazui', meaning: 'bad-tasting / unpleasant', conjugation: { negative: 'まずくない', past: 'まずかった', negativePast: 'まずくなかった' } },
  { type: 'i', hiragana: 'あつい', kanji: '厚い / 暑い / 熱い', romaji: 'atsui', meaning: 'thick (books/objects) / hot (weather) / hot (touch)', conjugation: { negative: 'あつくない', past: 'あつかった', negativePast: 'あつくなかった' } },
  { type: 'i', hiragana: 'さむい', kanji: '寒い', romaji: 'samui', meaning: 'cold (weather/air)', conjugation: { negative: 'さむくない', past: 'さむかった', negativePast: 'さむくなかった' } },
  { type: 'i', hiragana: 'つめたい', kanji: '冷たい', romaji: 'tsumetai', meaning: 'cold (to the touch)', conjugation: { negative: 'つめたくない', past: 'つめたかった', negativePast: 'つめたくなかった' } },
  { type: 'i', hiragana: 'あたたかい', kanji: '暖かい', romaji: 'atatakai', meaning: 'warm', conjugation: { negative: 'あたたかくない', past: 'あたたかかった', negativePast: 'あたたかくなかった' } },
  { type: 'i', hiragana: 'すずしい', kanji: '涼しい', romaji: 'suzushii', meaning: 'cool / refreshing', conjugation: { negative: 'すずしくない', past: 'すずしかった', negativePast: 'すずしくなかった' } },
  { type: 'i', hiragana: 'たのしい', kanji: '楽しい', romaji: 'tanoshii', meaning: 'fun / enjoyable', conjugation: { negative: 'たのしくない', past: 'たのしかった', negativePast: 'たのしくなかった' } },
  { type: 'i', hiragana: 'かなしい', kanji: '悲しい', romaji: 'kanashii', meaning: 'sad', conjugation: { negative: 'かなしくない', past: 'かなしかった', negativePast: 'かなしくなかった' } },
  { type: 'i', hiragana: 'うれしい', kanji: '嬉しい', romaji: 'ureshii', meaning: 'happy / glad', conjugation: { negative: 'うれしくない', past: 'うれしかった', negativePast: 'うれしくなかった' } },
  { type: 'i', hiragana: 'こわい', kanji: '怖い', romaji: 'kowai', meaning: 'scary / frightening', conjugation: { negative: 'こわくない', past: 'こわかった', negativePast: 'こわくなかった' } },
  { type: 'i', hiragana: 'おもしろい', kanji: '面白い', romaji: 'omoshiroi', meaning: 'interesting / funny', conjugation: { negative: 'おもしろくない', past: 'おもしろかった', negativePast: 'おもしろくなかった' } },
  { type: 'i', hiragana: 'つまらない', kanji: '詰まらない', romaji: 'tsumaranai', meaning: 'boring / dull', conjugation: { negative: 'つまらなくない', past: 'つまらなかった', negativePast: 'つまらなくなかった' } },
  { type: 'i', hiragana: 'むずかしい', kanji: '難しい', romaji: 'muzukashii', meaning: 'difficult', conjugation: { negative: 'むずかしくない', past: 'むずかしかった', negativePast: 'むずかしくなかった' } },
  { type: 'i', hiragana: 'やさしい', kanji: '優しい', romaji: 'yasashii', meaning: 'kind / gentle (person)', conjugation: { negative: 'やさしくない', past: 'やさしかった', negativePast: 'やさしくなかった' } },
  { type: 'i', hiragana: 'はやい', kanji: '早い / 速い', romaji: 'hayai', meaning: 'early / fast', conjugation: { negative: 'はやくない', past: 'はやかった', negativePast: 'はやくなかった' } },
  { type: 'i', hiragana: 'おそい', kanji: '遅い', romaji: 'osoi', meaning: 'slow / late', conjugation: { negative: 'おそくない', past: 'おそかった', negativePast: 'おそくなかった' } },
  { type: 'i', hiragana: 'ながい', kanji: '長い', romaji: 'nagai', meaning: 'long', conjugation: { negative: 'ながくない', past: 'ながかった', negativePast: 'ながくなかった' } },
  { type: 'i', hiragana: 'みじかい', kanji: '短い', romaji: 'mijikai', meaning: 'short', conjugation: { negative: 'みじかくない', past: 'みじかかった', negativePast: 'みじかくなかった' } },
  { type: 'i', hiragana: 'ひろい', kanji: '広い', romaji: 'hiroi', meaning: 'wide / spacious', conjugation: { negative: 'ひろくない', past: 'ひろかった', negativePast: 'ひろくなかった' } },
  { type: 'i', hiragana: 'せまい', kanji: '狭い', romaji: 'semai', meaning: 'narrow / cramped', conjugation: { negative: 'せまくない', past: 'せまかった', negativePast: 'せまくなかった' } },
  { type: 'i', hiragana: 'おもい', kanji: '重い', romaji: 'omoi', meaning: 'heavy', conjugation: { negative: 'おもくない', past: 'おもかった', negativePast: 'おもくなかった' } },
  { type: 'i', hiragana: 'かるい', kanji: '軽い', romaji: 'karui', meaning: 'light (weight)', conjugation: { negative: 'かるくない', past: 'かるかった', negativePast: 'かるくなかった' } },
  { type: 'i', hiragana: 'かたい', kanji: '硬い', romaji: 'katai', meaning: 'hard / stiff', conjugation: { negative: 'かたくない', past: 'かたかった', negativePast: 'かたくなかった' } },
  { type: 'i', hiragana: 'やわらかい', kanji: '柔らかい', romaji: 'yawarakai', meaning: 'soft', conjugation: { negative: 'やわらかくない', past: 'やわらかかった', negativePast: 'やわらかくなかった' } },
  { type: 'i', hiragana: 'あかい', kanji: '赤い', romaji: 'akai', meaning: 'red', conjugation: { negative: 'あかくない', past: 'あかかった', negativePast: 'あかくなかった' } },
  { type: 'i', hiragana: 'あおい', kanji: '青い', romaji: 'aoi', meaning: 'blue / green (nature)', conjugation: { negative: 'あおくない', past: 'あおかった', negativePast: 'あおくなかった' } },
  { type: 'i', hiragana: 'しろい', kanji: '白い', romaji: 'shiroi', meaning: 'white', conjugation: { negative: 'しろくない', past: 'しろかった', negativePast: 'しろくなかった' } },
  { type: 'i', hiragana: 'くろい', kanji: '黒い', romaji: 'kuroi', meaning: 'black', conjugation: { negative: 'くろくない', past: 'くろかった', negativePast: 'くろくなかった' } },
  { type: 'i', hiragana: 'きいろい', kanji: '黄色い', romaji: 'kiiroi', meaning: 'yellow', conjugation: { negative: 'きいろくない', past: 'きいろかった', negativePast: 'きいろくなかった' } },
  { type: 'i', hiragana: 'ちゃいろい', kanji: '茶色い', romaji: 'chairoi', meaning: 'brown', conjugation: { negative: 'ちゃいろくない', past: 'ちゃいろかった', negativePast: 'ちゃいろくなかった' } },
  { type: 'i', hiragana: 'くらい', kanji: '暗い', romaji: 'kurai', meaning: 'dark', conjugation: { negative: 'くらくない', past: 'くらかった', negativePast: 'くらくなかった' } },
  { type: 'i', hiragana: 'あかるい', kanji: '明るい', romaji: 'akarui', meaning: 'bright / cheerful', conjugation: { negative: 'あかるくない', past: 'あかるかった', negativePast: 'あかるくなかった' } },
  { type: 'i', hiragana: 'いそがしい', kanji: '忙しい', romaji: 'isogashii', meaning: 'busy (person)', conjugation: { negative: 'いそがしくない', past: 'いそがしかった', negativePast: 'いそがしくなかった' } },
  { type: 'i', hiragana: 'つよい', kanji: '強い', romaji: 'tsuyoi', meaning: 'strong', conjugation: { negative: 'つよくない', past: 'つよかった', negativePast: 'つよくなかった' } },
  { type: 'i', hiragana: 'よわい', kanji: '弱い', romaji: 'yowai', meaning: 'weak', conjugation: { negative: 'よわくない', past: 'よわかった', negativePast: 'よわくなかった' } },
  { type: 'i', hiragana: 'きびしい', kanji: '厳しい', romaji: 'kibishii', meaning: 'strict / severe', conjugation: { negative: 'きびしくない', past: 'きびしかった', negativePast: 'きびしくなかった' } },
  { type: 'i', hiragana: 'かわいい', kanji: '可愛い', romaji: 'kawaii', meaning: 'cute / adorable', conjugation: { negative: 'かわいくない', past: 'かわいかった', negativePast: 'かわいくなかった' } },
  { type: 'i', hiragana: 'うつくしい', kanji: '美しい', romaji: 'utsukushii', meaning: 'beautiful', conjugation: { negative: 'うつくしくない', past: 'うつくしかった', negativePast: 'うつくしくなかった' } },
  { type: 'i', hiragana: 'きたない', kanji: '汚い', romaji: 'kitanai', meaning: 'dirty / messy', conjugation: { negative: 'きたなくない', past: 'きたなかった', negativePast: 'きたなくなかった' } },
  { type: 'i', hiragana: 'いたい', kanji: '痛い', romaji: 'itai', meaning: 'painful / hurts', conjugation: { negative: 'いたくない', past: 'いたかった', negativePast: 'いたくなかった' } },
  { type: 'i', hiragana: 'ねむい', kanji: '眠い', romaji: 'nemui', meaning: 'sleepy', conjugation: { negative: 'ねむくない', past: 'ねむかった', negativePast: 'ねむくなかった' } },
  { type: 'i', hiragana: 'つかれた', kanji: '疲れた', romaji: 'tsukareta', meaning: 'tired', conjugation: { negative: 'つかれていない', past: 'つかれた', negativePast: 'つかれていなかった' } },
  { type: 'i', hiragana: 'おなかがすいた', romaji: 'onaka ga suita', meaning: 'hungry', conjugation: { negative: 'おなかがすいていない', past: 'おなかがすいた', negativePast: 'おなかがすいていなかった' } },
  { type: 'i', hiragana: 'のどがかわいた', romaji: 'nodo ga kawaita', meaning: 'thirsty', conjugation: { negative: 'のどがかわいていない', past: 'のどがかわいた', negativePast: 'のどがかわいていなかった' } },
  { type: 'i', hiragana: 'すごい', romaji: 'sugoi', meaning: 'amazing / terrible (extreme)', conjugation: { negative: 'すごくない', past: 'すごかった', negativePast: 'すごくなかった' } },
  { type: 'i', hiragana: 'こい', kanji: '濃い', romaji: 'koi', meaning: 'thick / dark (color/flavor)', conjugation: { negative: 'こくない', past: 'こかった', negativePast: 'こくなかった' } },
  { type: 'i', hiragana: 'うすい', kanji: '薄い', romaji: 'usui', meaning: 'weak (flavor/taste) / thin (flat objects) / pale (color)', conjugation: { negative: 'うすくない', past: 'うすかった', negativePast: 'うすくなかった' } },
  { type: 'i', hiragana: 'あぶない', kanji: '危ない', romaji: 'abunai', meaning: 'dangerous', conjugation: { negative: 'あぶなくない', past: 'あぶなかった', negativePast: 'あぶなくなかった' } },
  { type: 'i', hiragana: 'やかましい', romaji: 'yakamashii', meaning: 'noisy / annoying', conjugation: { negative: 'やかましくない', past: 'やかましかった', negativePast: 'やかましくなかった' } },
  { type: 'i', hiragana: 'まるい', kanji: '丸い', romaji: 'marui', meaning: 'round / circular', conjugation: { negative: 'まるくない', past: 'まるかった', negativePast: 'まるくなかった' } },
  { type: 'i', hiragana: 'しかくい', kanji: '四角い', romaji: 'shikakui', meaning: 'square', conjugation: { negative: 'しかくくない', past: 'しかくかった', negativePast: 'しかくくなかった' } },
  { type: 'i', hiragana: 'おかしい', romaji: 'okashii', meaning: 'strange / funny', conjugation: { negative: 'おかしくない', past: 'おかしかった', negativePast: 'おかしくなかった' } },
  { type: 'i', hiragana: 'ふかい', kanji: '深い', romaji: 'fukai', meaning: 'deep', conjugation: { negative: 'ふかくない', past: 'ふかかった', negativePast: 'ふかくなかった' } },
  { type: 'i', hiragana: 'あさい', kanji: '浅い', romaji: 'asai', meaning: 'shallow', conjugation: { negative: 'あさくない', past: 'あさかった', negativePast: 'あさくなかった' } },
  { type: 'i', hiragana: 'にがい', kanji: '苦い', romaji: 'nigai', meaning: 'bitter', conjugation: { negative: 'にがくない', past: 'にがかった', negativePast: 'にがくなかった' } },
  { type: 'i', hiragana: 'からい', kanji: '辛い', romaji: 'karai', meaning: 'spicy / hot (taste)', conjugation: { negative: 'からくない', past: 'からかった', negativePast: 'からくなかった' } },
  { type: 'i', hiragana: 'あまい', kanji: '甘い', romaji: 'amai', meaning: 'sweet', conjugation: { negative: 'あまくない', past: 'あまかった', negativePast: 'あまくなかった' } },
  { type: 'i', hiragana: 'しょっぱい', romaji: 'shoppai', meaning: 'salty', conjugation: { negative: 'しょっぱくない', past: 'しょっぱかった', negativePast: 'しょっぱくなかった' } },
  { type: 'i', hiragana: 'とおい', kanji: '遠い', romaji: 'tooi', meaning: 'far', conjugation: { negative: 'とおくない', past: 'とおかった', negativePast: 'とおくなかった' } },
  { type: 'i', hiragana: 'ちかい', kanji: '近い', romaji: 'chikai', meaning: 'near', conjugation: { negative: 'ちかくない', past: 'ちかかった', negativePast: 'ちかくなかった' } },
  { type: 'i', hiragana: 'むしあつい', kanji: '蒸し暑い', romaji: 'mushiatsui', meaning: 'humid / sultry', conjugation: { negative: 'むしあつくない', past: 'むしあつかった', negativePast: 'むしあつくなかった' } },
  { type: 'i', hiragana: 'ひくい', kanji: '低い', romaji: 'hikui', meaning: 'low', conjugation: { negative: 'ひくくない', past: 'ひくかった', negativePast: 'ひくくなかった' } },
  { type: 'i', hiragana: 'くさい', kanji: '臭い', romaji: 'kusai', meaning: 'stinky / smelly', conjugation: { negative: 'くさくない', past: 'くさかった', negativePast: 'くさくなかった' } },
  { type: 'i', hiragana: 'すっぱい', kanji: '酸っぱい', romaji: 'suppai', meaning: 'sour', conjugation: { negative: 'すっぱくない', past: 'すっぱかった', negativePast: 'すっぱくなかった' } },
  { type: 'i', hiragana: 'ふとい', kanji: '太い', romaji: 'futoi', meaning: 'thick / fat (cylindrical shapes)', conjugation: { negative: 'ふとくない', past: 'ふとかった', negativePast: 'ふとくなかった' } },
  { type: 'i', hiragana: 'ほそい', kanji: '細い', romaji: 'hosoi', meaning: 'thin / slender', conjugation: { negative: 'ほそくない', past: 'ほそかった', negativePast: 'ほそくなかった' } },
  { type: 'i', hiragana: 'わかい', kanji: '若い', romaji: 'wakai', meaning: 'young', conjugation: { negative: 'わかくない', past: 'わかかった', negativePast: 'わかくなかった' } },
  { type: 'i', hiragana: 'すくない', kanji: '少ない', romaji: 'sukunai', meaning: 'few / scarce', conjugation: { negative: 'すくなくない', past: 'すくかった', negativePast: 'すくなくなかった' } },
  { type: 'i', hiragana: 'おおい', kanji: '多い', romaji: 'ooi', meaning: 'many / plenty', conjugation: { negative: 'おおくない', past: 'おおかった', negativePast: 'おおくなかった' } },
  { type: 'i', hiragana: 'めずらしい', kanji: '珍しい', romaji: 'mezurashii', meaning: 'rare / unusual', conjugation: { negative: 'めずらしくない', past: 'めずらしかった', negativePast: 'めずらしくなかった' } },
  { type: 'i', hiragana: 'うるさい', kanji: '煩い', romaji: 'urusai', meaning: 'noisy / annoying', conjugation: { negative: 'うるさくない', past: 'うるさかった', negativePast: 'うるさくなかった' } },
  { type: 'i', hiragana: 'ただしい', kanji: '正しい', romaji: 'tadashii', meaning: 'correct / right', conjugation: { negative: 'ただしくない', past: 'ただしかった', negativePast: 'ただしくなかった' } },
  { type: 'i', hiragana: 'さびしい', kanji: '寂しい', romaji: 'sabishii (or sabushii)', meaning: 'lonely', conjugation: { negative: 'さびしくない', past: 'さびしかった', negativePast: 'さびしくなかった' } },
  { type: 'i', hiragana: 'ほしい', kanji: '欲しい', romaji: 'hoshii', meaning: 'wanted / desired', conjugation: { negative: 'ほしくない', past: 'ほしかった', negativePast: 'ほしくなかった' } },

  // ── な-Adjectives (41) ────────────────────────────────────────────
  { type: 'na', hiragana: 'ひまな', kanji: '暇な', romaji: 'hima', meaning: 'free / not busy', conjugation: { negative: 'ひまではない', past: 'ひまだった', negativePast: 'ひまではなかった' } },
  { type: 'na', hiragana: 'すきな', kanji: '好きな', romaji: 'suki', meaning: 'liked / favorite', conjugation: { negative: 'すきではない', past: 'すきだった', negativePast: 'すきではなかった' } },
  { type: 'na', hiragana: 'きらいな', kanji: '嫌いな', romaji: 'kirai', meaning: 'disliked', conjugation: { negative: 'きらいではない', past: 'きらいだった', negativePast: 'きらいではなかった' } },
  { type: 'na', hiragana: 'じょうずな', kanji: '上手な', romaji: 'jouzu', meaning: 'skillful / good at', conjugation: { negative: 'じょうずではない', past: 'じょうずだった', negativePast: 'じょうずではなかった' } },
  { type: 'na', hiragana: 'へたな', kanji: '下手な', romaji: 'heta', meaning: 'unskillful / bad at', conjugation: { negative: 'へたではない', past: 'へただった', negativePast: 'へたではなかった' } },
  { type: 'na', hiragana: 'しずかな', kanji: '静かな', romaji: 'shizukana', meaning: 'quiet', conjugation: { negative: 'しずかではない', past: 'しずかだった', negativePast: 'しずかではなかった' } },
  { type: 'na', hiragana: 'にぎやかな', kanji: '賑やかな', romaji: 'nigiyaka', meaning: 'lively / bustling', conjugation: { negative: 'にぎやかではない', past: 'にぎやかだった', negativePast: 'にぎやかではなかった' } },
  { type: 'na', hiragana: 'きれいな', kanji: '綺麗な', romaji: 'kirei', meaning: 'beautiful / clean', conjugation: { negative: 'きれいではない', past: 'きれいだった', negativePast: 'きれいではなかった' } },
  { type: 'na', hiragana: 'べんりな', kanji: '便利な', romaji: 'benri', meaning: 'convenient', conjugation: { negative: 'べんりではない', past: 'べんりだった', negativePast: 'べんりではなかった' } },
  { type: 'na', hiragana: 'ふべんな', kanji: '不便な', romaji: 'fuben', meaning: 'inconvenient', conjugation: { negative: 'ふべんではない', past: 'ふべんだった', negativePast: 'ふべんではなかった' } },
  { type: 'na', hiragana: 'げんきな', kanji: '元気な', romaji: 'genki', meaning: 'energetic / healthy', conjugation: { negative: 'げんきではない', past: 'げんきだった', negativePast: 'げんきではなかった' } },
  { type: 'na', hiragana: 'たいせつな', kanji: '大切な', romaji: 'taisetsu', meaning: 'important / precious', conjugation: { negative: 'たいせつではない', past: 'たいせつだった', negativePast: 'たいせつではなかった' } },
  { type: 'na', hiragana: 'だいじな', kanji: '大事な', romaji: 'daiji', meaning: 'important / valuable', conjugation: { negative: 'だいじではない', past: 'だいじだった', negativePast: 'だいじではなかった' } },
  { type: 'na', hiragana: 'まじめな', kanji: '真面目な', romaji: 'majime', meaning: 'serious / diligent', conjugation: { negative: 'まじめではない', past: 'まじめだった', negativePast: 'まじめではなかった' } },
  { type: 'na', hiragana: 'ゆうめいな', kanji: '有名な', romaji: 'yuumei', meaning: 'famous', conjugation: { negative: 'ゆうめいではない', past: 'ゆうめいだった', negativePast: 'ゆうめいではなかった' } },
  { type: 'na', hiragana: 'たいへんな', kanji: '大変な', romaji: 'taihen', meaning: 'tough / terrible / very', conjugation: { negative: 'たいへんではない', past: 'たいへんだった', negativePast: 'たいへんではなかった' } },
  { type: 'na', hiragana: 'たのしみな', kanji: '楽しみな', romaji: 'tanoshimi', meaning: 'looking forward to', conjugation: { negative: 'たのしみではない', past: 'たのしみだった', negativePast: 'たのしみではなかった' } },
  { type: 'na', hiragana: 'しんせつな', kanji: '親切な', romaji: 'shinsetsu', meaning: 'kind / friendly', conjugation: { negative: 'しんせつではない', past: 'しんせつだった', negativePast: 'しんせつではなかった' } },
  { type: 'na', hiragana: 'むりな', kanji: '無理な', romaji: 'muri', meaning: 'impossible / unreasonable', conjugation: { negative: 'むりではない', past: 'むりだった', negativePast: 'むりではなかった' } },
  { type: 'na', hiragana: 'じゆうな', kanji: '自由な', romaji: 'jiyuu', meaning: 'free / unrestricted', conjugation: { negative: 'じゆうではない', past: 'じゆうだった', negativePast: 'じゆうではなかった' } },
  { type: 'na', hiragana: 'あんぜんな', kanji: '安全な', romaji: 'anzen', meaning: 'safe', conjugation: { negative: 'あんぜんではない', past: 'あんぜんだった', negativePast: 'あんぜんではなかった' } },
  { type: 'na', hiragana: 'あんしんな', kanji: '安心な', romaji: 'anshin', meaning: 'reassured / at ease', conjugation: { negative: 'あんしんではない', past: 'あんしんだった', negativePast: 'あんしんではなかった' } },
  { type: 'na', hiragana: 'とくいな', kanji: '得意な', romaji: 'tokui', meaning: 'good at / proud of', conjugation: { negative: 'とくいではない', past: 'とくいだった', negativePast: 'とくいではなかった' } },
  { type: 'na', hiragana: 'にがてな', kanji: '苦手な', romaji: 'nigate', meaning: 'not good at / weak point', conjugation: { negative: 'にがてではない', past: 'にがてだった', negativePast: 'にがてではなかった' } },
  { type: 'na', hiragana: 'ひつような', kanji: '必要な', romaji: 'hitsuyou', meaning: 'necessary', conjugation: { negative: 'ひつようではない', past: 'ひつようだった', negativePast: 'ひつようではなかった' } },
  { type: 'na', hiragana: 'じょうぶな', kanji: '丈夫な', romaji: 'joubu', meaning: 'sturdy / durable / healthy', conjugation: { negative: 'じょうぶではない', past: 'じょうぶだった', negativePast: 'じょうぶではなかった' } },
  { type: 'na', hiragana: 'はでな', kanji: '派手な', romaji: 'hade', meaning: 'flashy / showy', conjugation: { negative: 'はでではない', past: 'はでだった', negativePast: 'はでではなかった' } },
  { type: 'na', hiragana: 'じみな', kanji: '地味な', romaji: 'jimi', meaning: 'plain / modest', conjugation: { negative: 'じみではない', past: 'じみだった', negativePast: 'じみではなかった' } },
  { type: 'na', hiragana: 'すてきな', kanji: '素敵な', romaji: 'suteki', meaning: 'wonderful / lovely', conjugation: { negative: 'すてきではない', past: 'すてきだった', negativePast: 'すてきではなかった' } },
  { type: 'na', hiragana: 'ふくざつな', kanji: '複雑な', romaji: 'fukuzatsu', meaning: 'complicated', conjugation: { negative: 'ふくざつではない', past: 'ふくざつだった', negativePast: 'ふくざつではなかった' } },
  { type: 'na', hiragana: 'かんたんな', kanji: '簡単な', romaji: 'kantan', meaning: 'easy / simple', conjugation: { negative: 'かんたんではない', past: 'かんたんだった', negativePast: 'かんたんではなかった' } },
  { type: 'na', hiragana: 'しつれいな', kanji: '失礼な', romaji: 'shitsureina', meaning: 'rude / impolite', conjugation: { negative: 'しつれいではない', past: 'しつれいだった', negativePast: 'しつれいではなかった' } },
  { type: 'na', hiragana: 'ていねいな', kanji: '丁寧な', romaji: 'teineina', meaning: 'polite', conjugation: { negative: 'ていねいではない', past: 'ていねいだった', negativePast: 'ていねいではなかった' } },
  { type: 'na', hiragana: 'いろいろな', kanji: '色々な', romaji: 'iroirona', meaning: 'various', conjugation: { negative: 'いろいろではない', past: 'いろいろだった', negativePast: 'いろいろではなかった' } },
  { type: 'na', hiragana: 'へんな', kanji: '変な', romaji: 'henna', meaning: 'strange', conjugation: { negative: 'へんではない', past: 'へんだった', negativePast: 'へんではなかった' } },
  { type: 'na', hiragana: 'びんぼうな', kanji: '貧乏な', romaji: 'binbouna', meaning: 'poor', conjugation: { negative: 'びんぼうではない', past: 'びんぼうだった', negativePast: 'びんぼうではなかった' } },
  { type: 'na', hiragana: 'だいじょうぶな', kanji: '大丈夫な', romaji: 'daijoubu (na)', meaning: 'okay / alright', conjugation: { negative: 'だいじょうぶではない', past: 'だいじょうぶだった', negativePast: 'だいじょうぶではなかった' } },
  { type: 'na', hiragana: 'だめな', kanji: '駄目な', romaji: 'damena', meaning: 'no good / prohibited', conjugation: { negative: 'だめではない', past: 'だめだった', negativePast: 'だめではなかった' } },
  { type: 'na', hiragana: 'ばかな', kanji: '馬鹿な', romaji: 'bakana', meaning: 'stupid / foolish', conjugation: { negative: 'ばかではない', past: 'ばかだった', negativePast: 'ばかではなかった' } },
  { type: 'na', hiragana: 'らくな', kanji: '楽な', romaji: 'rakuna', meaning: 'easy / comfortable', conjugation: { negative: 'らくではない', past: 'らくだった', negativePast: 'らくではなかった' } },
  { type: 'na', hiragana: 'いやな', kanji: '嫌な', romaji: 'iyana', meaning: 'unpleasant / disgusting', conjugation: { negative: 'いやではない', past: 'いやだった', negativePast: 'いやではなかった' } },
]
export type VerbGroup = 'group1' | 'group2' | 'irregular'

export interface VerbConjugation {
  id: string
  dictionary: string      // plain form (辞書形)
  kanji?: string
  meaning: string
  group: VerbGroup
  masu: string            // ます form
  te: string              // て form
  ta: string              // た form (plain past)
  nai: string             // ない form (plain negative)
  nakatta: string         // なかった form (plain negative past)
  note?: string
}

export const n5VerbChart: VerbConjugation[] = [
  // ── Group 1 (Godan / u-verbs) ─────────────────────────────────────
  { id: 'v-001', dictionary: 'かく', kanji: '書く', meaning: 'to write, to compose', group: 'group1', masu: 'かきます', te: 'かいて', ta: 'かいた', nai: 'かかない', nakatta: 'かかなかった' },
  { id: 'v-002', dictionary: 'きく', kanji: '聞く', meaning: 'to hear, to listen, to ask', group: 'group1', masu: 'ききます', te: 'きいて', ta: 'きいた', nai: 'きかない', nakatta: 'きかなかった' },
  { id: 'v-003', dictionary: 'いく', kanji: '行く', meaning: 'to go', group: 'group1', masu: 'いきます', te: 'いって', ta: 'いった', nai: 'いかない', nakatta: 'いかなかった', note: 'く→って (special)' },
  { id: 'v-004', dictionary: 'かう', kanji: '買う', meaning: 'to buy', group: 'group1', masu: 'かいます', te: 'かって', ta: 'かった', nai: 'かわない', nakatta: 'かわなかった' },
  { id: 'v-005', dictionary: 'のむ', kanji: '飲む', meaning: 'to drink', group: 'group1', masu: 'のみます', te: 'のんで', ta: 'のんだ', nai: 'のまない', nakatta: 'のまなかった' },
  { id: 'v-006', dictionary: 'よむ', kanji: '読む', meaning: 'to read', group: 'group1', masu: 'よみます', te: 'よんで', ta: 'よんだ', nai: 'よまない', nakatta: 'よまなかった' },
  { id: 'v-007', dictionary: 'はなす', kanji: '話す', meaning: 'to speak, to talk', group: 'group1', masu: 'はなします', te: 'はなして', ta: 'はなした', nai: 'はなさない', nakatta: 'はなさなかった' },
  { id: 'v-008', dictionary: 'まつ', kanji: '待つ', meaning: 'to wait', group: 'group1', masu: 'まちます', te: 'まって', ta: 'まった', nai: 'またない', nakatta: 'またなかった' },
  { id: 'v-009', dictionary: 'もつ', kanji: '持つ', meaning: 'to hold, to have, to carry', group: 'group1', masu: 'もちます', te: 'もって', ta: 'もった', nai: 'もたない', nakatta: 'もたなかった' },
  { id: 'v-010', dictionary: 'あう', kanji: '会う', meaning: 'to meet, to see (a person)', group: 'group1', masu: 'あいます', te: 'あって', ta: 'あった', nai: 'あわない', nakatta: 'あわなかった' },
  { id: 'v-011', dictionary: 'わかる', kanji: '分かる', meaning: 'to understand, to comprehend', group: 'group1', masu: 'わかります', te: 'わかって', ta: 'わかった', nai: 'わからない', nakatta: 'わからなかった' },
  { id: 'v-012', dictionary: 'かえる', kanji: '帰る', meaning: 'to return, to go home', group: 'group1', masu: 'かえります', te: 'かえって', ta: 'かえった', nai: 'かえらない', nakatta: 'かえらなかった', note: 'Group 1 — ends in る but 3-mora stem' },
  { id: 'v-013', dictionary: 'のる', kanji: '乗る', meaning: 'to ride, to get on (vehicle)', group: 'group1', masu: 'のります', te: 'のって', ta: 'のった', nai: 'のらない', nakatta: 'のらなかった' },
  { id: 'v-014', dictionary: 'おく', kanji: '置く', meaning: 'to put, to place', group: 'group1', masu: 'おきます', te: 'おいて', ta: 'おいた', nai: 'おかない', nakatta: 'おかなかった' },
  { id: 'v-015', dictionary: 'つかう', kanji: '使う', meaning: 'to use', group: 'group1', masu: 'つかいます', te: 'つかって', ta: 'つかった', nai: 'つかわない', nakatta: 'つかわなかった' },
  { id: 'v-016', dictionary: 'あそぶ', kanji: '遊ぶ', meaning: 'to play, to enjoy oneself', group: 'group1', masu: 'あそびます', te: 'あそんで', ta: 'あそんだ', nai: 'あそばない', nakatta: 'あそばなかった' },
  { id: 'v-017', dictionary: 'いそぐ', kanji: '急ぐ', meaning: 'to hurry, to rush', group: 'group1', masu: 'いそぎます', te: 'いそいで', ta: 'いそいだ', nai: 'いそがない', nakatta: 'いそがなかった' },
  { id: 'v-018', dictionary: 'うたう', kanji: '歌う', meaning: 'to sing', group: 'group1', masu: 'うたいます', te: 'うたって', ta: 'うたった', nai: 'うたわない', nakatta: 'うたわなかった' },
  { id: 'v-019', dictionary: 'あるく', kanji: '歩く', meaning: 'to walk', group: 'group1', masu: 'あるきます', te: 'あるいて', ta: 'あるいた', nai: 'あるかない', nakatta: 'あるかなかった' },
  { id: 'v-020', dictionary: 'はたらく', kanji: '働く', meaning: 'to work', group: 'group1', masu: 'はたらきます', te: 'はたらいて', ta: 'はたらいた', nai: 'はたらかない', nakatta: 'はたらかなかった' },
  { id: 'v-021', dictionary: 'ひく', kanji: '弾く', meaning: 'to play (piano, guitar, stringed instrument)', group: 'group1', masu: 'ひきます', te: 'ひいて', ta: 'ひいた', nai: 'ひかない', nakatta: 'ひかなかった' },
  { id: 'v-022', dictionary: 'はいる', kanji: '入る', meaning: 'to enter, to go into', group: 'group1', masu: 'はいります', te: 'はいって', ta: 'はいった', nai: 'はいらない', nakatta: 'はいらなかった', note: 'Group 1 — ends in る but godan' },
  { id: 'v-023', dictionary: 'とる', kanji: '取る', meaning: 'to take, to get, to pass', group: 'group1', masu: 'とります', te: 'とって', ta: 'とった', nai: 'とらない', nakatta: 'とらなかった' },
  { id: 'v-024', dictionary: 'けす', kanji: '消す', meaning: 'to turn off (light/switch), to erase', group: 'group1', masu: 'けします', te: 'けして', ta: 'けした', nai: 'けさない', nakatta: 'けさなかった' },
  { id: 'v-025', dictionary: 'すわる', kanji: '座る', meaning: 'to sit down', group: 'group1', masu: 'すわります', te: 'すわって', ta: 'すわった', nai: 'すわらない', nakatta: 'すわらなかった' },
  { id: 'v-026', dictionary: 'たつ', kanji: '立つ', meaning: 'to stand up', group: 'group1', masu: 'たちます', te: 'たって', ta: 'たった', nai: 'たたない', nakatta: 'たたなかった' },
  { id: 'v-027', dictionary: 'しる', kanji: '知る', meaning: 'to know, to get to know', group: 'group1', masu: 'しります', te: 'しって', ta: 'しった', nai: 'しらない', nakatta: 'しらなかった', note: 'Group 1 — ends in る but godan' },
  { id: 'v-028', dictionary: 'ならう', kanji: '習う', meaning: 'to learn (from a teacher)', group: 'group1', masu: 'ならいます', te: 'ならって', ta: 'ならった', nai: 'ならわない', nakatta: 'ならわなかった' },
  { id: 'v-029', dictionary: 'かえす', kanji: '返す', meaning: 'to return (something borrowed)', group: 'group1', masu: 'かえします', te: 'かえして', ta: 'かえした', nai: 'かえさない', nakatta: 'かえさなかった' },
  { id: 'v-030', dictionary: 'おわる', kanji: '終わる', meaning: 'to end, to finish', group: 'group1', masu: 'おわります', te: 'おわって', ta: 'おわった', nai: 'おわらない', nakatta: 'おわらなかった' },
  { id: 'v-031', dictionary: 'およぐ', kanji: '泳ぐ', meaning: 'to swim', group: 'group1', masu: 'およぎます', te: 'およいで', ta: 'およいだ', nai: 'およがない', nakatta: 'およがなかった' },
  { id: 'v-032', dictionary: 'おどる', kanji: '踊る', meaning: 'to dance', group: 'group1', masu: 'おどります', te: 'おどって', ta: 'おどった', nai: 'おどらない', nakatta: 'おどらなかった' },
  { id: 'v-033', dictionary: 'うる', kanji: '売る', meaning: 'to sell', group: 'group1', masu: 'うります', te: 'うって', ta: 'うった', nai: 'うらない', nakatta: 'うらなかった' },
  { id: 'v-034', dictionary: 'おこる', kanji: '怒る', meaning: 'to get angry', group: 'group1', masu: 'おこります', te: 'おこって', ta: 'おこった', nai: 'おこらない', nakatta: 'おこらなかった' },
  { id: 'v-035', dictionary: 'なく', kanji: '泣く', meaning: 'to cry', group: 'group1', masu: 'なきます', te: 'ないて', ta: 'ないた', nai: 'なかない', nakatta: 'なかなかった' },
  { id: 'v-036', dictionary: 'わらう', kanji: '笑う', meaning: 'to laugh, to smile', group: 'group1', masu: 'わらいます', te: 'わらって', ta: 'わらった', nai: 'わらわない', nakatta: 'わらわなかった' },
  { id: 'v-037', dictionary: 'はく', kanji: '履く', meaning: 'to put on (shoes, trousers, socks)', group: 'group1', masu: 'はきます', te: 'はいて', ta: 'はいた', nai: 'はかない', nakatta: 'はかなかった' },
  { id: 'v-038', dictionary: 'かぶる', kanji: '被る', meaning: 'to wear (on head)', group: 'group1', masu: 'かぶります', te: 'かぶって', ta: 'かぶった', nai: 'かぶらない', nakatta: 'かぶらなかった' },
  { id: 'v-039', dictionary: 'ぬぐ', kanji: '脱ぐ', meaning: 'to take off (shoes, clothing)', group: 'group1', masu: 'ぬぎます', te: 'ぬいで', ta: 'ぬいだ', nai: 'ぬがない', nakatta: 'ぬがなかった' },
  { id: 'v-040', dictionary: 'やすむ', kanji: '休む', meaning: 'to rest, to take a day off', group: 'group1', masu: 'やすみます', te: 'やすんで', ta: 'やすんだ', nai: 'やすまない', nakatta: 'やすまなかった' },
  { id: 'v-041', dictionary: 'もらう', meaning: 'to receive (from someone)', group: 'group1', masu: 'もらいます', te: 'もらって', ta: 'もらった', nai: 'もらわない', nakatta: 'もらわなかった' },
  { id: 'v-042', dictionary: 'たのむ', kanji: '頼む', meaning: 'to request, to ask a favour', group: 'group1', masu: 'たのみます', te: 'たのんで', ta: 'たのんだ', nai: 'たのまない', nakatta: 'たのまなかった' },
  { id: 'v-043', dictionary: 'てつだう', kanji: '手伝う', meaning: 'to help, to assist', group: 'group1', masu: 'てつだいます', te: 'てつだって', ta: 'てつだった', nai: 'てつだわない', nakatta: 'てつだわなかった' },
  { id: 'v-044', dictionary: 'はしる', kanji: '走る', meaning: 'to run', group: 'group1', masu: 'はしります', te: 'はしって', ta: 'はしった', nai: 'はしらない', nakatta: 'はしらなかった', note: 'Group 1 — ends in る but godan' },
  { id: 'v-045', dictionary: 'とまる', kanji: '止まる', meaning: 'to stop, to come to a halt', group: 'group1', masu: 'とまります', te: 'とまって', ta: 'とまった', nai: 'とまらない', nakatta: 'とまらなかった' },
  { id: 'v-046', dictionary: 'かわる', kanji: '変わる', meaning: 'to change, to differ', group: 'group1', masu: 'かわります', te: 'かわって', ta: 'かわった', nai: 'かわらない', nakatta: 'かわらなかった' },
  { id: 'v-047', dictionary: 'だす', kanji: '出す', meaning: 'to submit, to take out', group: 'group1', masu: 'だします', te: 'だして', ta: 'だした', nai: 'ださない', nakatta: 'ださなかった' },
  { id: 'v-048', dictionary: 'おす', kanji: '押す', meaning: 'to push, to press (button, stamp)', group: 'group1', masu: 'おします', te: 'おして', ta: 'おした', nai: 'おさない', nakatta: 'おさなかった' },
  { id: 'v-049', dictionary: 'ひく', kanji: '引く', meaning: 'to pull', group: 'group1', masu: 'ひきます', te: 'ひいて', ta: 'ひいた', nai: 'ひかない', nakatta: 'ひかなかった' },
  { id: 'v-050', dictionary: 'きる', kanji: '切る', meaning: 'to cut', group: 'group1', masu: 'きります', te: 'きって', ta: 'きった', nai: 'きらない', nakatta: 'きらなかった', note: 'Group 1 (different from 着る Group 2)' },
  { id: 'v-051', dictionary: 'はる', kanji: '貼る', meaning: 'to stick, to paste', group: 'group1', masu: 'はります', te: 'はって', ta: 'はった', nai: 'はらない', nakatta: 'はらなかった' },
  { id: 'v-052', dictionary: 'みがく', kanji: '磨く', meaning: 'to brush (teeth), to polish', group: 'group1', masu: 'みがきます', te: 'みがいて', ta: 'みがいた', nai: 'みがかない', nakatta: 'みがかなかった' },
  { id: 'v-053', dictionary: 'あらう', kanji: '洗う', meaning: 'to wash', group: 'group1', masu: 'あらいます', te: 'あらって', ta: 'あらった', nai: 'あらわない', nakatta: 'あらわなかった' },
  { id: 'v-054', dictionary: 'さがす', kanji: '探す', meaning: 'to search for, to look for', group: 'group1', masu: 'さがします', te: 'さがして', ta: 'さがした', nai: 'さがさない', nakatta: 'さがさなかった' },
  { id: 'v-055', dictionary: '〜すぎる', meaning: 'too ~ (excessive)', group: 'group1', masu: '〜すぎます', te: '〜すぎて', ta: '〜すぎた', nai: '〜すぎない', nakatta: '〜すぎなかった' },
  { id: 'v-056', dictionary: 'かなう', kanji: '叶う', meaning: 'to come true, to be realised (dream)', group: 'group1', masu: 'かないます', te: 'かなって', ta: 'かなった', nai: 'かなわない', nakatta: 'かなわなかった' },
  { id: 'v-057', dictionary: 'へる', kanji: '減る', meaning: 'to decrease', group: 'group1', masu: 'へります', te: 'へって', ta: 'へった', nai: 'へらない', nakatta: 'へらなかった' },
  { id: 'v-058', dictionary: 'なおす', kanji: '直す', meaning: 'to fix, to repair, to correct', group: 'group1', masu: 'なおします', te: 'なおして', ta: 'なおした', nai: 'なおさない', nakatta: 'なおさなかった' },
  { id: 'v-059', dictionary: 'おもう', kanji: '思う', meaning: 'to think, to feel, to believe', group: 'group1', masu: 'おもいます', te: 'おもって', ta: 'おもった', nai: 'おもわない', nakatta: 'おもわなかった' },
  { id: 'v-060', dictionary: 'おくる', kanji: '送る', meaning: 'to send (letter, person)', group: 'group1', masu: 'おくります', te: 'おくって', ta: 'おくった', nai: 'おくらない', nakatta: 'おくらなかった' },
  { id: 'v-061', dictionary: 'かかる', meaning: 'to take (time or money)', group: 'group1', masu: 'かかります', te: 'かかって', ta: 'かかった', nai: 'かからない', nakatta: 'かからなかった' },
  { id: 'v-062', dictionary: 'かす', kanji: '貸す', meaning: 'to lend', group: 'group1', masu: 'かします', te: 'かして', ta: 'かした', nai: 'かさない', nakatta: 'かさなかった' },
  { id: 'v-063', dictionary: 'さく', kanji: '咲く', meaning: 'to bloom, to blossom', group: 'group1', masu: 'さきます', te: 'さいて', ta: 'さいた', nai: 'さかない', nakatta: 'さかなかった' },
  { id: 'v-064', dictionary: 'さす', kanji: '差す', meaning: 'to open/hold an umbrella (かさを〜)', group: 'group1', masu: 'さします', te: 'さして', ta: 'さした', nai: 'ささない', nakatta: 'ささなかった' },
  { id: 'v-065', dictionary: 'しまる', kanji: '閉まる', meaning: 'to close, to be shut (intransitive)', group: 'group1', masu: 'しまります', te: 'しまって', ta: 'しまった', nai: 'しまらない', nakatta: 'しまらなかった' },
  { id: 'v-066', dictionary: 'すう', kanji: '吸う', meaning: 'to breathe, to inhale, to smoke', group: 'group1', masu: 'すいます', te: 'すって', ta: 'すった', nai: 'すわない', nakatta: 'すわなかった' },
  { id: 'v-067', dictionary: 'すむ', kanji: '住む', meaning: 'to live, to reside in', group: 'group1', masu: 'すみます', te: 'すんで', ta: 'すんだ', nai: 'すまない', nakatta: 'すまなかった' },
  { id: 'v-068', dictionary: 'ちがう', kanji: '違う', meaning: 'to differ, to be different, to be wrong', group: 'group1', masu: 'ちがいます', te: 'ちがって', ta: 'ちがった', nai: 'ちがわない', nakatta: 'ちがわなかった' },
  { id: 'v-069', dictionary: 'つく', kanji: '着く', meaning: 'to arrive at, to reach', group: 'group1', masu: 'つきます', te: 'ついて', ta: 'ついた', nai: 'つかない', nakatta: 'つかなかった' },
  { id: 'v-070', dictionary: 'とぶ', kanji: '飛ぶ', meaning: 'to fly, to soar', group: 'group1', masu: 'とびます', te: 'とんで', ta: 'とんだ', nai: 'とばない', nakatta: 'とばなかった' },
  { id: 'v-071', dictionary: 'とる', kanji: '撮る', meaning: 'to take (a photograph)', group: 'group1', masu: 'とります', te: 'とって', ta: 'とった', nai: 'とらない', nakatta: 'とらなかった' },
  { id: 'v-072', dictionary: 'なく', kanji: '鳴く', meaning: 'to bark, to chirp, to cry (animals)', group: 'group1', masu: 'なきます', te: 'ないて', ta: 'ないた', nai: 'なかない', nakatta: 'なかなかった' },
  { id: 'v-073', dictionary: 'ならぶ', kanji: '並ぶ', meaning: 'to line up, to stand in line', group: 'group1', masu: 'ならびます', te: 'ならんで', ta: 'ならんだ', nai: 'ならばない', nakatta: 'ならばなかった' },
  { id: 'v-074', dictionary: 'のぼる', kanji: '登る', meaning: 'to climb (a mountain)', group: 'group1', masu: 'のぼります', te: 'のぼって', ta: 'のぼった', nai: 'のぼらない', nakatta: 'のぼらなかった' },
  { id: 'v-075', dictionary: 'ふく', kanji: '吹く', meaning: 'to blow (wind)', group: 'group1', masu: 'ふきます', te: 'ふいて', ta: 'ふいた', nai: 'ふかない', nakatta: 'ふかなかった' },
  { id: 'v-076', dictionary: 'ふる', kanji: '降る', meaning: 'to fall (rain, snow)', group: 'group1', masu: 'ふります', te: 'ふって', ta: 'ふった', nai: 'ふらない', nakatta: 'ふらなかった' },
  { id: 'v-077', dictionary: 'まがる', kanji: '曲がる', meaning: 'to turn (corner, right/left)', group: 'group1', masu: 'まがります', te: 'まがって', ta: 'まがった', nai: 'まがらない', nakatta: 'まがらなかった' },
  { id: 'v-078', dictionary: 'やる', meaning: 'to do; to give (to animals/plants)', group: 'group1', masu: 'やります', te: 'やって', ta: 'やった', nai: 'やらない', nakatta: 'やらなかった' },
  { id: 'v-079', dictionary: 'よぶ', kanji: '呼ぶ', meaning: 'to call, to summon, to invite', group: 'group1', masu: 'よびます', te: 'よんで', ta: 'よんだ', nai: 'よばない', nakatta: 'よばなかった' },
  { id: 'v-080', dictionary: 'わたす', kanji: '渡す', meaning: 'to hand over, to pass across', group: 'group1', masu: 'わたします', te: 'わたして', ta: 'わたした', nai: 'わたさない', nakatta: 'わたさなかった' },
  { id: 'v-081', dictionary: 'わたる', kanji: '渡る', meaning: 'to cross (street, bridge)', group: 'group1', masu: 'わたります', te: 'わたって', ta: 'わたった', nai: 'わたらない', nakatta: 'わたらなかった' },
  { id: 'v-082', dictionary: 'あく', kanji: '開く', meaning: 'to open (intransitive, door/store opens)', group: 'group1', masu: 'あきます', te: 'あいて', ta: 'あいた', nai: 'あかない', nakatta: 'あかなかった' },
  { id: 'v-083', dictionary: 'いう', kanji: '言う', meaning: 'to say, to tell', group: 'group1', masu: 'いいます', te: 'いって', ta: 'いった', nai: 'いわない', nakatta: 'いわなかった' },
  { id: 'v-084', dictionary: 'いる', kanji: '要る', meaning: 'to need, to require', group: 'group1', masu: 'いります', te: 'いって', ta: 'いった', nai: 'いらない', nakatta: 'いらなかった', note: 'Group 1 (要る: to need) — different from いる (Group 2: to exist)' },
  { id: 'v-085', dictionary: 'うごく', kanji: '動く', meaning: 'to move', group: 'group1', masu: 'うごきます', te: 'うごいて', ta: 'うごいた', nai: 'うごかない', nakatta: 'うごかなかった' },
  { id: 'v-086', dictionary: 'おもいだす', kanji: '思い出す', meaning: 'to recall, to remember', group: 'group1', masu: 'おもいだします', te: 'おもいだして', ta: 'おもいだした', nai: 'おもいださない', nakatta: 'おもいださなかった' },
  { id: 'v-087', dictionary: 'かつ', kanji: '勝つ', meaning: 'to win', group: 'group1', masu: 'かちます', te: 'かって', ta: 'かった', nai: 'かたない', nakatta: 'かたなかった' },
  { id: 'v-088', dictionary: 'こまる', kanji: '困る', meaning: 'to be troubled, to be at a loss, to have difficulty', group: 'group1', masu: 'こまります', te: 'こまって', ta: 'こまった', nai: 'こまらない', nakatta: 'こまらなかった' },
  { id: 'v-089', dictionary: 'しぬ', kanji: '死ぬ', meaning: 'to die, to pass away', group: 'group1', masu: 'しにます', te: 'しんで', ta: 'しんだ', nai: 'しなない', nakatta: 'しななかった' },
  { id: 'v-090', dictionary: 'つくる', kanji: '作る', meaning: 'to make, to produce, to create', group: 'group1', masu: 'つくります', te: 'つくって', ta: 'つくった', nai: 'つくらない', nakatta: 'つくらなかった' },
  { id: 'v-091', dictionary: 'なる', kanji: '成る', meaning: 'to become, to grow into', group: 'group1', masu: 'なります', te: 'なって', ta: 'なった', nai: 'ならない', nakatta: 'ならなかった' },
  { id: 'v-092', dictionary: 'はじまる', kanji: '始まる', meaning: 'to begin, to start (intransitive)', group: 'group1', masu: 'はじまります', te: 'はじまって', ta: 'はじまった', nai: 'はじまらない', nakatta: 'はじまらなかった' },
  { id: 'v-093', dictionary: 'ある', meaning: 'to exist, to be (inanimate objects)', group: 'group1', masu: 'あります', te: 'あって', ta: 'あった', nai: 'ない', nakatta: 'なかった', note: 'Negative: ない (not あらない)' },
  { id: 'v-094', dictionary: 'ぬる', kanji: '塗る', meaning: 'to paint / to spread', group: 'group1', masu: 'ぬります', te: 'ぬって', ta: 'ぬった', nai: 'ぬらない', nakatta: 'ぬらなかった' },
  { id: 'v-095', dictionary: 'やむ', kanji: '止む', meaning: 'to stop (rain, noise)', group: 'group1', masu: 'やみます', te: 'やんで', ta: 'やんだ', nai: 'やまない', nakatta: 'やまなかった' },
  { id: 'v-096', dictionary: 'くもる', kanji: '曇る', meaning: 'to become cloudy', group: 'group1', masu: 'くもります', te: 'くもって', ta: 'くもった', nai: 'くもらない', nakatta: 'くもらなかった' },
  { id: 'v-097', dictionary: 'もどる', kanji: '戻る', meaning: 'to turn back / to return', group: 'group1', masu: 'もどります', te: 'もどって', ta: 'もどった', nai: 'もどらない', nakatta: 'もどらなかった' },
  { id: 'v-098', dictionary: 'えさをやる', kanji: '餌をやる', meaning: 'to feed (animals)', group: 'group1', masu: 'えさをやります', te: 'えさをやって', ta: 'えさをやった', nai: 'えさをやらない', nakatta: 'えさをやらなかった' },
  { id: 'v-099', dictionary: 'たく', kanji: '炊く', meaning: 'to cook (rice)', group: 'group1', masu: 'たきます', te: 'たいて', ta: 'たいた', nai: 'たかない', nakatta: 'たかなかった' },
  { id: 'v-100', dictionary: 'わかす', kanji: '沸かす', meaning: 'to boil (water)', group: 'group1', masu: 'わかします', te: 'わかして', ta: 'わかした', nai: 'わかさない', nakatta: 'わかさなかった' },
  { id: 'v-101', dictionary: 'はこぶ', kanji: '運ぶ', meaning: 'to carry / to transport', group: 'group1', masu: 'はこびます', te: 'はこんで', ta: 'はこんだ', nai: 'はこばない', nakatta: 'はこばなかった' },
  { id: 'v-102', dictionary: 'ぬう', kanji: '縫う', meaning: 'to stitch / to sew', group: 'group1', masu: 'ぬいます', te: 'ぬって', ta: 'ぬった', nai: 'ぬわない', nakatta: 'ぬわなかった' },
  { id: 'v-103', dictionary: 'ひらく', kanji: '開く', meaning: 'to open / to spread out', group: 'group1', masu: 'ひらきます', te: 'ひらいて', ta: 'ひらいた', nai: 'ひらかない', nakatta: 'ひらかなかった' },
  { id: 'v-104', dictionary: 'そる', kanji: '剃る', meaning: 'to shave', group: 'group1', masu: 'そります', te: 'そって', ta: 'そった', nai: 'そらない', nakatta: 'そらなかった' },
  { id: 'v-105', dictionary: 'ころぶ', kanji: '転ぶ', meaning: 'to fall down', group: 'group1', masu: 'ころびます', te: 'ころんで', ta: 'ころんだ', nai: 'ころばない', nakatta: 'ころばなかった' },
  { id: 'v-106', dictionary: 'おどろく', kanji: '驚く', meaning: 'to be surprised', group: 'group1', masu: 'おどろきます', te: 'おどろいて', ta: 'おどろいた', nai: 'おどろかない', nakatta: 'おどろかなかった' },
  { id: 'v-107', dictionary: 'さわぐ', kanji: '騒ぐ', meaning: 'to make noise / to clamor', group: 'group1', masu: 'さわぎます', te: 'さわいで', ta: 'さわいだ', nai: 'さわがない', nakatta: 'さわがなかった' },
  { id: 'v-108', dictionary: 'うつす', kanji: '写す', meaning: 'to take a photo / to copy', group: 'group1', masu: 'うつします', te: 'うつして', ta: 'うつした', nai: 'うつさない', nakatta: 'うつさなかった' },
  { id: 'v-109', dictionary: 'よろこぶ', kanji: '喜ぶ', meaning: 'to be glad / to rejoice', group: 'group1', masu: 'よろこびます', te: 'よろこんで', ta: 'よろこんだ', nai: 'よろこばない', nakatta: 'よろこばなかった' },
  { id: 'v-110', dictionary: 'ぬすむ', kanji: '盗む', meaning: 'to steal', group: 'group1', masu: 'ぬすみます', te: 'ぬすんで', ta: 'ぬすんだ', nai: 'ぬすまない', nakatta: 'ぬすまなかった' },
  { id: 'v-111', dictionary: 'あやまる', kanji: '謝る', meaning: 'to apologize', group: 'group1', masu: 'あやまります', te: 'あやまって', ta: 'あやまった', nai: 'あやまらない', nakatta: 'あやまらなかった' },
  { id: 'v-112', dictionary: 'たべおわる', kanji: '食べ終わる', meaning: 'to finish eating', group: 'group1', masu: 'たべおわります', te: 'たべおわって', ta: 'たべおわった', nai: 'たべおわらない', nakatta: 'たべおわらなかった' },
  { id: 'v-113', dictionary: 'かさをさす', kanji: '傘を差す', meaning: 'to hold an umbrella', group: 'group1', masu: 'かさをさします', te: 'かさをさして', ta: 'かさをさした', nai: 'かさをささない', nakatta: 'かさをささなかった' },
  { id: 'v-114', dictionary: 'くつをはく', kanji: '靴を履く', meaning: 'to wear / put on shoes', group: 'group1', masu: 'くつをはきます', te: 'くつをはいて', ta: 'くつをはいた', nai: 'くつをはかない', nakatta: 'くつをはかなかった' },
  { id: 'v-115', dictionary: 'まく', kanji: '巻く / 蒔く', meaning: 'to wind / to roll up (or to sow seeds)', group: 'group1', masu: 'まきます', te: 'まいて', ta: 'まいた', nai: 'まかない', nakatta: 'まかなかった' },
  { id: 'v-116', dictionary: 'ひかる', kanji: '光る', meaning: 'to shine', group: 'group1', masu: 'ひかります', te: 'ひかって', ta: 'ひかった', nai: 'ひからない', nakatta: 'ひからなかった' },
  { id: 'v-117', dictionary: 'たす', kanji: '足す', meaning: 'to add (numbers)', group: 'group1', masu: 'たします', te: 'たして', ta: 'たした', nai: 'たさない', nakatta: 'たさなかった' },
  { id: 'v-118', dictionary: 'しまう', kanji: '仕舞う', meaning: 'to put away / keep in a safe place', group: 'group1', masu: 'しまいます', te: 'しまって', ta: 'しまった', nai: 'しまわない', nakatta: 'しまわなかった' },
  { id: 'v-119', dictionary: 'つるす', kanji: '吊るす', meaning: 'to hang (up)', group: 'group1', masu: 'つるします', te: 'つるして', ta: 'つるした', nai: 'つるさない', nakatta: 'つるさなかった' },
  { id: 'v-120', dictionary: 'かざる', kanji: '飾る', meaning: 'to decorate / to display', group: 'group1', masu: 'かざります', te: 'かざって', ta: 'かざった', nai: 'かざらない', nakatta: 'かざらなかった' },
  { id: 'v-121', dictionary: 'わる', kanji: '割る', meaning: 'to break / to divide', group: 'group1', masu: 'わります', te: 'わって', ta: 'わった', nai: 'わらない', nakatta: 'わらなかった', note: 'Active / transitive: to break or divide. Intransitive is 割れる (wareru).' },
  { id: 'v-122', dictionary: 'かぎがかかる', kanji: '鍵が掛かる', meaning: 'to get locked / to be locked', group: 'group1', masu: 'かぎがかかります', te: 'かぎがかかって', ta: 'かぎがかかった', nai: 'かぎがかからない', nakatta: 'かぎがかからなかった' },
  { id: 'v-123', dictionary: 'やく', kanji: '焼く', meaning: 'to roast / to grill / to bake', group: 'group1', masu: 'やきます', te: 'やいて', ta: 'やいた', nai: 'やかない', nakatta: 'やかなかった' },
  { id: 'v-124', dictionary: 'のこる', kanji: '残る', meaning: 'to remain / to be left over', group: 'group1', masu: 'のこります', te: 'のこって', ta: 'のこった', nai: 'のこらない', nakatta: 'のこらなかった' },
  { id: 'v-125', dictionary: 'あむ', kanji: '編む', meaning: 'to knit / to braid', group: 'group1', masu: 'あみます', te: 'あんで', ta: 'あんだ', nai: 'あまない', nakatta: 'あまなかった' },
  { id: 'v-126', dictionary: 'おとす', kanji: '落とす', meaning: 'to drop', group: 'group1', masu: 'おとします', te: 'おとして', ta: 'おとした', nai: 'おとさない', nakatta: 'おとさなかった' },
  { id: 'v-127', dictionary: 'ひろう', kanji: '拾う', meaning: 'to pick up / to gather', group: 'group1', masu: 'ひろいます', te: 'ひろって', ta: 'ひろった', nai: 'ひろわない', nakatta: 'ひろわなかった' },
  { id: 'v-128', dictionary: 'たがやす', kanji: '耕す', meaning: 'to plow / to till (the soil)', group: 'group1', masu: 'たがやします', te: 'たがやして', ta: 'たがやした', nai: 'たがやさない', nakatta: 'たがやさなかった' },
  { id: 'v-129', dictionary: 'しごとにつく', kanji: '仕事に就く', meaning: 'to find a job / to take up employment', group: 'group1', masu: 'しごとにつきます', te: 'しごとについて', ta: 'しごとについた', nai: 'しごとにつかない', nakatta: 'しごとにつかなかった' },
  { id: 'v-130', dictionary: 'しずむ', kanji: '沈む', meaning: 'to sink / to go down (sun)', group: 'group1', masu: 'しずみます', te: 'しずんで', ta: 'しずんだ', nai: 'しずまない', nakatta: 'しずまなかった' },
  { id: 'v-131', dictionary: 'さけぶ', kanji: '叫ぶ', meaning: 'to shout / to scream', group: 'group1', masu: 'さけびます', te: 'さけんで', ta: 'さけんだ', nai: 'さけばない', nakatta: 'さけばなかった' },
  { id: 'v-132', dictionary: 'こわす', kanji: '壊す', meaning: 'to break / to destroy', group: 'group1', masu: 'こわします', te: 'こわして', ta: 'こわした', nai: 'こわさない', nakatta: 'こわさなかった' },
  { id: 'v-133', dictionary: 'つむ', kanji: '積む', meaning: 'to pile up / to load', group: 'group1', masu: 'つみます', te: 'つんで', ta: 'つんだ', nai: 'つまない', nakatta: 'つまなかった' },
  { id: 'v-134', dictionary: 'ける', kanji: '蹴る', meaning: 'to kick', group: 'group1', masu: 'けります', te: 'けって', ta: 'けった', nai: 'けらない', nakatta: 'けらなかった', note: 'Irregular Godan verb: ends in -eru but conjugates as Group 1 (けります / けって).' },
  { id: 'v-135', dictionary: 'またがる', kanji: '跨がる', meaning: 'to sit astride / to straddle (bike, horse)', group: 'group1', masu: 'またがります', te: 'またがって', ta: 'またがった', nai: 'またがらない', nakatta: 'またがらなかった' },
  { id: 'v-136', dictionary: 'さそう', kanji: '誘う', meaning: 'to invite / to ask out', group: 'group1', masu: 'さそいます', te: 'さそって', ta: 'さそった', nai: 'さそわない', nakatta: 'さそわなかった' },
  { id: 'v-137', dictionary: 'うむ', kanji: '産む / 生む', meaning: 'to give birth / to produce', group: 'group1', masu: 'うみます', te: 'うんで', ta: 'うんだ', nai: 'うまない', nakatta: 'うまなかった' },

  // ── Group 2 (Ichidan / ru-verbs) ─────────────────────────────────
  { id: 'v-138', dictionary: 'つける', kanji: '点ける / 付ける', meaning: 'to turn on (light, electricity); to attach', group: 'group2', masu: 'つけます', te: 'つけて', ta: 'つけた', nai: 'つけない', nakatta: 'つけなかった' },
  { id: 'v-139', dictionary: 'あびる', kanji: '浴びる', meaning: 'to take a shower (シャワーを〜), to bathe', group: 'group2', masu: 'あびます', te: 'あびて', ta: 'あびた', nai: 'あびない', nakatta: 'あびなかった' },
  { id: 'v-140', dictionary: 'たべる', kanji: '食べる', meaning: 'to eat', group: 'group2', masu: 'たべます', te: 'たべて', ta: 'たべた', nai: 'たべない', nakatta: 'たべなかった' },
  { id: 'v-141', dictionary: 'みる', kanji: '見る', meaning: 'to see, to look, to watch', group: 'group2', masu: 'みます', te: 'みて', ta: 'みた', nai: 'みない', nakatta: 'みなかった' },
  { id: 'v-142', dictionary: 'おきる', kanji: '起きる', meaning: 'to wake up, to get up', group: 'group2', masu: 'おきます', te: 'おきて', ta: 'おきた', nai: 'おきない', nakatta: 'おきなかった' },
  { id: 'v-143', dictionary: 'ねる', kanji: '寝る', meaning: 'to sleep, to go to bed', group: 'group2', masu: 'ねます', te: 'ねて', ta: 'ねた', nai: 'ねない', nakatta: 'ねなかった' },
  { id: 'v-144', dictionary: 'でる', kanji: '出る', meaning: 'to exit, to go out, to leave', group: 'group2', masu: 'でます', te: 'でて', ta: 'でた', nai: 'でない', nakatta: 'でなかった' },
  { id: 'v-145', dictionary: 'おしえる', kanji: '教える', meaning: 'to teach, to tell, to inform', group: 'group2', masu: 'おしえます', te: 'おしえて', ta: 'おしえた', nai: 'おしえない', nakatta: 'おしえなかった' },
  { id: 'v-146', dictionary: 'かける', kanji: '掛ける', meaning: 'to make a call (でんわを〜), to put on glasses', group: 'group2', masu: 'かけます', te: 'かけて', ta: 'かけた', nai: 'かけない', nakatta: 'かけなかった' },
  { id: 'v-147', dictionary: 'あける', kanji: '開ける', meaning: 'to open (transitive, open something)', group: 'group2', masu: 'あけます', te: 'あけて', ta: 'あけた', nai: 'あけない', nakatta: 'あけなかった' },
  { id: 'v-148', dictionary: 'しめる', kanji: '閉める', meaning: 'to close, to shut (something, transitive)', group: 'group2', masu: 'しめます', te: 'しめて', ta: 'しめた', nai: 'しめない', nakatta: 'しめなかった' },
  { id: 'v-149', dictionary: 'かりる', kanji: '借りる', meaning: 'to borrow, to rent', group: 'group2', masu: 'かります', te: 'かりて', ta: 'かりた', nai: 'かりない', nakatta: 'かりなかった' },
  { id: 'v-150', dictionary: 'はじめる', kanji: '始める', meaning: 'to begin, to start (something)', group: 'group2', masu: 'はじめます', te: 'はじめて', ta: 'はじめた', nai: 'はじめない', nakatta: 'はじめなかった' },
  { id: 'v-151', dictionary: 'きる', kanji: '着る', meaning: 'to wear, to put on (upper body)', group: 'group2', masu: 'きます', te: 'きて', ta: 'きた', nai: 'きない', nakatta: 'きなかった', note: 'Group 2 (different from 切る Group 1)' },
  { id: 'v-152', dictionary: 'みせる', kanji: '見せる', meaning: 'to show, to display', group: 'group2', masu: 'みせます', te: 'みせて', ta: 'みせた', nai: 'みせない', nakatta: 'みせなかった' },
  { id: 'v-153', dictionary: 'つかれる', kanji: '疲れる', meaning: 'to get tired', group: 'group2', masu: 'つかれます', te: 'つかれて', ta: 'つかれた', nai: 'つかれない', nakatta: 'つかれなかった' },
  { id: 'v-154', dictionary: 'でかける', kanji: '出かける', meaning: 'to go out', group: 'group2', masu: 'でかけます', te: 'でかけて', ta: 'でかけた', nai: 'でかけない', nakatta: 'でかけなかった' },
  { id: 'v-155', dictionary: 'おぼえる', kanji: '覚える', meaning: 'to memorise, to remember', group: 'group2', masu: 'おぼえます', te: 'おぼえて', ta: 'おぼえた', nai: 'おぼえない', nakatta: 'おぼえなかった' },
  { id: 'v-156', dictionary: 'あげる', kanji: '上げる', meaning: 'to give (to someone)', group: 'group2', masu: 'あげます', te: 'あげて', ta: 'あげた', nai: 'あげない', nakatta: 'あげなかった' },
  { id: 'v-157', dictionary: 'くれる', meaning: 'to give (to me / in-group)', group: 'group2', masu: 'くれます', te: 'くれて', ta: 'くれた', nai: 'くれない', nakatta: 'くれなかった' },
  { id: 'v-158', dictionary: 'おりる', kanji: '降りる', meaning: 'to get off (vehicle)', group: 'group2', masu: 'おります', te: 'おりて', ta: 'おりた', nai: 'おりない', nakatta: 'おりなかった' },
  { id: 'v-159', dictionary: 'のりかえる', kanji: '乗り換える', meaning: 'to transfer (trains/buses)', group: 'group2', masu: 'のりかえます', te: 'のりかえて', ta: 'のりかえた', nai: 'のりかえない', nakatta: 'のりかえなかった' },
  { id: 'v-160', dictionary: 'うける', kanji: '受ける', meaning: 'to receive, to take (exam)', group: 'group2', masu: 'うけます', te: 'うけて', ta: 'うけた', nai: 'うけない', nakatta: 'うけなかった' },
  { id: 'v-161', dictionary: 'かたづける', kanji: '片付ける', meaning: 'to tidy up, to put away', group: 'group2', masu: 'かたづけます', te: 'かたづけて', ta: 'かたづけた', nai: 'かたづけない', nakatta: 'かたづけなかった' },
  { id: 'v-162', dictionary: 'ふえる', kanji: '増える', meaning: 'to increase', group: 'group2', masu: 'ふえます', te: 'ふえて', ta: 'ふえた', nai: 'ふえない', nakatta: 'ふえなかった' },
  { id: 'v-163', dictionary: 'みえる', kanji: '見える', meaning: 'to be visible, can see', group: 'group2', masu: 'みえます', te: 'みえて', ta: 'みえた', nai: 'みえない', nakatta: 'みえなかった' },
  { id: 'v-164', dictionary: 'きこえる', kanji: '聞こえる', meaning: 'to be audible, can hear', group: 'group2', masu: 'きこえます', te: 'きこえて', ta: 'きこえた', nai: 'きこえない', nakatta: 'きこえなかった' },
  { id: 'v-165', dictionary: 'かんがえる', kanji: '考える', meaning: 'to think, to consider', group: 'group2', masu: 'かんがえます', te: 'かんがえて', ta: 'かんがえた', nai: 'かんがえない', nakatta: 'かんがえなかった' },
  { id: 'v-166', dictionary: 'きめる', kanji: '決める', meaning: 'to decide', group: 'group2', masu: 'きめます', te: 'きめて', ta: 'きめた', nai: 'きめない', nakatta: 'きめなかった' },
  { id: 'v-167', dictionary: 'つたえる', kanji: '伝える', meaning: 'to convey, to tell, to pass on', group: 'group2', masu: 'つたえます', te: 'つたえて', ta: 'つたえた', nai: 'つたえない', nakatta: 'つたえなかった' },
  { id: 'v-168', dictionary: 'うまれる', kanji: '生まれる', meaning: 'to be born', group: 'group2', masu: 'うまれます', te: 'うまれて', ta: 'うまれた', nai: 'うまれない', nakatta: 'うまれなかった' },
  { id: 'v-169', dictionary: 'きえる', kanji: '消える', meaning: 'to go out (light, fire), to disappear', group: 'group2', masu: 'きえます', te: 'きえて', ta: 'きえた', nai: 'きえない', nakatta: 'きえなかった' },
  { id: 'v-170', dictionary: 'こたえる', kanji: '答える', meaning: 'to answer, to reply', group: 'group2', masu: 'こたえます', te: 'こたえて', ta: 'こたえた', nai: 'こたえない', nakatta: 'こたえなかった' },
  { id: 'v-171', dictionary: 'つとめる', kanji: '勤める', meaning: 'to work for, to be employed at', group: 'group2', masu: 'つとめます', te: 'つとめて', ta: 'つとめた', nai: 'つとめない', nakatta: 'つとめなかった' },
  { id: 'v-172', dictionary: 'ならべる', kanji: '並べる', meaning: 'to line up, to arrange (transitive)', group: 'group2', masu: 'ならべます', te: 'ならべて', ta: 'ならべた', nai: 'ならべない', nakatta: 'ならべなかった' },
  { id: 'v-173', dictionary: 'わすれる', kanji: '忘れる', meaning: 'to forget', group: 'group2', masu: 'わすれます', te: 'わすれて', ta: 'わすれた', nai: 'わすれない', nakatta: 'わすれなかった' },
  { id: 'v-174', dictionary: 'いれる', kanji: '入れる', meaning: 'to put in, to insert', group: 'group2', masu: 'いれます', te: 'いれて', ta: 'いれた', nai: 'いれない', nakatta: 'いれなかった' },
  { id: 'v-175', dictionary: 'できる', kanji: '出来る', meaning: 'to be able to, can do; to be completed', group: 'group2', masu: 'できます', te: 'できて', ta: 'できた', nai: 'できない', nakatta: 'できなかった' },
  { id: 'v-176', dictionary: 'はれる', kanji: '晴れる', meaning: 'to clear up, to be sunny', group: 'group2', masu: 'はれます', te: 'はれて', ta: 'はれた', nai: 'はれない', nakatta: 'はれなかった' },
  { id: 'v-177', dictionary: 'とめる', kanji: '止める', meaning: 'to stop (something, transitive)', group: 'group2', masu: 'とめます', te: 'とめて', ta: 'とめた', nai: 'とめない', nakatta: 'とめなかった' },
  { id: 'v-178', dictionary: 'さげる', kanji: '下げる', meaning: 'to lower / to hang down', group: 'group2', masu: 'さげます', te: 'さげて', ta: 'さげた', nai: 'さげない', nakatta: 'さげなかった' },
  { id: 'v-179', dictionary: 'ながれる', kanji: '流れる', meaning: 'to flow', group: 'group2', masu: 'ながれます', te: 'ながれて', ta: 'ながれた', nai: 'ながれない', nakatta: 'ながれなかった' },

  // ── Irregular verbs ───────────────────────────────────────────────
  { id: 'v-180', dictionary: 'する', meaning: 'to do', group: 'irregular', masu: 'します', te: 'して', ta: 'した', nai: 'しない', nakatta: 'しなかった' },
  { id: 'v-181', dictionary: 'くる', kanji: '来る', meaning: 'to come', group: 'irregular', masu: 'きます', te: 'きて', ta: 'きた', nai: 'こない', nakatta: 'こなかった' },
  { id: 'v-182', dictionary: 'べんきょうする', kanji: '勉強する', meaning: 'to study', group: 'irregular', masu: 'べんきょうします', te: 'べんきょうして', ta: 'べんきょうした', nai: 'べんきょうしない', nakatta: 'べんきょうしなかった' },
  { id: 'v-183', dictionary: 'しごとをする', kanji: '仕事をする', meaning: 'to work, to do a job', group: 'irregular', masu: 'しごとをします', te: 'しごとをして', ta: 'しごとをした', nai: 'しごとをしない', nakatta: 'しごとをしなかった' },
  { id: 'v-184', dictionary: 'けっこんする', kanji: '結婚する', meaning: 'to get married', group: 'irregular', masu: 'けっこんします', te: 'けっこんして', ta: 'けっこんした', nai: 'けっこんしない', nakatta: 'けっこんしなかった' },
  { id: 'v-185', dictionary: 'でんわする', kanji: '電話する', meaning: 'to make a telephone call', group: 'irregular', masu: 'でんわします', te: 'でんわして', ta: 'でんわした', nai: 'でんわしない', nakatta: 'でんわしなかった' },
  { id: 'v-186', dictionary: 'さんぽする', kanji: '散歩する', meaning: 'to take a walk, to stroll', group: 'irregular', masu: 'さんぽします', te: 'さんぽして', ta: 'さんぽした', nai: 'さんぽしない', nakatta: 'さんぽしなかった' },
  { id: 'v-187', dictionary: 'りょこうする', kanji: '旅行する', meaning: 'to travel, to take a trip', group: 'irregular', masu: 'りょこうします', te: 'りょこうして', ta: 'りょこうした', nai: 'りょこうしない', nakatta: 'りょこうしなかった' },
]

// ─── 12. N5 KANJI 110 ──────────────────────────────────────────────────────

export interface KanjiRef {
  id: string
  character: string
  onyomi: string[]
  kunyomi: string[]
  meaning: string
  strokeCount: number
  example: string   // example word using the kanji
  exampleMeaning: string
  category: string
}

export const n5Kanji110: KanjiRef[] = [
  // Numbers
  { id: 'k125-001', character: '一', onyomi: ['いち', 'いつ'], kunyomi: ['ひと.つ'], meaning: 'one', strokeCount: 1, example: '一日', exampleMeaning: 'one day', category: 'Numbers' },
  { id: 'k125-002', character: '二', onyomi: ['に'], kunyomi: ['ふた.つ'], meaning: 'two', strokeCount: 2, example: '二人', exampleMeaning: 'two people', category: 'Numbers' },
  { id: 'k125-003', character: '三', onyomi: ['さん'], kunyomi: ['み.つ'], meaning: 'three', strokeCount: 3, example: '三月', exampleMeaning: 'March', category: 'Numbers' },
  { id: 'k125-004', character: '四', onyomi: ['し'], kunyomi: ['よ.つ', 'よん'], meaning: 'four', strokeCount: 5, example: '四時', exampleMeaning: '4 o\'clock', category: 'Numbers' },
  { id: 'k125-005', character: '五', onyomi: ['ご'], kunyomi: ['いつ.つ'], meaning: 'five', strokeCount: 4, example: '五分', exampleMeaning: '5 minutes', category: 'Numbers' },
  { id: 'k125-006', character: '六', onyomi: ['ろく', 'りく'], kunyomi: ['む.つ'], meaning: 'six', strokeCount: 4, example: '六月', exampleMeaning: 'June', category: 'Numbers' },
  { id: 'k125-007', character: '七', onyomi: ['しち'], kunyomi: ['なな.つ'], meaning: 'seven', strokeCount: 2, example: '七時', exampleMeaning: '7 o\'clock', category: 'Numbers' },
  { id: 'k125-008', character: '八', onyomi: ['はち'], kunyomi: ['や.つ'], meaning: 'eight', strokeCount: 2, example: '八月', exampleMeaning: 'August', category: 'Numbers' },
  { id: 'k125-009', character: '九', onyomi: ['く', 'きゅう'], kunyomi: ['ここの.つ'], meaning: 'nine', strokeCount: 2, example: '九時', exampleMeaning: '9 o\'clock', category: 'Numbers' },
  { id: 'k125-010', character: '十', onyomi: ['じゅう', 'じっ'], kunyomi: ['とお'], meaning: 'ten', strokeCount: 2, example: '十分', exampleMeaning: '10 minutes', category: 'Numbers' },
  { id: 'k125-011', character: '百', onyomi: ['ひゃく'], kunyomi: [], meaning: 'hundred', strokeCount: 6, example: '百円', exampleMeaning: '100 yen', category: 'Numbers' },
  { id: 'k125-012', character: '千', onyomi: ['せん'], kunyomi: ['ち'], meaning: 'thousand', strokeCount: 3, example: '千円', exampleMeaning: '1000 yen', category: 'Numbers' },
  { id: 'k125-013', character: '万', onyomi: ['まん', 'ばん'], kunyomi: [], meaning: 'ten thousand', strokeCount: 3, example: '一万円', exampleMeaning: '10,000 yen', category: 'Numbers' },

  // Time
  { id: 'k125-014', character: '年', onyomi: ['ねん'], kunyomi: ['とし'], meaning: 'year', strokeCount: 6, example: '今年', exampleMeaning: 'this year', category: 'Time' },
  { id: 'k125-015', character: '月', onyomi: ['げつ', 'がつ'], kunyomi: ['つき'], meaning: 'month / moon', strokeCount: 4, example: '月曜日', exampleMeaning: 'Monday', category: 'Time' },
  { id: 'k125-016', character: '日', onyomi: ['にち', 'じつ'], kunyomi: ['ひ', 'か'], meaning: 'day / sun', strokeCount: 4, example: '日曜日', exampleMeaning: 'Sunday', category: 'Time' },
  { id: 'k125-017', character: '時', onyomi: ['じ'], kunyomi: ['とき'], meaning: 'time / hour', strokeCount: 10, example: '何時', exampleMeaning: 'what time', category: 'Time' },
  { id: 'k125-018', character: '分', onyomi: ['ふん', 'ぶん'], kunyomi: ['わ.かる'], meaning: 'minute / understand', strokeCount: 4, example: '五分', exampleMeaning: '5 minutes', category: 'Time' },
  { id: 'k125-019', character: '半', onyomi: ['はん'], kunyomi: ['なか.ば'], meaning: 'half', strokeCount: 5, example: '三時半', exampleMeaning: '3:30', category: 'Time' },
  { id: 'k125-020', character: '今', onyomi: ['こん', 'きん'], kunyomi: ['いま'], meaning: 'now / this', strokeCount: 4, example: '今日', exampleMeaning: 'today', category: 'Time' },
  { id: 'k125-021', character: '毎', onyomi: ['まい'], kunyomi: [], meaning: 'every', strokeCount: 6, example: '毎日', exampleMeaning: 'every day', category: 'Time' },
  { id: 'k125-022', character: '週', onyomi: ['しゅう'], kunyomi: [], meaning: 'week', strokeCount: 11, example: '今週', exampleMeaning: 'this week', category: 'Time' },
  { id: 'k125-023', character: '曜', onyomi: ['よう'], kunyomi: [], meaning: 'day of the week', strokeCount: 18, example: '水曜日', exampleMeaning: 'Wednesday', category: 'Time' },
  { id: 'k125-024', character: '前', onyomi: ['ぜん'], kunyomi: ['まえ'], meaning: 'before / front', strokeCount: 9, example: '午前', exampleMeaning: 'AM', category: 'Time' },
  { id: 'k125-025', character: '後', onyomi: ['ご', 'こう'], kunyomi: ['あと', 'うし.ろ'], meaning: 'after / behind', strokeCount: 9, example: '午後', exampleMeaning: 'PM', category: 'Time' },

  // People
  { id: 'k125-026', character: '人', onyomi: ['じん', 'にん'], kunyomi: ['ひと'], meaning: 'person', strokeCount: 2, example: '日本人', exampleMeaning: 'Japanese person', category: 'People' },
  { id: 'k125-027', character: '男', onyomi: ['だん', 'なん'], kunyomi: ['おとこ'], meaning: 'man / male', strokeCount: 7, example: '男の子', exampleMeaning: 'boy', category: 'People' },
  { id: 'k125-028', character: '女', onyomi: ['じょ', 'にょ'], kunyomi: ['おんな'], meaning: 'woman / female', strokeCount: 3, example: '女の人', exampleMeaning: 'woman', category: 'People' },
  { id: 'k125-029', character: '子', onyomi: ['し', 'す'], kunyomi: ['こ'], meaning: 'child', strokeCount: 3, example: '子供', exampleMeaning: 'child', category: 'People' },
  { id: 'k125-030', character: '友', onyomi: ['ゆう'], kunyomi: ['とも'], meaning: 'friend', strokeCount: 4, example: '友達', exampleMeaning: 'friend', category: 'People' },
  { id: 'k125-031', character: '父', onyomi: ['ふ'], kunyomi: ['ちち'], meaning: 'father', strokeCount: 4, example: 'お父さん', exampleMeaning: 'father (polite)', category: 'People' },
  { id: 'k125-032', character: '母', onyomi: ['ぼ'], kunyomi: ['はは'], meaning: 'mother', strokeCount: 5, example: 'お母さん', exampleMeaning: 'mother (polite)', category: 'People' },
  { id: 'k125-033', character: '先', onyomi: ['せん'], kunyomi: ['さき'], meaning: 'ahead / previous', strokeCount: 6, example: '先生', exampleMeaning: 'teacher', category: 'People' },
  { id: 'k125-034', character: '生', onyomi: ['せい', 'しょう'], kunyomi: ['い.きる', 'う.まれる'], meaning: 'life / born', strokeCount: 5, example: '学生', exampleMeaning: 'student', category: 'People' },

  // Nature
  { id: 'k125-035', character: '山', onyomi: ['さん'], kunyomi: ['やま'], meaning: 'mountain', strokeCount: 3, example: '山田', exampleMeaning: 'Yamada (surname)', category: 'Nature' },
  { id: 'k125-036', character: '川', onyomi: ['せん'], kunyomi: ['かわ'], meaning: 'river', strokeCount: 3, example: '川口', exampleMeaning: 'Kawaguchi', category: 'Nature' },
  { id: 'k125-037', character: '田', onyomi: ['でん'], kunyomi: ['た'], meaning: 'rice field', strokeCount: 5, example: '田中', exampleMeaning: 'Tanaka (surname)', category: 'Nature' },
  { id: 'k125-038', character: '木', onyomi: ['もく', 'ぼく'], kunyomi: ['き'], meaning: 'tree / wood', strokeCount: 4, example: '木曜日', exampleMeaning: 'Thursday', category: 'Nature' },
  { id: 'k125-039', character: '花', onyomi: ['か'], kunyomi: ['はな'], meaning: 'flower', strokeCount: 7, example: 'お花見', exampleMeaning: 'flower viewing', category: 'Nature' },
  { id: 'k125-040', character: '空', onyomi: ['くう'], kunyomi: ['そら', 'あ.く'], meaning: 'sky / empty', strokeCount: 8, example: '空', exampleMeaning: 'sky', category: 'Nature' },
  { id: 'k125-041', character: '雨', onyomi: ['う'], kunyomi: ['あめ'], meaning: 'rain', strokeCount: 8, example: '大雨', exampleMeaning: 'heavy rain', category: 'Nature' },
  { id: 'k125-042', character: '火', onyomi: ['か'], kunyomi: ['ひ'], meaning: 'fire', strokeCount: 4, example: '火曜日', exampleMeaning: 'Tuesday', category: 'Nature' },
  { id: 'k125-043', character: '水', onyomi: ['すい'], kunyomi: ['みず'], meaning: 'water', strokeCount: 4, example: '水曜日', exampleMeaning: 'Wednesday', category: 'Nature' },
  { id: 'k125-044', character: '土', onyomi: ['ど', 'と'], kunyomi: ['つち'], meaning: 'earth / soil', strokeCount: 3, example: '土曜日', exampleMeaning: 'Saturday', category: 'Nature' },
  { id: 'k125-045', character: '金', onyomi: ['きん', 'こん'], kunyomi: ['かね'], meaning: 'gold / money', strokeCount: 8, example: '金曜日', exampleMeaning: 'Friday', category: 'Nature' },

  // Places
  { id: 'k125-046', character: '国', onyomi: ['こく'], kunyomi: ['くに'], meaning: 'country', strokeCount: 8, example: '外国', exampleMeaning: 'foreign country', category: 'Places' },
  { id: 'k125-047', character: '外', onyomi: ['がい', 'げ'], kunyomi: ['そと'], meaning: 'outside', strokeCount: 5, example: '外国人', exampleMeaning: 'foreigner', category: 'Places' },
  { id: 'k125-048', character: '中', onyomi: ['ちゅう'], kunyomi: ['なか'], meaning: 'inside / middle', strokeCount: 4, example: '中学校', exampleMeaning: 'middle school', category: 'Places' },
  { id: 'k125-049', character: '上', onyomi: ['じょう', 'しょう'], kunyomi: ['うえ', 'のぼ.る'], meaning: 'above / up', strokeCount: 3, example: '上手', exampleMeaning: 'skillful', category: 'Places' },
  { id: 'k125-050', character: '下', onyomi: ['か', 'げ'], kunyomi: ['した', 'さ.がる'], meaning: 'below / down', strokeCount: 3, example: '地下', exampleMeaning: 'underground', category: 'Places' },
  { id: 'k125-051', character: '右', onyomi: ['ゆう'], kunyomi: ['みぎ'], meaning: 'right', strokeCount: 5, example: '右側', exampleMeaning: 'right side', category: 'Places' },
  { id: 'k125-052', character: '左', onyomi: ['さ'], kunyomi: ['ひだり'], meaning: 'left', strokeCount: 5, example: '左手', exampleMeaning: 'left hand', category: 'Places' },
  { id: 'k125-053', character: '東', onyomi: ['とう'], kunyomi: ['ひがし'], meaning: 'east', strokeCount: 8, example: '東京', exampleMeaning: 'Tokyo', category: 'Places' },
  { id: 'k125-054', character: '西', onyomi: ['せい', 'さい'], kunyomi: ['にし'], meaning: 'west', strokeCount: 6, example: '関西', exampleMeaning: 'Kansai', category: 'Places' },
  { id: 'k125-055', character: '南', onyomi: ['なん', 'な'], kunyomi: ['みなみ'], meaning: 'south', strokeCount: 9, example: '南口', exampleMeaning: 'south exit', category: 'Places' },
  { id: 'k125-056', character: '北', onyomi: ['ほく'], kunyomi: ['きた'], meaning: 'north', strokeCount: 5, example: '北海道', exampleMeaning: 'Hokkaido', category: 'Places' },
  { id: 'k125-057', character: '駅', onyomi: ['えき'], kunyomi: [], meaning: 'station', strokeCount: 14, example: '東京駅', exampleMeaning: 'Tokyo Station', category: 'Places' },
  { id: 'k125-058', character: '店', onyomi: ['てん'], kunyomi: ['みせ'], meaning: 'store / shop', strokeCount: 8, example: 'お店', exampleMeaning: 'store', category: 'Places' },

  // Actions / Verbs in Kanji
  { id: 'k125-059', character: '行', onyomi: ['こう', 'ぎょう'], kunyomi: ['い.く', 'おこな.う'], meaning: 'to go', strokeCount: 6, example: '旅行', exampleMeaning: 'travel', category: 'Actions' },
  { id: 'k125-060', character: '来', onyomi: ['らい'], kunyomi: ['く.る', 'き.たる'], meaning: 'to come', strokeCount: 7, example: '来年', exampleMeaning: 'next year', category: 'Actions' },
  { id: 'k125-061', character: '見', onyomi: ['けん'], kunyomi: ['み.る'], meaning: 'to see', strokeCount: 7, example: '見学', exampleMeaning: 'field trip', category: 'Actions' },
  { id: 'k125-062', character: '聞', onyomi: ['ぶん', 'もん'], kunyomi: ['き.く'], meaning: 'to hear / to listen', strokeCount: 14, example: '新聞', exampleMeaning: 'newspaper', category: 'Actions' },
  { id: 'k125-063', character: '話', onyomi: ['わ'], kunyomi: ['はな.す'], meaning: 'to speak / story', strokeCount: 13, example: '電話', exampleMeaning: 'telephone', category: 'Actions' },
  { id: 'k125-064', character: '読', onyomi: ['どく'], kunyomi: ['よ.む'], meaning: 'to read', strokeCount: 14, example: '読書', exampleMeaning: 'reading (books)', category: 'Actions' },
  { id: 'k125-065', character: '書', onyomi: ['しょ'], kunyomi: ['か.く'], meaning: 'to write', strokeCount: 10, example: '教科書', exampleMeaning: 'textbook', category: 'Actions' },
  { id: 'k125-066', character: '食', onyomi: ['しょく'], kunyomi: ['た.べる'], meaning: 'to eat / food', strokeCount: 9, example: '食堂', exampleMeaning: 'dining hall', category: 'Actions' },
  { id: 'k125-067', character: '飲', onyomi: ['いん'], kunyomi: ['の.む'], meaning: 'to drink', strokeCount: 12, example: '飲み物', exampleMeaning: 'drink / beverage', category: 'Actions' },
  { id: 'k125-068', character: '買', onyomi: ['ばい'], kunyomi: ['か.う'], meaning: 'to buy', strokeCount: 12, example: '買い物', exampleMeaning: 'shopping', category: 'Actions' },
  { id: 'k125-069', character: '休', onyomi: ['きゅう'], kunyomi: ['やす.む'], meaning: 'to rest', strokeCount: 6, example: '休み', exampleMeaning: 'holiday / rest', category: 'Actions' },
  { id: 'k125-070', character: '起', onyomi: ['き'], kunyomi: ['お.きる'], meaning: 'to rise / to happen', strokeCount: 10, example: '起きる', exampleMeaning: 'to wake up', category: 'Actions' },
  { id: 'k125-071', character: '寝', onyomi: ['しん'], kunyomi: ['ね.る'], meaning: 'to sleep', strokeCount: 13, example: '寝室', exampleMeaning: 'bedroom', category: 'Actions' },
  { id: 'k125-072', character: '出', onyomi: ['しゅつ', 'すい'], kunyomi: ['で.る', 'だ.す'], meaning: 'to exit / to put out', strokeCount: 5, example: '出口', exampleMeaning: 'exit', category: 'Actions' },
  { id: 'k125-073', character: '入', onyomi: ['にゅう'], kunyomi: ['い.る', 'はい.る'], meaning: 'to enter', strokeCount: 2, example: '入口', exampleMeaning: 'entrance', category: 'Actions' },

  // School / Study
  { id: 'k125-074', character: '学', onyomi: ['がく'], kunyomi: ['まな.ぶ'], meaning: 'to learn / study', strokeCount: 8, example: '大学', exampleMeaning: 'university', category: 'School' },
  { id: 'k125-075', character: '校', onyomi: ['こう'], kunyomi: [], meaning: 'school', strokeCount: 10, example: '高校', exampleMeaning: 'high school', category: 'School' },
  { id: 'k125-076', character: '語', onyomi: ['ご'], kunyomi: ['かた.る'], meaning: 'language / word', strokeCount: 14, example: '日本語', exampleMeaning: 'Japanese language', category: 'School' },
  { id: 'k125-077', character: '字', onyomi: ['じ'], kunyomi: ['あざ'], meaning: 'character / letter', strokeCount: 6, example: '漢字', exampleMeaning: 'kanji', category: 'School' },
  { id: 'k125-078', character: '文', onyomi: ['ぶん', 'もん'], kunyomi: ['ふみ'], meaning: 'sentence / writing', strokeCount: 4, example: '作文', exampleMeaning: 'composition', category: 'School' },
  { id: 'k125-079', character: '本', onyomi: ['ほん'], kunyomi: ['もと'], meaning: 'book / origin', strokeCount: 5, example: '日本', exampleMeaning: 'Japan', category: 'School' },

  // Body / Health
  { id: 'k125-080', character: '気', onyomi: ['き', 'け'], kunyomi: [], meaning: 'spirit / energy / feeling', strokeCount: 10, example: '元気', exampleMeaning: 'healthy / energetic', category: 'Health' },
  { id: 'k125-081', character: '元', onyomi: ['げん', 'がん'], kunyomi: ['もと'], meaning: 'origin / health', strokeCount: 4, example: '元気', exampleMeaning: 'energetic', category: 'Health' },
  { id: 'k125-082', character: '手', onyomi: ['しゅ'], kunyomi: ['て'], meaning: 'hand', strokeCount: 4, example: '手紙', exampleMeaning: 'letter', category: 'Health' },
  { id: 'k125-083', character: '目', onyomi: ['もく', 'ぼく'], kunyomi: ['め'], meaning: 'eye', strokeCount: 5, example: '目的', exampleMeaning: 'purpose / goal', category: 'Health' },
  { id: 'k125-084', character: '口', onyomi: ['こう', 'く'], kunyomi: ['くち'], meaning: 'mouth', strokeCount: 3, example: '入口', exampleMeaning: 'entrance', category: 'Health' },
  { id: 'k125-085', character: '耳', onyomi: ['じ'], kunyomi: ['みみ'], meaning: 'ear', strokeCount: 6, example: '耳鼻科', exampleMeaning: 'ENT (ear-nose-throat)', category: 'Health' },
  { id: 'k125-086', character: '足', onyomi: ['そく'], kunyomi: ['あし', 'た.りる'], meaning: 'leg / foot / sufficient', strokeCount: 7, example: '足りる', exampleMeaning: 'to be enough', category: 'Health' },
  { id: 'k125-087', character: '頭', onyomi: ['とう', 'ず'], kunyomi: ['あたま'], meaning: 'head', strokeCount: 16, example: '頭痛', exampleMeaning: 'headache', category: 'Health' },

  // Home / Daily Life
  { id: 'k125-088', character: '家', onyomi: ['か', 'け'], kunyomi: ['いえ', 'うち'], meaning: 'house / home', strokeCount: 10, example: '家族', exampleMeaning: 'family', category: 'Home' },
  { id: 'k125-089', character: '車', onyomi: ['しゃ'], kunyomi: ['くるま'], meaning: 'car / vehicle', strokeCount: 7, example: '電車', exampleMeaning: 'electric train', category: 'Home' },
  { id: 'k125-090', character: '電', onyomi: ['でん'], kunyomi: [], meaning: 'electricity', strokeCount: 13, example: '電話', exampleMeaning: 'telephone', category: 'Home' },
  { id: 'k125-091', character: '門', onyomi: ['もん'], kunyomi: [], meaning: 'gate', strokeCount: 8, example: '専門', exampleMeaning: 'specialty', category: 'Home' },
  { id: 'k125-092', character: '道', onyomi: ['どう', 'とう'], kunyomi: ['みち'], meaning: 'road / way', strokeCount: 12, example: '北海道', exampleMeaning: 'Hokkaido', category: 'Home' },

  // Size / Amount
  { id: 'k125-093', character: '大', onyomi: ['だい', 'たい'], kunyomi: ['おお.きい'], meaning: 'big / large', strokeCount: 3, example: '大学', exampleMeaning: 'university', category: 'Size' },
  { id: 'k125-094', character: '小', onyomi: ['しょう'], kunyomi: ['ちい.さい', 'こ'], meaning: 'small', strokeCount: 3, example: '小学校', exampleMeaning: 'elementary school', category: 'Size' },
  { id: 'k125-095', character: '多', onyomi: ['た'], kunyomi: ['おお.い'], meaning: 'many / much', strokeCount: 6, example: '多い', exampleMeaning: 'many', category: 'Size' },
  { id: 'k125-096', character: '少', onyomi: ['しょう'], kunyomi: ['すく.ない', 'すこ.し'], meaning: 'few / little', strokeCount: 4, example: '少し', exampleMeaning: 'a little', category: 'Size' },
  { id: 'k125-097', character: '新', onyomi: ['しん'], kunyomi: ['あたら.しい'], meaning: 'new', strokeCount: 13, example: '新幹線', exampleMeaning: 'bullet train', category: 'Size' },
  { id: 'k125-098', character: '古', onyomi: ['こ'], kunyomi: ['ふる.い'], meaning: 'old', strokeCount: 5, example: '古い', exampleMeaning: 'old', category: 'Size' },
  { id: 'k125-099', character: '高', onyomi: ['こう'], kunyomi: ['たか.い'], meaning: 'high / expensive', strokeCount: 10, example: '高校', exampleMeaning: 'high school', category: 'Size' },
  { id: 'k125-100', character: '長', onyomi: ['ちょう'], kunyomi: ['なが.い'], meaning: 'long / chief', strokeCount: 8, example: '社長', exampleMeaning: 'company president', category: 'Size' },

  // Verbs / Misc
  { id: 'k125-101', character: '白', onyomi: ['はく'], kunyomi: ['しろ', 'しら'], meaning: 'white', strokeCount: 5, example: '白い', exampleMeaning: 'white', category: 'Colors' },
  { id: 'k125-102', character: '黒', onyomi: ['こく'], kunyomi: ['くろ'], meaning: 'black', strokeCount: 11, example: '黒い', exampleMeaning: 'black', category: 'Colors' },
  { id: 'k125-103', character: '赤', onyomi: ['せき'], kunyomi: ['あか'], meaning: 'red', strokeCount: 7, example: '赤い', exampleMeaning: 'red', category: 'Colors' },
  { id: 'k125-104', character: '青', onyomi: ['せい'], kunyomi: ['あお'], meaning: 'blue / green', strokeCount: 8, example: '青い', exampleMeaning: 'blue', category: 'Colors' },

  // Additional essential N5
  { id: 'k125-105', character: '何', onyomi: ['か', 'なん'], kunyomi: ['なに'], meaning: 'what', strokeCount: 7, example: '何時', exampleMeaning: 'what time', category: 'Questions' },
  { id: 'k125-106', character: '誰', onyomi: [], kunyomi: ['だれ'], meaning: 'who', strokeCount: 15, example: '誰ですか', exampleMeaning: 'who is it?', category: 'Questions' },
  { id: 'k125-107', character: '私', onyomi: ['し'], kunyomi: ['わたし', 'わたくし'], meaning: 'I / me', strokeCount: 7, example: '私', exampleMeaning: 'I / me', category: 'Pronouns' },
  { id: 'k125-108', character: '方', onyomi: ['ほう'], kunyomi: ['かた', 'がた'], meaning: 'direction / person (polite)', strokeCount: 4, example: 'あの方', exampleMeaning: 'that person (polite)', category: 'Pronouns' },
  { id: 'k125-109', character: '円', onyomi: ['えん'], kunyomi: ['まる.い'], meaning: 'yen / circle', strokeCount: 4, example: '百円', exampleMeaning: '100 yen', category: 'Money' },
  { id: 'k125-110', character: '間', onyomi: ['かん', 'けん'], kunyomi: ['あいだ', 'ま'], meaning: 'interval / between', strokeCount: 12, example: '時間', exampleMeaning: 'time / hour', category: 'Time' },

  // missing kanjis added later
  { id: 'k125-111', character: '自', onyomi: ['じ', 'し'], kunyomi: ['みずか.ら'], meaning: 'self / oneself', strokeCount: 6, example: '自分', exampleMeaning: 'oneself / myself', category: 'People' },
  { id: 'k125-112', character: '午', onyomi: ['ご'], kunyomi: [], meaning: 'noon / afternoon', strokeCount: 4, example: '午後', exampleMeaning: 'afternoon / PM', category: 'Time' },
  { id: 'k125-113', character: '天', onyomi: ['てん'], kunyomi: ['あめ', 'あま'], meaning: 'heaven / sky / weather', strokeCount: 4, example: '天気', exampleMeaning: 'weather', category: 'Nature' },
  { id: 'k125-114', character: '社', onyomi: ['しゃ'], kunyomi: ['やしろ'], meaning: 'company / shrine', strokeCount: 7, example: '会社', exampleMeaning: 'company', category: 'Places' },
  { id: 'k125-115', character: '名', onyomi: ['めい', 'みょう'], kunyomi: ['な'], meaning: 'name', strokeCount: 6, example: '名前', exampleMeaning: 'name', category: 'School' },
  { id: 'k125-116', character: '会', onyomi: ['かい', 'え'], kunyomi: ['あ.う'], meaning: 'to meet / association', strokeCount: 6, example: '会う', exampleMeaning: 'to meet', category: 'Actions' },
  { id: 'k125-117', character: '言', onyomi: ['げん', 'ごん'], kunyomi: ['い.う', 'こと'], meaning: 'to say / word', strokeCount: 7, example: '言う', exampleMeaning: 'to say', category: 'Actions' },
  { id: 'k125-118', character: '立', onyomi: ['りつ', 'りゅう'], kunyomi: ['た.つ', 'た.てる'], meaning: 'to stand', strokeCount: 5, example: '立つ', exampleMeaning: 'to stand', category: 'Actions' },
  { id: 'k125-119', character: '安', onyomi: ['あん'], kunyomi: ['やす.い'], meaning: 'cheap / peaceful', strokeCount: 6, example: '安い', exampleMeaning: 'cheap / inexpensive', category: 'Size' },
  { id: 'k125-120', character: '早', onyomi: ['そう', 'さっ'], kunyomi: ['はや.い', 'はや.まる'], meaning: 'early / fast', strokeCount: 6, example: '早い', exampleMeaning: 'early / fast', category: 'Size' },
  { id: 'k125-121', character: '力', onyomi: ['りょく', 'りき'], kunyomi: ['ちから'], meaning: 'power / strength', strokeCount: 2, example: '力', exampleMeaning: 'power / strength', category: 'Health' },
  { id: 'k125-122', character: '牛', onyomi: ['ぎゅう'], kunyomi: ['うし'], meaning: 'cow / cattle', strokeCount: 4, example: '牛肉', exampleMeaning: 'beef', category: 'Nature' },
  { id: 'k125-123', character: '馬', onyomi: ['ば'], kunyomi: ['うま', 'ま'], meaning: 'horse', strokeCount: 10, example: '馬', exampleMeaning: 'horse', category: 'Nature' },
  { id: 'k125-124', character: '魚', onyomi: ['ぎょ'], kunyomi: ['さかな', 'うお'], meaning: 'fish', strokeCount: 11, example: '魚', exampleMeaning: 'fish', category: 'Nature' },
  { id: 'k125-125', character: '我', onyomi: ['が'], kunyomi: ['われ', 'わ'], meaning: 'self / ego / selfish', strokeCount: 7, example: '我がまま', exampleMeaning: 'selfish / willful', category: 'Pronouns' },
]
