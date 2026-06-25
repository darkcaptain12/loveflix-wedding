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
  const [status, setStatus] = useState<'idle' | 'form' | 'loading' | 'done' | 'declined'>('idle');
  const [name, setName] = useState('');
  const [count, setCount] = useState(1);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.from('.rsvp-card', {
        opacity: 0, y: 30, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 80%' },
      });
    }, ref.current);
    return () => ctx.revert();
  }, []);

  const handleAccept = () => {
    gsap.to('.rsvp-buttons', { opacity: 0, y: -10, duration: 0.3, onComplete: () => setStatus('form') });
  };

  const handleDecline = () => {
    setStatus('declined');
  };

  const handleSubmit = async () => {
    setStatus('loading');
    try {
      await fetch('/api/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim() || 'Misafir', count, side: side || 'friends' }),
      });
      setStatus('done');
    } catch {
      setStatus('done');
    }
  };

  return (
    <section ref={ref} id="rsvp" className="px-4 py-10" style={{ background: '#141414' }}>
      <div className="rsvp-card rounded-xl overflow-hidden" style={{ background: '#1c1c1c', boxShadow: '0 4px 30px rgba(0,0,0,0.4)' }}>

        {/* Header — always visible */}
        <div className="relative px-5 pt-6 pb-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-1 h-5 bg-accent rounded-full" />
            <span className="text-accent text-[0.6rem] font-bold tracking-[0.2em] uppercase">Davet</span>
          </div>
          <h3 className="font-heading text-[1.6rem] tracking-[0.08em] text-white leading-none mb-1.5">
            Katılacak mısınız?
          </h3>
          <p className="text-[0.72rem] text-dim/50 leading-relaxed">
            29 Ağustos 2026 · Atapark Salon Pırlanta
          </p>
        </div>

        <div className="px-5 pb-6">
          {/* Initial state — Accept / Decline */}
          {status === 'idle' && (
            <div className="rsvp-buttons flex gap-2.5 mt-2">
              <button
                onClick={handleAccept}
                className="flex-1 py-3.5 rounded-md bg-accent text-white font-bold text-[0.88rem] transition-all active:scale-[0.97]"
              >
                ✓ Katılıyorum
              </button>
              <button
                onClick={handleDecline}
                className="flex-1 py-3.5 rounded-md bg-white/[0.06] border border-white/10 text-white/60 font-medium text-[0.88rem] transition-all active:scale-[0.97]"
              >
                ✕ Katılamıyorum
              </button>
            </div>
          )}

          {/* Form — after accepting */}
          {status === 'form' && (
            <div className="space-y-4 mt-2" style={{ animation: 'fadeInUp 0.4s ease' }}>
              {/* Person count */}
              <div>
                <label className="text-[0.6rem] text-dim/40 uppercase tracking-[0.15em] block mb-2.5">
                  Kaç kişi katılacak?
                </label>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setCount(Math.max(1, count - 1))}
                    className="w-11 h-11 rounded-lg bg-white/[0.04] border border-white/10 text-white text-lg flex items-center justify-center active:bg-white/10"
                  >−</button>
                  <div className="flex-1 text-center">
                    <span className="font-heading text-[2.5rem] text-accent leading-none">{count}</span>
                    <p className="text-[0.55rem] text-dim/30 mt-0.5">kişi</p>
                  </div>
                  <button
                    onClick={() => setCount(Math.min(10, count + 1))}
                    className="w-11 h-11 rounded-lg bg-white/[0.04] border border-white/10 text-white text-lg flex items-center justify-center active:bg-white/10"
                  >+</button>
                </div>
              </div>

              {/* Name — optional */}
              <div>
                <label className="text-[0.6rem] text-dim/40 uppercase tracking-[0.15em] block mb-2">
                  İsminiz <span className="text-dim/20">(opsiyonel)</span>
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="İsim girmek zorunda değilsiniz"
                  className="w-full px-3.5 py-3 rounded-md bg-white/[0.03] border border-white/[0.07] text-white text-[0.82rem] placeholder:text-white/10 focus:outline-none focus:border-accent/30"
                />
              </div>

              {/* Submit */}
              <button
                onClick={handleSubmit}
                className="w-full py-3.5 rounded-md bg-accent text-white font-bold text-[0.88rem] transition-all active:scale-[0.97]"
              >
                Onayla
              </button>
            </div>
          )}

          {/* Loading */}
          {status === 'loading' && (
            <div className="py-8 text-center" style={{ animation: 'fadeInUp 0.3s ease' }}>
              <div className="w-6 h-6 border-2 border-accent/30 border-t-accent rounded-full animate-spin mx-auto" />
            </div>
          )}

          {/* Success */}
          {status === 'done' && (
            <div className="py-6 text-center" style={{ animation: 'fadeInUp 0.4s ease' }}>
              <span className="text-3xl block mb-3">🎬</span>
              <p className="text-[0.88rem] text-white font-medium mb-1">Kaydedildi!</p>
              <p className="text-[0.7rem] text-dim/40">Sizi aramızda görmek için sabırsızlanıyoruz</p>
            </div>
          )}

          {/* Declined */}
          {status === 'declined' && (
            <div className="py-6 text-center" style={{ animation: 'fadeInUp 0.4s ease' }}>
              <p className="text-[0.85rem] text-dim/50 mb-2">Anlıyoruz, çok üzgünüz 😔</p>
              <button
                onClick={() => setStatus('idle')}
                className="text-[0.7rem] text-accent underline underline-offset-2"
              >
                Fikrinizi değiştirdiyseniz
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
