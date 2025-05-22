"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Users, DollarSign,ShoppingCart } from 'lucide-react';
import { format } from 'date-fns';
import type { Activity } from '@/components/activities/activity-card';
import { useToast } from "@/hooks/use-toast"


interface BookingSectionProps {
  activity: Activity & { priceRange: string }; // Assuming priceRange like '$50 - $70' might need parsing or a fixed price
}

export function BookingSection({ activity }: BookingSectionProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [numberOfPeople, setNumberOfPeople] = useState(1);
  const [totalPrice, setTotalPrice] = useState<number | null>(null);
  const { toast } = useToast();

  // Simplified price parsing - assumes lower bound of priceRange is the per-person price
  const basePricePerPerson = parseFloat(activity.priceRange.split('-')[0].replace('$', '')) || 50;

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
        title: "Booking Error",
        description: "Please select a date for your activity.",
        variant: "destructive",
      });
      return;
    }
    if (numberOfPeople <= 0) {
      toast({
        title: "Booking Error",
        description: "Please specify at least one person.",
        variant: "destructive",
      });
      return;
    }
    // Proceed with booking logic
    console.log('Booking details:', { activityId: activity.id, date: selectedDate, people: numberOfPeople, totalPrice });
    toast({
      title: "Booking Initiated!",
      description: `Booking for ${activity.title} on ${selectedDate ? format(selectedDate, 'PPP') : ''} for ${numberOfPeople} people. Total: $${totalPrice?.toFixed(2)}`,
    });
  };

  return (
    <Card className="sticky top-24 shadow-xl">
      <CardHeader>
        <CardTitle className="text-2xl text-accent">Book This Activity</CardTitle>
        <CardDescription>Select your date and number of participants.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label htmlFor="activity-date" className="font-medium">Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="activity-date"
                variant={"outline"}
                className="w-full justify-start text-left font-normal mt-1"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {selectedDate ? format(selectedDate, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                initialFocus
                disabled={(date) => date < new Date(new Date().setDate(new Date().getDate() -1)) } // Disable past dates
              />
            </PopoverContent>
          </Popover>
        </div>

        <div>
          <Label htmlFor="number-of-people" className="font-medium">Number of People</Label>
          <div className="flex items-center mt-1">
            <Button 
              variant="outline" 
              size="icon" 
              onClick={() => setNumberOfPeople(prev => Math.max(1, prev - 1))}
              disabled={numberOfPeople <= 1}
              aria-label="Decrease number of people"
            > - </Button>
            <Input
              id="number-of-people"
              type="number"
              value={numberOfPeople}
              onChange={(e) => setNumberOfPeople(Math.max(1, parseInt(e.target.value) || 1))}
              min="1"
              className="w-16 text-center mx-2"
              aria-label="Number of people"
            />
            <Button 
              variant="outline" 
              size="icon" 
              onClick={() => setNumberOfPeople(prev => prev + 1)}
              aria-label="Increase number of people"
            > + </Button>
          </div>
        </div>
        
        {totalPrice !== null && (
          <div className="pt-4 border-t">
            <p className="text-xl font-semibold text-foreground flex items-center justify-between">
              <span>Total Price:</span>
              <span className="flex items-center">
                <DollarSign className="h-5 w-5 mr-1 text-green-600" />
                {totalPrice.toFixed(2)}
              </span>
            </p>
          </div>
        )}

      </CardContent>
      <CardFooter>
        <Button 
          size="lg" 
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" 
          onClick={handleBooking}
          disabled={!selectedDate || numberOfPeople <= 0}
        >
          <ShoppingCart className="mr-2 h-5 w-5" /> Book Now
        </Button>
      </CardFooter>
    </Card>
  );
}
