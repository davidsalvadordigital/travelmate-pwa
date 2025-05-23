
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ShieldCheck } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4">
      <Card className="shadow-lg rounded-lg">
        <CardHeader>
          <div className="flex items-center mb-2">
            <ShieldCheck className="h-8 w-8 text-primary mr-3"/>
            <CardTitle className="text-3xl font-bold text-primary">Política de Privacidad</CardTitle>
          </div>
          <CardDescription>Tu privacidad es importante para nosotros.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-muted-foreground">
          <p>
            En Travely, accesible desde [tu-dominio.com], una de nuestras principales prioridades es la privacidad de nuestros visitantes. Este documento de Política de Privacidad contiene tipos de información que es recopilada y registrada por Travely y cómo la usamos.
          </p>
          <section>
            <h2 className="text-xl font-semibold text-foreground mb-2 mt-4">1. Información que Recopilamos</h2>
            <p>
              La información personal que se te pide que proporciones, y las razones por las que se te pide que la proporciones, se te aclararán en el momento en que te pidamos que proporciones tu información personal.
            </p>
            <p className="mt-2">
              Si te pones en contacto con nosotros directamente, podemos recibir información adicional sobre ti, como tu nombre, dirección de correo electrónico, número de teléfono, el contenido del mensaje y/o archivos adjuntos que puedas enviarnos, y cualquier otra información que decidas proporcionar.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-foreground mb-2 mt-4">2. Cómo Usamos tu Información</h2>
            <p>
              Usamos la información que recopilamos de varias maneras, incluyendo para:
            </p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>Proveer, operar y mantener nuestro sitio web</li>
              <li>Mejorar, personalizar y expandir nuestro sitio web</li>
              <li>Entender y analizar cómo utilizas nuestro sitio web</li>
              <li>Desarrollar nuevos productos, servicios, características y funcionalidades</li>
              <li>Comunicarnos contigo, ya sea directamente o a través de uno de nuestros socios, incluyendo para servicio al cliente, para proporcionarte actualizaciones y otra información relacionada con el sitio web, y para fines de marketing y promoción</li>
              <li>Enviarte correos electrónicos</li>
              <li>Encontrar y prevenir el fraude</li>
            </ul>
          </section>
          <p className="mt-6 font-semibold text-foreground">
            El contenido completo de esta página está en desarrollo y este es solo un ejemplo. Es crucial que esta política sea completa y cumpla con las regulaciones aplicables (ej. GDPR, CCPA). Consulta con un profesional legal.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
