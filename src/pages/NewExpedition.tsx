import { useState } from 'react'

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

interface NewExpeditionProps {
  onBack: () => void
  onSave: (expedition: NewExpeditionForm) => void
}

export default function NewExpedition({ onBack, onSave }: NewExpeditionProps) {
  const [form, setForm] = useState<NewExpeditionForm>({
    name: '',
    location: '',
    difficulty: '',
    duration: '',
    distance: '',
    date: '',
    description: '',
    permits: false
  })

  const [errors, setErrors] = useState<Partial<NewExpeditionForm>>({})

  const handleInputChange = (field: keyof NewExpeditionForm, value: string | boolean) => {
    setForm(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  const validateForm = (): boolean => {
    const newErrors: Partial<NewExpeditionForm> = {}
    
    if (!form.name.trim()) newErrors.name = 'Expedition name is required'
    if (!form.location.trim()) newErrors.location = 'Location is required'
    if (!form.duration.trim()) newErrors.duration = 'Duration is required'
    if (!form.distance.trim()) newErrors.distance = 'Distance is required'
    if (!form.date) newErrors.date = 'Date is required'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSave = () => {
    if (validateForm()) {
      onSave(form)
      console.log('Saving expedition:', form)
    }
  }

  const getDifficultyClass = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'difficulty-easy'
      case 'Moderate': return 'difficulty-moderate'
      case 'Hard': return 'difficulty-hard'
      default: return 'bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm font-medium'
    }
  }

  return (
    <div className="h-full flex flex-col bg-cream-300">
      {/* Header */}
      <div className="glass-header flex items-center justify-between p-4 mx-4 mt-4">
        <div className="flex items-center space-x-3">
          <button onClick={onBack} className="p-1">
            <svg className="w-6 h-6 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
            </svg>
          </button>
          <h1 className="text-2xl font-bold text-gray-800">NEW EXPEDITION</h1>
        </div>
        <button
          onClick={handleSave}
          className="btn-primary px-5 py-2"
        >
          Save
        </button>
      </div>

      {/* Form Content */}
      <div className="flex-1 px-4 mt-6 pb-20 space-y-4">
        {/* Basic Information Card */}
        <div className="expedition-card">
          <h2 className="font-bold text-gray-800 mb-4 flex items-center">
            <span className="text-lg mr-2">🗺️</span>
            Basic Information
          </h2>
          
          <div className="space-y-4">
            {/* Expedition Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Expedition Name *
              </label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="e.g., Sunset Peak Adventure"
                className={`input w-full ${errors.name ? 'input-error' : ''}`}
              />
              {errors.name && <p className="text-coral-500 text-sm mt-1">{errors.name}</p>}
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Location *
              </label>
              <input
                type="text"
                value={form.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                placeholder="e.g., Olympic National Park"
                className={`input w-full ${errors.location ? 'input-error' : ''}`}
              />
              {errors.location && <p className="text-coral-500 text-sm mt-1">{errors.location}</p>}
            </div>

            {/* Difficulty */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Difficulty Level *
              </label>
              <div className="flex space-x-2">
                {['Easy', 'Moderate', 'Hard'].map((level) => (
                  <button
                    key={level}
                    type="button"
                    onClick={() => handleInputChange('difficulty', level as any)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      form.difficulty === level
                        ? getDifficultyClass(level)
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
              {errors.difficulty && <p className="text-coral-500 text-sm mt-1">{errors.difficulty}</p>}
            </div>
          </div>
        </div>

        {/* Trip Details Card */}
        <div className="expedition-card">
          <h2 className="font-bold text-gray-800 mb-4 flex items-center">
            <span className="text-lg mr-2">📊</span>
            Trip Details
          </h2>
          
          <div className="space-y-4">
            {/* Duration and Distance */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Duration *
                </label>
                <input
                  type="text"
                  value={form.duration}
                  onChange={(e) => handleInputChange('duration', e.target.value)}
                  placeholder="e.g., 2 days"
                  className={`input w-full ${errors.duration ? 'input-error' : ''}`}
                />
                {errors.duration && <p className="text-coral-500 text-sm mt-1">{errors.duration}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Distance *
                </label>
                <input
                  type="text"
                  value={form.distance}
                  onChange={(e) => handleInputChange('distance', e.target.value)}
                  placeholder="e.g., 12.5 mi"
                  className={`input w-full ${errors.distance ? 'input-error' : ''}`}
                />
                {errors.distance && <p className="text-coral-500 text-sm mt-1">{errors.distance}</p>}
              </div>
            </div>

            {/* Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Start Date *
              </label>
              <input
                type="date"
                value={form.date}
                onChange={(e) => handleInputChange('date', e.target.value)}
                className={`input w-full ${errors.date ? 'input-error' : ''}`}
              />
              {errors.date && <p className="text-coral-500 text-sm mt-1">{errors.date}</p>}
            </div>
          </div>
        </div>

        {/* Description Card */}
        <div className="expedition-card">
          <h2 className="font-bold text-gray-800 mb-4 flex items-center">
            <span className="text-lg mr-2">📝</span>
            Description
          </h2>
          
          <textarea
            value={form.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            placeholder="Describe your expedition, highlights, what to expect..."
            rows={4}
            className="textarea w-full"
          />
        </div>

        {/* Additional Options Card */}
        <div className="expedition-card">
          <h2 className="font-bold text-gray-800 mb-4 flex items-center">
            <span className="text-lg mr-2">⚙️</span>
            Additional Options
          </h2>
          
          <div className="space-y-3">
            {/* Permits Required */}
            <label className="flex items-center space-x-3 cursor-pointer">
              <div className="relative">
                <input
                  type="checkbox"
                  checked={form.permits}
                  onChange={(e) => handleInputChange('permits', e.target.checked)}
                  className="sr-only"
                />
                <div className={`w-6 h-6 border-2 border-sage-300 rounded flex items-center justify-center transition-colors ${
                  form.permits ? 'bg-sage-300 border-sage-400' : 'bg-white'
                }`}>
                  {form.permits && (
                    <svg className="w-4 h-4 text-forest-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                    </svg>
                  )}
                </div>
              </div>
              <span className="text-gray-700 font-medium">Permits Required</span>
            </label>
          </div>
        </div>

        {/* Preview Card */}
        <div className="expedition-card border-2 border-sage-200">
          <h2 className="font-bold text-gray-800 mb-4 flex items-center">
            <span className="text-lg mr-2">👁️</span>
            Preview
          </h2>
          
          <div className="flex items-center space-x-3 p-3 bg-sage-50 rounded-xl">
            {/* Map thumbnail */}
            <div className="w-12 h-12 bg-sage-200 rounded-xl topo-bg flex items-center justify-center">
              <div className="w-6 h-6 bg-sage-400 rounded border-2 border-sage-600"></div>
            </div>
            
            <div className="flex-1">
              <h3 className="font-semibold text-gray-800">
                {form.name || 'Expedition Name'}
              </h3>
              <div className="flex items-center space-x-2 mt-1">
                {form.difficulty && (
                  <span className={getDifficultyClass(form.difficulty)}>
                    {form.difficulty}
                  </span>
                )}
                {form.distance && (
                  <span className="text-gray-600 text-sm">{form.distance}</span>
                )}
              </div>
              {form.location && (
                <div className="text-gray-600 text-sm mt-1">📍 {form.location}</div>
              )}
            </div>
            
            {form.date && (
              <div className="bg-sage-200 text-forest-600 px-3 py-1 rounded-full text-sm font-medium">
                {new Date(form.date).toLocaleDateString('en-US', { 
                  month: 'short', 
                  day: 'numeric' 
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}