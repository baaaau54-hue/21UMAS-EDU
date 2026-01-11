import React, { useState } from 'react';
import { Brain, MessageSquare, AlertTriangle } from 'lucide-react';

interface PsychPanelProps {
  onSubmit: (prompt: string, systemInstruction?: string) => void;
}

export const PsychPanel: React.FC<PsychPanelProps> = ({ onSubmit }) => {
  const [observations, setObservations] = useState('');

  const handleSubmit = () => {
    if (!observations) return;
    
    const systemInstruction = `
      أنت "استشاري الطب النفسي" (Psychiatrist).
      مهمتك: بناء تقييم للحالة العقلية (Mental State Examination - MSE) بناءً على المدخلات.
      
      الهيكل المطلوب للتقرير:
      1. **Appearance & Behavior**: المظهر العام، التواصل البصري، الحركة النفسية (Agitation/Retardation).
      2. **Speech**: السرعة، النبرة، الحجم.
      3. **Mood & Affect**: الحالة المزاجية (Subjective) والتعبير العاطفي (Objective).
      4. **Thought**: الشكل (Flight of ideas, Tangentiality) والمحتوى (Delusions, Obsessions).
      5. **Perception**: الهلوسات (Hallucinations).
      6. **Cognition & Insight**: الإدراك والبصيرة بالحالة.
      7. **Risk Assessment**: تقييم خطر الانتحار أو إيذاء الآخرين.
    `.trim();

    const prompt = `
**PSYCHIATRIC EVALUATION REQUEST**
Clinical Observations / Patient Quote:
"${observations}"

Generate a structured Mental State Examination (MSE) and Risk Assessment based on this data.
    `.trim();

    onSubmit(prompt, systemInstruction);
  };

  return (
    <div className="flex-1 overflow-y-auto p-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8 flex items-center gap-4">
          <div className="w-16 h-16 bg-gradient-to-br from-violet-600 to-indigo-700 rounded-2xl flex items-center justify-center shadow-2xl shadow-indigo-900/30">
            <Brain size={32} className="text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-white">بصيرة النفس</h2>
            <p className="text-violet-300">Psych-Mind: تقييم الحالة العقلية والمخاطر</p>
          </div>
        </div>

        <div className="glass-panel p-6 rounded-3xl border border-white/5 space-y-6">
          
          <div className="p-4 bg-violet-500/10 border border-violet-500/20 rounded-xl flex gap-3 items-start">
             <AlertTriangle className="text-violet-400 shrink-0 mt-1" size={20} />
             <p className="text-sm text-gray-300">
               أدخل حديث المريض حرفياً (Quotes) أو ملاحظاتك عن سلوكه. سيقوم النظام بتحليل نمط الكلام والأفكار لتكوين تقرير MSE احترافي.
             </p>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-gray-400 font-bold flex items-center gap-2"><MessageSquare size={16}/> ملاحظات سريرية / حديث المريض</label>
            <textarea 
              value={observations}
              onChange={e => setObservations(e.target.value)}
              className="w-full bg-[#0f172a] border border-gray-700 rounded-xl p-4 text-white focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all h-48 resize-none leading-relaxed"
              placeholder='مثال: المريض يتحدث بسرعة كبيرة، ينتقل من موضوع لآخر، يقول "أنا الملك والناس يلاحقوني"، يضحك بلا سبب...'
            />
          </div>

          <button 
            onClick={handleSubmit}
            disabled={!observations}
            className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all ${
              observations 
                ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white hover:shadow-lg hover:shadow-violet-500/20' 
                : 'bg-gray-800 text-gray-500 cursor-not-allowed'
            }`}
          >
            <Brain size={20} />
            <span>توليد تقرير MSE وتقييم المخاطر</span>
          </button>
        </div>
      </div>
    </div>
  );
};