// sections/ProjectSection.tsx

'use client'

export { }


import { useState, useEffect, useRef } from 'react'
import { ChevronRight, ExternalLink, Github, Play, Pause, Eye } from 'lucide-react'
import TooltipBubble from '@/components/TooltipBubble'

interface ProjectSectionProps {
  showUXLaws?: boolean
}

interface Project {
  id: string
  title: string
  description: string
  longDescription: string
  status: 'Complete' | 'In Progress' | 'Almost Complete'
  tags: string[]
  category: string
  icon: string
  gradient: string
  liveUrl?: string
  githubUrl?: string
  features: string[]
  techStack: string[]
  impact: string
  year: string
  image?: string
}

const projects: Project[] = [
  {
    id: 'pricing-buddy',
    title: 'Pricing Buddy',
    description: 'Smart pricing comparison and productivity tool for better decision making',
    longDescription: 'A comprehensive pricing comparison tool that helps users make informed purchasing decisions by aggregating prices from multiple sources and providing intelligent recommendations.',
    status: 'Almost Complete',
    tags: ['React', 'TypeScript', 'API Integration', 'Data Visualization'],
    category: 'Productivity',
    icon: '💰',
    gradient: 'from-green-400 to-blue-500',
    features: ['Price comparison across platforms', 'Smart recommendations', 'Price history tracking', 'Budget analysis'],
    techStack: ['React.js', 'TypeScript', 'Tailwind CSS', 'Chart.js'],
    impact: 'Helps users save 20-30% on purchases',
    year: '2024',
    liveUrl: '#',
    githubUrl: '#'
  },
  {
    id: 'minimaster',
    title: 'MiniMaster',
    description: 'Learning mini-habits with topic-wise skill micro-learning system',
    longDescription: 'A habit-building app focused on micro-learning, helping users develop skills through consistent small daily actions and bite-sized learning modules.',
    status: 'In Progress',
    tags: ['Next.js', 'Learning', 'Habit Building', 'Progress Tracking'],
    category: 'Education',
    icon: '🧠',
    gradient: 'from-purple-400 to-pink-500',
    features: ['Micro-learning modules', 'Habit tracking', 'Progress analytics', 'Skill roadmaps'],
    techStack: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL'],
    impact: 'Improves learning retention by 40%',
    year: '2024',
    githubUrl: '#'
  },
  {
    id: 'tic-tac-toe',
    title: 'Tic-Tac-Toe',
    description: 'Themed interactive game with modern React implementation',
    longDescription: 'A beautifully designed Tic-Tac-Toe game with multiple themes, smooth animations, and intelligent AI opponent with different difficulty levels.',
    status: 'Complete',
    tags: ['React', 'Game Development', 'Animation', 'AI'],
    category: 'Game',
    icon: '🎯',
    gradient: 'from-orange-400 to-red-500',
    features: ['Multiple themes', 'AI opponent', 'Smooth animations', 'Score tracking'],
    techStack: ['React.js', 'Tailwind CSS', 'Framer Motion'],
    impact: 'Demonstrates game logic and UX skills',
    year: '2023',
    liveUrl: '#',
    githubUrl: '#'
  },
  {
    id: 'pictory',
    title: 'Pictory',
    description: 'Creative writing app using image prompts with word counter',
    longDescription: 'An innovative writing application that uses AI-generated image prompts to inspire creative writing, complete with writing analytics and progress tracking.',
    status: 'Complete',
    tags: ['Writing', 'AI Integration', 'Creativity', 'Analytics'],
    category: 'Creative',
    icon: '📝',
    gradient: 'from-teal-400 to-cyan-500',
    features: ['AI image prompts', 'Word counter', 'Writing analytics', 'Export options'],
    techStack: ['React.js', 'OpenAI API', 'Local Storage', 'CSS3'],
    impact: 'Helps overcome writer\'s block',
    year: '2023',
    liveUrl: '#',
    githubUrl: '#'
  },
  {
    id: 'film-finder',
    title: 'Film Finder',
    description: 'Movie search app using OMDB API with smart debouncing',
    longDescription: 'A sleek movie discovery application that provides detailed movie information, ratings, and reviews with optimized search performance.',
    status: 'Complete',
    tags: ['API Integration', 'Search', 'Debouncing', 'Movie Database'],
    category: 'Entertainment',
    icon: '🎬',
    gradient: 'from-indigo-400 to-purple-500',
    features: ['Real-time search', 'Movie details', 'Rating system', 'Responsive design'],
    techStack: ['React.js', 'OMDB API', 'Axios', 'Tailwind CSS'],
    impact: 'Optimized search with 60% faster results',
    year: '2023',
    liveUrl: '#',
    githubUrl: '#'
  }
]

