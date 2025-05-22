import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { CalendarDays, Users, Star, MapPin, ListChecks, Info, ChevronLeft, ChevronRight } from 'lucide-react';
import { ImageGallery } from '@/components/activity-detail/image-gallery';
import { BookingSection } from '@/components/activity-detail/booking-section';
import { DetailTabs } from '@/components/activity-detail/detail-tabs';
import type { Activity } from '@/components/activities/activity-card'; // Reutilizar tipo

// Datos de ejemplo para una actividad
const mockActivity: Activity & {
  description: string;
  images: { src: string, alt: string, dataAiHint: string }[];
  inclusions: string[];
  exclusions: string[];
  meetingPoint: string;
  reviews: { user: string, rating: number, comment: string, date: string }[];
} = {
  id: '1',
  title: 'Experiencia Cumbre Torre Eiffel con Tour Guiado',
  duration: '2 horas',
  rating: 4.5,
  priceRange: '€65', // Precio específico para la página de detalle
  image: 'https://placehold.co/1200x800.png', // Imagen principal para la tarjeta, si se usara
  dataAiHint: 'Torre Eiffel vista',
  destination: 'París, Francia',
  description: 'Asciende a la cumbre de la icónica Torre Eiffel para disfrutar de impresionantes vistas panorámicas de París. Esta experiencia incluye un tour guiado que ofrece fascinantes conocimientos sobre la historia y arquitectura de este monumento mundialmente famoso. El acceso sin colas te asegura aprovechar al máximo tu tiempo.',
  images: [
    { src: 'https://placehold.co/1200x800.png', alt: 'Vista de la Torre Eiffel desde la cumbre', dataAiHint: 'ciudad paris' },
    { src: 'https://placehold.co/1200x800.png', alt: 'Detalle estructura Torre Eiffel', dataAiHint: 'arquitectura Torre Eiffel' },
    { src: 'https://placehold.co/1200x800.png', alt: 'Grupo de turistas en la Torre Eiffel', dataAiHint: 'turistas paris' },
  ],
  inclusions: ['Ticket de acceso a la cumbre de la Torre Eiffel', 'Guía profesional', 'Tour en grupo pequeño', 'Acceso sin colas'],
  exclusions: ['Recogida y regreso al hotel', 'Propinas', 'Comida y bebidas'],
  meetingPoint: 'Encuentra a tu guía en la base de la Torre Eiffel, cerca del Pilar Norte. Busca el letrero de "Travely".',
  reviews: [
    { user: 'Ana B.', rating: 5, comment: '¡Vistas absolutamente impresionantes y nuestro guía fue fantástico!', date: '2024-07-15' },
    { user: 'Juan D.', rating: 4, comment: 'Gran experiencia, aunque un poco concurrido en la cima.', date: '2024-07-10' },
    { user: 'Laura M.', rating: 4.5, comment: 'Vale la pena. El guía nos contó muchas anécdotas.', date: '2024-07-05' },
  ],
};


export default function ActivityDetailPage({ params }: { params: { id: string } }) {
  // En una aplicación real, se obtendrían los datos de la actividad según params.id
  const activity = mockActivity; 

  if (!activity) {
    return <p>Actividad no encontrada.</p>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="mb-6 shadow-lg overflow-hidden rounded-lg"> {/* Asegurar bordes redondeados */}
        <ImageGallery images={activity.images} />
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card className="shadow-md rounded-lg">
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-primary">{activity.title}</CardTitle>
              <CardDescription className="text-md text-muted-foreground flex items-center gap-4 pt-2 flex-wrap">
                <span className="flex items-center"><MapPin className="h-4 w-4 mr-1" /> {activity.destination}</span>
                <span className="flex items-center"><Star className="h-4 w-4 mr-1 text-yellow-400 fill-yellow-400" /> {activity.rating.toFixed(1)} ({activity.reviews.length} opiniones)</span>
                <span className="flex items-center"><CalendarDays className="h-4 w-4 mr-1" /> Duración: {activity.duration}</span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* La descripción principal ahora está en la pestaña */}
            </CardContent>
          </Card>
          
          <DetailTabs activity={activity} />
        </div>

        <div className="lg:col-span-1">
          <BookingSection activity={activity} />
        </div>
      </div>
    </div>
  );
}
