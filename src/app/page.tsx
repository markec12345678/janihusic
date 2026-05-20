'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Snowflake,
  Flame,
  ThermometerSun,
  Droplets,
  Shield,
  Clock,
  Award,
  Star,
  Phone,
  Mail,
  MapPin,
  ChevronRight,
  CheckCircle2,
  Menu,
  CalendarCheck,
  Zap,
  Users,
  TrendingUp,
  ArrowUp
} from 'lucide-react'

/* ─── Data ─── */
const services = [
  {
    icon: Snowflake,
    title: 'Klimatske naprave',
    subtitle: 'Razhlajevanje in prezračevanje',
    image: '/images/service-klima.jpg',
    description: 'Profesionalna dobava, montaža in servis split klimatskih naprav, multisplit sistemov in mobilnih klim. Zagotovimo optimalno temperaturo v vašem domu ali poslovnem prostoru — poleti in pozimi.',
    features: ['Split klimatske naprave', 'Multisplit sistemi', 'Mobilne klime', 'Servis in vzdrževanje']
  },
  {
    icon: Flame,
    title: 'Ogrevanje',
    subtitle: 'Toplo doma tudi pozimi',
    image: '/images/service-ogrevanje.jpg',
    description: 'Kompletne rešitve za ogrevanje: talno ogrevanje, radiatorski sistemi, peči na drva in sodobni kotli. Načrtujemo in izvedemo celotni ogrevalni sistem po vaših željah.',
    features: ['Talno ogrevanje', 'Radiatorsko ogrevanje', 'Peči na drva in kotli', 'Vodovodne napeljave']
  },
  {
    icon: ThermometerSun,
    title: 'Toplotne črpalke',
    subtitle: 'Energetsko učinkovite rešitve',
    image: '/images/service-toplotne.jpg',
    description: 'Vodimo vas pri izbiri in montaži toplotnih črpalk — od zrak/voda do zemlja/voda (WGB Geoblock) sistemov. Toplotne črpalke za ogrevanje in hlajenje ter pripravo sanitarnne vode.',
    features: ['Toplotne črpalke zrak/voda', 'Toplotne črpalke zemlja/voda', 'Sanitarna topla voda', 'Energijsko svetovanje']
  },
  {
    icon: Droplets,
    title: 'Vodoinštalacije',
    subtitle: 'Vse od napeljave do prenove',
    image: '/images/service-voda.jpg',
    description: 'Izvedemo vse vrste vodovodnih inštalacij — od prenov kopalnic in vodovodnih napeljav do zamenjave ventilov in centralnega ogrevanja. Kvalitetno, hitro in čisto.',
    features: ['Prenove kopalnic', 'Vodovodne napeljave', 'Zamenjava ventilov', 'Centralno ogrevanje']
  }
]

const whyUs = [
  { icon: Shield, title: 'Zanesljivost', desc: 'Vsa dela izvedemo po dogovoru, s kvalitetnimi materiali in garancijo.' },
  { icon: Award, title: '12+ let izkušenj', desc: 'Od leta 2013 ustvarjamo zadovoljne stranke po celotni Sloveniji.' },
  { icon: Star, title: 'F-gas certificiran', desc: 'Pooblaščenec za dela z fluoriranimi toplogrednimi plini (št. 965).' },
  { icon: Clock, title: 'Hitra odzivnost', desc: 'Odgovorimo v 24 urah. Urgentne intervencije izvedemo v najkrajšem času.' },
  { icon: TrendingUp, title: 'Energetska učinkovitost', desc: 'Svetujemo in izvedemo rešitve, ki znižajo vaše stroške ogrevanja in hlajenja.' },
  { icon: Users, title: 'Oseben pristop', desc: 'Vsak projekt prilagodimo vašim potrebam in proračunu. Brez skritih stroškov.' }
]

