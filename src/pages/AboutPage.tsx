import { useState, useEffect } from 'react'
import {
  Mail,
  Phone,
  MapPin,
  Star,
  Globe,
  BookOpen,
  Users,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  ExternalLink,
  Heart,
  Zap,
  Volume2,
  Check,
  GraduationCap,
  Award,
  Calendar,
  MessageCircle,
  X,
} from 'lucide-react'

// ─── Floating sakura petal animation ─────────────────────────────────────────

interface PetalConfig {
  id: number
  top: string
  left: string
  fontSize: string
  animationDelay: string
  animationDuration: string
  opacity: number
}

function SakuraField() {
  const [petals] = useState<PetalConfig[]>([
    { id: 1, top: '12%', left: '6%', fontSize: '14px', animationDelay: '0s', animationDuration: '4.5s', opacity: 0.8 },
    { id: 2, top: '22%', left: '88%', fontSize: '11px', animationDelay: '0.8s', animationDuration: '5.5s', opacity: 0.7 },
    { id: 3, top: '68%', left: '4%', fontSize: '16px', animationDelay: '1.4s', animationDuration: '4s', opacity: 0.85 },
    { id: 4, top: '78%', left: '92%', fontSize: '12px', animationDelay: '2.1s', animationDuration: '6s', opacity: 0.65 },
    { id: 5, top: '45%', left: '2%', fontSize: '10px', animationDelay: '2.8s', animationDuration: '5s', opacity: 0.7 },
    { id: 6, top: '35%', left: '95%', fontSize: '13px', animationDelay: '1.1s', animationDuration: '4.8s', opacity: 0.75 },
  ])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
      {petals.map((p) => (
        <div
          key={p.id}
          className="absolute select-none animate-bounce transition-opacity duration-1000"
          style={{
            top: p.top,
            left: p.left,
            fontSize: p.fontSize,
            animationDelay: p.animationDelay,
            animationDuration: p.animationDuration,
            opacity: p.opacity,
          }}
        >
          🌸
        </div>
      ))}
    </div>
  )
}

// ─── Animated counter ─────────────────────────────────────────────────────────

function AnimatedNumber({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let start = 0
    const step = Math.ceil(target / 50)
    const timer = setInterval(() => {
      start += step
      if (start >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(start)
      }
    }, 25)
    return () => clearInterval(timer)
  }, [target])

  return <span>{count}{suffix}</span>
}

// ─── Team Data ────────────────────────────────────────────────────────────────

interface TeamMember {
  id: string
  name: string
  nameJa: string
  role: string
  roleJa: string
  watermark: string
  imageSrc: string
  imageFallback: string
  accent: 'rose' | 'indigo'
  summary: string
  bio: string
  philosophy: string
  experienceYears: string
  specialties: string[]
  classes: string[]
  achievements: string[]
  quote: {
    ja: string
    romaji: string
    en: string
  }
}

const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'prajakta',
    name: 'Mrs. Prajakta Anup Kanere',
    nameJa: 'プラジャクタ・アヌプ・カネレ先生',
    role: 'Japanese Language Professor',
    roleJa: '日本語主任教授',
    watermark: '先生',
    imageSrc: '/images/professor.jpg',
    imageFallback: '👩‍🏫',
    accent: 'rose',
    summary:
      'With deep expertise in JLPT preparation and a passion for making Japanese accessible, Mrs. Prajakta brings years of teaching experience with a focus on exam success and conversational fluency.',
    bio:
      'Mrs. Prajakta is an experienced Japanese language educator dedicated to helping students conquer the Japanese-Language Proficiency Test (JLPT) from scratch. Known for her structured, empathetic teaching approach, she simplifies intricate grammar points, decodes complex kanji radicals, and instills real conversational confidence in every learner.',
    philosophy:
      'Language is not just memorization—it is the heartbeat of human connection. When you understand Japanese culture and nuances, the grammar naturally falls into place.',
    experienceYears: '6+ Years',
    specialties: ['JLPT N5, N4 & N3 Mastery', 'Kanji Radicals & Mnemonics', 'Spoken Conversational Japanese', 'Particle Clarity Drills'],
    classes: ['Live Interactive Batches (N5, N4, N3)', 'One-on-One Speaking Sessions', 'JLPT Mock Test Reviews'],
    achievements: [
      'Hundreds of students successfully certified in JLPT N5, N4 & N3',
      'Developed structured visual grammar frameworks for Indian learners',
      'High student retention and 5-star student satisfaction ratings',
    ],
    quote: {
      ja: '継続は力なり',
      romaji: 'Keizoku wa chikara nari',
      en: 'Perseverance is power — consistent practice yields remarkable results.',
    },
  },
  {
    id: 'anup',
    name: 'Mr. Anup Arun Kanere',
    nameJa: 'アヌプ・アルン・カネレ氏',
    role: 'Founder & Director',
    roleJa: '創設者・ディレクター',
    watermark: '創設者',
    imageSrc: '/images/founder.jpg',
    imageFallback: '👨‍💼',
    accent: 'indigo',
    summary:
      'Driven by a vision to democratize Japanese education in India, Mr. Anup Kanere founded JAPANORA to bridge the gap between aspiring learners and world-class Japanese language instruction.',
    bio:
      'Mr. Anup Kanere is an entrepreneur and educational visionary committed to opening global career pathways for Indian students and professionals through Japanese language fluency. Under his guidance, JAPANORA has built an ecosystem that harmonizes traditional pedagogy with modern interactive technology.',
    philosophy:
      'Our mission is to empower every learner with the tools, community, and guidance needed to turn a dream of working or studying in Japan into an achievable reality.',
    experienceYears: '8+ Years Tech & Education',
    specialties: ['Curriculum Design & Strategy', 'Education Technology', 'Cross-Cultural Guidance', 'Student Mentorship'],
    classes: ['Course Guidance & Placement Orientation', 'Cultural Immersion Seminars'],
    achievements: [
      'Established JAPANORA as a multi-disciplinary Japanese language center',
      'Architected the comprehensive JLPT N5 digital learning platform',
      'Fostered career mentorship programs for engineering and IT students targeting Japan',
    ],
    quote: {
      ja: '初志貫徹',
      romaji: 'Shoshi kantetsu',
      en: 'Carrying out one’s original intention until the very end.',
    },
  },
]

