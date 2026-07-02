import { useReveal } from '../hooks/useReveal';
import { useCounter } from '../hooks/useCounter';
import './Stats.css';

interface Stat {
  target: number;
  suffix: string;
  label: string;
  delay?: number;
}

const STATS: Stat[] = [
  { target: 120, suffix: '+', label: 'Products delivered' },
  { target: 98, suffix: '%', label: 'Client retention', delay: 80 },
  { target: 40, suffix: '+', label: 'Engineers & designers', delay: 160 },
  { target: 12, suffix: '', label: 'Countries served', delay: 240 },
];

function StatItem({ stat }: { stat: Stat }) {
  const revealRef = useReveal<HTMLDivElement>(stat.delay ?? 0);
  const { ref: countRef, value } = useCounter<HTMLDivElement>(stat.target);

  return (
    <div ref={revealRef} className="tl-reveal tl-stat">
      <div ref={countRef} className="tl-stat-value">
        {value}
        {stat.suffix}
      </div>
      <p className="tl-stat-label">{stat.label}</p>
    </div>
  );
}

export function Stats() {
  return (
    <section className="tl-stats">
      <div className="tl-stats-grid">
        {STATS.map((stat) => (
          <StatItem key={stat.label} stat={stat} />
        ))}
      </div>
    </section>
  );
}
