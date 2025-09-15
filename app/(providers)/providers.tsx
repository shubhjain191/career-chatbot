"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { trpc, trpcClientConfig } from "@/frontend/utils/trpc";
import { useState } from "react";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "@/frontend/providers/ThemeProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() => trpc.createClient(trpcClientConfig()));
  
  return (
    <ThemeProvider
    attribute={"class"}
    defaultTheme="system"
    enableSystem
    disableTransitionOnChange
    >
      <SessionProvider>
        <trpc.Provider client={trpcClient} queryClient={queryClient}>
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        </trpc.Provider>
      </SessionProvider>
    </ThemeProvider>
  );
}