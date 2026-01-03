import { useState } from 'react'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable'
import {
  CSS,
} from '@dnd-kit/utilities'

interface Widget {
  id: string
  type: 'trailStats' | 'upcomingExpeditions' | 'recentPhotos' | 'pastExpeditions'
}

// Individual sortable widget component
function SortableWidget({ widget, isEditMode, profileData }: { 
  widget: Widget
  isEditMode: boolean
  profileData: any
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: widget.id, disabled: !isEditMode })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...(isEditMode ? listeners : {})}
      className={`expedition-card relative ${
        isEditMode ? 'cursor-move border-2 border-dashed border-sage-400 hover:border-coral-400 hover:bg-coral-50' : ''
      }`}
    >
      {renderWidgetContent(widget, profileData, isEditMode)}
    </div>
  )
}

// Widget content renderer
function renderWidgetContent(widget: Widget, profileData: any, isEditMode: boolean) {
  switch (widget.type) {
    case 'trailStats':
      return (
        <>
          <h3 className="font-bold text-gray-800 mb-3">Trail Stats</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <span className="text-lg">⛰️</span>
              <div>
                <div className="text-sm text-gray-600">Expeditions</div>
                <div className="font-bold text-lg">{profileData.trailStats.expeditions}</div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-lg">📏</span>
              <div>
                <div className="text-sm text-gray-600">Miles</div>
                <div className="font-bold text-lg">{profileData.trailStats.miles}</div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-lg">🌲</span>
              <div>
                <div className="text-sm text-gray-600">Elevation</div>
                <div className="font-bold text-lg">{profileData.trailStats.elevation}</div>
              </div>
            </div>
          </div>
        </>
      )

    case 'upcomingExpeditions':
      return (
        <>
          <h3 className="font-bold text-gray-800 mb-3">Upcoming Expeditions</h3>
          <div className="space-y-2">
            {profileData.upcomingExpeditions.map((expedition: any, index: number) => (
              <div key={index}>
                <div className="font-medium text-gray-800">{expedition.name}</div>
                <div className="text-sm text-gray-600">{expedition.date}</div>
              </div>
            ))}
          </div>
        </>
      )

    case 'recentPhotos':
      return (
        <>
          <h3 className="font-bold text-gray-800 mb-3">Recent Photos</h3>
          <div className="grid grid-cols-3 gap-2">
            {profileData.recentPhotos.map((photo: any) => (
              <div
                key={photo.id}
                className="aspect-square bg-sage-200 rounded-lg flex items-center justify-center text-2xl"
              >
                {photo.src}
              </div>
            ))}
          </div>
        </>
      )

    case 'pastExpeditions':
      return (
        <>
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-gray-800">Past Expeditions</h3>
            {!isEditMode && (
              <div className="w-8 h-8 bg-sage-200 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-sage-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                </svg>
              </div>
            )}
          </div>
          <div className="grid grid-cols-2 gap-3">
            {profileData.pastExpeditions.map((expedition: any, index: number) => (
              <div key={index} className="text-center">
                <div className="aspect-square bg-sage-200 rounded-lg flex items-center justify-center text-3xl mb-1">
                  {expedition.thumbnail}
                </div>
                <div className="text-xs text-gray-700">{expedition.name}</div>
              </div>
            ))}
          </div>
        </>
      )

    default:
      return null
  }
}

