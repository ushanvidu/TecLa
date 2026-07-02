import { useState } from 'react';
import emailjs from '@emailjs/browser';
import { useReveal } from '../hooks/useReveal';
import './CTA.css';

// ─── EmailJS Setup ──────────────────────────────────────────────────────────
// 1. Sign up free at https://emailjs.com
// 2. Add Email Service (Gmail) → copy Service ID below
// 3. Create Email Template using variables: {{from_name}}, {{from_email}}, {{service}}, {{message}}
//    Set "To Email" in the template to your inbox email
// 4. Account → API Keys → copy Public Key below
const EMAILJS_SERVICE_ID  = 'service_k39g98p';
const EMAILJS_TEMPLATE_ID = 'template_hs06avh';
const EMAILJS_PUBLIC_KEY  = 'nSNV-jvaES1KPDnFR';

const WA_NUMBER = '94715367306';
const WA_MSG    = encodeURIComponent("Hi TecLa! I'd like to discuss a project.");

const SERVICES = [
  'Software Development',
  'Web Development',
  'AI Solutions',
  "Not sure yet — let's talk",
];

type Status = 'idle' | 'loading' | 'success' | 'error';

export function CTA() {
  const leftRef  = useReveal<HTMLDivElement>();
  const rightRef = useReveal<HTMLDivElement>(120);

  const [form, setForm] = useState({ name: '', email: '', service: SERVICES[0], message: '' });
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const set = (field: keyof typeof form) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          name:       form.name,
          from_name:  form.name,
          from_email: form.email,
          reply_to:   form.email,
          service:    form.service,
          message:    form.message,
        },
        { publicKey: EMAILJS_PUBLIC_KEY }
      );
      setStatus('success');
      setForm({ name: '', email: '', service: SERVICES[0], message: '' });
    } catch (err: unknown) {
      console.error('EmailJS error:', err);
      const msg = err && typeof err === 'object' && 'text' in err
        ? String((err as { text: string }).text)
        : String(err);
      setStatus('error');
      setErrorMsg(`Error: ${msg}`);
    }
  };

  return (
    <section id="contact" className="tl-cta-section">
      <div className="tl-cta-card">
        <div className="tl-cta-grid-bg" />
        <div className="tl-cta-orb tl-cta-orb-1" />
        <div className="tl-cta-orb tl-cta-orb-2" />

        <div className="tl-cta-inner">
          {/* LEFT — copy */}
          <div ref={leftRef} className="tl-reveal tl-cta-left">
            <p className="tl-eyebrow">06 — GET IN TOUCH</p>
            <h2 className="tl-cta-title">
              Let's build something<br />people remember.
            </h2>
            <p className="tl-cta-sub">
              Tell us what you're dreaming up. We'll get back to you within one business day.
            </p>

            <div className="tl-cta-contact-items">
              <a href="mailto:teclalaboratories@gmail.com" className="tl-cta-contact-item">
                <span className="tl-cta-contact-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </span>
                teclalaboratories@gmail.com
              </a>
              <a
                href={`https://wa.me/${WA_NUMBER}?text=${WA_MSG}`}
                target="_blank"
                rel="noopener noreferrer"
                className="tl-cta-contact-item"
              >
                <span className="tl-cta-contact-icon">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </span>
                WhatsApp us directly
              </a>
              <a href="tel:+94703132527" className="tl-cta-contact-item">
                <span className="tl-cta-contact-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8a19.79 19.79 0 01-3.07-8.67A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                  </svg>
                </span>
                +94 70 313 2527
              </a>
            </div>

            <div className="tl-cta-trust">
              <div className="tl-cta-trust-item">
                <span className="tl-cta-trust-val">120+</span>
                <span className="tl-cta-trust-lbl">Projects delivered</span>
              </div>
              <div className="tl-cta-trust-sep" />
              <div className="tl-cta-trust-item">
                <span className="tl-cta-trust-val">&lt; 24h</span>
                <span className="tl-cta-trust-lbl">Response time</span>
              </div>
              <div className="tl-cta-trust-sep" />
              <div className="tl-cta-trust-item">
                <span className="tl-cta-trust-val">98%</span>
                <span className="tl-cta-trust-lbl">Client retention</span>
              </div>
            </div>
          </div>

          {/* RIGHT — form */}
          <div ref={rightRef} className="tl-reveal tl-cta-right">
            {status === 'success' ? (
              <div className="tl-cta-success">
                <div className="tl-cta-check">✓</div>
                <h3>Message sent!</h3>
                <p>We'll be in touch within one business day. Check your inbox for a confirmation.</p>
                <button className="tl-btn-ghost-sm" onClick={() => setStatus('idle')}>
                  Send another →
                </button>
              </div>
            ) : (
              <form className="tl-cta-form" onSubmit={handleSubmit}>
                <div className="tl-form-row">
                  <div className="tl-form-field">
                    <label htmlFor="ctaName">Full Name</label>
                    <input
                      id="ctaName"
                      type="text"
                      required
                      placeholder="Your name"
                      value={form.name}
                      onChange={set('name')}
                    />
                  </div>
                  <div className="tl-form-field">
                    <label htmlFor="ctaEmail">Email</label>
                    <input
                      id="ctaEmail"
                      type="email"
                      required
                      placeholder="you@company.com"
                      value={form.email}
                      onChange={set('email')}
                    />
                  </div>
                </div>
                <div className="tl-form-field">
                  <label htmlFor="ctaService">I'm interested in</label>
                  <select id="ctaService" value={form.service} onChange={set('service')}>
                    {SERVICES.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div className="tl-form-field">
                  <label htmlFor="ctaMessage">Tell us about your project</label>
                  <textarea
                    id="ctaMessage"
                    required
                    rows={5}
                    placeholder="What are you building? What's your timeline? What does success look like?"
                    value={form.message}
                    onChange={set('message')}
                  />
                </div>
                {status === 'error' && (
                  <p className="tl-form-error">{errorMsg}</p>
                )}
                <button type="submit" className="tl-cta-submit" disabled={status === 'loading'}>
                  {status === 'loading' ? (
                    <><span className="tl-cta-spinner" /> Sending…</>
                  ) : (
                    'Send message →'
                  )}
                </button>
                <p className="tl-form-note">No spam, no pressure — just a conversation.</p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
