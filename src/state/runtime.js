export const runtime = {
  pointerX: 0,
  pointerY: 0,
  clientX: 0,
  clientY: 0,
  scrollY: 0,
  scrollProgress: 0,
  heroProgress: 0,
  expertise: null,
};

export function bindRuntime() {
  const onPointer = (event) => {
    runtime.clientX = event.clientX;
    runtime.clientY = event.clientY;
    runtime.pointerX = (event.clientX / window.innerWidth) * 2 - 1;
    runtime.pointerY = (event.clientY / window.innerHeight) * 2 - 1;
  };

  const onScroll = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    runtime.scrollY = window.scrollY;
    runtime.scrollProgress = max > 0 ? window.scrollY / max : 0;

    const hero = document.getElementById('hero');
    if (hero) {
      runtime.heroProgress = Math.min(Math.max(window.scrollY / Math.max(hero.offsetHeight, 1), 0), 1);
    }
  };

  window.addEventListener('pointermove', onPointer, { passive: true });
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  onScroll();

  return () => {
    window.removeEventListener('pointermove', onPointer);
    window.removeEventListener('scroll', onScroll);
    window.removeEventListener('resize', onScroll);
  };
}
