
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Handshake } from 'lucide-react';

export default function AffiliatesPage() {
  return (
    <div className="container mx-auto px-4 py-8"> {/* Añadido py-8 */}
      <Card className="shadow-lg rounded-lg">
        <CardHeader>
          <div className="flex items-center mb-2">
            <Handshake className="h-8 w-8 text-primary mr-3"/>
            <CardTitle className="text-3xl font-bold text-primary">Programa de Afiliados</CardTitle>
          </div>
          <CardDescription>Colabora con Travely y monetiza tu audiencia de viajes.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Nuestro programa de afiliados está diseñado para bloggers de viajes, influencers y sitios web que deseen ofrecer a sus usuarios acceso a miles de actividades turísticas en todo el mundo, ¡y ganar comisiones por ello!
          </p>
          <p className="mt-4 text-muted-foreground">
            Estamos finalizando los detalles de nuestro programa. Si estás interesado en convertirte en afiliado de Travely, por favor, vuelve a visitar esta página próximamente para más información sobre cómo registrarte y empezar a colaborar.
          </p>
          <p className="mt-4 text-muted-foreground">
            ¡Esperamos con interés la posibilidad de trabajar juntos!
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
