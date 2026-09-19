import { motion } from 'framer-motion';
import { fadeUp, viewportOnce } from '../../utils/motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export default function Reveal({ className = '', delay = 0, children }) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      variants={fadeUp}
      initial={reducedMotion ? false : 'hidden'}
      whileInView={reducedMotion ? undefined : 'visible'}
      viewport={viewportOnce(reducedMotion)}
      transition={{ duration: reducedMotion ? 0 : 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
