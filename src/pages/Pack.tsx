import { useState } from 'react'

interface PackSummary {
  id: string
  expeditionName: string
  date: string
  itemCount: number
  weight: string
}

interface PackDetail {
  id: string
  expeditionName: string
  baseWeight: string
  wornWeight: string
  consumables: string
  total: string
  categories: {
    name: string
    weight: string
    items: {
      name: string
      weight: string
      checked: boolean
      icon?: string
    }[]
  }[]
}

export default function Pack() {
  const [viewMode, setViewMode] = useState<'list' | 'detail'>('list')
  const [selectedPack, setSelectedPack] = useState<PackDetail | null>(null)

  const packSummaries: PackSummary[] = [
    {
      id: 'sunset',
      expeditionName: 'Sunset Peak',
      date: 'Jul 16',
      itemCount: 12,
      weight: '8,9 kg'
    },
    {
      id: 'pine',
      expeditionName: 'Pine Ridge Loop',
      date: 'Jul 12',
      itemCount: 9,
      weight: '6,4 kg'
    },
    {
      id: 'ellison',
      expeditionName: 'Mt. Ellison',
      date: 'Jul 8',
      itemCount: 15,
      weight: '12,0 kg'
    }
  ]

  const samplePackDetail: PackDetail = {
    id: 'sunset',
    expeditionName: 'Sunset Peak',
    baseWeight: '4.56 kg',
    wornWeight: '1.32 kg',
    consumables: '2.18 kg',
    total: '8.06 kg',
    categories: [
      {
        name: 'Shelter',
        weight: '2,6 kg',
        items: [
          { name: 'Tent', weight: '1,96 kg', checked: true, icon: '✓' },
          { name: 'Stakes', weight: '0,12 kg', checked: false }
        ]
      },
      {
        name: 'Sleep System',
        weight: '4,2 kg',
        items: [
          { name: 'Sleeping Bag', weight: '0,85 kg', checked: true, icon: '✓' },
          { name: 'Sleeping Pad', weight: '0,52 kg', checked: true, icon: '✓' }
        ]
      },
      {
        name: 'Clothing',
        weight: '1,6 kg',
        items: [
          { name: 'Jacket', weight: '0,50 kg', checked: true, icon: 'W' },
          { name: 'Hat', weight: '0,16 kg', checked: false }
        ]
      }
    ]
  }

  const handleViewPack = (_: PackSummary) => {
    setSelectedPack(samplePackDetail)
    setViewMode('detail')
  }

  const handleBack = () => {
    setViewMode('list')
    setSelectedPack(null)
  }

  if (viewMode === 'detail' && selectedPack) {
    return (
      <div className="h-full flex flex-col bg-cream-300">
        {/* Header */}
        <div className="flex items-center justify-between p-4 mx-4 mt-4">
          <div className="flex items-center space-x-3">
            <button onClick={handleBack} className="p-1">
              <svg className="w-6 h-6 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
              </svg>
            </button>
            <h1 className="text-2xl font-bold text-gray-800">PACK</h1>
          </div>
          <div className="w-8 h-8 rounded-full border-2 border-gray-600 flex items-center justify-center">
            <div className="w-3 h-3 bg-earth-400 rounded-full"></div>
          </div>
        </div>

        {/* Pack Header */}
        <div className="px-4 mt-4">
          <div className="expedition-card flex items-center space-x-3">
            <div className="w-12 h-12 bg-sage-200 rounded-xl flex items-center justify-center">
              <span className="text-2xl">🎒</span>
            </div>
            <div className="flex-1">
              <h2 className="font-bold text-gray-800 text-lg">{selectedPack.expeditionName}</h2>
            </div>
          </div>
        </div>

        {/* Weight Stats */}
        <div className="px-4 mt-4">
          <div className="expedition-card">
            <div className="grid grid-cols-4 gap-4 text-center">
              <div>
                <div className="font-bold text-gray-800">{selectedPack.baseWeight}</div>
                <div className="text-xs text-gray-600">Base Weight</div>
              </div>
              <div>
                <div className="font-bold text-gray-800">{selectedPack.wornWeight}</div>
                <div className="text-xs text-gray-600">Worn Weight</div>
              </div>
              <div>
                <div className="font-bold text-gray-800">{selectedPack.consumables}</div>
                <div className="text-xs text-gray-600">Consumables</div>
              </div>
              <div>
                <div className="font-bold text-gray-800">{selectedPack.total}</div>
                <div className="text-xs text-gray-600">Total</div>
              </div>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="flex-1 px-4 mt-4 space-y-4 pb-20">
          {selectedPack.categories.map((category, index) => (
            <div key={index} className="expedition-card">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <span className="text-lg">✓</span>
                  <span className="font-semibold text-gray-800">{category.name}</span>
                </div>
                <span className="font-bold text-earth-500">{category.weight}</span>
              </div>
              
              <div className="space-y-2">
                {category.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-6 h-6 rounded border-2 border-sage-300 flex items-center justify-center">
                        {item.checked && <span className="text-forest-600 text-sm">✓</span>}
                      </div>
                      {item.icon && item.icon !== '✓' && (
                        <div className="w-6 h-6 bg-earth-200 rounded flex items-center justify-center">
                          <span className="text-xs font-bold text-earth-600">{item.icon}</span>
                        </div>
                      )}
                      <span className="text-gray-700">{item.name}</span>
                    </div>
                    <span className="text-gray-600 text-sm">{item.weight}</span>
                  </div>
                ))}
                <button className="text-coral-500 text-sm font-medium mt-2">+ Add Item</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col bg-cream-300">
      {/* Header */}
      <div className="glass-header flex items-center justify-between p-4 mx-4 mt-4">
        <h1 className="text-2xl font-bold text-gray-800">PACK</h1>
        <div className="flex items-center space-x-2">
          <span className="text-2xl">🐻</span>
          <span className="text-2xl">🎒</span>
        </div>
      </div>

      {/* Pack List */}
      <div className="flex-1 px-4 mt-6 space-y-4 pb-20">
        {packSummaries.map((pack) => (
          <button
            key={pack.id}
            onClick={() => handleViewPack(pack)}
            className="expedition-card flex items-center justify-between w-full text-left hover:shadow-md transition-all"
          >
            <div className="flex items-center space-x-3">
              {/* Map thumbnail */}
              <div className="w-14 h-14 bg-sage-200 rounded-xl topo-bg flex items-center justify-center">
                <div className="w-6 h-6 bg-sage-400 rounded border-2 border-sage-600"></div>
              </div>
              
              <div>
                <h3 className="font-bold text-gray-800 text-lg">{pack.expeditionName}</h3>
                <div className="flex items-center space-x-3 mt-1">
                  <span className="text-gray-600 text-sm">{pack.date}</span>
                  <div className="flex items-center space-x-1">
                    <div className="w-4 h-4 bg-sage-200 rounded flex items-center justify-center">
                      <span className="text-xs">📦</span>
                    </div>
                    <span className="text-sm text-gray-600">{pack.itemCount}</span>
                  </div>
                  <span className="text-sm font-medium text-gray-800">{pack.weight}</span>
                </div>
              </div>
            </div>
            
            <svg className="w-6 h-6 text-sage-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
            </svg>
          </button>
        ))}
      </div>
    </div>
  )
}