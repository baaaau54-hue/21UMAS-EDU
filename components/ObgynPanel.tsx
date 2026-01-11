import React, { useState } from 'react';
import { Baby, Calendar } from 'lucide-react';

interface PanelProps { onSubmit: (prompt: string, sys: string) => void; }

export const ObgynPanel: React.FC<PanelProps> = ({ onSubmit }) => {
  const [lmp, setLmp] = useState('');
  const [issue, setIssue] = useState('');

  const handleSubmit = () => {
    const prompt = `**OB/GYN CONSULT**\nLMP: ${lmp}\nIssue: ${issue}`;
    const sys = `أنت "حارس الأمومة" (OB/GYN Consultant). احسب الـ EDD. قيم سلامة الأدوية (FDA Pregnancy Category). فسر تخطيط الجنين (CTG) إذا وصف. تعامل مع طوارئ الحمل (Preeclampsia, Bleeding).`;
    onSubmit(prompt, sys);
  };

  return (
    <div className="p-6 animate-in fade-in max-w-2xl mx-auto overflow-y-auto">
      <div className="mb-6 flex items-center gap-4 text-rose-400">
        <Baby size={40} />
        <h2 className="text-3xl font-bold">حارس الأمومة</h2>
      </div>
      <div className="glass-panel p-6 rounded-3xl border border-rose-400/20 space-y-4">
        <input value={lmp} onChange={e=>setLmp(e.target.value)} className="w-full bg-gray-800 p-3 rounded-xl text-white" placeholder="Last Menstrual Period (LMP) or Gestational Age" />
        <textarea value={issue} onChange={e=>setIssue(e.target.value)} className="w-full bg-gray-800 p-3 rounded-xl text-white h-32" placeholder="Complaint, Drug safety query, CTG findings..." />
        <button onClick={handleSubmit} className="w-full py-3 bg-rose-500 rounded-xl font-bold text-white">استشارة نساء وتوليد</button>
      </div>
    </div>
  );
};