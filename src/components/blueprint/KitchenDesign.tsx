'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface Station {
  name: string
  equipment: string[]
  dimensions: string
  notes: string[]
}

interface KitchenZone {
  name: string
  area: string
  description: string
  stations: Station[]
}

const kitchenZones: KitchenZone[] = [
  {
    name: 'Hot Line',
    area: '24 m²',
    description: 'Primary cooking zone with all heat-producing equipment under Type I ventilation hood.',
    stations: [
      {
        name: 'Range Station',
        dimensions: '3.0 m × 0.9 m',
        equipment: ['6-burner gas range', '2 convection ovens underneath', 'Charbroiler attachment', 'Plancha/griddle (1.2 m)'],
        notes: ['Type I hood coverage required', 'Gas supply: 3/4" line with regulator', 'Fire suppression nozzle above each unit']
      },
      {
        name: 'Fry Station',
        dimensions: '1.5 m × 0.8 m',
        equipment: ['2 double-tank electric fryers', 'Filtration system', 'Oil storage caddies', 'Heat lamp holding area'],
        notes: ['Dedicated circuit: 208V/3-phase', 'Oil disposal container nearby', 'Non-slip mat in front']
      },
      {
        name: 'Salamander / Broiler',
        dimensions: '1.0 m × 0.6 m',
        equipment: ['Overhead salamander broiler', 'Heat-resistant pass-through shelf', 'Cheese melter'],
        notes: ['Mounted above expeditor pass', 'Easy access for finishing plates']
      }
    ]
  },
  {
    name: 'Cold Line',
    area: '18 m²',
    description: 'Preparation of salads, appetizers, desserts, and cold plating.',
    stations: [
      {
        name: 'Salad / Prep Station',
        dimensions: '2.5 m × 0.8 m',
        equipment: ['Refrigerated prep table (under-counter)', 'Cutting board inserts (color-coded)', 'Ingredient wells (6-pan capacity)', 'Small refrigerated drawers'],
        notes: ['Prep sink within 3 m radius', 'Built-in waste chute', 'Cold chain maintained: &lt; 5°C internal']
      },
      {
        name: 'Garde Manger',
        dimensions: '2.0 m × 0.7 m',
        equipment: ['Under-counter reach-in fridge', 'Plate storage above', 'Curing/drying shelf'],
        notes: ['Separate from raw protein prep', 'Temperature monitoring required']
      }
    ]
  },
  {
    name: 'Prep & Central Island',
    area: '12 m²',
    description: 'Central workspace for mise en place, butchery, and batch preparation.',
    stations: [
      {
        name: 'Central Prep Island',
        dimensions: '3.0 m × 1.2 m',
        equipment: ['Stainless steel top with anti-fatigue mat below', 'Under-shelf storage', 'Built-in cutting boards', 'Overhead pot rack'],
        notes: ['Accessible from both sides', 'Electrical outlets every 60 cm', 'Trash/recycling bins integrated']
      },
      {
        name: 'Sink Cluster',
        dimensions: '2.0 m × 0.7 m',
        equipment: ['2-compartment wash sink (60×50 cm basins)', '1 hand-wash sink (lever-operated)', '1 food prep sink (dedicated)', 'Pre-rinse spray nozzle'],
        notes: ['Hot water: min 60°C at tap', 'Grease trap on main drain', 'Backflow preventer installed']
      }
    ]
  },
  {
    name: 'Dish Pit',
    area: '10 m²',
    description: 'Dishwashing and sanitation zone, separated from food prep areas.',
    stations: [
      {
        name: 'Dishwashing Station',
        dimensions: '3.0 m × 1.0 m',
        equipment: ['High-temp commercial dishwasher (250 racks/hr)', '3-compartment sink for manual wash', 'Pre-rinse spray assembly', 'Dish racks (stored on shelving)'],
        notes: ['Booster heater: 82°C final rinse', 'Separate clean/dirty dish flows', 'Noise-rated enclosure recommended']
      },
      {
        name: 'Waste Management',
        dimensions: '1.5 m × 0.7 m',
        equipment: ['3-bin sorting station (organic, recycle, landfill)', 'Cardboard compactor', 'Grease interceptor (outdoor)'],
        notes: ['EU food waste regulations compliant', 'Daily cleaning schedule']
      }
    ]
  },
  {
    name: 'Storage',
    area: '16 m²',
    description: 'Organized storage for dry goods, refrigerated items, and non-food supplies.',
    stations: [
      {
        name: 'Walk-in Cooler',
        dimensions: '3.0 m × 2.5 m (internal)',
        equipment: ['4-tier stainless shelving', 'Hanging rail for meats', 'Temperature display/alarm (external)', 'Self-closing door with strip curtain'],
        notes: ['Set point: 2–4°C', 'Floor: epoxy-coated with drain', 'Door: minimum 90 cm width']
      },
      {
        name: 'Walk-in Freezer',
        dimensions: '2.5 m × 2.0 m (internal)',
        equipment: ['3-tier shelving', 'Mobile rack system', 'Temperature alarm with remote notification'],
        notes: ['Set point: -18°C', 'Anti-condensation heater on door frame', 'Interior light with switch']
      },
      {
        name: 'Dry Storage',
        dimensions: '3.0 m × 2.0 m',
        equipment: ['Floor-to-ceiling wire shelving', 'FIFO labeling system', 'Airtight ingredient bins'],
        notes: ['Room temperature: 10–21°C', 'Ventilated', 'Pest monitoring traps', 'Minimum 15 cm off floor']
      }
    ]
  }
]

