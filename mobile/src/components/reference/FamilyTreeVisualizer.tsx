import { useState } from 'react'
import { Volume2, Users, Search } from 'lucide-react'
import { playKanaAudio } from '@/data/kana/kana-data'
import { n5FamilyOwn, n5FamilyOthers } from '@/data/reference/n5-reference'

export interface TreeNode {
  id: string
  role: string
  english: string
  ownKanji: string
  ownHira: string
  ownRomaji: string
  otherKanji: string
  otherHira: string
  otherRomaji: string
  emoji: string
  tip: string
  isSelf?: boolean
}

export const TREE_NODES: {
  grandparents: TreeNode[]
  parents: TreeNode[]
  siblings: TreeNode[]
  spouse: TreeNode[]
  children: TreeNode[]
} = {
  grandparents: [
    {
      id: 'gpa',
      role: 'Grandfather',
      english: 'Grandfather',
      ownKanji: '祖父',
      ownHira: 'そふ',
      ownRomaji: 'sofu',
      otherKanji: 'おじいさん',
      otherHira: 'おじいさん',
      otherRomaji: 'ojiisan',
      emoji: '👴',
      tip: 'Use そふ (sofu) when talking to outsiders. Use おじいさん when talking to him or about someone else\'s grandpa.',
    },
    {
      id: 'gma',
      role: 'Grandmother',
      english: 'Grandmother',
      ownKanji: '祖母',
      ownHira: 'そぼ',
      ownRomaji: 'sobo',
      otherKanji: 'おばあさん',
      otherHira: 'おばあさん',
      otherRomaji: 'obaasan',
      emoji: '👵',
      tip: 'Use そぼ (sobo) humbly for your grandmother; おばあさん is respectful for elderly women or someone else\'s grandma.',
    },
  ],
  parents: [
    {
      id: 'dad',
      role: 'Father',
      english: 'Father',
      ownKanji: '父',
      ownHira: 'ちち',
      ownRomaji: 'chichi',
      otherKanji: 'お父さん',
      otherHira: 'おとうさん',
      otherRomaji: 'otousan',
      emoji: '👨',
      tip: 'Never say "お父さん" about your father to clients or teachers — always use the humble "父 (ちち)".',
    },
    {
      id: 'mom',
      role: 'Mother',
      english: 'Mother',
      ownKanji: '母',
      ownHira: 'はは',
      ownRomaji: 'haha',
      otherKanji: 'お母さん',
      otherHira: 'おかあさん',
      otherRomaji: 'okaasan',
      emoji: '👩',
      tip: 'Use はは (haha) humbly to outsiders; inside your house or addressing her directly, you can say おかあさん.',
    },
  ],
  siblings: [
    {
      id: 'older_bro',
      role: 'Older Brother',
      english: 'Older Brother',
      ownKanji: '兄',
      ownHira: 'あに',
      ownRomaji: 'ani',
      otherKanji: 'お兄さん',
      otherHira: 'おにいさん',
      otherRomaji: 'oniisan',
      emoji: '👦',
      tip: 'あに (ani) is humble; おにいさん (oniisan) is respectful for someone else\'s older brother.',
    },
    {
      id: 'older_sis',
      role: 'Older Sister',
      english: 'Older Sister',
      ownKanji: '姉',
      ownHira: 'あね',
      ownRomaji: 'ane',
      otherKanji: 'お姉さん',
      otherHira: 'おねえさん',
      otherRomaji: 'oneesan',
      emoji: '👧',
      tip: 'あね (ane) is humble; おねえさん (oneesan) is polite.',
    },
    {
      id: 'self',
      role: 'Self',
      english: 'You / Self',
      ownKanji: '自分 / 私',
      ownHira: 'わたし',
      ownRomaji: 'watashi',
      otherKanji: '〜さん',
      otherHira: '〜さん',
      otherRomaji: '-san',
      emoji: '⭐',
      tip: 'The core anchor of the in-group / out-group perspective.',
      isSelf: true,
    },
    {
      id: 'younger_bro',
      role: 'Younger Brother',
      english: 'Younger Brother',
      ownKanji: '弟',
      ownHira: 'おとうと',
      ownRomaji: 'otouto',
      otherKanji: '弟さん',
      otherHira: 'おとうとさん',
      otherRomaji: 'otoutosan',
      emoji: '🧒',
      tip: 'Add さん (おとうとさん) only when asking about someone else\'s younger brother.',
    },
    {
      id: 'younger_sis',
      role: 'Younger Sister',
      english: 'Younger Sister',
      ownKanji: '妹',
      ownHira: 'いもうと',
      ownRomaji: 'imouto',
      otherKanji: '妹さん',
      otherHira: 'いもうとさん',
      otherRomaji: 'imoutosan',
      emoji: '👶',
      tip: 'Add さん (いもうとさん) when referring to someone else\'s younger sister.',
    },
  ],
  spouse: [
    {
      id: 'husband',
      role: 'Husband',
      english: 'Husband',
      ownKanji: '夫 / 主人',
      ownHira: 'おっと / しゅじん',
      ownRomaji: 'otto / shujin',
      otherKanji: 'ご主人',
      otherHira: 'ごしゅじん',
      otherRomaji: 'goshujin',
      emoji: '🤵',
      tip: 'ご主人 (goshujin) has the respectful prefix "ご" to honor someone else\'s husband.',
    },
    {
      id: 'wife',
      role: 'Wife',
      english: 'Wife',
      ownKanji: '妻 / 家内',
      ownHira: 'つま / かない',
      ownRomaji: 'tsuma / kanai',
      otherKanji: '奥さん',
      otherHira: 'おくさん',
      otherRomaji: 'okusan',
      emoji: '👰',
      tip: '奥さん (okusan) is polite; つま (tsuma) is standard humble for your own wife.',
    },
  ],
  children: [
    {
      id: 'son',
      role: 'Son',
      english: 'Son',
      ownKanji: '息子',
      ownHira: 'むすこ',
      ownRomaji: 'musuko',
      otherKanji: '息子さん',
      otherHira: 'むすこさん',
      otherRomaji: 'musukosan',
      emoji: '👦',
      tip: '息子 (musuko) is humble; 息子さん is polite.',
    },
    {
      id: 'daughter',
      role: 'Daughter',
      english: 'Daughter',
      ownKanji: '娘',
      ownHira: 'むすめ',
      ownRomaji: 'musume',
      otherKanji: '娘さん / お嬢さん',
      otherHira: 'むすめさん / おじょうさん',
      otherRomaji: 'musumesan / ojousan',
      emoji: '👧',
      tip: 'お嬢さん (ojousan) is very polite when referring to someone else\'s daughter.',
    },
  ],
}

