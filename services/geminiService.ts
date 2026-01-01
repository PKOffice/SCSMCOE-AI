
import { GoogleGenAI } from "@google/genai";

// Strictly follow the initialization guideline using process.env.API_KEY directly
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const geminiService = {
  async getStudyAdvice(subject: string, progress: number) {
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `I am a student at SCSMCOE Engineering College. I am at ${progress}% in ${subject}. Give me 3 bullet points of high-impact study advice and 1 free resource link. Keep it very short and professional.`,
      });
      // response.text is a property, not a method
      return response.text;
    } catch (e) {
      return "Focus on fundamental concepts and practice previous year question papers.";
    }
  },

  async summarizeNotice(content: string) {
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Summarize this college notice in 10 words or less: ${content}`,
      });
      // response.text is a property, not a method
      return response.text;
    } catch (e) {
      return "Important update regarding campus activities.";
    }
  }
};
