import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, X, BookOpen, FileText, BookMarked, PenLine } from 'lucide-react'
import { n5Units } from '@/data/curriculum/n5/units'
import { n5Vocabulary } from '@/data/vocabulary/n5-vocab'
import { n5Grammar } from '@/data/grammar/n5-grammar'
import { n5Kanji } from '@/data/kanji/n5-kanji'

type ResultType = 'lesson' | 'vocab' | 'grammar' | 'kanji'

interface SearchResult {
  type: ResultType
  id: string
  title: string
  subtitle: string
  path: string
}

function search(query: string): SearchResult[] {
  if (!query.trim()) return []
  const q = query.toLowerCase()
  const results: SearchResult[] = []

  // Lessons
  for (const unit of n5Units) {
    for (const lesson of unit.lessons) {
      if (
        lesson.title.toLowerCase().includes(q) ||
        lesson.titleJa.includes(q) ||
        lesson.description.toLowerCase().includes(q)
      ) {
        results.push({
          type: 'lesson',
          id: lesson.id,
          title: lesson.title,
          subtitle: unit.title,
          path: `/learn/${lesson.id}`,
        })
      }
    }
  }

  // Vocabulary
  for (const v of n5Vocabulary) {
    if (
      v.hiragana.includes(q) ||
      v.meaning.toLowerCase().includes(q) ||
      v.romaji?.toLowerCase().includes(q) ||
      v.kanji?.includes(q)
    ) {
      results.push({
        type: 'vocab',
        id: v.id,
        title: v.hiragana,
        subtitle: v.meaning,
        path: `/vocabulary`,
      })
    }
  }

  // Grammar
  for (const g of n5Grammar) {
    if (
      g.pattern.toLowerCase().includes(q) ||
      g.meaning.toLowerCase().includes(q)
    ) {
      results.push({
        type: 'grammar',
        id: g.id,
        title: g.pattern,
        subtitle: g.meaning,
        path: `/grammar/${g.id}`,
      })
    }
  }

  // Kanji
  for (const k of n5Kanji) {
    if (
      k.character.includes(q) ||
      k.meaning.some((m) => m.toLowerCase().includes(q)) ||
      k.readings.kunyomi.some((r) => r.includes(q)) ||
      k.readings.onyomi.some((r) => r.includes(q))
    ) {
      results.push({
        type: 'kanji',
        id: k.id,
        title: k.character,
        subtitle: k.meaning.join(', '),
        path: `/kanji/${k.id}`,
      })
    }
  }

  return results.slice(0, 12)
}

const typeIcon: Record<ResultType, React.ReactNode> = {
  lesson: <BookOpen size={14} />,
  vocab: <BookMarked size={14} />,
  grammar: <FileText size={14} />,
  kanji: <PenLine size={14} />,
}

const typeColor: Record<ResultType, string> = {
  lesson: 'text-info bg-info-soft',
  vocab: 'text-success bg-success-soft',
  grammar: 'text-accent bg-accent-soft',
  kanji: 'text-warning bg-warning-soft',
}

interface Props {
  onClose: () => void
}

export function SearchModal({ onClose }: Props) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const inputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  useEffect(() => {
    setResults(search(query))
  }, [query])

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [onClose])

  function handleSelect(result: SearchResult) {
    navigate(result.path)
    onClose()
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] px-4"
      role="dialog"
      aria-modal="true"
      aria-label="Search"
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative w-full max-w-xl bg-surface rounded-2xl shadow-panel border border-border overflow-hidden animate-slide-up">
        {/* Input */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
          <Search size={16} className="text-text-tertiary flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search lessons, grammar, vocabulary, kanji…"
            className="flex-1 text-sm bg-transparent outline-none text-text-primary placeholder:text-text-tertiary font-japanese"
          />
          {query && (
            <button onClick={() => setQuery('')} className="text-text-tertiary hover:text-text-secondary">
              <X size={14} />
            </button>
          )}
          <kbd className="text-[11px] px-1.5 py-0.5 rounded bg-surface-2 border border-border font-mono text-text-secondary">
            ESC
          </kbd>
        </div>

        {/* Results */}
        {results.length > 0 ? (
          <ul className="max-h-80 overflow-y-auto divide-y divide-border">
            {results.map((result) => (
              <li key={result.id + result.type}>
                <button
                  onClick={() => handleSelect(result)}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-surface-2 transition-colors text-left"
                >
                  <span className={`w-6 h-6 rounded flex items-center justify-center flex-shrink-0 ${typeColor[result.type]}`}>
                    {typeIcon[result.type]}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-text-primary font-japanese truncate">{result.title}</p>
                    <p className="text-xs text-text-secondary truncate">{result.subtitle}</p>
                  </div>
                  <span className="text-[10px] uppercase tracking-wide text-text-tertiary font-medium">
                    {result.type}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        ) : query ? (
          <div className="py-10 text-center text-text-secondary text-sm">
            No results for "<span className="font-japanese">{query}</span>"
          </div>
        ) : (
          <div className="py-8 text-center text-text-tertiary text-sm">
            <p>Try searching for a lesson, grammar point, or word.</p>
            <p className="text-xs mt-1">e.g. "ます form", "library", "食"</p>
          </div>
        )}
      </div>
    </div>
  )
}
