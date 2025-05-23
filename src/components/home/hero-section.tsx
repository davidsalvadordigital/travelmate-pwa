
'use client';

import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ArrowRight, BadgeDollarSign, CheckCircle2, Search, SmilePlus, Users } from 'lucide-react';
import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';

const benefits = [
  { text: "Las mejores actividades", icon: CheckCircle2 },
  { text: "Atención al cliente 24/7", icon: SmilePlus },
  { text: "Millones de opiniones", icon: Users },
  { text: "Precios finales", icon: BadgeDollarSign },
];

export function HeroSection() {
  const [searchInput, setSearchInput] = useState('');
  const router = useRouter();

  const handleSearchSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (searchInput.trim()) {
      router.push(`/activities?destination=${encodeURIComponent(searchInput.trim())}`);
    }
  };

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
          className="w-full max-w-xl flex items-center gap-0 bg-white p-1.5 rounded-lg shadow-2xl"
        >
          <Search className="text-muted-foreground ml-3 mr-2 h-5 w-5" />
          <Input
            type="search"
            placeholder="¿A dónde vas a viajar?"
            className="flex-grow border-none focus-visible:ring-0 focus-visible:ring-offset-0 text-base h-11"
            aria-label="Buscar destinos o actividades"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <Button type="submit" size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-md px-6">
            Buscar <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
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
