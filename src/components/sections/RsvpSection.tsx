'use client';

import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PROFILES } from '@/constants';

if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger);

export default function RsvpSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [name, setName] = useState('');
  const [count, setCount] = useState(1);
  const [side, setSide] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.from('.rsvp-anim > *', {
        opacity: 0, y: 25, stagger: 0.1, duration: 0.6,
        scrollTrigger: { trigger: ref.current, start: 'top 75%' },
      });
    }, ref.current);
    return () => ctx.revert();
  }, []);

  const handleSubmit = async () => {
    if (!name.trim()) { setError('İsminizi girin'); return; }
    if (!side) { setError('Tarafınızı seçin'); return; }
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), count, side }),
      });
      if (!res.ok) throw new Error('Hata');
      setStep('success');
    } catch {
      setError('Bir hata oluştu, tekrar deneyin');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section ref={ref} id="rsvp" className="px-4 py-10" style={{ background: '#0d0d0d' }}>
      <div className="rsvp-anim">
        {/* Header */}
        <div className="mb-6">
          <span className="text-accent text-[0.7rem] font-bold tracking-[0.2em] uppercase block mb-1">
            Davetiye
          </span>
          <h2 className="font-heading text-[2rem] tracking-wider text-white leading-[0.95] mb-2">
            KATILIM ONAYI
          </h2>
          <p className="text-[0.8rem] text-dim leading-relaxed">
            Bu özel günümüzde sizi aramızda görmekten mutluluk duyarız. Lütfen katılım bilgilerinizi paylaşın.
          </p>
        </div>

        {step === 'success' ? (
          <div className="rounded-xl p-8 text-center" style={{ background: '#1a1a1a' }}>
            <span className="text-5xl block mb-4">🎉</span>
            <h3 className="font-heading text-2xl tracking-wider text-white mb-3">Teşekkürler!</h3>
            <p className="text-[0.85rem] text-dim leading-relaxed">
              Katılımınız kaydedildi.<br />Sizi aramızda görmek için sabırsızlanıyoruz!
            </p>
            <div className="mt-6 h-[1px] w-16 mx-auto bg-accent/30" />
            <p className="mt-4 text-[0.7rem] text-muted">29 Ağustos 2026</p>
          </div>
        ) : (
          <div className="rounded-xl overflow-hidden" style={{ background: '#1a1a1a' }}>
            {/* Side selection */}
            <div className="p-5 border-b border-white/5">
              <label className="text-[0.65rem] text-muted uppercase tracking-[0.15em] block mb-3">
                Hangi taraftansınız?
              </label>
              <div className="grid grid-cols-2 gap-2">
                {PROFILES.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setSide(p.id)}
                    className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
                      side === p.id
                        ? 'bg-accent/15 border-2 border-accent/60'
                        : 'bg-white/[0.03] border-2 border-transparent active:bg-white/[0.06]'
                    }`}
                  >
                    <span className="text-2xl">{p.icon}</span>
                    <span className={`text-[0.75rem] ${side === p.id ? 'text-white font-medium' : 'text-dim'}`}>
                      {p.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Name */}
            <div className="p-5 border-b border-white/5">
              <label className="text-[0.65rem] text-muted uppercase tracking-[0.15em] block mb-2">
                Adınız Soyadınız
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="İsminizi yazın..."
                className="w-full px-4 py-3.5 rounded-lg bg-white/[0.03] border border-white/10 text-white text-[0.9rem] placeholder:text-white/15 focus:outline-none focus:border-accent/40 transition-colors"
              />
            </div>

            {/* Count */}
            <div className="p-5 border-b border-white/5">
              <label className="text-[0.65rem] text-muted uppercase tracking-[0.15em] block mb-3">
                Kaç kişi katılacak?
              </label>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setCount(Math.max(1, count - 1))}
                  className="w-12 h-12 rounded-xl bg-white/[0.05] border border-white/10 text-white text-xl flex items-center justify-center active:bg-white/10 transition-colors"
                >−</button>
                <span className="font-heading text-4xl text-accent w-12 text-center">{count}</span>
                <button
                  onClick={() => setCount(Math.min(10, count + 1))}
                  className="w-12 h-12 rounded-xl bg-white/[0.05] border border-white/10 text-white text-xl flex items-center justify-center active:bg-white/10 transition-colors"
                >+</button>
                <span className="text-[0.75rem] text-muted ml-1">kişi katılacak</span>
              </div>
            </div>

            {/* Submit */}
            <div className="p-5">
              {error && (
                <p className="text-accent text-[0.8rem] mb-3 flex items-center gap-1.5">
                  <span>⚠️</span> {error}
                </p>
              )}
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full py-4 rounded-lg bg-accent text-white font-bold text-[0.95rem] transition-all active:scale-[0.98] disabled:opacity-50 hover:bg-accent-dark"
              >
                {loading ? 'Gönderiliyor...' : '🎬 Katılımı Onayla'}
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
