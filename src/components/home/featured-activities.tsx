
'use client';

import { ActivityCard, type Activity } from '@/components/activities/activity-card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, Zap } from 'lucide-react';

// Datos de ejemplo ampliados para Actividades Destacadas
const featuredActivitiesData: Activity[] = [
  { id: '1', title: 'Paseo en barco por el Sena', duration: '1 hora', rating: 8.8, opinions: 10815, price: 19.25, currency: 'US$', image: 'https://placehold.co/600x400.png', dataAiHint: 'paseo barco sena', destination: 'París', freeCancellation: true, language: 'Español', isFree: false, originalPrice: 24.00, category: 'Visitas guiadas' },
  { id: '4', title: 'Free tour por París ¡Gratis!', duration: '2.5h', rating: 9.6, opinions: 12539, price: 0, currency: 'US$', image: 'https://placehold.co/600x400.png', dataAiHint: 'París monumental', destination: 'París', freeCancellation: true, language: 'Español', isFree: true, category: 'Visitas guiadas' },
  { id: '3', title: 'Visita guiada por el Museo del Louvre', duration: '2-3h', rating: 8.8, opinions: 4779, price: 90.61, currency: 'US$', image: 'https://placehold.co/600x400.png', dataAiHint: 'Louvre Mona Lisa', destination: 'París', freeCancellation: true, language: 'Español', isFree: false, category: 'Visitas guiadas' },
  { id: '5', title: 'Excursión al Palacio de Versalles', duration: '4h', rating: 7.3, opinions: 1914, price: 96.28, currency: 'US$', image: 'https://placehold.co/600x400.png', dataAiHint: 'Palacio Versalles jardines', destination: 'París', freeCancellation: true, language: 'Español', isFree: false, category: 'Excursiones' },
  { id: '2', title: 'Entrada a la 3ª planta de la Torre Eiffel', duration: '2-3h', rating: 8.3, opinions: 1513, price: 112.13, currency: 'US$', image: 'https://placehold.co/600x400.png', dataAiHint: 'Torre Eiffel alto', destination: 'París', freeCancellation: true, language: 'Español y otros idiomas', isFree: false, category: 'Entradas' },
  { id: '12', title: 'Visita al Vaticano y Capilla Sixtina', duration: '3 horas', rating: 9.3, opinions: 7500, price: 60.00, currency: 'US$', image: 'https://placehold.co/600x400.png', dataAiHint: 'vaticano capilla sixtina', destination: 'Roma', freeCancellation: true, language: 'Español', isFree: false, category: 'Entradas' },
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6"> {/* Ajustado xl:grid-cols-3 para 6 items */}
        {featuredActivitiesData.slice(0,6).map((activity) => ( // Mostrar 6 actividades
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