export default function ProjectSection({ showUXLaws = false }: ProjectSectionProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [activeFilter, setActiveFilter] = useState('All')
  const [isInView, setIsInView] = useState(false)
  const [hoveredProject, setHoveredProject] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const sectionRef = useRef<HTMLElement>(null)

  const categories = ['All', 'Productivity', 'Education', 'Game', 'Creative', 'Entertainment']

  const filteredProjects = activeFilter === 'All'
    ? projects
    : projects.filter(project => project.category === activeFilter)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
        }
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  // Auto-slide for featured projects
  useEffect(() => {
    if (isAutoPlaying && filteredProjects.length > 0) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % Math.min(3, filteredProjects.length))
      }, 4000)
      return () => clearInterval(interval)
    }
  }, [isAutoPlaying, filteredProjects.length])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Complete': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
      case 'In Progress': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
      case 'Almost Complete': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300'
    }
  }

  const openProjectDetail = (project: Project) => {
    setSelectedProject(project)
  }

  const closeProjectDetail = () => {
    setSelectedProject(null)
  }

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen py-20 px-4 bg-gradient-to-br from-gray-50 via-white to-purple-50/30 dark:from-gray-900 dark:via-black dark:to-purple-950/30 overflow-hidden"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/5 w-96 h-96 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/5 w-80 h-80 bg-gradient-to-r from-blue-400/10 to-cyan-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className={`text-center mb-16 transform transition-all duration-1000 ${isInView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="relative inline-block mb-8">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
              Featured Projects
            </h2>
            {showUXLaws && (
              <TooltipBubble
                lawName="Von Restorff Effect: Large, contrasting headers help important content stand out"
                description="top"
              />
            )}
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            A showcase of projects that combine technical excellence with thoughtful user experience design
          </p>
        </div>

        {/* Hero Project Carousel */}
        <div className={`mb-16 transform transition-all duration-1000 delay-200 ${isInView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Spotlight</h3>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                  className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  {isAutoPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </button>
                <div className="flex space-x-1">
                  {[0, 1, 2].map((index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${currentSlide === index
                        ? 'bg-blue-500 w-6'
                        : 'bg-gray-300 dark:bg-gray-600'
                        }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {filteredProjects.length > 0 && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div className="order-2 lg:order-1">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className={`w-12 h-12 bg-gradient-to-r ${filteredProjects[currentSlide]?.gradient} rounded-full flex items-center justify-center text-white text-xl`}>
                        {filteredProjects[currentSlide]?.icon}
                      </div>
                      <div>
                        <h4 className="text-2xl font-bold text-gray-900 dark:text-white">
                          {filteredProjects[currentSlide]?.title}
                        </h4>
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(filteredProjects[currentSlide]?.status || '')}`}>
                          {filteredProjects[currentSlide]?.status}
                        </span>
                      </div>
                    </div>

                    <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
                      {filteredProjects[currentSlide]?.longDescription}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {filteredProjects[currentSlide]?.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm text-gray-700 dark:text-gray-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex space-x-4">
                      <button
                        onClick={() => openProjectDetail(filteredProjects[currentSlide])}
                        className="flex items-center space-x-2 bg-black dark:bg-white text-white dark:text-black px-6 py-3 rounded-full font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-all duration-300 hover:scale-105"
                      >
                        <Eye className="w-4 h-4" />
                        <span>View Details</span>
                      </button>

                      {filteredProjects[currentSlide]?.liveUrl && (
                        <button className="flex items-center space-x-2 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-6 py-3 rounded-full font-medium hover:border-gray-400 dark:hover:border-gray-500 transition-all duration-300">
                          <ExternalLink className="w-4 h-4" />
                          <span>Live Demo</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                <div className="order-1 lg:order-2">
                  <div className="relative">
                    <div className={`w-full h-64 bg-gradient-to-br ${filteredProjects[currentSlide]?.gradient} rounded-2xl flex items-center justify-center text-white text-6xl shadow-2xl`}>
                      {filteredProjects[currentSlide]?.icon}
                    </div>
                    <div className="absolute -bottom-4 -right-4 bg-white dark:bg-gray-800 rounded-full p-4 shadow-lg">
                      <div className="text-2xl">{filteredProjects[currentSlide]?.year}</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {showUXLaws && (
              <TooltipBubble
                lawName="Progressive Disclosure: Hero section highlights key project, detailed view available on demand"
                description="top"
              />
            )}
          </div>
        </div>

        {/* Filter Controls */}
        <div className={`flex flex-col sm:flex-row justify-between items-center mb-12 space-y-4 sm:space-y-0 transform transition-all duration-1000 delay-400 ${isInView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${activeFilter === category
                  ? 'bg-blue-500 text-white shadow-lg'
                  : 'bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">View:</span>
            <div className="flex rounded-lg bg-white/80 dark:bg-gray-800/80 p-1 shadow-sm">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-3 py-1 rounded text-sm transition-all duration-200 ${viewMode === 'grid'
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-600 dark:text-gray-400'
                  }`}
              >
                Grid
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-3 py-1 rounded text-sm transition-all duration-200 ${viewMode === 'list'
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-600 dark:text-gray-400'
                  }`}
              >
                List
              </button>
            </div>
          </div>
        </div>

        {/* Projects Grid/List */}
        <div className={`transform transition-all duration-1000 delay-600 ${isInView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className={`grid gap-6 ${viewMode === 'grid'
            ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
            : 'grid-cols-1'
            }`}>
            {filteredProjects.map((project, index) => (
              <div
                key={project.id}
                className={`group relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-200/50 dark:border-gray-700/50 overflow-hidden cursor-pointer ${viewMode === 'list' ? 'flex items-center p-6' : 'p-6'
                  }`}
                style={{ animationDelay: `${index * 100}ms` }}
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
                onClick={() => openProjectDetail(project)}
              >
                {viewMode === 'grid' ? (
                  <>
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-12 h-12 bg-gradient-to-r ${project.gradient} rounded-full flex items-center justify-center text-white text-xl group-hover:scale-110 transition-transform duration-300`}>
                        {project.icon}
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                        {project.status}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {project.title}
                    </h3>

                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.slice(0, 3).map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-xs text-gray-700 dark:text-gray-300"
                        >
                          {tag}
                        </span>
                      ))}
                      {project.tags.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-xs text-gray-700 dark:text-gray-300">
                          +{project.tags.length - 3}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex space-x-2">
                        {project.liveUrl && (
                          <button className="p-2 bg-gray-100 dark:bg-gray-700 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                            <ExternalLink className="w-4 h-4" />
                          </button>
                        )}
                        {project.githubUrl && (
                          <button className="p-2 bg-gray-100 dark:bg-gray-700 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                            <Github className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-500 group-hover:translate-x-1 transition-all duration-300" />
                    </div>
                  </>
                ) : (
                  <div className="flex items-center space-x-6 w-full">
                    <div className={`w-16 h-16 bg-gradient-to-r ${project.gradient} rounded-full flex items-center justify-center text-white text-2xl flex-shrink-0`}>
                      {project.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">{project.title}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                          {project.status}
                        </span>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 mb-2">{project.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {project.tags.slice(0, 4).map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-xs text-gray-700 dark:text-gray-300"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {project.liveUrl && (
                        <button className="p-2 bg-gray-100 dark:bg-gray-700 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                          <ExternalLink className="w-4 h-4" />
                        </button>
                      )}
                      {project.githubUrl && (
                        <button className="p-2 bg-gray-100 dark:bg-gray-700 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                          <Github className="w-4 h-4" />
                        </button>
                      )}
                      <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
                    </div>
                  </div>
                )}

                {hoveredProject === project.id && showUXLaws && (
                  <TooltipBubble
                    lawName="Fitts's Law: Larger click targets and hover states improve interaction efficiency"
                    description="top"
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Project Detail Modal */}
        {selectedProject && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
            <div className="bg-white dark:bg-gray-800 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-slideUp">
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className={`w-16 h-16 bg-gradient-to-r ${selectedProject.gradient} rounded-full flex items-center justify-center text-white text-2xl`}>
                      {selectedProject.icon}
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{selectedProject.title}</h2>
                      <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedProject.status)}`}>
                        {selectedProject.status}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={closeProjectDetail}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                  >
                    <ChevronRight className="w-6 h-6 rotate-45 transform" />
                  </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Overview</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                      {selectedProject.longDescription}
                    </p>

                    <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Key Features</h3>
                    <ul className="space-y-2 mb-6">
                      {selectedProject.features.map((feature, index) => (
                        <li key={index} className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <span className="text-gray-600 dark:text-gray-400">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="flex space-x-4">
                      {selectedProject.liveUrl && (
                        <button className="flex items-center space-x-2 bg-black dark:bg-white text-white dark:text-black px-6 py-3 rounded-full font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-all duration-300">
                          <ExternalLink className="w-4 h-4" />
                          <span>Live Demo</span>
                        </button>
                      )}
                      {selectedProject.githubUrl && (
                        <button className="flex items-center space-x-2 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-6 py-3 rounded-full font-medium hover:border-gray-400 dark:hover:border-gray-500 transition-all duration-300">
                          <Github className="w-4 h-4" />
                          <span>View Code</span>
                        </button>
                      )}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Tech Stack</h3>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {selectedProject.techStack.map((tech, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm text-gray-700 dark:text-gray-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Impact</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                      {selectedProject.impact}
                    </p>

                    <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-6">
                      <h4 className="font-semibold mb-2 text-gray-900 dark:text-white">Project Details</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Year:</span>
                          <span className="text-gray-900 dark:text-white">{selectedProject.year}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Category:</span>
                          <span className="text-gray-900 dark:text-white">{selectedProject.category}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Status:</span>
                          <span className="text-gray-900 dark:text-white">{selectedProject.status}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Technologies:</span>
                          <span className="text-gray-900 dark:text-white">{selectedProject.techStack.length}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {showUXLaws && (
                  <TooltipBubble
                    lawName="Hick's Law: Modal focuses attention on single project, reducing cognitive load"
                    description="top"
                  />
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Add custom CSS for animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideUp {
          from { 
            opacity: 0;
            transform: translateY(20px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        
        .animate-slideUp {
          animation: slideUp 0.4s ease-out;
        }
        
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  )
}