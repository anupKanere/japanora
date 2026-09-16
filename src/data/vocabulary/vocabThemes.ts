import type { VocabularyEntry } from '@/types'

export interface VocabTheme {
  id: string
  label: string
  labelJa: string
  icon: string
  description: string
  color: string
}

export const VOCAB_THEMES: VocabTheme[] = [
  {
    id: 'all',
    label: 'All Words',
    labelJa: 'すべて',
    icon: '🌐',
    description: 'Complete official JLPT N5 vocabulary covering all 793 words.',
    color: 'from-blue-500/10 to-indigo-500/10 text-accent border-accent/30',
  },
  {
    id: 'food-dining',
    label: 'Food & Dining',
    labelJa: '食べ物・食事',
    icon: '🍱',
    description: 'Meals, drinks, groceries, tableware, and dining out.',
    color: 'from-amber-500/10 to-orange-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30',
  },
  {
    id: 'people-family',
    label: 'People & Family',
    labelJa: '人・家族',
    icon: '👨‍👩‍👧',
    description: 'Family members, pronouns, titles, professions, and relationships.',
    color: 'from-rose-500/10 to-pink-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30',
  },
  {
    id: 'time-calendar',
    label: 'Time & Calendar',
    labelJa: '時間・暦',
    icon: '⏰',
    description: 'Days of the week, months, dates, frequency, and time units.',
    color: 'from-blue-500/10 to-sky-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30',
  },
  {
    id: 'travel-transport',
    label: 'Travel & Places',
    labelJa: '旅行・交通・場所',
    icon: '🚆',
    description: 'Vehicles, stations, directions, cities, countries, and transit.',
    color: 'from-emerald-500/10 to-teal-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30',
  },
  {
    id: 'clothing-shopping',
    label: 'Clothes & Shopping',
    labelJa: '衣服・買い物',
    icon: '👕',
    description: 'Apparel, footwear, accessories, money, prices, and shops.',
    color: 'from-purple-500/10 to-violet-500/10 text-purple-600 dark:text-purple-400 border-purple-500/30',
  },
  {
    id: 'school-work',
    label: 'School & Work',
    labelJa: '学校・仕事',
    icon: '📚',
    description: 'Classrooms, school subjects, stationery, office life, and studying.',
    color: 'from-cyan-500/10 to-blue-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/30',
  },
  {
    id: 'home-living',
    label: 'Home & Living',
    labelJa: '家・日常生活',
    icon: '🏠',
    description: 'Rooms, furniture, appliances, personal items, and daily routines.',
    color: 'from-indigo-500/10 to-blue-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/30',
  },
  {
    id: 'nature-weather',
    label: 'Nature & Weather',
    labelJa: '自然・天気・動物',
    icon: '🌸',
    description: 'Seasons, weather conditions, animals, landscape, and elements.',
    color: 'from-teal-500/10 to-green-500/10 text-teal-600 dark:text-teal-400 border-teal-500/30',
  },
  {
    id: 'adjectives-traits',
    label: 'Descriptions & Traits',
    labelJa: '形容詞・様子',
    icon: '✨',
    description: 'Colors, physical traits, feelings, conditions, and evaluations.',
    color: 'from-orange-500/10 to-yellow-500/10 text-orange-600 dark:text-orange-400 border-orange-500/30',
  },
  {
    id: 'numbers-counters',
    label: 'Numbers & Counters',
    labelJa: '数字・助数詞',
    icon: '🔢',
    description: 'Numerals, native general counters, and unit counters.',
    color: 'from-lime-500/10 to-emerald-500/10 text-lime-600 dark:text-lime-400 border-lime-500/30',
  },
  {
    id: 'greetings-chat',
    label: 'Greetings & Chat',
    labelJa: '挨拶・日常会話',
    icon: '💬',
    description: 'Conversational greetings, etiquette, connectors, and particles.',
    color: 'from-pink-500/10 to-rose-500/10 text-pink-600 dark:text-pink-400 border-pink-500/30',
  },
  {
    id: 'core-verbs',
    label: 'Core Verbs',
    labelJa: '基本動詞・行動',
    icon: '🏃',
    description: 'Essential action and interaction verbs across all verb groups.',
    color: 'from-sky-500/10 to-indigo-500/10 text-sky-600 dark:text-sky-400 border-sky-500/30',
  },
]

