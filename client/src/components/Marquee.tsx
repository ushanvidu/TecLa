import './Marquee.css';

const LOGOS = ['NOVA', 'Quanta', 'MERIDIAN', 'Vaultly', 'Northwind', 'PULSE', 'Orbital'];

export function Marquee() {
  const items = [...LOGOS, ...LOGOS];
  return (
    <section className="tl-marquee-sec">
      <p className="tl-marquee-label">TRUSTED BY TEAMS BUILDING THE FUTURE</p>
      <div className="tl-marquee-mask">
        <div className="tl-marquee-track">
          {items.map((name, i) => (
            <span key={i} className="tl-marquee-item">
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
