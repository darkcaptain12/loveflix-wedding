'use client';

import { useState } from 'react';
import { PROFILES } from '@/constants';

export default function RsvpSection() {
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [name, setName] = useState('');
  const [count, setCount] = useState(1);
  const [side, setSide] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

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
    <section id="rsvp" className="px-4 py-8" style={{ background: '#141414' }}>
      <h3 className="font-heading text-2xl tracking-wider text-white mb-1">Katılım Onayı</h3>
      <p className="text-[0.75rem] text-muted mb-5">Sizi aramızda görmekten mutluluk duyarız</p>

      {step === 'success' ? (
        <div className="rounded-xl p-6 text-center" style={{ background: '#1a1a1a' }}>
          <span className="text-4xl block mb-3">🎉</span>
          <h4 className="text-lg font-bold text-white mb-2">Teşekkürler!</h4>
          <p className="text-[0.8rem] text-dim">Katılımınız kaydedildi. Sizi aramızda görmek için sabırsızlanıyoruz!</p>
        </div>
      ) : (
        <div className="rounded-xl p-5" style={{ background: '#1a1a1a' }}>
          {/* Side selection */}
          <label className="text-[0.7rem] text-muted uppercase tracking-wider block mb-3">Kim Tarafından?</label>
          <div className="grid grid-cols-4 gap-2 mb-5">
            {PROFILES.map((p) => (
              <button
                key={p.id}
                onClick={() => setSide(p.id)}
                className={`flex flex-col items-center p-2.5 rounded-lg transition-all ${
                  side === p.id
                    ? 'bg-accent/20 border border-accent/50 scale-105'
                    : 'bg-white/5 border border-transparent hover:bg-white/10'
                }`}
              >
                <span className="text-xl mb-1">{p.icon}</span>
                <span className="text-[0.55rem] text-dim leading-tight text-center">{p.label}</span>
              </button>
            ))}
          </div>

          {/* Name */}
          <label className="text-[0.7rem] text-muted uppercase tracking-wider block mb-2">İsminiz</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Adınız Soyadınız"
            className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white text-[0.85rem] placeholder:text-white/20 focus:outline-none focus:border-accent/50 mb-4"
          />

          {/* Count */}
          <label className="text-[0.7rem] text-muted uppercase tracking-wider block mb-2">Kişi Sayısı</label>
          <div className="flex items-center gap-3 mb-5">
            <button
              onClick={() => setCount(Math.max(1, count - 1))}
              className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 text-white text-lg flex items-center justify-center hover:bg-white/10"
            >−</button>
            <span className="text-xl font-bold text-white w-8 text-center">{count}</span>
            <button
              onClick={() => setCount(Math.min(10, count + 1))}
              className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 text-white text-lg flex items-center justify-center hover:bg-white/10"
            >+</button>
            <span className="text-[0.7rem] text-muted">kişi katılacak</span>
          </div>

          {error && <p className="text-accent text-[0.75rem] mb-3">{error}</p>}

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="nf-btn nf-btn-accent w-full py-3 justify-center rounded-lg text-[0.9rem] font-bold disabled:opacity-50"
          >
            {loading ? 'Gönderiliyor...' : 'Katılımı Onayla'}
          </button>
        </div>
      )}
    </section>
  );
}
