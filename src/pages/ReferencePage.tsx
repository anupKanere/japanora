import { useState, useMemo, useRef, useEffect } from 'react'
import { Search, ChevronLeft, ChevronRight, LayoutGrid, Rows, X } from 'lucide-react'
import {
  n5Greetings,
  n5BodyParts,
  n5DaysOfWeek,
  n5DateWords,
  n5Numbers,
  n5ClockHours,
  n5ClockMinutes,
  n5TimeWords,
  n5FamilyOwn,
  n5FamilyOthers,
  n5WHQuestions,
  n5Particles,
  n5Adjectives,
  n5VerbChart,
  n5Kanji110,
} from '@/data/reference/n5-reference'
import type {
  BodyPart,
  FamilyMember,
  VerbGroup,
} from '@/data/reference/n5-reference'

// ─── Tab definitions ──────────────────────────────────────────────────────────

const TABS = [
  { id: 'greetings', emoji: '🙏', label: 'Greetings' },
  { id: 'body', emoji: '🧍', label: 'Body Parts' },
  { id: 'days', emoji: '📅', label: 'Days' },
  { id: 'numbers', emoji: '🔢', label: 'Numbers' },
  { id: 'clock', emoji: '🕐', label: 'Clock' },
  { id: 'family-own', emoji: '👨‍👩‍👧', label: 'Family (Own)' },
  { id: 'family-oth', emoji: '🏠', label: 'Family (Others)' },
  { id: 'wh', emoji: '❓', label: 'WH Questions' },
  { id: 'particles', emoji: '📌', label: 'Particles' },
  { id: 'kanji', emoji: '漢', label: 'Kanji 125' },
  { id: 'adj', emoji: '✏️', label: 'Adjectives' },
  { id: 'verbs', emoji: '動', label: 'Verb Chart' },
] as const

type TabId = typeof TABS[number]['id']

// ─── Shared search input ──────────────────────────────────────────────────────

function SearchBar({ value, onChange, placeholder }: { value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <div className="relative">
      <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary" />
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder ?? 'Search…'}
        className="w-full pl-9 pr-3 py-2 border border-border rounded-lg text-sm font-japanese bg-surface focus:outline-none focus:border-accent"
      />
    </div>
  )
}

// ─── Small badge ─────────────────────────────────────────────────────────────

