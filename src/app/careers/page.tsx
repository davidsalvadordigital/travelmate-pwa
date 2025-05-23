
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase } from 'lucide-react';

export default function CareersPage() {
  return (
    <div className="container mx-auto px-4">
      <Card className="shadow-lg rounded-lg">
        <CardHeader>
          <div className="flex items-center mb-2">
            <Briefcase className="h-8 w-8 text-primary mr-3"/>
            <CardTitle className="text-3xl font-bold text-primary">Trabaja con Nosotros</CardTitle>
          </div>
          <CardDescription>Únete al equipo de Travely y ayúdanos a crear experiencias de viaje inolvidables.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            ¿Te apasiona el mundo de los viajes y la tecnología? En Travely, siempre estamos buscando talento para unirse a nuestro equipo dinámico y multicultural.
          </p>
          <p className="mt-4 text-muted-foreground">
            Actualmente, el contenido detallado sobre oportunidades de carrera está en desarrollo. Si estás interesado en futuras vacantes, te invitamos a revisar esta sección más adelante.
          </p>
          <p className="mt-4 text-muted-foreground">
            ¡Gracias por tu interés en formar parte de Travely!
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
