
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
      <main className="flex-grow"> {/* Eliminado py-8 */}
        {children}
      </main>
      <AppFooter />
    </div>
  );
}
