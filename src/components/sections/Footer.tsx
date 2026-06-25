'use client';

export default function Footer() {
  return (
    <footer className="py-10 px-4 text-center" style={{ background: '#0a0a0a' }}>
      <div className="flex items-center justify-center gap-1 mb-4">
        <span className="font-heading text-accent text-3xl tracking-[0.1em]">LOVEFLIX</span>
      </div>
      <div className="flex items-center justify-center gap-2 mb-3">
        <span className="text-[0.65rem] text-dim/30 tracking-wider uppercase">Teşekkürler</span>
      </div>
      <p className="font-heading text-white/60 text-lg tracking-[0.15em]">
        EMİR & ELİF
      </p>
      <p className="text-[0.5rem] text-dim/20 mt-4 tracking-wider">
        29 AĞUSTOS 2026 · BURSA
      </p>
    </footer>
  );
}
