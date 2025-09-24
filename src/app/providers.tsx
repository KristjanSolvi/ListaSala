'use client';

import { ReactNode } from 'react';
import { AuthProvider } from '@/context/auth-context';
import { SavedArtProvider } from '@/context/saved-art-context';
import { OrdersProvider } from '@/context/orders-context';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <SavedArtProvider>
        <OrdersProvider>{children}</OrdersProvider>
      </SavedArtProvider>
    </AuthProvider>
  );
}
