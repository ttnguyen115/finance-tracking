"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const STALE_TIME_PER_MINUTE = 60 * 1000;

function makeQueryClient() {
    return new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: STALE_TIME_PER_MINUTE,
            },
        },
    });
}

let browserQueryClient: QueryClient | undefined = undefined;

function getQueryClient() {
    if (typeof window === "undefined") {
        return makeQueryClient();
    } else {
        if (!browserQueryClient) browserQueryClient = makeQueryClient();
        return browserQueryClient;
    }
}

export function QueryProvider({ children }: { children: React.ReactNode }) {
    const queryClient = getQueryClient();

    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
