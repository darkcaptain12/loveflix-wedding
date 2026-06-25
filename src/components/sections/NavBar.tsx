'use client';

import { NAV_ITEMS } from '@/constants';

export default function NavBar() {
  return (
    <nav
      className="sticky top-0 z-50 flex items-center gap-3 px-3 py-3 w-full max-w-full overflow-hidden"
      style={{ background: 'rgba(20,20,20,0.95)', backdropFilter: 'blur(10px)' }}
    >
      <span className="font-heading text-accent text-base tracking-wider flex-shrink-0">
        L
      </span>
      <div className="flex items-center gap-3 overflow-x-auto flex-1 min-w-0" style={{ scrollbarWidth: 'none' }}>
        {NAV_ITEMS.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="text-[0.68rem] text-dim hover:text-white transition-colors whitespace-nowrap flex-shrink-0"
          >
            {item.label}
          </a>
        ))}
      </div>
      <span className="text-accent text-sm flex-shrink-0">♥</span>
    </nav>
  );
}
