
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const destinations = [
  { name: 'Roma', country: 'Italia', image: 'https://placehold.co/600x400.png', dataAiHint: 'Roma coliseo', href: '/activities?destination=Roma' },
  { name: 'París', country: 'Francia', image: 'https://placehold.co/600x400.png', dataAiHint: 'París torre eiffel', href: '/activities?destination=París' },
  { name: 'Madrid', country: 'España', image: 'https://placehold.co/600x400.png', dataAiHint: 'Madrid ciudad', href: '/activities?destination=Madrid' },
  { name: 'Barcelona', country: 'España', image: 'https://placehold.co/600x400.png', dataAiHint: 'Barcelona sagrada familia', href: '/activities?destination=Barcelona' },
  { name: 'Nueva York', country: 'Estados Unidos', image: 'https://placehold.co/600x400.png', dataAiHint: 'Nueva York estatua libertad', href: '/activities?destination=Nueva%20York' },
  { name: 'Florencia', country: 'Italia', image: 'https://placehold.co/600x400.png', dataAiHint: 'Florencia catedral', href: '/activities?destination=Florencia' },
  { name: 'Londres', country: 'Reino Unido', image: 'https://placehold.co/600x400.png', dataAiHint: 'Londres big ben', href: '/activities?destination=Londres' },
  { name: 'Ámsterdam', country: 'Países Bajos', image: 'https://placehold.co/600x400.png', dataAiHint: 'Ámsterdam canales', href: '/activities?destination=Ámsterdam' },
];

export function PopularDestinations() {
  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-foreground">Principales destinos</h2>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"> {/* Ajustado grid y gap */}
        {destinations.map((dest) => (
          <Link key={dest.name} href={dest.href} legacyBehavior>
            <a className="block group">
              <Card className="overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 border-0 bg-card rounded-lg">
                <CardHeader className="p-0 relative h-48 sm:h-56 md:h-64 lg:h-72"> {/* Alturas ajustadas */}
                  <Image
                    src={dest.image}
                    alt={`Imagen de ${dest.name}`}
                    fill
                    style={{ objectFit: 'cover' }}
                    className="group-hover:scale-105 transition-transform duration-300"
                    data-ai-hint={dest.dataAiHint}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent group-hover:from-black/80 transition-colors duration-300"></div> {/* Gradiente más pronunciado al hover */}
                  <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4"> {/* Padding ajustado */}
                    <CardTitle className="text-lg md:text-xl text-white font-bold group-hover:underline">{dest.name}</CardTitle>
                    <p className="text-sm text-neutral-200 mt-0.5 group-hover:underline">{dest.country}</p>
                  </div>
                </CardHeader>
              </Card>
            </a>
          </Link>
        ))}
      </div>
      <div className="text-center mt-10">
        <Button variant="outline" asChild className="border-primary text-primary hover:bg-primary/5 hover:text-primary px-6 py-3 text-base">
          <Link href="/destinations">
            Ver más destinos <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </>
  );
}
