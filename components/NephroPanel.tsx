import React, { useState } from 'react';
import { Droplet, Activity } from 'lucide-react';

interface PanelProps { onSubmit: (prompt: string, sys: string) => void; }

export const NephroPanel: React.FC<PanelProps> = ({ onSubmit }) => {
  const [gfr, setGfr] = useState('');
  const [drug, setDrug] = useState('');

  const handleSubmit = () => {
    const prompt = `**RENAL DOSING**\nKidney Function (GFR/Dialysis): ${gfr}\nDrug: ${drug}`;
    const sys = `أنت "طيار الكلى" (Nephrologist). اضبط جرعات الأدوية بدقة للفشل الكلوي. حدد الجرعة لمرضى الغسيل (Hemodialysis - Pre/Post?) والغسيل البريتوني (PD) والـ CRRT.`;
    onSubmit(prompt, sys);
  };

  return (
    <div className="p-6 animate-in fade-in max-w-2xl mx-auto overflow-y-auto">
      <div className="mb-6 flex items-center gap-4 text-blue-600">
        <Droplet size={40} />
        <h2 className="text-3xl font-bold">طيار الكلى</h2>
      </div>
      <div className="glass-panel p-6 rounded-3xl border border-blue-600/20 space-y-4">
        <input value={gfr} onChange={e=>setGfr(e.target.value)} className="w-full bg-gray-800 p-3 rounded-xl text-white" placeholder="eGFR or Dialysis Type (HD/PD/CRRT)" />
        <input value={drug} onChange={e=>setDrug(e.target.value)} className="w-full bg-gray-800 p-3 rounded-xl text-white" placeholder="Drug Name to Adjust" />
        <button onClick={handleSubmit} className="w-full py-3 bg-blue-700 rounded-xl font-bold text-white">تعديل الجرعة الكلوية</button>
      </div>
    </div>
  );
};