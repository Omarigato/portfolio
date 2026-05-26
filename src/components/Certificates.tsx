import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { certificates } from '../data/content'

const fadeUp = {
  hidden: { opacity: 0, y: 35 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
}

const ISSUER_COLORS: Record<string, string> = {
  'Vanderbilt University': 'from-purple-500/15 to-purple-600/5',
  'DeepLearning.AI': 'from-orange-500/15 to-orange-600/5',
  'Coursera': 'from-blue-500/15 to-blue-600/5',
  'Linux Foundation': 'from-yellow-500/15 to-yellow-600/5',
}

const IssuerIcon = ({ issuer }: { issuer: string }) => {
  const cls = 'w-5 h-5'
  if (issuer === 'Vanderbilt University' || issuer.includes('University')) {
    return (
      <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
      </svg>
    )
  }
  if (issuer === 'DeepLearning.AI') {
    return (
      <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3H7a2 2 0 00-2 2v2M9 3h6M9 3v18m6-18h2a2 2 0 012 2v2m-4-4v18m4-4h-2m2 0v-2a2 2 0 00-2-2M3 9v6m18-6v6" />
      </svg>
    )
  }
  if (issuer === 'Linux Foundation') {
    return (
      <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    )
  }
  return (
    <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  )
}

export default function Certificates() {
  const { t } = useTranslation()

  return (
    <section id="certificates" className="py-16 sm:py-20 bg-surface/20">
      <div className="section-container">
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}>
          <motion.div variants={fadeUp} className="mb-10">
            <p className="text-accent text-xs font-jakarta font-medium uppercase tracking-widest mb-2">
              {t('certificates.subtitle')}
            </p>
            <h2 className="section-title">{t('certificates.title')}</h2>
            <div className="accent-line" />
          </motion.div>

          {/* Stats */}
          <motion.div variants={fadeUp} className="flex gap-6 mb-8">
            {[
              { val: certificates.length, label: 'Certificates' },
              { val: '4', label: 'Institutions' },
              { val: '2023–25', label: 'Period' },
            ].map(({ val, label }) => (
              <div key={label} className="text-center">
                <p className="font-clash text-3xl font-semibold text-gradient">{val}</p>
                <p className="text-gray-500 text-xs font-jakarta mt-0.5">{label}</p>
              </div>
            ))}
          </motion.div>

          <motion.div variants={stagger} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {certificates.map((cert) => {
              const gradient = ISSUER_COLORS[cert.issuer] || 'from-accent/15 to-accent/5'
              return (
                <motion.div
                  key={cert.id}
                  variants={fadeUp}
                  whileHover={{ y: -3 }}
                  transition={{ duration: 0.2 }}
                  className="card card-hover group relative overflow-hidden"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                  <div className="relative">
                    <div className="flex items-start justify-between mb-3">
                      <div className="w-9 h-9 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
                        <IssuerIcon issuer={cert.issuer} />
                      </div>
                      <span className="text-xs font-jakarta text-gray-600 bg-surface-2 px-2 py-0.5 rounded-full border border-gray-800">
                        {cert.year}
                      </span>
                    </div>
                    <h3 className="font-jakarta text-sm font-semibold text-white mb-1.5 leading-tight group-hover:text-accent transition-colors">
                      {cert.name}
                    </h3>
                    <p className="text-gray-500 text-xs font-jakarta mb-4">{cert.issuer}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-xs text-green-400 font-jakarta">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Verified
                      </div>
                      <a
                        href={cert.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-accent hover:text-accent-light font-jakarta flex items-center gap-1 cursor-none transition-colors"
                      >
                        {t('certificates.viewCertificate')}
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
