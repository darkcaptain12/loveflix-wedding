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
      gsap.from('.sf-anim > *', {
        opacity: 0, y: 20, stagger: 0.1, duration: 0.6,
        scrollTrigger: { trigger: ref.current, start: 'top 75%' },
      });
    }, ref.current);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} id="finale" className="py-8" style={{ background: '#141414' }}>
      <div className="sf-anim px-4">
        {/* Netflix "new episode" badge */}
        <div className="flex items-center gap-2 mb-3">
          <div className="w-1 h-6 bg-accent rounded-full" />
          <span className="text-accent text-[0.65rem] font-bold tracking-[0.2em] uppercase">
            Sezon Finali
          </span>
        </div>

        <h2 className="font-heading text-[2.8rem] tracking-[0.08em] text-white leading-[0.88] mb-2">
          THE WEDDING
        </h2>
        <p className="text-[0.8rem] text-dim/70 leading-relaxed mb-5">
          Bu hikayenin en özel bölümünde, sizi de aramızda görmekten mutluluk duyarız.
        </p>

        {/* Cinema screen */}
        <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden mb-6" style={{ boxShadow: '0 8px 40px rgba(0,0,0,0.6)' }}>
          <img src={WEDDING_SCREEN_IMAGE} alt="Emir & Elif" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
          <div className="absolute inset-y-0 left-0 w-4" style={{ background: 'linear-gradient(90deg, rgba(40,0,5,0.8), transparent)' }} />
          <div className="absolute inset-y-0 right-0 w-4" style={{ background: 'linear-gradient(-90deg, rgba(40,0,5,0.8), transparent)' }} />
          <div className="absolute inset-0 bg-black/25" />
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-serif text-[2.2rem] italic text-white drop-shadow-lg">Emir</span>
            <span className="font-serif text-lg italic text-accent/80 drop-shadow-lg">&</span>
            <span className="font-serif text-[2.2rem] italic text-white drop-shadow-lg">Elif</span>
            <span className="text-accent text-xl mt-1">♥</span>
          </div>
        </div>

        {/* Details - Netflix info style */}
        <div className="space-y-2 mb-5">
          {[
            { icon: '📅', text: '29 Ağustos 2026, Cuma' },
            { icon: '🕐', text: '20:15' },
            { icon: '📍', text: 'Atapark Salon Pırlanta, Nilüfer / Bursa' },
            { icon: '👔', text: 'Dress Code: Elegant' },
          ].map((d, i) => (
            <div key={i} className="flex items-center gap-2.5">
              <span className="text-[0.85rem] w-5 text-center">{d.icon}</span>
              <span className="text-[0.78rem] text-white/60">{d.text}</span>
            </div>
          ))}
        </div>

        {/* CTA buttons */}
        <div className="flex gap-2 mb-6">
          <a href="#rsvp" className="nf-btn nf-btn-accent flex-1 py-3 rounded-[4px] text-[0.85rem]">
            ❤️ Katılım Onayı
          </a>
          <a href="https://maps.google.com/?q=Atapark+Salon+Pırlanta+Nilüfer+Bursa" target="_blank" rel="noopener noreferrer"
            className="nf-btn nf-btn-outline flex-1 py-3 rounded-[4px] text-[0.85rem]">
            📍 Yol Tarifi
          </a>
        </div>

        {/* Countdown */}
        <div className="rounded-lg p-5" style={{ background: '#1c1c1c' }}>
          <p className="text-[0.55rem] text-dim/40 font-bold tracking-[0.2em] uppercase text-center mb-4">
            Büyük Güne Kalan Süre
          </p>
          <div className="flex items-center justify-center gap-3">
            {[
              { val: cd.days, label: 'Gün' },
              { val: cd.hours, label: 'Saat' },
              { val: cd.minutes, label: 'Dakika' },
              { val: cd.seconds, label: 'Saniye' },
            ].map((item, i) => (
              <div key={item.label} className="flex items-center gap-3">
                <div className="text-center min-w-[45px]">
                  <div className="cd-num">{mounted ? String(item.val).padStart(2, '0') : '--'}</div>
                  <div className="cd-label">{item.label}</div>
                </div>
                {i < 3 && <span className="text-dim/20 text-lg font-light -mt-3">:</span>}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="section-divider mt-8" />
    </section>
  );
}
