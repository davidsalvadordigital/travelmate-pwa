
import { HeroSection } from '@/components/home/hero-section';
import { PopularDestinations } from '@/components/home/popular-destinations';
import { ActivityTypes } from '@/components/home/activity-types'; // Este se convertirá en "Actividades Destacadas"
import { UspSection } from '@/components/home/usp-section';

export default function HomePage() {
  return (
    <div className="space-y-12 md:space-y-16">
      <HeroSection />
      
      <section className="py-10 bg-muted rounded-xl">
        <div className="container mx-auto px-4">
          <PopularDestinations />
        </div>
      </section>
      
      {/* TODO: La sección "Actividades destacadas" reemplazará o modificará ActivityTypes */}
      <section className="py-10">
         <div className="container mx-auto px-4">
            <ActivityTypes /> {/* Temporalmente, se cambiará por Actividades Destacadas */}
         </div>
      </section>

      <UspSection />
    </div>
  );
}
