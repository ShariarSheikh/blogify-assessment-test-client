// app/providers.tsx
'use client';

import Header from '@/components/Header';
import { NextUIProvider } from '@nextui-org/react';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      <Header />
      {children}
    </NextUIProvider>
  );
}
