import { ActivityCard } from '@/components/activities/activity-card';
import { Filters } from '@/components/activities/filters';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

// Mock data for activities
const activities = [
  { id: '1', title: 'Eiffel Tower Summit Experience', duration: '2 hours', rating: 4.5, priceRange: '$50 - $70', image: 'https://placehold.co/600x400.png', dataAiHint: 'Eiffel Tower', destination: 'Paris' },
  { id: '2', title: 'Colosseum & Roman Forum Tour', duration: '3 hours', rating: 4.8, priceRange: '$60 - $90', image: 'https://placehold.co/600x400.png', dataAiHint: 'Colosseum Rome', destination: 'Rome' },
  { id: '3', title: 'Kyoto Temples & Zen Gardens', duration: 'Full day', rating: 4.7, priceRange: '$100 - $150', image: 'https://placehold.co/600x400.png', dataAiHint: 'Kyoto Temple', destination: 'Kyoto' },
  { id: '4', title: 'Statue of Liberty & Ellis Island', duration: '4 hours', rating: 4.6, priceRange: '$40 - $60', image: 'https://placehold.co/600x400.png', dataAiHint: 'Statue Liberty', destination: 'New York' },
  { id: '5', title: 'Seine River Cruise', duration: '1 hour', rating: 4.3, priceRange: '$20 - $30', image: 'https://placehold.co/600x400.png', dataAiHint: 'Seine River', destination: 'Paris' },
  { id: '6', title: 'Vatican Museums & Sistine Chapel', duration: '3.5 hours', rating: 4.9, priceRange: '$70 - $100', image: 'https://placehold.co/600x400.png', dataAiHint: 'Vatican Museum', destination: 'Rome' },
];

export default function ActivitiesPage({ searchParams }: { searchParams?: { destination?: string; type?: string } }) {
  const destination = searchParams?.destination || 'All Destinations';
  const activityType = searchParams?.type;

  const filteredActivities = activities.filter(activity => {
    let matches = true;
    if (searchParams?.destination && activity.destination.toLowerCase() !== searchParams.destination.toLowerCase()) {
      matches = false;
    }
    // Basic type filtering example (can be expanded)
    if (activityType && !activity.title.toLowerCase().includes(activityType.replace(/s$/, ''))) { // Simple plural removal
      // matches = false; // This logic needs to be more robust based on actual activity types
    }
    return matches;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="mb-8 shadow-lg">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-primary">
            Activities in {destination}
            {activityType && ` - ${activityType.charAt(0).toUpperCase() + activityType.slice(1)}`}
          </CardTitle>
          <CardDescription>
            Browse and book amazing experiences for your trip.
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="flex flex-col md:flex-row gap-8">
        <aside className="w-full md:w-1/4 lg:w-1/5">
          <Filters />
        </aside>
        <main className="w-full md:w-3/4 lg:w-4/5">
          {filteredActivities.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredActivities.map((activity) => (
                <ActivityCard key={activity.id} activity={activity} />
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-6 text-center">
                <p className="text-lg text-muted-foreground">No activities found matching your criteria.</p>
                <p className="text-sm mt-2">Try adjusting your filters or exploring other destinations.</p>
              </CardContent>
            </Card>
          )}
          {/* Pagination could be added here */}
        </main>
      </div>
    </div>
  );
}
