'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface RoomData {
  id: string
  label: string
  x: number
  y: number
  width: number
  height: number
  fill: string
  stroke: string
  details: string[]
  capacity?: string
  area?: string
}

const rooms: RoomData[] = [
  {
    id: 'entrance',
    label: 'Entrance & Host Stand',
    x: 30,
    y: 30,
    width: 140,
    height: 70,
    fill: '#fef3c7',
    stroke: '#d97706',
    details: [
      'Double glass doors with automatic openers',
      'Recessed mat well with branded mat',
      'Host stand with reservation system',
      'Wait bench for 6–8 guests',
      'Ambient accent lighting'
    ],
    area: '10 m²'
  },
  {
    id: 'main-dining',
    label: 'Main Dining Hall',
    x: 30,
    y: 110,
    width: 280,
    height: 200,
    fill: '#ecfdf5',
    stroke: '#059669',
    details: [
      '24 tables (2-top to 8-top configurations)',
      'Flexible seating for 80 guests',
      'High ceilings (3.6 m) with pendant lights',
      'Acoustic paneling on upper walls',
      'Hardwood flooring (oak)',
      'Window wall on east side with blackout curtains'
    ],
    capacity: '80 guests',
    area: '160 m²'
  },
  {
    id: 'bar-lounge',
    label: 'Bar & Lounge',
    x: 320,
    y: 30,
    width: 140,
    height: 150,
    fill: '#fce7f3',
    stroke: '#db2777',
    details: [
      '14-seat L-shaped bar (natural stone top)',
      '4 high-top tables with bar stools',
      'Back-bar with glass shelving',
      'Under-counter refrigeration',
      'Dual handwash sink',
      'Lounge seating: 2 loveseats + 4 armchairs'
    ],
    capacity: '24 guests',
    area: '30 m²'
  },
  {
    id: 'private-dining',
    label: 'Private Dining Room',
    x: 320,
    y: 190,
    width: 140,
    height: 120,
    fill: '#ede9fe',
    stroke: '#7c3aed',
    details: [
      '3 tables for 8 guests each',
      'Dedicated service door',
      'Dimmable lighting controls',
      'Integrated A/V for presentations',
      'Sound-insulated walls (STC 50)'
    ],
    capacity: '24 guests',
    area: '18 m²'
  },
  {
    id: 'kitchen',
    label: 'Kitchen',
    x: 30,
    y: 320,
    width: 320,
    height: 180,
    fill: '#fee2e2',
    stroke: '#dc2626',
    details: [
      'Hot line: 6-burner range, flat-top grill, salamander, fryers',
      'Cold line: walk-in cooler, prep fridge, salad station',
      'Prep area: stainless steel central island (3 m × 1.2 m)',
      'Dish pit: commercial dishwasher, 3-compartment sink',
      'Pantry storage: dry goods shelving, spice rack',
      'Expeditor station at pass-through',
      'Ventilation: Type I hood (4.5 m), make-up air system',
      'Floor: non-slip quarry tile, 6 mm cove base',
      'Fire suppression: Ansul wet chemical system'
    ],
    area: '80 m²'
  },
  {
    id: 'restrooms',
    label: 'Restrooms',
    x: 470,
    y: 30,
    width: 100,
    height: 120,
    fill: '#e0f2fe',
    stroke: '#0284c7',
    details: [
      'Men\'s: 2 toilets, 2 urinals, 2 sinks',
      'Women\'s: 3 toilets, 2 sinks, vanity area',
      'Accessible: 1 ADA-compliant unisex toilet',
      'Motion-sensor faucets & lighting',
      'Hands-free soap dispensers',
      'Air hand dryers'
    ],
    area: '15 m²'
  },
  {
    id: 'staff-storage',
    label: 'Staff & Storage',
    x: 470,
    y: 160,
    width: 100,
    height: 100,
    fill: '#f3e8ff',
    stroke: '#9333ea',
    details: [
      'Staff locker room (12 lockers)',
      'Break area with small table',
      'Dry storage shelving (floor to ceiling)',
      'Chemical storage (locked cabinet)',
      'Office for manager (desk + small safe)'
    ],
    area: '12 m²'
  },
  {
    id: 'terrace',
    label: 'Terrace',
    x: 470,
    y: 270,
    width: 100,
    height: 100,
    fill: '#d1fae5',
    stroke: '#16a34a',
    details: [
      '10 tables (mix of 2-top & 4-top)',
      'Removable pergola with retractable canopy',
      'Outdoor-rated heaters (4 units)',
      'String lighting on perimeter',
      'Planter boxes with herbs & lavender',
      'All-weather furniture (teak + cushions)'
    ],
    capacity: '32 guests',
    area: '60 m²'
  },
  {
    id: 'emergency',
    label: 'Emergency Exit',
    x: 250,
    y: 490,
    width: 100,
    height: 30,
    fill: '#fecaca',
    stroke: '#b91c1c',
    details: [
      'Panic bar door (outward-opening)',
      'Illuminated EXIT sign',
      'Meets fire code: max 30 m travel distance',
      'Direct access to parking / alley'
    ],
    area: '3 m²'
  }
]

