'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const flowPaths = [
  {
    name: 'Guest Flow',
    icon: '🚶',
    color: 'emerald',
    description: 'The path a guest follows from arrival to departure, optimized for comfort and intuitive navigation.',
    steps: [
      {
        step: '1. Arrival & Entry',
        details: 'Guest arrives → exterior signage visible → automatic doors → host stand greeting → wait bench if needed (capacity: 6-8)',
        width: '150 cm clear path'
      },
      {
        step: '2. Seating',
        details: 'Host escorts guest → main aisle (120 cm) → table → pull-out chair assistance if needed → menu presentation → drink order taken',
        width: '90-120 cm between tables'
      },
      {
        step: '3. Dining Experience',
        details: 'Food and beverages served → staff access via perimeter service paths (80 cm) → bussing without crossing guest paths → ambient noise level ≤ 65 dB',
        width: '80 cm service paths'
      },
      {
        step: '4. Restroom Visit',
        details: 'Guest navigates from table → clear aisle → restroom area → separate men\'s, women\'s, and accessible facilities → return via same path',
        width: '120 cm aisle maintained'
      },
      {
        step: '5. Payment & Departure',
        details: 'Guest requests check → payment at table (mobile POS) or at host stand → host thanks guest → guest exits through main entrance',
        width: '150 cm clear exit path'
      }
    ]
  },
  {
    name: 'Service Staff Flow',
    icon: '🍽️',
    color: 'blue',
    description: 'Efficient circulation paths for servers and bussers to minimize cross-traffic with guests.',
    steps: [
      {
        step: '1. Order Placement',
        details: 'Server takes order at table → walks to POS station (located near bar) → enters order → kitchen receives ticket on KDS screen',
        width: '80 cm service aisle'
      },
      {
        step: '2. Food Pickup',
        details: 'Kitchen calls order → server picks up from expeditor pass → side stand for garnishes & condiments → carries to table',
        width: 'Pass width: 120 cm'
      },
      {
        step: '3. Bus Tub Return',
        details: 'Clear dishes from table → bus tub on service cart → transport to dish pit via back corridor → avoid passing through guest dining areas',
        width: '90 cm back corridor'
      },
      {
        step: '4. Table Reset',
        details: 'Dish pit cleans → server retrieves clean dishes from storage → sanitizes table → resets utensils and napkins → table ready (target: 3 min)',
        width: 'N/A'
      }
    ]
  },
  {
    name: 'Kitchen Internal Flow',
    icon: '👨‍🍳',
    color: 'red',
    description: 'Internal kitchen workflow designed for maximum efficiency and food safety (separation of raw/cooked, clean/dirty).',
    steps: [
      {
        step: '1. Receiving → Storage',
        details: 'Delivery at back entrance → check quality/temperature → dry goods to dry storage, perishables to walk-in cooler, frozen to walk-in freezer',
        width: '150 cm receiving area'
      },
      {
        step: '2. Storage → Prep',
        details: 'Ingredients pulled from storage FIFO → central prep island → mise en place prepared → distributed to hot line or cold line',
        width: 'Open floor, 120 cm between stations'
      },
      {
        step: '3. Cooking → Plating',
        details: 'Hot line cooks proteins/veg/sauces → cold line prepares salads/desserts → all converge at expeditor pass for quality check and plating',
        width: 'Expeditor pass: 120 cm'
      },
      {
        step: '4. Dirty → Clean',
        details: 'Used dishes arrive at dish pit → pre-rinse → wash (high-temp machine) → sanitise → clean storage → servers pull as needed',
        width: 'One-way flow, no cross-over'
      }
    ]
  },
  {
    name: 'Emergency Flow',
    icon: '🚨',
    color: 'amber',
    description: 'Safe evacuation routes for all occupants, including those with mobility impairments.',
    steps: [
      {
        step: '1. Emergency Exit Routes',
        details: 'Primary exit: main entrance (150 cm). Secondary exit: emergency exit at kitchen rear (120 cm). Maximum travel distance from any point: ≤ 30 m to nearest exit.',
        width: 'Min 120 cm emergency path'
      },
      {
        step: '2. Evacuation for Mobility-Impaired',
        details: 'Identified refuge points (fire-rated, 2-hour). Communication: two-way intercom at refuge. Evacuation chairs on upper levels. Staff briefed on buddy system.',
        width: '150 cm turning circle at refuge'
      },
      {
        step: '3. Assembly Point',
        details: 'Designated outdoor assembly area: 30 m from building, in parking lot. Head count by section. Emergency services access lane: 6 m wide, unobstructed.',
        width: 'N/A (outdoor)'
      }
    ]
  }
]

