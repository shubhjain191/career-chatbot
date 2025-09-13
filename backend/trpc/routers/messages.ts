import { z } from "zod";
import { router, protectedProcedure } from "../trpc";

export const messagesRouter = router({
  listBySession: protectedProcedure
    .input(
      z.object({
        sessionId: z.string(),
        limit: z.number().min(1).max(100).default(50),
        cursor: z.string().nullish(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { prisma, userId } = ctx;
      const session = await prisma.chatSession.findFirst({
        where: { id: input.sessionId, userId },
        select: { id: true },
      });
      if (!session) {
        throw new Error("Session not found");
      }

      const messages = await prisma.message.findMany({
        where: { sessionId: input.sessionId },
        orderBy: { createdAt: "asc" },
        take: input.limit + 1,
        cursor: input.cursor ? { id: input.cursor } : undefined,
        select: {
          id: true,
          role: true,
          content: true,
          createdAt: true,
        },
      });

      let nextCursor: typeof input.cursor | undefined = undefined;
      if (messages.length > input.limit) {
        const nextItem = messages.pop();
        nextCursor = nextItem?.id;
      }

      return {
        items: messages,
        nextCursor,
      };
    }),

  addUserMessage: protectedProcedure
    .input(
      z.object({
        sessionId: z.string(),
        content: z.string().min(1),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { prisma, userId } = ctx;
      const session = await prisma.chatSession.findFirst({
        where: { id: input.sessionId, userId },
        select: { id: true },
      });
      if (!session) {
        throw new Error("Session not found");
      }

      return prisma.message.create({
        data: {
          sessionId: input.sessionId,
          role: "user",
          content: input.content,
        },
        select: {
          id: true,
          role: true,
          content: true,
          createdAt: true,
        },
      });
    }),

  addAssistantMessage: protectedProcedure
    .input(
      z.object({
        sessionId: z.string(),
        content: z.string().min(1),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { prisma, userId } = ctx;
      const session = await prisma.chatSession.findFirst({
        where: { id: input.sessionId, userId },
        select: { id: true },
      });
      if (!session) {
        throw new Error("Session not found");
      }

      return prisma.message.create({
        data: {
          sessionId: input.sessionId,
          role: "assistant",
          content: input.content,
        },
        select: {
          id: true,
          role: true,
          content: true,
          createdAt: true,
        },
      });
    }),
});