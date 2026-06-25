'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HERO_IMAGE } from '@/constants';

if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger);

export default function MovieHero() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.from('.mh-image', {
        opacity: 0, scale: 1.05, duration: 1.2, ease: 'power2.out',
        scrollTrigger: { trigger: ref.current, start: 'top 80%' },
      });
      gsap.from('.mh-content > *', {
        opacity: 0, y: 20, stagger: 0.1, duration: 0.6,
        scrollTrigger: { trigger: ref.current, start: 'top 70%' },
      });
    }, ref.current);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} id="hero" className="relative" style={{ background: '#141414' }}>
      {/* Hero image - full width */}
      <div className="mh-image relative w-full aspect-[3/4] overflow-hidden">
        <img
          src={HERO_IMAGE}
          alt="Emir & Elif"
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager"
        />
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#141414]/50 to-transparent" />

        {/* Title on image */}
        <div className="absolute bottom-0 left-0 right-0 px-4 pb-4">
          <h2 className="font-heading text-[2.8rem] leading-[0.92] tracking-wider text-white drop-shadow-lg">
            OUR LOVE<br />STORY
          </h2>
        </div>
      </div>

      {/* Content below image */}
      <div className="mh-content px-4 pb-6 -mt-1">
        {/* Meta badges */}
        <div className="flex items-center gap-2 mb-2.5 flex-wrap">
          <span className="text-[0.75rem] text-green-500 font-semibold">Yeni Bölümler</span>
          <span className="text-[0.72rem] text-dim">2022</span>
          <span className="text-[0.55rem] px-1 py-[1px] border border-white/30 text-white/60 rounded-sm leading-none">18+</span>
          <span className="text-[0.72rem] text-dim">1 Sezon</span>
        </div>

        {/* Genre tags */}
        <div className="flex items-center gap-1.5 mb-3">
          <span className="text-[0.72rem] text-white/90">Romantik</span>
          <span className="text-accent text-[0.5rem]">●</span>
          <span className="text-[0.72rem] text-white/90">Komedi</span>
          <span className="text-accent text-[0.5rem]">●</span>
          <span className="text-[0.72rem] text-white/90">Gerçek Hikaye</span>
        </div>

        {/* Description */}
        <p className="text-[0.8rem] text-dim leading-relaxed mb-4">
          İki insanın yolları kesişti, kalpleri birleşti ve en güzel hikaye başladı.
        </p>

        {/* Buttons */}
        <div className="flex items-center gap-2.5">
          <a href="#finale" className="nf-btn nf-btn-white text-[0.85rem] px-6 py-2.5 rounded-md font-bold">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
            İzle
          </a>
          <a href="#events" className="nf-btn nf-btn-gray text-[0.85rem] px-5 py-2.5 rounded-md">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path d="M12 4v16m8-8H4" /></svg>
            Listem
          </a>
        </div>
      </div>
    </section>
  );
}
