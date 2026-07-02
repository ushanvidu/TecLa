import { useEffect, useRef } from 'react';
import { theme } from '../theme';

/** Tilts a card toward the cursor in 3D and highlights its border on hover. */
export function useTilt<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const m = theme.motion;

    const onMove = (ev: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const px = (ev.clientX - r.left) / r.width - 0.5;
      const py = (ev.clientY - r.top) / r.height - 0.5;
      el.style.transform = `perspective(900px) rotateX(${(-py * 6 * m).toFixed(2)}deg) rotateY(${(px * 8 * m).toFixed(2)}deg) translateY(${(-6 * m).toFixed(1)}px)`;
      el.style.borderColor = 'rgba(var(--accent-rgb), .35)';
    };
    const onLeave = () => {
      el.style.transform = 'perspective(900px) rotateX(0) rotateY(0) translateY(0)';
      el.style.borderColor = '';
    };

    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return ref;
}
