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
        opacity: 0, scale: 1.08, duration: 1.4, ease: 'power2.out',
        scrollTrigger: { trigger: ref.current, start: 'top 85%' },
      });
      gsap.from('.mh-content > *', {
        opacity: 0, y: 15, stagger: 0.08, duration: 0.5,
        scrollTrigger: { trigger: ref.current, start: 'top 70%' },
      });
    }, ref.current);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} id="hero" className="relative" style={{ background: '#141414' }}>
      {/* Full-bleed hero image */}
      <div className="mh-image relative w-full aspect-[3/4] overflow-hidden">
        <img
          src={HERO_IMAGE}
          alt="Emir & Elif"
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager"
        />
        {/* Netflix-style gradient overlays */}
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(0deg, #141414 0%, rgba(20,20,20,0.7) 25%, transparent 50%, rgba(20,20,20,0.3) 100%)',
        }} />
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(90deg, rgba(20,20,20,0.4) 0%, transparent 50%)',
        }} />

        {/* Title overlay */}
        <div className="absolute bottom-6 left-4 right-4">
          <div className="flex items-center gap-1.5 mb-2">
            <span className="font-heading text-accent text-[0.7rem] tracking-[0.1em]">L</span>
            <span className="text-[0.55rem] text-white/40 uppercase tracking-[0.15em] font-light">Orijinal Film</span>
          </div>
          <h2 className="font-heading text-[3rem] leading-[0.88] tracking-[0.08em] text-white">
            OUR LOVE<br />STORY
          </h2>
        </div>
      </div>

      {/* Content */}
      <div className="mh-content px-4 pt-3 pb-5">
        {/* Match percentage */}
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[0.78rem] text-green-500 font-bold">%98 Eşleşme</span>
          <span className="text-[0.7rem] text-dim/60">2022</span>
          <span className="text-[0.5rem] px-1 py-[1px] border border-white/25 text-white/50 rounded-[2px] leading-none">18+</span>
          <span className="text-[0.7rem] text-dim/60">1 Sezon</span>
        </div>

        {/* Description */}
        <p className="text-[0.82rem] text-white/80 leading-[1.5] mb-3">
          İki insanın yolları kesişti, kalpleri birleşti ve en güzel hikaye başladı.
        </p>

        {/* Genre dots */}
        <div className="flex items-center gap-1 mb-5">
          <span className="text-[0.7rem] text-white/60">Romantik</span>
          <span className="text-[0.35rem] text-dim/30">●</span>
          <span className="text-[0.7rem] text-white/60">Komedi</span>
          <span className="text-[0.35rem] text-dim/30">●</span>
          <span className="text-[0.7rem] text-white/60">Gerçek Hikaye</span>
        </div>

        {/* Netflix-style action buttons */}
        <a href="#finale" className="nf-btn nf-btn-white w-full py-2.5 rounded-[4px] text-[0.9rem] mb-2">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
          İzle
        </a>
        <a href="#events" className="nf-btn nf-btn-gray w-full py-2.5 rounded-[4px] text-[0.9rem] bg-[rgba(45,45,45,0.9)]">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path d="M12 4v16m8-8H4" /></svg>
          Listem
        </a>

        {/* Bottom action row */}
        <div className="flex items-center justify-around mt-4 pt-2">
          <button className="flex flex-col items-center gap-1 group">
            <svg className="w-5 h-5 text-white/70" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" d="M12 4v16m8-8H4" /></svg>
            <span className="text-[0.55rem] text-white/40">Listem</span>
          </button>
          <button className="flex flex-col items-center gap-1 group">
            <svg className="w-5 h-5 text-white/70" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017a2 2 0 01-.862-.2l-3.384-1.692V13m0 0l3.362-6.724A1 1 0 0111.236 5h.264a2 2 0 012 2v3H13.5m-3.5 3V9" /></svg>
            <span className="text-[0.55rem] text-white/40">Beğen</span>
          </button>
          <button className="flex flex-col items-center gap-1 group">
            <svg className="w-5 h-5 text-white/70" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
            <span className="text-[0.55rem] text-white/40">Paylaş</span>
          </button>
        </div>
      </div>

      <div className="section-divider" />
    </section>
  );
}
