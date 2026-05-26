import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { skillCategories, type SkillCategory } from '../data/content'

const fadeUp = {
  hidden: { opacity: 0, y: 35 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
}
const tagVariant = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.25 } },
}

const CategoryIcon = ({ icon }: { icon: SkillCategory['icon'] }) => {
  const cls = 'w-5 h-5 text-accent'
  switch (icon) {
    case 'cpu':
      return (
        <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3H7a2 2 0 00-2 2v2M9 3h6M9 3v18m6-18h2a2 2 0 012 2v2m-4-4v18m4-4h-2m2 0v-2a2 2 0 00-2-2M3 9v6m0-6H1m2 0h18m0 0h2m-2 0v6m0 0h2m-2 0H3m16 0v2a2 2 0 01-2 2" />
        </svg>
      )
    case 'server':
      return (
        <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
        </svg>
      )
    case 'code':
      return (
        <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      )
    case 'cloud':
      return (
        <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
        </svg>
      )
    case 'tools':
      return (
        <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      )
  }
}

export default function Skills() {
  const { t, i18n } = useTranslation()
  const lang = i18n.language as 'ru' | 'en' | 'kz'

  return (
    <section id="skills" className="py-16 sm:py-20 bg-surface/20">
      <div className="section-container">
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}>
          <motion.div variants={fadeUp} className="mb-10">
            <p className="text-accent text-xs font-jakarta font-medium uppercase tracking-widest mb-2">
              {t('skills.subtitle')}
            </p>
            <h2 className="section-title">{t('skills.title')}</h2>
            <div className="accent-line" />
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {skillCategories.map((category) => (
              <motion.div key={category.id} variants={fadeUp} className="card card-hover">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center flex-shrink-0">
                    <CategoryIcon icon={category.icon} />
                  </div>
                  <h3 className="font-clash text-base font-medium text-white">
                    {category.name[lang] || category.name.en}
                  </h3>
                </div>
                <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="flex flex-wrap gap-1.5">
                  {category.skills.map((skill) => (
                    <motion.span key={skill} variants={tagVariant} className="skill-tag cursor-default text-xs">
                      {skill}
                    </motion.span>
                  ))}
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Proficiency bars */}
          <motion.div variants={fadeUp} className="mt-8 card">
            <h3 className="font-clash text-lg font-medium text-white mb-5">Core Stack</h3>
            <div className="space-y-3.5">
              {[
                { name: 'React / TypeScript', pct: 90 },
                { name: 'C# / .NET', pct: 85 },
                { name: 'Python / FastAPI', pct: 80 },
                { name: 'LLM / RAG Systems', pct: 78 },
                { name: 'Docker / Linux', pct: 72 },
              ].map(({ name, pct }) => (
                <div key={name}>
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-300 font-jakarta text-sm">{name}</span>
                    <span className="text-accent font-jakarta text-sm font-medium">{pct}%</span>
                  </div>
                  <div className="h-1 bg-surface-2 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-accent to-accent-light rounded-full"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${pct}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, ease: 'easeOut', delay: 0.1 }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
