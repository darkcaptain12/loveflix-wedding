'use client';

import { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger);

export default function TrailerSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.from('.trailer-card', {
        opacity: 0, y: 20, duration: 0.6,
        scrollTrigger: { trigger: ref.current, start: 'top 80%' },
      });
    }, ref.current);
    return () => ctx.revert();
  }, []);

  const handlePlay = () => {
    setPlaying(true);
    videoRef.current?.play();
  };

  const handleClose = () => {
    setPlaying(false);
    if (videoRef.current) { videoRef.current.pause(); videoRef.current.currentTime = 0; }
  };

  return (
    <>
      <section ref={ref} id="trailer" className="px-4 py-6" style={{ background: '#141414' }}>
        <h3 className="text-[1.1rem] font-bold text-white mb-3">Fragman</h3>

        <button onClick={handlePlay} className="trailer-card relative w-full aspect-video rounded-md overflow-hidden group">
          <div className="absolute inset-0 bg-cover bg-center bg-[#1c1c1c]"
            style={{ backgroundImage: 'url(/images/IMG_6224.jpeg)' }} />
          <div className="absolute inset-0 bg-black/30 group-active:bg-black/50 transition-colors" />
          {/* Centered play */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 rounded-full border-2 border-white/70 bg-black/40 flex items-center justify-center backdrop-blur-sm transition-transform group-active:scale-90">
              <svg className="w-5 h-5 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
            </div>
          </div>
          {/* Bottom label */}
          <div className="absolute bottom-0 inset-x-0 px-3 py-2" style={{ background: 'linear-gradient(transparent, rgba(0,0,0,0.7))' }}>
            <div className="flex items-center gap-1.5">
              <svg className="w-3 h-3 text-accent" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
              <span className="text-[0.65rem] text-white/70 font-medium">Fragmanı İzle</span>
            </div>
          </div>
        </button>

        <div className="section-divider mt-6" />
      </section>

      {playing && (
        <div className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center" onClick={handleClose}>
          <button onClick={handleClose}
            className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/50 flex items-center justify-center text-white border border-white/20">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <video ref={videoRef} className="w-full max-h-[80vh] rounded-lg" src="/videos/trailer.mp4"
            controls playsInline onClick={(e) => e.stopPropagation()} />
        </div>
      )}
    </>
  );
}
