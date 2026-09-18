import { useState } from 'react'
import { Volume2, Calendar as CalendarIcon } from 'lucide-react'
import { playKanaAudio } from '@/data/kana/kana-data'

// ─── 1. JAPANESE CALENDAR DAY DATA (1st to 31st) ─────────────────────────────

export interface DayInfo {
  day: number
  kanji: string
  hiragana: string
  romaji: string
  isIrregular: boolean
  note?: string
}

export const JAPANESE_DAYS_OF_MONTH: DayInfo[] = [
  { day: 1, kanji: '一日', hiragana: 'ついたち', romaji: 'tsuitachi', isIrregular: true, note: 'Native reading: from "月立ち" (moon rising/new moon)' },
  { day: 2, kanji: '二日', hiragana: 'ふつか', romaji: 'futsuka', isIrregular: true, note: 'Native reading: ふつ + か' },
  { day: 3, kanji: '三日', hiragana: 'みっか', romaji: 'mikka', isIrregular: true, note: 'Native reading: みっ + か' },
  { day: 4, kanji: '四日', hiragana: 'よっか', romaji: 'yokka', isIrregular: true, note: 'Native reading: よっ + か (never よんにち)' },
  { day: 5, kanji: '五日', hiragana: 'いつか', romaji: 'itsuka', isIrregular: true, note: 'Native reading: いつ + か' },
  { day: 6, kanji: '六日', hiragana: 'むいか', romaji: 'muika', isIrregular: true, note: 'Native reading: むい + か' },
  { day: 7, kanji: '七日', hiragana: 'なのか', romaji: 'nanoka', isIrregular: true, note: 'Native reading: なの + か' },
  { day: 8, kanji: '八日', hiragana: 'ようか', romaji: 'youka', isIrregular: true, note: 'Native reading: よう + か' },
  { day: 9, kanji: '九日', hiragana: 'ここのか', romaji: 'kokonoka', isIrregular: true, note: 'Native reading: ここの + か' },
  { day: 10, kanji: '十日', hiragana: 'とおか', romaji: 'tooka', isIrregular: true, note: 'Native reading: とお + か' },
  { day: 11, kanji: '十一日', hiragana: 'じゅういちにち', romaji: 'juu-ichi-nichi', isIrregular: false },
  { day: 12, kanji: '十二日', hiragana: 'じゅうににち', romaji: 'juu-ni-nichi', isIrregular: false },
  { day: 13, kanji: '十三日', hiragana: 'じゅうさんにち', romaji: 'juu-san-nichi', isIrregular: false },
  { day: 14, kanji: '十四日', hiragana: 'じゅうよっか', romaji: 'juu-yokka', isIrregular: true, note: 'Irregular: じゅう + よっか (never じゅうよんにち)' },
  { day: 15, kanji: '十五日', hiragana: 'じゅうごにち', romaji: 'juu-go-nichi', isIrregular: false },
  { day: 16, kanji: '十六日', hiragana: 'じゅうろくにち', romaji: 'juu-roku-nichi', isIrregular: false },
  { day: 17, kanji: '十七日', hiragana: 'じゅうしちにち / じゅうななにち', romaji: 'juu-shichi-nichi', isIrregular: false },
  { day: 18, kanji: '十八日', hiragana: 'じゅうはちにち', romaji: 'juu-hachi-nichi', isIrregular: false },
  { day: 19, kanji: '十九日', hiragana: 'じゅうくにち', romaji: 'juu-ku-nichi', isIrregular: true, note: 'Notice: くにち is standard (rarely きゅうにち)' },
  { day: 20, kanji: '二十日', hiragana: 'はつか', romaji: 'hatsuka', isIrregular: true, note: 'Special ancient reading: はつか (never にじゅうにち)' },
  { day: 21, kanji: '二十一日', hiragana: 'にじゅういちにち', romaji: 'ni-juu-ichi-nichi', isIrregular: false },
  { day: 22, kanji: '二十二日', hiragana: 'にじゅうににち', romaji: 'ni-juu-ni-nichi', isIrregular: false },
  { day: 23, kanji: '二十三日', hiragana: 'にじゅうさんにち', romaji: 'ni-juu-san-nichi', isIrregular: false },
  { day: 24, kanji: '二十四日', hiragana: 'にじゅうよっか', romaji: 'ni-juu-yokka', isIrregular: true, note: 'Irregular: にじゅう + よっか (never にじゅうよんにち)' },
  { day: 25, kanji: '二十五日', hiragana: 'にじゅうごにち', romaji: 'ni-juu-go-nichi', isIrregular: false },
  { day: 26, kanji: '二十六日', hiragana: 'にじゅうろくにち', romaji: 'ni-juu-roku-nichi', isIrregular: false },
  { day: 27, kanji: '二十七日', hiragana: 'にじゅうしちにち / じゅうななにち', romaji: 'ni-juu-shichi-nichi', isIrregular: false },
  { day: 28, kanji: '二十八日', hiragana: 'にじゅうはちにち', romaji: 'ni-juu-hachi-nichi', isIrregular: false },
  { day: 29, kanji: '二十九日', hiragana: 'にじゅうくにち', romaji: 'ni-juu-ku-nichi', isIrregular: true, note: 'Notice: くにち is standard (rarely きゅうにち)' },
  { day: 30, kanji: '三十日', hiragana: 'さんじゅうにち', romaji: 'san-juu-nichi', isIrregular: false },
  { day: 31, kanji: '三十一日', hiragana: 'さんじゅういちにち', romaji: 'san-juu-ichi-nichi', isIrregular: false },
]