export default function KitchenDesign() {
  return (
    <div className="space-y-8">
      {/* Kitchen Overview */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {kitchenZones.map((zone) => (
          <Card key={zone.name} className="hover:shadow-md transition-shadow">
            <CardContent className="pt-4 pb-3 px-4 text-center">
              <div className="text-sm font-semibold">{zone.name}</div>
              <div className="text-xs text-muted-foreground mt-1">{zone.area}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Kitchen Workflow Diagram */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Kitchen Workflow (Receiving → Serving)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap items-center justify-center gap-2 text-sm">
            {[
              { label: 'Receiving', color: 'bg-blue-100 text-blue-800 border-blue-300' },
              { label: '→', color: '' },
              { label: 'Dry Storage', color: 'bg-purple-100 text-purple-800 border-purple-300' },
              { label: '→', color: '' },
              { label: 'Walk-in Cooler/Freezer', color: 'bg-cyan-100 text-cyan-800 border-cyan-300' },
              { label: '→', color: '' },
              { label: 'Prep Area', color: 'bg-amber-100 text-amber-800 border-amber-300' },
              { label: '→', color: '' },
              { label: 'Hot Line / Cold Line', color: 'bg-red-100 text-red-800 border-red-300' },
              { label: '→', color: '' },
              { label: 'Expeditor Pass', color: 'bg-emerald-100 text-emerald-800 border-emerald-300' },
              { label: '→', color: '' },
              { label: 'Service', color: 'bg-orange-100 text-orange-800 border-orange-300' }
            ].map((step, i) =>
              step.label === '→' ? (
                <span key={i} className="text-muted-foreground font-bold">→</span>
              ) : (
                <Badge key={i} variant="outline" className={step.color}>
                  {step.label}
                </Badge>
              )
            )}
          </div>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-sm">
            {[
              { label: 'Dining Area', color: 'bg-emerald-100 text-emerald-800 border-emerald-300' },
              { label: '→', color: '' },
              { label: 'Bus Tub Return', color: 'bg-gray-100 text-gray-800 border-gray-300' },
              { label: '→', color: '' },
              { label: 'Dish Pit', color: 'bg-red-100 text-red-800 border-red-300' },
              { label: '→', color: '' },
              { label: 'Clean Storage', color: 'bg-blue-100 text-blue-800 border-blue-300' }
            ].map((step, i) =>
              step.label === '→' ? (
                <span key={i} className="text-muted-foreground font-bold">→</span>
              ) : (
                <Badge key={i} variant="outline" className={step.color}>
                  {step.label}
                </Badge>
              )
            )}
          </div>
        </CardContent>
      </Card>

      {/* Detailed Zone Cards */}
      {kitchenZones.map((zone) => (
        <Card key={zone.name}>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">{zone.name}</CardTitle>
              <Badge variant="secondary">{zone.area}</Badge>
            </div>
            <p className="text-sm text-muted-foreground">{zone.description}</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {zone.stations.map((station) => (
                <div key={station.name} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-sm">{station.name}</h4>
                    <span className="text-xs text-muted-foreground">{station.dimensions}</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <div className="text-xs font-medium text-muted-foreground mb-1.5">Equipment</div>
                      <ul className="space-y-1">
                        {station.equipment.map((eq, i) => (
                          <li key={i} className="text-xs text-foreground/80 flex items-start gap-1.5">
                            <span className="text-red-400 mt-0.5">▪</span>
                            {eq}
                          </li>
                        ))}
                      </ul>
                    </div>
                    {station.notes.length > 0 && (
                      <div>
                        <div className="text-xs font-medium text-muted-foreground mb-1.5">Notes</div>
                        <ul className="space-y-1">
                          {station.notes.map((note, i) => (
                            <li key={i} className="text-xs text-foreground/70 flex items-start gap-1.5">
                              <span className="text-amber-500 mt-0.5">⚡</span>
                              {note}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}

      {/* Ventilation & Safety */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Ventilation & Fire Safety Specifications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-3">
              <h4 className="font-medium">Ventilation</h4>
              <ul className="space-y-2">
                <li className="flex justify-between py-1.5 border-b">
                  <span className="text-muted-foreground">Type I Hood (over hot line)</span>
                  <span className="font-medium">4.5 m long</span>
                </li>
                <li className="flex justify-between py-1.5 border-b">
                  <span className="text-muted-foreground">Exhaust rate</span>
                  <span className="font-medium">≥ 250 L/s per m² of hood</span>
                </li>
                <li className="flex justify-between py-1.5 border-b">
                  <span className="text-muted-foreground">Make-up air</span>
                  <span className="font-medium">80–90% of exhaust</span>
                </li>
                <li className="flex justify-between py-1.5">
                  <span className="text-muted-foreground">Grease filters</span>
                  <span className="font-medium">Baffle type, dishwasher-safe</span>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-medium">Fire Safety</h4>
              <ul className="space-y-2">
                <li className="flex justify-between py-1.5 border-b">
                  <span className="text-muted-foreground">Suppression system</span>
                  <span className="font-medium">Ansul R-102 (wet chemical)</span>
                </li>
                <li className="flex justify-between py-1.5 border-b">
                  <span className="text-muted-foreground">Fire extinguishers</span>
                  <span className="font-medium">Class K (kitchen) + ABC (general)</span>
                </li>
                <li className="flex justify-between py-1.5 border-b">
                  <span className="text-muted-foreground">Emergency shut-off</span>
                  <span className="font-medium">Gas & electric at kitchen entrance</span>
                </li>
                <li className="flex justify-between py-1.5">
                  <span className="text-muted-foreground">Smoke detection</span>
                  <span className="font-medium">Photoelectric + heat (kitchen)</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
