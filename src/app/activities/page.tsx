
'use client';

import { useState, useMemo, useCallback } from 'react';
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
const tomorrow = new Date(today);
tomorrow.setDate(today.getDate() + 1);
const dayAfterTomorrow = new Date(today);
dayAfterTomorrow.setDate(today.getDate() + 2);

const formatDate = (date: Date): string => format(date, 'yyyy-MM-dd');

const allActivities: Activity[] = [
  { id: '1', title: 'Paseo en barco por el Sena', duration: '1 hora', rating: 8.8, opinions: 10815, price: 19.25, currency: 'US$', image: 'https://placehold.co/600x400.png', dataAiHint: 'paseo barco sena', destination: 'París', freeCancellation: true, language: 'Español', isFree: false, originalPrice: 24.00, category: 'Visitas guiadas', availableDates: [formatDate(today), formatDate(tomorrow), formatDate(dayAfterTomorrow), '2024-09-15', '2024-09-16'] },
  { id: '2', title: 'Entrada a la 3ª planta de la Torre Eiffel', duration: '2-3h', rating: 8.3, opinions: 1513, price: 112.13, currency: 'US$', image: 'https://placehold.co/600x400.png', dataAiHint: 'Torre Eiffel alto', destination: 'París', freeCancellation: true, language: 'Español y otros idiomas', isFree: false, category: 'Entradas', availableDates: [formatDate(tomorrow), formatDate(dayAfterTomorrow), '2024-09-17'] },
  { id: '3', title: 'Visita guiada por el Museo del Louvre', duration: '2-3h', rating: 8.8, opinions: 4779, price: 90.61, currency: 'US$', image: 'https://placehold.co/600x400.png', dataAiHint: 'Louvre Mona Lisa', destination: 'París', freeCancellation: true, language: 'Español', isFree: false, category: 'Visitas guiadas', availableDates: [formatDate(today), '2024-09-15', '2024-09-18'] },
  { id: '4', title: 'Free tour por París ¡Gratis!', duration: '2.5h', rating: 9.6, opinions: 12539, price: 0, currency: 'US$', image: 'https://placehold.co/600x400.png', dataAiHint: 'París monumental', destination: 'París', freeCancellation: true, language: 'Español', isFree: true, category: 'Visitas guiadas', availableDates: [formatDate(today), formatDate(tomorrow)] },
  { id: '5', title: 'Excursión al Palacio de Versalles', duration: '4h', rating: 7.3, opinions: 1914, price: 96.28, currency: 'US$', image: 'https://placehold.co/600x400.png', dataAiHint: 'Palacio Versalles jardines', destination: 'París', freeCancellation: true, language: 'Español', isFree: false, category: 'Excursiones', availableDates: [formatDate(dayAfterTomorrow), '2024-09-20'] },
  { id: '6', title: 'Traslados en París', duration: 'Variable', rating: 9.4, opinions: 20363, price: 57.76, currency: 'US$', image: 'https://placehold.co/600x400.png', dataAiHint: 'coche ciudad', destination: 'París', freeCancellation: false, language: 'No aplica', isFree: false, category: 'Traslados', availableDates: [formatDate(today), formatDate(tomorrow), formatDate(dayAfterTomorrow)] }, // Traslados suelen ser más flexibles
  { id: '7', title: 'Cata de Vinos Franceses en Le Marais', duration: '2 horas', rating: 9.2, opinions: 320, price: 75.00, currency: 'US$', image: 'https://placehold.co/600x400.png', dataAiHint: 'vino copas', destination: 'París', freeCancellation: true, language: 'Español, Inglés', isFree: false, category: 'Gastronomía', availableDates: ['2024-09-10', '2024-09-17', '2024-09-24'] },
  { id: '8', title: 'Espectáculo Moulin Rouge con Cena', duration: '4 horas', rating: 8.9, opinions: 1250, price: 180.00, currency: 'US$', image: 'https://placehold.co/600x400.png', dataAiHint: 'Moulin Rouge', destination: 'París', freeCancellation: false, language: 'Internacional', isFree: false, category: 'Espectáculos', availableDates: [formatDate(tomorrow), '2024-09-12', '2024-09-19'] },
];

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
  heroImage: "https://placehold.co/1600x500.png", // Imagen de ejemplo más genérica para la cabecera
  dataAiHint: "ciudad paris"
};

const initialFilterState: FilterState = {
  startTime: [0, 24],
  priceRange: [0, 600],
  durationRange: [1, 11],
  selectedCategories: [],
  selectedFeatures: [],
};

const categoryIdToNameMapping: { [key: string]: string } = {
  'visitas-guiadas': 'Visitas guiadas',
  'entradas': 'Entradas',
  'excursiones': 'Excursiones',
  'gastronomia': 'Gastronomía',
  'espectaculos': 'Espectáculos',
};

