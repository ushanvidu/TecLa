import { useEffect, useState } from 'react';
import { useMagnetic } from '../hooks/useMagnetic';
import './Nav.css';

const LINKS = [
  { href: '#services', label: 'Services' },
  { href: '#work', label: 'Work' },
  { href: '#process', label: 'Process' },
  { href: '#culture', label: 'Team' },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const ctaRef = useMagnetic<HTMLAnchorElement>();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 820) setMenuOpen(false);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <>
      <nav className={`tl-nav${scrolled ? ' tl-nav-scrolled' : ''}`}>
        <a href="#top" className="tl-logo">
          <span className="tl-logo-mark">
            <span className="tl-logo-mark-bg" />
            <span className="tl-logo-mark-dot" />
          </span>
          <span className="tl-wordmark">
            Tec<span className="tl-accent-text">La</span>
          </span>
        </a>
        <div className="tl-navlinks">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href}>
              {l.label}
            </a>
          ))}
        </div>
        <a ref={ctaRef} href="#contact" className="tl-nav-cta">
          Start a project →
        </a>
        <button
          className="tl-burger"
          aria-label="Menu"
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      <div className={`tl-mobile-menu${menuOpen ? ' tl-mobile-menu-open' : ''}`}>
        {LINKS.map((l) => (
          <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)}>
            {l.label}
          </a>
        ))}
        <a href="#contact" className="tl-mobile-cta" onClick={() => setMenuOpen(false)}>
          Start a project →
        </a>
      </div>
    </>
  );
}
