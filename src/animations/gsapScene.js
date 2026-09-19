import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initScrollAnimations({ reducedMotion }) {
  if (reducedMotion) return () => {};

  const ctx = gsap.context(() => {
    const mm = gsap.matchMedia();

    // Section flow — y only on panels (scale caused horizontal clip on mobile)
    mm.add('(min-width: 768px)', () => {
      gsap.utils.toArray('.scene-panel:not(#hero)').forEach((panel) => {
        const aura = panel.querySelector('.scene-panel__glass-aura');
        const glow = panel.querySelector('.scene-panel__depth-glow');

        gsap.fromTo(
          panel,
          { y: 50, scale: 0.96 },
          {
            y: 0,
            scale: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: panel,
              start: 'top 92%',
              end: 'top 55%',
              scrub: 0.8,
            },
          }
        );

        gsap.to(panel, {
          y: -24,
          scale: 0.98,
          ease: 'power2.in',
          scrollTrigger: {
            trigger: panel,
            start: 'bottom 75%',
            end: 'bottom top',
            scrub: 0.8,
          },
        });

        if (aura) {
          gsap.fromTo(
            aura,
            { rotateX: 18, scale: 0.9, opacity: 0 },
            {
              rotateX: 0,
              scale: 1,
              opacity: 1,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: panel,
                start: 'top 92%',
                end: 'top 42%',
                scrub: 1.1,
              },
            }
          );
        }

        if (glow) {
          gsap.fromTo(
            glow,
            { scale: 0.8, opacity: 0 },
            {
              scale: 1,
              opacity: 0.6,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: panel,
                start: 'top 88%',
                end: 'top 50%',
                scrub: 1,
              },
            }
          );
        }

        const inner = panel.querySelector('.scene-panel__inner');
        if (inner) {
          gsap.fromTo(
            inner,
            { y: 30 },
            {
              y: -20,
              ease: 'none',
              scrollTrigger: {
                trigger: panel,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1.2,
              },
            }
          );
        }
      });
    });

    mm.add('(max-width: 767px)', () => {
      gsap.utils.toArray('.scene-panel:not(#hero)').forEach((panel) => {
        gsap.fromTo(
          panel,
          { y: 24 },
          {
            y: 0,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: panel,
              start: 'top 94%',
              end: 'top 60%',
              scrub: 0.6,
            },
          }
        );
      });
    });

    const heroAura = document.querySelector('.scene-panel__glass-aura--hero');
    if (heroAura) {
      gsap.fromTo(
        heroAura,
        { rotateX: 12, opacity: 0, scale: 0.95 },
        { rotateX: 0, opacity: 1, scale: 1, duration: 1.2, ease: 'power3.out', delay: 0.3 }
      );
    }

    gsap.utils.toArray('.section-divider').forEach((divider) => {
      gsap.fromTo(
        divider,
        { y: 20, scale: 0.97 },
        {
          y: 0,
          scale: 1,
          scrollTrigger: {
            trigger: divider,
            start: 'top 95%',
            end: 'top 75%',
            scrub: 0.6,
          },
        }
      );
    });

    gsap.utils.toArray('.glass-card').forEach((card) => {
      if (card.classList.contains('contact__form') || card.classList.contains('tilt-card')) return;
      gsap.fromTo(
        card,
        { y: 20 },
        {
          y: 0,
          scrollTrigger: {
            trigger: card,
            start: 'top 94%',
            end: 'top 65%',
            scrub: 0.5,
          },
        }
      );
    });

    const statCards = gsap.utils.toArray('.stats__card');
    if (statCards.length) {
      gsap.from(statCards, {
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.stats',
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });
    }

    const timelineLine = document.querySelector('.timeline__line');
    if (timelineLine) {
      gsap.fromTo(
        timelineLine,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: '.timeline',
            start: 'top 75%',
            end: 'bottom 65%',
            scrub: 0.8,
          },
        }
      );
    }

    gsap.from('.timeline__entry', {
      x: 24,
      opacity: 0,
      stagger: 0.16,
      duration: 0.7,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.timeline',
        start: 'top 76%',
        toggleActions: 'play none none none',
      },
    });
  });

  return () => ctx.revert();
}

export function playHeroIntro({ reducedMotion }) {
  if (reducedMotion) return undefined;

  const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

  tl.from('.hero__eyebrow', { y: 40, opacity: 0, duration: 0.8 })
    .from(
      '.hero__title-char',
      { y: 60, opacity: 0, stagger: { each: 0.04, from: 'start' }, duration: 0.8 },
      '-=0.45'
    )
    .from('.hero__title', { y: 32, opacity: 0, duration: 0.8 }, '-=0.55')
    .from('.hero__tagline', { y: 24, opacity: 0, duration: 0.7 }, '-=0.45')
    .from(
      '.hero__actions .btn',
      { y: 16, opacity: 0, stagger: 0.1, duration: 0.5 },
      '-=0.35'
    )
    .from(
      '.hero__social-link',
      { scale: 0, stagger: 0.1, duration: 0.4, ease: 'back.out(2)' },
      '-=0.25'
    )
    .from('.hero__visual', { opacity: 0, scale: 0.88, duration: 0.9 }, '-=0.7')
    .from('.hero__stat-card', { x: 30, opacity: 0, duration: 0.5 }, '-=0.4')
    .from('.hero__orbit', { opacity: 0, scale: 0, stagger: 0.1, duration: 0.35 }, '-=0.3')
    .from('.hero__scroll', { opacity: 0, y: -8, duration: 0.4 }, '-=0.2');

  gsap.to('.hero__frame', {
    y: -10,
    duration: 3,
    ease: 'sine.inOut',
    yoyo: true,
    repeat: -1,
  });

  return tl;
}

export function initHeroScroll({ hero, reducedMotion }) {
  if (reducedMotion || !hero) return () => {};

  const ctx = gsap.context(() => {
    // Fade/parallax only while the hero *leaves* the viewport — not while scrolling
    // through the tall hero on mobile (visual sits below the fold).
    const exitTrigger = {
      trigger: hero,
      start: 'bottom 85%',
      end: 'bottom top',
      scrub: 0.8,
    };

    gsap.to('.hero__content', {
      y: -30,
      ease: 'none',
      scrollTrigger: exitTrigger,
    });

    gsap.to('.hero__visual', {
      y: 20,
      scale: 0.96,
      ease: 'none',
      scrollTrigger: exitTrigger,
    });

    gsap.to('.hero__bg-zoom', {
      scale: 1.08,
      ease: 'none',
      scrollTrigger: exitTrigger,
    });
  }, hero);

  return () => ctx.revert();
}
