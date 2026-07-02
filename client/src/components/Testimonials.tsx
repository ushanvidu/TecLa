import { useEffect, useRef, useState } from 'react';
import { useReveal } from '../hooks/useReveal';
import './Testimonials.css';

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  avatar: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "TecLa didn't just build our platform — they became the engineering partner we'd been searching for. Fast, thoughtful, and genuinely great at their craft.",
    name: 'Elena Vasquez',
    role: 'VP Engineering, Meridian',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=75',
  },
  {
    quote:
      "They shipped in weeks what our last vendor couldn't in a year. TecLa's AI copilot cut our support resolution time by more than half.",
    name: 'Marcus Chen',
    role: 'CTO, Vaultly',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=75',
  },
  {
    quote:
      'Every release felt effortless on our side — clear communication, real craft, and a team that genuinely cared about our customers.',
    name: 'Sofia Alvarez',
    role: 'Head of Product, Orbital',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=120&q=75',
  },
];

export function Testimonials() {
  const headerRef = useReveal<HTMLParagraphElement>();
  const trackWrapRef = useReveal<HTMLDivElement>(80);
  const pointerWrapRef = useRef<HTMLDivElement | null>(null);
  const [index, setIndex] = useState(0);
  const n = TESTIMONIALS.length;

  const go = (k: number) => setIndex(((k % n) + n) % n);

  useEffect(() => {
    const timer = window.setInterval(() => setIndex((i) => (i + 1) % n), 6000);
    return () => window.clearInterval(timer);
  }, [n, index]);

  useEffect(() => {
    const wrap = pointerWrapRef.current;
    if (!wrap) return;
    let sx: number | null = null;
    let sy: number | null = null;
    const down = (e: PointerEvent) => {
      sx = e.clientX;
      sy = e.clientY;
    };
    const up = (e: PointerEvent) => {
      if (sx == null || sy == null) return;
      const dx = e.clientX - sx;
      const dy = e.clientY - sy;
      if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) {
        go(dx < 0 ? index + 1 : index - 1);
      }
      sx = null;
    };
    wrap.addEventListener('pointerdown', down);
    wrap.addEventListener('pointerup', up);
    return () => {
      wrap.removeEventListener('pointerdown', down);
      wrap.removeEventListener('pointerup', up);
    };
  }, [index]);

  return (
    <section className="tl-testimonials">
      <p ref={headerRef} className="tl-reveal tl-eyebrow tl-testimonials-eyebrow">
        05 — WHAT CLIENTS SAY
      </p>
      <div ref={trackWrapRef} className="tl-reveal tl-testimonials-viewport">
        <div ref={pointerWrapRef} className="tl-testimonials-pointer-wrap">
          <div
            className="tl-testimonials-track"
            style={{ transform: `translateX(${-index * 100}%)` }}
          >
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="tl-testimonial-slide">
                <blockquote>&ldquo;{t.quote}&rdquo;</blockquote>
                <div className="tl-testimonial-author">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    loading="lazy"
                    onError={(e) => {
                      const target = e.currentTarget;
                      target.style.background = 'linear-gradient(135deg, var(--accent), var(--accent-deep))';
                      target.removeAttribute('src');
                    }}
                  />
                  <div className="tl-testimonial-author-info">
                    <p className="tl-testimonial-name">{t.name}</p>
                    <p className="tl-testimonial-role">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="tl-testimonials-controls">
        <button aria-label="Previous" onClick={() => go(index - 1)}>
          ←
        </button>
        <div className="tl-testimonials-dots">
          {TESTIMONIALS.map((t, i) => (
            <span
              key={t.name}
              className={i === index ? 'tl-dot tl-dot-active' : 'tl-dot'}
              onClick={() => go(i)}
            />
          ))}
        </div>
        <button aria-label="Next" onClick={() => go(index + 1)}>
          →
        </button>
      </div>
    </section>
  );
}
