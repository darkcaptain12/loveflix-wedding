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
  const [submitted, setSubmitted] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);

  const openModal = () => {
    setOpen(true);
    setStatus('choose');
    requestAnimationFrame(() => {
      gsap.fromTo(backdropRef.current, { opacity: 0 }, { opacity: 1, duration: 0.25 });
      gsap.fromTo(modalRef.current, { y: '100%' }, { y: '0%', duration: 0.35, ease: 'power3.out' });
    });
  };

  const closeModal = () => {
    gsap.to(modalRef.current, { y: '100%', duration: 0.25, ease: 'power2.in' });
    gsap.to(backdropRef.current, { opacity: 0, duration: 0.25, onComplete: () => setOpen(false) });
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

  useEffect(() => {
    if (status === 'done') {
      setTimeout(() => { setSubmitted(true); closeModal(); }, 2200);
    }
  }, [status]);

  if (submitted) return null;

  return (
    <>
      {/* Bottom bar with notch + FAB */}
      {!open && (
        <div className="fixed bottom-0 left-0 right-0 z-[100]" style={{ maxWidth: 430, margin: '0 auto' }}>
          {/* Bottom bar background */}
          <div className="relative">
            {/* The bar */}
            <div className="h-[52px] flex items-center justify-between px-5" style={{ background: '#1a1a1a', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
              <div className="flex items-center gap-1.5">
                <span className="text-[0.55rem] text-dim/30 uppercase tracking-wider">29.08.2026</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-[0.55rem] text-dim/30 uppercase tracking-wider">Bursa</span>
              </div>
            </div>

            {/* FAB — notched circle */}
            <button
              onClick={openModal}
              className="absolute -top-7 left-1/2 -translate-x-1/2 w-[60px] h-[60px] rounded-full bg-accent flex items-center justify-center active:scale-90 transition-transform z-10"
              style={{
                boxShadow: '0 4px 20px rgba(229,9,20,0.5), 0 0 0 5px #1a1a1a',
              }}
            >
              <span className="text-white text-2xl font-light">+</span>
            </button>

            {/* Notch cutout SVG behind FAB */}
            <svg
              className="absolute -top-[20px] left-1/2 -translate-x-1/2 pointer-events-none"
              width="100" height="20" viewBox="0 0 100 20" fill="#1a1a1a"
            >
              <path d="M0,20 L30,20 C30,20 35,20 38,15 C41,8 44,0 50,0 C56,0 59,8 62,15 C65,20 70,20 70,20 L100,20 Z" />
            </svg>
          </div>
        </div>
      )}

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 z-[200]">
          <div ref={backdropRef} className="absolute inset-0 bg-black/70" onClick={closeModal} />
          <div
            ref={modalRef}
            className="absolute bottom-0 left-0 right-0 rounded-t-2xl overflow-hidden"
            style={{ background: '#1c1c1c', maxHeight: '80vh', maxWidth: 430, margin: '0 auto', transform: 'translateY(100%)' }}
          >
            <div className="flex justify-center pt-3 pb-1">
              <div className="w-10 h-1 rounded-full bg-white/15" />
            </div>
            <button onClick={closeModal} className="absolute top-3 right-4 text-white/30 text-lg">✕</button>

            <div className="px-5 pb-8 pt-2">
              {status === 'choose' && (
                <div>
                  <div className="text-center mb-6">
                    <span className="text-[2.5rem] block mb-2">💌</span>
                    <h3 className="font-heading text-[1.5rem] tracking-[0.06em] text-white mb-1">Sizi Bekliyoruz</h3>
                    <p className="text-[0.72rem] text-dim/40">29 Ağustos 2026 · Atapark Salon Pırlanta</p>
                  </div>
                  <button onClick={() => setStatus('count')} className="w-full py-4 rounded-lg bg-accent text-white font-bold text-[1rem] mb-2.5 active:scale-[0.98] transition-transform">
                    ✓ Katılıyorum
                  </button>
                  <button onClick={() => setStatus('no')} className="w-full py-3.5 rounded-lg bg-white/[0.05] text-white/40 text-[0.88rem] active:scale-[0.98] transition-transform">
                    Katılamıyorum
                  </button>
                </div>
              )}

              {status === 'count' && (
                <div style={{ animation: 'fadeInUp 0.3s ease' }}>
                  <h3 className="font-heading text-[1.3rem] tracking-[0.06em] text-white text-center mb-6">Kaç Kişi Geleceksiniz?</h3>
                  <div className="flex items-center justify-center gap-6 mb-6">
                    <button onClick={() => setCount(Math.max(1, count - 1))} className="w-14 h-14 rounded-full bg-white/[0.06] text-white text-2xl flex items-center justify-center active:bg-white/10 border border-white/[0.08]">−</button>
                    <div className="text-center w-16">
                      <span className="font-heading text-[4rem] text-accent leading-none block">{count}</span>
                      <span className="text-[0.55rem] text-dim/25 uppercase tracking-wider">kişi</span>
                    </div>
                    <button onClick={() => setCount(Math.min(10, count + 1))} className="w-14 h-14 rounded-full bg-white/[0.06] text-white text-2xl flex items-center justify-center active:bg-white/10 border border-white/[0.08]">+</button>
                  </div>
                  <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="İsminiz (opsiyonel)"
                    className="w-full px-4 py-3 rounded-lg bg-white/[0.03] border border-white/[0.06] text-white text-[0.82rem] placeholder:text-white/[0.1] focus:outline-none focus:border-accent/30 mb-4" />
                  <button onClick={submit} className="w-full py-4 rounded-lg bg-accent text-white font-bold text-[1rem] active:scale-[0.98] transition-transform">Onayla</button>
                  <button onClick={() => setStatus('choose')} className="w-full py-2 mt-2 text-[0.7rem] text-dim/25 text-center">Geri</button>
                </div>
              )}

              {status === 'loading' && (
                <div className="py-12 flex justify-center">
                  <div className="w-8 h-8 border-2 border-accent/20 border-t-accent rounded-full animate-spin" />
                </div>
              )}

              {status === 'done' && (
                <div className="py-8 text-center" style={{ animation: 'fadeInUp 0.3s ease' }}>
                  <span className="text-[3rem] block mb-3">🎉</span>
                  <h3 className="font-heading text-[1.4rem] tracking-[0.06em] text-white mb-1">Teşekkürler!</h3>
                  <p className="text-[0.75rem] text-dim/40">{count} kişilik katılımınız kaydedildi</p>
                </div>
              )}

              {status === 'no' && (
                <div className="py-8 text-center" style={{ animation: 'fadeInUp 0.3s ease' }}>
                  <span className="text-[2rem] block mb-2">😔</span>
                  <p className="text-[0.85rem] text-dim/40 mb-3">Çok üzgünüz, sizi özleyeceğiz</p>
                  <button onClick={() => setStatus('choose')} className="text-[0.72rem] text-accent">Fikrinizi değiştirdiniz mi?</button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
