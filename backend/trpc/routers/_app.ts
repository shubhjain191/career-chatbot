import { router, publicProcedure } from "../trpc"
import { aiRouter } from "./ai";
import { messagesRouter } from "./messages";
import { sessionRouter } from "./session";
import { authRouter } from "./auth";

export const appRouter = router({
  health: publicProcedure.query(() => {
    return { ok: true, time: new Date().toISOString()};
  }),
  auth: authRouter,
  ai: aiRouter,
  session: sessionRouter,
  message: messagesRouter,
});

export type AppRouter = typeof appRouter;