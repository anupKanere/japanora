import { NavLink, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard,
  BookOpen,
  FileText,
  BookMarked,
  Dumbbell,
  RefreshCcw,
  Settings,
  BookText,
  Info,
  X,
  Languages,
} from 'lucide-react'

// ─── Nav items — Japanese labels included ─────────────────────────────────────

interface NavItem {
  to: string
  icon: React.ReactNode
  label: string
  labelJa: string
  badge?: number
  section?: 'divider'
}

const navItems: NavItem[] = [
  { to: '/dashboard',  icon: <LayoutDashboard size={17} />, label: 'Dashboard',    labelJa: 'ホーム'     },
  { to: '/kana',       icon: <Languages size={17} />,       label: 'Kana (あ/ア)',  labelJa: '仮名'       },
  { to: '/reference',  icon: <BookText size={17} />,        label: 'N5 Reference', labelJa: '参照'       },
  { to: '/vocabulary', icon: <BookMarked size={17} />,      label: 'Vocabulary',   labelJa: '語彙'       },
  { to: '/grammar',    icon: <FileText size={17} />,        label: 'Grammar',      labelJa: '文法'       },
  { to: '/learn',      icon: <BookOpen size={17} />,        label: 'Learn',        labelJa: 'まなぶ'     },
  { to: '/practice',   icon: <Dumbbell size={17} />,        label: 'Practice',     labelJa: '練習'       },
  { to: '/revision',   icon: <RefreshCcw size={17} />,      label: 'Revision',     labelJa: '復習', badge: 12 },
]

const bottomNavItems: NavItem[] = [
  { to: '/about',    icon: <Info size={17} />,     label: 'About',    labelJa: 'について' },
  { to: '/settings', icon: <Settings size={17} />, label: 'Settings', labelJa: '設定'     },
]

// ─── Sidebar (desktop) ────────────────────────────────────────────────────────

