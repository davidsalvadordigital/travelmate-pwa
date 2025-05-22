"use client";

import Image from 'next/image';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, ImageOff } from 'lucide-react'; // ImageOff para placeholder
import { cn } from '@/lib/utils';

interface GalleryImage {
  src: string;
  alt: string;
  dataAiHint: string;
}

interface ImageGalleryProps {
  images: GalleryImage[];
}

export function ImageGallery({ images }: ImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="aspect-video bg-muted rounded-t-lg flex flex-col items-center justify-center text-muted-foreground">
        <ImageOff className="h-16 w-16 mb-2" />
        <p>No hay imágenes disponibles</p>
      </div>
    );
  }

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div className="relative group">
      <div className="aspect-[16/10] w-full overflow-hidden rounded-t-lg"> {/* Ajustar aspect ratio si es necesario */}
        <Image
          src={images[currentIndex].src}
          alt={images[currentIndex].alt}
          width={1200}
          height={750} // Ajustado para aspect ratio 16/10
          className="object-cover w-full h-full transition-opacity duration-300"
          data-ai-hint={images[currentIndex].dataAiHint}
          priority={currentIndex === 0} // Priorizar la primera imagen
        />
      </div>

      {images.length > 1 && (
        <>
          <Button
            variant="outline"
            size="icon"
            className="absolute top-1/2 left-4 -translate-y-1/2 bg-background/70 hover:bg-background/90 opacity-0 group-hover:opacity-100 transition-opacity rounded-full shadow-md"
            onClick={goToPrevious}
            aria-label="Imagen anterior"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute top-1/2 right-4 -translate-y-1/2 bg-background/70 hover:bg-background/90 opacity-0 group-hover:opacity-100 transition-opacity rounded-full shadow-md"
            onClick={goToNext}
            aria-label="Siguiente imagen"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </>
      )}

      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={cn(
                "h-2.5 w-2.5 rounded-full transition-all duration-300 ease-out", // Aumentar tamaño y mejorar transición
                currentIndex === index ? "bg-primary scale-125 w-4" : "bg-white/60 hover:bg-white/90" // Mejorar contraste y tamaño del activo
              )}
              aria-label={`Ir a imagen ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
