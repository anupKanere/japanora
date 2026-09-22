import { useState, useEffect, useMemo } from 'react'
import { Search, X, ChevronLeft, ChevronRight, Sparkles, LayoutGrid } from 'lucide-react'
import { n5Vocabulary } from '@/data/vocabulary/n5-vocab'
import { VOCAB_THEMES, getWordTheme, filterVocabByTheme } from '@/data/vocabulary/vocabThemes'
import { useApp } from '@/app/AppContext'
import type { VocabularyEntry, PartOfSpeech } from '@/types'

const POS_LABEL: Record<PartOfSpeech, string> = {
  noun: 'Noun',
  verb: 'Verb',
  'verb-group1': 'Verb (G1)',
  'verb-group2': 'Verb (G2)',
  'verb-irregular': 'Verb (Irr)',
  'verb-suffix': 'Verb Suffix',
  'i-adjective': 'い-adj',
  'na-adjective': 'な-adj',
  adverb: 'Adverb',
  particle: 'Particle',
  expression: 'Expression',
  conjunction: 'Conjunction',
  counter: 'Counter',
  suffix: 'Suffix',
  pronoun: 'Pronoun',
  number: 'Number',
  interjection: 'Interjection',
}

const POS_COLOR: Record<string, string> = {
  noun: 'bg-info-soft text-info border-info/20',
  'verb-group1': 'bg-success-soft text-success border-success/20',
  'verb-group2': 'bg-success-soft text-success border-success/20',
  'verb-irregular': 'bg-warning-soft text-warning border-warning/20',
  'i-adjective': 'bg-accent-soft text-accent border-accent/20',
  'na-adjective': 'bg-accent-soft text-accent border-accent/20',
  adverb: 'bg-surface-2 text-text-secondary border-border',
  pronoun: 'bg-surface-2 text-text-secondary border-border',
  number: 'bg-surface-2 text-text-secondary border-border',
  counter: 'bg-lime-500/10 text-lime-600 dark:text-lime-400 border-lime-500/20',
  expression: 'bg-pink-500/10 text-pink-600 dark:text-pink-400 border-pink-500/20',
  particle: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20',
  conjunction: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20',
}

