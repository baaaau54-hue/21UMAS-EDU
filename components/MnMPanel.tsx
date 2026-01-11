import React, { useState } from 'react';
import { AlertOctagon, HeartCrack, MessageCircleWarning, ShieldAlert } from 'lucide-react';

interface MnMPanelProps {
  onSubmit: (prompt: string, systemInstruction?: string) => void;
}

export const MnMPanel: React.FC<MnMPanelProps> = ({ onSubmit }) => {
  const [complication, setComplication] = useState('');

  const handleSubmit = () => {
    if (!complication) return;
    
    const systemInstruction = `
      أنت "مدير جودة الرعاية الصحية" (Clinical Quality Officer).
      مهمتك: إجراء تحليل (Morbidity & Mortality - M&M) تعليمي عميق.
      
      المنهجية:
      1. **Root Cause Analysis (RCA)**: استخدم "طريقة الأسباب الخمسة" (5 Whys) أو مخطط عظم السمكة لتحديد سبب الخطأ (هل هو تقني؟ أم نظامي؟).
      2. **Learning Points**: ما الدروس المستفادة لمنع التكرار؟
      3. **Management**: كيف يتم تدبير المضاعفة طبياً الآن؟
      4. **Disclosure Script**: (مهم جداً) اكتب "سيناريو حوار" دقيق لما يجب أن يقوله الطبيب للمريض أو عائلته للاعتراف بالخطأ بمهنية دون التورط قانونياً بشكل غير عادل، ولكن بشفافية (Duty of Candor).
    `.trim();

    const prompt = `
**M&M CASE ANALYSIS**
Scenario/Complication: ${complication}

Conduct a full Root Cause Analysis and provide a Disclosure Script for the family.
    `.trim();

    onSubmit(prompt, systemInstruction);
  };

  return (
    <div className="flex-1 overflow-y-auto p-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8 flex items-center gap-4">
          <div className="w-16 h-16 bg-gradient-to-br from-rose-600 to-red-700 rounded-2xl flex items-center justify-center shadow-2xl shadow-red-900/30">
            <AlertOctagon size={32} className="text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-white">محاكي M&M</h2>
            <p className="text-rose-300">تحليل الوفيات والمضاعفات & مصارحة المرضى</p>
          </div>
        </div>

        <div className="glass-panel p-6 rounded-3xl border border-white/5 space-y-6 border-l-4 border-l-rose-500">
          
          <div className="p-4 bg-rose-500/10 rounded-xl border border-rose-500/20 text-rose-200 text-sm flex gap-3">
             <HeartCrack size={24} className="shrink-0" />
             <p>
               التعلم من الأخطاء هو جوهر الطب. صف خطأ طبياً أو مضاعفة جراحية حدثت (مثلاً: Bile Duct Injury, Wrong Site Surgery, Missed Diagnosis). سيساعدك النظام على تحليل السبب الجذري وكيفية إخبار المريض.
             </p>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-400 flex items-center gap-2"><ShieldAlert size={16}/> وصف المضاعفة / الخطأ</label>
            <textarea 
              value={complication}
              onChange={e => setComplication(e.target.value)}
              className="w-full bg-[#0f172a] border border-gray-700 rounded-xl p-4 text-white focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-all h-32 resize-none"
              placeholder="مثال: During laparoscopic cholecystectomy, accidental clipping of common bile duct occurred..."
            />
          </div>

          <button 
            onClick={handleSubmit}
            disabled={!complication}
            className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all ${
              complication 
                ? 'bg-gradient-to-r from-rose-600 to-red-600 text-white hover:shadow-lg hover:shadow-red-500/20' 
                : 'bg-gray-800 text-gray-500 cursor-not-allowed'
            }`}
          >
            <MessageCircleWarning size={20} />
            <span>تحليل السبب الجذري وسيناريو المصارحة</span>
          </button>
        </div>
      </div>
    </div>
  );
};