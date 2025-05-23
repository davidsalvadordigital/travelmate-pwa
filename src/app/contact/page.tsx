
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Mail, Phone, MessageSquare } from 'lucide-react';
import Link from 'next/link';

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-8"> {/* Añadido py-8 */}
      <Card className="shadow-lg rounded-lg">
        <CardHeader className="text-center">
          <div className="flex flex-col items-center mb-2">
            <MessageSquare className="h-12 w-12 text-primary mb-3"/>
            <CardTitle className="text-3xl font-bold text-primary">Contáctanos</CardTitle>
          </div>
          <CardDescription className="text-lg">¿Tienes preguntas o necesitas ayuda? Estamos aquí para ti.</CardDescription>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-8 items-start">
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Envíanos un Mensaje</h3>
              <form className="space-y-4">
                <div>
                  <Label htmlFor="name">Nombre Completo</Label>
                  <Input id="name" placeholder="Tu nombre" />
                </div>
                <div>
                  <Label htmlFor="email">Correo Electrónico</Label>
                  <Input id="email" type="email" placeholder="tu@ejemplo.com" />
                </div>
                <div>
                  <Label htmlFor="subject">Asunto</Label>
                  <Input id="subject" placeholder="Asunto de tu consulta" />
                </div>
                <div>
                  <Label htmlFor="message">Mensaje</Label>
                  <Textarea id="message" placeholder="Escribe tu mensaje aquí..." rows={5} />
                </div>
                <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">Enviar Mensaje</Button>
              </form>
            </div>
          </div>
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Información de Contacto</h3>
              <div className="space-y-3">
                <Link href="mailto:soporte@travely.example.com" className="flex items-center text-muted-foreground hover:text-primary transition-colors group">
                  <Mail className="h-5 w-5 mr-3 text-primary group-hover:animate-pulse" />
                  <span>soporte@travely.example.com</span>
                </Link>
                <Link href="tel:+34900123456" className="flex items-center text-muted-foreground hover:text-primary transition-colors group">
                  <Phone className="h-5 w-5 mr-3 text-primary group-hover:animate-pulse" />
                  <span>+34 900 123 456 (Atención 24/7)</span>
                </Link>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Preguntas Frecuentes</h3>
              <p className="text-muted-foreground mb-3">
                Muchas respuestas a tus preguntas se pueden encontrar en nuestro centro de ayuda.
              </p>
              <Button variant="outline" asChild className="border-primary text-primary hover:bg-primary/5">
                <Link href="/help">Visitar Centro de Ayuda</Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
