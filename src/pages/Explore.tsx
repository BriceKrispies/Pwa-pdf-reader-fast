import { useState, useEffect } from 'react'
import expeditionsData from '../mocks/expeditions.json'

interface Expedition {
  id: string
  title: string
  location: string
  difficulty: 'Easy' | 'Moderate' | 'Hard'
  duration: string
  distance: string
  elevation: string
  description: string
  imageUrl: string
  highlights: string[]
  bestTime: string
  permits: boolean
  tags: string[]
}

export default function Explore() {
  const [_, setExpeditions] = useState<Expedition[]>([])
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    setExpeditions(expeditionsData as Expedition[])
  }, [])

  const getDifficultyClass = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'difficulty-easy'
      case 'Moderate': return 'difficulty-moderate'
      case 'Hard': return 'difficulty-hard'
      default: return 'difficulty-moderate'
    }
  }

  const handleJoinExpedition = (expedition: Expedition) => {
    console.log('Joining expedition:', expedition.title)
  }

  // Mock nearby expeditions with simplified data matching mockup
  const nearbyExpeditions = [
    { name: 'Sunset Peak', difficulty: 'Moderate', distance: '4.5 mi', id: 'sunset' },
    { name: 'Pine Ridge Loop', difficulty: 'Moderate', distance: '7.2 mi', id: 'pine', hasDate: 'Jul 12' },
    { name: 'Mt. Ellison', difficulty: 'Hard', distance: '12.0 mi', id: 'ellison' }
  ]

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="glass-header flex items-center justify-between p-4 mx-4 mt-4">
        <h1 className="text-2xl font-bold text-gray-800">EXPLORE</h1>
        <div className="w-12 h-12 bg-earth-200 rounded-2xl flex items-center justify-center">
          <span className="text-2xl">🐻</span>
        </div>
      </div>

      {/* Search Bar */}
      <div className="px-4 mt-4">
        <div className="relative">
          <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-sage-500" fill="currentColor" viewBox="0 0 24 24">
            <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
          </svg>
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input w-full rounded-2xl pl-12"
          />
        </div>
      </div>

      {/* Map Section */}
      <div className="flex-1 relative mt-6 topo-bg">
        {/* Heart icons scattered on map */}
        <div className="absolute top-16 left-12">
          <span className="text-coral-400 text-2xl">♥</span>
        </div>
        <div className="absolute top-32 right-20">
          <span className="text-coral-400 text-2xl">♥</span>
        </div>
        <div className="absolute top-48 left-1/3">
          <span className="text-coral-400 text-2xl">♥</span>
        </div>
      </div>

      {/* Expeditions Nearby */}
      <div className="bg-cream-100 rounded-t-3xl px-4 pt-6 pb-4 mt-auto">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Expeditions Nearby</h2>
        
        <div className="space-y-3">
          {nearbyExpeditions.map((expedition) => (
            <div key={expedition.id} className="expedition-card flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {/* Map thumbnail */}
                <div className="w-12 h-12 bg-sage-200 rounded-xl topo-bg flex items-center justify-center">
                  <div className="w-6 h-6 bg-sage-400 rounded border-2 border-sage-600"></div>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-800">{expedition.name}</h3>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className={getDifficultyClass(expedition.difficulty)}>
                      {expedition.difficulty}
                    </span>
                    <span className="text-gray-600 text-sm">{expedition.distance}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                {expedition.hasDate ? (
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl">🌲</span>
                    <span className="bg-sage-200 text-forest-600 px-3 py-1 rounded-full text-sm font-medium">
                      {expedition.hasDate}
                    </span>
                  </div>
                ) : (
                  <>
                    <span className="text-2xl">😊</span>
                    <button 
                      onClick={() => handleJoinExpedition(expedition as any)}
                      className="bg-sage-200 hover:bg-sage-300 text-forest-600 px-4 py-2 rounded-full text-sm font-medium transition-colors"
                    >
                      Join
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}