import React from 'react';
import HeroSection from '../components/home/HeroSection';
import FeaturedEvents from '../components/home/FeaturedEvents';
import AtmosphereGallery from '../components/home/AtmosphereGallery';
import TestimonialsSection from '../components/home/TestimonialsSection';
import InstagramSection from '../components/home/InstagramSection';

export default function Home() {
  return (
    <div>
      <HeroSection />
      <FeaturedEvents />
      <AtmosphereGallery />
      <TestimonialsSection />
      <InstagramSection />
    </div>
  );
}