/**
 * Complete Japanese Kana Dataset
 * 104 characters in Hiragana & Katakana:
 * - 46 Seion (Clear sounds - Gojūon matrix)
 * - 25 Dakuon & Handakuon (Voiced & Semi-voiced sounds)
 * - 33 Yōon (Combination glides with small ya/yu/yo)
 */

export interface KanaExample {
  japanese: string
  romaji: string
  meaning: string
}

export interface KanaEntry {
  id: string
  hiragana: string
  katakana: string
  romaji: string
  type: 'seion' | 'dakuon' | 'yoon'
  row: string // 'a' | 'ka' | 'sa' | 'ta' | 'na' | 'ha' | 'ma' | 'ya' | 'ra' | 'wa' | 'n' | 'ga' | 'za' | 'da' | 'ba' | 'pa' | 'kya' ...
  colIndex?: number // 0: a, 1: i, 2: u, 3: e, 4: o
  strokeCount: { hiragana: number; katakana: number }
  mnemonic: { hiragana: string; katakana: string }
  exampleWord: KanaExample
}

// ─── 1. SEION (46 Basic Characters) ───────────────────────────────────────────

export const seionKana: KanaEntry[] = [
  // A row
  {
    id: 'kana-a',
    hiragana: 'あ',
    katakana: 'ア',
    romaji: 'a',
    type: 'seion',
    row: 'a',
    colIndex: 0,
    strokeCount: { hiragana: 3, katakana: 2 },
    mnemonic: {
      hiragana: "Looks like an Apple with a stem and curved round side.",
      katakana: "Looks like an Axe with a sharp blade.",
    },
    exampleWord: { japanese: 'ありがとう', romaji: 'arigatou', meaning: 'Thank you' },
  },
  {
    id: 'kana-i',
    hiragana: 'い',
    katakana: 'イ',
    romaji: 'i',
    type: 'seion',
    row: 'a',
    colIndex: 1,
    strokeCount: { hiragana: 2, katakana: 2 },
    mnemonic: {
      hiragana: "Looks like two Igloos standing side-by-side.",
      katakana: "Looks like an Island with an inlet.",
    },
    exampleWord: { japanese: 'いぬ', romaji: 'inu', meaning: 'Dog' },
  },
  {
    id: 'kana-u',
    hiragana: 'う',
    katakana: 'ウ',
    romaji: 'u',
    type: 'seion',
    row: 'a',
    colIndex: 2,
    strokeCount: { hiragana: 2, katakana: 3 },
    mnemonic: {
      hiragana: "Looks like an Umbrella blown by the wind.",
      katakana: "Looks like a cup Upside down with an antenna.",
    },
    exampleWord: { japanese: 'うみ', romaji: 'umi', meaning: 'Sea / Ocean' },
  },
  {
    id: 'kana-e',
    hiragana: 'え',
    katakana: 'エ',
    romaji: 'e',
    type: 'seion',
    row: 'a',
    colIndex: 3,
    strokeCount: { hiragana: 2, katakana: 3 },
    mnemonic: {
      hiragana: "Looks like an Energetic acrobat doing a trick.",
      katakana: "Looks like an Elevator beam or capital letter I.",
    },
    exampleWord: { japanese: 'えき', romaji: 'eki', meaning: 'Train station' },
  },
  {
    id: 'kana-o',
    hiragana: 'お',
    katakana: 'オ',
    romaji: 'o',
    type: 'seion',
    row: 'a',
    colIndex: 4,
    strokeCount: { hiragana: 3, katakana: 3 },
    mnemonic: {
      hiragana: "Looks like an Ostrich with a round egg nearby.",
      katakana: "Looks like an Opera singer taking a bow.",
    },
    exampleWord: { japanese: 'おちゃ', romaji: 'ocha', meaning: 'Green tea' },
  },

  // KA row
  {
    id: 'kana-ka',
    hiragana: 'か',
    katakana: 'カ',
    romaji: 'ka',
    type: 'seion',
    row: 'ka',
    colIndex: 0,
    strokeCount: { hiragana: 3, katakana: 2 },
    mnemonic: {
      hiragana: "Looks like someone cutting through cardboard with a blade.",
      katakana: "Same as hiragana, just sharp without the drop dot.",
    },
    exampleWord: { japanese: 'かさ', romaji: 'kasa', meaning: 'Umbrella' },
  },
  {
    id: 'kana-ki',
    hiragana: 'き',
    katakana: 'キ',
    romaji: 'ki',
    type: 'seion',
    row: 'ka',
    colIndex: 1,
    strokeCount: { hiragana: 4, katakana: 3 },
    mnemonic: {
      hiragana: "Looks like a Key with ridges on the shaft.",
      katakana: "Looks like the teeth of a Key.",
    },
    exampleWord: { japanese: 'き', romaji: 'ki', meaning: 'Tree / Wood' },
  },
  {
    id: 'kana-ku',
    hiragana: 'く',
    katakana: 'ク',
    romaji: 'ku',
    type: 'seion',
    row: 'ka',
    colIndex: 2,
    strokeCount: { hiragana: 1, katakana: 2 },
    mnemonic: {
      hiragana: "Looks like a bird's open beak saying 'Koo-koo'.",
      katakana: "Looks like a Cook's cleaver.",
    },
    exampleWord: { japanese: 'くるま', romaji: 'kuruma', meaning: 'Car' },
  },
  {
    id: 'kana-ke',
    hiragana: 'け',
    katakana: 'ケ',
    romaji: 'ke',
    type: 'seion',
    row: 'ka',
    colIndex: 3,
    strokeCount: { hiragana: 3, katakana: 3 },
    mnemonic: {
      hiragana: "Looks like a wooden Keg standing tall.",
      katakana: "Looks like a Kettle silhouette.",
    },
    exampleWord: { japanese: 'けさ', romaji: 'kesa', meaning: 'This morning' },
  },
  {
    id: 'kana-ko',
    hiragana: 'こ',
    katakana: 'コ',
    romaji: 'ko',
    type: 'seion',
    row: 'ka',
    colIndex: 4,
    strokeCount: { hiragana: 2, katakana: 2 },
    mnemonic: {
      hiragana: "Looks like two Koi fish swimming in a circle.",
      katakana: "Looks like a Corner of a square box.",
    },
    exampleWord: { japanese: 'こども', romaji: 'kodomo', meaning: 'Child' },
  },

  // SA row
  {
    id: 'kana-sa',
    hiragana: 'さ',
    katakana: 'サ',
    romaji: 'sa',
    type: 'seion',
    row: 'sa',
    colIndex: 0,
    strokeCount: { hiragana: 3, katakana: 3 },
    mnemonic: {
      hiragana: "Looks like a person holding a Sail.",
      katakana: "Looks like three Sardines stacked in a basket.",
    },
    exampleWord: { japanese: 'さくら', romaji: 'sakura', meaning: 'Cherry blossom' },
  },
  {
    id: 'kana-shi',
    hiragana: 'し',
    katakana: 'シ',
    romaji: 'shi',
    type: 'seion',
    row: 'sa',
    colIndex: 1,
    strokeCount: { hiragana: 1, katakana: 3 },
    mnemonic: {
      hiragana: "Looks like a fishing hook submerged in the ocean.",
      katakana: "Two eyes looking up with a smiling mouth.",
    },
    exampleWord: { japanese: 'しろ', romaji: 'shiro', meaning: 'White' },
  },
  {
    id: 'kana-su',
    hiragana: 'す',
    katakana: 'ス',
    romaji: 'su',
    type: 'seion',
    row: 'sa',
    colIndex: 2,
    strokeCount: { hiragana: 2, katakana: 2 },
    mnemonic: {
      hiragana: "Looks like a swimmer making a loop underwater.",
      katakana: "Looks like a pair of Ski poles sliding down a slope.",
    },
    exampleWord: { japanese: 'すし', romaji: 'sushi', meaning: 'Sushi' },
  },
  {
    id: 'kana-se',
    hiragana: 'せ',
    katakana: 'セ',
    romaji: 'se',
    type: 'seion',
    row: 'sa',
    colIndex: 3,
    strokeCount: { hiragana: 3, katakana: 2 },
    mnemonic: {
      hiragana: "Looks like someone settling comfortably in a cinema seat.",
      katakana: "Almost identical to hiragana, sharp without curves.",
    },
    exampleWord: { japanese: 'せんせい', romaji: 'sensei', meaning: 'Teacher' },
  },
  {
    id: 'kana-so',
    hiragana: 'そ',
    katakana: 'ソ',
    romaji: 'so',
    type: 'seion',
    row: 'sa',
    colIndex: 4,
    strokeCount: { hiragana: 1, katakana: 2 },
    mnemonic: {
      hiragana: "One continuous zigzag stroke like sewing thread.",
      katakana: "Looks like two Solar flares pointing down.",
    },
    exampleWord: { japanese: 'そら', romaji: 'sora', meaning: 'Sky' },
  },

  // TA row
  {
    id: 'kana-ta',
    hiragana: 'た',
    katakana: 'タ',
    romaji: 'ta',
    type: 'seion',
    row: 'ta',
    colIndex: 0,
    strokeCount: { hiragana: 4, katakana: 3 },
    mnemonic: {
      hiragana: "Looks like the English letters 't' and 'a' merged.",
      katakana: "Looks like a Tidal wave curving over.",
    },
    exampleWord: { japanese: 'たべる', romaji: 'taberu', meaning: 'To eat' },
  },
  {
    id: 'kana-chi',
    hiragana: 'ち',
    katakana: 'チ',
    romaji: 'chi',
    type: 'seion',
    row: 'ta',
    colIndex: 1,
    strokeCount: { hiragana: 2, katakana: 3 },
    mnemonic: {
      hiragana: "Looks like a Cheerleader doing a high kick.",
      katakana: "Looks like a Cheerleader with pom-poms.",
    },
    exampleWord: { japanese: 'ちず', romaji: 'chizu', meaning: 'Map' },
  },
  {
    id: 'kana-tsu',
    hiragana: 'つ',
    katakana: 'ツ',
    romaji: 'tsu',
    type: 'seion',
    row: 'ta',
    colIndex: 2,
    strokeCount: { hiragana: 1, katakana: 3 },
    mnemonic: {
      hiragana: "Looks like a massive Tsunami wave cresting.",
      katakana: "Looks like raindrops dropping downwards.",
    },
    exampleWord: { japanese: 'つき', romaji: 'tsuki', meaning: 'Moon / Month' },
  },
  {
    id: 'kana-te',
    hiragana: 'て',
    katakana: 'テ',
    romaji: 'te',
    type: 'seion',
    row: 'ta',
    colIndex: 3,
    strokeCount: { hiragana: 1, katakana: 3 },
    mnemonic: {
      hiragana: "Looks like a dog's curved Tail or a hand (te).",
      katakana: "Looks like a Television antenna on a pole.",
    },
    exampleWord: { japanese: 'て', romaji: 'te', meaning: 'Hand' },
  },
  {
    id: 'kana-to',
    hiragana: 'と',
    katakana: 'ト',
    romaji: 'to',
    type: 'seion',
    row: 'ta',
    colIndex: 4,
    strokeCount: { hiragana: 2, katakana: 2 },
    mnemonic: {
      hiragana: "Looks like a Tornado funnel or a Thorn in a toe.",
      katakana: "Looks like a Totem pole stick with a branch.",
    },
    exampleWord: { japanese: 'ともだち', romaji: 'tomodachi', meaning: 'Friend' },
  },

  // NA row
  {
    id: 'kana-na',
    hiragana: 'な',
    katakana: 'ナ',
    romaji: 'na',
    type: 'seion',
    row: 'na',
    colIndex: 0,
    strokeCount: { hiragana: 4, katakana: 2 },
    mnemonic: {
      hiragana: "Looks like a Nun kneeling before a cross.",
      katakana: "Looks like a cross or a sword.",
    },
    exampleWord: { japanese: 'なつ', romaji: 'natsu', meaning: 'Summer' },
  },
  {
    id: 'kana-ni',
    hiragana: 'に',
    katakana: 'ニ',
    romaji: 'ni',
    type: 'seion',
    row: 'na',
    colIndex: 1,
    strokeCount: { hiragana: 3, katakana: 2 },
    mnemonic: {
      hiragana: "Looks like a needle and two stitches.",
      katakana: "Two horizontal parallel lines, identical to kanji 2 (二).",
    },
    exampleWord: { japanese: 'にほん', romaji: 'nihon', meaning: 'Japan' },
  },
  {
    id: 'kana-nu',
    hiragana: 'ぬ',
    katakana: 'ヌ',
    romaji: 'nu',
    type: 'seion',
    row: 'na',
    colIndex: 2,
    strokeCount: { hiragana: 2, katakana: 2 },
    mnemonic: {
      hiragana: "Looks like a pair of chopsticks twisting Noodles with a loop.",
      katakana: "Looks like chopsticks picking up a single noodle.",
    },
    exampleWord: { japanese: 'ぬる', romaji: 'nuru', meaning: 'To paint / coat' },
  },
  {
    id: 'kana-ne',
    hiragana: 'ね',
    katakana: 'ネ',
    romaji: 'ne',
    type: 'seion',
    row: 'na',
    colIndex: 3,
    strokeCount: { hiragana: 2, katakana: 4 },
    mnemonic: {
      hiragana: "Looks like a cat (neko) sitting with a curled tail loop.",
      katakana: "Looks like a necktie on a hanger.",
    },
    exampleWord: { japanese: 'ねこ', romaji: 'neko', meaning: 'Cat' },
  },
  {
    id: 'kana-no',
    hiragana: 'の',
    katakana: 'ノ',
    romaji: 'no',
    type: 'seion',
    row: 'na',
    colIndex: 4,
    strokeCount: { hiragana: 1, katakana: 1 },
    mnemonic: {
      hiragana: "A circular 'No entry' prohibition sign.",
      katakana: "A single downward slash, like a long Nose.",
    },
    exampleWord: { japanese: 'のみもの', romaji: 'nomimono', meaning: 'Beverage / Drink' },
  },

  // HA row
  {
    id: 'kana-ha',
    hiragana: 'は',
    katakana: 'ハ',
    romaji: 'ha',
    type: 'seion',
    row: 'ha',
    colIndex: 0,
    strokeCount: { hiragana: 3, katakana: 2 },
    mnemonic: {
      hiragana: "Looks like a hockey stick and puck on the ice.",
      katakana: "Looks like a pair of laughing eyes 'Ha ha!'.",
    },
    exampleWord: { japanese: 'はな', romaji: 'hana', meaning: 'Flower / Nose' },
  },
  {
    id: 'kana-hi',
    hiragana: 'ひ',
    katakana: 'ヒ',
    romaji: 'hi',
    type: 'seion',
    row: 'ha',
    colIndex: 1,
    strokeCount: { hiragana: 1, katakana: 2 },
    mnemonic: {
      hiragana: "Looks like a big smiling face saying 'Hi!'.",
      katakana: "Looks like a person with a Heel kicking up.",
    },
    exampleWord: { japanese: 'ひ', romaji: 'hi', meaning: 'Fire / Day / Sun' },
  },
  {
    id: 'kana-fu',
    hiragana: 'ふ',
    katakana: 'フ',
    romaji: 'fu',
    type: 'seion',
    row: 'ha',
    colIndex: 2,
    strokeCount: { hiragana: 4, katakana: 1 },
    mnemonic: {
      hiragana: "Looks like Mount Fuji with birds flying around it.",
      katakana: "Looks like a flag fluttering in the wind.",
    },
    exampleWord: { japanese: 'ふね', romaji: 'fune', meaning: 'Boat / Ship' },
  },
  {
    id: 'kana-he',
    hiragana: 'へ',
    katakana: 'ヘ',
    romaji: 'he',
    type: 'seion',
    row: 'ha',
    colIndex: 3,
    strokeCount: { hiragana: 1, katakana: 1 },
    mnemonic: {
      hiragana: "Looks like the slope of a gentle Hill.",
      katakana: "Virtually identical to hiragana, the shape of a roof or hill.",
    },
    exampleWord: { japanese: 'へや', romaji: 'heya', meaning: 'Room' },
  },
  {
    id: 'kana-ho',
    hiragana: 'ほ',
    katakana: 'ホ',
    romaji: 'ho',
    type: 'seion',
    row: 'ha',
    colIndex: 4,
    strokeCount: { hiragana: 4, katakana: 4 },
    mnemonic: {
      hiragana: "Looks like 'ha' wearing a fancy Hat.",
      katakana: "Looks like a Holy cross with arms outstretched.",
    },
    exampleWord: { japanese: 'ほん', romaji: 'hon', meaning: 'Book' },
  },

  // MA row
  {
    id: 'kana-ma',
    hiragana: 'ま',
    katakana: 'マ',
    romaji: 'ma',
    type: 'seion',
    row: 'ma',
    colIndex: 0,
    strokeCount: { hiragana: 3, katakana: 2 },
    mnemonic: {
      hiragana: "Looks like a Mask with two horizontal straps.",
      katakana: "Looks like the beak of a Magpie.",
    },
    exampleWord: { japanese: 'まち', romaji: 'machi', meaning: 'Town / City' },
  },
  {
    id: 'kana-mi',
    hiragana: 'み',
    katakana: 'ミ',
    romaji: 'mi',
    type: 'seion',
    row: 'ma',
    colIndex: 1,
    strokeCount: { hiragana: 2, katakana: 3 },
    mnemonic: {
      hiragana: "Looks like a musical note or number 21.",
      katakana: "Three diagonal streaks like cat's whiskers (meow / mi).",
    },
    exampleWord: { japanese: 'みず', romaji: 'mizu', meaning: 'Water' },
  },
  {
    id: 'kana-mu',
    hiragana: 'む',
    katakana: 'ム',
    romaji: 'mu',
    type: 'seion',
    row: 'ma',
    colIndex: 2,
    strokeCount: { hiragana: 3, katakana: 2 },
    mnemonic: {
      hiragana: "Looks like a cow's face saying 'Moo'.",
      katakana: "Looks like the snout of a Moose.",
    },
    exampleWord: { japanese: 'むし', romaji: 'mushi', meaning: 'Insect / Bug' },
  },
  {
    id: 'kana-me',
    hiragana: 'め',
    katakana: 'メ',
    romaji: 'me',
    type: 'seion',
    row: 'ma',
    colIndex: 3,
    strokeCount: { hiragana: 2, katakana: 2 },
    mnemonic: {
      hiragana: "Looks like an eye (目 / me in Japanese).",
      katakana: "Looks like an 'X' or cross marks.",
    },
    exampleWord: { japanese: 'め', romaji: 'me', meaning: 'Eye' },
  },
  {
    id: 'kana-mo',
    hiragana: 'も',
    katakana: 'モ',
    romaji: 'mo',
    type: 'seion',
    row: 'ma',
    colIndex: 4,
    strokeCount: { hiragana: 3, katakana: 3 },
    mnemonic: {
      hiragana: "Looks like a fish hook catching more and More worms.",
      katakana: "Looks like hiragana 'mo' drawn with straight ruler lines.",
    },
    exampleWord: { japanese: 'もの', romaji: 'mono', meaning: 'Thing / Object' },
  },

  // YA row
  {
    id: 'kana-ya',
    hiragana: 'や',
    katakana: 'ヤ',
    romaji: 'ya',
    type: 'seion',
    row: 'ya',
    colIndex: 0,
    strokeCount: { hiragana: 3, katakana: 2 },
    mnemonic: {
      hiragana: "Looks like a Yak with long curving horns.",
      katakana: "Looks like the antlers of a Yak.",
    },
    exampleWord: { japanese: 'やま', romaji: 'yama', meaning: 'Mountain' },
  },
  {
    id: 'kana-yu',
    hiragana: 'ゆ',
    katakana: 'ユ',
    romaji: 'yu',
    type: 'seion',
    row: 'ya',
    colIndex: 2,
    strokeCount: { hiragana: 2, katakana: 2 },
    mnemonic: {
      hiragana: "Looks like a fish swimming with a big 'U' shaped tail.",
      katakana: "Looks like the arm and body of a Yellow crane.",
    },
    exampleWord: { japanese: 'ゆき', romaji: 'yuki', meaning: 'Snow' },
  },
  {
    id: 'kana-yo',
    hiragana: 'よ',
    katakana: 'ヨ',
    romaji: 'yo',
    type: 'seion',
    row: 'ya',
    colIndex: 4,
    strokeCount: { hiragana: 2, katakana: 3 },
    mnemonic: {
      hiragana: "Looks like a Yo-yo hanging on a finger loop.",
      katakana: "Looks like the letter 'E' facing backwards.",
    },
    exampleWord: { japanese: 'よる', romaji: 'yoru', meaning: 'Night' },
  },

  // RA row
  {
    id: 'kana-ra',
    hiragana: 'ら',
    katakana: 'ラ',
    romaji: 'ra',
    type: 'seion',
    row: 'ra',
    colIndex: 0,
    strokeCount: { hiragana: 2, katakana: 2 },
    mnemonic: {
      hiragana: "Looks like a Rabbit sitting upright.",
      katakana: "Looks like a Raptor with a horn.",
    },
    exampleWord: { japanese: 'らいしゅう', romaji: 'raishuu', meaning: 'Next week' },
  },
  {
    id: 'kana-ri',
    hiragana: 'り',
    katakana: 'リ',
    romaji: 'ri',
    type: 'seion',
    row: 'ra',
    colIndex: 1,
    strokeCount: { hiragana: 2, katakana: 2 },
    mnemonic: {
      hiragana: "Two reeds swaying beside a River.",
      katakana: "Two straight vertical cuts like Ribbons.",
    },
    exampleWord: { japanese: 'りんご', romaji: 'ringo', meaning: 'Apple' },
  },
  {
    id: 'kana-ru',
    hiragana: 'る',
    katakana: 'ル',
    romaji: 'ru',
    type: 'seion',
    row: 'ra',
    colIndex: 2,
    strokeCount: { hiragana: 1, katakana: 2 },
    mnemonic: {
      hiragana: "Looks like 'ro' (ろ) but with a ruby loop at the base.",
      katakana: "Two roots curving downwards like legs running.",
    },
    exampleWord: { japanese: 'るす', romaji: 'rusu', meaning: 'Absence from home' },
  },
  {
    id: 'kana-re',
    hiragana: 'れ',
    katakana: 'レ',
    romaji: 're',
    type: 'seion',
    row: 'ra',
    colIndex: 3,
    strokeCount: { hiragana: 2, katakana: 1 },
    mnemonic: {
      hiragana: "Looks like a person running with their arms back.",
      katakana: "A single checkmark stroke like a Ray.",
    },
    exampleWord: { japanese: 'れきし', romaji: 'rekishi', meaning: 'History' },
  },
  {
    id: 'kana-ro',
    hiragana: 'ろ',
    katakana: 'ロ',
    romaji: 'ro',
    type: 'seion',
    row: 'ra',
    colIndex: 4,
    strokeCount: { hiragana: 1, katakana: 3 },
    mnemonic: {
      hiragana: "Looks like the number 3, or a Road with bends.",
      katakana: "A square box, like a Robot's mouth.",
    },
    exampleWord: { japanese: 'ろく', romaji: 'roku', meaning: 'Six (6)' },
  },

  // WA row
  {
    id: 'kana-wa',
    hiragana: 'わ',
    katakana: 'ワ',
    romaji: 'wa',
    type: 'seion',
    row: 'wa',
    colIndex: 0,
    strokeCount: { hiragana: 2, katakana: 2 },
    mnemonic: {
      hiragana: "Looks like a Wasp with a curved belly.",
      katakana: "Looks like a wine glass with a stem.",
    },
    exampleWord: { japanese: 'わたし', romaji: 'watashi', meaning: 'I / Me' },
  },
  {
    id: 'kana-wo',
    hiragana: 'を',
    katakana: 'ヲ',
    romaji: 'o (wo)',
    type: 'seion',
    row: 'wa',
    colIndex: 4,
    strokeCount: { hiragana: 3, katakana: 3 },
    mnemonic: {
      hiragana: "A person in an Olympic bobsled. Used exclusively as the object particle を.",
      katakana: "Rarely used in modern Japanese except in stylistic contexts.",
    },
    exampleWord: { japanese: 'ほんをよむ', romaji: 'hon o yomu', meaning: 'Read a book (particle)' },
  },
  {
    id: 'kana-n',
    hiragana: 'ん',
    katakana: 'ン',
    romaji: 'n',
    type: 'seion',
    row: 'n',
    colIndex: 2,
    strokeCount: { hiragana: 1, katakana: 2 },
    mnemonic: {
      hiragana: "Looks like the lowercase cursive English letter 'n'.",
      katakana: "A dash and a sweep upwards like a needle.",
    },
    exampleWord: { japanese: 'にほん', romaji: 'nihon', meaning: 'Japan' },
  },
]

