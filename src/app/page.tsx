
import { HeroSection } from '@/components/home/hero-section';
import { PopularDestinations } from '@/components/home/popular-destinations';
import { FeaturedActivities } from '@/components/home/featured-activities'; // Cambiado de ActivityTypes
import { UspSection } from '@/components/home/usp-section';

export default function HomePage() {
  return (
    <>
      <HeroSection /> {/* HeroSection ahora es de ancho completo */}
      
      {/* Contenedor para el resto del contenido de la página de inicio */}
      <div className="container mx-auto px-4">
        <section className="py-10 bg-muted rounded-xl mt-12 md:mt-16"> {/* Añadido margen superior para separar del Hero */}
          <PopularDestinations />
        </section>
        
        <section className="py-10 mt-12 md:mt-16">
          <FeaturedActivities /> {/* Reemplazado ActivityTypes */}
        </section>

        <div className="mt-12 md:mt-16"> {/* UspSection ya tiene su propio padding y bg, solo necesita margen */}
          <UspSection />
        </div>
      </div>
    </>
  );
}
