import { useState, useEffect, useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'

const SQ_CLIKEY = import.meta.env.VITE_SQUARE_CLIKEY_URL || '#'

const SPECS = [
  ['Material',        'CNC 6061 Aluminum'],
  ['Operating Force', '45g Actuation'],
  ['Total Travel',    '4.0 mm'],
  ['Sound Profile',   'Full Mechanical Thock'],
  ['Finish',          'Matte Black Anodized'],
  ['Dimensions',      '32 × 18 × 12 mm'],
  ['Weight',          '22g'],
  ['Batch',           '01 — 4 Units'],
  ['Lead Time',       '2–3 Weeks'],
  ['Shipping',        'Tracked Worldwide'],
]

// ── Shared ────────────────────────────────────────────────────────────────────
function Noise() { return <div className="noise" aria-hidden /> }

function Reveal({ children, delay = 0, className = '', x = 0 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div ref={ref} className={className}
      initial={{ opacity: 0, y: x ? 0 : 20, x }}
      animate={inView ? { opacity: 1, y: 0, x: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}>
      {children}
    </motion.div>
  )
}

function OrderBtn({ className = '' }) {
  return (
    <a href={SQ_CLIKEY} target="_blank" rel="noopener noreferrer"
      className={`inline-flex items-center gap-3 bg-[#FF4D00] border border-[#FF4D00] text-black font-mono text-[11px] tracking-[3px] uppercase px-8 py-4 hover:bg-[#e64400] transition-colors duration-300 pulse cursor-pointer select-none ${className}`}>
      Order Batch 01 — $89 ▶
    </a>
  )
}

// ── Nav ───────────────────────────────────────────────────────────────────────
function Nav() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <header className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 md:px-12 h-14 transition-all duration-400"
      style={{
        background:     scrolled ? 'rgba(8,8,8,0.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom:   scrolled ? '1px solid rgba(255,255,255,0.05)' : '1px solid transparent',
      }}>
      <div className="font-mono text-[12px] font-bold tracking-[6px] text-white/90">
        CLIKEY
      </div>
      <div className="flex items-center gap-5">
        <button onClick={() => document.getElementById('specs')?.scrollIntoView({ behavior: 'smooth' })}
          className="font-mono text-[9px] tracking-[3px] uppercase text-white/35 hover:text-white/70 transition-colors">
          Specs
        </button>
        <a href="https://night.inc" target="_blank" rel="noopener noreferrer"
          className="font-mono text-[9px] tracking-[3px] uppercase text-white/25 hover:text-white/60 transition-colors">
          Night.inc ↗
        </a>
        <OrderBtn className="!px-5 !py-2.5 !text-[9px]" />
      </div>
    </header>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
//  HERO — full viewport, THOCK. wordmark
// ═══════════════════════════════════════════════════════════════════════════════
function Hero() {
  const [loaded, setLoaded] = useState(false)
  useEffect(() => { setTimeout(() => setLoaded(true), 100) }, [])

  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y    = useTransform(scrollYProgress, [0, 1], [0, 120])
  const fade = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  const anim = (d) => ({
    initial: { opacity: 0, y: 16 },
    animate: { opacity: loaded ? 1 : 0, y: loaded ? 0 : 16 },
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: d },
  })

  return (
    <section ref={ref} className="relative min-h-screen flex flex-col justify-center overflow-hidden px-6 md:px-12"
      style={{ background: '#080808' }}>

      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="breathe absolute"
          style={{
            top: '30%', left: '-10%', width: 700, height: 500,
            background: 'radial-gradient(ellipse, rgba(255,77,0,0.07) 0%, transparent 65%)',
            filter: 'blur(60px)',
          }} />
      </div>

      <motion.div style={{ y, opacity: fade }} className="relative z-10 max-w-5xl">

        {/* Label */}
        <motion.div {...anim(0.05)}
          className="font-mono text-[9px] tracking-[6px] text-white/25 uppercase mb-6">
          // Night.inc — Tactile Instruments — Batch 01
        </motion.div>

        {/* THOCK. */}
        <motion.h1 {...anim(0.14)}
          className="font-mono font-bold leading-[0.85] tracking-tighter mb-6 select-none"
          style={{ fontSize: 'clamp(80px, 18vw, 220px)', color: '#F5F5F5' }}>
          THOCK<span style={{ color: '#FF4D00' }}>.</span>
        </motion.h1>

        {/* Descriptor */}
        <motion.div {...anim(0.26)} className="flex flex-wrap items-center gap-4 mb-3">
          <span className="font-mono text-[11px] md:text-[13px] tracking-[5px] text-white/40 uppercase">
            CNC 6061 Aluminum
          </span>
          <span className="text-white/15">·</span>
          <span className="font-mono text-[11px] md:text-[13px] tracking-[5px] text-white/40 uppercase">
            45g Actuation
          </span>
          <span className="text-white/15">·</span>
          <span className="font-mono text-[11px] md:text-[13px] tracking-[5px] text-white/40 uppercase">
            4mm Travel
          </span>
        </motion.div>

        <motion.p {...anim(0.34)} className="font-mono text-[12px] tracking-[3px] text-white/22 uppercase mb-10">
          Stress reliever. Tactile instrument. Built by Night.inc.
        </motion.p>

        <motion.div {...anim(0.42)} className="flex flex-wrap items-center gap-4">
          <OrderBtn />
          <div className="font-mono text-[8px] tracking-[2px] text-white/22 uppercase">
            4 units · Batch 01
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll hint */}
      <motion.div {...anim(0.6)}
        className="absolute bottom-8 left-6 md:left-12 font-mono text-[8px] tracking-[3px] text-white/20 uppercase">
        Scroll ↓
      </motion.div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
//  MANIFESTO
// ═══════════════════════════════════════════════════════════════════════════════
function Manifesto() {
  return (
    <section className="px-6 md:px-12 py-28 border-t" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
      <div className="max-w-2xl">
        <Reveal>
          <div className="font-mono text-[9px] tracking-[5px] text-[#FF4D00]/55 uppercase mb-10">// The Object</div>
        </Reveal>
        <Reveal delay={0.06}>
          <p className="font-mono text-[15px] md:text-[17px] leading-9 text-white/60 mb-6">
            The Clikey is not a toy.
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="font-mono text-[13px] leading-8 text-white/38 mb-5">
            It is a precision-engineered tactile instrument — machined from solid 6061 aluminum,
            tuned for a single purpose: satisfying, repeatable mechanical feedback.
          </p>
        </Reveal>
        <Reveal delay={0.14}>
          <p className="font-mono text-[13px] leading-8 text-white/28 mb-5">
            45 grams of actuation force. 4 millimeters of total travel. A full metal click
            that registers not just in your fingers — somewhere deeper. Founders, operators,
            and builders who work after midnight know the feeling.
          </p>
        </Reveal>
        <Reveal delay={0.18}>
          <p className="font-mono text-[13px] leading-8 text-white/22">
            This is not a keycap. This is not an accessory. This is the Clikey —
            the first consumer hardware product from Night.inc.
            Batch 01: four units. Manufacturing in progress.
          </p>
        </Reveal>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
//  SPEC TABLE
// ═══════════════════════════════════════════════════════════════════════════════
function SpecSection() {
  return (
    <section id="specs" className="px-6 md:px-12 py-24 border-t" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 max-w-5xl items-start">

        {/* Left — big label + CTA */}
        <div>
          <Reveal>
            <div className="font-mono text-[9px] tracking-[5px] text-[#FF4D00]/55 uppercase mb-6">// Specifications</div>
          </Reveal>
          <Reveal delay={0.06}>
            <div className="font-mono font-bold leading-none tracking-tighter mb-8 select-none"
              style={{ fontSize: 'clamp(48px, 10vw, 110px)', color: '#F5F5F5' }}>
              FULL<br />
              METAL<span style={{ color: '#FF4D00' }}>.</span>
            </div>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="font-mono text-[11px] leading-7 text-white/30 mb-8">
              No plastic. No rubber. No shortcuts. Every surface is machined,
              anodized, and tested before it ships.
            </p>
          </Reveal>
          <Reveal delay={0.16}>
            <OrderBtn />
          </Reveal>
        </div>

        {/* Right — spec table */}
        <Reveal delay={0.08}>
          <div className="border" style={{ borderColor: 'rgba(255,255,255,0.07)', background: '#0d0d0d' }}>
            <div className="px-6 py-4 border-b flex items-center justify-between"
              style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
              <span className="font-mono text-[8px] tracking-[4px] text-white/28">SPEC SHEET</span>
              <span className="font-mono text-[8px] tracking-[2px] text-[#FF4D00]/60">REV 1.0</span>
            </div>
            {SPECS.map(([k, v]) => (
              <div key={k} className="px-6 py-3.5 flex items-center justify-between border-b last:border-b-0"
                style={{ borderColor: 'rgba(255,255,255,0.04)' }}>
                <span className="font-mono text-[9px] text-white/28">{k}</span>
                <span className="font-mono text-[9px] font-semibold text-white/65 text-right">{v}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
//  ORDER SECTION
// ═══════════════════════════════════════════════════════════════════════════════
function OrderSection() {
  return (
    <section className="px-6 md:px-12 py-28 border-t" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
      <div className="relative border overflow-hidden p-10 md:p-16 max-w-3xl"
        style={{ borderColor: 'rgba(255,77,0,0.2)', background: '#0a0a0a' }}>

        {/* Accent line */}
        <div className="absolute top-0 left-0 right-0 h-px"
          style={{ background: 'linear-gradient(90deg, #FF4D00, transparent 60%)' }} />
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 70% 60% at 10% 30%, rgba(255,77,0,0.06), transparent)' }} />

        <div className="relative z-10">
          <Reveal>
            <div className="font-mono text-[9px] tracking-[5px] text-[#FF4D00]/60 uppercase mb-4">// Order Now</div>
          </Reveal>
          <Reveal delay={0.06}>
            <div className="font-mono text-4xl md:text-5xl font-bold tracking-tight mb-2" style={{ color: '#F5F5F5' }}>
              $89
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="font-mono text-[11px] tracking-[2px] text-white/30 uppercase mb-8">
              Batch 01 · 4 units · Ships in 2–3 weeks
            </p>
          </Reveal>
          <Reveal delay={0.14}>
            <div className="flex flex-wrap gap-4 items-center mb-8">
              <OrderBtn />
              <div className="font-mono text-[8px] tracking-[2px] text-white/22 uppercase">
                Secure checkout via Square
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.18}>
            <div className="flex flex-wrap gap-3">
              {['■ Square Encrypted', '↩ No Hidden Fees', '⚡ SSL Secured'].map(t => (
                <div key={t} className="border px-3 py-1.5 font-mono text-[7px] tracking-[2px] text-white/22 uppercase"
                  style={{ borderColor: 'rgba(255,255,255,0.07)' }}>{t}</div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
//  FOOTER
// ═══════════════════════════════════════════════════════════════════════════════
function Footer() {
  return (
    <footer className="border-t px-6 md:px-12 py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
      style={{ borderColor: 'rgba(255,255,255,0.05)', background: '#080808' }}>
      <div className="font-mono text-[8px] tracking-[4px] text-white/18">
        © {new Date().getFullYear()} NIGHT INCORPORATED — CLIKEY
      </div>
      <div className="flex items-center gap-5">
        <a href="https://2amcases.com" target="_blank" rel="noopener noreferrer"
          className="font-mono text-[8px] tracking-[2px] text-white/18 hover:text-white/50 transition-colors uppercase">
          2AM Cases ↗
        </a>
        <a href="https://night.inc" target="_blank" rel="noopener noreferrer"
          className="font-mono text-[8px] tracking-[2px] text-white/18 hover:text-[#FF4D00]/60 transition-colors uppercase">
          Night.inc ↗
        </a>
      </div>
    </footer>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
//  ROOT
// ═══════════════════════════════════════════════════════════════════════════════
export default function App() {
  return (
    <div style={{ background: '#080808', minHeight: '100vh' }}>
      <Noise />
      <Nav />
      <main>
        <Hero />
        <Manifesto />
        <SpecSection />
        <OrderSection />
      </main>
      <Footer />
    </div>
  )
}