function VocabCard({ entry, onClick }: { entry: VocabularyEntry; onClick: () => void }) {
  const { showKanji } = useApp()
  const themeId = useMemo(() => getWordTheme(entry), [entry])
  const themeObj = VOCAB_THEMES.find((t) => t.id === themeId)

  return (
    <button
      onClick={onClick}
      className="bg-surface rounded-xl border border-border p-4 shadow-card text-left hover:shadow-card-hover hover:border-border-strong hover:scale-[1.01] transition-all group flex flex-col justify-between"
    >
      <div>
        {/* Thematic badge & POS tag */}
        <div className="flex items-center justify-between gap-1 mb-2">
          {themeObj && themeObj.id !== 'all' ? (
            <span className="text-[11px] font-medium text-text-tertiary flex items-center gap-1 truncate">
              <span>{themeObj.icon}</span>
              <span className="truncate">{themeObj.label}</span>
            </span>
          ) : (
            <span />
          )}
          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border shrink-0 ${POS_COLOR[entry.partOfSpeech] ?? 'bg-surface-2 text-text-secondary border-border'}`}>
            {POS_LABEL[entry.partOfSpeech]}
          </span>
        </div>

        {/* Hiragana + kanji */}
        <p className="text-lg font-japanese font-bold text-text-primary group-hover:text-accent transition-colors leading-tight">
          {entry.hiragana}
        </p>
        {showKanji && entry.kanji && (
          <p className="text-xs font-japanese text-text-tertiary mt-0.5">（{entry.kanji}）</p>
        )}

        {/* Meaning */}
        <p className="text-sm text-text-secondary mt-2 leading-snug line-clamp-2">{entry.meaning}</p>
      </div>

      {entry.notes && (
        <p className="text-[11px] text-text-tertiary mt-3 pt-2 border-t border-border/50 font-japanese truncate">
          {entry.notes}
        </p>
      )}
    </button>
  )
}

const POS_FILTER_OPTIONS: { label: string; value: PartOfSpeech | 'all' }[] = [
  { label: 'All POS', value: 'all' },
  { label: 'Nouns', value: 'noun' },
  { label: 'Verbs', value: 'verb-group1' },
  { label: 'Adjectives', value: 'i-adjective' },
  { label: 'Adverbs', value: 'adverb' },
]

export default function VocabularyPage() {
  const { showKanji } = useApp()
  const [selectedTheme, setSelectedTheme] = useState<string>('all')
  const [search, setSearch] = useState('')
  const [posFilter, setPosFilter] = useState<string>('all')
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  // Calculate precise word counts for each authoritative theme
  const themeCounts = useMemo(() => {
    const counts: Record<string, number> = { all: n5Vocabulary.length }
    VOCAB_THEMES.forEach((t) => {
      if (t.id !== 'all') {
        counts[t.id] = filterVocabByTheme(n5Vocabulary, t.id).length
      }
    })
    return counts
  }, [])

  // Words filtered by active theme first
  const themeFiltered = useMemo(() => {
    return filterVocabByTheme(n5Vocabulary, selectedTheme)
  }, [selectedTheme])

  // Final filtered list with search and POS
  const filtered = useMemo(() => {
    return themeFiltered.filter((v) => {
      const matchSearch =
        !search ||
        v.hiragana.includes(search) ||
        v.meaning.toLowerCase().includes(search.toLowerCase()) ||
        v.romaji?.toLowerCase().includes(search.toLowerCase()) ||
        v.kanji?.includes(search)
      const matchPos =
        posFilter === 'all' ||
        v.partOfSpeech === posFilter ||
        (posFilter === 'verb-group1' && v.partOfSpeech.startsWith('verb')) ||
        (posFilter === 'i-adjective' && v.partOfSpeech.includes('adjective'))
      return matchSearch && matchPos
    })
  }, [themeFiltered, search, posFilter])

  const activeThemeObj = VOCAB_THEMES.find((t) => t.id === selectedTheme) || VOCAB_THEMES[0]
  const currentEntry = selectedIndex !== null && filtered[selectedIndex] ? filtered[selectedIndex] : null
  const currentEntryTheme = currentEntry ? VOCAB_THEMES.find((t) => t.id === getWordTheme(currentEntry)) : null

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

  // Reset selectedIndex if search or theme filters change
  useEffect(() => {
    setSelectedIndex(null)
  }, [selectedTheme, posFilter, search])

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Page Header */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <h2 className="text-xl font-bold text-text-primary flex items-center gap-2">
              <span>Vocabulary</span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-accent/10 text-accent border border-accent/20">
                JLPT N5
              </span>
            </h2>
            <p className="text-sm text-text-secondary mt-1">
              {n5Vocabulary.length} official N5 words organized into distinct real-life categories.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-text-secondary self-start sm:self-auto bg-surface px-3 py-1.5 rounded-lg border border-border">
            <Sparkles size={14} className="text-accent" />
            <span>Click any card to inspect and navigate</span>
          </div>
        </div>
      </div>

      {/* Modern Thematic Categories Matrix (No scrollbar, clean card layout) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <p className="text-xs font-bold text-text-tertiary uppercase tracking-wider flex items-center gap-1.5">
            <LayoutGrid size={13} />
            <span>Explore by Topic / テーマ別</span>
          </p>
          {selectedTheme !== 'all' && (
            <button
              onClick={() => setSelectedTheme('all')}
              className="text-xs font-semibold text-accent hover:underline flex items-center gap-1"
            >
              Reset to All Words ({n5Vocabulary.length})
            </button>
          )}
        </div>

        {/* Categories Grid: 2 columns on mobile, 3 on tablet, 4 to 6 on desktop */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5">
          {VOCAB_THEMES.map((theme) => {
            const isSelected = selectedTheme === theme.id
            const count = themeCounts[theme.id] ?? 0

            return (
              <button
                key={theme.id}
                onClick={() => setSelectedTheme(theme.id)}
                className={`relative p-3 rounded-xl border text-left transition-all flex flex-col justify-between gap-1.5 group ${
                  isSelected
                    ? 'bg-accent/10 border-accent shadow-sm ring-2 ring-accent/20'
                    : 'bg-surface border-border hover:border-border-strong hover:bg-surface-2'
                }`}
              >
                {/* Top Row: Icon + Count */}
                <div className="flex items-center justify-between w-full">
                  <span className="text-lg">{theme.icon}</span>
                  <span
                    className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded-md ${
                      isSelected
                        ? 'bg-accent text-white'
                        : 'bg-surface-2 text-text-tertiary border border-border/50 group-hover:border-border group-hover:text-text-secondary'
                    }`}
                  >
                    {count}
                  </span>
                </div>

                {/* Bottom Row: English Title + Japanese Subtitle */}
                <div className="mt-1">
                  <p
                    className={`text-xs font-bold truncate leading-tight transition-colors ${
                      isSelected ? 'text-accent' : 'text-text-primary group-hover:text-accent'
                    }`}
                  >
                    {theme.label}
                  </p>
                  <p className="text-[10px] font-japanese text-text-tertiary mt-0.5 truncate">
                    {theme.labelJa}
                  </p>
                </div>

                {/* Active Indicator checkmark badge */}
                {isSelected && (
                  <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* Active Theme Highlight Spotlight Banner */}
      {selectedTheme !== 'all' && (
        <div className="bg-surface-2 border border-border rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-fade-in">
          <div className="flex items-start gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-surface border border-border flex items-center justify-center text-2xl shrink-0 shadow-sm">
              {activeThemeObj.icon}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-text-primary">{activeThemeObj.label}</h3>
                <span className="text-xs font-japanese text-text-tertiary">（{activeThemeObj.labelJa}）</span>
              </div>
              <p className="text-xs text-text-secondary mt-0.5 leading-relaxed">{activeThemeObj.description}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-surface border border-border text-text-primary shadow-sm">
              {filtered.length} word{filtered.length !== 1 ? 's' : ''}
            </span>
            <button
              onClick={() => setSelectedTheme('all')}
              className="text-xs text-text-secondary hover:text-text-primary hover:bg-surface px-2.5 py-1 rounded-lg border border-transparent hover:border-border transition-colors"
            >
              View all 793 words
            </button>
          </div>
        </div>
      )}

      {/* Search and POS Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        {/* Search input */}
        <div className="relative flex-1">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary" />
          <input
            type="text"
            placeholder={`Search ${selectedTheme !== 'all' ? activeThemeObj.label : 'N5 vocabulary'} in hiragana, kanji, English…`}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-8 py-2 border border-border rounded-lg text-sm font-japanese bg-surface focus:outline-none focus:border-accent"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-text-tertiary hover:text-text-primary p-0.5"
              aria-label="Clear search"
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* POS filter pills */}
        <div className="flex gap-1.5 flex-wrap shrink-0">
          {POS_FILTER_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setPosFilter(opt.value)}
              className={[
                'px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors',
                posFilter === opt.value
                  ? 'bg-accent text-white'
                  : 'bg-surface border border-border text-text-secondary hover:bg-surface-2',
              ].join(' ')}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Count readout */}
      <div className="flex items-center justify-between text-xs text-text-tertiary">
        <span>
          Showing {filtered.length} of {themeFiltered.length} words
          {selectedTheme !== 'all' && ` in ${activeThemeObj.label}`}
        </span>
        {(search || posFilter !== 'all') && (
          <button
            onClick={() => {
              setSearch('')
              setPosFilter('all')
            }}
            className="text-accent hover:underline font-semibold"
          >
            Clear filters
          </button>
        )}
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {filtered.map((v, index) => (
          <VocabCard
            key={v.id}
            entry={v}
            onClick={() => setSelectedIndex(index)}
          />
        ))}
      </div>

      {/* Empty State */}
      {filtered.length === 0 && (
        <div className="text-center py-16 bg-surface rounded-2xl border border-border">
          <p className="text-2xl mb-2">🔍</p>
          <p className="text-sm font-bold text-text-primary mb-1">No vocabulary matches your search</p>
          <p className="text-xs text-text-secondary max-w-sm mx-auto mb-4">
            Try clearing your search query or selecting another category above.
          </p>
          <button
            onClick={() => {
              setSearch('')
              setPosFilter('all')
              setSelectedTheme('all')
            }}
            className="px-4 py-2 bg-accent text-white rounded-xl text-xs font-semibold hover:opacity-90 transition-opacity"
          >
            Reset all filters
          </button>
        </div>
      )}

      {/* Detail Modal with Next and Previous Buttons */}
      {currentEntry && selectedIndex !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSelectedIndex(null)} />

          {/* Floating Previous Arrow on Desktop */}
          <button
            onClick={handlePrev}
            disabled={selectedIndex === 0}
            className={`hidden md:flex absolute left-8 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full items-center justify-center border border-border bg-surface shadow-panel transition-all ${
              selectedIndex === 0
                ? 'opacity-20 cursor-not-allowed text-text-tertiary'
                : 'text-text-primary hover:bg-surface-2 hover:scale-110 active:scale-95'
            }`}
            aria-label="Previous word"
          >
            <ChevronLeft size={24} />
          </button>

          {/* Floating Next Arrow on Desktop */}
          <button
            onClick={handleNext}
            disabled={selectedIndex === filtered.length - 1}
            className={`hidden md:flex absolute right-8 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full items-center justify-center border border-border bg-surface shadow-panel transition-all ${
              selectedIndex === filtered.length - 1
                ? 'opacity-20 cursor-not-allowed text-text-tertiary'
                : 'text-text-primary hover:bg-surface-2 hover:scale-110 active:scale-95'
            }`}
            aria-label="Next word"
          >
            <ChevronRight size={24} />
          </button>

          {/* Modal Container */}
          <div className="relative w-full max-w-lg bg-surface rounded-2xl border border-border shadow-panel p-6 animate-slide-up max-h-[85vh] flex flex-col z-10">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <span className="text-xs font-semibold text-text-tertiary">
                Word {selectedIndex + 1} of {filtered.length}
                {selectedTheme !== 'all' && ` (${activeThemeObj.label})`}
              </span>
              <button
                onClick={() => setSelectedIndex(null)}
                className="p-1.5 rounded-lg hover:bg-surface-2 text-text-secondary hover:text-text-primary transition-colors"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Content Scrollable Area */}
            <div className="overflow-y-auto py-4 space-y-4 flex-1">
              <div>
                <p className="text-3xl font-japanese font-bold text-text-primary mb-1">{currentEntry.hiragana}</p>
                {currentEntry.kanji && (
                  <p className="text-lg font-japanese text-text-tertiary mb-1">（{currentEntry.kanji}）</p>
                )}
                {currentEntry.romaji && (
                  <p className="text-sm text-text-tertiary italic mb-2">{currentEntry.romaji}</p>
                )}
                <p className="text-base text-text-primary font-semibold">{currentEntry.meaning}</p>
              </div>

              {/* Badges: POS & Exact Single Category */}
              <div className="flex items-center gap-2 flex-wrap">
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${POS_COLOR[currentEntry.partOfSpeech] ?? 'bg-surface-2 text-text-secondary border-border'}`}>
                  {POS_LABEL[currentEntry.partOfSpeech]}
                </span>

                {currentEntryTheme && currentEntryTheme.id !== 'all' && (
                  <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-surface-2 border border-border text-text-secondary flex items-center gap-1.5">
                    <span>{currentEntryTheme.icon}</span>
                    <span>{currentEntryTheme.label}</span>
                    <span className="text-text-tertiary font-japanese">（{currentEntryTheme.labelJa}）</span>
                  </span>
                )}
              </div>

              {currentEntry.notes && (
                <div className="p-3 bg-info-soft border border-info/20 rounded-xl text-xs text-text-primary leading-relaxed font-japanese">
                  <p className="font-bold mb-1 text-info uppercase tracking-wider text-[10px]">Usage Note</p>
                  <p>{currentEntry.notes}</p>
                </div>
              )}

              {currentEntry.examples && currentEntry.examples.length > 0 && (
                <div>
                  <p className="text-[10px] font-bold text-text-tertiary uppercase tracking-wider mb-2">Examples</p>
                  <div className="space-y-2">
                    {currentEntry.examples.map((ex, i) => (
                      <div key={i} className="p-3 bg-surface-2 rounded-xl border border-border">
                        <p className="text-sm font-japanese font-semibold text-text-primary">{ex.hiragana}</p>
                        {showKanji && ex.kanji && (
                          <p className="text-xs font-japanese text-text-secondary mt-0.5">（{ex.kanji}）</p>
                        )}
                        <p className="text-xs text-text-secondary italic mt-1">{ex.meaning}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer with Previous and Next Controls */}
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
