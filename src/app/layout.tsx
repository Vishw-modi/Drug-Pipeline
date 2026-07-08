import type { Metadata } from 'next';
import './globals.css';
import { Sidebar } from '@/components/layout/Sidebar';
import { Topbar } from '@/components/layout/Topbar';
import { DashboardFilterProvider } from '@/context/DashboardFilterContext';

export const metadata: Metadata = {
  title: 'KMK Pipeline Intelligence',
  description: 'Competitive Oncology Pipeline Intelligence Platform',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen bg-[var(--color-background)]">
        <DashboardFilterProvider>
          <div className="flex h-screen overflow-hidden">
            <Sidebar />
            <div id="export-container" className="flex-1 ml-64 flex flex-col h-screen overflow-hidden">
              <Topbar />
              <main className="flex-1 overflow-y-auto p-6 bg-[var(--color-background)]">
                {children}
              </main>
            </div>
          </div>
        </DashboardFilterProvider>
      </body>
    </html>
  );
}
