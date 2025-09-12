import { createTRPCReact } from "@trpc/react-query";
import type { AppRouter } from "@/backend/trpc/routers/_app";
import { httpBatchLink } from "@trpc/client";
import superjson from "superjson";

export const trpc = createTRPCReact<AppRouter>();

export function getTrpcClientBaseUrl() {
    if (typeof window !== "undefined") return"";
    return "http://localhost:3000"; 
}

export function trpcClientConfig() {
    return {
        links: [
            httpBatchLink({
                url: `${getTrpcClientBaseUrl()}/api/trpc`,
                transformer: superjson,
            }),
        ],
    };
}