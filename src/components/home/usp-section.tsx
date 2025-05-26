
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BadgeDollarSign, Users, CheckCircle2, ShieldCheck, SmilePlus } from 'lucide-react';

const usps = [
  { title: 'Mejor Precio Garantizado', description: 'Encuentra las mejores ofertas en actividades en todo el mundo.', icon: BadgeDollarSign },
  { title: 'Guías Locales Expertos', description: 'Guías conocedores para una experiencia auténtica.', icon: Users },
  { title: 'Reserva Fácil y Segura', description: 'Reserva online rápida, sin complicaciones y segura.', icon: CheckCircle2 },
  { title: 'Cancelación Flexible', description: 'Tranquilidad con políticas de cancelación flexibles.', icon: ShieldCheck },
  { title: 'Atención al Cliente 24/7', description: 'Estamos aquí para ayudarte en cualquier momento y lugar.', icon: SmilePlus },
];

export function UspSection() {
  return (
    <section className="bg-secondary py-16"> {/* Fondo rosa pálido de ancho completo */}
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-foreground mb-10 text-center">¿Por Qué Reservar Con Travely?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {usps.map((usp, index) => (
            <Card key={index} className="text-center border-none shadow-lg bg-card hover:scale-105 transition-transform duration-300">
              <CardHeader className="flex flex-col items-center">
                <div className="p-3 bg-primary/10 rounded-full mb-3">
                  <usp.icon className="h-10 w-10 text-primary" />
                </div>
                <CardTitle className="text-xl text-foreground">{usp.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">{usp.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
