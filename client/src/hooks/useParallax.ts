import { useEffect, useRef } from 'react';

/** Shifts an element vertically against scroll position for a subtle depth effect. */
export function useParallax<T extends HTMLElement>(speed = 0.05) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let raf: number | null = null;
    const update = () => {
      raf = null;
      const vh = window.innerHeight || document.documentElement.clientHeight;
      const r = el.getBoundingClientRect();
      const center = r.top + r.height / 2 - vh / 2;
      el.style.transform = `translate3d(0, ${(-center * speed).toFixed(1)}px, 0)`;
    };
    const onScroll = () => {
      if (raf == null) raf = requestAnimationFrame(update);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    update();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf != null) cancelAnimationFrame(raf);
    };
  }, [speed]);

  return ref;
}
