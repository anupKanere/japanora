import { useApp } from '@/app/AppContext'
import {
  Eye,
  EyeOff,
  Sun,
  Moon,
  Monitor,
  BookOpen,
  Palette,
  Target,
  Volume2,
  Bell,
  Database,
  Check,
} from 'lucide-react'
import type { AppSettings } from '@/types'

// ─── Toggle component ─────────────────────────────────────────────────────────

function Toggle({ checked, onChange, label }: { checked: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={[
        'relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2',
        checked ? 'bg-accent' : 'bg-border-strong',
      ].join(' ')}
      aria-label={label}
    >
      <span
        className={[
          'inline-block h-4 w-4 transform rounded-full bg-white transition-transform shadow-sm',
          checked ? 'translate-x-6' : 'translate-x-1',
        ].join(' ')}
      />
    </button>
  )
}

// ─── Setting row ──────────────────────────────────────────────────────────────

function SettingRow({ label, description, badge, children }: {
  label: string
  description?: string
  badge?: string
  children: React.ReactNode
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-4 border-b border-border last:border-0">
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <p className="text-sm font-medium text-text-primary">{label}</p>
          {badge && (
            <span className="text-[9px] font-bold bg-warning-soft text-warning px-1.5 py-0.5 rounded-full uppercase tracking-wide">
              {badge}
            </span>
          )}
        </div>
        {description && <p className="text-xs text-text-secondary mt-0.5">{description}</p>}
      </div>
      <div className="flex-shrink-0">{children}</div>
    </div>
  )
}

// ─── Section card ─────────────────────────────────────────────────────────────

