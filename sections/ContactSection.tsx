// sections/ContactSection.tsx
'use client'

import { useState, useEffect, useRef } from 'react'
import TooltipBubble from '@/components/TooltipBubble'

interface ContactSectionProps {
  showUXLaws?: boolean
}

export default function ContactSection({ showUXLaws = false }: ContactSectionProps) {
  const [selectedMethod, setSelectedMethod] = useState<string>('email')
  const [isInView, setIsInView] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [messageLength, setMessageLength] = useState(0)
  const [currentTime, setCurrentTime] = useState('')
  const [responseTime, setResponseTime] = useState('')
  const sectionRef = useRef<HTMLElement>(null)

  // Update current time and response time
  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const istTime = new Intl.DateTimeFormat('en-IN', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      }).format(now)
      setCurrentTime(istTime)

      // Calculate response time based on current hour
      const hour = now.getHours()
      if (hour >= 9 && hour <= 18) {
        setResponseTime('Usually within 2-4 hours')
      } else {
        setResponseTime('Usually by next morning')
      }
    }

    updateTime()
    const interval = setInterval(updateTime, 60000) // Update every minute
    return () => clearInterval(interval)
  }, [])

  // Intersection observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  // Mouse tracking for interactive elements
  const handleMouseMove = (e: React.MouseEvent) => {
    if (isHovering) {
      const rect = e.currentTarget.getBoundingClientRect()
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      })
    }
  }

  const contactMethods = [
    {
      id: 'email',
      label: 'Email',
      icon: '📧',
      primary: 'shubham@example.com',
      secondary: 'Professional inquiries',
      action: 'mailto:shubham@example.com?subject=Let\'s collaborate!',
      gradient: 'from-blue-500 to-cyan-500',
      delay: 0
    },
    {
      id: 'linkedin',
      label: 'LinkedIn',
      icon: '💼',
      primary: '@shubhamverma',
      secondary: 'Professional network',
      action: 'https://linkedin.com/in/shubhamverma',
      gradient: 'from-blue-600 to-blue-800',
      delay: 100
    },
    {
      id: 'github',
      label: 'GitHub',
      icon: '🚀',
      primary: '@shubhamverma',
      secondary: 'Code collaboration',
      action: 'https://github.com/shubhamverma',
      gradient: 'from-gray-700 to-gray-900',
      delay: 200
    },
    {
      id: 'calendar',
      label: 'Schedule Call',
      icon: '📅',
      primary: 'Book a meeting',
      secondary: '15-30 min coffee chat',
      action: 'https://calendly.com/shubhamverma',
      gradient: 'from-green-500 to-emerald-600',
      delay: 300
    }
  ]

  const quickTopics = [
    { emoji: '💼', label: 'Job Opportunities', popular: true },
    { emoji: '🤝', label: 'Collaboration', popular: true },
    { emoji: '🎯', label: 'Frontend Projects', popular: false },
    { emoji: '🎨', label: 'UI/UX Discussion', popular: false },
    { emoji: '💡', label: 'Tech Consulting', popular: false },
    { emoji: '🌟', label: 'Just Say Hi!', popular: true }
  ]

  const handleTopicClick = (topic: string) => {
    const emailSubject = encodeURIComponent(`Re: ${topic}`)
    const emailBody = encodeURIComponent(`Hi Shubham!\n\nI'd love to discuss ${topic} with you.\n\nBest regards,`)
    window.open(`mailto:shubham@example.com?subject=${emailSubject}&body=${emailBody}`)
  }

  const handleMethodSelect = (method: string, action: string) => {
    setSelectedMethod(method)
    setTimeout(() => {
      if (method === 'email') {
        window.open(action)
      } else {
        window.open(action, '_blank', 'noopener,noreferrer')
      }
    }, 300)
  }

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center py-20 px-4 bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30 dark:from-black dark:via-blue-950/20 dark:to-purple-950/20 overflow-hidden"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-cyan-400/20 to-blue-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="relative inline-block">
            <h2 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
              Let's Connect
            </h2>
            {showUXLaws && (
              <TooltipBubble
                lawName="Emotional Design: Warm, inviting language encourages engagement"
                description="top"
              />
            )}
          </div>
          <div className="flex items-center justify-center space-x-4 text-sm text-gray-600 dark:text-gray-400 mb-8">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span>Online now</span>
            </div>
            <div className="w-px h-4 bg-gray-300 dark:bg-gray-600"></div>
            <span>🇮🇳 IST {currentTime}</span>
            <div className="w-px h-4 bg-gray-300 dark:bg-gray-600"></div>
            <span>{responseTime}</span>
          </div>
        </div>

        {/* Interactive Contact Methods */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {contactMethods.map((method) => (
            <div
              key={method.id}
              className="relative group cursor-pointer hover:scale-105"
              style={{ transitionDelay: `${method.delay}ms` }}
              onClick={() => handleMethodSelect(method.id, method.action)}
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <div className={`relative overflow-hidden rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 p-6 shadow-lg group-hover:shadow-2xl transition-all duration-300 ${selectedMethod === method.id ? 'ring-2 ring-blue-500 scale-105' : ''}`}>
                {/* Gradient overlay on hover */}
                <div className={`absolute inset-0 bg-gradient-to-r ${method.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>

                {/* Icon */}
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {method.icon}
                </div>

                {/* content */}
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors duration-300">
                  {method.label}
                </h3>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {method.primary}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {method.secondary}
                </p>

                {/* Ripple effect */}
                {selectedMethod === method.id && (
                  <div className="absolute inset-0 rounded-2xl bg-blue-400/20 animate-ping"></div>
                )}
              </div>

              {showUXLaws && method.id === 'email' && (
                <TooltipBubble
                  lawName="Fitts's Law: Large touch targets reduce selection errors"
                  description="top"
                />
              )}
            </div>
          ))}
        </div>

        {/* Quick Topic Selector */}
        <div className="text-center mb-16">
          <div className="relative">
            <h3 className="text-2xl font-bold mb-8 text-gray-900 dark:text-white">
              What would you like to discuss?
            </h3>
            {showUXLaws && (
              <TooltipBubble
                lawName="Hick's Law: Categorized options reduce decision time"
                description="top"
              />
            )}
          </div>

          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {quickTopics.map((topic, index) => (
              <button
                key={topic.label}
                onClick={() => handleTopicClick(topic.label)}
                className={`relative group inline-flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 hover:scale-105 transform ${topic.popular
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg hover:shadow-xl'
                  : 'bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 border border-gray-200/50 dark:border-gray-700/50 hover:border-blue-300 dark:hover:border-blue-600'
                  }`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <span>{topic.emoji}</span>
                <span className="text-sm font-medium">{topic.label}</span>
                {topic.popular && (
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-orange-400 rounded-full animate-pulse"></span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Interactive Message Preview */}
        <div className="max-w-2xl mx-auto mb-16">
          <div className="relative">
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-700/50 p-6 shadow-lg">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                  SV
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Quick Email Template</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Ready to send!</p>
                </div>
              </div>

              <textarea
                className="w-full h-32 p-4 bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                placeholder="Hi Shubham! I'd love to discuss..."
                onChange={(e) => setMessageLength(e.target.value.length)}
                defaultValue="Hi Shubham!\n\nI came across your portfolio and I'm impressed by your work. I'd love to discuss potential opportunities.\n\nBest regards,"
              />

              <div className="flex justify-between items-center mt-4">
                <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                  <span>Characters: {messageLength}</span>
                  <div className="w-px h-4 bg-gray-300 dark:bg-gray-600"></div>
                  <span>Estimated read time: {Math.ceil(messageLength / 200)} min</span>
                </div>
                <button
                  onClick={() => window.open('mailto:shubham@example.com?subject=Let\'s collaborate!&body=' + encodeURIComponent(document.querySelector('textarea')?.value || ''))}
                  className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2 rounded-full font-medium hover:from-blue-600 hover:to-purple-600 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  Send Email 🚀
                </button>
              </div>
            </div>

            {showUXLaws && (
              <TooltipBubble
                lawName="Progressive Disclosure: Pre-filled template reduces friction in communication"
                description="top"
              />
            )}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="relative">
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto leading-relaxed">
              Whether you're looking to hire, collaborate, or just want to chat about frontend development and UX design, I'm always excited to connect with fellow creators and innovators.
            </p>
            {showUXLaws && (
              <TooltipBubble
                lawName="Reciprocity Principle: Personal invitation creates connection and encourages response"
                description="top"
              />
            )}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <button
              onClick={() => window.open('mailto:shubham@example.com?subject=Let\'s collaborate!')}
              className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-3 rounded-full font-medium hover:from-blue-600 hover:to-purple-600 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Start a Conversation
            </button>
            <button
              onClick={() => window.open('https://calendly.com/shubhamverma', '_blank')}
              className="border-2 border-blue-500 text-blue-500 px-8 py-3 rounded-full font-medium hover:bg-blue-500 hover:text-white transition-all duration-300 hover:scale-105"
            >
              Schedule a Call
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}