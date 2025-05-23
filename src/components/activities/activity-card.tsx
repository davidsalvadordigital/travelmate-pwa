
"use client"; 

import { useState } from 'react'; // Importar useState
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button'; // Asegurarse de que Button está importado
import { Clock, Star, Languages, Heart, Zap, Ticket } from 'lucide-react';
import { useToast } from "@/hooks/use-toast"; 
import { cn } from '@/lib/utils';

export interface Activity {
  id: string;
  title: string;
  duration: string;
  rating: number;
  opinions: number;
  price: number;
  currency: string;
  image: string;
  dataAiHint: string;
  destination: string;
  freeCancellation: boolean;
  language: string;
  isFree: boolean;
  originalPrice?: number;
}

interface ActivityCardProps {
  activity: Activity;
}

export function ActivityCard({ activity }: ActivityCardProps) {
  const { toast } = useToast();
  const [isFavorite, setIsFavorite] = useState(false); // Estado para el favorito

  const handleToggleFavorite = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); 
    e.stopPropagation(); 
    setIsFavorite(prev => !prev); // Cambiar el estado del favorito
    toast({
      title: isFavorite ? "Eliminado de Favoritos" : "¡Añadido a Favoritos!",
      description: `"${activity.title}" ${isFavorite ? 'se ha eliminado de' : 'se ha añadido a'} tu lista de favoritos.`,
      variant: "default",
    });
  };

  return (
    <Link href={`/activities/${activity.id}`} className="block group rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 h-full">
      <Card className="flex flex-col h-full border-0">
        <div className="relative h-48 sm:h-56">
          <Image
            src={activity.image}
            alt={`Imagen de ${activity.title}`}
            fill
            style={{ objectFit: 'cover' }}
            className="group-hover:scale-105 transition-transform duration-300"
            data-ai-hint={activity.dataAiHint}
          />
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 bg-black/30 hover:bg-black/50 text-white rounded-full h-8 w-8 z-10"
            onClick={handleToggleFavorite}
            aria-label={isFavorite ? "Quitar de favoritos" : "Añadir a favoritos"}
          >
            <Heart className={cn("h-4 w-4", isFavorite && "fill-red-500 text-red-500")} />
          </Button>
          {activity.originalPrice && activity.price < activity.originalPrice && (
             <div className="absolute top-2 left-2 bg-primary text-primary-foreground text-xs font-semibold px-2 py-1 rounded">
               OFERTA
             </div>
          )}
        </div>

        <CardContent className="p-4 flex-grow flex flex-col justify-between">
          <div>
            <h3 className="text-md font-semibold text-primary mb-1.5 group-hover:underline leading-tight">
              {activity.title}
            </h3>
            
            <div className="flex items-center text-xs text-muted-foreground mb-1">
              <Star className="h-3.5 w-3.5 mr-1 text-yellow-400 fill-yellow-400" />
              <span>{activity.rating.toFixed(1)}/10</span>
              <span className="mx-1">&middot;</span>
              <span>{activity.opinions.toLocaleString('es-ES')} opiniones</span>
            </div>

            <div className="flex items-center text-xs text-muted-foreground mb-1">
              <Clock className="h-3.5 w-3.5 mr-1" />
              <span>{activity.duration}</span>
            </div>
            
            <div className="flex items-center text-xs text-muted-foreground mb-2">
              <Languages className="h-3.5 w-3.5 mr-1" />
              <span>{activity.language}</span>
            </div>
          </div>
          
          <div className="mt-auto pt-2">
            {activity.freeCancellation && (
              <div className="flex items-center text-xs text-green-600 mb-1.5"> {/* Civitatis usa verde para esto */}
                <Ticket className="h-3.5 w-3.5 mr-1" />
                <span>Cancelación gratuita</span>
              </div>
            )}

            <div className="text-right">
              {activity.isFree ? (
                <span className="text-2xl font-bold text-primary flex items-center justify-end">
                  <Zap className="h-5 w-5 mr-1" /> ¡Gratis!
                </span>
              ) : (
                <>
                  {activity.originalPrice && activity.price < activity.originalPrice && (
                    <span className="text-xs text-muted-foreground line-through mr-1.5">
                      {activity.originalPrice.toFixed(2)}{activity.currency}
                    </span>
                  )}
                  <span className="text-xs text-muted-foreground mr-1">desde</span>
                  <span className="text-2xl font-bold text-primary">
                    {activity.price.toFixed(2)}{activity.currency}
                  </span>
                </>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
