'use client';

import { useRef, useState } from 'react';

export default function TrailerSection() {
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlay = () => {
    setPlaying(true);
    videoRef.current?.play();
  };

  const handleClose = () => {
    setPlaying(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <>
      <section id="trailer" className="px-4 py-6" style={{ background: '#141414' }}>
        <h3 className="nf-section-title text-white px-0 mb-3">Fragman</h3>

        <button
          onClick={handlePlay}
          className="relative w-full aspect-video rounded-lg overflow-hidden group"
        >
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
            style={{ backgroundImage: 'url(/images/trailer-thumb.jpg)', backgroundColor: '#1a1a1a' }}
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/20 transition-transform group-hover:scale-110">
              <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
            </div>
          </div>
          <div className="absolute bottom-3 left-3">
            <span className="text-xs text-white/70">▶ Şimdi İzle</span>
          </div>
        </button>
      </section>

      {/* Fullscreen video overlay */}
      {playing && (
        <div
          className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center"
          onClick={handleClose}
        >
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/50 flex items-center justify-center text-white"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <video
            ref={videoRef}
            className="w-full max-h-[80vh] rounded-lg"
            src="/videos/trailer.mp4"
            controls
            playsInline
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}
