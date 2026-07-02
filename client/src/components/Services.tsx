import { useReveal } from '../hooks/useReveal';
import { useParallax } from '../hooks/useParallax';
import './Services.css';

interface Service {
  num: string;
  title: string;
  desc: string;
  pills: string[];
  img: string;
  alt: string;
  imageSide: 'left' | 'right';
  highlighted?: boolean;
  revealDelay?: number;
}

const SERVICES: Service[] = [
  {
    num: '01',
    title: 'Software Development',
    desc: 'Custom platforms, APIs, and distributed systems engineered to scale from your first user to your millionth.',
    pills: ['Cloud-native architecture', 'APIs & integrations', 'DevOps & reliability'],
    img: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=760&q=72',
    alt: 'Engineering team building software',
    imageSide: 'left',
  },
  {
    num: '02',
    title: 'Web Development',
    desc: 'Fast, beautiful, conversion-focused web experiences built on modern stacks like MERN and Next.js.',
    pills: ['Marketing & product sites', 'Web apps & dashboards', 'Performance & SEO'],
    img: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=760&q=72',
    alt: 'Designer building a web experience',
    imageSide: 'right',
    revealDelay: 90,
  },
  {
    num: '03',
    title: 'AI Solutions',
    desc: 'LLM copilots, automation, and intelligent features woven directly into your product and workflows.',
    pills: ['LLM & RAG systems', 'Intelligent automation', 'ML model deployment'],
    img: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=760&q=72',
    alt: 'Team working on AI solutions',
    imageSide: 'left',
    highlighted: true,
    revealDelay: 180,
  },
];

function ServicePanel({ service }: { service: Service }) {
  const revealRef = useReveal<HTMLElement>(service.revealDelay ?? 0);
  const parallaxRef = useParallax<HTMLImageElement>(0.06);
  const imagePane = (
    <div className="tl-service-image">
      <img
        ref={parallaxRef}
        src={service.img}
        alt={service.alt}
        loading="lazy"
        onError={(e) => {
          const target = e.currentTarget;
          target.parentElement!.style.background =
            'repeating-linear-gradient(45deg,#12201b 0 14px,#0d1714 14px 28px)';
          target.style.display = 'none';
        }}
      />
      <div className={`tl-service-image-gradient tl-service-image-gradient-${service.imageSide}`} />
      <span className={`tl-service-badge tl-service-badge-${service.imageSide}`}>{service.num}</span>
    </div>
  );

  const textPane = (
    <div className="tl-service-text">
      <h3>{service.title}</h3>
      <p>{service.desc}</p>
      <div className="tl-service-pills">
        {service.pills.map((pill) => (
          <span key={pill} className={service.highlighted ? 'tl-pill tl-pill-accent' : 'tl-pill'}>
            {pill}
          </span>
        ))}
      </div>
    </div>
  );

  return (
    <article
      ref={revealRef}
      className={`tl-reveal tl-service${service.highlighted ? ' tl-service-highlighted' : ''}`}
    >
      {service.imageSide === 'left' ? (
        <>
          {imagePane}
          {textPane}
        </>
      ) : (
        <>
          {textPane}
          {imagePane}
        </>
      )}
    </article>
  );
}

export function Services() {
  const headerRef = useReveal<HTMLParagraphElement>();
  const titleRef = useReveal<HTMLHeadingElement>(60);

  return (
    <section id="services" className="tl-services">
      <div className="tl-section-head">
        <p ref={headerRef} className="tl-reveal tl-eyebrow">
          01 — WHAT WE DO
        </p>
        <h2 ref={titleRef} className="tl-reveal tl-section-title">
          Three disciplines. One relentless standard of craft.
        </h2>
      </div>
      <div className="tl-services-list">
        {SERVICES.map((service) => (
          <ServicePanel key={service.num} service={service} />
        ))}
      </div>
    </section>
  );
}
