import { useState, useRef, useEffect } from 'react'
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
  VolumeX,
  Database,
  Check,
  Download,
  Upload,
  Sparkles,
  AlertTriangle,
  X,
  Play,
} from 'lucide-react'
import type { AppSettings } from '@/types'
import { playKanaAudio } from '@/data/kana/kana-data'
import { progressService } from '@/services/progressService'

// ─── Toggle component ─────────────────────────────────────────────────────────

function Toggle({
  checked,
  onChange,
  label,
}: {
  checked: boolean
  onChange: (v: boolean) => void
  label: string
}) {
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

function SettingRow({
  label,
  description,
  badge,
  children,
}: {
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
            <span className="text-[9px] font-bold bg-accent-soft text-accent px-1.5 py-0.5 rounded-full uppercase tracking-wide border border-accent/20">
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

function Section({
  icon,
  title,
  titleJa,
  children,
}: {
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
  const { settings, updateSettings, refreshProgress } = useApp()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [notificationPermission, setNotificationPermission] = useState<NotificationPermission>('default')
  const [notificationStatusMsg, setNotificationStatusMsg] = useState<string | null>(null)
  const [toastMessage, setToastMessage] = useState<string | null>(null)
  const [resetModalOpen, setResetModalOpen] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      setNotificationPermission(Notification.permission)
    }
  }, [])

  function showToast(msg: string) {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 3500)
  }

  function setDisplayMode(mode: AppSettings['displayMode']) {
    updateSettings({ displayMode: mode })
    showToast('Display preference updated')
  }

  function setTheme(theme: AppSettings['theme']) {
    updateSettings({ theme })
  }

  const themeOptions: { value: AppSettings['theme']; icon: React.ReactNode; label: string; desc: string }[] = [
    { value: 'light', icon: <Sun size={16} />, label: 'Light', desc: 'Classic bright look' },
    { value: 'dark', icon: <Moon size={16} />, label: 'Dark', desc: 'Easy on the eyes' },
    { value: 'system', icon: <Monitor size={16} />, label: 'System', desc: 'Follow OS setting' },
  ]

  // ─── Audio Test ───
  function handleTestAudio(rate?: number) {
    playKanaAudio('こんにちは！今日も日本語の勉強を頑張りましょう！', rate)
  }

  // ─── Notification Handlers ───
  async function handleRequestNotification() {
    if (typeof window === 'undefined' || !('Notification' in window)) {
      setNotificationStatusMsg('Web Notifications are not supported in this browser.')
      return
    }
    try {
      const perm = await Notification.requestPermission()
      setNotificationPermission(perm)
      if (perm === 'granted') {
        setNotificationStatusMsg('Notifications enabled successfully!')
        new Notification('JAPANORA リマインダー', {
          body: '復習のリマインダーが有効になりました！ Daily Japanese review reminders enabled.',
          icon: '/images/japanora-logo.jpg',
        })
      } else if (perm === 'denied') {
        setNotificationStatusMsg('Notification permission was blocked in your browser settings.')
      }
    } catch {
      setNotificationStatusMsg('Failed to request notification permission.')
    }
  }

  function handleSendTestNotification() {
    if (typeof window === 'undefined' || !('Notification' in window)) return
    if (Notification.permission === 'granted') {
      new Notification('JAPANORA 復習の時間です！', {
        body: `It is ${settings.revisionReminderTime || '09:00'}. You have items waiting in your Revision queue!`,
        icon: '/images/japanora-logo.jpg',
      })
      showToast('Test notification sent!')
    } else {
      handleRequestNotification()
    }
  }

  // ─── Export / Backup ───
  function handleExportBackup() {
    const jsonStr = progressService.exportBackupData()
    const blob = new Blob([jsonStr], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    const dateStr = new Date().toISOString().split('T')[0]
    a.href = url
    a.download = `japanora-backup-${dateStr}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    showToast('Backup downloaded successfully!')
  }

  // ─── Import / Restore ───
  function handleFileImport(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      const content = event.target?.result as string
      if (!content) return
      const success = progressService.importBackupData(content)
      if (success) {
        refreshProgress()
        showToast('Backup restored successfully! All stats updated.')
      } else {
        alert('Invalid backup file. Please select a valid JAPANORA JSON backup.')
      }
    }
    reader.readAsText(file)
    // reset input
    e.target.value = ''
  }

  function handleResetProgressOnly() {
    progressService.resetProgress()
    refreshProgress()
    setResetModalOpen(false)
    showToast('Learning progress reset to zero. Clean slate ready!')
  }

  function handleLoadDemoData() {
    progressService.loadSampleDemoProgress()
    refreshProgress()
    setResetModalOpen(false)
    showToast('Sample demo progress loaded!')
  }

  function handleResetAll() {
    localStorage.clear()
    window.location.reload()
  }

  return (
    <div className="space-y-6 animate-fade-in max-w-2xl pb-16">
      {/* Toast notification banner */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-text-primary text-surface px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2.5 text-xs font-semibold animate-slide-up border border-border">
          <Sparkles size={15} className="text-accent flex-shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

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
          label="Show Romaji Readings"
          description="Display Latin alphabet (Romaji) assistance in vocabulary and reference cards"
        >
          <Toggle
            checked={settings.showRomaji ?? true}
            onChange={(v) => {
              updateSettings({ showRomaji: v })
              showToast(v ? 'Romaji reading assistance enabled' : 'Romaji hidden for full immersion')
            }}
            label="Toggle Romaji readings"
          />
        </SettingRow>

        <SettingRow
          label="Furigana Guides"
          description="Display small hiragana readings above kanji in sentences"
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

      {/* ── 3. Sound & Audio Settings ── */}
      <Section icon={<Volume2 size={15} />} title="Audio & Pronunciation" titleJa="音声・発音設定">
        <SettingRow
          label="Sound & Pronunciation Audio"
          description="Enable native speech playback and quiz audio"
        >
          <div className="flex items-center gap-2">
            {settings.soundEnabled ? <Volume2 size={16} className="text-accent" /> : <VolumeX size={16} className="text-text-tertiary" />}
            <Toggle
              checked={settings.soundEnabled}
              onChange={(v) => {
                updateSettings({ soundEnabled: v })
                showToast(v ? 'Audio enabled' : 'Audio muted')
              }}
              label="Toggle sound"
            />
          </div>
        </SettingRow>

        <SettingRow
          label="Speech Speed (Pronunciation Rate)"
          description="Adjust how quickly Japanese sentences and kana are spoken"
        >
          <div className="flex gap-1.5">
            {[
              { rate: 0.75, label: '0.75x', desc: 'Slow' },
              { rate: 0.85, label: '0.85x', desc: 'Normal' },
              { rate: 1.0, label: '1.0x', desc: 'Native' },
            ].map((s) => (
              <button
                key={s.rate}
                disabled={!settings.soundEnabled}
                onClick={() => {
                  updateSettings({ speechRate: s.rate })
                  handleTestAudio(s.rate)
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                  (settings.speechRate ?? 0.85) === s.rate
                    ? 'bg-accent text-white border-accent'
                    : 'bg-surface border-border text-text-secondary hover:bg-surface-2'
                }`}
              >
                <span>{s.label}</span>
                <span className="text-[9px] opacity-75 ml-1">({s.desc})</span>
              </button>
            ))}
          </div>
        </SettingRow>

        <SettingRow
          label="Test Audio"
          description="Sample Japanese pronunciation using your configured speed"
        >
          <button
            onClick={() => handleTestAudio()}
            className="px-3 py-1.5 rounded-lg bg-surface border border-border hover:bg-surface-2 text-xs font-bold text-accent transition-all flex items-center gap-1.5 shadow-xs active:scale-95"
          >
            <Play size={12} fill="currentColor" />
            <span>Test Voice 🔊</span>
          </button>
        </SettingRow>

        <SettingRow
          label="Auto-play Audio"
          description="Automatically play pronunciation when opening kana or kanji detail cards"
        >
          <Toggle
            checked={settings.autoPlayAudio}
            onChange={(v) => updateSettings({ autoPlayAudio: v })}
            label="Toggle auto-play audio"
          />
        </SettingRow>
      </Section>

      {/* ── 4. Study Goals & Revision Reminders ── */}
      <Section icon={<Target size={15} />} title="Study Goals & Reminders" titleJa="学習目標とリマインダー">
        <SettingRow label="Daily Goal (Minutes)" description="Target daily study time tracked on your Dashboard">
          <select
            id="daily-goal-select"
            value={settings.dailyGoalMinutes}
            onChange={(e) => {
              updateSettings({ dailyGoalMinutes: Number(e.target.value) })
              showToast(`Daily goal set to ${e.target.value} minutes`)
            }}
            className="border border-border rounded-lg px-3 py-1.5 text-sm bg-surface text-text-primary focus:outline-none focus:border-accent"
          >
            {[10, 15, 20, 30, 45, 60].map((min) => (
              <option key={min} value={min}>{min} min</option>
            ))}
          </select>
        </SettingRow>

        <SettingRow label="Daily Revision Reminder" description="Receive a notification to review your SRS queue">
          <Toggle
            checked={settings.revisionReminderEnabled}
            onChange={(v) => {
              updateSettings({ revisionReminderEnabled: v })
              if (v && notificationPermission !== 'granted') {
                handleRequestNotification()
              }
            }}
            label="Toggle revision reminder"
          />
        </SettingRow>

        {settings.revisionReminderEnabled && (
          <>
            <SettingRow label="Reminder Time" description="Scheduled time for your daily review nudge">
              <input
                type="time"
                value={settings.revisionReminderTime}
                onChange={(e) => updateSettings({ revisionReminderTime: e.target.value })}
                className="border border-border rounded-lg px-3 py-1.5 text-sm bg-surface text-text-primary focus:outline-none focus:border-accent"
              />
            </SettingRow>

            <SettingRow
              label="Browser Notification Permission"
              description={
                notificationPermission === 'granted'
                  ? 'Notifications are permitted by your browser.'
                  : notificationPermission === 'denied'
                  ? 'Notifications are blocked in your browser settings.'
                  : 'Click below to grant notification permission.'
              }
            >
              <div className="flex items-center gap-2">
                {notificationPermission === 'granted' ? (
                  <button
                    onClick={handleSendTestNotification}
                    className="px-3 py-1.5 rounded-lg bg-surface border border-border hover:bg-surface-2 text-xs font-bold text-accent transition-all shadow-xs"
                  >
                    Send Test Reminder 🔔
                  </button>
                ) : (
                  <button
                    onClick={handleRequestNotification}
                    className="px-3 py-1.5 rounded-lg bg-accent text-white text-xs font-bold hover:opacity-90 transition-all shadow-xs"
                  >
                    Enable Notifications
                  </button>
                )}
              </div>
            </SettingRow>

            {notificationStatusMsg && (
              <div className="py-2 text-xs font-semibold text-accent animate-fade-in">
                {notificationStatusMsg}
              </div>
            )}
          </>
        )}
      </Section>

      {/* ── 5. Data Backup & Storage ── */}
      <Section icon={<Database size={15} />} title="Data & Storage" titleJa="データ管理">
        <div className="py-4 space-y-4">
          <p className="text-xs text-text-secondary leading-relaxed">
            Your progress is saved locally in your browser. Use the Backup feature to save your progress to a file, or restore it on another computer or browser.
          </p>

          {/* Backup & Restore Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              onClick={handleExportBackup}
              className="p-3 rounded-xl border border-border bg-surface hover:bg-surface-2 hover:border-accent/40 text-left transition-all flex items-center gap-3 shadow-xs group"
            >
              <div className="w-8 h-8 rounded-lg bg-accent-soft text-accent flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                <Download size={16} />
              </div>
              <div>
                <p className="text-xs font-bold text-text-primary">Export Backup (.json)</p>
                <p className="text-[10px] text-text-secondary">Download your progress file</p>
              </div>
            </button>

            <button
              onClick={() => fileInputRef.current?.click()}
              className="p-3 rounded-xl border border-border bg-surface hover:bg-surface-2 hover:border-accent/40 text-left transition-all flex items-center gap-3 shadow-xs group"
            >
              <div className="w-8 h-8 rounded-lg bg-accent-soft text-accent flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                <Upload size={16} />
              </div>
              <div>
                <p className="text-xs font-bold text-text-primary">Restore Backup (.json)</p>
                <p className="text-[10px] text-text-secondary">Upload a saved progress file</p>
              </div>
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".json"
              onChange={handleFileImport}
              className="hidden"
            />
          </div>

          {/* Danger Zone */}
          <div className="pt-3 border-t border-border flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-rose-600 dark:text-rose-400">Reset Options</p>
              <p className="text-[11px] text-text-secondary">Clear progress or restore defaults</p>
            </div>
            <button
              id="reset-progress-btn"
              onClick={() => setResetModalOpen(true)}
              className="text-xs font-bold text-rose-600 dark:text-rose-400 border border-rose-500/30 px-3.5 py-1.5 rounded-lg hover:bg-rose-500/10 transition-colors"
            >
              Reset Data…
            </button>
          </div>
        </div>
      </Section>

      {/* ── Reset Confirmation Modal ── */}
      {resetModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in" role="dialog" aria-modal="true">
          <div className="bg-surface rounded-2xl border border-border max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <div className="flex items-center gap-2 text-rose-500">
                <AlertTriangle size={18} />
                <h3 className="text-base font-bold text-text-primary">Reset Options</h3>
              </div>
              <button
                onClick={() => setResetModalOpen(false)}
                className="p-1 rounded-lg hover:bg-surface-2 text-text-secondary"
              >
                <X size={16} />
              </button>
            </div>

            <p className="text-xs text-text-secondary leading-relaxed">
              Please choose which data you would like to reset. Consider exporting a backup before resetting.
            </p>

            <div className="space-y-2">
              <button
                onClick={handleResetProgressOnly}
                className="w-full p-3 rounded-xl border border-border hover:border-accent text-left bg-surface-2/60 hover:bg-surface-2 transition-all"
              >
                <p className="text-xs font-bold text-text-primary">Reset Learning Progress to Zero (Clean Slate)</p>
                <p className="text-[11px] text-text-secondary">
                  Wipes all completed lessons, vocab, kanji, and review queues to 0. Starts you fresh from Lesson 1. Keeps your theme & preferences.
                </p>
              </button>

              <button
                onClick={handleLoadDemoData}
                className="w-full p-3 rounded-xl border border-accent/30 hover:border-accent text-left bg-accent-soft/20 hover:bg-accent-soft/40 transition-all"
              >
                <p className="text-xs font-bold text-accent">Load Sample Demo Data</p>
                <p className="text-[11px] text-text-secondary">
                  Populate demo lessons, vocab, and grammar points for testing and previewing features.
                </p>
              </button>

              <button
                onClick={handleResetAll}
                className="w-full p-3 rounded-xl border border-rose-500/30 hover:border-rose-500 text-left bg-rose-500/5 hover:bg-rose-500/10 transition-all"
              >
                <p className="text-xs font-bold text-rose-600 dark:text-rose-400">Factory Reset (Full Wipe)</p>
                <p className="text-[11px] text-text-secondary">
                  Completely wipes all browser storage and reloads the application.
                </p>
              </button>
            </div>

            <button
              onClick={() => setResetModalOpen(false)}
              className="w-full py-2.5 rounded-xl bg-surface border border-border text-xs font-bold text-text-primary hover:bg-surface-2 transition-all"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
