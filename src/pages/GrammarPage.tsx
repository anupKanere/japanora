import { useState, useEffect } from 'react'
import { ChevronRight, ChevronLeft, Search, BookOpen, X, Sparkles } from 'lucide-react'
import { n5Grammar } from '@/data/grammar/n5-grammar'
import type { GrammarPoint } from '@/types'

// ─── Grammar card ─────────────────────────────────────────────────────────────

function GrammarCard({
  grammar,
  index,
  onOpenModal,
}: {
  grammar: GrammarPoint
  index: number
  onOpenModal: () => void
}) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="bg-surface rounded-xl border border-border shadow-card overflow-hidden transition-all hover:border-border-strong group">
      <div className="flex items-center justify-between p-4 hover:bg-surface-2/50 transition-colors">
        <button
          className="flex items-center gap-3 flex-1 text-left min-w-0"
          onClick={onOpenModal}
        >
          {/* Number badge */}
          <div className="w-8 h-8 rounded-lg bg-surface-2 border border-border flex items-center justify-center flex-shrink-0 group-hover:border-accent/40 group-hover:bg-accent-soft transition-colors">
            <span className="text-[11px] font-bold text-text-tertiary group-hover:text-accent">{index + 1}</span>
          </div>
          {/* Pattern */}
          <div className="flex-1 min-w-0 pr-2">
            <p className="text-base font-bold text-text-primary font-japanese leading-snug group-hover:text-accent transition-colors">
              {grammar.pattern}
            </p>
            <p className="text-xs text-text-secondary mt-0.5 leading-snug">{grammar.meaning}</p>
          </div>
        </button>

        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={onOpenModal}
            className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-surface-2 text-xs font-medium text-text-primary border border-border hover:border-accent hover:text-accent transition-colors"
          >
            <span>Study</span>
            <ChevronRight size={13} />
          </button>
          <button
            onClick={() => setExpanded(!expanded)}
            aria-expanded={expanded}
            className="p-1.5 rounded-lg text-text-tertiary hover:text-text-primary hover:bg-surface-2 transition-colors"
            aria-label="Toggle details inline"
          >
            <ChevronRight
              size={16}
              className={`transition-transform flex-shrink-0 ${expanded ? 'rotate-90' : ''}`}
            />
          </button>
        </div>
      </div>

      {expanded && (
        <div className="border-t border-border px-4 pb-4 pt-3 space-y-4 animate-fade-in">
          {/* Structure */}
          {grammar.structure && (
            <div className="p-3 bg-surface-2 rounded-xl border border-border">
              <p className="text-[10px] font-bold text-text-tertiary uppercase tracking-wider mb-1.5">Structure</p>
              <p className="text-sm font-japanese text-text-primary break-words leading-relaxed">{grammar.structure}</p>
            </div>
          )}

          {/* Notes */}
          {grammar.notes && grammar.notes.length > 0 && (
            <div>
              <p className="text-[10px] font-bold text-text-tertiary uppercase tracking-wider mb-2">Notes</p>
              <ul className="space-y-1.5">
                {grammar.notes.map((note, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-accent font-bold flex-shrink-0 mt-0.5 text-sm">·</span>
                    <span className="text-sm font-japanese text-text-primary leading-relaxed break-words">{note}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Examples */}
          {grammar.examples.length > 0 && (
            <div>
              <p className="text-[10px] font-bold text-text-tertiary uppercase tracking-wider mb-2">Examples</p>
              <div className="space-y-2">
                {grammar.examples.map((ex, i) => (
                  <div
                    key={i}
                    className="bg-accent-soft border border-accent/20 rounded-xl p-3 space-y-1"
                  >
                    <p className="text-sm font-japanese font-bold text-text-primary leading-relaxed break-words whitespace-pre-wrap">
                      {ex.hiragana}
                    </p>
                    {ex.kanji && (
                      <p className="text-xs font-japanese text-text-secondary leading-relaxed break-words">
                        {ex.kanji}
                      </p>
                    )}
                    <p className="text-xs text-text-secondary italic leading-relaxed">
                      {ex.meaning}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// ─── FILTERS ──────────────────────────────────────────────────────────────────

const UNIT_FILTERS = [
  { label: 'All', unitId: null },
  { label: 'Copula & Core', unitId: 'n5-unit-01' },
  { label: 'Verb Forms', unitId: 'n5-unit-02' },
  { label: 'Existence', unitId: 'n5-unit-03' },
  { label: 'Movement', unitId: 'n5-unit-04' },
  { label: 'Change', unitId: 'n5-unit-05' },
  { label: 'Advanced', unitId: 'n5-unit-06' },
]

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default function GrammarPage() {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState<string | null>(null)
  const [selectedGrammarIndex, setSelectedGrammarIndex] = useState<number | null>(null)

  const filtered = n5Grammar.filter((g) => {
    const matchesSearch =
      !search ||
      g.pattern.toLowerCase().includes(search.toLowerCase()) ||
      g.meaning.toLowerCase().includes(search.toLowerCase())
    const matchesFilter = !filter || g.unitId === filter
    return matchesSearch && matchesFilter
  })

  const currentGrammar = selectedGrammarIndex !== null ? filtered[selectedGrammarIndex] : null

  function handlePrev() {
    if (selectedGrammarIndex !== null && selectedGrammarIndex > 0) {
      setSelectedGrammarIndex(selectedGrammarIndex - 1)
    }
  }

  function handleNext() {
    if (selectedGrammarIndex !== null && selectedGrammarIndex < filtered.length - 1) {
      setSelectedGrammarIndex(selectedGrammarIndex + 1)
    }
  }

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (selectedGrammarIndex === null) return
      if (e.key === 'ArrowLeft') {
        e.preventDefault()
        handlePrev()
      } else if (e.key === 'ArrowRight') {
        e.preventDefault()
        handleNext()
      } else if (e.key === 'Escape') {
        setSelectedGrammarIndex(null)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedGrammarIndex, filtered.length])

  return (
    <div className="space-y-5 animate-fade-in">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-semibold text-accent tracking-widest uppercase">JLPT N5</span>
          <span className="w-1 h-1 rounded-full bg-border-strong" />
          <span className="text-xs text-text-secondary font-japanese">文法パターン</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold text-text-primary">Sentence Patterns</h2>
            <p className="text-sm text-text-secondary mt-1">
              {n5Grammar.length} N5 sentence patterns. Tap any card to open study mode with Next/Previous navigation.
            </p>
          </div>
          {filtered.length > 0 && (
            <button
              onClick={() => setSelectedGrammarIndex(0)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-accent text-white text-xs font-semibold hover:opacity-90 active:scale-95 transition-all shadow-sm whitespace-nowrap self-start sm:self-auto"
            >
              <Sparkles size={14} />
              <span>Study All ({filtered.length})</span>
            </button>
          )}
        </div>
      </div>

      {/* Search + filter */}
      <div className="flex flex-col gap-3">
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary" />
          <input
            type="text"
            placeholder="Search grammar patterns…"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value)
              setSelectedGrammarIndex(null)
            }}
            className="w-full pl-9 pr-3 py-2 border border-border rounded-xl text-sm bg-surface focus:outline-none focus:border-accent font-japanese"
          />
        </div>
        <div className="flex gap-1.5 flex-wrap">
          {UNIT_FILTERS.map((f) => (
            <button
              key={f.label}
              onClick={() => {
                setFilter(f.unitId)
                setSelectedGrammarIndex(null)
              }}
              className={[
                'px-3 py-1.5 rounded-full text-[11px] font-semibold transition-all whitespace-nowrap',
                filter === f.unitId
                  ? 'bg-accent text-white'
                  : 'bg-surface border border-border text-text-secondary hover:bg-surface-2',
              ].join(' ')}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Count */}
      <p className="text-xs text-text-tertiary">
        {filtered.length} grammar point{filtered.length !== 1 ? 's' : ''} shown
      </p>

      {/* Cards */}
      <div className="space-y-2">
        {filtered.map((g, i) => (
          <GrammarCard
            key={g.id}
            grammar={g}
            index={i}
            onOpenModal={() => setSelectedGrammarIndex(i)}
          />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-text-secondary">
          <BookOpen size={32} className="mx-auto mb-3 text-text-tertiary" />
          <p className="text-sm">No grammar points match your search.</p>
        </div>
      )}

      {/* Grammar Detail Modal */}
      {currentGrammar && selectedGrammarIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedGrammarIndex(null)}
        >
          {/* Desktop Left Arrow */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              handlePrev()
            }}
            disabled={selectedGrammarIndex === 0}
            aria-label="Previous pattern"
            className={`hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-surface/90 border border-border shadow-xl text-text-primary mr-4 hover:bg-surface-2 transition-all ${
              selectedGrammarIndex === 0 ? 'opacity-20 cursor-not-allowed' : 'hover:scale-110 active:scale-95'
            }`}
          >
            <ChevronLeft size={28} />
          </button>

          <div
            className="bg-surface rounded-2xl border border-border shadow-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto p-6 space-y-5 animate-in fade-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-accent-soft text-accent uppercase tracking-wider">
                  Pattern {selectedGrammarIndex + 1}
                </span>
                {currentGrammar.unitId && (
                  <span className="text-xs text-text-tertiary font-mono">
                    {currentGrammar.unitId}
                  </span>
                )}
              </div>
              <button
                onClick={() => setSelectedGrammarIndex(null)}
                className="text-text-tertiary hover:text-text-primary p-1 rounded-lg hover:bg-surface-2 transition-colors"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>

            {/* Pattern & Meaning */}
            <div className="bg-surface-2 rounded-2xl p-5 border border-border space-y-1.5">
              <p className="text-2xl sm:text-3xl font-japanese font-bold text-text-primary leading-snug">
                {currentGrammar.pattern}
              </p>
              <p className="text-sm font-semibold text-accent leading-relaxed">
                {currentGrammar.meaning}
              </p>
            </div>

            {/* Structure */}
            {currentGrammar.structure && (
              <div className="p-3.5 bg-surface-2 rounded-xl border border-border">
                <p className="text-[10px] font-bold text-text-tertiary uppercase tracking-wider mb-1">Sentence Structure Formula</p>
                <p className="text-sm font-japanese text-text-primary break-words leading-relaxed font-semibold">
                  {currentGrammar.structure}
                </p>
              </div>
            )}

            {/* Notes */}
            {currentGrammar.notes && currentGrammar.notes.length > 0 && (
              <div>
                <p className="text-[10px] font-bold text-text-tertiary uppercase tracking-wider mb-2">Usage Notes</p>
                <ul className="space-y-2 bg-surface-2/60 rounded-xl p-3.5 border border-border">
                  {currentGrammar.notes.map((note, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="text-accent font-bold flex-shrink-0 mt-0.5 text-sm">•</span>
                      <span className="text-xs font-japanese text-text-primary leading-relaxed break-words">
                        {note}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Examples */}
            {currentGrammar.examples.length > 0 && (
              <div>
                <p className="text-[10px] font-bold text-text-tertiary uppercase tracking-wider mb-2">Example Sentences</p>
                <div className="space-y-2.5">
                  {currentGrammar.examples.map((ex, i) => (
                    <div
                      key={i}
                      className="bg-accent-soft border border-accent/20 rounded-xl p-3.5 space-y-1"
                    >
                      <p className="text-sm font-japanese font-bold text-text-primary leading-relaxed break-words whitespace-pre-wrap">
                        {ex.hiragana}
                      </p>
                      {ex.kanji && (
                        <p className="text-xs font-japanese text-text-secondary leading-relaxed break-words">
                          {ex.kanji}
                        </p>
                      )}
                      <p className="text-xs text-text-secondary italic leading-relaxed pt-0.5">
                        {ex.meaning}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Footer Navigation */}
            <div className="flex items-center justify-between pt-4 border-t border-border">
              <button
                onClick={handlePrev}
                disabled={selectedGrammarIndex === 0}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold border border-border transition-all ${
                  selectedGrammarIndex === 0
                    ? 'opacity-30 cursor-not-allowed bg-surface-2 text-text-tertiary'
                    : 'bg-surface text-text-primary hover:bg-surface-2 active:scale-95'
                }`}
              >
                <ChevronLeft size={16} />
                <span>Previous</span>
              </button>

              <span className="text-xs text-text-tertiary font-mono">
                {selectedGrammarIndex + 1} / {filtered.length}
              </span>

              <button
                onClick={handleNext}
                disabled={selectedGrammarIndex === filtered.length - 1}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold border border-border transition-all ${
                  selectedGrammarIndex === filtered.length - 1
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
            disabled={selectedGrammarIndex === filtered.length - 1}
            aria-label="Next pattern"
            className={`hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-surface/90 border border-border shadow-xl text-text-primary ml-4 hover:bg-surface-2 transition-all ${
              selectedGrammarIndex === filtered.length - 1 ? 'opacity-20 cursor-not-allowed' : 'hover:scale-110 active:scale-95'
            }`}
          >
            <ChevronRight size={28} />
          </button>
        </div>
      )}
    </div>
  )
}
