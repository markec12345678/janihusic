'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface Material {
  name: string
  specification: string
  application: string
  pros: string[]
  maintenance: string
  estimatedCost: string
}

const materialsByArea = [
  {
    area: 'Dining Areas',
    icon: '🍽️',
    materials: [
      {
        name: 'European White Oak Flooring',
        specification: 'Grade: Select/Better, 180mm wide plank, tongue & groove, satin lacquer finish',
        application: 'Main dining hall, private dining room',
        pros: ['Warm aesthetic', 'Durable (Janka 1360)', 'Refinishing possible', 'Timeless appeal'],
        maintenance: 'Sweep daily, damp mop weekly, recoat every 3–5 years',
        estimatedCost: '€60–90/m² installed'
      },
      {
        name: 'Porcelain Tile (Wood-Look)',
        specification: '600×1200 mm, R10 slip rating, rectified edges, matte finish',
        application: 'Bar area, lounge, restrooms',
        pros: ['Water-resistant', 'Low maintenance', 'High durability', 'Consistent appearance'],
        maintenance: 'Sweep and mop daily, grout seal every 2 years',
        estimatedCost: '€40–70/m² installed'
      },
      {
        name: 'Acoustic Wall Panels',
        specification: 'Fabric-wrapped fiberglass core, NRC 0.85+, custom color match, 24mm thick',
        application: 'Upper walls in dining areas (1200 mm + height)',
        pros: ['Noise reduction', 'Aesthetic integration', 'Customizable', 'Class A fire rating'],
        maintenance: 'Vacuum or spot-clean fabric annually',
        estimatedCost: '€50–80/m² installed'
      },
      {
        name: 'Pendant Lights (Custom)',
        specification: 'Hand-blown glass, warm LED 2700K, dimmable, CRI 90+',
        application: 'Above dining tables (60 cm diameter per pendant)',
        pros: ['Focal point', 'Warm ambiance', 'Adjustable brightness', 'Energy efficient'],
        maintenance: 'Dust monthly, LED replacement every 50,000 hrs',
        estimatedCost: '€200–500/pendant'
      }
    ]
  },
  {
    area: 'Kitchen & Back of House',
    icon: '👨‍🍳',
    materials: [
      {
        name: 'Quarry Tile Flooring',
        specification: 'Red clay, 150×150 mm, extruded, abrasion-resistant, R11 slip rating',
        application: 'Entire kitchen floor, dish pit, receiving area',
        pros: ['Extremely slip-resistant', 'Chemical-resistant', 'Durable', 'Heat-resistant'],
        maintenance: 'Sweep and degrease daily, deep clean weekly, reseal grout annually',
        estimatedCost: '€30–50/m² installed'
      },
      {
        name: 'Stainless Steel (304 Grade)',
        specification: 'Type 304, 1.2 mm gauge, brushed #4 finish, NSF/ANSI certified',
        application: 'Prep tables, shelving, backsplashes, sinks',
        pros: ['Hygienic', 'Corrosion-resistant', 'Easy to clean', 'Long-lasting'],
        maintenance: 'Clean with mild detergent after each use, sanitize, avoid chlorine bleach',
        estimatedCost: '€400–700 per linear meter (counters)'
      },
      {
        name: 'Fiberglass Reinforced Panels (FRP)',
        specification: '2.4 mm thick, Class A fire rating, smooth white finish',
        application: 'Kitchen walls (from floor to 2 m height)',
        pros: ['Moisture-resistant', 'Easy to clean', 'Impact-resistant', 'Mold-resistant'],
        maintenance: 'Wipe down daily with sanitizer, replace if cracked',
        estimatedCost: '€20–35/m² installed'
      },
      {
        name: 'Cove Base (6 mm Rubber)',
        specification: 'Continuous rubber cove base, 100 mm high, integrated with floor tile',
        application: 'All kitchen wall-floor junctions',
        pros: ['Sanitary (no gaps)', 'Impact-absorbing', 'Easy to clean', 'Prevents water ingress'],
        maintenance: 'Wipe with sanitizer daily, inspect for peeling',
        estimatedCost: '€8–12/linear meter'
      }
    ]
  },
  {
    area: 'Bar & Lounge',
    icon: '🍸',
    materials: [
      {
        name: 'Natural Stone Bar Top',
        specification: 'Black granite or dark marble, 40mm thick, polished, sealed',
        application: 'Bar counter surface',
        pros: ['Luxurious look', 'Scratch-resistant', 'Heat-resistant', 'Easy to sanitize'],
        maintenance: 'Wipe down after each use, reseal annually, avoid acidic cleaners',
        estimatedCost: '€150–300/m² installed'
      },
      {
        name: 'Leather Upholstery (Full-Grain)',
        specification: 'Full-grain aniline leather, 1.2–1.4 mm, cognac/walnut tone',
        application: 'Bar stools, lounge armchairs, loveseats',
        pros: ['Premium feel', 'Develops patina', 'Durable', 'Easy to wipe clean'],
        maintenance: 'Wipe spills immediately, condition every 6 months, avoid direct sunlight',
        estimatedCost: '€300–600 per seat (upholstery only)'
      },
      {
        name: 'Brass / Copper Accents',
        specification: 'Living finish brass (unlacquered) or brushed copper',
        application: 'Bar foot rail, tap handles, lighting fixtures, decorative elements',
        pros: ['Warm metallic tone', 'Develops unique patina', 'Trendy yet timeless'],
        maintenance: 'Polish monthly or allow natural patina, protect from excessive moisture',
        estimatedCost: '€50–120/linear meter (foot rail)'
      }
    ]
  },
  {
    area: 'Terrace / Outdoor',
    icon: '🌿',
    materials: [
      {
        name: 'Teak Outdoor Furniture',
        specification: 'Grade A plantation teak, kiln-dried, marine-grade stainless hardware',
        application: 'Tables, chairs, benches on terrace',
        pros: ['Weather-resistant', 'Naturally durable', 'Low maintenance', 'Beautiful grain'],
        maintenance: 'Wipe clean weekly, oil annually for color retention, allow to grey naturally',
        estimatedCost: '€250–500 per table'
      },
      {
        name: 'Porcelain Paving (Outdoor)',
        specification: '600×600×20 mm, R11 slip rating (wet), frost-resistant, stone-look',
        application: 'Terrace floor surface',
        pros: ['Frost-proof', 'Low maintenance', 'Stain-resistant', 'Non-slip when wet'],
        maintenance: 'Sweep daily, pressure wash monthly, inspect grout annually',
        estimatedCost: '€50–80/m² installed'
      },
      {
        name: 'Retractable Pergola Canopy',
        specification: 'Aluminum frame, PVC-coated polyester fabric, UV-resistant, motorized',
        application: 'Terrace weather protection',
        pros: ['Extendable dining season', 'UV protection', 'Rain protection', 'Remote-controlled'],
        maintenance: 'Clean fabric seasonally, inspect motor annually, retract in high winds',
        estimatedCost: '€8,000–15,000 for full terrace coverage'
      }
    ]
  }
]

