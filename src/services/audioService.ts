import { settingsService } from './settingsService'

interface VoiceConfig {
  voice: SpeechSynthesisVoice | null
  pitch: number
}

class AudioService {
  private voices: SpeechSynthesisVoice[] = []
  private activeUtterance: SpeechSynthesisUtterance | null = null

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

    // If a specific voice name was configured and matches
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
      // If browser doesn't have an explicit male voice installed (e.g. Chrome with 1 generic voice),
      // we modulate the pitch down to 0.78 for an authentic, resonant masculine voice
      return {
        voice: jaVoices[0] || null,
        pitch: 0.78,
      }
    } else {
      // Female
      const femaleVoice = jaVoices.find((v) =>
        femaleKeywords.some((kw) => v.name.toLowerCase().includes(kw))
      )
      if (femaleVoice) {
        return { voice: femaleVoice, pitch: 1.12 }
      }
      // Modulate pitch up to 1.18 for bright, clear feminine resonance
      return {
        voice: jaVoices[0] || null,
        pitch: 1.18,
      }
    }
  }

  /**
   * Universal speech playback method.
   * Reads speed and voice gender from settings unless overridden in options.
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
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return

    try {
      const settings = settingsService.getSettings()
      if (settings.soundEnabled === false) return

      // Clean text of markdown artifacts, parenthesis or ruby formatting if present
      const cleanText = text
        .replace(/（[^）]*）/g, '') // Remove parenthetical notes
        .replace(/\([^\)]*\)/g, '')
        .replace(/[・\*\#\_]/g, '')
        .trim()

      if (!cleanText) return

      // Cancel any ongoing speech to make playback instant and snappy
      window.speechSynthesis.cancel()

      // Chrome speech queue freeze fix
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume()
      }

      const utterance = new SpeechSynthesisUtterance(cleanText)
      utterance.lang = 'ja-JP'

      // Speed rate resolution: custom option -> user setting -> default 0.85
      const resolvedRate = options?.rate ?? settings.speechRate ?? 0.85
      utterance.rate = Math.max(0.5, Math.min(1.6, resolvedRate))

      // Voice & pitch resolution
      const gender = options?.gender ?? settings.voiceGender ?? 'female'
      const voiceConfig = this.resolveVoice(gender, settings.voiceName)

      if (voiceConfig.voice) {
        utterance.voice = voiceConfig.voice
      }
      utterance.pitch = options?.pitch ?? voiceConfig.pitch

      // Prevent garbage collection bug in Chromium
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
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel()
      this.activeUtterance = null
    }
  }

  public isSpeaking(): boolean {
    return this.activeUtterance !== null || (typeof window !== 'undefined' && window.speechSynthesis?.speaking === true)
  }

  public getActiveUtterance(): SpeechSynthesisUtterance | null {
    return this.activeUtterance
  }
}

export const audioService = new AudioService()
