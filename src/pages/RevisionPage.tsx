import { useState } from 'react'
import { RefreshCcw, BookMarked, FileText, AlertTriangle, CheckCircle2 } from 'lucide-react'
import { useApp } from '@/app/AppContext'
import { n5Vocabulary } from '@/data/vocabulary/n5-vocab'
import { n5Grammar } from '@/data/grammar/n5-grammar'
import { ExampleBlock } from '@/components/JapaneseText'

const MISTAKE_LABELS: Record<string, string> = {
  particle: 'Particle usage',
  nounModification: 'Noun modification (の)',
  verbConjugation: 'Verb conjugation',
  vocabulary: 'Vocabulary',
  wordOrder: 'Word order',
  spelling: 'Spelling / kana',
  kanji: 'Kanji reading',
  meaning: 'Meaning / translation',
  counter: 'Counters',
  politeness: 'Politeness level',
  other: 'Other',
}

type RevisionTab = 'vocab' | 'grammar' | 'mistakes'

export default function RevisionPage() {
  const { progress, showKanji } = useApp()
  const [activeTab, setActiveTab] = useState<RevisionTab>('mistakes')

  // Get vocab items that are in 'learning' familiarity
  const learningVocab = n5Vocabulary.filter(
    (v) => progress.vocabProgress[v.id]?.familiarity === 'learning'
  )

  // Grammar items where familiarity < 'familiar'
  const reviewGrammar = n5Grammar.filter(
    (g) => !progress.grammarProgress[g.id] || progress.grammarProgress[g.id].familiarity === 'learning'
  )

  const totalDue = learningVocab.length + reviewGrammar.length

  return (
    <div className="space-y-5 animate-fade-in">
      <div>
        <h2 className="text-xl font-bold text-text-primary">Revision</h2>
        <p className="text-sm text-text-secondary mt-1">
          Review what you've learnt and focus on weak areas.
        </p>
      </div>

      {/* Due today banner */}
      <div className="bg-accent-soft border border-accent/20 rounded-xl p-4 flex items-center gap-4">
        <RefreshCcw size={24} className="text-accent flex-shrink-0" />
        <div>
          <p className="text-sm font-bold text-text-primary">{totalDue} items due for review</p>
          <p className="text-xs text-text-secondary">Focus on vocabulary and grammar in 'learning' stage</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-surface-2 p-1 rounded-xl border border-border">
        {([
          { id: 'mistakes', label: 'Mistakes', icon: <AlertTriangle size={13} /> },
          { id: 'vocab', label: `Vocab (${learningVocab.length})`, icon: <BookMarked size={13} /> },
          { id: 'grammar', label: `Grammar (${reviewGrammar.length})`, icon: <FileText size={13} /> },
        ] as { id: RevisionTab; label: string; icon: React.ReactNode }[]).map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={[
              'flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all',
              activeTab === tab.id
                ? 'bg-surface text-text-primary shadow-sm border border-border'
                : 'text-text-secondary hover:text-text-primary',
            ].join(' ')}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* ── Mistakes tab ───────────────────────────── */}
      {activeTab === 'mistakes' && (
        <div className="space-y-3 animate-fade-in">
          {progress.weakAreas.length > 0 ? (
            <>
              <p className="text-sm text-text-secondary">
                These are the mistake categories identified from your homework and exercises.
              </p>
              {progress.weakAreas.map((area) => (
                <div key={area} className="bg-surface rounded-xl border border-border p-4 shadow-card flex items-center gap-3">
                  <AlertTriangle size={16} className="text-warning flex-shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-text-primary">{MISTAKE_LABELS[area] ?? area}</p>
                    <p className="text-xs text-text-secondary">Review related grammar and vocabulary</p>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <div className="text-center py-12">
              <CheckCircle2 size={40} className="text-success mx-auto mb-3" />
              <p className="text-sm text-text-secondary">No tracked mistakes yet. Complete some exercises!</p>
            </div>
          )}
        </div>
      )}

      {/* ── Vocab tab ──────────────────────────────── */}
      {activeTab === 'vocab' && (
        <div className="space-y-2 animate-fade-in">
          {learningVocab.length === 0 ? (
            <div className="text-center py-12">
              <CheckCircle2 size={40} className="text-success mx-auto mb-3" />
              <p className="text-sm text-text-secondary">All vocabulary is familiar or mastered!</p>
            </div>
          ) : (
            learningVocab.map((v) => {
              const vp = progress.vocabProgress[v.id]
              return (
                <div key={v.id} className="bg-surface rounded-xl border border-border p-4 shadow-card">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-base font-japanese font-bold text-text-primary">{v.hiragana}</p>
                      {showKanji && v.kanji && (
                        <p className="text-xs font-japanese text-text-tertiary">（{v.kanji}）</p>
                      )}
                      <p className="text-sm text-text-secondary mt-1">{v.meaning}</p>
                    </div>
                    <div className="text-right text-xs text-text-secondary flex-shrink-0">
                      <p>✓ {vp?.correctCount ?? 0}</p>
                      <p>✗ {vp?.incorrectCount ?? 0}</p>
                    </div>
                  </div>
                  {v.examples?.[0] && (
                    <div className="mt-3 pt-3 border-t border-border">
                      <ExampleBlock
                        hiragana={v.examples[0].hiragana}
                        kanji={v.examples[0].kanji}
                        meaning={v.examples[0].meaning}
                      />
                    </div>
                  )}
                </div>
              )
            })
          )}
        </div>
      )}

      {/* ── Grammar tab ────────────────────────────── */}
      {activeTab === 'grammar' && (
        <div className="space-y-2 animate-fade-in">
          {reviewGrammar.length === 0 ? (
            <div className="text-center py-12">
              <CheckCircle2 size={40} className="text-success mx-auto mb-3" />
              <p className="text-sm text-text-secondary">All grammar points are familiar!</p>
            </div>
          ) : (
            reviewGrammar.map((g) => (
              <div key={g.id} className="bg-surface rounded-xl border border-border p-4 shadow-card">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-accent-soft flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-japanese font-bold text-accent">{g.pattern.replace('〜', '')}</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-text-primary font-japanese">{g.pattern}</p>
                    <p className="text-xs text-text-secondary">{g.meaning}</p>
                    {g.examples[0] && (
                      <div className="mt-2">
                        <ExampleBlock
                          hiragana={g.examples[0].hiragana}
                          kanji={g.examples[0].kanji}
                          meaning={g.examples[0].meaning}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  )
}