// ─── JLPT Level Details ───────────────────────────────────────────────────────

interface LevelInfo {
  level: string
  titleJa: string
  titleEn: string
  vocab: string
  kanji: string
  grammar: string
  hours: string
  description: string
  badgeText: string
  badgeVariant: 'active' | 'live' | 'future'
  features: string[]
}

const JLPT_LEVELS: LevelInfo[] = [
  {
    level: 'N5',
    titleJa: '初級基礎',
    titleEn: 'Basic Everyday Foundation',
    vocab: '800+ words',
    kanji: '110+ characters',
    grammar: '60+ patterns',
    hours: '150 hrs',
    description:
      'The gateway to Japanese. Covers basic hiragana, katakana, essential kanji, fundamental sentence particles, and daily greetings.',
    badgeText: 'Live on Web Platform & Live Classes',
    badgeVariant: 'active',
    features: [
      'Interactive flashcards with audio & romanization',
      'Particle usage and sentence construction matrix',
      'Greetings, numbers, dates, and family terms',
      'Live online teacher-led batches available',
    ],
  },
  {
    level: 'N4',
    titleJa: '初級応用',
    titleEn: 'Elementary Daily Life',
    vocab: '1,500+ words',
    kanji: '300+ characters',
    grammar: '120+ patterns',
    hours: '300 hrs',
    description:
      'Understand passages on familiar daily topics written in basic vocabulary and kanji. Communicate smoothly in ordinary life situations.',
    badgeText: 'Live Interactive Classes Enrolling Now',
    badgeVariant: 'live',
    features: [
      'Conjugations: Potential, Passive, Causative & Conditional',
      'Extended reading comprehension passages',
      'Daily conversational listening scenarios',
      'Live batches guided by Mrs. Prajakta Kanere',
    ],
  },
  {
    level: 'N3',
    titleJa: '中級導入',
    titleEn: 'Intermediate Bridge',
    vocab: '3,750+ words',
    kanji: '650+ characters',
    grammar: '180+ patterns',
    hours: '450 hrs',
    description:
      'The critical milestone bridging beginner and advanced Japanese. Enables understanding of newspaper headlines, everyday work communications, and natural-speed dialogues.',
    badgeText: 'Live Interactive Classes Available',
    badgeVariant: 'live',
    features: [
      'Nuanced nuance distinctions between similar grammar patterns',
      'Workplace and business email comprehension',
      'Natural-speed conversational listening drills',
      'Direct teacher feedback and homework grading',
    ],
  },
  {
    level: 'N2',
    titleJa: '中上級',
    titleEn: 'Pre-Advanced Business Level',
    vocab: '6,000+ words',
    kanji: '1,000+ characters',
    grammar: '200+ patterns',
    hours: '600 hrs',
    description:
      'Understand Japanese in a wide range of everyday and professional situations. Standard benchmark required for technical employment in Japan.',
    badgeText: 'Curriculum In Development',
    badgeVariant: 'future',
    features: [
      'Advanced editorial and essay reading comprehension',
      'Formal honorifics (Keigo: Sonkeigo & Kenjougo)',
      'Professional business presentations',
    ],
  },
  {
    level: 'N1',
    titleJa: '上級マスター',
    titleEn: 'Advanced Native Fluency',
    vocab: '10,000+ words',
    kanji: '2,000+ characters',
    grammar: 'Complex idioms',
    hours: '900+ hrs',
    description:
      'Full command of Japanese in complex, highly specialized, and abstract scenarios. Ability to read scholarly texts, legal terms, and literary works.',
    badgeText: 'Future Roadmap',
    badgeVariant: 'future',
    features: [
      'Mastery of all Joyo Kanji',
      'High-speed academic reading & debate',
      'Native-level cultural idioms and proverbs',
    ],
  },
]

// ─── Proverb / Wisdom Card ────────────────────────────────────────────────────

const PROVERBS = [
  {
    kanji: '千里の道も一歩から',
    hiragana: 'せんりのみちもいっぽから',
    romaji: 'Senri no michi mo ippo kara',
    meaning: 'Even a journey of a thousand miles begins with a single step.',
    author: 'Traditional Proverb (老子 / Japanese Wisdom)',
  },
  {
    kanji: '七転び八起き',
    hiragana: 'ななころびやおき',
    romaji: 'Nanakorobi yaoki',
    meaning: 'Fall down seven times, stand up eight — resilience overcomes all adversity.',
    author: 'Zen Idiom (四字熟語)',
  },
  {
    kanji: '継続は力なり',
    hiragana: 'けいぞくはちからなり',
    romaji: 'Keizoku wa chikara nari',
    meaning: 'Continuity is power — small, persistent daily efforts build extraordinary mastery.',
    author: 'Japanese Educational Motto',
  },
  {
    kanji: '一期一会',
    hiragana: 'いちごいちえ',
    romaji: 'Ichigo ichie',
    meaning: 'One time, one meeting — treasure every encounter as once-in-a-lifetime.',
    author: 'Tea Ceremony Philosophy (茶道)',
  },
]

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────

