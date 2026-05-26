import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { experiences } from '../data/content'

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
}

function formatPeriodByLang(start: string, end: string | null, presentLabel: string, lang: string) {
  const langIndex = lang === 'ru' ? 0 : lang === 'en' ? 1 : 2
  const startParts = start.split(' / ')
  const endParts = end ? end.split(' / ') : null
  const startLabel = startParts[langIndex] || startParts[0]
  const endLabel = endParts ? (endParts[langIndex] || endParts[0]) : presentLabel
  return `${startLabel} — ${endLabel}`
}

export default function Experience() {
  const { t, i18n } = useTranslation()
  const lang = i18n.language as 'ru' | 'en' | 'kz'
  const present = t('experience.present')

  return (
    <section id="experience" className="py-16 sm:py-20 bg-surface/30">
      <div className="section-container">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {/* Header */}
          <motion.div variants={fadeUp} className="mb-10">
            <p className="text-accent text-sm font-jakarta font-medium uppercase tracking-widest mb-3">
              {t('experience.subtitle')}
            </p>
            <h2 className="section-title">{t('experience.title')}</h2>
            <div className="accent-line" />
          </motion.div>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-4 sm:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-accent/50 via-accent/20 to-transparent" />

            <div className="space-y-8">
              {experiences.map((exp, idx) => (
                <motion.div
                  key={exp.id}
                  variants={fadeUp}
                  className="relative pl-12 sm:pl-20"
                >
                  {/* Dot */}
                  <div className="absolute left-2 sm:left-6 top-6 flex items-center justify-center">
                    <div className="w-5 h-5 rounded-full bg-accent border-4 border-bg shadow-lg shadow-accent/30" />
                    {idx === 0 && (
                      <div className="absolute w-8 h-8 rounded-full bg-accent/20 animate-ping" />
                    )}
                  </div>

                  {/* Card */}
                  <div className="card card-hover">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                      <div>
                        <h3 className="font-clash text-xl font-semibold text-white">
                          {exp.company[lang] || exp.company.en}
                        </h3>
                        <p className="text-accent font-jakarta font-medium mt-0.5">{exp.role}</p>
                      </div>

                      <div className="flex-shrink-0">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-jakarta font-medium ${
                          exp.period.end === null
                            ? 'bg-accent/15 text-accent border border-accent/30'
                            : 'bg-surface-2 text-gray-400 border border-gray-700'
                        }`}>
                          {exp.period.end === null && (
                            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                          )}
                          {formatPeriodByLang(exp.period.start, exp.period.end, present, lang)}
                        </span>
                      </div>
                    </div>

                    {/* Stack */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {exp.stack.map((tech) => (
                        <span key={tech} className="skill-tag text-xs">{tech}</span>
                      ))}
                    </div>

                    {/* Achievements */}
                    {exp.achievements[lang]?.length > 0 && (
                      <div>
                        <p className="text-gray-500 text-xs font-jakarta uppercase tracking-wider mb-2">
                          {t('experience.achievements')}
                        </p>
                        <ul className="space-y-1.5">
                          {exp.achievements[lang].map((ach, i) => (
                            <li key={i} className="flex items-start gap-2 text-gray-400 font-jakarta text-sm">
                              <span className="text-accent mt-1 flex-shrink-0">›</span>
                              {ach}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
