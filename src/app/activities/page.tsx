
'use client';

import { useState, useMemo, useCallback, useEffect } from 'react';
import { ActivityCard, type Activity } from '@/components/activities/activity-card';
import { Filters, type FilterState } from '@/components/activities/filters';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import Link from 'next/link';
import { Frown, MapPin, CalendarDays, Star, MessageSquare, Users, ListFilter, LayoutGrid, CalendarPlus, CalendarIcon } from 'lucide-react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

const today = new Date();
today.setHours(0, 0, 0, 0); // Normalizar a medianoche para comparaciones de fecha consistentes

const tomorrow = new Date(today);
tomorrow.setDate(today.getDate() + 1);

const dayAfterTomorrow = new Date(today);
dayAfterTomorrow.setDate(today.getDate() + 2);

const formatDate = (date: Date): string => format(date, 'yyyy-MM-dd');

// Datos de ejemplo - Asegúrate que la interfaz Activity tiene 'category', 'availableDates', 'startTimeNumeric', 'durationHoursNumeric'
const allActivities: Activity[] = [
  { id: '1', title: 'Paseo en barco por el Sena', duration: '1 hora', rating: 8.8, opinions: 10815, price: 19.25, currency: 'US$', image: 'https://placehold.co/600x400.png', dataAiHint: 'paseo barco sena', destination: 'París', freeCancellation: true, language: 'Español', isFree: false, originalPrice: 24.00, category: 'Visitas guiadas', availableDates: [formatDate(today), formatDate(tomorrow), formatDate(dayAfterTomorrow), '2024-09-15', '2024-09-16'], startTimeNumeric: 14, durationHoursNumeric: 1 },
  { id: '2', title: 'Entrada a la 3ª planta de la Torre Eiffel', duration: '2-3h', rating: 8.3, opinions: 1513, price: 112.13, currency: 'US$', image: 'https://placehold.co/600x400.png', dataAiHint: 'Torre Eiffel alto', destination: 'París', freeCancellation: true, language: 'Español y otros idiomas', isFree: false, category: 'Entradas', availableDates: [formatDate(tomorrow), formatDate(dayAfterTomorrow), '2024-09-17'], startTimeNumeric: 10, durationHoursNumeric: 3 },
  { id: '3', title: 'Visita guiada por el Museo del Louvre', duration: '2-3h', rating: 8.8, opinions: 4779, price: 90.61, currency: 'US$', image: 'https://placehold.co/600x400.png', dataAiHint: 'Louvre Mona Lisa', destination: 'París', freeCancellation: true, language: 'Español', isFree: false, category: 'Visitas guiadas', availableDates: [formatDate(today), '2024-09-15', '2024-09-18'], startTimeNumeric: 11, durationHoursNumeric: 2.5 },
  { id: '4', title: 'Free tour por París ¡Gratis!', duration: '2.5h', rating: 9.6, opinions: 12539, price: 0, currency: 'US$', image: 'https://placehold.co/600x400.png', dataAiHint: 'París monumental', destination: 'París', freeCancellation: true, language: 'Español', isFree: true, category: 'Visitas guiadas', availableDates: [formatDate(today), formatDate(tomorrow)], startTimeNumeric: 9, durationHoursNumeric: 2.5 },
  { id: '5', title: 'Excursión al Palacio de Versalles', duration: '4h', rating: 7.3, opinions: 1914, price: 96.28, currency: 'US$', image: 'https://placehold.co/600x400.png', dataAiHint: 'Palacio Versalles jardines', destination: 'París', freeCancellation: true, language: 'Español', isFree: false, category: 'Excursiones', availableDates: [formatDate(dayAfterTomorrow), '2024-09-20'], startTimeNumeric: 8, durationHoursNumeric: 4 },
  { id: '6', title: 'Traslados en París', duration: 'Variable', rating: 9.4, opinions: 20363, price: 57.76, currency: 'US$', image: 'https://placehold.co/600x400.png', dataAiHint: 'coche ciudad', destination: 'París', freeCancellation: false, language: 'No aplica', isFree: false, category: 'Traslados', availableDates: [formatDate(today), formatDate(tomorrow), formatDate(dayAfterTomorrow)] },
  { id: '7', title: 'Cata de Vinos Franceses en Le Marais', duration: '2 horas', rating: 9.2, opinions: 320, price: 75.00, currency: 'US$', image: 'https://placehold.co/600x400.png', dataAiHint: 'vino copas', destination: 'París', freeCancellation: true, language: 'Español, Inglés', isFree: false, category: 'Gastronomía', availableDates: ['2024-09-10', '2024-09-17', '2024-09-24'], startTimeNumeric: 18, durationHoursNumeric: 2 },
  { id: '8', title: 'Espectáculo Moulin Rouge con Cena', duration: '4 horas', rating: 8.9, opinions: 1250, price: 180.00, currency: 'US$', image: 'https://placehold.co/600x400.png', dataAiHint: 'Moulin Rouge', destination: 'París', freeCancellation: false, language: 'Internacional', isFree: false, category: 'Espectáculos', availableDates: [formatDate(tomorrow), '2024-09-12', '2024-09-19'], startTimeNumeric: 20, durationHoursNumeric: 4 },
  { id: '9', title: 'Tour Nocturno por París Iluminado', duration: '3 horas', rating: 9.0, opinions: 650, price: 45.00, currency: 'US$', image: 'https://placehold.co/600x400.png', dataAiHint: 'parís noche', destination: 'París', freeCancellation: true, language: 'Español', isFree: false, category: 'Visitas guiadas', availableDates: [formatDate(today), formatDate(tomorrow), '2024-09-21'], startTimeNumeric: 21, durationHoursNumeric: 3 },
  { id: '10', title: 'Clase de Cocina Francesa', duration: '3.5 horas', rating: 9.5, opinions: 180, price: 95.00, currency: 'US$', image: 'https://placehold.co/600x400.png', dataAiHint: 'cocina clase', destination: 'París', freeCancellation: true, language: 'Español, Francés', isFree: false, category: 'Gastronomía', availableDates: ['2024-09-11', '2024-09-18', '2024-09-25'], startTimeNumeric: 10, durationHoursNumeric: 3.5 },
  { id: '11', title: 'Excursión de 2 días a Normandía y Playas del Desembarco', duration: '2 días', rating: 8.5, opinions: 450, price: 250.00, currency: 'US$', image: 'https://placehold.co/600x400.png', dataAiHint: 'normandía playas', destination: 'París', freeCancellation: true, language: 'Español', isFree: false, category: 'Excursiones', availableDates: ['2024-10-01', '2024-10-15'], startTimeNumeric: 7, durationHoursNumeric: 48 },
  { id: '12', title: 'Visita al Vaticano y Capilla Sixtina', duration: '3 horas', rating: 9.3, opinions: 7500, price: 60.00, currency: 'US$', image: 'https://placehold.co/600x400.png', dataAiHint: 'vaticano capilla sixtina', destination: 'Roma', freeCancellation: true, language: 'Español', isFree: false, category: 'Entradas', availableDates: [formatDate(today), formatDate(tomorrow)], startTimeNumeric: 9, durationHoursNumeric: 3 },
  { id: '13', title: 'Tour por el Coliseo y Foro Romano', duration: '3 horas', rating: 9.0, opinions: 6200, price: 55.00, currency: 'US$', image: 'https://placehold.co/600x400.png', dataAiHint: 'coliseo roma', destination: 'Roma', freeCancellation: true, language: 'Español', isFree: false, category: 'Visitas guiadas', availableDates: [formatDate(today), formatDate(dayAfterTomorrow)], startTimeNumeric: 10, durationHoursNumeric: 3 },
];