// ─── 2. DAKUON & HANDAKUON (25 Voiced Characters) ─────────────────────────────

export const dakuonKana: KanaEntry[] = [
  // GA row (k + ゛)
  { id: 'kana-ga', hiragana: 'が', katakana: 'ガ', romaji: 'ga', type: 'dakuon', row: 'ga', strokeCount: { hiragana: 5, katakana: 4 }, mnemonic: { hiragana: "か + tenten (゛)", katakana: "カ + tenten (゛)" }, exampleWord: { japanese: 'がっこう', romaji: 'gakkou', meaning: 'School' } },
  { id: 'kana-gi', hiragana: 'ぎ', katakana: 'ギ', romaji: 'gi', type: 'dakuon', row: 'ga', strokeCount: { hiragana: 6, katakana: 5 }, mnemonic: { hiragana: "き + tenten (゛)", katakana: "キ + tenten (゛)" }, exampleWord: { japanese: 'ぎんこう', romaji: 'ginkou', meaning: 'Bank' } },
  { id: 'kana-gu', hiragana: 'ぐ', katakana: 'グ', romaji: 'gu', type: 'dakuon', row: 'ga', strokeCount: { hiragana: 3, katakana: 4 }, mnemonic: { hiragana: "く + tenten (゛)", katakana: "ク + tenten (゛)" }, exampleWord: { japanese: 'ぐらい', romaji: 'gurai', meaning: 'Approximately' } },
  { id: 'kana-ge', hiragana: 'げ', katakana: 'ゲ', romaji: 'ge', type: 'dakuon', row: 'ga', strokeCount: { hiragana: 5, katakana: 5 }, mnemonic: { hiragana: "け + tenten (゛)", katakana: "ケ + tenten (゛)" }, exampleWord: { japanese: 'げつようび', romaji: 'getsuyoubi', meaning: 'Monday' } },
  { id: 'kana-go', hiragana: 'ご', katakana: 'ゴ', romaji: 'go', type: 'dakuon', row: 'ga', strokeCount: { hiragana: 4, katakana: 4 }, mnemonic: { hiragana: "こ + tenten (゛)", katakana: "コ + tenten (゛)" }, exampleWord: { japanese: 'ごはん', romaji: 'gohan', meaning: 'Meal / Cooked rice' } },

  // ZA row (s + ゛)
  { id: 'kana-za', hiragana: 'ざ', katakana: 'ザ', romaji: 'za', type: 'dakuon', row: 'za', strokeCount: { hiragana: 5, katakana: 5 }, mnemonic: { hiragana: "さ + tenten (゛)", katakana: "サ + tenten (゛)" }, exampleWord: { japanese: 'ざっし', romaji: 'zasshi', meaning: 'Magazine' } },
  { id: 'kana-ji', hiragana: 'じ', katakana: 'ジ', romaji: 'ji', type: 'dakuon', row: 'za', strokeCount: { hiragana: 3, katakana: 5 }, mnemonic: { hiragana: "し + tenten (゛)", katakana: "シ + tenten (゛)" }, exampleWord: { japanese: 'じかん', romaji: 'jikan', meaning: 'Time / Hour' } },
  { id: 'kana-zu', hiragana: 'ず', katakana: 'ズ', romaji: 'zu', type: 'dakuon', row: 'za', strokeCount: { hiragana: 4, katakana: 4 }, mnemonic: { hiragana: "す + tenten (゛)", katakana: "ス + tenten (゛)" }, exampleWord: { japanese: 'ちず', romaji: 'chizu', meaning: 'Map' } },
  { id: 'kana-ze', hiragana: 'ぜ', katakana: 'ゼ', romaji: 'ze', type: 'dakuon', row: 'za', strokeCount: { hiragana: 5, katakana: 4 }, mnemonic: { hiragana: "せ + tenten (゛)", katakana: "セ + tenten (゛)" }, exampleWord: { japanese: 'ぜんぶ', romaji: 'zenbu', meaning: 'All / Everything' } },
  { id: 'kana-zo', hiragana: 'ぞ', katakana: 'ゾ', romaji: 'zo', type: 'dakuon', row: 'za', strokeCount: { hiragana: 3, katakana: 4 }, mnemonic: { hiragana: "そ + tenten (゛)", katakana: "ソ + tenten (゛)" }, exampleWord: { japanese: 'ぞう', romaji: 'zou', meaning: 'Elephant' } },

  // DA row (t + ゛)
  { id: 'kana-da', hiragana: 'だ', katakana: 'ダ', romaji: 'da', type: 'dakuon', row: 'da', strokeCount: { hiragana: 6, katakana: 5 }, mnemonic: { hiragana: "た + tenten (゛)", katakana: "タ + tenten (゛)" }, exampleWord: { japanese: 'だいがく', romaji: 'daigaku', meaning: 'University' } },
  { id: 'kana-ji-da', hiragana: 'ぢ', katakana: 'ヂ', romaji: 'ji (di)', type: 'dakuon', row: 'da', strokeCount: { hiragana: 4, katakana: 5 }, mnemonic: { hiragana: "ち + tenten (゛)", katakana: "チ + tenten (゛)" }, exampleWord: { japanese: 'はなぢ', romaji: 'hanaji', meaning: 'Nosebleed' } },
  { id: 'kana-zu-da', hiragana: 'づ', katakana: 'ヅ', romaji: 'zu (du)', type: 'dakuon', row: 'da', strokeCount: { hiragana: 3, katakana: 5 }, mnemonic: { hiragana: "つ + tenten (゛)", katakana: "ツ + tenten (゛)" }, exampleWord: { japanese: 'つづく', romaji: 'tsuzuku', meaning: 'To continue' } },
  { id: 'kana-de', hiragana: 'で', katakana: 'デ', romaji: 'de', type: 'dakuon', row: 'da', strokeCount: { hiragana: 3, katakana: 5 }, mnemonic: { hiragana: "て + tenten (゛)", katakana: "テ + tenten (゛)" }, exampleWord: { japanese: 'でんしゃ', romaji: 'densha', meaning: 'Electric train' } },
  { id: 'kana-do', hiragana: 'ど', katakana: 'ド', romaji: 'do', type: 'dakuon', row: 'da', strokeCount: { hiragana: 4, katakana: 4 }, mnemonic: { hiragana: "と + tenten (゛)", katakana: "ト + tenten (゛)" }, exampleWord: { japanese: 'どこ', romaji: 'doko', meaning: 'Where' } },

  // BA row (h + ゛)
  { id: 'kana-ba', hiragana: 'ば', katakana: 'バ', romaji: 'ba', type: 'dakuon', row: 'ba', strokeCount: { hiragana: 5, katakana: 4 }, mnemonic: { hiragana: "は + tenten (゛)", katakana: "ハ + tenten (゛)" }, exampleWord: { japanese: 'ばす', romaji: 'basu', meaning: 'Bus' } },
  { id: 'kana-bi', hiragana: 'び', katakana: 'ビ', romaji: 'bi', type: 'dakuon', row: 'ba', strokeCount: { hiragana: 3, katakana: 4 }, mnemonic: { hiragana: "ひ + tenten (゛)", katakana: "ヒ + tenten (゛)" }, exampleWord: { japanese: 'びょういん', romaji: 'byouin', meaning: 'Hospital' } },
  { id: 'kana-bu', hiragana: 'ぶ', katakana: 'ブ', romaji: 'bu', type: 'dakuon', row: 'ba', strokeCount: { hiragana: 6, katakana: 3 }, mnemonic: { hiragana: "ふ + tenten (゛)", katakana: "フ + tenten (゛)" }, exampleWord: { japanese: 'ぶんしょう', romaji: 'bunshou', meaning: 'Sentence' } },
  { id: 'kana-be', hiragana: 'べ', katakana: 'ベ', romaji: 'be', type: 'dakuon', row: 'ba', strokeCount: { hiragana: 3, katakana: 3 }, mnemonic: { hiragana: "へ + tenten (゛)", katakana: "ヘ + tenten (゛)" }, exampleWord: { japanese: 'べんきょう', romaji: 'benkyou', meaning: 'Study' } },
  { id: 'kana-bo', hiragana: 'ぼ', katakana: 'ボ', romaji: 'bo', type: 'dakuon', row: 'ba', strokeCount: { hiragana: 6, katakana: 6 }, mnemonic: { hiragana: "ほ + tenten (゛)", katakana: "ホ + tenten (゛)" }, exampleWord: { japanese: 'ぼうし', romaji: 'boushi', meaning: 'Hat / Cap' } },

  // PA row (h + ゜ handakuten)
  { id: 'kana-pa', hiragana: 'ぱ', katakana: 'パ', romaji: 'pa', type: 'dakuon', row: 'pa', strokeCount: { hiragana: 4, katakana: 3 }, mnemonic: { hiragana: "は + maru (゜)", katakana: "ハ + maru (゜)" }, exampleWord: { japanese: 'ぱん', romaji: 'pan', meaning: 'Bread' } },
  { id: 'kana-pi', hiragana: 'ぴ', katakana: 'ピ', romaji: 'pi', type: 'dakuon', row: 'pa', strokeCount: { hiragana: 2, katakana: 3 }, mnemonic: { hiragana: "ひ + maru (゜)", katakana: "ヒ + maru (゜)" }, exampleWord: { japanese: 'ぴあの', romaji: 'piano', meaning: 'Piano' } },
  { id: 'kana-pu', hiragana: 'ぷ', katakana: 'プ', romaji: 'pu', type: 'dakuon', row: 'pa', strokeCount: { hiragana: 5, katakana: 2 }, mnemonic: { hiragana: "ふ + maru (゜)", katakana: "フ + maru (゜)" }, exampleWord: { japanese: 'ぷーる', romaji: 'puuru', meaning: 'Swimming pool' } },
  { id: 'kana-pe', hiragana: 'ぺ', katakana: 'ペ', romaji: 'pe', type: 'dakuon', row: 'pa', strokeCount: { hiragana: 2, katakana: 2 }, mnemonic: { hiragana: "へ + maru (゜)", katakana: "ヘ + maru (゜)" }, exampleWord: { japanese: 'ぺん', romaji: 'pen', meaning: 'Pen' } },
  { id: 'kana-po', hiragana: 'ぽ', katakana: 'ポ', romaji: 'po', type: 'dakuon', row: 'pa', strokeCount: { hiragana: 5, katakana: 5 }, mnemonic: { hiragana: "ほ + maru (゜)", katakana: "ホ + maru (゜)" }, exampleWord: { japanese: 'ぽけっと', romaji: 'poketto', meaning: 'Pocket' } },
]

