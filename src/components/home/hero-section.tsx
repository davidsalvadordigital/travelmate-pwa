'use client';

import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative h-[500px] md:h-[600px] rounded-xl overflow-hidden shadow-lg">
      <Image
        src="https://placehold.co/1600x900.png"
        alt="Breathtaking travel destination"
        layout="fill"
        objectFit="cover"
        quality={85}
        priority
        className="brightness-75"
        data-ai-hint="travel landscape"
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 bg-black/30">
        <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 shadow-text">
          Your Next Adventure Starts Here
        </h1>
        <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl shadow-text">
          Discover and book amazing activities, tours, and experiences worldwide.
        </p>
        <form className="w-full max-w-lg flex items-center gap-2 bg-white p-2 rounded-lg shadow-2xl">
          <Search className="text-muted-foreground ml-2" />
          <Input
            type="search"
            placeholder="Search destinations or activities..."
            className="flex-grow border-none focus-visible:ring-0 focus-visible:ring-offset-0 text-base"
            aria-label="Search destinations or activities"
          />
          <Button type="submit" size="lg" className="bg-accent hover:bg-accent/90">
            Search
          </Button>
        </form>
      </div>
      <style jsx global>{`
        .shadow-text {
          text-shadow: 0 2px 4px rgba(0,0,0,0.5);
        }
      `}</style>
    </section>
  );
}