const destinationDetails = {
  name: "París", // Nombre por defecto si no hay parámetro
  country: "Francia",
  region: "Región de París Isla de Francia",
  stats: {
    activitiesCount: allActivities.length, 
    travelersCount: "4.2M",
    reviewsCount: 167363,
    rating: 9.1,
  },
  heroImage: "https://placehold.co/1600x500.png",
  dataAiHint: "ciudad paris"
};

const initialFilterState: FilterState = {
  startTime: [0, 24],
  priceRange: [0, 600],
  durationRange: [0, 10],
  selectedCategories: [],
  selectedFeatures: [],
};

const categoryIdToNameMapping: { [key: string]: string } = {
  'visitas-guiadas': 'Visitas guiadas',
  'entradas': 'Entradas',
  'excursiones': 'Excursiones',
  'gastronomia': 'Gastronomía',
  'espectaculos': 'Espectáculos',
  'traslados': 'Traslados',
};

const normalizeString = (str: string) => {
  if (!str) return "";
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
};

export default function ActivitiesPage() {
  const searchParamsHook = useSearchParams();
  const destinationParam = searchParamsHook.get('destination');
  const typeParam = searchParamsHook.get('type');
  const queryParam = searchParamsHook.get('q'); // Para búsqueda genérica

  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [appliedFilters, setAppliedFilters] = useState<FilterState>(() => {
    const initialState = { ...initialFilterState };
    if (typeParam && categoryIdToNameMapping[typeParam]) {
      initialState.selectedCategories = [typeParam];
    }
    return initialState;
  });

  const currentDestinationName = destinationParam || (queryParam ? `Resultados para "${queryParam}"` : destinationDetails.name);
  
  const activitiesForDestination = useMemo(() => {
    if (destinationParam) {
      return allActivities.filter(act => normalizeString(act.destination) === normalizeString(destinationParam));
    }
    // Si no hay destinationParam pero sí queryParam, filtramos por queryParam inicialmente
    if (queryParam) {
      const normalizedQ = normalizeString(queryParam);
      return allActivities.filter(activity => 
        normalizeString(activity.title).includes(normalizedQ) ||
        normalizeString(activity.destination).includes(normalizedQ) ||
        (activity.category && normalizeString(activity.category).includes(normalizedQ))
      );
    }
    return allActivities; // Si no hay ni destination ni query, mostrar todas (o las de París por defecto)
  }, [destinationParam, queryParam]);


  const currentDestination = { 
    ...destinationDetails, 
    name: currentDestinationName, 
    stats: {
      ...destinationDetails.stats, 
      activitiesCount: activitiesForDestination.length 
    } 
  };

  const handleFilterChange = useCallback((newFilters: FilterState) => {
    setAppliedFilters(newFilters);
  }, []);

  const filteredActivities = useMemo(() => {
    let activitiesToFilter = activitiesForDestination;

    // Si hay un queryParam y no un destinationParam específico, la lista base ya está filtrada por queryParam.
    // Si hay un destinationParam, empezamos con las actividades de ese destino.
    // Si no hay ninguno, empezamos con todas las actividades.

    return activitiesToFilter.filter(activity => {
      // Si hay un queryParam y el filtro de destino no está activo, ya filtramos por q.
      // Si hay un destinationParam, ya filtramos por destino.
      // Si hay un queryParam Y un destinationParam, la lógica actual prioriza destinationParam
      // para la base, lo cual está bien.
      
      // Filtro por query general si no hay un destinationParam y sí un queryParam
      if (queryParam && !destinationParam) {
        const normalizedQ = normalizeString(queryParam);
        const matchesQuery = normalizeString(activity.title).includes(normalizedQ) ||
                             normalizeString(activity.destination).includes(normalizedQ) ||
                             (activity.category && normalizeString(activity.category).includes(normalizedQ));
        if (!matchesQuery) return false;
      }


      if (activity.isFree && appliedFilters.priceRange[0] > 0) {
        return false;
      }
      if (!activity.isFree && (activity.price < appliedFilters.priceRange[0] || activity.price > appliedFilters.priceRange[1])) {
        return false;
      }

      if (appliedFilters.selectedCategories.length > 0) {
        const activityCategoryName = activity.category;
        const selectedCategoryNames = appliedFilters.selectedCategories.map(id => categoryIdToNameMapping[id]).filter(Boolean);
        if (!selectedCategoryNames.includes(activityCategoryName)) {
          return false;
        }
      }

      if (appliedFilters.selectedFeatures.includes('freeCancellation') && !activity.freeCancellation) {
        return false;
      }
      if (appliedFilters.selectedFeatures.includes('spanishOnly') && !activity.language.toLowerCase().includes('español')) {
        return false;
      }
      
      if (selectedDate) {
        const formattedSelectedDate = format(selectedDate, 'yyyy-MM-dd');
        if (!activity.availableDates || !activity.availableDates.includes(formattedSelectedDate)) {
          return false;
        }
      }
      
      if (activity.startTimeNumeric !== undefined) {
        const [minStartTime, maxStartTime] = appliedFilters.startTime;
        if (!(minStartTime === 0 && maxStartTime === 24)) {
          if (activity.startTimeNumeric < minStartTime || activity.startTimeNumeric > maxStartTime) {
            return false;
          }
        }
      }

      if (activity.durationHoursNumeric !== undefined) {
        const [minDuration, maxDuration] = appliedFilters.durationRange;
        if (minDuration > 0) {
          if (maxDuration === 10) {
            if (activity.durationHoursNumeric < minDuration) return false;
          } else {
            if (activity.durationHoursNumeric < minDuration || activity.durationHoursNumeric > maxDuration) {
              return false;
            }
          }
        }
      }

      return true;
    });
  }, [activitiesForDestination, appliedFilters, selectedDate, queryParam, destinationParam]);

  const handleSelectDate = (date: Date | undefined) => {
    setSelectedDate(date);
  };

  return (
    <div className="space-y-0">
      <section className="relative rounded-b-lg overflow-hidden shadow-lg">
        <Image
          src={currentDestination.heroImage}
          alt={`Fondo de ${currentDestination.name}`}
          fill
          style={{objectFit:"cover"}}
          className="brightness-50"
          data-ai-hint={currentDestination.dataAiHint}
          priority
        />
        <div className="relative z-10 p-8 text-white space-y-6 container mx-auto px-4 py-8">
          <div className="text-sm">
            <Link href="/" className="hover:underline">Travely</Link> &gt;
            <Link href="/destinations" className="hover:underline"> Destinos</Link> &gt;
            <Link href="/destinations?region=europa" className="hover:underline"> Europa</Link> &gt;
            <Link href="/destinations?country=francia" className="hover:underline"> Francia</Link> &gt;
            <span className="font-semibold"> {destinationParam || (queryParam ? `Búsqueda: ${queryParam}` : destinationDetails.name)}</span>
          </div>
          <h1 className="text-5xl font-bold">{currentDestination.name}</h1>
          
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="secondary" size="lg" className="bg-white text-primary hover:bg-gray-100">
                <CalendarPlus className="mr-2 h-5 w-5" />
                {selectedDate ? format(selectedDate, "PPP", { locale: es }) : "Añade tus fechas"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={handleSelectDate}
                initialFocus
                locale={es}
                disabled={(date) => date < new Date(new Date().setDate(new Date().getDate() -1)) }
              />
            </PopoverContent>
          </Popover>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-4 pt-4 text-sm">
            <div className="flex items-center">
              <MapPin className="h-5 w-5 mr-2 text-primary-foreground/80" />
              <span>{filteredActivities.length} {filteredActivities.length === 1 ? 'actividad' : 'actividades'}</span>
            </div>
            <div className="flex items-center">
              <Users className="h-5 w-5 mr-2 text-primary-foreground/80" />
              <span>{currentDestination.stats.travelersCount} viajeros ya lo han disfrutado</span>
            </div>
            <div className="flex items-center">
              <MessageSquare className="h-5 w-5 mr-2 text-primary-foreground/80" />
              <span>{destinationDetails.stats.reviewsCount.toLocaleString('es-ES')} opiniones reales</span>
            </div>
            <div className="flex items-center">
              <Star className="h-5 w-5 mr-2 text-yellow-400 fill-yellow-400" />
              <span>{destinationDetails.stats.rating.toFixed(1)}/10 así nos puntúan</span>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8 space-y-8">
        <Card className="shadow-md">
          <CardContent className="p-4 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-semibold">Disponibilidad:</span>
              <Button variant="outline" size="sm" onClick={() => handleSelectDate(today)}>Hoy</Button>
              <Button variant="outline" size="sm" onClick={() => handleSelectDate(tomorrow)}>Mañana</Button>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="sm" className="text-primary border-primary hover:bg-primary/5">
                    <CalendarIcon className="mr-2 h-4 w-4"/>
                    {selectedDate ? format(selectedDate, "PPP", { locale: es }) : "Fechas"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={handleSelectDate}
                    initialFocus
                    locale={es}
                    disabled={(date) => date < new Date(new Date().setDate(new Date().getDate() -1)) }
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="text-muted-foreground">
              {filteredActivities.length} {filteredActivities.length === 1 ? 'excursión o actividad encontrada' : 'excursiones y actividades encontradas'}
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
            <Filters onFilterChange={handleFilterChange} />
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
                    Intenta ajustar tus filtros o selecciona otra fecha.
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
