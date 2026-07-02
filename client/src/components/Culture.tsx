import { useEffect, useRef } from 'react';
import { useReveal } from '../hooks/useReveal';
import './Culture.css';

interface Photo {
  img: string;
  alt: string;
  label: string;
  caption: string;
}

const PHOTOS: Photo[] = [
  { img: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=560&q=70', alt: 'Engineers pair-programming', label: 'ENGINEERING', caption: 'Ship-fast pods' },
  { img: 'https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?auto=format&fit=crop&w=560&q=70', alt: 'Team collaborating', label: 'COLLABORATION', caption: 'One shared roadmap' },
  { img: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=560&q=70', alt: 'Product designer at work', label: 'PRODUCT & DESIGN', caption: 'Craft in every pixel' },
  { img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=560&q=70', alt: 'Strategist presenting', label: 'STRATEGY', caption: 'Outcomes, not output' },
  { img: 'https://images.unsplash.com/photo-1552581234-26160f608093?auto=format&fit=crop&w=560&q=70', alt: 'Team in a planning session', label: 'DELIVERY', caption: 'Weekly, reliable releases' },
  { img: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=560&q=70', alt: 'Modern studio workspace', label: 'CULTURE', caption: 'A studio that cares' },
];

export function Culture() {
  const headerRef = useReveal<HTMLParagraphElement>();
  const titleRef = useReveal<HTMLHeadingElement>(60);
  const descRef = useReveal<HTMLParagraphElement>(120);
  const dragLabelRef = useReveal<HTMLDivElement>(120);

  const stripRef = useRef<HTMLDivElement | null>(null);
  const barRef = useRef<HTMLDivElement | null>(null);
  const thumbRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const strip = stripRef.current;
    const bar = barRef.current;
    const thumb = thumbRef.current;
    if (!strip || !bar || !thumb) return;

    const maxScroll = () => Math.max(1, strip.scrollWidth - strip.clientWidth);
    const barRange = () => Math.max(1, bar.clientWidth - thumb.offsetWidth);
    const syncThumb = () => {
      thumb.style.left = (strip.scrollLeft / maxScroll()) * barRange() + 'px';
    };

    strip.addEventListener('scroll', syncThumb, { passive: true });
    window.addEventListener('resize', syncThumb);

    let dragging = false;
    let startX = 0;
    let startLeft = 0;
    const move = (e: PointerEvent) => {
      if (!dragging) return;
      const nl = Math.max(0, Math.min(barRange(), startLeft + (e.clientX - startX)));
      thumb.style.left = nl + 'px';
      strip.scrollLeft = (nl / barRange()) * maxScroll();
    };
    const up = () => {
      dragging = false;
      thumb.style.cursor = 'grab';
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    const onThumbDown = (e: PointerEvent) => {
      dragging = true;
      startX = e.clientX;
      startLeft = parseFloat(thumb.style.left || '0');
      thumb.style.cursor = 'grabbing';
      window.addEventListener('pointermove', move);
      window.addEventListener('pointerup', up);
      e.preventDefault();
    };
    thumb.addEventListener('pointerdown', onThumbDown);

    let sDown = false;
    let sX = 0;
    let sL = 0;
    let moved = false;
    const onStripDown = (e: PointerEvent) => {
      if ((e.target as HTMLElement).closest('[data-strip-thumb]')) return;
      sDown = true;
      moved = false;
      sX = e.clientX;
      sL = strip.scrollLeft;
      strip.style.cursor = 'grabbing';
    };
    const onWindowMove = (e: PointerEvent) => {
      if (!sDown) return;
      if (Math.abs(e.clientX - sX) > 3) moved = true;
      strip.scrollLeft = sL - (e.clientX - sX);
    };
    const onWindowUp = () => {
      sDown = false;
      strip.style.cursor = 'grab';
    };
    const onStripClick = (e: MouseEvent) => {
      if (moved) e.preventDefault();
    };
    strip.addEventListener('pointerdown', onStripDown);
    window.addEventListener('pointermove', onWindowMove);
    window.addEventListener('pointerup', onWindowUp);
    strip.addEventListener('click', onStripClick, true);

    requestAnimationFrame(syncThumb);
    const t = window.setTimeout(syncThumb, 300);

    return () => {
      strip.removeEventListener('scroll', syncThumb);
      window.removeEventListener('resize', syncThumb);
      thumb.removeEventListener('pointerdown', onThumbDown);
      strip.removeEventListener('pointerdown', onStripDown);
      window.removeEventListener('pointermove', onWindowMove);
      window.removeEventListener('pointerup', onWindowUp);
      strip.removeEventListener('click', onStripClick, true);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
      window.clearTimeout(t);
    };
  }, []);

  return (
    <section id="culture" className="tl-culture">
      <div className="tl-culture-head">
        <div className="tl-culture-copy">
          <p ref={headerRef} className="tl-reveal tl-eyebrow">
            HUMANS FIRST
          </p>
          <h2 ref={titleRef} className="tl-reveal tl-section-title">
            Real people, obsessed with your product.
          </h2>
          <p ref={descRef} className="tl-reveal tl-culture-desc">
            Behind every line of code is a senior team of engineers, designers, and
            strategists who treat your goals as their own — drag to meet a few of them.
          </p>
        </div>
        <div ref={dragLabelRef} className="tl-reveal tl-culture-drag-label">
          <span className="tl-culture-drag-line" /> DRAG TO EXPLORE
        </div>
      </div>

      <div className="tl-culture-strip-wrap">
        <div ref={stripRef} className="tl-culture-strip tl-hide-scrollbar">
          {PHOTOS.map((photo) => (
            <figure key={photo.caption} className="tl-culture-figure">
              <img
                src={photo.img}
                alt={photo.alt}
                loading="lazy"
                draggable={false}
                onError={(e) => {
                  const target = e.currentTarget;
                  target.parentElement!.style.background =
                    'repeating-linear-gradient(45deg,#12201b 0 14px,#0d1714 14px 28px)';
                  target.style.display = 'none';
                }}
              />
              <div className="tl-culture-figure-gradient" />
              <figcaption>
                <span className="tl-culture-figure-label">{photo.label}</span>
                <p className="tl-culture-figure-caption">{photo.caption}</p>
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="tl-culture-slider">
          <div ref={barRef} className="tl-culture-bar">
            <div ref={thumbRef} data-strip-thumb className="tl-culture-thumb" />
          </div>
          <span className="tl-culture-slide-label">SLIDE →</span>
        </div>
      </div>
    </section>
  );
}