export const JAPANESE_MONTHS = [
  { month: 1, kanji: '1月', hiragana: 'いちがつ', romaji: 'ichi-gatsu', name: 'January' },
  { month: 2, kanji: '2月', hiragana: 'にがつ', romaji: 'ni-gatsu', name: 'February' },
  { month: 3, kanji: '3月', hiragana: 'さんがつ', romaji: 'san-gatsu', name: 'March' },
  { month: 4, kanji: '4月', hiragana: 'しがつ', romaji: 'shi-gatsu', name: 'April', isIrregular: true, note: 'しがつ (never よんがつ)' },
  { month: 5, kanji: '5月', hiragana: 'ごがつ', romaji: 'go-gatsu', name: 'May' },
  { month: 6, kanji: '6月', hiragana: 'ろくがつ', romaji: 'roku-gatsu', name: 'June' },
  { month: 7, kanji: '7月', hiragana: 'しちがつ', romaji: 'shichi-gatsu', name: 'July', isIrregular: true, note: 'しちがつ (standard over なながつ)' },
  { month: 8, kanji: '8月', hiragana: 'はちがつ', romaji: 'hachi-gatsu', name: 'August' },
  { month: 9, kanji: '9月', hiragana: 'くがつ', romaji: 'ku-gatsu', name: 'September', isIrregular: true, note: 'くがつ (never きゅうがつ)' },
  { month: 10, kanji: '10月', hiragana: 'じゅうがつ', romaji: 'juu-gatsu', name: 'October' },
  { month: 11, kanji: '11月', hiragana: 'じゅういちがつ', romaji: 'juu-ichi-gatsu', name: 'November' },
  { month: 12, kanji: '12月', hiragana: 'じゅうにがつ', romaji: 'juu-ni-gatsu', name: 'December' },
]

export const CELESTIAL_WEEKDAYS = [
  { kanji: '日曜日', short: '日', hira: 'にちようび', romaji: 'nichi-youbi', element: 'Sun (日)', meaning: 'Sunday', emoji: '☀️', border: 'border-amber-500/40', accent: 'text-amber-500', note: 'Sunday: Day of the Sun' },
  { kanji: '月曜日', short: '月', hira: 'げつようび', romaji: 'getsu-youbi', element: 'Moon (月)', meaning: 'Monday', emoji: '🌙', border: 'border-indigo-500/40', accent: 'text-indigo-400', note: 'Monday: Day of the Moon' },
  { kanji: '火曜日', short: '火', hira: 'かようび', romaji: 'ka-youbi', element: 'Fire / Mars (火)', meaning: 'Tuesday', emoji: '🔥', border: 'border-rose-500/40', accent: 'text-rose-500', note: 'Tuesday: Day of Fire (Mars)' },
  { kanji: '水曜日', short: '水', hira: 'すいようび', romaji: 'sui-youbi', element: 'Water / Mercury (水)', meaning: 'Wednesday', emoji: '💧', border: 'border-sky-500/40', accent: 'text-sky-400', note: 'Wednesday: Day of Water (Mercury)' },
  { kanji: '木曜日', short: '木', hira: 'もくようび', romaji: 'moku-youbi', element: 'Wood / Jupiter (木)', meaning: 'Thursday', emoji: '🌳', border: 'border-emerald-500/40', accent: 'text-emerald-500', note: 'Thursday: Day of Wood (Jupiter)' },
  { kanji: '金曜日', short: '金', hira: 'きんようび', romaji: 'kin-youbi', element: 'Gold / Venus (金)', meaning: 'Friday', emoji: '🪙', border: 'border-yellow-500/40', accent: 'text-yellow-500', note: 'Friday: Day of Gold/Metal (Venus)' },
  { kanji: '土曜日', short: '土', hira: 'どようび', romaji: 'do-youbi', element: 'Earth / Saturn (土)', meaning: 'Saturday', emoji: '🌍', border: 'border-amber-700/40', accent: 'text-amber-600 dark:text-amber-300', note: 'Saturday: Day of Earth/Soil (Saturn)' },
]

