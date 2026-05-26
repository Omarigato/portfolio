import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { projects, type Project } from '../data/content'

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

function ProjectCard({ project, lang }: { project: Project; lang: 'ru' | 'en' | 'kz' }) {
  const { t } = useTranslation()
  const isLive = project.type === 'live'

  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="card card-hover group flex flex-col h-full"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-2">
          {isLive ? (
            <div className="w-8 h-8 rounded-lg bg-accent/15 border border-accent/30 flex items-center justify-center">
              <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
            </div>
          ) : (
            <div className="w-8 h-8 rounded-lg bg-gray-800 border border-gray-700 flex items-center justify-center">
              <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
            </div>
          )}
        </div>

        {isLive && (
          <span className="inline-flex items-center gap-1 text-xs text-green-400 font-jakarta">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            Live
          </span>
        )}
      </div>

      {/* Name */}
      <h3 className="font-clash text-xl font-semibold text-white mb-2 group-hover:text-accent transition-colors">
        {project.name}
      </h3>

      {/* Description */}
      <p className="text-gray-400 font-jakarta text-sm leading-relaxed flex-1 mb-4">
        {project.description[lang] || project.description.en}
      </p>

      {/* Stack */}
      <div className="flex flex-wrap gap-1.5 mb-5">
        {project.stack.map((tech) => (
          <span key={tech} className="px-2 py-0.5 bg-surface-2 rounded text-xs text-gray-500 font-jakarta border border-gray-800">
            {tech}
          </span>
        ))}
      </div>

      {/* Actions */}
      <div className="flex gap-3 mt-auto">
        {isLive ? (
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-sm py-2 px-4 cursor-none flex-1 justify-center"
          >
            {t('projects.viewProject')}
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        ) : (
          <a
            href={project.github || project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline text-sm py-2 px-4 cursor-none flex-1 justify-center"
          >
            {t('projects.viewCode')}
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
          </a>
        )}
      </div>
    </motion.div>
  )
}

export default function Projects() {
  const { t, i18n } = useTranslation()
  const lang = i18n.language as 'ru' | 'en' | 'kz'

  const liveProjects = projects.filter((p) => p.type === 'live')
  const githubProjects = projects.filter((p) => p.type === 'github')

  return (
    <section id="projects" className="py-16 sm:py-20">
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
              {t('projects.subtitle')}
            </p>
            <h2 className="section-title">{t('projects.title')}</h2>
            <div className="accent-line" />
          </motion.div>

          {/* Live projects */}
          <motion.div variants={fadeUp} className="mb-4">
            <h3 className="font-jakarta text-gray-400 text-sm font-medium uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              {t('projects.liveProjects')}
            </h3>
          </motion.div>

          <motion.div
            variants={stagger}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-14"
          >
            {liveProjects.map((p) => (
              <ProjectCard key={p.id} project={p} lang={lang} />
            ))}
          </motion.div>

          {/* GitHub projects */}
          <motion.div variants={fadeUp} className="mb-4">
            <h3 className="font-jakarta text-gray-400 text-sm font-medium uppercase tracking-wider flex items-center gap-2">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
              {t('projects.githubProjects')}
            </h3>
          </motion.div>

          <motion.div
            variants={stagger}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {githubProjects.map((p) => (
              <ProjectCard key={p.id} project={p} lang={lang} />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