export default function Profile() {
  const [isEditMode, setIsEditMode] = useState(false)
  const [widgets, setWidgets] = useState<Widget[]>([
    { id: 'trail-stats', type: 'trailStats' },
    { id: 'upcoming-expeditions', type: 'upcomingExpeditions' },
    { id: 'recent-photos', type: 'recentPhotos' },
    { id: 'past-expeditions', type: 'pastExpeditions' }
  ])
  const [activeId, setActiveId] = useState<string | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  // Mock profile data
  const profileData = {
    username: 'trailblazer_alex',
    avatar: '👤',
    trailStats: {
      expeditions: 24,
      miles: '260 mi',
      elevation: '32,450 ft'
    },
    upcomingExpeditions: [
      { name: 'Pine Ridge Loop', date: 'Jul 12' },
      { name: 'Mt. Ellison', date: 'Aug 5' }
    ],
    recentPhotos: [
      { id: 1, src: '🏔️', alt: 'Mountain peak' },
      { id: 2, src: '🌲', alt: 'Forest trail' },
      { id: 3, src: '🏞️', alt: 'Valley view' }
    ],
    pastExpeditions: [
      { name: 'Lakeview', thumbnail: '🏞️' },
      { name: 'Sunset Peak', thumbnail: '🌅' },
      { name: 'Canyon Trail', thumbnail: '🏔️' },
      { name: 'River Bend', thumbnail: '🏞️' }
    ]
  }

  function handleDragStart(event: any) {
    setActiveId(event.active.id)
  }

  function handleDragEnd(event: any) {
    const { active, over } = event

    if (active.id !== over?.id) {
      setWidgets((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id)
        const newIndex = items.findIndex((item) => item.id === over.id)

        return arrayMove(items, oldIndex, newIndex)
      })
    }

    setActiveId(null)
  }

  const activeWidget = activeId ? widgets.find(widget => widget.id === activeId) : null

  return (
    <div className="h-full flex flex-col topo-bg">
      {/* Header */}
      <div className="glass-header flex items-center justify-between p-4 mx-4 mt-4">
        <h1 className="text-2xl font-bold text-gray-800">PROFILE</h1>
        <button
          onClick={() => setIsEditMode(!isEditMode)}
          className={`p-2 rounded-xl transition-colors ${
            isEditMode ? 'bg-coral-200 text-coral-700' : 'bg-sage-200 text-sage-700 hover:bg-sage-300'
          }`}
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 15.5A3.5 3.5 0 0 1 8.5 12A3.5 3.5 0 0 1 12 8.5a3.5 3.5 0 0 1 3.5 3.5 3.5 3.5 0 0 1-3.5 3.5m7.43-2.53c.04-.32.07-.64.07-.97s-.03-.66-.07-1l2.11-1.63c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.31-.61-.22l-2.49 1c-.52-.39-1.06-.73-1.69-.98l-.37-2.65A.506.506 0 0 0 14 2h-4c-.25 0-.46.18-.5.42l-.37 2.65c-.63.25-1.17.59-1.69.98l-2.49-1c-.22-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64L4.57 11c-.04.34-.07.67-.07 1s.03.65.07.97l-2.11 1.66c-.19.15-.25.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1.01c.52.4 1.06.74 1.69.99l.37 2.65c.04.24.25.42.5.42h4c.25 0 .46-.18.5-.42l.37-2.65c.63-.26 1.17-.59 1.69-.99l2.49 1.01c.22.08.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.66Z"/>
          </svg>
        </button>
      </div>

      {/* Profile Section */}
      <div className="px-4 mt-6 text-center">
        <div className="w-24 h-24 bg-sage-200 rounded-full mx-auto mb-3 flex items-center justify-center">
          <div className="text-4xl">👤</div>
        </div>
        <h2 className="text-xl font-bold text-gray-800">{profileData.username}</h2>
      </div>

      {/* Edit Mode Instructions */}
      {isEditMode && (
        <div className="px-4 mt-4">
          <div className="bg-coral-100 border border-coral-200 rounded-2xl p-3">
            <p className="text-coral-700 text-sm font-medium text-center">
              🎯 Drag widgets to rearrange your dashboard
            </p>
          </div>
        </div>
      )}

      {/* Widgets Grid */}
      <div className="flex-1 px-4 mt-6 pb-20">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={widgets.map(w => w.id)} strategy={rectSortingStrategy}>
            <div className="grid grid-cols-2 gap-4">
              {widgets.map(widget => (
                <SortableWidget
                  key={widget.id}
                  widget={widget}
                  isEditMode={isEditMode}
                  profileData={profileData}
                />
              ))}
            </div>
          </SortableContext>
          <DragOverlay>
            {activeWidget ? (
              <div className="expedition-card opacity-90 transform scale-105 shadow-lg">
                {renderWidgetContent(activeWidget, profileData, isEditMode)}
              </div>
            ) : null}
          </DragOverlay>
        </DndContext>
      </div>
    </div>
  )
}