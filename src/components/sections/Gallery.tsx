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
      gsap.from('.gal-card', {
        opacity: 0, scale: 0.92, stagger: 0.08, duration: 0.5,
        scrollTrigger: { trigger: ref.current, start: 'top 80%' },
      });
    }, ref.current);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} id="gallery" className="px-4 py-8" style={{ background: '#141414' }}>
      <h3 className="text-[1.2rem] font-bold text-white mb-4">Galeri</h3>

      <div className="grid grid-cols-2 gap-1.5">
        {GALLERY_IMAGES.map((src, i) => (
          <div
            key={src}
            className={`gal-card rounded-lg overflow-hidden ${i === 0 ? 'col-span-2 aspect-video' : 'aspect-square'}`}
          >
            <img
              src={src}
              alt={`Galeri ${i + 1}`}
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
