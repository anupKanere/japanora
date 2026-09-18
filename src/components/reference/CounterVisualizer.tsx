import { useState } from 'react'
import { Volume2, Plus, Minus, Lightbulb } from 'lucide-react'
import { playKanaAudio } from '@/data/kana/kana-data'

export interface CounterItem {
  id: string
  name: string
  kanji: string
  hiragana: string
  meaning: string
  sampleItems: string
  emoji: string
  formationRule: string
  readings: Array<{
    count: number
    kanji: string
    hira: string
    romaji: string
    isIrregular?: boolean
    note?: string
    formula?: string
  }>
}

export const COUNTER_CATEGORIES: CounterItem[] = [
  {
    id: 'tsu',
    name: '〜つ (General Objects)',
    kanji: 'つ',
    hiragana: 'つ',
    meaning: 'General items, abstract things, orders (1–10)',
    sampleItems: 'Apples, ideas, boxes, orders at a restaurant',
    emoji: '🍎',
    formationRule: 'Uses ancient native Japanese (和語 / Yamato) counting roots (ひと, ふた, み, よ, いつ, む, なな, や, ここの, とお) followed by "つ". At 10 (十 / とお), the "つ" drops off completely!',
    readings: [
      { count: 1, kanji: '一つ', hira: 'ひとつ', romaji: 'hitotsu', isIrregular: true, formula: 'ひと (native root) + つ ➔ ひとつ', note: 'Native Japanese counting' },
      { count: 2, kanji: '二つ', hira: 'ふたつ', romaji: 'futatsu', isIrregular: true, formula: 'ふた (native root) + つ ➔ ふたつ', note: 'Native Japanese counting' },
      { count: 3, kanji: '三つ', hira: 'みっつ', romaji: 'mittsu', isIrregular: true, formula: 'み (root) + っつ ➔ みっつ', note: 'Geminate: small っ' },
      { count: 4, kanji: '四つ', hira: 'よっつ', romaji: 'yottsu', isIrregular: true, formula: 'よ (root) + っつ ➔ よっつ', note: 'Geminate: small っ' },
      { count: 5, kanji: '五つ', hira: 'いつつ', romaji: 'itsutsu', isIrregular: true, formula: 'いつ (native root) + つ ➔ いつつ' },
      { count: 6, kanji: '六つ', hira: 'むっつ', romaji: 'muttsu', isIrregular: true, formula: 'む (root) + っつ ➔ むっつ', note: 'Geminate: small っ' },
      { count: 7, kanji: '七つ', hira: 'ななつ', romaji: 'nanatsu', isIrregular: true, formula: 'なな (native root) + つ ➔ ななつ' },
      { count: 8, kanji: '八つ', hira: 'やっつ', romaji: 'yattsu', isIrregular: true, formula: 'や (root) + っつ ➔ やっつ', note: 'Geminate: small っ' },
      { count: 9, kanji: '九つ', hira: 'ここのつ', romaji: 'kokonotsu', isIrregular: true, formula: 'ここの (native root) + つ ➔ ここのつ' },
      { count: 10, kanji: '十', hira: 'とお', romaji: 'too', isIrregular: true, formula: 'とお (alone, NO "つ") ➔ とお', note: 'Notice: No "つ" suffix at 10! Just とお' },
    ],
  },
  {
    id: 'hon',
    name: '〜本 (Long Cylindrical Items)',
    kanji: '本',
    hiragana: 'ほん',
    meaning: 'Bottles, pens, trees, roads, umbrellas, bananas',
    sampleItems: 'Pens, bottles, pencils, bananas, umbrellas',
    emoji: '🖊️',
    formationRule: 'Base suffix is "ほん" (hon). When preceded by 1, 6, 8, 10, it hardens to "〜ぽん" (pon) with a small っ. Preceded by 3, the nasal "ん" causes rendaku voicing to "〜ぼん" (bon)!',
    readings: [
      { count: 1, kanji: '一本', hira: 'いっぽん', romaji: 'ippon', isIrregular: true, formula: 'いち (ichi) + ほん (hon) ➔ いっ + ぽん (ippon)', note: 'ち morphs to small っ; ほ hardens to ぽ' },
      { count: 2, kanji: '二本', hira: 'にほん', romaji: 'ni-hon', formula: 'に (ni) + ほん (hon) ➔ にほん' },
      { count: 3, kanji: '三本', hira: 'さんぼん', romaji: 'san-bon', isIrregular: true, formula: 'さん (san) + ほん (hon) ➔ さん + ぼん (sanbon)', note: 'Rendaku voicing: ほん ➔ ぼん after ん' },
      { count: 4, kanji: '四本', hira: 'よんほん', romaji: 'yon-hon', formula: 'よん (yon) + ほん (hon) ➔ よんほん' },
      { count: 5, kanji: '五本', hira: 'ごほん', romaji: 'go-hon', formula: 'ご (go) + ほん (hon) ➔ ごほん' },
      { count: 6, kanji: '六本', hira: 'ろっぽん', romaji: 'roppon', isIrregular: true, formula: 'ろく (roku) + ほん (hon) ➔ ろっ + ぽん (roppon)', note: 'く morphs to small っ; ほ hardens to ぽ' },
      { count: 7, kanji: '七本', hira: 'ななほん', romaji: 'nana-hon', formula: 'なな (nana) + ほん (hon) ➔ ななほん' },
      { count: 8, kanji: '八本', hira: 'はっぽん / はちほん', romaji: 'happon', isIrregular: true, formula: 'はち (hachi) + ほん (hon) ➔ はっ + ぽん (happon)', note: 'ち morphs to small っ; ほ hardens to ぽ' },
      { count: 9, kanji: '九本', hira: 'きゅうほん', romaji: 'kyuu-hon', formula: 'きゅう (kyuu) + ほん (hon) ➔ きゅうほん' },
      { count: 10, kanji: '十本', hira: 'じゅっぽん', romaji: 'juppon', isIrregular: true, formula: 'じゅう (juu) + ほん (hon) ➔ じゅっ + ぽん (juppon)', note: 'う morphs to small っ; ほ hardens to ぽ' },
    ],
  },
  {
    id: 'hiki',
    name: '〜匹 (Small Animals & Insects)',
    kanji: '匹',
    hiragana: 'ひき',
    meaning: 'Dogs, cats, fish, bugs, small creatures',
    sampleItems: 'Cats, dogs, rabbits, fish, frogs',
    emoji: '🐱',
    formationRule: 'Base suffix is "ひき" (hiki). Follows the same h-sound rules as 〜本: 1, 6, 8, 10 harden to "〜ぴき" (piki) with small っ. 3 voices into "〜びき" (biki) after nasal ん!',
    readings: [
      { count: 1, kanji: '一匹', hira: 'いっぴき', romaji: 'ippiki', isIrregular: true, formula: 'いち (ichi) + ひき (hiki) ➔ いっ + ぴき (ippiki)', note: 'ち morphs to small っ; ひ hardens to ぴ' },
      { count: 2, kanji: '二匹', hira: 'にひき', romaji: 'ni-hiki', formula: 'に (ni) + ひき (hiki) ➔ にひき' },
      { count: 3, kanji: '三匹', hira: 'さんびき', romaji: 'san-biki', isIrregular: true, formula: 'さん (san) + ひき (hiki) ➔ さん + びき (sanbiki)', note: 'Rendaku voicing: ひき ➔ びき after ん' },
      { count: 4, kanji: '四匹', hira: 'よんひき', romaji: 'yon-hiki', formula: 'よん (yon) + ひき (hiki) ➔ よんひき' },
      { count: 5, kanji: '五匹', hira: 'ごひき', romaji: 'go-hiki', formula: 'ご (go) + ひき (hiki) ➔ ごひき' },
      { count: 6, kanji: '六匹', hira: 'ろっぴき', romaji: 'roppiki', isIrregular: true, formula: 'ろく (roku) + ひき (hiki) ➔ ろっ + ぴき (roppiki)', note: 'く morphs to small っ; ひ hardens to ぴ' },
      { count: 7, kanji: '七匹', hira: 'ななひき', romaji: 'nana-hiki', formula: 'なな (nana) + ひき (hiki) ➔ ななひき' },
      { count: 8, kanji: '八匹', hira: 'はっぴき', romaji: 'happiki', isIrregular: true, formula: 'はち (hachi) + ひき (hiki) ➔ はっ + ぴき (happiki)', note: 'ち morphs to small っ; ひ hardens to ぴ' },
      { count: 9, kanji: '九匹', hira: 'きゅうひき', romaji: 'kyuu-hiki', formula: 'きゅう (kyuu) + ひき (hiki) ➔ きゅうひき' },
      { count: 10, kanji: '十匹', hira: 'じゅっぴき', romaji: 'juppiki', isIrregular: true, formula: 'じゅう (juu) + ひき (hiki) ➔ じゅっ + ぴき (juppiki)', note: 'う morphs to small っ; ひ hardens to ぴ' },
    ],
  },
  {
    id: 'nin',
    name: '〜人 (People)',
    kanji: '人',
    hiragana: 'にん',
    meaning: 'Counting people / persons',
    sampleItems: 'Friends, students, family members, customers',
    emoji: '👤',
    formationRule: 'Counts 1 and 2 use unique ancient Yamato roots ("ひとり" and "ふたり"). From 3 onwards, standard Sino-Japanese numbers attach to "にん" (nin). Notice 4 uses "よにん", NEVER "よんにん" or "しにん"!',
    readings: [
      { count: 1, kanji: '一人', hira: 'ひとり', romaji: 'hitori', isIrregular: true, formula: 'ひと (root) + り (person) ➔ ひとり', note: 'Special native reading (never いちにん)' },
      { count: 2, kanji: '二人', hira: 'ふたり', romaji: 'futari', isIrregular: true, formula: 'ふた (root) + り (person) ➔ ふたり', note: 'Special native reading (never ににん)' },
      { count: 3, kanji: '三人', hira: 'さんにん', romaji: 'san-nin', formula: 'さん (san) + にん (nin) ➔ さんにん' },
      { count: 4, kanji: '四人', hira: 'よにん', romaji: 'yonin', isIrregular: true, formula: 'よ (yo) + にん (nin) ➔ よにん', note: 'Special: よにん (never よんにん or しにん)' },
      { count: 5, kanji: '五人', hira: 'ごにん', romaji: 'go-nin', formula: 'ご (go) + にん (nin) ➔ ごにん' },
      { count: 6, kanji: '六人', hira: 'ろくにん', romaji: 'roku-nin', formula: 'ろく (roku) + にん (nin) ➔ ろくにん' },
      { count: 7, kanji: '七人', hira: 'しちにん / ななにん', romaji: 'shichi-nin', formula: 'しち/なな + にん ➔ しちにん' },
      { count: 8, kanji: '八人', hira: 'はちにん', romaji: 'hachi-nin', formula: 'はち (hachi) + にん (nin) ➔ はちにん' },
      { count: 9, kanji: '九人', hira: 'きゅうにん / くにん', romaji: 'kyuu-nin', formula: 'きゅう/く + にん ➔ きゅうにん' },
      { count: 10, kanji: '十人', hira: 'じゅうにん', romaji: 'juu-nin', formula: 'じゅう (juu) + にん (nin) ➔ じゅうにん' },
    ],
  },
  {
    id: 'mai',
    name: '〜枚 (Thin & Flat Items)',
    kanji: '枚',
    hiragana: 'まい',
    meaning: 'Paper sheets, shirts, plates, tickets, towels',
    sampleItems: 'Sheets of paper, photos, plates, shirts, tickets',
    emoji: '📄',
    formationRule: 'STABLE COUNTER (無変化): Since "まい" begins with the "m" sound, it causes ZERO sound changes! Simply attach standard 1–10 Sino-Japanese numbers directly to "まい".',
    readings: [
      { count: 1, kanji: '一枚', hira: 'いちまい', romaji: 'ichi-mai', formula: 'いち (ichi) + まい (mai) ➔ いちまい (no sound change)' },
      { count: 2, kanji: '二枚', hira: 'にまい', romaji: 'ni-mai', formula: 'に (ni) + まい (mai) ➔ にまい' },
      { count: 3, kanji: '三枚', hira: 'さんまい', romaji: 'san-mai', formula: 'さん (san) + まい (mai) ➔ さんまい' },
      { count: 4, kanji: '四枚', hira: 'よんまい', romaji: 'yon-mai', formula: 'よん (yon) + まい (mai) ➔ よんまい' },
      { count: 5, kanji: '五枚', hira: 'ごまい', romaji: 'go-mai', formula: 'ご (go) + まい (mai) ➔ ごまい' },
      { count: 6, kanji: '六枚', hira: 'ろくまい', romaji: 'roku-mai', formula: 'ろく (roku) + まい (mai) ➔ ろくまい' },
      { count: 7, kanji: '七枚', hira: 'ななまい', romaji: 'nana-mai', formula: 'なな (nana) + まい (mai) ➔ ななまい' },
      { count: 8, kanji: '八枚', hira: 'はちまい', romaji: 'hachi-mai', formula: 'はち (hachi) + まい (mai) ➔ はちまい' },
      { count: 9, kanji: '九枚', hira: 'きゅうまい', romaji: 'kyuu-mai', formula: 'きゅう (kyuu) + まい (mai) ➔ きゅうまい' },
      { count: 10, kanji: '十枚', hira: 'じゅうまい', romaji: 'juu-mai', formula: 'じゅう (juu) + まい (mai) ➔ じゅうまい' },
    ],
  },
  {
    id: 'dai',
    name: '〜台 (Machines & Vehicles)',
    kanji: '台',
    hiragana: 'だい',
    meaning: 'Cars, computers, televisions, bicycles, machinery',
    sampleItems: 'Cars, laptops, smartphones, bicycles',
    emoji: '🚗',
    formationRule: 'STABLE COUNTER (無変化): Since "だい" begins with the voiced "d" sound, it causes ZERO sound shifts. Attach standard numbers 1–10 directly to "だい" without any modifications.',
    readings: [
      { count: 1, kanji: '一台', hira: 'いちだい', romaji: 'ichi-dai', formula: 'いち (ichi) + だい (dai) ➔ いちだい (no sound change)' },
      { count: 2, kanji: '二台', hira: 'にだい', romaji: 'ni-dai', formula: 'に (ni) + だい (dai) ➔ にだい' },
      { count: 3, kanji: '三台', hira: 'さんだい', romaji: 'san-dai', formula: 'さん (san) + だい (dai) ➔ さんだい' },
      { count: 4, kanji: '四台', hira: 'よんだい', romaji: 'yon-dai', formula: 'よん (yon) + だい (dai) ➔ よんだい' },
      { count: 5, kanji: '五台', hira: 'ごだい', romaji: 'go-dai', formula: 'ご (go) + だい (dai) ➔ ごだい' },
      { count: 6, kanji: '六台', hira: 'ろくだい', romaji: 'roku-dai', formula: 'ろく (roku) + だい (dai) ➔ ろくだい' },
      { count: 7, kanji: '七台', hira: 'ななだい', romaji: 'nana-dai', formula: 'なな (nana) + だい (dai) ➔ ななだい' },
      { count: 8, kanji: '八台', hira: 'はちだい', romaji: 'hachi-dai', formula: 'はち (hachi) + だい (dai) ➔ はちだい' },
      { count: 9, kanji: '九台', hira: 'きゅうだい', romaji: 'kyuu-dai', formula: 'きゅう (kyuu) + だい (dai) ➔ きゅうだい' },
      { count: 10, kanji: '十台', hira: 'じゅうだい', romaji: 'juu-dai', formula: 'じゅう (juu) + だい (dai) ➔ じゅうだい' },
    ],
  },
  {
    id: 'satsu',
    name: '〜冊 (Books & Bound Volumes)',
    kanji: '冊',
    hiragana: 'さつ',
    meaning: 'Books, notebooks, magazines, dictionaries',
    sampleItems: 'Books, notebooks, manga, dictionaries',
    emoji: '📚',
    formationRule: 'Base suffix is "さつ" (satsu). When preceded by 1, 8, or 10, the final consonant assimilates into a small "っ" (促音化: いっさつ, はっさつ, じゅっさつ).',
    readings: [
      { count: 1, kanji: '一冊', hira: 'いっさつ', romaji: 'issatsu', isIrregular: true, formula: 'いち (ichi) + さつ (satsu) ➔ いっ + さつ (issatsu)', note: 'ち assimilates into small っ' },
      { count: 2, kanji: '二冊', hira: 'にさつ', romaji: 'ni-satsu', formula: 'に (ni) + さつ (satsu) ➔ にさつ' },
      { count: 3, kanji: '三冊', hira: 'さんさつ', romaji: 'san-satsu', formula: 'さん (san) + さつ (satsu) ➔ さんさつ' },
      { count: 4, kanji: '四冊', hira: 'よんさつ', romaji: 'yon-satsu', formula: 'よん (yon) + さつ (satsu) ➔ よんさつ' },
      { count: 5, kanji: '五冊', hira: 'ごさつ', romaji: 'go-satsu', formula: 'ご (go) + さつ (satsu) ➔ ごさつ' },
      { count: 6, kanji: '六冊', hira: 'ろくさつ', romaji: 'roku-satsu', formula: 'ろく (roku) + さつ (satsu) ➔ ろくさつ' },
      { count: 7, kanji: '七冊', hira: 'ななさつ', romaji: 'nana-satsu', formula: 'なな (nana) + さつ (satsu) ➔ ななさつ' },
      { count: 8, kanji: '八冊', hira: 'はっさつ', romaji: 'hassatsu', isIrregular: true, formula: 'はち (hachi) + さつ (satsu) ➔ はっ + さつ (hassatsu)', note: 'ち assimilates into small っ' },
      { count: 9, kanji: '九冊', hira: 'きゅうさつ', romaji: 'kyuu-satsu', formula: 'きゅう (kyuu) + さつ (satsu) ➔ きゅうさつ' },
      { count: 10, kanji: '十冊', hira: 'じゅっさつ', romaji: 'jussatsu', isIrregular: true, formula: 'じゅう (juu) + さつ (satsu) ➔ じゅっ + さつ (jussatsu)', note: 'う assimilates into small っ' },
    ],
  },
]

