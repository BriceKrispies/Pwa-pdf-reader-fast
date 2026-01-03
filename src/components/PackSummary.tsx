interface PackItem {
  name: string
  weight: string
  essential: boolean
}

interface PackCategory {
  name: string
  weight: string
  items: PackItem[]
}

interface Pack {
  id: string
  name: string
  expeditionId: string
  totalWeight: string
  packWeight: string
  categories: PackCategory[]
}

interface PackSummaryProps {
  pack: Pack
  onViewDetails?: (pack: Pack) => void
}

export default function PackSummary({ pack, onViewDetails }: PackSummaryProps) {
  const totalItems = pack.categories.reduce((sum, category) => sum + category.items.length, 0)
  const essentialItems = pack.categories.reduce(
    (sum, category) => sum + category.items.filter(item => item.essential).length, 
    0
  )

  return (
    <div className="card hover:shadow-md transition-shadow duration-200">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{pack.name}</h3>
          <p className="text-sm text-gray-600">Pack ID: {pack.id}</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-brand-600">{pack.totalWeight}</div>
          <div className="text-xs text-gray-500">Total Weight</div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-gray-50 p-3 rounded-md">
          <div className="text-sm font-medium text-gray-700">Pack Weight</div>
          <div className="text-lg font-semibold text-gray-900">{pack.packWeight}</div>
        </div>
        <div className="bg-gray-50 p-3 rounded-md">
          <div className="text-sm font-medium text-gray-700">Gear Weight</div>
          <div className="text-lg font-semibold text-gray-900">
            {(parseFloat(pack.totalWeight) - parseFloat(pack.packWeight)).toFixed(1)} lbs
          </div>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-gray-600">Items: {totalItems}</span>
          <span className="text-gray-600">Essential: {essentialItems}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-brand-600 h-2 rounded-full" 
            style={{ width: `${(essentialItems / totalItems) * 100}%` }}
          ></div>
        </div>
      </div>

      <div className="space-y-2 mb-4">
        <h4 className="font-medium text-gray-900">Categories:</h4>
        {pack.categories.map((category, index) => (
          <div key={index} className="flex justify-between items-center py-1">
            <span className="text-sm text-gray-700">{category.name}</span>
            <span className="text-sm font-medium text-gray-900">{category.weight}</span>
          </div>
        ))}
      </div>

      <button 
        onClick={() => onViewDetails?.(pack)}
        className="w-full btn-primary text-sm"
      >
        View Full Pack List
      </button>
    </div>
  )
}