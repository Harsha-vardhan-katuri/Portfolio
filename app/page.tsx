import Hero from "@/components/Hero"
import About from "@/components/About"
import PortfolioGrid from "@/components/PortfolioGrid"
import CTA from "@/components/CTA"

// Sample portfolio data
const portfolioProjects = [
  {
    id: '1',
    title: 'Luxury Brand Website',
    description: 'Premium digital experience for a high-end fashion brand with smooth animations',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=400&fit=crop',
    tags: ['Web Design', 'Animation', 'Luxury'],
    link: '#',
  },
  {
    id: '2',
    title: 'Interactive Dashboard',
    description: 'Data visualization platform with real-time updates and custom interactions',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
    tags: ['UI/UX', 'Dashboard', 'Analytics'],
    link: '#',
  },
  {
    id: '3',
    title: 'Mobile App Redesign',
    description: 'Complete redesign of mobile experience with focus on usability and aesthetics',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&h=400&fit=crop',
    tags: ['Mobile', 'Design', 'Redesign'],
    link: '#',
  },
  {
    id: '4',
    title: 'E-commerce Platform',
    description: 'Full-stack e-commerce solution with premium checkout experience',
    image: 'https://images.unsplash.com/photo-1460925895917-adf4e565db18?w=600&h=400&fit=crop',
    tags: ['E-commerce', 'Full Stack', 'UX'],
    link: '#',
  },
  {
    id: '5',
    title: 'Brand Identity System',
    description: 'Comprehensive brand guidelines and design system for scaling',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=400&fit=crop',
    tags: ['Branding', 'Design System', 'Guidelines'],
    link: '#',
  },
  {
    id: '6',
    title: 'Real Estate Portal',
    description: 'Immersive real estate browsing with 3D visualization and smooth navigation',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
    tags: ['Real Estate', '3D', 'Web'],
    link: '#',
  },
]

export default function Home() {
  return (
    <main className="bg-[var(--color-bg)] text-[var(--color-fg)] overflow-x-hidden">
      <Hero />
      <About />
      <PortfolioGrid 
        projects={portfolioProjects}
        title="Featured Projects"
        subtitle="Curated selection of premium digital experiences"
      />
      <CTA />
    </main>
  )
}
