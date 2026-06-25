'use client';

import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger);

interface Props {
  side: string;
}

export default function RsvpSection({ side }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<'idle' | 'count' | 'loading' | 'done' | 'no'>('idle');
  const [name, setName] = useState('');
  const [count, setCount] = useState(1);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.from('.rsvp-wrap', {
        opacity: 0, y: 25, duration: 0.7,
        scrollTrigger: { trigger: ref.current, start: 'top 80%' },
      });
    }, ref.current);
    return () => ctx.revert();
  }, []);

  const submit = async () => {
    setStatus('loading');
    try {
      await fetch('/api/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim() || 'Misafir', count, side: side || 'friends' }),
      });
    } catch {}
    setStatus('done');
  };

  return (
    <section ref={ref} id="rsvp" className="px-4 py-8" style={{ background: '#141414' }}>
      <div className="rsvp-wrap">
        {/* Idle — two big buttons */}
        {status === 'idle' && (
          <div className="rounded-xl p-6" style={{ background: '#1c1c1c' }}>
            <div className="text-center mb-6">
              <span className="text-[2rem] block mb-2">💌</span>
              <h3 className="font-heading text-[1.4rem] tracking-[0.08em] text-white mb-1">
                Sizi Bekliyoruz
              </h3>
              <p className="text-[0.7rem] text-dim/40">29 Ağustos 2026 · Bursa</p>
            </div>

            <button
              onClick={() => setStatus('count')}
              className="w-full py-4 rounded-md bg-accent text-white font-bold text-[0.95rem] mb-2.5 active:scale-[0.98] transition-transform"
            >
              Katılıyorum
            </button>
            <button
              onClick={() => setStatus('no')}
              className="w-full py-3.5 rounded-md bg-white/[0.05] text-white/40 text-[0.85rem] active:scale-[0.98] transition-transform"
            >
              Maalesef Katılamıyorum
            </button>
          </div>
        )}

        {/* Count + optional name */}
        {status === 'count' && (
          <div className="rounded-xl p-6" style={{ background: '#1c1c1c', animation: 'fadeInUp 0.35s ease' }}>
            <h3 className="font-heading text-[1.2rem] tracking-[0.06em] text-white text-center mb-6">
              Kaç Kişi Geleceksiniz?
            </h3>

            {/* Big counter */}
            <div className="flex items-center justify-center gap-5 mb-6">
              <button
                onClick={() => setCount(Math.max(1, count - 1))}
                className="w-14 h-14 rounded-full bg-white/[0.06] text-white text-2xl flex items-center justify-center active:bg-white/10 border border-white/[0.08]"
              >−</button>
              <div className="text-center w-16">
                <span className="font-heading text-[3.5rem] text-accent leading-none block">{count}</span>
                <span className="text-[0.55rem] text-dim/30 uppercase tracking-wider">kişi</span>
              </div>
              <button
                onClick={() => setCount(Math.min(10, count + 1))}
                className="w-14 h-14 rounded-full bg-white/[0.06] text-white text-2xl flex items-center justify-center active:bg-white/10 border border-white/[0.08]"
              >+</button>
            </div>

            {/* Optional name */}
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="İsminiz (opsiyonel)"
              className="w-full px-4 py-3 rounded-md bg-white/[0.03] border border-white/[0.06] text-white text-[0.82rem] placeholder:text-white/[0.12] focus:outline-none focus:border-accent/30 mb-4"
            />

            <button
              onClick={submit}
              className="w-full py-4 rounded-md bg-accent text-white font-bold text-[0.95rem] active:scale-[0.98] transition-transform"
            >
              Katılımı Onayla
            </button>

            <button
              onClick={() => setStatus('idle')}
              className="w-full py-2 mt-2 text-[0.7rem] text-dim/30 text-center"
            >
              Geri
            </button>
          </div>
        )}

        {/* Loading */}
        {status === 'loading' && (
          <div className="rounded-xl p-10 flex items-center justify-center" style={{ background: '#1c1c1c' }}>
            <div className="w-7 h-7 border-2 border-accent/20 border-t-accent rounded-full animate-spin" />
          </div>
        )}

        {/* Done */}
        {status === 'done' && (
          <div className="rounded-xl p-8 text-center" style={{ background: '#1c1c1c', animation: 'fadeInUp 0.4s ease' }}>
            <span className="text-[2.5rem] block mb-3">🎉</span>
            <h3 className="font-heading text-[1.3rem] tracking-[0.06em] text-white mb-1.5">Teşekkürler!</h3>
            <p className="text-[0.75rem] text-dim/40 leading-relaxed">
              {count} kişilik katılımınız kaydedildi.<br />Görüşmek üzere!
            </p>
          </div>
        )}

        {/* Declined */}
        {status === 'no' && (
          <div className="rounded-xl p-8 text-center" style={{ background: '#1c1c1c', animation: 'fadeInUp 0.4s ease' }}>
            <p className="text-[0.85rem] text-dim/40 mb-3">Çok üzgünüz, sizi çok özleyeceğiz 😔</p>
            <button onClick={() => setStatus('idle')} className="text-[0.72rem] text-accent">
              Fikrinizi değiştirdiniz mi?
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
