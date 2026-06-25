'use client';

import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { PROFILES } from '@/constants';

interface Props {
  onSelect: (side: string) => void;
}

export default function ProfileSelect({ onSelect }: Props) {
  const [selected, setSelected] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardsRef.current || !containerRef.current) return;

    // Fade in the whole screen
    gsap.fromTo(containerRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.6 }
    );

    // Animate cards in
    const cards = cardsRef.current.children;
    gsap.fromTo(cards,
      { opacity: 0, y: 40, scale: 0.85 },
      { opacity: 1, y: 0, scale: 1, stagger: 0.12, duration: 0.7, delay: 0.3, ease: 'back.out(1.4)' }
    );
  }, []);

  const handleSelect = (id: string) => {
    if (selected) return;
    setSelected(id);

    // Animate selected card
    const cards = cardsRef.current?.children;
    if (cards) {
      Array.from(cards).forEach((card, i) => {
        const profileId = PROFILES[i].id;
        if (profileId === id) {
          gsap.to(card, { scale: 1.15, duration: 0.3, ease: 'power2.out' });
        } else {
          gsap.to(card, { opacity: 0.2, scale: 0.9, duration: 0.3 });
        }
      });
    }

    setTimeout(() => onSelect(id), 800);
  };

  return (
    <div ref={containerRef} className="min-h-[100svh] flex flex-col items-center justify-center px-6" style={{ background: '#141414' }}>
      {/* LOVEFLIX logo */}
      <div className="mb-12">
        <span className="font-heading text-accent text-3xl tracking-[0.15em]">LOVEFLIX</span>
      </div>

      <h2 className="text-[1.4rem] font-medium text-white mb-2">Kim İzliyor?</h2>
      <p className="text-[0.72rem] text-dim/40 mb-10">Profilinizi seçin</p>

      <div ref={cardsRef} className="grid grid-cols-2 gap-x-8 gap-y-6 mb-10">
        {PROFILES.map((p) => (
          <button
            key={p.id}
            onClick={() => handleSelect(p.id)}
            className="flex flex-col items-center gap-2 group"
          >
            <div
              className={`w-20 h-20 rounded-md flex items-center justify-center transition-all duration-200 ${
                selected === p.id ? 'ring-[3px] ring-white' : 'ring-0'
              }`}
              style={{ background: p.color }}
            >
              <span className="text-[2rem]">{p.icon}</span>
            </div>
            <span className={`text-[0.7rem] transition-colors ${
              selected === p.id ? 'text-white' : 'text-dim/50 group-hover:text-white'
            }`}>
              {p.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
