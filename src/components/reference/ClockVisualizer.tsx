import { useState, useEffect } from 'react'
import { Volume2, RefreshCw } from 'lucide-react'
import { playKanaAudio } from '@/data/kana/kana-data'

// ─── 1. ANALOG CLOCK SVG COMPONENT ──────────────────────────────────────────

export interface AnalogClockProps {
  hour: number
  minute: number
  size?: number
  showNumbers?: boolean
  kanjiNumerals?: boolean
  showMinuteTicks?: boolean
  className?: string
  accentColor?: string
}

export function AnalogClock({
  hour,
  minute,
  size = 180,
  showNumbers = true,
  kanjiNumerals = false,
  showMinuteTicks = true,
  className = '',
  accentColor,
}: AnalogClockProps) {
  const center = size / 2
  const radius = center - 8
  const minuteAngle = (minute % 60) * 6
  const hourAngle = (((hour % 12) + (minute % 60) / 60) * 30)

  // Clock numbers around dial: 12 at 0deg, 1 at 30deg, ... 11 at 330deg
  const hourLabels = kanjiNumerals
    ? ['十二', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一']
    : ['12', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11']

  const isMini = size <= 70

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className={`select-none transition-transform duration-200 ${className}`}
      aria-label={`${hour}:${minute < 10 ? '0' + minute : minute}`}
    >
      {/* Outer Dial Shadow & Ring */}
      <circle
        cx={center}
        cy={center}
        r={radius}
        className="fill-surface stroke-border"
        strokeWidth={isMini ? 2 : 3}
      />

      {/* Subtle Inner Rim */}
      {!isMini && (
        <circle
          cx={center}
          cy={center}
          r={radius - 3}
          className="fill-none stroke-border/40"
          strokeWidth={1}
        />
      )}

      {/* Minute Ticks */}
      {!isMini && showMinuteTicks &&
        Array.from({ length: 60 }).map((_, i) => {
          const angle = (i * 6 * Math.PI) / 180
          const isFiveMin = i % 5 === 0
          const tickLength = isFiveMin ? 5 : 2.5
          const outerR = radius - 3
          const innerR = outerR - tickLength
          const x1 = center + innerR * Math.sin(angle)
          const y1 = center - innerR * Math.cos(angle)
          const x2 = center + outerR * Math.sin(angle)
          const y2 = center - outerR * Math.cos(angle)
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              className={isFiveMin ? 'stroke-text-tertiary' : 'stroke-border/70'}
              strokeWidth={isFiveMin ? 1.5 : 0.8}
            />
          )
        })}

      {/* Hour numbers around the dial */}
      {showNumbers && !isMini &&
        hourLabels.map((label, i) => {
          const angle = (i * 30 * Math.PI) / 180
          const numR = radius - (size >= 160 ? 17 : 13)
          const x = center + numR * Math.sin(angle)
          const y = center - numR * Math.cos(angle)
          const isSpecial = i === 4 || i === 7 || i === 9
          return (
            <text
              key={i}
              x={x}
              y={y}
              textAnchor="middle"
              dominantBaseline="central"
              className={`font-semibold font-japanese ${
                kanjiNumerals
                  ? size >= 160 ? 'text-[11px]' : 'text-[9px]'
                  : size >= 160 ? 'text-[12px]' : 'text-[10px]'
              } ${isSpecial ? 'fill-accent font-bold' : 'fill-text-secondary'}`}
            >
              {label}
            </text>
          )
        })}

      {/* Hour Hand */}
      <line
        x1={center}
        y1={center}
        x2={center + (radius * (isMini ? 0.54 : 0.52)) * Math.sin((hourAngle * Math.PI) / 180)}
        y2={center - (radius * (isMini ? 0.54 : 0.52)) * Math.cos((hourAngle * Math.PI) / 180)}
        className={accentColor ? '' : 'stroke-accent'}
        stroke={accentColor}
        strokeWidth={isMini ? 2.5 : size >= 160 ? 4 : 3}
        strokeLinecap="round"
      />

      {/* Minute Hand */}
      <line
        x1={center}
        y1={center}
        x2={center + (radius * (isMini ? 0.76 : 0.74)) * Math.sin((minuteAngle * Math.PI) / 180)}
        y2={center - (radius * (isMini ? 0.76 : 0.74)) * Math.cos((minuteAngle * Math.PI) / 180)}
        className="stroke-text-primary"
        strokeWidth={isMini ? 1.8 : size >= 160 ? 2.5 : 2}
        strokeLinecap="round"
      />

      {/* Center Pivot Pin */}
      <circle
        cx={center}
        cy={center}
        r={isMini ? 2.5 : 4.5}
        className="fill-accent stroke-surface"
        strokeWidth={isMini ? 1 : 1.5}
      />
    </svg>
  )
}