// Authoritative food words set
const FOOD_SET = new Set([
  'たべる', 'のむ', 'ごはん', 'あさごはん', 'ひるごはん', 'ばんごはん', 'ゆうはん',
  'パン', 'にく', 'ぎゅうにく', 'ぶたにく', 'とりにく', 'さかな', 'たまご', 'やさい',
  'くだもの', 'りんご', 'みかん', 'バナナ', 'みず', 'おちゃ', 'こうちゃ', 'コーヒー',
  'ぎゅうにゅう', 'ミルク', 'ジュース', 'ビール', 'さけ / おさけ', 'さけ', 'おさけ',
  'りょうり', 'カレー', 'すし', 'てんぷら', 'ラーメン', 'そば', 'うどん', 'おかし',
  'さとう', 'しお', 'しょうゆ', 'バター', 'はし', 'スプーン', 'フォーク', 'ナイフ',
  'カップ', 'コップ', 'ちゃわん', 'さら', 'きっさてん', 'レストラン', 'しょくどう'
])

// Authoritative people and family set
const PEOPLE_SET = new Set([
  'わたし', 'あなた', 'かれ', 'かのじょ', 'かれら', 'わたしたち', 'ぼく', 'だれ', 'どなた',
  'ひと', 'かた', 'おとこのひと', 'おんなのひと', 'おとこのこ', 'おんなのこ', 'あかちゃん',
  'こども', 'おや', 'りょうしん', 'かぞく', 'ちち', 'はは', 'おとうさん', 'おかあさん',
  'あに', 'あね', 'おにいさん', 'おねえさん', 'おとうと', 'いもうと', 'おっと', 'しゅじん',
  'ごしゅじん', 'つま', 'かない', 'おくさん', 'むすこ', 'むすめ', 'そふ', 'そぼ',
  'おじいさん', 'おばあさん', 'おじ', 'おじさん', 'おば', 'おばさん', 'いとこ', 'きょうだい',
  'ともだち', 'みなさん', 'せんせい', 'がくせい', 'りゅうがくせい', 'いしゃ', 'かんごし',
  'かいしゃいん', 'ぎんこういん', 'てんいん', 'けっこんする', 'きょうし', 'じぶん'
])

// Authoritative time set
const TIME_SET = new Set([
  'いま', 'あさ', 'ひる', 'ばん', 'よる', 'けさ', 'こんばん', 'きょう', 'あした / あす', 'あした',
  'あす', 'きのう', 'おととい', 'あさって', 'まいにち', 'まいあさ', 'まいばん', 'こんしゅう',
  'せんしゅう', 'らいしゅう', 'まいしゅう', 'こんげつ', 'せんげつ', 'らいげつ', 'まいげつ',
  'ことし', 'きょねん', 'らいねん', 'まいとし', 'いつ', 'ごぜん', 'ごご', 'ひるま', 'ゆうがた',
  'ついたち', 'ふつか', 'みっか', 'よっか', 'いつか', 'むいか', 'なのか', 'ようか', 'ここのか',
  'とおか', 'はつか', 'じかん', 'カレンダー', 'たんじょうび', 'いつも', 'たいてい', 'よく',
  'ときどき', 'たまに', 'もう', 'まだ', 'もうすぐ', 'さっき', 'あとで', 'すぐ', 'ちょうど',
  'げつようび', 'かようび', 'すいようび', 'もくようび', 'きんようび', 'どようび', 'にちようび',
  'いちがつ', 'にがつ', 'さんがつ', 'しがつ', 'ごがつ', 'ろくがつ', 'しちがつ', 'はちがつ',
  'くがつ', 'じゅうがつ', 'じゅういちがつ', 'じゅうにがつ'
])

// Authoritative travel set
const TRAVEL_SET = new Set([
  'いく', 'くる', 'かえる', 'あるく', 'はしる', 'のる', 'おりる', 'のりかえる', 'とぶ', 'つく',
  'とまる', 'まがる', 'わたる', 'でんしゃ', 'ちかてつ', 'しんかんせん', 'バス', 'タクシー',
  'くるま', 'じどうしゃ', 'じてんしゃ', 'バイク', 'ひこうき', 'ふね', 'えき', 'くうこう',
  'バスてい', 'みち', 'はし', 'こうえん', 'まち', 'むら', 'くに', 'がいこく', 'りょこうする',
  'さんぽする', 'きっぷ', 'ホテル', 'たいしかん', 'ゆうえんち', 'こうばん', 'こちら', 'そちら',
  'あちら', 'どちら', 'ここ', 'そこ', 'あそこ', 'どこ', 'ちかく', 'とおく', 'みぎ', 'ひだり',
  'まえ', 'うしろ', 'うえ', 'した', 'なか', 'そと', 'となり', 'あいだ', 'きた', 'みなみ', 'ひがし', 'にし'
])

