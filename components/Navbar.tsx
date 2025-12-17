// components/Navbar.tsx
'use client'

import { useState, useEffect } from 'react'
import { useUxStore } from '@/store/useUxStore' // Import the global store
import UxAnnotate from './ui/UxAnnotate'       // Import the smart wrapper

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Access global state for the UX Toggle
  const { showInsights, toggleInsights } = useUxStore()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { href: '#home', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#projects', label: 'Projects' },
    { href: '#contact', label: 'Contact' }
  ]

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out ${isScrolled
        ? 'bg-white/60 dark:bg-black/60 backdrop-blur-xl shadow-lg border-b border-gray-200/50 dark:border-gray-700/50'
        : 'bg-transparent'
      }`}>
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">

          {/* 1. Logo/Brand - Wrapped with Recognition Law */}
          <UxAnnotate
            law="Recognition over Recall"
            insight="Brand name always visible for easy navigation back to home"
          >
            <div className="relative">
              <a href="#home" className="group block">
                <h1 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent hover:from-blue-600 hover:to-purple-600 dark:hover:from-blue-400 dark:hover:to-purple-400 transition-all duration-300">
                  Shubham Verma
                </h1>
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-300"></div>
              </a>
            </div>
          </UxAnnotate>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">

            {/* 2. UX Insight Toggle Button (New) */}
            <button
              onClick={toggleInsights}
              className={`px-4 py-2 rounded-full font-bold text-xs transition-all duration-300 border ${showInsights
                  ? 'bg-blue-600 text-white border-blue-600 shadow-blue-500/30 shadow-lg'
                  : 'bg-gray-100 text-gray-500 border-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
            >
              UX Insights: {showInsights ? 'ON' : 'OFF'}
            </button>

            {/* Nav Items */}
            {navItems.map((item, index) => (
              <div key={item.href} className="relative">
                {/* Apply Fitts's Law annotation only to the first item as an example, or all if preferred */}
                {index === 0 ? (
                  <UxAnnotate law="Fitts's Law" insight="Larger touch targets with padding improve click accuracy">
                    <a
                      href={item.href}
                      className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white font-medium transition-all duration-300 hover:scale-105 py-2 px-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                      {item.label}
                    </a>
                  </UxAnnotate>
                ) : (
                  <a
                    href={item.href}
                    className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white font-medium transition-all duration-300 hover:scale-105 py-2 px-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    {item.label}
                  </a>
                )}
              </div>
            ))}

            {/* 3. Resume Button - Wrapped with Von Restorff Effect */}
            <UxAnnotate
              law="Von Restorff Effect"
              insight="High contrast CTA stands out from navigation links"
            >
              <div className="relative">
                <button className="bg-black dark:bg-white text-white dark:text-black px-6 py-2 rounded-full font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg">
                  Resume
                </button>
              </div>
            </UxAnnotate>
          </div>

          {/* Mobile Menu Button - Wrapped with Affordance */}
          <div className="md:hidden relative">
            <UxAnnotate
              law="Affordance"
              insight="Hamburger menu universally recognized as mobile navigation trigger"
              position="left"
            >
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                aria-label="Toggle mobile menu"
              >
                <div className="w-6 h-6 flex flex-col justify-center items-center">
                  <span className={`block w-5 h-0.5 bg-gray-700 dark:bg-gray-300 transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-0.5' : ''
                    }`}></span>
                  <span className={`block w-5 h-0.5 bg-gray-700 dark:bg-gray-300 transition-all duration-300 mt-1 ${isMobileMenuOpen ? 'opacity-0' : ''
                    }`}></span>
                  <span className={`block w-5 h-0.5 bg-gray-700 dark:bg-gray-300 transition-all duration-300 mt-1 ${isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''
                    }`}></span>
                </div>
              </button>
            </UxAnnotate>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ease-out ${isMobileMenuOpen
          ? 'max-h-96 opacity-100 mt-4'
          : 'max-h-0 opacity-0'
          }`}>
          <div className="py-4 space-y-2 border-t border-gray-200 dark:border-gray-700">

            {/* Mobile UX Toggle */}
            <div className="px-4 py-2 flex justify-between items-center">
              <span className="text-sm text-gray-500">UX Insights Mode</span>
              <button
                onClick={toggleInsights}
                className={`px-3 py-1 rounded-full text-xs font-bold ${showInsights ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                  }`}
              >
                {showInsights ? 'ON' : 'OFF'}
              </button>
            </div>

            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="block px-4 py-3 text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
              <button className="w-full bg-black dark:bg-white text-white dark:text-black px-6 py-3 rounded-lg font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors duration-200">
                Download Resume
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}