export function Sidebar() {
  return (
    <aside className="hidden lg:flex flex-col w-60 min-h-screen bg-surface border-r border-border fixed top-0 left-0 z-40 overflow-hidden">

      {/* Top decorative strip */}
      <div className="h-1 w-full bg-gradient-to-r from-accent via-red-400 to-rose-300 flex-shrink-0" />

      {/* JAPANORA Brand Logo */}
      <div className="px-4 pt-4 pb-3 border-b border-border">
        <div className="flex items-center gap-3 mb-2">
          {/* Logo image */}
          <img
            src="/images/japanora-logo.jpg"
            alt="JAPANORA Logo"
            className="w-10 h-10 rounded-xl object-contain bg-white shadow-sm border border-border flex-shrink-0"
          />
          <div className="min-w-0">
            <p className="text-base font-black tracking-widest text-text-primary leading-none">JAPANORA</p>
            <p className="text-[9px] text-text-tertiary leading-tight tracking-wide mt-0.5">The World of Japan</p>
          </div>
        </div>
        {/* Pillar tags */}
        <div className="flex flex-wrap gap-1 mt-1.5">
          {['Language','Culture','Arts','Dance','Traditions','Lifestyle'].map(p => (
            <span key={p} className="text-[8px] font-semibold text-accent/70 bg-accent/8 border border-accent/15 px-1.5 py-0.5 rounded-full tracking-wide">{p}</span>
          ))}
        </div>
      </div>

      {/* Level badge */}
      <div className="mx-4 mt-3 mb-1 px-3 py-2 rounded-xl bg-gradient-to-r from-accent/10 to-rose-50 border border-accent/20 flex items-center justify-between">
        <div>
          <p className="text-[9px] text-text-tertiary uppercase tracking-wider font-semibold">Current Level</p>
          <p className="text-sm font-bold text-accent">JLPT N5</p>
        </div>
        <span className="text-2xl font-japanese font-bold text-accent/20 select-none">N5</span>
      </div>

      {/* Main Nav */}
      <nav className="flex-1 px-3 py-2 space-y-0.5 overflow-y-auto" aria-label="Main navigation">

        <p className="px-3 pt-2 pb-1 text-[9px] font-bold text-text-tertiary uppercase tracking-widest">Study</p>

        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              [
                'flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-150 group relative',
                isActive
                  ? 'bg-accent text-white shadow-sm'
                  : 'text-text-secondary hover:bg-surface-2 hover:text-text-primary',
              ].join(' ')
            }
          >
            {({ isActive }) => (
              <>
                {/* Left active indicator */}
                {isActive && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-white/50 rounded-r-full" />
                )}
                <span className="flex-shrink-0">{item.icon}</span>
                <span className="flex-1 min-w-0">
                  <span className="block leading-tight">{item.label}</span>
                  <span className={`block text-[10px] font-japanese leading-tight ${isActive ? 'text-white/60' : 'text-text-tertiary'}`}>
                    {item.labelJa}
                  </span>
                </span>
                {item.badge && (
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center ${isActive ? 'bg-white/20 text-white' : 'bg-accent text-white'}`}>
                    {item.badge}
                  </span>
                )}
              </>
            )}
          </NavLink>
        ))}

        <div className="pt-3 pb-1">
          <div className="border-t border-border" />
          <p className="px-3 pt-2 pb-1 text-[9px] font-bold text-text-tertiary uppercase tracking-widest">General</p>
        </div>

        {bottomNavItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              [
                'flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-150 group',
                isActive
                  ? 'bg-accent text-white shadow-sm'
                  : 'text-text-secondary hover:bg-surface-2 hover:text-text-primary',
              ].join(' ')
            }
          >
            {({ isActive }) => (
              <>
                <span className="flex-shrink-0">{item.icon}</span>
                <span className="flex-1">
                  <span className="block leading-tight">{item.label}</span>
                  <span className={`block text-[10px] font-japanese leading-tight ${isActive ? 'text-white/60' : 'text-text-tertiary'}`}>
                    {item.labelJa}
                  </span>
                </span>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Footer — Japanese proverb */}
      <div className="px-5 py-4 border-t border-border bg-surface-2/50">
        <p className="text-xs font-japanese text-text-secondary font-medium text-center leading-relaxed">
          一日一歩
        </p>
        <p className="text-[10px] text-text-tertiary text-center mt-0.5">One step every day</p>
      </div>
    </aside>
  )
}

// ─── Mobile bottom navigation ─────────────────────────────────────────────────

const mobileNavItems = navItems.slice(0, 5)

export function MobileNav() {
  return (
    <nav
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-surface/95 backdrop-blur-sm border-t border-border flex"
      aria-label="Mobile navigation"
    >
      {mobileNavItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) =>
            [
              'flex-1 flex flex-col items-center gap-0.5 py-2 text-[9px] font-medium transition-colors',
              isActive ? 'text-accent' : 'text-text-tertiary',
            ].join(' ')
          }
        >
          {item.icon}
          <span className="font-japanese">{item.labelJa}</span>
        </NavLink>
      ))}
    </nav>
  )
}

// ─── Mobile drawer (used by Header) ──────────────────────────────────────────

export function MobileDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const navigate = useNavigate()

  if (!open) return null

  const all = [...navItems, ...bottomNavItems]

  return (
    <div className="lg:hidden fixed inset-0 z-50 flex">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <aside className="relative w-72 max-w-[85vw] bg-surface flex flex-col h-full shadow-xl animate-slide-in-left overflow-hidden">
        {/* Top accent strip */}
        <div className="h-1 w-full bg-gradient-to-r from-accent via-red-400 to-rose-300 flex-shrink-0" />

        <div className="flex items-center justify-between px-4 py-3 border-b border-border">
          <div className="flex items-center gap-2.5">
            <img
              src="/images/japanora-logo.jpg"
              alt="JAPANORA Logo"
              className="w-9 h-9 rounded-xl object-contain bg-white border border-border"
            />
            <div>
              <p className="text-sm font-black tracking-widest text-text-primary leading-none">JAPANORA</p>
              <p className="text-[9px] text-text-tertiary tracking-wide">The World of Japan</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-surface-2 text-text-secondary" aria-label="Close menu">
            <X size={18} />
          </button>
        </div>

        <nav className="flex-1 px-3 py-3 space-y-0.5 overflow-y-auto">
          {all.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={onClose}
              className={({ isActive }) =>
                [
                  'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all',
                  isActive ? 'bg-accent text-white' : 'text-text-secondary hover:bg-surface-2 hover:text-text-primary',
                ].join(' ')
              }
            >
              {({ isActive }) => (
                <>
                  {item.icon}
                  <span>
                    <span className="block">{item.label}</span>
                    <span className={`block text-[10px] font-japanese ${isActive ? 'text-white/60' : 'text-text-tertiary'}`}>{item.labelJa}</span>
                  </span>
                  {item.badge && (
                    <span className={`ml-auto text-[10px] font-bold px-1.5 py-0.5 rounded-full ${isActive ? 'bg-white/20 text-white' : 'bg-accent text-white'}`}>
                      {item.badge}
                    </span>
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-border">
          <button
            onClick={() => { navigate('/dashboard'); onClose() }}
            className="w-full py-2.5 rounded-xl bg-accent text-white text-sm font-semibold"
          >
            ホームへ戻る — Back to Dashboard
          </button>
        </div>
      </aside>
    </div>
  )
}
