import type { AppSettings } from '@/types'
import { storageService } from './storageService'

const SETTINGS_KEY = 'app_settings'

const DEFAULT_SETTINGS: AppSettings = {
  displayMode: 'hiragana-only',   // hiragana-first as required
  showFurigana: false,
  theme: 'light',
  dailyGoalMinutes: 20,
  soundEnabled: true,
  autoPlayAudio: false,
  revisionReminderEnabled: true,
  revisionReminderTime: '09:00',
}

export const settingsService = {
  getSettings(): AppSettings {
    return storageService.get<AppSettings>(SETTINGS_KEY, DEFAULT_SETTINGS)
  },

  updateSettings(partial: Partial<AppSettings>): AppSettings {
    const current = this.getSettings()
    const updated = { ...current, ...partial }
    storageService.set(SETTINGS_KEY, updated)
    return updated
  },

  resetSettings(): AppSettings {
    storageService.set(SETTINGS_KEY, DEFAULT_SETTINGS)
    return DEFAULT_SETTINGS
  },

  shouldShowKanji(): boolean {
    return this.getSettings().displayMode === 'hiragana-kanji'
  },
}
