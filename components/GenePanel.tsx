import React, { useState } from 'react';
import { Dna, Activity } from 'lucide-react';

interface PanelProps { onSubmit: (prompt: string, sys: string) => void; }

export const GenePanel: React.FC<PanelProps> = ({ onSubmit }) => {
  const [history, setHistory] = useState('');
  const [report, setReport] = useState('');

  const handleSubmit = () => {
    const prompt = `**GENETICS CONSULT**\nFamily History: ${history}\nGenetic Report (SNP/Variant): ${report}`;
    const sys = `أنت "المستشار الجيني" (Genetic Counselor). حلل شجرة العائلة (Pedigree) وحدد نمط الوراثة (Autosomal Dominant/Recessive). فسر الطفرات الجينية ومخاطرها.`;
    onSubmit(prompt, sys);
  };

  return (
    <div className="p-6 animate-in fade-in max-w-2xl mx-auto overflow-y-auto">
      <div className="mb-6 flex items-center gap-4 text-fuchsia-400">
        <Dna size={40} />
        <h2 className="text-3xl font-bold">المستشار الجيني</h2>
      </div>
      <div className="glass-panel p-6 rounded-3xl border border-fuchsia-500/20 space-y-4">
        <textarea value={history} onChange={e=>setHistory(e.target.value)} className="w-full bg-gray-800 p-3 rounded-xl text-white h-24" placeholder="Family History (e.g. Consanguinity, recurrent miscarriages, early cancer)..." />
        <textarea value={report} onChange={e=>setReport(e.target.value)} className="w-full bg-gray-800 p-3 rounded-xl text-white h-24" placeholder="Genetic Report (e.g. BRCA1 positive, Trisomy 21)..." />
        <button onClick={handleSubmit} className="w-full py-3 bg-fuchsia-600 rounded-xl font-bold text-white">تحليل الوراثة والمخاطر</button>
      </div>
    </div>
  );
};