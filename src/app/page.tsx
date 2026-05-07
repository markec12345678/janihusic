'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import {
  LayoutDashboard,
  Armchair,
  ChefHat,
  Building2,
  Accessibility,
  ArrowRightLeft,
  Palette,
  Menu,
  X
} from 'lucide-react'

import FloorPlan from '@/components/blueprint/FloorPlan'
import SeatingArrangements from '@/components/blueprint/SeatingArrangements'
import KitchenDesign from '@/components/blueprint/KitchenDesign'
import UtilityAreas from '@/components/blueprint/UtilityAreas'
import Accessibility from '@/components/blueprint/Accessibility'
import FlowDesign from '@/components/blueprint/FlowDesign'
import MaterialsAndFinishes from '@/components/blueprint/MaterialsAndFinishes'

const tabs = [
  { value: 'floor-plan', label: 'Floor Plan', icon: LayoutDashboard },
  { value: 'seating', label: 'Seating', icon: Armchair },
  { value: 'kitchen', label: 'Kitchen', icon: ChefHat },
  { value: 'utilities', label: 'Utilities', icon: Building2 },
  { value: 'accessibility', label: 'Accessibility', icon: Accessibility },
  { value: 'flow', label: 'Flow', icon: ArrowRightLeft },
  { value: 'materials', label: 'Materials', icon: Palette }
]

const conceptSpecs = {
  name: 'Olive & Ember',
  tagline: 'Upscale Casual Mediterranean',
  totalArea: '~320 m² (3,444 sq ft)',
  seatingCapacity: '120 seats (80 indoor + 24 bar + 24 private + 32 terrace)',
  kitchenArea: '80 m²',
  cuisine: 'Mediterranean with seasonal local ingredients',
  style: 'Modern rustic — natural materials, warm lighting, green accents',
  targetMarket: 'Date nights, group dinners, business lunches, weekend brunch'
}

export default function Home() {
  const [activeTab, setActiveTab] = useState('floor-plan')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-emerald-600 flex items-center justify-center">
                <LayoutDashboard className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-base font-bold leading-tight">
                  {conceptSpecs.name}
                </h1>
                <p className="text-xs text-muted-foreground">
                  {conceptSpecs.tagline}
                </p>
              </div>
            </div>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {tabs.map((tab) => (
                <button
                  key={tab.value}
                  onClick={() => setActiveTab(tab.value)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    activeTab === tab.value
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </nav>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-muted"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden border-t overflow-hidden"
            >
              <nav className="max-w-7xl mx-auto px-4 py-3 grid grid-cols-2 gap-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.value}
                    onClick={() => {
                      setActiveTab(tab.value)
                      setMobileMenuOpen(false)
                    }}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all text-left ${
                      activeTab === tab.value
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'text-muted-foreground hover:bg-muted'
                    }`}
                  >
                    <tab.icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-emerald-50 via-background to-amber-50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl"
          >
            <Badge variant="secondary" className="mb-4">
              📐 Restaurant Blueprint — Detailed Design Document
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              {conceptSpecs.name}
            </h2>
            <p className="text-lg text-muted-foreground mt-2">
              {conceptSpecs.tagline}
            </p>
            <p className="text-sm text-muted-foreground mt-4 leading-relaxed">
              A comprehensive architectural blueprint for a {conceptSpecs.totalArea} restaurant featuring 
              {conceptSpecs.seatingCapacity.toLowerCase()}, an {conceptSpecs.kitchenArea} professional kitchen, 
              and a welcoming atmosphere inspired by {conceptSpecs.style.toLowerCase().split(' — ')[0]}.
            </p>

            <Separator className="my-6" />

            {/* Key specs grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {[
                { label: 'Total Area', value: '320 m²', icon: '📐' },
                { label: 'Capacity', value: '120 seats', icon: '🪑' },
                { label: 'Kitchen', value: '80 m²', icon: '👨‍🍳' },
                { label: 'Cuisine', value: 'Mediterranean', icon: '🫒' },
                { label: 'Terrace', value: '60 m²', icon: '🌿' },
                { label: 'Private Room', value: '18 m²', icon: '🔒' }
              ].map((spec) => (
                <Card key={spec.label} className="bg-white/60 backdrop-blur-sm border-0 shadow-sm">
                  <CardContent className="p-3 text-center">
                    <div className="text-xl mb-0.5">{spec.icon}</div>
                    <div className="text-sm font-bold">{spec.value}</div>
                    <div className="text-xs text-muted-foreground">{spec.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              {activeTab === 'floor-plan' && <FloorPlan />}
              {activeTab === 'seating' && <SeatingArrangements />}
              {activeTab === 'kitchen' && <KitchenDesign />}
              {activeTab === 'utilities' && <UtilityAreas />}
              {activeTab === 'accessibility' && <Accessibility />}
              {activeTab === 'flow' && <FlowDesign />}
              {activeTab === 'materials' && <MaterialsAndFinishes />}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Sticky Footer */}
      <footer className="sticky bottom-0 mt-auto bg-background border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted-foreground">
            <div className="flex items-center gap-4">
              <span className="font-medium text-foreground">{conceptSpecs.name}</span>
              <span>Blueprint v1.0</span>
            </div>
            <div className="flex items-center gap-4">
              <span>Style: {conceptSpecs.style}</span>
              <span>Market: {conceptSpecs.targetMarket.split(',')[0]}</span>
            </div>
            <div>
              <Badge variant="outline" className="text-xs">
                {conceptSpecs.totalArea}
              </Badge>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
