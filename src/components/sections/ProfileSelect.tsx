'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PROFILES } from '@/constants';

if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger);

export default function ProfileSelect() {
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardsRef.current) return;
    const cards = cardsRef.current.children;
    gsap.fromTo(cards,
      { opacity: 0, y: 25, scale: 0.9 },
      { opacity: 1, y: 0, scale: 1, stagger: 0.1, duration: 0.5, ease: 'power2.out',
        scrollTrigger: { trigger: cardsRef.current, start: 'top 85%' },
      }
    );
  }, []);

  return (
    <section className="py-12 px-4" style={{ background: '#141414' }}>
      {/* Netflix header */}
      <div className="flex items-center justify-between mb-10">
        <span className="font-heading text-accent text-lg tracking-[0.15em]">LOVEFLIX</span>
        <span className="text-[0.7rem] text-dim/60">Oturum Aç</span>
      </div>

      <h2 className="text-center text-[1.3rem] font-medium text-white mb-2">Kim Katılıyor?</h2>
      <p className="text-center text-[0.7rem] text-dim/50 mb-8">Profilinizi seçin</p>

      <div ref={cardsRef} className="flex justify-center gap-5 mb-8">
        {PROFILES.map((p) => (
          <div key={p.id} className="flex flex-col items-center w-[68px] cursor-pointer group">
            <div
              className="w-[68px] h-[68px] rounded-md flex items-center justify-center mb-2 transition-all duration-200 group-active:scale-95 border-2 border-transparent group-hover:border-white/30"
              style={{ background: p.color }}
            >
              <span className="text-[1.7rem]">{p.icon}</span>
            </div>
            <span className="text-[0.6rem] text-dim/70 group-hover:text-white transition-colors text-center leading-tight">
              {p.label}
            </span>
          </div>
        ))}
      </div>

      <div className="section-divider" />
    </section>
  );
}
