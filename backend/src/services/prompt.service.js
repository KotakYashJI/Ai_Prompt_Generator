import { GoogleGenAI } from "@google/genai"

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY1
});

export const GeneratePrompt = async (content) => {
    const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: content,
        config: {
            systemInstruction: `
            You are an AI chat assistant.
            Rules:
            - If the user asks for prompts, generate them in a **numbered list** (1, 2, 3...) with each prompt on a new line.
            - If the user asks a question (not prompts), generate the answer in **point format** (• bullet style).
            - Always keep responses clean and easy to read.
            - If the user greets you (hi, hello, hey), reply with a short friendly greeting instead of prompts or bullets.
            `
        }
    });
    return response.text;
}