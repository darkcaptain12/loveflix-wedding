'use client';

export default function Footer() {
  return (
    <footer className="py-8 px-4 text-center" style={{ background: '#0a0a0a' }}>
      <div className="flex items-center justify-center gap-2 mb-3">
        <span className="text-[0.7rem] text-muted tracking-wider">TEŞEKKÜRLER</span>
        <span className="font-heading text-accent text-base tracking-wider">L</span>
        <span className="text-[0.7rem] text-muted tracking-wider">EMİR & ELİF</span>
      </div>
      <p className="text-[0.6rem] text-muted/50">
        Made with ♥ — 2026
      </p>
    </footer>
  );
}