export default function AboutPage() {
  const [contactCopied, setContactCopied] = useState<string | null>(null)
  const [selectedLevelIndex, setSelectedLevelIndex] = useState(0)
  const [selectedTeamIndex, setSelectedTeamIndex] = useState<number | null>(null)
  const [proverbIndex, setProverbIndex] = useState(0)
  const [inquiryCourse, setInquiryCourse] = useState('JLPT N5 (Platform & Live Classes)')

  const currentMember = selectedTeamIndex !== null ? TEAM_MEMBERS[selectedTeamIndex] : null
  const currentProverb = PROVERBS[proverbIndex]

  function copyToClipboard(text: string, label: string) {
    navigator.clipboard.writeText(text).then(() => {
      setContactCopied(label)
      setTimeout(() => setContactCopied(null), 2000)
    })
  }

  function playJapaneseSpeech(text: string) {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel()
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = 'ja-JP'
      utterance.rate = 0.85
      window.speechSynthesis.speak(utterance)
    }
  }

  function handleTeamPrev() {
    if (selectedTeamIndex !== null) {
      setSelectedTeamIndex(selectedTeamIndex === 0 ? TEAM_MEMBERS.length - 1 : selectedTeamIndex - 1)
    }
  }

  function handleTeamNext() {
    if (selectedTeamIndex !== null) {
      setSelectedTeamIndex(selectedTeamIndex === TEAM_MEMBERS.length - 1 ? 0 : selectedTeamIndex + 1)
    }
  }

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (selectedTeamIndex === null) return
      if (e.key === 'ArrowLeft') {
        e.preventDefault()
        handleTeamPrev()
      } else if (e.key === 'ArrowRight') {
        e.preventDefault()
        handleTeamNext()
      } else if (e.key === 'Escape') {
        setSelectedTeamIndex(null)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedTeamIndex])

  const selectedLevel = JLPT_LEVELS[selectedLevelIndex]

  return (
    <div className="space-y-12 animate-fade-in pb-12">

      {/* ── 1. HERO BANNER ───────────────────────────────────────────────────── */}
      <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/10 group">
        {/* Background photo */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
          style={{ backgroundImage: 'url(/images/hero-banner.jpg)' }}
        />
        {/* Modern dark gradient overlay with color tint */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/75 to-black/40 backdrop-blur-[2px]" />
        
        {/* Subtle sakura animation */}
        <SakuraField />

        <div className="relative z-20 px-6 py-12 sm:px-10 sm:py-16 md:py-20 max-w-4xl">
          {/* Logo & Brand Identity */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 mb-6">
            <div className="relative">
              <img
                src="/images/japanora-logo.jpg"
                alt="JAPANORA Logo"
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-contain bg-white shadow-2xl ring-4 ring-white/20 p-1 flex-shrink-0"
              />
              <span className="absolute -bottom-2 -right-2 bg-rose-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow">
                公式
              </span>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold text-rose-300 uppercase tracking-widest">
                  Japanese Learning Institute
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                <span className="text-xs text-white/70 font-japanese">日本語教育</span>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-wider text-white leading-none">
                JAPANORA
              </h1>
              <p className="text-lg sm:text-xl text-rose-200 font-medium tracking-wide mt-1">
                The World of Japan — <span className="font-japanese text-white/90">日本の世界</span>
              </p>
            </div>
          </div>

          {/* Pillars */}
          <div className="flex flex-wrap gap-2 mb-6">
            {['Language 言語', 'Culture 文化', 'Arts 芸術', 'Dance 舞踊', 'Traditions 伝統', 'Lifestyle 暮らし'].map((p) => (
              <span
                key={p}
                className="text-xs font-semibold text-white/90 bg-white/10 border border-white/20 backdrop-blur-md px-3 py-1 rounded-full tracking-wide shadow-sm"
              >
                {p}
              </span>
            ))}
          </div>

          {/* Description */}
          <p className="text-base text-white/80 leading-relaxed max-w-2xl mb-8">
            Empowering passionate learners with structured JLPT curriculum, authentic cultural immersion, and live interactive guidance led by experienced Japanese educators.
          </p>

          {/* Quick Stats Strip */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-3.5 py-2 rounded-xl text-white text-xs font-medium">
              <span className="text-rose-300 font-bold text-sm">800+</span>
              <span>N5 Vocab</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-3.5 py-2 rounded-xl text-white text-xs font-medium">
              <span className="text-rose-300 font-bold text-sm">110+</span>
              <span>Kanji</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-3.5 py-2 rounded-xl text-white text-xs font-medium">
              <span className="text-rose-300 font-bold text-sm">N5 · N4 · N3</span>
              <span>Live Batches</span>
            </div>
            <a
              href="#meet-team"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-rose-500 hover:bg-rose-600 text-white text-xs font-semibold shadow-lg hover:scale-105 active:scale-95 transition-all ml-auto"
            >
              <span>Meet Faculty</span>
              <ChevronRight size={14} />
            </a>
          </div>
        </div>
      </div>

      {/* ── 2. METRICS ROW ───────────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { icon: <BookOpen size={22} />, val: 800, suffix: '+', label: 'Vocabulary Words', labelJa: '必須単語' },
          { icon: <Star size={22} />, val: 110, suffix: '+', label: 'N5 Kanji Characters', labelJa: '基本漢字' },
          { icon: <Users size={22} />, val: 3, suffix: ' Levels', label: 'Live Faculty Classes', labelJa: '指導レベル' },
          { icon: <Globe size={22} />, val: 5, suffix: ' Levels', label: 'JLPT Curriculum', labelJa: 'JLPT試験対応' },
        ].map((stat, i) => (
          <div
            key={i}
            className="bg-surface border border-border rounded-2xl p-5 shadow-card hover:border-accent/40 hover:shadow-card-hover transition-all duration-300 group relative overflow-hidden"
          >
            <div className="w-12 h-12 rounded-xl bg-accent-soft border border-accent/20 flex items-center justify-center text-accent mb-3 group-hover:scale-110 transition-transform">
              {stat.icon}
            </div>
            <p className="text-3xl font-black text-text-primary tracking-tight">
              <AnimatedNumber target={stat.val} suffix={stat.suffix} />
            </p>
            <p className="text-sm font-semibold text-text-primary mt-1">{stat.label}</p>
            <p className="text-[11px] font-japanese text-text-tertiary mt-0.5">{stat.labelJa}</p>
          </div>
        ))}
      </div>

      {/* ── 3. ABOUT JAPANORA ────────────────────────────────────────────────── */}
      <div className="bg-surface border border-border rounded-3xl p-6 sm:p-8 shadow-card relative overflow-hidden">
        <div className="absolute top-2 right-4 text-[130px] font-japanese font-bold text-accent/5 select-none pointer-events-none leading-none">
          私塾
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-accent-soft border border-accent/20 flex items-center justify-center text-accent">
              <Sparkles size={20} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-text-primary">About JAPANORA</h2>
              <p className="text-xs font-japanese text-text-tertiary">私たちについて — The Vision & Philosophy</p>
            </div>
          </div>

          <div className="grid md:grid-cols-12 gap-6">
            <div className="md:col-span-7 space-y-4 text-sm text-text-secondary leading-relaxed">
              <p>
                <strong className="text-text-primary font-bold">JAPANORA</strong> was founded with a singular purpose: to make the Japanese language and its extraordinary culture <strong className="text-accent font-semibold">accessible, structured, and profoundly transformative</strong> for every aspiring student.
              </p>
              <p>
                We believe that learning Japanese is far more than vocabulary and grammar rules. It is an exploration into a rich universe encompassing <strong className="text-text-primary">Language · Culture · Arts · Dance · Traditions · Lifestyle</strong>. Every lesson is meticulously structured around the international <strong className="text-text-primary">JLPT framework</strong>, equipping you with authentic real-world fluency and exam confidence.
              </p>
              <p>
                While this web platform is currently centered on the <strong className="text-accent">JLPT N5</strong> level with deep reference materials, our experienced faculty conducts <strong className="text-text-primary">live online interactive classes</strong> for <strong className="text-text-primary">JLPT N5, N4, and N3</strong>.
              </p>
            </div>

            <div className="md:col-span-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-3">
              {[
                { icon: '🎯', title: 'Exam-Oriented Pedagogy', desc: 'Every lesson aligned with JLPT test patterns and question styles' },
                { icon: '👩‍🏫', title: 'Live Teacher Guidance', desc: 'Real-time live video classes with personal doubt resolution' },
                { icon: '📱', title: 'Interactive Self-Study', desc: 'Clean, lightning-fast digital reference cards anytime, anywhere' },
                { icon: '🌸', title: 'Deep Cultural Immersion', desc: 'Learn nuances, etiquette, and customs alongside grammar' },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-3.5 bg-surface-2 border border-border rounded-xl hover:border-accent/40 transition-colors"
                >
                  <span className="text-xl flex-shrink-0 mt-0.5">{item.icon}</span>
                  <div>
                    <p className="text-xs font-bold text-text-primary">{item.title}</p>
                    <p className="text-[11px] text-text-secondary leading-relaxed mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── 4. MEET OUR TEAM (REDESIGNED FOR DARK MODE & DYNAMICS) ───────────── */}
      <div id="meet-team" className="scroll-mt-6">
        <div className="text-center max-w-xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 bg-accent-soft border border-accent/20 rounded-full px-4 py-1.5 mb-3">
            <Heart size={13} className="text-accent" />
            <span className="text-xs font-semibold text-accent uppercase tracking-wider">The Hearts & Minds</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-text-primary">Meet Our Team</h2>
          <p className="text-sm text-text-secondary mt-1 font-japanese">
            指導陣のご紹介 — Tap any card to view detailed bio & credentials
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {TEAM_MEMBERS.map((member, index) => {
            const isRose = member.accent === 'rose'
            return (
              <div
                key={member.id}
                onClick={() => setSelectedTeamIndex(index)}
                className={`group relative rounded-3xl p-6 sm:p-8 cursor-pointer transition-all duration-300 active:scale-[0.99] border bg-surface overflow-hidden shadow-card hover:shadow-2xl ${
                  isRose
                    ? 'border-rose-500/25 hover:border-rose-400 dark:border-rose-500/30'
                    : 'border-indigo-500/25 hover:border-indigo-400 dark:border-indigo-500/30'
                }`}
              >
                {/* Subtle dark-aware ambient glow */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br opacity-40 group-hover:opacity-75 transition-opacity ${
                    isRose
                      ? 'from-rose-500/10 via-transparent to-transparent'
                      : 'from-indigo-500/10 via-transparent to-transparent'
                  }`}
                />

                {/* Japanese watermark in corner */}
                <div
                  className={`absolute -bottom-4 -right-2 text-7xl font-japanese font-black select-none pointer-events-none transition-transform group-hover:scale-110 ${
                    isRose ? 'text-rose-500/5 dark:text-rose-400/5' : 'text-indigo-500/5 dark:text-indigo-400/5'
                  }`}
                >
                  {member.watermark}
                </div>

                <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
                  {/* Portrait with Glowing Ring */}
                  <div className="relative flex-shrink-0">
                    <div
                      className={`w-32 h-32 sm:w-36 sm:h-36 rounded-full overflow-hidden shadow-xl ring-4 transition-all duration-300 group-hover:scale-105 ${
                        isRose
                          ? 'ring-rose-500/30 group-hover:ring-rose-400/60'
                          : 'ring-indigo-500/30 group-hover:ring-indigo-400/60'
                      }`}
                    >
                      <img
                        src={member.imageSrc}
                        alt={member.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.currentTarget
                          target.style.display = 'none'
                          if (target.parentElement) {
                            target.parentElement.innerHTML = `<div class="w-full h-full flex items-center justify-center text-5xl bg-surface-2">${member.imageFallback}</div>`
                          }
                        }}
                      />
                    </div>
                    <span
                      className={`absolute -bottom-1 -right-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold shadow-md border ${
                        isRose
                          ? 'bg-rose-500 text-white border-rose-300'
                          : 'bg-indigo-500 text-white border-indigo-300'
                      }`}
                    >
                      {member.experienceYears}
                    </span>
                  </div>

                  {/* Information */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center justify-center sm:justify-between gap-2 mb-1">
                      <h3 className="text-xl font-bold text-text-primary group-hover:text-accent transition-colors">
                        {member.name}
                      </h3>
                      <span className="text-[11px] text-accent font-medium flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <span>Details</span>
                        <ChevronRight size={12} />
                      </span>
                    </div>

                    <p className="text-xs font-japanese text-text-tertiary mb-2">{member.nameJa}</p>

                    {/* Role Pill */}
                    <div
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold mb-3 border ${
                        isRose
                          ? 'bg-rose-500/15 text-rose-600 dark:text-rose-300 border-rose-500/30'
                          : 'bg-indigo-500/15 text-indigo-600 dark:text-indigo-300 border-indigo-500/30'
                      }`}
                    >
                      <span>{member.role}</span>
                      <span className="opacity-50">·</span>
                      <span className="font-japanese text-[11px]">{member.roleJa}</span>
                    </div>

                    <p className="text-xs sm:text-sm text-text-secondary leading-relaxed mb-4">
                      {member.summary}
                    </p>

                    {/* Tag Badges */}
                    <div className="flex flex-wrap justify-center sm:justify-start gap-1.5">
                      {member.specialties.slice(0, 3).map((tag, i) => (
                        <span
                          key={i}
                          className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full bg-surface-2 border border-border text-text-secondary"
                        >
                          {tag}
                        </span>
                      ))}
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-accent-soft text-accent">
                        +More
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* ── 5. JLPT INTERACTIVE ROADMAP ──────────────────────────────────────── */}
      <div className="bg-surface border border-border rounded-3xl p-6 sm:p-8 shadow-card space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-accent-soft border border-accent/20 flex items-center justify-center text-accent">
              <Zap size={20} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-text-primary">JLPT Curriculum Roadmap</h2>
              <p className="text-xs font-japanese text-text-tertiary">日本語能力試験ロードマップ — Click any level to explore</p>
            </div>
          </div>
          <span className="text-xs px-3 py-1 rounded-full bg-accent-soft border border-accent/20 text-accent font-semibold self-start sm:self-auto">
            Interactive Level Explorer
          </span>
        </div>

        {/* Level Tabs */}
        <div className="grid grid-cols-5 gap-2 sm:gap-3">
          {JLPT_LEVELS.map((lvl, index) => {
            const isSelected = selectedLevelIndex === index
            return (
              <button
                key={lvl.level}
                onClick={() => setSelectedLevelIndex(index)}
                className={`relative flex flex-col items-center justify-center py-3 sm:py-4 px-2 rounded-2xl border-2 transition-all duration-200 ${
                  isSelected
                    ? 'border-accent bg-accent text-white shadow-lg scale-105'
                    : 'border-border bg-surface-2 hover:border-accent/40 text-text-secondary'
                }`}
              >
                {lvl.badgeVariant === 'active' && (
                  <span className="absolute -top-2.5 bg-emerald-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-full shadow">
                    Live Web
                  </span>
                )}
                {lvl.badgeVariant === 'live' && (
                  <span className="absolute -top-2.5 bg-rose-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-full shadow whitespace-nowrap">
                    Live Classes
                  </span>
                )}
                <span className="text-2xl sm:text-3xl font-black font-japanese">{lvl.level}</span>
                <span className="text-[10px] font-japanese mt-0.5 opacity-80">{lvl.titleJa}</span>
              </button>
            )
          })}
        </div>

        {/* Selected Level Detail Panel */}
        <div className="bg-surface-2 border border-border rounded-2xl p-5 sm:p-6 space-y-5 animate-fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold text-accent">{selectedLevel.level}</span>
                <span className="text-sm font-japanese font-bold text-text-primary">
                  {selectedLevel.titleJa} — {selectedLevel.titleEn}
                </span>
              </div>
              <p className="text-xs text-text-secondary mt-1 max-w-2xl leading-relaxed">
                {selectedLevel.description}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-surface border border-border text-text-primary font-mono">
                ⏱ {selectedLevel.hours}
              </span>
              <span
                className={`text-xs font-bold px-3 py-1.5 rounded-xl border ${
                  selectedLevel.badgeVariant === 'active'
                    ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-600 dark:text-emerald-300'
                    : selectedLevel.badgeVariant === 'live'
                    ? 'bg-rose-500/15 border-rose-500/30 text-rose-600 dark:text-rose-300'
                    : 'bg-surface-2 border-border text-text-tertiary'
                }`}
              >
                {selectedLevel.badgeText}
              </span>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-surface p-3 rounded-xl border border-border text-center">
              <p className="text-[10px] font-bold text-text-tertiary uppercase">Vocabulary</p>
              <p className="text-base font-bold text-text-primary mt-0.5">{selectedLevel.vocab}</p>
            </div>
            <div className="bg-surface p-3 rounded-xl border border-border text-center">
              <p className="text-[10px] font-bold text-text-tertiary uppercase">Kanji</p>
              <p className="text-base font-bold text-text-primary mt-0.5">{selectedLevel.kanji}</p>
            </div>
            <div className="bg-surface p-3 rounded-xl border border-border text-center">
              <p className="text-[10px] font-bold text-text-tertiary uppercase">Grammar</p>
              <p className="text-base font-bold text-text-primary mt-0.5">{selectedLevel.grammar}</p>
            </div>
          </div>

          {/* Features List */}
          <div>
            <p className="text-xs font-bold text-text-tertiary uppercase tracking-wider mb-2">Key Highlights</p>
            <div className="grid sm:grid-cols-2 gap-2">
              {selectedLevel.features.map((feat, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-text-secondary">
                  <Check size={14} className="text-accent flex-shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── 6. DYNAMIC PROVERB OF WISDOM ─────────────────────────────────────── */}
      <div className="bg-surface border border-border rounded-3xl p-6 sm:p-8 shadow-card relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-accent uppercase tracking-widest">Japanese Cultural Wisdom</span>
            <div className="flex items-center gap-3 mt-1">
              <p className="text-2xl sm:text-3xl font-japanese font-bold text-text-primary">
                {currentProverb.kanji}
              </p>
              <button
                onClick={() => playJapaneseSpeech(currentProverb.kanji)}
                className="p-2 rounded-xl bg-accent-soft hover:bg-accent text-accent hover:text-white transition-all shadow-sm active:scale-95"
                title="Pronounce with Japanese speech"
                aria-label="Play Japanese audio"
              >
                <Volume2 size={18} />
              </button>
            </div>
            <p className="text-xs font-japanese text-text-tertiary mt-1">{currentProverb.hiragana} ({currentProverb.romaji})</p>
            <p className="text-sm font-medium text-text-secondary mt-2 italic max-w-xl">
              "{currentProverb.meaning}"
            </p>
            <p className="text-[11px] text-text-tertiary mt-0.5">— {currentProverb.author}</p>
          </div>

          <button
            onClick={() => setProverbIndex((proverbIndex + 1) % PROVERBS.length)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-surface-2 hover:bg-surface border border-border hover:border-accent text-xs font-semibold text-text-primary transition-all self-start sm:self-auto active:scale-95"
          >
            <Sparkles size={14} className="text-accent" />
            <span>Next Proverb ({proverbIndex + 1}/{PROVERBS.length})</span>
          </button>
        </div>
      </div>

      {/* ── 7. WHY LEARN JAPANESE ────────────────────────────────────────────── */}
      <div className="bg-surface border border-border rounded-3xl p-6 sm:p-8 shadow-card relative overflow-hidden">
        <div className="absolute top-1/2 -right-8 -translate-y-1/2 text-[160px] font-japanese font-black text-accent/5 select-none pointer-events-none leading-none">
          日本語
        </div>

        <div className="relative z-10">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-text-primary">Why Learn Japanese with JAPANORA?</h2>
            <p className="text-xs font-japanese text-text-tertiary mt-0.5">なぜ日本語を学ぶのか？ — Global Benefits & Career Horizons</p>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { emoji: '🗾', title: '125M+ Global Speakers', desc: 'Connect with a major world economic power and its warm, welcoming people' },
              { emoji: '💼', title: 'High-Demand Careers', desc: 'JLPT N5-N3 certified candidates enjoy premium hiring in IT, engineering, and commerce' },
              { emoji: '🎌', title: 'Authentic Cultural Access', desc: 'Experience anime, manga, literature, and cinema without translation loss' },
              { emoji: '🧠', title: 'Cognitive Agility', desc: 'Mastering three Japanese writing systems builds neuroplasticity and sharp focus' },
              { emoji: '✈️', title: 'Confidence in Japan', desc: 'Navigate bullet trains, izakayas, and ancient temples effortlessly as a traveler' },
              { emoji: '🌏', title: 'Education in Japan', desc: 'Unlock MEXT scholarships, prestigious university programs, and technical visas' },
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-3.5 p-4 rounded-2xl bg-surface-2 border border-border hover:border-accent/40 transition-all hover:scale-[1.02]"
              >
                <span className="text-2xl flex-shrink-0">{item.emoji}</span>
                <div>
                  <p className="text-sm font-bold text-text-primary">{item.title}</p>
                  <p className="text-xs text-text-secondary leading-relaxed mt-1">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── 8. CONTACT & LIVE ENROLLMENT ─────────────────────────────────────── */}
      <div className="bg-surface border border-border rounded-3xl p-6 sm:p-8 shadow-card relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center text-white shadow-md">
              <Mail size={18} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-text-primary">Contact & Live Class Admissions</h2>
              <p className="text-xs font-japanese text-text-tertiary">お問い合わせ・受講相談 — Reach out directly to our team</p>
            </div>
          </div>
          <p className="text-sm text-text-secondary mb-6 ml-0 sm:ml-[52px]">
            Ready to begin your journey or inquire about upcoming live batches with Mrs. Prajakta Kanere? Contact us directly — <span className="font-japanese font-semibold">どうぞお気軽にご連絡ください！</span>
          </p>

          {/* Contact Cards Grid */}
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            {/* Email */}
            <button
              onClick={() => copyToClipboard('kanereanup@gmail.com', 'email')}
              className="group flex items-start gap-4 p-5 bg-surface-2 border border-border rounded-2xl hover:border-rose-400/60 hover:shadow-lg transition-all text-left relative overflow-hidden"
            >
              <div className="w-11 h-11 rounded-xl bg-rose-500/15 border border-rose-500/30 flex items-center justify-center flex-shrink-0 text-rose-500 group-hover:scale-110 transition-transform">
                <Mail size={20} />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] font-bold text-rose-500 uppercase tracking-wider mb-0.5">Email Inquiries</p>
                <p className="text-sm font-bold text-text-primary break-all">kanereanup@gmail.com</p>
                <p className="text-[10px] text-text-tertiary mt-1 flex items-center gap-1 font-medium">
                  {contactCopied === 'email' ? '✓ Copied to clipboard!' : 'Click to copy email address'}
                  <ChevronRight size={10} />
                </p>
              </div>
            </button>

            {/* Phone */}
            <button
              onClick={() => copyToClipboard('+917720888632', 'phone')}
              className="group flex items-start gap-4 p-5 bg-surface-2 border border-border rounded-2xl hover:border-indigo-400/60 hover:shadow-lg transition-all text-left relative overflow-hidden"
            >
              <div className="w-11 h-11 rounded-xl bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center flex-shrink-0 text-indigo-500 group-hover:scale-110 transition-transform">
                <Phone size={20} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-indigo-500 uppercase tracking-wider mb-0.5">Phone & WhatsApp</p>
                <p className="text-sm font-bold text-text-primary">+91 7720888632</p>
                <p className="text-[10px] text-text-tertiary mt-1 flex items-center gap-1 font-medium">
                  {contactCopied === 'phone' ? '✓ Copied to clipboard!' : 'Click to copy number'}
                  <ChevronRight size={10} />
                </p>
              </div>
            </button>

            {/* Classes */}
            <div className="flex items-start gap-4 p-5 bg-surface-2 border border-border rounded-2xl">
              <div className="w-11 h-11 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center flex-shrink-0 text-emerald-500">
                <MapPin size={20} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-wider mb-0.5">Format</p>
                <p className="text-sm font-bold text-text-primary">Live Online Interactive</p>
                <p className="text-xs text-text-secondary mt-0.5">JLPT N5 · N4 · N3 Batches</p>
                <p className="text-[10px] font-japanese text-text-tertiary mt-1">オンライン全国対応</p>
              </div>
            </div>
          </div>

          {/* Quick Inquiry CTA Banner */}
          <div className="p-5 sm:p-6 bg-gradient-to-r from-accent/15 via-purple-500/10 to-rose-500/15 border border-accent/30 rounded-2xl space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div className="space-y-1">
                <p className="text-base font-bold text-text-primary flex items-center gap-2">
                  <Sparkles size={16} className="text-accent" />
                  <span>Ready to enroll in live online batches?</span>
                </p>
                <p className="text-xs text-text-secondary leading-relaxed">
                  Select your target course and send an inquiry on WhatsApp or email:
                </p>
              </div>

              {/* Dynamic Level Selector */}
              <div className="flex flex-wrap gap-1.5">
                {[
                  'JLPT N5 Batches',
                  'JLPT N4 Batches',
                  'JLPT N3 Batches',
                  'One-on-One Speaking',
                ].map((course) => (
                  <button
                    key={course}
                    type="button"
                    onClick={() => setInquiryCourse(course)}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                      inquiryCourse === course
                        ? 'bg-accent text-white shadow-sm scale-105'
                        : 'bg-surface border border-border text-text-secondary hover:text-text-primary hover:bg-surface-2'
                    }`}
                  >
                    {course}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-border/50">
              <span className="text-xs text-text-tertiary">
                Targeting: <strong className="text-accent">{inquiryCourse}</strong>
              </span>

              <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto">
                <a
                  href={`https://wa.me/917720888632?text=${encodeURIComponent(
                    `Hi Mrs. Prajakta & Mr. Anup, I would like to inquire about Japanese live classes (${inquiryCourse}) at JAPANORA.`
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-xl text-xs font-semibold shadow-md active:scale-95 transition-all"
                >
                  <MessageCircle size={15} />
                  <span>WhatsApp Inquiry</span>
                  <ExternalLink size={12} />
                </a>

                <a
                  href={`mailto:kanereanup@gmail.com?subject=${encodeURIComponent(
                    `Inquiry: Japanese Classes (${inquiryCourse}) at JAPANORA`
                  )}&body=${encodeURIComponent(
                    `Hi JAPANORA Team,\n\nI am interested in enrolling in Japanese classes (${inquiryCourse}). Please share details on upcoming batches and fees.\n\nThank you!`
                  )}`}
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 bg-accent hover:opacity-90 text-white px-4 py-2 rounded-xl text-xs font-semibold shadow-md active:scale-95 transition-all"
                >
                  <Mail size={15} />
                  <span>Email Inquiry</span>
                  <ExternalLink size={12} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── 9. TEAM MEMBER DETAIL MODAL (WITH PREV/NEXT NAVIGATION) ─────────── */}
      {currentMember && selectedTeamIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setSelectedTeamIndex(null)}
        >
          {/* Desktop Left Arrow */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              handleTeamPrev()
            }}
            aria-label="Previous team member"
            className="hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-surface/90 border border-border shadow-2xl text-text-primary mr-4 hover:bg-surface-2 transition-all hover:scale-110 active:scale-95"
          >
            <ChevronLeft size={28} />
          </button>

          <div
            className="bg-surface rounded-3xl border border-border shadow-2xl w-full max-w-2xl max-h-[92vh] overflow-y-auto p-6 sm:p-8 space-y-6 animate-in fade-in zoom-in-95 duration-150 relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header with Close */}
            <div className="flex items-start justify-between border-b border-border pb-4">
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-accent-soft text-accent uppercase tracking-wider">
                  Faculty Profile
                </span>
                <span className="text-xs text-text-tertiary font-mono">
                  {selectedTeamIndex + 1} of {TEAM_MEMBERS.length}
                </span>
              </div>
              <button
                onClick={() => setSelectedTeamIndex(null)}
                className="text-text-tertiary hover:text-text-primary p-1.5 rounded-xl hover:bg-surface-2 transition-colors"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            </div>

            {/* Portrait & Core Title */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
              <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden shadow-xl ring-4 ring-accent/30 flex-shrink-0 bg-surface-2">
                <img
                  src={currentMember.imageSrc}
                  alt={currentMember.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <h3 className="text-2xl font-bold text-text-primary">{currentMember.name}</h3>
                <p className="text-sm font-japanese text-text-tertiary mt-0.5">{currentMember.nameJa}</p>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-accent-soft text-accent border border-accent/20 mt-2">
                  <span>{currentMember.role}</span>
                  <span className="opacity-50">·</span>
                  <span className="font-japanese">{currentMember.roleJa}</span>
                </div>
                <p className="text-xs text-text-tertiary mt-2 flex items-center justify-center sm:justify-start gap-1 font-mono">
                  <GraduationCap size={14} className="text-accent" />
                  <span>Experience: {currentMember.experienceYears}</span>
                </p>
              </div>
            </div>

            {/* Philosophy quote */}
            <div className="bg-surface-2 rounded-2xl p-4 border border-border space-y-1">
              <p className="text-sm font-japanese font-bold text-text-primary">
                "{currentMember.quote.ja}"
              </p>
              <p className="text-xs text-text-secondary italic">
                {currentMember.quote.romaji} — {currentMember.quote.en}
              </p>
            </div>

            {/* Detailed Bio */}
            <div>
              <p className="text-xs font-bold text-text-tertiary uppercase tracking-wider mb-1.5">Background & Overview</p>
              <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                {currentMember.bio}
              </p>
            </div>

            {/* Philosophy */}
            <div>
              <p className="text-xs font-bold text-text-tertiary uppercase tracking-wider mb-1.5">Educational Philosophy</p>
              <p className="text-xs sm:text-sm text-text-secondary leading-relaxed italic bg-accent-soft/40 p-3 rounded-xl border border-accent/20">
                "{currentMember.philosophy}"
              </p>
            </div>

            {/* Key Specialties & Classes */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-surface-2 p-3.5 rounded-xl border border-border space-y-2">
                <p className="text-xs font-bold text-text-primary flex items-center gap-1.5">
                  <Award size={14} className="text-accent" />
                  <span>Key Specialties</span>
                </p>
                <ul className="space-y-1 text-xs text-text-secondary">
                  {currentMember.specialties.map((s, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-accent font-bold">•</span>
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-surface-2 p-3.5 rounded-xl border border-border space-y-2">
                <p className="text-xs font-bold text-text-primary flex items-center gap-1.5">
                  <Calendar size={14} className="text-accent" />
                  <span>Offerings & Batches</span>
                </p>
                <ul className="space-y-1 text-xs text-text-secondary">
                  {currentMember.classes.map((c, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-accent font-bold">•</span>
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Modal Footer Navigation */}
            <div className="flex items-center justify-between pt-4 border-t border-border">
              <button
                onClick={handleTeamPrev}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold border border-border bg-surface text-text-primary hover:bg-surface-2 active:scale-95 transition-all"
              >
                <ChevronLeft size={16} />
                <span>Previous Member</span>
              </button>

              <span className="text-xs text-text-tertiary font-mono">
                {selectedTeamIndex + 1} / {TEAM_MEMBERS.length}
              </span>

              <button
                onClick={handleTeamNext}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-accent text-white hover:opacity-90 active:scale-95 transition-all shadow-sm"
              >
                <span>Next Member</span>
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          {/* Desktop Right Arrow */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              handleTeamNext()
            }}
            aria-label="Next team member"
            className="hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-surface/90 border border-border shadow-2xl text-text-primary ml-4 hover:bg-surface-2 transition-all hover:scale-110 active:scale-95"
          >
            <ChevronRight size={28} />
          </button>
        </div>
      )}

      {/* ── 10. CLOSING INSPIRATION ──────────────────────────────────────────── */}
      <div className="text-center py-6 border-t border-border">
        <p className="text-2xl font-japanese font-bold text-text-primary mb-1">千里の道も一歩から</p>
        <p className="text-xs text-text-secondary italic">"Even a journey of a thousand miles begins with a single step."</p>
        <div className="mt-4 flex items-center justify-center gap-1.5 text-xs text-text-tertiary">
          <span>Crafted with</span>
          <Heart size={12} className="text-rose-400 fill-rose-400" />
          <span>for passionate Japanese language learners everywhere</span>
          <span className="font-japanese">🌸</span>
        </div>
      </div>

    </div>
  )
}
