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

interface ExpeditionCardProps {
  expedition: Expedition
  onSelect?: (expedition: Expedition) => void
}

export default function ExpeditionCard({ expedition, onSelect }: ExpeditionCardProps) {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy':
        return 'bg-green-100 text-green-800'
      case 'Moderate':
        return 'bg-yellow-100 text-yellow-800'
      case 'Hard':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="card hover:shadow-md transition-shadow duration-200 cursor-pointer"
         onClick={() => onSelect?.(expedition)}>
      <div className="aspect-w-16 aspect-h-9 mb-4">
        <img 
          src={expedition.imageUrl} 
          alt={expedition.title}
          className="w-full h-48 object-cover rounded-md"
        />
      </div>
      
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-semibold text-gray-900">{expedition.title}</h3>
        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getDifficultyColor(expedition.difficulty)}`}>
          {expedition.difficulty}
        </span>
      </div>
      
      <p className="text-sm text-gray-600 mb-3">{expedition.location}</p>
      
      <div className="grid grid-cols-3 gap-4 mb-3 text-sm">
        <div>
          <span className="font-medium text-gray-700">Duration:</span>
          <p className="text-gray-600">{expedition.duration}</p>
        </div>
        <div>
          <span className="font-medium text-gray-700">Distance:</span>
          <p className="text-gray-600">{expedition.distance}</p>
        </div>
        <div>
          <span className="font-medium text-gray-700">Elevation:</span>
          <p className="text-gray-600">{expedition.elevation}</p>
        </div>
      </div>
      
      <p className="text-gray-700 text-sm mb-3 line-clamp-2">{expedition.description}</p>
      
      <div className="flex flex-wrap gap-1 mb-3">
        {expedition.tags.slice(0, 3).map(tag => (
          <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
            #{tag}
          </span>
        ))}
      </div>
      
      <div className="flex justify-between items-center pt-3 border-t border-gray-100">
        <span className="text-sm text-gray-600">Best time: {expedition.bestTime}</span>
        {expedition.permits && (
          <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded">
            Permit Required
          </span>
        )}
      </div>
    </div>
  )
}