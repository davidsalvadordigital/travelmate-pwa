import { ActivityCard } from '@/components/activities/activity-card';
import { Filters } from '@/components/activities/filters';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Frown } from 'lucide-react';


// Datos de ejemplo para actividades
const activities = [
  { id: '1', title: 'Experiencia Cumbre Torre Eiffel con Tour Guiado', duration: '2 horas', rating: 4.5, priceRange: '€50 - €70', image: 'https://placehold.co/600x400.png', dataAiHint: 'Torre Eiffel', destination: 'París' },
  { id: '2', title: 'Tour Coliseo y Foro Romano', duration: '3 horas', rating: 4.8, priceRange: '€60 - €90', image: 'https://placehold.co/600x400.png', dataAiHint: 'Coliseo Roma', destination: 'Roma' },
  { id: '3', title: 'Templos de Kioto y Jardines Zen', duration: 'Día completo', rating: 4.7, priceRange: '€100 - €150', image: 'https://placehold.co/600x400.png', dataAiHint: 'Templo Kioto', destination: 'Kioto' },
  { id: '4', title: 'Estatua de la Libertad e Isla Ellis', duration: '4 horas', rating: 4.6, priceRange: '€40 - €60', image: 'https://placehold.co/600x400.png', dataAiHint: 'Estatua Libertad', destination: 'Nueva York' },
  { id: '5', title: 'Crucero por el Río Sena', duration: '1 hora', rating: 4.3, priceRange: '€20 - €30', image: 'https://placehold.co/600x400.png', dataAiHint: 'Río Sena', destination: 'París' },
  { id: '6', title: 'Museos Vaticanos y Capilla Sixtina', duration: '3.5 horas', rating: 4.9, priceRange: '€70 - €100', image: 'https://placehold.co/600x400.png', dataAiHint: 'Museo Vaticano', destination: 'Roma' },
];

export default function ActivitiesPage({ searchParams }: { searchParams?: { destination?: string; type?: string } }) {
  const destination = searchParams?.destination || 'Todos los Destinos';
  const activityType = searchParams?.type;

  const filteredActivities = activities.filter(activity => {
    let matches = true;
    if (searchParams?.destination && activity.destination.toLowerCase() !== searchParams.destination.toLowerCase()) {
      matches = false;
    }
    // Ejemplo básico de filtrado por tipo (puede expandirse)
    if (activityType && !activity.title.toLowerCase().includes(activityType.replace(/s$/, ''))) { // Eliminación simple de plural
      // matches = false; // Esta lógica necesita ser más robusta basada en tipos de actividad reales
    }
    return matches;
  });

  // Capitalizar el nombre del destino y tipo de actividad para el título
  const displayDestination = destination.split(' ')
                               .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                               .join(' ');
  const displayActivityType = activityType ? activityType.charAt(0).toUpperCase() + activityType.slice(1) : '';


  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="mb-8 shadow-lg">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-primary">
            Actividades en {displayDestination}
            {displayActivityType && ` - ${displayActivityType}`}
          </CardTitle>
          <CardDescription>
            Explora y reserva experiencias increíbles para tu viaje.
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="flex flex-col md:flex-row gap-8">
        <aside className="w-full md:w-1/4 lg:w-1/5">
          <Filters />
        </aside>
        <main className="w-full md:w-3/4 lg:w-4/5">
          {filteredActivities.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
                <Button asChild>
                  <Link href="/destinations">Explorar Destinos</Link>
                </Button>
              </CardContent>
            </Card>
          )}
          {/* Aquí se podría añadir paginación */}
        </main>
      </div>
    </div>
  );
}
