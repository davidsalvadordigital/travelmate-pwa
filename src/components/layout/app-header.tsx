
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import { Menu, MapPin, BookMarked, HelpCircle, LogIn, UserPlus, ShoppingCart, Search } from 'lucide-react'; // UserPlus y ShoppingCart añadidos
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
  { href: '/help', label: 'Ayuda', icon: HelpCircle, isIconOnly: true },
  { href: '/cart', label: 'Carrito', icon: ShoppingCart, isIconOnly: true }, // Página de carrito a definir
];

const authNavButtons = [
  { href: '/login', label: 'Iniciar Sesión', variant: 'outline' as const }, // 'outline' para que se vea bien sobre el fondo rosa
  { href: '/signup', label: 'Registrarse', variant: 'ghost' as const }, // 'ghost' o similar para que sea sutil
];


function Logo() {
  return (
    <Link href="/" className="text-3xl font-bold text-primary-foreground hover:opacity-80 transition-opacity">
      Travely
    </Link>
  );
}

function NavLinks({ isMobile = false }: { isMobile?: boolean }) {
  return (
    <nav className={`flex ${isMobile ? 'flex-col space-y-2 p-4' : 'space-x-1 items-center'}`}>
      {mainNavItems.map((item) => (
        <Button
          key={item.label}
          variant="ghost"
          asChild
          className={isMobile ? 'w-full justify-start text-lg text-primary-foreground hover:bg-primary/80' : 'text-sm font-medium text-primary-foreground hover:bg-primary/80 hover:text-primary-foreground'}
        >
          <Link href={item.href}>
            <item.icon className={`mr-2 h-5 w-5 ${isMobile ? 'text-primary-foreground' : ''}`} />
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
            className={isMobile ? 'w-full justify-start text-lg text-primary-foreground hover:bg-primary/80 my-1' : 'text-primary-foreground hover:bg-primary/80 hover:text-primary-foreground'}
            title={item.label}
          >
            <Link href={item.href}>
              <item.icon className={`h-5 w-5 ${isMobile ? 'mr-2': ''}`} />
              {isMobile ? item.label : <span className="sr-only">{item.label}</span>}
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
            className={isMobile ? `w-full justify-center text-lg ${item.variant === 'outline' ? 'bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10' : 'bg-primary-foreground text-primary hover:bg-primary-foreground/90' }` : `${item.variant === 'outline' ? 'border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary' : 'text-primary-foreground hover:bg-primary/80'}`}
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

  useEffect(() => {
    setMounted(true);
  }, []);

  // Esqueleto para evitar parpadeo en carga inicial y SSR/hydration mismatch
  if (!mounted) {
    return (
      <header className="bg-primary text-primary-foreground shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="text-3xl font-bold">Travely</div> {/* Placeholder Logo */}
          <div className="h-8 w-8 bg-primary/80 rounded-md animate-pulse md:hidden"></div>
          <div className="hidden md:flex space-x-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-6 w-20 bg-primary/80 rounded-md animate-pulse"></div>
            ))}
          </div>
        </div>
      </header>
    );
  }

  return (
    // Header principal con fondo Rosa Travely (primary) y texto blanco (primary-foreground)
    <header className="bg-primary text-primary-foreground shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Logo />
        {isMobile ? (
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary/80">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Abrir menú</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[360px] pt-10 bg-primary text-primary-foreground p-0">
              <SheetTitle className="sr-only">Menú de Navegación</SheetTitle>
              <NavLinks isMobile />
            </SheetContent>
          </Sheet>
        ) : (
          <NavLinks />
        )}
      </div>
    </header>
  );
}
