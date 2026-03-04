'use client'

import StaggeredText from './StaggeredText'
import MagneticButton from './MagneticButton'
import SectionReveal from './SectionReveal'

/**
 * CTA (Call-to-Action) section
 * Premium call-to-action section with magnetic buttons
 */
export const CTA: React.FC = () => {
  return (
    <section className="relative py-20 lg:py-32 px-4 sm:px-6 lg:px-8 w-full bg-[var(--color-bg)]">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-[var(--color-accent-primary)] rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse" />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-[var(--color-accent-secondary)] rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <SectionReveal>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-[var(--color-fg)] mb-6">
            <StaggeredText
              text="Ready to Elevate?"
              className="block"
              splitType="words"
              staggerDelay={0.15}
              duration={1}
            />
          </h2>

          <p className="text-lg md:text-xl text-[var(--color-fg-secondary)] mb-10 max-w-2xl mx-auto leading-relaxed">
            Let's create something extraordinary together. Connect with us to discuss your vision and bring it to life.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <MagneticButton
              variant="primary"
              size="lg"
              magnetic={true}
              strength={0.4}
              onClick={() => {
                // Handle contact action
                console.log('Contact clicked')
              }}
            >
              Get In Touch
            </MagneticButton>
            <MagneticButton
              variant="outline"
              size="lg"
              magnetic={true}
              strength={0.4}
              onClick={() => {
                // Handle schedule call action
                console.log('Schedule call clicked')
              }}
            >
              Schedule Call
            </MagneticButton>
          </div>
        </SectionReveal>

        {/* Divider */}
        <div className="mt-16 pt-12 border-t border-[var(--color-border)]">
          <SectionReveal delay={0.1}>
            <p className="text-sm text-[var(--color-fg-secondary)]">
              Response time: Usually within 24 hours
            </p>
          </SectionReveal>
        </div>
      </div>
    </section>
  )
}

export default CTA
