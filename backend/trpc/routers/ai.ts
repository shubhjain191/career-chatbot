import { z } from "zod";
import { router, publicProcedure, protectedProcedure } from "../trpc";
import { CAREER_SYSTEM_PROMPT } from "@/backend/services/ai/prompt";
import { getCareerCounselReply } from "@/backend/services/ai/groq";

const MessageSchema = z.object({
    role: z.enum(["user", "system", "assistant"]),
    content: z.string().min(1),
});

type Message = z.infer<typeof MessageSchema>;

export const aiRouter = router({
    counsel: protectedProcedure
        .input(z.object({ userInput: z.string().min(1), context: z.array(MessageSchema).optional()}))
        .mutation(async ({ input, ctx }) => {
            const prior: Message[] = input.context ?? [];
            const messages: Message[] = [
                { role: "system", content: CAREER_SYSTEM_PROMPT },
                ...prior.slice(-10),
                { role: "user", content: input.userInput },
            ];
            const reply = await getCareerCounselReply(messages);
            return { reply };
        }),
});