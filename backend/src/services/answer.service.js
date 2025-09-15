import { GoogleGenAI } from "@google/genai"

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY2
});

export const GenerateAnswer = async (prompt) => {
    const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: prompt,
        config: {
            systemInstruction: `
            you have to read all prompts and answer it step by step
            you have to generate proper and accurate answer of prompts
            do not use star pattern use points and generate answer in point wise
            generate answer in clean and proper format
            you should use numbers for answer
            when you give answer then do not use star pattern
            if you get greeting prompt then you have to greet only
            always give answer with emoji and make it more interactive
            if free token left then show message you don't have enough token please purchase and add you'r link for subscription
            `
        }
    });
    return response.text
}