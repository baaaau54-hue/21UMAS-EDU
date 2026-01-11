import React, { useState } from 'react';
import { Binary, Dna, FileText } from 'lucide-react';

interface PanelProps { onSubmit: (prompt: string, sys: string) => void; }

export const OncoPanel: React.FC<PanelProps> = ({ onSubmit }) => {
  const [tumor, setTumor] = useState('');
  const [stage, setStage] = useState('');
  const [markers, setMarkers] = useState('');

  const handleSubmit = () => {
    const prompt = `**TUMOR BOARD CASE**\nType: ${tumor}\nStage: ${stage}\nMarkers/Genetics: ${markers}`;
    const sys = `أنت "مجلس الأورام الذكي" (AI Tumor Board). قدم خطة علاج شاملة بناءً على NCCN Guidelines. (Neoadjuvant -> Surgery -> Adjuvant). اذكر خيارات العلاج المناعي (Immunotherapy) والموجه (Targeted).`;
    onSubmit(prompt, sys);
  };

  return (
    <div className="p-6 animate-in fade-in max-w-2xl mx-auto overflow-y-auto">
      <div className="mb-6 flex items-center gap-4 text-rose-600">
        <Binary size={40} />
        <h2 className="text-3xl font-bold">مجلس الأورام</h2>
      </div>
      <div className="glass-panel p-6 rounded-3xl border border-rose-600/20 space-y-4">
        <input value={tumor} onChange={e=>setTumor(e.target.value)} className="w-full bg-gray-800 p-3 rounded-xl text-white" placeholder="Tumor Type (e.g. Breast IDC)" />
        <input value={stage} onChange={e=>setStage(e.target.value)} className="w-full bg-gray-800 p-3 rounded-xl text-white" placeholder="Staging (TNM)" />
        <input value={markers} onChange={e=>setMarkers(e.target.value)} className="w-full bg-gray-800 p-3 rounded-xl text-white" placeholder="Biomarkers (ER/PR, HER2, EGFR...)" />
        <button onClick={handleSubmit} className="w-full py-3 bg-rose-700 rounded-xl font-bold text-white">عقد المجلس وتحديد البروتوكول</button>
      </div>
    </div>
  );
};