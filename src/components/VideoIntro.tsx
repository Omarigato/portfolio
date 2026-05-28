import { useState, useRef, useCallback, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { videoScript } from '../data/videoScript'

function formatTime(s: number) {
  const m = Math.floor(s / 60)
  const sec = Math.floor(s % 60)
  return `${m}:${sec.toString().padStart(2, '0')}`
}

function VideoModal({ lang, onClose }: { lang: string; onClose: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const [playing, setPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [showControls, setShowControls] = useState(true)
  const [videoError, setVideoError] = useState(false)
  const hideTimer = useRef<ReturnType<typeof setTimeout>>()

  const videoSrc = `/videos/video-${lang}.mp4`

  const resetHideTimer = useCallback(() => {
    setShowControls(true)
    clearTimeout(hideTimer.current)
    hideTimer.current = setTimeout(() => {
      if (playing) setShowControls(false)
    }, 3000)
  }, [playing])

  useEffect(() => {
    return () => clearTimeout(hideTimer.current)
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') skip(5)
      if (e.key === 'ArrowLeft') skip(-5)
      if (e.key === ' ') { e.preventDefault(); togglePlay() }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  const togglePlay = () => {
    if (!videoRef.current) return
    if (playing) { videoRef.current.pause(); setPlaying(false) }
    else { videoRef.current.play(); setPlaying(true) }
    resetHideTimer()
  }

  const skip = (sec: number) => {
    if (!videoRef.current) return
    videoRef.current.currentTime = Math.max(0, Math.min(duration, videoRef.current.currentTime + sec))
    resetHideTimer()
  }

  const handleTimeUpdate = () => {
    if (videoRef.current) setCurrentTime(videoRef.current.currentTime)
  }

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration)
      videoRef.current.play().then(() => setPlaying(true)).catch(() => {})
    }
  }

  const handleEnded = () => {
    setPlaying(false)
    setTimeout(onClose, 600)
  }

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressRef.current || !videoRef.current) return
    const rect = progressRef.current.getBoundingClientRect()
    const pct = (e.clientX - rect.left) / rect.width
    videoRef.current.currentTime = pct * duration
    resetHideTimer()
  }

  const progress = duration ? (currentTime / duration) * 100 : 0

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/92 backdrop-blur-md"
      onMouseMove={resetHideTimer}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.92, opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="relative w-full max-w-4xl mx-4"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 text-gray-400 hover:text-white transition-colors cursor-none flex items-center gap-1.5 text-sm font-jakarta"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
          ESC
        </button>

        {/* Video wrapper */}
        <div
          className="relative aspect-video rounded-2xl overflow-hidden bg-black border border-gray-800 cursor-none"
          onClick={togglePlay}
        >
          {!videoError ? (
            <video
              ref={videoRef}
              src={videoSrc}
              className="w-full h-full object-cover"
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              onEnded={handleEnded}
              onError={() => setVideoError(true)}
              playsInline
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center gap-4 bg-surface-2">
              <svg className="w-14 h-14 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 10l4.553-2.069A1 1 0 0121 8.845v6.31a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              <p className="text-gray-500 font-jakarta text-sm text-center px-6">
                Добавьте файл <span className="text-accent font-medium">public/videos/video-{lang}.mp4</span>
              </p>
            </div>
          )}

          {/* Controls overlay */}
          <AnimatePresence>
            {(showControls || !playing) && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex flex-col justify-end p-4"
              >
                {/* Progress bar */}
                <div
                  ref={progressRef}
                  className="h-1 bg-white/20 rounded-full mb-4 cursor-pointer group/progress"
                  onClick={(e) => { e.stopPropagation(); handleProgressClick(e) }}
                >
                  <div
                    className="h-full bg-accent rounded-full relative transition-all duration-100"
                    style={{ width: `${progress}%` }}
                  >
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white opacity-0 group-hover/progress:opacity-100 transition-opacity" />
                  </div>
                </div>

                {/* Buttons row */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {/* Skip back */}
                    <button
                      onClick={(e) => { e.stopPropagation(); skip(-5) }}
                      className="flex flex-col items-center gap-0.5 text-white/80 hover:text-white cursor-none transition-colors"
                    >
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M11.99 5V1l-5 5 5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6h-2c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z"/>
                      </svg>
                      <span className="text-[10px] font-jakarta leading-none">-5</span>
                    </button>

                    {/* Play/Pause */}
                    <button
                      onClick={(e) => { e.stopPropagation(); togglePlay() }}
                      className="w-10 h-10 rounded-full bg-accent flex items-center justify-center cursor-none hover:bg-accent-dark transition-colors"
                    >
                      {playing ? (
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                        </svg>
                      ) : (
                        <svg className="w-4 h-4 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      )}
                    </button>

                    {/* Skip forward */}
                    <button
                      onClick={(e) => { e.stopPropagation(); skip(5) }}
                      className="flex flex-col items-center gap-0.5 text-white/80 hover:text-white cursor-none transition-colors"
                    >
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 5V1l5 5-5 5V7c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6h2c0 4.42-3.58 8-8 8s-8-3.58-8-8 3.58-8 8-8z"/>
                      </svg>
                      <span className="text-[10px] font-jakarta leading-none">+5</span>
                    </button>

                    {/* Time */}
                    <span className="text-white/70 font-jakarta text-xs ml-1">
                      {formatTime(currentTime)} / {formatTime(duration)}
                    </span>
                  </div>

                  {/* Full screen hint */}
                  <span className="text-white/40 text-xs font-jakarta hidden sm:block">
                    ← → для перемотки · ESC для закрытия
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  )
}

const fadeUp = {
  hidden: { opacity: 0, y: 35 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
}
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }

export default function VideoIntro() {
  const { t, i18n } = useTranslation()
  const lang = i18n.language as 'ru' | 'en' | 'kz'
  const [modalOpen, setModalOpen] = useState(false)
  const [activeSegment, setActiveSegment] = useState<number | null>(null)

  return (
    <section id="video" className="py-16 sm:py-20">
      <div className="section-container">
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}>
          <motion.div variants={fadeUp} className="mb-10 text-center">
            <p className="text-accent text-xs font-jakarta font-medium uppercase tracking-widest mb-2">
              {t('video.subtitle')}
            </p>
            <h2 className="section-title">{t('video.title')}</h2>
            <div className="accent-line mx-auto" />
          </motion.div>

          {/* Video placeholder thumbnail */}
          <motion.div variants={fadeUp} className="relative max-w-4xl mx-auto mb-6">
            <div
              className="relative aspect-video rounded-2xl overflow-hidden border border-gray-800 cursor-none group"
              onClick={() => setModalOpen(true)}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-bg via-surface to-bg" />
              <div className="absolute inset-0 bg-gradient-to-br from-accent/8 via-transparent to-accent/4" />
              <div
                className="absolute inset-0 opacity-[0.04]"
                style={{ backgroundImage: `linear-gradient(#3B8BD4 1px, transparent 1px), linear-gradient(90deg, #3B8BD4 1px, transparent 1px)`, backgroundSize: '48px 48px' }}
              />

              {/* Thumbnail photo */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  <img
                    src="/images/photo.jpg"
                    alt={t('fullname')}
                    className="w-28 h-28 rounded-full object-cover border-2 border-accent/40 opacity-30 group-hover:opacity-40 transition-opacity"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
                  />
                </div>
              </div>

              {/* Play button */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                <motion.div
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative w-16 h-16 rounded-full bg-accent flex items-center justify-center shadow-2xl shadow-accent/40 group-hover:shadow-accent/60 transition-shadow"
                >
                  <span className="absolute w-full h-full rounded-full bg-accent/30 animate-ping" />
                  <svg className="w-6 h-6 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </motion.div>
                <p className="text-gray-400 font-jakarta text-sm">{t('video.subtitle')}</p>
              </div>

              {/* Duration badge */}
              <div className="absolute top-4 right-4 px-2 py-1 bg-black/60 rounded-lg text-white/70 text-xs font-jakarta">
                1:20
              </div>

              {/* Lang badge */}
              <div className="absolute top-4 left-4 px-2 py-1 bg-accent/20 border border-accent/30 rounded-lg text-accent text-xs font-jakarta uppercase">
                {lang}
              </div>

              {/* Corners */}
              {['-top-0 -left-0 border-t-2 border-l-2 rounded-tl-2xl', '-top-0 -right-0 border-t-2 border-r-2 rounded-tr-2xl', '-bottom-0 -left-0 border-b-2 border-l-2 rounded-bl-2xl', '-bottom-0 -right-0 border-b-2 border-r-2 rounded-br-2xl'].map((cls, i) => (
                <div key={i} className={`absolute w-6 h-6 border-accent/30 ${cls}`} />
              ))}
            </div>
          </motion.div>

          {/* Timecodes */}
          <motion.div variants={fadeUp} className="max-w-4xl mx-auto">
            <p className="text-gray-600 text-xs font-jakarta uppercase tracking-wider mb-2">
              {t('video.timecodes.label')}
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {videoScript.map((segment, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveSegment(activeSegment === idx ? null : idx)}
                  className={`text-left p-3 rounded-xl border transition-all duration-200 cursor-none ${
                    activeSegment === idx
                      ? 'border-accent/50 bg-accent/10'
                      : 'border-gray-800 bg-surface hover:border-gray-700'
                  }`}
                >
                  <span className="text-accent font-clash text-sm font-medium block">{segment.time}</span>
                  <span className="text-gray-400 font-jakarta text-xs mt-0.5 block">
                    {segment.title[lang]}
                  </span>
                </button>
              ))}
            </div>

            <AnimatePresence>
              {activeSegment !== null && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  className="mt-3 p-4 card border-accent/20 bg-accent/5"
                >
                  <p className="text-gray-300 font-jakarta text-sm leading-relaxed">
                    {videoScript[activeSegment].text[lang]}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {modalOpen && <VideoModal lang={lang} onClose={() => setModalOpen(false)} />}
      </AnimatePresence>
    </section>
  )
}
