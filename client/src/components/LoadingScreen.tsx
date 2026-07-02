import { useEffect, useState } from 'react';
import './LoadingScreen.css';

export function LoadingScreen({ onDone }: { onDone: () => void }) {
  const [out, setOut] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const t1 = setTimeout(() => setOut(true), 1600);
    const t2 = setTimeout(() => {
      document.body.style.overflow = '';
      onDone();
    }, 2350);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [onDone]);

  return (
    <div className={`tl-loader${out ? ' tl-loader-out' : ''}`}>
      <div className="tl-loader-inner">
        <div className="tl-loader-logo">
          Tec<span>La</span>
        </div>
        <div className="tl-loader-bar-wrap">
          <div className="tl-loader-bar" />
        </div>
        <p className="tl-loader-tag">Crafting your experience…</p>
      </div>
    </div>
  );
}
