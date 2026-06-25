'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import gsap from 'gsap';
import CurtainHero from '@/components/sections/CurtainHero';
import ProfileSelect from '@/components/sections/ProfileSelect';
// NavBar removed — Netflix mobile has no top nav
import MovieHero from '@/components/sections/MovieHero';
import Episodes from '@/components/sections/Episodes';
import TrailerSection from '@/components/sections/TrailerSection';
import SeasonFinale from '@/components/sections/SeasonFinale';
import RsvpSection from '@/components/sections/RsvpSection';
import WeddingEvents from '@/components/sections/WeddingEvents';
import Gallery from '@/components/sections/Gallery';
import Footer from '@/components/sections/Footer';

type Phase = 'intro' | 'profiles' | 'main';

export default function Home() {
  const [phase, setPhase] = useState<Phase>('intro');
  const [profileSide, setProfileSide] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio('/audio/nouveau-jingle-netflix.mp3');
    audioRef.current.volume = 0.4;
  }, []);

  const goToProfiles = useCallback(() => {
    // Play Netflix sound
    audioRef.current?.play().catch(() => {});

    // Animate out
    gsap.to('.intro-screen', {
      opacity: 0,
      scale: 1.05,
      duration: 0.8,
      ease: 'power2.in',
      onComplete: () => setPhase('profiles'),
    });
  }, []);

  const goToMain = useCallback((side: string) => {
    setProfileSide(side);

    gsap.to('.profiles-screen', {
      opacity: 0,
      scale: 0.95,
      duration: 0.6,
      ease: 'power2.in',
      onComplete: () => {
        setPhase('main');
        // Animate main content in
        requestAnimationFrame(() => {
          gsap.fromTo('.main-screen',
            { opacity: 0 },
            { opacity: 1, duration: 0.8, ease: 'power2.out' }
          );
        });
      },
    });
  }, []);

  useEffect(() => {
    if (phase === 'main') {
      document.body.style.overflow = 'auto';
    } else {
      document.body.style.overflow = 'hidden';
    }
    return () => { document.body.style.overflow = 'auto'; };
  }, [phase]);

  return (
    <>
      <div className="film-grain" />

      <main ref={containerRef} className="relative" style={{ background: '#141414' }}>
        {/* Phase 1: Intro */}
        {phase === 'intro' && (
          <div className="intro-screen">
            <CurtainHero onEnter={goToProfiles} />
          </div>
        )}

        {/* Phase 2: Profile selection */}
        {phase === 'profiles' && (
          <div className="profiles-screen">
            <ProfileSelect onSelect={goToMain} />
          </div>
        )}

        {/* Phase 3: Main content */}
        {phase === 'main' && (
          <div className="main-screen">
            <MovieHero />
            <Episodes />
            <TrailerSection />
            <SeasonFinale />
            <RsvpSection side={profileSide} />
            <WeddingEvents />
            <Gallery />
            <Footer />
          </div>
        )}
      </main>
    </>
  );
}
