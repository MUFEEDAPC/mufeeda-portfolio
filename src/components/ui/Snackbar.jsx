import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, CircleAlert, TriangleAlert, X } from 'lucide-react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

const VARIANTS = {
  success: {
    icon: Check,
    accent: 'bg-emerald-400',
    ring: 'shadow-[0_20px_50px_rgba(16,185,129,0.18)]',
    iconWrap: 'bg-emerald-400/15 text-emerald-300',
  },
  error: {
    icon: CircleAlert,
    accent: 'bg-red-400',
    ring: 'shadow-[0_20px_50px_rgba(248,113,113,0.16)]',
    iconWrap: 'bg-red-400/15 text-red-300',
  },
  warning: {
    icon: TriangleAlert,
    accent: 'bg-amber-300',
    ring: 'shadow-[0_20px_50px_rgba(251,191,36,0.16)]',
    iconWrap: 'bg-amber-300/15 text-amber-200',
  },
};

export default function Snackbar({
  open,
  message,
  variant = 'success',
  duration = 4500,
  onClose,
}) {
  const reducedMotion = useReducedMotion();
  const style = VARIANTS[variant] || VARIANTS.success;
  const Icon = style.icon;

  useEffect(() => {
    if (!open || !duration) return undefined;
    const timer = window.setTimeout(onClose, duration);
    return () => window.clearTimeout(timer);
  }, [open, duration, onClose, message]);

  return createPortal(
    <AnimatePresence>
      {open && message ? (
        <motion.div
          role={variant === 'error' ? 'alert' : 'status'}
          aria-live={variant === 'error' ? 'assertive' : 'polite'}
          initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 28, scale: 0.96 }}
          animate={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
          exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.98 }}
          transition={{ duration: reducedMotion ? 0.15 : 0.35, ease: [0.22, 1, 0.36, 1] }}
          className={`fixed bottom-6 left-1/2 z-[90] flex w-[min(92vw,28rem)] -translate-x-1/2 items-start gap-3 overflow-hidden rounded-2xl border border-white/10 bg-graphite/95 px-4 py-3.5 backdrop-blur-xl ${style.ring}`}
        >
          <span className={`absolute inset-y-0 left-0 w-1 ${style.accent}`} aria-hidden="true" />
          <span className={`mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full ${style.iconWrap}`}>
            <Icon size={16} strokeWidth={2.4} />
          </span>
          <p className="flex-1 pt-1 text-sm leading-5 text-white">{message}</p>
          <button
            type="button"
            onClick={onClose}
            aria-label="Dismiss notification"
            className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full text-soft hover:bg-white/6 hover:text-white"
          >
            <X size={15} />
          </button>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}
