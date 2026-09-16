import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Sidebar, MobileNav } from './Sidebar'
import { Header } from './Header'
import { SearchModal } from '@/components/SearchModal'

export function AppLayout() {
  const [searchOpen, setSearchOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar — desktop only */}
      <Sidebar />

      {/* Main area */}
      <div className="lg:pl-60 flex flex-col min-h-screen">
        <Header onSearchOpen={() => setSearchOpen(true)} />

        <main className="flex-1 px-4 md:px-6 py-6 pb-24 lg:pb-6 max-w-5xl mx-auto w-full">
          <Outlet />
        </main>
      </div>

      {/* Mobile bottom nav */}
      <MobileNav />

      {/* Global search modal */}
      {searchOpen && <SearchModal onClose={() => setSearchOpen(false)} />}
    </div>
  )
}
