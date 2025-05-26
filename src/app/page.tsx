
import { HeroSection } from '@/components/home/hero-section';
import { PopularDestinations } from '@/components/home/popular-destinations';
import { FeaturedActivities } from '@/components/home/featured-activities';
import { ActivityTypes } from '@/components/home/activity-types';
import { UspSection } from '@/components/home/usp-section';

export default function HomePage() {
  return (
    <>
      <HeroSection /> {/* HeroSection ya es de ancho completo */}

      {/* Sección Principales Destinos: el fondo bg-muted se extiende a lo ancho, el contenido se centra con un container interno */}
      <section className="py-10 bg-muted mt-12 md:mt-16">
        <div className="container mx-auto px-4">
          <PopularDestinations />
        </div>
      </section>

      {/* Contenedor para el resto del contenido de la página de inicio que tendrá fondo blanco */}
      <div className="container mx-auto px-4">
        <section className="py-10 mt-12 md:mt-16">
          <FeaturedActivities />
        </section>

        <section className="py-10 mt-12 md:mt-16">
          <ActivityTypes />
        </section>
      </div>

      {/* Sección USP: el fondo bg-muted se extiende a lo ancho, el contenido se centra con un container interno */}
      <section className="mt-12 md:mt-16">
        <UspSection />
      </section>
    </>
  );
}
