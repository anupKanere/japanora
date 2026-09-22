import { useState } from 'react'
import { Volume2, Search, Sparkles } from 'lucide-react'
import { playKanaAudio } from '@/data/kana/kana-data'
import { n5BodyParts } from '@/data/reference/n5-reference'
import type { BodyPart } from '@/data/reference/n5-reference'

export interface BodyRegionSection {
  id: string
  name: string
  kanjiName: string
  emoji: string
  description: string
  filterKey: 'all' | 'head' | 'face' | 'upper-body' | 'hand' | 'lower-body' | 'internal'
}

export const REGIONS: BodyRegionSection[] = [
  { id: 'all', name: 'All Parts', kanjiName: '全体', emoji: '🧍', description: 'Complete anatomical vocabulary list', filterKey: 'all' },
  { id: 'face', name: 'Face & Head', kanjiName: '顔・頭', emoji: '🧑', description: 'Eyes, ears, nose, mouth, hair, teeth, chin, cheeks', filterKey: 'face' },
  { id: 'upper', name: 'Upper Body', kanjiName: '上半身', emoji: '👕', description: 'Neck, shoulders, chest, stomach, back, waist, arms', filterKey: 'upper-body' },
  { id: 'hand', name: 'Hands & Fingers', kanjiName: '手・指', emoji: '🖐️', description: 'Hands, wrists, fingers, nails', filterKey: 'hand' },
  { id: 'lower', name: 'Lower Body', kanjiName: '下半身', emoji: '👖', description: 'Legs, feet, knees, thighs, ankles', filterKey: 'lower-body' },
  { id: 'internal', name: 'Internal & Senses', kanjiName: '内臓・骨', emoji: '🫀', description: 'Heart, stomach organ, bones, blood', filterKey: 'internal' },
]

export const COMMON_HEALTH_EXPRESSIONS: Array<{ ja: string; hira: string; en: string; part: string }> = [
  { ja: '頭が痛いです', hira: 'あたまが いたいです', en: 'I have a headache', part: '頭' },
  { ja: 'お腹が痛いです', hira: 'おなかが いたいです', en: 'I have a stomachache', part: 'お腹' },
  { ja: '目が疲れています', hira: 'めが つかれています', en: 'My eyes are strained/tired', part: '目' },
  { ja: '肩が凝りました', hira: 'かたが こりました', en: 'My shoulders are stiff', part: '肩' },
  { ja: '喉が痛いです', hira: 'のどが いたいです', en: 'I have a sore throat', part: '喉' },
  { ja: '手を洗ってください', hira: 'てを あらってください', en: 'Please wash your hands', part: '手' },
  { ja: 'お腹がすきました', hira: 'おなかが すきました', en: 'I am hungry', part: 'お腹' },
  { ja: '足が速いです', hira: 'あしが はやいです', en: 'Fast runner', part: '足' },
]

