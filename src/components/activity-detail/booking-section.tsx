
"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Minus, Plus, ShoppingCart } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import type { Activity } from '@/components/activities/activity-card';
import { useCart } from '@/context/cart-context'; // Importar useCart

interface BookingSectionProps {
  activity: Activity; 
}

export function BookingSection({ activity }: BookingSectionProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [numberOfPeople, setNumberOfPeople] = useState(1);
  const [currentTotalPrice, setCurrentTotalPrice] = useState<number>(activity.price * numberOfPeople); // Usar el precio de la actividad
  const { addToCart } = useCart(); // Usar el hook del carrito

  useEffect(() => {
    if (numberOfPeople > 0 && activity.price !== undefined) {
      setCurrentTotalPrice(activity.price * numberOfPeople);
    } else {
      setCurrentTotalPrice(0);
    }
  }, [numberOfPeople, activity.price]);

  const handleAddToCart = () => {
    if (!selectedDate) {
      // Ya usamos useToast en el contexto, no es necesario aquí si el contexto lo maneja
      // (Asumiendo que el contexto mostrará errores o confirmaciones)
      alert("Por favor, selecciona una fecha para tu actividad."); // Placeholder, useToast es mejor
      return;
    }
    if (numberOfPeople <= 0) {
      alert("Por favor, especifica al menos una persona."); // Placeholder
      return;
    }
    
    addToCart(activity, selectedDate, numberOfPeople);
    // El toast de confirmación ahora se maneja dentro de addToCart en el contexto
  };

  return (
    <Card className="sticky top-24 shadow-xl rounded-lg">
      <CardHeader>
        <CardTitle className="text-2xl text-primary">Reservar Actividad</CardTitle>
        <CardDescription>Selecciona la fecha y el número de participantes.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label htmlFor="activity-date" className="font-medium">Fecha</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="activity-date"
                variant={"outline"}
                className="w-full justify-start text-left font-normal mt-1"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {selectedDate ? format(selectedDate, "PPP", { locale: es }) : <span>Elige una fecha</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                initialFocus
                locale={es}
                disabled={(date) => date < new Date(new Date().setDate(new Date().getDate() -1)) }
              />
            </PopoverContent>
          </Popover>
        </div>

        <div>
          <Label htmlFor="number-of-people" className="font-medium">Número de Personas</Label>
          <div className="flex items-center mt-1">
            <Button 
              variant="outline" 
              size="icon" 
              onClick={() => setNumberOfPeople(prev => Math.max(1, prev - 1))}
              disabled={numberOfPeople <= 1}
              aria-label="Disminuir número de personas"
            > <Minus className="h-4 w-4"/> </Button>
            <Input
              id="number-of-people"
              type="number"
              value={numberOfPeople}
              onChange={(e) => setNumberOfPeople(Math.max(1, parseInt(e.target.value) || 1))}
              min="1"
              className="w-16 text-center mx-2"
              aria-label="Número de personas"
            />
            <Button 
              variant="outline" 
              size="icon" 
              onClick={() => setNumberOfPeople(prev => prev + 1)}
              aria-label="Aumentar número de personas"
            > <Plus className="h-4 w-4"/> </Button>
          </div>
        </div>
        
        {currentTotalPrice > 0 && activity.price !== undefined && (
          <div className="pt-4 border-t">
            <p className="text-xl font-semibold text-foreground flex items-center justify-between">
              <span>Precio Total:</span>
              <span className="flex items-center text-primary">
                {activity.currency}{currentTotalPrice.toFixed(2)}
              </span>
            </p>
          </div>
        )}

      </CardContent>
      <CardFooter>
        <Button 
          size="lg" 
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-6 text-lg"
          onClick={handleAddToCart} // Cambiado a handleAddToCart
          disabled={!selectedDate || numberOfPeople <= 0 || activity.price === undefined}
        >
          <ShoppingCart className="mr-2 h-5 w-5" /> Añadir al Carrito
        </Button>
      </CardFooter>
    </Card>
  );
}