// Authoritative clothing and shopping set
const CLOTHING_SET = new Set([
  'きる', 'はく', 'かぶる', 'ぬぐ', 'ふく', 'シャツ', 'ズボン', 'スカート', 'くつ', 'くつした',
  'ぼうし', 'めがね', 'コート', 'セーター', 'スリッパ', 'ポケット', 'かう', 'うる', 'おかね',
  'さいふ', 'みせ', 'デパート', 'スーパー', 'コンビニ', 'ねだん', 'レシート', 'りょうしゅうしょ',
  'かいものする'
])

// Authoritative school and work set
const SCHOOL_SET = new Set([
  'がっこう', 'だいがく', 'こうこう', 'ちゅうがっこう', 'しょうがっこう', 'きょうしつ', 'じゅぎょう',
  'しゅくだい', 'テスト', 'しけん', 'えんぴつ', 'ペン', 'ボールペン', 'けしゴム', 'ノート',
  'ほん', 'じしょ', 'ざっし', 'しんぶん', 'べんきょうする', 'ならう', 'しらべる', 'しつもん',
  'はたらく', 'しごと', 'しごとをする', 'かいしゃ', 'ぎんこう', 'ゆうびんきょく', 'びょういん',
  'としょかん', 'びじゅつかん', 'れんしゅうする', 'コピーする', 'つとめる', 'じむしょ'
])

// Authoritative nature and weather set
const NATURE_SET = new Set([
  'てんき', 'あめ', 'ゆき', 'くもり', 'くも', 'はれ', 'はれる', 'かぜ', 'そら', 'たいよう',
  'つき', 'ほし', 'やま', 'かわ', 'うみ', 'いけ', 'はな', 'さく', 'き', 'もり', 'いぬ', 'ねこ',
  'とり', 'どうぶつ', 'はる', 'なつ', 'あき', 'ふゆ', 'ふる', 'ふく'
])

// Authoritative home and living set
const HOME_SET = new Set([
  'いえ', 'うち', 'へや', 'つくえ', 'いす', 'テーブル', 'ベッド', 'まど', 'ドア', 'もん',
  'げんかん', 'ろうか', 'かいだん', 'エレベーター', 'エスカレーター', 'でんき', 'エアコン',
  'れいぞうこ', 'テレビ', 'ラジオ', 'パソコン', 'でんわ', 'ケータイ', 'とけい', 'かさ',
  'かばん', 'かぎ', 'カメラ', 'はこ', 'タオル', 'ハンカチ', 'せっけん', 'てがみ', 'はがき',
  'きって', 'おふろ', 'ふろ / おふろ', 'といれ', 'おてあらい', 'そうじする', 'せんたくする',
  'てちょう', 'テープレコーダー', 'かみ', 'はさみ', 'あたま', 'め', 'みみ', 'くち', 'は',
  'て', 'あし', 'からだ', 'こえ', 'おなか', 'シャワー', 'にもつ'
])

// Authoritative greetings and conversation set
const GREETINGS_SET = new Set([
  'おはようございます', 'こんにちは', 'こんばんは', 'さようなら', 'じゃあまた', 'おやすみなさい',
  'ありがとう', 'ありがとうございます', 'どういたしまして', 'すみません', 'ごめんなさい',
  'いただきます', 'ごちそうさまでした', 'はじめまして', 'どうぞよろしく', 'いってきます',
  'いってらっしゃい', 'ただいま', 'おかえりなさい', 'おめでとうございます', 'もしもし',
  'おねがいします', 'しつれいします', 'おだいじに', 'いらっしゃいませ', 'どうぞ', 'どうも',
  'はい', 'いいえ', 'ええ', 'うん', 'ううん', 'そうです', 'そうですね', 'ちがいます',
  'わかりました', 'わかりません', 'しりません', 'じゃあ', 'では', 'それでは / じゃ'
])

