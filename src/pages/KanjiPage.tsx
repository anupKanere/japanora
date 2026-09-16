import { useState, useEffect } from 'react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { n5Kanji } from '@/data/kanji/n5-kanji'
import { useApp } from '@/app/AppContext'
import type { KanjiEntry } from '@/types'

function KanjiCard({ entry, onClick }: { entry: KanjiEntry; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="bg-surface rounded-xl border border-border p-4 shadow-card text-center hover:shadow-card-hover hover:border-accent/40 hover:scale-[1.02] transition-all group"
    >
      {/* Kanji character */}
      <p className="text-4xl font-japanese font-bold text-text-primary group-hover:text-accent transition-colors mb-2">
        {entry.character}
      </p>

      {/* Reading (kunyomi or onyomi) */}
      <p className="text-xs font-japanese text-text-secondary mb-1">
        {entry.readings.kunyomi[0] ?? entry.readings.onyomi[0]}
      </p>

      {/* Meaning */}
      <p className="text-xs text-text-tertiary leading-tight">{entry.meaning[0]}</p>

      {/* Stroke count */}
      <p className="text-[10px] text-text-tertiary mt-2">{entry.strokeCount} strokes</p>
    </button>
  )
}

export default function KanjiPage() {
  const { showKanji } = useApp()
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  const currentKanji = selectedIndex !== null && n5Kanji[selectedIndex] ? n5Kanji[selectedIndex] : null

  function handlePrev() {
    if (selectedIndex !== null && selectedIndex > 0) {
      setSelectedIndex(selectedIndex - 1)
    }
  }

  function handleNext() {
    if (selectedIndex !== null && selectedIndex < n5Kanji.length - 1) {
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
  }, [selectedIndex])

  return (
    <div className="space-y-5 animate-fade-in">
      <div>
        <h2 className="text-xl font-bold text-text-primary">Kanji</h2>
        <p className="text-sm text-text-secondary mt-1">
          {n5Kanji.length} beginner kanji introduced so far. Click any character to inspect details and navigate through kanji.
        </p>
      </div>

      <div className="p-4 bg-info-soft border border-info/20 rounded-xl text-xs text-info leading-relaxed">
        <strong>Note:</strong> Kanji is introduced gradually. You are not expected to memorise all kanji immediately.
        Focus on recognising the hiragana readings first. Use the Settings page to turn kanji display on or off globally.
      </div>

      {/* Grid */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3">
        {n5Kanji.map((k, index) => (
          <KanjiCard
            key={k.id}
            entry={k}
            onClick={() => setSelectedIndex(index)}
          />
        ))}
      </div>

      {/* Detail Modal with Next & Previous Controls */}
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
            disabled={selectedIndex === n5Kanji.length - 1}
            className={`hidden md:flex absolute right-8 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full items-center justify-center border border-border bg-surface shadow-panel transition-all ${
              selectedIndex === n5Kanji.length - 1
                ? 'opacity-20 cursor-not-allowed text-text-tertiary'
                : 'text-text-primary hover:bg-surface-2 hover:scale-110 active:scale-95'
            }`}
            aria-label="Next kanji"
          >
            <ChevronRight size={24} />
          </button>

          {/* Modal Container */}
          <div className="relative w-full max-w-md bg-surface rounded-2xl border border-border shadow-panel p-6 animate-slide-up max-h-[85vh] flex flex-col z-10">
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <span className="text-xs font-semibold text-text-tertiary">
                Kanji {selectedIndex + 1} of {n5Kanji.length}
              </span>
              <button
                onClick={() => setSelectedIndex(null)}
                className="p-1.5 rounded-lg hover:bg-surface-2 text-text-secondary hover:text-text-primary transition-colors"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>

            {/* Scrollable Body */}
            <div className="overflow-y-auto py-4 space-y-4 flex-1">
              {/* Character */}
              <div className="text-center">
                <p className="text-7xl font-japanese font-bold text-text-primary mb-2">{currentKanji.character}</p>
                <p className="text-base font-semibold text-text-primary">{currentKanji.meaning.join(' · ')}</p>
                <p className="text-xs text-text-tertiary mt-1">{currentKanji.strokeCount} strokes · JLPT {currentKanji.level}</p>
              </div>

              {/* Readings */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-surface-2 rounded-xl border border-border">
                  <p className="text-[10px] font-bold text-text-tertiary uppercase tracking-wider mb-1">On'yomi</p>
                  <p className="text-sm font-japanese text-text-primary">
                    {currentKanji.readings.onyomi.length > 0 ? currentKanji.readings.onyomi.join('、') : '—'}
                  </p>
                </div>
                <div className="p-3 bg-surface-2 rounded-xl border border-border">
                  <p className="text-[10px] font-bold text-text-tertiary uppercase tracking-wider mb-1">Kun'yomi</p>
                  <p className="text-sm font-japanese text-text-primary">
                    {currentKanji.readings.kunyomi.length > 0 ? currentKanji.readings.kunyomi.join('、') : '—'}
                  </p>
                </div>
              </div>

              {/* Example sentence */}
              {currentKanji.exampleSentence && (
                <div>
                  <p className="text-[10px] font-bold text-text-tertiary uppercase tracking-wider mb-2">Example Sentence</p>
                  <div className="p-3 bg-surface-2 border border-border rounded-xl space-y-1">
                    <p className="text-sm font-japanese font-semibold text-text-primary">{currentKanji.exampleSentence.hiragana}</p>
                    {showKanji && currentKanji.exampleSentence.kanji && (
                      <p className="text-xs font-japanese text-text-secondary mt-0.5">（{currentKanji.exampleSentence.kanji}）</p>
                    )}
                    <p className="text-xs text-text-secondary italic mt-1">{currentKanji.exampleSentence.meaning}</p>
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
                {selectedIndex + 1} / {n5Kanji.length}
              </span>

              <button
                onClick={handleNext}
                disabled={selectedIndex === n5Kanji.length - 1}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold border border-border transition-all ${
                  selectedIndex === n5Kanji.length - 1
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
