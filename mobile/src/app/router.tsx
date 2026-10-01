import { createHashRouter, Navigate, useParams, useRouteError, isRouteErrorResponse, useNavigate } from 'react-router-dom'
import { AlertCircle, Home, RefreshCw } from 'lucide-react'
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
import KanaPage        from '@/pages/KanaPage'
import AboutPage       from '@/pages/AboutPage'

function KanjiRedirect() {
  const { kanjiId } = useParams<{ kanjiId: string }>()
  return <Navigate to={`/reference?category=kanji${kanjiId ? `&kanji=${encodeURIComponent(kanjiId)}` : ''}`} replace />
}

export function RouteErrorBoundary() {
  const error = useRouteError()
  const navigate = useNavigate()

  let title = 'Page Not Found'
  let message = "The page or resource you are looking for doesn't exist."

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      title = 'Page Not Found (404)'
      message = "We couldn't find the page or section you were looking for."
    } else {
      title = `Application Error (${error.status})`
      message = error.statusText || message
    }
  } else if (error instanceof Error) {
    title = 'Unexpected Error'
    message = error.message
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-4">
      <div className="bg-surface border border-border rounded-2xl p-6 sm:p-8 max-w-md w-full shadow-card text-center space-y-4">
        <div className="w-14 h-14 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-500 flex items-center justify-center mx-auto">
          <AlertCircle size={28} />
        </div>
        <div>
          <h2 className="text-xl font-bold text-text-primary">{title}</h2>
          <p className="text-xs text-text-secondary mt-1 leading-relaxed">{message}</p>
        </div>
        <div className="flex items-center justify-center gap-3 pt-2">
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-accent text-white text-xs font-semibold hover:opacity-90 active:scale-95 transition-all shadow-sm"
          >
            <Home size={14} />
            <span>Back to Dashboard</span>
          </button>
          <button
            onClick={() => window.location.reload()}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-surface-2 border border-border text-text-secondary hover:text-text-primary text-xs font-semibold hover:bg-surface transition-all"
          >
            <RefreshCw size={14} />
            <span>Reload</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export const router = createHashRouter([
  {
    path: '/',
    element: <AppLayout />,
    errorElement: <RouteErrorBoundary />,
    children: [
      { index: true,                         element: <Navigate to="/dashboard" replace /> },
      { path: 'dashboard',                   element: <DashboardPage /> },
      { path: 'kana',                        element: <KanaPage /> },
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
      { path: 'kanji',                       element: <Navigate to="/reference?category=kanji" replace /> },
      { path: 'kanji/:kanjiId',              element: <KanjiRedirect /> },
      { path: 'progress',                    element: <Navigate to="/dashboard" replace /> },
      // Fallback for any unknown route — smoothly redirect to dashboard
      { path: '*',                           element: <Navigate to="/dashboard" replace /> },
    ],
  },
])
