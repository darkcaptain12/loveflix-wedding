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
    <section ref={ref} id="events" className="px-4 py-8 overflow-hidden" style={{ background: '#141414' }}>
      <div className="flex items-center gap-2 mb-5">
        <div className="w-1 h-5 bg-accent rounded-full" />
        <h3 className="text-[1.1rem] font-bold text-white">Etkinlikler</h3>
      </div>

      <div className="space-y-4">
        {WEDDING_EVENTS.map((ev) => (
          <div key={ev.id} className="ev-card rounded-xl overflow-hidden" style={{ background: '#1c1c1c' }}>
            {/* Top accent strip */}
            <div className="h-[3px]" style={{ background: 'linear-gradient(90deg, #E50914, #E50914 40%, transparent)' }} />

            <div className="p-5">
              {/* Header row */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <span className="text-accent text-[0.58rem] font-bold tracking-[0.15em] uppercase block mb-1">{ev.label}</span>
                  <h4 className="font-heading text-[1.3rem] tracking-[0.06em] text-white leading-none">{ev.title}</h4>
                </div>
                <span className="text-[1.5rem] mt-0.5">{ev.emoji}</span>
              </div>

              {/* Info grid */}
              <div className="rounded-lg p-3.5 mb-4" style={{ background: 'rgba(255,255,255,0.02)' }}>
                {/* Date */}
                <div className="flex items-center gap-3 mb-2.5">
                  <div className="w-8 h-8 rounded-md bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                      <rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" />
                    </svg>
                  </div>
                  <div>
                    <span className="text-[0.65rem] text-dim/30 uppercase tracking-wider block">Tarih</span>
                    <span className="text-[0.85rem] text-white font-medium">{ev.date} 2026</span>
                  </div>
                </div>

                {/* Time */}
                {ev.time && (
                  <div className="flex items-center gap-3 mb-2.5">
                    <div className="w-8 h-8 rounded-md bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" />
                      </svg>
                    </div>
                    <div>
                      <span className="text-[0.65rem] text-dim/30 uppercase tracking-wider block">Saat</span>
                      <div className="flex items-center gap-2">
                        <span className="font-heading text-[1.1rem] text-accent tracking-wider">{ev.time}</span>
                        {ev.nikahTime && (
                          <>
                            <span className="text-dim/20 text-[0.6rem]">|</span>
                            <span className="text-[0.72rem] text-dim/50">Nikah {ev.nikahTime}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Location */}
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-md bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                      <path d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z" /><circle cx="12" cy="11" r="3" />
                    </svg>
                  </div>
                  <div>
                    <span className="text-[0.65rem] text-dim/30 uppercase tracking-wider block">Konum</span>
                    <span className="text-[0.82rem] text-white/80 font-medium block">{ev.venue}</span>
                    <span className="text-[0.7rem] text-dim/40 leading-snug block">
                      {[ev.district, ev.address, ev.zip ? `${ev.zip}, ${ev.city}` : ev.city].filter(Boolean).join(' · ')}
                    </span>
                  </div>
                </div>
              </div>

              {/* Map button */}
              {ev.mapsUrl && (
                <a
                  href={ev.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-lg text-[0.78rem] text-white/70 font-medium active:scale-[0.98] transition-transform"
                  style={{ background: 'rgba(229,9,20,0.08)', border: '1px solid rgba(229,9,20,0.15)' }}
                >
                  <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z" /><circle cx="12" cy="11" r="3" />
                  </svg>
                  Haritada Göster
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
