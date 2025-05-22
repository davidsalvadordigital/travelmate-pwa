import { HeroSection } from '@/components/home/hero-section';
import { PopularDestinations } from '@/components/home/popular-destinations';
import { ActivityTypes } from '@/components/home/activity-types';
import { UspSection } from '@/components/home/usp-section';

export default function HomePage() {
  return (
    <div className="space-y-16">
      <HeroSection />
      <PopularDestinations />
      <ActivityTypes />
      <UspSection />
    </div>
  );
}
