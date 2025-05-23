
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText } from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-8"> {/* Añadido py-8 */}
      <Card className="shadow-lg rounded-lg">
        <CardHeader>
          <div className="flex items-center mb-2">
            <FileText className="h-8 w-8 text-primary mr-3"/>
            <CardTitle className="text-3xl font-bold text-primary">Condiciones Generales</CardTitle>
          </div>
          <CardDescription>Por favor, lee nuestros términos y condiciones cuidadosamente.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-muted-foreground">
          <p>
            Bienvenido a Travely. Estos términos y condiciones describen las reglas y regulaciones para el uso del sitio web de Travely, ubicado en [tu-dominio.com].
          </p>
          <p>
            Al acceder a este sitio web, asumimos que aceptas estos términos y condiciones. No continúes usando Travely si no estás de acuerdo con todos los términos y condiciones establecidos en esta página.
          </p>
          <section>
            <h2 className="text-xl font-semibold text-foreground mb-2 mt-4">1. Licencia</h2>
            <p>
              A menos que se indique lo contrario, Travely y/o sus licenciantes poseen los derechos de propiedad intelectual de todo el material en Travely. Todos los derechos de propiedad intelectual son reservados. Puedes acceder a esto desde Travely para tu propio uso personal sujeto a las restricciones establecidas en estos términos y condiciones.
            </p>
            <p className="mt-2">No debes:</p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>Republicar material de Travely</li>
              <li>Vender, alquilar o sublicenciar material de Travely</li>
              <li>Reproducir, duplicar o copiar material de Travely</li>
              <li>Redistribuir contenido de Travely</li>
            </ul>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-foreground mb-2 mt-4">2. Reservas y Pagos</h2>
            <p>
              Todas las reservas realizadas a través de Travely están sujetas a disponibilidad y confirmación. Los precios mostrados están en la moneda especificada y pueden estar sujetos a impuestos y tasas adicionales.
            </p>
          </section>
           <section>
            <h2 className="text-xl font-semibold text-foreground mb-2 mt-4">3. Cancelaciones y Reembolsos</h2>
            <p>
              Las políticas de cancelación varían según la actividad y se detallarán durante el proceso de reserva y en el correo de confirmación.
            </p>
          </section>
          <p className="mt-6 font-semibold text-foreground">
            El contenido completo de esta página está en desarrollo y este es solo un ejemplo. Por favor, consulta con un profesional legal para redactar tus términos y condiciones completos.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
