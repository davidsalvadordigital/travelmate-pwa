
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Menu, MapPin, BookMarked, HelpCircle, ShoppingCart, UserPlus, LogIn, ChevronDown, Globe, DollarSign, ArrowRight, Search, Heart, Star, Clock, Languages, Ticket, CheckCircle2, BadgeDollarSign, SmilePlus, Users } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useEffect, useState, useRef, useCallback, type FormEvent } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import type { Activity } from '@/components/activities/activity-card'; // Assuming Activity interface is here
import { SearchSuggestions, type Suggestion, type DestinationSuggestion, type ActivitySuggestionItem } from '@/components/home/search-suggestions';
import { format } from 'date-fns';
import { useCart } from '@/context/cart-context';

// TEMPORAL: Copia de datos y función de normalización para prototipado en AppHeader
const todayHeader = new Date();
const tomorrowHeader = new Date(todayHeader);
tomorrowHeader.setDate(todayHeader.getDate() + 1);
const dayAfterTomorrowHeader = new Date(todayHeader);
dayAfterTomorrowHeader.setDate(todayHeader.getDate() + 2);

const formatDateHeaderData = (date: Date): string => format(date, 'yyyy-MM-dd');

// Datos de ejemplo más acotados para el header (ajustados con campos numéricos)
const allActivitiesDataHeader: Activity[] = [
  { id: '1', title: 'Paseo en barco por el Sena', duration: '1 hora', rating: 8.8, opinions: 10815, price: 19.25, currency: 'US$', image: 'https://placehold.co/600x400.png', dataAiHint: 'paseo barco sena', destination: 'París', freeCancellation: true, language: 'Español', isFree: false, originalPrice: 24.00, category: 'Visitas guiadas', availableDates: [formatDateHeaderData(todayHeader)], startTimeNumeric: 14, durationHoursNumeric: 1  },
  { id: '2', title: 'Entrada a la 3ª planta de la Torre Eiffel', duration: '2-3h', rating: 8.3, opinions: 1513, price: 112.13, currency: 'US$', image: 'https://placehold.co/600x400.png', dataAiHint: 'Torre Eiffel alto', destination: 'París', freeCancellation: true, language: 'Español y otros idiomas', isFree: false, category: 'Entradas', availableDates: [formatDateHeaderData(tomorrowHeader)], startTimeNumeric: 10, durationHoursNumeric: 3 },
  { id: '3', title: 'Visita guiada por el Museo del Louvre', duration: '2-3h', rating: 8.8, opinions: 4779, price: 90.61, currency: 'US$', image: 'https://placehold.co/600x400.png', dataAiHint: 'Louvre Mona Lisa', destination: 'París', freeCancellation: true, language: 'Español', isFree: false, category: 'Visitas guiadas', availableDates: [formatDateHeaderData(dayAfterTomorrowHeader)], startTimeNumeric: 11, durationHoursNumeric: 2.5 },
  { id: '12', title: 'Visita al Vaticano y Capilla Sixtina', duration: '3 horas', rating: 9.3, opinions: 7500, price: 60.00, currency: 'US$', image: 'https://placehold.co/600x400.png', dataAiHint: 'vaticano capilla sixtina', destination: 'Roma', freeCancellation: true, language: 'Español', isFree: false, category: 'Entradas', availableDates: [formatDateHeaderData(todayHeader)], startTimeNumeric: 9, durationHoursNumeric: 3  },
  { id: '13', title: 'Tour por el Coliseo y Foro Romano', duration: '3 horas', rating: 9.0, opinions: 6200, price: 55.00, currency: 'US$', image: 'https://placehold.co/600x400.png', dataAiHint: 'coliseo roma', destination: 'Roma', freeCancellation: true, language: 'Español', isFree: false, category: 'Visitas guiadas', availableDates: [formatDateHeaderData(tomorrowHeader)], startTimeNumeric: 10, durationHoursNumeric: 3 },
];


const normalizeStringHeader = (str: string) => {
  if (!str) return "";
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
};
// FIN TEMPORAL

