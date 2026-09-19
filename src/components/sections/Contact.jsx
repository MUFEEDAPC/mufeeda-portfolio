import { lazy, Suspense, useCallback, useRef, useState } from 'react';
import { LoaderCircle, Mail, MapPin, Phone, Send } from 'lucide-react';
import { GitHubIcon, LinkedInIcon } from '../ui/SocialIcons';
import { contact, socials } from '../../data/portfolio';
import { formatExternalUrl, validateContactForm } from '../../utils/validators';
import { submitContact } from '../../utils/submitContact';
import SectionHeader from '../ui/SectionHeader';
import MagneticButton from '../ui/MagneticButton';
import Snackbar from '../ui/Snackbar';
import SceneBoundary from '../three/SceneBoundary';

const ContactScene = lazy(() => import('../three/ContactScene'));

const INITIAL = { name: '', email: '', subject: '', message: '', botcheck: '' };

export default function Contact() {
  const [form, setForm] = useState(INITIAL);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');
  const [toast, setToast] = useState(null);
  const sendingRef = useRef(false);
  const dismissToast = useCallback(() => setToast(null), []);

  const onChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (sendingRef.current) return;

    const result = validateContactForm(form);
    if (!result.isValid) {
      setErrors(result.errors);
      return;
    }

    if (form.botcheck) return;

    sendingRef.current = true;
    setStatus('loading');

    try {
      await submitContact({
        ...result.values,
        botcheck: form.botcheck,
      });
      setForm(INITIAL);
      setStatus('success');
      setToast({
        variant: 'success',
        message: 'Message sent successfully. Thanks for reaching out!',
        duration: 5000,
      });
    } catch (error) {
      const next = error.message === 'form_activation' ? 'activation' : 'error';
      setStatus(next);
      setToast(
        next === 'activation'
          ? {
              variant: 'warning',
              duration: 8000,
              message: `Check ${contact.email} (and Spam), click Activate Form, then submit again.`,
            }
          : {
              variant: 'error',
              duration: 6000,
              message: 'Something went wrong. Please try again or contact me directly.',
            },
      );
    } finally {
      sendingRef.current = false;
    }
  };

  return (
    <section id="contact" className="relative overflow-hidden px-6 py-24 md:py-32">
      <SceneBoundary fallback={null}>
        <Suspense fallback={null}>
          <ContactScene />
        </Suspense>
      </SceneBoundary>

      <div className="relative mx-auto max-w-6xl">
        <SectionHeader
          number="07 — GET IN TOUCH"
          title="Have a project in mind? Let's build something exceptional together."
          description="I'm open to freelance opportunities, full-time roles, and collaborations. Reach out and I'll respond as soon as possible."
        />

        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="space-y-5">
            <a href={`mailto:${contact.email}`} className="flex items-center gap-3 text-soft hover:text-white">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-accent/10 text-accent">
                <Mail size={16} />
              </span>
              {contact.email}
            </a>
            <a href={`tel:${contact.phoneHref}`} className="flex items-center gap-3 text-soft hover:text-white">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-accent/10 text-accent">
                <Phone size={16} />
              </span>
              {contact.phone}
            </a>
            <p className="flex items-center gap-3 text-soft">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-accent/10 text-accent">
                <MapPin size={16} />
              </span>
              {contact.location}
            </p>
            <div className="flex gap-3 pt-2">
              {socials.map((social) => (
                <a
                  key={social.name}
                  href={formatExternalUrl(social.url)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/8 px-4 py-2 text-sm text-soft hover:border-accent/40 hover:text-white"
                >
                  {social.name === 'GitHub' ? <GitHubIcon size={15} /> : <LinkedInIcon size={15} />}
                  {social.name}
                </a>
              ))}
            </div>
          </div>

          <form
            onSubmit={onSubmit}
            noValidate
            className="relative overflow-hidden rounded-[28px] border border-white/8 bg-graphite/85 p-6 backdrop-blur-xl md:p-8"
          >
            <div className="hidden" aria-hidden="true">
              <label htmlFor="botcheck">Company</label>
              <input id="botcheck" name="botcheck" tabIndex={-1} autoComplete="off" value={form.botcheck} onChange={onChange} />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <Field id="name" label="Name" value={form.name} error={errors.name} onChange={onChange} autoComplete="name" />
              <Field id="email" label="Email" type="email" value={form.email} error={errors.email} onChange={onChange} autoComplete="email" />
            </div>
            <div className="mt-4">
              <Field id="subject" label="Subject" value={form.subject} error={errors.subject} onChange={onChange} />
            </div>
            <div className="mt-4">
              <label htmlFor="message" className="mb-2 block text-sm text-soft">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                value={form.message}
                onChange={onChange}
                required
                aria-invalid={Boolean(errors.message)}
                className="w-full rounded-2xl border border-white/8 bg-void/60 px-4 py-3 text-sm text-white outline-none focus:border-accent/50"
              />
              {errors.message && (
                <p id="message-error" className="mt-2 text-sm text-red-300" role="alert">
                  {errors.message}
                </p>
              )}
            </div>

            <MagneticButton
              as="button"
              type="submit"
              disabled={status === 'loading'}
              className="mt-6 bg-accent text-[#071225] disabled:opacity-70"
            >
              {(iconRef) => (
                <>
                  {status === 'loading' ? <LoaderCircle ref={iconRef} size={16} className="animate-spin" /> : <Send ref={iconRef} size={16} />}
                  {status === 'loading' ? 'Sending...' : 'Send Message'}
                </>
              )}
            </MagneticButton>

          </form>
        </div>
      </div>

      <Snackbar
        open={Boolean(toast)}
        variant={toast?.variant}
        message={toast?.message}
        duration={toast?.duration}
        onClose={dismissToast}
      />
    </section>
  );
}

function Field({ id, label, type = 'text', value, error, onChange, autoComplete }) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm text-soft">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={onChange}
        autoComplete={autoComplete}
        required
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className="w-full rounded-2xl border border-white/8 bg-void/60 px-4 py-3 text-sm text-white outline-none focus:border-accent/50"
      />
      {error && (
        <p id={`${id}-error`} className="mt-2 text-sm text-red-300" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
