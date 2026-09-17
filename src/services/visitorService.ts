/**
 * Visitor counter service using Abacus Counter API
 * Free, live, no-auth required. Each unique session increments the counter globally.
 *
 * Namespace: japanora-app
 * Key: page-visitors
 */

const NAMESPACE = 'japanora-app'
const KEY = 'page-visitors'
const BASE_URL = 'https://abacus.jasoncameron.dev'

// 30-minute standard web analytics session window
const VISIT_TIMEOUT_MS = 30 * 60 * 1000
const LAST_VISIT_TIME_KEY = 'japanora_last_visit_time'
const LAST_KNOWN_KEY = 'japanora_last_known_visitors'

// Baseline community count
const BASELINE_LEARNERS = 1842

export interface VisitorData {
  value?: number
  count?: number
}

// In-flight singleton promise to prevent concurrent double-hits (e.g. React StrictMode)
let inFlightPromise: Promise<number> | null = null

export const visitorService = {
  /**
   * Increments the visitor counter and returns the new total.
   * - Deduplicates concurrent calls via inFlightPromise.
   * - Sets synchronous session timestamp before network request.
   * - Guards against double-counting across tabs within 30 minutes.
   */
  async hitAndGet(): Promise<number> {
    if (inFlightPromise) {
      return inFlightPromise
    }

    inFlightPromise = (async () => {
      try {
        const now = Date.now()
        let shouldIncrement = true

        if (typeof localStorage !== 'undefined') {
          const lastVisit = localStorage.getItem(LAST_VISIT_TIME_KEY)
          if (lastVisit && now - Number(lastVisit) < VISIT_TIMEOUT_MS) {
            shouldIncrement = false
          }
        }

        // Synchronously record session timestamp immediately BEFORE fetching to prevent race conditions
        if (shouldIncrement && typeof localStorage !== 'undefined') {
          localStorage.setItem(LAST_VISIT_TIME_KEY, String(now))
        }

        const endpoint = shouldIncrement
          ? `${BASE_URL}/hit/${NAMESPACE}/${KEY}`
          : `${BASE_URL}/get/${NAMESPACE}/${KEY}`

        // Timeout after 3.5s so slow network calls never hang the UI
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 3500)

        const res = await fetch(endpoint, { signal: controller.signal })
        clearTimeout(timeoutId)

        if (!res.ok) throw new Error(`HTTP error ${res.status}`)

        const data: VisitorData = await res.json()
        const rawCount = Number(data.value ?? data.count ?? 0)
        const total = BASELINE_LEARNERS + rawCount

        if (typeof localStorage !== 'undefined') {
          localStorage.setItem(LAST_KNOWN_KEY, String(total))
        }

        return total
      } catch {
        // Robust offline fallback: return last known good count from localStorage
        if (typeof localStorage !== 'undefined') {
          const cached = localStorage.getItem(LAST_KNOWN_KEY)
          if (cached && !isNaN(Number(cached))) {
            return Number(cached)
          }
        }
        return BASELINE_LEARNERS
      } finally {
        inFlightPromise = null
      }
    })()

    return inFlightPromise
  },

  /**
   * Get current count without incrementing.
   */
  async getCount(): Promise<number> {
    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 3500)

      const res = await fetch(`${BASE_URL}/get/${NAMESPACE}/${KEY}`, { signal: controller.signal })
      clearTimeout(timeoutId)

      if (!res.ok) throw new Error(`HTTP error ${res.status}`)

      const data: VisitorData = await res.json()
      const rawCount = Number(data.value ?? data.count ?? 0)
      const total = BASELINE_LEARNERS + rawCount

      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(LAST_KNOWN_KEY, String(total))
      }

      return total
    } catch {
      if (typeof localStorage !== 'undefined') {
        const cached = localStorage.getItem(LAST_KNOWN_KEY)
        if (cached && !isNaN(Number(cached))) {
          return Number(cached)
        }
      }
      return BASELINE_LEARNERS
    }
  },
}
