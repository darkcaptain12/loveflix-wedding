'use client';

import { useState, useCallback } from 'react';
import CurtainHero from '@/components/sections/CurtainHero';
import ProfileSelect from '@/components/sections/ProfileSelect';
import NavBar from '@/components/sections/NavBar';
import MovieHero from '@/components/sections/MovieHero';
import Episodes from '@/components/sections/Episodes';
import TrailerSection from '@/components/sections/TrailerSection';
import SeasonFinale from '@/components/sections/SeasonFinale';
import RsvpSection from '@/components/sections/RsvpSection';
import WeddingEvents from '@/components/sections/WeddingEvents';
import Gallery from '@/components/sections/Gallery';
import Footer from '@/components/sections/Footer';

type Phase = 'hero' | 'profile' | 'main';

export default function Home() {
  const [phase, setPhase] = useState<Phase>('hero');

  const handleScroll = useCallback(() => {
    if (phase === 'hero') setPhase('profile');
  }, [phase]);

  const handleProfileSelect = useCallback(() => {
    setPhase('main');
  }, []);

  return (
    <>
      <div className="film-grain" />

      <main className="relative min-h-screen" style={{ background: '#141414' }}>
        {phase === 'hero' && (
          <div onClick={handleScroll} onTouchStart={handleScroll}>
            <CurtainHero />
          </div>
        )}

        {phase === 'profile' && (
          <ProfileSelect onSelect={handleProfileSelect} />
        )}

        {phase === 'main' && (
          <>
            <NavBar />
            <MovieHero />
            <Episodes />
            <TrailerSection />
            <SeasonFinale />
            <RsvpSection />
            <WeddingEvents />
            <Gallery />
            <Footer />
          </>
        )}
      </main>
    </>
  );
}
