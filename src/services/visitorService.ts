/**
 * Visitor counter service using CountAPI (countapi.xyz)
 * Free, no-auth required. Each hit increments the counter globally.
 *
 * Namespace: japanora-app
 * Key: page-visitors
 *
 * To reset or manage the counter, visit:
 * https://api.countapi.xyz/info/japanora-app/page-visitors
 */

const NAMESPACE = 'japanora-app'
const KEY = 'page-visitors'
const BASE_URL = 'https://api.countapi.xyz'

// Session guard — only count one hit per browser session
const SESSION_KEY = 'japanora_visitor_counted'

export interface VisitorData {
  count: number
}

export const visitorService = {
  /**
   * Increments the visitor counter and returns the new total.
   * Only hits once per browser session to avoid inflating counts on refresh.
   */
  async hitAndGet(): Promise<number> {
    try {
      const alreadyCounted = sessionStorage.getItem(SESSION_KEY)
      const endpoint = alreadyCounted
        ? `${BASE_URL}/get/${NAMESPACE}/${KEY}`
        : `${BASE_URL}/hit/${NAMESPACE}/${KEY}`

      const res = await fetch(endpoint)
      if (!res.ok) throw new Error('Network error')

      const data: VisitorData = await res.json()

      if (!alreadyCounted) {
        sessionStorage.setItem(SESSION_KEY, '1')
      }

      return data.count ?? 0
    } catch {
      // Fallback: return a local session-only estimate if the API is down
      return 0
    }
  },

  /**
   * Get current count without incrementing.
   */
  async getCount(): Promise<number> {
    try {
      const res = await fetch(`${BASE_URL}/get/${NAMESPACE}/${KEY}`)
      if (!res.ok) throw new Error('Network error')
      const data: VisitorData = await res.json()
      return data.count ?? 0
    } catch {
      return 0
    }
  },
}
