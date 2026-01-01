import { GoogleGenAI } from "@google/genai";

/**
 * Lazy-initializes the GoogleGenAI instance.
 */
function getAI() {
  const apiKey = process.env.API_KEY;
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
        config: {
          systemInstruction: "You are an expert academic advisor at SCSMCOE. Provide brief, encouraging, and technically sound advice for engineering students.",
          temperature: 0.7,
        },
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
        config: {
          systemInstruction: "You are a professional administrative assistant. Your task is to summarize college notices with 100% factual accuracy. DO NOT add information. DO NOT use flowery language. Only the core action or news.",
          temperature: 0.1,
        },
        contents: `Summarize this college notice in 10 words or less: ${content}`,
      });
      return response.text?.replace(/["']/g, "") || "Official campus notification update.";
    } catch (e) {
      console.warn("Summarization AI failed:", e);
      return "Official campus notification update.";
    }
  },

  async getGlobalPulse(context: { noticeCount: number, liveMatches: string[], canteenSpecial: string }) {
    try {
      const ai = getAI();
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        config: {
          systemInstruction: "You are the SCSMCOE AI Voice. Create a one-sentence high-energy campus briefing.",
          temperature: 0.9,
        },
        contents: `Context: ${context.noticeCount} new notices, Live Sports: ${context.liveMatches.join(', ')}, Canteen: ${context.canteenSpecial}. Summarize the vibe of the campus in one punchy sentence for a student.`,
      });
      return response.text || "Campus is buzzing—new opportunities and live action await!";
    } catch (e) {
      return "Campus is buzzing—new opportunities and live action await!";
    }
  },

  async getOnboardingTip(userRole: string) {
    try {
      const ai = getAI();
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        config: {
          systemInstruction: "You are a Campus Growth Hacker. Give one short, punchy tip on how to use the app today.",
          temperature: 1.0,
        },
        contents: `Target user is a ${userRole}. Give them 1 specific tip to explore the app. Max 10 words.`,
      });
      return response.text || "Pre-order Misal Pav today and skip the canteen line!";
    } catch (e) {
      return "Pre-order Misal Pav today and skip the canteen line!";
    }
  }
};