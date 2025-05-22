import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Ticket, CalendarCheck2, AlertTriangle, CheckCircle2, Clock } from 'lucide-react'; // Iconos actualizados
import Link from 'next/link';

// Datos de ejemplo de reservas
const mockBookings = [
  { id: 'B001', activityTitle: 'Experiencia Cumbre Torre Eiffel', date: '2024-08-15', status: 'Confirmada', price: '€65.00' },
  { id: 'B002', activityTitle: 'Tour Coliseo y Foro Romano', date: '2024-09-02', status: 'Pendiente de Pago', price: '€70.00' },
  { id: 'B003', activityTitle: 'Templos de Kioto y Jardines Zen', date: '2023-11-20', status: 'Completada', price: '€120.00' },
];


export default function BookingsPage() {
  const upcomingBookings = mockBookings.filter(b => new Date(b.date) >= new Date() && (b.status === 'Confirmada' || b.status === 'Pendiente de Pago'));
  const pastBookings = mockBookings.filter(b => new Date(b.date) < new Date() || b.status === 'Completada' || b.status === 'Cancelada'); // Añadido 'Cancelada' como ejemplo

  const getStatusChip = (status: string) => {
    switch (status) {
      case 'Confirmada':
        return <span className="px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-700 flex items-center"><CheckCircle2 className="h-3 w-3 mr-1"/>Confirmada</span>;
      case 'Pendiente de Pago':
        return <span className="px-3 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-700 flex items-center"><Clock className="h-3 w-3 mr-1"/>Pendiente</span>;
      case 'Completada':
        return <span className="px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-700 flex items-center"><Ticket className="h-3 w-3 mr-1"/>Completada</span>;
      case 'Cancelada':
         return <span className="px-3 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-700 flex items-center"><AlertTriangle className="h-3 w-3 mr-1"/>Cancelada</span>;
      default:
        return <span className="px-3 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-700">{status}</span>;
    }
  };

  return (
    <div className="space-y-8">
      <Card className="shadow-lg rounded-lg">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-primary">Mis Reservas</CardTitle>
          <CardDescription>Visualiza y gestiona tus actividades reservadas.</CardDescription>
        </CardHeader>
      </Card>

      {upcomingBookings.length > 0 && (
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4">Próximas Reservas</h2>
          <div className="space-y-4">
            {upcomingBookings.map(booking => (
              <Card key={booking.id} className="hover:shadow-md transition-shadow rounded-lg">
                <CardHeader className="flex flex-row justify-between items-start">
                  <div>
                    <CardTitle className="text-lg text-primary">{booking.activityTitle}</CardTitle>
                    <CardDescription className="text-sm">ID Reserva: {booking.id}</CardDescription>
                  </div>
                  {getStatusChip(booking.status)}
                </CardHeader>
                <CardContent className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div className="text-sm text-muted-foreground space-y-1">
                    <p className="flex items-center"><CalendarCheck2 className="h-4 w-4 mr-2 text-primary" />Fecha: {new Date(booking.date).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    <p className="font-semibold text-foreground">Precio: {booking.price}</p>
                  </div>
                  <Button variant="outline" size="sm" asChild className="mt-2 sm:mt-0">
                    <Link href={`/activities/mock-id-for-${booking.id}`}>Ver Detalles</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}
      
      {pastBookings.length > 0 && (
         <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4">Reservas Anteriores</h2>
          <div className="space-y-4">
            {pastBookings.map(booking => (
              <Card key={booking.id} className="opacity-80 rounded-lg"> {/* Ligera opacidad para pasadas */}
                <CardHeader className="flex flex-row justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{booking.activityTitle}</CardTitle>
                    <CardDescription className="text-sm">ID Reserva: {booking.id}</CardDescription>
                  </div>
                  {getStatusChip(booking.status)}
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Fecha: {new Date(booking.date).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                  <p className="font-semibold text-foreground mt-1">Precio: {booking.price}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}

      {mockBookings.length === 0 && (
        <Card className="rounded-lg">
          <CardContent className="p-10 text-center">
            <Ticket className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Aún No Tienes Reservas</h3>
            <p className="text-muted-foreground mb-4">
              No has reservado ninguna actividad. ¡Empieza a explorar para encontrar tu próxima aventura!
            </p>
            <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Link href="/activities">Explorar Actividades</Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
