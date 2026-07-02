import { useEffect, useRef, useState } from 'react';

/** Animates a number counting up from 0 to `target` the first time it's in view. */
export function useCounter<T extends HTMLElement>(target: number, duration = 1600) {
  const ref = useRef<T | null>(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const run = () => {
      const start = performance.now();
      const tick = (now: number) => {
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        setValue(Math.round(target * eased));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            run();
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0, rootMargin: '0px 0px -15% 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return { ref, value };
}
