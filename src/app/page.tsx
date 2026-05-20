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
  ArrowUp,
  Quote,
  ThumbsUp
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

const testimonials = [
  { name: 'Ana M.', location: 'Gradac', text: 'Izvedli so montažo toplotne črpalke zrak/voda. Zelo profesionalno in pošteno. Stroški ogrevanja so se znižali za več kot 60%.', rating: 5 },
  { name: 'Peter K.', location: 'Črnomelj', text: 'Hitro in kakovostno zamenjali klimatsko napravo. Cene so primerne, delo pa vrhunsko. Priporočam vsem v Beli krajini!', rating: 5 },
  { name: 'Marija L.', location: 'Semič', text: 'Prenovili smo celotno kopalnico — od vodovodnih napeljav do talnega ogrevanja. Rezultat je odličen. Res profesionalci.', rating: 5 }
]

const trustBar = [
  { icon: CalendarCheck, text: '12+ let izkušenj' },
  { icon: Shield, text: 'F-gas certificiran' },
  { icon: MapPin, text: 'Bela krajina in okolica' },
  { icon: CheckCircle2, text: 'Brezplačne ponudbe' }
]

const processSteps = [
  { step: '01', title: 'Brezplačno svetovanje', desc: 'Pokličete ali pišete nam. Razpravimo o vaših željah in potrebah — brez obveznosti.' },
  { step: '02', title: 'Ogled in ponudba', desc: 'Ogladamo objekt, izmerimo in pripravimo podroben predračun z opisom del.' },
  { step: '03', title: 'Profesionalna izvedba', desc: 'Izvedemo montažo po dogovoru — hitro, čisto in s kvalitetnimi materiali.' },
  { step: '04', title: 'Servis in garancija', desc: 'Po izvedbi smo še vedno tu za vas. Zagotavljamo garancijo in servisno podporo.' }
]

const brands = ['Daikin', 'Panasonic', 'Mitsubishi', 'LG', 'Samsung', 'Viessmann', 'Bosch', 'Wolf']

const navLinks = [
  { label: 'O nas', href: '#about' },
  { label: 'Storitve', href: '#services' },
  { label: 'Zakaj mi', href: '#why-us' },
  { label: 'Povratne informacije', href: '#testimonials' },
  { label: 'Kontakt', href: '#contact' }
]

/* ─── Animated counter ─── */
function AnimatedCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isInView) return
    let start = 0
    const duration = 2000
    const increment = target / (duration / 16)
    const timer = setInterval(() => {
      start += increment
      if (start >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)
    return () => clearInterval(timer)
  }, [isInView, target])

  return <span ref={ref}>{count}{suffix}</span>
}