export const RELATIVE_DAYS = [
  { kanji: '一昨日', hira: 'おととい', romaji: 'ototoi', en: 'Day before yesterday', offset: -2 },
  { kanji: '昨日', hira: 'きのう', romaji: 'kinou', en: 'Yesterday', offset: -1 },
  { kanji: '今日', hira: 'きょう', romaji: 'kyou', en: 'Today', offset: 0, isCurrent: true },
  { kanji: '明日', hira: 'あした', romaji: 'ashita', en: 'Tomorrow', offset: 1 },
  { kanji: '明後日', hira: 'あさって', romaji: 'asatte', en: 'Day after tomorrow', offset: 2 },
  { kanji: '毎日', hira: 'まいにち', romaji: 'mainichi', en: 'Every day' },
  { kanji: '平日', hira: 'へいじつ', romaji: 'heijitsu', en: 'Weekday' },
  { kanji: '週末', hira: 'しゅうまつ', romaji: 'shuumatsu', en: 'Weekend' },
]

export const RELATIVE_WEEKS = [
  { kanji: '先々週', hira: 'せんせんしゅう', romaji: 'sensenshuu', en: 'Two weeks ago' },
  { kanji: '先週', hira: 'せんしゅう', romaji: 'senshuu', en: 'Last week' },
  { kanji: '今週', hira: 'こんしゅう', romaji: 'konshuu', en: 'This week', isCurrent: true },
  { kanji: '来週', hira: 'らいしゅう', romaji: 'raishuu', en: 'Next week' },
  { kanji: '再来週', hira: 'さらいしゅう', romaji: 'saraishuu', en: 'Week after next' },
  { kanji: '毎週', hira: 'まいしゅう', romaji: 'maishuu', en: 'Every week' },
]

// ─── 2. MAIN UNIFIED CALENDAR STUDIO COMPONENT ───────────────────────────────

