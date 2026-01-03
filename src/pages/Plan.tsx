import { useState } from 'react'
import NewExpedition from './NewExpedition'

interface NewExpeditionForm {
  name: string
  location: string
  difficulty: 'Easy' | 'Moderate' | 'Hard' | ''
  duration: string
  distance: string
  date: string
  description: string
  permits: boolean
}

export default function Plan() {
  const [showNewExpedition, setShowNewExpedition] = useState(false)

  const handleCreateExpedition = () => {
    setShowNewExpedition(true)
  }

  const handleEditExpedition = () => {
    console.log('Editing expedition')
  }

  const handleBackFromNew = () => {
    setShowNewExpedition(false)
  }

  const handleSaveExpedition = (expedition: NewExpeditionForm) => {
    console.log('Saved expedition:', expedition)
    // Here you would typically save to your backend/state management
    setShowNewExpedition(false)
  }

  if (showNewExpedition) {
    return (
      <NewExpedition 
        onBack={handleBackFromNew}
        onSave={handleSaveExpedition}
      />
    )
  }

  return (
    <div className="h-full flex flex-col bg-cream-300">
      {/* Header */}
      <div className="glass-header flex items-center justify-between p-4 mx-4 mt-4">
        <h1 className="text-2xl font-bold text-gray-800">PLAN</h1>
        <div className="w-8 h-8 flex flex-col justify-center space-y-1">
          <div className="w-6 h-0.5 bg-gray-600"></div>
          <div className="w-6 h-0.5 bg-gray-600"></div>
          <div className="w-6 h-0.5 bg-gray-600"></div>
        </div>
      </div>

      {/* Create New Expedition Card */}
      <div className="px-4 mt-6">
        <button 
          onClick={handleCreateExpedition}
          className="w-full border-2 border-dashed border-sage-400 rounded-2xl p-8 flex flex-col items-center justify-center space-y-3 hover:border-sage-500 hover:bg-sage-50 transition-all duration-200"
        >
          <div className="w-12 h-12 bg-sage-200 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-sage-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
            </svg>
          </div>
          <span className="text-gray-700 font-medium text-lg">Create New Expedition</span>
        </button>
      </div>

      {/* Upcoming Section */}
      <div className="px-4 mt-8">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Upcoming</h2>
        
        {/* Sunset Peak Expedition */}
        <div className="expedition-card flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {/* Map thumbnail */}
            <div className="w-14 h-14 bg-sage-200 rounded-xl topo-bg flex items-center justify-center">
              <div className="w-6 h-6 bg-sage-400 rounded border-2 border-sage-600"></div>
            </div>
            
            <div>
              <h3 className="font-bold text-gray-800 text-lg">Sunset Peak</h3>
              <div className="flex items-center space-x-3 mt-1">
                <span className="bg-sage-200 text-forest-600 px-3 py-1 rounded-full text-sm font-medium">
                  Jul 16
                </span>
                <span className="text-gray-600 text-sm">2 days</span>
              </div>
            </div>
          </div>
          
          <button 
            onClick={handleEditExpedition}
            className="p-2 hover:bg-sage-100 rounded-xl transition-colors"
          >
            <svg className="w-6 h-6 text-sage-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}