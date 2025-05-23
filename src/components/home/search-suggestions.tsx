
"use client";

import Link from 'next/link';
import { MapPin, Search as ActivityIcon } from 'lucide-react';
import type { Activity } from '@/components/activities/activity-card';
import { Button } from '@/components/ui/button';

export interface DestinationSuggestion {
  type: 'destination';
  name: string;
  activityCount: number;
  href: string;
}

export interface ActivitySuggestionItem {
  type: 'activity';
  id: string;
  title: string;
  destination: string;
  href: string;
}

export type Suggestion = DestinationSuggestion | ActivitySuggestionItem;

interface SearchSuggestionsProps {
  suggestions: Suggestion[];
  searchTerm: string;
  onSuggestionClick: () => void;
  loading?: boolean;
}

export function SearchSuggestions({ suggestions, searchTerm, onSuggestionClick, loading }: SearchSuggestionsProps) {
  const destinationSuggestions = suggestions.filter(s => s.type === 'destination') as DestinationSuggestion[];
  const activitySuggestions = suggestions.filter(s => s.type === 'activity') as ActivitySuggestionItem[];

  if (loading) {
    return (
      <div className="absolute top-full left-0 right-0 mt-1.5 bg-white shadow-xl rounded-lg p-4 z-20 border border-gray-200 max-h-[calc(100vh-200px)] overflow-y-auto">
        <p className="text-sm text-muted-foreground text-center">Buscando...</p>
      </div>
    );
  }

  if (suggestions.length === 0 && searchTerm) {
     return (
      <div className="absolute top-full left-0 right-0 mt-1.5 bg-white shadow-xl rounded-lg p-4 z-20 border border-gray-200">
        <p className="text-sm text-muted-foreground text-center">No hay sugerencias para "{searchTerm}"</p>
      </div>
    );
  }
  
  if (suggestions.length === 0) {
    return null;
  }


  return (
    <div className="absolute top-full left-0 right-0 mt-1.5 bg-white shadow-xl rounded-lg p-4 z-20 border border-gray-200 max-h-[calc(100vh-200px)] overflow-y-auto">
      {destinationSuggestions.length > 0 && (
        <div className="mb-4">
          <h3 className="text-sm font-semibold text-primary mb-2 flex items-center">
            <MapPin className="h-4 w-4 mr-2" />
            Destinos
          </h3>
          <ul className="space-y-0.5">
            {destinationSuggestions.map((dest) => (
              <li key={`dest-${dest.name}`}>
                <Link
                  href={dest.href}
                  className="block p-2 hover:bg-muted rounded-md text-sm text-foreground transition-colors"
                  onClick={onSuggestionClick}
                >
                  <span className="font-medium">{dest.name}</span>
                  <span className="text-xs text-muted-foreground ml-2">{dest.activityCount} actividades</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {activitySuggestions.length > 0 && (
        <div className="mb-4">
          <h3 className="text-sm font-semibold text-primary mb-2 flex items-center">
            <ActivityIcon className="h-4 w-4 mr-2" />
            Actividades
          </h3>
          <ul className="space-y-0.5">
            {activitySuggestions.map((act) => (
              <li key={`act-${act.id}`}>
                <Link
                  href={act.href}
                  className="block p-2 hover:bg-muted rounded-md text-sm text-foreground transition-colors"
                  onClick={onSuggestionClick}
                >
                  <span className="font-medium">{act.title}</span>
                  <span className="text-xs text-muted-foreground ml-2">en {act.destination}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {searchTerm && (
        <Button
          asChild
          variant="default"
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground mt-3"
          onClick={onSuggestionClick}
        >
          <Link href={`/activities?q=${encodeURIComponent(searchTerm)}`}>
            Ver todos los resultados con "{searchTerm}"
          </Link>
        </Button>
      )}
    </div>
  );
}
