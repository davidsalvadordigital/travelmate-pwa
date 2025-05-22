"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { FilterX, SlidersHorizontal } from 'lucide-react'; // Cambiado Filter por SlidersHorizontal

export function Filters() {
  const [priceRange, setPriceRange] = useState([100]); // Precio máximo por defecto €100
  const [rating, setRating] = useState("any");

  const handleApplyFilters = () => {
    // Lógica para aplicar filtros (ej., actualizar parámetros de consulta URL o estado en el padre)
    console.log("Aplicando filtros:", { priceRange, rating /*, activityType */ });
    // Esto típicamente involucraría useRouter de 'next/navigation' para actualizar searchParams
  };

  const handleResetFilters = () => {
    setPriceRange([100]);
    setRating("any");
    // Resetear otros filtros
    console.log("Filtros reseteados");
  };


  return (
    <Card className="sticky top-24 shadow-lg">
      <CardHeader className="pb-4"> {/* Reducir padding bottom */}
        <CardTitle className="text-xl text-foreground flex items-center">
          <SlidersHorizontal className="h-5 w-5 mr-2 text-primary" />
          Filtrar Actividades
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label htmlFor="activity-type" className="text-sm font-medium">Tipo de Actividad</Label>
          <Select defaultValue="all">
            <SelectTrigger id="activity-type" className="mt-1">
              <SelectValue placeholder="Seleccionar tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los Tipos</SelectItem>
              <SelectItem value="tours">Tours y Visitas Guiadas</SelectItem>
              <SelectItem value="adventure">Deportes de Aventura</SelectItem>
              <SelectItem value="water">Actividades Acuáticas</SelectItem>
              <SelectItem value="food">Gastronomía y Vinos</SelectItem>
              <SelectItem value="cultural">Experiencias Culturales</SelectItem>
              <SelectItem value="workshops">Talleres y Clases</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Separator />

        <div>
          <Label htmlFor="price-range" className="text-sm font-medium">Precio Máximo: €{priceRange[0]}</Label>
          <Slider
            id="price-range"
            min={0}
            max={500} // Ajustar si es necesario
            step={10}
            defaultValue={priceRange}
            onValueChange={setPriceRange}
            className="mt-2"
            aria-label={`Rango de precio hasta €${priceRange[0]}`}
          />
        </div>

        <Separator />

        <div>
          <Label className="text-sm font-medium">Valoración Mínima</Label>
          <RadioGroup defaultValue="any" value={rating} onValueChange={setRating} className="mt-2 space-y-2">
            {[
              { value: "any", label: "Cualquiera" },
              { value: "4", label: "4 Estrellas o más" },
              { value: "3", label: "3 Estrellas o más" },
              { value: "2", label: "2 Estrellas o más" },
            ].map(opt => (
              <div key={opt.value} className="flex items-center space-x-2">
                <RadioGroupItem value={opt.value} id={`rating-${opt.value}`} />
                <Label htmlFor={`rating-${opt.value}`} className="font-normal cursor-pointer">{opt.label}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>
        
        <Separator />

        <div className="flex flex-col space-y-2 pt-2">
          <Button onClick={handleApplyFilters} className="w-full bg-primary hover:bg-primary/90">Aplicar Filtros</Button>
          <Button onClick={handleResetFilters} variant="outline" className="w-full">
            <FilterX className="mr-2 h-4 w-4" /> Resetear Filtros
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
