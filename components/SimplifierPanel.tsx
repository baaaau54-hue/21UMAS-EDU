import React, { useState } from 'react';
import { Wand2, HeartHandshake, FileSearch } from 'lucide-react';

interface SimplifierPanelProps {
  onSubmit: (prompt: string, systemInstruction?: string) => void;
}

export const SimplifierPanel: React.FC<SimplifierPanelProps> = ({ onSubmit }) => {
  const [text, setText] = useState('');

  const handleSubmit = () => {
    if (!text) return;
    
    const systemInstruction = `
      أنت "مبسط المعلومات الطبية".
      مهمتك: شرح التقارير الطبية المعقدة بلغة عربية بسيطة جداً ومطمئنة ليفهمها المريض العادي.
      
      الأسلوب:
      1. استخدم لغة ودودة ومباشرة.
      2. تجنب المصطلحات المعقدة أو اشرحها بين قوسين.
      3. قسم الشرح إلى نقاط: "ماذا وجدنا؟"، "ماذا يعني هذا؟"، "ما الخطوة القادمة؟".
      4. استخدم التشبيهات (Analogies) إذا لزم الأمر.
      5. لا تقدم نصائح علاجية، بل اطلب مراجعة الطبيب.
    `.trim();

    const prompt = `
**طلب تبسيط تقرير للمريض**
اشرح هذا النص الطبي بلغة بسيطة:

"${text}"
    `.trim();

    onSubmit(prompt, systemInstruction);
  };

  return (
    <div className="flex-1 overflow-y-auto p-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8 flex items-center gap-4">
          <div className="w-16 h-16 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-2xl flex items-center justify-center shadow-2xl shadow-cyan-900/30">
            <HeartHandshake size={32} className="text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-white">تبسيط التقارير</h2>
            <p className="text-cyan-300">شرح النتائج الطبية بلغة يفهمها المريض</p>
          </div>
        </div>

        <div className="glass-panel p-6 rounded-3xl border border-white/5 space-y-6">
          
          <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-gray-700 rounded-2xl bg-[#0f172a]/50 hover:bg-[#0f172a] transition-colors cursor-pointer group">
             <FileSearch size={48} className="text-gray-500 group-hover:text-cyan-400 transition-colors mb-4" />
             <p className="text-gray-400 text-center text-sm">انسخ نص التقرير (أشعة، مختبر، تقرير خروج) والصقه هنا ليقوم الذكاء الاصطناعي بشرحه.</p>
          </div>

          <textarea 
            value={text}
            onChange={e => setText(e.target.value)}
            className="w-full bg-[#0f172a] border border-gray-700 rounded-xl p-4 text-white focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all h-32 resize-none"
            placeholder="مثال: MRI shows mild L4-L5 disc bulge compressing the nerve root..."
          />

          <button 
            onClick={handleSubmit}
            disabled={!text}
            className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all ${
              text 
                ? 'bg-gradient-to-r from-teal-500 to-cyan-600 text-white hover:shadow-lg hover:shadow-cyan-500/20' 
                : 'bg-gray-800 text-gray-500 cursor-not-allowed'
            }`}
          >
            <Wand2 size={20} />
            <span>شرح وتبسيط (Explain Simply)</span>
          </button>
        </div>
      </div>
    </div>
  );
};