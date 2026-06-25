'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function useGsapContext(scope: React.RefObject<HTMLElement | null>) {
  const ctx = useRef<gsap.Context | null>(null);

  useEffect(() => {
    if (!scope.current) return;
    ctx.current = gsap.context(() => {}, scope.current);
    return () => ctx.current?.revert();
  }, [scope]);

  return ctx;
}

export function useScrollReveal(
  ref: React.RefObject<HTMLElement | null>,
  options?: {
    y?: number;
    scale?: number;
    duration?: number;
    delay?: number;
    start?: string;
  }
) {
  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    const { y = 80, scale = 1, duration = 1.2, delay = 0, start = 'top 85%' } = options || {};

    gsap.set(el, { y, opacity: 0, scale });
    const tween = gsap.to(el, {
      y: 0,
      opacity: 1,
      scale: 1,
      duration,
      delay,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start,
        toggleActions: 'play none none none',
      },
    });

    return () => {
      tween.kill();
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === el) t.kill();
      });
    };
  }, [ref, options]);
}

export function useTextReveal(
  ref: React.RefObject<HTMLElement | null>,
  options?: { delay?: number; start?: string }
) {
  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    const text = el.textContent || '';
    const { delay = 0, start = 'top 85%' } = options || {};

    el.innerHTML = '';
    const chars = text.split('').map((char) => {
      const span = document.createElement('span');
      span.textContent = char === ' ' ? ' ' : char;
      span.style.display = 'inline-block';
      span.style.opacity = '0';
      span.style.transform = 'translateY(100%) rotateX(-80deg)';
      el.appendChild(span);
      return span;
    });

    const tween = gsap.to(chars, {
      opacity: 1,
      y: 0,
      rotateX: 0,
      duration: 0.8,
      stagger: 0.03,
      delay,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start,
        toggleActions: 'play none none none',
      },
    });

    return () => {
      tween.kill();
    };
  }, [ref, options]);
}