const colorPalette = [
  { name: 'Warm Cream', hex: '#F5F0E8', usage: 'Dining walls' },
  { name: 'Forest Green', hex: '#2D5016', usage: 'Accent walls, banquettes' },
  { name: 'Charcoal', hex: '#36454F', usage: 'Bar area, frames' },
  { name: 'Brass', hex: '#B5A642', usage: 'Hardware, fixtures, accents' },
  { name: 'Natural Oak', hex: '#C4A882', usage: 'Flooring, furniture' },
  { name: 'White', hex: '#FFFFFF', usage: 'Kitchen, trim, ceilings' },
  { name: 'Terracotta', hex: '#CC5C3B', usage: 'Terracotta planters, terrace accents' },
  { name: 'Deep Navy', hex: '#1B2A4A', usage: 'Private dining accent, menu covers' }
]

export default function MaterialsAndFinishes() {
  return (
    <div className="space-y-8">
      {/* Color Palette */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Design Color Palette</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            {colorPalette.map((color) => (
              <div key={color.name} className="flex items-center gap-2 bg-muted/50 rounded-lg px-3 py-2">
                <div
                  className="w-8 h-8 rounded-md border border-gray-200 shadow-sm"
                  style={{ backgroundColor: color.hex }}
                />
                <div>
                  <div className="text-xs font-medium">{color.name}</div>
                  <div className="text-xs text-muted-foreground">{color.hex}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Materials by Area */}
      {materialsByArea.map((area) => (
        <div key={area.area}>
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <span className="text-xl">{area.icon}</span>
            {area.area}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {area.materials.map((material) => (
              <Card key={material.name} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between gap-2">
                    <CardTitle className="text-sm leading-tight">{material.name}</CardTitle>
                    <Badge variant="outline" className="shrink-0 text-xs whitespace-nowrap">
                      {material.estimatedCost}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{material.specification}</p>
                  <p className="text-xs font-medium">{material.application}</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <div className="text-xs font-medium text-muted-foreground mb-1">Advantages</div>
                      <div className="flex flex-wrap gap-1">
                        {material.pros.map((pro, i) => (
                          <Badge key={i} variant="secondary" className="text-xs">{pro}</Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-start gap-1.5 text-xs text-foreground/70">
                      <span className="text-amber-500 mt-0.5 shrink-0">🔧</span>
                      <span>{material.maintenance}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ))}

      {/* Estimated Budget */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Rough Cost Estimates (Interior Fit-Out)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            {[
              { item: 'Flooring (all areas)', range: '€15,000–25,000' },
              { item: 'Kitchen equipment & stainless', range: '€40,000–70,000' },
              { item: 'Bar build-out & fixtures', range: '€12,000–20,000' },
              { item: 'Furniture (tables, chairs, lounge)', range: '€20,000–35,000' },
              { item: 'Lighting (all areas)', range: '€8,000–15,000' },
              { item: 'Wall finishes & acoustic panels', range: '€6,000–10,000' },
              { item: 'Terrace furniture & canopy', range: '€10,000–18,000' },
              { item: 'Restroom fixtures & finishes', range: '€5,000–8,000' },
              { item: 'Signage, branding, decor', range: '€3,000–6,000' },
              { item: 'Mechanical (HVAC, ventilation, plumbing)', range: '€25,000–40,000' },
              { item: 'Electrical (panels, wiring, fixtures)', range: '€15,000–25,000' }
            ].map((item, i) => (
              <div key={i} className="flex justify-between py-2 border-b last:border-0">
                <span className="text-muted-foreground">{item.item}</span>
                <span className="font-medium">{item.range}</span>
              </div>
            ))}
            <div className="flex justify-between pt-3 font-bold text-base border-t-2 mt-3">
              <span>Total Estimated Range</span>
              <span>€159,000–272,000</span>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-3">
            * Estimates are indicative for a ~320 m² upscale casual restaurant in a Western European market.
            Actual costs vary by location, contractor, and specification level. Does not include building lease, architectural fees, or permits.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
