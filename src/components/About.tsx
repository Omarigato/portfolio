import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { personalInfo } from '../data/content'

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
}
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } },
}

const FactIcons = {
  age: (
    <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  ),
  location: (
    <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  experience: (
    <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
  projects: (
    <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
    </svg>
  ),
}

const FACTS = ['age', 'location', 'experience', 'projects'] as const

export default function About() {
  const { t, i18n } = useTranslation()
  const lang = i18n.language as 'ru' | 'en' | 'kz'
  const [photoError, setPhotoError] = useState(false)

  return (
    <section id="about" className="py-16 sm:py-20">
      <div className="section-container">
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}>
          <motion.div variants={fadeUp} className="mb-12">
            <p className="text-accent text-xs font-jakarta font-medium uppercase tracking-widest mb-2">
              {t('about.subtitle')}
            </p>
            <h2 className="section-title">{t('about.title')}</h2>
            <div className="accent-line" />
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Photo */}
            <motion.div variants={fadeUp} className="relative">
              <div className="relative w-full max-w-xs mx-auto lg:mx-0">
                <div className="absolute -inset-2 bg-gradient-to-br from-accent/20 to-transparent rounded-3xl blur-sm" />
                <div className="relative aspect-[4/5] bg-surface-2 rounded-2xl overflow-hidden border border-gray-800">
                  {!photoError ? (
                    <img
                      src="/images/photo.jpg"
                      alt={personalInfo.name[lang]}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      onError={() => setPhotoError(true)}
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center gap-3">
                      <svg className="w-16 h-16 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
                      </svg>
                      <p className="text-gray-600 text-xs font-jakarta">public/images/photo.jpg</p>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-bg/40 to-transparent pointer-events-none" />
                </div>

                <div className="absolute -bottom-3 -right-3 glass px-3 py-1.5 rounded-xl border border-gray-800">
                  <p className="text-accent font-clash text-xl font-semibold leading-none">2+</p>
                  <p className="text-gray-500 text-xs font-jakarta">yrs exp.</p>
                </div>
              </div>
            </motion.div>

            {/* Text */}
            <motion.div variants={stagger} className="space-y-5">
              <motion.div variants={fadeUp}>
                <p className="text-gray-500 text-xs font-jakarta uppercase tracking-wider mb-1">
                  {personalInfo.fullName[lang]}
                </p>
                <p className="text-gray-300 font-jakarta text-base leading-relaxed">
                  {t('about.description')}
                </p>
              </motion.div>

              <motion.div variants={fadeUp} className="flex flex-wrap gap-2">
                {['Python', 'C#', 'React', 'TypeScript', 'LLM', 'RAG'].map((tech) => (
                  <span key={tech} className="skill-tag">{tech}</span>
                ))}
              </motion.div>

              <motion.div variants={fadeUp}>
                <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="btn-outline text-sm cursor-none">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                  github.com/Omarigato
                </a>
              </motion.div>
            </motion.div>
          </div>

          {/* Facts */}
          <motion.div variants={stagger} className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-10">
            {FACTS.map((key) => (
              <motion.div key={key} variants={fadeUp} className="card card-hover flex items-center gap-3 p-4">
                <div className="w-9 h-9 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center flex-shrink-0">
                  {FactIcons[key]}
                </div>
                <div className="min-w-0">
                  <p className="font-jakarta text-sm font-medium text-white truncate">
                    {t(`about.facts.${key}`)}
                  </p>
                  <p className="text-gray-600 text-xs font-jakarta">
                    {t(`about.factsLabels.${key}`)}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
