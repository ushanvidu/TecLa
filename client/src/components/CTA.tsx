import { useState } from 'react';
import { useReveal } from '../hooks/useReveal';
import { useMagnetic } from '../hooks/useMagnetic';
import { submitContact } from '../api';
import './CTA.css';

type Status = 'idle' | 'loading' | 'success' | 'error';

export function CTA() {
  const revealRef = useReveal<HTMLDivElement>();
  const magneticRef = useMagnetic<HTMLButtonElement>();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setError('');
    try {
      await submitContact(email);
      setStatus('success');
      setEmail('');
    } catch (err) {
      setStatus('error');
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    }
  };

  return (
    <section id="contact" className="tl-cta-section">
      <div ref={revealRef} className="tl-reveal tl-cta-card">
        <div className="tl-cta-grid" />
        <div className="tl-cta-content">
          <h2 className="tl-cta-title">
            Let's build something
            <br />
            people remember.
          </h2>
          <p className="tl-cta-sub">Tell us what you're dreaming up. We'll show you how to make it real.</p>
          <form className="tl-cta-form" onSubmit={handleSubmit}>
            <input
              type="email"
              required
              placeholder="Your work email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button ref={magneticRef} type="submit" disabled={status === 'loading'}>
              {status === 'loading' ? 'Sending…' : 'Book a call →'}
            </button>
          </form>
          <p className={`tl-cta-msg${status === 'success' ? ' tl-cta-msg-visible' : ''}${status === 'error' ? ' tl-cta-msg-error tl-cta-msg-visible' : ''}`}>
            {status === 'success' && "Thanks — we'll be in touch within one business day."}
            {status === 'error' && error}
          </p>
        </div>
      </div>
    </section>
  );
}