// ─── 3. YŌON (33 Glides & Combination Sounds) ─────────────────────────────────

export const yoonKana: KanaEntry[] = [
  // KYA, KYU, KYO
  { id: 'kana-kya', hiragana: 'きゃ', katakana: 'キャ', romaji: 'kya', type: 'yoon', row: 'kya', strokeCount: { hiragana: 7, katakana: 6 }, mnemonic: { hiragana: 'き + small ゃ', katakana: 'キ + small ャ' }, exampleWord: { japanese: 'きゃく', romaji: 'kyaku', meaning: 'Guest / Customer' } },
  { id: 'kana-kyu', hiragana: 'きゅ', katakana: 'キュ', romaji: 'kyu', type: 'yoon', row: 'kya', strokeCount: { hiragana: 6, katakana: 5 }, mnemonic: { hiragana: 'き + small ゅ', katakana: 'キ + small ュ' }, exampleWord: { japanese: 'きゅう', romaji: 'kyuu', meaning: 'Nine (9)' } },
  { id: 'kana-kyo', hiragana: 'きょ', katakana: 'キョ', romaji: 'kyo', type: 'yoon', row: 'kya', strokeCount: { hiragana: 6, katakana: 6 }, mnemonic: { hiragana: 'き + small ょ', katakana: 'キ + small ョ' }, exampleWord: { japanese: 'きょう', romaji: 'kyou', meaning: 'Today' } },

  // SHA, SHU, SHO
  { id: 'kana-sha', hiragana: 'しゃ', katakana: 'シャ', romaji: 'sha', type: 'yoon', row: 'sha', strokeCount: { hiragana: 4, katakana: 5 }, mnemonic: { hiragana: 'し + small ゃ', katakana: 'シ + small ャ' }, exampleWord: { japanese: 'しゃしん', romaji: 'shashin', meaning: 'Photograph' } },
  { id: 'kana-shu', hiragana: 'しゅ', katakana: 'シュ', romaji: 'shu', type: 'yoon', row: 'sha', strokeCount: { hiragana: 3, katakana: 5 }, mnemonic: { hiragana: 'し + small ゅ', katakana: 'シ + small ュ' }, exampleWord: { japanese: 'しゅくだい', romaji: 'shukudai', meaning: 'Homework' } },
  { id: 'kana-sho', hiragana: 'しょ', katakana: 'ショ', romaji: 'sho', type: 'yoon', row: 'sha', strokeCount: { hiragana: 3, katakana: 6 }, mnemonic: { hiragana: 'し + small ょ', katakana: 'シ + small ョ' }, exampleWord: { japanese: 'しょくどう', romaji: 'shokudou', meaning: 'Cafeteria / Dining hall' } },

  // CHA, CHU, CHO
  { id: 'kana-cha', hiragana: 'ちゃ', katakana: 'チャ', romaji: 'cha', type: 'yoon', row: 'cha', strokeCount: { hiragana: 5, katakana: 5 }, mnemonic: { hiragana: 'ち + small ゃ', katakana: 'チ + small ャ' }, exampleWord: { japanese: 'おちゃ', romaji: 'ocha', meaning: 'Tea' } },
  { id: 'kana-chu', hiragana: 'ちゅ', katakana: 'チュ', romaji: 'chu', type: 'yoon', row: 'cha', strokeCount: { hiragana: 4, katakana: 5 }, mnemonic: { hiragana: 'ち + small ゅ', katakana: 'チ + small ュ' }, exampleWord: { japanese: 'ちゅうがっこう', romaji: 'chuugakkou', meaning: 'Junior high school' } },
  { id: 'kana-cho', hiragana: 'ちょ', katakana: 'チョ', romaji: 'cho', type: 'yoon', row: 'cha', strokeCount: { hiragana: 4, katakana: 6 }, mnemonic: { hiragana: 'ち + small ょ', katakana: 'チ + small ョ' }, exampleWord: { japanese: 'ちょっと', romaji: 'chotto', meaning: 'A little / Just a moment' } },

  // NYA, NYU, NYO
  { id: 'kana-nya', hiragana: 'にゃ', katakana: 'ニャ', romaji: 'nya', type: 'yoon', row: 'nya', strokeCount: { hiragana: 6, katakana: 4 }, mnemonic: { hiragana: 'に + small ゃ', katakana: 'ニ + small ャ' }, exampleWord: { japanese: 'にゃんこ', romaji: 'nyanko', meaning: 'Kitty / Cat sound' } },
  { id: 'kana-nyu', hiragana: 'にゅ', katakana: 'ニュ', romaji: 'nyu', type: 'yoon', row: 'nya', strokeCount: { hiragana: 5, katakana: 4 }, mnemonic: { hiragana: 'に + small ゅ', katakana: 'ニ + small ュ' }, exampleWord: { japanese: 'ぎゅうにゅう', romaji: 'gyuunyuu', meaning: 'Cow milk' } },
  { id: 'kana-nyo', hiragana: 'にょ', katakana: 'ニョ', romaji: 'nyo', type: 'yoon', row: 'nya', strokeCount: { hiragana: 5, katakana: 5 }, mnemonic: { hiragana: 'に + small ょ', katakana: 'ニ + small ョ' }, exampleWord: { japanese: 'にょうぼう', romaji: 'nyoubou', meaning: 'Wife (humble/colloquial)' } },

  // HYA, HYU, HYO
  { id: 'kana-hya', hiragana: 'ひゃ', katakana: 'ヒャ', romaji: 'hya', type: 'yoon', row: 'hya', strokeCount: { hiragana: 4, katakana: 4 }, mnemonic: { hiragana: 'ひ + small ゃ', katakana: 'ヒ + small ャ' }, exampleWord: { japanese: 'ひゃく', romaji: 'hyaku', meaning: 'Hundred (100)' } },
  { id: 'kana-hyu', hiragana: 'ひゅ', katakana: 'ヒュ', romaji: 'hyu', type: 'yoon', row: 'hya', strokeCount: { hiragana: 3, katakana: 4 }, mnemonic: { hiragana: 'ひ + small ゅ', katakana: 'ヒ + small ュ' }, exampleWord: { japanese: 'ひゅうひゅう', romaji: 'hyuuhyuu', meaning: 'Whistling wind sound' } },
  { id: 'kana-hyo', hiragana: 'ひょ', katakana: 'ヒョ', romaji: 'hyo', type: 'yoon', row: 'hya', strokeCount: { hiragana: 3, katakana: 5 }, mnemonic: { hiragana: 'ひ + small ょ', katakana: 'ヒ + small ョ' }, exampleWord: { japanese: 'ひょう', romaji: 'hyou', meaning: 'Chart / Table' } },

  // MYA, MYU, MYO
  { id: 'kana-mya', hiragana: 'みゃ', katakana: 'ミャ', romaji: 'mya', type: 'yoon', row: 'mya', strokeCount: { hiragana: 5, katakana: 5 }, mnemonic: { hiragana: 'み + small ゃ', katakana: 'ミ + small ャ' }, exampleWord: { japanese: 'みゃく', romaji: 'myaku', meaning: 'Pulse / Chain' } },
  { id: 'kana-myu', hiragana: 'みゅ', katakana: 'ミュ', romaji: 'myu', type: 'yoon', row: 'mya', strokeCount: { hiragana: 4, katakana: 5 }, mnemonic: { hiragana: 'み + small ゅ', katakana: 'ミ + small ュ' }, exampleWord: { japanese: 'みゅーじっく', romaji: 'myuujikku', meaning: 'Music' } },
  { id: 'kana-myo', hiragana: 'みょ', katakana: 'ミョ', romaji: 'myo', type: 'yoon', row: 'mya', strokeCount: { hiragana: 4, katakana: 6 }, mnemonic: { hiragana: 'み + small ょ', katakana: 'ミ + small ョ' }, exampleWord: { japanese: 'みょうじ', romaji: 'myouji', meaning: 'Family surname' } },

  // RYA, RYU, RYO
  { id: 'kana-rya', hiragana: 'りゃ', katakana: 'リャ', romaji: 'rya', type: 'yoon', row: 'rya', strokeCount: { hiragana: 5, katakana: 4 }, mnemonic: { hiragana: 'り + small ゃ', katakana: 'リ + small ャ' }, exampleWord: { japanese: 'りゃくご', romaji: 'ryakugo', meaning: 'Abbreviation' } },
  { id: 'kana-ryu', hiragana: 'りゅ', katakana: 'リュ', romaji: 'ryu', type: 'yoon', row: 'rya', strokeCount: { hiragana: 4, katakana: 4 }, mnemonic: { hiragana: 'り + small ゅ', katakana: 'リ + small ュ' }, exampleWord: { japanese: 'りゅうがくせい', romaji: 'ryuugakusei', meaning: 'International student' } },
  { id: 'kana-ryo', hiragana: 'りょ', katakana: 'リョ', romaji: 'ryo', type: 'yoon', row: 'rya', strokeCount: { hiragana: 4, katakana: 5 }, mnemonic: { hiragana: 'り + small ょ', katakana: 'リ + small ョ' }, exampleWord: { japanese: 'りょこう', romaji: 'ryokou', meaning: 'Travel / Trip' } },

  // GYA, GYU, GYO
  { id: 'kana-gya', hiragana: 'ぎゃ', katakana: 'ギャ', romaji: 'gya', type: 'yoon', row: 'gya', strokeCount: { hiragana: 9, katakana: 7 }, mnemonic: { hiragana: 'ぎ + small ゃ', katakana: 'ギ + small ャ' }, exampleWord: { japanese: 'ぎゃく', romaji: 'gyaku', meaning: 'Reverse / Opposite' } },
  { id: 'kana-gyu', hiragana: 'ぎゅ', katakana: 'ギュ', romaji: 'gyu', type: 'yoon', row: 'gya', strokeCount: { hiragana: 8, katakana: 7 }, mnemonic: { hiragana: 'ぎ + small ゅ', katakana: 'ギ + small ュ' }, exampleWord: { japanese: 'ぎゅうにく', romaji: 'gyuuniku', meaning: 'Beef' } },
  { id: 'kana-gyo', hiragana: 'ぎょ', katakana: 'ギョ', romaji: 'gyo', type: 'yoon', row: 'gya', strokeCount: { hiragana: 8, katakana: 8 }, mnemonic: { hiragana: 'ぎ + small ょ', katakana: 'ギ + small ョ' }, exampleWord: { japanese: 'きんぎょ', romaji: 'kingyo', meaning: 'Goldfish' } },

  // JA, JU, JO
  { id: 'kana-ja', hiragana: 'じゃ', katakana: 'ジャ', romaji: 'ja', type: 'yoon', row: 'ja', strokeCount: { hiragana: 6, katakana: 7 }, mnemonic: { hiragana: 'じ + small ゃ', katakana: 'ジ + small ャ' }, exampleWord: { japanese: 'じゃあ', romaji: 'jaa', meaning: 'Well then / Bye' } },
  { id: 'kana-ju', hiragana: 'じゅ', katakana: 'ジュ', romaji: 'ju', type: 'yoon', row: 'ja', strokeCount: { hiragana: 5, katakana: 7 }, mnemonic: { hiragana: 'じ + small ゅ', katakana: 'ジ + small ュ' }, exampleWord: { japanese: 'じゅう', romaji: 'juu', meaning: 'Ten (10)' } },
  { id: 'kana-jo', hiragana: 'じょ', katakana: 'ジョ', romaji: 'jo', type: 'yoon', row: 'ja', strokeCount: { hiragana: 5, katakana: 8 }, mnemonic: { hiragana: 'じ + small ょ', katakana: 'ジ + small ョ' }, exampleWord: { japanese: 'かのじょ', romaji: 'kanojo', meaning: 'She / Girlfriend' } },

  // BYA, BYU, BYO
  { id: 'kana-bya', hiragana: 'びゃ', katakana: 'ビャ', romaji: 'bya', type: 'yoon', row: 'bya', strokeCount: { hiragana: 6, katakana: 6 }, mnemonic: { hiragana: 'び + small ゃ', katakana: 'ビ + small ャ' }, exampleWord: { japanese: 'さんびゃく', romaji: 'sanbyaku', meaning: 'Three hundred (300)' } },
  { id: 'kana-byu', hiragana: 'びゅ', katakana: 'ビュ', romaji: 'byu', type: 'yoon', row: 'bya', strokeCount: { hiragana: 5, katakana: 6 }, mnemonic: { hiragana: 'び + small ゅ', katakana: 'ビ + small ュ' }, exampleWord: { japanese: 'びゅーてぃー', romaji: 'byuutii', meaning: 'Beauty' } },
  { id: 'kana-byo', hiragana: 'びょ', katakana: 'ビョ', romaji: 'byo', type: 'yoon', row: 'bya', strokeCount: { hiragana: 5, katakana: 7 }, mnemonic: { hiragana: 'び + small ょ', katakana: 'ビ + small ョ' }, exampleWord: { japanese: 'びょういん', romaji: 'byouin', meaning: 'Hospital' } },

  // PYA, PYU, PYO
  { id: 'kana-pya', hiragana: 'ぴゃ', katakana: 'ピャ', romaji: 'pya', type: 'yoon', row: 'pya', strokeCount: { hiragana: 5, katakana: 5 }, mnemonic: { hiragana: 'ぴ + small ゃ', katakana: 'ピ + small ャ' }, exampleWord: { japanese: 'ろっぴゃく', romaji: 'roppyaku', meaning: 'Six hundred (600)' } },
  { id: 'kana-pyu', hiragana: 'ぴゅ', katakana: 'ピュ', romaji: 'pyu', type: 'yoon', row: 'pya', strokeCount: { hiragana: 4, katakana: 5 }, mnemonic: { hiragana: 'ぴ + small ゅ', katakana: 'ピ + small ュ' }, exampleWord: { japanese: 'ぴゅあ', romaji: 'pyua', meaning: 'Pure' } },
  { id: 'kana-pyo', hiragana: 'ぴょ', katakana: 'ピョ', romaji: 'pyo', type: 'yoon', row: 'pya', strokeCount: { hiragana: 4, katakana: 6 }, mnemonic: { hiragana: 'ぴ + small ょ', katakana: 'ピ + small ョ' }, exampleWord: { japanese: 'ぴょんぴょん', romaji: 'pyonpyon', meaning: 'Hopping / Bouncing' } },
]

export const allKana: KanaEntry[] = [...seionKana, ...dakuonKana, ...yoonKana]

// ─── 4. NATIVE AUDIO UTILITY ──────────────────────────────────────────────────

/**
 * Uses the Web Speech Synthesis API with a Japanese voice to play authentic audio.
 * Zero external audio downloads needed, instant playback in modern browsers.
 */
export function playKanaAudio(text: string): void {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return
  try {
    window.speechSynthesis.cancel() // Stop any previous speech
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = 'ja-JP'
    utterance.rate = 0.85 // Clear, slightly slower for learning
    utterance.pitch = 1.0

    // Pick a high-quality Japanese voice if available
    const voices = window.speechSynthesis.getVoices()
    const jaVoice = voices.find((v) => v.lang.startsWith('ja') || v.lang === 'ja-JP')
    if (jaVoice) {
      utterance.voice = jaVoice
    }

    window.speechSynthesis.speak(utterance)
  } catch {
    // Graceful fallback if speech synthesis is disabled or blocked
  }
}
