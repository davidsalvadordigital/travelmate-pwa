
"use client";

import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { FilterX, SlidersHorizontal, CalendarDays, Clock, Tag, Settings2, DollarSign, Hourglass } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export interface FilterState {
  startTime: [number, number];
  priceRange: [number, number];
  durationRange: [number, number]; // En horas/días como en el slider. La interpretación es para el componente padre.
  selectedCategories: string[]; // IDs de las categorías
  selectedFeatures: string[]; // IDs de las características
  // No incluimos disponibilidad por fecha aquí, ya que es más complejo y se manejaría a nivel de página.
}

const initialFilterState: FilterState = {
  startTime: [0, 24],
  priceRange: [0, 600],
  durationRange: [1, 11],
  selectedCategories: [],
  selectedFeatures: [],
};

const categoriesOptions = [
  { id: 'visitas-guiadas', label: 'Visitas guiadas y free tours', count: 44 },
  { id: 'entradas', label: 'Entradas', count: 77 },
  { id: 'excursiones', label: 'Excursiones de un día', count: 14 },
  { id: 'gastronomia', label: 'Gastronomía y enoturismo', count: 10 },
  { id: 'espectaculos', label: 'Espectáculos', count: 7 },
];

const featuresOptions = [
  { id: 'freeCancellation', label: 'Cancelación gratuita', count: 90 },
  { id: 'spanishOnly', label: 'Solo actividades en español', count: 104 },
  { id: 'wheelchairAccessible', label: 'Accesible en silla de ruedas', count: 40 },
  { id: 'petFriendly', label: 'Admite mascotas', count: 10 },
  { id: 'hotelPickup', label: 'Recogida en el hotel', count: 3 },
];

interface FiltersProps {
  onFilterChange: (filters: FilterState) => void;
}

