import { router, publicProcedure } from "../trpc"
import { aiRouter } from "./ai";

export const appRouter = router({
  health: publicProcedure.query(() => {
    return { ok: true, time: new Date().toISOString()};
  }),
  ai: aiRouter,
});

export type AppRouter = typeof appRouter;