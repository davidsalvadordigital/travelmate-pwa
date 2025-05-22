import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BadgeDollarSign, Users, CheckCircle2, ShieldCheck, Smile } from 'lucide-react';

const usps = [
  { title: 'Best Price Guarantee', description: 'Find the best deals on activities worldwide.', icon: BadgeDollarSign },
  { title: 'Expert Local Guides', description: 'Knowledgeable guides for an authentic experience.', icon: Users },
  { title: 'Easy & Secure Booking', description: 'Quick, hassle-free, and secure online booking.', icon: CheckCircle2 },
  { title: 'Flexible Cancellation', description: 'Peace of mind with flexible cancellation policies.', icon: ShieldCheck },
  { title: '24/7 Customer Support', description: 'We are here to help you anytime, anywhere.', icon: Smile },
];

export function UspSection() {
  return (
    <section className="bg-secondary py-16 rounded-xl">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-foreground mb-10 text-center">Why Book With Travely?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {usps.map((usp, index) => (
            <Card key={index} className="text-center border-none shadow-lg bg-card hover:scale-105 transition-transform duration-300">
              <CardHeader className="flex flex-col items-center">
                <div className="p-3 bg-primary/10 rounded-full mb-3">
                  <usp.icon className="h-10 w-10 text-primary" />
                </div>
                <CardTitle className="text-xl text-foreground">{usp.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">{usp.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
