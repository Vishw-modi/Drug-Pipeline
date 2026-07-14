import type { Metadata } from 'next';
import './globals.css';
import { Sidebar } from '@/components/layout/Sidebar';
import { Topbar } from '@/components/layout/Topbar';
import { DashboardFilterProvider } from '@/context/DashboardFilterContext';
import { ThemeProvider } from '@/providers/ThemeProvider';

export const metadata: Metadata = {
  title: 'DRUGSCAPE',
  description: 'Interactive dashboard for tracking pharmaceutical pipeline drugs and clinical trials',
  icons: {
    icon: '/Drugscrape.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased min-h-screen bg-background text-foreground" suppressHydrationWarning>
        <ThemeProvider>
          <DashboardFilterProvider>
            <div className="flex h-screen overflow-hidden">
              <Sidebar />
              <div id="export-container" className="flex-1 flex flex-col h-screen overflow-hidden">
                <Topbar />
                <main className="flex-1 overflow-y-auto p-6 bg-background">
                  {children}
                </main>
              </div>
            </div>
          </DashboardFilterProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
