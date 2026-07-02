import { useEffect, useRef } from 'react';
import { useReveal } from '../hooks/useReveal';
import { useMagnetic } from '../hooks/useMagnetic';
import { mountHeroScene } from '../three/heroScene';
import './Hero.css';

export function Hero() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const headingRef = useReveal<HTMLHeadingElement>(80);
  const subRef = useReveal<HTMLParagraphElement>(160);
  const ctaRef = useReveal<HTMLDivElement>(240);
  const magneticRef = useMagnetic<HTMLAnchorElement>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    return mountHeroScene(canvas);
  }, []);

  return (
    <header id="top" className="tl-hero">
      <canvas ref={canvasRef} className="tl-hero-canvas" />
      <div className="tl-hero-glow-top" />
      <div className="tl-hero-glow-bottom" />
      <div className="tl-hero-grid" />
      <div className="tl-hero-fade" />

      <div className="tl-hero-content">
        <h1 ref={headingRef} className="tl-reveal tl-hero-title">
          Where ambitious ideas
          <br />
          become <span className="tl-hero-title-accent">intelligent software</span>.
        </h1>
        <p ref={subRef} className="tl-reveal tl-hero-sub">
          TecLa partners with startups and enterprises to design, engineer, and scale
          software, web platforms, and AI products that people love to use.
        </p>
        <div ref={ctaRef} className="tl-reveal tl-hero-ctas">
          <a ref={magneticRef} href="#contact" className="tl-btn tl-btn-primary">
            Start your project →
          </a>
          <a href="#work" className="tl-btn tl-btn-ghost">
            See our work
          </a>
        </div>
      </div>

      <div className="tl-hero-scroll">
        <span className="tl-hero-scroll-label">SCROLL</span>
        <span className="tl-hero-scroll-line" />
      </div>
    </header>
  );
}
