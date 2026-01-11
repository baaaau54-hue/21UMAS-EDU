import React, { useState } from 'react';
import { Microscope, Search, Database, Layers } from 'lucide-react';

interface ResearchPanelProps {
  onSubmit: (prompt: string, systemInstruction?: string) => void;
}

export const ResearchPanel: React.FC<ResearchPanelProps> = ({ onSubmit }) => {
  const [pico, setPico] = useState({ p: '', i: '', c: '', o: '' });

  const handleSubmit = () => {
    if (!pico.p || !pico.i) return;
    
    const systemInstruction = `
      أنت "مساعد البحث العلمي الأكاديمي" (Academic Research Assistant).
      مهمتك: مساعدة الباحثين في بناء استراتيجيات البحث العلمي ومنهجية PICO.
      
      المطلوب:
      1. صياغة سؤال بحثي دقيق (Research Question).
      2. إنشاء "Search Strategy" احترافية لقواعد البيانات (مثل PubMed Mesh Terms).
      3. اقتراح نوع الدراسة المناسب (RCT, Cohort, Systematic Review).
      4. كتابة ملخص علمي عن المتوقع إيجاده.
    `.trim();

    const prompt = `
**بناء استراتيجية بحث (PICO Framework)**
- Population (المجموعة): ${pico.p}
- Intervention (التدخل): ${pico.i}
- Comparison (المقارنة): ${pico.c || 'None'}
- Outcome (النتيجة): ${pico.o}

قم بتحليل هذا البحث وتوليد كلمات مفتاحية (Keywords) و Search String.
    `.trim();

    onSubmit(prompt, systemInstruction);
  };

  return (
    <div className="flex-1 overflow-y-auto p-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8 flex items-center gap-4">
          <div className="w-16 h-16 bg-gradient-to-br from-cyan-600 to-blue-700 rounded-2xl flex items-center justify-center shadow-2xl shadow-blue-900/30">
            <Microscope size={32} className="text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-white">صانع الأبحاث (PICO)</h2>
            <p className="text-cyan-300">منهجية البحث العلمي المبني على الدليل</p>
          </div>
        </div>

        <div className="glass-panel p-6 rounded-3xl border border-white/5 space-y-6">
          
          <div className="grid gap-4">
             <PicoInput icon="P" label="Population / Patient" desc="من هم المرضى؟ ما هي المشكلة؟" val={pico.p} setVal={v => setPico({...pico, p: v})} />
             <PicoInput icon="I" label="Intervention" desc="ما هو العلاج أو الاختبار الذي تريد دراسته؟" val={pico.i} setVal={v => setPico({...pico, i: v})} />
             <PicoInput icon="C" label="Comparison" desc="بماذا تقارنه؟ (اختياري)" val={pico.c} setVal={v => setPico({...pico, c: v})} />
             <PicoInput icon="O" label="Outcome" desc="ما النتيجة التي تأمل تحقيقها أو قياسها؟" val={pico.o} setVal={v => setPico({...pico, o: v})} />
          </div>

          <button 
            onClick={handleSubmit}
            disabled={!pico.p || !pico.i}
            className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all ${
              pico.p && pico.i 
                ? 'bg-gradient-to-r from-cyan-600 to-blue-700 text-white hover:shadow-lg hover:shadow-cyan-500/20' 
                : 'bg-gray-800 text-gray-500 cursor-not-allowed'
            }`}
          >
            <Database size={20} />
            <span>توليد استراتيجية البحث (Search Strategy)</span>
          </button>
        </div>
      </div>
    </div>
  );
};

const PicoInput = ({ icon, label, desc, val, setVal }: any) => (
  <div className="flex gap-4 items-start bg-[#1e293b]/50 p-4 rounded-xl border border-gray-700 focus-within:border-cyan-500 transition-colors">
    <div className="w-8 h-8 rounded bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold text-lg shrink-0">
      {icon}
    </div>
    <div className="flex-1">
      <label className="block text-sm font-bold text-gray-300 mb-1">{label}</label>
      <input 
        type="text" 
        value={val}
        onChange={e => setVal(e.target.value)}
        placeholder={desc}
        className="w-full bg-transparent text-white focus:outline-none placeholder-gray-600"
      />
    </div>
  </div>
);