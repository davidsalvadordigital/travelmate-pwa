import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const destinations = [
  { name: 'Paris, France', image: 'https://placehold.co/600x400.png', dataAiHint: 'Paris EiffelTower', href: '/destinations/paris' },
  { name: 'Rome, Italy', image: 'https://placehold.co/600x400.png', dataAiHint: 'Rome Colosseum', href: '/destinations/rome' },
  { name: 'Kyoto, Japan', image: 'https://placehold.co/600x400.png', dataAiHint: 'Kyoto Temple', href: '/destinations/kyoto' },
  { name: 'New York, USA', image: 'https://placehold.co/600x400.png', dataAiHint: 'NewYork Skyline', href: '/destinations/new-york' },
];

export function PopularDestinations() {
  return (
    <section>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-foreground">Popular Destinations</h2>
        <Button variant="link" asChild className="text-primary hover:text-primary/80">
          <Link href="/destinations">
            View All <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {destinations.map((dest) => (
          <Card key={dest.name} className="overflow-hidden hover:shadow-xl transition-shadow duration-300 group">
            <CardHeader className="p-0 relative h-48">
              <Image
                src={dest.image}
                alt={`Image of ${dest.name}`}
                layout="fill"
                objectFit="cover"
                className="group-hover:scale-105 transition-transform duration-300"
                data-ai-hint={dest.dataAiHint}
              />
            </CardHeader>
            <CardContent className="p-4">
              <CardTitle className="text-xl mb-2 group-hover:text-primary transition-colors">{dest.name}</CardTitle>
              <Button variant="outline" asChild className="w-full mt-2">
                <Link href={dest.href}>Explore Activities</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
