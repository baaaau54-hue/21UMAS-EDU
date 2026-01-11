import React, { useState } from 'react';
import { Pill, AlertTriangle, Search, Info } from 'lucide-react';

interface DrugPanelProps {
  onSubmit: (prompt: string) => void;
}

export const DrugPanel: React.FC<DrugPanelProps> = ({ onSubmit }) => {
  const [drugQuery, setDrugQuery] = useState('');
  const [mode, setMode] = useState<'info' | 'interaction'>('info');

  const handleSubmit = () => {
    if (!drugQuery) return;
    
    let prompt = '';
    if (mode === 'info') {
      prompt = `
**طلب معلومات دوائية (Drug Monograph)**
يرجى تقديم تقرير صيدلاني شامل عن: "${drugQuery}"
يشمل: دواعي الاستعمال، الجرعات (للبالغين والأطفال)، الآثار الجانبية الشائعة والخطيرة، وموانع الاستعمال.
      `.trim();
    } else {
      prompt = `
**فحص التداخلات الدوائية (Drug Interactions Check)**
يرجى تحليل التداخلات الدوائية المحتملة بين الأدوية التالية: "${drugQuery}"
مع تحديد درجة الخطورة وتوصيات التعامل معها.
      `.trim();
    }

    onSubmit(prompt);
  };

  return (
    <div className="flex-1 overflow-y-auto p-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8 flex items-center gap-4">
          <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-emerald-900/30">
            <Pill size={32} className="text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-white">دليل الأدوية الشامل</h2>
            <p className="text-emerald-300">قاعدة بيانات فارماكولوجية ذكية</p>
          </div>
        </div>

        <div className="glass-panel p-1 rounded-2xl border border-white/5 flex mb-6">
          <button 
            onClick={() => setMode('info')}
            className={`flex-1 py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all ${mode === 'info' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'text-gray-400 hover:text-white'}`}
          >
            <Info size={16} /> معلومات دواء
          </button>
          <button 
            onClick={() => setMode('interaction')}
            className={`flex-1 py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all ${mode === 'interaction' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' : 'text-gray-400 hover:text-white'}`}
          >
            <AlertTriangle size={16} /> فحص تداخلات
          </button>
        </div>

        <div className="glass-panel p-8 rounded-3xl border border-white/5 space-y-6 text-center">
            <div className="relative">
              <input 
                type="text" 
                value={drugQuery}
                onChange={e => setDrugQuery(e.target.value)}
                className="w-full bg-[#0f172a] border border-gray-700 rounded-2xl py-4 pr-12 pl-4 text-white placeholder-gray-500 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all text-lg"
                placeholder={mode === 'info' ? "اكتب اسم الدواء (علمي أو تجاري)..." : "اكتب أسماء الأدوية مفصولة بفواصل..."}
                onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
              />
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={24} />
            </div>

            <p className="text-sm text-gray-500">
              {mode === 'info' 
                ? 'يقدم النظام بيانات الـ FDA و BNF المحدثة.' 
                : 'يتم تحليل التداخلات بناءً على قواعد البيانات السريرية العالمية.'}
            </p>

            <button 
              onClick={handleSubmit}
              disabled={!drugQuery}
              className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${
                drugQuery 
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:shadow-lg hover:shadow-emerald-500/20' 
                  : 'bg-gray-800 text-gray-500 cursor-not-allowed'
              }`}
            >
              بحث
            </button>
        </div>
      </div>
    </div>
  );
};