const mainNavItemsForMobile = [
  { href: '/destinations', label: 'Destinos', icon: MapPin },
  { href: '/activities', label: 'Actividades', icon: Search },
  { href: '/bookings', label: 'Mis Reservas', icon: BookMarked },
];

const desktopUtilityItems = [
  { id: 'lang-selector', label: 'Español', icon: Globe, dropdownIcon: ChevronDown, href: '#', ariaLabel: 'Seleccionar Idioma' },
  { id: 'currency-selector', label: 'US$', icon: DollarSign, dropdownIcon: ChevronDown, href: '#', ariaLabel: 'Seleccionar Moneda' },
  { id: 'help', href: '/help', label: 'Ayuda', icon: HelpCircle, isIconOnly: true, ariaLabel: 'Centro de Ayuda' },
];

const desktopAuthButtons = [
  { id: 'login', href: '/login', label: 'Iniciar Sesión', styleType: 'filled' as const },
  { id: 'signup', href: '/signup', label: 'Regístrate', styleType: 'outlined' as const },
];


function Logo() {
  return (
    <Link href="/" passHref legacyBehavior>
      <a className="text-3xl font-bold text-primary-foreground hover:opacity-80 transition-opacity" aria-label="Página de inicio de Travely">
        Travely
      </a>
    </Link>
  );
}

interface DesktopSearchFormProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus: () => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  suggestions: Suggestion[];
  searchTerm: string;
  onSuggestionClick: () => void;
  loading: boolean;
  showSuggestions: boolean;
  wrapperRef: React.RefObject<HTMLDivElement>;
}

function DesktopSearchForm({
  value, onChange, onFocus, onSubmit,
  suggestions, searchTerm, onSuggestionClick, loading, showSuggestions, wrapperRef
}: DesktopSearchFormProps) {
  return (
    <form
      onSubmit={onSubmit}
      className="flex-grow max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mx-3 sm:mx-4 relative"
      ref={wrapperRef}
    >
      <div className="flex items-center bg-white p-1 rounded-full shadow-sm h-9 sm:h-10">
        <Search className="text-muted-foreground ml-3 mr-2 h-4 w-4 sm:h-5 sm:w-5" />
        <Input
          type="search"
          placeholder="¿A dónde vas a viajar?"
          className="flex-grow border-none focus-visible:ring-0 focus-visible:ring-offset-0 text-xs sm:text-sm h-full text-gray-700 placeholder-gray-400 pl-2 bg-transparent"
          aria-label="Buscar destinos o actividades en cabecera"
          value={value}
          onChange={onChange}
          onFocus={onFocus}
          autoComplete="off"
        />
        <Button type="submit" size="icon" className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full h-7 w-7 sm:h-8 sm:w-8 shrink-0 mr-0.5">
          <Search className="h-3.5 w-3.5 sm:h-4 sm:h-4" />
        </Button>
      </div>
      {showSuggestions && (
        <SearchSuggestions
          suggestions={suggestions}
          searchTerm={searchTerm}
          onSuggestionClick={onSuggestionClick}
          loading={loading}
        />
      )}
    </form>
  );
}


