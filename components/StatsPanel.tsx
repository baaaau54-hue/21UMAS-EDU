import React, { useState } from 'react';
import { LineChart, Calculator } from 'lucide-react';

interface PanelProps { onSubmit: (prompt: string, sys: string) => void; }

export const StatsPanel: React.FC<PanelProps> = ({ onSubmit }) => {
  const [data, setData] = useState('');

  const handleSubmit = () => {
    const prompt = `**MEDICAL STATISTICS HELP**\nStudy Design/Data: ${data}`;
    const sys = `أنت "الساحر الإحصائي" (Medical Statistician). ساعد الباحث في اختيار الاختبار الإحصائي (T-test, Chi-square, ANOVA). اشرح معنى P-value و Confidence Interval لبياناته.`;
    onSubmit(prompt, sys);
  };

  return (
    <div className="p-6 animate-in fade-in max-w-2xl mx-auto overflow-y-auto">
      <div className="mb-6 flex items-center gap-4 text-green-300">
        <LineChart size={40} />
        <h2 className="text-3xl font-bold">الساحر الإحصائي</h2>
      </div>
      <div className="glass-panel p-6 rounded-3xl border border-green-500/20 space-y-4">
        <textarea value={data} onChange={e=>setData(e.target.value)} className="w-full bg-gray-800 p-3 rounded-xl text-white h-40" placeholder="أريد مقارنة ضغط الدم بين مجموعتين (دواء vs وهمي)، ماذا أستخدم؟..." />
        <button onClick={handleSubmit} className="w-full py-3 bg-green-700/80 rounded-xl font-bold text-white">اختيار الاختبار وتفسير النتائج</button>
      </div>
    </div>
  );
};