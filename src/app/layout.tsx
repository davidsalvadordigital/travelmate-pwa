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
  title: 'Travely - Tu Viaje Lleno de Experiencias',
  description: 'Reserva visitas guiadas, excursiones y actividades turísticas en español por todo el mundo con Travely.',
  manifest: '/manifest.json',
  icons: {
    apple: '/icons/icon-192x192.png',
  },
};

export const viewport: Viewport = {
  themeColor: '#E60073', // Rosa Travely
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
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
