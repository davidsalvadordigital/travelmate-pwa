import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { AppLayout } from '@/components/layout/app-layout';
import { ServiceWorkerRegistration } from '@/components/pwa/service-worker-registration';
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Travely - Your Adventure Awaits',
  description: 'Book tourist activities and discover amazing destinations with Travely.',
  manifest: '/manifest.json',
  icons: {
    apple: '/icons/icon-192x192.png', // Example, adjust as needed
  },
};

export const viewport: Viewport = {
  themeColor: '#0A74DA',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased font-sans`}>
        <AppLayout>
          {children}
        </AppLayout>
        <Toaster />
        <ServiceWorkerRegistration />
      </body>
    </html>
  );
}
