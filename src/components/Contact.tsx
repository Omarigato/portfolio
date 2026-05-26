import { useState, type FormEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { personalInfo } from '../data/content'

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const CONTACTS = [
  {
    key: 'whatsapp',
    href: personalInfo.contacts.whatsappLink,
    label: personalInfo.contacts.whatsapp,
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ),
    color: 'text-green-400 border-green-400/30 bg-green-400/5 hover:bg-green-400/10',
  },
  {
    key: 'telegram',
    href: personalInfo.contacts.telegramLink,
    label: personalInfo.contacts.telegram,
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.17 13.696 4.23 12.8c-.643-.204-.657-.643.136-.953l11.247-4.337c.535-.194 1.003.13.831.711z" />
      </svg>
    ),
    color: 'text-[#2AABEE] border-[#2AABEE]/30 bg-[#2AABEE]/5 hover:bg-[#2AABEE]/10',
  },
  {
    key: 'instagram',
    href: personalInfo.contacts.instagramLink,
    label: personalInfo.contacts.instagram,
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
    color: 'text-pink-400 border-pink-400/30 bg-pink-400/5 hover:bg-pink-400/10',
  },
  {
    key: 'email',
    href: `mailto:${personalInfo.contacts.email}`,
    label: personalInfo.contacts.email,
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    color: 'text-accent border-accent/30 bg-accent/5 hover:bg-accent/10',
  },
]

export default function Contact() {
  const { t } = useTranslation()
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    // Simulate send
    await new Promise((r) => setTimeout(r, 1200))
    setStatus('success')
    setForm({ name: '', email: '', message: '' })
    setTimeout(() => setStatus('idle'), 4000)
  }

  return (
    <section id="contact" className="py-16 sm:py-20">
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
              {t('contact.subtitle')}
            </p>
            <h2 className="section-title">{t('contact.title')}</h2>
            <div className="accent-line" />
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Left: Contact info */}
            <motion.div variants={stagger} className="space-y-4">
              {CONTACTS.map(({ key, href, label, icon, color }) => (
                <motion.a
                  key={key}
                  variants={fadeUp}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-4 p-4 rounded-xl border transition-all duration-200 cursor-none group ${color}`}
                >
                  <div className="flex-shrink-0">{icon}</div>
                  <div>
                    <p className="text-xs text-gray-500 font-jakarta uppercase tracking-wider mb-0.5">
                      {t(`contact.info.${key}`)}
                    </p>
                    <p className="text-white font-jakarta text-sm font-medium">{label}</p>
                  </div>
                  <svg className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </motion.a>
              ))}

              {/* GitHub */}
              <motion.a
                variants={fadeUp}
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-xl border border-gray-700/50 bg-surface hover:border-gray-600 transition-all duration-200 cursor-none group"
              >
                <div className="text-gray-400">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-jakarta uppercase tracking-wider mb-0.5">
                    {t('contact.info.github')}
                  </p>
                  <p className="text-white font-jakarta text-sm font-medium">github.com/Omarigato</p>
                </div>
                <svg className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </motion.a>
            </motion.div>

            {/* Right: Form */}
            <motion.div variants={fadeUp}>
              <form onSubmit={handleSubmit} className="card space-y-4">
                <div>
                  <label className="block text-gray-400 font-jakarta text-sm mb-2">
                    {t('contact.form.name')}
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Omar Akim"
                    className="w-full bg-surface-2 border border-gray-700 rounded-xl px-4 py-3 text-white font-jakarta text-sm placeholder-gray-600 focus:outline-none focus:border-accent/60 transition-colors cursor-none"
                  />
                </div>

                <div>
                  <label className="block text-gray-400 font-jakarta text-sm mb-2">
                    {t('contact.form.email')}
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="hello@example.com"
                    className="w-full bg-surface-2 border border-gray-700 rounded-xl px-4 py-3 text-white font-jakarta text-sm placeholder-gray-600 focus:outline-none focus:border-accent/60 transition-colors cursor-none"
                  />
                </div>

                <div>
                  <label className="block text-gray-400 font-jakarta text-sm mb-2">
                    {t('contact.form.message')}
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Hi Omar, I have an interesting project..."
                    className="w-full bg-surface-2 border border-gray-700 rounded-xl px-4 py-3 text-white font-jakarta text-sm placeholder-gray-600 focus:outline-none focus:border-accent/60 transition-colors resize-none cursor-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status !== 'idle'}
                  className="w-full btn-primary justify-center py-3.5 disabled:opacity-70"
                >
                  {status === 'sending' ? (
                    <>
                      <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      {t('contact.form.sending')}
                    </>
                  ) : status === 'success' ? (
                    <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {t('contact.form.success')}
                    </>
                  ) : (
                    <>
                      {t('contact.form.send')}
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
