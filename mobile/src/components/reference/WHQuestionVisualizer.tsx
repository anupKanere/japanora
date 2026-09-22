import { useState, useEffect } from 'react'
import { Volume2, HelpCircle, Eye } from 'lucide-react'
import { playKanaAudio } from '@/data/kana/kana-data'
import { settingsService } from '@/services/settingsService'

export interface WHDetail {
  id: string
  kanji?: string
  hira: string
  romaji: string
  meaning: string
  emoji: string
  category: string
  politeForm?: string
  keyGrammarRule: string
  particleFormulas: Array<{
    particle: string
    meaning: string
    exampleKanji: string
    exampleHira: string
    exampleEn: string
  }>
}

export const WH_DETAILS: WHDetail[] = [
  {
    id: 'who',
    kanji: '誰',
    hira: 'だれ',
    romaji: 'dare',
    meaning: 'Who',
    emoji: '👤',
    category: 'Person',
    politeForm: 'どなた (donata)',
    keyGrammarRule: 'Use "だれが" when the question word is the subject. Use "どなた" in formal business or polite speech.',
    particleFormulas: [
      { particle: 'が (ga)', meaning: 'Who (subject)', exampleKanji: 'だれが 来ましたか。', exampleHira: 'だれが きましたか。', exampleEn: 'Who came?' },
      { particle: 'と (to)', meaning: 'With whom', exampleKanji: 'だれと 行きますか。', exampleHira: 'だれと いきますか。', exampleEn: 'Who are you going with?' },
      { particle: 'の (no)', meaning: 'Whose', exampleKanji: 'これは だれの 本ですか。', exampleHira: 'これは だれの ほんですか。', exampleEn: 'Whose book is this?' },
    ],
  },
  {
    id: 'what',
    kanji: '何',
    hira: 'なに / なん',
    romaji: 'nani / nan',
    meaning: 'What',
    emoji: '📦',
    category: 'Object / Action',
    keyGrammarRule: 'Pronounced "なん" before d, t, n sounds and counters (何時 = なんじ, 何ですか = なんですか). Pronounced "なに" before "を" and "が" (何を = なにを).',
    particleFormulas: [
      { particle: 'を (o)', meaning: 'What (object of verb)', exampleKanji: '何を 食べますか。', exampleHira: 'なにを たべますか。', exampleEn: 'What will you eat?' },
      { particle: 'が (ga)', meaning: 'What (subject / like / want)', exampleKanji: '何が 好きですか。', exampleHira: 'なにが すきですか。', exampleEn: 'What do you like?' },
      { particle: 'で (de)', meaning: 'By what means', exampleKanji: '何で 行きますか。', exampleHira: 'なんで いきますか。', exampleEn: 'How (by what transport) will you go?' },
    ],
  },
  {
    id: 'where',
    kanji: '何処',
    hira: 'どこ',
    romaji: 'doko',
    meaning: 'Where',
    emoji: '📍',
    category: 'Location / Direction',
    politeForm: 'どちら (dochira)',
    keyGrammarRule: 'Use "どこへ/どこに" for destination, and "どこで" for where an active action occurs.',
    particleFormulas: [
      { particle: 'へ / に (e / ni)', meaning: 'Where to', exampleKanji: 'どこへ 行きますか。', exampleHira: 'どこへ いきますか。', exampleEn: 'Where are you going?' },
      { particle: 'で (de)', meaning: 'Where at (action)', exampleKanji: 'どこで 買いましたか。', exampleHira: 'どこで かいましたか。', exampleEn: 'Where did you buy it?' },
      { particle: 'から (kara)', meaning: 'From where', exampleKanji: 'どこから 来ましたか。', exampleHira: 'どこから きましたか。', exampleEn: 'Where do you come from?' },
    ],
  },
  {
    id: 'when',
    hira: 'いつ',
    romaji: 'itsu',
    meaning: 'When',
    emoji: '⏰',
    category: 'Time',
    keyGrammarRule: '"いつ" does NOT take the particle "に" (say "いつ行きますか", NEVER "いつに行きますか").',
    particleFormulas: [
      { particle: '(no particle)', meaning: 'When (general time)', exampleKanji: 'いつ 日本へ 来ましたか。', exampleHira: 'いつ にほんへ きましたか。', exampleEn: 'When did you come to Japan?' },
      { particle: 'から (kara)', meaning: 'From when', exampleKanji: 'いつから ですか。', exampleHira: 'いつから ですか。', exampleEn: 'From when does it start?' },
      { particle: 'まで (made)', meaning: 'Until when', exampleKanji: 'いつまで ですか。', exampleHira: 'いつまで ですか。', exampleEn: 'Until when?' },
    ],
  },
  {
    id: 'why',
    hira: 'どうして / なぜ',
    romaji: 'doushite / naze',
    meaning: 'Why',
    emoji: '💭',
    category: 'Reason',
    politeForm: 'なぜ (naze) / なんで (colloquial)',
    keyGrammarRule: 'When answering a "どうして" question, end your sentence with "〜から" (kara = because).',
    particleFormulas: [
      { particle: '〜から (reason)', meaning: 'Because...', exampleKanji: 'どうして 遅れましたか。…電車が 止まりましたから。', exampleHira: 'どうして おくれましたか。…でんしゃが とまりましたから。', exampleEn: 'Why are you late? ...Because the train stopped.' },
      { particle: 'なぜ (formal)', meaning: 'Why (inquiry)', exampleKanji: 'なぜ 日本語を 勉強しますか。', exampleHira: 'なぜ にほんごを べんきょうしますか。', exampleEn: 'Why do you study Japanese?' },
    ],
  },
  {
    id: 'how',
    hira: 'どう / どうやって',
    romaji: 'dou / douyatte',
    meaning: 'How',
    emoji: '🚶',
    category: 'Method / State',
    keyGrammarRule: '"どうやって" asks for step-by-step method or route. "どう" asks for condition/feeling ("どうですか").',
    particleFormulas: [
      { particle: 'どうやって (method)', meaning: 'How (process/route)', exampleKanji: '駅まで どうやって 行きますか。', exampleHira: 'えきまで どうやって いきますか。', exampleEn: 'How do you get to the station?' },
      { particle: 'どう (opinion)', meaning: 'How is it? (state)', exampleKanji: '日本の 生活は どうですか。', exampleHira: 'にほんの せいかつは どうですか。', exampleEn: 'How is life in Japan?' },
    ],
  },
  {
    id: 'how_much',
    hira: 'いくら',
    romaji: 'ikura',
    meaning: 'How much (Price)',
    emoji: '💴',
    category: 'Price',
    keyGrammarRule: 'Standard phrase in restaurants and shopping in Japan: "これは いくらですか。"',
    particleFormulas: [
      { particle: 'ですか (desu ka)', meaning: 'How much is...', exampleKanji: 'これは いくらですか。', exampleHira: 'これは いくらですか。', exampleEn: 'How much is this?' },
      { particle: 'ぜんぶで (total)', meaning: 'Altogether price', exampleKanji: '全部で いくらですか。', exampleHira: 'ぜんぶで いくらですか。', exampleEn: 'How much is it altogether?' },
    ],
  },
  {
    id: 'how_many',
    hira: 'いくつ',
    romaji: 'ikutsu',
    meaning: 'How many (Items / Age)',
    emoji: '🔢',
    category: 'Quantity / Age',
    politeForm: 'おいくつ (o-ikutsu - polite age)',
    keyGrammarRule: '"いくつ" asks for number of items (1-10) or person\'s age. For polite inquiry: "おいくつですか。"',
    particleFormulas: [
      { particle: 'ありますか', meaning: 'How many are there', exampleKanji: 'りんごが いくつ ありますか。', exampleHira: 'りんごが いくつ ありますか。', exampleEn: 'How many apples are there?' },
      { particle: 'おいくつ (polite age)', meaning: 'How old are you', exampleKanji: 'おいくつですか。', exampleHira: 'おいくつですか。', exampleEn: 'How old are you? (polite)' },
    ],
  },
]

