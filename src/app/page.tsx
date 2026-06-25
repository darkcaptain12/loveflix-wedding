'use client';

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

export default function Home() {
  return (
    <>
      <div className="film-grain" />
      <main className="relative" style={{ background: '#141414' }}>
        <CurtainHero />
        <ProfileSelect />
        <NavBar />
        <MovieHero />
        <Episodes />
        <TrailerSection />
        <SeasonFinale />
        <RsvpSection />
        <WeddingEvents />
        <Gallery />
        <Footer />
      </main>
    </>
  );
}
