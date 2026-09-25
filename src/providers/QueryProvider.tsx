import React from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/graphql/client/query-client';

/**
 * React Query Provider
 * Wraps the app with QueryClientProvider for server state management
 */

interface QueryProviderProps {
  children: React.ReactNode;
}

export function QueryProvider({ children }: QueryProviderProps) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}
