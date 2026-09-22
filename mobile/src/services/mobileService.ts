import { Capacitor } from '@capacitor/core'
import { StatusBar, Style } from '@capacitor/status-bar'
import { SplashScreen } from '@capacitor/splash-screen'
import { Haptics, ImpactStyle, NotificationType } from '@capacitor/haptics'
import { App as CapApp } from '@capacitor/app'

export const isNative = Capacitor.isNativePlatform()

export async function initMobileApp() {
  if (!isNative) return

  try {
    // Hide splash screen after app initialization
    await SplashScreen.hide()
  } catch {
    // Ignore if running on web
  }

  try {
    // Android hardware back button handler
    CapApp.addListener('backButton', ({ canGoBack }) => {
      if (canGoBack) {
        window.history.back()
      } else {
        CapApp.exitApp()
      }
    })
  } catch {
    // Ignore if not supported
  }
}

export async function updateMobileStatusBar(isDark: boolean) {
  if (!isNative) return

  try {
    await StatusBar.setStyle({
      style: isDark ? Style.Dark : Style.Light,
    })
    await StatusBar.setBackgroundColor({
      color: isDark ? '#0d0e15' : '#f8f7f4',
    })
  } catch {
    // Ignore in web / unsupported
  }
}

export async function triggerHaptic(type: 'light' | 'medium' | 'success' | 'warning' | 'error' = 'light') {
  if (!isNative) {
    // Optional web vibration fallback if supported
    if ('vibrate' in navigator) {
      if (type === 'light') navigator.vibrate(10)
      else if (type === 'medium') navigator.vibrate(20)
      else if (type === 'success') navigator.vibrate([15, 30, 20])
      else if (type === 'error') navigator.vibrate([30, 50, 30])
    }
    return
  }

  try {
    if (type === 'light') {
      await Haptics.impact({ style: ImpactStyle.Light })
    } else if (type === 'medium') {
      await Haptics.impact({ style: ImpactStyle.Medium })
    } else if (type === 'success') {
      await Haptics.notification({ type: NotificationType.Success })
    } else if (type === 'warning') {
      await Haptics.notification({ type: NotificationType.Warning })
    } else if (type === 'error') {
      await Haptics.notification({ type: NotificationType.Error })
    }
  } catch {
    // Ignore error
  }
}
