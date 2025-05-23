
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Cookie } from 'lucide-react';

export default function CookiesPage() {
  return (
    <div className="container mx-auto px-4 py-8"> {/* Añadido py-8 */}
      <Card className="shadow-lg rounded-lg">
        <CardHeader>
          <div className="flex items-center mb-2">
            <Cookie className="h-8 w-8 text-primary mr-3"/>
            <CardTitle className="text-3xl font-bold text-primary">Política de Cookies</CardTitle>
          </div>
          <CardDescription>Información sobre cómo usamos las cookies.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-muted-foreground">
          <p>
            Esta es la Política de Cookies para Travely, accesible desde [tu-dominio.com].
          </p>
          <section>
            <h2 className="text-xl font-semibold text-foreground mb-2 mt-4">¿Qué Son las Cookies?</h2>
            <p>
              Como es práctica común en casi todos los sitios web profesionales, este sitio utiliza cookies, que son pequeños archivos que se descargan en tu computadora, para mejorar tu experiencia. Esta página describe qué información recopilan, cómo la usamos y por qué a veces necesitamos almacenar estas cookies. También compartiremos cómo puedes evitar que estas cookies se almacenen, sin embargo, esto puede degradar o 'romper' ciertos elementos de la funcionalidad del sitio.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-foreground mb-2 mt-4">Cómo Usamos las Cookies</h2>
            <p>
              Utilizamos cookies por una variedad de razones detalladas a continuación. Desafortunadamente, en la mayoría de los casos no existen opciones estándar de la industria para deshabilitar las cookies sin deshabilitar completamente la funcionalidad y las características que agregan a este sitio. Se recomienda que dejes activadas todas las cookies si no estás seguro de si las necesitas o no, en caso de que se utilicen para proporcionar un servicio que utilizas.
            </p>
          </section>
           <section>
            <h2 className="text-xl font-semibold text-foreground mb-2 mt-4">Deshabilitar Cookies</h2>
            <p>
             Puedes evitar la configuración de cookies ajustando la configuración de tu navegador (consulta la Ayuda de tu navegador para saber cómo hacerlo). Ten en cuenta que deshabilitar las cookies afectará la funcionalidad de este y muchos otros sitios web que visites. La desactivación de cookies generalmente resultará también en la desactivación de ciertas funcionalidades y características de este sitio. Por lo tanto, se recomienda que no deshabilites las cookies.
            </p>
          </section>
          <p className="mt-6 font-semibold text-foreground">
            El contenido completo de esta página está en desarrollo y este es solo un ejemplo. Asegúrate de que tu política de cookies sea precisa y cumpla con las leyes de privacidad.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
