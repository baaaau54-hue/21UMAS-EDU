import { GoogleGenAI } from "@google/genai";
import { Message, GroundingSource, ModelMode } from '../types';

const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key not found in environment variables");
  }
  return new GoogleGenAI({ apiKey });
};

export const generateResponse = async (
  history: Message[],
  currentPrompt: string,
  imageBase64: string | undefined,
  mode: ModelMode,
  customSystemInstruction?: string // New optional parameter
): Promise<{ text: string; sources: GroundingSource[] }> => {
  const ai = getClient();
  
  const modelName = mode === 'pro' ? 'gemini-3-pro-preview' : 'gemini-3-flash-preview';

  // Default Persona
  let systemInstruction = `
    أنت "21UMAS ${mode === 'pro' ? 'PRO' : 'FLASH'}"، المساعد الطبي الرسمي لجامعة 21 سبتمبر.
    الوضع الحالي: ${mode === 'pro' ? 'استدلال عميق (Deep Reasoning)' : 'سرعة فائقة (High Speed)'}
    المهام: تحليل الصور، التشخيص، الدواء.
    اللغة: العربية الطبية.
  `;

  // Override if tool specific instruction is provided
  if (customSystemInstruction) {
    systemInstruction = customSystemInstruction;
  }

  try {
    const currentParts: any[] = [{ text: currentPrompt }];
    
    if (imageBase64) {
      const base64Data = imageBase64.split(',')[1] || imageBase64;
      currentParts.unshift({
        inlineData: {
          mimeType: 'image/jpeg',
          data: base64Data
        }
      });
    }

    const contents = [
      ...history.map(msg => ({
        role: msg.role,
        parts: [{ text: msg.content }]
      })),
      {
        role: 'user',
        parts: currentParts
      }
    ];

    const config: any = {
      systemInstruction: systemInstruction,
      tools: [{ googleSearch: {} }],
    };

    if (mode === 'pro') {
      config.thinkingConfig = { thinkingBudget: 2048 };
    }

    const response = await ai.models.generateContent({
      model: modelName,
      contents: contents,
      config: config
    });

    const text = response.text || "عذراً، لا توجد استجابة.";
    
    const sources: GroundingSource[] = [];
    const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
    
    if (chunks) {
      chunks.forEach((chunk: any) => {
        if (chunk.web?.uri && chunk.web?.title) {
          sources.push({
            title: chunk.web.title,
            uri: chunk.web.uri
          });
        }
      });
    }

    return { text, sources };

  } catch (error: any) {
    console.error("Gemini API Error:", error);
    throw new Error(error.message || "An unexpected error occurred.");
  }
};