export default function FloorPlan() {
  const [selectedRoom, setSelectedRoom] = useState<RoomData | null>(null)
  const [hoveredRoom, setHoveredRoom] = useState<string | null>(null)

  const totalArea = rooms.reduce((sum, r) => sum + (r.area ? parseFloat(r.area) : 0), 0)
  const totalCapacity = rooms.reduce((sum, r) => sum + (r.capacity ? parseInt(r.capacity) : 0), 0)

  return (
    <div className="space-y-6">
      {/* Summary stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Area', value: `~${totalArea} m²`, icon: '📐' },
          { label: 'Total Capacity', value: `${totalCapacity} seats`, icon: '🪑' },
          { label: 'Dining Zones', value: '5', icon: '🍽️' },
          { label: 'Type', value: 'Upscale Casual', icon: '⭐' }
        ].map((stat) => (
          <div key={stat.label} className="bg-muted/50 rounded-xl p-4 text-center">
            <div className="text-2xl mb-1">{stat.icon}</div>
            <div className="text-lg font-bold text-foreground">{stat.value}</div>
            <div className="text-xs text-muted-foreground">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Floor plan SVG */}
      <div className="relative w-full overflow-auto rounded-2xl border bg-card p-4 shadow-sm">
        <div className="min-w-[620px] mx-auto">
          <svg
            viewBox="-10 -10 620 560"
            className="w-full h-auto"
            style={{ maxHeight: '600px' }}
          >
            {/* Background grid */}
            <defs>
              <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#e5e7eb" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect x="-10" y="-10" width="620" height="560" fill="url(#grid)" />

            {/* Outer walls */}
            <rect
              x="20"
              y="20"
              width="560"
              height="510"
              fill="none"
              stroke="#374151"
              strokeWidth="4"
              rx="4"
            />

            {/* Rooms */}
            {rooms.map((room) => {
              const isHovered = hoveredRoom === room.id
              const isSelected = selectedRoom?.id === room.id

              return (
                <g
                  key={room.id}
                  onClick={() => setSelectedRoom(selectedRoom?.id === room.id ? null : room)}
                  onMouseEnter={() => setHoveredRoom(room.id)}
                  onMouseLeave={() => setHoveredRoom(null)}
                  className="cursor-pointer"
                >
                  {/* Room fill */}
                  <rect
                    x={room.x}
                    y={room.y}
                    width={room.width}
                    height={room.height}
                    fill={room.fill}
                    stroke={room.stroke}
                    strokeWidth={isSelected ? 3 : isHovered ? 2.5 : 1.5}
                    rx="4"
                    opacity={isHovered || isSelected ? 1 : 0.8}
                  />

                  {/* Room label */}
                  <text
                    x={room.x + room.width / 2}
                    y={room.y + room.height / 2 - (room.details.length > 5 ? 12 : 4)}
                    textAnchor="middle"
                    className="text-[9px] font-semibold fill-gray-700 select-none"
                  >
                    {room.label}
                  </text>

                  {/* Sub info */}
                  {room.area && (
                    <text
                      x={room.x + room.width / 2}
                      y={room.y + room.height / 2 + 6}
                      textAnchor="middle"
                      className="text-[7px] fill-gray-500 select-none"
                    >
                      {room.area}
                    </text>
                  )}
                  {room.capacity && (
                    <text
                      x={room.x + room.width / 2}
                      y={room.y + room.height / 2 + 16}
                      textAnchor="middle"
                      className="text-[7px] fill-gray-500 select-none"
                    >
                      {room.capacity}
                    </text>
                  )}
                </g>
              )
            })}

            {/* Door indicators */}
            {/* Main entrance */}
            <rect x="60" y="20" width="40" height="10" fill="#d97706" rx="2" />
            <text x="80" y="18" textAnchor="middle" className="text-[7px] fill-gray-700 font-bold select-none">
              MAIN ENTRY
            </text>

            {/* Bar entrance from dining */}
            <rect x="310" y="70" width="10" height="40" fill="#db2777" rx="2" opacity="0.7" />

            {/* Kitchen pass */}
            <rect x="140" y="310" width="50" height="10" fill="#dc2626" rx="2" />
            <text x="165" y="308" textAnchor="middle" className="text-[6px] fill-gray-500 select-none">
              PASS
            </text>

            {/* Staff door to kitchen */}
            <rect x="470" y="350" width="10" height="40" fill="#9333ea" rx="2" opacity="0.7" />

            {/* Flow arrows */}
            <defs>
              <marker id="arrowhead" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
                <polygon points="0 0, 8 3, 0 6" fill="#6b7280" />
              </marker>
            </defs>

            {/* Guest flow */}
            <line x1="80" y1="35" x2="80" y2="75" stroke="#6b7280" strokeWidth="1.5" markerEnd="url(#arrowhead)" strokeDasharray="4,3" />
            <line x1="80" y1="100" x2="80" y2="140" stroke="#6b7280" strokeWidth="1.5" markerEnd="url(#arrowhead)" strokeDasharray="4,3" />

            {/* Staff flow */}
            <line x1="500" y1="260" x2="500" y2="330" stroke="#9333ea" strokeWidth="1.5" markerEnd="url(#arrowhead)" strokeDasharray="4,3" opacity="0.6" />

            {/* Emergency exit arrow */}
            <line x1="300" y1="520" x2="300" y2="540" stroke="#b91c1c" strokeWidth="2" markerEnd="url(#arrowhead)" />
          </svg>

          {/* Legend */}
          <div className="flex flex-wrap gap-3 mt-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-amber-200 border border-amber-600 inline-block" /> Entrance
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-emerald-100 border border-emerald-600 inline-block" /> Dining
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-pink-100 border border-pink-600 inline-block" /> Bar
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-violet-100 border border-violet-500 inline-block" /> Private
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-red-100 border border-red-600 inline-block" /> Kitchen
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-sky-100 border border-sky-600 inline-block" /> Restrooms
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-purple-100 border border-purple-500 inline-block" /> Staff
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-green-200 border border-green-600 inline-block" /> Terrace
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-red-200 border border-red-700 inline-block" /> Emergency
            </span>
          </div>
        </div>
      </div>

      {/* Detail panel */}
      <AnimatePresence mode="wait">
        {selectedRoom && (
          <motion.div
            initial={{ opacity: 0, y: 20, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -10, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div
              className="rounded-2xl border p-6 shadow-sm"
              style={{
                borderLeftWidth: '4px',
                borderLeftColor: selectedRoom.stroke
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-foreground">{selectedRoom.label}</h3>
                  <div className="flex gap-3 mt-1">
                    {selectedRoom.area && (
                      <span className="text-sm text-muted-foreground">Area: {selectedRoom.area}</span>
                    )}
                    {selectedRoom.capacity && (
                      <span className="text-sm text-muted-foreground">Capacity: {selectedRoom.capacity}</span>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => setSelectedRoom(null)}
                  className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                >
                  Close
                </button>
              </div>
              <ul className="space-y-2">
                {selectedRoom.details.map((detail, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full shrink-0" style={{ backgroundColor: selectedRoom.stroke }} />
                    <span className="text-foreground/80">{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!selectedRoom && (
        <p className="text-sm text-muted-foreground text-center py-2">
          Click on any room in the floor plan above to see detailed specifications.
        </p>
      )}
    </div>
  )
}
