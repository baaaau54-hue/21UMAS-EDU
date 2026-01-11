import React, { useState } from 'react';
import { Droplets, Microscope } from 'lucide-react';

interface PanelProps { onSubmit: (prompt: string, sys: string) => void; }

export const HemePanel: React.FC<PanelProps> = ({ onSubmit }) => {
  const [smear, setSmear] = useState('');
  const [cbc, setCbc] = useState('');

  const handleSubmit = () => {
    const prompt = `**HEMATOPATHOLOGY CONSULT**\nCBC: ${cbc}\nSmear Description: ${smear}`;
    const sys = `أنت "خبير أمراض الدم" (Heme-Pathologist). فسر نتائج لطاخة الدم (Blood Smear). اربط شكل الكريات (Schistocytes, Blasts, Spherocytes) بالتشخيص (Leukemia, TTP, Hemolysis).`;
    onSubmit(prompt, sys);
  };

  return (
    <div className="p-6 animate-in fade-in max-w-2xl mx-auto overflow-y-auto">
      <div className="mb-6 flex items-center gap-4 text-red-500">
        <Droplets size={40} />
        <h2 className="text-3xl font-bold">هيمي-باث (الدم)</h2>
      </div>
      <div className="glass-panel p-6 rounded-3xl border border-red-500/20 space-y-4">
        <textarea value={cbc} onChange={e=>setCbc(e.target.value)} className="w-full bg-gray-800 p-3 rounded-xl text-white h-24" placeholder="CBC Results (Hb, MCV, PLT, WBC diff)..." />
        <textarea value={smear} onChange={e=>setSmear(e.target.value)} className="w-full bg-gray-800 p-3 rounded-xl text-white h-24" placeholder="Blood Smear findings (e.g. Auer rods, Target cells, Hypersegmented neutrophils)..." />
        <button onClick={handleSubmit} className="w-full py-3 bg-red-600 rounded-xl font-bold text-white">تحليل اللطاخة والتشخيص</button>
      </div>
    </div>
  );
};