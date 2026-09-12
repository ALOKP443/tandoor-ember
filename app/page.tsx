'use client'

import { AnimatePresence, motion, type Variants } from 'framer-motion'
import { ArrowDownRight, ArrowUpRight, Camera, CheckCircle, Clock, ExternalLink, Flame, MapPin, Menu as MenuIcon, Phone, X } from 'lucide-react'
import Image from 'next/image'
import { FormEvent, useEffect, useMemo, useState } from 'react'
import { categories, dishes, hoursData, openDaysTag, type Category, type Dish } from '@/lib/menu-data'

const reveal = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.65 } } }

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.15,
    },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: 'easeOut' },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: { duration: 0.15 },
  },
}

function DishThumbnail({ src, alt, className }: { src: string; alt: string; className?: string }) {
  const [error, setError] = useState(false)

  if (error || !src) {
    return (
      <div className={`flex items-center justify-center bg-gradient-to-br from-ink via-[#2c241f] to-copper/30 text-copper/80 border border-ink/15 shadow-sm rounded-lg ${className}`}>
        <Flame size={22} className="opacity-70" />
      </div>
    )
  }

  return (
    <div className={`relative overflow-hidden rounded-lg border border-ink/15 shadow-sm bg-ink/10 ${className}`}>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onError={() => setError(true)}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
    </div>
  )
}

