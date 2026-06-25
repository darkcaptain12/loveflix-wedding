'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { EPISODES } from '@/constants';

if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger);

export default function Episodes() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.from('.ep-item', {
        opacity: 0, x: 30, stagger: 0.1, duration: 0.6, ease: 'power2.out',
        scrollTrigger: { trigger: ref.current, start: 'top 80%' },
      });
    }, ref.current);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} id="episodes" className="pt-4 pb-6" style={{ background: '#141414' }}>
      {/* Section header */}
      <div className="flex items-baseline justify-between px-4 mb-0.5">
        <h3 className="text-[1.1rem] font-bold text-white">Bölümler</h3>
      </div>
      <div className="flex items-center gap-2 px-4 mb-4">
        <span className="text-[0.7rem] text-white/90 font-medium">Sezon 1</span>
        <svg className="w-2.5 h-2.5 text-white/50" fill="currentColor" viewBox="0 0 20 20"><path d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" /></svg>
      </div>

      {/* Episode list — Netflix vertical style */}
      <div className="px-4 space-y-4">
        {EPISODES.map((ep) => (
          <div key={ep.num} className="ep-item flex gap-3 items-start group cursor-pointer">
            {/* Thumbnail */}
            <div className="relative w-[130px] flex-shrink-0 aspect-[16/9] rounded-[4px] overflow-hidden bg-[#2a2a2a]">
              <img
                src={ep.image}
                alt={ep.title}
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
              />
              {/* Play icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-8 h-8 rounded-full border border-white/60 bg-black/30 flex items-center justify-center backdrop-blur-sm">
                  <svg className="w-3 h-3 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                </div>
              </div>
              {/* Duration badge */}
              <div className="absolute bottom-1 right-1">
                <span className="text-[0.5rem] text-white/80 bg-black/70 px-1 rounded-sm">{ep.num}. Bölüm</span>
              </div>
              {/* Progress */}
              <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#333]">
                <div className="h-full bg-accent" style={{ width: `${ep.progress}%` }} />
              </div>
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0 pt-0.5">
              <div className="flex items-start justify-between gap-2">
                <h4 className="text-[0.82rem] text-white font-medium leading-snug">{ep.title}</h4>
                <span className="text-[0.6rem] text-dim/40 flex-shrink-0">{ep.date}</span>
              </div>
              <p className="text-[0.68rem] text-dim/50 leading-relaxed mt-1 line-clamp-2">{ep.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="section-divider mt-6" />
    </section>
  );
}
