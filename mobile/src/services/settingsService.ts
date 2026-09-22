import type { AppSettings } from '@/types'
import { storageService } from './storageService'

const SETTINGS_KEY = 'app_settings'

const DEFAULT_SETTINGS: AppSettings = {
  displayMode: 'hiragana-only',   // hiragana-first as required
  showFurigana: false,
  showRomaji: true,
  theme: 'light',
  dailyGoalMinutes: 20,
  soundEnabled: true,
  speechRate: 0.85,
  voiceGender: 'female',
  voiceName: '',
  autoPlayAudio: false,
  revisionReminderEnabled: true,
  revisionReminderTime: '09:00',
}

export const settingsService = {
  getSettings(): AppSettings {
    const saved = storageService.get<Partial<AppSettings>>(SETTINGS_KEY, {})
    const merged: AppSettings = { ...DEFAULT_SETTINGS, ...saved }
    if (typeof merged.speechRate !== 'number' || isNaN(merged.speechRate) || merged.speechRate <= 0) {
      merged.speechRate = DEFAULT_SETTINGS.speechRate
    }
    if (!merged.voiceGender || (merged.voiceGender !== 'female' && merged.voiceGender !== 'male')) {
      merged.voiceGender = 'female'
    }
    return merged
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
