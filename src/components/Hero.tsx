import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { personalInfo } from '../data/content'

const ROLES = [
  'Full Stack Developer',
  'AI Engineer',
  'React Developer',
  '.NET Developer',
  'Python Developer',
]

function TypedRole() {
  const [index, setIndex] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const target = ROLES[index]
    let timeout: ReturnType<typeof setTimeout>
    if (!deleting && displayed.length < target.length) {
      timeout = setTimeout(() => setDisplayed(target.slice(0, displayed.length + 1)), 75)
    } else if (!deleting && displayed.length === target.length) {
      timeout = setTimeout(() => setDeleting(true), 2000)
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 35)
    } else {
      setDeleting(false)
      setIndex((i) => (i + 1) % ROLES.length)
    }
    return () => clearTimeout(timeout)
  }, [displayed, deleting, index])

  return (
    <span className="text-gradient">
      {displayed}
      <span className="animate-pulse text-accent">|</span>
    </span>
  )
}

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}
const item = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
}

export default function Hero() {
  const { t, i18n } = useTranslation()
  const lang = i18n.language as 'ru' | 'en' | 'kz'
  const name = personalInfo.name[lang]
  const [photoError, setPhotoError] = useState(false)

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-14">
      <div className="absolute inset-0 bg-gradient-radial from-accent/4 via-transparent to-transparent pointer-events-none" />

      <div className="section-container w-full py-12">
        <div className="grid lg:grid-cols-[1fr_auto] gap-10 items-center">
          {/* Left: Text */}
          <motion.div variants={container} initial="hidden" animate="visible">
            <motion.div variants={item} className="mb-5">
              <span className="inline-flex items-center gap-2 px-3 py-1 bg-accent/10 border border-accent/25 rounded-full text-accent text-xs font-jakarta">
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                {t('hero.greeting')} — Omarigato
              </span>
            </motion.div>

            <motion.h1
              variants={item}
              className="font-clash text-5xl sm:text-6xl lg:text-7xl font-semibold text-white leading-[1.05] mb-3"
            >
              {name}
            </motion.h1>

            <motion.div
              variants={item}
              className="font-clash text-2xl sm:text-3xl lg:text-4xl font-medium mb-5 h-12 sm:h-14 flex items-center"
            >
              <TypedRole />
            </motion.div>

            <motion.p variants={item} className="text-gray-400 font-jakarta text-base sm:text-lg max-w-xl leading-relaxed mb-8">
              {t('hero.description')}
            </motion.p>

            <motion.div variants={item} className="flex flex-wrap gap-3 mb-8">
              <a href="#" className="btn-primary">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                {t('hero.downloadCV')}
              </a>
              <button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-outline"
              >
                {t('hero.contactMe')}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </motion.div>

            {/* Social links */}
            <motion.div variants={item} className="flex items-center gap-3">
              {[
                {
                  href: personalInfo.github, label: 'GitHub',
                  icon: <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" /></svg>,
                },
                {
                  href: personalInfo.contacts.telegramLink, label: 'Telegram',
                  icon: <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.17 13.696 4.23 12.8c-.643-.204-.657-.643.136-.953l11.247-4.337c.535-.194 1.003.13.831.711z" /></svg>,
                },
                {
                  href: personalInfo.contacts.instagramLink, label: 'Instagram',
                  icon: <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>,
                },
              ].map(({ href, label, icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 flex items-center justify-center rounded-xl bg-surface border border-gray-800 text-gray-400 hover:text-accent hover:border-accent/40 hover:bg-accent/5 transition-all duration-200 cursor-none"
                >
                  {icon}
                </a>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="hidden lg:block"
          >
            <div className="relative w-64 xl:w-72">
              <div className="absolute -inset-2 bg-gradient-to-br from-accent/25 to-transparent rounded-3xl blur-sm" />
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden border border-gray-800 bg-surface-2">
                {!photoError ? (
                  <img
                    src="/images/photo.jpg"
                    alt={name}
                    className="w-full h-full object-cover"
                    loading="eager"
                    onError={() => setPhotoError(true)}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-surface-2">
                    <div className="text-center">
                      <svg className="w-16 h-16 text-gray-700 mx-auto mb-3" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
                      </svg>
                      <p className="text-gray-600 text-xs font-jakarta">photo.jpg</p>
                    </div>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-bg/50 to-transparent pointer-events-none" />
              </div>

              {/* Status badge */}
              <div className="absolute -bottom-3 -left-3 glass px-3 py-1.5 rounded-xl border border-gray-800 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-xs font-jakarta text-gray-300">Open to work</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
          className="w-4 h-7 border border-gray-700 rounded-full flex items-start justify-center pt-1"
        >
          <div className="w-0.5 h-1.5 bg-accent rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  )
}
