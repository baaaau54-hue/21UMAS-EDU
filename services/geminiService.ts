import { GoogleGenAI } from "@google/genai";
import { Message, GroundingSource, ModelMode } from '../types';

const getClient = () => {
  const localKey = typeof window !== 'undefined' ? localStorage.getItem('21umas_user_api_key') : null;
  const apiKey = localKey || process.env.API_KEY;

  if (!apiKey) {
    throw new Error("API Key not found. Please add your key in settings.");
  }
  return new GoogleGenAI({ apiKey });
};

// Helper function for delay
const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Wrapper to initiate stream with robust retry logic for "unlimited" wait feel
const streamWithRetry = async (
  ai: GoogleGenAI,
  params: any,
  retries = 50, // High retry count to simulate "unlimited" wait time during overloads/timeouts
  initialDelay = 2000
): Promise<any> => {
  try {
    return await ai.models.generateContentStream(params);
  } catch (error: any) {
    const msg = error.message || '';
    // Retry on various transient errors including Timeouts, Rate Limits, and Server Errors
    const isRetryable = 
      msg.includes('429') || 
      msg.includes('503') || 
      msg.includes('504') ||
      msg.includes('RESOURCE_EXHAUSTED') || 
      msg.includes('quota') ||
      msg.includes('overloaded') ||
      msg.toLowerCase().includes('timeout') ||
      msg.toLowerCase().includes('network error') ||
      msg.toLowerCase().includes('failed to fetch');
    
    if (retries > 0 && isRetryable) {
      // Log retry attempt (silent to user, visible in console)
      console.warn(`Gemini API Retry (${50 - retries + 1}/50): ${msg}. Waiting ${initialDelay}ms...`);
      
      // Cap the maximum delay to 30 seconds to maintain some responsiveness while persisting
      const nextDelay = Math.min(initialDelay * 1.5, 30000); 
      await wait(initialDelay);
      return streamWithRetry(ai, params, retries - 1, nextDelay);
    }
    throw error;
  }
};

export const streamResponse = async (
  history: Message[],
  currentPrompt: string,
  imageBase64: string | undefined,
  mode: ModelMode,
  onUpdate: (content: string, thinking: string, isDone: boolean, sources?: GroundingSource[]) => void,
  customSystemInstruction?: string
) => {
  const ai = getClient();
  const modelName = mode === 'flash' ? 'gemini-2.5-pro' : 'gemini-2.5-flash';

  let systemInstruction = `
    أنت "21UMAS ${mode === 'pro' ? 'PRO' : 'FLASH'}"، المساعد الطبي الرسمي لجامعة 21 سبتمبر.
    الوضع الحالي: ${mode === 'pro' ? 'استدلال عميق (Deep Reasoning)' : 'سرعة فائقة (High Speed)'}
    المهام: تحليل الصور، التشخيص، الدواء.
    اللغة: العربية الطبية.
  `;

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

    const streamResult = await streamWithRetry(ai, {
      model: modelName,
      contents: contents,
      config: config
    });

    let fullText = '';
    let fullThinking = '';
    let finalSources: GroundingSource[] = [];

    for await (const chunk of streamResult) {
      // Extract Text
      const chunkText = chunk.text || '';
      
      // In current preview models, thinking content might be interleaved or separate.
      // We rely on the UI to show "Thinking..." if text is empty.
      
      const candidates = chunk.candidates || [];
      fullText += chunkText;

      // Extract Grounding
      const chunks = candidates[0]?.groundingMetadata?.groundingChunks;
      if (chunks) {
        chunks.forEach((c: any) => {
          if (c.web?.uri && c.web?.title) {
            finalSources.push({ title: c.web.title, uri: c.web.uri });
          }
        });
      }

      onUpdate(fullText, fullThinking, false, finalSources);
    }

    onUpdate(fullText, fullThinking, true, finalSources);

  } catch (error: any) {
    console.error("Gemini Stream Error:", error);
    let errorMessage = error.message || JSON.stringify(error);
    
    if (errorMessage.includes("429") || errorMessage.includes("quota")) {
       if (mode === 'pro') throw new Error("⚠️ تم تجاوز حد الاستخدام لنموذج Pro (Quota). يرجى التبديل إلى Flash.");
       else throw new Error("⚠️ تم تجاوز حد الاستخدام (Quota). يرجى استخدام مفتاح خاص.");
    }
    throw new Error(errorMessage);
  }
};
