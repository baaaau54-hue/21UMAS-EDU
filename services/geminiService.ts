import { GoogleGenAI } from "@google/genai";
import { Message, GroundingSource, ModelMode } from '../types';

const getClient = () => {
  // Check for user-provided key in localStorage first
  const localKey = typeof window !== 'undefined' ? localStorage.getItem('21umas_user_api_key') : null;
  const apiKey = localKey || process.env.API_KEY;

  if (!apiKey) {
    throw new Error("API Key not found. Please add your key in settings.");
  }
  return new GoogleGenAI({ apiKey });
};

// Helper function for delay
const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Retry logic wrapper
const generateWithRetry = async (
  ai: GoogleGenAI,
  params: any,
  retries = 3,
  initialDelay = 2000
): Promise<any> => {
  try {
    return await ai.models.generateContent(params);
  } catch (error: any) {
    const msg = error.message || '';
    // Retry on Rate Limit (429) or Server Overload (503)
    const isRetryable = 
      msg.includes('429') || 
      msg.includes('503') || 
      msg.includes('RESOURCE_EXHAUSTED') || 
      msg.includes('quota') ||
      msg.includes('overloaded');
    
    if (retries > 0 && isRetryable) {
      console.warn(`Gemini API Request failed with ${msg}. Retrying in ${initialDelay}ms... (Attempts left: ${retries})`);
      await wait(initialDelay);
      return generateWithRetry(ai, params, retries - 1, initialDelay * 2);
    }
    throw error;
  }
};

export const generateResponse = async (
  history: Message[],
  currentPrompt: string,
  imageBase64: string | undefined,
  mode: ModelMode,
  customSystemInstruction?: string
): Promise<{ text: string; sources: GroundingSource[] }> => {
  const ai = getClient();
  
  const modelName = mode === 'pro' ? 'gemini-2.5-pro' : 'gemini-2.5-flash';

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

    // Execute with Retry
    const response = await generateWithRetry(ai, {
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
    
    let errorMessage = error.message || JSON.stringify(error);

    // Friendly Error Handling
    if (errorMessage.includes("429") || errorMessage.includes("quota") || errorMessage.includes("RESOURCE_EXHAUSTED")) {
      if (mode === 'pro') {
        throw new Error("⚠️ تم تجاوز حد الاستخدام لنموذج Pro (Quota Exceeded). هذا النموذج تجريبي وقد تكون حدوده منخفضة حتى للحسابات المدفوعة. يرجى التبديل إلى وضع Flash أو المحاولة لاحقاً.");
      } else {
        throw new Error("⚠️ تم تجاوز حد الاستخدام (Quota Exceeded). يرجى التحقق من إعدادات الفوترة للمفتاح المستخدم أو إضافة مفتاح بديل من الإعدادات.");
      }
    }
    
    if (errorMessage.includes("503") || errorMessage.includes("overloaded")) {
      throw new Error("⚠️ الخادم مشغول جداً (Server Overloaded). يرجى المحاولة مرة أخرى.");
    }

    if (errorMessage.includes("API Key not found")) {
      throw new Error("⚠️ مفتاح النظام مفقود. يرجى إضافته من الإعدادات.");
    }

    // Handle Clean Output for raw JSON errors
    if (errorMessage.includes("{")) {
       try {
         const match = errorMessage.match(/"message":\s*"([^"]+)"/);
         if (match && match[1]) {
           errorMessage = match[1];
         }
       } catch (e) {
         // Keep original if parsing fails
       }
    }

    throw new Error(errorMessage || "حدث خطأ غير متوقع في الاتصال بالنظام.");
  }
};
