
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import { Menu, MapPin, BookMarked, HelpCircle, LogIn, PackageSearch } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useEffect, useState } from 'react';

const navItems = [
  { href: '/destinations', label: 'Destinations', icon: MapPin },
  { href: '/activities', label: 'Activities', icon: PackageSearch },
  { href: '/bookings', label: 'My Bookings', icon: BookMarked },
  { href: '/help', label: 'Help', icon: HelpCircle },
  { href: '/login', label: 'Login', icon: LogIn },
];

function Logo() {
  return (
    <Link href="/" className="text-3xl font-bold text-primary hover:opacity-80 transition-opacity">
      Travely
    </Link>
  );
}

function NavLinks({ isMobile = false }: { isMobile?: boolean }) {
  return (
    <nav className={`flex ${isMobile ? 'flex-col space-y-4' : 'space-x-4 items-center'}`}>
      {navItems.map((item) => (
        <Button
          key={item.label}
          variant={isMobile ? "ghost" : "ghost"}
          asChild
          className={isMobile ? 'w-full justify-start text-lg' : 'text-sm font-medium hover:text-primary'}
        >
          <Link href={item.href}>
            <item.icon className="mr-2 h-5 w-5" />
            {item.label}
          </Link>
        </Button>
      ))}
    </nav>
  );
}

export function AppHeader() {
  const isMobile = useIsMobile();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return ( // Skeleton or simple header during SSR/hydration mismatch phase
      <header className="bg-card shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Logo />
          <div className="h-8 w-8 bg-muted rounded-md animate-pulse md:hidden"></div>
          <div className="hidden md:flex space-x-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-6 w-20 bg-muted rounded-md animate-pulse"></div>
            ))}
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="bg-card shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Logo />
        {isMobile ? (
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px] pt-10">
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
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
