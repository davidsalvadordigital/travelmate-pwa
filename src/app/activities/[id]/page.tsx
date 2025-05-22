import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { CalendarDays, Users, Star, MapPin, ListChecks, Info, ChevronLeft, ChevronRight } from 'lucide-react';
import { ImageGallery } from '@/components/activity-detail/image-gallery';
import { BookingSection } from '@/components/activity-detail/booking-section';
import { DetailTabs } from '@/components/activity-detail/detail-tabs';
import type { Activity } from '@/components/activities/activity-card'; // Re-use type

// Mock data for a single activity
const mockActivity: Activity & {
  description: string;
  images: { src: string, alt: string, dataAiHint: string }[];
  inclusions: string[];
  exclusions: string[];
  meetingPoint: string;
  reviews: { user: string, rating: number, comment: string, date: string }[];
} = {
  id: '1',
  title: 'Eiffel Tower Summit Experience with Guided Tour',
  duration: '2 hours',
  rating: 4.5,
  priceRange: '$50 - $70', // This might become a specific price here
  image: 'https://placehold.co/1200x800.png',
  dataAiHint: 'Eiffel Tower view',
  destination: 'Paris, France',
  description: 'Ascend to the summit of the iconic Eiffel Tower for breathtaking panoramic views of Paris. This experience includes a guided tour providing fascinating insights into the history and architecture of this world-famous landmark. Skip-the-line access ensures you make the most of your time.',
  images: [
    { src: 'https://placehold.co/1200x800.png', alt: 'Eiffel Tower view from summit', dataAiHint: 'Paris cityscape' },
    { src: 'https://placehold.co/1200x800.png', alt: 'Eiffel Tower structure detail', dataAiHint: 'Eiffel Tower architecture' },
    { src: 'https://placehold.co/1200x800.png', alt: 'Tour group at Eiffel Tower', dataAiHint: 'tourists Paris' },
  ],
  inclusions: ['Eiffel Tower summit access ticket', 'Professional guide', 'Small group tour', 'Skip-the-line access'],
  exclusions: ['Hotel pickup and drop-off', 'Gratuities', 'Food and drinks'],
  meetingPoint: 'Meet your guide at the base of the Eiffel Tower, near the North Pillar. Look for the "Travely" sign.',
  reviews: [
    { user: 'Alice B.', rating: 5, comment: 'Absolutely stunning views and our guide was fantastic!', date: '2024-07-15' },
    { user: 'John D.', rating: 4, comment: 'Great experience, though a bit crowded at the top.', date: '2024-07-10' },
  ],
};


export default function ActivityDetailPage({ params }: { params: { id: string } }) {
  // In a real app, fetch activity data based on params.id
  const activity = mockActivity; 

  if (!activity) {
    return <p>Activity not found.</p>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="mb-6 shadow-lg overflow-hidden">
        <ImageGallery images={activity.images} />
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-primary">{activity.title}</CardTitle>
              <CardDescription className="text-md text-muted-foreground flex items-center gap-4 pt-2">
                <span className="flex items-center"><MapPin className="h-4 w-4 mr-1" /> {activity.destination}</span>
                <span className="flex items-center"><Star className="h-4 w-4 mr-1 text-yellow-400 fill-yellow-400" /> {activity.rating.toFixed(1)} ({activity.reviews.length} reviews)</span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-foreground leading-relaxed">{activity.description}</p>
            </CardContent>
          </Card>
          
          <DetailTabs activity={activity} />
        </div>

        <div className="lg:col-span-1">
          <BookingSection activity={activity} />
        </div>
      </div>
    </div>
  );
}