export function Filters({ onFilterChange }: FiltersProps) {
  const [filters, setFilters] = useState<FilterState>(initialFilterState);

  // Propagar cambios al componente padre
  useEffect(() => {
    onFilterChange(filters);
  }, [filters, onFilterChange]);

  const handleSliderChange = (key: 'startTime' | 'priceRange' | 'durationRange', value: [number, number]) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleCheckboxChange = (type: 'selectedCategories' | 'selectedFeatures', id: string, checked: boolean) => {
    setFilters(prev => {
      const currentSelection = prev[type];
      const newSelection = checked 
        ? [...currentSelection, id]
        : currentSelection.filter(itemId => itemId !== id);
      return { ...prev, [type]: newSelection };
    });
  };

  const handleResetFilters = () => {
    setFilters(initialFilterState);
    // onFilterChange(initialFilterState); // useEffect ya se encarga de esto
  };
  
  // Funciones para formatear las etiquetas de los sliders
  const formatStartTimeLabel = (value: [number, number]) => {
    if (value[0] === 0 && value[1] === 24) return "Cualquier hora";
    return `${value[0]}:00h - ${value[1]}:00h`;
  };

  const formatPriceLabel = (value: [number, number]) => {
    const minPrice = value[0] === 0 ? "Gratis" : `€${value[0]}`;
    return `${minPrice} - €${value[1]}`;
  };

  const formatDurationLabel = (value: [number, number]) => {
    // Asumimos que el slider de duración puede representar horas o días
    // Esta es una simplificación. Una implementación real necesitaría unidades más claras.
    if (value[0] === 1 && value[1] === 11) return "Cualquier duración"; // Ejemplo de "todos"
    return `${value[0]}h - ${value[1]}${value[1] > 1 ? ' días' : ' día'}`; // Simplificación
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
          
          <AccordionItem value="item-1" className="border-b-0">
            <AccordionTrigger className="py-3 text-md font-semibold hover:no-underline">
                <CalendarDays className="h-5 w-5 mr-2 text-primary" /> Disponibilidad
            </AccordionTrigger>
            <AccordionContent className="pt-2 pb-4 space-y-3">
              <p className="text-xs text-muted-foreground">La selección de fechas se realiza en la cabecera.</p>
              {/* Los botones "Hoy", "Mañana" podrían ser funcionales en una versión más avanzada */}
            </AccordionContent>
          </AccordionItem>
          
          <Separator className="my-2"/>

          <AccordionItem value="item-2" className="border-b-0">
            <AccordionTrigger className="py-3 text-md font-semibold hover:no-underline">
                <Clock className="h-5 w-5 mr-2 text-primary" /> Hora de inicio
            </AccordionTrigger>
            <AccordionContent className="pt-2 pb-4">
              <Label htmlFor="start-time-range" className="text-xs text-muted-foreground block mb-2 text-center">
                {formatStartTimeLabel(filters.startTime)}
              </Label>
              <Slider
                id="start-time-range"
                min={0}
                max={24}
                step={1}
                value={filters.startTime}
                onValueChange={(value) => handleSliderChange('startTime', value as [number, number])}
                aria-label="Rango de hora de inicio"
              />
            </AccordionContent>
          </AccordionItem>

          <Separator className="my-2"/>

          <AccordionItem value="item-3" className="border-b-0">
            <AccordionTrigger className="py-3 text-md font-semibold hover:no-underline">
                <Tag className="h-5 w-5 mr-2 text-primary" /> Categorías
            </AccordionTrigger>
            <AccordionContent className="pt-2 pb-4 space-y-2">
              {categoriesOptions.map(category => (
                <div key={category.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id={category.id} 
                      checked={filters.selectedCategories.includes(category.id)}
                      onCheckedChange={(checked) => handleCheckboxChange('selectedCategories', category.id, !!checked)}
                    />
                    <Label htmlFor={category.id} className="text-sm font-normal cursor-pointer">{category.label}</Label>
                  </div>
                  {category.count !== null && <span className="text-xs text-muted-foreground">{category.count}</span>}
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>

          <Separator className="my-2"/>

          <AccordionItem value="item-4" className="border-b-0">
            <AccordionTrigger className="py-3 text-md font-semibold hover:no-underline">
                <Settings2 className="h-5 w-5 mr-2 text-primary" /> Características
            </AccordionTrigger>
            <AccordionContent className="pt-2 pb-4 space-y-2">
              {featuresOptions.map(feature => (
                <div key={feature.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id={feature.id} 
                      checked={filters.selectedFeatures.includes(feature.id)}
                      onCheckedChange={(checked) => handleCheckboxChange('selectedFeatures', feature.id, !!checked)}
                    />
                    <Label htmlFor={feature.id} className="text-sm font-normal cursor-pointer">{feature.label}</Label>
                  </div>
                  {feature.count !== null && <span className="text-xs text-muted-foreground">{feature.count}</span>}
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>

          <Separator className="my-2"/>

          <AccordionItem value="item-5" className="border-b-0">
            <AccordionTrigger className="py-3 text-md font-semibold hover:no-underline">
                <DollarSign className="h-5 w-5 mr-2 text-primary" /> Precio
            </AccordionTrigger>
            <AccordionContent className="pt-2 pb-4">
              <Label htmlFor="price-range" className="text-xs text-muted-foreground block mb-2 text-center">
                {formatPriceLabel(filters.priceRange)}
              </Label>
              <Slider
                id="price-range"
                min={0}
                max={600}
                step={10}
                value={filters.priceRange}
                onValueChange={(value) => handleSliderChange('priceRange', value as [number, number])}
                aria-label="Rango de precio"
              />
            </AccordionContent>
          </AccordionItem>

          <Separator className="my-2"/>

          <AccordionItem value="item-6" className="border-b-0">
            <AccordionTrigger className="py-3 text-md font-semibold hover:no-underline">
                <Hourglass className="h-5 w-5 mr-2 text-primary" /> Duración
            </AccordionTrigger>
            <AccordionContent className="pt-2 pb-4">
              <Label htmlFor="duration-range" className="text-xs text-muted-foreground block mb-2 text-center">
                {formatDurationLabel(filters.durationRange)}
              </Label>
              <Slider
                id="duration-range"
                min={1} 
                max={11} 
                step={1}
                value={filters.durationRange}
                onValueChange={(value) => handleSliderChange('durationRange', value as [number, number])}
                aria-label="Rango de duración"
              />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        
        <Separator className="my-4" />

        <div className="flex flex-col space-y-2">
          {/* El botón Aplicar se elimina, los filtros se aplican al cambiar */}
          <Button onClick={handleResetFilters} variant="outline" className="w-full">
            <FilterX className="mr-2 h-4 w-4" /> Resetear Filtros
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