const trustBar = [
  { icon: CalendarCheck, text: '12+ let izkušenj' },
  { icon: Shield, text: 'F-gas certificiran' },
  { icon: MapPin, text: 'Bela krajina in okolica' },
  { icon: CheckCircle2, text: 'Brezplačne ponudbe' }
]

const navLinks = [
  { label: 'O nas', href: '#about' },
  { label: 'Storitve', href: '#services' },
  { label: 'Zakaj mi', href: '#why-us' },
  { label: 'Kontakt', href: '#contact' }
]

/* ─── Animation wrapper ─── */
function FadeIn({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/* ─── Main Page ─── */
export default function Home() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const [sending, setSending] = useState(false)
  const contactRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Scroll spy
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { rootMargin: '-40% 0px -60% 0px' }
    )
    document.querySelectorAll('section[id]').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const scrollTo = (href: string) => {
    setMobileOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSending(true)
    const form = e.currentTarget
    const data = {
      name: (form.elements.namedItem('name') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      phone: (form.elements.namedItem('phone') as HTMLInputElement).value,
      service: (form.elements.namedItem('service') as HTMLSelectElement).value,
      message: (form.elements.namedItem('message') as HTMLTextAreaElement).value
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
      const result = await res.json()
      if (result.success) {
        toast.success('Sporočilo poslano!', { description: result.message })
        form.reset()
      } else {
        toast.error('Napaka', { description: 'Preverite vnosna polja.' })
      }
    } catch {
      toast.error('Napaka', { description: 'Strežnik ni dosegljiv. Poskusite znova.' })
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0f1117] text-white overflow-x-hidden">
      {/* ─── NAVIGATION ─── */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#0f1117]/95 backdrop-blur-md shadow-lg shadow-black/20' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/25 group-hover:shadow-emerald-500/40 transition-shadow">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-lg font-bold tracking-tight">MS Jani</span>
                <span className="hidden sm:block text-[10px] text-gray-400 -mt-0.5 leading-tight">Montaža in storitve</span>
              </div>
            </button>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    activeSection === link.href.slice(1)
                      ? 'text-emerald-400 bg-emerald-500/10'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.label}
                </button>
              ))}
              <Button
                onClick={() => scrollTo('#contact')}
                className="ml-4 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white shadow-lg shadow-emerald-500/25 rounded-xl px-5"
              >
                Pridobite ponudbo
              </Button>
            </nav>

            {/* Mobile menu */}
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden text-white">
                  <Menu className="w-6 h-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-[#0f1117] border-gray-800 w-72">
                <SheetTitle className="text-white text-lg">MS Jani</SheetTitle>
                <nav className="flex flex-col gap-1 mt-8">
                  {navLinks.map((link) => (
                    <button
                      key={link.href}
                      onClick={() => scrollTo(link.href)}
                      className="text-left px-4 py-3 rounded-lg text-gray-300 hover:text-white hover:bg-white/5 transition-all"
                    >
                      {link.label}
                    </button>
                  ))}
                  <Separator className="my-3 bg-gray-800" />
                  <Button
                    onClick={() => scrollTo('#contact')}
                    className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl"
                  >
                    Pridobite ponudbo
                  </Button>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* ─── HERO ─── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src="/images/hero-bg.jpg"
            alt="MS Jani - profesionalna montaža klim in ogrevanja"
            fill
            sizes="100vw"
            className="object-cover"
            priority
            quality={85}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0f1117]/70 via-[#0f1117]/50 to-[#0f1117]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0f1117]/60 to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="max-w-3xl mx-auto"
          >
            <Badge className="bg-emerald-500/15 text-emerald-400 border-emerald-500/30 mb-6 px-4 py-1.5 text-sm">
              <CheckCircle2 className="w-3.5 h-3.5 mr-1.5" />
              F-gas certificiran · Bela krajina
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight leading-[1.1]">
              Vaš dom,{' '}
              <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                toplotno udobno
              </span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Profesionalna montaža, servis in vzdrževanje klimatskih naprav, ogrevalnih sistemov, 
              toplotnih črpalk in vodoinštalacij. Več kot 12 let izkušenj v Beli krajini in okolici.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={() => scrollTo('#contact')}
                className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white shadow-xl shadow-emerald-500/30 rounded-xl px-8 h-14 text-base"
              >
                Pridobite brezplačno ponudbo
                <ChevronRight className="w-5 h-5 ml-1" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => scrollTo('#services')}
                className="border-gray-600 text-white hover:bg-white/10 rounded-xl px-8 h-14 text-base"
              >
                Naše storitve
              </Button>
            </div>
            {/* Quick contact */}
            <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-gray-400">
              <a href="tel:+38640451221" className="flex items-center gap-2 hover:text-emerald-400 transition-colors">
                <Phone className="w-4 h-4" /> 040 451 221
              </a>
              <a href="mailto:janez.husic@gmail.com" className="flex items-center gap-2 hover:text-emerald-400 transition-colors">
                <Mail className="w-4 h-4" /> janez.husic@gmail.com
              </a>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-6 h-10 rounded-full border-2 border-gray-500 flex items-start justify-center pt-2"
          >
            <div className="w-1 h-2 rounded-full bg-gray-400" />
          </motion.div>
        </motion.div>
      </section>

      {/* ─── TRUST BAR ─── */}
      <section className="relative z-10 -mt-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#161923] border border-gray-800/50 rounded-2xl p-4 sm:p-6 grid grid-cols-2 md:grid-cols-4 gap-4">
            {trustBar.map((item, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center shrink-0">
                    <item.icon className="w-5 h-5 text-emerald-400" />
                  </div>
                  <span className="text-sm font-medium text-gray-200">{item.text}</span>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SERVICES ─── */}
      <section id="services" className="py-24 sm:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center max-w-2xl mx-auto mb-16">
              <Badge variant="outline" className="border-emerald-500/30 text-emerald-400 mb-4">Naše storitve</Badge>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
                Kompletne rešitve za vaš{' '}
                <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                  udoben dom
                </span>
              </h2>
              <p className="mt-4 text-gray-400">
                Od svetovanja do izvedbe — pokrijemo vse faze projekta z profesionalnim pristopom in kakovostnimi materiali.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((service, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <Card className="group bg-[#161923] border-gray-800/50 hover:border-emerald-500/30 transition-all duration-500 overflow-hidden hover:shadow-xl hover:shadow-emerald-500/5 rounded-2xl">
                  <div className="relative h-52 sm:h-56 overflow-hidden">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#161923] via-[#161923]/30 to-transparent" />
                    <div className="absolute top-4 left-4 w-11 h-11 rounded-xl bg-emerald-500/90 flex items-center justify-center shadow-lg shadow-emerald-500/30">
                      <service.icon className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <CardContent className="p-6 pt-0 relative -mt-6">
                    <h3 className="text-xl font-bold">{service.title}</h3>
                    <p className="text-sm text-emerald-400 mt-0.5">{service.subtitle}</p>
                    <p className="text-gray-400 text-sm mt-3 leading-relaxed">{service.description}</p>
                    <div className="grid grid-cols-2 gap-2 mt-4">
                      {service.features.map((f, j) => (
                        <div key={j} className="flex items-center gap-1.5 text-xs text-gray-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                          {f}
                        </div>
                      ))}
                    </div>
                    <button
                      onClick={() => { contactRef.current?.scrollIntoView({ behavior: 'smooth' }) }}
                      className="mt-5 flex items-center gap-1 text-sm font-medium text-emerald-400 hover:text-emerald-300 transition-colors group/link"
                    >
                      Zahtevajte ponudbo
                      <ChevronRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                    </button>
                  </CardContent>
                </Card>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ─── ABOUT ─── */}
      <section id="about" className="py-24 sm:py-32 bg-[#0a0c12]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <FadeIn>
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-2xl shadow-black/40">
                <Image
                  src="/images/about.jpg"
                  alt="MS Jani - moderna hiša z toplotno črpalko"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-emerald-600/20 to-transparent" />
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div>
                <Badge variant="outline" className="border-emerald-500/30 text-emerald-400 mb-4">O nas</Badge>
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
                  Več kot desetletje{' '}
                  <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                    zaupanja
                  </span>
                </h2>
                <div className="mt-6 space-y-4 text-gray-400 leading-relaxed">
                  <p>
                    <strong className="text-gray-200">MS Jani — Montaža in storitve</strong> je družinsko podjetje, 
                    ki ga od leta 2013 vodi Janez Husič. Nahajamo se v Cerkvišču 11, Gradac, v srcu 
                    ponosne Bele krajine.
                  </p>
                  <p>
                    Specializirani smo za montažo in servis klimatskih naprav, ogrevalnih sistemov, 
                    toplotnih črpalk in vodoinštalacij. Kot <strong className="text-gray-200">državno pooblaščenec 
                    za dela s fluoriranimi toplogrednimi plini</strong> (F-gas dovoljenje št. 965) 
                    zagotavljamo najvišje strokovne standarde.
                  </p>
                  <p>
                    Naše delo temelji na osebnem pristopu, kakovosti in poštenosti. Vsako naročilo 
                    obravnavamo individualno in vedno iščemo optimalno rešitev za vas.
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-4 mt-8">
                  {[
                    { number: '12+', label: 'Let izkušenj' },
                    { number: '500+', label: 'Zadovoljnih strank' },
                    { number: '965', label: 'F-gas licenca' }
                  ].map((stat, i) => (
                    <div key={i} className="text-center p-4 rounded-xl bg-[#161923] border border-gray-800/50">
                      <div className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                        {stat.number}
                      </div>
                      <div className="text-xs text-gray-400 mt-1">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ─── WHY US ─── */}
      <section id="why-us" className="py-24 sm:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center max-w-2xl mx-auto mb-16">
              <Badge variant="outline" className="border-emerald-500/30 text-emerald-400 mb-4">Zakaj izbrati nas</Badge>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
                Kakovost, ki jo{' '}
                <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                  lahko zaupate
                </span>
              </h2>
              <p className="mt-4 text-gray-400">
                Vsako projekt pristopimo profesionalno — od svetovanja do končne izvedbe.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {whyUs.map((item, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <Card className="group bg-[#161923] border-gray-800/50 hover:border-emerald-500/30 transition-all duration-300 rounded-2xl h-full">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/10 flex items-center justify-center mb-4 group-hover:from-emerald-500/30 group-hover:to-teal-500/20 transition-colors">
                      <item.icon className="w-6 h-6 text-emerald-400" />
                    </div>
                    <h3 className="text-lg font-bold">{item.title}</h3>
                    <p className="text-sm text-gray-400 mt-2 leading-relaxed">{item.desc}</p>
                  </CardContent>
                </Card>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CONTACT ─── */}
      <section id="contact" ref={contactRef} className="py-24 sm:py-32 bg-[#0a0c12]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center max-w-2xl mx-auto mb-16">
              <Badge variant="outline" className="border-emerald-500/30 text-emerald-400 mb-4">Kontakt</Badge>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
                Pišite nam,{' '}
                <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                  brezplačno ogledamo
                </span>
              </h2>
              <p className="mt-4 text-gray-400">
                Zastonj ogledamo objekt in pripravimo ponudbo. Odgovorimo v 24 urah.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Form */}
            <FadeIn className="lg:col-span-3">
              <Card className="bg-[#161923] border-gray-800/50 rounded-2xl">
                <CardContent className="p-6 sm:p-8">
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-gray-300 mb-1.5 block">Ime in priimek *</label>
                        <Input
                          name="name"
                          required
                          placeholder="Janez Novak"
                          className="bg-[#0f1117] border-gray-700 text-white placeholder:text-gray-500 focus:border-emerald-500 rounded-xl h-12"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-300 mb-1.5 block">E-pošta *</label>
                        <Input
                          name="email"
                          type="email"
                          required
                          placeholder="janez@email.com"
                          className="bg-[#0f1117] border-gray-700 text-white placeholder:text-gray-500 focus:border-emerald-500 rounded-xl h-12"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-gray-300 mb-1.5 block">Telefon</label>
                        <Input
                          name="phone"
                          placeholder="01 123 45 67"
                          className="bg-[#0f1117] border-gray-700 text-white placeholder:text-gray-500 focus:border-emerald-500 rounded-xl h-12"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-300 mb-1.5 block">Storitev *</label>
                        <Select name="service" required>
                          <SelectTrigger className="bg-[#0f1117] border-gray-700 text-white focus:border-emerald-500 rounded-xl h-12">
                            <SelectValue placeholder="Izberite storitev" />
                          </SelectTrigger>
                          <SelectContent className="bg-[#161923] border-gray-700">
                            <SelectItem value="klimatske-naprave">Klimatske naprave</SelectItem>
                            <SelectItem value="ogrevanje">Ogrevanje</SelectItem>
                            <SelectItem value="toplotne-crpialke">Toplotne črpalke</SelectItem>
                            <SelectItem value="vodoinstalacije">Vodoinštalacije</SelectItem>
                            <SelectItem value="servis">Servis / vzdrževanje</SelectItem>
                            <SelectItem value="drugo">Drugo</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-300 mb-1.5 block">Sporočilo *</label>
                      <Textarea
                        name="message"
                        required
                        rows={5}
                        placeholder="Opišite, kaj potrebujete..."
                        className="bg-[#0f1117] border-gray-700 text-white placeholder:text-gray-500 focus:border-emerald-500 rounded-xl resize-none"
                      />
                    </div>
                    <Button
                      type="submit"
                      disabled={sending}
                      size="lg"
                      className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white shadow-xl shadow-emerald-500/25 rounded-xl h-14 text-base"
                    >
                      {sending ? 'Pošiljam...' : 'Pošljite povpraševanje'}
                      {!sending && <ChevronRight className="w-5 h-5 ml-1" />}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </FadeIn>

            {/* Contact Info */}
            <FadeIn delay={0.2} className="lg:col-span-2">
              <div className="space-y-5">
                <Card className="bg-[#161923] border-gray-800/50 rounded-2xl">
                  <CardContent className="p-6">
                    <div className="space-y-5">
                      <a href="tel:+38640451221" className="flex items-start gap-4 group">
                        <div className="w-11 h-11 rounded-xl bg-emerald-500/10 flex items-center justify-center shrink-0 group-hover:bg-emerald-500/20 transition-colors">
                          <Phone className="w-5 h-5 text-emerald-400" />
                        </div>
                        <div>
                          <div className="text-sm text-gray-400">Telefon</div>
                          <div className="font-medium group-hover:text-emerald-400 transition-colors">040 451 221</div>
                        </div>
                      </a>
                      <Separator className="bg-gray-800/50" />
                      <a href="mailto:janez.husic@gmail.com" className="flex items-start gap-4 group">
                        <div className="w-11 h-11 rounded-xl bg-emerald-500/10 flex items-center justify-center shrink-0 group-hover:bg-emerald-500/20 transition-colors">
                          <Mail className="w-5 h-5 text-emerald-400" />
                        </div>
                        <div>
                          <div className="text-sm text-gray-400">E-pošta</div>
                          <div className="font-medium group-hover:text-emerald-400 transition-colors break-all">janez.husic@gmail.com</div>
                        </div>
                      </a>
                      <Separator className="bg-gray-800/50" />
                      <div className="flex items-start gap-4">
                        <div className="w-11 h-11 rounded-xl bg-emerald-500/10 flex items-center justify-center shrink-0">
                          <MapPin className="w-5 h-5 text-emerald-400" />
                        </div>
                        <div>
                          <div className="text-sm text-gray-400">Naslov</div>
                          <div className="font-medium">Cerkvišče 11</div>
                          <div className="text-sm text-gray-400">8332 Gradac, Slovenija</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-[#161923] border-gray-800/50 rounded-2xl">
                  <CardContent className="p-6">
                    <h3 className="font-bold mb-4 flex items-center gap-2">
                      <Clock className="w-5 h-5 text-emerald-400" />
                      Delovni čas
                    </h3>
                    <div className="space-y-2.5 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Ponedeljek — Petek</span>
                        <span className="font-medium">7:00 — 17:00</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Sobota</span>
                        <span className="font-medium">Po dogovoru</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Nedelja</span>
                        <span className="font-medium">Zaprto</span>
                      </div>
                    </div>
                    <div className="mt-4 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20">
                      <p className="text-xs text-amber-400/90">
                        <strong>Urgentne intervencije</strong> izvedemo tudi izven delovnega časa. Pokličite nas!
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-emerald-600/20 to-teal-600/10 border-emerald-500/30 rounded-2xl">
                  <CardContent className="p-6 text-center">
                    <Shield className="w-8 h-8 text-emerald-400 mx-auto mb-3" />
                    <h3 className="font-bold">F-gas certificiran</h3>
                    <p className="text-sm text-gray-300 mt-1">
                      Državno pooblaščenec za dela z fluoriranimi toplogrednimi plini.
                      Licenca št. 965
                    </p>
                  </CardContent>
                </Card>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="border-t border-gray-800/50 bg-[#0a0c12]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Company info */}
            <div>
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                  <Zap className="w-4 h-4 text-white" />
                </div>
                <div>
                  <span className="font-bold">MS Jani</span>
                  <span className="block text-xs text-gray-500 -mt-0.5">Montaža in storitve</span>
                </div>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed">
                Janez Husič s.p. · Cerkvišče 11, 8332 Gradac · Davčna št.: 6381421
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Matična št.: 6381421000 · Upravna enota: Črnomelj
              </p>
            </div>

            {/* Quick links */}
            <div>
              <h4 className="font-semibold mb-4">Hitri naslovi</h4>
              <div className="space-y-2">
                {navLinks.map((link) => (
                  <button
                    key={link.href}
                    onClick={() => scrollTo(link.href)}
                    className="block text-sm text-gray-400 hover:text-emerald-400 transition-colors"
                  >
                    {link.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-semibold mb-4">Kontakt</h4>
              <div className="space-y-2 text-sm text-gray-400">
                <a href="tel:+38640451221" className="flex items-center gap-2 hover:text-emerald-400 transition-colors">
                  <Phone className="w-4 h-4" /> 040 451 221
                </a>
                <a href="mailto:janez.husic@gmail.com" className="flex items-center gap-2 hover:text-emerald-400 transition-colors">
                  <Mail className="w-4 h-4" /> janez.husic@gmail.com
                </a>
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 shrink-0 mt-0.5" /> Cerkvišče 11, 8332 Gradac
                </div>
              </div>
            </div>
          </div>

          <Separator className="my-8 bg-gray-800/50" />

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
            <p>&copy; {new Date().getFullYear()} MS Jani — Montaža in storitve, Janez Husič s.p. Vse pravice pridržane.</p>
            <p>Cerkvišče 11 · 8332 Gradac · Bela krajina</p>
          </div>
        </div>
      </footer>

      {/* ─── BACK TO TOP ─── */}
      <AnimatePresence>
        {scrolled && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-6 right-6 z-40 w-11 h-11 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-500/30 flex items-center justify-center transition-colors"
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}
