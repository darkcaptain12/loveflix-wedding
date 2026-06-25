'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { WEDDING_EVENTS } from '@/constants';

if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger);

export default function WeddingEvents() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.from('.ev-card', {
        opacity: 0, y: 25, stagger: 0.12, duration: 0.6,
        scrollTrigger: { trigger: ref.current, start: 'top 75%' },
      });
    }, ref.current);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} id="events" className="px-4 py-8" style={{ background: '#141414' }}>
      <h3 className="text-[1.1rem] font-bold text-white mb-4">Etkinlikler</h3>

      <div className="space-y-3">
        {WEDDING_EVENTS.map((ev) => (
          <div key={ev.id} className="ev-card rounded-lg overflow-hidden" style={{ background: '#1c1c1c' }}>
            {/* Header bar */}
            <div className="flex items-center justify-between px-4 py-2.5" style={{ background: 'rgba(229,9,20,0.08)' }}>
              <div className="flex items-center gap-2">
                <div className="w-1 h-4 bg-accent rounded-full" />
                <span className="text-accent text-[0.6rem] font-bold tracking-[0.12em] uppercase">{ev.label}</span>
              </div>
              <span className="text-lg">{ev.emoji}</span>
            </div>

            <div className="px-4 py-4">
              {/* Date + time row */}
              <div className="flex items-center gap-3 mb-3">
                <span className="text-[0.75rem] text-white/80 font-medium">{ev.date}</span>
                {ev.time && (
                  <>
                    <span className="text-dim/20">•</span>
                    <span className="text-accent font-heading text-lg tracking-wider">{ev.time}</span>
                  </>
                )}
              </div>

              {/* Venue */}
              <div className="space-y-0.5 text-[0.75rem] text-dim/60">
                <p className="text-white/80 font-medium">{ev.venue}</p>
                {ev.district && <p>{ev.district}</p>}
                {ev.address && <p>{ev.address}</p>}
                {ev.zip && ev.city && <p>{ev.zip}, {ev.city}</p>}
                {!ev.zip && ev.city && <p>{ev.city}</p>}
              </div>

              {/* Map button */}
              {ev.mapsUrl && (
                <a href={ev.mapsUrl} target="_blank" rel="noopener noreferrer"
                  className="nf-btn nf-btn-outline w-full mt-4 py-2 text-[0.72rem] rounded-[4px]">
                  📍 Haritada Aç
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="section-divider mt-8" />
    </section>
  );
}
