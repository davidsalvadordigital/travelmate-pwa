
'use client';

import { ActivityCard, type Activity } from '@/components/activities/activity-card';
import { Filters } from '@/components/activities/filters';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Frown, MapPin, CalendarDays, Star, MessageSquare, Users, ListFilter, LayoutGrid, CalendarPlus } from 'lucide-react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';

// Datos de ejemplo para actividades (actualizados con más campos)
const activities: Activity[] = [
  { id: '1', title: 'Paseo en barco por el Sena', duration: '1 hora', rating: 8.8, opinions: 10815, price: 19.25, currency: 'US$', image: 'https://placehold.co/600x400.png', dataAiHint: 'paseo barco sena', destination: 'París', freeCancellation: true, language: 'Español', isFree: false, originalPrice: 24.00 },
  { id: '2', title: 'Entrada a la 3ª planta de la Torre Eiffel', duration: '2-3h', rating: 8.3, opinions: 1513, price: 112.13, currency: 'US$', image: 'https://placehold.co/600x400.png', dataAiHint: 'Torre Eiffel alto', destination: 'París', freeCancellation: true, language: 'Español y otros idiomas', isFree: false },
  { id: '3', title: 'Visita guiada por el Museo del Louvre', duration: '2-3h', rating: 8.8, opinions: 4779, price: 90.61, currency: 'US$', image: 'https://placehold.co/600x400.png', dataAiHint: 'Louvre Mona Lisa', destination: 'París', freeCancellation: true, language: 'Español', isFree: false },
  { id: '4', title: 'Free tour por París ¡Gratis!', duration: '2.5h', rating: 9.6, opinions: 12539, price: 0, currency: 'US$', image: 'https://placehold.co/600x400.png', dataAiHint: 'París monumental', destination: 'París', freeCancellation: true, language: 'Español', isFree: true },
  { id: '5', title: 'Excursión al Palacio de Versalles', duration: '4h', rating: 7.3, opinions: 1914, price: 96.28, currency: 'US$', image: 'https://placehold.co/600x400.png', dataAiHint: 'Palacio Versalles jardines', destination: 'París', freeCancellation: true, language: 'Español', isFree: false },
  { id: '6', title: 'Traslados en París', duration: 'Variable', rating: 9.4, opinions: 20363, price: 57.76, currency: 'US$', image: 'https://placehold.co/600x400.png', dataAiHint: 'coche ciudad', destination: 'París', freeCancellation: false, language: 'No aplica', isFree: false },
];

// Simulación de datos para la cabecera del destino
const destinationDetails = {
  name: "París",
  country: "Francia",
  region: "Región de París Isla de Francia",
  stats: {
    activitiesCount: 120,
    travelersCount: "4.2M",
    reviewsCount: 167363,
    rating: 9.1,
  },
  heroImage: "https://placehold.co/1600x500.png",
  dataAiHint: "ciudad paris"
};


export default function ActivitiesPage() {
  const searchParams = useSearchParams();
  const destinationParam = searchParams.get('destination');

  const currentDestinationName = destinationParam || destinationDetails.name;
  const currentDestination = { ...destinationDetails, name: currentDestinationName };


  const filteredActivities = activities.filter(activity => {
    let matches = true;
    if (destinationParam && activity.destination.toLowerCase() !== destinationParam.toLowerCase()) {
      matches = false;
    }
    return matches;
  });

  return (
    <div className="space-y-8">
      {/* Cabecera del Destino Estilo Civitatis - Ancho Completo */}
      <section className="relative rounded-lg overflow-hidden shadow-lg">
        <Image
          src={currentDestination.heroImage}
          alt={`Fondo de ${currentDestination.name}`}
          fill
          objectFit="cover"
          className="brightness-50"
          data-ai-hint={currentDestination.dataAiHint}
          priority
        />
        <div className="relative z-10 p-8 text-white space-y-6 container mx-auto px-4">
          <div className="text-sm">
            <Link href="/" className="hover:underline">Travely</Link> &gt;
            <Link href="/destinations" className="hover:underline"> Destinos</Link> &gt;
            <span className="font-semibold"> {currentDestination.name}</span>
          </div>
          <h1 className="text-5xl font-bold">{currentDestination.name}</h1>

          <Button variant="secondary" size="lg" className="bg-white text-primary hover:bg-gray-100">
            <CalendarPlus className="mr-2 h-5 w-5" /> Añade tus fechas
          </Button>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-4 pt-4 text-sm">
            <div className="flex items-center">
              <MapPin className="h-5 w-5 mr-2 text-primary-foreground/80" />
              <span>{currentDestination.stats.activitiesCount} inscripciones y actividades</span>
            </div>
            <div className="flex items-center">
              <Users className="h-5 w-5 mr-2 text-primary-foreground/80" />
              <span>{currentDestination.stats.travelersCount} viajeros ya lo han disfrutado</span>
            </div>
            <div className="flex items-center">
              <MessageSquare className="h-5 w-5 mr-2 text-primary-foreground/80" />
              <span>{currentDestination.stats.reviewsCount.toLocaleString('es-ES')} opiniones reales</span>
            </div>
            <div className="flex items-center">
              <Star className="h-5 w-5 mr-2 text-yellow-400 fill-yellow-400" />
              <span>{currentDestination.stats.rating.toFixed(1)}/10 así nos puntúan</span>
            </div>
          </div>
        </div>
      </section>

      {/* Contenido Principal con Filtros y Tarjetas - Contenido */}
      <div className="container mx-auto px-4 py-8 space-y-8"> {/* Añadido py-8 aquí */}
        {/* Barra de Disponibilidad, Duración, Controles */}
        <Card className="shadow-md">
          <CardContent className="p-4 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-semibold">Disponibilidad:</span>
              <Button variant="outline" size="sm">Hoy</Button>
              <Button variant="outline" size="sm">Mañana</Button>
              <Button variant="outline" size="sm" className="text-primary border-primary hover:bg-primary/5">
                <CalendarDays className="mr-2 h-4 w-4"/>Fechas
              </Button>
            </div>
            <div className="text-muted-foreground">
              {filteredActivities.length} excursiones y actividades en {currentDestination.name}
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
                <LayoutGrid className="mr-2 h-4 w-4"/>Listado
              </Button>
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
                <ListFilter className="mr-2 h-4 w-4"/>Ordenar
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col md:flex-row gap-8">
          <aside className="w-full md:w-1/3 lg:w-1/4">
            <Filters />
          </aside>
          <main className="w-full md:w-2/3 lg:w-3/4">
            {filteredActivities.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredActivities.map((activity) => (
                  <ActivityCard key={activity.id} activity={activity} />
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="p-10 text-center">
                  <Frown className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <p className="text-xl font-semibold mb-2">No se encontraron actividades</p>
                  <p className="text-muted-foreground mb-4">
                    Intenta ajustar tus filtros o explora otros destinos.
                  </p>
                  <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
                    <Link href="/destinations">Explorar Destinos</Link>
                  </Button>
                </CardContent>
              </Card>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