export default function Page() {
  const [activeCategory, setActiveCategory] = useState<Category>('Starters')
  const [vegOnly, setVegOnly] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [selectedDish, setSelectedDish] = useState<Dish | null>(null)
  const [todayIndex, setTodayIndex] = useState<number | null>(null)

  // Form State & Validation
  const [formState, setFormState] = useState({
    name: '',
    phone: '',
    date: '',
    party: '2 guests',
    time: '7:15 PM',
  })
  const [seatingPref, setSeatingPref] = useState<'Dining Room' | "Chef's Hearth Counter" | 'Covered Patio'>('Dining Room')
  const [errors, setErrors] = useState<{ [key: string]: boolean }>({})
  const [submitted, setSubmitted] = useState(false)

  const filteredDishes = useMemo(() => dishes.filter((dish) => dish.category === activeCategory && (!vegOnly || dish.veg)), [activeCategory, vegOnly])

  useEffect(() => {
    setTodayIndex(new Date().getDay())
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedDish(null)
      }
    }
    if (selectedDish) {
      window.addEventListener('keydown', handleKeyDown)
    }
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedDish])

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const newErrors: { [key: string]: boolean } = {}
    if (!formState.name.trim()) newErrors.name = true
    if (!formState.phone.trim()) newErrors.phone = true
    if (!formState.date.trim()) newErrors.date = true

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      setSubmitted(false)
      return
    }

    setErrors({})
    setSubmitted(true)
  }

  return (
    <main className="min-h-screen overflow-x-clip bg-background text-foreground">
      {/* Mobile Menu Backdrop */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMenuOpen(false)}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-xs md:hidden"
          />
        )}
      </AnimatePresence>

      <header
        className={`sticky top-0 z-50 w-full transition-all duration-350 ease-in-out ${
          isScrolled
            ? 'bg-black/50 backdrop-blur-md border-b border-cream/15 shadow-lg py-3 sm:py-4'
            : 'bg-transparent border-b border-cream/20 py-4 sm:py-6'
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-8 lg:px-12 text-cream drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]">
          <a href="#top" className="font-serif text-lg sm:text-xl tracking-tight transition-colors hover:text-copper shrink-0">
            Tandoor <span className="text-copper">&</span> Ember
          </a>
          <nav className="hidden items-center gap-8 text-[11px] font-medium uppercase tracking-[0.2em] md:flex">
            <a className="transition-colors hover:text-copper" href="#menu">
              Menu
            </a>
            <a className="transition-colors hover:text-copper" href="#our-story">
              Our Story
            </a>
            <a className="transition-colors hover:text-copper" href="#visit">
              Visit
            </a>
          </nav>
          <div className="flex items-center gap-3">
            <a
              href="#reserve"
              className="rounded-sm border border-cream/60 px-3 py-1.5 sm:px-4 sm:py-2 text-[9px] sm:text-[10px] font-semibold uppercase tracking-[0.16em] sm:tracking-[0.18em] transition hover:border-copper hover:bg-copper hover:text-ink shrink-0"
            >
              Reserve
            </a>
            <button
              aria-label="Toggle navigation menu"
              className="md:hidden text-cream p-1.5 transition-colors hover:text-copper min-h-[44px] min-w-[44px] flex items-center justify-center"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X size={22} /> : <MenuIcon size={22} />}
            </button>
          </div>
        </div>
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute left-0 right-0 top-full z-50 flex flex-col gap-4 border-b border-cream/20 bg-ink/95 px-6 py-6 text-xs uppercase tracking-[0.2em] md:hidden shadow-xl backdrop-blur-lg"
            >
              <a href="#menu" className="transition-colors hover:text-copper py-2 border-b border-cream/10" onClick={() => setMenuOpen(false)}>
                Menu
              </a>
              <a href="#our-story" className="transition-colors hover:text-copper py-2 border-b border-cream/10" onClick={() => setMenuOpen(false)}>
                Our Story
              </a>
              <a href="#visit" className="transition-colors hover:text-copper py-2 border-b border-cream/10" onClick={() => setMenuOpen(false)}>
                Visit
              </a>
              <a
                href="#reserve"
                className="mt-2 inline-block rounded-sm border border-copper bg-copper px-4 py-3 text-center text-[10px] font-bold uppercase tracking-[0.18em] text-cream transition hover:bg-cream hover:text-ink"
                onClick={() => setMenuOpen(false)}
              >
                Reserve a Table
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <section id="top" className="relative flex min-h-[550px] sm:min-h-[650px] lg:min-h-[760px] items-end bg-ink px-4 pb-14 pt-20 sm:px-8 lg:px-12 lg:pb-24 -mt-[65px] sm:-mt-[73px] pt-[110px] sm:pt-[120px]">
        <Image src="/copper-char-interior.png" alt="Warmly lit tandoor dining room at Tandoor and Ember" fill priority className="object-cover opacity-55" />
        <div className="hero-grain absolute inset-0 opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 via-40% to-transparent pointer-events-none" />
        <div className="relative z-10 mx-auto w-full max-w-7xl text-cream">
          <motion.div initial="hidden" animate="show" variants={reveal} className="max-w-5xl">
            <p className="mb-4 sm:mb-6 text-[10px] font-semibold uppercase tracking-[0.2em] sm:tracking-[0.32em] text-copper">{openDaysTag} · est. 2019 · hauz khas village</p>
            <h1 className="max-w-4xl font-serif text-[clamp(2.75rem,11vw,11.5rem)] leading-[0.88] sm:leading-[0.79] tracking-[-0.04em] sm:tracking-[-0.07em]">Fire makes<br /><em className="font-normal text-copper">the flavor.</em></h1>
            <div className="mt-8 sm:mt-10 flex flex-col justify-between gap-6 sm:gap-8 border-t border-cream/25 pt-5 sm:flex-row sm:items-end"><p className="max-w-xs text-xs sm:text-sm leading-relaxed text-cream/75">Tandoor-fired. Slow-simmered. Always neighborhood. A Delhi kitchen for big appetites.</p><a href="#menu" className="group flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] py-1 min-h-[44px]">Explore the menu <ArrowDownRight size={18} className="text-copper transition-transform group-hover:translate-x-1 group-hover:translate-y-1" /></a></div>
          </motion.div>
        </div>
      </section>

      <section id="menu" className="bg-cream px-4 py-16 text-ink sm:px-8 sm:py-24 lg:px-12 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={reveal} className="mb-8 sm:mb-12 flex flex-col justify-between gap-4 border-b border-ink/20 pb-6 sm:pb-8 sm:flex-row sm:items-end">
            <div>
              <p className="mb-2 sm:mb-4 text-[10px] font-bold uppercase tracking-[0.25em] sm:tracking-[0.3em] text-copper">From the kitchen</p>
              <h2 className="font-serif text-5xl sm:text-7xl lg:text-8xl leading-none tracking-[-0.05em]">The menu</h2>
            </div>
            <p className="max-w-xs text-xs sm:text-sm leading-relaxed text-ink/60">Built around the fire, changing with the market, meant to be passed around.</p>
          </motion.div>

          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="no-scrollbar flex gap-2 overflow-x-auto pb-2 pt-1 px-0.5 touch-pan-x">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`shrink-0 whitespace-nowrap rounded-full border px-4 py-2.5 text-[10px] font-bold uppercase tracking-[0.16em] transition min-h-[38px] flex items-center ${
                    activeCategory === category ? 'border-copper bg-copper text-cream' : 'border-ink/20 hover:border-copper hover:text-copper'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
            <button
              onClick={() => setVegOnly(!vegOnly)}
              className={`flex w-fit items-center gap-2 text-[10px] font-bold uppercase tracking-[0.16em] shrink-0 py-1 min-h-[38px] ${vegOnly ? 'text-copper' : 'text-ink/50'}`}
            >
              <span className={`h-4 w-7 rounded-full p-0.5 transition ${vegOnly ? 'bg-copper' : 'bg-ink/20'}`}>
                <span className={`block h-3 w-3 rounded-full bg-cream transition ${vegOnly ? 'translate-x-3' : ''}`} />
              </span>{' '}
              Veg only
            </button>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeCategory}-${vegOnly}`}
              variants={containerVariants}
              initial="hidden"
              animate="show"
              exit="exit"
              className="grid gap-x-12 gap-y-6 min-h-[440px] md:grid-cols-2 align-start"
            >
              {filteredDishes.length ? (
                filteredDishes.map((dish) => (
                  <motion.article
                    key={dish.id}
                    variants={itemVariants}
                    whileHover={{ y: -3 }}
                    onClick={() => setSelectedDish(dish)}
                    className="group cursor-pointer border-t border-ink/20 py-4 sm:py-5 transition-colors hover:border-copper/50 flex gap-3 sm:gap-4 items-start active:bg-ink/5 rounded-sm p-1"
                  >
                    <DishThumbnail src={dish.image} alt={dish.name} className="w-20 h-20 sm:w-24 sm:h-24 shrink-0 mt-0.5" />

                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline justify-between gap-2">
                        <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap min-w-0">
                          <h3 className="font-serif text-lg sm:text-2xl leading-snug tracking-[-0.025em] group-hover:text-copper transition-colors break-words">
                            {dish.name}
                          </h3>
                          {dish.veg && (
                            <span className="inline-flex items-center rounded-full bg-emerald-950/20 border border-emerald-600/40 px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.14em] text-emerald-700 shrink-0">
                              Veg
                            </span>
                          )}
                          {dish.chefsPick && (
                            <span className="inline-flex items-center rounded-full bg-copper/15 border border-copper/40 px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.14em] text-copper shrink-0">
                              Chef's Pick
                            </span>
                          )}
                        </div>
                        <span className="font-mono text-xs sm:text-sm font-semibold text-copper shrink-0 ml-1">{dish.price}</span>
                      </div>
                      <p className="mt-1 text-xs sm:text-sm leading-relaxed text-ink/65 line-clamp-2">{dish.description}</p>
                      <div className="mt-2.5 flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-[0.14em] sm:tracking-[0.18em] text-copper/80 group-hover:text-copper transition-colors">
                          Tap for details & pairings →
                        </span>
                        <span className="max-w-0 overflow-hidden text-right text-xs italic text-ink/50 opacity-0 transition-all group-hover:max-w-xs group-hover:opacity-100 hidden sm:inline">
                          {dish.note}
                        </span>
                      </div>
                    </div>
                  </motion.article>
                ))
              ) : (
                <motion.p variants={itemVariants} className="border-t border-ink/20 py-8 text-sm text-ink/60 md:col-span-2">
                  No vegetarian dishes in this category tonight. Try selecting another category above.
                </motion.p>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      <section id="our-story" className="bg-ink px-4 py-16 text-cream sm:px-8 sm:py-24 lg:px-12 lg:py-32">
        <div className="mx-auto grid max-w-7xl gap-10 lg:gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={reveal}>
            <p className="mb-4 sm:mb-5 text-[10px] font-bold uppercase tracking-[0.25em] sm:tracking-[0.3em] text-copper">A neighborhood ritual</p>
            <h2 className="max-w-xl font-serif text-4xl sm:text-6xl lg:text-7xl leading-[0.95] tracking-[-0.05em]">
              Good food has a little <em className="font-normal text-copper">smoke</em> on it.
            </h2>
            <p className="mt-6 sm:mt-8 max-w-md text-xs sm:text-sm leading-relaxed sm:leading-7 text-cream/65">
              Tandoor & Ember started with a coal-fired drum, a Delhi rooftop, and a belief that the best nights happen around a table. We cook over hardwood and charcoal, season generously, and leave room for one more.
            </p>
            <a href="#reserve" className="mt-6 sm:mt-8 inline-flex items-center gap-3 border-b border-copper pb-2 text-xs font-bold uppercase tracking-[0.18em] text-copper hover:text-cream transition-colors min-h-[44px]">
              Come as you are <ArrowUpRight size={16} />
            </a>
          </motion.div>

          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="group relative col-span-2 aspect-[16/9] overflow-hidden rounded-lg border border-cream/15"
            >
              <Image
                src="/copper-char-dish.png"
                alt="Tandoori gobi and Indian dishes on a ceramic plate"
                fill
                className="object-cover transition-transform duration-500 ease-out active:scale-[1.02] sm:group-hover:scale-105"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="group relative aspect-square overflow-hidden rounded-lg border border-cream/15"
            >
              <Image
                src="/copper-char-cocktail.png"
                alt="Indian-inspired cocktail at the bar"
                fill
                className="object-cover transition-transform duration-500 ease-out active:scale-[1.02] sm:group-hover:scale-105"
              />
            </motion.div>

            <div className="flex items-end border-t border-cream/25 pt-4">
              <p className="text-[11px] sm:text-xs uppercase tracking-[0.16em] sm:tracking-[0.18em] text-cream/50">
                Hardwood only<br />
                <span className="text-copper">all night long</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="visit" className="bg-cream px-4 py-16 text-ink sm:px-8 sm:py-24 lg:px-12 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-stretch">
            {/* Editorial Info Card */}
            <div className="lg:col-span-5 flex flex-col justify-between rounded-2xl border border-ink/15 bg-ink p-5 sm:p-9 text-cream shadow-xl">
              <div>
                <p className="mb-3 sm:mb-4 text-[10px] font-bold uppercase tracking-[0.25em] sm:tracking-[0.3em] text-copper">
                  Find Your Way Here
                </p>
                <h2 className="font-serif text-4xl sm:text-6xl leading-[0.95] tracking-[-0.04em] text-cream">
                  Come <em className="font-normal text-copper">hungry.</em>
                </h2>
                <p className="mt-3 sm:mt-4 text-xs leading-relaxed text-cream/70">
                  Located in Hauz Khas Village, New Delhi. Pull up a chair by the sigri or reserve your table in advance.
                </p>

                {/* Hours Breakdown */}
                <div className="mt-6 sm:mt-8 border-t border-cream/15 pt-5 sm:pt-6">
                  <h3 className="mb-3 sm:mb-4 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-copper">
                    <Clock size={15} /> Hours of Operation
                  </h3>
                  <ul className="space-y-3 text-xs">
                    {hoursData.map((item) => {
                      const isToday = todayIndex !== null && item.indices.includes(todayIndex)
                      return (
                        <li
                          key={item.days}
                          className={`flex flex-col xs:flex-row xs:items-center justify-between pb-2 border-b border-cream/10 gap-1 ${
                            isToday ? 'text-copper font-bold' : item.closed ? 'text-cream/60' : 'text-cream/80'
                          }`}
                        >
                          <span>{item.days}</span>
                          <span className="flex items-center gap-2 shrink-0">
                            {item.time}
                            {isToday && (
                              <span className="rounded-full bg-copper/20 border border-copper/50 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-copper">Today</span>
                            )}
                          </span>
                        </li>
                      )
                    })}
                  </ul>
                </div>

                {/* Address */}
                <div className="mt-5 sm:mt-6 border-t border-cream/15 pt-5 sm:pt-6">
                  <h3 className="mb-2 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-copper">
                    <MapPin size={15} /> Address
                  </h3>
                  <p className="text-xs sm:text-sm font-medium text-cream leading-relaxed">
                    12A, Hauz Khas Village<br />
                    New Delhi, Delhi 110016
                  </p>
                </div>
              </div>

              {/* Get Directions CTA */}
              <div className="mt-6 sm:mt-8 border-t border-cream/15 pt-5 sm:pt-6">
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Hauz+Khas+Village,+New+Delhi,+Delhi+110016"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center gap-2 rounded border border-copper bg-copper px-5 py-3.5 text-xs font-bold uppercase tracking-[0.18em] text-cream transition hover:bg-cream hover:text-ink hover:border-cream shadow-md min-h-[44px]"
                >
                  Get Directions <ExternalLink size={14} />
                </a>
              </div>
            </div>

            {/* Map & Micro-copy Block */}
            <div className="lg:col-span-7 flex flex-col justify-between gap-4">
              <div className="relative w-full h-[280px] sm:h-[360px] lg:h-full min-h-[280px] lg:min-h-[340px] rounded-xl sm:rounded-2xl overflow-hidden border border-ink/20 shadow-xl bg-ink">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3504.6644265147576!2d77.19230537626359!3d28.549807575710926!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce21396a84d43%3A0xb3e1eb411f1853ea!2sHauz%20Khas%20Village%2C%20Deer%20Park%2C%20Hauz%20Khas%2C%20New%20Delhi%2C%20Delhi%20110016!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Tandoor & Ember Location Map"
                  className="w-full h-full border-0 filter grayscale contrast-125 sepia-[.25] invert-[.9] hue-rotate-[180deg] opacity-90 transition-opacity duration-300 hover:opacity-100"
                />
              </div>
              <p className="text-center sm:text-left text-[11px] sm:text-xs text-ink/65 font-medium leading-relaxed px-1">
                Metro & auto-rickshaw accessible via Green Park or Hauz Khas Station · Parking available at HKV main entrance · Walk-ins welcome at the sigri counter.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Reservation Section */}
      <section id="reserve" className="bg-copper px-4 py-16 text-cream sm:px-8 sm:py-24 lg:px-12 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-10 lg:gap-14 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="mb-3 sm:mb-5 text-[10px] font-bold uppercase tracking-[0.25em] sm:tracking-[0.3em] text-cream/65">Save us a seat</p>
            <h2 className="font-serif text-5xl sm:text-7xl lg:text-8xl leading-none tracking-[-0.05em]">
              Your table<br />
              <em className="font-normal">awaits.</em>
            </h2>
            <div className="mt-8 sm:mt-10 space-y-3 text-xs sm:text-sm text-cream/80">
              <a className="flex items-center gap-3 hover:text-cream transition-colors py-1 min-h-[44px]" href="tel:+919876543210">
                <Phone size={16} /> +91 98765 43210
              </a>
              <a className="flex items-center gap-3 hover:text-cream transition-colors py-1 min-h-[44px]" href="mailto:hello@tandoorandember.com">
                hello@tandoorandember.com
              </a>
            </div>
          </div>

          <form onSubmit={handleSubmit} noValidate className="grid gap-5 sm:gap-6 sm:grid-cols-2">
            {/* Name */}
            <label className="field">
              <span className="flex items-center justify-between">
                Name
                {errors.name && <span className="text-[10px] text-red-200 font-semibold tracking-normal">Name required</span>}
              </span>
              <input
                name="name"
                value={formState.name}
                onChange={(e) => {
                  setFormState({ ...formState, name: e.target.value })
                  if (errors.name) setErrors({ ...errors, name: false })
                }}
                placeholder="Your name"
                className={`mt-1 w-full border-b bg-transparent px-2 py-3 text-sm font-normal text-cream outline-none transition placeholder:text-cream/45 focus:border-cream focus:ring-2 focus:ring-cream/40 min-h-[44px] ${
                  errors.name ? 'border-red-300 bg-red-950/20' : 'border-cream/45 focus:border-cream'
                }`}
              />
            </label>

            {/* Phone */}
            <label className="field">
              <span className="flex items-center justify-between">
                Phone
                {errors.phone && <span className="text-[10px] text-red-200 font-semibold tracking-normal">Phone required</span>}
              </span>
              <input
                name="phone"
                type="tel"
                value={formState.phone}
                onChange={(e) => {
                  setFormState({ ...formState, phone: e.target.value })
                  if (errors.phone) setErrors({ ...errors, phone: false })
                }}
                placeholder="+91 98765 43210"
                className={`mt-1 w-full border-b bg-transparent px-2 py-3 text-sm font-normal text-cream outline-none transition placeholder:text-cream/45 focus:border-cream focus:ring-2 focus:ring-cream/40 min-h-[44px] ${
                  errors.phone ? 'border-red-300 bg-red-950/20' : 'border-cream/45 focus:border-cream'
                }`}
              />
            </label>

            {/* Date */}
            <label className="field">
              <span className="flex items-center justify-between">
                Date
                {errors.date && <span className="text-[10px] text-red-200 font-semibold tracking-normal">Date required</span>}
              </span>
              <input
                name="date"
                type="date"
                value={formState.date}
                onChange={(e) => {
                  setFormState({ ...formState, date: e.target.value })
                  if (errors.date) setErrors({ ...errors, date: false })
                }}
                className={`mt-1 w-full border-b bg-transparent px-2 py-3 text-sm font-normal text-cream outline-none transition [color-scheme:dark] focus:border-cream focus:ring-2 focus:ring-cream/40 min-h-[44px] ${
                  errors.date ? 'border-red-300 bg-red-950/20' : 'border-cream/45 focus:border-cream'
                }`}
              />
            </label>

            {/* Time Slot */}
            <label className="field">
              Time slot
              <select
                name="time"
                value={formState.time}
                onChange={(e) => setFormState({ ...formState, time: e.target.value })}
                className="mt-1 w-full border-b border-cream/45 bg-transparent px-2 py-3 text-sm font-normal text-cream outline-none transition [color-scheme:dark] focus:border-cream focus:ring-2 focus:ring-cream/40 min-h-[44px]"
              >
                <option value="5:30 PM">5:30 PM</option>
                <option value="6:00 PM">6:00 PM</option>
                <option value="7:15 PM">7:15 PM</option>
                <option value="8:00 PM">8:00 PM</option>
                <option value="8:45 PM">8:45 PM</option>
                <option value="9:30 PM">9:30 PM</option>
              </select>
            </label>

            {/* Party Size */}
            <label className="field sm:col-span-2">
              Party size
              <select
                name="party"
                value={formState.party}
                onChange={(e) => setFormState({ ...formState, party: e.target.value })}
                className="mt-1 w-full border-b border-cream/45 bg-transparent px-2 py-3 text-sm font-normal text-cream outline-none transition [color-scheme:dark] focus:border-cream focus:ring-2 focus:ring-cream/40 min-h-[44px]"
              >
                <option value="2 guests">2 guests</option>
                <option value="3 guests">3 guests</option>
                <option value="4 guests">4 guests</option>
                <option value="5+ guests">5+ guests</option>
              </select>
            </label>

            {/* Seating Preference Quick-Select Pill Group */}
            <div className="field sm:col-span-2 mt-2">
              <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-cream/70">
                Seating Preference
              </span>
              <div className="mt-2.5 flex flex-wrap gap-2 sm:gap-2.5" role="radiogroup" aria-label="Seating Preference">
                {(['Dining Room', "Chef's Hearth Counter", 'Covered Patio'] as const).map((pref) => (
                  <button
                    key={pref}
                    type="button"
                    role="radio"
                    aria-checked={seatingPref === pref}
                    onClick={() => setSeatingPref(pref)}
                    className={`rounded-full border px-3.5 py-2.5 text-[11px] sm:text-xs font-semibold tracking-wider transition-all focus:outline-none focus:ring-2 focus:ring-cream/80 min-h-[44px] flex items-center justify-center ${
                      seatingPref === pref
                        ? 'border-cream bg-cream text-copper font-bold shadow-md scale-[1.02]'
                        : 'border-cream/40 bg-cream/10 text-cream/80 hover:border-cream/70 hover:bg-cream/20'
                    }`}
                  >
                    {pref}
                  </button>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              whileTap={{ scale: 0.98 }}
              className="mt-4 flex items-center justify-between border border-cream/70 bg-transparent px-5 sm:px-6 py-4 text-left text-[11px] sm:text-xs font-bold uppercase tracking-[0.14em] sm:tracking-[0.18em] text-cream transition-all hover:bg-cream hover:text-copper focus:outline-none focus:ring-2 focus:ring-cream sm:col-span-2 shadow-lg rounded-sm cursor-pointer min-h-[48px]"
            >
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.span
                    key="submitted"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                    className="flex items-center gap-2 text-cream font-bold"
                  >
                    <CheckCircle size={18} className="text-cream shrink-0" />
                    Request Received — See You Soon
                  </motion.span>
                ) : (
                  <motion.span
                    key="default"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    Confirm Reservation
                  </motion.span>
                )}
              </AnimatePresence>
              <ArrowUpRight size={18} className="shrink-0 ml-2" />
            </motion.button>
          </form>
        </div>
      </section>

      <footer className="bg-ink px-4 py-8 text-cream sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-5 text-[10px] uppercase tracking-[0.16em] sm:tracking-[0.18em] text-cream/50 sm:flex-row sm:items-center">
          <span className="font-serif text-lg normal-case tracking-tight text-cream">Tandoor <span className="text-copper">&</span> Ember</span>
          <span>Tandoor-fired in New Delhi · {openDaysTag}</span>
          <div className="flex items-center gap-6">
            <a href="#top" className="flex items-center gap-2 text-copper hover:underline min-h-[44px]">Back to top <ArrowUpRight size={14} /></a>
            <a aria-label="Instagram" href="#top" className="text-cream hover:text-copper min-h-[44px] min-w-[44px] flex items-center justify-center"><Camera size={16} /></a>
          </div>
        </div>
      </footer>

      {/* Dish Detail Modal / Bottom Sheet */}
      <AnimatePresence>
        {selectedDish && (
          <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center p-0 sm:p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setSelectedDish(null)}
              className="fixed inset-0 bg-black/75 backdrop-blur-sm"
            />

            <motion.div
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: '100%', opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 280 }}
              className="relative z-10 w-full max-w-lg rounded-t-2xl sm:rounded-2xl border border-cream/20 bg-ink text-cream shadow-2xl max-h-[88vh] sm:max-h-[90vh] overflow-y-auto overflow-x-hidden"
            >
              {/* Native Mobile Sheet Pull Handle Bar */}
              <div className="w-12 h-1 bg-cream/30 rounded-full mx-auto my-2.5 sm:hidden" />

              {/* Modal Header Banner Image */}
              <div className="relative w-full h-44 sm:h-56 bg-black/40 overflow-hidden">
                <DishThumbnail src={selectedDish.image} alt={selectedDish.name} className="w-full h-full rounded-none border-0" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-black/40 pointer-events-none" />
                <button
                  onClick={() => setSelectedDish(null)}
                  aria-label="Close detail modal"
                  className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-black/70 text-cream hover:bg-black/90 transition-colors z-20 shadow-md"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="p-5 sm:p-8">
                <div className="pr-6">
                  <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-copper">
                    {selectedDish.category}
                  </p>
                  <div className="mt-1 flex items-center gap-2 flex-wrap">
                    <h3 className="font-serif text-2xl sm:text-3xl tracking-tight">{selectedDish.name}</h3>
                    {selectedDish.veg && (
                      <span className="inline-flex items-center rounded-full bg-emerald-950/40 border border-emerald-500/40 px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.14em] text-emerald-400 shrink-0">
                        Veg
                      </span>
                    )}
                    {selectedDish.chefsPick && (
                      <span className="inline-flex items-center rounded-full bg-copper/25 border border-copper/50 px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.14em] text-copper shrink-0">
                        Chef's Pick
                      </span>
                    )}
                  </div>
                  <p className="mt-1.5 font-mono text-lg sm:text-xl font-semibold text-copper">{selectedDish.price}</p>
                </div>

                <p className="mt-4 text-xs sm:text-sm leading-relaxed text-cream/80 border-t border-cream/15 pt-4">
                  {selectedDish.description}
                </p>

                {selectedDish.note && (
                  <p className="mt-2 text-xs italic text-cream/60">
                    "{selectedDish.note}"
                  </p>
                )}

                <div className="mt-5 space-y-4 border-t border-cream/15 pt-4 text-xs">
                  <div>
                    <h4 className="font-bold uppercase tracking-[0.18em] text-copper mb-2">Ingredients</h4>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedDish.ingredients.map((ing) => (
                        <span key={ing} className="rounded border border-cream/15 bg-cream/5 px-2.5 py-1 text-[11px] text-cream/90">
                          {ing}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-bold uppercase tracking-[0.18em] text-copper mb-1">Allergens & Notes</h4>
                    <p className="text-cream/75 leading-relaxed">{selectedDish.allergens}</p>
                  </div>

                  <div>
                    <h4 className="font-bold uppercase tracking-[0.18em] text-copper mb-1">Pairs Well With</h4>
                    <p className="text-cream/75 leading-relaxed">{selectedDish.pairing}</p>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedDish(null)}
                  className="mt-6 w-full rounded border border-copper/60 bg-copper/20 py-3.5 text-xs font-bold uppercase tracking-[0.18em] text-cream hover:bg-copper hover:text-ink transition-colors min-h-[44px]"
                >
                  Close View
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  )
}

// Tailwind cannot express these compact field styles cleanly without a component split.
// The selectors remain local to the page through the global design tokens.
