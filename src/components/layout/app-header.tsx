
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetHeader } from '@/components/ui/sheet'; // SheetHeader añadido
import { Menu, MapPin, BookMarked, HelpCircle, LogIn, UserPlus, ShoppingCart, Search, Globe } from 'lucide-react'; // UserPlus, ShoppingCart, Search, Globe añadidos
import { useIsMobile } from '@/hooks/use-mobile';
import { useEffect, useState } from 'react';

// Navegación principal según el prompt de Civitatis (simplificado)
const mainNavItems = [
  { href: '/destinations', label: 'Destinos', icon: MapPin },
  { href: '/activities', label: 'Actividades', icon: Search }, // Icono Search para Actividades como en Civitatis
  { href: '/bookings', label: 'Mis Reservas', icon: BookMarked },
];

// Iconos y botones de utilidad
const utilityNavItems = [
  { href: '/help', label: 'Ayuda', icon: HelpCircle, isIconOnly: true, ariaLabel: 'Centro de Ayuda' },
  { href: '/cart', label: 'Carrito', icon: ShoppingCart, isIconOnly: true, ariaLabel: 'Carrito de Compras' }, // Página de carrito a definir
];

const authNavButtons = [
  { href: '/login', label: 'Iniciar Sesión', variant: 'outline' as const }, // 'outline' para que se vea bien sobre el fondo rosa
  { href: '/signup', label: 'Registrarse', variant: 'ghost' as const }, // 'ghost' o similar para que sea sutil
];


function Logo() {
  return (
    <Link href="/" className="text-3xl font-bold text-primary-foreground hover:opacity-80 transition-opacity" aria-label="Página de inicio de Travely">
      Travely
    </Link>
  );
}

function NavLinks({ isMobile = false, onLinkClick }: { isMobile?: boolean, onLinkClick?: () => void }) {
  const linkClassBase = isMobile 
    ? 'w-full justify-start text-lg text-primary-foreground hover:bg-primary/80 py-3 px-4 rounded-md' 
    : 'text-sm font-medium text-primary-foreground hover:bg-primary/80 hover:text-primary-foreground px-3 py-2 rounded-md';
  
  const iconClassBase = `mr-2 h-5 w-5 ${isMobile ? 'text-primary-foreground' : ''}`;

  return (
    <nav className={`flex ${isMobile ? 'flex-col space-y-2 p-4' : 'space-x-1 items-center'}`}>
      {mainNavItems.map((item) => (
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
      <div className={isMobile ? "pt-4 border-t border-primary-foreground/20 mt-4" : "flex items-center space-x-1"}>
        {utilityNavItems.map((item) => (
          <Button
            key={item.label}
            variant="ghost"
            size="icon"
            asChild
            className={isMobile ? `${linkClassBase} my-1` : 'text-primary-foreground hover:bg-primary/80 hover:text-primary-foreground rounded-md'}
            title={item.label}
            aria-label={item.ariaLabel || item.label}
            onClick={onLinkClick}
          >
            <Link href={item.href}>
              <item.icon className={`${isMobile ? iconClassBase : 'h-5 w-5'}`} />
              {isMobile && item.label}
            </Link>
          </Button>
        ))}
      </div>
      <div className={isMobile ? "pt-4 border-t border-primary-foreground/20 mt-4 space-y-2" : "flex items-center space-x-2 ml-4"}>
        {authNavButtons.map((item) => (
          <Button
            key={item.label}
            variant={isMobile ? "default" : item.variant}
            asChild
            className={isMobile ? `w-full justify-center text-lg py-3 rounded-md ${item.variant === 'outline' ? 'bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10' : 'bg-primary-foreground text-primary hover:bg-primary-foreground/90' }` : `${item.variant === 'outline' ? 'border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary' : 'text-primary-foreground hover:bg-primary/80 hover:text-primary-foreground'}`}
            onClick={onLinkClick}
          >
            <Link href={item.href}>
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
  const [mounted, setMounted] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);


  useEffect(() => {
    setMounted(true);
  }, []);

  // Esqueleto para evitar parpadeo en carga inicial y SSR/hydration mismatch
  if (!mounted) {
    return (
      <header className="bg-primary text-primary-foreground shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center h-16"> {/* Altura fija para consistencia */}
          <div className="text-3xl font-bold">Travely</div> {/* Placeholder Logo */}
          <div className="h-8 w-8 bg-primary/80 rounded-md animate-pulse md:hidden"></div> {/* Placeholder para icono de menú */}
          <div className="hidden md:flex space-x-4 items-center">
            {[...Array(3)].map((_, i) => ( // Menos items en esqueleto
              <div key={i} className="h-6 w-24 bg-primary/80 rounded-md animate-pulse"></div>
            ))}
            <div className="h-6 w-6 bg-primary/80 rounded-full animate-pulse"></div>
            <div className="h-6 w-6 bg-primary/80 rounded-full animate-pulse"></div>
            <div className="h-8 w-28 bg-primary/80 rounded-md animate-pulse"></div>
            <div className="h-8 w-28 bg-primary/80 rounded-md animate-pulse"></div>
          </div>
        </div>
      </header>
    );
  }

  return (
    // Header principal con fondo Rosa Travely (primary) y texto blanco (primary-foreground)
    <header className="bg-primary text-primary-foreground shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center h-16"> {/* Altura fija */}
        <Logo />
        {isMobile ? (
          <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary/80" aria-label="Abrir menú de navegación">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[360px] bg-primary text-primary-foreground p-0 flex flex-col">
              <SheetHeader className="p-4 border-b border-primary-foreground/20">
                <SheetTitle className="text-2xl font-bold text-primary-foreground text-left">Menú</SheetTitle>
              </SheetHeader>
              <div className="flex-grow overflow-y-auto">
                <NavLinks isMobile onLinkClick={() => setSheetOpen(false)} />
              </div>
            </SheetContent>
          </Sheet>
        ) : (
          <NavLinks />
        )}
      </div>
    </header>
  );
}
