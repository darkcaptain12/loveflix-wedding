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
      gsap.from('.event-card-anim', {
        opacity: 0, y: 30, stagger: 0.15, duration: 0.7,
        scrollTrigger: { trigger: ref.current, start: 'top 70%' },
      });
    }, ref.current);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} id="events" className="px-4 py-8" style={{ background: '#141414' }}>
      <h3 className="nf-section-title text-white px-0 mb-4">Etkinlikler</h3>

      <div className="space-y-4">
        {WEDDING_EVENTS.map((ev) => (
          <div
            key={ev.id}
            className="event-card-anim rounded-lg overflow-hidden"
            style={{ background: '#1e1e1e' }}
          >
            {/* Top bar */}
            <div className="bg-accent/10 px-4 py-2 flex items-center justify-between">
              <span className="text-accent text-[0.65rem] font-bold tracking-[0.15em] uppercase">
                {ev.label}
              </span>
              <span className="text-2xl">{ev.emoji}</span>
            </div>

            <div className="px-4 py-4">
              <h4 className="font-heading text-xl tracking-wider text-white mb-2">{ev.title}</h4>

              <div className="space-y-1.5 mb-4">
                <div className="flex items-center gap-2">
                  <svg className="w-3.5 h-3.5 text-muted flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" />
                  </svg>
                  <span className="text-[0.78rem] text-dim">{ev.date}</span>
                </div>

                {ev.time && (
                  <div className="flex items-center gap-2">
                    <svg className="w-3.5 h-3.5 text-muted flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" />
                    </svg>
                    <span className="text-[0.78rem] text-accent font-bold">{ev.time}</span>
                  </div>
                )}

                <div className="flex items-start gap-2">
                  <svg className="w-3.5 h-3.5 text-muted flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z" /><circle cx="12" cy="11" r="3" />
                  </svg>
                  <div className="text-[0.78rem] text-dim leading-relaxed">
                    <p className="text-white font-medium">{ev.venue}</p>
                    {ev.district && <p>{ev.district}</p>}
                    {ev.address && <p>{ev.address}</p>}
                    {ev.zip && <p>{ev.zip}</p>}
                    <p>{ev.city}</p>
                  </div>
                </div>
              </div>

              {ev.mapsUrl && (
                <a
                  href={ev.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="nf-btn nf-btn-outline text-xs w-full py-2 justify-center"
                >
                  📍 Haritada Aç
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
