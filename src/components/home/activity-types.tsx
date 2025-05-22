import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Compass, MountainSnow, Waves, Utensils, Landmark, Palette } from 'lucide-react'; // Iconos consistentes

const activityTypes = [
  { name: 'Tours y Visitas Guiadas', icon: Compass, color: 'text-blue-500', bgColor: 'bg-blue-50 hover:bg-blue-100', href: '/activities?type=tours' },
  { name: 'Deportes de Aventura', icon: MountainSnow, color: 'text-red-500', bgColor: 'bg-red-50 hover:bg-red-100', href: '/activities?type=adventure' },
  { name: 'Actividades Acuáticas', icon: Waves, color: 'text-cyan-500', bgColor: 'bg-cyan-50 hover:bg-cyan-100', href: '/activities?type=water' },
  { name: 'Gastronomía y Vinos', icon: Utensils, color: 'text-orange-500', bgColor: 'bg-orange-50 hover:bg-orange-100', href: '/activities?type=food' },
  { name: 'Experiencias Culturales', icon: Landmark, color: 'text-purple-500', bgColor: 'bg-purple-50 hover:bg-purple-100', href: '/activities?type=cultural' },
  { name: 'Talleres y Clases', icon: Palette, color: 'text-green-500', bgColor: 'bg-green-50 hover:bg-green-100', href: '/activities?type=workshops' },
];

export function ActivityTypes() {
  return (
    <section>
      <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Explora por Tipo de Actividad</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
        {activityTypes.map((type) => (
          <Link key={type.name} href={type.href} legacyBehavior>
            <a className="block group">
              <Card className={`text-center hover:shadow-xl transition-shadow duration-300 ${type.bgColor} border-0 rounded-lg`}>
                <CardContent className="p-6 flex flex-col items-center">
                  <div className={`p-4 rounded-full mb-4 transition-transform duration-300 ease-in-out group-hover:scale-110`}>
                    <type.icon className={`h-10 w-10 ${type.color}`} />
                  </div>
                  <CardTitle className={`text-md font-semibold ${type.color.replace('text-', 'group-hover:text-')} group-hover:underline`}>{type.name}</CardTitle>
                </CardContent>
              </Card>
            </a>
          </Link>
        ))}
      </div>
    </section>
  );
}
