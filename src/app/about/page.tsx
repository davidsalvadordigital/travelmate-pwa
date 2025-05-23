
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Info } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4">
      <Card className="shadow-lg rounded-lg">
        <CardHeader>
          <div className="flex items-center mb-2">
            <Info className="h-8 w-8 text-primary mr-3"/>
            <CardTitle className="text-3xl font-bold text-primary">Quiénes Somos</CardTitle>
          </div>
          <CardDescription>Conoce más sobre Travely y nuestra misión.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            En Travely, nuestra pasión es ayudarte a descubrir el mundo y vivir experiencias inolvidables. Somos un equipo de viajeros entusiastas dedicados a ofrecerte las mejores actividades y tours en español, cuidadosamente seleccionados en destinos de todo el planeta.
          </p>
          <p className="mt-4 text-muted-foreground">
            Nuestra plataforma está diseñada para que planificar tus aventuras sea fácil, seguro y emocionante. Desde visitas guiadas a monumentos icónicos hasta escapadas llenas de adrenalina, tenemos algo para cada tipo de viajero.
          </p>
          <p className="mt-4 text-muted-foreground">
            <strong>Nuestra Misión:</strong> Llenar tu viaje de momentos memorables, conectándote con la cultura, la historia y la belleza de cada lugar.
          </p>
          <p className="mt-4 text-muted-foreground">
            Contenido de esta página está en desarrollo. ¡Vuelve pronto para más detalles!
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
