import React, { useState } from 'react';
import { Calculator, BarChart2, TrendingUp, AlertCircle } from 'lucide-react';

interface CalcPanelProps {
  onSubmit: (prompt: string, systemInstruction?: string) => void;
}

export const CalcPanel: React.FC<CalcPanelProps> = ({ onSubmit }) => {
  const [data, setData] = useState('');

  const handleSubmit = () => {
    if (!data) return;
    
    const systemInstruction = `
      أنت "مقياس المخاطر الذكي" (AI Risk Stratifier).
      مهمتك: ليس مجرد الحساب، بل اختيار الـ Medical Score المناسب وحسابه وتفسيره.
      
      المنهجية:
      1. حلل الحالة: ما هو المقياس المناسب؟ (مثلاً: Chest Pain -> HEART Score, AFib -> CHADS-VASc, Pneumonia -> CURB-65).
      2. قم بالحساب: احسب النقاط بدقة.
      3. التفسير (Interpretation): ماذا تعني النتيجة؟ (Low/Mod/High Risk).
      4. الإجراء (Action): تنويم؟ خروج؟ عناية مركزة؟
      
      إذا كانت البيانات ناقصة لحساب المقياس، اطلبها بوضوح.
    `.trim();

    const prompt = `
**SMART RISK CALCULATION REQUEST**
Clinical Data: ${data}

Identify the correct scoring system, calculate the score, and provide clinical recommendation.
    `.trim();

    onSubmit(prompt, systemInstruction);
  };

  return (
    <div className="flex-1 overflow-y-auto p-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8 flex items-center gap-4">
          <div className="w-16 h-16 bg-gradient-to-br from-slate-500 to-gray-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-gray-900/30">
            <Calculator size={32} className="text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-white">مقياس المخاطر الذكي</h2>
            <p className="text-gray-300">Smart Risk Stratifier: حساب الدرجات واتخاذ القرار</p>
          </div>
        </div>

        <div className="glass-panel p-6 rounded-3xl border border-white/5 space-y-6">
          
          <div className="p-4 bg-gray-800/50 rounded-xl border border-gray-700 flex gap-3 items-start">
             <AlertCircle className="text-sky-400 shrink-0 mt-1" size={20} />
             <p className="text-sm text-gray-300">
               لا داعي للبحث عن الحاسبة المناسبة. فقط اكتب بيانات المريض (مثلاً: "مريض رجفان أذيني عمره 70 وعنده ضغط") وسيقوم النظام باختيار (CHADS2-VASc) وحسابه تلقائياً.
             </p>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-gray-400 font-bold flex items-center gap-2"><BarChart2 size={16}/> البيانات السريرية</label>
            <textarea 
              value={data}
              onChange={e => setData(e.target.value)}
              className="w-full bg-[#0f172a] border border-gray-700 rounded-xl p-4 text-white focus:border-slate-500 focus:ring-1 focus:ring-slate-500 transition-all h-32 resize-none"
              placeholder="مثال: مريض التهاب رئوي، عمر 75، ضغط 90/60، واعي، يوريا 8..."
            />
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
            <Badge text="Wells Score" onClick={() => setData("Suspected DVT: Active cancer, Bedridden > 3 days, Swollen leg...")} />
            <Badge text="CHA2DS2-VASc" onClick={() => setData("AFib patient, Age 68, Female, HTN, Diabetes...")} />
            <Badge text="HEART Score" onClick={() => setData("Chest pain, Age 55, ECG: nonspecific, Trop: normal, Risk Factors: 3...")} />
            <Badge text="CURB-65" onClick={() => setData("Pneumonia, Confusion: No, Urea: 9, RR: 32, BP: 100/70, Age: 68")} />
          </div>

          <button 
            onClick={handleSubmit}
            disabled={!data}
            className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all ${
              data 
                ? 'bg-gradient-to-r from-slate-600 to-gray-700 text-white hover:shadow-lg hover:shadow-gray-500/20' 
                : 'bg-gray-800 text-gray-500 cursor-not-allowed'
            }`}
          >
            <TrendingUp size={20} />
            <span>تحليل المخاطر وحساب الدرجة</span>
          </button>
        </div>
      </div>
    </div>
  );
};

const Badge = ({ text, onClick }: { text: string, onClick: () => void }) => (
  <button onClick={onClick} className="px-3 py-1 bg-[#1e293b] hover:bg-slate-700 text-slate-300 text-xs rounded-full border border-gray-700 whitespace-nowrap transition-colors">
    {text}
  </button>
);