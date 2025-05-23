
'use client';

import { ActivityCard, type Activity } from '@/components/activities/activity-card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, Zap } from 'lucide-react'; // Zap para "Actividades Destacadas"

// Usamos los mismos datos de ejemplo que en activities/page.tsx por ahora
const featuredActivitiesData: Activity[] = [
  { id: '1', title: 'Paseo en barco por el Sena', duration: '1 hora', rating: 8.8, opinions: 10815, price: 19.25, currency: 'US$', image: 'https://placehold.co/600x400.png', dataAiHint: 'paseo barco sena', destination: 'París', freeCancellation: true, language: 'Español', isFree: false, originalPrice: 24.00 },
  { id: '4', title: 'Free tour por París ¡Gratis!', duration: '2.5h', rating: 9.6, opinions: 12539, price: 0, currency: 'US$', image: 'https://placehold.co/600x400.png', dataAiHint: 'París monumental', destination: 'París', freeCancellation: true, language: 'Español', isFree: true },
  { id: '3', title: 'Visita guiada por el Museo del Louvre', duration: '2-3h', rating: 8.8, opinions: 4779, price: 90.61, currency: 'US$', image: 'https://placehold.co/600x400.png', dataAiHint: 'Louvre Mona Lisa', destination: 'París', freeCancellation: true, language: 'Español', isFree: false },
  { id: '5', title: 'Excursión al Palacio de Versalles', duration: '4h', rating: 7.3, opinions: 1914, price: 96.28, currency: 'US$', image: 'https://placehold.co/600x400.png', dataAiHint: 'Palacio Versalles jardines', destination: 'París', freeCancellation: true, language: 'Español', isFree: false },
];


export function FeaturedActivities() {
  return (
    <section>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-foreground flex items-center">
          <Zap className="h-8 w-8 text-primary mr-3 transform -scale-x-100" /> {/* Icono de rayo invertido para simular "destacado" */}
          Actividades Destacadas
        </h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {featuredActivitiesData.slice(0,4).map((activity) => ( // Mostrar solo 4 para el home
          <ActivityCard key={activity.id} activity={activity} />
        ))}
      </div>
      <div className="text-center mt-10">
        <Button variant="outline" asChild className="border-primary text-primary hover:bg-primary/5 hover:text-primary px-6 py-3 text-base">
          <Link href="/activities">
            Ver todas las actividades <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </section>
  );
}
