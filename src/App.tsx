import { Suspense, lazy } from 'react'
import CustomCursor from './components/CustomCursor'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Skills from './components/Skills'
import VideoIntro from './components/VideoIntro'
import Certificates from './components/Certificates'
import { hasVideos } from './data/content'
import Contact from './components/Contact'

const Background3D = lazy(() => import('./components/Background3D'))

function App() {
  return (
    <div className="bg-bg text-white min-h-screen relative">
      <CustomCursor />

      <Suspense fallback={null}>
        <Background3D />
      </Suspense>

      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero />
          <About />
          <Experience />
          <Projects />
          <Skills />
          {hasVideos && <VideoIntro />}
          <Certificates />
          <Contact />
        </main>

        <footer className="border-t border-gray-800 py-8 text-center">
          <p className="text-gray-500 font-jakarta text-sm">
            © 2026 Omarigato. Build with you
          </p>
        </footer>
      </div>
    </div>
  )
}

export default App