// ─── 2. LINGUISTIC TIME TRANSLATOR ──────────────────────────────────────────

export interface TimeJapaneseInfo {
  ampmKanji: string
  ampmHira: string
  ampmRomaji: string
  hourKanji: string
  hourHira: string
  hourRomaji: string
  isHourIrregular: boolean
  hourNote?: string
  minuteKanji: string
  minuteHira: string
  minuteRomaji: string
  altMinuteKanji?: string
  altMinuteHira?: string
  isPun: boolean
  specialNotes: string[]
  fullKanji: string
  fullHira: string
  fullRomaji: string
  fullEnglish: string
}

export function getTimeJapanese(hour: number, minute: number, isPM: boolean): TimeJapaneseInfo {
  const ampmKanji = isPM ? '午後' : '午前'
  const ampmHira = isPM ? 'ごご' : 'ごぜん'
  const ampmRomaji = isPM ? 'gogo' : 'gozen'

  // Hour readings
  const hourMap: Record<number, { kanji: string; hira: string; romaji: string; isIrregular?: boolean; note?: string }> = {
    1: { kanji: '1時', hira: 'いちじ', romaji: 'ichi-ji' },
    2: { kanji: '2時', hira: 'ni-ji', romaji: 'ni-ji' },
    3: { kanji: '3時', hira: 'さんじ', romaji: 'san-ji' },
    4: { kanji: '4時', hira: 'よじ', romaji: 'yo-ji', isIrregular: true, note: 'よじ (never "しじ", avoiding "死" death)' },
    5: { kanji: '5時', hira: 'ごじ', romaji: 'go-ji' },
    6: { kanji: '6時', hira: 'ろくじ', romaji: 'roku-ji' },
    7: { kanji: '7時', hira: 'しちじ', romaji: 'shichi-ji', isIrregular: true, note: 'しちじ (standard time reading; "ななじ" is colloquial/rare)' },
    8: { kanji: '8時', hira: 'はちじ', romaji: 'hachi-ji' },
    9: { kanji: '9時', hira: 'くじ', romaji: 'ku-ji', isIrregular: true, note: 'くじ (never "きゅうじ", avoiding "苦" suffering)' },
    10: { kanji: '10時', hira: 'じゅうじ', romaji: 'juu-ji' },
    11: { kanji: '11時', hira: 'じゅういちじ', romaji: 'juu-ichi-ji' },
    12: { kanji: '12時', hira: 'じゅうにじ', romaji: 'juu-ni-ji' },
  }

  const hInfo = hourMap[hour] || hourMap[12]

  // Minute logic
  let minuteKanji = ''
  let minuteHira = ''
  let minuteRomaji = ''
  let altMinuteKanji: string | undefined
  let altMinuteHira: string | undefined
  let isPun = false
  const specialNotes: string[] = []

  if (hInfo.isIrregular && hInfo.note) {
    specialNotes.push(hInfo.note)
  }

  if (minute === 0) {
    minuteKanji = ''
    minuteHira = ''
    minuteRomaji = ''
    specialNotes.push('ちょうど (choudo = exactly on the hour)')
  } else if (minute === 30) {
    minuteKanji = '30分'
    minuteHira = 'さんじゅっぷん'
    minuteRomaji = 'sanjuppun'
    altMinuteKanji = '半'
    altMinuteHira = 'はん'
    isPun = true
    specialNotes.push('半 (はん / han) is the most natural way to say "half past"!')
  } else {
    const tens = Math.floor(minute / 10)
    const ones = minute % 10

    const tensHira = ['', 'じゅう', 'にじゅう', 'さんじゅう', 'よんじゅう', 'ごじゅう'][tens]
    const tensRomaji = ['', 'juu-', 'ni-juu-', 'san-juu-', 'yon-juu-', 'go-juu-'][tens]

    if (ones === 0) {
      const hiraMap = ['', 'じゅっぷん', 'にじゅっぷん', 'さんじゅっぷん', 'よんじゅっぷん', 'ごじゅっぷん']
      const romajiMap = ['', 'juppun', 'ni-juppun', 'san-juppun', 'yon-juppun', 'go-juppun']
      minuteKanji = `${minute}分`
      minuteHira = hiraMap[tens]
      minuteRomaji = romajiMap[tens]
      isPun = true
      specialNotes.push('Tens of minutes always use ぷん (pun) with gemination (っ)')
    } else {
      const onesMap: Record<number, { hira: string; romaji: string; isPun: boolean }> = {
        1: { hira: 'いっぷん', romaji: 'ippun', isPun: true },
        2: { hira: 'にふん', romaji: 'ni-fun', isPun: false },
        3: { hira: 'さんぷん', romaji: 'san-pun', isPun: true },
        4: { hira: 'よんぷん', romaji: 'yon-pun', isPun: true },
        5: { hira: 'ごふん', romaji: 'go-fun', isPun: false },
        6: { hira: 'ろっぷん', romaji: 'roppun', isPun: true },
        7: { hira: 'ななふん', romaji: 'nana-fun', isPun: false },
        8: { hira: 'はっぷん', romaji: 'happun', isPun: true },
        9: { hira: 'きゅうふん', romaji: 'kyuu-fun', isPun: false },
      }
      const o = onesMap[ones]
      minuteKanji = `${minute}分`
      minuteHira = tens === 0 ? o.hira : `${tensHira}${o.hira}`
      minuteRomaji = tens === 0 ? o.romaji : `${tensRomaji}${o.romaji}`
      isPun = o.isPun

      if (isPun) {
        specialNotes.push(`Ends in ${ones}分 → sound shift to ぷん (pun)`)
      }
    }
  }

  // Composite readings
  const fullKanji = `${ampmKanji} ${hInfo.kanji}${minuteKanji ? ` ${minuteKanji}` : ''}`
  const fullHira = `${ampmHira} ${hInfo.hira}${minuteHira ? ` ${minuteHira}` : ''}`
  const fullRomaji = `${ampmRomaji} ${hInfo.romaji}${minuteRomaji ? ` ${minuteRomaji}` : ''}`

  const padMin = minute < 10 ? `0${minute}` : `${minute}`
  const engPeriod = isPM ? 'PM' : 'AM'
  const fullEnglish = `${hour}:${padMin} ${engPeriod}${minute === 30 ? ' (Half past)' : minute === 0 ? " (O'clock)" : ''}`

  return {
    ampmKanji,
    ampmHira,
    ampmRomaji,
    hourKanji: hInfo.kanji,
    hourHira: hInfo.hira,
    hourRomaji: hInfo.romaji,
    isHourIrregular: Boolean(hInfo.isIrregular),
    hourNote: hInfo.note,
    minuteKanji,
    minuteHira,
    minuteRomaji,
    altMinuteKanji,
    altMinuteHira,
    isPun,
    specialNotes,
    fullKanji,
    fullHira,
    fullRomaji,
    fullEnglish,
  }
}

