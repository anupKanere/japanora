import { useApp } from '@/app/AppContext'

interface JapaneseTextProps {
  hiragana: string
  kanji?: string
  className?: string
  hiraganaClassName?: string
  kanjiClassName?: string
  /** Override the global setting and always show kanji */
  forceKanji?: boolean
  /** Override the global setting and always hide kanji */
  hiraganaOnly?: boolean
}

/**
 * JapaneseText — renders hiragana by default, with optional kanji display.
 * Respects the global display mode setting.
 */
export function JapaneseText({
  hiragana,
  kanji,
  className = '',
  hiraganaClassName = '',
  kanjiClassName = '',
  forceKanji = false,
  hiraganaOnly = false,
}: JapaneseTextProps) {
  const { showKanji } = useApp()
  const shouldShowKanji = !hiraganaOnly && (forceKanji || (showKanji && !!kanji))

  return (
    <span className={className}>
      <span className={`font-japanese ${hiraganaClassName}`}>{hiragana}</span>
      {shouldShowKanji && kanji && (
        <span className={`text-text-secondary ml-2 ${kanjiClassName}`}>
          （{kanji}）
        </span>
      )}
    </span>
  )
}

// ─── Inline kanji reveal (shown as a toggle) ─────────────────────────────────

interface KanjiRevealProps {
  hiragana: string
  kanji: string
  className?: string
}

export function KanjiReveal({ hiragana, kanji, className = '' }: KanjiRevealProps) {
  return (
    <span className={`group relative ${className}`}>
      <span className="font-japanese">{hiragana}</span>
      <span className="ml-1 text-xs text-accent/60 group-hover:text-accent transition-colors cursor-default select-none">
        [{kanji}]
      </span>
    </span>
  )
}

// ─── Example sentence display ─────────────────────────────────────────────────

interface ExampleBlockProps {
  hiragana: string
  kanji?: string
  meaning: string
  showKanjiOverride?: boolean
  className?: string
}

export function ExampleBlock({ hiragana, kanji, meaning, showKanjiOverride, className = '' }: ExampleBlockProps) {
  const { showKanji } = useApp()
  const displayKanji = showKanjiOverride ?? showKanji

  return (
    <div className={`space-y-1 ${className}`}>
      <p className="text-japanese-base font-japanese text-text-primary leading-loose">{hiragana}</p>
      {displayKanji && kanji && (
        <p className="text-japanese-sm font-japanese text-text-secondary">（{kanji}）</p>
      )}
      <p className="text-sm text-text-secondary italic">{meaning}</p>
    </div>
  )
}
