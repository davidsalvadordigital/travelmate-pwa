import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const destinations = [
  { name: 'París, Francia', image: 'https://placehold.co/600x400.png', dataAiHint: 'Paris TorreEiffel', href: '/destinations/paris' },
  { name: 'Roma, Italia', image: 'https://placehold.co/600x400.png', dataAiHint: 'Roma Coliseo', href: '/destinations/rome' },
  { name: 'Kioto, Japón', image: 'https://placehold.co/600x400.png', dataAiHint: 'Kioto Templo', href: '/destinations/kyoto' },
  { name: 'Nueva York, EE.UU.', image: 'https://placehold.co/600x400.png', dataAiHint: 'NuevaYork Skyline', href: '/destinations/new-york' },
];

export function PopularDestinations() {
  return (
    <section>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-foreground">Principales Destinos</h2>
        <Button variant="link" asChild className="text-primary hover:text-primary/80">
          <Link href="/destinations">
            Ver Todos <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {destinations.map((dest) => (
          <Card key={dest.name} className="overflow-hidden hover:shadow-xl transition-shadow duration-300 group border-0 bg-muted"> {/* Fondo de sección gris claro para la tarjeta, sin bordes */}
            <CardHeader className="p-0 relative h-60 sm:h-72"> {/* Aumentar altura para imagen más grande */}
              <Image
                src={dest.image}
                alt={`Imagen de ${dest.name}`}
                layout="fill"
                objectFit="cover"
                className="group-hover:scale-105 transition-transform duration-300"
                data-ai-hint={dest.dataAiHint}
              />
              {/* Nombre del destino superpuesto en la parte inferior */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 via-black/40 to-transparent">
                <CardTitle className="text-xl text-white font-bold">{dest.name}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-4 bg-card hidden"> {/* Contenido original oculto para estilo Civitatis, podría eliminarse */}
              <Button variant="outline" asChild className="w-full mt-2">
                <Link href={dest.href}>Explorar Actividades</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
       <div className="text-center mt-8">
        <Button variant="outline" asChild className="border-primary text-primary hover:bg-primary/5">
          <Link href="/destinations">
            Ver más destinos
          </Link>
        </Button>
      </div>
    </section>
  );
}
