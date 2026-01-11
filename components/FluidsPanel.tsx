import React, { useState } from 'react';
import { Activity, Droplet } from 'lucide-react';

interface PanelProps { onSubmit: (prompt: string, sys: string) => void; }

export const FluidsPanel: React.FC<PanelProps> = ({ onSubmit }) => {
  const [weight, setWeight] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = () => {
    const prompt = `**FLUIDS & TPN CALCULATION**\nWeight: ${weight}kg\nClinical Status: ${status}`;
    const sys = `أنت "خبير التغذية والسوائل الوريدية". احسب احتياج السوائل (Maintenance + Deficit). إذا طلب TPN، احسب الجرامات الدقيقة (Protein, Lipids, Carbs) والسعرات الحرارية والشوارد (Electrolytes).`;
    onSubmit(prompt, sys);
  };

  return (
    <div className="p-6 animate-in fade-in max-w-2xl mx-auto overflow-y-auto">
      <div className="mb-6 flex items-center gap-4 text-blue-500">
        <Activity size={40} />
        <h2 className="text-3xl font-bold">خبير السوائل و TPN</h2>
      </div>
      <div className="glass-panel p-6 rounded-3xl border border-blue-500/20 space-y-4">
        <input value={weight} onChange={e=>setWeight(e.target.value)} className="w-full bg-gray-800 p-3 rounded-xl text-white" placeholder="Weight (kg)" />
        <textarea value={status} onChange={e=>setStatus(e.target.value)} className="w-full bg-gray-800 p-3 rounded-xl text-white h-32" placeholder="Status (NPO, Dehydrated, Heart Failure, Needs TPN)..." />
        <button onClick={handleSubmit} className="w-full py-3 bg-blue-600 rounded-xl font-bold text-white">حساب السوائل والتغذية</button>
      </div>
    </div>
  );
};