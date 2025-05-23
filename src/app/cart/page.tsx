
"use client"; 

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCart, XCircle, ArrowRight, Trash2 } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useToast } from "@/hooks/use-toast"; 

interface CartItem {
  id: string;
  title: string;
  image: string;
  dataAiHint: string;
  date: string; // Podría ser tipo Date para más flexibilidad, pero string es simple para mock
  time: string;
  participants: number;
  pricePerParticipant: number;
  currency: string;
}

const initialMockCartItems: CartItem[] = [
  {
    id: '1',
    title: 'Paseo en barco por el Sena',
    image: 'https://placehold.co/600x400.png',
    dataAiHint: 'paseo barco sena',
    date: '2024-09-15',
    time: '14:00',
    participants: 2,
    pricePerParticipant: 19.25,
    currency: 'US$',
  },
  {
    id: '3',
    title: 'Visita guiada por el Museo del Louvre',
    image: 'https://placehold.co/600x400.png',
    dataAiHint: 'Louvre Mona Lisa',
    date: '2024-09-18',
    time: '10:00',
    participants: 1,
    pricePerParticipant: 90.61,
    currency: 'US$',
  }
];

// Control para decidir si mostrar datos de ejemplo o empezar con carrito vacío
const showMockDataOnLoad = true; 

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const { toast } = useToast();

  // Cargar datos de ejemplo solo una vez al montar el componente si showMockDataOnLoad es true
  useEffect(() => {
    if (showMockDataOnLoad) {
      setCartItems(initialMockCartItems);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // El array de dependencias vacío asegura que esto solo se ejecute al montar

  const subtotal = cartItems.reduce((sum, item) => sum + item.pricePerParticipant * item.participants, 0);
  const currency = cartItems.length > 0 ? cartItems[0].currency : 'US$';

  const handleRemoveItem = (itemId: string, itemTitle: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
    toast({
      title: "Artículo Eliminado",
      description: `"${itemTitle}" se ha eliminado de tu carrito.`,
      variant: "default", 
    });
  };

  const handleProceedToPayment = () => {
    if (cartItems.length === 0) {
      toast({
        title: "Carrito Vacío",
        description: "Añade actividades a tu carrito antes de proceder al pago.",
        variant: "destructive",
      });
      return;
    }
    // Lógica de pago (simulada con un toast por ahora)
    toast({
      title: "Procesando Pago...",
      description: "Esta funcionalidad aún no está implementada. ¡Gracias por tu comprensión!",
      variant: "default"
    });
    console.log("Simulación: Procediendo al pago con los siguientes artículos:", cartItems);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-8">
        <CardHeader className="px-0 pt-0">
          <div className="flex items-center mb-2">
            <ShoppingCart className="h-8 w-8 text-primary mr-3"/>
            <CardTitle className="text-3xl font-bold text-primary">Tu Carrito de Compras</CardTitle>
          </div>
          {cartItems.length > 0 && <CardDescription>Revisa tus actividades seleccionadas y procede al pago.</CardDescription>}
        </CardHeader>

        {cartItems.length > 0 ? (
          <div className="grid lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <Card key={item.id} className="shadow-md rounded-lg overflow-hidden">
                  <CardContent className="p-4 flex flex-col sm:flex-row gap-4">
                    <div className="relative w-full sm:w-40 h-32 sm:h-auto rounded-md overflow-hidden shrink-0">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill 
                        style={{ objectFit: 'cover' }}
                        data-ai-hint={item.dataAiHint}
                      />
                    </div>
                    <div className="flex-grow">
                      <CardTitle className="text-lg text-primary mb-1">{item.title}</CardTitle>
                      <p className="text-sm text-muted-foreground">Fecha: {item.date} a las {item.time}</p>
                      <p className="text-sm text-muted-foreground">Participantes: {item.participants}</p>
                      <p className="text-md font-semibold mt-2">
                        Precio: {(item.pricePerParticipant * item.participants).toFixed(2)} {item.currency}
                      </p>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="text-destructive hover:bg-destructive/10 self-start sm:self-center shrink-0"
                      onClick={() => handleRemoveItem(item.id, item.title)} 
                      aria-label="Eliminar del carrito"
                    >
                      <Trash2 className="h-5 w-5" />
                      <span className="sr-only">Eliminar del carrito</span>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="lg:col-span-1 sticky top-24">
              <Card className="shadow-lg rounded-lg">
                <CardHeader>
                  <CardTitle className="text-xl">Resumen del Pedido</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Subtotal ({cartItems.length} artículo{cartItems.length !== 1 ? 's':''}):</span>
                    <span>{subtotal.toFixed(2)} {currency}</span>
                  </div>
                  {/* Aquí podrían ir descuentos, impuestos, etc. */}
                  <div className="flex justify-between font-semibold text-lg text-foreground border-t pt-3 mt-3">
                    <span>Total Estimado:</span>
                    <span className="text-primary">{subtotal.toFixed(2)} {currency}</span>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col gap-3">
                  <Button 
                    size="lg" 
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                    onClick={handleProceedToPayment}
                  >
                    Proceder al Pago <ArrowRight className="ml-2 h-4 w-4"/>
                  </Button>
                  <Button variant="outline" asChild className="w-full">
                    <Link href="/activities">Seguir Comprando</Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        ) : (
          <Card className="shadow-lg rounded-lg">
            <CardContent className="p-10 text-center">
              <XCircle className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Tu Carrito está Vacío</h3>
              <p className="text-muted-foreground mb-6">
                Parece que aún no has añadido ninguna actividad. ¡Explora nuestras ofertas y llena tu viaje de experiencias!
              </p>
              <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 text-base">
                <Link href="/activities">Explorar Actividades</Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
