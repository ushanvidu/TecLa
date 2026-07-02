import { useReveal } from '../hooks/useReveal';
import './Process.css';

interface Step {
  num: string;
  title: string;
  desc: string;
  delay?: number;
  highlighted?: boolean;
}

const STEPS: Step[] = [
  { num: '01', title: 'Discover', desc: 'We map goals, users, and constraints — then define what winning looks like.' },
  { num: '02', title: 'Design', desc: 'Interfaces and architecture designed together, prototyped, and pressure-tested early.', delay: 80 },
  { num: '03', title: 'Build', desc: 'Ship in tight iterations with real code, real feedback, and no surprises.', delay: 160 },
  { num: '04', title: 'Scale', desc: 'Monitor, optimize, and grow — a partnership that lasts beyond launch.', delay: 240, highlighted: true },
];

function StepCard({ step }: { step: Step }) {
  const ref = useReveal<HTMLDivElement>(step.delay ?? 0);
  return (
    <div ref={ref} className={`tl-reveal tl-step${step.highlighted ? ' tl-step-highlighted' : ''}`}>
      <span className="tl-step-num">{step.num}</span>
      <h3 className="tl-step-title">{step.title}</h3>
      <p className="tl-step-desc">{step.desc}</p>
    </div>
  );
}

export function Process() {
  const headerRef = useReveal<HTMLParagraphElement>();
  const titleRef = useReveal<HTMLHeadingElement>(60);

  return (
    <section id="process" className="tl-process">
      <div className="tl-section-head">
        <p ref={headerRef} className="tl-reveal tl-eyebrow">
          02 — HOW WE WORK
        </p>
        <h2 ref={titleRef} className="tl-reveal tl-section-title">
          A process built for momentum.
        </h2>
      </div>
      <div className="tl-process-grid">
        {STEPS.map((step) => (
          <StepCard key={step.num} step={step} />
        ))}
      </div>
    </section>
  );
}
