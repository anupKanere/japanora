# 日本語 — Japanese Learning Platform

A production-quality, JLPT N5 Japanese learning web application built with React + TypeScript + Vite.

## ✨ Features

### 🎓 Structured Curriculum
- 6 units, 15 lessons following the JLPT N5 syllabus
- Lesson locking — each lesson unlocks after the previous is completed
- Per-unit and per-lesson progress tracking
- Homework review with teacher corrections and explanations

### 📚 Exercise System
- **Particle Select** — visual particle buttons that slot into sentences inline
- **Fill in the Blank** — inline text input within a sentence
- **Multiple Choice** — 2×2 grid with correct/wrong highlighting
- **Sentence Order** — tap words to assemble them into the correct order
- **Translation & Free Production** — open textarea with rule-based + AI-ready evaluation
- Immediate feedback with explanation and collapsible detail

### 📖 Reference Sections
- **Grammar** — searchable, expandable N5 grammar cards with structure notes and examples
- **Vocabulary** — grid of N5 vocab with POS badges, search, filter, and detail modal
- **Kanji** — character grid with on'yomi / kun'yomi detail modal per kanji
- **Revision** — vocabulary and grammar items surfaced by familiarity stage + homework mistakes

### 📊 Progress & Analytics
- N5 overall progress ring (%)
- Study streak and longest streak counter
- Per-unit progress bars
- Grammar / vocabulary / kanji mastery counters
- Study session history (accuracy, duration, exercises)
- Weak-area tracking from homework mistake categories

### ⚙️ Settings
- **Display mode**: Hiragana only vs Hiragana + Kanji (global toggle, also per-lesson via button)
- Daily study goal (minutes)
- Sound effects & auto-play audio toggles (UI ready, audio coming soon)
- Revision reminder with configurable time
- Theme selector (Light / Dark / System — dark mode coming soon)

### 🔍 Global Search
- Instant search across lessons, vocabulary, grammar, and kanji
- Keyboard shortcut (`⌘K`)
- Result type badges (lesson / vocab / grammar / kanji)

---

## 🏗️ Architecture

```
src/
├── app/
│   ├── App.tsx             # Root component
│   ├── AppContext.tsx       # Global state (progress, settings)
│   └── router.tsx          # React Router v6 configuration
│
├── data/
│   ├── curriculum/n5/
│   │   ├── units.ts        # N5 unit + lesson metadata
│   │   └── lessons/
│   │       └── lesson-001.ts   # Full lesson content (grammar, examples, exercises, homework)
│   ├── vocabulary/n5-vocab.ts
│   ├── grammar/n5-grammar.ts
│   └── kanji/n5-kanji.ts
│
├── services/
│   ├── storageService.ts   # localStorage abstraction (swap for API easily)
│   ├── progressService.ts  # Progress business logic, seeded with demo data
│   ├── settingsService.ts  # Settings persistence
│   └── evaluationService.ts # Exercise checking engine (AI-ready interface)
│
├── features/
│   ├── exercises/ExerciseRenderer.tsx   # All exercise types
│   └── lessons/HomeworkReview.tsx       # Expandable homework submission cards
│
├── layouts/
│   ├── AppLayout.tsx   # Shell with sidebar + header + main + mobile nav
│   ├── Sidebar.tsx     # Desktop sidebar + mobile bottom nav
│   └── Header.tsx      # Sticky header with search, streak, mobile menu
│
├── pages/
│   ├── DashboardPage.tsx
│   ├── LearnPage.tsx       # Curriculum browser
│   ├── LessonPage.tsx      # 6-tab lesson view
│   ├── GrammarPage.tsx
│   ├── VocabularyPage.tsx
│   ├── KanjiPage.tsx
│   ├── PracticePage.tsx
│   ├── RevisionPage.tsx
│   ├── ProgressPage.tsx
│   └── SettingsPage.tsx
│
└── components/
    ├── JapaneseText.tsx    # JapaneseText, ExampleBlock, KanjiReveal
    └── SearchModal.tsx     # Global search
```

---

## 🚀 Getting Started

```bash
npm install
npm run dev        # Development server on http://localhost:5173
npm run build      # Production build
npm run preview    # Preview production build
```

---

## 📐 Design System

| Token            | Value             |
|------------------|-------------------|
| `accent`         | `#b91c1c` (crimson red) |
| `background`     | `#f8f7f4` (warm off-white) |
| `surface`        | `#ffffff` |
| `surface-2`      | `#f3f2ef` |
| `text-primary`   | `#1a1915` |
| `text-secondary` | `#6b6960` |
| Font             | Noto Sans JP |

All tokens defined in [`tailwind.config.js`](./tailwind.config.js).

---

## 🗺️ Roadmap

### Phase 1 ✅ Shell & Design
- Sidebar, header, AppLayout, routing
- Design system (Tailwind tokens, animations)

### Phase 2 ✅ Curriculum & Lessons
- Data layer: units, lessons, vocabulary, grammar, kanji
- Lesson 1 fully populated with exercises and homework submissions
- LessonPage with 6 tabs (Objectives, Explanation, Examples, Practice, Homework, Review)

### Phase 3 ✅ Exercise System
- All 6 exercise types implemented
- Rule-based evaluationService (AI hook ready)
- Immediate feedback with explanation toggle

### Phase 4 ✅ Reference Pages
- Grammar, Vocabulary, Kanji, Revision, Progress, Settings, Search

### Phase 5 — Upcoming
- [ ] Lessons 2–15 content
- [ ] Standalone practice drills (flashcards, timed quizzes, verb conjugation drills)
- [ ] AI evaluation backend (swap `evaluationService`)
- [ ] Stroke order animations
- [ ] Pronunciation / audio
- [ ] Dark mode
- [ ] Multi-user / cloud sync backend
- [ ] N4 curriculum unit

---

## 💡 Adding New Lessons

1. Create `src/data/curriculum/n5/lessons/lesson-XXX.ts` following the `LessonContent` type in `src/types/index.ts`.
2. Register it in `LESSON_REGISTRY` in `src/pages/LessonPage.tsx`.
3. Progress tracking and navigation happen automatically.

---

## 📝 Japanese Display Rule

All Japanese text in the UI follows this rule:
> **Hiragana first. Kanji shown in brackets afterwards — only when the global display mode is `hiragana-kanji`.**

Components that render Japanese text use `useApp().showKanji` to conditionally render kanji. Learners can toggle this globally in Settings, or per-lesson via the "Kanji ON/OFF" button in the lesson header.