function DesktopNav({ onLinkClick, itemCount, headerSearchProps }: { onLinkClick?: () => void; itemCount: number, headerSearchProps: DesktopSearchFormProps & { show: boolean } }) {
  return (
    <nav className="flex items-center space-x-1 md:space-x-1.5 lg:space-x-2">
      {headerSearchProps.show && (
        <DesktopSearchForm {...headerSearchProps} />
      )}
      {desktopAuthButtons.map((item) => (
        <Button
          key={item.id}
          asChild
          onClick={onLinkClick}
          className={`rounded-full px-3 py-1.5 h-9 sm:h-10 text-xs sm:text-sm ${
            item.styleType === 'filled'
              ? 'bg-white/90 text-primary hover:bg-white'
              : 'border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary'
          }`}
          variant={item.styleType === 'outlined' ? 'outline' : 'default'}
        >
          <Link href={item.href}>{item.label}</Link>
        </Button>
      ))}

      {desktopUtilityItems.map((item) => {
        if (item.isIconOnly) {
          return (
            <Button
              key={item.id}
              variant="ghost"
              size="icon"
              asChild
              className="text-primary-foreground hover:bg-primary/80 hover:text-primary-foreground rounded-md w-9 h-9 sm:w-10 sm:h-10"
              title={item.label}
              aria-label={item.ariaLabel || item.label}
              onClick={onLinkClick}
            >
              <Link href={item.href}>
                <item.icon className="h-5 w-5" />
              </Link>
            </Button>
          );
        }
        return (
          <Button
            key={item.id}
            variant="ghost"
            asChild
            className="text-primary-foreground hover:bg-primary/80 hover:text-primary-foreground px-2 sm:px-3 py-1.5 rounded-md text-xs sm:text-sm h-9 sm:h-10"
            onClick={onLinkClick}
          >
            <Link href={item.href}>
              {item.label}
              {item.dropdownIcon && <item.dropdownIcon className="h-4 w-4 ml-1 opacity-70" />}
            </Link>
          </Button>
        );
      })}
      {/* Cart Icon with Item Count */}
      <Button
          variant="ghost"
          size="icon"
          asChild
          className="text-primary-foreground hover:bg-primary/80 hover:text-primary-foreground rounded-md w-9 h-9 sm:w-10 sm:h-10 relative"
          title="Carrito de Compras"
          aria-label="Carrito de Compras"
          onClick={onLinkClick}
        >
          <Link href="/cart">
            <ShoppingCart className="h-5 w-5" />
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-white text-primary text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </Link>
        </Button>
    </nav>
  );
}


function MobileNavLinks({ onLinkClick, itemCount }: { onLinkClick?: () => void; itemCount: number }) {
  const linkClassBase = 'w-full justify-start text-lg text-primary-foreground hover:bg-primary/80 py-3 px-4 rounded-md';
  const iconClassBase = `mr-2 h-5 w-5 text-primary-foreground`;

  return (
    <nav className="flex flex-col space-y-1 p-4">
      {mainNavItemsForMobile.map((item) => (
        <Button
          key={item.label}
          variant="ghost"
          asChild
          className={linkClassBase}
          onClick={onLinkClick}
        >
          <Link href={item.href}>
            <item.icon className={iconClassBase} />
            {item.label}
          </Link>
        </Button>
      ))}

      <div className="pt-3 border-t border-primary-foreground/20 mt-3" />

      {[
        { id: 'lang-selector-mobile', label: 'Español', icon: Globe, href: '#', ariaLabel: 'Seleccionar Idioma' },
        { id: 'currency-selector-mobile', label: 'US$', icon: DollarSign, href: '#', ariaLabel: 'Seleccionar Moneda' },
      ].map((item) => (
         <Button
            key={item.id}
            variant="ghost"
            asChild
            className={linkClassBase}
            onClick={onLinkClick}
          >
            <Link href={item.href}>
              <item.icon className={iconClassBase} />
              {item.label}
            </Link>
          </Button>
      ))}

      <div className="pt-3 border-t border-primary-foreground/20 mt-3" />

      {[
        { href: '/help', label: 'Ayuda', icon: HelpCircle, ariaLabel: 'Centro de Ayuda' },
      ].map((item) => (
        <Button
          key={item.label}
          variant="ghost"
          asChild
          className={linkClassBase}
          title={item.label}
          aria-label={item.ariaLabel || item.label}
          onClick={onLinkClick}
        >
          <Link href={item.href}>
            <item.icon className={iconClassBase} />
            {item.label}
          </Link>
        </Button>
      ))}
      <Button
        variant="ghost"
        asChild
        className={`${linkClassBase} relative`}
        title="Carrito de Compras"
        aria-label="Carrito de Compras"
        onClick={onLinkClick}
      >
        <Link href="/cart">
          <ShoppingCart className={iconClassBase} />
          Carrito
          {itemCount > 0 && (
              <span className="absolute right-4 top-1/2 -translate-y-1/2 bg-white text-primary text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {itemCount}
              </span>
            )}
        </Link>
      </Button>


      <div className="pt-3 border-t border-primary-foreground/20 mt-3 space-y-2">
        {desktopAuthButtons.map((item) => (
          <Button
            key={item.label}
            variant={item.styleType === 'filled' ? 'default' : 'outline'}
            asChild
            className={`w-full justify-center text-lg py-3 rounded-md ${
              item.styleType === 'filled'
                ? 'bg-primary-foreground text-primary hover:bg-primary-foreground/90'
                : 'border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10'
            }`}
            onClick={onLinkClick}
          >
            <Link href={item.href}>
              {item.id === 'signup' ? <UserPlus className="mr-2 h-5 w-5" /> : <LogIn className="mr-2 h-5 w-5" />}
              {item.label}
            </Link>
          </Button>
        ))}
      </div>
    </nav>
  );
}


