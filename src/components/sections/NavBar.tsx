'use client';

import { NAV_ITEMS } from '@/constants';

export default function NavBar() {
  return (
    <nav className="sticky top-0 z-50 flex items-center gap-4 px-4 py-3 overflow-x-auto" style={{ background: 'rgba(20,20,20,0.95)', backdropFilter: 'blur(10px)' }}>
      <span className="font-heading text-accent text-lg tracking-wider flex-shrink-0 mr-2">
        LOVEFLIX
      </span>
      {NAV_ITEMS.map((item) => (
        <a
          key={item.href}
          href={item.href}
          className="text-[0.72rem] text-dim hover:text-white transition-colors whitespace-nowrap flex-shrink-0"
        >
          {item.label}
        </a>
      ))}
      <div className="ml-auto flex items-center gap-3 flex-shrink-0">
        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <span className="text-accent text-lg">♥</span>
      </div>
    </nav>
  );
}
