import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'

const LANGS = ['KZ', 'RU', 'EN'] as const
type Lang = (typeof LANGS)[number]

const NAV_ITEMS = [
  { key: 'about', href: '#about' },
  { key: 'experience', href: '#experience' },
  { key: 'projects', href: '#projects' },
  { key: 'skills', href: '#skills' },
  { key: 'video', href: '#video' },
  { key: 'certificates', href: '#certificates' },
  { key: 'contact', href: '#contact' },
] as const

export default function Navbar() {
  const { t, i18n } = useTranslation()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('')

  const currentLang = (i18n.language.toUpperCase() as Lang) in { KZ: 1, RU: 1, EN: 1 }
    ? (i18n.language.toUpperCase() as Lang)
    : 'KZ'

  const switchLang = (lang: string) => {
    const l = lang.toLowerCase()
    i18n.changeLanguage(l)
    localStorage.setItem('portfolio-lang', l)
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id)
        })
      },
      { threshold: 0.3, rootMargin: '-80px 0px -20% 0px' }
    )
    document.querySelectorAll('section[id]').forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  const scrollTo = (href: string) => {
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
    setOpen(false)
  }

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-bg/85 backdrop-blur-xl border-b border-gray-800/40' : 'bg-transparent'
        }`}
      >
        <div className="section-container flex items-center justify-between h-14">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="font-clash text-base font-semibold text-white hover:text-accent transition-colors cursor-none"
          >
            Omar<span className="text-accent">.</span>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {NAV_ITEMS.map(({ key, href }) => (
              <button
                key={key}
                onClick={() => scrollTo(href)}
                className={`px-3 py-1.5 text-sm font-jakarta rounded-lg transition-all duration-200 cursor-none ${
                  active === href.slice(1)
                    ? 'text-accent bg-accent/10'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {t(`nav.${key}`)}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            {/* Lang switcher — KZ / RU / EN */}
            <div className="flex items-center gap-0.5 bg-surface border border-gray-800 rounded-lg p-0.5">
              {LANGS.map((lang) => (
                <button
                  key={lang}
                  onClick={() => switchLang(lang)}
                  className={`px-2.5 py-1 text-xs font-jakarta font-medium rounded-md transition-all duration-200 cursor-none ${
                    currentLang === lang
                      ? 'bg-accent text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setOpen(!open)}
              className="lg:hidden flex flex-col gap-1.5 p-2 cursor-none"
              aria-label="Toggle menu"
            >
              <span className={`block w-5 h-0.5 bg-white transition-all duration-300 origin-center ${open ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`block w-5 h-0.5 bg-white transition-all duration-300 ${open ? 'opacity-0 scale-x-0' : ''}`} />
              <span className={`block w-5 h-0.5 bg-white transition-all duration-300 origin-center ${open ? '-rotate-45 -translate-y-2' : ''}`} />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed inset-0 z-40 bg-bg/96 backdrop-blur-xl flex flex-col items-center justify-center"
          >
            <nav className="flex flex-col items-center gap-5">
              {NAV_ITEMS.map(({ key, href }, i) => (
                <motion.button
                  key={key}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => scrollTo(href)}
                  className="font-clash text-2xl font-medium text-gray-300 hover:text-accent transition-colors cursor-none"
                >
                  {t(`nav.${key}`)}
                </motion.button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
