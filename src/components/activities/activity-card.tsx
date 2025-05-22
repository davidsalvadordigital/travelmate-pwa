import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, Star, DollarSign, ArrowRight, Info } from 'lucide-react'; // Info añadido para el tag de "desde"

export interface Activity {
  id: string;
  title: string;
  duration: string;
  rating: number;
  priceRange: string; // Ej: "€50" o "€50 - €70"
  image: string;
  dataAiHint: string;
  destination: string;
}

interface ActivityCardProps {
  activity: Activity;
}

function StarRating({ rating, reviewsCount, maxStars = 5 }: { rating: number; reviewsCount?: number; maxStars?: number }) {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5; // Considerar si se quiere media estrella visualmente
  const emptyStars = maxStars - fullStars - (halfStar ? 1 : 0);

  return (
    <div className="flex items-center">
      {[...Array(fullStars)].map((_, i) => (
        <Star key={`full-${i}`} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
      ))}
      {/* Si se implementa media estrella, ajustar aquí */}
      {[...Array(emptyStars)].map((_, i) => (
        <Star key={`empty-${i}`} className="h-4 w-4 text-gray-300" />
      ))}
      <span className="ml-1.5 text-xs text-muted-foreground">
        {rating.toFixed(1)}/5
        {reviewsCount && ` (${reviewsCount} opiniones)`}
      </span>
    </div>
  );
}


export function ActivityCard({ activity }: ActivityCardProps) {
  // Extraer el precio "Desde" si es un rango, o el precio directo
  const priceDisplay = activity.priceRange.includes('-') ? activity.priceRange.split('-')[0].trim() : activity.priceRange;

  return (
    <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col h-full group">
      <CardHeader className="p-0 relative h-48">
        <Image
          src={activity.image}
          alt={`Imagen de ${activity.title}`}
          layout="fill"
          objectFit="cover"
          className="group-hover:scale-105 transition-transform duration-300"
          data-ai-hint={activity.dataAiHint}
        />
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <CardTitle className="text-lg font-medium mb-1 text-primary group-hover:underline">{activity.title}</CardTitle>
        {/* <CardDescription className="text-xs text-muted-foreground mb-2">{activity.destination}</CardDescription> */}
        
        <div className="flex items-center text-sm text-muted-foreground my-2">
          <StarRating rating={activity.rating} reviewsCount={Math.floor(Math.random() * 200) + 50} /> {/* ReviewsCount simulado */}
        </div>
        <div className="flex items-center text-sm text-muted-foreground mb-1">
          <Clock className="h-4 w-4 mr-1.5" />
          <span>{activity.duration}</span>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-2 border-t mt-auto"> {/* mt-auto para empujar al fondo si el contenido es variable */}
        <div className="flex flex-col w-full">
            <div className="flex items-baseline justify-end text-right mb-2">
              <span className="text-xs text-muted-foreground mr-1">Desde</span>
              <span className="text-xl font-bold text-primary">{priceDisplay}</span>
            </div>
            <Button asChild className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
              <Link href={`/activities/${activity.id}`}>
                Ver Detalles <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
