import './Footer.css';

export function Footer() {
  return (
    <footer className="tl-footer">
      <div className="tl-footer-top">
        <div className="tl-footer-brand">
          <a href="#top" className="tl-footer-logo">
            <span className="tl-footer-logo-mark">
              <span className="tl-footer-logo-bg" />
              <span className="tl-footer-logo-dot" />
            </span>
            <span className="tl-footer-wordmark">
              Tec<span className="tl-accent-text">La</span>
            </span>
          </a>
          <p className="tl-footer-desc">
            Engineering software, web, and AI products that move ambitious companies forward.
          </p>
        </div>
        <div className="tl-footer-links">
          <div className="tl-footer-col">
            <p className="tl-footer-col-title">COMPANY</p>
            <a href="#services">Services</a>
            <a href="#work">Work</a>
            <a href="#process">Process</a>
          </div>
          <div className="tl-footer-col">
            <p className="tl-footer-col-title">CONNECT</p>
            <a href="#contact">Contact</a>
            <a href="#">LinkedIn</a>
            <a href="#">GitHub</a>
          </div>
        </div>
      </div>
      <div className="tl-footer-bottom">
        <p>© 2026 TECLA. ALL RIGHTS RESERVED.</p>
        <p>BUILT WITH REACT &amp; THREE.JS</p>
      </div>
    </footer>
  );
}
