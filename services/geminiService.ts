import { GoogleGenAI } from "@google/genai";

/**
 * Lazy-initializes the GoogleGenAI instance.
 * This ensures that if process.env.API_KEY is missing at load time, 
 * the app doesn't crash immediately.
 */
function getAI() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("Gemini API Key is not configured.");
  }
  return new GoogleGenAI({ apiKey });
}

export const geminiService = {
  async getStudyAdvice(subject: string, progress: number) {
    try {
      const ai = getAI();
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `I am a student at SCSMCOE Engineering College. I am at ${progress}% in ${subject}. Give me 3 bullet points of high-impact study advice and 1 free resource link. Keep it very short and professional.`,
      });
      return response.text || "Focus on fundamental concepts and practice previous year question papers.";
    } catch (e) {
      console.warn("Study advice AI failed:", e);
      return "Focus on fundamental concepts and practice previous year question papers.";
    }
  },

  async summarizeNotice(content: string) {
    try {
      const ai = getAI();
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Summarize this college notice in 10 words or less: ${content}`,
      });
      return response.text || "Important update regarding campus activities.";
    } catch (e) {
      console.warn("Summarization AI failed:", e);
      return "Important update regarding campus activities.";
    }
  }
};