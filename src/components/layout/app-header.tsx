
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Menu, MapPin, Search as SearchIcon, BookMarked, HelpCircle, ShoppingCart, UserPlus, LogIn, ChevronDown, Globe, DollarSign } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

// Main navigation items - KEPT FOR MOBILE MENU
const mainNavItemsForMobile = [
  { href: '/destinations', label: 'Destinos', icon: MapPin },
  { href: '/activities', label: 'Actividades', icon: SearchIcon },
  { href: '/bookings', label: 'Mis Reservas', icon: BookMarked },
];

// Desktop utility items (selectors, help, cart)
const desktopUtilityItems = [
  { id: 'lang-selector', label: 'Español', icon: Globe, dropdownIcon: ChevronDown, href: '#', ariaLabel: 'Seleccionar Idioma' },
  { id: 'currency-selector', label: 'US$', icon: DollarSign, dropdownIcon: ChevronDown, href: '#', ariaLabel: 'Seleccionar Moneda' },
  { id: 'help', href: '/help', label: 'Ayuda', icon: HelpCircle, isIconOnly: true, ariaLabel: 'Centro de Ayuda' },
  { id: 'cart', href: '/cart', label: 'Carrito', icon: ShoppingCart, isIconOnly: true, ariaLabel: 'Carrito de Compras' },
];

// Auth buttons for desktop
const desktopAuthButtons = [
  { id: 'login', href: '/login', label: 'Iniciar Sesión', styleType: 'filled' as const },
  { id: 'signup', href: '/signup', label: 'Regístrate', styleType: 'outlined' as const },
];


function Logo() {
  return (
    <Link href="/" className="text-3xl font-bold text-primary-foreground hover:opacity-80 transition-opacity" aria-label="Página de inicio de Travely">
      Travely
    </Link>
  );
}

function DesktopSearchForm() {
  return (
    <form className="flex-grow max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mx-3 sm:mx-4 flex items-center bg-white rounded-full px-1 py-0.5 shadow-sm h-9 sm:h-10">
      <Input
        type="search"
        placeholder="¿A dónde vas a viajar?"
        className="flex-grow border-none focus-visible:ring-0 focus-visible:ring-offset-0 text-xs sm:text-sm h-full text-gray-700 placeholder-gray-400 pl-3 bg-transparent"
        aria-label="Buscar destinos o actividades"
      />
      <Button type="submit" size="icon" className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full h-7 w-7 sm:h-8 sm:w-8 shrink-0">
        <SearchIcon className="h-3.5 w-3.5 sm:h-4 sm:h-4" />
      </Button>
    </form>
  );
}

function DesktopNav({ onLinkClick }: { onLinkClick?: () => void }) {
  return (
    <nav className="flex items-center space-x-1 md:space-x-1.5 lg:space-x-2">
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
        // Selectors (Language, Currency)
        return (
          <Button
            key={item.id}
            variant="ghost"
            asChild
            className="text-primary-foreground hover:bg-primary/80 hover:text-primary-foreground px-2 sm:px-3 py-1.5 rounded-md text-xs sm:text-sm h-9 sm:h-10"
            onClick={onLinkClick}
          >
            <Link href={item.href}>
              {/* <item.icon className="h-4 w-4 mr-1 hidden sm:inline-block" /> */}
              {item.label}
              {item.dropdownIcon && <item.dropdownIcon className="h-4 w-4 ml-1 opacity-70" />}
            </Link>
          </Button>
        );
      })}
    </nav>
  );
}


function MobileNavLinks({ onLinkClick }: { onLinkClick?: () => void }) {
  const linkClassBase = 'w-full justify-start text-lg text-primary-foreground hover:bg-primary/80 py-3 px-4 rounded-md';
  const iconClassBase = `mr-2 h-5 w-5 text-primary-foreground`;

  return (
    <nav className="flex flex-col space-y-1 p-4">
      {/* Main nav items retained for mobile */}
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

      {/* Language and Currency Selectors for Mobile */}
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
      
      {/* Utility icons for mobile */}
      {[
        { href: '/help', label: 'Ayuda', icon: HelpCircle, ariaLabel: 'Centro de Ayuda' },
        { href: '/cart', label: 'Carrito', icon: ShoppingCart, ariaLabel: 'Carrito de Compras' },
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

      <div className="pt-3 border-t border-primary-foreground/20 mt-3 space-y-2">
        {/* Auth buttons for mobile */}
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
  const [mounted, setMounted] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Esqueleto para evitar parpadeo en carga inicial y SSR/hydration mismatch
  if (!mounted) {
    return (
      <header className="bg-primary text-primary-foreground shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-2 sm:px-4 py-2.5 sm:py-3 flex justify-between items-center h-16">
          <div className="text-3xl font-bold">Travely</div> {/* Placeholder Logo */}
          <div className="h-8 w-8 bg-primary/80 rounded-md animate-pulse md:hidden"></div> {/* Placeholder para icono de menú */}
          <div className="hidden md:flex items-center space-x-2">
            {/* Simplified skeleton: Always include a placeholder for the search bar area.
                The actual search bar is conditionally rendered based on pathname when mounted.
            */}
            <div className="h-9 w-48 md:w-64 lg:w-96 bg-primary/80 rounded-full animate-pulse"></div> {/* Search bar skeleton */}
            <div className="h-9 w-24 bg-primary/80 rounded-full animate-pulse"></div> {/* Login skeleton */}
            <div className="h-9 w-24 bg-primary/80 rounded-full animate-pulse"></div> {/* Signup skeleton */}
            <div className="h-9 w-20 bg-primary/80 rounded-md animate-pulse"></div> {/* Lang skeleton */}
            <div className="h-9 w-16 bg-primary/80 rounded-md animate-pulse"></div> {/* Currency skeleton */}
            <div className="h-9 w-9 bg-primary/80 rounded-full animate-pulse"></div> {/* Help skeleton */}
            <div className="h-9 w-9 bg-primary/80 rounded-full animate-pulse"></div> {/* Cart skeleton */}
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="bg-primary text-primary-foreground shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-2 sm:px-4 py-2.5 sm:py-3 flex justify-between items-center h-16">
        <div className="flex items-center">
          <Logo />
        </div>

        {!isMobile && pathname !== '/' && ( // Solo mostrar si no es mobile Y no es la homepage
          <div className="flex-1 flex justify-center items-center min-w-0 px-2">
            <DesktopSearchForm />
          </div>
        )}
        
        {isMobile ? (
          <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary/80" aria-label="Abrir menú de navegación">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[360px] bg-primary text-primary-foreground p-0 flex flex-col">
              <SheetHeader className="p-4 border-b border-primary-foreground/20">
                <SheetTitle className="sr-only">Menú Principal</SheetTitle> {/* Visually hidden title for accessibility */}
                <div className="text-2xl font-bold text-primary-foreground text-left">Menú</div>
              </SheetHeader>
              <div className="flex-grow overflow-y-auto">
                <MobileNavLinks onLinkClick={() => setSheetOpen(false)} />
              </div>
            </SheetContent>
          </Sheet>
        ) : (
          <DesktopNav />
        )}
      </div>
    </header>
  );
}
