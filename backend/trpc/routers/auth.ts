import { z } from "zod";
import { router, publicProcedure } from "../trpc";
import bcrypt from "bcryptjs";

export const authRouter = router({
    signup: publicProcedure
        .input(z.object({
            name: z.string().min(2).max(50).optional(),
            email: z.string().email(),
            password: z.string().min(8).max(100),
        }))
        .mutation(async ({ input, ctx }) => {
            const email = input.email.toLowerCase().trim();
            const existing = await ctx.prisma.user.findUnique({ where: { email } });
            if (existing){
                throw new Error("Email already in use");
            }
            const passwordHash = await bcrypt.hash(input.password, 10);
            const user = await ctx.prisma.user.create({
                data: {
                    email,
                    name: input.name?.trim(),
                    password: passwordHash,
                },
                select: { id: true, email: true, name: true },
            });
            return user;
        })
});