export function InteractiveCalendarStudio() {
  const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth() + 1)
  const [selectedDay, setSelectedDay] = useState<number>(1)

  const currentMonthInfo = JAPANESE_MONTHS[selectedMonth - 1]
  const currentDayInfo = JAPANESE_DAYS_OF_MONTH[selectedDay - 1] || JAPANESE_DAYS_OF_MONTH[0]

  const combinedKanji = `${currentMonthInfo.kanji} ${currentDayInfo.kanji}`
  const combinedHira = `${currentMonthInfo.hiragana} ${currentDayInfo.hiragana}`
  const combinedRomaji = `${currentMonthInfo.romaji} ${currentDayInfo.romaji}`
  const combinedEng = `${currentMonthInfo.name} ${currentDayInfo.day}`

  const handleAudio = (text: string) => {
    playKanaAudio(text)
  }

  return (
    <div className="space-y-8">
      {/* ─── SECTION 1: JAPANESE DESK CALENDAR (卓上カレンダー) ─── */}
      <div className="bg-surface border border-accent/20 rounded-2xl p-4 sm:p-6 shadow-card space-y-6">
        <div className="flex items-center gap-2.5 pb-3 border-b border-border">
          <div className="p-2.5 rounded-xl bg-accent-soft text-accent">
            <CalendarIcon size={22} />
          </div>
          <div>
            <h3 className="text-base font-bold text-text-primary flex items-center gap-2">
              Japanese Desk Calendar
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-accent/10 text-accent font-semibold">
                卓上カレンダー
              </span>
            </h3>
            <p className="text-xs text-text-tertiary">
              Click any month or day to learn authentic Japanese calendar readings and pronunciation
            </p>
          </div>
        </div>

        {/* Top Active Date Banner */}
        <div className="bg-surface-2/60 border border-border rounded-xl p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-accent/15 text-accent">
                {combinedEng}
              </span>
              {currentDayInfo.isIrregular && (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400">
                  ⚠️ Irregular Reading
                </span>
              )}
              {currentMonthInfo.isIrregular && (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-sky-500/15 text-sky-600 dark:text-sky-400">
                  ⚠️ Special Month: {currentMonthInfo.hiragana}
                </span>
              )}
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-japanese text-text-primary">
              {combinedKanji}
            </h2>
            <p className="text-lg font-japanese text-accent font-semibold">
              {combinedHira}
            </p>
            <p className="text-xs text-text-tertiary italic">
              {combinedRomaji}
            </p>
            {currentDayInfo.note && (
              <p className="text-xs text-text-secondary pt-1 flex items-center gap-1.5">
                <span className="text-accent">💡</span> {currentDayInfo.note}
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={() => handleAudio(`${currentMonthInfo.hiragana} ${currentDayInfo.hiragana}`)}
            className="p-3 sm:px-4 sm:py-3 rounded-xl bg-accent text-white hover:bg-accent/90 shadow-md active:scale-95 transition-all flex items-center gap-2"
            title="Listen to Japanese date"
          >
            <Volume2 size={18} />
            <span className="text-xs font-semibold">Pronounce Date</span>
          </button>
        </div>

        {/* Month Selector Bar */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-text-secondary">Select Month (月 — がつ):</span>
            <span className="text-[11px] text-text-tertiary">Notice: 4月 (しがつ), 7月 (しちがつ), 9月 (くがつ)</span>
          </div>
          <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-12 gap-1.5">
            {JAPANESE_MONTHS.map((m) => {
              const isSelected = selectedMonth === m.month
              return (
                <button
                  key={m.month}
                  type="button"
                  onClick={() => setSelectedMonth(m.month)}
                  className={`p-2 rounded-xl border text-center transition-all ${
                    isSelected
                      ? 'bg-accent text-white border-accent shadow-sm font-bold scale-[1.03]'
                      : 'bg-surface border-border hover:border-accent/40 text-text-secondary hover:text-text-primary'
                  }`}
                >
                  <p className="text-sm font-japanese font-bold">{m.kanji}</p>
                  <p className={`text-[10px] font-japanese mt-0.5 ${isSelected ? 'text-white/90' : 'text-text-tertiary'}`}>
                    {m.hiragana}
                  </p>
                </button>
              )
            })}
          </div>
        </div>

        {/* 31 Days Grid */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-text-secondary">
              Days of the Month (1日〜31日):
            </span>
            <span className="text-[11px] text-amber-500 font-medium">
              ★ Amber stars = Irregular native readings (1st–10th, 14th, 20th, 24th)
            </span>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-7 lg:grid-cols-8 gap-2">
            {JAPANESE_DAYS_OF_MONTH.map((d) => {
              const isSelected = selectedDay === d.day
              return (
                <button
                  key={d.day}
                  type="button"
                  onClick={() => setSelectedDay(d.day)}
                  className={`p-2.5 rounded-xl border text-center relative transition-all active:scale-95 flex flex-col justify-between ${
                    isSelected
                      ? 'bg-accent text-white border-accent ring-2 ring-accent/30 shadow-md font-bold scale-[1.02]'
                      : d.isIrregular
                      ? 'bg-amber-500/5 border-amber-500/30 hover:border-amber-500 text-text-primary'
                      : 'bg-surface border-border hover:border-accent/40 text-text-primary'
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className={`text-xs font-bold ${isSelected ? 'text-white' : 'text-accent'}`}>
                      {d.day}
                    </span>
                    {d.isIrregular && (
                      <span className={`text-[8px] px-1 rounded-full ${isSelected ? 'bg-white/20 text-white' : 'bg-amber-500/20 text-amber-600 dark:text-amber-400 font-bold'}`}>
                        ★
                      </span>
                    )}
                  </div>
                  <p className="text-base font-japanese font-bold mt-1">{d.kanji}</p>
                  <p className={`text-xs font-japanese font-medium mt-0.5 truncate ${isSelected ? 'text-white/90' : 'text-text-secondary'}`}>
                    {d.hiragana}
                  </p>
                  <p className={`text-[9px] italic mt-0.5 truncate ${isSelected ? 'text-white/70' : 'text-text-tertiary'}`}>
                    {d.romaji}
                  </p>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* ─── SECTION 2: DAYS OF THE WEEK (曜日) WITH CELESTIAL ELEMENTS ─── */}
      <div className="bg-surface border border-border rounded-2xl p-4 sm:p-6 shadow-card space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-text-primary flex items-center gap-2">
              <span>Days of the Week — 曜日 (ようび)</span>
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-accent/10 text-accent font-semibold">
                7 Days
              </span>
            </h3>
            <p className="text-xs text-text-tertiary mt-0.5">
              Named after the Sun, Moon, and 5 classical elements (Wood, Fire, Earth, Metal, Water)
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-3">
          {CELESTIAL_WEEKDAYS.map((w, i) => (
            <div
              key={i}
              className={`bg-surface border ${w.border} rounded-xl p-3.5 shadow-card hover:scale-[1.02] transition-all flex flex-col justify-between`}
            >
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xl">{w.emoji}</span>
                  <span className="text-[10px] font-bold text-text-tertiary uppercase">Day {i + 1}</span>
                </div>
                <p className="text-2xl font-japanese font-bold text-text-primary mt-1">{w.kanji}</p>
                <p className={`text-xs font-japanese font-semibold ${w.accent}`}>{w.hira}</p>
                <p className="text-[11px] text-text-tertiary italic">{w.romaji}</p>
                <p className="text-xs text-text-primary font-semibold mt-1">{w.meaning}</p>
                <span className="text-[10px] text-text-tertiary block mt-0.5">{w.element}</span>
              </div>
              <button
                type="button"
                onClick={() => handleAudio(w.hira)}
                className="mt-3 w-full py-1.5 px-2 rounded-lg bg-surface-2 hover:bg-accent-soft hover:text-accent text-text-tertiary text-xs flex items-center justify-center gap-1 transition-all"
                title={`Listen to ${w.hira}`}
              >
                <Volume2 size={12} />
                <span>Listen</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* ─── SECTION 3: RELATIVE TIME EXPRESSIONS (日 & 週) ─── */}
      <div className="bg-surface border border-border rounded-2xl p-4 sm:p-6 shadow-card space-y-6">
        <div>
          <h3 className="text-base font-bold text-text-primary mb-1 flex items-center gap-2">
            <span>Relative Time Words</span>
            <span className="text-[11px] px-2 py-0.5 rounded-full bg-surface-2 text-text-secondary border border-border">
              Timeline
            </span>
          </h3>
          <p className="text-xs text-text-tertiary mb-3">
            Common conversational time frames (past, present, and future days and weeks)
          </p>
        </div>

        {/* Days Timeline */}
        <div>
          <h4 className="text-xs font-bold text-text-secondary uppercase tracking-wider mb-2">
            Day Expressions (日):
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-2.5">
            {RELATIVE_DAYS.map((r, i) => (
              <div
                key={i}
                className={`p-3 rounded-xl border text-center transition-all flex flex-col justify-between ${
                  r.isCurrent
                    ? 'bg-accent/10 border-accent ring-1 ring-accent'
                    : 'bg-surface border-border hover:border-accent/40'
                }`}
              >
                <div>
                  <p className="text-lg font-bold font-japanese text-text-primary">{r.kanji}</p>
                  <p className="text-xs font-japanese text-accent font-medium mt-0.5">{r.hira}</p>
                  <p className="text-[10px] text-text-tertiary italic">{r.romaji}</p>
                  <p className="text-[11px] text-text-secondary mt-1 font-medium">{r.en}</p>
                </div>
                <button
                  type="button"
                  onClick={() => handleAudio(r.hira)}
                  className="mt-2 text-[11px] text-text-tertiary hover:text-accent p-1 flex items-center justify-center gap-1"
                >
                  <Volume2 size={12} /> Play
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Weeks Timeline */}
        <div>
          <h4 className="text-xs font-bold text-text-secondary uppercase tracking-wider mb-2">
            Week Expressions (週):
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2.5">
            {RELATIVE_WEEKS.map((w, i) => (
              <div
                key={i}
                className={`p-3 rounded-xl border text-center transition-all flex flex-col justify-between ${
                  w.isCurrent
                    ? 'bg-accent/10 border-accent ring-1 ring-accent'
                    : 'bg-surface border-border hover:border-accent/40'
                }`}
              >
                <div>
                  <p className="text-lg font-bold font-japanese text-text-primary">{w.kanji}</p>
                  <p className="text-xs font-japanese text-accent font-medium mt-0.5">{w.hira}</p>
                  <p className="text-[10px] text-text-tertiary italic">{w.romaji}</p>
                  <p className="text-[11px] text-text-secondary mt-1 font-medium">{w.en}</p>
                </div>
                <button
                  type="button"
                  onClick={() => handleAudio(w.hira)}
                  className="mt-2 text-[11px] text-text-tertiary hover:text-accent p-1 flex items-center justify-center gap-1"
                >
                  <Volume2 size={12} /> Play
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
