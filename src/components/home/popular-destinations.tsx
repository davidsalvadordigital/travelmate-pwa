
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardHeader, CardTitle } from '@/components/ui/card'; // CardContent y Button ya no se usan directamente aquí
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const destinations = [
  { name: 'Roma', image: 'https://placehold.co/600x400.png', dataAiHint: 'Roma coliseo', href: '/activities?destination=Roma' },
  { name: 'París', image: 'https://placehold.co/600x400.png', dataAiHint: 'París torre eiffel', href: '/activities?destination=París' },
  { name: 'Madrid', image: 'https://placehold.co/600x400.png', dataAiHint: 'Madrid ciudad', href: '/activities?destination=Madrid' },
  { name: 'Barcelona', image: 'https://placehold.co/600x400.png', dataAiHint: 'Barcelona sagrada familia', href: '/activities?destination=Barcelona' },
  { name: 'Nueva York', image: 'https://placehold.co/600x400.png', dataAiHint: 'Nueva York estatua libertad', href: '/activities?destination=Nueva%20York' },
  { name: 'Florencia', image: 'https://placehold.co/600x400.png', dataAiHint: 'Florencia catedral', href: '/activities?destination=Florencia' },
];

export function PopularDestinations() {
  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-foreground">Principales destinos</h2>
        {/* Este botón se moverá abajo de la sección de tarjetas */}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-4"> {/* Ajustado a 3 columnas en md para que quepan 6 */}
        {destinations.map((dest) => (
          <Link key={dest.name} href={dest.href} legacyBehavior>
            <a className="block group">
              <Card className="overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 border-0 bg-card rounded-lg">
                <CardHeader className="p-0 relative h-48 sm:h-60 md:h-72">
                  <Image
                    src={dest.image}
                    alt={`Imagen de ${dest.name}`}
                    layout="fill"
                    objectFit="cover"
                    className="group-hover:scale-105 transition-transform duration-300"
                    data-ai-hint={dest.dataAiHint}
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 via-black/50 to-transparent">
                    <CardTitle className="text-lg md:text-xl text-white font-bold group-hover:underline">{dest.name}</CardTitle>
                  </div>
                </CardHeader>
                {/* No CardContent visible como en Civitatis */}
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
