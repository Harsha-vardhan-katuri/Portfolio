'use client'

import StaggeredText from './StaggeredText'
import SectionReveal from './SectionReveal'

/**
 * About section
 * Premium about section with luxury typography and animations
 */
export const About: React.FC = () => {
  return (
    <section className="relative py-20 lg:py-32 px-4 sm:px-6 lg:px-8 w-full bg-[var(--color-bg-secondary)]">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--color-accent-primary)] rounded-full mix-blend-multiply filter blur-3xl opacity-5" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left content */}
          <SectionReveal>
            <div>
              <h2 className="text-5xl md:text-6xl font-serif font-bold text-[var(--color-fg)] mb-6">
                <StaggeredText
                  text="About Excellence"
                  className="block"
                  splitType="words"
                  staggerDelay={0.12}
                  duration={0.8}
                />
              </h2>

              <div className="space-y-4 text-[var(--color-fg-secondary)]">
                <p className="text-lg leading-relaxed">
                  We believe in the power of meticulous design coupled with cutting-edge technology. Every pixel, every interaction, every animation tells a story.
                </p>
                <p className="text-lg leading-relaxed">
                  Our approach focuses on creating digital experiences that are not just beautiful, but purposeful. We don't just build websites; we craft digital narratives.
                </p>
                <p className="text-lg leading-relaxed">
                  With years of expertise in premium digital design, we've learned that true luxury lies in the details—smooth transitions, perfect timing, and seamless user experiences.
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mt-12 pt-12 border-t border-[var(--color-border)]">
                {[
                  { number: '50+', label: 'Projects' },
                  { number: '30+', label: 'Clients' },
                  { number: '5+', label: 'Years' },
                ].map((stat, idx) => (
                  <div key={idx} className="text-center">
                    <div className="text-3xl font-serif font-bold text-[var(--color-accent-primary)]">
                      {stat.number}
                    </div>
                    <div className="text-sm text-[var(--color-fg-secondary)]">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </SectionReveal>

          {/* Right visual */}
          <SectionReveal delay={0.1}>
            <div className="relative">
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-[var(--color-accent-primary)] to-[var(--color-accent-secondary)] opacity-20" />
              <div className="absolute inset-4 rounded-2xl border border-[var(--color-border)] flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl font-serif font-bold text-[var(--color-accent-primary)] mb-2">
                    ∞
                  </div>
                  <p className="text-[var(--color-fg-secondary)]">
                    Endless Possibilities
                  </p>
                </div>
              </div>
            </div>
          </SectionReveal>
        </div>
      </div>
    </section>
  )
}

export default About
