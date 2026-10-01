import { Capacitor } from '@capacitor/core'
import { TextToSpeech, QueueStrategy } from '@capacitor-community/text-to-speech'
import { settingsService } from './settingsService'

interface VoiceConfig {
  voice: SpeechSynthesisVoice | null
  pitch: number
}

interface NativeVoiceItem {
  index: number
  voiceURI: string
  name: string
  lang: string
}

class AudioService {
  private voices: SpeechSynthesisVoice[] = []
  private nativeVoices: NativeVoiceItem[] = []
  private nativeVoicesLoaded = false
  private activeUtterance: SpeechSynthesisUtterance | null = null
  private nativeSpeaking = false

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.populateVoices()
      if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = () => {
          this.populateVoices()
        }
      }
    }
    if (Capacitor.isNativePlatform()) {
      this.loadNativeVoices().catch(() => {})
    }
  }

  public async loadNativeVoices(): Promise<void> {
    if (!Capacitor.isNativePlatform()) return
    try {
      const res = await TextToSpeech.getSupportedVoices()
      if (res && res.voices && res.voices.length > 0) {
        this.nativeVoices = res.voices
          .map((v, idx) => ({
            index: idx,
            voiceURI: ((v as any).voiceURI || v.name || ''),
            name: v.name || '',
            lang: v.lang || '',
          }))
          .filter((v) => v.lang.startsWith('ja') || v.lang === 'ja-JP' || v.lang === 'ja')
      }
      this.nativeVoicesLoaded = true
    } catch (e) {
      console.warn('Could not query native voices:', e)
    }
  }

  private resolveNativeVoiceIndex(gender: 'female' | 'male'): number | undefined {
    if (this.nativeVoices.length === 0) return undefined

    const malePatterns = ['jad', 'htm', 'male', 'man', 'boy', 'daichi', 'takumi', 'otoya', 'keita', '男性']
    const femalePatterns = ['jac', 'jab', 'jaa', 'hfn', 'female', 'woman', 'girl', 'kyoko', 'nanami', 'ayumi', '女性']

    if (gender === 'male') {
      const maleVoice = this.nativeVoices.find((v) => {
        const full = `${v.voiceURI} ${v.name}`.toLowerCase()
        return malePatterns.some((p) => full.includes(p))
      })
      if (maleVoice) return maleVoice.index
      if (this.nativeVoices.length > 1) {
        return this.nativeVoices[this.nativeVoices.length - 1].index
      }
    } else {
      const femaleVoice = this.nativeVoices.find((v) => {
        const full = `${v.voiceURI} ${v.name}`.toLowerCase()
        return femalePatterns.some((p) => full.includes(p))
      })
      if (femaleVoice) return femaleVoice.index
      if (this.nativeVoices.length > 0) {
        return this.nativeVoices[0].index
      }
    }
    return undefined
  }

  private populateVoices() {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return
    this.voices = window.speechSynthesis.getVoices()
  }

  public getJapaneseVoices(): SpeechSynthesisVoice[] {
    if (this.voices.length === 0 && typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.voices = window.speechSynthesis.getVoices()
    }
    return this.voices.filter(
      (v) => v.lang.startsWith('ja') || v.lang === 'ja-JP' || v.lang === 'ja'
    )
  }

  /**
   * Resolves the best Japanese voice & calibrated pitch for the target gender on web.
   */
  public resolveVoice(
    targetGender?: 'female' | 'male',
    preferredVoiceName?: string
  ): VoiceConfig {
    const jaVoices = this.getJapaneseVoices()
    const settings = settingsService.getSettings()
    const gender = targetGender ?? settings.voiceGender ?? 'female'

    if (preferredVoiceName) {
      const match = jaVoices.find((v) => v.name === preferredVoiceName)
      if (match) {
        return {
          voice: match,
          pitch: gender === 'female' ? 1.25 : 0.70,
        }
      }
    }

    const femaleKeywords = [
      'kyoko', 'nanami', 'ayumi', 'haruka', 'sayaka',
      'misaki', 'tomoka', 'female', 'woman', 'girl', '女性',
    ]
    const maleKeywords = [
      'otoya', 'keita', 'daichi', 'naoki', 'ichiro',
      'takumi', 'hattori', 'male', 'man', 'boy', '男性',
    ]

    if (gender === 'male') {
      const maleVoice = jaVoices.find((v) =>
        maleKeywords.some((kw) => v.name.toLowerCase().includes(kw))
      )
      if (maleVoice) {
        return { voice: maleVoice, pitch: 0.78 }
      }
      return {
        voice: jaVoices[0] || null,
        pitch: 0.68,
      }
    } else {
      const femaleVoice = jaVoices.find((v) =>
        femaleKeywords.some((kw) => v.name.toLowerCase().includes(kw))
      )
      if (femaleVoice) {
        return { voice: femaleVoice, pitch: 1.15 }
      }
      return {
        voice: jaVoices[0] || null,
        pitch: 1.28,
      }
    }
  }

  /**
   * Universal speech playback method.
   * Seamlessly uses native Android/iOS TTS on mobile devices,
   * with automatic fallback to Web Speech Synthesis in browsers.
   */
  public speak(
    text: string,
    options?: {
      rate?: number
      gender?: 'female' | 'male'
      pitch?: number
      onEnd?: () => void
    }
  ): void {
    const settings = settingsService.getSettings()
    if (settings.soundEnabled === false) return

    // Clean text of markdown artifacts, parenthesis or ruby formatting if present
    const cleanText = text
      .replace(/（[^）]*）/g, '') // Remove parenthetical notes
      .replace(/\([^\)]*\)/g, '')
      .replace(/[・\*\#\_]/g, '')
      .trim()

    if (!cleanText) return

    const baseRate = options?.rate ?? settings.speechRate ?? 0.85
    const gender = options?.gender ?? settings.voiceGender ?? 'female'

    // Distinct pitch and cadence calibration for female vs male
    const isFemale = gender === 'female'
    const calibratedPitch = options?.pitch ?? (isFemale ? 1.28 : 0.68)
    const calibratedRate = isFemale
      ? Math.max(0.5, Math.min(1.6, baseRate * 1.02))
      : Math.max(0.5, Math.min(1.6, baseRate * 0.94))

    // ── 1. NATIVE MOBILE APP (Android & iOS via Capacitor Plugin) ──
    if (Capacitor.isNativePlatform()) {
      this.nativeSpeaking = true
      // Lazy load native voice catalog if not yet loaded
      if (!this.nativeVoicesLoaded) {
        this.loadNativeVoices().catch(() => {})
      }

      const nativeVoiceIndex = this.resolveNativeVoiceIndex(gender)

      TextToSpeech.stop()
        .catch(() => {})
        .finally(() => {
          const ttsPayload: any = {
            text: cleanText,
            lang: 'ja-JP',
            rate: calibratedRate,
            pitch: calibratedPitch,
            volume: 1.0,
            category: 'ambient',
            queueStrategy: QueueStrategy.Flush,
          }

          if (nativeVoiceIndex !== undefined) {
            ttsPayload.voice = nativeVoiceIndex
          }

          TextToSpeech.speak(ttsPayload)
            .then(() => {
              this.nativeSpeaking = false
              options?.onEnd?.()
            })
            .catch((err) => {
              this.nativeSpeaking = false
              console.warn('Native TTS speak failed, retrying with ja lang:', err)
              TextToSpeech.speak({
                text: cleanText,
                lang: 'ja',
                rate: calibratedRate,
                pitch: calibratedPitch,
                volume: 1.0,
              })
                .then(() => options?.onEnd?.())
                .catch((retryErr) => console.error('TTS error:', retryErr))
            })
        })
      return
    }

    // ── 2. WEB BROWSER / DESKTOP FALLBACK (Web Speech API) ──
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return

    try {
      window.speechSynthesis.cancel()

      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume()
      }

      const utterance = new SpeechSynthesisUtterance(cleanText)
      utterance.lang = 'ja-JP'
      utterance.rate = calibratedRate

      const voiceConfig = this.resolveVoice(gender, settings.voiceName)
      if (voiceConfig.voice) {
        utterance.voice = voiceConfig.voice
      }
      utterance.pitch = calibratedPitch

      this.activeUtterance = utterance
      utterance.onend = () => {
        this.activeUtterance = null
        options?.onEnd?.()
      }
      utterance.onerror = () => {
        this.activeUtterance = null
      }

      window.speechSynthesis.speak(utterance)
    } catch {
      // Gracefully handle browser TTS restrictions
    }
  }

  public stop(): void {
    if (Capacitor.isNativePlatform()) {
      this.nativeSpeaking = false
      TextToSpeech.stop().catch(() => {})
    }
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel()
      this.activeUtterance = null
    }
  }

  public isSpeaking(): boolean {
    if (Capacitor.isNativePlatform()) {
      return this.nativeSpeaking
    }
    return this.activeUtterance !== null || (typeof window !== 'undefined' && window.speechSynthesis?.speaking === true)
  }

  public getActiveUtterance(): SpeechSynthesisUtterance | null {
    return this.activeUtterance
  }
}

export const audioService = new AudioService()
