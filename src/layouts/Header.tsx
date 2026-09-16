import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Search, Flame, Menu } from 'lucide-react'
import { useApp } from '@/app/AppContext'
import { MobileDrawer } from './Sidebar'

// Page titles with Japanese subtitle
const PAGE_META: Record<string, { en: string; ja: string }> = {
  '/dashboard':  { en: 'Dashboard',    ja: 'ホーム' },
  '/learn':      { en: 'Learn',        ja: 'まなぶ' },
  '/grammar':    { en: 'Grammar',      ja: '文法' },
  '/vocabulary': { en: 'Vocabulary',   ja: '語彙' },
  '/reference':  { en: 'N5 Reference', ja: '参照' },
  '/practice':   { en: 'Practice',     ja: '練習' },
  '/revision':   { en: 'Revision',     ja: '復習' },
  '/about':      { en: 'About',        ja: 'について' },
  '/settings':   { en: 'Settings',     ja: '設定' },
}

interface HeaderProps {
  onSearchOpen?: () => void
}

export function Header({ onSearchOpen }: HeaderProps) {
  const { progress } = useApp()
  const location = useLocation()
  const [drawerOpen, setDrawerOpen] = useState(false)

  const pathKey = '/' + location.pathname.split('/')[1]
  const meta = PAGE_META[pathKey] ?? { en: 'Lesson', ja: 'レッスン' }

  return (
    <>
      <header className="sticky top-0 z-30 bg-surface/95 backdrop-blur-sm border-b border-border flex items-center gap-3 px-4 md:px-6 h-14">

        {/* Thin red accent line at very bottom of header — Japanese aesthetic */}
        <div className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

        {/* Mobile menu button */}
        <button
          className="lg:hidden p-1.5 rounded-lg text-text-secondary hover:bg-surface-2 transition-colors"
          onClick={() => setDrawerOpen(true)}
          aria-label="Open navigation menu"
        >
          <Menu size={20} />
        </button>

        {/* Page title — desktop shows page name, mobile shows JAPANORA mini brand */}
        <div className="flex-1 flex items-center gap-2 min-w-0">
          {/* Mobile: show brand */}
          <div className="lg:hidden flex items-center gap-2">
            <img
              src="/images/japanora-logo.jpg"
              alt="JAPANORA"
              className="w-7 h-7 rounded-lg object-contain bg-white border border-border"
            />
            <span className="text-sm font-black tracking-widest text-text-primary">JAPANORA</span>
          </div>
          {/* Desktop: show page title */}
          <div className="hidden lg:flex items-baseline gap-2">
            <h1 className="text-base font-bold text-text-primary">{meta.en}</h1>
            <span className="text-sm font-japanese text-text-tertiary">{meta.ja}</span>
          </div>
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          {/* Search — desktop */}
          <button
            onClick={onSearchOpen}
            className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-2 border border-border text-text-secondary text-sm hover:border-border-strong transition-colors"
            aria-label="Search"
          >
            <Search size={14} />
            <span className="text-[13px]">Search…</span>
            <kbd className="text-[10px] bg-border px-1 rounded font-mono">⌘K</kbd>
          </button>
          {/* Search — mobile */}
          <button
            onClick={onSearchOpen}
            className="md:hidden p-1.5 rounded-lg text-text-secondary hover:bg-surface-2 transition-colors"
            aria-label="Search"
          >
            <Search size={18} />
          </button>

          {/* Study streak */}
          <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-warning-soft border border-warning/20">
            <Flame size={14} className="text-warning" />
            <span className="text-[13px] font-bold text-warning">{progress.studyStreak}</span>
            <span className="text-[10px] text-warning/70 hidden sm:block font-japanese">日</span>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  )
}
