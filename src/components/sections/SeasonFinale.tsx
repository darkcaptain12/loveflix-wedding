'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { WEDDING_DATE, WEDDING_SCREEN_IMAGE } from '@/constants';

if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger);

export default function SeasonFinale() {
  const ref = useRef<HTMLDivElement>(null);
  const [cd, setCd] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const calc = () => {
      const diff = Math.max(0, WEDDING_DATE.getTime() - Date.now());
      setCd({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    };
    calc();
    const id = setInterval(calc, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.from('.sf-content > *', {
        opacity: 0, y: 25, stagger: 0.12, duration: 0.7,
        scrollTrigger: { trigger: ref.current, start: 'top 70%' },
      });
    }, ref.current);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} id="finale" className="py-8" style={{ background: '#0d0d0d' }}>
      <div className="sf-content px-4">
        <span className="text-accent text-[0.7rem] font-bold tracking-[0.2em] uppercase block mb-1">
          Sezon Finali
        </span>

        <h2 className="font-heading text-[2.6rem] tracking-wider text-white leading-[0.92] mb-3">
          THE WEDDING
        </h2>

        <p className="text-[0.8rem] text-dim leading-relaxed mb-5">
          Bu hikayenin en özel bölümünde, sizi de aramızda görmekten mutluluk duyarız.
        </p>

        {/* Cinema screen with real image */}
        <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden mb-6 shadow-2xl">
          <img
            src={WEDDING_SCREEN_IMAGE}
            alt="Emir & Elif"
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
          />
          {/* Red curtain edges */}
          <div className="absolute inset-y-0 left-0 w-3" style={{ background: 'linear-gradient(90deg, #2d0005, transparent)' }} />
          <div className="absolute inset-y-0 right-0 w-3" style={{ background: 'linear-gradient(-90deg, #2d0005, transparent)' }} />
          <div className="absolute inset-0 bg-black/30" />

          {/* Names overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-serif text-4xl italic text-white drop-shadow-lg">Emir</span>
            <span className="font-serif text-xl italic text-accent drop-shadow-lg">&</span>
            <span className="font-serif text-4xl italic text-white drop-shadow-lg">Elif</span>
            <span className="text-accent text-2xl mt-1 drop-shadow-lg">♥</span>
          </div>
        </div>

        {/* Wedding details */}
        <div className="space-y-2.5 mb-5">
          <div className="flex items-center gap-3">
            <span className="text-base">📅</span>
            <span className="text-[0.8rem] text-dim">29 Ağustos 2026, Cuma</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-base">🕐</span>
            <span className="text-[0.8rem] text-dim">20:15</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-base">📍</span>
            <span className="text-[0.8rem] text-dim">Atapark Salon Pırlanta, Nilüfer / Bursa</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-base">👔</span>
            <span className="text-[0.8rem] text-dim">Dress Code: Elegant</span>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2 mb-6">
          <a href="#rsvp" className="nf-btn nf-btn-accent text-[0.8rem] flex-1 py-3 justify-center rounded-md font-bold">
            Katılım Onayı
          </a>
          <a
            href="https://maps.google.com/?q=Atapark+Salon+Pırlanta+Nilüfer+Bursa"
            target="_blank"
            rel="noopener noreferrer"
            className="nf-btn nf-btn-outline text-[0.8rem] flex-1 py-3 justify-center rounded-md"
          >
            📍 Yol Tarifi
          </a>
        </div>

        {/* Countdown */}
        <div className="rounded-xl p-4" style={{ background: '#1a1a1a' }}>
          <p className="text-[0.65rem] text-muted font-bold tracking-[0.15em] uppercase text-center mb-3">
            Büyük Güne Kalan Süre
          </p>
          <div className="flex items-center justify-center gap-4">
            {[
              { val: cd.days, label: 'Gün' },
              { val: cd.hours, label: 'Saat' },
              { val: cd.minutes, label: 'Dakika' },
              { val: cd.seconds, label: 'Saniye' },
            ].map((item) => (
              <div key={item.label} className="text-center">
                <div className="cd-num text-3xl">{mounted ? String(item.val).padStart(2, '0') : '--'}</div>
                <div className="cd-label text-[0.55rem]">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
