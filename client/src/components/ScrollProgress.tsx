import { useEffect, useState } from 'react';
import './ScrollProgress.css';

export function ScrollProgress() {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const update = () => {
      const el = document.documentElement;
      const total = el.scrollHeight - el.clientHeight;
      setPct(total > 0 ? (el.scrollTop / total) * 100 : 0);
    };
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  return (
    <div className="tl-scroll-progress">
      <div className="tl-scroll-fill" style={{ width: `${pct}%` }} />
    </div>
  );
}
