import { useState, useEffect } from 'react'
import { Search, X, ChevronLeft, ChevronRight } from 'lucide-react'
import { n5Vocabulary } from '@/data/vocabulary/n5-vocab'
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
}

function VocabCard({ entry, onClick }: { entry: VocabularyEntry; onClick: () => void }) {
  const { showKanji } = useApp()

  return (
    <button
      onClick={onClick}
      className="bg-surface rounded-xl border border-border p-4 shadow-card text-left hover:shadow-card-hover hover:border-border-strong hover:scale-[1.01] transition-all group"
    >
      {/* Hiragana + kanji */}
      <p className="text-lg font-japanese font-bold text-text-primary group-hover:text-accent transition-colors leading-tight">
        {entry.hiragana}
      </p>
      {showKanji && entry.kanji && (
        <p className="text-xs font-japanese text-text-tertiary mt-0.5">（{entry.kanji}）</p>
      )}

      {/* Meaning */}
      <p className="text-sm text-text-secondary mt-2 leading-snug">{entry.meaning}</p>

      {/* POS badge */}
      <div className="mt-3">
        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${POS_COLOR[entry.partOfSpeech] ?? 'bg-surface-2 text-text-secondary border-border'}`}>
          {POS_LABEL[entry.partOfSpeech]}
        </span>
      </div>
    </button>
  )
}

const POS_FILTER_OPTIONS: { label: string; value: PartOfSpeech | 'all' }[] = [
  { label: 'All', value: 'all' },
  { label: 'Nouns', value: 'noun' },
  { label: 'Verbs', value: 'verb-group1' },
  { label: 'Adjectives', value: 'i-adjective' },
  { label: 'Adverbs', value: 'adverb' },
]

export default function VocabularyPage() {
  const { showKanji } = useApp()
  const [search, setSearch] = useState('')
  const [posFilter, setPosFilter] = useState<string>('all')
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  const filtered = n5Vocabulary.filter((v) => {
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

  const currentEntry = selectedIndex !== null && filtered[selectedIndex] ? filtered[selectedIndex] : null

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
    <div className="space-y-5 animate-fade-in">
      <div>
        <h2 className="text-xl font-bold text-text-primary">Vocabulary</h2>
        <p className="text-sm text-text-secondary mt-1">
          {n5Vocabulary.length} N5 vocabulary words. Click any card to open and navigate through words.
        </p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary" />
        <input
          type="text"
          placeholder="Search in hiragana, kanji, or English…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-3 py-2 border border-border rounded-lg text-sm font-japanese bg-surface focus:outline-none focus:border-accent"
        />
      </div>

      {/* POS filter */}
      <div className="flex gap-1.5 flex-wrap">
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

      <p className="text-xs text-text-tertiary">{filtered.length} word{filtered.length !== 1 ? 's' : ''}</p>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {filtered.map((v, index) => (
          <VocabCard
            key={v.id}
            entry={v}
            onClick={() => setSelectedIndex(index)}
          />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-text-secondary">
          <p className="text-sm">No vocabulary matches your search.</p>
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

              <div>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${POS_COLOR[currentEntry.partOfSpeech] ?? 'bg-surface-2 text-text-secondary border-border'}`}>
                  {POS_LABEL[currentEntry.partOfSpeech]}
                </span>
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
