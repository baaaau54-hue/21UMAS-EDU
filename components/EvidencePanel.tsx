import React, { useState } from 'react';
import { Scale, CheckCircle, HelpCircle, Book } from 'lucide-react';

interface EvidencePanelProps {
  onSubmit: (prompt: string, systemInstruction?: string) => void;
}

export const EvidencePanel: React.FC<EvidencePanelProps> = ({ onSubmit }) => {
  const [question, setQuestion] = useState('');

  const handleSubmit = () => {
    if (!question) return;
    
    const systemInstruction = `
      أنت "حارس الدليل" (Evidence Sentinel).
      مهمتك: تقييم الأسئلة السريرية بناءً على الطب المبني على البراهين (EBM).
      
      المنهجية:
      1. ابحث عن **Systematic Reviews** و **Meta-analyses** (Cochrane, PubMed).
      2. صنف الدليل حسب المستويات (Level 1a, 1b, 2a...).
      3. حدد درجة التوصية (GRADE: Strong/Weak).
      4. كن حازماً: إذا كان الدليل ضعيفاً أو متضارباً، قل ذلك بوضوح.
      5. اذكر الدراسات الرئيسية (Landmark Trials) إن وجدت.
    `.trim();

    const prompt = `
**طلب تقييم EBM**
السؤال السريري (PICO): "${question}"

قم بمراجعة الأدبيات الطبية، حدد مستوى الدليل، وأعط التوصية النهائية.
    `.trim();

    onSubmit(prompt, systemInstruction);
  };

  return (
    <div className="flex-1 overflow-y-auto p-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8 flex items-center gap-4">
          <div className="w-16 h-16 bg-gradient-to-br from-slate-600 to-gray-700 rounded-2xl flex items-center justify-center shadow-2xl shadow-gray-900/30">
            <Scale size={32} className="text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-white">حارس الدليل (EBM)</h2>
            <p className="text-gray-300">Evidence-Based Medicine Evaluator & Grader</p>
          </div>
        </div>

        <div className="glass-panel p-6 rounded-3xl border border-white/5 space-y-6">
          
          <div className="flex flex-col items-center justify-center p-6 bg-[#0f172a]/50 rounded-xl border border-gray-700 text-center">
             <Book size={32} className="text-gray-500 mb-2" />
             <p className="text-gray-400 text-sm">أداة للتحقق من الادعاءات الطبية، العلاجات الجدلية، وأفضل الممارسات بناءً على الدراسات المحكمة.</p>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-400">السؤال السريري / الفرضية</label>
            <textarea 
              value={question} onChange={e => setQuestion(e.target.value)}
              className="w-full bg-[#0f172a] border border-gray-700 rounded-xl p-4 text-white focus:border-slate-500 focus:ring-1 focus:ring-slate-500 transition-all h-32 resize-none"
              placeholder="مثال: Is Hydroxychloroquine effective for COVID-19 prophylaxis? 
أو: Steroids in viral pharyngitis effectiveness?"
            />
          </div>

          <button 
            onClick={handleSubmit}
            disabled={!question}
            className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all ${
              question 
                ? 'bg-gradient-to-r from-slate-600 to-gray-600 text-white hover:shadow-lg hover:shadow-gray-500/20' 
                : 'bg-gray-800 text-gray-500 cursor-not-allowed'
            }`}
          >
            <CheckCircle size={20} />
            <span>تقييم قوة الدليل (Evaluate Evidence)</span>
          </button>
        </div>
      </div>
    </div>
  );
};