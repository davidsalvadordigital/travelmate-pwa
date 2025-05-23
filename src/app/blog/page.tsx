
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Newspaper } from 'lucide-react';

export default function BlogPage() {
  return (
    <div className="container mx-auto px-4 py-8"> {/* Añadido py-8 */}
      <Card className="shadow-lg rounded-lg">
        <CardHeader>
          <div className="flex items-center mb-2">
            <Newspaper className="h-8 w-8 text-primary mr-3"/>
            <CardTitle className="text-3xl font-bold text-primary">Travely Blog</CardTitle>
          </div>
          <CardDescription>Inspiración, consejos y noticias del mundo de los viajes.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            ¡Bienvenido al Blog de Travely! Aquí encontrarás artículos inspiradores, guías detalladas, consejos prácticos para tus viajes y las últimas novedades sobre destinos y actividades.
          </p>
          <p className="mt-4 text-muted-foreground">
            Actualmente estamos preparando nuestro primer conjunto de publicaciones. ¡Vuelve pronto para descubrir contenido fascinante que te ayudará a planificar tu próxima aventura!
          </p>
          {/* Aquí iría un listado de artículos del blog */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1,2,3].map(item => (
              <Card key={item} className="shadow-md hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-xl text-primary">Próximo Artículo {item}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Descripción breve del futuro artículo del blog...</p>
                  <p className="text-xs text-muted-foreground mt-2">Fecha de publicación: Próximamente</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
