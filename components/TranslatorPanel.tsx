import React, { useState } from 'react';
import { Languages, MessageCircle, RefreshCw } from 'lucide-react';

interface TranslatorPanelProps {
  onSubmit: (prompt: string, systemInstruction?: string) => void;
}

export const TranslatorPanel: React.FC<TranslatorPanelProps> = ({ onSubmit }) => {
  const [text, setText] = useState('');
  const [dialect, setDialect] = useState('لهجة صنعانية (يمني)');

  const handleSubmit = () => {
    if (!text) return;
    
    const systemInstruction = `
      أنت "المترجم الطبي الثقافي" (Cultural Medical Interpreter).
      مهمتك: تحويل التعليمات الطبية المعقدة إلى لغة بسيطة جداً وباللهجة المحلية المطلوبة، لضمان فهم المريض (خاصة كبار السن والأميين).
      
      اللهجة المطلوبة: ${dialect}.
      
      القواعد:
      1. بسّط المصطلحات (مثلاً: "Hypertension" -> "ارتفاع الضغط" أو "الضغط").
      2. استخدم مصطلحات محلية ودودة (يا والد، يا حجة، انتبه لنفسك).
      3. حول الأرقام والجداول إلى كلام مفهوم (مثلاً: "مرة الصباح ومرة المساء" بدلاً من "BID").
      4. تأكد من أن النبرة محترمة ومطمئنة.
    `.trim();

    const prompt = `
**طلب ترجمة طبية ثقافية**
النص الطبي: "${text}"

الرجاء ترجمة هذا الكلام للمريض باللهجة: ${dialect}.
    `.trim();

    onSubmit(prompt, systemInstruction);
  };

  return (
    <div className="flex-1 overflow-y-auto p-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8 flex items-center gap-4">
          <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-rose-500 rounded-2xl flex items-center justify-center shadow-2xl shadow-rose-900/30">
            <Languages size={32} className="text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-white">المترجم الطبي الثقافي</h2>
            <p className="text-pink-300">توطين التعليمات الطبية للهجات المحلية (Polyglot Medic)</p>
          </div>
        </div>

        <div className="glass-panel p-6 rounded-3xl border border-white/5 space-y-6">
          
          <div className="space-y-2">
            <label className="text-sm text-gray-400">اختر اللهجة المستهدفة</label>
            <select 
              value={dialect} onChange={e => setDialect(e.target.value)}
              className="w-full bg-[#0f172a] border border-gray-700 rounded-xl p-3 text-white focus:border-pink-500"
            >
              <option>لهجة صنعانية (يمني)</option>
              <option>لهجة تعزية (يمني)</option>
              <option>لهجة عدنية (يمني)</option>
              <option>لهجة تهامية (يمني)</option>
              <option>لهجة حضرمية (يمني)</option>
              <option>لهجة مصرية (عامية)</option>
              <option>لهجة خليجية (عامية)</option>
              <option>لغة عربية فصحى مبسطة (للمتعلمين)</option>
              <option>English (Simple Terms)</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-gray-400">التعليمات الطبية (اكتبها بالفصحى أو الإنجليزية)</label>
            <textarea 
              value={text} onChange={e => setText(e.target.value)}
              className="w-full bg-[#0f172a] border border-gray-700 rounded-xl p-4 text-white focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition-all h-32 resize-none"
              placeholder="مثال: Take Amoxicillin 500mg every 8 hours for 7 days. Take after food. Report skin rash."
            />
          </div>

          <button 
            onClick={handleSubmit}
            disabled={!text}
            className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all ${
              text 
                ? 'bg-gradient-to-r from-pink-500 to-rose-600 text-white hover:shadow-lg hover:shadow-pink-500/20' 
                : 'bg-gray-800 text-gray-500 cursor-not-allowed'
            }`}
          >
            <MessageCircle size={20} />
            <span>ترجمة وتبسيط للمريض</span>
          </button>
        </div>
      </div>
    </div>
  );
};