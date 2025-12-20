'use client'

import { useState, useEffect, useRef } from 'react'
import { useUxStore } from '@/store/useUxStore'
import UxAnnotate from '@/components/ui/UxAnnotate'

export default function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isLoaded, setIsLoaded] = useState(false)
  const [currentWord, setCurrentWord] = useState(0)
  const [scrollY, setScrollY] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const { showInsights, toggleInsights } = useUxStore()

  const words = ['Frontend', 'Designer', 'Creator', 'Innovator']
  const experiences = [
    { icon: '🚀', title: 'React Mastery', desc: 'Building fluid interfaces' },
    { icon: '🎨', title: 'Design Systems', desc: 'Crafting cohesive experiences' },
    { icon: '⚡', title: 'Performance', desc: 'Optimized for speed' }
  ]

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 300)
    const wordInterval = setInterval(() => setCurrentWord(prev => (prev + 1) % words.length), 2500)

    const handleMouseMove = (e: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect()
      if (rect) {
        setMousePosition({
          x: ((e.clientX - rect.left) / rect.width - 0.5) * 2,
          y: ((e.clientY - rect.top) / rect.height - 0.5) * 2
        })
      }
    }
    const handleScroll = () => setScrollY(window.scrollY)

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('scroll', handleScroll)

    return () => {
      clearTimeout(timer)
      clearInterval(wordInterval)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div ref={containerRef} className="relative min-h-screen overflow-hidden pb-10 bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-black dark:via-gray-900 dark:to-gray-800">

      {/* ==============================================
          LAYER 0: BACKGROUND & WHITESPACE ANNOTATION 
          This sits BEHIND the content. Hovering content blocks this.
         ============================================== */}
      <div className="absolute inset-0 z-0">
        {/* The Ghost Annotation fills the screen */}
        <UxAnnotate
          law="Aesthetic-Usability Effect"
          insight="Generous whitespace reduces cognitive load and is perceived as more 'premium'."
          variant="ghost"
          position="bottom"
          className="w-full h-full block" // Force full size
        >
          {/* The actual background elements */}
          <div className="w-full h-full relative overflow-hidden pointer-events-none">
            <div
              className="absolute w-96 h-96 rounded-full bg-gradient-to-r from-blue-400/20 to-purple-400/20 blur-3xl animate-pulse"
              style={{ transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px) translate(20%, 20%)` }}
            />
            <div
              className="absolute w-80 h-80 rounded-full bg-gradient-to-r from-pink-400/15 to-orange-400/15 blur-3xl animate-pulse delay-1000"
              style={{ transform: `translate(${mousePosition.x * -15}px, ${mousePosition.y * -15}px) translate(70%, 60%)` }}
            />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(0,0,0,.05)_1px,transparent_0)] dark:bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,.05)_1px,transparent_0)] bg-[length:40px_40px]" />
          </div>
        </UxAnnotate>
      </div>

      {/* ==============================================
          LAYER 10: CONTENT
          This sits ON TOP. Hovering this blocks the background hover.
         ============================================== */}
      <div className="relative z-10 pointer-events-auto">



        {/* Hero Content */}
        <main className="flex flex-col items-center justify-center min-h-[80vh] px-8 pt-10 text-center">

          {/* Profile */}
          <div className={`transform transition-all duration-1500 ease-out ${isLoaded ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-8 opacity-0 scale-95'}`}>
            <UxAnnotate law="Halo Effect" insight="Professional visuals create a positive bias towards skills." position="left">
              <div className="relative group mb-12">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 p-1 shadow-2xl">
                  <div className="w-full h-full rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center overflow-hidden">
                    <img src="/images/MyProfile.jpg" alt="Shubham Verma" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; (e.target as HTMLImageElement).parentElement!.innerHTML = 'SV'; }} />
                  </div>
                </div>
              </div>
            </UxAnnotate>
          </div>

          {/* Headline */}
          <div className={`transform transition-all duration-1500 delay-300 ease-out ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            <UxAnnotate law="Visual Hierarchy" insight="Large typography guides the eye first." position="right">
              <h1 className="text-6xl md:text-8xl font-black mb-6 leading-none">
                <span className="bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 dark:from-white dark:via-gray-200 dark:to-white bg-clip-text text-transparent">
                  Shubham
                </span>
              </h1>
            </UxAnnotate>
            <div className="relative h-16 mb-8 flex items-center justify-center">
              <p className="text-2xl md:text-4xl font-light text-gray-600 dark:text-gray-400">
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-medium">
                  {words[currentWord]}
                </span>
                <span className="animate-pulse">_</span>
              </p>
            </div>
            <p className="text-lg md:text-xl text-gray-500 dark:text-gray-400 max-w-2xl leading-relaxed mb-12 font-light">
              Crafting digital experiences where <span className="italic text-gray-700 dark:text-gray-300">form meets function</span>.
            </p>
          </div>

          {/* Cards */}
          <div className={`transform transition-all duration-1500 delay-500 ease-out ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-16">
              {experiences.map((exp, i) => (
                <div key={i} className="group relative bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-3xl p-8 shadow-lg hover:-translate-y-4 transition-all duration-500 border border-gray-200/50"
                  style={{ transform: `translateY(${scrollY * 0.1}px) rotateX(${mousePosition.y * 2}deg) rotateY(${mousePosition.x * 2}deg)` }}>
                  <div className="text-4xl mb-6">{exp.icon}</div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">{exp.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 font-light">{exp.desc}</p>
                </div>
              ))}
            </div>
          </div>



          {/* CTA Buttons */}
          <div className={`transform transition-all duration-1500 delay-900 ease-out ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
              <UxAnnotate law="Fitts's Law" insight="Large target area minimizes effort." position="top">
                <button className="bg-gradient-to-r from-gray-900 to-black dark:from-white dark:to-gray-100 text-white dark:text-black px-10 py-4 rounded-full font-medium hover:shadow-2xl transition-all duration-300 hover:scale-105 relative overflow-hidden group">
                  <span className="relative z-10">Explore My Work</span>
                </button>
              </UxAnnotate>
              <UxAnnotate law="Progressive Disclosure" insight="Secondary options available if needed." position="top">
                <button className="border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-10 py-4 rounded-full font-medium hover:bg-gray-900 hover:text-white transition-all duration-300 hover:scale-105">
                  Let's Connect
                </button>
              </UxAnnotate>
            </div>
          </div>

        </main>
      </div>
    </div>
  )
}