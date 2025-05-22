import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Info, ListChecks, Users, MapPinIcon, Star } from 'lucide-react';
import type { Activity } from '@/components/activities/activity-card';

interface DetailTabsProps {
  activity: Activity & {
    description: string;
    inclusions: string[];
    exclusions: string[];
    meetingPoint: string;
    reviews: { user: string, rating: number, comment: string, date: string }[];
  };
}

function StarRatingDisplay({ rating, maxStars = 5 }: { rating: number; maxStars?: number }) {
  return (
    <div className="flex items-center">
      {[...Array(maxStars)].map((_, i) => (
        <Star key={i} className={`h-5 w-5 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
      ))}
    </div>
  );
}

export function DetailTabs({ activity }: DetailTabsProps) {
  return (
    <Card className="shadow-md">
      <CardContent className="p-0">
        <Tabs defaultValue="description" className="w-full">
          <TabsList className="grid w-full grid-cols-3 md:grid-cols-5 rounded-t-lg rounded-b-none p-1 h-auto">
            <TabsTrigger value="description" className="text-xs sm:text-sm py-2.5"><Info className="h-4 w-4 mr-1 md:mr-2 hidden sm:inline-block" />Description</TabsTrigger>
            <TabsTrigger value="inclusions" className="text-xs sm:text-sm py-2.5"><ListChecks className="h-4 w-4 mr-1 md:mr-2 hidden sm:inline-block" />Inclusions</TabsTrigger>
            <TabsTrigger value="exclusions" className="text-xs sm:text-sm py-2.5"><ListChecks className="h-4 w-4 mr-1 md:mr-2 hidden sm:inline-block" />Exclusions</TabsTrigger>
            <TabsTrigger value="meeting-point" className="text-xs sm:text-sm py-2.5"><MapPinIcon className="h-4 w-4 mr-1 md:mr-2 hidden sm:inline-block" />Meeting Point</TabsTrigger>
            <TabsTrigger value="reviews" className="text-xs sm:text-sm py-2.5"><Star className="h-4 w-4 mr-1 md:mr-2 hidden sm:inline-block" />Reviews</TabsTrigger>
          </TabsList>

          <div className="p-6">
            <TabsContent value="description">
              <h3 className="text-xl font-semibold mb-3 text-foreground">Activity Description</h3>
              <p className="text-muted-foreground leading-relaxed whitespace-pre-line">{activity.description}</p>
            </TabsContent>

            <TabsContent value="inclusions">
              <h3 className="text-xl font-semibold mb-3 text-foreground">What's Included</h3>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                {activity.inclusions.map((item, index) => <li key={index}>{item}</li>)}
              </ul>
            </TabsContent>

            <TabsContent value="exclusions">
              <h3 className="text-xl font-semibold mb-3 text-foreground">What's Not Included</h3>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                {activity.exclusions.map((item, index) => <li key={index}>{item}</li>)}
              </ul>
            </TabsContent>

            <TabsContent value="meeting-point">
              <h3 className="text-xl font-semibold mb-3 text-foreground">Meeting Point</h3>
              <p className="text-muted-foreground leading-relaxed">{activity.meetingPoint}</p>
              {/* Optionally, add a map component here */}
            </TabsContent>

            <TabsContent value="reviews">
              <h3 className="text-xl font-semibold mb-3 text-foreground">Customer Reviews ({activity.reviews.length})</h3>
              {activity.reviews.length > 0 ? (
                <div className="space-y-6">
                  {activity.reviews.map((review, index) => (
                    <Card key={index} className="bg-secondary/50 p-4 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                           <div className="bg-primary text-primary-foreground rounded-full h-8 w-8 flex items-center justify-center text-sm font-semibold mr-3">
                            {review.user.substring(0,1)}
                          </div>
                          <span className="font-semibold text-foreground">{review.user}</span>
                        </div>
                        <StarRatingDisplay rating={review.rating} />
                      </div>
                      <p className="text-sm text-muted-foreground mb-1 italic">"{review.comment}"</p>
                      <p className="text-xs text-muted-foreground/70">{new Date(review.date).toLocaleDateString()}</p>
                    </Card>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">No reviews yet for this activity.</p>
              )}
            </TabsContent>
          </div>
        </Tabs>
      </CardContent>
    </Card>
  );
}
