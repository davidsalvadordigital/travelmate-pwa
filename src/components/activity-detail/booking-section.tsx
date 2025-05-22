"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Users, Minus, Plus, ShoppingCart, Euro } from 'lucide-react'; // DollarSign cambiado por Euro
import { format } from 'date-fns';
import { es } from 'date-fns/locale'; // Importar locale español
import type { Activity } from '@/components/activities/activity-card';
import { useToast } from "@/hooks/use-toast"


interface BookingSectionProps {
  activity: Activity & { priceRange: string }; 
}

export function BookingSection({ activity }: BookingSectionProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [numberOfPeople, setNumberOfPeople] = useState(1);
  const [totalPrice, setTotalPrice] = useState<number | null>(null);
  const { toast } = useToast();

  // Parseo de precio simplificado - asume que el límite inferior de priceRange es el precio por persona
  const basePricePerPerson = parseFloat(activity.priceRange.split('-')[0].replace('€', '').trim()) || 50;

  useEffect(() => {
    if (selectedDate && numberOfPeople > 0) {
      setTotalPrice(basePricePerPerson * numberOfPeople);
    } else {
      setTotalPrice(null);
    }
  }, [selectedDate, numberOfPeople, basePricePerPerson]);

  const handleBooking = () => {
    if (!selectedDate) {
      toast({
        title: "Error en la Reserva",
        description: "Por favor, selecciona una fecha para tu actividad.",
        variant: "destructive",
      });
      return;
    }
    if (numberOfPeople <= 0) {
      toast({
        title: "Error en la Reserva",
        description: "Por favor, especifica al menos una persona.",
        variant: "destructive",
      });
      return;
    }
    // Proceder con la lógica de reserva
    console.log('Detalles de la reserva:', { activityId: activity.id, date: selectedDate, people: numberOfPeople, totalPrice });
    toast({
      title: "¡Reserva Iniciada!",
      description: `Reserva para ${activity.title} el ${selectedDate ? format(selectedDate, 'PPP', { locale: es }) : ''} para ${numberOfPeople} persona(s). Total: €${totalPrice?.toFixed(2)}`,
      variant: "default" // Usar default en lugar de success si no hay color específico
    });
  };

  return (
    <Card className="sticky top-24 shadow-xl rounded-lg">
      <CardHeader>
        <CardTitle className="text-2xl text-primary">Reservar Actividad</CardTitle> {/* Cambiado accent por primary */}
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
                locale={es} // Aplicar locale español al calendario
                disabled={(date) => date < new Date(new Date().setDate(new Date().getDate() -1)) } // Deshabilitar fechas pasadas
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
        
        {totalPrice !== null && (
          <div className="pt-4 border-t">
            <p className="text-xl font-semibold text-foreground flex items-center justify-between">
              <span>Precio Total:</span>
              <span className="flex items-center text-primary"> {/* Color primario para el precio */}
                <Euro className="h-5 w-5 mr-1" />
                {totalPrice.toFixed(2)}
              </span>
            </p>
          </div>
        )}

      </CardContent>
      <CardFooter>
        <Button 
          size="lg" 
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-6 text-lg" // Aumentar tamaño y padding
          onClick={handleBooking}
          disabled={!selectedDate || numberOfPeople <= 0}
        >
          <ShoppingCart className="mr-2 h-5 w-5" /> Reservar Ahora
        </Button>
      </CardFooter>
    </Card>
  );
}
