// components/Navbar.tsx
'use client'

import { useState, useEffect } from 'react'
import { useUxStore } from '@/store/useUxStore'
import UxAnnotate from './ui/UxAnnotate'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  const { showInsights, toggleInsights } = useUxStore()

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 300)

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      clearTimeout(timer)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${isScrolled
      ? 'bg-gray-900/80 backdrop-blur-xl shadow-lg border-b border-gray-700/50'
      : ' bg-gray-900 backdrop-blur-none shadow-none border-b-0'
      }`}>
      <div className="max-w-7xl mx-auto px-8 py-6">
        <div className="flex justify-between items-center">

          {/* Logo/Brand */}
          <div className={`transform transition-all duration-1000 ${isLoaded ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'
            }`}>
            <UxAnnotate
              law="Recognition over Recall"
              insight="Brand name always visible for easy navigation"
              position="right"
            >
              <a href="#home" className="group block">
                <div className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent hover:from-blue-600 hover:to-purple-600 dark:hover:from-blue-400 dark:hover:to-purple-400 transition-all duration-300">
                  SV
                </div>
              </a>
            </UxAnnotate>
          </div>

          {/* Center Navigation Links */}
          <div className={`hidden md:flex items-center space-x-8 transform transition-all duration-1000 delay-200 ${isLoaded ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'
            }`}>
            <UxAnnotate
              law="Law of Proximity"
              insight="Grouped elements are perceived as related."
              position="bottom"
            >
              <div className="flex space-x-8">
                {['Work', 'About', 'Contact'].map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors relative group"
                  >
                    {item}
                    <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-black dark:bg-white transition-all duration-300 group-hover:w-full" />
                  </a>
                ))}
              </div>
            </UxAnnotate>
          </div>

          {/* Right Side: UX Toggle + Resume Button */}
          <div className={`flex items-center space-x-6 transform transition-all duration-1000 delay-300 ${isLoaded ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
            }`}>

            {/* UX Insights Toggle (from Hero Section) */}
            <UxAnnotate
              law="Affordance"
              insight="Toggle switch implies clickability and current state."
              position="bottom"
            >
              <button
                onClick={toggleInsights}
                className={`relative w-16 h-9 rounded-full transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-500/20 ${showInsights
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg'
                  : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                aria-label="Toggle UX Insights"
              >
                <div className={`absolute top-1 left-1 w-7 h-7 bg-white rounded-full shadow-md transition-all duration-300 ${showInsights ? 'translate-x-7' : 'translate-x-0'
                  }`}>
                  <div className={`w-full h-full rounded-full flex items-center justify-center ${showInsights ? 'text-blue-500' : 'text-gray-400'
                    }`}>
                    {showInsights ? '🧠' : '💡'}
                  </div>
                </div>
              </button>
            </UxAnnotate>

            {/* Resume Button */}
            <UxAnnotate
              law="Von Restorff Effect"
              insight="High contrast CTA stands out from navigation links."
              position="left"
            >
              <a
                href="#resume"
                className="hidden md:block bg-gradient-to-r from-gray-900 to-black dark:from-white dark:to-gray-100 text-white dark:text-black px-6 py-2.5 rounded-full font-medium hover:shadow-2xl transition-all duration-300 hover:scale-105 text-sm"
              >
                Resume
              </a>
            </UxAnnotate>

            {/* Mobile Menu Button */}
            <UxAnnotate
              law="Affordance"
              insight="Hamburger menu universally recognized as mobile navigation trigger."
              position="left"
            >
              <button
                className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                aria-label="Toggle mobile menu"
              >
                <div className="w-6 h-6 flex flex-col justify-center items-center space-y-1.5">
                  <span className="block w-5 h-0.5 bg-gray-700 dark:bg-gray-300 transition-all duration-300"></span>
                  <span className="block w-5 h-0.5 bg-gray-700 dark:bg-gray-300 transition-all duration-300"></span>
                  <span className="block w-5 h-0.5 bg-gray-700 dark:bg-gray-300 transition-all duration-300"></span>
                </div>
              </button>
            </UxAnnotate>
          </div>

        </div>
      </div>
    </nav>
  )
}