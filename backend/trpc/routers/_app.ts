import { router, publicProcedure } from "../trpc"
import { aiRouter } from "./ai";
import { messagesRouter } from "./messages";
import { sessionRouter } from "./session";

export const appRouter = router({
  health: publicProcedure.query(() => {
    return { ok: true, time: new Date().toISOString()};
  }),
  ai: aiRouter,
  session: sessionRouter,
  message: messagesRouter,
});

export type AppRouter = typeof appRouter;