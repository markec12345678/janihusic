'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const utilityAreas = [
  {
    name: 'Customer Restrooms',
    area: '15 m²',
    icon: '🚻',
    specs: [
      { category: "Men's Room", items: [
        '2 wall-hung toilets in stalls (90×90 cm each)',
        '2 wall-hung urinals (min 45 cm spacing)',
        '2 sensor-operated washbasins',
        '1 full-length mirror',
        'Automatic air freshener dispenser',
        'Waste bin + sanitary disposal unit'
      ]},
      { category: "Women's Room", items: [
        '3 wall-hung toilets in stalls (90×90 cm each)',
        '2 sensor-operated washbasins with vanity',
        'Large vanity mirror with LED lighting',
        'Changing table (retractable, wall-mounted)',
        'Sanitary disposal bins in each stall',
        'Automatic air freshener dispenser'
      ]},
      { category: 'Accessible (Unisex)', items: [
        '1 wheelchair-accessible toilet (150×170 cm stall)',
        '1 sensor-operated washbasin (80 cm height)',
        '1 wall-mounted grab bar (horizontal + angled)',
        'Emergency pull cord',
        'Lower shelf for personal items',
        'Mirror at 90–100 cm height'
      ]},
      { category: 'Shared Specs', items: [
        'Hands-free fixtures (faucets, soap dispensers, dryers)',
        'Non-slip tile flooring (R10+ slip rating)',
        'Motion-sensor LED lighting (auto on/off)',
        'Extractor fan (min 50 m³/hr per fixture)',
        'Easy-clean wall panels up to 1.5 m height'
      ]}
    ]
  },
  {
    name: 'Staff Room & Facilities',
    area: '12 m²',
    icon: '👥',
    specs: [
      { category: 'Locker Area', items: [
        '12 lockers (30×45×60 cm each) with keyed locks',
        'Bench between lockers (length: 1.8 m)',
        'Wall mirror above bench'
      ]},
      { category: 'Break Area', items: [
        'Small dining table (4 seats)',
        'Under-counter fridge for staff use',
        'Microwave oven',
        'Coffee maker station',
        'Water cooler / filtered water tap'
      ]},
      { category: 'Manager Office', items: [
        'Desk + ergonomic chair',
        'Filing cabinet (2-drawer)',
        'Small safe (cash drop)',
        'Computer with POS access',
        'CCTV monitor bank (8 cameras)'
      ]}
    ]
  },
  {
    name: 'Storage Areas',
    area: '16 m² (kitchen storage included)',
    icon: '📦',
    specs: [
      { category: 'Dry Storage (Kitchen)', items: [
        'Floor-to-ceiling wire shelving (min 15 cm off floor)',
        'FIFO (First In, First Out) labeling system',
        'Airtight food-grade containers for bulk items',
        'Dedicated shelving zones: grains, spices, canned goods, paper goods',
        'Thermometer / humidity monitor'
      ]},
      { category: 'Chemical Storage', items: [
        'Locked cabinet with secondary containment tray',
        'SDS (Safety Data Sheets) binder posted on door',
        'Separated from food storage by min 3 m',
        'Ventilated cabinet for cleaning chemicals'
      ]},
      { category: 'Linen Storage', items: [
        'Open shelving for tablecloths, napkins, aprons',
        'Separate clean/soiled sections',
        'Hanging rods for uniforms'
      ]},
      { category: 'Non-Food Supplies', items: [
        'Shelving for disposable items (cups, lids, containers)',
        'Cleaning supplies station',
        'Maintenance tools area'
      ]}
    ]
  },
  {
    name: 'Mechanical / Utility Room',
    area: '8 m²',
    icon: '🔧',
    specs: [
      { category: 'Mechanical', items: [
        'HVAC air handling unit (or access to building system)',
        'Electrical panel (main distribution board)',
        'Water heater (110 L, minimum)',
        'Water softener / filtration system'
      ]},
      { category: 'Emergency Equipment', items: [
        'First aid kit (wall-mounted, clearly marked)',
        'Fire extinguisher (ABC type)',
        'Emergency lighting battery backup',
        'Shut-off valves for water and gas (labeled)'
      ]}
    ]
  }
]

export default function UtilityAreas() {
  return (
    <div className="space-y-6">
      {utilityAreas.map((area) => (
        <Card key={area.name}>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base flex items-center gap-2">
                <span className="text-xl">{area.icon}</span>
                {area.name}
              </CardTitle>
              <Badge variant="secondary">{area.area}</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {area.specs.map((spec) => (
                <div key={spec.category} className="border rounded-lg p-4">
                  <h4 className="font-medium text-sm mb-3">{spec.category}</h4>
                  <ul className="space-y-1.5">
                    {spec.items.map((item, i) => (
                      <li key={i} className="text-xs text-foreground/80 flex items-start gap-2">
                        <span className="text-emerald-500 mt-0.5 shrink-0">●</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}

      {/* Regulatory Compliance */}
      <Card className="border-amber-200 bg-amber-50/50">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <span>📋</span>
            Regulatory Compliance Checklist
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <h4 className="font-medium text-amber-900">Health & Hygiene (HACCP)</h4>
              <ul className="space-y-1.5">
                {[
                  'Potable water supply at all sinks',
                  'Handwash stations within 7.5 m of food prep areas',
                  'No cross-connection between waste and supply lines',
                  'Backflow preventers on all fixtures',
                  'Grease trap sized for kitchen capacity (min 500 L)',
                  'Food-safe surfaces on all prep areas (NSF/ANSI certified)',
                  'Temperature monitoring logs maintained daily'
                ].map((item, i) => (
                  <li key={i} className="text-xs text-amber-900/80 flex items-start gap-2">
                    <span className="text-amber-600 mt-0.5">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-amber-900">Building & Safety Codes</h4>
              <ul className="space-y-1.5">
                {[
                  'Fire extinguishers inspected annually',
                  'Emergency lighting tested monthly',
                  'CCTV system operational (min 30-day recording)',
                  'Non-slip flooring in kitchen (R10+ rating)',
                  'Guardrails on terrace if drop > 60 cm',
                  'Maximum occupant load posted at entrance',
                  'Fire escape plan posted in staff areas'
                ].map((item, i) => (
                  <li key={i} className="text-xs text-amber-900/80 flex items-start gap-2">
                    <span className="text-amber-600 mt-0.5">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
