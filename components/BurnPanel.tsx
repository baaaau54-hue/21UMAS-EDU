import React, { useState } from 'react';
import { Flame, Droplet } from 'lucide-react';

interface PanelProps { onSubmit: (prompt: string, sys: string) => void; }

export const BurnPanel: React.FC<PanelProps> = ({ onSubmit }) => {
  const [tbsa, setTbsa] = useState('');
  const [weight, setWeight] = useState('');

  const handleSubmit = () => {
    const prompt = `**BURN MANAGEMENT (Parkland)**\nTBSA: ${tbsa}%\nWeight: ${weight}kg`;
    const sys = `أنت "جراح الحروق" (Burn Surgeon). احسب سوائل الإنعاش (Parkland Formula). حدد العناية بالجروح (Debridement, Dressing). قدم الدعم الغذائي ومسكنات الألم.`;
    onSubmit(prompt, sys);
  };

  return (
    <div className="p-6 animate-in fade-in max-w-2xl mx-auto overflow-y-auto">
      <div className="mb-6 flex items-center gap-4 text-orange-500">
        <Flame size={40} />
        <h2 className="text-3xl font-bold">وحدة الحروق</h2>
      </div>
      <div className="glass-panel p-6 rounded-3xl border border-orange-500/20 space-y-4">
        <input value={tbsa} onChange={e=>setTbsa(e.target.value)} className="w-full bg-gray-800 p-3 rounded-xl text-white" placeholder="Total Body Surface Area Burned (% TBSA)" />
        <input value={weight} onChange={e=>setWeight(e.target.value)} className="w-full bg-gray-800 p-3 rounded-xl text-white" placeholder="Patient Weight (kg)" />
        <button onClick={handleSubmit} className="w-full py-3 bg-orange-600 rounded-xl font-bold text-white">حساب سوائل باركلاند والعناية</button>
      </div>
    </div>
  );
};