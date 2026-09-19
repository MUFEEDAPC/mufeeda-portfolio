import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, CircleAlert } from 'lucide-react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export default function Snackbar({
  open,
  message,
  variant = 'success',
  duration = 3200,
  onClose,
}) {
  const reducedMotion = useReducedMotion();
  const isError = variant === 'error';

  useEffect(() => {
    if (!open || !duration) return undefined;
    const timer = window.setTimeout(onClose, duration);
    return () => window.clearTimeout(timer);
  }, [open, duration, onClose, message]);

  return createPortal(
    <AnimatePresence>
      {open && message ? (
        <motion.div
          role={isError ? 'alert' : 'status'}
          aria-live={isError ? 'assertive' : 'polite'}
          initial={reducedMotion ? { opacity: 0 } : { opacity: 0, x: 28, y: -8 }}
          animate={reducedMotion ? { opacity: 1 } : { opacity: 1, x: 0, y: 0 }}
          exit={reducedMotion ? { opacity: 0 } : { opacity: 0, x: 16, y: -6 }}
          transition={{ duration: reducedMotion ? 0.15 : 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="glass pointer-events-none fixed top-20 right-4 z-[90] flex max-w-[min(calc(100vw-2rem),20rem)] items-center gap-3 rounded-full py-2 pr-5 pl-2 md:top-24 md:right-6"
        >
          <span
            className={`grid h-9 w-9 shrink-0 place-items-center rounded-full ${
              isError ? 'bg-white/8 text-soft' : 'bg-accent/15 text-accent'
            }`}
          >
            {isError ? <CircleAlert size={16} strokeWidth={2.2} /> : <Check size={16} strokeWidth={2.4} />}
          </span>
          <p className="font-display text-sm font-medium tracking-[-0.02em] text-white">{message}</p>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}
