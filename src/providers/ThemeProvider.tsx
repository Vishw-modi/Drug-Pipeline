'use client';

import * as React from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider 
      attribute="data-theme" 
      defaultTheme="light" 
      enableSystem={false}
      themes={['light', 'dark', 'system', 'claude', 'minimalist', 'professional']}
    >
      {children}
    </NextThemesProvider>
  );
}
