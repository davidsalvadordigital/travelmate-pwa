
"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { FilterX, SlidersHorizontal, CalendarDays, Clock, Tag, Settings2, DollarSign, Hourglass } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"


const categories = [
  { id: 'cat1', label: 'Visitas guiadas y free tours', count: 44 },
  { id: 'cat2', label: 'Entradas', count: 77 },
  { id: 'cat3', label: 'Excursiones de un día', count: 14 },
  { id: 'cat4', label: 'Gastronomía y enoturismo', count: 10 },
  { id: 'cat5', label: 'Espectáculos', count: 7 },
  // { id: 'cat6', label: 'Ver 6 más...', count: null }, // 'Ver más' podría ser un link o abrir más opciones
];

const features = [
  { id: 'feat1', label: 'Cancelación gratuita', count: 90 },
  { id: 'feat2', label: 'Solo actividades en español', count: 104 },
  { id: 'feat3', label: 'Accesible en silla de ruedas', count: 40 }, // Ejemplo
  { id: 'feat4', label: 'Admite mascotas', count: 10 },
  { id: 'feat5', label: 'Recogida en el hotel', count: 3 },
];


export function Filters() {
  const [startTime, setStartTime] = useState([0, 24]); // Rango de 0h a 24h
  const [priceRange, setPriceRange] = useState([0, 600]); // Precio: 0 (Gratis) a 600 EUR
  const [durationRange, setDurationRange] = useState([1, 11]); // Duración: 1h a 11 días (ejemplo)

  const handleApplyFilters = () => {
    console.log("Aplicando filtros:", { startTime, priceRange, durationRange /*, categorías, características */ });
  };

  const handleResetFilters = () => {
    setStartTime([0, 24]);
    setPriceRange([0, 600]);
    setDurationRange([1, 11]);
    // Resetear checkboxes
    console.log("Filtros reseteados");
  };

  return (
    <Card className="sticky top-24 shadow-lg rounded-lg">
      <CardHeader className="pb-4 border-b">
        <CardTitle className="text-xl text-foreground flex items-center">
          <SlidersHorizontal className="h-5 w-5 mr-2 text-primary" />
          Filtros
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <Accordion type="multiple" defaultValue={['item-1', 'item-2', 'item-3', 'item-4', 'item-5', 'item-6']} className="w-full">
          
          {/* Disponibilidad */}
          <AccordionItem value="item-1" className="border-b-0">
            <AccordionTrigger className="py-3 text-md font-semibold hover:no-underline">
                <CalendarDays className="h-5 w-5 mr-2 text-primary" /> Disponibilidad
            </AccordionTrigger>
            <AccordionContent className="pt-2 pb-4 space-y-3">
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1 text-xs">Hoy</Button>
                <Button variant="outline" className="flex-1 text-xs">Mañana</Button>
              </div>
              <Button variant="outline" className="w-full text-primary border-primary hover:bg-primary/5 text-xs">
                <CalendarDays className="mr-2 h-4 w-4"/> Seleccionar Fechas
              </Button>
            </AccordionContent>
          </AccordionItem>
          
          <Separator className="my-2"/>

          {/* Hora de inicio */}
          <AccordionItem value="item-2" className="border-b-0">
            <AccordionTrigger className="py-3 text-md font-semibold hover:no-underline">
                <Clock className="h-5 w-5 mr-2 text-primary" /> Hora de inicio
            </AccordionTrigger>
            <AccordionContent className="pt-2 pb-4">
              <Label htmlFor="start-time-range" className="text-xs text-muted-foreground block mb-2 text-center">
                {startTime[0] === 0 && startTime[1] === 24 ? "Cualquier hora" : `${startTime[0]}:00h - ${startTime[1]}:00h`}
              </Label>
              <Slider
                id="start-time-range"
                min={0}
                max={24}
                step={1}
                defaultValue={startTime}
                onValueChange={setStartTime}
                aria-label="Rango de hora de inicio"
              />
            </AccordionContent>
          </AccordionItem>

          <Separator className="my-2"/>

          {/* Categorías */}
          <AccordionItem value="item-3" className="border-b-0">
            <AccordionTrigger className="py-3 text-md font-semibold hover:no-underline">
                <Tag className="h-5 w-5 mr-2 text-primary" /> Categorías
            </AccordionTrigger>
            <AccordionContent className="pt-2 pb-4 space-y-2">
              {categories.map(category => (
                <div key={category.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox id={category.id} />
                    <Label htmlFor={category.id} className="text-sm font-normal cursor-pointer">{category.label}</Label>
                  </div>
                  {category.count !== null && <span className="text-xs text-muted-foreground">{category.count}</span>}
                </div>
              ))}
              {/* Podría haber un botón "Ver más" aquí */}
            </AccordionContent>
          </AccordionItem>

          <Separator className="my-2"/>

          {/* Características */}
          <AccordionItem value="item-4" className="border-b-0">
            <AccordionTrigger className="py-3 text-md font-semibold hover:no-underline">
                <Settings2 className="h-5 w-5 mr-2 text-primary" /> Características
            </AccordionTrigger>
            <AccordionContent className="pt-2 pb-4 space-y-2">
              {features.map(feature => (
                <div key={feature.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox id={feature.id} />
                    <Label htmlFor={feature.id} className="text-sm font-normal cursor-pointer">{feature.label}</Label>
                  </div>
                  {feature.count !== null && <span className="text-xs text-muted-foreground">{feature.count}</span>}
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>

          <Separator className="my-2"/>

          {/* Precio */}
          <AccordionItem value="item-5" className="border-b-0">
            <AccordionTrigger className="py-3 text-md font-semibold hover:no-underline">
                <DollarSign className="h-5 w-5 mr-2 text-primary" /> Precio
            </AccordionTrigger>
            <AccordionContent className="pt-2 pb-4">
              <Label htmlFor="price-range" className="text-xs text-muted-foreground block mb-2 text-center">
                {priceRange[0] === 0 ? "Gratis" : `€${priceRange[0]}`} - €{priceRange[1]}
              </Label>
              <Slider
                id="price-range"
                min={0}
                max={600} // Ajustar si es necesario
                step={10}
                defaultValue={priceRange}
                onValueChange={setPriceRange}
                aria-label="Rango de precio"
              />
            </AccordionContent>
          </AccordionItem>

          <Separator className="my-2"/>

          {/* Duración */}
          <AccordionItem value="item-6" className="border-b-0">
            <AccordionTrigger className="py-3 text-md font-semibold hover:no-underline">
                <Hourglass className="h-5 w-5 mr-2 text-primary" /> Duración
            </AccordionTrigger>
            <AccordionContent className="pt-2 pb-4">
              <Label htmlFor="duration-range" className="text-xs text-muted-foreground block mb-2 text-center">
                {durationRange[0]}h - {durationRange[1]}{durationRange[1] > 1 ? ' días' : ' día'}
              </Label>
              <Slider
                id="duration-range"
                min={1} // 1 hora
                max={11} // 11 días (como en la imagen)
                step={1}
                defaultValue={durationRange}
                onValueChange={setDurationRange}
                aria-label="Rango de duración"
              />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        
        <Separator className="my-4" />

        <div className="flex flex-col space-y-2">
          <Button onClick={handleApplyFilters} className="w-full bg-primary hover:bg-primary/90">Aplicar Filtros</Button>
          <Button onClick={handleResetFilters} variant="outline" className="w-full">
            <FilterX className="mr-2 h-4 w-4" /> Resetear Filtros
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

    