function Badge({ label, color }: { label: string; color: string }) {
  return (
    <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-full ${color}`}>
      {label}
    </span>
  )
}

// ─── GREETING CONTEXT COLORS ──────────────────────────────────────────────────

const CONTEXT_COLOR: Record<string, string> = {
  morning: 'bg-amber-100 text-amber-700',
  daytime: 'bg-sky-100 text-sky-700',
  evening: 'bg-indigo-100 text-indigo-700',
  night: 'bg-slate-200 text-slate-700',
  greeting: 'bg-emerald-100 text-emerald-700',
  farewell: 'bg-orange-100 text-orange-700',
  gratitude: 'bg-pink-100 text-pink-700',
  apology: 'bg-rose-100 text-rose-700',
  formal: 'bg-purple-100 text-purple-700',
  response: 'bg-teal-100 text-teal-700',
  celebration: 'bg-yellow-100 text-yellow-700',
  meeting: 'bg-cyan-100 text-cyan-700',
}

// ─── 1. GREETINGS TAB ────────────────────────────────────────────────────────

function GreetingsTab() {
  const [search, setSearch] = useState('')
  const [ctx, setCtx] = useState<string>('all')
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  const contexts = ['all', 'morning', 'daytime', 'evening', 'night', 'greeting', 'farewell', 'gratitude', 'apology', 'formal', 'response', 'celebration', 'meeting']

  const filtered = n5Greetings.filter(g => {
    const matchSearch = !search ||
      g.hiragana.includes(search) ||
      g.romaji.toLowerCase().includes(search.toLowerCase()) ||
      g.meaning.toLowerCase().includes(search.toLowerCase())
    const matchCtx = ctx === 'all' || g.context === ctx
    return matchSearch && matchCtx
  })

  const currentItem = selectedIndex !== null && filtered[selectedIndex] ? filtered[selectedIndex] : null

  function handlePrev() {
    if (selectedIndex !== null && selectedIndex > 0) {
      setSelectedIndex(selectedIndex - 1)
    }
  }

  function handleNext() {
    if (selectedIndex !== null && selectedIndex < filtered.length - 1) {
      setSelectedIndex(selectedIndex + 1)
    }
  }

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (selectedIndex === null) return
      if (e.key === 'ArrowLeft') handlePrev()
      if (e.key === 'ArrowRight') handleNext()
      if (e.key === 'Escape') setSelectedIndex(null)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedIndex, filtered.length])

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1"><SearchBar value={search} onChange={setSearch} placeholder="Search greetings…" /></div>
      </div>
      <div className="flex gap-1.5 flex-wrap">
        {contexts.map(c => (
          <button
            key={c}
            onClick={() => setCtx(c)}
            className={`px-3 py-1 rounded-full text-[11px] font-semibold capitalize transition-all ${ctx === c ? 'bg-accent text-white' : 'bg-surface border border-border text-text-secondary hover:bg-surface-2'}`}
          >{c}</button>
        ))}
      </div>
      <p className="text-xs text-text-tertiary">{filtered.length} greetings • Click any card for details</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {filtered.map((g, i) => (
          <button
            key={i}
            onClick={() => setSelectedIndex(i)}
            className="bg-surface border border-border rounded-xl p-4 shadow-card hover:shadow-card-hover hover:border-border-strong hover:scale-[1.01] transition-all text-left group"
          >
            <div className="flex items-start justify-between gap-2 mb-2">
              <p className="text-xl font-japanese font-bold text-text-primary group-hover:text-accent transition-colors leading-tight">{g.hiragana}</p>
              <Badge label={g.context} color={CONTEXT_COLOR[g.context] ?? 'bg-surface-2 text-text-secondary'} />
            </div>
            {g.kanji && <p className="text-xs font-japanese text-text-tertiary mb-1">（{g.kanji}）</p>}
            <p className="text-[11px] text-text-tertiary italic mb-1">{g.romaji}</p>
            <p className="text-sm text-text-primary font-medium">{g.meaning}</p>
            {g.note && <p className="text-[11px] text-info mt-2 leading-relaxed">💡 {g.note}</p>}
          </button>
        ))}
      </div>

      {/* Greeting Detail Modal with Next & Previous */}
      {currentItem && selectedIndex !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSelectedIndex(null)} />

          {/* Desktop Floating Left Arrow */}
          <button
            onClick={handlePrev}
            disabled={selectedIndex === 0}
            className={`hidden md:flex absolute left-8 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full items-center justify-center border border-border bg-surface shadow-panel transition-all ${
              selectedIndex === 0
                ? 'opacity-20 cursor-not-allowed text-text-tertiary'
                : 'text-text-primary hover:bg-surface-2 hover:scale-110 active:scale-95'
            }`}
            aria-label="Previous greeting"
          >
            <ChevronLeft size={24} />
          </button>

          {/* Desktop Floating Right Arrow */}
          <button
            onClick={handleNext}
            disabled={selectedIndex === filtered.length - 1}
            className={`hidden md:flex absolute right-8 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full items-center justify-center border border-border bg-surface shadow-panel transition-all ${
              selectedIndex === filtered.length - 1
                ? 'opacity-20 cursor-not-allowed text-text-tertiary'
                : 'text-text-primary hover:bg-surface-2 hover:scale-110 active:scale-95'
            }`}
            aria-label="Next greeting"
          >
            <ChevronRight size={24} />
          </button>

          <div className="relative w-full max-w-md bg-surface rounded-2xl border border-border shadow-panel p-6 animate-slide-up max-h-[85vh] flex flex-col z-10">
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <span className="text-xs font-semibold text-text-tertiary">
                Greeting {selectedIndex + 1} of {filtered.length}
              </span>
              <button
                onClick={() => setSelectedIndex(null)}
                className="p-1.5 rounded-lg hover:bg-surface-2 text-text-secondary hover:text-text-primary transition-colors"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>

            {/* Content */}
            <div className="overflow-y-auto py-4 space-y-4 flex-1">
              <div>
                <Badge label={currentItem.context} color={CONTEXT_COLOR[currentItem.context] ?? 'bg-surface-2 text-text-secondary'} />
                <p className="text-3xl font-japanese font-bold text-text-primary mt-2 mb-1">{currentItem.hiragana}</p>
                {currentItem.kanji && (
                  <p className="text-base font-japanese text-text-tertiary mb-1">（{currentItem.kanji}）</p>
                )}
                <p className="text-sm text-text-tertiary italic mb-2">{currentItem.romaji}</p>
                <p className="text-lg text-text-primary font-semibold">{currentItem.meaning}</p>
              </div>

              {currentItem.note && (
                <div className="p-3.5 bg-surface-2 border border-border rounded-xl text-xs text-text-primary leading-relaxed">
                  <p className="font-bold text-accent uppercase tracking-wider text-[10px] mb-1">💡 Cultural & Usage Tip</p>
                  <p>{currentItem.note}</p>
                </div>
              )}
            </div>

            {/* Footer Navigation */}
            <div className="flex items-center justify-between pt-3 border-t border-border mt-2">
              <button
                onClick={handlePrev}
                disabled={selectedIndex === 0}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold border border-border transition-all ${
                  selectedIndex === 0
                    ? 'opacity-30 cursor-not-allowed bg-surface-2 text-text-tertiary'
                    : 'bg-surface text-text-primary hover:bg-surface-2 active:scale-95'
                }`}
              >
                <ChevronLeft size={16} />
                <span>Previous</span>
              </button>

              <span className="text-xs text-text-tertiary font-mono">
                {selectedIndex + 1} / {filtered.length}
              </span>

              <button
                onClick={handleNext}
                disabled={selectedIndex === filtered.length - 1}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold border border-border transition-all ${
                  selectedIndex === filtered.length - 1
                    ? 'opacity-30 cursor-not-allowed bg-surface-2 text-text-tertiary'
                    : 'bg-accent text-white hover:opacity-90 active:scale-95'
                }`}
              >
                <span>Next</span>
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// ─── 2. BODY PARTS TAB ───────────────────────────────────────────────────────

const REGION_COLOR: Record<BodyPart['region'], string> = {
  head: 'bg-red-100 text-red-700',
  face: 'bg-pink-100 text-pink-700',
  'upper-body': 'bg-blue-100 text-blue-700',
  hand: 'bg-purple-100 text-purple-700',
  'lower-body': 'bg-green-100 text-green-700',
  internal: 'bg-amber-100 text-amber-700',
}

function BodyPartsTab() {
  const [search, setSearch] = useState('')
  const [region, setRegion] = useState<string>('all')
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  const regions = ['all', 'head', 'face', 'upper-body', 'hand', 'lower-body', 'internal']
  const filtered = n5BodyParts.filter(b => {
    const m = !search || b.hiragana.includes(search) || b.meaning.toLowerCase().includes(search.toLowerCase()) || b.romaji.toLowerCase().includes(search.toLowerCase())
    const r = region === 'all' || b.region === region
    return m && r
  })

  const currentItem = selectedIndex !== null && filtered[selectedIndex] ? filtered[selectedIndex] : null

  function handlePrev() {
    if (selectedIndex !== null && selectedIndex > 0) {
      setSelectedIndex(selectedIndex - 1)
    }
  }

  function handleNext() {
    if (selectedIndex !== null && selectedIndex < filtered.length - 1) {
      setSelectedIndex(selectedIndex + 1)
    }
  }

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (selectedIndex === null) return
      if (e.key === 'ArrowLeft') handlePrev()
      if (e.key === 'ArrowRight') handleNext()
      if (e.key === 'Escape') setSelectedIndex(null)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedIndex, filtered.length])

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1"><SearchBar value={search} onChange={setSearch} placeholder="Search body parts…" /></div>
      </div>
      <div className="flex gap-1.5 flex-wrap">
        {regions.map(r => (
          <button key={r} onClick={() => setRegion(r)} className={`px-3 py-1 rounded-full text-[11px] font-semibold capitalize transition-all ${region === r ? 'bg-accent text-white' : 'bg-surface border border-border text-text-secondary hover:bg-surface-2'}`}>{r.replace('-', ' ')}</button>
        ))}
      </div>
      <p className="text-xs text-text-tertiary">{filtered.length} body parts • Click any card for details</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {filtered.map((b, i) => (
          <button
            key={i}
            onClick={() => setSelectedIndex(i)}
            className="bg-surface border border-border rounded-xl p-3 shadow-card text-center hover:shadow-card-hover hover:border-border-strong hover:scale-[1.02] transition-all group"
          >
            <Badge label={b.region.replace('-', ' ')} color={REGION_COLOR[b.region]} />
            <p className="text-2xl font-japanese font-bold text-text-primary group-hover:text-accent transition-colors mt-2 mb-1">{b.hiragana}</p>
            {b.kanji && <p className="text-xs font-japanese text-text-tertiary">{b.kanji}</p>}
            <p className="text-[11px] text-text-tertiary italic">{b.romaji}</p>
            <p className="text-xs text-text-primary font-medium mt-1">{b.meaning}</p>
          </button>
        ))}
      </div>

      {/* Body Part Detail Modal */}
      {currentItem && selectedIndex !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSelectedIndex(null)} />

          {/* Floating Left Arrow */}
          <button
            onClick={handlePrev}
            disabled={selectedIndex === 0}
            className={`hidden md:flex absolute left-8 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full items-center justify-center border border-border bg-surface shadow-panel transition-all ${
              selectedIndex === 0
                ? 'opacity-20 cursor-not-allowed text-text-tertiary'
                : 'text-text-primary hover:bg-surface-2 hover:scale-110 active:scale-95'
            }`}
            aria-label="Previous body part"
          >
            <ChevronLeft size={24} />
          </button>

          {/* Floating Right Arrow */}
          <button
            onClick={handleNext}
            disabled={selectedIndex === filtered.length - 1}
            className={`hidden md:flex absolute right-8 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full items-center justify-center border border-border bg-surface shadow-panel transition-all ${
              selectedIndex === filtered.length - 1
                ? 'opacity-20 cursor-not-allowed text-text-tertiary'
                : 'text-text-primary hover:bg-surface-2 hover:scale-110 active:scale-95'
            }`}
            aria-label="Next body part"
          >
            <ChevronRight size={24} />
          </button>

          <div className="relative w-full max-w-sm bg-surface rounded-2xl border border-border shadow-panel p-6 animate-slide-up max-h-[85vh] flex flex-col z-10">
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <span className="text-xs font-semibold text-text-tertiary">
                Body Part {selectedIndex + 1} of {filtered.length}
              </span>
              <button
                onClick={() => setSelectedIndex(null)}
                className="p-1.5 rounded-lg hover:bg-surface-2 text-text-secondary hover:text-text-primary transition-colors"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>

            {/* Content */}
            <div className="py-6 text-center space-y-2 flex-1">
              <Badge label={currentItem.region.replace('-', ' ')} color={REGION_COLOR[currentItem.region]} />
              <p className="text-5xl font-japanese font-bold text-text-primary pt-2">{currentItem.hiragana}</p>
              {currentItem.kanji && (
                <p className="text-xl font-japanese text-text-tertiary">（{currentItem.kanji}）</p>
              )}
              <p className="text-sm text-text-tertiary italic">{currentItem.romaji}</p>
              <p className="text-lg text-text-primary font-semibold pt-1">{currentItem.meaning}</p>
            </div>

            {/* Footer Navigation */}
            <div className="flex items-center justify-between pt-3 border-t border-border mt-2">
              <button
                onClick={handlePrev}
                disabled={selectedIndex === 0}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold border border-border transition-all ${
                  selectedIndex === 0
                    ? 'opacity-30 cursor-not-allowed bg-surface-2 text-text-tertiary'
                    : 'bg-surface text-text-primary hover:bg-surface-2 active:scale-95'
                }`}
              >
                <ChevronLeft size={16} />
                <span>Previous</span>
              </button>

              <span className="text-xs text-text-tertiary font-mono">
                {selectedIndex + 1} / {filtered.length}
              </span>

              <button
                onClick={handleNext}
                disabled={selectedIndex === filtered.length - 1}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold border border-border transition-all ${
                  selectedIndex === filtered.length - 1
                    ? 'opacity-30 cursor-not-allowed bg-surface-2 text-text-tertiary'
                    : 'bg-accent text-white hover:opacity-90 active:scale-95'
                }`}
              >
                <span>Next</span>
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// ─── 3. DAYS OF WEEK TAB ─────────────────────────────────────────────────────

const DAY_COLORS = [
  'border-l-red-400 bg-red-50',      // Sun
  'border-l-blue-400 bg-blue-50',    // Mon
  'border-l-orange-400 bg-orange-50',// Tue
  'border-l-cyan-400 bg-cyan-50',    // Wed
  'border-l-green-400 bg-green-50',  // Thu
  'border-l-yellow-400 bg-yellow-50',// Fri
  'border-l-purple-400 bg-purple-50',// Sat
]

function DaysTab() {
  const [selectedDayIndex, setSelectedDayIndex] = useState<number | null>(null)

  const currentDay = selectedDayIndex !== null ? n5DaysOfWeek[selectedDayIndex] : null

  function handlePrev() {
    if (selectedDayIndex !== null && selectedDayIndex > 0) {
      setSelectedDayIndex(selectedDayIndex - 1)
    }
  }

  function handleNext() {
    if (selectedDayIndex !== null && selectedDayIndex < n5DaysOfWeek.length - 1) {
      setSelectedDayIndex(selectedDayIndex + 1)
    }
  }

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (selectedDayIndex === null) return
      if (e.key === 'ArrowLeft') {
        e.preventDefault()
        handlePrev()
      } else if (e.key === 'ArrowRight') {
        e.preventDefault()
        handleNext()
      } else if (e.key === 'Escape') {
        setSelectedDayIndex(null)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedDayIndex])

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-bold text-text-primary mb-3">Days of the Week — 曜日</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {n5DaysOfWeek.map((d, i) => (
            <div
              key={d.romaji}
              onClick={() => setSelectedDayIndex(i)}
              className={`border-l-4 rounded-r-xl p-4 shadow-card cursor-pointer hover:scale-[1.02] active:scale-[0.99] transition-all ${DAY_COLORS[i % DAY_COLORS.length]}`}
            >
              <div className="flex items-center justify-between mb-1">
                <p className="text-[10px] font-bold text-text-tertiary uppercase tracking-wider">{d.element}</p>
                <span className="text-[10px] text-text-tertiary">Day {i + 1}</span>
              </div>
              <p className="text-2xl font-japanese font-bold text-text-primary">{d.kanji}</p>
              <p className="text-sm font-japanese text-text-secondary">{d.hiragana}</p>
              <p className="text-[11px] text-text-tertiary italic">{d.romaji}</p>
              <p className="text-sm text-text-primary font-semibold mt-1">{d.meaning}</p>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h3 className="text-sm font-bold text-text-primary mb-3">Related Time Words</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {n5DateWords.map((w, i) => (
            <div key={i} className="bg-surface border border-border rounded-xl p-3 shadow-card">
              <p className="text-lg font-japanese font-bold text-text-primary">{w.hiragana}</p>
              {w.kanji && <p className="text-xs font-japanese text-text-tertiary">{w.kanji}</p>}
              <p className="text-[11px] text-text-tertiary italic">{w.romaji}</p>
              <p className="text-xs text-text-primary font-medium mt-1">{w.meaning}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Days Modal Dialog */}
      {currentDay && selectedDayIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedDayIndex(null)}
        >
          {/* Desktop Left Arrow */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              handlePrev()
            }}
            disabled={selectedDayIndex === 0}
            aria-label="Previous day"
            className={`hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-surface/90 border border-border shadow-xl text-text-primary mr-4 hover:bg-surface-2 transition-all ${
              selectedDayIndex === 0 ? 'opacity-20 cursor-not-allowed' : 'hover:scale-110 active:scale-95'
            }`}
          >
            <ChevronLeft size={28} />
          </button>

          <div
            className="bg-surface rounded-2xl border border-border shadow-2xl w-full max-w-sm p-6 space-y-5 animate-in fade-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-accent-soft text-accent uppercase tracking-wider">
                {currentDay.element}
              </span>
              <button
                onClick={() => setSelectedDayIndex(null)}
                className="text-text-tertiary hover:text-text-primary p-1 rounded-lg hover:bg-surface-2 transition-colors"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>

            {/* Kanji and Hiragana */}
            <div className="text-center py-2 space-y-1">
              <p className="text-5xl font-japanese font-bold text-text-primary">{currentDay.kanji}</p>
              <p className="text-xl font-japanese text-accent font-semibold pt-1">{currentDay.hiragana}</p>
              <p className="text-sm text-text-tertiary italic">{currentDay.romaji}</p>
              <p className="text-xl font-semibold text-text-primary pt-2">{currentDay.meaning}</p>
            </div>

            {/* Footer Navigation */}
            <div className="flex items-center justify-between pt-4 border-t border-border">
              <button
                onClick={handlePrev}
                disabled={selectedDayIndex === 0}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold border border-border transition-all ${
                  selectedDayIndex === 0
                    ? 'opacity-30 cursor-not-allowed bg-surface-2 text-text-tertiary'
                    : 'bg-surface text-text-primary hover:bg-surface-2 active:scale-95'
                }`}
              >
                <ChevronLeft size={16} />
                <span>Previous</span>
              </button>

              <span className="text-xs text-text-tertiary font-mono">
                {selectedDayIndex + 1} / {n5DaysOfWeek.length}
              </span>

              <button
                onClick={handleNext}
                disabled={selectedDayIndex === n5DaysOfWeek.length - 1}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold border border-border transition-all ${
                  selectedDayIndex === n5DaysOfWeek.length - 1
                    ? 'opacity-30 cursor-not-allowed bg-surface-2 text-text-tertiary'
                    : 'bg-accent text-white hover:opacity-90 active:scale-95'
                }`}
              >
                <span>Next</span>
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          {/* Desktop Right Arrow */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              handleNext()
            }}
            disabled={selectedDayIndex === n5DaysOfWeek.length - 1}
            aria-label="Next day"
            className={`hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-surface/90 border border-border shadow-xl text-text-primary ml-4 hover:bg-surface-2 transition-all ${
              selectedDayIndex === n5DaysOfWeek.length - 1 ? 'opacity-20 cursor-not-allowed' : 'hover:scale-110 active:scale-95'
            }`}
          >
            <ChevronRight size={28} />
          </button>
        </div>
      )}
    </div>
  )
}

// ─── 4. NUMBERS TAB ──────────────────────────────────────────────────────────

function NumbersTab() {
  const [search, setSearch] = useState('')
  const filtered = n5Numbers.filter(n => {
    return !search ||
      n.hiragana.includes(search) ||
      n.romaji.toLowerCase().includes(search.toLowerCase()) ||
      String(n.value).includes(search)
  })
  return (
    <div className="space-y-4">
      <SearchBar value={search} onChange={setSearch} placeholder="Search numbers…" />
      <p className="text-xs text-text-tertiary">{filtered.length} numbers</p>
      <div className="overflow-x-auto rounded-xl border border-border shadow-card">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-surface-2 border-b border-border">
              <th className="text-left px-4 py-3 text-xs font-bold text-text-tertiary uppercase tracking-wider w-16">Value</th>
              <th className="text-left px-4 py-3 text-xs font-bold text-text-tertiary uppercase tracking-wider">Hiragana</th>
              <th className="text-left px-4 py-3 text-xs font-bold text-text-tertiary uppercase tracking-wider">Kanji</th>
              <th className="text-left px-4 py-3 text-xs font-bold text-text-tertiary uppercase tracking-wider">Romaji</th>
              <th className="text-left px-4 py-3 text-xs font-bold text-text-tertiary uppercase tracking-wider">Note</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((n, i) => (
              <tr key={i} className="border-b border-border last:border-0 hover:bg-surface-2/50 transition-colors">
                <td className="px-4 py-3 font-bold text-accent text-base">{n.value}</td>
                <td className="px-4 py-3 font-japanese text-text-primary font-bold">{n.hiragana}</td>
                <td className="px-4 py-3 font-japanese text-text-secondary">{n.kanji ?? '—'}</td>
                <td className="px-4 py-3 text-text-secondary italic text-[11px]">{n.romaji}</td>
                <td className="px-4 py-3 text-[11px] text-info">{n.note ?? ''}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// ─── 5. CLOCK TAB ────────────────────────────────────────────────────────────

function ClockTab() {
  return (
    <div className="space-y-6">
      {/* Hours */}
      <div>
        <h3 className="text-sm font-bold text-text-primary mb-1">Hours — 〜時</h3>
        <p className="text-xs text-text-tertiary mb-3">Note: 4時 = よじ (not しじ), 9時 = くじ (not きゅうじ)</p>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
          {n5ClockHours.map(h => (
            <div key={h.hour} className="bg-surface border border-border rounded-xl p-3 text-center shadow-card hover:border-accent/40 transition-all">
              <p className="text-2xl font-bold text-accent">{h.hour}時</p>
              <p className="text-sm font-japanese text-text-primary mt-1">{h.hiragana}</p>
              <p className="text-[10px] text-text-tertiary italic">{h.romaji}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Minutes */}
      <div>
        <h3 className="text-sm font-bold text-text-primary mb-1">Minutes — 〜分</h3>
        <p className="text-xs text-text-tertiary mb-3">Careful: 1分, 3分, 6分, 8分, 10分 have phonetic changes (っぷ)</p>
        <div className="overflow-x-auto rounded-xl border border-border shadow-card">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-surface-2 border-b border-border">
                <th className="text-left px-4 py-2 text-xs font-bold text-text-tertiary uppercase">Min</th>
                <th className="text-left px-4 py-2 text-xs font-bold text-text-tertiary uppercase">Kanji</th>
                <th className="text-left px-4 py-2 text-xs font-bold text-text-tertiary uppercase">Hiragana</th>
                <th className="text-left px-4 py-2 text-xs font-bold text-text-tertiary uppercase">Romaji</th>
                <th className="text-left px-4 py-2 text-xs font-bold text-text-tertiary uppercase">Note</th>
              </tr>
            </thead>
            <tbody>
              {n5ClockMinutes.map((m, i) => (
                <tr key={i} className="border-b border-border last:border-0 hover:bg-surface-2/50">
                  <td className="px-4 py-2 font-bold text-accent">{m.minute}</td>
                  <td className="px-4 py-2 font-japanese">{m.kanji}</td>
                  <td className="px-4 py-2 font-japanese text-text-primary font-bold">{m.hiragana}</td>
                  <td className="px-4 py-2 text-text-secondary italic text-[11px]">{m.romaji}</td>
                  <td className="px-4 py-2 text-[11px] text-info">{m.note ?? ''}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Time words */}
      <div>
        <h3 className="text-sm font-bold text-text-primary mb-3">Time Vocabulary</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {n5TimeWords.map((w, i) => (
            <div key={i} className="bg-surface border border-border rounded-xl p-3 shadow-card">
              <p className="text-xl font-japanese font-bold text-text-primary">{w.hiragana}</p>
              {w.kanji && <p className="text-xs font-japanese text-text-tertiary">{w.kanji}</p>}
              <p className="text-[11px] text-text-tertiary italic">{w.romaji}</p>
              <p className="text-xs text-text-primary font-medium mt-1">{w.meaning}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Example times */}
      <div>
        <h3 className="text-sm font-bold text-text-primary mb-3">Example Time Expressions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {[
            { ja: 'ごぜん くじ じゅっぷん', kanji: '午前 9時 10分', en: '9:10 AM' },
            { ja: 'ごご さんじ はん', kanji: '午後 3時 半', en: '3:30 PM' },
            { ja: 'よじ じゅうごふん まえ', kanji: '4時 15分 前', en: '3:45 (15 minutes before 4)' },
            { ja: 'くじ ごふん すぎ', kanji: '9時 5分 過ぎ', en: '9:05 (5 minutes past 9)' },
            { ja: 'ちょうど じゅうにじ', kanji: 'ちょうど 12時', en: 'exactly 12 o\'clock' },
            { ja: 'いま なんじ ですか', kanji: '今 何時 ですか', en: 'What time is it now?' },
          ].map((ex, i) => (
            <div key={i} className="bg-accent-soft/30 border border-accent/20 rounded-xl p-3">
              <p className="text-base font-japanese font-bold text-text-primary">{ex.ja}</p>
              <p className="text-xs font-japanese text-text-tertiary">{ex.kanji}</p>
              <p className="text-xs text-text-secondary italic mt-1">{ex.en}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── 6 & 7. FAMILY TABS ──────────────────────────────────────────────────────

function FamilyCard({ f, onClick }: { f: FamilyMember; onClick: () => void }) {
  return (
    <div
      onClick={onClick}
      className="bg-surface border border-border rounded-xl p-3.5 shadow-card hover:shadow-card-hover hover:border-accent/40 cursor-pointer transition-all active:scale-[0.99] group"
    >
      <div className="flex items-start justify-between">
        <p className="text-xl font-japanese font-bold text-text-primary group-hover:text-accent transition-colors">{f.hiragana}</p>
        <span className="text-[10px] text-text-tertiary opacity-0 group-hover:opacity-100 transition-opacity">View →</span>
      </div>
      {f.kanji && <p className="text-xs font-japanese text-text-tertiary">{f.kanji}</p>}
      <p className="text-[11px] text-text-tertiary italic">{f.romaji}</p>
      <p className="text-xs text-text-primary font-semibold mt-1">{f.meaning}</p>
      {f.note && <p className="text-[10px] text-info mt-1">💡 {f.note}</p>}
    </div>
  )
}

function FamilyTab({ own }: { own: boolean }) {
  const data = own ? n5FamilyOwn : n5FamilyOthers
  const [search, setSearch] = useState('')
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  const filtered = data.filter(f => !search || f.hiragana.includes(search) || f.meaning.toLowerCase().includes(search.toLowerCase()))
  const currentItem = selectedIndex !== null ? filtered[selectedIndex] : null

  function handlePrev() {
    if (selectedIndex !== null && selectedIndex > 0) {
      setSelectedIndex(selectedIndex - 1)
    }
  }

  function handleNext() {
    if (selectedIndex !== null && selectedIndex < filtered.length - 1) {
      setSelectedIndex(selectedIndex + 1)
    }
  }

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (selectedIndex === null) return
      if (e.key === 'ArrowLeft') {
        e.preventDefault()
        handlePrev()
      } else if (e.key === 'ArrowRight') {
        e.preventDefault()
        handleNext()
      } else if (e.key === 'Escape') {
        setSelectedIndex(null)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedIndex, filtered.length])

  return (
    <div className="space-y-4">
      <div className={`p-4 rounded-xl border text-sm ${own ? 'bg-blue-500/10 border-blue-500/30 text-blue-600 dark:text-blue-300' : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-300'}`}>
        {own
          ? '👤 These are humble (謙譲語) words — used when speaking about YOUR OWN family to others.'
          : '🎩 These are respectful (尊敬語) words — used when speaking about SOMEONE ELSE\'S family.'}
      </div>
      <SearchBar value={search} onChange={(v) => { setSearch(v); setSelectedIndex(null); }} placeholder="Search family words…" />
      <p className="text-xs text-text-tertiary">{filtered.length} words</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {filtered.map((f, i) => (
          <FamilyCard key={i} f={f} onClick={() => setSelectedIndex(i)} />
        ))}
      </div>

      {/* Family Member Modal */}
      {currentItem && selectedIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedIndex(null)}
        >
          {/* Desktop Left Arrow */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              handlePrev()
            }}
            disabled={selectedIndex === 0}
            aria-label="Previous word"
            className={`hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-surface/90 border border-border shadow-xl text-text-primary mr-4 hover:bg-surface-2 transition-all ${
              selectedIndex === 0 ? 'opacity-20 cursor-not-allowed' : 'hover:scale-110 active:scale-95'
            }`}
          >
            <ChevronLeft size={28} />
          </button>

          <div
            className="bg-surface rounded-2xl border border-border shadow-2xl w-full max-w-sm p-6 space-y-5 animate-in fade-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between">
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${
                own
                  ? 'bg-blue-500/10 text-blue-600 dark:text-blue-300 border-blue-500/20'
                  : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-300 border-emerald-500/20'
              }`}>
                {own ? 'Own Family (Humble)' : "Others' Family (Respectful)"}
              </span>
              <button
                onClick={() => setSelectedIndex(null)}
                className="text-text-tertiary hover:text-text-primary p-1 rounded-lg hover:bg-surface-2 transition-colors"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>

            {/* Word details */}
            <div className="text-center py-2 space-y-1">
              <p className="text-4xl font-japanese font-bold text-text-primary">{currentItem.hiragana}</p>
              {currentItem.kanji && (
                <p className="text-lg font-japanese text-text-tertiary">（{currentItem.kanji}）</p>
              )}
              <p className="text-sm text-text-tertiary italic">{currentItem.romaji}</p>
              <p className="text-xl font-bold text-text-primary pt-2">{currentItem.meaning}</p>
              {currentItem.note && (
                <p className="text-xs text-info bg-info/10 border border-info/20 rounded-lg p-2.5 mt-3 text-left">
                  💡 {currentItem.note}
                </p>
              )}
            </div>

            {/* Footer Navigation */}
            <div className="flex items-center justify-between pt-4 border-t border-border">
              <button
                onClick={handlePrev}
                disabled={selectedIndex === 0}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold border border-border transition-all ${
                  selectedIndex === 0
                    ? 'opacity-30 cursor-not-allowed bg-surface-2 text-text-tertiary'
                    : 'bg-surface text-text-primary hover:bg-surface-2 active:scale-95'
                }`}
              >
                <ChevronLeft size={16} />
                <span>Previous</span>
              </button>

              <span className="text-xs text-text-tertiary font-mono">
                {selectedIndex + 1} / {filtered.length}
              </span>

              <button
                onClick={handleNext}
                disabled={selectedIndex === filtered.length - 1}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold border border-border transition-all ${
                  selectedIndex === filtered.length - 1
                    ? 'opacity-30 cursor-not-allowed bg-surface-2 text-text-tertiary'
                    : 'bg-accent text-white hover:opacity-90 active:scale-95'
                }`}
              >
                <span>Next</span>
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          {/* Desktop Right Arrow */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              handleNext()
            }}
            disabled={selectedIndex === filtered.length - 1}
            aria-label="Next word"
            className={`hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-surface/90 border border-border shadow-xl text-text-primary ml-4 hover:bg-surface-2 transition-all ${
              selectedIndex === filtered.length - 1 ? 'opacity-20 cursor-not-allowed' : 'hover:scale-110 active:scale-95'
            }`}
          >
            <ChevronRight size={28} />
          </button>
        </div>
      )}
    </div>
  )
}

function FamilyComparisonTab() {
  return (
    <div className="space-y-4">
      <div className="p-4 rounded-xl border border-border bg-surface-2 text-sm text-text-primary">
        <strong>Key Rule:</strong> In Japanese, you use different words for family members depending on whose family you are talking about.
        <br /><span className="text-blue-700 font-semibold">Blue (Own)</span> = humble forms used for your own family.
        <span className="text-green-700 font-semibold ml-2">Green (Others')</span> = respectful forms for others' family.
      </div>
      <div className="overflow-x-auto rounded-xl border border-border shadow-card">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-surface-2 border-b border-border">
              <th className="text-left px-4 py-3 text-xs font-bold text-text-tertiary uppercase">Relationship</th>
              <th className="text-left px-4 py-3 text-xs font-bold text-blue-600 uppercase">Own Family (humble)</th>
              <th className="text-left px-4 py-3 text-xs font-bold text-green-600 uppercase">Others' Family (respectful)</th>
            </tr>
          </thead>
          <tbody>
            {n5FamilyOwn.map((own, i) => {
              const other = n5FamilyOthers[i]
              return (
                <tr key={i} className="border-b border-border last:border-0 hover:bg-surface-2/50 transition-colors">
                  <td className="px-4 py-3 text-text-secondary font-medium">{own.meaning.replace('my ', '')}</td>
                  <td className="px-4 py-3">
                    <p className="font-japanese font-bold text-blue-700">{own.hiragana}</p>
                    <p className="text-[10px] text-text-tertiary italic">{own.romaji}</p>
                  </td>
                  <td className="px-4 py-3">
                    {other && <>
                      <p className="font-japanese font-bold text-green-700">{other.hiragana}</p>
                      <p className="text-[10px] text-text-tertiary italic">{other.romaji}</p>
                    </>}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// ─── 8. WH QUESTIONS TAB ─────────────────────────────────────────────────────

function WHTab() {
  const [search, setSearch] = useState('')
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  const filtered = n5WHQuestions.filter(q =>
    !search ||
    q.hiragana.includes(search) ||
    q.meaning.toLowerCase().includes(search.toLowerCase()) ||
    q.romaji.toLowerCase().includes(search.toLowerCase())
  )

  const currentItem = selectedIndex !== null ? filtered[selectedIndex] : null

  function handlePrev() {
    if (selectedIndex !== null && selectedIndex > 0) {
      setSelectedIndex(selectedIndex - 1)
    }
  }

  function handleNext() {
    if (selectedIndex !== null && selectedIndex < filtered.length - 1) {
      setSelectedIndex(selectedIndex + 1)
    }
  }

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (selectedIndex === null) return
      if (e.key === 'ArrowLeft') {
        e.preventDefault()
        handlePrev()
      } else if (e.key === 'ArrowRight') {
        e.preventDefault()
        handleNext()
      } else if (e.key === 'Escape') {
        setSelectedIndex(null)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedIndex, filtered.length])

  return (
    <div className="space-y-4">
      <SearchBar value={search} onChange={(v) => { setSearch(v); setSelectedIndex(null); }} placeholder="Search WH questions…" />
      <p className="text-xs text-text-tertiary">{filtered.length} question words</p>
      <div className="space-y-3">
        {filtered.map((q, i) => (
          <div
            key={i}
            onClick={() => setSelectedIndex(i)}
            className="bg-surface border border-border rounded-xl p-4 shadow-card hover:shadow-card-hover hover:border-accent/40 cursor-pointer transition-all active:scale-[0.99] group"
          >
            <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
              <div className="min-w-[120px]">
                <p className="text-2xl font-japanese font-bold text-accent group-hover:scale-105 origin-left transition-transform">{q.hiragana}</p>
                {q.kanji && <p className="text-xs font-japanese text-text-tertiary">{q.kanji}</p>}
                <p className="text-[11px] text-text-tertiary italic">{q.romaji}</p>
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="text-base font-semibold text-text-primary mb-1">{q.meaning}</p>
                  <span className="text-xs text-text-tertiary opacity-0 group-hover:opacity-100 transition-opacity">Study Card →</span>
                </div>
                <p className="text-xs text-text-secondary leading-relaxed">{q.usage}</p>
              </div>
            </div>
            <div className="bg-accent-soft/30 border border-accent/20 rounded-lg p-3">
              <p className="text-sm font-japanese text-text-primary">{q.example.japanese}</p>
              <p className="text-xs text-text-secondary italic mt-0.5">{q.example.meaning}</p>
            </div>
          </div>
        ))}
      </div>

      {/* WH Question Modal */}
      {currentItem && selectedIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedIndex(null)}
        >
          {/* Desktop Left Arrow */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              handlePrev()
            }}
            disabled={selectedIndex === 0}
            aria-label="Previous question word"
            className={`hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-surface/90 border border-border shadow-xl text-text-primary mr-4 hover:bg-surface-2 transition-all ${
              selectedIndex === 0 ? 'opacity-20 cursor-not-allowed' : 'hover:scale-110 active:scale-95'
            }`}
          >
            <ChevronLeft size={28} />
          </button>

          <div
            className="bg-surface rounded-2xl border border-border shadow-2xl w-full max-w-lg p-6 space-y-5 animate-in fade-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-violet-500/10 text-violet-600 dark:text-violet-300 border border-violet-500/20">
                WH Question Word
              </span>
              <button
                onClick={() => setSelectedIndex(null)}
                className="text-text-tertiary hover:text-text-primary p-1 rounded-lg hover:bg-surface-2 transition-colors"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>

            {/* Word Display */}
            <div className="text-center py-2 space-y-1 border-b border-border pb-4">
              <p className="text-5xl font-japanese font-bold text-accent">{currentItem.hiragana}</p>
              {currentItem.kanji && (
                <p className="text-lg font-japanese text-text-tertiary">（{currentItem.kanji}）</p>
              )}
              <p className="text-sm text-text-tertiary italic">{currentItem.romaji}</p>
              <p className="text-2xl font-bold text-text-primary pt-2">{currentItem.meaning}</p>
            </div>

            {/* Usage */}
            <div className="bg-surface-2 rounded-xl p-3.5 border border-border">
              <p className="text-[10px] font-bold text-text-tertiary uppercase tracking-wider mb-1">Usage & Grammar Rule</p>
              <p className="text-xs text-text-primary leading-relaxed">{currentItem.usage}</p>
            </div>

            {/* Example sentence */}
            <div className="bg-accent-soft border border-accent/20 rounded-xl p-4 space-y-1.5">
              <p className="text-[10px] font-bold text-text-tertiary uppercase tracking-wider mb-1">Example Sentence</p>
              <p className="text-base font-japanese font-bold text-text-primary leading-relaxed">{currentItem.example.japanese}</p>
              <p className="text-xs text-text-secondary italic">{currentItem.example.meaning}</p>
            </div>

            {/* Footer Navigation */}
            <div className="flex items-center justify-between pt-4 border-t border-border">
              <button
                onClick={handlePrev}
                disabled={selectedIndex === 0}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold border border-border transition-all ${
                  selectedIndex === 0
                    ? 'opacity-30 cursor-not-allowed bg-surface-2 text-text-tertiary'
                    : 'bg-surface text-text-primary hover:bg-surface-2 active:scale-95'
                }`}
              >
                <ChevronLeft size={16} />
                <span>Previous</span>
              </button>

              <span className="text-xs text-text-tertiary font-mono">
                {selectedIndex + 1} / {filtered.length}
              </span>

              <button
                onClick={handleNext}
                disabled={selectedIndex === filtered.length - 1}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold border border-border transition-all ${
                  selectedIndex === filtered.length - 1
                    ? 'opacity-30 cursor-not-allowed bg-surface-2 text-text-tertiary'
                    : 'bg-accent text-white hover:opacity-90 active:scale-95'
                }`}
              >
                <span>Next</span>
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          {/* Desktop Right Arrow */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              handleNext()
            }}
            disabled={selectedIndex === filtered.length - 1}
            aria-label="Next question word"
            className={`hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-surface/90 border border-border shadow-xl text-text-primary ml-4 hover:bg-surface-2 transition-all ${
              selectedIndex === filtered.length - 1 ? 'opacity-20 cursor-not-allowed' : 'hover:scale-110 active:scale-95'
            }`}
          >
            <ChevronRight size={28} />
          </button>
        </div>
      )}
    </div>
  )
}

// ─── 9. PARTICLES TAB ────────────────────────────────────────────────────────

function ParticlesTab() {
  const [search, setSearch] = useState('')
  const [expanded, setExpanded] = useState<string | null>(null)
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  const filtered = n5Particles.filter(p =>
    !search ||
    p.particle.includes(search) ||
    p.function.toLowerCase().includes(search.toLowerCase()) ||
    p.romaji.toLowerCase().includes(search.toLowerCase())
  )

  const currentParticle = selectedIndex !== null ? filtered[selectedIndex] : null

  function handlePrev() {
    if (selectedIndex !== null && selectedIndex > 0) {
      setSelectedIndex(selectedIndex - 1)
    }
  }

  function handleNext() {
    if (selectedIndex !== null && selectedIndex < filtered.length - 1) {
      setSelectedIndex(selectedIndex + 1)
    }
  }

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (selectedIndex === null) return
      if (e.key === 'ArrowLeft') {
        e.preventDefault()
        handlePrev()
      } else if (e.key === 'ArrowRight') {
        e.preventDefault()
        handleNext()
      } else if (e.key === 'Escape') {
        setSelectedIndex(null)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedIndex, filtered.length])

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <SearchBar value={search} onChange={(v) => { setSearch(v); setSelectedIndex(null); }} placeholder="Search particles…" />
        {filtered.length > 0 && (
          <button
            onClick={() => setSelectedIndex(0)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-accent text-white text-xs font-semibold hover:opacity-90 active:scale-95 transition-all whitespace-nowrap self-start sm:self-auto"
          >
            <span>Study All ({filtered.length})</span>
            <ChevronRight size={14} />
          </button>
        )}
      </div>

      <p className="text-xs text-text-tertiary">{filtered.length} particles</p>
      <div className="space-y-2">
        {filtered.map((p, i) => (
          <div key={i} className="bg-surface border border-border rounded-xl shadow-card overflow-hidden hover:border-border-strong transition-all">
            <div className="flex items-center justify-between p-4 hover:bg-surface-2/50 transition-colors">
              <button
                className="flex items-center gap-4 flex-1 text-left"
                onClick={() => setSelectedIndex(i)}
              >
                <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center flex-shrink-0 shadow-sm hover:scale-105 transition-transform">
                  <span className="text-xl font-japanese font-bold text-white">{p.particle}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-bold text-text-primary">{p.function}</p>
                    <span className="text-[10px] text-text-tertiary">({p.romaji})</span>
                  </div>
                  <p className="text-xs text-text-secondary font-japanese mt-0.5">{p.structure}</p>
                </div>
              </button>

              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  onClick={() => setSelectedIndex(i)}
                  className="px-2.5 py-1 rounded-lg bg-surface-2 text-xs font-medium text-text-primary border border-border hover:border-accent hover:text-accent transition-colors"
                >
                  Modal View
                </button>
                <button
                  onClick={() => setExpanded(expanded === p.particle ? null : p.particle)}
                  className="p-1.5 rounded-lg text-text-tertiary hover:text-text-primary hover:bg-surface-2 transition-colors font-mono text-xs"
                  aria-label="Toggle accordion"
                >
                  {expanded === p.particle ? '▲' : '▼'}
                </button>
              </div>
            </div>

            {expanded === p.particle && (
              <div className="border-t border-border px-4 pb-4 pt-3 animate-fade-in space-y-3">
                {p.note && (
                  <p className="text-xs text-info bg-info-soft border border-info/20 px-3 py-2 rounded-lg">💡 {p.note}</p>
                )}
                <div>
                  <p className="text-[10px] font-bold text-text-tertiary uppercase tracking-wider mb-2">Examples</p>
                  <div className="space-y-2">
                    {p.examples.map((ex, j) => (
                      <div key={j} className="bg-accent-soft/30 border border-accent/20 rounded-lg p-3">
                        <p className="text-sm font-japanese text-text-primary">{ex.japanese}</p>
                        <p className="text-xs text-text-secondary italic mt-0.5">{ex.meaning}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Particle Modal View */}
      {currentParticle && selectedIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedIndex(null)}
        >
          {/* Desktop Left Arrow */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              handlePrev()
            }}
            disabled={selectedIndex === 0}
            aria-label="Previous particle"
            className={`hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-surface/90 border border-border shadow-xl text-text-primary mr-4 hover:bg-surface-2 transition-all ${
              selectedIndex === 0 ? 'opacity-20 cursor-not-allowed' : 'hover:scale-110 active:scale-95'
            }`}
          >
            <ChevronLeft size={28} />
          </button>

          <div
            className="bg-surface rounded-2xl border border-border shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-6 space-y-5 animate-in fade-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-accent-soft text-accent uppercase tracking-wider">
                  JLPT N5 Particle
                </span>
                <span className="text-xs text-text-tertiary font-mono">
                  {currentParticle.romaji}
                </span>
              </div>
              <button
                onClick={() => setSelectedIndex(null)}
                className="text-text-tertiary hover:text-text-primary p-1 rounded-lg hover:bg-surface-2 transition-colors"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>

            {/* Particle Badge & Function */}
            <div className="flex items-center gap-4 bg-surface-2 rounded-2xl p-4 border border-border">
              <div className="w-16 h-16 rounded-2xl bg-accent flex items-center justify-center shadow-md flex-shrink-0">
                <span className="text-3xl font-japanese font-bold text-white">{currentParticle.particle}</span>
              </div>
              <div>
                <p className="text-lg font-bold text-text-primary">{currentParticle.function}</p>
                <p className="text-xs font-japanese text-text-secondary mt-1 bg-surface px-2 py-1 rounded-lg inline-block border border-border">
                  {currentParticle.structure}
                </p>
              </div>
            </div>

            {/* Note */}
            {currentParticle.note && (
              <div className="bg-info/10 border border-info/20 rounded-xl p-3.5 text-xs text-info leading-relaxed">
                💡 <strong>Tip:</strong> {currentParticle.note}
              </div>
            )}

            {/* Examples */}
            <div>
              <p className="text-xs font-bold text-text-tertiary uppercase tracking-wider mb-2">Example Sentences</p>
              <div className="space-y-2.5">
                {currentParticle.examples.map((ex, j) => (
                  <div key={j} className="bg-accent-soft border border-accent/20 rounded-xl p-3.5 space-y-1">
                    <p className="text-sm font-japanese font-bold text-text-primary leading-relaxed">{ex.japanese}</p>
                    <p className="text-xs text-text-secondary italic">{ex.meaning}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer Navigation */}
            <div className="flex items-center justify-between pt-4 border-t border-border">
              <button
                onClick={handlePrev}
                disabled={selectedIndex === 0}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold border border-border transition-all ${
                  selectedIndex === 0
                    ? 'opacity-30 cursor-not-allowed bg-surface-2 text-text-tertiary'
                    : 'bg-surface text-text-primary hover:bg-surface-2 active:scale-95'
                }`}
              >
                <ChevronLeft size={16} />
                <span>Previous</span>
              </button>

              <span className="text-xs text-text-tertiary font-mono">
                {selectedIndex + 1} / {filtered.length}
              </span>

              <button
                onClick={handleNext}
                disabled={selectedIndex === filtered.length - 1}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold border border-border transition-all ${
                  selectedIndex === filtered.length - 1
                    ? 'opacity-30 cursor-not-allowed bg-surface-2 text-text-tertiary'
                    : 'bg-accent text-white hover:opacity-90 active:scale-95'
                }`}
              >
                <span>Next</span>
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          {/* Desktop Right Arrow */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              handleNext()
            }}
            disabled={selectedIndex === filtered.length - 1}
            aria-label="Next particle"
            className={`hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-surface/90 border border-border shadow-xl text-text-primary ml-4 hover:bg-surface-2 transition-all ${
              selectedIndex === filtered.length - 1 ? 'opacity-20 cursor-not-allowed' : 'hover:scale-110 active:scale-95'
            }`}
          >
            <ChevronRight size={28} />
          </button>
        </div>
      )}
    </div>
  )
}

// ─── 10. KANJI 110 TAB ───────────────────────────────────────────────────────

const KANJI_CATEGORY_COLOR: Record<string, string> = {
  Numbers: 'bg-red-100 text-red-700',
  Time: 'bg-blue-100 text-blue-700',
  People: 'bg-green-100 text-green-700',
  Nature: 'bg-emerald-100 text-emerald-700',
  Places: 'bg-purple-100 text-purple-700',
  Actions: 'bg-orange-100 text-orange-700',
  School: 'bg-cyan-100 text-cyan-700',
  Health: 'bg-pink-100 text-pink-700',
  Home: 'bg-amber-100 text-amber-700',
  Size: 'bg-teal-100 text-teal-700',
  Colors: 'bg-rose-100 text-rose-700',
  Questions: 'bg-violet-100 text-violet-700',
  Pronouns: 'bg-indigo-100 text-indigo-700',
  Money: 'bg-yellow-100 text-yellow-700',
}

function KanjiTab() {
  const [search, setSearch] = useState('')
  const [cat, setCat] = useState<string>('all')
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  const categories = useMemo(() => ['all', ...Array.from(new Set(n5Kanji110.map(k => k.category)))], [])

  const filtered = n5Kanji110.filter(k => {
    const m = !search ||
      k.character.includes(search) ||
      k.meaning.toLowerCase().includes(search.toLowerCase()) ||
      k.onyomi.some(o => o.includes(search)) ||
      k.kunyomi.some(u => u.includes(search))
    const c = cat === 'all' || k.category === cat
    return m && c
  })

  const currentKanji = selectedIndex !== null && filtered[selectedIndex] ? filtered[selectedIndex] : null

  function handlePrev() {
    if (selectedIndex !== null && selectedIndex > 0) {
      setSelectedIndex(selectedIndex - 1)
    }
  }

  function handleNext() {
    if (selectedIndex !== null && selectedIndex < filtered.length - 1) {
      setSelectedIndex(selectedIndex + 1)
    }
  }

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (selectedIndex === null) return
      if (e.key === 'ArrowLeft') handlePrev()
      if (e.key === 'ArrowRight') handleNext()
      if (e.key === 'Escape') setSelectedIndex(null)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedIndex, filtered.length])

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1"><SearchBar value={search} onChange={setSearch} placeholder="Search kanji, reading, or meaning…" /></div>
      </div>
      <div className="flex gap-1.5 flex-wrap">
        {categories.map(c => (
          <button key={c} onClick={() => setCat(c)} className={`px-3 py-1 rounded-full text-[11px] font-semibold transition-all ${cat === c ? 'bg-accent text-white' : 'bg-surface border border-border text-text-secondary hover:bg-surface-2'}`}>{c}</button>
        ))}
      </div>
      <p className="text-xs text-text-tertiary">{filtered.length} / 125 kanji • Click any card for details</p>

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-2">
        {filtered.map((k, index) => (
          <button
            key={k.id}
            onClick={() => setSelectedIndex(index)}
            className="bg-surface border border-border rounded-xl p-2 text-center shadow-card hover:shadow-card-hover hover:border-accent/40 hover:bg-accent-soft/10 hover:scale-[1.02] transition-all group"
          >
            <p className="text-3xl font-japanese font-bold text-text-primary group-hover:text-accent transition-colors">{k.character}</p>
            <p className="text-[10px] text-text-tertiary mt-1 line-clamp-1">{k.meaning}</p>
            <p className="text-[9px] text-text-tertiary">{k.strokeCount}画</p>
            <Badge label={k.category} color={KANJI_CATEGORY_COLOR[k.category] ?? 'bg-surface-2 text-text-secondary'} />
          </button>
        ))}
      </div>

      {/* Kanji detail modal with Next and Previous */}
      {currentKanji && selectedIndex !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSelectedIndex(null)} />

          {/* Desktop Floating Left Arrow */}
          <button
            onClick={handlePrev}
            disabled={selectedIndex === 0}
            className={`hidden md:flex absolute left-8 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full items-center justify-center border border-border bg-surface shadow-panel transition-all ${
              selectedIndex === 0
                ? 'opacity-20 cursor-not-allowed text-text-tertiary'
                : 'text-text-primary hover:bg-surface-2 hover:scale-110 active:scale-95'
            }`}
            aria-label="Previous kanji"
          >
            <ChevronLeft size={24} />
          </button>

          {/* Desktop Floating Right Arrow */}
          <button
            onClick={handleNext}
            disabled={selectedIndex === filtered.length - 1}
            className={`hidden md:flex absolute right-8 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full items-center justify-center border border-border bg-surface shadow-panel transition-all ${
              selectedIndex === filtered.length - 1
                ? 'opacity-20 cursor-not-allowed text-text-tertiary'
                : 'text-text-primary hover:bg-surface-2 hover:scale-110 active:scale-95'
            }`}
            aria-label="Next kanji"
          >
            <ChevronRight size={24} />
          </button>

          <div className="relative w-full max-w-sm bg-surface rounded-2xl border border-border shadow-panel p-6 animate-slide-up max-h-[85vh] flex flex-col z-10">
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <span className="text-xs font-semibold text-text-tertiary">
                Kanji {selectedIndex + 1} of {filtered.length}
              </span>
              <button
                onClick={() => setSelectedIndex(null)}
                className="p-1.5 rounded-lg hover:bg-surface-2 text-text-secondary hover:text-text-primary transition-colors"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>

            {/* Content */}
            <div className="overflow-y-auto py-4 space-y-4 flex-1">
              <div className="text-center">
                <p className="text-7xl font-japanese font-bold text-text-primary">{currentKanji.character}</p>
                <p className="text-base font-semibold text-text-primary mt-2">{currentKanji.meaning}</p>
                <p className="text-xs text-text-tertiary mt-1 mb-2">{currentKanji.strokeCount} strokes</p>
                <Badge label={currentKanji.category} color={KANJI_CATEGORY_COLOR[currentKanji.category] ?? 'bg-surface-2 text-text-secondary'} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-surface-2 rounded-xl p-3 border border-border">
                  <p className="text-[10px] font-bold text-text-tertiary uppercase mb-1">On'yomi</p>
                  <p className="font-japanese text-text-primary text-sm">{currentKanji.onyomi.length > 0 ? currentKanji.onyomi.join('、') : '—'}</p>
                </div>
                <div className="bg-surface-2 rounded-xl p-3 border border-border">
                  <p className="text-[10px] font-bold text-text-tertiary uppercase mb-1">Kun'yomi</p>
                  <p className="font-japanese text-text-primary text-sm">{currentKanji.kunyomi.length > 0 ? currentKanji.kunyomi.join('、') : '—'}</p>
                </div>
              </div>
              <div className="bg-surface-2 border border-border rounded-xl p-3 space-y-1">
                <p className="text-[10px] font-bold text-text-tertiary uppercase mb-1">Example Word</p>
                <p className="font-japanese font-bold text-text-primary text-base">{currentKanji.example}</p>
                <p className="text-xs text-text-secondary italic">{currentKanji.exampleMeaning}</p>
              </div>
            </div>

            {/* Footer Navigation */}
            <div className="flex items-center justify-between pt-3 border-t border-border mt-2">
              <button
                onClick={handlePrev}
                disabled={selectedIndex === 0}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold border border-border transition-all ${
                  selectedIndex === 0
                    ? 'opacity-30 cursor-not-allowed bg-surface-2 text-text-tertiary'
                    : 'bg-surface text-text-primary hover:bg-surface-2 active:scale-95'
                }`}
              >
                <ChevronLeft size={16} />
                <span>Previous</span>
              </button>

              <span className="text-xs text-text-tertiary font-mono">
                {selectedIndex + 1} / {filtered.length}
              </span>

              <button
                onClick={handleNext}
                disabled={selectedIndex === filtered.length - 1}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold border border-border transition-all ${
                  selectedIndex === filtered.length - 1
                    ? 'opacity-30 cursor-not-allowed bg-surface-2 text-text-tertiary'
                    : 'bg-accent text-white hover:opacity-90 active:scale-95'
                }`}
              >
                <span>Next</span>
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// ─── 11. ADJECTIVES TAB ──────────────────────────────────────────────────────

function AdjectivesTab() {
  const [search, setSearch] = useState('')
  const [type, setType] = useState<'all' | 'i' | 'na'>('all')
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  const filtered = n5Adjectives.filter(a => {
    const m = !search ||
      a.hiragana.includes(search) ||
      a.meaning.toLowerCase().includes(search.toLowerCase()) ||
      a.romaji.toLowerCase().includes(search.toLowerCase())
    const t = type === 'all' || a.type === type
    return m && t
  })

  const currentAdj = selectedIndex !== null && filtered[selectedIndex] ? filtered[selectedIndex] : null

  function handlePrev() {
    if (selectedIndex !== null && selectedIndex > 0) {
      setSelectedIndex(selectedIndex - 1)
    }
  }

  function handleNext() {
    if (selectedIndex !== null && selectedIndex < filtered.length - 1) {
      setSelectedIndex(selectedIndex + 1)
    }
  }

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (selectedIndex === null) return
      if (e.key === 'ArrowLeft') handlePrev()
      if (e.key === 'ArrowRight') handleNext()
      if (e.key === 'Escape') setSelectedIndex(null)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedIndex, filtered.length])

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1"><SearchBar value={search} onChange={setSearch} placeholder="Search adjectives…" /></div>
        <div className="flex gap-2">
          {(['all', 'i', 'na'] as const).map(t => (
            <button key={t} onClick={() => setType(t)} className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${type === t ? 'bg-accent text-white' : 'bg-surface border border-border text-text-secondary hover:bg-surface-2'}`}>
              {t === 'all' ? 'All' : t === 'i' ? 'い-adj' : 'な-adj'}
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-3 text-xs">
        <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-blue-200 inline-block" /> <span>い-adjective: changes ending (い→く) for negative/past</span></div>
        <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-rose-200 inline-block" /> <span>な-adjective: uses では/だった for conjugation</span></div>
      </div>
      <p className="text-xs text-text-tertiary">{filtered.length} adjectives • Click any card for full conjugation details</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {filtered.map((adj, index) => (
          <button
            key={index}
            onClick={() => setSelectedIndex(index)}
            className="border border-border rounded-xl p-3.5 shadow-card hover:shadow-card-hover hover:border-border-strong hover:scale-[1.01] transition-all text-left bg-surface group"
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-lg font-japanese font-bold text-text-primary group-hover:text-accent transition-colors">{adj.hiragana}</p>
                {adj.kanji && <p className="text-xs font-japanese text-text-tertiary">{adj.kanji}</p>}
                <p className="text-[11px] text-text-tertiary italic">{adj.romaji}</p>
                <p className="text-sm text-text-primary font-medium mt-1">{adj.meaning}</p>
              </div>
              <Badge
                label={adj.type === 'i' ? 'い-adj' : 'な-adj'}
                color={adj.type === 'i' ? 'bg-blue-100 text-blue-700' : 'bg-rose-100 text-rose-700'}
              />
            </div>
            {adj.conjugation && (
              <div className="mt-2.5 pt-2 border-t border-border flex items-center justify-between text-[10px] text-text-tertiary">
                <span>Negative: <strong className="font-japanese text-text-secondary">{adj.conjugation.negative}</strong></span>
                <span>Past: <strong className="font-japanese text-text-secondary">{adj.conjugation.past}</strong></span>
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Adjective Detail Modal with Full Conjugation Matrix */}
      {currentAdj && selectedIndex !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSelectedIndex(null)} />

          {/* Floating Left Arrow */}
          <button
            onClick={handlePrev}
            disabled={selectedIndex === 0}
            className={`hidden md:flex absolute left-8 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full items-center justify-center border border-border bg-surface shadow-panel transition-all ${
              selectedIndex === 0
                ? 'opacity-20 cursor-not-allowed text-text-tertiary'
                : 'text-text-primary hover:bg-surface-2 hover:scale-110 active:scale-95'
            }`}
            aria-label="Previous adjective"
          >
            <ChevronLeft size={24} />
          </button>

          {/* Floating Right Arrow */}
          <button
            onClick={handleNext}
            disabled={selectedIndex === filtered.length - 1}
            className={`hidden md:flex absolute right-8 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full items-center justify-center border border-border bg-surface shadow-panel transition-all ${
              selectedIndex === filtered.length - 1
                ? 'opacity-20 cursor-not-allowed text-text-tertiary'
                : 'text-text-primary hover:bg-surface-2 hover:scale-110 active:scale-95'
            }`}
            aria-label="Next adjective"
          >
            <ChevronRight size={24} />
          </button>

          <div className="relative w-full max-w-md bg-surface rounded-2xl border border-border shadow-panel p-6 animate-slide-up max-h-[85vh] flex flex-col z-10">
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <span className="text-xs font-semibold text-text-tertiary">
                Adjective {selectedIndex + 1} of {filtered.length}
              </span>
              <button
                onClick={() => setSelectedIndex(null)}
                className="p-1.5 rounded-lg hover:bg-surface-2 text-text-secondary hover:text-text-primary transition-colors"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>

            {/* Body */}
            <div className="overflow-y-auto py-4 space-y-4 flex-1">
              <div>
                <Badge
                  label={currentAdj.type === 'i' ? 'い-adjective' : 'な-adjective'}
                  color={currentAdj.type === 'i' ? 'bg-blue-100 text-blue-700' : 'bg-rose-100 text-rose-700'}
                />
                <p className="text-3xl font-japanese font-bold text-text-primary mt-2 mb-0.5">{currentAdj.hiragana}</p>
                {currentAdj.kanji && (
                  <p className="text-base font-japanese text-text-tertiary mb-1">（{currentAdj.kanji}）</p>
                )}
                <p className="text-sm text-text-tertiary italic mb-2">{currentAdj.romaji}</p>
                <p className="text-lg text-text-primary font-semibold">{currentAdj.meaning}</p>
              </div>

              {/* Conjugation Matrix */}
              {currentAdj.conjugation && (
                <div className="space-y-2">
                  <p className="text-[10px] font-bold text-text-tertiary uppercase tracking-wider">Conjugation Chart</p>
                  <div className="bg-surface-2 rounded-xl border border-border overflow-hidden text-xs">
                    <div className="grid grid-cols-2 p-3 border-b border-border">
                      <div>
                        <p className="text-[10px] text-text-tertiary uppercase mb-0.5">Present (Affirmative)</p>
                        <p className="font-japanese font-bold text-text-primary text-sm">{currentAdj.hiragana}</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-text-tertiary uppercase mb-0.5">Present (Negative)</p>
                        <p className="font-japanese font-bold text-accent text-sm">{currentAdj.conjugation.negative}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 p-3">
                      <div>
                        <p className="text-[10px] text-text-tertiary uppercase mb-0.5">Past (Affirmative)</p>
                        <p className="font-japanese font-bold text-blue-600 text-sm">{currentAdj.conjugation.past}</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-text-tertiary uppercase mb-0.5">Past (Negative)</p>
                        <p className="font-japanese font-bold text-rose-600 text-sm">{currentAdj.conjugation.negativePast}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer Navigation */}
            <div className="flex items-center justify-between pt-3 border-t border-border mt-2">
              <button
                onClick={handlePrev}
                disabled={selectedIndex === 0}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold border border-border transition-all ${
                  selectedIndex === 0
                    ? 'opacity-30 cursor-not-allowed bg-surface-2 text-text-tertiary'
                    : 'bg-surface text-text-primary hover:bg-surface-2 active:scale-95'
                }`}
              >
                <ChevronLeft size={16} />
                <span>Previous</span>
              </button>

              <span className="text-xs text-text-tertiary font-mono">
                {selectedIndex + 1} / {filtered.length}
              </span>

              <button
                onClick={handleNext}
                disabled={selectedIndex === filtered.length - 1}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold border border-border transition-all ${
                  selectedIndex === filtered.length - 1
                    ? 'opacity-30 cursor-not-allowed bg-surface-2 text-text-tertiary'
                    : 'bg-accent text-white hover:opacity-90 active:scale-95'
                }`}
              >
                <span>Next</span>
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// ─── 12. VERB CHART TAB ──────────────────────────────────────────────────────

const GROUP_COLOR: Record<VerbGroup, string> = {
  group1: 'bg-blue-100 text-blue-700',
  group2: 'bg-green-100 text-green-700',
  irregular: 'bg-amber-100 text-amber-700',
}
const GROUP_LABEL: Record<VerbGroup, string> = {
  group1: 'Group 1 (う)',
  group2: 'Group 2 (る)',
  irregular: 'Irregular',
}

function VerbChartTab() {
  const [search, setSearch] = useState('')
  const [group, setGroup] = useState<VerbGroup | 'all'>('all')
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  const filtered = n5VerbChart.filter(v => {
    const m = !search ||
      v.dictionary.includes(search) ||
      v.meaning.toLowerCase().includes(search.toLowerCase()) ||
      v.masu.includes(search) ||
      v.kanji?.includes(search)
    const g = group === 'all' || v.group === group
    return m && g
  })

  const currentVerb = selectedIndex !== null && filtered[selectedIndex] ? filtered[selectedIndex] : null

  function handlePrev() {
    if (selectedIndex !== null && selectedIndex > 0) {
      setSelectedIndex(selectedIndex - 1)
    }
  }

  function handleNext() {
    if (selectedIndex !== null && selectedIndex < filtered.length - 1) {
      setSelectedIndex(selectedIndex + 1)
    }
  }

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (selectedIndex === null) return
      if (e.key === 'ArrowLeft') handlePrev()
      if (e.key === 'ArrowRight') handleNext()
      if (e.key === 'Escape') setSelectedIndex(null)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedIndex, filtered.length])

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1"><SearchBar value={search} onChange={setSearch} placeholder="Search verb, meaning, or form…" /></div>
        <div className="flex gap-2 flex-wrap">
          {(['all', 'group1', 'group2', 'irregular'] as const).map(g => (
            <button key={g} onClick={() => setGroup(g)} className={`px-3 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${group === g ? 'bg-accent text-white' : 'bg-surface border border-border text-text-secondary hover:bg-surface-2'}`}>
              {g === 'all' ? 'All' : GROUP_LABEL[g]}
            </button>
          ))}
        </div>
      </div>

      <div className="p-3 bg-surface-2 border border-border rounded-xl text-xs text-text-secondary leading-relaxed">
        <strong className="text-text-primary">How to use:</strong> Click any verb row to open detail card with full forms. Dictionary form = plain present/future. ます = polite present. て = te-form. た = past. ない = negative. なかった = negative past.
      </div>

      <p className="text-xs text-text-tertiary">{filtered.length} verbs • Click any row for details</p>

      <div className="overflow-x-auto rounded-xl border border-border shadow-card">
        <table className="w-full text-sm min-w-[900px]">
          <thead>
            <tr className="bg-surface-2 border-b border-border">
              <th className="text-left px-3 py-3 text-xs font-bold text-text-tertiary uppercase sticky left-0 bg-surface-2">Verb</th>
              <th className="text-left px-3 py-3 text-xs font-bold text-text-tertiary uppercase">Meaning</th>
              <th className="text-left px-3 py-3 text-xs font-bold text-text-tertiary uppercase">Group</th>
              <th className="text-left px-3 py-3 text-xs font-bold text-accent uppercase">〜ます</th>
              <th className="text-left px-3 py-3 text-xs font-bold text-green-600 uppercase">〜て</th>
              <th className="text-left px-3 py-3 text-xs font-bold text-blue-600 uppercase">〜た</th>
              <th className="text-left px-3 py-3 text-xs font-bold text-orange-600 uppercase">〜ない</th>
              <th className="text-left px-3 py-3 text-xs font-bold text-rose-600 uppercase">〜なかった</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((v, index) => (
              <tr
                key={v.id}
                onClick={() => setSelectedIndex(index)}
                className="border-b border-border last:border-0 hover:bg-surface-2/60 transition-colors cursor-pointer group"
              >
                <td className="px-3 py-3 sticky left-0 bg-surface group-hover:bg-surface-2/60">
                  <p className="font-japanese font-bold text-text-primary group-hover:text-accent transition-colors">{v.dictionary}</p>
                  {v.kanji && <p className="text-xs font-japanese text-text-tertiary">{v.kanji}</p>}
                  {v.note && <p className="text-[10px] text-info mt-0.5">{v.note}</p>}
                </td>
                <td className="px-3 py-3 text-text-secondary text-xs">{v.meaning}</td>
                <td className="px-3 py-3">
                  <Badge label={GROUP_LABEL[v.group]} color={GROUP_COLOR[v.group]} />
                </td>
                <td className="px-3 py-3 font-japanese font-bold text-accent">{v.masu}</td>
                <td className="px-3 py-3 font-japanese font-bold text-green-600">{v.te}</td>
                <td className="px-3 py-3 font-japanese font-bold text-blue-600">{v.ta}</td>
                <td className="px-3 py-3 font-japanese font-bold text-orange-600">{v.nai}</td>
                <td className="px-3 py-3 font-japanese font-bold text-rose-600">{v.nakatta}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Verb Detail Modal */}
      {currentVerb && selectedIndex !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSelectedIndex(null)} />

          {/* Desktop Floating Left Arrow */}
          <button
            onClick={handlePrev}
            disabled={selectedIndex === 0}
            className={`hidden md:flex absolute left-8 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full items-center justify-center border border-border bg-surface shadow-panel transition-all ${
              selectedIndex === 0
                ? 'opacity-20 cursor-not-allowed text-text-tertiary'
                : 'text-text-primary hover:bg-surface-2 hover:scale-110 active:scale-95'
            }`}
            aria-label="Previous verb"
          >
            <ChevronLeft size={24} />
          </button>

          {/* Desktop Floating Right Arrow */}
          <button
            onClick={handleNext}
            disabled={selectedIndex === filtered.length - 1}
            className={`hidden md:flex absolute right-8 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full items-center justify-center border border-border bg-surface shadow-panel transition-all ${
              selectedIndex === filtered.length - 1
                ? 'opacity-20 cursor-not-allowed text-text-tertiary'
                : 'text-text-primary hover:bg-surface-2 hover:scale-110 active:scale-95'
            }`}
            aria-label="Next verb"
          >
            <ChevronRight size={24} />
          </button>

          <div className="relative w-full max-w-md bg-surface rounded-2xl border border-border shadow-panel p-6 animate-slide-up max-h-[85vh] flex flex-col z-10">
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <span className="text-xs font-semibold text-text-tertiary">
                Verb {selectedIndex + 1} of {filtered.length}
              </span>
              <button
                onClick={() => setSelectedIndex(null)}
                className="p-1.5 rounded-lg hover:bg-surface-2 text-text-secondary hover:text-text-primary transition-colors"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>

            {/* Content */}
            <div className="overflow-y-auto py-4 space-y-4 flex-1">
              <div>
                <Badge label={GROUP_LABEL[currentVerb.group]} color={GROUP_COLOR[currentVerb.group]} />
                <p className="text-3xl font-japanese font-bold text-text-primary mt-2">{currentVerb.dictionary}</p>
                {currentVerb.kanji && (
                  <p className="text-base font-japanese text-text-tertiary">（{currentVerb.kanji}）</p>
                )}
                <p className="text-base text-text-primary font-semibold mt-1">{currentVerb.meaning}</p>
                {currentVerb.note && <p className="text-xs text-info mt-1">💡 {currentVerb.note}</p>}
              </div>

              {/* Form Grid */}
              <div className="space-y-2">
                <p className="text-[10px] font-bold text-text-tertiary uppercase tracking-wider">Conjugated Forms</p>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 bg-surface-2 rounded-xl border border-border">
                    <p className="text-[10px] text-text-tertiary uppercase mb-0.5">Polite (〜ます)</p>
                    <p className="font-japanese font-bold text-accent text-sm">{currentVerb.masu}</p>
                  </div>
                  <div className="p-2.5 bg-surface-2 rounded-xl border border-border">
                    <p className="text-[10px] text-text-tertiary uppercase mb-0.5">Te-form (〜て)</p>
                    <p className="font-japanese font-bold text-green-600 text-sm">{currentVerb.te}</p>
                  </div>
                  <div className="p-2.5 bg-surface-2 rounded-xl border border-border">
                    <p className="text-[10px] text-text-tertiary uppercase mb-0.5">Plain Past (〜た)</p>
                    <p className="font-japanese font-bold text-blue-600 text-sm">{currentVerb.ta}</p>
                  </div>
                  <div className="p-2.5 bg-surface-2 rounded-xl border border-border">
                    <p className="text-[10px] text-text-tertiary uppercase mb-0.5">Negative (〜ない)</p>
                    <p className="font-japanese font-bold text-orange-600 text-sm">{currentVerb.nai}</p>
                  </div>
                  <div className="p-2.5 bg-surface-2 rounded-xl border border-border col-span-2">
                    <p className="text-[10px] text-text-tertiary uppercase mb-0.5">Negative Past (〜なかった)</p>
                    <p className="font-japanese font-bold text-rose-600 text-sm">{currentVerb.nakatta}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Navigation */}
            <div className="flex items-center justify-between pt-3 border-t border-border mt-2">
              <button
                onClick={handlePrev}
                disabled={selectedIndex === 0}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold border border-border transition-all ${
                  selectedIndex === 0
                    ? 'opacity-30 cursor-not-allowed bg-surface-2 text-text-tertiary'
                    : 'bg-surface text-text-primary hover:bg-surface-2 active:scale-95'
                }`}
              >
                <ChevronLeft size={16} />
                <span>Previous</span>
              </button>

              <span className="text-xs text-text-tertiary font-mono">
                {selectedIndex + 1} / {filtered.length}
              </span>

              <button
                onClick={handleNext}
                disabled={selectedIndex === filtered.length - 1}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold border border-border transition-all ${
                  selectedIndex === filtered.length - 1
                    ? 'opacity-30 cursor-not-allowed bg-surface-2 text-text-tertiary'
                    : 'bg-accent text-white hover:opacity-90 active:scale-95'
                }`}
              >
                <span>Next</span>
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────

export default function ReferencePage() {
  const [activeTab, setActiveTab] = useState<TabId>('greetings')
  const [viewMode, setViewMode] = useState<'scroll' | 'grid'>('scroll')
  const tabsContainerRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  function updateScrollButtons() {
    const el = tabsContainerRef.current
    if (!el) return
    setCanScrollLeft(el.scrollLeft > 5)
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 5)
  }

  function scrollTabs(direction: 'left' | 'right') {
    const el = tabsContainerRef.current
    if (!el) return
    const offset = direction === 'left' ? -260 : 260
    el.scrollBy({ left: offset, behavior: 'smooth' })
  }

  useEffect(() => {
    updateScrollButtons()
    const el = tabsContainerRef.current
    if (el) {
      el.addEventListener('scroll', updateScrollButtons)
      window.addEventListener('resize', updateScrollButtons)
      return () => {
        el.removeEventListener('scroll', updateScrollButtons)
        window.removeEventListener('resize', updateScrollButtons)
      }
    }
  }, [viewMode])

  useEffect(() => {
    if (viewMode === 'scroll' && tabsContainerRef.current) {
      const activeEl = tabsContainerRef.current.querySelector<HTMLElement>(`[data-tab-id="${activeTab}"]`)
      if (activeEl) {
        activeEl.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
      }
    }
  }, [activeTab, viewMode])

  function renderTab() {
    switch (activeTab) {
      case 'greetings': return <GreetingsTab />
      case 'body': return <BodyPartsTab />
      case 'days': return <DaysTab />
      case 'numbers': return <NumbersTab />
      case 'clock': return <ClockTab />
      case 'family-own': return <FamilyTab own={true} />
      case 'family-oth': return <FamilyComparisonTab />
      case 'wh': return <WHTab />
      case 'particles': return <ParticlesTab />
      case 'kanji': return <KanjiTab />
      case 'adj': return <AdjectivesTab />
      case 'verbs': return <VerbChartTab />
      default: return null
    }
  }

  const currentTab = TABS.find(t => t.id === activeTab)

  return (
    <div className="space-y-5 animate-fade-in">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-semibold text-accent tracking-widest uppercase">JLPT N5</span>
          <span className="w-1 h-1 rounded-full bg-border-strong" />
          <span className="text-xs text-text-secondary font-japanese">完全参照</span>
        </div>
        <h2 className="text-xl font-bold text-text-primary">N5 Complete Reference</h2>
        <p className="text-sm text-text-secondary mt-1">
          All essential N5 content organized by topic — 12 sections, exam-focused.
        </p>
      </div>

      {/* Category Navigation Bar — sticky with scroll controls & layout switcher */}
      <div className="sticky top-0 z-30 -mx-4 px-4 pt-2 pb-2.5 bg-background/90 backdrop-blur-md border-b border-border shadow-sm">
        <div className="flex items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-text-primary uppercase tracking-wider">
              Categories ({TABS.length})
            </span>
            <span className="text-[11px] text-text-tertiary">
              • {currentTab?.emoji} {currentTab?.label}
            </span>
          </div>

          {/* View Mode Toggle: Compact Scroll vs. Show All (Grid) */}
          <button
            onClick={() => setViewMode(m => (m === 'scroll' ? 'grid' : 'scroll'))}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-border bg-surface hover:bg-surface-2 text-text-secondary hover:text-text-primary text-xs font-medium transition-colors shadow-sm"
            title={viewMode === 'scroll' ? 'Show all 12 categories in a grid' : 'Switch to single-line scroll'}
          >
            {viewMode === 'scroll' ? (
              <>
                <LayoutGrid size={13} className="text-accent" />
                <span className="font-semibold">Show All (12)</span>
              </>
            ) : (
              <>
                <Rows size={13} className="text-accent" />
                <span className="font-semibold">Compact Scroll</span>
              </>
            )}
          </button>
        </div>

        {viewMode === 'scroll' ? (
          /* Horizontal scroll row with Left & Right mouse buttons + visible custom scrollbar */
          <div className="relative flex items-center gap-1.5">
            {/* Left mouse scroll button */}
            <button
              onClick={() => scrollTabs('left')}
              disabled={!canScrollLeft}
              aria-label="Scroll categories left"
              className={`p-2 rounded-lg border border-border bg-surface shadow-sm transition-all flex-shrink-0 z-10 ${
                canScrollLeft
                  ? 'text-text-primary hover:bg-surface-2 hover:border-border-strong active:scale-95'
                  : 'opacity-25 cursor-not-allowed text-text-tertiary'
              }`}
            >
              <ChevronLeft size={16} />
            </button>

            {/* Scrollable container with visible scrollbar */}
            <div
              ref={tabsContainerRef}
              className="flex gap-1.5 overflow-x-auto custom-scrollbar-x pb-2 pt-0.5 scroll-smooth flex-1"
            >
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  data-tab-id={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={[
                    'flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex-shrink-0',
                    activeTab === tab.id
                      ? 'bg-accent text-white shadow-md scale-[1.02]'
                      : 'bg-surface border border-border text-text-secondary hover:bg-surface-2 hover:text-text-primary hover:border-border-strong',
                  ].join(' ')}
                >
                  <span className="text-sm">{tab.emoji}</span>
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Right mouse scroll button */}
            <button
              onClick={() => scrollTabs('right')}
              disabled={!canScrollRight}
              aria-label="Scroll categories right"
              className={`p-2 rounded-lg border border-border bg-surface shadow-sm transition-all flex-shrink-0 z-10 ${
                canScrollRight
                  ? 'text-text-primary hover:bg-surface-2 hover:border-border-strong active:scale-95'
                  : 'opacity-25 cursor-not-allowed text-text-tertiary'
              }`}
            >
              <ChevronRight size={16} />
            </button>
          </div>
        ) : (
          /* Grid View: All 12 categories displayed neatly at once */
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 pt-1 pb-1">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id)
                }}
                className={[
                  'flex items-center gap-2 p-2.5 rounded-xl text-xs font-semibold transition-all text-left border',
                  activeTab === tab.id
                    ? 'bg-accent text-white border-accent shadow-md scale-[1.02]'
                    : 'bg-surface border-border text-text-secondary hover:bg-surface-2 hover:text-text-primary hover:border-border-strong',
                ].join(' ')}
              >
                <span className="text-base flex-shrink-0">{tab.emoji}</span>
                <span className="truncate">{tab.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Tab content */}
      <div className="animate-fade-in" key={activeTab}>
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xl">{currentTab?.emoji}</span>
          <h3 className="text-lg font-bold text-text-primary">{currentTab?.label}</h3>
        </div>
        {renderTab()}
      </div>
    </div>
  )
}
