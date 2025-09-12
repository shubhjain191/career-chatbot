import Groq from "groq-sdk";
import type { ChatCompletionCreateParams } from "groq-sdk/resources/chat/completions";

let client: Groq;

function getGroqClient(){
    if (!client){
        const apiKey = process.env.GROQ_API_KEY;
        if (!apiKey) throw new Error("GROQ_API_KEY is not set in environment variables");
        client = new Groq({ apiKey });
    }
    return client;
}

export type AiMessage = { role: "user" | "system" | "assistant"; content: string };

export async function getCareerCounselReply(messages: AiMessage[], model = "llama-3.3-70b-versatile") {
    const groq = getGroqClient();

    const params: ChatCompletionCreateParams = {
        model, 
        temperature: 0.7,
        max_tokens: 1000,
        messages,
    };

    const completion = await groq.chat.completions.create(params);
    const content = completion.choices[0]?.message?.content ?? "";
    return content.trim();
}





