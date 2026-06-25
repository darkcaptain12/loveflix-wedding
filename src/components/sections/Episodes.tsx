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
      gsap.from('.ep-card-anim', {
        opacity: 0, x: 40, stagger: 0.12, duration: 0.7, ease: 'power2.out',
        scrollTrigger: { trigger: ref.current, start: 'top 80%' },
      });
    }, ref.current);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} id="episodes" className="py-6" style={{ background: '#141414' }}>
      <div className="flex items-baseline justify-between px-4 mb-1">
        <h3 className="text-[1.2rem] font-bold text-white">Bölümler</h3>
        <span className="text-[0.7rem] text-accent">Tümünü Gör &gt;</span>
      </div>
      <p className="text-[0.7rem] text-muted px-4 mb-3">Sezon 1</p>

      <div
        className="flex gap-3 overflow-x-auto px-4 pb-4 snap-x snap-mandatory"
        style={{ scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' }}
      >
        {EPISODES.map((ep) => (
          <div key={ep.num} className="ep-card-anim flex-shrink-0 w-[155px] snap-start">
            {/* Thumbnail */}
            <div className="relative w-full aspect-[16/10] rounded-md overflow-hidden mb-2 bg-[#2a2a2a]">
              <img
                src={ep.image}
                alt={ep.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                loading="lazy"
              />
              {/* Play icon on hover */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/0 hover:bg-black/30 transition-colors">
                <div className="w-8 h-8 rounded-full bg-white/0 hover:bg-white/20 flex items-center justify-center transition-colors">
                  <svg className="w-3 h-3 text-white/0 hover:text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                </div>
              </div>
              {/* Episode number */}
              <div className="absolute bottom-1.5 left-2">
                <span className="font-heading text-xl text-white/90 drop-shadow-lg">{ep.num}</span>
              </div>
            </div>

            {/* Info */}
            <h4 className="text-[0.72rem] text-white font-medium leading-tight mb-0.5 truncate">{ep.title}</h4>
            <p className="text-[0.58rem] text-muted">{ep.date}</p>

            {/* Progress bar */}
            <div className="h-[3px] bg-[#333] rounded-full mt-1.5 overflow-hidden">
              <div className="h-full bg-accent rounded-full" style={{ width: `${ep.progress}%` }} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
