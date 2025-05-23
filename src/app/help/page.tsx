
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Mail, Phone, HelpCircle } from "lucide-react"; 
import Link from "next/link";

const faqs = [
  {
    question: "¿Cómo reservo una actividad?",
    answer: "Para reservar una actividad, simplemente navega por nuestra selección, elige la actividad deseada, selecciona tu fecha y número de participantes, y procede al pago. Recibirás un correo de confirmación una vez completada tu reserva."
  },
  {
    question: "¿Cuál es su política de cancelación?",
    answer: "Las políticas de cancelación varían según la actividad. Por favor, consulta la página de detalles de la actividad específica para su política de cancelación. Muchas actividades ofrecen cancelación gratuita hasta 24-48 horas antes de la hora de inicio."
  },
  {
    question: "¿Cómo puedo encontrar los detalles de mi reserva?",
    answer: "Puedes encontrar todos los detalles de tu reserva en la sección 'Mis Reservas' de tu cuenta. También recibirás un correo de confirmación con toda la información necesaria."
  },
  {
    question: "¿Qué métodos de pago aceptan?",
    answer: "Aceptamos las principales tarjetas de crédito (Visa, MasterCard, American Express) y PayPal. Todos los pagos se procesan de forma segura."
  },
  {
    question: "¿Cómo contacto con el servicio de atención al cliente?",
    answer: "Puedes contactar a nuestro equipo de atención al cliente por correo electrónico en soporte@travely.example.com o por teléfono al +34-900-123-456. Estamos disponibles 24/7 para ayudarte."
  }
];

export default function HelpPage() {
  return (
    <div className="container mx-auto px-4 py-8"> {/* Añadido py-8 */}
      <div className="space-y-12">
        <Card className="shadow-lg text-center rounded-lg">
          <CardHeader>
            <div className="flex flex-col items-center mb-2">
              <HelpCircle className="h-12 w-12 text-primary mb-3"/>
              <CardTitle className="text-3xl font-bold text-primary">Centro de Ayuda</CardTitle>
            </div>
            <CardDescription className="text-lg">¿Cómo podemos ayudarte hoy?</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="w-full max-w-lg mx-auto flex items-center gap-2">
              <Input
                type="search"
                placeholder="Buscar artículos de ayuda..."
                className="flex-grow"
                aria-label="Buscar artículos de ayuda"
              />
              <Button type="submit" variant="default" className="bg-primary hover:bg-primary/90">
                <Search className="mr-2 h-4 w-4" /> Buscar
              </Button>
            </form>
          </CardContent>
        </Card>

        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-6 text-center">Preguntas Frecuentes</h2>
          <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-b last:border-b-0">
                <AccordionTrigger className="text-left hover:no-underline text-md font-medium py-4">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        <section className="text-center">
          <h2 className="text-2xl font-semibold text-foreground mb-6">¿Aún Necesitas Ayuda?</h2>
          <Card className="max-w-md mx-auto shadow-md rounded-lg">
              <CardHeader>
                  <CardTitle className="text-xl text-primary">Contáctanos</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                      Nuestro equipo de soporte está listo para asistirte.
                  </p>
                  <Button asChild variant="outline" className="w-full hover:border-primary hover:text-primary">
                      <Link href="mailto:soporte@travely.example.com">
                          <Mail className="mr-2 h-4 w-4" /> Enviar Email
                      </Link>
                  </Button>
                  <Button asChild variant="outline" className="w-full hover:border-primary hover:text-primary">
                      <Link href="tel:+34900123456">
                          <Phone className="mr-2 h-4 w-4" /> Llámanos
                      </Link>
                  </Button>
              </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
