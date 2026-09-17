import React from 'react'
import { ArrowRight, Sparkles, AlertCircle, Lightbulb } from 'lucide-react'

interface RichGrammarExplanationProps {
  explanation: string
}

interface ParsedBlock {
  type: 'header' | 'transformation_list' | 'list' | 'key_value_grid' | 'table' | 'callout' | 'example' | 'formula' | 'paragraph'
  title?: string
  content?: string
  items?: TransformationItem[]
  rawList?: string[]
  tableHeaders?: string[]
  tableRows?: string[][]
  calloutType?: 'info' | 'warning' | 'tip'
  keyValuePairs?: { label: string; value: string; extra?: string }[]
}

interface TransformationItem {
  left: string
  right: string
  meaning?: string
  annotation?: string
}

export function RichGrammarExplanation({ explanation }: RichGrammarExplanationProps) {
  const blocks = parseExplanation(explanation)

  return (
    <div className="space-y-4">
      {blocks.map((block, index) => {
        switch (block.type) {
          case 'header':
            return (
              <div key={index} className="pt-2">
                <div className="flex items-center gap-2 border-b border-border pb-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-accent" />
                  <h4 className="text-sm font-bold text-text-primary tracking-wide">
                    {renderInlineStyles(block.title || '')}
                  </h4>
                </div>
              </div>
            )

          case 'table':
            return (
              <div key={index} className="overflow-x-auto rounded-xl border border-border shadow-card bg-surface my-3">
                <table className="w-full text-left text-xs min-w-[500px]">
                  {block.tableHeaders && block.tableHeaders.length > 0 && (
                    <thead className="bg-surface-2 border-b border-border">
                      <tr>
                        {block.tableHeaders.map((th, i) => (
                          <th key={i} className="p-3 font-bold text-text-primary font-sans">
                            {renderInlineStyles(th)}
                          </th>
                        ))}
                      </tr>
                    </thead>
                  )}
                  <tbody className="divide-y divide-border font-japanese">
                    {block.tableRows?.map((row, rIdx) => (
                      <tr key={rIdx} className="hover:bg-surface-2/40 transition-colors">
                        {row.map((cell, cIdx) => (
                          <td key={cIdx} className="p-3 text-text-secondary">
                            {renderInlineStyles(cell)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )

          case 'transformation_list':
            return (
              <div
                key={index}
                className="bg-surface rounded-xl border border-border p-4 shadow-card space-y-3"
              >
                {block.title && (
                  <div className="flex items-center justify-between border-b border-border pb-2">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-accent" />
                      <h5 className="text-xs font-bold text-text-primary">{renderInlineStyles(block.title)}</h5>
                    </div>
                    <span className="text-[10px] uppercase font-bold text-text-tertiary tracking-wider px-2 py-0.5 rounded bg-surface-2">
                      Rule / Form
                    </span>
                  </div>
                )}
                {block.content && (
                  <p className="text-xs text-text-secondary leading-relaxed mb-2 font-medium">
                    {renderInlineStyles(block.content)}
                  </p>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {block.items?.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-2.5 rounded-lg bg-surface-2/60 border border-border hover:border-border-strong hover:bg-surface-2 transition-all group"
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="font-japanese text-sm font-medium text-text-secondary group-hover:text-text-primary transition-colors">
                          {renderInlineStyles(item.left)}
                        </span>
                        <ArrowRight size={13} className="text-accent flex-shrink-0" />
                        <span className="font-japanese text-sm font-bold text-text-primary">
                          {renderInlineStyles(item.right)}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 flex-shrink-0 ml-2">
                        {item.annotation && (
                          <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-accent/10 text-accent">
                            {item.annotation}
                          </span>
                        )}
                        {item.meaning && (
                          <span className="text-xs text-text-tertiary font-sans">
                            {item.meaning}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )

          case 'key_value_grid':
            return (
              <div key={index} className="bg-surface rounded-xl border border-border p-4 shadow-card space-y-3">
                {block.title && (
                  <div className="flex items-center gap-2 border-b border-border pb-2">
                    <span className="w-2 h-2 rounded-full bg-accent" />
                    <h5 className="text-xs font-bold text-text-primary">{renderInlineStyles(block.title)}</h5>
                  </div>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {block.keyValuePairs?.map((pair, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-lg bg-surface-2/60 border border-border flex flex-col justify-between"
                    >
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="text-[10px] font-bold text-accent uppercase tracking-wider">
                          {pair.label}
                        </span>
                        {pair.extra && (
                          <span className="text-[11px] text-text-tertiary">
                            {pair.extra}
                          </span>
                        )}
                      </div>
                      <p className="font-japanese text-sm font-bold text-text-primary">
                        {renderInlineStyles(pair.value)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )

          case 'callout':
            return (
              <div
                key={index}
                className={`p-3.5 rounded-xl border flex items-start gap-3 my-2 ${
                  block.calloutType === 'warning'
                    ? 'bg-amber-500/10 border-amber-500/25 text-amber-900 dark:text-amber-200'
                    : 'bg-accent/10 border-accent/25 text-text-primary'
                }`}
              >
                {block.calloutType === 'warning' ? (
                  <AlertCircle size={18} className="text-amber-500 flex-shrink-0 mt-0.5" />
                ) : (
                  <Lightbulb size={18} className="text-accent flex-shrink-0 mt-0.5" />
                )}
                <div className="text-xs leading-relaxed">
                  {renderInlineStyles(block.content || '')}
                </div>
              </div>
            )

          case 'example':
            return (
              <div
                key={index}
                className="p-3 rounded-lg bg-surface border border-border/80 flex items-center gap-2.5 text-xs text-text-secondary"
              >
                <span className="text-accent font-bold">→</span>
                <span className="font-japanese font-medium text-text-primary">
                  {renderInlineStyles(block.content || '')}
                </span>
              </div>
            )

          case 'list':
            return (
              <div key={index} className="bg-surface rounded-xl border border-border p-4 shadow-card">
                {block.title && (
                  <h5 className="text-xs font-bold text-text-primary mb-3 flex items-center gap-2 border-b border-border pb-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                    {renderInlineStyles(block.title)}
                  </h5>
                )}
                <div className="space-y-2">
                  {block.rawList?.map((item, i) => {
                    const parsedItem = parseDefinitionItem(item)
                    if (parsedItem) {
                      return (
                        <div
                          key={i}
                          className="flex flex-col sm:flex-row sm:items-center justify-between p-2.5 rounded-lg bg-surface-2/50 border border-border/80 text-xs gap-1.5 sm:gap-2"
                        >
                          <span className="font-japanese font-bold text-text-primary">
                            {renderInlineStyles(parsedItem.term)}
                          </span>
                          <span className="text-xs text-text-secondary font-sans font-medium">
                            {renderInlineStyles(parsedItem.def)}
                          </span>
                        </div>
                      )
                    }

                    return (
                      <div key={i} className="flex items-start gap-2 text-xs text-text-secondary leading-relaxed">
                        <span className="text-accent font-bold mt-0.5">•</span>
                        <span>{renderInlineStyles(item)}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            )

          case 'formula':
            return (
              <div
                key={index}
                className="bg-accent/5 border border-accent/25 rounded-xl p-3.5 flex items-center gap-3"
              >
                <div className="w-8 h-8 rounded-lg bg-accent/15 text-accent flex items-center justify-center flex-shrink-0">
                  <Sparkles size={16} />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-accent uppercase tracking-wider block">
                    Core Grammar Rule / Formula
                  </span>
                  <p className="text-xs font-semibold text-text-primary mt-0.5 font-japanese">
                    {renderInlineStyles(block.content || '')}
                  </p>
                </div>
              </div>
            )

          case 'paragraph':
          default:
            return (
              <div key={index} className="text-xs text-text-secondary leading-relaxed font-sans">
                {renderInlineStyles(block.content || '')}
              </div>
            )
        }
      })}
    </div>
  )
}

// ─── PARSER HELPERS ─────────────────────────────────────────────────────────

function parseExplanation(raw: string): ParsedBlock[] {
  if (!raw) return []

  const rawSections = raw.split(/\n\s*\n/)
  const blocks: ParsedBlock[] = []

  for (const section of rawSections) {
    const lines = section
      .split('\n')
      .map((l) => l.trim())
      .filter((l) => l.length > 0 && !l.match(/^(?:---|___|\*\*\*)$/)) // Ignore horizontal rules

    if (lines.length === 0) continue

    const firstLine = lines[0]

    // 1. Detect Markdown Table
    if (lines.some((l) => l.includes('|') && (l.includes('---') || l.includes(':---')))) {
      const parsedTable = parseMarkdownTable(lines)
      if (parsedTable) {
        blocks.push(parsedTable)
        continue
      }
    }

    // 2. Detect Blockquote / Callout (> ⚠️ or > 💡 or > ...)
    if (firstLine.startsWith('>')) {
      const cleanText = lines.map((l) => l.replace(/^>\s*/, '')).join(' ')
      const isWarn = cleanText.includes('⚠️') || cleanText.toLowerCase().includes('critical') || cleanText.toLowerCase().includes('warning')
      blocks.push({
        type: 'callout',
        calloutType: isWarn ? 'warning' : 'tip',
        content: cleanText,
      })
      continue
    }

    // 3. Detect Standalone Header (### Header or **Header:** or #### Header)
    const headerMatch = firstLine.match(/^(?:#{2,4}\s*|\*\*)([^*]+?)(?:\*\*|:)?$/)
    if (headerMatch && lines.length === 1) {
      const title = headerMatch[1].replace(/:$/, '').trim()
      blocks.push({ type: 'header', title })
      continue
    }

    // 4. Section starting with a Bold Header e.g. "**Group 2 (る-verbs / ichidan)**"
    if (headerMatch && lines.length > 1) {
      const headerTitle = headerMatch[1].replace(/:$/, '').trim()
      const remainingLines = lines.slice(1)

      // 4a. Check if remaining lines are Key-Value Tense Pairs (Affirmative: ..., Negative: ...)
      const isKeyValue = remainingLines.every((l) => l.includes(':') && !l.startsWith('-'))
      if (isKeyValue && remainingLines.length >= 2) {
        const pairs = remainingLines.map((l) => {
          const colonIdx = l.indexOf(':')
          const label = l.slice(0, colonIdx).trim()
          let val = l.slice(colonIdx + 1).trim()
          let extra: string | undefined

          const parenMatch = val.match(/\((.*?)\)/)
          if (parenMatch) {
            extra = `(${parenMatch[1]})`
            val = val.replace(/\((.*?)\)/, '').trim()
          }

          return { label, value: val, extra }
        })

        blocks.push({
          type: 'key_value_grid',
          title: headerTitle,
          keyValuePairs: pairs,
        })
        continue
      }

      // 4b. Check if remaining lines are transformation items (contain →)
      const isTransformation = remainingLines.some((l) => l.includes('→'))
      if (isTransformation) {
        let desc = ''
        const items: TransformationItem[] = []

        for (const line of remainingLines) {
          if (line.includes('→')) {
            const parsed = parseTransformationLine(line)
            if (parsed) items.push(parsed)
          } else if (!line.startsWith('-')) {
            desc = desc ? `${desc} ${line}` : line
          }
        }

        blocks.push({
          type: 'transformation_list',
          title: headerTitle,
          content: desc,
          items,
        })
        continue
      }

      // 4c. Check if remaining lines are list items
      const isList = remainingLines.every((l) => l.startsWith('-') || l.startsWith('*'))
      if (isList) {
        blocks.push({
          type: 'list',
          title: headerTitle,
          rawList: remainingLines.map((l) => l.replace(/^[-*]\s*/, '')),
        })
        continue
      }

      // 4d. Fallback: header followed by paragraph
      blocks.push({ type: 'header', title: headerTitle })
      blocks.push({ type: 'paragraph', content: remainingLines.join('\n') })
      continue
    }

    // 5. Transformation items without a bold header
    if (lines.some((l) => l.includes('→'))) {
      const items: TransformationItem[] = []
      let desc = ''

      for (const line of lines) {
        if (line.includes('→')) {
          const parsed = parseTransformationLine(line)
          if (parsed) items.push(parsed)
        } else if (!line.startsWith('-')) {
          desc = desc ? `${desc} ${line}` : line
        }
      }

      blocks.push({
        type: 'transformation_list',
        content: desc,
        items,
      })
      continue
    }

    // 6. Bullet list
    if (lines.every((l) => l.startsWith('-') || l.startsWith('*'))) {
      blocks.push({
        type: 'list',
        rawList: lines.map((l) => l.replace(/^[-*]\s*/, '')),
      })
      continue
    }

    // 7. Formula pattern: lines like "[Time] + [Place] + [Object] + [Verb]"
    if (firstLine.includes('[') && firstLine.includes(']') && firstLine.includes('+')) {
      blocks.push({
        type: 'formula',
        content: lines.join(' '),
      })
      continue
    }

    // 8. Standalone Example lines starting with →
    if (firstLine.startsWith('→')) {
      for (const line of lines) {
        blocks.push({
          type: 'example',
          content: line.replace(/^→\s*/, ''),
        })
      }
      continue
    }

    // 9. Regular paragraph
    blocks.push({
      type: 'paragraph',
      content: lines.join(' '),
    })
  }

  return blocks
}

function parseMarkdownTable(lines: string[]): ParsedBlock | null {
  const tableLines = lines.filter((l) => l.includes('|'))
  if (tableLines.length < 2) return null

  // Header line
  const headerCells = tableLines[0]
    .split('|')
    .map((c) => c.trim())
    .filter((c) => c.length > 0)

  // Skip delimiter line (containing :--- or ---)
  const dataLines = tableLines.slice(1).filter((l) => !l.match(/^[|\s:-]+$/))

  const rows: string[][] = []
  for (const line of dataLines) {
    const cells = line
      .split('|')
      .map((c) => c.trim())
      .filter((c, idx, arr) => {
        // Exclude outer empty splits from leading/trailing pipes
        if (idx === 0 && c === '' && line.startsWith('|')) return false
        if (idx === arr.length - 1 && c === '' && line.endsWith('|')) return false
        return true
      })
    if (cells.length > 0) {
      rows.push(cells)
    }
  }

  return {
    type: 'table',
    tableHeaders: headerCells,
    tableRows: rows,
  }
}

function parseTransformationLine(line: string): TransformationItem | null {
  const clean = line.replace(/^[->*\s]+/, '').trim()
  const parts = clean.split('→')
  if (parts.length < 2) return null

  const left = parts[0].trim()
  let rightSide = parts.slice(1).join('→').trim()

  let annotation: string | undefined
  let meaning: string | undefined

  // Match bracketed annotation like [む→み]
  const annotMatch = rightSide.match(/\[(.*?)\]/)
  if (annotMatch) {
    annotation = annotMatch[1]
    rightSide = rightSide.replace(/\[(.*?)\]/, '').trim()
  }

  // Match parenthetical meaning like (eat) or (see/watch)
  const meaningMatch = rightSide.match(/\((.*?)\)/)
  if (meaningMatch) {
    meaning = meaningMatch[1]
    rightSide = rightSide.replace(/\((.*?)\)/, '').trim()
  }

  return {
    left,
    right: rightSide,
    meaning,
    annotation,
  }
}

function parseDefinitionItem(item: string): { term: string; def: string } | null {
  // Pattern: "Word — definition" or "Word = definition" or "Word: definition" or "Word (definition)"
  if (item.includes('—')) {
    const parts = item.split('—')
    return { term: parts[0].trim(), def: parts.slice(1).join('—').trim() }
  }

  if (item.includes('=')) {
    const parts = item.split('=')
    return { term: parts[0].trim(), def: parts.slice(1).join('=').trim() }
  }

  const parenMatch = item.match(/^([^(]+?)\s*\((.+?)\)$/)
  if (parenMatch && parenMatch[1].length < 30) {
    return {
      term: parenMatch[1].trim(),
      def: parenMatch[2].trim(),
    }
  }

  const colonMatch = item.match(/^([^:]+?)\s*:\s*(.+)$/)
  if (colonMatch && colonMatch[1].length < 25) {
    return {
      term: colonMatch[1].trim(),
      def: colonMatch[2].trim(),
    }
  }

  return null
}

function renderInlineStyles(text: string): React.ReactNode {
  if (!text) return null

  // Pre-clean: strip naked unmatched asterisks e.g. "*word**" or "**word*"
  let cleanText = text
    .replace(/(?<!\*)\*(?!\*)/g, '') // remove single asterisks that are not pairs
    .trim()

  // Split on **bold** or `code`
  const parts = cleanText.split(/(\*\*.*?\*\*|`.*?`)/g)

  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      const inner = part.slice(2, -2).replace(/\*/g, '')
      return (
        <strong key={i} className="font-bold text-text-primary">
          {inner}
        </strong>
      )
    }
    if (part.startsWith('`') && part.endsWith('`')) {
      return (
        <code
          key={i}
          className="font-mono text-[11px] px-1.5 py-0.5 rounded bg-surface-2 text-accent border border-border font-medium"
        >
          {part.slice(1, -1)}
        </code>
      )
    }
    return part.replace(/\*/g, '') // strip any remaining orphan asterisks!
  })
}
