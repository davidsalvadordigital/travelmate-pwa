import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Mail, Phone } from "lucide-react";
import Link from "next/link";

const faqs = [
  {
    question: "How do I book an activity?",
    answer: "To book an activity, simply browse our selection, choose your desired activity, select your date and number of participants, and proceed to checkout. You'll receive a confirmation email once your booking is complete."
  },
  {
    question: "What is your cancellation policy?",
    answer: "Cancellation policies vary by activity. Please check the specific activity's details page for its cancellation policy. Many activities offer free cancellation up to 24-48 hours before the start time."
  },
  {
    question: "How can I find my booking details?",
    answer: "You can find all your booking details in the 'My Bookings' section of your account. You will also receive a confirmation email with all the necessary information."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept major credit cards (Visa, MasterCard, American Express) and PayPal. All payments are processed securely."
  },
  {
    question: "How do I contact customer support?",
    answer: "You can contact our customer support team via email at support@travely.example.com or by phone at +1-234-567-8900. We are available 24/7 to assist you."
  }
];

export default function HelpPage() {
  return (
    <div className="space-y-12">
      <Card className="shadow-lg text-center">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-primary">Help Center</CardTitle>
          <CardDescription className="text-lg">How can we help you today?</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="w-full max-w-lg mx-auto flex items-center gap-2">
            <Input
              type="search"
              placeholder="Search help articles..."
              className="flex-grow"
              aria-label="Search help articles"
            />
            <Button type="submit" variant="default">
              <Search className="mr-2 h-4 w-4" /> Search
            </Button>
          </form>
        </CardContent>
      </Card>

      <section>
        <h2 className="text-2xl font-semibold text-foreground mb-6 text-center">Frequently Asked Questions</h2>
        <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left hover:no-underline text-md font-medium">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      <section className="text-center">
        <h2 className="text-2xl font-semibold text-foreground mb-6">Still Need Help?</h2>
        <Card className="max-w-md mx-auto shadow-md">
            <CardHeader>
                <CardTitle>Contact Us</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                    Our support team is ready to assist you.
                </p>
                <Button asChild variant="outline" className="w-full">
                    <Link href="mailto:support@travely.example.com">
                        <Mail className="mr-2 h-4 w-4" /> Email Support
                    </Link>
                </Button>
                <Button asChild variant="outline" className="w-full">
                    <Link href="tel:+12345678900">
                        <Phone className="mr-2 h-4 w-4" /> Call Us
                    </Link>
                </Button>
            </CardContent>
        </Card>
      </section>
    </div>
  );
}
