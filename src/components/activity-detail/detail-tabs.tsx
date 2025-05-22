import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Info, ListChecks, Users, MapPinIcon, Star, MessageSquare } from 'lucide-react'; // MessageSquare para reviews
import type { Activity } from '@/components/activities/activity-card';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"; // Para avatares de usuarios

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
        <Star key={i} className={`h-5 w-5 ${i < Math.round(rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
      ))}
    </div>
  );
}

export function DetailTabs({ activity }: DetailTabsProps) {
  return (
    <Card className="shadow-md rounded-lg">
      <CardContent className="p-0">
        <Tabs defaultValue="description" className="w-full">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-5 rounded-t-lg rounded-b-none p-1 h-auto bg-muted">
            <TabsTrigger value="description" className="text-xs sm:text-sm py-2.5 data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-sm">
              <Info className="h-4 w-4 mr-1 md:mr-2 hidden sm:inline-block" />Descripción
            </TabsTrigger>
            <TabsTrigger value="inclusions" className="text-xs sm:text-sm py-2.5 data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-sm">
              <ListChecks className="h-4 w-4 mr-1 md:mr-2 hidden sm:inline-block" />Incluye
            </TabsTrigger>
            <TabsTrigger value="exclusions" className="text-xs sm:text-sm py-2.5 data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-sm">
              <ListChecks className="h-4 w-4 mr-1 md:mr-2 hidden sm:inline-block" />No Incluye
            </TabsTrigger>
            <TabsTrigger value="meeting-point" className="text-xs sm:text-sm py-2.5 data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-sm">
              <MapPinIcon className="h-4 w-4 mr-1 md:mr-2 hidden sm:inline-block" />Punto de Encuentro
            </TabsTrigger>
            <TabsTrigger value="reviews" className="text-xs sm:text-sm py-2.5 data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-sm">
              <MessageSquare className="h-4 w-4 mr-1 md:mr-2 hidden sm:inline-block" />Opiniones
            </TabsTrigger>
          </TabsList>

          <div className="p-6">
            <TabsContent value="description">
              <h3 className="text-xl font-semibold mb-3 text-foreground">Descripción de la Actividad</h3>
              <p className="text-muted-foreground leading-relaxed whitespace-pre-line">{activity.description}</p>
            </TabsContent>

            <TabsContent value="inclusions">
              <h3 className="text-xl font-semibold mb-3 text-foreground">Qué Incluye</h3>
              <ul className="list-disc list-inside space-y-1.5 text-muted-foreground pl-2">
                {activity.inclusions.map((item, index) => <li key={index}>{item}</li>)}
              </ul>
            </TabsContent>

            <TabsContent value="exclusions">
              <h3 className="text-xl font-semibold mb-3 text-foreground">Qué No Incluye</h3>
              <ul className="list-disc list-inside space-y-1.5 text-muted-foreground pl-2">
                {activity.exclusions.map((item, index) => <li key={index}>{item}</li>)}
              </ul>
            </TabsContent>

            <TabsContent value="meeting-point">
              <h3 className="text-xl font-semibold mb-3 text-foreground">Punto de Encuentro</h3>
              <p className="text-muted-foreground leading-relaxed">{activity.meetingPoint}</p>
              {/* Opcionalmente, añadir un componente de mapa aquí */}
            </TabsContent>

            <TabsContent value="reviews">
              <h3 className="text-xl font-semibold mb-3 text-foreground">Opiniones de Clientes ({activity.reviews.length})</h3>
              {activity.reviews.length > 0 ? (
                <div className="space-y-6">
                  {activity.reviews.map((review, index) => (
                    <Card key={index} className="bg-muted/50 p-4 rounded-lg border">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center">
                           <Avatar className="h-10 w-10 mr-3">
                             <AvatarImage src={`https://placehold.co/40x40.png?text=${review.user.substring(0,1)}`} alt={review.user} data-ai-hint="persona retrato" />
                             <AvatarFallback>{review.user.substring(0,1)}</AvatarFallback>
                           </Avatar>
                           <div>
                            <span className="font-semibold text-foreground">{review.user}</span>
                            <p className="text-xs text-muted-foreground/80">{new Date(review.date).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                           </div>
                        </div>
                        <StarRatingDisplay rating={review.rating} />
                      </div>
                      <p className="text-sm text-foreground leading-relaxed ml-13">{review.comment}</p> {/* Alineado con el texto del nombre */}
                    </Card>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">Aún no hay opiniones para esta actividad.</p>
              )}
            </TabsContent>
          </div>
        </Tabs>
      </CardContent>
    </Card>
  );
}
