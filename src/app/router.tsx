import { createBrowserRouter, Navigate } from 'react-router-dom'
import { AppLayout } from '@/layouts/AppLayout'
import DashboardPage   from '@/pages/DashboardPage'
import LearnPage       from '@/pages/LearnPage'
import LessonPage      from '@/pages/LessonPage'
import GrammarPage     from '@/pages/GrammarPage'
import VocabularyPage  from '@/pages/VocabularyPage'
import PracticePage    from '@/pages/PracticePage'
import RevisionPage    from '@/pages/RevisionPage'
import SettingsPage    from '@/pages/SettingsPage'
import ReferencePage   from '@/pages/ReferencePage'
import AboutPage       from '@/pages/AboutPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true,                         element: <Navigate to="/dashboard" replace /> },
      { path: 'dashboard',                   element: <DashboardPage /> },
      { path: 'learn',                       element: <LearnPage /> },
      { path: 'learn/:lessonId',             element: <LessonPage /> },
      { path: 'grammar',                     element: <GrammarPage /> },
      { path: 'grammar/:grammarId',          element: <GrammarPage /> },
      { path: 'vocabulary',                  element: <VocabularyPage /> },
      { path: 'reference',                   element: <ReferencePage /> },
      { path: 'practice',                    element: <PracticePage /> },
      { path: 'revision',                    element: <RevisionPage /> },
      { path: 'settings',                    element: <SettingsPage /> },
      { path: 'about',                       element: <AboutPage /> },
      // Retired pages — redirect to their new home in N5 Reference
      { path: 'kanji',                       element: <Navigate to="/reference" replace /> },
      { path: 'kanji/:kanjiId',              element: <Navigate to="/reference" replace /> },
      { path: 'progress',                    element: <Navigate to="/dashboard" replace /> },
    ],
  },
])
