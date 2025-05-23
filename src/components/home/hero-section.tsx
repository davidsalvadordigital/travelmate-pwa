
'use client';

import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ArrowRight, BadgeDollarSign, CheckCircle2, Search, SmilePlus, Users, MapPin as DestinationIcon, SearchIcon as ActivityIcon } from 'lucide-react';
import { useState, type FormEvent, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import type { Activity } from '@/components/activities/activity-card';
import { SearchSuggestions, type Suggestion, type DestinationSuggestion, type ActivitySuggestionItem } from './search-suggestions';
import { format } from 'date-fns';

const benefits = [
  { text: "Las mejores actividades", icon: CheckCircle2 },
  { text: "Atención al cliente 24/7", icon: SmilePlus },
  { text: "Millones de opiniones", icon: Users },
  { text: "Precios finales", icon: BadgeDollarSign },
];

// TEMPORAL: Copia de datos y función de normalización para prototipado
const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(today.getDate() + 1);
const dayAfterTomorrow = new Date(today);
dayAfterTomorrow.setDate(today.getDate() + 2);

const formatDate = (date: Date): string => format(date, 'yyyy-MM-dd');

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

const normalizeString = (str: string) => {
  if (!str) return "";
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
};
// FIN TEMPORAL

export function HeroSection() {
  const [searchInput, setSearchInput] = useState('');
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);
  const router = useRouter();
  const searchWrapperRef = useRef<HTMLDivElement>(null);
  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const fetchSuggestions = useCallback((query: string) => {
    if (query.trim() === '') {
      setSuggestions([]);
      setShowSuggestions(false);
      setLoadingSuggestions(false);
      return;
    }
    setLoadingSuggestions(true);

    const normalizedQuery = normalizeString(query);

    const destinationCounts: { [key: string]: number } = {};
    allActivities.forEach(activity => {
      if (normalizeString(activity.destination).includes(normalizedQuery)) {
        destinationCounts[activity.destination] = (destinationCounts[activity.destination] || 0) + 1;
      }
    });

    const destSuggestions: DestinationSuggestion[] = Object.entries(destinationCounts)
      .map(([name, count]) => ({
        type: 'destination' as const,
        name,
        activityCount: count,
        href: `/activities?destination=${encodeURIComponent(name)}`,
      }))
      .sort((a, b) => b.activityCount - a.activityCount)
      .slice(0, 5);

    const actSuggestions: ActivitySuggestionItem[] = allActivities
      .filter(activity => normalizeString(activity.title).includes(normalizedQuery))
      .map(activity => ({
        type: 'activity' as const,
        id: activity.id,
        title: activity.title,
        destination: activity.destination,
        href: `/activities/${activity.id}`,
      }))
      .slice(0, 5);

    const combinedSuggestions = [...destSuggestions, ...actSuggestions];
    setSuggestions(combinedSuggestions);
    setShowSuggestions(combinedSuggestions.length > 0 || query.trim().length > 0); // Show even if no suggestions to display "no results"
    setLoadingSuggestions(false);
  }, []);


  useEffect(() => {
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }
    if (searchInput.trim() !== '') {
      setLoadingSuggestions(true); // Show loading immediately
      debounceTimeoutRef.current = setTimeout(() => {
        fetchSuggestions(searchInput);
      }, 300); // 300ms debounce
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
      setLoadingSuggestions(false);
    }
    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, [searchInput, fetchSuggestions]);


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchInput(value);
     if (value.trim() !== '') {
      setShowSuggestions(true); // Keep suggestions open while typing
    } else {
      setShowSuggestions(false);
    }
  };
  
  const handleInputFocus = () => {
    if (searchInput.trim() !== '' && suggestions.length > 0) {
      setShowSuggestions(true);
    }
  };

  const handleSuggestionClick = useCallback(() => {
    setShowSuggestions(false);
    setSearchInput(''); 
  }, []);

  const handleSearchSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (searchInput.trim()) {
      router.push(`/activities?q=${encodeURIComponent(searchInput.trim())}`);
      setShowSuggestions(false);
      setSearchInput('');
    }
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchWrapperRef.current && !searchWrapperRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchWrapperRef]);

  return (
    <section className="relative h-[550px] md:h-[650px] overflow-hidden shadow-lg">
      <Image
        src="https://placehold.co/1600x900.png"
        alt="Impresionante destino de viaje con globos aerostáticos sobre templos antiguos al amanecer"
        fill
        style={{ objectFit: 'cover' }}
        quality={85}
        priority
        className="brightness-75"
        data-ai-hint="viaje aventura"
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 bg-black/40">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-4 shadow-text">
          LLENA TU VIAJE
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl shadow-text">
          Visitas guiadas y excursiones en español por todo el mundo.
        </p>
        
        <form
          onSubmit={handleSearchSubmit}
          className="w-full max-w-xl relative" // Added relative positioning
          ref={searchWrapperRef}
        >
          <div className="flex items-center gap-0 bg-white p-1.5 rounded-lg shadow-2xl">
            <Search className="text-muted-foreground ml-3 mr-2 h-5 w-5" />
            <Input
              type="search"
              placeholder="¿A dónde vas a viajar?"
              className="flex-grow border-none focus-visible:ring-0 focus-visible:ring-offset-0 text-base h-11"
              aria-label="Buscar destinos o actividades"
              value={searchInput}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              autoComplete="off"
            />
            <Button type="submit" size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-md px-6">
              Buscar <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
          {showSuggestions && (
            <SearchSuggestions
              suggestions={suggestions}
              searchTerm={searchInput}
              onSuggestionClick={handleSuggestionClick}
              loading={loadingSuggestions}
            />
          )}
        </form>

        <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-4 text-white max-w-4xl">
          {benefits.map((benefit) => (
            <div key={benefit.text} className="flex items-center justify-center sm:justify-start text-sm">
              <benefit.icon className="h-5 w-5 mr-2" />
              <span>{benefit.text}</span>
            </div>
          ))}
        </div>
      </div>
      <style jsx global>{`
        .shadow-text {
          text-shadow: 0 2px 4px rgba(0,0,0,0.6);
        }
      `}</style>
    </section>
  );
}