/* ─── Animation wrapper ─── */
function FadeIn({ children, className = '', delay = 0, direction = 'up' }: { children: React.ReactNode; className?: string; delay?: number; direction?: 'up' | 'left' | 'right' | 'scale' }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  const directions = {
    up: { opacity: 0, y: 40 },
    left: { opacity: 0, x: -40 },
    right: { opacity: 0, x: 40 },
    scale: { opacity: 0, scale: 0.95 }
  }
  return (
    <motion.div
      ref={ref}
      initial={directions[direction]}
      animate={isInView ? { opacity: 1, y: 0, x: 0, scale: 1 } : directions[direction]}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/* ─── Decorative blob ─── */
function GlowOrb({ className = '' }: { className?: string }) {
  return (
    <div className={`absolute rounded-full blur-[120px] pointer-events-none ${className}`} />
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

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
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
    <div className="min-h-screen bg-[#0a0b10] text-white overflow-x-hidden">
      {/* ─── NAVIGATION ─── */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-[#0a0b10]/90 backdrop-blur-xl shadow-2xl shadow-black/30 border-b border-white/5' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 via-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/30 group-hover:shadow-emerald-500/50 group-hover:scale-105 transition-all duration-300">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-lg font-bold tracking-tight">MS Jani</span>
                <span className="hidden sm:block text-[10px] text-gray-500 -mt-0.5 leading-tight">Montaža in storitve</span>
              </div>
            </button>
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    activeSection === link.href.slice(1)
                      ? 'text-emerald-400'
                      : 'text-gray-400 hover:text-gray-200'
                  }`}
                >
                  {link.label}
                  {activeSection === link.href.slice(1) && (
                    <motion.div layoutId="activeNav" className="absolute inset-0 bg-emerald-500/10 rounded-lg border border-emerald-500/20" transition={{ type: 'spring', stiffness: 400, damping: 30 }} />
                  )}
                </button>
              ))}
              <Button
                onClick={() => scrollTo('#contact')}
                className="ml-4 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 rounded-xl px-5 transition-all duration-300 hover:scale-105"
              >
                Pridobite ponudbo
              </Button>
            </nav>
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden text-white hover:bg-white/10">
                  <Menu className="w-6 h-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-[#0a0b10] border-gray-800/50 w-72">
                <SheetTitle className="text-white text-lg">MS Jani</SheetTitle>
                <nav className="flex flex-col gap-1 mt-8">
                  {navLinks.map((link) => (
                    <button key={link.href} onClick={() => scrollTo(link.href)} className="text-left px-4 py-3 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-all">
                      {link.label}
                    </button>
                  ))}
                  <Separator className="my-3 bg-gray-800/50" />
                  <Button onClick={() => scrollTo('#contact')} className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl">
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
        <div className="absolute inset-0">
          <Image src="/images/hero-bg.jpg" alt="MS Jani" fill sizes="100vw" className="object-cover scale-105" priority quality={90} />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0b10]/80 via-[#0a0b10]/60 to-[#0a0b10]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0b10]/70 via-transparent to-[#0a0b10]/50" />
        </div>

        {/* Animated orbs */}
        <GlowOrb className="w-[500px] h-[500px] bg-emerald-500/15 -top-40 -left-40" />
        <GlowOrb className="w-[400px] h-[400px] bg-teal-500/10 bottom-0 right-0" />

        {/* Grain texture overlay */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")' }} />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 text-center">
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }} className="max-w-3xl mx-auto">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2, duration: 0.5 }}>
              <Badge className="bg-emerald-500/15 text-emerald-400 border-emerald-500/25 backdrop-blur-sm mb-6 px-5 py-2 text-sm shadow-lg shadow-emerald-500/10">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse mr-2" />
                F-gas certificiran · Bela krajina
              </Badge>
            </motion.div>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight leading-[1.05]">
              Vaš dom,{' '}
              <motion.span
                className="bg-gradient-to-r from-emerald-300 via-teal-400 to-emerald-500 bg-clip-text text-transparent bg-[length:200%_auto]"
                animate={{ backgroundPosition: ['0% center', '100% center', '0% center'] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
              >
                toplotno udobno
              </motion.span>
            </h1>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 0.8 }} className="mt-6 text-lg sm:text-xl text-gray-300/90 max-w-2xl mx-auto leading-relaxed">
              Profesionalna montaža, servis in vzdrževanje klimatskih naprav, ogrevalnih sistemov, 
              toplotnih črpalk in vodoinštalacij. Več kot 12 let izkušenj v Beli krajini in okolici.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.6 }} className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" onClick={() => scrollTo('#contact')} className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white shadow-2xl shadow-emerald-500/30 hover:shadow-emerald-500/50 rounded-2xl px-8 h-14 text-base transition-all duration-300 hover:scale-105">
                Pridobite brezplačno ponudbo
                <ChevronRight className="w-5 h-5 ml-1" />
              </Button>
              <Button size="lg" variant="outline" onClick={() => scrollTo('#services')} className="border-white/15 text-white hover:bg-white/10 hover:border-white/25 rounded-2xl px-8 h-14 text-base backdrop-blur-sm transition-all duration-300">
                Naše storitve
              </Button>
            </motion.div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-gray-400">
              <a href="tel:+38640451221" className="flex items-center gap-2 hover:text-emerald-400 transition-colors duration-300">
                <Phone className="w-4 h-4" /> 040 451 221
              </a>
              <a href="mailto:janez.husic@gmail.com" className="flex items-center gap-2 hover:text-emerald-400 transition-colors duration-300">
                <Mail className="w-4 h-4" /> janez.husic@gmail.com
              </a>
            </motion.div>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }} className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }} className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center pt-2 backdrop-blur-sm">
            <div className="w-1 h-2 rounded-full bg-emerald-400/60" />
          </motion.div>
        </motion.div>
      </section>

      {/* ─── TRUST BAR ─── */}
      <section className="relative z-10 -mt-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="bg-white/[0.03] backdrop-blur-xl border border-white/[0.06] rounded-2xl p-4 sm:p-6 grid grid-cols-2 md:grid-cols-4 gap-4 shadow-xl shadow-black/20">
            {trustBar.map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
                  <item.icon className="w-5 h-5 text-emerald-400" />
                </div>
                <span className="text-sm font-medium text-gray-200">{item.text}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── SERVICES ─── */}
      <section id="services" className="py-24 sm:py-32 relative">
        <GlowOrb className="w-[600px] h-[600px] bg-emerald-500/8 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <FadeIn>
            <div className="text-center max-w-2xl mx-auto mb-16">
              <Badge variant="outline" className="border-emerald-500/20 text-emerald-400 mb-4 backdrop-blur-sm">Naše storitve</Badge>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
                Kompletne rešitve za vaš{' '}
                <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">udoben dom</span>
              </h2>
              <p className="mt-4 text-gray-500">Od svetovanja do izvedbe — pokrijemo vse faze projekta z profesionalnim pristopom.</p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((service, i) => (
              <FadeIn key={i} delay={i * 0.1} direction="scale">
                <Card className="group relative bg-white/[0.02] border-white/[0.06] hover:border-emerald-500/30 transition-all duration-700 overflow-hidden rounded-2xl hover:shadow-2xl hover:shadow-emerald-500/10 backdrop-blur-sm">
                  {/* Glow effect on hover */}
                  <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-emerald-500/0 via-transparent to-teal-500/0 group-hover:from-emerald-500/20 group-hover:via-transparent group-hover:to-teal-500/20 transition-all duration-700 opacity-0 group-hover:opacity-100" />
                  <div className="relative">
                    <div className="relative h-56 sm:h-60 overflow-hidden">
                      <Image src={service.image} alt={service.title} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover group-hover:scale-110 transition-transform duration-1000 ease-out" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0b10] via-[#0a0b10]/40 to-transparent" />
                      <div className="absolute top-4 left-4 w-12 h-12 rounded-2xl bg-emerald-500/90 backdrop-blur-sm flex items-center justify-center shadow-xl shadow-emerald-500/30 group-hover:scale-110 transition-transform duration-500">
                        <service.icon className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <CardContent className="p-6 pt-0 relative -mt-8">
                      <h3 className="text-xl font-bold">{service.title}</h3>
                      <p className="text-sm text-emerald-400/80 mt-0.5">{service.subtitle}</p>
                      <p className="text-gray-400 text-sm mt-3 leading-relaxed">{service.description}</p>
                      <div className="grid grid-cols-2 gap-2 mt-4">
                        {service.features.map((f, j) => (
                          <div key={j} className="flex items-center gap-1.5 text-xs text-gray-400">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500/70 shrink-0" />
                            {f}
                          </div>
                        ))}
                      </div>
                      <button onClick={() => contactRef.current?.scrollIntoView({ behavior: 'smooth' })} className="mt-5 flex items-center gap-1.5 text-sm font-medium text-emerald-400 hover:text-emerald-300 transition-colors group/link">
                        Zahtevajte ponudbo
                        <ChevronRight className="w-4 h-4 group-hover/link:translate-x-1.5 transition-transform duration-300" />
                      </button>
                    </CardContent>
                  </div>
                </Card>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PROCESS ─── */}
      <section className="py-20 sm:py-28 bg-[#080910] relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
        <GlowOrb className="w-[500px] h-[500px] bg-teal-500/10 -top-60 right-0" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <FadeIn>
            <div className="text-center max-w-2xl mx-auto mb-16">
              <Badge variant="outline" className="border-emerald-500/20 text-emerald-400 mb-4">Postopek dela</Badge>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
                Od povpraševanja do{' '}
                <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">končne izvedbe</span>
              </h2>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((item, i) => (
              <FadeIn key={i} delay={i * 0.15} direction="up">
                <div className="relative group">
                  {i < processSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-12 left-[calc(50%+40px)] w-[calc(100%-40px)] h-px bg-gradient-to-r from-emerald-500/30 to-transparent" />
                  )}
                  <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6 hover:border-emerald-500/20 transition-all duration-500 hover:bg-white/[0.04] backdrop-blur-sm">
                    <span className="text-4xl font-black bg-gradient-to-b from-emerald-500/30 to-emerald-500/5 bg-clip-text text-transparent">{item.step}</span>
                    <h3 className="text-lg font-bold mt-3">{item.title}</h3>
                    <p className="text-sm text-gray-500 mt-2 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ─── ABOUT ─── */}
      <section id="about" className="py-24 sm:py-32 relative">
        <GlowOrb className="w-[500px] h-[500px] bg-emerald-500/8 -bottom-40 -right-40" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <FadeIn direction="left">
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-2xl shadow-black/50 group">
                <Image src="/images/about.jpg" alt="MS Jani" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover group-hover:scale-105 transition-transform duration-1000" />
                <div className="absolute inset-0 bg-gradient-to-tr from-emerald-600/20 via-transparent to-teal-500/10" />
                {/* Floating badge */}
                <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-xl border border-white/10 rounded-xl px-4 py-3 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
                    <Award className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-400">Od leta</div>
                    <div className="font-bold text-lg leading-tight">2013</div>
                  </div>
                </div>
              </div>
            </FadeIn>

            <FadeIn direction="right" delay={0.15}>
              <div>
                <Badge variant="outline" className="border-emerald-500/20 text-emerald-400 mb-4">O nas</Badge>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
                  Več kot desetletje{' '}
                  <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">zaupanja</span>
                </h2>
                <div className="mt-6 space-y-4 text-gray-400 leading-relaxed">
                  <p><strong className="text-gray-200">MS Jani — Montaža in storitve</strong> je družinsko podjetje, ki ga od leta 2013 vodi Janez Husič. Nahajamo se v Cerkvišču 11, Gradac, v srcu ponosne Bele krajine.</p>
                  <p>Specializirani smo za montažo in servis klimatskih naprav, ogrevalnih sistemov, toplotnih črpalk in vodoinštalacij. Kot <strong className="text-gray-200">državno pooblaščenec za dela s fluoriranimi toplogrednimi plini</strong> (F-gas dovoljenje št. 965) zagotavljamo najvišje strokovne standarde.</p>
                  <p>Naše delo temelji na osebnem pristopu, kakovosti in poštenosti.</p>
                </div>

                <div className="grid grid-cols-3 gap-4 mt-8">
                  {[
                    { target: 12, suffix: '+', label: 'Let izkušenj' },
                    { target: 500, suffix: '+', label: 'Zadovoljnih strank' },
                    { target: 965, suffix: '', label: 'F-gas licenca' }
                  ].map((stat, i) => (
                    <div key={i} className="text-center p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm">
                      <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                        <AnimatedCounter target={stat.target} suffix={stat.suffix} />
                      </div>
                      <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ─── STATS BAR ─── */}
      <section className="py-16 bg-gradient-to-r from-emerald-600/10 via-teal-600/5 to-emerald-600/10 border-y border-emerald-500/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { target: 12, suffix: '+', label: 'Let izkušenj' },
              { target: 500, suffix: '+', label: 'Realiziranih projektov' },
              { target: 98, suffix: '%', label: 'Zadovoljnih strank' },
              { target: 24, suffix: 'h', label: 'Odzivni čas' }
            ].map((stat, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div>
                  <div className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-emerald-300 to-teal-400 bg-clip-text text-transparent">
                    <AnimatedCounter target={stat.target} suffix={stat.suffix} />
                  </div>
                  <div className="text-sm text-gray-400 mt-1">{stat.label}</div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ─── WHY US ─── */}
      <section id="why-us" className="py-24 sm:py-32 relative">
        <GlowOrb className="w-[500px] h-[500px] bg-emerald-500/8 top-0 left-1/2 -translate-x-1/2" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <FadeIn>
            <div className="text-center max-w-2xl mx-auto mb-16">
              <Badge variant="outline" className="border-emerald-500/20 text-emerald-400 mb-4">Zakaj izbrati nas</Badge>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
                Kakovost, ki jo{' '}
                <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">lahko zaupate</span>
              </h2>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {whyUs.map((item, i) => (
              <FadeIn key={i} delay={i * 0.08} direction="scale">
                <Card className="group bg-white/[0.02] border-white/[0.06] hover:border-emerald-500/25 transition-all duration-500 rounded-2xl h-full backdrop-blur-sm hover:bg-white/[0.04] relative overflow-hidden">
                  <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-emerald-500/0 to-teal-500/0 group-hover:from-emerald-500/10 group-hover:to-teal-500/10 transition-all duration-500" />
                  <CardContent className="p-6 relative">
                    <div className="w-13 h-13 rounded-2xl bg-gradient-to-br from-emerald-500/15 to-teal-500/5 border border-emerald-500/10 flex items-center justify-center mb-5 group-hover:from-emerald-500/25 group-hover:to-teal-500/15 group-hover:border-emerald-500/20 transition-all duration-500">
                      <item.icon className="w-6 h-6 text-emerald-400" />
                    </div>
                    <h3 className="text-lg font-bold">{item.title}</h3>
                    <p className="text-sm text-gray-500 mt-2 leading-relaxed">{item.desc}</p>
                  </CardContent>
                </Card>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section id="testimonials" className="py-24 sm:py-32 bg-[#080910] relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:50px_50px]" />
        <GlowOrb className="w-[500px] h-[500px] bg-teal-500/8 bottom-0 left-0" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <FadeIn>
            <div className="text-center max-w-2xl mx-auto mb-16">
              <Badge variant="outline" className="border-emerald-500/20 text-emerald-400 mb-4">Povratne informacije</Badge>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
                Kaj pravijo naši{' '}
                <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">zadovoljni stranke</span>
              </h2>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <FadeIn key={i} delay={i * 0.15} direction="up">
                <Card className="bg-white/[0.03] border-white/[0.06] rounded-2xl backdrop-blur-sm hover:border-emerald-500/15 transition-all duration-500 h-full">
                  <CardContent className="p-6 flex flex-col h-full">
                    <div className="flex gap-0.5 mb-4">
                      {Array.from({ length: t.rating }).map((_, j) => (
                        <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <Quote className="w-8 h-8 text-emerald-500/20 mb-2" />
                    <p className="text-sm text-gray-300 leading-relaxed flex-1">"{t.text}"</p>
                    <div className="flex items-center gap-3 mt-5 pt-5 border-t border-white/[0.06]">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500/20 to-teal-500/10 flex items-center justify-center text-sm font-bold text-emerald-400">
                        {t.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-medium text-sm">{t.name}</div>
                        <div className="text-xs text-gray-500">{t.location}</div>
                      </div>
                      <ThumbsUp className="w-4 h-4 text-emerald-500/40 ml-auto" />
                    </div>
                  </CardContent>
                </Card>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ─── BRANDS ─── */}
      <section className="py-16 border-y border-white/[0.04]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <p className="text-center text-xs text-gray-600 uppercase tracking-widest mb-8">Sodelujemo z vodilnimi blagovnimi znamkami</p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12">
              {brands.map((brand) => (
                <div key={brand} className="text-xl sm:text-2xl font-bold text-gray-700/50 hover:text-gray-500 transition-colors duration-500 tracking-tight">
                  {brand}
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ─── CONTACT ─── */}
      <section id="contact" ref={contactRef} className="py-24 sm:py-32 relative">
        <GlowOrb className="w-[600px] h-[600px] bg-emerald-500/8 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <FadeIn>
            <div className="text-center max-w-2xl mx-auto mb-16">
              <Badge variant="outline" className="border-emerald-500/20 text-emerald-400 mb-4">Kontakt</Badge>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
                Pišite nam,{' '}
                <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">brezplačno ogledamo</span>
              </h2>
              <p className="mt-4 text-gray-500">Zastonj ogledamo objekt in pripravimo ponudbo. Odgovorimo v 24 urah.</p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
            <FadeIn className="lg:col-span-3">
              <Card className="bg-white/[0.03] border-white/[0.06] rounded-2xl backdrop-blur-sm">
                <CardContent className="p-6 sm:p-8">
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-gray-400 mb-1.5 block">Ime in priimek *</label>
                        <Input name="name" required placeholder="Janez Novak" className="bg-white/[0.03] border-white/[0.08] text-white placeholder:text-gray-600 focus:border-emerald-500/50 rounded-xl h-12" />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-400 mb-1.5 block">E-pošta *</label>
                        <Input name="email" type="email" required placeholder="janez@email.com" className="bg-white/[0.03] border-white/[0.08] text-white placeholder:text-gray-600 focus:border-emerald-500/50 rounded-xl h-12" />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-gray-400 mb-1.5 block">Telefon</label>
                        <Input name="phone" placeholder="01 123 45 67" className="bg-white/[0.03] border-white/[0.08] text-white placeholder:text-gray-600 focus:border-emerald-500/50 rounded-xl h-12" />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-400 mb-1.5 block">Storitev *</label>
                        <Select name="service" required>
                          <SelectTrigger className="bg-white/[0.03] border-white/[0.08] text-white focus:border-emerald-500/50 rounded-xl h-12">
                            <SelectValue placeholder="Izberite storitev" />
                          </SelectTrigger>
                          <SelectContent className="bg-[#161923] border-white/[0.08]">
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
                      <label className="text-sm font-medium text-gray-400 mb-1.5 block">Sporočilo *</label>
                      <Textarea name="message" required rows={5} placeholder="Opišite, kaj potrebujete..." className="bg-white/[0.03] border-white/[0.08] text-white placeholder:text-gray-600 focus:border-emerald-500/50 rounded-xl resize-none" />
                    </div>
                    <Button type="submit" disabled={sending} size="lg" className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white shadow-2xl shadow-emerald-500/25 hover:shadow-emerald-500/40 rounded-xl h-14 text-base transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100">
                      {sending ? 'Pošiljam...' : 'Pošljite povpraševanje'}
                      {!sending && <ChevronRight className="w-5 h-5 ml-1" />}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </FadeIn>

            <FadeIn direction="right" delay={0.15} className="lg:col-span-2">
              <div className="space-y-5">
                <Card className="bg-white/[0.03] border-white/[0.06] rounded-2xl backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="space-y-5">
                      <a href="tel:+38640451221" className="flex items-start gap-4 group">
                        <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/15 flex items-center justify-center shrink-0 group-hover:bg-emerald-500/20 group-hover:border-emerald-500/30 transition-all duration-300">
                          <Phone className="w-5 h-5 text-emerald-400" />
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">Telefon</div>
                          <div className="font-semibold text-lg group-hover:text-emerald-400 transition-colors">040 451 221</div>
                        </div>
                      </a>
                      <Separator className="bg-white/[0.04]" />
                      <a href="mailto:janez.husic@gmail.com" className="flex items-start gap-4 group">
                        <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/15 flex items-center justify-center shrink-0 group-hover:bg-emerald-500/20 group-hover:border-emerald-500/30 transition-all duration-300">
                          <Mail className="w-5 h-5 text-emerald-400" />
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">E-pošta</div>
                          <div className="font-medium group-hover:text-emerald-400 transition-colors break-all">janez.husic@gmail.com</div>
                        </div>
                      </a>
                      <Separator className="bg-white/[0.04]" />
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/15 flex items-center justify-center shrink-0">
                          <MapPin className="w-5 h-5 text-emerald-400" />
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">Naslov</div>
                          <div className="font-medium">Cerkvišče 11</div>
                          <div className="text-sm text-gray-500">8332 Gradac, Slovenija</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white/[0.03] border-white/[0.06] rounded-2xl backdrop-blur-sm">
                  <CardContent className="p-6">
                    <h3 className="font-bold mb-4 flex items-center gap-2">
                      <Clock className="w-5 h-5 text-emerald-400" />
                      Delovni čas
                    </h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-500">Ponedeljek — Petek</span>
                        <span className="font-semibold text-emerald-400">7:00 — 17:00</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-500">Sobota</span>
                        <span className="font-medium">Po dogovoru</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-500">Nedelja</span>
                        <span className="font-medium text-gray-600">Zaprto</span>
                      </div>
                    </div>
                    <div className="mt-4 p-3.5 rounded-xl bg-amber-500/8 border border-amber-500/15">
                      <p className="text-xs text-amber-400/80 leading-relaxed">
                        <strong className="text-amber-400">Urgentne intervencije</strong> izvedemo tudi izven delovnega časa. Pokličite nas!
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-emerald-600/15 to-teal-600/5 border-emerald-500/20 rounded-2xl backdrop-blur-sm overflow-hidden relative">
                  <div className="absolute -top-10 -right-10 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl" />
                  <CardContent className="p-6 text-center relative">
                    <Shield className="w-10 h-10 text-emerald-400 mx-auto mb-3" />
                    <h3 className="font-bold text-lg">F-gas certificiran</h3>
                    <p className="text-sm text-gray-400 mt-1">
                      Državno pooblaščenec za dela z fluoriranimi toplogrednimi plini.
                      <br />Licenca št. 965
                    </p>
                  </CardContent>
                </Card>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="border-t border-white/[0.04] bg-[#080910]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-emerald-400 via-emerald-500 to-teal-600 flex items-center justify-center">
                  <Zap className="w-4 h-4 text-white" />
                </div>
                <div>
                  <span className="font-bold">MS Jani</span>
                  <span className="block text-xs text-gray-600 -mt-0.5">Montaža in storitve</span>
                </div>
              </div>
              <p className="text-sm text-gray-500 leading-relaxed">Janez Husič s.p. · Cerkvišče 11, 8332 Gradac · Davčna št.: 6381421</p>
              <p className="text-xs text-gray-700 mt-2">Matična št.: 6381421000 · Upravna enota: Črnomelj</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-sm">Hitri naslovi</h4>
              <div className="space-y-2">
                {navLinks.map((link) => (
                  <button key={link.href} onClick={() => scrollTo(link.href)} className="block text-sm text-gray-500 hover:text-emerald-400 transition-colors duration-300">{link.label}</button>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-sm">Kontakt</h4>
              <div className="space-y-2 text-sm text-gray-500">
                <a href="tel:+38640451221" className="flex items-center gap-2 hover:text-emerald-400 transition-colors"><Phone className="w-4 h-4" /> 040 451 221</a>
                <a href="mailto:janez.husic@gmail.com" className="flex items-center gap-2 hover:text-emerald-400 transition-colors"><Mail className="w-4 h-4" /> janez.husic@gmail.com</a>
                <div className="flex items-start gap-2"><MapPin className="w-4 h-4 shrink-0 mt-0.5" /> Cerkvišče 11, 8332 Gradac</div>
              </div>
            </div>
          </div>
          <Separator className="my-8 bg-white/[0.04]" />
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-600">
            <p>&copy; {new Date().getFullYear()} MS Jani — Montaža in storitve, Janez Husič s.p. Vse pravice pridržane.</p>
            <p>Cerkvišče 11 · 8332 Gradac · Bela krajina</p>
          </div>
        </div>
      </footer>

      {/* ─── BACK TO TOP ─── */}
      <AnimatePresence>
        {scrolled && (
          <motion.button initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white shadow-2xl shadow-emerald-500/30 hover:shadow-emerald-500/50 flex items-center justify-center transition-all duration-300 hover:scale-110">
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* ─── FLOATING PHONE BUTTON ─── */}
      <motion.a href="tel:+38640451221" initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 3, duration: 0.5 }} className="fixed bottom-6 left-6 z-40 w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white shadow-2xl shadow-emerald-500/40 hover:shadow-emerald-500/60 flex items-center justify-center transition-all duration-300 hover:scale-110 group">
        <Phone className="w-6 h-6 group-hover:animate-pulse" />
        <span className="absolute left-full ml-3 bg-[#161923] text-white text-xs font-medium px-3 py-1.5 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap border border-white/10">
          040 451 221
        </span>
      </motion.a>
    </div>
  )
}
