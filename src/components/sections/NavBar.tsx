'use client';

import { NAV_ITEMS } from '@/constants';

export default function NavBar() {
  return (
    <nav
      className="sticky top-0 z-50 flex items-center gap-0 px-3 py-2.5 w-full overflow-hidden"
      style={{ background: 'linear-gradient(180deg, rgba(20,20,20,0.98) 0%, rgba(20,20,20,0.9) 100%)', backdropFilter: 'blur(12px)' }}
    >
      <span className="font-heading text-accent text-[1.1rem] tracking-[0.1em] flex-shrink-0 mr-3">
        LOVEFLIX
      </span>
      <div className="flex items-center gap-0 overflow-x-auto flex-1 min-w-0" style={{ scrollbarWidth: 'none' }}>
        {NAV_ITEMS.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="text-[0.65rem] text-dim/70 active:text-white transition-colors whitespace-nowrap flex-shrink-0 px-2 py-1"
          >
            {item.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
