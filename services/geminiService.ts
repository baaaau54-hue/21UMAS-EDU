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

// Wrapper to initiate stream with retry logic
const streamWithRetry = async (
  ai: GoogleGenAI,
  params: any,
  retries = 3,
  initialDelay = 2000
): Promise<any> => {
  try {
    return await ai.models.generateContentStream(params);
  } catch (error: any) {
    const msg = error.message || '';
    const isRetryable = 
      msg.includes('429') || 
      msg.includes('503') || 
      msg.includes('RESOURCE_EXHAUSTED') || 
      msg.includes('quota') ||
      msg.includes('overloaded');
    
    if (retries > 0 && isRetryable) {
      console.warn(`Gemini Stream Init failed with ${msg}. Retrying in ${initialDelay}ms...`);
      await wait(initialDelay);
      return streamWithRetry(ai, params, retries - 1, initialDelay * 2);
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
  const modelName = mode === 'pro' ? 'gemini-3-pro-preview' : 'gemini-3-flash-preview';

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
      
      // Attempt to extract thinking content if available in parts
      // Note: The structure of thinking parts varies in preview models. 
      // We check candidates for specific 'thought' parts if exposed, otherwise we assume initial delay implies thinking.
      const candidates = chunk.candidates || [];
      const parts = candidates[0]?.content?.parts || [];
      
      let chunkThinking = '';
      
      // Heuristic: If specific thinking parts are exposed in future API versions, extract here.
      // Currently, we mostly rely on the 'Thinking...' UI state, but if the model emits separate thought blocks:
      parts.forEach((part: any) => {
         // Some experimental models label thoughts differently, or wrap them.
         // For now, we mainly stream the text.
      });

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