const flowRules = [
  { rule: 'No cross-traffic', description: 'Guest and staff paths should not intersect in dining areas. Service paths run along perimeter walls.' },
  { rule: 'One-way kitchen flow', description: 'Dirty dishes enter dish pit from one side; clean dishes exit from the other. No crossover.' },
  { rule: 'Separate raw and cooked', description: 'Raw protein prep on one side of island, finished plating on the other side. Dedicated cutting boards.' },
  { rule: 'Emergency paths clear', description: 'All exit paths remain unobstructed at all times. No storage or furniture blocking emergency routes.' },
  { rule: 'Dead zones minimized', description: 'No areas where staff cannot be seen by colleagues (CCTV and line-of-sight design).' },
  { rule: 'Delivery separation', description: 'Deliveries enter through back entrance only, never through guest-facing areas.' }
]

export default function FlowDesign() {
  return (
    <div className="space-y-8">
      {/* Flow Paths */}
      {flowPaths.map((flow) => (
        <Card key={flow.name}>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base flex items-center gap-2">
                <span className="text-xl">{flow.icon}</span>
                {flow.name}
              </CardTitle>
              <Badge variant="secondary">Path Width: {flow.steps[0].width}</Badge>
            </div>
            <p className="text-sm text-muted-foreground">{flow.description}</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {flow.steps.map((step, i) => (
                <div key={i} className="flex gap-4">
                  {/* Step number / connector */}
                  <div className="flex flex-col items-center shrink-0">
                    <div className={`w-8 h-8 rounded-full bg-${flow.color}-100 text-${flow.color}-700 flex items-center justify-center text-sm font-bold border-2 border-${flow.color}-300`}>
                      {i + 1}
                    </div>
                    {i < flow.steps.length - 1 && (
                      <div className={`w-0.5 flex-1 bg-${flow.color}-200 mt-1`} />
                    )}
                  </div>
                  {/* Step content */}
                  <div className="flex-1 pb-4">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-medium text-sm">{step.step}</h4>
                      {i === 0 && (
                        <span className="text-xs text-muted-foreground">{step.width}</span>
                      )}
                    </div>
                    <p className="text-xs text-foreground/75 leading-relaxed">{step.details}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}

      {/* Flow Rules */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Flow Design Principles</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {flowRules.map((rule, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                <span className="text-lg shrink-0">💡</span>
                <div>
                  <h4 className="font-medium text-sm">{rule.rule}</h4>
                  <p className="text-xs text-muted-foreground mt-0.5">{rule.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Noise and Environment */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Environmental Comfort Targets</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
            {[
              { label: 'Ambient Noise (Dining)', value: '≤ 65 dB', note: 'Conversational comfort' },
              { label: 'Ambient Noise (Bar)', value: '≤ 75 dB', note: 'Lively but not overwhelming' },
              { label: 'Kitchen Noise', value: '≤ 80 dB', note: 'At staff ear level; hearing protection recommended near dish pit' },
              { label: 'Room Temperature', value: '21–23°C', note: 'Dining area setpoint' },
              { label: 'Kitchen Temperature', value: '≤ 26°C', note: 'With make-up air system' },
              { label: 'Humidity', value: '40–60% RH', note: 'All indoor areas' },
              { label: 'Lighting (Dining)', value: '200–300 lux', note: 'Warm white 2700K, dimmable' },
              { label: 'Lighting (Kitchen)', value: '500 lux', note: 'Cool white 4000K, task-focused' },
              { label: 'Air Changes (Kitchen)', value: '15–20 ACH', note: 'Mechanical ventilation required' },
              { label: 'Air Changes (Dining)', value: '6–8 ACH', note: 'Displacement ventilation preferred' }
            ].map((item) => (
              <div key={item.label} className="border rounded-lg p-3">
                <div className="text-xs text-muted-foreground">{item.label}</div>
                <div className="font-semibold mt-0.5">{item.value}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{item.note}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
