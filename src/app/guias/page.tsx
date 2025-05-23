
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpenText } from 'lucide-react';

export default function GuidesPage() {
  return (
    <div className="container mx-auto px-4">
      <Card className="shadow-lg rounded-lg">
        <CardHeader>
          <div className="flex items-center mb-2">
            <BookOpenText className="h-8 w-8 text-primary mr-3"/>
            <CardTitle className="text-3xl font-bold text-primary">Guías de Destinos</CardTitle>
          </div>
          <CardDescription>Explora nuestros destinos en profundidad con las guías de Travely.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Nuestras guías de destinos están diseñadas para ofrecerte toda la información que necesitas para planificar tu viaje perfecto. Desde atracciones imprescindibles y consejos locales hasta recomendaciones gastronómicas y culturales.
          </p>
          <p className="mt-4 text-muted-foreground">
            Estamos trabajando arduamente para crear guías completas y actualizadas para una amplia variedad de destinos. ¡Visítanos pronto para explorar el mundo con Travely!
          </p>
           {/* Aquí iría un listado de guías de destino */}
           <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {['París', 'Roma', 'Nueva York'].map(city => (
              <Card key={city} className="shadow-md hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-xl text-primary">Guía de {city}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Descubre los secretos de {city}. Próximamente...</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
