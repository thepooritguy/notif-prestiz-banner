'use client'

import { useEffect, useRef, useState } from 'react'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import Image from 'next/image'

export default function Page() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [heroScrollProgress, setHeroScrollProgress] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsVisible(true)

    const handleScroll = () => {
      if (!containerRef.current) return

      const scrollTop = window.scrollY
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight
      const scrollPercent = docHeight > 0 ? scrollTop / docHeight : 0
      const heroProgress = Math.min(scrollTop / (window.innerHeight * 0.65), 1)

      setScrollProgress(Math.min(scrollPercent, 1))
      setHeroScrollProgress(heroProgress)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div ref={containerRef} className="overflow-hidden">
      {/* Header Bar with Progress */}
      <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-card">
        <div
          className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-300"
          style={{ width: `${scrollProgress * 100}%` }}
        />
      </div>

      {/* Hero banner */}
      <section className="relative flex items-start bg-background pb-20 md:pb-28">
        <div
          className="relative z-10 w-full transition-all duration-700 ease-out"
          style={{ paddingInline: heroScrollProgress > 0.08 ? '1rem' : '0' }}
        >
          <div
            className="mx-auto w-full transition-all duration-700 ease-out"
            style={{
              maxWidth: heroScrollProgress > 0.08 ? '80rem' : '100%',
              padding: heroScrollProgress > 0.08 ? '3rem' : 'clamp(2rem, 6vw, 5rem)',
              background: 'linear-gradient(135deg, #263b5e 0%, #17324f 52%, #314d70 100%)',
              borderRadius: heroScrollProgress > 0.08 ? '0.75rem' : '0',
            }}
          >
            <div
              className={`space-y-8 will-change-transform ${
                isVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-8'
              }`}
              style={{
                transform: `translateY(${-heroScrollProgress * 48}px) scale(${1 - heroScrollProgress * 0.04})`,
                opacity: 1 - heroScrollProgress * 0.65,
                transition: heroScrollProgress === 0
                  ? 'transform 500ms ease, opacity 500ms ease'
                  : 'transform 120ms linear, opacity 120ms linear',
              }}
            >
              {/* Migration notice */}
              <p
                className="text-sm md:text-base font-semibold text-accent uppercase transition-all duration-300"
                style={{
                  letterSpacing: `${0.1 + heroScrollProgress * 0.12}em`,
                  transform: `translateX(${heroScrollProgress * 12}px)`,
                }}
              >
                Official Website Update
              </p>

              <a
                href="https://prestiz.com.ph"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit the new Prestiz website"
                className="block w-fit rounded-lg bg-black shadow-lg shadow-black/20 transition-transform duration-300 hover:scale-[1.02]"
              >
                <Image
                  src="/logo.webp"
                  alt="Prestiz"
                  width={2048}
                  height={344}
                  priority
                  className="h-auto w-64 rounded-lg sm:w-80 md:w-96"
                />
              </a>

              {/* Main Heading */}
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-balance leading-tight text-white">
                We&apos;ve moved
              </h1>

              {/* Description */}
              <p className="text-lg md:text-xl text-slate-300 max-w-2xl">
                Our official website has moved from prestiztv.com to prestiz.com.ph. Please update your bookmark and continue your journey with us at our new home.
              </p>

              <div className="flex max-w-2xl flex-col gap-3 rounded-xl border border-white/15 bg-white/10 p-5 backdrop-blur-sm sm:flex-row sm:items-center">
                <span className="text-slate-300 line-through decoration-slate-400">
                  prestiztv.com
                </span>
                <ArrowRight className="text-accent sm:mx-2" size={22} />
                <span className="text-xl font-semibold text-white">
                  prestiz.com.ph
                </span>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-8">
                <button
                  onClick={() => {
                    contentRef.current?.scrollIntoView({ behavior: 'smooth' })
                  }}
                  className="inline-flex items-center gap-2 px-8 py-4 border-2 border-white/30 hover:border-white/60 text-white rounded-lg font-semibold transition-all duration-300 hover:bg-white/5"
                >
                  What You Need to Know
                  <ArrowRight size={20} />
                </button>
                <a
                  href="https://prestiz.com.ph"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-accent hover:bg-accent/90 text-accent-foreground rounded-lg font-semibold transition-all duration-300 hover:gap-3"
                >
                  Visit Our New Website
                  <ArrowRight size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Migration details */}
      <section
        ref={contentRef}
        className="relative py-20 px-4 transition-all duration-700"
        style={{
          width: scrollProgress > 0.15 ? '100%' : 'auto',
          maxWidth: scrollProgress > 0.15 ? 'none' : '80rem',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
      >
        <div className="max-w-7xl mx-auto w-full">
          {/* Section Title */}
          <div
            className={`mb-16 space-y-4 transition-all duration-700 ${
              scrollProgress > 0.15 ? 'animate-fade-in-up' : 'opacity-0'
            }`}
          >
            <h2 className="text-4xl md:text-5xl font-bold">
              A new address, the same Prestiz
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Only our web address has changed. You can continue discovering Prestiz products and information on our official new website.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: 'Our New Official Address',
                description:
                  'Find us now at prestiz.com.ph — the new online home of Prestiz.',
                delay: 0.2,
              },
              {
                title: 'Same Trusted Brand',
                description:
                  'Our products, service, and commitment to quality remain unchanged.',
                delay: 0.3,
              },
              {
                title: 'Update Your Bookmark',
                description:
                  'Replace prestiztv.com with prestiz.com.ph in your saved links.',
                delay: 0.4,
              },
            ].map((feature, index) => (
              <div
                key={index}
                className={`group p-6 rounded-lg border border-primary/20 bg-card/50 backdrop-blur hover:border-primary/50 transition-all duration-500 cursor-pointer hover:shadow-lg hover:shadow-primary/20 ${
                  scrollProgress > 0.15 ? 'animate-fade-in-up' : 'opacity-0'
                }`}
                style={{
                  animationDelay: `${feature.delay}s`,
                  transitionDelay: `${feature.delay}s`,
                }}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex-shrink-0">
                    <CheckCircle2
                      size={24}
                      className="text-accent group-hover:scale-110 transition-transform"
                    />
                  </div>
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Footer Section */}
      <section className="relative py-20 px-4 border-t border-primary/10">
        <div className="max-w-7xl mx-auto w-full">
          <div
            className={`space-y-8 text-center transition-all duration-700 ${
              scrollProgress > 0.5 ? 'animate-fade-in-up' : 'opacity-0'
            }`}
          >
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-bold">
                Ready to continue?
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Visit our new official website for the latest Prestiz products and updates.
              </p>
            </div>

            <a
              href="https://prestiz.com.ph"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-accent hover:bg-accent/90 text-accent-foreground rounded-lg font-semibold transition-all duration-300 hover:gap-3"
            >
              Continue to prestiz.com.ph
              <ArrowRight size={20} />
            </a>
          </div>
        </div>
      </section>

      <footer className="relative py-8 px-4 border-t border-primary/10 text-center text-sm text-muted-foreground">
        <p>© 2026 Prestiz. Our official website is now prestiz.com.ph.</p>
      </footer>
    </div>
  )
}