// ─── 3. INTERACTIVE CLOCK STUDIO ───────────────────────────────────────────

export interface InteractiveClockStudioProps {
  selectedHour?: number
  onHourSelect?: (hour: number) => void
}

export function InteractiveClockStudio({ selectedHour, onHourSelect }: InteractiveClockStudioProps) {
  const [hour, setHour] = useState<number>(selectedHour ?? 4)
  const [minute, setMinute] = useState<number>(30)
  const [isPM, setIsPM] = useState<boolean>(true)
  const [useKanjiDial, setUseKanjiDial] = useState<boolean>(false)
  const [isLive, setIsLive] = useState<boolean>(false)

  // Sync when parent changes selected hour
  useEffect(() => {
    if (selectedHour !== undefined && selectedHour >= 1 && selectedHour <= 12) {
      setHour(selectedHour)
      setIsLive(false)
    }
  }, [selectedHour])

  // Live real-time clock ticker
  useEffect(() => {
    if (!isLive) return
    const updateTime = () => {
      const now = new Date()
      let h = now.getHours()
      const m = now.getMinutes()
      const pm = h >= 12
      h = h % 12
      if (h === 0) h = 12
      setHour(h)
      setMinute(m)
      setIsPM(pm)
    }
    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [isLive])

  const timeInfo = getTimeJapanese(hour, minute, isPM)

  const handleAudioPlay = () => {
    // Play the natural hiragana phrase
    const audioText = timeInfo.altMinuteHira
      ? `${timeInfo.ampmHira} ${timeInfo.hourHira} ${timeInfo.altMinuteHira}`
      : timeInfo.fullHira
    playKanaAudio(audioText)
  }

  const handlePreset = (h: number, m: number, pm: boolean) => {
    setIsLive(false)
    setHour(h)
    setMinute(m)
    setIsPM(pm)
    if (onHourSelect) onHourSelect(h)
  }

  const adjustMinute = (delta: number) => {
    setIsLive(false)
    let newMin = minute + delta
    let newHour = hour
    if (newMin >= 60) {
      newHour = newHour === 12 ? 1 : newHour + 1
      newMin = newMin % 60
    } else if (newMin < 0) {
      newHour = newHour === 1 ? 12 : newHour - 1
      newMin = 60 + newMin
    }
    setHour(newHour)
    setMinute(newMin)
    if (onHourSelect) onHourSelect(newHour)
  }

  return (
    <div className="bg-surface border border-accent/20 rounded-2xl p-4 sm:p-6 shadow-card hover:border-accent/40 transition-all">
      {/* Studio Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4 pb-3 border-b border-border">
        <div className="flex items-center gap-2">
          <span className="p-2 rounded-xl bg-accent-soft text-accent text-lg">🕐</span>
          <div>
            <h3 className="text-base font-bold text-text-primary flex items-center gap-2">
              Interactive Japanese Clock Studio
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-accent/10 text-accent font-medium">
                Live Visualizer
              </span>
            </h3>
            <p className="text-xs text-text-tertiary">
              Turn hands, adjust time, and learn how Japanese time readings and irregular sound shifts work
            </p>
          </div>
        </div>

        {/* Controls: Kanji Dial Toggle & Live Sync */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setUseKanjiDial(!useKanjiDial)}
            className={`text-xs px-2.5 py-1.5 rounded-lg border transition-all font-japanese ${
              useKanjiDial
                ? 'bg-accent text-white border-accent shadow-sm'
                : 'bg-surface-2 text-text-secondary border-border hover:border-accent/40'
            }`}
            title="Toggle Arabic (1-12) vs Kanji (一〜十二) clock numbers"
          >
            {useKanjiDial ? '漢 Kanji Dial' : '123 Numbers'}
          </button>
          <button
            type="button"
            onClick={() => setIsLive(!isLive)}
            className={`text-xs px-2.5 py-1.5 rounded-lg border flex items-center gap-1.5 transition-all ${
              isLive
                ? 'bg-emerald-500 text-white border-emerald-600 shadow-sm animate-pulse'
                : 'bg-surface-2 text-text-secondary border-border hover:border-accent/40'
            }`}
            title="Sync with current real device time"
          >
            <RefreshCw size={12} className={isLive ? 'animate-spin' : ''} />
            {isLive ? 'Live Now (現在)' : 'Sync Real Time'}
          </button>
        </div>
      </div>

      {/* Main Studio Grid: Clock on Left, Japanese Reading on Right */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* Left Column: Analog Clock Face */}
        <div className="md:col-span-5 flex flex-col items-center justify-center p-2">
          <div className="relative group p-2">
            <AnalogClock
              hour={hour}
              minute={minute}
              size={210}
              showNumbers={true}
              kanjiNumerals={useKanjiDial}
              className="drop-shadow-md"
            />
            {/* Quick ± Buttons floating under clock */}
            <div className="flex items-center justify-center gap-1.5 mt-3">
              <button
                type="button"
                onClick={() => adjustMinute(-15)}
                className="text-[11px] px-2 py-1 rounded bg-surface-2 hover:bg-accent-soft hover:text-accent border border-border transition-all"
              >
                -15m
              </button>
              <button
                type="button"
                onClick={() => adjustMinute(-5)}
                className="text-[11px] px-2 py-1 rounded bg-surface-2 hover:bg-accent-soft hover:text-accent border border-border transition-all"
              >
                -5m
              </button>
              <button
                type="button"
                onClick={() => adjustMinute(5)}
                className="text-[11px] px-2 py-1 rounded bg-surface-2 hover:bg-accent-soft hover:text-accent border border-border transition-all"
              >
                +5m
              </button>
              <button
                type="button"
                onClick={() => adjustMinute(15)}
                className="text-[11px] px-2 py-1 rounded bg-surface-2 hover:bg-accent-soft hover:text-accent border border-border transition-all"
              >
                +15m
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Dynamic Japanese Time Breakdown */}
        <div className="md:col-span-7 space-y-4">
          {/* Main Japanese Reading Card */}
          <div className="bg-surface-2/70 border border-border/80 rounded-xl p-4 relative overflow-hidden">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs px-2 py-0.5 rounded-full font-bold bg-accent/15 text-accent">
                    {timeInfo.fullEnglish}
                  </span>
                  {timeInfo.isHourIrregular && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400 font-semibold flex items-center gap-1">
                      ⚠️ Irregular Hour
                    </span>
                  )}
                  {timeInfo.isPun && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-sky-500/15 text-sky-600 dark:text-sky-400 font-semibold">
                      Sound Shift: ぷん
                    </span>
                  )}
                </div>

                {/* Big Kanji */}
                <h2 className="text-2xl sm:text-3xl font-bold font-japanese text-text-primary tracking-wide">
                  {timeInfo.fullKanji}
                  {timeInfo.altMinuteKanji && (
                    <span className="text-lg text-text-tertiary font-normal ml-2">
                      ({timeInfo.ampmKanji} {timeInfo.hourKanji} {timeInfo.altMinuteKanji})
                    </span>
                  )}
                </h2>

                {/* Hiragana */}
                <p className="text-base sm:text-lg font-japanese text-accent font-medium mt-1">
                  {timeInfo.fullHira}
                  {timeInfo.altMinuteHira && (
                    <span className="text-text-tertiary text-sm ml-2">
                      ({timeInfo.ampmHira} {timeInfo.hourHira} {timeInfo.altMinuteHira})
                    </span>
                  )}
                </p>

                {/* Romaji */}
                <p className="text-xs text-text-tertiary italic mt-0.5">
                  {timeInfo.fullRomaji}
                </p>
              </div>

              {/* Audio Listen Button */}
              <button
                type="button"
                onClick={handleAudioPlay}
                className="p-3 rounded-xl bg-accent text-white hover:bg-accent/90 shadow-md active:scale-95 transition-all flex flex-col items-center gap-1 min-w-[54px]"
                title="Listen to Japanese pronunciation"
              >
                <Volume2 size={18} />
                <span className="text-[10px] font-medium">Listen</span>
              </button>
            </div>

            {/* Smart Linguistic Tips Box */}
            {timeInfo.specialNotes.length > 0 && (
              <div className="mt-3 pt-3 border-t border-border/60 space-y-1">
                {timeInfo.specialNotes.map((note, idx) => (
                  <p key={idx} className="text-xs text-text-secondary flex items-center gap-1.5">
                    <span className="text-accent">💡</span> {note}
                  </p>
                ))}
              </div>
            )}
          </div>

          {/* Interactive Sliders / Pickers */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Hour Picker */}
            <div className="bg-surface-2/40 border border-border rounded-xl p-3">
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-semibold text-text-secondary">
                  Hour (時): <span className="text-accent font-bold">{hour}時 ({timeInfo.hourHira})</span>
                </label>
                <span className="text-[10px] text-text-tertiary">1 — 12</span>
              </div>
              <input
                type="range"
                min="1"
                max="12"
                value={hour}
                onChange={(e) => {
                  setIsLive(false)
                  const h = parseInt(e.target.value, 10)
                  setHour(h)
                  if (onHourSelect) onHourSelect(h)
                }}
                className="w-full accent-accent cursor-pointer"
              />
            </div>

            {/* Minute Picker */}
            <div className="bg-surface-2/40 border border-border rounded-xl p-3">
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-semibold text-text-secondary">
                  Minute (分): <span className="text-accent font-bold">{minute}分 {timeInfo.minuteHira ? `(${timeInfo.minuteHira})` : ''}</span>
                </label>
                <span className="text-[10px] text-text-tertiary">00 — 59</span>
              </div>
              <input
                type="range"
                min="0"
                max="59"
                value={minute}
                onChange={(e) => {
                  setIsLive(false)
                  setMinute(parseInt(e.target.value, 10))
                }}
                className="w-full accent-accent cursor-pointer"
              />
            </div>
          </div>

          {/* AM / PM Toggle & Common Presets */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
            <div className="flex items-center gap-1 bg-surface-2 p-1 rounded-xl border border-border">
              <button
                type="button"
                onClick={() => { setIsLive(false); setIsPM(false); }}
                className={`text-xs px-3 py-1 rounded-lg font-medium transition-all ${
                  !isPM
                    ? 'bg-accent text-white shadow-sm'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                午前 AM
              </button>
              <button
                type="button"
                onClick={() => { setIsLive(false); setIsPM(true); }}
                className={`text-xs px-3 py-1 rounded-lg font-medium transition-all ${
                  isPM
                    ? 'bg-accent text-white shadow-sm'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                午後 PM
              </button>
            </div>

            {/* Quick Practice Presets */}
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-[10px] text-text-tertiary font-medium">Quick Presets:</span>
              <button
                type="button"
                onClick={() => handlePreset(4, 0, true)}
                className="text-[11px] px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 hover:bg-amber-500/20 border border-amber-500/20 font-japanese transition-all"
                title="4:00 PM (よじ)"
              >
                4:00 (よじ⚠️)
              </button>
              <button
                type="button"
                onClick={() => handlePreset(9, 0, false)}
                className="text-[11px] px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 hover:bg-amber-500/20 border border-amber-500/20 font-japanese transition-all"
                title="9:00 AM (くじ)"
              >
                9:00 (くじ⚠️)
              </button>
              <button
                type="button"
                onClick={() => handlePreset(3, 30, true)}
                className="text-[11px] px-2 py-0.5 rounded-full bg-accent-soft text-accent hover:bg-accent/20 border border-accent/20 font-japanese transition-all"
                title="3:30 PM (さんじ はん)"
              >
                3:30 (はん)
              </button>
              <button
                type="button"
                onClick={() => handlePreset(7, 15, false)}
                className="text-[11px] px-2 py-0.5 rounded-full bg-surface-2 text-text-secondary hover:text-text-primary border border-border font-japanese transition-all"
                title="7:15 AM (しちじ じゅうごふん)"
              >
                7:15
              </button>
              <button
                type="button"
                onClick={() => handlePreset(12, 0, true)}
                className="text-[11px] px-2 py-0.5 rounded-full bg-surface-2 text-text-secondary hover:text-text-primary border border-border font-japanese transition-all"
                title="12:00 PM (ちょうど 12時)"
              >
                12:00
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
