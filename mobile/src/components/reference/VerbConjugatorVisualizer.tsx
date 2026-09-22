import { useState } from 'react'
import { Volume2, BookOpen } from 'lucide-react'
import { playKanaAudio } from '@/data/kana/kana-data'

export interface ModelVerb {
  dictionary: string
  kanji: string
  meaning: string
  group: 'group1' | 'group2' | 'group3'
  groupLabel: string
  consonantStem: string
  vowelMatrix: {
    a: { syllable: string; suffix: string; full: string; role: string }
    i: { syllable: string; suffix: string; full: string; role: string }
    u: { syllable: string; suffix: string; full: string; role: string }
    e: { syllable: string; suffix: string; full: string; role: string }
    o: { syllable: string; suffix: string; full: string; role: string }
  }
  forms: {
    masu: string
    te: string
    ta: string
    nai: string
    nakatta: string
  }
}

export const MODEL_VERBS: ModelVerb[] = [
  {
    dictionary: 'かく',
    kanji: '書く',
    meaning: 'to write',
    group: 'group1',
    groupLabel: 'Group 1 (Godan / k-stem)',
    consonantStem: 'kak-',
    vowelMatrix: {
      a: { syllable: 'か', suffix: 'ない', full: '書かない', role: 'Negative (Plain)' },
      i: { syllable: 'き', suffix: 'ます', full: '書きます', role: 'Polite (Masu)' },
      u: { syllable: 'く', suffix: '', full: '書く', role: 'Dictionary Form' },
      e: { syllable: 'け', suffix: 'る', full: '書ける', role: 'Potential (Can write)' },
      o: { syllable: 'こ', suffix: 'う', full: '書こう', role: 'Volitional (Let’s write)' },
    },
    forms: {
      masu: 'かきます (書きます)',
      te: 'かいて (書いて)',
      ta: 'かいた (書いた)',
      nai: 'かかない (書かない)',
      nakatta: 'かなかた (書かなかった)',
    },
  },
  {
    dictionary: 'はなす',
    kanji: '話す',
    meaning: 'to speak / talk',
    group: 'group1',
    groupLabel: 'Group 1 (Godan / s-stem)',
    consonantStem: 'hanas-',
    vowelMatrix: {
      a: { syllable: 'さ', suffix: 'ない', full: '話さない', role: 'Negative (Plain)' },
      i: { syllable: 'し', suffix: 'ます', full: '話します', role: 'Polite (Masu)' },
      u: { syllable: 'す', suffix: '', full: '話す', role: 'Dictionary Form' },
      e: { syllable: 'せ', suffix: 'る', full: '話せる', role: 'Potential (Can speak)' },
      o: { syllable: 'そ', suffix: 'う', full: '話そう', role: 'Volitional (Let’s speak)' },
    },
    forms: {
      masu: 'はなします (話します)',
      te: 'はなして (話して)',
      ta: 'はなした (話した)',
      nai: 'はなさない (話さない)',
      nakatta: 'はなさなかった (話さなかった)',
    },
  },
  {
    dictionary: 'のむ',
    kanji: '飲む',
    meaning: 'to drink',
    group: 'group1',
    groupLabel: 'Group 1 (Godan / m-stem)',
    consonantStem: 'nom-',
    vowelMatrix: {
      a: { syllable: 'ま', suffix: 'ない', full: '飲まない', role: 'Negative (Plain)' },
      i: { syllable: 'み', suffix: 'ます', full: '飲みます', role: 'Polite (Masu)' },
      u: { syllable: 'む', suffix: '', full: '飲む', role: 'Dictionary Form' },
      e: { syllable: 'め', suffix: 'る', full: '飲める', role: 'Potential (Can drink)' },
      o: { syllable: 'も', suffix: 'う', full: '飲もう', role: 'Volitional (Let’s drink)' },
    },
    forms: {
      masu: 'のみます (飲みます)',
      te: 'のんで (飲んで)',
      ta: 'のんだ (飲んだ)',
      nai: 'のまない (飲まない)',
      nakatta: 'のまなかった (飲まなかった)',
    },
  },
  {
    dictionary: 'かう',
    kanji: '買う',
    meaning: 'to buy',
    group: 'group1',
    groupLabel: 'Group 1 (Godan / w-stem)',
    consonantStem: 'ka-',
    vowelMatrix: {
      a: { syllable: 'わ', suffix: 'ない', full: '買わない', role: 'Negative (Plain / わ)' },
      i: { syllable: 'い', suffix: 'ます', full: '買います', role: 'Polite (Masu)' },
      u: { syllable: 'う', suffix: '', full: '買う', role: 'Dictionary Form' },
      e: { syllable: 'え', suffix: 'る', full: '買える', role: 'Potential (Can buy)' },
      o: { syllable: 'お', suffix: 'う', full: '買おう', role: 'Volitional (Let’s buy)' },
    },
    forms: {
      masu: 'かいます (買います)',
      te: 'かって (買って)',
      ta: 'かった (買った)',
      nai: 'かわない (買わない)',
      nakatta: 'かわなかった (買わなかった)',
    },
  },
  {
    dictionary: 'たべる',
    kanji: '食べる',
    meaning: 'to eat',
    group: 'group2',
    groupLabel: 'Group 2 (Ichidan / Drop-ru)',
    consonantStem: 'tabe-',
    vowelMatrix: {
      a: { syllable: '—', suffix: 'ない', full: '食べない', role: 'Drop る + ない' },
      i: { syllable: '—', suffix: 'ます', full: '食べます', role: 'Drop る + ます' },
      u: { syllable: 'る', suffix: '', full: '食べる', role: 'Dictionary Form' },
      e: { syllable: '—', suffix: 'られる', full: '食べられる', role: 'Potential' },
      o: { syllable: '—', suffix: 'よう', full: '食べよう', role: 'Volitional' },
    },
    forms: {
      masu: 'たべます (食べます)',
      te: 'たべて (食べて)',
      ta: 'たべた (食べた)',
      nai: 'たべない (食べない)',
      nakatta: 'たべなかった (食べなかった)',
    },
  },
  {
    dictionary: 'する',
    kanji: 'する',
    meaning: 'to do (irregular)',
    group: 'group3',
    groupLabel: 'Group 3 (Irregular)',
    consonantStem: 's-',
    vowelMatrix: {
      a: { syllable: 'し', suffix: 'ない', full: 'しない', role: 'Negative' },
      i: { syllable: 'し', suffix: 'ます', full: 'します', role: 'Polite' },
      u: { syllable: 'する', suffix: '', full: 'する', role: 'Dictionary Form' },
      e: { syllable: 'でき', suffix: 'る', full: 'できる', role: 'Potential' },
      o: { syllable: 'し', suffix: 'よう', full: 'しよう', role: 'Volitional' },
    },
    forms: {
      masu: 'します',
      te: 'して',
      ta: 'した',
      nai: 'しない',
      nakatta: 'しなかった',
    },
  },
  {
    dictionary: 'くる',
    kanji: '来る',
    meaning: 'to come (irregular)',
    group: 'group3',
    groupLabel: 'Group 3 (Irregular)',
    consonantStem: 'k-',
    vowelMatrix: {
      a: { syllable: 'こ', suffix: 'ない', full: '来ない (こない)', role: 'Negative (ko-nai)' },
      i: { syllable: 'き', suffix: 'ます', full: '来ます (きます)', role: 'Polite (ki-masu)' },
      u: { syllable: 'くる', suffix: '', full: '来る (くる)', role: 'Dictionary (ku-ru)' },
      e: { syllable: 'こ', suffix: 'られる', full: '来られる', role: 'Potential' },
      o: { syllable: 'こ', suffix: 'よう', full: '来よう (こよう)', role: 'Volitional' },
    },
    forms: {
      masu: 'きます (来ます)',
      te: 'きて (来て)',
      ta: 'きた (来た)',
      nai: 'こない (来ない)',
      nakatta: 'こなかった (来なかった)',
    },
  },
]

