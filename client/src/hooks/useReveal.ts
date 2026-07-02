import { useEffect, useRef } from 'react';

/** Fades + slides an element in the first time it scrolls into view. */
export function useReveal<T extends HTMLElement>(delay = 0) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reveal = () => {
      window.setTimeout(() => el.classList.add('tl-visible'), delay);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            reveal();
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0, rootMargin: '0px 0px -10% 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return ref;
}
