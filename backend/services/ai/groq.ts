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
        const userMessage = messages[messages.length - 1]?.content?.toLowerCase() || "";
        const careerKeywords = [
            "career", "job", "resume", "interview", "cv", "work", "profession", "skills", "employment", "internship", "growth", "promotion", "salary", "company", "industry", "role", "position", "networking", "opportunity", "education", "college", "university", "course", "field", "domain", "career path", "career advice", "career roadmap",
            "developer", "software engineer", "programmer", "coding", "tech career", "roadmap", "engineer", "technology", "it", "web development", "frontend", "backend", "fullstack", "data science", "machine learning", "ai", "computer science", "hackathon", "bootcamp", "project", "portfolio", "github", "coding interview", "leetcode", "system design", "startup", "freelance", "remote work", "tech job", "tech industry"
        ];
        const isCareerRelated = careerKeywords.some(kw => userMessage.includes(kw));
        if (!isCareerRelated) {
            return "I'm here to help with career advice and guidance. Please ask a career-related question!";
        }

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





