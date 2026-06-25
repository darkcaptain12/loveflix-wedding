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
      { opacity: 0, y: 30, scale: 0.9 },
      {
        opacity: 1, y: 0, scale: 1, stagger: 0.12, duration: 0.6, ease: 'power2.out',
        scrollTrigger: { trigger: cardsRef.current, start: 'top 80%' },
      }
    );
  }, []);

  return (
    <section className="py-14 px-4" style={{ background: '#141414' }}>
      <div className="flex items-center justify-between mb-8">
        <span className="font-heading text-accent text-lg tracking-wider">LOVEFLIX</span>
        <span className="text-[0.7rem] text-dim">Oturum Aç</span>
      </div>

      <h2 className="text-center text-xl font-medium text-white mb-8">Kim Katılıyor?</h2>

      <div ref={cardsRef} className="flex justify-center gap-4 mb-8">
        {PROFILES.map((p) => (
          <div
            key={p.id}
            className="flex flex-col items-center w-[72px] cursor-pointer transition-transform active:scale-95 hover:scale-105"
          >
            <div
              className="w-[72px] h-[72px] rounded-lg flex items-center justify-center mb-1.5 transition-shadow hover:shadow-[0_0_20px_rgba(229,9,20,0.3)]"
              style={{ background: p.color }}
            >
              <span className="text-[1.8rem]">{p.icon}</span>
            </div>
            <span className="text-[0.6rem] text-dim leading-tight text-center">{p.label}</span>
          </div>
        ))}
      </div>

      <div className="flex justify-center">
        <button className="nf-btn nf-btn-outline text-[0.7rem] px-5 py-1.5 rounded">
          Profil Yönetimi
        </button>
      </div>
    </section>
  );
}
