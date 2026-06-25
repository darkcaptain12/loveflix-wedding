'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const PARTICLES = [
  { x: 10, y: 15, s: 2, d: 4, dl: 0 },
  { x: 25, y: 30, s: 1.5, d: 5, dl: 1 },
  { x: 45, y: 10, s: 2.5, d: 3.5, dl: 0.5 },
  { x: 60, y: 50, s: 1, d: 6, dl: 2 },
  { x: 75, y: 25, s: 2, d: 4.5, dl: 1.5 },
  { x: 85, y: 65, s: 1.5, d: 5.5, dl: 0.3 },
  { x: 15, y: 70, s: 2, d: 4, dl: 2.5 },
  { x: 50, y: 80, s: 1, d: 5, dl: 1.2 },
  { x: 35, y: 55, s: 2.5, d: 3, dl: 0.8 },
  { x: 90, y: 40, s: 1.5, d: 6, dl: 1.8 },
  { x: 5, y: 45, s: 2, d: 4.2, dl: 0.7 },
  { x: 70, y: 85, s: 1, d: 5.3, dl: 2.2 },
];

export default function CurtainHero() {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current) return;

    const els = contentRef.current.children;
    gsap.set(els, { opacity: 0, y: 20 });

    const tl = gsap.timeline({ delay: 0.3 });
    tl.to(els[0], { opacity: 0.6, y: 0, duration: 0.6 })
      .to(els[1], { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'power3.out' }, '-=0.2')
      .to(els[2], { opacity: 0.4, y: 0, duration: 0.5 }, '-=0.2')
      .to(els[3], { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.2')
      .to(els[4], { opacity: 1, y: 0, duration: 0.5 }, '-=0.2')
      .to(els[5], { opacity: 0.4, y: 0, duration: 0.5 }, '-=0.1');

    return () => { tl.kill(); };
  }, []);

  return (
    <section className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden" style={{ background: '#0a0000' }}>
      {/* Red curtain left */}
      <div className="absolute inset-y-0 left-0 w-[45%] z-0" style={{
        background: 'linear-gradient(90deg, #1a0000 0%, #2d0005 40%, #0d0000 100%)',
        boxShadow: 'inset -30px 0 60px rgba(0,0,0,0.8)',
      }}>
        <div className="absolute inset-0" style={{
          background: 'repeating-linear-gradient(90deg, transparent, transparent 18px, rgba(0,0,0,0.15) 18px, rgba(0,0,0,0.15) 20px)',
        }} />
      </div>
      {/* Red curtain right */}
      <div className="absolute inset-y-0 right-0 w-[45%] z-0" style={{
        background: 'linear-gradient(-90deg, #1a0000 0%, #2d0005 40%, #0d0000 100%)',
        boxShadow: 'inset 30px 0 60px rgba(0,0,0,0.8)',
      }}>
        <div className="absolute inset-0" style={{
          background: 'repeating-linear-gradient(90deg, transparent, transparent 18px, rgba(0,0,0,0.15) 18px, rgba(0,0,0,0.15) 20px)',
        }} />
      </div>

      {/* Projector light */}
      <div className="absolute inset-0 z-[1]" style={{
        background: 'radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.06) 0%, transparent 50%)',
      }} />

      {/* Particles - deterministic */}
      <div className="absolute inset-0 z-[1] overflow-hidden pointer-events-none">
        {PARTICLES.map((p, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white/10"
            style={{
              width: p.s,
              height: p.s,
              left: `${p.x}%`,
              top: `${p.y}%`,
              animation: `float ${p.d}s ease-in-out infinite`,
              animationDelay: `${p.dl}s`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div ref={contentRef} className="relative z-10 flex flex-col items-center text-center px-6">
        <p className="text-[0.7rem] tracking-[0.35em] text-white/60 uppercase mb-3">
          Bir Orijinal Yapım
        </p>

        <h1 className="font-heading text-accent text-5xl tracking-wider mb-2">
          LOVEFLIX
        </h1>

        <p className="text-[0.65rem] tracking-[0.3em] text-white/40 uppercase mb-5">
          sunar
        </p>

        <div className="text-center">
          <h2 className="font-heading text-4xl tracking-[0.2em] text-white leading-tight">EMİR</h2>
          <p className="font-serif text-xl text-white/50 my-1 italic">&</p>
          <h2 className="font-heading text-4xl tracking-[0.2em] text-white leading-tight">ELİF</h2>
        </div>

        <p className="text-accent font-heading text-lg tracking-[0.15em] mt-4">
          29.08.2026
        </p>

        <div className="mt-12 flex flex-col items-center gap-2">
          <svg className="w-5 h-5 text-white/40 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
          <span className="text-[0.6rem] tracking-[0.3em] text-white/30 uppercase">
            Devam Etmek İçin Kaydırın
          </span>
        </div>
      </div>
    </section>
  );
}
