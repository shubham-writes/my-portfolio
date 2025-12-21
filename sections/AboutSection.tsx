'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useUxStore } from '@/store/useUxStore'
import UxAnnotate from '@/components/ui/UxAnnotate'

// Helper Component for Bento Cards
const BentoCard = ({ children, className = "", delay = 0 }: { children: React.ReactNode, className?: string, delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.5, delay }}
    className={`bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-3xl p-6 shadow-xl border border-gray-200/50 dark:border-gray-700/50 hover:shadow-2xl transition-shadow duration-300 ${className}`}
  >
    {children}
  </motion.div>
)

export default function AboutSection() {
  const containerRef = useRef<HTMLElement>(null)

  // Parallax for the Title (kept as requested for nice scroll effect)
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] })
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const y = useTransform(scrollYProgress, [0, 1], [100, -100])

  const techStack = [
    { name: 'Next.js', icon: '▲' },
    { name: 'React', icon: '⚛️' },
    { name: 'TypeScript', icon: '🔷' },
    { name: 'Tailwind', icon: '🎨' },
    { name: 'Figma', icon: '🖌️' },
    { name: 'Redux', icon: '🔄' },
    { name: 'Node.js', icon: '🟢' },
    { name: 'Git', icon: '📦' },
    { name: 'Husky', icon: '🐶' },
    { name: 'Framer', icon: '✨' }
  ]

  // Duplicate the array to ensure seamless infinite scrolling
  const infiniteTechStack = [...techStack, ...techStack]

  return (
    <section ref={containerRef} id="about" className="relative min-h-screen py-24 px-4 overflow-hidden bg-gray-50 dark:bg-gray-900">

      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[20%] right-[10%] w-72 h-72 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-[20%] left-[10%] w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16">
          <UxAnnotate law="Visual Hierarchy" insight="Clear headings establish context immediately.">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400"
            >
              Beyond the Code
            </motion.h2>
          </UxAnnotate>
          <p className="mt-4 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            A glimpse into my journey, experience, and the tools I use to build digital products.
          </p>
        </div>

        {/* BENTO GRID LAYOUT */}
        <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-3 gap-6 auto-rows-[minmax(180px,auto)]">

          {/* 1. BIO CARD */}
          <UxAnnotate law="Face-ism Ratio" insight="Personal photos build trust and human connection." className="md:col-span-2 md:row-span-2 z-10">
            <BentoCard className="h-full flex flex-col justify-between relative overflow-hidden group">
              <div className="relative z-10">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 p-[2px]">
                    <div className="w-full h-full rounded-full bg-white dark:bg-gray-800 overflow-hidden">
                      <img src="/images/MyProfile.jpg" alt="Profile" className="w-full h-full object-cover" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Shubham Verma</h3>
                    <p className="text-blue-600 dark:text-blue-400 font-medium">Frontend Engineer</p>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-6">
                  I'm a B.Tech graduate ('25) from MNNIT Allahabad with a passion for
                  <span className="font-semibold text-gray-900 dark:text-white"> pixel-perfect UIs </span>
                  and scalable architecture. I don't just write code; I craft experiences that users love.
                </p>
                <div className="flex flex-wrap gap-3">
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
                    Open to Work
                  </span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                    🇮🇳 Based in India
                  </span>
                </div>
              </div>
              <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700 ease-in-out" />
            </BentoCard>
          </UxAnnotate>

          {/* 2. STATS CARD */}
          <UxAnnotate law="Social Proof" insight="Quantifiable metrics increase credibility." className="z-10">
            <BentoCard delay={0.1} className="flex flex-col justify-center items-center text-center bg-gradient-to-br from-blue-600 to-blue-700 text-white border-none">
              <span className="text-5xl font-bold mb-2">5+</span>
              <span className="text-blue-100 font-medium">Projects Shipped</span>
            </BentoCard>
          </UxAnnotate>

          {/* 3. EXPERIENCE CARD */}
          <UxAnnotate law="Authority Bias" insight="Professional experience establishes expertise." className="md:row-span-2">
            <BentoCard delay={0.2} className="h-full flex flex-col">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg text-2xl">💼</div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Experience</h3>
              </div>

              <div className="relative pl-6 border-l-2 border-gray-200 dark:border-gray-700 space-y-8">
                {/* TutorEdge Internship */}
                <div className="relative">
                  <div className="absolute -left-[31px] w-4 h-4 rounded-full border-4 border-white dark:border-gray-800 bg-blue-500" />
                  <h4 className="font-bold text-gray-900 dark:text-white">Frontend Intern</h4>
                  <p className="text-sm text-blue-600 dark:text-blue-400 mb-2">TutorEdge • Sept - Nov 2025</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-3">
                    Spearheaded the <span className="font-semibold text-gray-800 dark:text-gray-200">end-to-end development</span> of the entire platform.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {['Next.js', 'Husky', 'Tailwind'].map(tag => (
                      <span key={tag} className="text-[10px] uppercase tracking-wider font-bold text-gray-500 border border-gray-200 dark:border-gray-700 px-2 py-1 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Previous Education */}
                <div className="relative">
                  <div className="absolute -left-[31px] w-4 h-4 rounded-full border-4 border-white dark:border-gray-800 bg-gray-300" />
                  <h4 className="font-bold text-gray-900 dark:text-white">B.Tech Degree</h4>
                  <p className="text-sm text-gray-500 mb-1">MNNIT Allahabad</p>
                  <p className="text-xs text-gray-400">2021 - 2025</p>
                </div>
              </div>
            </BentoCard>
          </UxAnnotate>

          {/* 4. TECH STACK (My Arsenal) - INFINITE MARQUEE */}
          <UxAnnotate law="Hick's Law" insight="Continuous loop reduces interaction cost (no clicking required)." className="md:col-span-2">
            <BentoCard delay={0.3} className="h-full flex flex-col justify-center overflow-hidden">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">My Arsenal</h3>
                <div className="text-xs text-blue-500 bg-blue-100 px-2 py-1 rounded-full">
                  Infinite Scroll
                </div>
              </div>

              {/* MARQUEE CONTAINER */}
              <div className="relative w-full overflow-hidden mask-gradient">
                {/* Gradients to fade edges */}
                <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-white dark:from-gray-800 to-transparent z-10" />
                <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-white dark:from-gray-800 to-transparent z-10" />

                {/* MOVING TRACK */}
                <motion.div
                  className="flex gap-8 w-max"
                  animate={{ x: ["0%", "-50%"] }}
                  transition={{
                    repeat: Infinity,
                    ease: "linear",
                    duration: 20 // Adjust speed here (higher = slower)
                  }}
                  whileHover={{ animationPlayState: "paused" }} // Optional: Pause on hover logic via CSS usually, but for framer we might need state. 
                // Simple Framer hover pause is tricky, so simpler to leave continuous or use specific handler. 
                // For simplicity, we keep it flowing.
                >
                  {infiniteTechStack.map((tech, index) => (
                    <div
                      key={`${tech.name}-${index}`}
                      className="flex flex-col items-center justify-center min-w-[80px] group cursor-pointer"
                    >
                      <div className="w-12 h-12 flex items-center justify-center bg-gray-50 dark:bg-gray-700/50 rounded-xl mb-2 group-hover:scale-110 group-hover:bg-white dark:group-hover:bg-gray-600 transition-all duration-300 shadow-sm">
                        <span className="text-2xl filter drop-shadow-sm">{tech.icon}</span>
                      </div>
                      <span className="text-[10px] font-medium text-gray-600 dark:text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity">
                        {tech.name}
                      </span>
                    </div>
                  ))}
                </motion.div>
              </div>
            </BentoCard>
          </UxAnnotate>

        </div>
      </div>
    </section>
  )
}