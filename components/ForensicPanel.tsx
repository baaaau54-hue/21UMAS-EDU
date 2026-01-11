import React, { useState } from 'react';
import { Gavel, Search } from 'lucide-react';

interface PanelProps { onSubmit: (prompt: string, sys: string) => void; }

export const ForensicPanel: React.FC<PanelProps> = ({ onSubmit }) => {
  const [findings, setFindings] = useState('');

  const handleSubmit = () => {
    const prompt = `**FORENSIC REPORT**\nFindings: ${findings}`;
    const sys = `أنت "المحلل الجنائي" (Forensic Pathologist). فسر الإصابات لأغراض قانونية. فرق بين الجروح (Laceration vs Incision). قدر زمن الوفاة أو عمر الكدمة. اكتب التقرير بلغة طبية قضائية محايدة.`;
    onSubmit(prompt, sys);
  };

  return (
    <div className="p-6 animate-in fade-in max-w-2xl mx-auto overflow-y-auto">
      <div className="mb-6 flex items-center gap-4 text-slate-400">
        <Gavel size={40} />
        <h2 className="text-3xl font-bold">المحلل الجنائي</h2>
      </div>
      <div className="glass-panel p-6 rounded-3xl border border-slate-500/20 space-y-4">
        <textarea value={findings} onChange={e=>setFindings(e.target.value)} className="w-full bg-gray-800 p-3 rounded-xl text-white h-40" placeholder="Injury description, Bruise color, Rigor mortis status..." />
        <button onClick={handleSubmit} className="w-full py-3 bg-slate-600 rounded-xl font-bold text-white">إعداد التقرير الطبي الشرعي</button>
      </div>
    </div>
  );
};