import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, Star, DollarSign, ArrowRight } from 'lucide-react';

export interface Activity {
  id: string;
  title: string;
  duration: string;
  rating: number;
  priceRange: string;
  image: string;
  dataAiHint: string;
  destination: string; // Added for context
}

interface ActivityCardProps {
  activity: Activity;
}

function StarRating({ rating, maxStars = 5 }: { rating: number; maxStars?: number }) {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  const emptyStars = maxStars - fullStars - (halfStar ? 1 : 0);

  return (
    <div className="flex items-center">
      {[...Array(fullStars)].map((_, i) => (
        <Star key={`full-${i}`} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
      ))}
      {halfStar && <Star key="half" className="h-4 w-4 text-yellow-400 fill-yellow-300" />} {/* Simplified half star */}
      {[...Array(emptyStars)].map((_, i) => (
        <Star key={`empty-${i}`} className="h-4 w-4 text-gray-300" />
      ))}
      <span className="ml-1 text-xs text-muted-foreground">({rating.toFixed(1)})</span>
    </div>
  );
}


export function ActivityCard({ activity }: ActivityCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col h-full group">
      <CardHeader className="p-0 relative h-48">
        <Image
          src={activity.image}
          alt={`Image of ${activity.title}`}
          layout="fill"
          objectFit="cover"
          className="group-hover:scale-105 transition-transform duration-300"
          data-ai-hint={activity.dataAiHint}
        />
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <CardTitle className="text-lg mb-1 group-hover:text-primary transition-colors">{activity.title}</CardTitle>
        <CardDescription className="text-xs text-muted-foreground mb-2">{activity.destination}</CardDescription>
        
        <div className="flex items-center text-sm text-muted-foreground mb-1">
          <Clock className="h-4 w-4 mr-1.5" />
          <span>{activity.duration}</span>
        </div>
        <div className="flex items-center text-sm text-muted-foreground mb-2">
          <StarRating rating={activity.rating} />
        </div>
        <div className="flex items-center text-sm font-semibold text-foreground">
          <DollarSign className="h-4 w-4 mr-1 text-green-600" />
          <span>{activity.priceRange}</span>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button asChild className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
          <Link href={`/activities/${activity.id}`}>
            View Details <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
