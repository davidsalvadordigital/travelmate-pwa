import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Ticket, CalendarCheck2 } from 'lucide-react';
import Link from 'next/link';

// Mock booking data
const mockBookings = [
  { id: 'B001', activityTitle: 'Eiffel Tower Summit Experience', date: '2024-08-15', status: 'Confirmed', price: '$65.00' },
  { id: 'B002', activityTitle: 'Colosseum & Roman Forum Tour', date: '2024-09-02', status: 'Pending Payment', price: '$70.00' },
  { id: 'B003', activityTitle: 'Kyoto Temples & Zen Gardens', date: '2023-11-20', status: 'Completed', price: '$120.00' },
];


export default function BookingsPage() {
  const upcomingBookings = mockBookings.filter(b => new Date(b.date) >= new Date() && (b.status === 'Confirmed' || b.status === 'Pending Payment'));
  const pastBookings = mockBookings.filter(b => new Date(b.date) < new Date() || b.status === 'Completed' || b.status === 'Cancelled');


  return (
    <div className="space-y-8">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-primary">My Bookings</CardTitle>
          <CardDescription>View and manage your booked activities.</CardDescription>
        </CardHeader>
      </Card>

      {upcomingBookings.length > 0 && (
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4">Upcoming Bookings</h2>
          <div className="space-y-4">
            {upcomingBookings.map(booking => (
              <Card key={booking.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{booking.activityTitle}</CardTitle>
                    <CardDescription className="text-sm">Booking ID: {booking.id}</CardDescription>
                  </div>
                  <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                    booking.status === 'Confirmed' ? 'bg-green-100 text-green-700' : 
                    booking.status === 'Pending Payment' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {booking.status}
                  </span>
                </CardHeader>
                <CardContent className="flex justify-between items-center">
                  <div className="text-sm text-muted-foreground">
                    <p className="flex items-center"><CalendarCheck2 className="h-4 w-4 mr-2" />Date: {new Date(booking.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    <p className="font-semibold text-foreground mt-1">Price: {booking.price}</p>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/activities/mock-id-for-${booking.id}`}>View Details</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}
      
      {pastBookings.length > 0 && (
         <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4">Past Bookings</h2>
          <div className="space-y-4">
            {pastBookings.map(booking => (
              <Card key={booking.id} className="opacity-75">
                <CardHeader className="flex flex-row justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{booking.activityTitle}</CardTitle>
                    <CardDescription className="text-sm">Booking ID: {booking.id}</CardDescription>
                  </div>
                  <span className="px-3 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-700">
                    {booking.status}
                  </span>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Date: {new Date(booking.date).toLocaleDateString()}</p>
                  <p className="font-semibold text-foreground mt-1">Price: {booking.price}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}

      {mockBookings.length === 0 && (
        <Card>
          <CardContent className="p-10 text-center">
            <Ticket className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No Bookings Yet</h3>
            <p className="text-muted-foreground mb-4">
              You haven't booked any activities. Start exploring to find your next adventure!
            </p>
            <Button asChild>
              <Link href="/activities">Explore Activities</Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
