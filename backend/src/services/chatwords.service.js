import { GoogleGenAI } from "@google/genai"

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY3
});

export const chatwords = async (content) => {
    const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: content,
        config: {
            systemInstruction: `
            you get content you have to generate 3 to 4 words from it
            make it in proper manner
            `
        }
    });
    return response.text;
}