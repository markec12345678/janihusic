'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const accessibilityFeatures = [
  {
    category: 'Entrances & Exits',
    icon: '🚪',
    items: [
      {
        feature: 'Main Entrance',
        specs: [
          'Minimum clear width: 90 cm (35.4 in)',
          'Level threshold (max 20 mm rise, beveled)',
          'Double doors: at least one leaf ≥ 90 cm',
          'Automatic or easy-to-operate door hardware (max 22.2 N force)',
          'Contrast marking on glass panels (1200–1500 mm height)',
          'Approach clearance: 150×150 cm on pull side',
          'D tactile ground surface indicator at threshold'
        ]
      },
      {
        feature: 'Emergency Exits',
        specs: [
          'All exits accessible by wheelchair route',
          'Exit doors: panic hardware (max 15 lbf to open)',
          'Visual + audible fire alarms (strobe + siren)',
          'Evacuation chairs on upper levels (if applicable)',
          'Refuge areas identified and signed'
        ]
      },
      {
        feature: 'Outdoor Path of Travel',
        specs: [
          'Minimum path width: 120 cm (no obstructions)',
          'Maximum cross-slope: 2%',
          'Maximum running slope: 5% (1:20), 8.3% (1:12) max for ramps',
          'Ramps: handrails on both sides, landings every 6 m',
          'Firm, stable, slip-resistant surface'
        ]
      }
    ]
  },
  {
    category: 'Interior Navigation',
    icon: '🧭',
    items: [
      {
        feature: 'Pathways',
        specs: [
          'Main aisle: minimum 120 cm clear width',
          'Between tables: minimum 90 cm (140 cm preferred for wheelchair passage)',
          'No protruding objects below 2000 mm in path',
          'Level changes ≤ 6 mm, or ramped with handrails',
          'Floor surfaces: firm, non-slip, low pile carpet or hard surface'
        ]
      },
      {
        feature: 'Flooring',
        specs: [
          'Transition strips at material changes',
          'No loose rugs or mats',
          'D tactile warnings at changes in level or direction',
          'Maximum pile height for carpet: 13 mm',
          'Slip resistance: R10 minimum (DIN 51130)'
        ]
      },
      {
        feature: 'Signage',
        specs: [
          'Contrasting colors (70% minimum contrast ratio)',
          'Raised lettering and Braille on permanent signage',
          'Characters: sans-serif, minimum 16 mm height for room signs',
          'Signs mounted at 1200–1500 mm height',
          'Illuminated or high-contrast text on all exit and safety signs'
        ]
      }
    ]
  },
  {
    category: 'Seating & Tables',
    icon: '🪑',
    items: [
      {
        feature: 'Accessible Tables',
        specs: [
          'Minimum 5% of tables (or at least 1 per dining zone) accessible',
          'Table height: 70–86 cm (standard wheelchair armrest clearance)',
          'Knee clearance: min 68 cm high × 50 cm deep',
          'Clear floor space: 150 cm diameter circle at accessible table',
          'Tables on firm, level surface'
        ]
      },
      {
        feature: 'Bar Access',
        specs: [
          'Section of bar lowered to 86 cm max',
          'Knee space: 68 cm high × 50 cm deep × 60 cm wide',
          'Clear floor space: 150×150 cm in front',
          'Not located at the end of a narrow aisle'
        ]
      }
    ]
  },
  {
    category: 'Restrooms',
    icon: '🚻',
    items: [
      {
        feature: 'Accessible Restroom (Unisex)',
        specs: [
          'Door: outward-opening, 90 cm min width, lever handle',
          'Clear floor space: 150 cm diameter turning circle',
          'Toilet: centerline 45 cm from nearest wall or partition',
          'Grab bars: horizontal (min 60 cm) + angled on toilet side',
          'Toilet seat height: 43–48 cm',
          'Flush control: max 1 m from floor, on transfer side',
          'Washbasin: rim height max 86 cm, knee clearance below',
          'Mirror: bottom edge max 100 cm from floor',
          'Emergency pull cord within reach of toilet and floor',
          'Paper dispenser: max 120 cm from floor, on transfer side',
          'Coat hook: max 120 cm from floor'
        ]
      }
    ]
  },
  {
    category: 'Additional Features',
    icon: '♿',
    items: [
      {
        feature: 'Assistive Technology',
        specs: [
          'Hearing loop (induction loop) at host stand and private dining',
          'Menu available in large print (minimum 16pt)',
          'Menu available in Braille',
          'Digital menu accessible via QR code (screen reader compatible)',
          'Staff trained in disability awareness'
        ]
      },
      {
        feature: 'Service Animal Accommodation',
        specs: [
          'Water bowls available for service animals',
          'Outdoor relief area identified',
          'Staff informed of service animal policies'
        ]
      }
    ]
  }
]

const relevantStandards = [
  { code: 'EN 17283:2020', name: 'Accessibility and usability of the built environment — Requirements for catering areas' },
  { code: 'EN 17210:2021', name: 'Accessibility and usability of the built environment' },
  { code: 'ISO 21542:2011', name: 'Building construction — Accessibility and usability of the built environment' },
  { code: 'ADA Standards', name: 'Americans with Disabilities Act Standards for Accessible Design (2010)' },
  { code: 'HR 4 (EU)', name: 'European Accessibility Act — compliance by 28 June 2025' }
]

export default function Accessibility() {
  return (
    <div className="space-y-6">
      {/* Standards Reference */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Applicable Standards & Regulations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {relevantStandards.map((std) => (
              <div key={std.code} className="flex items-start gap-3 py-1.5 border-b last:border-0">
                <Badge variant="outline" className="shrink-0 font-mono text-xs">{std.code}</Badge>
                <span className="text-sm text-muted-foreground">{std.name}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Detailed Features */}
      {accessibilityFeatures.map((category) => (
        <Card key={category.category}>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <span className="text-xl">{category.icon}</span>
              {category.category}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {category.items.map((item) => (
              <div key={item.feature} className="border rounded-lg p-4">
                <h4 className="font-medium text-sm mb-3">{item.feature}</h4>
                <ul className="space-y-1.5">
                  {item.specs.map((spec, i) => (
                    <li key={i} className="text-xs text-foreground/80 flex items-start gap-2">
                      <span className="text-emerald-500 mt-0.5 shrink-0">●</span>
                      <span>{spec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
