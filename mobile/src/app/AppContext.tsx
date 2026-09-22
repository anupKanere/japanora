import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import type { LearnerProgress, AppSettings } from '@/types'
import { progressService } from '@/services/progressService'
import { settingsService } from '@/services/settingsService'

import { initMobileApp, updateMobileStatusBar } from '@/services/mobileService'

interface AppContextValue {
  progress: LearnerProgress
  settings: AppSettings
  refreshProgress: () => void
  updateSettings: (partial: Partial<AppSettings>) => void
  showKanji: boolean
}

const AppContext = createContext<AppContextValue | null>(null)

// ─── Apply theme to <html> element ────────────────────────────────────────────

function applyTheme(theme: AppSettings['theme']) {
  const root = document.documentElement
  let isDark = false
  if (theme === 'dark') {
    root.classList.add('dark')
    isDark = true
  } else if (theme === 'light') {
    root.classList.remove('dark')
    isDark = false
  } else {
    // 'system' — follow OS preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    if (prefersDark) {
      root.classList.add('dark')
      isDark = true
    } else {
      root.classList.remove('dark')
      isDark = false
    }
  }
  updateMobileStatusBar(isDark)
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [progress, setProgress] = useState<LearnerProgress>(() =>
    progressService.getProgress()
  )
  const [settings, setSettings] = useState<AppSettings>(() =>
    settingsService.getSettings()
  )

  const refreshProgress = useCallback(() => {
    setProgress(progressService.getProgress())
  }, [])

  const updateSettings = useCallback((partial: Partial<AppSettings>) => {
    const updated = settingsService.updateSettings(partial)
    setSettings(updated)
    // Apply theme immediately if it changed
    if (partial.theme !== undefined) {
      applyTheme(updated.theme)
    }
  }, [])

  // Apply theme on initial load
  useEffect(() => {
    applyTheme(settings.theme)

    // Listen for system-level dark mode changes when theme = 'system'
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleSystemChange = () => {
      if (settings.theme === 'system') {
        applyTheme('system')
      }
    }
    mediaQuery.addEventListener('change', handleSystemChange)
    return () => mediaQuery.removeEventListener('change', handleSystemChange)
  }, [settings.theme])

  useEffect(() => {
    initMobileApp()
    progressService.updateStreak()
    refreshProgress()
  }, [refreshProgress])

  const showKanji = settings.displayMode === 'hiragana-kanji'

  return (
    <AppContext.Provider value={{ progress, settings, refreshProgress, updateSettings, showKanji }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp(): AppContextValue {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used inside AppProvider')
  return ctx
}
