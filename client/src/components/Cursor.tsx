import { useEffect, useRef } from 'react';
import './Cursor.css';

export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return;

    document.body.classList.add('tl-cursor-active');

    let tx = window.innerWidth / 2;
    let ty = window.innerHeight / 2;
    let rx = tx, ry = ty;

    const onMove = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      if (dotRef.current) dotRef.current.style.transform = `translate(${tx}px,${ty}px)`;
    };

    let raf: number;
    const tick = () => {
      rx += (tx - rx) * 0.11;
      ry += (ty - ry) * 0.11;
      if (wrapRef.current) wrapRef.current.style.transform = `translate(${rx}px,${ry}px)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const onEnter = () => ringRef.current?.classList.add('tl-ring-hover');
    const onLeave = () => ringRef.current?.classList.remove('tl-ring-hover');

    const bind = () => {
      document.querySelectorAll('a, button').forEach((el) => {
        el.addEventListener('mouseenter', onEnter);
        el.addEventListener('mouseleave', onLeave);
      });
    };
    bind();

    window.addEventListener('mousemove', onMove, { passive: true });

    return () => {
      document.body.classList.remove('tl-cursor-active');
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      document.querySelectorAll('a, button').forEach((el) => {
        el.removeEventListener('mouseenter', onEnter);
        el.removeEventListener('mouseleave', onLeave);
      });
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="tl-cursor-dot" />
      <div ref={wrapRef} className="tl-cursor-ring-wrap">
        <div ref={ringRef} className="tl-cursor-ring" />
      </div>
    </>
  );
}