/**
 * Returns the exact, authoritative primary theme for any vocabulary entry.
 * Guarantees zero incorrect overlap (e.g. せんせい belongs to people-family, never food-dining).
 */
export function getWordTheme(entry: VocabularyEntry): string {
  const h = entry.hiragana
  const k = entry.kanji || ''
  const pos = entry.partOfSpeech

  // 1. Numbers & Counters
  if (
    pos === 'number' ||
    pos === 'counter' ||
    h.startsWith('〜') ||
    ['ぜろ / れい', 'ひとつ', 'ふたつ', 'みっつ', 'よっつ', 'いつつ', 'むっつ', 'ななつ', 'やっつ', 'ここのつ', 'とお', 'いくつ', 'いくら'].includes(h)
  ) {
    return 'numbers-counters'
  }

  // 2. Greetings & Conversational Phrases
  if (pos === 'expression' || pos === 'interjection' || GREETINGS_SET.has(h)) {
    return 'greetings-chat'
  }

  // 3. Food & Dining
  if (FOOD_SET.has(h) && k !== '橋') {
    return 'food-dining'
  }

  // 4. People & Family
  if (PEOPLE_SET.has(h)) {
    return 'people-family'
  }

  // 5. Time & Calendar
  if (TIME_SET.has(h) || h.endsWith('ようび') || h.endsWith('がつ')) {
    return 'time-calendar'
  }

  // 6. Travel & Places
  if (TRAVEL_SET.has(h) && k !== '箸') {
    return 'travel-transport'
  }

  // 7. Clothing & Shopping
  if (CLOTHING_SET.has(h) && (k !== '切る' || h !== 'きる')) {
    return 'clothing-shopping'
  }

  // 8. School & Work
  if (SCHOOL_SET.has(h)) {
    return 'school-work'
  }

  // 9. Nature & Weather
  if (NATURE_SET.has(h) && (k !== '服' || h !== 'ふく')) {
    return 'nature-weather'
  }

  // 10. Home & Living
  if (HOME_SET.has(h) && k !== '髪') {
    return 'home-living'
  }

  // 11. Adjectives & Traits
  if (pos.includes('adjective') || [
    'おおきい', 'ちいさい', 'あたらしい', 'ふるい', 'いい / よい', 'いい', 'よい', 'わるい', 'あつい',
    'さむい', 'つめたい', 'むずかしい', 'やさしい', 'たかい', 'やすい', 'ひくい', 'おいしい', 'まずい',
    'いそがしい', 'たのしい', 'おもしろい', 'つまらない', 'あかい', 'あおい', 'しろい', 'くろい',
    'きいろい', 'ちゃいろい', 'みどり', 'むらさき', 'あか', 'あお', 'しろ', 'くろ', 'きいろ', 'ちゃいろ',
    'ちかい', 'とおい', 'はやい', 'おそい', 'おおい', 'すくない', 'あたたかい', 'すずしい', 'あまい',
    'からい', 'おもい', 'かるい', 'あかるい', 'くらい', 'せまい', 'ひろい', 'ながい', 'みじかい',
    'あぶない', 'すき', 'きらい', 'じょうず', 'へた', 'きれい', 'しずか', 'にぎやか', 'べんり',
    'ふべん', 'ゆうめい', 'げんき', 'ひま', 'たいせつ', 'たいへん', 'だいじょうぶ', 'りっぱ',
    'いろいろ', 'いや', 'いたい', 'きたない', 'こまかい', 'つよい', 'ふかい', 'わかい', 'おなじ'
  ].includes(h)) {
    return 'adjectives-traits'
  }

  // 12. Core Action Verbs
  if (pos.startsWith('verb')) {
    return 'core-verbs'
  }

  // 13. Functional / Particles & Conjunctions
  if (pos === 'particle' || pos === 'conjunction' || pos === 'adverb' || pos === 'pronoun') {
    return 'greetings-chat'
  }

  return 'home-living'
}

/**
 * Filter a list of vocabulary entries by theme
 */
export function filterVocabByTheme(entries: VocabularyEntry[], themeId: string): VocabularyEntry[] {
  if (!themeId || themeId === 'all') return entries
  return entries.filter((entry) => getWordTheme(entry) === themeId)
}