export function InteractiveVerbConjugatorStudio() {
  const [selectedVerbIdx, setSelectedVerbIdx] = useState<number>(0)
  const [activeVowel, setActiveVowel] = useState<'a' | 'i' | 'u' | 'e' | 'o'>('i')

  const verb = MODEL_VERBS[selectedVerbIdx] || MODEL_VERBS[0]
  const currentVowelInfo = verb.vowelMatrix[activeVowel]

  const handleAudio = (text: string) => {
    // Strip parenthesized kanji/hiragana if present
    const clean = text.split('(')[0].trim()
    playKanaAudio(clean)
  }

  return (
    <div className="bg-surface border border-accent/20 rounded-2xl p-4 sm:p-6 shadow-card space-y-6">
      {/* Studio Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-border">
        <div className="flex items-center gap-2.5">
          <div className="p-2.5 rounded-xl bg-accent-soft text-accent">
            <BookOpen size={22} />
          </div>
          <div>
            <h3 className="text-base font-bold text-text-primary flex items-center gap-2">
              Interactive 5-Vowel Conjugation Engine
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-accent/10 text-accent font-semibold">
                五十音エンジン (a-i-u-e-o)
              </span>
            </h3>
            <p className="text-xs text-text-tertiary">
              See how Japanese Godan verbs shift endings across the 5 vowel rows to construct every grammatical form
            </p>
          </div>
        </div>
      </div>

      {/* Model Verb Picker */}
      <div>
        <span className="text-xs font-bold text-text-secondary block mb-2">
          Select a Model Verb Pattern:
        </span>
        <div className="flex flex-wrap gap-2">
          {MODEL_VERBS.map((v, idx) => {
            const isSelected = selectedVerbIdx === idx
            return (
              <button
                key={v.dictionary}
                type="button"
                onClick={() => setSelectedVerbIdx(idx)}
                className={`px-3 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-all active:scale-95 ${
                  isSelected
                    ? 'bg-accent text-white border-accent shadow-sm'
                    : 'bg-surface-2 text-text-secondary border-border hover:border-accent/40'
                }`}
              >
                <span className="font-japanese font-bold">{v.kanji}</span>
                <span className="text-[10px] opacity-80">({v.meaning})</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* 5-Vowel Matrix Visualizer (The Gear / Slider) */}
      <div className="bg-surface-2/60 border border-border rounded-xl p-5 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-surface text-text-secondary border border-border">
              {verb.groupLabel}
            </span>
            <h2 className="text-3xl font-bold font-japanese text-text-primary mt-1.5">
              {verb.kanji} ({verb.dictionary}) — {verb.meaning}
            </h2>
            <p className="text-xs text-text-tertiary">
              Stem: <code className="px-1.5 py-0.5 rounded bg-surface border border-border font-mono text-accent">{verb.consonantStem}</code>
            </p>
          </div>

          <button
            type="button"
            onClick={() => handleAudio(currentVowelInfo.full)}
            className="p-3 rounded-xl bg-accent text-white hover:bg-accent/90 shadow-md active:scale-95 transition-all flex items-center gap-2"
            title="Listen to conjugated verb"
          >
            <Volume2 size={18} />
            <span className="text-xs font-semibold">Listen to Form</span>
          </button>
        </div>

        {/* 5 Vowel Rows (a, i, u, e, o) Selector Lanes */}
        <div>
          <span className="text-xs font-bold text-text-secondary uppercase tracking-wider block mb-2">
            The 5 Vowel Rows (五十音ライン):
          </span>
          <div className="grid grid-cols-5 gap-2">
            {[
              { vowel: 'a' as const, label: 'あ-Line', badge: 'Negative / ない' },
              { vowel: 'i' as const, label: 'い-Line', badge: 'Polite / ます' },
              { vowel: 'u' as const, label: 'う-Line', badge: 'Dictionary' },
              { vowel: 'e' as const, label: 'え-Line', badge: 'Potential / え' },
              { vowel: 'o' as const, label: 'お-Line', badge: 'Volitional / お' },
            ].map(({ vowel, label, badge }) => {
              const isSelected = activeVowel === vowel
              const info = verb.vowelMatrix[vowel]
              return (
                <button
                  key={vowel}
                  type="button"
                  onClick={() => setActiveVowel(vowel)}
                  className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center justify-between active:scale-95 ${
                    isSelected
                      ? 'bg-accent text-white border-accent ring-2 ring-accent/30 shadow-md scale-[1.03]'
                      : 'bg-surface border-border hover:border-accent/40 shadow-card text-text-primary'
                  }`}
                >
                  <span className={`text-[10px] font-bold uppercase tracking-wider ${isSelected ? 'text-white/80' : 'text-text-tertiary'}`}>
                    {label}
                  </span>
                  <p className="text-xl sm:text-2xl font-bold font-japanese mt-1">
                    {info.syllable}
                  </p>
                  <p className={`text-[10px] font-japanese font-semibold mt-1 truncate ${isSelected ? 'text-white/90' : 'text-accent'}`}>
                    {info.full}
                  </p>
                  <span className={`text-[8px] sm:text-[9px] mt-1 px-1.5 py-0.5 rounded-full ${isSelected ? 'bg-white/20 text-white' : 'bg-surface-2 text-text-tertiary'}`}>
                    {badge}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Highlight Banner of Selected Vowel Form */}
        <div className="p-4 rounded-xl bg-surface border border-border flex flex-wrap items-center justify-between gap-3">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-accent block">
              {currentVowelInfo.role}
            </span>
            <p className="text-2xl font-bold font-japanese text-text-primary mt-0.5">
              {currentVowelInfo.full}
            </p>
            <p className="text-xs text-text-secondary mt-0.5">
              Formula: Stem <strong>{verb.consonantStem}</strong> + Vowel syllable <strong>{currentVowelInfo.syllable}</strong> + Ending <strong>{currentVowelInfo.suffix || '—'}</strong>
            </p>
          </div>
          <button
            type="button"
            onClick={() => handleAudio(currentVowelInfo.full)}
            className="p-2 rounded-lg bg-surface-2 hover:bg-accent-soft hover:text-accent text-text-tertiary text-xs flex items-center gap-1.5 transition-all"
          >
            <Volume2 size={14} /> Play
          </button>
        </div>
      </div>

      {/* 5 Core Conjugation Forms Cards */}
      <div>
        <h4 className="text-xs font-bold text-text-secondary uppercase tracking-wider mb-2">
          Complete 5 Forms for {verb.kanji}:
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
          {[
            { label: '〜ます (Polite)', val: verb.forms.masu, color: 'border-blue-500/30 bg-blue-500/5' },
            { label: '〜て (Te-form)', val: verb.forms.te, color: 'border-emerald-500/30 bg-emerald-500/5' },
            { label: '〜た (Past)', val: verb.forms.ta, color: 'border-amber-500/30 bg-amber-500/5' },
            { label: '〜ない (Negative)', val: verb.forms.nai, color: 'border-rose-500/30 bg-rose-500/5' },
            { label: '〜なかった (Past Neg)', val: verb.forms.nakatta, color: 'border-purple-500/30 bg-purple-500/5' },
          ].map((f, i) => (
            <div
              key={i}
              className={`p-3 rounded-xl border ${f.color} flex flex-col justify-between`}
            >
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-text-tertiary block mb-1">
                  {f.label}
                </span>
                <p className="text-sm font-japanese font-bold text-text-primary">
                  {f.val}
                </p>
              </div>
              <button
                type="button"
                onClick={() => handleAudio(f.val)}
                className="mt-2 text-xs text-text-tertiary hover:text-accent p-1 inline-flex items-center gap-1 self-start"
              >
                <Volume2 size={12} /> Play
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
