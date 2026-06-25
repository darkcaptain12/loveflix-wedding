'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GALLERY_IMAGES } from '@/constants';

if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger);

export default function Gallery() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.from('.gal-item', {
        opacity: 0, scale: 0.93, stagger: 0.06, duration: 0.5,
        scrollTrigger: { trigger: ref.current, start: 'top 80%' },
      });
    }, ref.current);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} id="gallery" className="px-4 py-8" style={{ background: '#141414' }}>
      <div className="flex items-baseline justify-between mb-4">
        <h3 className="text-[1.1rem] font-bold text-white">Galeri</h3>
        <span className="text-[0.65rem] text-dim/40">{GALLERY_IMAGES.length} Fotoğraf</span>
      </div>

      <div className="grid grid-cols-3 gap-1 rounded-lg overflow-hidden">
        {GALLERY_IMAGES.map((src, i) => (
          <div
            key={src}
            className={`gal-item overflow-hidden ${i === 0 ? 'col-span-2 row-span-2' : ''}`}
          >
            <img
              src={src}
              alt={`Galeri ${i + 1}`}
              className="w-full h-full object-cover aspect-square"
              loading="lazy"
            />
          </div>
        ))}
      </div>

      <div className="section-divider mt-8" />
    </section>
  );
}
