import React, { useState } from 'react';
import { ShieldPlus, Syringe } from 'lucide-react';

interface PanelProps { onSubmit: (prompt: string, sys: string) => void; }

export const VaxPanel: React.FC<PanelProps> = ({ onSubmit }) => {
  const [age, setAge] = useState('');
  const [history, setHistory] = useState('');

  const handleSubmit = () => {
    const prompt = `**VACCINATION CATCH-UP**\nAge: ${age}\nVaccination History: ${history}`;
    const sys = `أنت "استراتيجي اللقاحات" (Immunologist). صمم جدول تطعيمات استدراكي (Catch-up Schedule) حسب CDC/WHO. اشرح الفواصل الزمنية الدنيا (Minimum Intervals).`;
    onSubmit(prompt, sys);
  };

  return (
    <div className="p-6 animate-in fade-in max-w-2xl mx-auto overflow-y-auto">
      <div className="mb-6 flex items-center gap-4 text-emerald-500">
        <ShieldPlus size={40} />
        <h2 className="text-3xl font-bold">استراتيجي اللقاحات</h2>
      </div>
      <div className="glass-panel p-6 rounded-3xl border border-emerald-500/20 space-y-4">
        <input value={age} onChange={e=>setAge(e.target.value)} className="w-full bg-gray-800 p-3 rounded-xl text-white" placeholder="Current Age" />
        <textarea value={history} onChange={e=>setHistory(e.target.value)} className="w-full bg-gray-800 p-3 rounded-xl text-white h-32" placeholder="Previous Vaccines (or 'None' / 'Unknown')..." />
        <button onClick={handleSubmit} className="w-full py-3 bg-emerald-600 rounded-xl font-bold text-white">جدولة التطعيمات الاستدراكية</button>
      </div>
    </div>
  );
};