// Función para normalizar cadenas (quitar acentos y convertir a minúsculas)
const normalizeString = (str: string) => {
  if (!str) return "";
  return str
    .normalize("NFD") // Descomponer caracteres acentuados
    .replace(/[\u0300-\u036f]/g, "") // Eliminar marcas diacríticas
    .toLowerCase();
};


export default function ActivitiesPage() {
  const searchParams = useSearchParams();
  const destinationParam = searchParams.get('destination');
  const typeParam = searchParams.get('type');

  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

  const [appliedFilters, setAppliedFilters] = useState<FilterState>(() => {
    const initialState = { ...initialFilterState };
    if (typeParam && categoryIdToNameMapping[typeParam]) {
      initialState.selectedCategories = [typeParam];
    }
    return initialState;
  });

  const currentDestinationName = destinationParam || destinationDetails.name;
  const currentDestination = { ...destinationDetails, name: currentDestinationName };

  const handleFilterChange = useCallback((newFilters: FilterState) => {
    setAppliedFilters(newFilters);
  }, []);

  const filteredActivities = useMemo(() => {
    return allActivities.filter(activity => {
      let matches = true;

      // Filtrar por destino (insensible a acentos y mayúsculas/minúsculas)
      if (destinationParam && normalizeString(activity.destination) !== normalizeString(destinationParam)) {
        matches = false;
      }

      // Filtrar por precio
      if (activity.isFree && appliedFilters.priceRange[0] > 0) {
        matches = false;
      } else if (!activity.isFree && (activity.price < appliedFilters.priceRange[0] || activity.price > appliedFilters.priceRange[1])) {
        matches = false;
      }

      // Filtrar por categorías
      if (appliedFilters.selectedCategories.length > 0) {
        const activityCategoryName = activity.category;
        const selectedCategoryNames = appliedFilters.selectedCategories.map(id => categoryIdToNameMapping[id]).filter(Boolean);
        if (!selectedCategoryNames.includes(activityCategoryName)) {
          matches = false;
        }
      }

      // Filtrar por características
      if (appliedFilters.selectedFeatures.includes('freeCancellation') && !activity.freeCancellation) {
        matches = false;
      }
      // Para "Solo actividades en español", buscamos la subcadena "español" (insensible a mayúsculas)
      if (appliedFilters.selectedFeatures.includes('spanishOnly') && !activity.language.toLowerCase().includes('español')) {
        matches = false;
      }
      // Aquí se añadirían otros filtros de características si los datos lo permiten

      // Filtrar por fecha seleccionada
      if (selectedDate) {
        const formattedSelectedDate = format(selectedDate, 'yyyy-MM-dd');
        if (!activity.availableDates || !activity.availableDates.includes(formattedSelectedDate)) {
          matches = false;
        }
      }
      
      // Lógica para filtros de hora y duración (actualmente no implementada por falta de datos detallados)
      // const activityStartTime = ... // Extraer hora de inicio de la actividad
      // const activityDuration = ... // Extraer duración numérica de la actividad
      // if (activityStartTime < appliedFilters.startTime[0] || activityStartTime > appliedFilters.startTime[1]) matches = false;
      // if (activityDuration < appliedFilters.durationRange[0] || activityDuration > appliedFilters.durationRange[1]) matches = false;


      return matches;
    });
  }, [destinationParam, appliedFilters, selectedDate]);

  const handleSelectDate = (date: Date | undefined) => {
    setSelectedDate(date);
  };

  return (
    <div className="space-y-8">
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
        <div className="relative z-10 p-8 text-white space-y-6 container mx-auto px-4">
          <div className="text-sm">
            <Link href="/" className="hover:underline">Travely</Link> &gt;
            <Link href="/destinations" className="hover:underline"> Destinos</Link> &gt;
            {/* Ejemplo de migas de pan más detalladas, podrían ser dinámicas en una app real */}
            <Link href="/destinations?region=europa" className="hover:underline"> Europa</Link> &gt;
            <Link href="/destinations?country=francia" className="hover:underline"> Francia</Link> &gt;
            <span className="font-semibold"> {currentDestination.name}</span>
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
              <span>{destinationDetails.stats.activitiesCount} inscripciones y actividades</span>
            </div>
            <div className="flex items-center">
              <Users className="h-5 w-5 mr-2 text-primary-foreground/80" />
              <span>{destinationDetails.stats.travelersCount} viajeros ya lo han disfrutado</span>
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
              {filteredActivities.length} {filteredActivities.length === 1 ? 'excursión o actividad' : 'excursiones y actividades'} en {currentDestination.name}
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

