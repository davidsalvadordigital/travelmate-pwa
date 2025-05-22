"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { FilterX } from 'lucide-react';

export function Filters() {
  const [priceRange, setPriceRange] = useState([50]); // Default max price $50
  const [rating, setRating] = useState("any");

  const handleApplyFilters = () => {
    // Logic to apply filters (e.g., update URL query params or state in parent)
    console.log("Applying filters:", { priceRange, rating /*, activityType */ });
    // This would typically involve useRouter from 'next/navigation' to update searchParams
  };

  const handleResetFilters = () => {
    setPriceRange([50]);
    setRating("any");
    // Reset other filters
    console.log("Filters reset");
  };


  return (
    <Card className="sticky top-24 shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl text-foreground">Filter Activities</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label htmlFor="activity-type" className="text-sm font-medium">Activity Type</Label>
          <Select defaultValue="all">
            <SelectTrigger id="activity-type" className="mt-1">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="tours">Sightseeing Tours</SelectItem>
              <SelectItem value="adventure">Adventure Sports</SelectItem>
              <SelectItem value="water">Water Activities</SelectItem>
              <SelectItem value="food">Food & Culinary</SelectItem>
              <SelectItem value="cultural">Cultural Experiences</SelectItem>
              <SelectItem value="workshops">Workshops & Classes</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Separator />

        <div>
          <Label htmlFor="price-range" className="text-sm font-medium">Max Price: ${priceRange[0]}</Label>
          <Slider
            id="price-range"
            min={0}
            max={500}
            step={10}
            defaultValue={priceRange}
            onValueChange={setPriceRange}
            className="mt-2"
            aria-label={`Price range up to $${priceRange[0]}`}
          />
        </div>

        <Separator />

        <div>
          <Label className="text-sm font-medium">Minimum Rating</Label>
          <RadioGroup defaultValue="any" value={rating} onValueChange={setRating} className="mt-2 space-y-2">
            {[
              { value: "any", label: "Any Rating" },
              { value: "4", label: "4 Stars & Up" },
              { value: "3", label: "3 Stars & Up" },
              { value: "2", label: "2 Stars & Up" },
            ].map(opt => (
              <div key={opt.value} className="flex items-center space-x-2">
                <RadioGroupItem value={opt.value} id={`rating-${opt.value}`} />
                <Label htmlFor={`rating-${opt.value}`} className="font-normal">{opt.label}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>
        
        <Separator />

        <div className="flex flex-col space-y-2">
          <Button onClick={handleApplyFilters} className="w-full bg-primary hover:bg-primary/90">Apply Filters</Button>
          <Button onClick={handleResetFilters} variant="outline" className="w-full">
            <FilterX className="mr-2 h-4 w-4" /> Reset Filters
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
