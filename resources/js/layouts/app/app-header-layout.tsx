import { AppShell } from '@/components/App/app-shell';
import NavBar from '@/components/App/NavBar';
import { type BreadcrumbItem } from '@/types';
import type { PropsWithChildren } from 'react';

export default function AppHeaderLayout({ children }: PropsWithChildren<{ breadcrumbs?: BreadcrumbItem[] }>) {
  return (
    <AppShell>
      <NavBar />
      <main className="pt-16">
        {children}
      </main>

      {/* <AppContent></AppContent> */}
    </AppShell>
  );
}
