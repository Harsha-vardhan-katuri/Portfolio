'use client'

import StaggeredText from './StaggeredText'
import SectionReveal from './SectionReveal'
import ProjectCard from './ProjectCard'

interface Portfolio {
  id: string
  title: string
  description: string
  image: string
  tags: string[]
  link?: string
}

interface PortfolioGridProps {
  projects: Portfolio[]
  title?: string
  subtitle?: string
}

/**
 * PortfolioGrid component
 * Displays portfolio projects in a responsive grid with staggered animations
 */
export const PortfolioGrid: React.FC<PortfolioGridProps> = ({
  projects,
  title = 'Featured Projects',
  subtitle = 'A selection of our finest work',
}) => {
  return (
    <section className="relative py-20 lg:py-32 px-4 sm:px-6 lg:px-8 w-full bg-[var(--color-bg)]">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-[var(--color-accent-primary)] rounded-full mix-blend-multiply filter blur-3xl opacity-5" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[var(--color-accent-secondary)] rounded-full mix-blend-multiply filter blur-3xl opacity-5" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <SectionReveal className="mb-16 lg:mb-20">
          <div className="text-center mb-12">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-[var(--color-fg)] mb-4">
              <StaggeredText
                text={title}
                className="block"
                splitType="words"
                staggerDelay={0.12}
                duration={0.8}
              />
            </h2>
            <p className="text-lg text-[var(--color-fg-secondary)] max-w-2xl mx-auto">
              {subtitle}
            </p>
          </div>
        </SectionReveal>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {projects.map((project, index) => (
            <SectionReveal
              key={project.id}
              delay={index * 0.1}
            >
              <ProjectCard
                title={project.title}
                description={project.description}
                image={project.image}
                tags={project.tags}
                link={project.link}
              />
            </SectionReveal>
          ))}
        </div>

        {/* Call to action */}
        {projects.length > 0 && (
          <SectionReveal className="mt-16 text-center">
            <a
              href="#contact"
              style={{
                transitionTimingFunction: 'cubic-bezier(0.23, 1, 0.32, 1)',
              }}
              className="inline-flex items-center gap-3 px-8 py-4 text-lg font-medium text-[var(--color-bg)] bg-[var(--color-accent-primary)] rounded-lg hover:bg-[var(--color-accent-secondary)] transition-all duration-300"
            >
              Start Your Project
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </a>
          </SectionReveal>
        )}
      </div>
    </section>
  )
}

export default PortfolioGrid