export function InteractiveFamilyTreeStudio() {
  const [perspective, setPerspective] = useState<'own' | 'other'>('own')
  const [selectedNode, setSelectedNode] = useState<TreeNode>(TREE_NODES.parents[0])
  const [tableSearch, setTableSearch] = useState<string>('')

  const handleAudio = (text: string) => {
    const clean = text.split('/')[0].trim()
    playKanaAudio(clean)
  }

  const isOwn = perspective === 'own'

  const renderTreeNode = (node: TreeNode) => {
    const isSelected = selectedNode.id === node.id
    const currentKanji = isOwn ? node.ownKanji : node.otherKanji
    const currentHira = isOwn ? node.ownHira : node.otherHira
    const currentRomaji = isOwn ? node.ownRomaji : node.otherRomaji

    return (
      <button
        key={node.id}
        type="button"
        onClick={() => setSelectedNode(node)}
        className={`p-2.5 sm:p-3 rounded-2xl border text-center transition-all flex flex-col items-center justify-between active:scale-95 shadow-card hover:scale-105 ${
          node.isSelf
            ? 'bg-amber-500/10 border-amber-500 text-amber-600 dark:text-amber-300 ring-2 ring-amber-400/30'
            : isSelected
            ? isOwn
              ? 'bg-blue-600 text-white border-blue-600 ring-2 ring-blue-300 shadow-lg scale-105'
              : 'bg-emerald-600 text-white border-emerald-600 ring-2 ring-emerald-300 shadow-lg scale-105'
            : 'bg-surface border-border hover:border-accent/50 text-text-primary'
        }`}
      >
        <span className="text-xl sm:text-2xl mb-1">{node.emoji}</span>
        <span className={`text-[9px] uppercase font-bold tracking-wider ${isSelected ? 'text-white/80' : 'text-text-tertiary'}`}>
          {node.role}
        </span>
        <p className="text-base sm:text-lg font-bold font-japanese mt-0.5">{currentKanji}</p>
        <p className={`text-[11px] font-japanese font-semibold truncate max-w-[90px] ${
          isSelected ? 'text-white/95' : isOwn ? 'text-blue-600 dark:text-blue-400' : 'text-emerald-600 dark:text-emerald-400'
        }`}>
          {currentHira}
        </p>
        <p className={`text-[9px] italic truncate max-w-[80px] ${isSelected ? 'text-white/70' : 'text-text-tertiary'}`}>
          {currentRomaji}
        </p>
      </button>
    )
  }

  // Filter comparison table data
  const comparisonList = n5FamilyOwn.map((own, i) => ({
    own,
    other: n5FamilyOthers[i],
  })).filter(({ own, other }) => {
    if (!tableSearch) return true
    const s = tableSearch.toLowerCase()
    return (
      own.hiragana.includes(s) ||
      own.meaning.toLowerCase().includes(s) ||
      own.romaji.toLowerCase().includes(s) ||
      (other && (other.hiragana.includes(s) || other.meaning.toLowerCase().includes(s)))
    )
  })

  return (
    <div className="space-y-8">
      {/* ─── 1. VISUAL FAMILY TREE STUDIO ─── */}
      <div className="bg-surface border border-accent/20 rounded-2xl p-4 sm:p-6 shadow-card space-y-6">
        {/* Header & Perspective Toggle */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-border">
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 rounded-xl bg-accent-soft text-accent">
              <Users size={22} />
            </div>
            <div>
              <h3 className="text-base font-bold text-text-primary flex items-center gap-2">
                Visual Japanese Family Tree
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-accent/10 text-accent font-semibold">
                  家系図 (Genealogy)
                </span>
              </h3>
              <p className="text-xs text-text-tertiary">
                Switch perspectives to watch the family tree morph between Humble (内) and Respectful (外) forms
              </p>
            </div>
          </div>

          {/* Master Switcher */}
          <div className="flex items-center gap-1.5 bg-surface-2 p-1 rounded-xl border border-border">
            <button
              type="button"
              onClick={() => setPerspective('own')}
              className={`text-xs px-3.5 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 ${
                isOwn ? 'bg-blue-600 text-white shadow-sm' : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              <span>🏠</span>
              <span>My Family (Humble / 内)</span>
            </button>
            <button
              type="button"
              onClick={() => setPerspective('other')}
              className={`text-xs px-3.5 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 ${
                !isOwn ? 'bg-emerald-600 text-white shadow-sm' : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              <span>👥</span>
              <span>Others&apos; Family (Polite / 外)</span>
            </button>
          </div>
        </div>

        {/* Selected Node Inspector Banner */}
        <div className="bg-surface-2/60 border border-border rounded-xl p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-xl">
            <div className="flex items-center gap-2">
              <span className="text-2xl">{selectedNode.emoji}</span>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-surface text-text-secondary border border-border">
                {selectedNode.role} ({selectedNode.english})
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <div className={`p-2.5 rounded-xl border transition-all ${
                isOwn ? 'bg-blue-500/10 border-blue-500/40' : 'bg-surface border-border opacity-75'
              }`}>
                <span className="text-[10px] uppercase font-bold text-blue-600 dark:text-blue-400 block mb-0.5">
                  🏠 Humble Form (My {selectedNode.role})
                </span>
                <p className="text-xl font-bold font-japanese text-text-primary">{selectedNode.ownKanji}</p>
                <p className="text-xs font-japanese font-semibold text-blue-600 dark:text-blue-400">{selectedNode.ownHira}</p>
                <p className="text-[10px] text-text-tertiary italic">{selectedNode.ownRomaji}</p>
              </div>

              <div className={`p-2.5 rounded-xl border transition-all ${
                !isOwn ? 'bg-emerald-500/10 border-emerald-500/40' : 'bg-surface border-border opacity-75'
              }`}>
                <span className="text-[10px] uppercase font-bold text-emerald-600 dark:text-emerald-400 block mb-0.5">
                  👥 Polite Form (Someone Else&apos;s {selectedNode.role})
                </span>
                <p className="text-xl font-bold font-japanese text-text-primary">{selectedNode.otherKanji}</p>
                <p className="text-xs font-japanese font-semibold text-emerald-600 dark:text-emerald-400">{selectedNode.otherHira}</p>
                <p className="text-[10px] text-text-tertiary italic">{selectedNode.otherRomaji}</p>
              </div>
            </div>

            <p className="text-xs text-text-secondary pt-1 flex items-center gap-1.5">
              <span className="text-accent">💡</span> {selectedNode.tip}
            </p>
          </div>

          <button
            type="button"
            onClick={() => handleAudio(isOwn ? selectedNode.ownHira : selectedNode.otherHira)}
            className="p-3 rounded-xl bg-accent text-white hover:bg-accent/90 shadow-md active:scale-95 transition-all flex items-center gap-2"
            title="Listen to pronunciation"
          >
            <Volume2 size={18} />
            <span className="text-xs font-semibold">
              Hear {isOwn ? 'Humble (内)' : 'Polite (外)'}
            </span>
          </button>
        </div>

        {/* ─── REAL VISUAL TREE WITH CONNECTORS ─── */}
        <div className="relative py-4 px-2 sm:px-6 bg-surface-2/30 border border-border/60 rounded-2xl flex flex-col items-center space-y-6">
          {/* TIER 1: Grandparents */}
          <div className="flex flex-col items-center">
            <span className="text-[10px] font-bold uppercase tracking-wider text-text-tertiary mb-2 bg-surface px-2.5 py-0.5 rounded-full border border-border">
              Generation 1: Grandparents (祖父母)
            </span>
            <div className="flex items-center gap-4 sm:gap-8 relative">
              {TREE_NODES.grandparents.map(renderTreeNode)}
            </div>
          </div>

          {/* Tree Trunk Connector 1 */}
          <div className="w-0.5 h-6 bg-accent/40 relative">
            <span className="w-2 h-2 rounded-full bg-accent absolute -bottom-1 -left-[3px]" />
          </div>

          {/* TIER 2: Parents */}
          <div className="flex flex-col items-center">
            <span className="text-[10px] font-bold uppercase tracking-wider text-text-tertiary mb-2 bg-surface px-2.5 py-0.5 rounded-full border border-border">
              Generation 2: Parents (両親)
            </span>
            <div className="flex items-center gap-4 sm:gap-8 relative">
              {TREE_NODES.parents.map(renderTreeNode)}
            </div>
          </div>

          {/* Tree Trunk Connector 2 */}
          <div className="w-0.5 h-6 bg-accent/40 relative">
            <span className="w-2 h-2 rounded-full bg-accent absolute -bottom-1 -left-[3px]" />
          </div>

          {/* TIER 3: Self & Siblings */}
          <div className="flex flex-col items-center w-full max-w-2xl">
            <span className="text-[10px] font-bold uppercase tracking-wider text-text-tertiary mb-2 bg-surface px-2.5 py-0.5 rounded-full border border-border">
              Generation 3: Self & Siblings (兄弟姉妹)
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 sm:gap-3 w-full">
              {TREE_NODES.siblings.map(renderTreeNode)}
            </div>
          </div>

          {/* Tree Connector 3 */}
          <div className="w-0.5 h-6 bg-accent/40 relative">
            <span className="w-2 h-2 rounded-full bg-accent absolute -bottom-1 -left-[3px]" />
          </div>

          {/* TIER 4: Spouse & Children */}
          <div className="flex flex-col items-center w-full max-w-xl">
            <span className="text-[10px] font-bold uppercase tracking-wider text-text-tertiary mb-2 bg-surface px-2.5 py-0.5 rounded-full border border-border">
              Spouse & Children (配偶者・子ども)
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 w-full">
              {[...TREE_NODES.spouse, ...TREE_NODES.children].map(renderTreeNode)}
            </div>
          </div>
        </div>
      </div>

      {/* ─── 2. COMPLETE SIDE-BY-SIDE COMPARISON TABLE ─── */}
      <div className="bg-surface border border-border rounded-2xl p-4 sm:p-6 shadow-card space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-bold text-text-primary flex items-center gap-2">
              <span>Humble vs Polite Family Comparison Chart</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-surface-2 text-text-secondary border border-border">
                {comparisonList.length} Terms
              </span>
            </h3>
            <p className="text-xs text-text-tertiary">
              Complete reference of in-group (内) humble forms vs out-group (外) respectful forms
            </p>
          </div>

          {/* Table Search */}
          <div className="w-full sm:w-64 relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary" />
            <input
              type="text"
              value={tableSearch}
              onChange={(e) => setTableSearch(e.target.value)}
              placeholder="Search relationships…"
              className="w-full pl-9 pr-3 py-1.5 border border-border rounded-lg text-xs bg-surface focus:outline-none focus:border-accent"
            />
          </div>
        </div>

        <div className="overflow-x-auto rounded-xl border border-border shadow-card">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-surface-2 border-b border-border">
                <th className="text-left px-4 py-3 text-xs font-bold text-text-tertiary uppercase">Relationship</th>
                <th className="text-left px-4 py-3 text-xs font-bold text-blue-600 uppercase">My Family (Humble / 内)</th>
                <th className="text-left px-4 py-3 text-xs font-bold text-emerald-600 uppercase">Others&apos; Family (Polite / 外)</th>
                <th className="text-left px-4 py-3 text-xs font-bold text-text-tertiary uppercase">Usage Note</th>
              </tr>
            </thead>
            <tbody>
              {comparisonList.map(({ own, other }, i) => (
                <tr key={i} className="border-b border-border last:border-0 hover:bg-surface-2/50 transition-colors">
                  <td className="px-4 py-3 font-medium text-text-primary">
                    {own.meaning.replace('my ', '').charAt(0).toUpperCase() + own.meaning.replace('my ', '').slice(1)}
                  </td>
                  {/* Humble */}
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div>
                        <p className="font-japanese font-bold text-blue-600 dark:text-blue-400">
                          {own.hiragana} {own.kanji && <span className="text-xs text-text-tertiary">({own.kanji})</span>}
                        </p>
                        <p className="text-[10px] text-text-tertiary italic">{own.romaji}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleAudio(own.hiragana)}
                        className="p-1 rounded hover:bg-surface text-text-tertiary hover:text-accent transition-colors"
                        title={`Listen to ${own.hiragana}`}
                      >
                        <Volume2 size={13} />
                      </button>
                    </div>
                  </td>
                  {/* Polite */}
                  <td className="px-4 py-3">
                    {other ? (
                      <div className="flex items-center gap-2">
                        <div>
                          <p className="font-japanese font-bold text-emerald-600 dark:text-emerald-400">
                            {other.hiragana} {other.kanji && <span className="text-xs text-text-tertiary">({other.kanji})</span>}
                          </p>
                          <p className="text-[10px] text-text-tertiary italic">{other.romaji}</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleAudio(other.hiragana)}
                          className="p-1 rounded hover:bg-surface text-text-tertiary hover:text-accent transition-colors"
                          title={`Listen to ${other.hiragana}`}
                        >
                          <Volume2 size={13} />
                        </button>
                      </div>
                    ) : (
                      <span className="text-text-tertiary">—</span>
                    )}
                  </td>
                  {/* Note */}
                  <td className="px-4 py-3 text-xs text-text-secondary">
                    {own.note || other?.note || '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
