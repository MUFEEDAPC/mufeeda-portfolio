import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { navSections, personal } from '../../data/portfolio';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { scrollToId } from '../../utils/motion';

export default function Navbar({ activeSection }) {
  const [open, setOpen] = useState(false);
  const firstLinkRef = useRef(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    if (open) requestAnimationFrame(() => firstLinkRef.current?.focus());
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const handleNav = (id) => {
    setOpen(false);
    scrollToId(id);
  };

  return (
    <motion.header
      className="pointer-events-none fixed top-0 right-0 left-0 z-50 px-4 pt-4 md:px-6"
      initial={reducedMotion ? false : { opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="pointer-events-auto relative mx-auto flex max-w-7xl items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => handleNav('hero')}
          className="glass flex items-center gap-3 rounded-full py-2 pr-4 pl-2"
          aria-label="Scroll to top"
        >
          <span className="grid h-9 w-9 place-items-center rounded-full bg-accent/15 font-display text-sm font-semibold text-accent">
            MP
          </span>
          <span className="hidden text-sm font-medium xl:block">{personal.name}</span>
        </button>

        <nav
          className="glass absolute left-1/2 hidden max-w-[min(720px,calc(100vw-12rem))] -translate-x-1/2 items-center overflow-x-auto rounded-full px-1.5 py-1.5 [scrollbar-width:none] lg:flex [&::-webkit-scrollbar]:hidden"
          aria-label="Primary navigation"
        >
          {navSections.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNav(item.id)}
                className={`relative rounded-full px-2.5 py-2 text-xs transition-colors duration-300 xl:px-3 xl:text-[13px] ${
                  isActive ? 'text-white' : 'text-muted hover:text-soft'
                }`}
              >
                {isActive && (
                  <span className="absolute inset-0 rounded-full bg-white/8 ring-1 ring-white/10" />
                )}
                <span className="relative flex items-center gap-1.5">
                  <span className="hidden font-mono text-[10px] text-accent xl:inline">{item.number}</span>
                  {item.label}
                </span>
              </button>
            );
          })}
        </nav>

        <button
          type="button"
          className="glass grid h-11 w-11 place-items-center rounded-full lg:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="pointer-events-auto fixed inset-0 z-40 bg-[#050506]/92 backdrop-blur-xl lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="flex h-full flex-col px-6 pt-24 pb-10">
              <nav className="flex flex-col gap-2" aria-label="Mobile navigation">
                {navSections.map((item, index) => (
                  <motion.button
                    key={item.id}
                    ref={index === 0 ? firstLinkRef : undefined}
                    type="button"
                    onClick={() => handleNav(item.id)}
                    initial={reducedMotion ? false : { opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`flex items-center justify-between rounded-2xl border px-5 py-4 text-left ${
                      activeSection === item.id
                        ? 'border-accent/40 bg-accent/10 text-white'
                        : 'border-white/8 bg-white/3 text-soft'
                    }`}
                  >
                    <span className="font-display text-2xl">{item.label}</span>
                    <span className="font-mono text-sm text-accent">{item.number}</span>
                  </motion.button>
                ))}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