export function InteractiveCounterStudio() {
  const [selectedCategory, setSelectedCategory] = useState<string>('hon')
  const [count, setCount] = useState<number>(1)

  const activeCategory = COUNTER_CATEGORIES.find((c) => c.id === selectedCategory) || COUNTER_CATEGORIES[0]
  const reading = activeCategory.readings[count - 1] || activeCategory.readings[0]

  const handleAudio = (text: string) => {
    playKanaAudio(text)
  }

  return (
    <div className="bg-surface border border-accent/20 rounded-2xl p-4 sm:p-6 shadow-card space-y-6">
      {/* Studio Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-border">
        <div className="flex items-center gap-2.5">
          <span className="p-2.5 rounded-xl bg-accent-soft text-accent text-xl">🔢</span>
          <div>
            <h3 className="text-base font-bold text-text-primary flex items-center gap-2">
              Interactive Japanese Counter Studio
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-accent/10 text-accent font-semibold">
                助数詞 (Counters & Formation Rules)
              </span>
            </h3>
            <p className="text-xs text-text-tertiary">
              Discover how Japanese counter words are formed across physical shapes and learn the 4 master phonetic rules
            </p>
          </div>
        </div>
      </div>

      {/* Category Pills */}
      <div>
        <span className="text-xs font-bold text-text-secondary block mb-2">Select Shape / Category:</span>
        <div className="flex flex-wrap gap-2">
          {COUNTER_CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all active:scale-95 ${
                  isSelected
                    ? 'bg-accent text-white border-accent shadow-sm'
                    : 'bg-surface-2 text-text-secondary border border-border hover:border-accent/40'
                }`}
              >
                <span>{cat.emoji}</span>
                <span>{cat.name}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* ─── WORD FORMATION FORMULA BANNER ─── */}
      <div className="p-4 rounded-xl bg-accent-soft/30 border border-accent/20 space-y-2">
        <div className="flex items-center gap-2">
          <Lightbulb size={16} className="text-accent flex-shrink-0" />
          <span className="text-xs font-bold text-text-primary uppercase tracking-wider">
            How words are formed in {activeCategory.name}:
          </span>
        </div>
        <p className="text-xs text-text-secondary leading-relaxed">
          {activeCategory.formationRule}
        </p>
        {reading.formula && (
          <div className="mt-2 pt-2 border-t border-accent/20 flex flex-wrap items-center gap-2 text-xs">
            <span className="text-text-tertiary font-medium">Active Formula for Count {count}:</span>
            <code className="px-2 py-1 rounded bg-surface border border-border font-mono font-bold text-accent">
              {reading.formula}
            </code>
          </div>
        )}
      </div>

      {/* Interactive Stacker Stage */}
      <div className="bg-surface-2/60 border border-border rounded-xl p-5 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* Left: Dynamic Visual Object Stacker */}
        <div className="md:col-span-5 flex flex-col items-center justify-center p-3 bg-surface rounded-xl border border-border/70 min-h-[160px]">
          <span className="text-xs font-semibold text-text-tertiary mb-2">
            Visual Stacker: {count} {count === 1 ? 'item' : 'items'}
          </span>

          {/* Rendered item icons */}
          <div className="flex flex-wrap items-center justify-center gap-2 p-2 max-w-[240px]">
            {Array.from({ length: count }).map((_, i) => (
              <span
                key={i}
                className="text-3xl sm:text-4xl animate-in fade-in zoom-in duration-200 transition-transform hover:scale-125 select-none"
                style={{ animationDelay: `${i * 30}ms` }}
              >
                {activeCategory.emoji}
              </span>
            ))}
          </div>

          {/* Stepper controls */}
          <div className="flex items-center gap-3 mt-4">
            <button
              type="button"
              disabled={count <= 1}
              onClick={() => setCount((c) => Math.max(1, c - 1))}
              className="p-1.5 rounded-lg bg-surface-2 hover:bg-accent-soft hover:text-accent border border-border disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              title="Decrease count"
            >
              <Minus size={16} />
            </button>
            <span className="text-base font-bold font-japanese text-text-primary px-3 min-w-[28px] text-center">
              {count}
            </span>
            <button
              type="button"
              disabled={count >= 10}
              onClick={() => setCount((c) => Math.min(10, c + 1))}
              className="p-1.5 rounded-lg bg-surface-2 hover:bg-accent-soft hover:text-accent border border-border disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              title="Increase count"
            >
              <Plus size={16} />
            </button>
          </div>
        </div>

        {/* Right: Japanese Reading & Sound Change Rules */}
        <div className="md:col-span-7 space-y-3">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-accent/15 text-accent">
                  Count: {count}
                </span>
                {reading.isIrregular && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400">
                    ⚠️ Phonetic Shift
                  </span>
                )}
              </div>

              {/* Big Kanji */}
              <h2 className="text-3xl sm:text-4xl font-bold font-japanese text-text-primary">
                {reading.kanji}
              </h2>

              {/* Hiragana & Romaji */}
              <p className="text-xl font-japanese text-accent font-semibold mt-1">
                {reading.hira}
              </p>
              <p className="text-xs text-text-tertiary italic">
                {reading.romaji}
              </p>
            </div>

            {/* Listen Button */}
            <button
              type="button"
              onClick={() => handleAudio(reading.hira)}
              className="p-3 rounded-xl bg-accent text-white hover:bg-accent/90 shadow-md active:scale-95 transition-all flex flex-col items-center gap-1 min-w-[54px]"
              title="Listen to Japanese pronunciation"
            >
              <Volume2 size={18} />
              <span className="text-[10px] font-medium">Listen</span>
            </button>
          </div>

          {/* Description & Linguistic Tip */}
          <div className="pt-2 border-t border-border/60 text-xs text-text-secondary space-y-1">
            <p>
              <strong className="text-text-primary">Target Shapes:</strong> {activeCategory.sampleItems}
            </p>
            {reading.note && (
              <p className="text-amber-600 dark:text-amber-400 flex items-center gap-1.5 font-medium">
                <span>💡</span> {reading.note}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* ─── CROSS-SHAPE COMPARISON FOR COUNT: X ─── */}
      <div className="border border-border rounded-xl p-4 bg-surface space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-bold text-text-secondary uppercase tracking-wider">
            Compare Count {count} Across All 7 Shapes:
          </h4>
          <span className="text-[11px] text-text-tertiary">
            See how the word forms differently for each object shape
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
          {COUNTER_CATEGORIES.map((cat) => {
            const catReading = cat.readings[count - 1]
            const isCurrentCat = selectedCategory === cat.id
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`p-2.5 rounded-xl border text-center transition-all ${
                  isCurrentCat
                    ? 'bg-accent/10 border-accent ring-1 ring-accent'
                    : 'bg-surface-2 border-border hover:border-accent/40'
                }`}
              >
                <span className="text-lg">{cat.emoji}</span>
                <p className="text-xs font-bold font-japanese mt-1 truncate">{catReading.kanji}</p>
                <p className="text-[11px] font-japanese text-accent font-semibold truncate">{catReading.hira}</p>
                <span className="text-[9px] text-text-tertiary block mt-0.5">{cat.kanji}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* ─── 4 MASTER SOUND SHIFT RULES GUIDE ─── */}
      <div className="space-y-2">
        <h4 className="text-xs font-bold text-text-secondary uppercase tracking-wider">
          The 4 Universal Counter Sound Rules in Japanese:
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="p-3 rounded-xl bg-surface border border-border space-y-1">
            <span className="text-[10px] font-bold text-sky-500 uppercase">Rule 1: Small っ (促音化)</span>
            <p className="text-xs font-bold text-text-primary">1, 6, 8, 10 + h/k/s</p>
            <p className="text-[11px] text-text-secondary">
              When numbers ending in -chi (1, 8) or -ku (6) meet h/k/s counters, they fuse into a small <strong>っ + p/k/s</strong> sound:
              <br />• 1 + ほん ➔ <strong>いっぽん</strong>
              <br />• 1 + さつ ➔ <strong>いっさつ</strong>
            </p>
          </div>

          <div className="p-3 rounded-xl bg-surface border border-border space-y-1">
            <span className="text-[10px] font-bold text-amber-500 uppercase">Rule 2: Rendaku (連濁)</span>
            <p className="text-xs font-bold text-text-primary">3 + h-sound ➔ b</p>
            <p className="text-[11px] text-text-secondary">
              After the nasal <strong>ん</strong> in 3 (さん), initial h-sounds soften into a voiced <strong>b</strong>:
              <br />• 3 + ほん ➔ <strong>さんぼん</strong>
              <br />• 3 + ひき ➔ <strong>さんびき</strong>
            </p>
          </div>

          <div className="p-3 rounded-xl bg-surface border border-border space-y-1">
            <span className="text-[10px] font-bold text-purple-500 uppercase">Rule 3: Native Roots (和語)</span>
            <p className="text-xs font-bold text-text-primary">1 & 2 people, 1–10 items</p>
            <p className="text-[11px] text-text-secondary">
              Ancient indigenous Japanese counting is preserved for everyday objects and single/double people:
              <br />• 1人 ➔ <strong>ひとり</strong> (never いちにん)
              <br />• 2人 ➔ <strong>ふたり</strong> (never ににん)
              <br />• 1つ ➔ <strong>ひとつ</strong>
            </p>
          </div>

          <div className="p-3 rounded-xl bg-surface border border-border space-y-1">
            <span className="text-[10px] font-bold text-emerald-500 uppercase">Rule 4: Stable Counters</span>
            <p className="text-xs font-bold text-text-primary">Counters with m, d, n</p>
            <p className="text-[11px] text-text-secondary">
              Counters starting with voiced consonants or nasals undergo <strong>ZERO sound shifts</strong>:
              <br />• 〜枚 (まい): <strong>いちまい, にまい...</strong>
              <br />• 〜台 (だい): <strong>いちだい, にだい...</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
