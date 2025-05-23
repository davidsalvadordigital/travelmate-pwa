
import { PopularDestinations } from '@/components/home/popular-destinations'; 
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Compass } from 'lucide-react'; 

export default function DestinationsPage() {
  return (
    <div className="container mx-auto px-4">
      <div className="space-y-8">
        <Card className="shadow-lg rounded-lg">
          <CardHeader>
            <div className="flex items-center mb-2">
              <Compass className="h-8 w-8 text-primary mr-3"/>
              <CardTitle className="text-3xl font-bold text-primary">Explora Destinos</CardTitle>
            </div>
            <CardDescription>Encuentra tu próxima aventura en nuestra lista curada de lugares increíbles.</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="flex items-center gap-2 mb-8">
              <Input
                type="search"
                placeholder="Busca un destino..."
                className="flex-grow"
                aria-label="Buscar destinos"
              />
              <Button type="submit" variant="default" className="bg-primary hover:bg-primary/90">
                <Search className="mr-2 h-4 w-4" /> Buscar
              </Button>
            </form>
          </CardContent>
        </Card>
        
        <PopularDestinations /> 

        <section className="mt-12">
          <h2 className="text-2xl font-semibold text-foreground mb-4">Más Para Explorar</h2>
          <Card className="rounded-lg shadow-sm">
            <CardContent className="p-6">
              <p className="text-muted-foreground">
                Descubre joyas ocultas y puntos de interés populares. Nuestros expertos en viajes han seleccionado los mejores destinos para cada tipo de viajero. 
                Ya sea que busques unas relajantes vacaciones en la playa, una aventurera caminata por la montaña o una escapada cultural a la ciudad, Travely tiene algo para ti.
              </p>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
