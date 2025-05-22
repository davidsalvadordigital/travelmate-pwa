import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Compass, MountainSnow, Waves, Utensils, Landmark, Palette } from 'lucide-react';

const activityTypes = [
  { name: 'Sightseeing Tours', icon: Compass, color: 'text-blue-500', bgColor: 'bg-blue-50', href: '/activities?type=tours' },
  { name: 'Adventure Sports', icon: MountainSnow, color: 'text-red-500', bgColor: 'bg-red-50', href: '/activities?type=adventure' },
  { name: 'Water Activities', icon: Waves, color: 'text-cyan-500', bgColor: 'bg-cyan-50', href: '/activities?type=water' },
  { name: 'Food & Culinary', icon: Utensils, color: 'text-orange-500', bgColor: 'bg-orange-50', href: '/activities?type=food' },
  { name: 'Cultural Experiences', icon: Landmark, color: 'text-purple-500', bgColor: 'bg-purple-50', href: '/activities?type=cultural' },
  { name: 'Workshops & Classes', icon: Palette, color: 'text-green-500', bgColor: 'bg-green-50', href: '/activities?type=workshops' },
];

export function ActivityTypes() {
  return (
    <section>
      <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Explore by Activity Type</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
        {activityTypes.map((type) => (
          <Link key={type.name} href={type.href} legacyBehavior>
            <a className="block group">
              <Card className={`text-center hover:shadow-xl transition-shadow duration-300 ${type.bgColor} border-0`}>
                <CardContent className="p-6 flex flex-col items-center">
                  <div className={`p-4 rounded-full mb-4 transition-colors`}>
                    <type.icon className={`h-10 w-10 ${type.color} group-hover:scale-110 transition-transform`} />
                  </div>
                  <CardTitle className={`text-md font-semibold ${type.color} group-hover:underline`}>{type.name}</CardTitle>
                </CardContent>
              </Card>
            </a>
          </Link>
        ))}
      </div>
    </section>
  );
}
