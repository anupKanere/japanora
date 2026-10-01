import { Capacitor } from '@capacitor/core'
import { TextToSpeech, QueueStrategy } from '@capacitor-community/text-to-speech'
import { settingsService } from './settingsService'

interface VoiceConfig {
  voice: SpeechSynthesisVoice | null
  pitch: number
}

class AudioService {
  private voices: SpeechSynthesisVoice[] = []
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
   * Resolves the best Japanese voice & calibrated pitch for the target gender.
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
          pitch: gender === 'female' ? 1.15 : 0.85,
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
        return { voice: maleVoice, pitch: 0.92 }
      }
      return {
        voice: jaVoices[0] || null,
        pitch: 0.78,
      }
    } else {
      const femaleVoice = jaVoices.find((v) =>
        femaleKeywords.some((kw) => v.name.toLowerCase().includes(kw))
      )
      if (femaleVoice) {
        return { voice: femaleVoice, pitch: 1.12 }
      }
      return {
        voice: jaVoices[0] || null,
        pitch: 1.18,
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

    const resolvedRate = options?.rate ?? settings.speechRate ?? 0.85
    const gender = options?.gender ?? settings.voiceGender ?? 'female'
    const defaultPitch = gender === 'female' ? 1.15 : 0.85
    const resolvedPitch = options?.pitch ?? defaultPitch

    // ── 1. NATIVE MOBILE APP (Android & iOS via Capacitor Plugin) ──
    if (Capacitor.isNativePlatform()) {
      this.nativeSpeaking = true
      TextToSpeech.stop()
        .catch(() => {})
        .finally(() => {
          TextToSpeech.speak({
            text: cleanText,
            lang: 'ja-JP',
            rate: Math.max(0.5, Math.min(1.6, resolvedRate)),
            pitch: Math.max(0.5, Math.min(1.8, resolvedPitch)),
            volume: 1.0,
            category: 'ambient',
            queueStrategy: QueueStrategy.Flush,
          })
            .then(() => {
              this.nativeSpeaking = false
              options?.onEnd?.()
            })
            .catch((err) => {
              this.nativeSpeaking = false
              console.warn('Native TTS speak failed, trying generic ja lang tag:', err)
              // Retry with generic 'ja' tag if 'ja-JP' failed
              TextToSpeech.speak({
                text: cleanText,
                lang: 'ja',
                rate: resolvedRate,
                pitch: resolvedPitch,
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
      utterance.rate = Math.max(0.5, Math.min(1.6, resolvedRate))

      const voiceConfig = this.resolveVoice(gender, settings.voiceName)
      if (voiceConfig.voice) {
        utterance.voice = voiceConfig.voice
      }
      utterance.pitch = resolvedPitch

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
