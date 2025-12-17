// app/page.txs

import HeroSection from '@/sections/HeroSection'
import AboutSection from '@/sections/AboutSection'
import ProjectSection from '@/sections/ProjectSection'
import ContactSection from '@/sections/ContactSection'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-black dark:bg-black dark:text-white">
      <div className="mb-24">
        <HeroSection />
      </div>
      <div className="my-24">
        <AboutSection />
      </div>
      <div className="my-24">
        <ProjectSection />
      </div>
      <div className="my-24">
        <ContactSection />
      </div>
      <div className="mt-24">
        <Footer />
      </div>
    </main>
  )
}