export function InteractiveBodyMapStudio() {
  const [activeRegion, setActiveRegion] = useState<string>('all')
  const [search, setSearch] = useState<string>('')
  const [selectedPart, setSelectedPart] = useState<BodyPart>(n5BodyParts[0])

  const filteredParts = n5BodyParts.filter((b) => {
    const matchesSearch =
      !search ||
      b.hiragana.includes(search) ||
      b.meaning.toLowerCase().includes(search.toLowerCase()) ||
      b.romaji.toLowerCase().includes(search.toLowerCase()) ||
      (b.kanji && b.kanji.includes(search))

    if (activeRegion === 'all') return matchesSearch
    if (activeRegion === 'face') return matchesSearch && (b.region === 'face' || b.region === 'head')
    return matchesSearch && b.region === activeRegion
  })

  const handleAudio = (text: string) => {
    playKanaAudio(text)
  }

  // Related expressions for the selected body part
  const relatedExpressions = COMMON_HEALTH_EXPRESSIONS.filter(
    (e) => selectedPart.kanji && (e.part === selectedPart.kanji || e.ja.includes(selectedPart.kanji))
  )

  return (
    <div className="space-y-6">
      {/* Studio Header */}
      <div className="bg-surface border border-accent/20 rounded-2xl p-4 sm:p-6 shadow-card space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-border">
          <div className="flex items-center gap-2.5">
            <span className="p-2.5 rounded-xl bg-accent-soft text-accent text-xl">🧍</span>
            <div>
              <h3 className="text-base font-bold text-text-primary flex items-center gap-2">
                Anatomical Body Parts Explorer
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-accent/10 text-accent font-semibold">
                  身体の部位 ({n5BodyParts.length} Parts)
                </span>
              </h3>
              <p className="text-xs text-text-tertiary">
                Browse anatomical vocabulary by body zone (Face & Head, Upper Body, Hands, Lower Body) with clinic phrases
              </p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="w-full sm:w-64 relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search body part…"
              className="w-full pl-9 pr-3 py-1.5 border border-border rounded-lg text-xs bg-surface focus:outline-none focus:border-accent"
            />
          </div>
        </div>

        {/* Region Filter Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {REGIONS.map((r) => {
            const isSelected = activeRegion === r.id
            return (
              <button
                key={r.id}
                type="button"
                onClick={() => setActiveRegion(r.id)}
                className={`p-2.5 rounded-xl border text-center transition-all flex flex-col items-center justify-between ${
                  isSelected
                    ? 'bg-accent text-white border-accent shadow-sm scale-[1.02]'
                    : 'bg-surface-2 border-border hover:border-accent/40 text-text-primary'
                }`}
              >
                <span className="text-xl mb-0.5">{r.emoji}</span>
                <span className="text-xs font-bold font-japanese">{r.kanjiName}</span>
                <span className={`text-[10px] ${isSelected ? 'text-white/80' : 'text-text-tertiary'}`}>
                  {r.name}
                </span>
              </button>
            )
          })}
        </div>

        {/* Selected Body Part Focus Banner */}
        <div className="bg-surface-2/60 border border-border rounded-xl p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-accent/15 text-accent uppercase">
              {selectedPart.meaning} ({selectedPart.region.replace('-', ' ')})
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-japanese text-text-primary mt-1">
              {selectedPart.kanji || selectedPart.hiragana}
              {selectedPart.kanji && (
                <span className="text-xl text-text-tertiary font-normal ml-2">
                  ({selectedPart.hiragana})
                </span>
              )}
            </h2>
            <p className="text-xs text-text-tertiary italic">{selectedPart.romaji}</p>
          </div>

          <button
            type="button"
            onClick={() => handleAudio(selectedPart.hiragana)}
            className="p-3 rounded-xl bg-accent text-white hover:bg-accent/90 shadow-md active:scale-95 transition-all flex items-center gap-2"
            title="Listen to Japanese pronunciation"
          >
            <Volume2 size={18} />
            <span className="text-xs font-semibold">Pronounce</span>
          </button>
        </div>

        {/* Health Clinic Idioms for Selected Part */}
        {relatedExpressions.length > 0 && (
          <div className="p-3.5 rounded-xl bg-surface border border-accent/20 space-y-2">
            <span className="text-xs font-bold text-text-primary flex items-center gap-1.5">
              <Sparkles size={14} className="text-accent" />
              <span>Common Health & Clinic Expressions:</span>
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {relatedExpressions.map((exp, i) => (
                <div key={i} className="p-2.5 rounded-lg bg-surface-2 border border-border flex items-center justify-between gap-2">
                  <div>
                    <p className="text-sm font-japanese font-bold text-text-primary">{exp.ja}</p>
                    <p className="text-xs font-japanese text-accent">{exp.hira}</p>
                    <p className="text-xs text-text-secondary italic">{exp.en}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleAudio(exp.ja)}
                    className="p-1.5 text-text-tertiary hover:text-accent"
                  >
                    <Volume2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Grid of All Filtered Body Parts */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-xs font-bold text-text-secondary uppercase tracking-wider">
            All Body Parts in this Category ({filteredParts.length} Words):
          </h4>
          <span className="text-[11px] text-text-tertiary">Click any card to inspect and listen</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5">
          {filteredParts.map((b, i) => {
            const isSelected = selectedPart.hiragana === b.hiragana
            return (
              <button
                key={i}
                type="button"
                onClick={() => setSelectedPart(b)}
                className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center justify-between active:scale-95 shadow-card hover:scale-[1.02] ${
                  isSelected
                    ? 'bg-accent text-white border-accent ring-2 ring-accent/30 shadow-md scale-[1.02]'
                    : 'bg-surface border-border hover:border-accent/40 text-text-primary'
                }`}
              >
                <span className={`text-[10px] font-semibold uppercase ${isSelected ? 'text-white/80' : 'text-text-tertiary'}`}>
                  {b.region.replace('-', ' ')}
                </span>
                <p className="text-2xl font-japanese font-bold mt-1">
                  {b.kanji || b.hiragana}
                </p>
                <p className={`text-xs font-japanese font-semibold mt-0.5 truncate max-w-[110px] ${isSelected ? 'text-white/95' : 'text-accent'}`}>
                  {b.hiragana}
                </p>
                <p className={`text-[10px] italic truncate max-w-[100px] ${isSelected ? 'text-white/70' : 'text-text-tertiary'}`}>
                  {b.romaji}
                </p>
                <p className={`text-xs font-medium mt-1 truncate max-w-[110px] ${isSelected ? 'text-white' : 'text-text-secondary'}`}>
                  {b.meaning}
                </p>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleAudio(b.hiragana)
                  }}
                  className={`mt-2 p-1 rounded hover:bg-surface-2 transition-colors ${isSelected ? 'text-white hover:text-white' : 'text-text-tertiary hover:text-accent'}`}
                  title={`Listen to ${b.hiragana}`}
                >
                  <Volume2 size={13} />
                </button>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
