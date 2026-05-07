'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface TableConfig {
  type: string
  size: string
  count: number
  capacity: number
  totalSeats: number
  location: string
  features: string[]
}

const tableConfigs: TableConfig[] = [
  {
    type: '2-Top Round',
    size: 'Ø 60 cm',
    count: 8,
    capacity: 2,
    totalSeats: 16,
    location: 'Main Dining, Bar Area',
    features: ['Pedestal base', 'Candle holder', 'Compact for intimate dining']
  },
  {
    type: '4-Top Square',
    size: '80 × 80 cm',
    count: 8,
    capacity: 4,
    totalSeats: 32,
    location: 'Main Dining, Terrace',
    features: ['Movable chairs', 'Table number stand', 'Standard configuration']
  },
  {
    type: '6-Top Rectangle',
    size: '180 × 80 cm',
    count: 4,
    capacity: 6,
    totalSeats: 24,
    location: 'Main Dining',
    features: ['Benches on one side', 'Pushchairs accessible', 'Family-friendly']
  },
  {
    type: '8-Top Oval',
    size: '200 × 90 cm',
    count: 3,
    capacity: 8,
    totalSeats: 24,
    location: 'Main Dining, Private Room',
    features: ['Lazy Susan optional', 'Extra space for dishes', 'Celebration-friendly']
  },
  {
    type: 'Bar Stool (High-Top)',
    size: 'N/A',
    count: 14,
    capacity: 1,
    totalSeats: 14,
    location: 'Bar & Lounge',
    features: ['Footrest rail', 'Coat hook', 'Perimeter bar seating']
  },
  {
    type: 'Lounge Seating',
    size: 'Various',
    count: 6,
    capacity: 1,
    totalSeats: 6,
    location: 'Bar Lounge, Waiting Area',
    features: ['Loveseats & armchairs', 'Side tables', 'Casual / drinks']
  }
]

const seatingZones = [
  {
    name: 'Main Dining Hall',
    capacity: 80,
    tables: 20,
    spacing: '90 cm between tables (140 cm for wheelchair path)',
    ambiance: 'Warm pendant lights at 2700K, 60 lux on tables'
  },
  {
    name: 'Bar & Lounge',
    capacity: 20,
    tables: 4,
    spacing: '70 cm between high-tops, 50 cm bar stool spacing',
    ambiance: 'Dim warm lighting, 150 lux ambient, accent uplighting'
  },
  {
    name: 'Private Dining Room',
    capacity: 24,
    tables: 3,
    spacing: '120 cm between tables, 150 cm from wall',
    ambiance: 'Dimmable, 40–300 lux, blackout capable'
  },
  {
    name: 'Terrace',
    capacity: 32,
    tables: 10,
    spacing: '100 cm between tables, 80 cm from railing',
    ambiance: 'String lights, solar lanterns, natural daylight'
  }
]

export default function SeatingArrangements() {
  const totalSeats = tableConfigs.reduce((sum, t) => sum + t.totalSeats, 0)
  const totalTables = tableConfigs.reduce((sum, t) => sum + t.count, 0)

  return (
    <div className="space-y-8">
      {/* Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6 text-center">
            <div className="text-3xl font-bold text-emerald-600">{totalSeats}</div>
            <div className="text-sm text-muted-foreground mt-1">Total Seats</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <div className="text-3xl font-bold text-emerald-600">{totalTables}</div>
            <div className="text-sm text-muted-foreground mt-1">Total Tables</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <div className="text-3xl font-bold text-emerald-600">{tableConfigs.length}</div>
            <div className="text-sm text-muted-foreground mt-1">Table Types</div>
          </CardContent>
        </Card>
      </div>

      {/* Table Types */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Table Configurations</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tableConfigs.map((table) => (
            <Card key={table.type} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">{table.type}</CardTitle>
                  <Badge variant="secondary">{table.count}x</Badge>
                </div>
                <div className="flex gap-2 mt-1">
                  <Badge variant="outline" className="text-xs">{table.size}</Badge>
                  <Badge variant="outline" className="text-xs">{table.totalSeats} seats total</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-muted-foreground mb-3">
                  Location: {table.location}
                </div>
                <ul className="space-y-1">
                  {table.features.map((f, i) => (
                    <li key={i} className="text-xs text-foreground/70 flex items-start gap-1.5">
                      <span className="text-emerald-500 mt-0.5">•</span>
                      {f}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Seating Zones */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Seating Zones</h3>
        <div className="space-y-3">
          {seatingZones.map((zone) => (
            <Card key={zone.name}>
              <CardContent className="py-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                  <div>
                    <h4 className="font-semibold">{zone.name}</h4>
                    <p className="text-sm text-muted-foreground mt-0.5">
                      {zone.tables} tables &middot; {zone.capacity} seats
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Badge variant="outline" className="text-xs whitespace-nowrap">
                      📏 {zone.spacing.split(',')[0]}
                    </Badge>
                  </div>
                </div>
                <div className="mt-3 text-xs text-muted-foreground space-y-1">
                  <p><span className="font-medium text-foreground/80">Spacing:</span> {zone.spacing}</p>
                  <p><span className="font-medium text-foreground/80">Lighting:</span> {zone.ambiance}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Spacing Guidelines */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Minimum Spacing Guidelines (EN 17283:2020)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <div className="flex justify-between py-1.5 border-b">
                <span className="text-muted-foreground">Table-to-table (same row)</span>
                <span className="font-medium">≥ 90 cm</span>
              </div>
              <div className="flex justify-between py-1.5 border-b">
                <span className="text-muted-foreground">Table-back to chair (next row)</span>
                <span className="font-medium">≥ 75 cm</span>
              </div>
              <div className="flex justify-between py-1.5 border-b">
                <span className="text-muted-foreground">Main aisle width</span>
                <span className="font-medium">≥ 110 cm</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-muted-foreground">Wheelchair path</span>
                <span className="font-medium">≥ 140 cm</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between py-1.5 border-b">
                <span className="text-muted-foreground">Chair seat height</span>
                <span className="font-medium">45–48 cm</span>
              </div>
              <div className="flex justify-between py-1.5 border-b">
                <span className="text-muted-foreground">Table height (standard)</span>
                <span className="font-medium">75 cm</span>
              </div>
              <div className="flex justify-between py-1.5 border-b">
                <span className="text-muted-foreground">Bar stool height</span>
                <span className="font-medium">75–80 cm seat</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-muted-foreground">Bar counter height</span>
                <span className="font-medium">105–110 cm</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
