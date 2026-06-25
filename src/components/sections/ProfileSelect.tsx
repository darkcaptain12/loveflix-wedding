'use client';

import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { PROFILES } from '@/constants';

interface Props {
  onSelect: (id: string) => void;
}

export default function ProfileSelect({ onSelect }: Props) {
  const [selected, setSelected] = useState<string | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardsRef.current) return;
    const cards = cardsRef.current.children;
    gsap.fromTo(cards,
      { opacity: 0, y: 30, scale: 0.9 },
      { opacity: 1, y: 0, scale: 1, stagger: 0.12, duration: 0.6, delay: 0.3, ease: 'power2.out' }
    );
  }, []);

  const handleSelect = (id: string) => {
    setSelected(id);
    setTimeout(() => {
      gsap.to(sectionRef.current, {
        opacity: 0, y: -20, duration: 0.5,
        onComplete: () => onSelect(id),
      });
    }, 400);
  };

  return (
    <section ref={sectionRef} className="min-h-[100svh] flex flex-col items-center justify-center px-4" style={{ background: '#141414' }}>
      <span className="font-heading text-accent text-2xl tracking-wider mb-10">LOVEFLIX</span>

      <h2 className="text-xl font-medium text-white mb-8">Kim Katılıyor?</h2>

      <div ref={cardsRef} className="flex justify-center gap-4 mb-8">
        {PROFILES.map((p) => (
          <button
            key={p.id}
            onClick={() => handleSelect(p.id)}
            className={`flex flex-col items-center w-[72px] transition-transform active:scale-95 ${
              selected === p.id ? 'scale-110' : ''
            }`}
          >
            <div
              className={`w-[72px] h-[72px] rounded-lg flex items-center justify-center mb-1.5 transition-all ${
                selected === p.id ? 'ring-2 ring-white shadow-lg shadow-accent/30' : ''
              }`}
              style={{ background: p.color }}
            >
              <span className="text-[1.8rem]">{p.icon}</span>
            </div>
            <span className="text-[0.6rem] text-dim leading-tight text-center">{p.label}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