export function InteractiveWHStudio() {
  const [selectedId, setSelectedId] = useState<string>('who')
  const [displayMode, setDisplayMode] = useState<'hiragana-only' | 'hiragana-kanji'>('hiragana-only')

  useEffect(() => {
    const current = settingsService.getSettings()
    setDisplayMode(current.displayMode)
  }, [])

  const handleModeChange = (mode: 'hiragana-only' | 'hiragana-kanji') => {
    setDisplayMode(mode)
    settingsService.updateSettings({ displayMode: mode })
  }

  const currentWH = WH_DETAILS.find((w) => w.id === selectedId) || WH_DETAILS[0]
  const showKanji = displayMode === 'hiragana-kanji'

  const handleAudio = (text: string) => {
    playKanaAudio(text)
  }

  return (
    <div className="bg-surface border border-accent/20 rounded-2xl p-4 sm:p-6 shadow-card space-y-6">
      {/* Studio Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-border">
        <div className="flex items-center gap-2.5">
          <div className="p-2.5 rounded-xl bg-accent-soft text-accent">
            <HelpCircle size={22} />
          </div>
          <div>
            <h3 className="text-base font-bold text-text-primary flex items-center gap-2">
              Interactive 5W1H Question Studio
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-accent/10 text-accent font-semibold">
                疑問詞 (Question Words)
              </span>
            </h3>
            <p className="text-xs text-text-tertiary">
              Explore essential question words, particle pairing formulas, and real conversational examples
            </p>
          </div>
        </div>

        {/* Display Mode Switcher */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-text-tertiary flex items-center gap-1 font-medium">
            <Eye size={13} />
            Script:
          </span>
          <div className="inline-flex rounded-lg border border-border p-0.5 bg-surface-2">
            <button
              type="button"
              onClick={() => handleModeChange('hiragana-only')}
              className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-all ${
                displayMode === 'hiragana-only'
                  ? 'bg-accent text-white shadow-sm'
                  : 'text-text-tertiary hover:text-text-primary'
              }`}
            >
              あ Hiragana Only
            </button>
            <button
              type="button"
              onClick={() => handleModeChange('hiragana-kanji')}
              className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-all ${
                displayMode === 'hiragana-kanji'
                  ? 'bg-accent text-white shadow-sm'
                  : 'text-text-tertiary hover:text-text-primary'
              }`}
            >
              漢 Hiragana + Kanji
            </button>
          </div>
        </div>
      </div>

      {/* 5W1H Question Pins Bar */}
      <div>
        <span className="text-xs font-bold text-text-secondary block mb-2">Select Question Concept:</span>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
          {WH_DETAILS.map((w) => {
            const isSelected = selectedId === w.id
            return (
              <button
                key={w.id}
                type="button"
                onClick={() => setSelectedId(w.id)}
                className={`p-2.5 rounded-xl border text-center transition-all flex flex-col items-center justify-between active:scale-95 ${
                  isSelected
                    ? 'bg-accent text-white border-accent ring-2 ring-accent/30 shadow-md scale-[1.03]'
                    : 'bg-surface border-border hover:border-accent/40 shadow-card text-text-primary'
                }`}
              >
                <span className="text-xl mb-0.5">{w.emoji}</span>
                <p className="text-sm font-japanese font-bold">
                  {showKanji && w.kanji ? w.kanji : w.hira}
                </p>
                <p className={`text-[10px] uppercase font-semibold mt-0.5 ${isSelected ? 'text-white/80' : 'text-text-tertiary'}`}>
                  {w.meaning}
                </p>
              </button>
            )
          })}
        </div>
      </div>

      {/* Selected Question Detail & Particle Formulas */}
      <div className="bg-surface-2/60 border border-border rounded-xl p-5 space-y-4">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-2xl">{currentWH.emoji}</span>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-accent/15 text-accent uppercase">
                {currentWH.meaning} ({currentWH.category})
              </span>
              {currentWH.politeForm && (
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-surface text-text-secondary border border-border font-japanese">
                  Polite: <strong>{currentWH.politeForm}</strong>
                </span>
              )}
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold font-japanese text-text-primary mt-1">
              {currentWH.hira}
              {showKanji && currentWH.kanji && (
                <span className="text-2xl text-text-tertiary font-normal ml-2">
                  ({currentWH.kanji})
                </span>
              )}
            </h2>
            <p className="text-xs text-text-tertiary italic mt-0.5">
              {currentWH.romaji}
            </p>
          </div>

          <button
            type="button"
            onClick={() => handleAudio(currentWH.hira.split('/')[0].trim())}
            className="p-3 rounded-xl bg-accent text-white hover:bg-accent/90 shadow-md active:scale-95 transition-all flex items-center gap-2"
            title="Listen to Japanese pronunciation"
          >
            <Volume2 size={18} />
            <span className="text-xs font-semibold">Pronounce</span>
          </button>
        </div>

        {/* Rule Alert */}
        <div className="p-3 rounded-xl bg-accent-soft/40 border border-accent/20 text-xs text-text-secondary flex items-start gap-2">
          <span className="text-accent text-base">💡</span>
          <div>
            <strong className="text-text-primary">Grammar Usage:</strong> {currentWH.keyGrammarRule}
          </div>
        </div>

        {/* Particle Association Matrix */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-xs font-bold text-text-secondary uppercase tracking-wider">
              Particle Formulas & Real Conversational Examples:
            </h4>
            <span className="text-[11px] text-text-tertiary">
              {showKanji ? 'Showing Kanji + Hiragana reading' : 'Showing pure Hiragana (beginners friendly)'}
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {currentWH.particleFormulas.map((f, i) => (
              <div
                key={i}
                className="bg-surface border border-border rounded-xl p-3.5 shadow-card hover:border-accent/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-bold font-japanese px-2 py-0.5 rounded bg-surface-2 border border-border text-accent">
                      {f.particle}
                    </span>
                    <span className="text-[11px] text-text-tertiary">{f.meaning}</span>
                  </div>

                  {showKanji ? (
                    // Hiragana + Kanji mode: show both sentences
                    <div className="mt-2 space-y-1">
                      <p className="text-base font-japanese font-bold text-text-primary">
                        {f.exampleKanji}
                      </p>
                      <p className="text-xs font-japanese text-accent font-medium">
                        {f.exampleHira}
                      </p>
                    </div>
                  ) : (
                    // Hiragana-only mode: hide kanji sentence completely, show clean hiragana
                    <div className="mt-2">
                      <p className="text-base font-japanese font-bold text-text-primary">
                        {f.exampleHira}
                      </p>
                    </div>
                  )}

                  <p className="text-xs text-text-secondary italic mt-1.5">
                    {f.exampleEn}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleAudio(f.exampleHira)}
                  className="mt-3 w-full py-1.5 rounded-lg bg-surface-2 hover:bg-accent-soft hover:text-accent text-text-tertiary text-xs flex items-center justify-center gap-1.5 transition-all"
                >
                  <Volume2 size={13} />
                  <span>Listen to Example</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
