import { useCallback, useEffect, useState } from 'react'
import CosmicCanvas from './components/CosmicCanvas'
import './index.css'

// Navigation Component
function Navigation() {
  return (
    <nav className="nav">
      <a href="#hero" className="nav__logo">SK</a>
      <ul className="nav__links">
        <li><a href="#about" className="nav__link">About</a></li>
        <li><a href="#skills" className="nav__link">Skills</a></li>
        <li><a href="#projects" className="nav__link">Projects</a></li>
        <li><a href="#contact" className="nav__link">Contact</a></li>
      </ul>
    </nav>
  )
}

// Progress Indicator
function ProgressIndicator({ activeSection }: { activeSection: number }) {
  const sections = ['hero', 'about', 'skills', 'projects', 'contact']
  
  return (
    <div className="progress">
      {sections.map((section, index) => (
        <a
          key={section}
          href={`#${section}`}
          className={`progress__dot ${index === activeSection ? 'active' : ''}`}
          aria-label={`Go to ${section} section`}
        />
      ))}
    </div>
  )
}

// Hero Section
function HeroSection() {
  return (
    <section id="hero" className="section hero">
      <span className="hero__greeting">Hello, I'm</span>
      <h1 className="hero__name">Sarang Kulkarni</h1>
      <p className="hero__title">Software Developer</p>
      <div className="hero__cta">
        <a href="#projects" className="btn btn--primary">
          View My Work
          <span>→</span>
        </a>
        <a href="#contact" className="btn btn--secondary">
          Get In Touch
        </a>
      </div>
      <div className="hero__scroll-indicator">
        <span>Scroll to explore</span>
        <div className="hero__scroll-line" />
      </div>
    </section>
  )
}

// About Section
function AboutSection() {
  return (
    <section id="about" className="section about">
      <span className="section__label">// About Me</span>
      <h2 className="section__title">Crafting Digital Experiences</h2>
      <p className="about__text">
        I'm a passionate <strong>Software Developer</strong> who loves building
        elegant solutions to complex problems. With a keen eye for detail and
        a love for clean code, I create applications that are not only functional
        but also delightful to use.
        <br /><br />
        When I'm not coding, you'll find me exploring new technologies,
        or diving deep into system design patterns.
        I believe in continuous learning and pushing the boundaries of what's
        possible with code.
      </p>
    </section>
  )
}

