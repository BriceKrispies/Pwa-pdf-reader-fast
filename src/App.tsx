import { useState } from 'react'
import Explore from './pages/Explore'
import Plan from './pages/Plan'
import Pack from './pages/Pack'
import Profile from './pages/Profile'

type Page = 'explore' | 'plan' | 'pack' | 'profile'

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('explore')

  return (
    <div className="min-h-screen bg-cream-300 pb-16">
      {/* Main Content - Full screen mobile-first */}
      <main className="h-full">
        {currentPage === 'explore' && <Explore />}
        {currentPage === 'plan' && <Plan />}
        {currentPage === 'pack' && <Pack />}
        {currentPage === 'profile' && <Profile />}
      </main>

      {/* Bottom Navigation */}
      <nav className="bottom-nav">
        <div className="flex justify-around items-center max-w-md mx-auto">
          <button
            onClick={() => setCurrentPage('explore')}
            className={`nav-item ${currentPage === 'explore' ? 'active' : ''}`}
          >
            <svg className="w-6 h-6 mb-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
            <span className="text-xs font-medium">Explore</span>
          </button>
          
          <button
            onClick={() => setCurrentPage('plan')}
            className={`nav-item ${currentPage === 'plan' ? 'active' : ''}`}
          >
            <svg className="w-6 h-6 mb-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M9 11H7v6h2v-6zm4 0h-2v6h2v-6zm4 0h-2v6h2v-6zm2.5-5H19V4c0-.55-.45-1-1-1s-1 .45-1 1v2H7V4c0-.55-.45-1-1-1s-1 .45-1 1v2H4.5C3.67 6 3 6.67 3 7.5v11c0 .83.67 1.5 1.5 1.5h15c.83 0 1.5-.67 1.5-1.5v-11C21 6.67 20.33 6 19.5 6z"/>
            </svg>
            <span className="text-xs font-medium">Plan</span>
          </button>
          
          <button
            onClick={() => setCurrentPage('pack')}
            className={`nav-item ${currentPage === 'pack' ? 'active' : ''}`}
          >
            <svg className="w-6 h-6 mb-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20 6h-2.18c.11-.31.18-.65.18-1a2.996 2.996 0 0 0-5.5-1.65l-.5.67-.5-.68C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM9 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1z"/>
            </svg>
            <span className="text-xs font-medium">Pack</span>
          </button>

          <button
            onClick={() => setCurrentPage('profile')}
            className={`nav-item ${currentPage === 'profile' ? 'active' : ''}`}
          >
            <svg className="w-6 h-6 mb-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
            <span className="text-xs font-medium">Profile</span>
          </button>
        </div>
      </nav>

      {/* Floating Add Button */}
      <button className="floating-add">
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
        </svg>
      </button>
    </div>
  )
}

export default App