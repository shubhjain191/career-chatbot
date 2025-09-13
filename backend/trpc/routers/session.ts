import { z } from "zod";
import { router, protectedProcedure } from "../trpc";

export const sessionRouter = router({
    list: protectedProcedure
        .input(z.object({
            limit: z.number().min(1).max(100).default(20),
            cursor: z.string().nullish(),
        }))
        .query(async ({ input, ctx }) => {
            const { prisma, userId } = ctx;
            const sessions = await prisma.chatSession.findMany({
                where: { userId },
                orderBy: { updatedAt: "desc" },
                take: input.limit + 1,
                cursor: input.cursor ? { id: input.cursor } : undefined,
                select: {
                    id: true,
                    title: true,
                    createdAt: true,
                    updatedAt: true,
                    _count: { select: { messages: true } },
                }
            });
            let nextCursor: typeof input.cursor | undefined = undefined;
            if (sessions.length > input.limit) {
                const nextItem = sessions.pop();
                nextCursor = nextItem?.id;
            }
            return { items: sessions, nextCursor };
        }),

    create: protectedProcedure
        .input(z.object({ title: z.string().min(1).max(200) }))
        .mutation(async ({ input, ctx }) => {
            const { prisma, userId } = ctx;
            return prisma.chatSession.create({
                data: {
                    userId,
                    title: input.title,
                },
            });
        }),

        getById: protectedProcedure
            .input(z.object({ id: z.string()}))
            .query(async ({ input, ctx }) => {
                const { prisma, userId } = ctx;
                return prisma.chatSession.findFirst({
                    where: { id: input.id, userId },
                    include: {
                        messages: {
                            orderBy: { createdAt: "asc" },
                            select: {
                                id: true,
                                role: true,
                                content: true,
                                createdAt: true,
                            }
                        }
                    }
                });
            }),
});