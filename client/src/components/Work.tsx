import { useReveal } from '../hooks/useReveal';
import { useParallax } from '../hooks/useParallax';
import { useTilt } from '../hooks/useTilt';
import { mergeRefs } from '../hooks/mergeRefs';
import './Work.css';

interface Project {
  category: string;
  categoryColor: 'main' | 'light';
  title: string;
  desc: string;
  img: string;
  alt: string;
  stripe: 'main' | 'light';
  delay?: number;
}

const PROJECTS: Project[] = [
  {
    category: 'FINTECH · WEB APP',
    categoryColor: 'main',
    title: 'Vaultly Payments',
    desc: 'A real-time payments dashboard processing millions in daily volume.',
    img: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=640&q=70',
    alt: 'Fintech team reviewing a payments dashboard',
    stripe: 'main',
  },
  {
    category: 'SAAS · AI SOLUTION',
    categoryColor: 'light',
    title: 'Meridian Copilot',
    desc: 'An LLM assistant that cut support resolution time by 62%.',
    img: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=640&q=70',
    alt: 'Product lead working with an AI copilot',
    stripe: 'light',
    delay: 90,
  },
  {
    category: 'COMMERCE · PLATFORM',
    categoryColor: 'main',
    title: 'Orbital Retail',
    desc: 'A headless commerce platform scaling across 12 markets.',
    img: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=640&q=70',
    alt: 'Commerce team collaborating in the office',
    stripe: 'main',
    delay: 180,
  },
];

function ProjectCard({ project }: { project: Project }) {
  const revealRef = useReveal<HTMLElement>(project.delay ?? 0);
  const tiltRef = useTilt<HTMLElement>();
  const parallaxRef = useParallax<HTMLImageElement>(0.05);

  return (
    <article ref={mergeRefs(revealRef, tiltRef)} className="tl-reveal tl-work-card">
      <div className={`tl-work-image tl-work-image-${project.stripe}`}>
        <img
          ref={parallaxRef}
          src={project.img}
          alt={project.alt}
          loading="lazy"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />
        <div className="tl-work-image-gradient" />
        <div className="tl-work-overlay">
          <span className="tl-work-overlay-pill">View Case Study →</span>
        </div>
      </div>
      <div className="tl-work-body">
        <p className={`tl-work-category tl-work-category-${project.categoryColor}`}>{project.category}</p>
        <h3 className="tl-work-title">{project.title}</h3>
        <p className="tl-work-desc">{project.desc}</p>
      </div>
    </article>
  );
}

export function Work() {
  const headerRef = useReveal<HTMLParagraphElement>();
  const titleRef = useReveal<HTMLHeadingElement>(60);

  return (
    <section id="work" className="tl-work">
      <div className="tl-work-head">
        <div className="tl-section-head" style={{ marginBottom: 0 }}>
          <p ref={headerRef} className="tl-reveal tl-eyebrow">
            03 — SELECTED WORK
          </p>
          <h2 ref={titleRef} className="tl-reveal tl-section-title">
            Products we're proud of.
          </h2>
        </div>
      </div>
      <div className="tl-work-grid">
        {PROJECTS.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </section>
  );
}
