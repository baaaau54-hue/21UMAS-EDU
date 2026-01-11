import React, { useState } from 'react';
import { Scale, HeartHandshake } from 'lucide-react';

interface PanelProps { onSubmit: (prompt: string, sys: string) => void; }

export const EthicsPanel: React.FC<PanelProps> = ({ onSubmit }) => {
  const [dilemma, setDilemma] = useState('');

  const handleSubmit = () => {
    const prompt = `**ETHICAL DILEMMA**\nSituation: ${dilemma}`;
    const sys = `أنت "المستشار الأخلاقي الطبي" (Bio-Ethics Consultant). حلل المعضلة بناءً على المبادئ الأربعة (Autonomy, Beneficence, Non-maleficence, Justice). اذكر الرأي القانوني العام والشرعي الإسلامي إذا لزم الأمر.`;
    onSubmit(prompt, sys);
  };

  return (
    <div className="p-6 animate-in fade-in max-w-2xl mx-auto overflow-y-auto">
      <div className="mb-6 flex items-center gap-4 text-gray-300">
        <Scale size={40} />
        <h2 className="text-3xl font-bold">المستشار الأخلاقي</h2>
      </div>
      <div className="glass-panel p-6 rounded-3xl border border-gray-500/20 space-y-4">
        <textarea value={dilemma} onChange={e=>setDilemma(e.target.value)} className="w-full bg-gray-800 p-3 rounded-xl text-white h-40" placeholder="مثال: عائلة ترفض فصل جهاز التنفس عن ميت دماغياً، مريض يرفض نقل الدم رغم النزيف..." />
        <button onClick={handleSubmit} className="w-full py-3 bg-gray-700 rounded-xl font-bold text-white">تحليل المعضلة وإصدار الفتوى الطبية</button>
      </div>
    </div>
  );
};