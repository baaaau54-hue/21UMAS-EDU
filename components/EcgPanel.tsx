import React, { useState } from 'react';
import { HeartPulse, Activity } from 'lucide-react';

interface PanelProps { onSubmit: (prompt: string, sys: string) => void; }

export const EcgPanel: React.FC<PanelProps> = ({ onSubmit }) => {
  const [description, setDescription] = useState('');

  const handleSubmit = () => {
    const prompt = `**ADVANCED ECG ANALYSIS**\nDescription/Findings: ${description}`;
    const sys = `أنت "مايسترو التخطيط" (Electrophysiologist). حلل الـ ECG بعمق. ابحث عن الأنماط المعقدة (Brugada, Wellens, WPW, Blocks). لا تكتفِ بالوصف، بل أعطِ التشخيص الدقيق والإدارة.`;
    onSubmit(prompt, sys);
  };

  return (
    <div className="p-6 animate-in fade-in max-w-2xl mx-auto overflow-y-auto">
      <div className="mb-6 flex items-center gap-4 text-pink-500">
        <HeartPulse size={40} />
        <h2 className="text-3xl font-bold">مايسترو التخطيط</h2>
      </div>
      <div className="glass-panel p-6 rounded-3xl border border-pink-500/20 space-y-4">
        <textarea value={description} onChange={e=>setDescription(e.target.value)} className="w-full bg-gray-800 p-3 rounded-xl text-white h-40" placeholder="Describe ECG (e.g. ST elevation in V1-V4, Delta wave, Irregularly irregular)... OR upload image in main chat." />
        <button onClick={handleSubmit} className="w-full py-3 bg-pink-600 rounded-xl font-bold text-white">تحليل كهرباء القلب</button>
      </div>
    </div>
  );
};