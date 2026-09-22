# Japanora Mobile Application (iOS & Android)

This directory contains the complete, native-ready mobile application version of **Japanora** (The World of Japan), built with **React 19**, **Vite**, **Tailwind CSS**, and **Capacitor**.

It maintains **100% logic and display parity** with the web application while adding native mobile enhancements.

---

## Highlights & Features

- **100% Parity with Web**:
  - Full Japanese learning curriculum (N5 Grammar, 1,125 Vocabulary words, 110+ Kanji, Hiragana/Katakana charts, N5 Reference guide, Sentence practice quizzes, Flashcards).
  - Practice speed quizzes with confusing exam traps and hiragana/English toggle.
  - Multi-voice Japanese speech audio (Male & Female voices with global speed control).
  - Dark / Light / System auto-theme detection with custom obsidian dark mode.
  - Local learner progress tracking (completed lessons, mastery stars, streak counter).
- **Native Mobile Optimizations**:
  - **Safe Area Insets**: Dynamic padding for iPhone notch, Dynamic Island, and Android edge-to-edge system navigation bars.
  - **Capacitor Status Bar**: Dynamically synchronizes native status bar colors with light/dark theme.
  - **Native Haptics**: Subtle tactile vibration feedback on quiz answer choices and completion.
  - **Android Hardware Back Button**: Navigates app history or closes modals cleanly.
  - **Zero-Latency Offline Mode**: All 1,125 vocabulary entries and lesson content are stored locally in the bundle.
  - **Hash-based Native Routing**: Completely avoids 404s when loading from native WebView file schemes (`capacitor://localhost/`).

---

## Directory Structure

```text
mobile/
├── android/                 # Native Android Studio Project (Gradle, Manifest, Java/Kotlin)
├── ios/                     # Native iOS Xcode Project (.xcodeproj, .xcworkspace)
├── dist/                    # Compiled production web bundle for native WebViews
├── public/                  # Static assets (images, logos, favicons)
├── src/                     # React application source code
│   ├── app/                 # AppContext, Router (createHashRouter for mobile)
│   ├── components/          # Reusable UI components & modals
│   ├── data/                # N5 vocabulary, kanji, grammar, curriculum, quiz datasets
│   ├── layouts/             # AppLayout, MobileNav bottom bar, Header, Sidebar
│   ├── pages/               # All pages (Dashboard, Learn, Practice, Vocabulary, etc.)
│   └── services/            # mobileService (Capacitor plugins wrapper), audio, progress
├── capacitor.config.ts      # Native Capacitor app configuration
├── vite.config.ts           # Mobile Vite configuration with relative base paths
└── package.json             # Mobile-specific scripts & dependencies
```

---

## Getting Started

### 1. Run Mobile Web Preview Locally
For instant testing and responsive browser preview:
```bash
cd mobile
npm run dev
```
Open [http://localhost:5174](http://localhost:5174) in your browser or on your phone via your local Wi-Fi IP address.

### 2. Build Web Bundle for Native WebViews
```bash
npm run build
```

### 3. Sync Assets with Native Projects
Whenever you make changes to UI or data in `mobile/src`:
```bash
npm run cap:sync
```

---

## Running on Native Devices & Simulators

### iOS (Xcode)
1. Open the iOS project in Xcode:
   ```bash
   npm run cap:open:ios
   ```
2. In Xcode:
   - Select your target simulator (e.g. *iPhone 16 Pro*) or connected physical iPhone.
   - Click **Run** (Cmd + R) to compile and launch.
3. For App Store Archive / `.ipa`:
   - In Xcode menu, select `Product > Archive` to create distribution builds.

### Android (Android Studio)
1. Open the Android project in Android Studio:
   ```bash
   npm run cap:open:android
   ```
2. In Android Studio:
   - Select your connected Android phone or emulator.
   - Click **Run** (Shift + F10).
3. For `.apk` / `.aab` release build:
   - Select `Build > Generate Signed Bundle / APK`.

---

## Git Isolation
This mobile directory is completely self-contained. Any edits made within `mobile/` do not affect the root web application files, ensuring a clean commit history when pushing changes to GitHub.