// Skills Section
function SkillsSection() {
  const skillCategories = [
    {
      icon: '⚡',
      title: 'Frontend',
      items: ['TypeScript', 'HTML', 'CSS', 'HTMX']
    },
    {
      icon: '🔧',
      title: 'Backend',
      items: ['Node.js', 'Python', 'PostgreSQL', 'Redis', 'Javascript']
    },
    {
      icon: '☁️',
      title: 'DevOps',
      items: ['AWS', 'Linux']
    },
    {
      icon: '🎯',
      title: 'Other',
      items: ['Git', 'REST APIs', 'Agile', 'NATS', 'Socket.io']
    },
    {
      icon: '🏗️',
      title: 'Frameworks',
      items: ['Express.js', 'Django']
    }
  ]
  
  return (
    <section id="skills" className="section skills">
      <span className="section__label">// What I Do</span>
      <h2 className="section__title">Skills & Expertise</h2>
      <div className="skills__grid">
        {skillCategories.map((category) => (
          <div key={category.title} className="skill-card">
            <div className="skill-card__icon">{category.icon}</div>
            <h3 className="skill-card__title">{category.title}</h3>
            <div className="skill-card__items">
              {category.items.map((item) => (
                <span key={item} className="skill-card__item">{item}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

// Projects Section
function ProjectsSection() {
  const projects = [
    {
      title: 'Project Alpha',
      description: 'A full-stack web application with real-time features and modern UI. Built with React and Node.js.',
      tech: ['React', 'Node.js', 'Socket.io', 'PostgreSQL'],
      github: '#',
      live: '#'
    },
    {
      title: 'Project Beta',
      description: 'Mobile-first e-commerce platform with seamless checkout flow and inventory management.',
      tech: ['Next.js', 'Stripe', 'MongoDB', 'Tailwind'],
      github: '#',
      live: '#'
    },
    {
      title: 'Project Gamma',
      description: 'AI-powered dashboard for data visualization and predictive analytics.',
      tech: ['Python', 'TensorFlow', 'D3.js', 'FastAPI'],
      github: '#',
      live: '#'
    }
  ]
  
  return (
    <section id="projects" className="section projects">
      <span className="section__label">// My Work</span>
      <h2 className="section__title">Featured Projects</h2>
      <div className="projects__grid">
        {projects.map((project) => (
          <article key={project.title} className="project-card">
            <div className="project-card__image" />
            <div className="project-card__content">
              <h3 className="project-card__title">{project.title}</h3>
              <p className="project-card__description">{project.description}</p>
              <div className="project-card__tech">
                {project.tech.map((tech) => (
                  <span key={tech} className="project-card__tech-item">{tech}</span>
                ))}
              </div>
              <div className="project-card__links">
                <a href={project.github} className="project-card__link">
                  GitHub ↗
                </a>
                <a href={project.live} className="project-card__link">
                  Live Demo ↗
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

// Contact Section
function ContactSection() {
  // Professional mailto template
  const emailSubject = encodeURIComponent("Opportunity to Connect - From Your Portfolio")
  const emailBody = encodeURIComponent(`Hi Sarang,

I came across your portfolio and was impressed by your work. I'd love to discuss a potential opportunity with you.

[Please describe the opportunity or project briefly]

Looking forward to hearing from you.

Best regards,
[Your Name]
[Your Company/Organization]`)
  
  const links = [
    { icon: '📧', label: 'Email', href: `mailto:sarang.kulkarni99@gmail.com?subject=${emailSubject}&body=${emailBody}` },
    { icon: '💼', label: 'LinkedIn', href: 'https://linkedin.com/in/sarangkulkarni99' },
    { icon: '🐙', label: 'GitHub', href: 'https://github.com/sarangkulkarni99' },
  ]
  
  return (
    <section id="contact" className="section contact">
      <span className="section__label">// Get In Touch</span>
      <h2 className="section__title">Let's Connect</h2>
      <p className="about__text" style={{ textAlign: 'center', maxWidth: '600px' }}>
        I'm always open to discussing new projects, creative ideas,
        or opportunities to be part of your vision.
      </p>
      
      {/* Resume Download Button */}
      <div style={{ marginTop: '2rem', marginBottom: '2rem' }}>
        <a 
          href="/resume.pdf" 
          download="Sarang_Kulkarni_Resume.pdf"
          className="btn btn--primary"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
        >
          <span>📄</span>
          Download Resume
          <span>↓</span>
        </a>
      </div>
      
      <div className="contact__links">
        {links.map((link) => (
          <a key={link.label} href={link.href} className="contact__link" target="_blank" rel="noopener noreferrer">
            <span className="contact__link-icon">{link.icon}</span>
            <span className="contact__link-label">{link.label}</span>
          </a>
        ))}
      </div>
    </section>
  )
}

// Loading Screen
function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0)
  
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(onComplete, 300)
          return 100
        }
        return prev + Math.random() * 15
      })
    }, 100)
    
    return () => clearInterval(interval)
  }, [onComplete])
  
  return (
    <div className="loading" style={{ opacity: progress >= 100 ? 0 : 1, transition: 'opacity 0.5s' }}>
      <div className="loading__spinner" />
      <div className="loading__text">Loading universe... {Math.min(100, Math.round(progress))}%</div>
    </div>
  )
}

// Main App
function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [activeSection, setActiveSection] = useState(0)
  
  const handleLoadingComplete = useCallback(() => {
    setIsLoading(false)
  }, [])
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = scrollTop / docHeight
      setScrollProgress(progress)
      
      // Determine active section
      const sections = ['hero', 'about', 'skills', 'projects', 'contact']
      const sectionElements = sections.map(id => document.getElementById(id))
      
      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const el = sectionElements[i]
        if (el && el.getBoundingClientRect().top <= window.innerHeight / 2) {
          setActiveSection(i)
          break
        }
      }
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  return (
    <>
      {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}
      
      <CosmicCanvas scrollProgress={scrollProgress} />
      
      <Navigation />
      <ProgressIndicator activeSection={activeSection} />
      
      <main className="content-overlay">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ContactSection />
      </main>
    </>
  )
}

export default App