function Section({ icon, title, titleJa, children }: {
  icon: React.ReactNode
  title: string
  titleJa: string
  children: React.ReactNode
}) {
  return (
    <div className="bg-surface rounded-2xl border border-border shadow-card overflow-hidden">
      {/* Section header */}
      <div className="flex items-center gap-3 px-5 py-4 border-b border-border bg-surface-2/50">
        <div className="w-8 h-8 rounded-xl bg-accent-soft border border-accent/20 flex items-center justify-center text-accent flex-shrink-0">
          {icon}
        </div>
        <div>
          <h3 className="text-sm font-bold text-text-primary">{title}</h3>
          <p className="text-[11px] font-japanese text-text-secondary font-medium mt-0.5">{titleJa}</p>
        </div>
      </div>
      {/* Content */}
      <div className="px-5">{children}</div>
    </div>
  )
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────

export default function SettingsPage() {
  const { settings, updateSettings } = useApp()

  function setDisplayMode(mode: AppSettings['displayMode']) {
    updateSettings({ displayMode: mode })
  }

  function setTheme(theme: AppSettings['theme']) {
    updateSettings({ theme })
  }

  const themeOptions: { value: AppSettings['theme']; icon: React.ReactNode; label: string; desc: string }[] = [
    { value: 'light', icon: <Sun size={16} />, label: 'Light', desc: 'Classic bright look' },
    { value: 'dark',  icon: <Moon size={16} />, label: 'Dark',  desc: 'Easy on the eyes' },
    { value: 'system', icon: <Monitor size={16} />, label: 'System', desc: 'Follow OS setting' },
  ]

  return (
    <div className="space-y-5 animate-fade-in max-w-2xl">

      {/* Page header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-2xl bg-accent-soft border border-accent/20 flex items-center justify-center text-accent">
          <Palette size={18} />
        </div>
        <div>
          <h2 className="text-xl font-bold text-text-primary">Settings</h2>
          <p className="text-xs font-japanese text-text-tertiary">設定 — Customise your experience</p>
        </div>
      </div>

      {/* ── 1. Japanese Display ── */}
      <Section icon={<BookOpen size={15} />} title="Japanese Display" titleJa="表示設定">
        <p className="text-xs text-text-secondary pt-4 pb-3">
          Choose how Japanese text is shown throughout the app.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pb-4">
          {/* Hiragana only */}
          <button
            id="display-hiragana-only"
            onClick={() => setDisplayMode('hiragana-only')}
            className={[
              'p-4 rounded-xl border-2 text-left transition-all group relative',
              settings.displayMode === 'hiragana-only'
                ? 'border-accent bg-accent-soft'
                : 'border-border hover:border-accent/40 hover:bg-surface-2',
            ].join(' ')}
          >
            {settings.displayMode === 'hiragana-only' && (
              <span className="absolute top-2.5 right-2.5 w-5 h-5 rounded-full bg-accent flex items-center justify-center">
                <Check size={11} className="text-white" />
              </span>
            )}
            <div className="flex items-center gap-2 mb-2">
              <EyeOff size={13} className={settings.displayMode === 'hiragana-only' ? 'text-accent' : 'text-text-tertiary'} />
              <span className="text-xs font-bold text-text-primary">Hiragana Only</span>
            </div>
            <p className="text-[11px] text-text-secondary mb-2">Kanji is hidden — great for beginners.</p>
            <p className="text-sm font-japanese text-accent">わたしは がくせいです。</p>
          </button>

          {/* Hiragana + Kanji */}
          <button
            id="display-hiragana-kanji"
            onClick={() => setDisplayMode('hiragana-kanji')}
            className={[
              'p-4 rounded-xl border-2 text-left transition-all group relative',
              settings.displayMode === 'hiragana-kanji'
                ? 'border-accent bg-accent-soft'
                : 'border-border hover:border-accent/40 hover:bg-surface-2',
            ].join(' ')}
          >
            {settings.displayMode === 'hiragana-kanji' && (
              <span className="absolute top-2.5 right-2.5 w-5 h-5 rounded-full bg-accent flex items-center justify-center">
                <Check size={11} className="text-white" />
              </span>
            )}
            <div className="flex items-center gap-2 mb-2">
              <Eye size={13} className={settings.displayMode === 'hiragana-kanji' ? 'text-accent' : 'text-text-tertiary'} />
              <span className="text-xs font-bold text-text-primary">Hiragana + Kanji</span>
            </div>
            <p className="text-[11px] text-text-secondary mb-2">Hiragana shown first, kanji in brackets.</p>
            <p className="text-sm font-japanese text-accent">わたしは（私は）がくせい（学生）です。</p>
          </button>
        </div>

        <SettingRow
          label="Show Furigana"
          description="Display hiragana reading guides above kanji"
          badge="Soon"
        >
          <Toggle
            checked={settings.showFurigana}
            onChange={(v) => updateSettings({ showFurigana: v })}
            label="Toggle furigana"
          />
        </SettingRow>
      </Section>

      {/* ── 2. Appearance / Theme ── */}
      <Section icon={<Palette size={15} />} title="Appearance" titleJa="外観">

        <div className="pt-4 pb-2">
          <p className="text-xs text-text-secondary mb-3">Choose a colour theme for the interface.</p>
          <div className="grid grid-cols-3 gap-2.5">
            {themeOptions.map((opt) => (
              <button
                id={`theme-${opt.value}`}
                key={opt.value}
                onClick={() => setTheme(opt.value)}
                className={[
                  'relative flex flex-col items-center gap-1.5 p-3.5 rounded-xl border-2 text-sm font-medium transition-all',
                  settings.theme === opt.value
                    ? 'border-accent bg-accent-soft text-accent shadow-sm'
                    : 'border-border text-text-secondary hover:border-accent/40 hover:bg-surface-2',
                ].join(' ')}
              >
                {settings.theme === opt.value && (
                  <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-accent flex items-center justify-center">
                    <Check size={9} className="text-white" />
                  </span>
                )}
                {opt.icon}
                <span className="text-xs font-bold">{opt.label}</span>
                <span className="text-[9px] text-text-tertiary text-center">{opt.desc}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Live preview strip */}
        <div className="my-4 rounded-xl border border-border overflow-hidden">
          <div className="bg-surface-2 px-3 py-2 border-b border-border">
            <p className="text-[10px] font-bold text-text-tertiary uppercase tracking-widest">Preview — current theme</p>
          </div>
          <div className="bg-surface p-3 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center text-white text-xs font-bold flex-shrink-0">A</div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-text-primary truncate">JAPANORA</p>
              <p className="text-[11px] text-text-secondary">The World of Japan</p>
            </div>
            <span className="text-[10px] bg-accent-soft text-accent font-bold px-2 py-0.5 rounded-full border border-accent/20">N5</span>
          </div>
        </div>
      </Section>

      {/* ── 3. Study Goals ── */}
      <Section icon={<Target size={15} />} title="Study Goals" titleJa="学習目標">
        <SettingRow label="Daily goal (minutes)" description="Target study time per day">
          <select
            id="daily-goal-select"
            value={settings.dailyGoalMinutes}
            onChange={(e) => updateSettings({ dailyGoalMinutes: Number(e.target.value) })}
            className="border border-border rounded-lg px-3 py-1.5 text-sm bg-surface text-text-primary focus:outline-none focus:border-accent"
          >
            {[10, 15, 20, 30, 45, 60].map((min) => (
              <option key={min} value={min}>{min} min</option>
            ))}
          </select>
        </SettingRow>
      </Section>

      {/* ── 4. Sound ── */}
      <Section icon={<Volume2 size={15} />} title="Sound" titleJa="音声">
        <SettingRow
          label="Sound effects"
          description="Play sounds for correct / incorrect answers"
          badge="Soon"
        >
          <Toggle
            checked={settings.soundEnabled}
            onChange={(v) => updateSettings({ soundEnabled: v })}
            label="Toggle sound effects"
          />
        </SettingRow>
        <SettingRow
          label="Auto-play audio"
          description="Automatically play pronunciation when a card opens"
          badge="Soon"
        >
          <Toggle
            checked={settings.autoPlayAudio}
            onChange={(v) => updateSettings({ autoPlayAudio: v })}
            label="Toggle auto-play audio"
          />
        </SettingRow>
      </Section>

      {/* ── 5. Revision Reminders ── */}
      <Section icon={<Bell size={15} />} title="Revision Reminders" titleJa="復習リマインダー">
        <SettingRow label="Daily reminder" description="Get a nudge to revise every day">
          <Toggle
            checked={settings.revisionReminderEnabled}
            onChange={(v) => updateSettings({ revisionReminderEnabled: v })}
            label="Toggle revision reminder"
          />
        </SettingRow>

        {settings.revisionReminderEnabled && (
          <SettingRow label="Reminder time" description="What time to receive the notification">
            <input
              type="time"
              value={settings.revisionReminderTime}
              onChange={(e) => updateSettings({ revisionReminderTime: e.target.value })}
              className="border border-border rounded-lg px-3 py-1.5 text-sm bg-surface text-text-primary focus:outline-none focus:border-accent"
            />
          </SettingRow>
        )}
      </Section>

      {/* ── 6. Data ── */}
      <Section icon={<Database size={15} />} title="Data & Storage" titleJa="データ">
        <div className="py-4">
          <p className="text-xs text-text-secondary mb-1">
            Progress is stored locally in your browser. It will be lost if you clear browser data.
          </p>
          <p className="text-[11px] text-text-tertiary font-japanese mb-4">データはブラウザに保存されます。</p>
          <button
            id="reset-progress-btn"
            onClick={() => {
              if (window.confirm('Reset all progress? This cannot be undone.')) {
                localStorage.clear()
                window.location.reload()
              }
            }}
            className="text-xs font-semibold text-accent border border-accent/30 px-4 py-2 rounded-lg hover:bg-accent-soft transition-colors"
          >
            Reset all progress
          </button>
        </div>
      </Section>

    </div>
  )
}
