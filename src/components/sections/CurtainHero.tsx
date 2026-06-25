'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const PARTICLES = [
  { x: 10, y: 15, s: 1.5, d: 5, dl: 0 }, { x: 25, y: 30, s: 1, d: 6, dl: 1 },
  { x: 45, y: 10, s: 2, d: 4, dl: 0.5 }, { x: 60, y: 50, s: 1, d: 7, dl: 2 },
  { x: 75, y: 25, s: 1.5, d: 5, dl: 1.5 }, { x: 85, y: 65, s: 1, d: 6, dl: 0.3 },
  { x: 15, y: 70, s: 1.5, d: 5, dl: 2.5 }, { x: 50, y: 80, s: 1, d: 6, dl: 1.2 },
  { x: 35, y: 55, s: 2, d: 4, dl: 0.8 }, { x: 90, y: 40, s: 1, d: 7, dl: 1.8 },
];

interface Props {
  onEnter: () => void;
}

export default function CurtainHero({ onEnter }: Props) {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current) return;
    const els = contentRef.current.children;
    gsap.set(els, { opacity: 0, y: 15 });
    const tl = gsap.timeline({ delay: 0.3 });
    tl.to(els[0], { opacity: 0.5, y: 0, duration: 0.6 })
      .to(els[1], { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.2')
      .to(els[2], { opacity: 0.35, y: 0, duration: 0.5 }, '-=0.2')
      .to(els[3], { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.2')
      .to(els[4], { opacity: 1, y: 0, duration: 0.5 }, '-=0.2')
      .to(els[5], { opacity: 1, y: 0, duration: 0.5 }, '-=0.1');
    return () => { tl.kill(); };
  }, []);

  return (
    <section
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden cursor-pointer"
      style={{ background: '#000' }}
      onClick={onEnter}
      onTouchEnd={onEnter}
    >
      {/* Curtains */}
      <div className="absolute inset-y-0 left-0 w-[42%] z-0" style={{
        background: 'linear-gradient(100deg, #1c0003 0%, #2a0006 30%, #150002 70%, #0a0000 100%)',
      }}>
        <div className="absolute inset-0" style={{ background: 'repeating-linear-gradient(90deg, transparent, transparent 16px, rgba(0,0,0,0.12) 16px, rgba(0,0,0,0.12) 18px)' }} />
        <div className="absolute inset-y-0 right-0 w-8" style={{ background: 'linear-gradient(90deg, transparent, rgba(0,0,0,0.6))' }} />
      </div>
      <div className="absolute inset-y-0 right-0 w-[42%] z-0" style={{
        background: 'linear-gradient(-100deg, #1c0003 0%, #2a0006 30%, #150002 70%, #0a0000 100%)',
      }}>
        <div className="absolute inset-0" style={{ background: 'repeating-linear-gradient(90deg, transparent, transparent 16px, rgba(0,0,0,0.12) 16px, rgba(0,0,0,0.12) 18px)' }} />
        <div className="absolute inset-y-0 left-0 w-8" style={{ background: 'linear-gradient(-90deg, transparent, rgba(0,0,0,0.6))' }} />
      </div>

      {/* Projector */}
      <div className="absolute inset-0 z-[1]" style={{ background: 'radial-gradient(ellipse 60% 40% at 50% -5%, rgba(255,255,255,0.04) 0%, transparent 100%)' }} />
      <div className="absolute inset-0 z-[1]" style={{ background: 'radial-gradient(circle at 50% 45%, rgba(229,9,20,0.03) 0%, transparent 50%)' }} />

      {/* Particles */}
      <div className="absolute inset-0 z-[1] overflow-hidden pointer-events-none">
        {PARTICLES.map((p, i) => (
          <div key={i} className="absolute rounded-full" style={{
            width: p.s, height: p.s, left: `${p.x}%`, top: `${p.y}%`,
            background: 'rgba(255,255,255,0.15)',
            animation: `float ${p.d}s ease-in-out infinite`, animationDelay: `${p.dl}s`,
          }} />
        ))}
      </div>

      {/* Content */}
      <div ref={contentRef} className="relative z-10 flex flex-col items-center text-center px-8">
        <p className="text-[0.6rem] tracking-[0.4em] text-white/50 uppercase mb-4 font-light">Bir Orijinal Yapım</p>
        <h1 className="font-heading text-accent text-[3.5rem] tracking-[0.15em] leading-none mb-3">LOVEFLIX</h1>
        <p className="text-[0.55rem] tracking-[0.35em] text-white/30 uppercase mb-8 font-light">sunar</p>
        <div className="text-center">
          <h2 className="font-heading text-[2.2rem] tracking-[0.25em] text-white leading-none">EMİR</h2>
          <p className="font-serif text-2xl text-white/30 my-2 italic">&</p>
          <h2 className="font-heading text-[2.2rem] tracking-[0.25em] text-white leading-none">ELİF</h2>
        </div>
        <p className="text-accent font-heading text-xl tracking-[0.2em] mt-6">29.08.2026</p>
        <div className="mt-14 flex flex-col items-center gap-3">
          <div className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center pt-1.5">
            <div className="w-0.5 h-2 bg-white/40 rounded-full animate-bounce" />
          </div>
          <span className="text-[0.5rem] tracking-[0.4em] text-white/20 uppercase font-light">Dokunun</span>
        </div>
      </div>
    </section>
  );
}