export function AppHeader() {
  const isMobile = useIsMobile();
  const pathname = usePathname();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const { itemCount } = useCart();

  // Estado y lógica para el buscador del header
  const [headerSearchInput, setHeaderSearchInput] = useState('');
  const [headerSuggestions, setHeaderSuggestions] = useState<Suggestion[]>([]);
  const [showHeaderSuggestions, setShowHeaderSuggestions] = useState(false);
  const [headerLoadingSuggestions, setHeaderLoadingSuggestions] = useState(false);
  const headerSearchWrapperRef = useRef<HTMLDivElement>(null);
  const headerDebounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const fetchHeaderSuggestions = useCallback((query: string) => {
    if (query.trim() === '') {
      setHeaderSuggestions([]);
      setShowHeaderSuggestions(false);
      setHeaderLoadingSuggestions(false);
      return;
    }
    setHeaderLoadingSuggestions(true);

    const normalizedQuery = normalizeStringHeader(query);

    const destinationCounts: { [key: string]: number } = {};
    allActivitiesDataHeader.forEach(activity => {
      if (normalizeStringHeader(activity.destination).includes(normalizedQuery)) {
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
      .slice(0, 3); // Limitar a 3 para el header

    const actSuggestions: ActivitySuggestionItem[] = allActivitiesDataHeader
      .filter(activity => normalizeStringHeader(activity.title).includes(normalizedQuery))
      .map(activity => ({
        type: 'activity' as const,
        id: activity.id,
        title: activity.title,
        destination: activity.destination,
        href: `/activities/${activity.id}`,
      }))
      .slice(0, 3); // Limitar a 3 para el header

    const combinedSuggestions = [...destSuggestions, ...actSuggestions];
    setHeaderSuggestions(combinedSuggestions);
    setShowHeaderSuggestions(combinedSuggestions.length > 0 || query.trim().length > 0);
    setHeaderLoadingSuggestions(false);
  }, []);

  useEffect(() => {
    if (headerDebounceTimeoutRef.current) {
      clearTimeout(headerDebounceTimeoutRef.current);
    }
    if (headerSearchInput.trim() !== '') {
      setHeaderLoadingSuggestions(true);
      headerDebounceTimeoutRef.current = setTimeout(() => {
        fetchHeaderSuggestions(headerSearchInput);
      }, 300);
    } else {
      setHeaderSuggestions([]);
      setShowHeaderSuggestions(false);
      setHeaderLoadingSuggestions(false);
    }
    return () => {
      if (headerDebounceTimeoutRef.current) {
        clearTimeout(headerDebounceTimeoutRef.current);
      }
    };
  }, [headerSearchInput, fetchHeaderSuggestions]);

  const handleHeaderInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setHeaderSearchInput(value);
    if (value.trim() !== '') {
      setShowHeaderSuggestions(true);
    } else {
      setShowHeaderSuggestions(false);
    }
  };

  const handleHeaderInputFocus = () => {
    if (headerSearchInput.trim() !== '' && headerSuggestions.length > 0) {
      setShowHeaderSuggestions(true);
    }
  };

  const handleHeaderSuggestionClick = useCallback(() => {
    setShowHeaderSuggestions(false);
    setHeaderSearchInput('');
    setSheetOpen(false);
  }, []);

  const handleHeaderSearchSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (headerSearchInput.trim()) {
      router.push(`/activities?q=${encodeURIComponent(headerSearchInput.trim())}`);
      setShowHeaderSuggestions(false);
      setHeaderSearchInput('');
      setSheetOpen(false);
    }
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (headerSearchWrapperRef.current && !headerSearchWrapperRef.current.contains(event.target as Node)) {
        setShowHeaderSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [headerSearchWrapperRef]);


  // Esqueleto para evitar parpadeo en carga inicial y SSR/hydration mismatch
  if (!mounted) {
    return (
      <header className="bg-primary text-primary-foreground shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-2 sm:px-4 py-2.5 sm:py-3 flex justify-between items-center h-16">
          <div className="flex items-center">
            <Logo />
          </div>
          <div className="h-8 w-8 bg-primary/80 rounded-md animate-pulse md:hidden" /> {/* Placeholder para icono de menú */}
          <div className="hidden md:flex items-center space-x-1 md:space-x-1.5 lg:space-x-2">
             {/* Placeholder para el buscador condicional */}
            <div className="flex-grow max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mx-3 sm:mx-4 relative">
              <div className="h-9 sm:h-10 bg-primary/80 rounded-full animate-pulse" />
            </div>
            <div className="h-9 sm:h-10 w-24 bg-primary/80 rounded-full animate-pulse" /> {/* Iniciar Sesión */}
            <div className="h-9 sm:h-10 w-24 bg-primary/80 rounded-full animate-pulse" /> {/* Regístrate */}
            <div className="h-9 sm:h-10 w-20 bg-primary/80 rounded-md animate-pulse" /> {/* Idioma */}
            <div className="h-9 sm:h-10 w-16 bg-primary/80 rounded-md animate-pulse" /> {/* Moneda */}
            <div className="h-9 sm:h-10 w-9 bg-primary/80 rounded-md animate-pulse" /> {/* Ayuda */}
            <div className="h-9 sm:h-10 w-9 bg-primary/80 rounded-md animate-pulse" /> {/* Carrito */}
          </div>
        </div>
      </header>
    );
  }

  const showHeaderSearch = !isMobile && pathname !== '/';

  return (
    <header className="bg-primary text-primary-foreground shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-2 sm:px-4 py-2.5 sm:py-3 flex justify-between items-center h-16">
        <div className="flex items-center">
          <Logo />
        </div>

        {isMobile ? (
          <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary/80" aria-label="Abrir menú de navegación">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[360px] bg-primary text-primary-foreground p-0 flex flex-col">
              <SheetHeader className="p-4 border-b border-primary-foreground/20">
                <SheetTitle>Menú</SheetTitle> {/* Screen reader accessible title */}
              </SheetHeader>
              <div className="flex-grow overflow-y-auto">
                <MobileNavLinks onLinkClick={() => setSheetOpen(false)} itemCount={itemCount} />
              </div>
            </SheetContent>
          </Sheet>
        ) : (
          <DesktopNav
            onLinkClick={() => setSheetOpen(false)}
            itemCount={itemCount}
            headerSearchProps={{
              show: showHeaderSearch,
              value: headerSearchInput,
              onChange: handleHeaderInputChange,
              onFocus: handleHeaderInputFocus,
              onSubmit: handleHeaderSearchSubmit,
              suggestions: headerSuggestions,
              searchTerm: headerSearchInput,
              onSuggestionClick: handleHeaderSuggestionClick,
              loading: headerLoadingSuggestions,
              showSuggestions: showHeaderSuggestions,
              wrapperRef: headerSearchWrapperRef,
            }}
          />
        )}
      </div>
    </header>
  );
}
