// sections/AboutSection.tsx
'use client'

import { useState, useEffect, useRef } from 'react'
import TooltipBubble from '@/components/TooltipBubble'

interface AboutSectionProps {
  showUXLaws?: boolean
}

export default function AboutSection({ showUXLaws = false }: AboutSectionProps) {
  const [activeTab, setActiveTab] = useState<'journey' | 'skills' | 'interests'>('journey')
  const [isInView, setIsInView] = useState(false)
  const [skillProgress, setSkillProgress] = useState<{ [key: string]: number }>({})
  const [currentTime, setCurrentTime] = useState('')
  const [currentActivity, setCurrentActivity] = useState('')
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)
  const [interactionCount, setInteractionCount] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)

  // Activities that rotate
  const activities = [
    '🚀 Building web experiences',
    '🎨 Designing in Figma',
    '📚 Learning new frameworks',
    '🔧 Debugging code',
    '💡 Ideating solutions',
    '🌟 Exploring UX patterns'
  ]

  useEffect(() => {
    // Update current time
    const updateTime = () => {
      const now = new Date()
      const istTime = new Intl.DateTimeFormat('en-IN', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      }).format(now)
      setCurrentTime(istTime)
    }

    updateTime()
    const timeInterval = setInterval(updateTime, 1000)

    // Rotate activities
    const activityInterval = setInterval(() => {
      setCurrentActivity(activities[Math.floor(Math.random() * activities.length)])
    }, 3000)

    // Set initial activity
    setCurrentActivity(activities[0])

    return () => {
      clearInterval(timeInterval)
      clearInterval(activityInterval)
    }
  }, [])

  // Intersection observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          // Animate skill progress bars
          setTimeout(() => {
            animateSkills()
          }, 500)
        }
      },
      { threshold: 0.3 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const animateSkills = () => {
    const skills = {
      'React.js': 90,
      'TypeScript': 85,
      'Next.js': 80,
      'Tailwind CSS': 95,
      'Figma': 85,
      'JavaScript': 90,
      'Python': 75,
      'UI/UX Design': 80
    }

    Object.entries(skills).forEach(([skill, percentage], index) => {
      setTimeout(() => {
        setSkillProgress(prev => ({
          ...prev,
          [skill]: percentage
        }))
      }, index * 150)
    })
  }

  const journeyData = [
    {
      year: '2021',
      title: 'Started B.Tech',
      description: 'Mechanical Engineering at MNNIT Allahabad',
      icon: '🎓',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      year: '2022',
      title: 'Discovered Frontend',
      description: 'Fell in love with React and modern web development',
      icon: '💻',
      color: 'from-purple-500 to-pink-500'
    },
    {
      year: '2023',
      title: 'UX Awakening',
      description: 'Learned UX principles and Apple Human Interface Guidelines',
      icon: '🎨',
      color: 'from-orange-500 to-red-500'
    },
    {
      year: '2024',
      title: 'Project Builder',
      description: 'Created multiple full-stack applications with focus on UX',
      icon: '🚀',
      color: 'from-green-500 to-teal-500'
    },
    {
      year: '2025',
      title: 'Ready to Ship',
      description: 'Seeking opportunities to create amazing user experiences',
      icon: '🌟',
      color: 'from-indigo-500 to-purple-500'
    }
  ]

  const skills = [
    { name: 'React.js', level: 90, category: 'Frontend', icon: '⚛️' },
    { name: 'TypeScript', level: 85, category: 'Language', icon: '🔷' },
    { name: 'Next.js', level: 80, category: 'Framework', icon: '▲' },
    { name: 'Tailwind CSS', level: 95, category: 'Styling', icon: '🎨' },
    { name: 'Figma', level: 85, category: 'Design', icon: '🔧' },
    { name: 'JavaScript', level: 90, category: 'Language', icon: '🟨' },
    { name: 'Python', level: 75, category: 'Language', icon: '🐍' },
    { name: 'UI/UX Design', level: 80, category: 'Design', icon: '✨' }
  ]

  const interests = [
    { name: 'Web Development', description: 'Building responsive, accessible web applications', icon: '🌐', active: true },
    { name: 'UI/UX Design', description: 'Creating intuitive and delightful user experiences', icon: '🎭', active: true },
    { name: '3D Modeling', description: 'Exploring creativity through Blender and 3D art', icon: '🎲', active: false },
    { name: 'Frontend Innovation', description: 'Staying updated with latest web technologies', icon: '🔮', active: true },
    { name: 'Design Systems', description: 'Building scalable and consistent design patterns', icon: '🏗️', active: false },
    { name: 'User Psychology', description: 'Understanding how users interact with digital products', icon: '🧠', active: true }
  ]

  const handleTabChange = (tab: 'journey' | 'skills' | 'interests') => {
    setActiveTab(tab)
    setInteractionCount(prev => prev + 1)
  }

  const getExperienceYears = () => {
    const startYear = 2022
    const currentYear = new Date().getFullYear()
    return currentYear - startYear
  }

  const getSkillColor = (level: number) => {
    if (level >= 90) return 'from-green-500 to-emerald-500'
    if (level >= 80) return 'from-blue-500 to-cyan-500'
    if (level >= 70) return 'from-yellow-500 to-orange-500'
    return 'from-gray-500 to-gray-600'
  }

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative min-h-screen py-20 px-4 bg-gradient-to-br from-gray-50 via-white to-blue-50/30 dark:from-gray-900 dark:via-black dark:to-blue-950/30 overflow-hidden"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-cyan-400/10 to-pink-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header with Live Status */}
        <div className={`text-center mb-16 transform transition-all duration-1000 ${isInView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="relative inline-block mb-8">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
              About Me
            </h2>
            {showUXLaws && (
              <TooltipBubble
                lawName="Visual Hierarchy: Large, gradient text creates strong focal point"
                description="top"
              />
            )}
          </div>
        </div>
        {/* Move Live Status Card here, below the heading and above the navigation tabs */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center space-x-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg border border-gray-200/50 dark:border-gray-700/50">
            <div className="flex items-center space-x-2">
              <div className="relative">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <div className="absolute inset-0 w-3 h-3 bg-green-500 rounded-full animate-ping opacity-75"></div>
              </div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Live from India</span>
            </div>
            <div className="w-px h-4 bg-gray-300 dark:bg-gray-600"></div>
            <span className="text-sm text-gray-600 dark:text-gray-400">🇮🇳 {currentTime} IST</span>
            <div className="w-px h-4 bg-gray-300 dark:bg-gray-600"></div>
            <span className="text-sm text-gray-600 dark:text-gray-400">{currentActivity}</span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className={`flex justify-center mb-16 transform transition-all duration-1000 delay-200 ${isInView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-2 shadow-lg border border-gray-200/50 dark:border-gray-700/50">
            <div className="flex space-x-2">
              {(['journey', 'skills', 'interests'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => handleTabChange(tab)}
                  className={`relative px-6 py-3 rounded-xl font-medium transition-all duration-300 capitalize ${activeTab === tab
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                    }`}
                >
                  {tab}
                  {activeTab === tab && (
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl blur opacity-50 -z-10"></div>
                  )}
                </button>
              ))}
            </div>
            {showUXLaws && (
              <TooltipBubble
                lawName="Progressive Disclosure: Tabs organize content and reduce cognitive load"
                description="top"
              />
            )}
          </div>
        </div>

        {/* Content Area */}
        <div className="min-h-[600px]">
          {/* Journey Tab */}
          {activeTab === 'journey' && (
            <div className={`transform transition-all duration-700 ${isInView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Personal Info Card */}
                <div className="order-2 lg:order-1">
                  <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-gray-200/50 dark:border-gray-700/50 hover:shadow-2xl transition-all duration-300">
                    <div className="text-center mb-8">
                      <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
                        SV
                      </div>
                      <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">Shubham Verma</h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">Frontend Developer & UX Enthusiast</p>
                      <div className="flex justify-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                        <span>📍 Lucknow, India</span>
                        <span>🎓 B.Tech '25</span>
                        <span>💻 {getExperienceYears()}+ years coding</span>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                          🎯
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">Current Focus</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Building production-ready React applications</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
                          🌟
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">Passion</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Creating delightful user experiences</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                          🚀
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">Goal</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Frontend role in innovative company</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Timeline */}
                <div className="order-1 lg:order-2">
                  <div className="relative">
                    <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-purple-500"></div>
                    <div className="space-y-8">
                      {journeyData.map((item, index) => (
                        <div key={item.year} className="relative flex items-center">
                          <div className="absolute left-6 w-4 h-4 bg-white dark:bg-gray-800 border-2 border-blue-500 rounded-full"></div>
                          <div className="ml-16 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-200/50 dark:border-gray-700/50 hover:shadow-xl transition-all duration-300 w-full">
                            <div className="flex items-center space-x-3 mb-3">
                              <div className={`w-8 h-8 bg-gradient-to-r ${item.color} rounded-full flex items-center justify-center text-white text-sm`}>
                                {item.icon}
                              </div>
                              <div>
                                <h4 className="font-bold text-gray-900 dark:text-white">{item.title}</h4>
                                <p className="text-sm text-gray-500 dark:text-gray-400">{item.year}</p>
                              </div>
                            </div>
                            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{item.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Skills Tab */}
          {activeTab === 'skills' && (
            <div className={`transform transition-all duration-700 ${isInView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Skills Grid */}
                <div>
                  <h3 className="text-2xl font-bold mb-8 text-gray-900 dark:text-white">Technical Skills</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {skills.map((skill, index) => (
                      <div
                        key={skill.name}
                        className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-gray-200/50 dark:border-gray-700/50 hover:shadow-xl transition-all duration-300 cursor-pointer"
                        onMouseEnter={() => setHoveredSkill(skill.name)}
                        onMouseLeave={() => setHoveredSkill(null)}
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="text-2xl">{skill.icon}</div>
                          <div>
                            <h4 className="font-semibold text-gray-900 dark:text-white">{skill.name}</h4>
                            <p className="text-xs text-gray-500 dark:text-gray-400">{skill.category}</p>
                          </div>
                        </div>
                        <div className="mb-2">
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-600 dark:text-gray-400">Proficiency</span>
                            <span className="text-gray-900 dark:text-white font-medium">{skillProgress[skill.name] || 0}%</span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full bg-gradient-to-r ${getSkillColor(skill.level)} transition-all duration-1000 ease-out`}
                              style={{ width: `${skillProgress[skill.name] || 0}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Certifications & Education */}
                <div>
                  <h3 className="text-2xl font-bold mb-8 text-gray-900 dark:text-white">Education & Certifications</h3>
                  <div className="space-y-6">
                    {/* Education */}
                    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-200/50 dark:border-gray-700/50">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-xl">
                          🎓
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900 dark:text-white">B.Tech, Mechanical Engineering</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">MNNIT Allahabad (2021-2025)</p>
                        </div>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-4">
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Current Performance</p>
                        <div className="flex items-center space-x-4">
                          <div className="flex-1">
                            <div className="flex justify-between text-sm mb-1">
                              <span>CPI</span>
                              <span className="font-medium">8.2/10</span>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                              <div className="h-2 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 transition-all duration-1000" style={{ width: '68.7%' }}></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Certifications */}
                    <div className="space-y-4">
                      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-gray-200/50 dark:border-gray-700/50">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center">
                            🏆
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900 dark:text-white">Lean Six Sigma White Belt</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Alison</p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-gray-200/50 dark:border-gray-700/50">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                            📋
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900 dark:text-white">Project Management Essentials</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">MSICertified</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Interests Tab */}
          {activeTab === 'interests' && (
            <div className={`transform transition-all duration-700 ${isInView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <div className="max-w-4xl mx-auto">
                <h3 className="text-2xl font-bold mb-8 text-center text-gray-900 dark:text-white">What Drives Me</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {interests.map((interest, index) => (
                    <div
                      key={interest.name}
                      className={`relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-200/50 dark:border-gray-700/50 hover:shadow-xl transition-all duration-300 cursor-pointer group ${interest.active ? 'ring-2 ring-blue-500/20' : ''
                        }`}
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      {interest.active && (
                        <div className="absolute -top-2 -right-2 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
                      )}

                      <div className="text-center mb-4">
                        <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">{interest.icon}</div>
                        <h4 className="font-bold text-gray-900 dark:text-white mb-2">{interest.name}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{interest.description}</p>
                      </div>

                      {interest.active && (
                        <div className="text-center">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300">
                            Currently Active
                          </span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Fun Stats */}
                <div className="mt-16 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-gray-200/50 dark:border-gray-700/50">
                  <h4 className="text-xl font-bold text-center mb-8 text-gray-900 dark:text-white">Fun Stats</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">5+</div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Projects Built</p>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">3+</div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Years Learning</p>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">{interactionCount}</div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Page Interactions</p>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-2">100%</div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Passion Level</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}