'use client';

import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

interface Props {
  side: string;
}

export default function RsvpSection({ side }: Props) {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<'choose' | 'count' | 'loading' | 'done' | 'no'>('choose');
  const [name, setName] = useState('');
  const [count, setCount] = useState(1);
  const modalRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);

  const openModal = () => {
    setOpen(true);
    setStatus('choose');
    requestAnimationFrame(() => {
      gsap.fromTo(backdropRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3 });
      gsap.fromTo(modalRef.current, { y: '100%' }, { y: '0%', duration: 0.4, ease: 'power3.out' });
    });
  };

  const closeModal = () => {
    gsap.to(modalRef.current, { y: '100%', duration: 0.3, ease: 'power2.in' });
    gsap.to(backdropRef.current, { opacity: 0, duration: 0.3, onComplete: () => setOpen(false) });
  };

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

  // Hide button when done
  const [submitted, setSubmitted] = useState(false);
  useEffect(() => {
    if (status === 'done') {
      setTimeout(() => { setSubmitted(true); closeModal(); }, 2000);
    }
  }, [status]);

  if (submitted) return null;

  return (
    <>
      {/* Floating button */}
      {!open && (
        <button
          onClick={openModal}
          className="fixed bottom-5 left-1/2 -translate-x-1/2 z-[100] px-6 py-3.5 rounded-full bg-accent text-white font-bold text-[0.88rem] shadow-[0_4px_20px_rgba(229,9,20,0.4)] active:scale-95 transition-transform flex items-center gap-2"
        >
          <span className="text-base">💌</span>
          Katılım Onayı
        </button>
      )}

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 z-[200]">
          {/* Backdrop */}
          <div
            ref={backdropRef}
            className="absolute inset-0 bg-black/70"
            onClick={closeModal}
          />

          {/* Bottom sheet */}
          <div
            ref={modalRef}
            className="absolute bottom-0 left-0 right-0 rounded-t-2xl overflow-hidden"
            style={{ background: '#1c1c1c', maxHeight: '85vh', transform: 'translateY(100%)' }}
          >
            {/* Handle bar */}
            <div className="flex justify-center pt-3 pb-1">
              <div className="w-10 h-1 rounded-full bg-white/15" />
            </div>

            {/* Close */}
            <button onClick={closeModal} className="absolute top-3 right-4 text-white/30 text-lg">✕</button>

            <div className="px-5 pb-8 pt-2">
              {/* Choose */}
              {status === 'choose' && (
                <div>
                  <div className="text-center mb-6">
                    <span className="text-[2.5rem] block mb-2">💌</span>
                    <h3 className="font-heading text-[1.5rem] tracking-[0.06em] text-white mb-1">Sizi Bekliyoruz</h3>
                    <p className="text-[0.72rem] text-dim/40">29 Ağustos 2026 · Atapark Salon Pırlanta</p>
                  </div>

                  <button
                    onClick={() => setStatus('count')}
                    className="w-full py-4 rounded-lg bg-accent text-white font-bold text-[1rem] mb-2.5 active:scale-[0.98] transition-transform"
                  >
                    ✓ Katılıyorum
                  </button>
                  <button
                    onClick={() => setStatus('no')}
                    className="w-full py-3.5 rounded-lg bg-white/[0.05] text-white/40 text-[0.88rem] active:scale-[0.98] transition-transform"
                  >
                    Katılamıyorum
                  </button>
                </div>
              )}

              {/* Count */}
              {status === 'count' && (
                <div style={{ animation: 'fadeInUp 0.3s ease' }}>
                  <h3 className="font-heading text-[1.3rem] tracking-[0.06em] text-white text-center mb-6">
                    Kaç Kişi Geleceksiniz?
                  </h3>

                  <div className="flex items-center justify-center gap-6 mb-6">
                    <button
                      onClick={() => setCount(Math.max(1, count - 1))}
                      className="w-14 h-14 rounded-full bg-white/[0.06] text-white text-2xl flex items-center justify-center active:bg-white/10 border border-white/[0.08]"
                    >−</button>
                    <div className="text-center w-16">
                      <span className="font-heading text-[4rem] text-accent leading-none block">{count}</span>
                      <span className="text-[0.55rem] text-dim/25 uppercase tracking-wider">kişi</span>
                    </div>
                    <button
                      onClick={() => setCount(Math.min(10, count + 1))}
                      className="w-14 h-14 rounded-full bg-white/[0.06] text-white text-2xl flex items-center justify-center active:bg-white/10 border border-white/[0.08]"
                    >+</button>
                  </div>

                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="İsminiz (opsiyonel)"
                    className="w-full px-4 py-3 rounded-lg bg-white/[0.03] border border-white/[0.06] text-white text-[0.82rem] placeholder:text-white/[0.1] focus:outline-none focus:border-accent/30 mb-4"
                  />

                  <button
                    onClick={submit}
                    className="w-full py-4 rounded-lg bg-accent text-white font-bold text-[1rem] active:scale-[0.98] transition-transform"
                  >
                    Onayla
                  </button>

                  <button onClick={() => setStatus('choose')} className="w-full py-2 mt-2 text-[0.7rem] text-dim/25 text-center">
                    Geri
                  </button>
                </div>
              )}

              {/* Loading */}
              {status === 'loading' && (
                <div className="py-12 flex justify-center">
                  <div className="w-8 h-8 border-2 border-accent/20 border-t-accent rounded-full animate-spin" />
                </div>
              )}

              {/* Done */}
              {status === 'done' && (
                <div className="py-8 text-center" style={{ animation: 'fadeInUp 0.3s ease' }}>
                  <span className="text-[3rem] block mb-3">🎉</span>
                  <h3 className="font-heading text-[1.4rem] tracking-[0.06em] text-white mb-1">Teşekkürler!</h3>
                  <p className="text-[0.75rem] text-dim/40">{count} kişilik katılımınız kaydedildi</p>
                </div>
              )}

              {/* No */}
              {status === 'no' && (
                <div className="py-8 text-center" style={{ animation: 'fadeInUp 0.3s ease' }}>
                  <span className="text-[2rem] block mb-2">😔</span>
                  <p className="text-[0.85rem] text-dim/40 mb-3">Çok üzgünüz, sizi özleyeceğiz</p>
                  <button onClick={() => setStatus('choose')} className="text-[0.72rem] text-accent">
                    Fikrinizi değiştirdiniz mi?
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
