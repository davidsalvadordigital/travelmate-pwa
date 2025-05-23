
import type { ReactNode } from 'react';
import { AppHeader } from './app-header';
import { AppFooter } from './app-footer';

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <AppHeader />
      <main className="flex-grow py-8"> {/* Eliminado container mx-auto px-4 */}
        {children}
      </main>
      <AppFooter />
    </div>
  );
}
