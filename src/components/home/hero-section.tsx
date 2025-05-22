'use client';

import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative h-[500px] md:h-[600px] rounded-xl overflow-hidden shadow-lg">
      <Image
        src="https://placehold.co/1600x900.png"
        alt="Impresionante destino de viaje"
        layout="fill"
        objectFit="cover"
        quality={85}
        priority
        className="brightness-75"
        data-ai-hint="paisaje viaje"
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 bg-black/30">
        <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 shadow-text">
          LLENA TU VIAJE CON TRAVELY
        </h1>
        <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl shadow-text">
          Descubre y reserva actividades, tours y experiencias increíbles en todo el mundo.
        </p>
        <form className="w-full max-w-lg flex items-center gap-2 bg-white p-2 rounded-lg shadow-2xl">
          <Search className="text-muted-foreground ml-2" />
          <Input
            type="search"
            placeholder="¿A dónde vas a viajar?"
            className="flex-grow border-none focus-visible:ring-0 focus-visible:ring-offset-0 text-base"
            aria-label="Buscar destinos o actividades"
          />
          <Button type="submit" size="lg" className="bg-accent hover:bg-accent/90">
            Buscar
          </Button>
        </form>
      </div>
      {/* TODO: Considerar añadir iconos de beneficios aquí si el diseño lo requiere, siguiendo el prompt inicial. */}
      {/* Ejemplo:
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex space-x-8 text-white">
          <div className="flex items-center"><CheckCircle className="h-5 w-5 mr-2" /> Mejores Actividades</div>
          <div className="flex items-center"><Clock className="h-5 w-5 mr-2" /> Atención 24/7</div>
          <div className="flex items-center"><Shield className="h-5 w-5 mr-2" /> Pago Seguro</div>
        </div>
      */}
      <style jsx global>{`
        .shadow-text {
          text-shadow: 0 2px 4px rgba(0,0,0,0.5);
        }
      `}</style>
    </section>
  );
}
