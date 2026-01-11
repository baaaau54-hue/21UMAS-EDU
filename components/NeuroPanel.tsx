import React, { useState } from 'react';
import { Brain, Zap, Activity } from 'lucide-react';

interface PanelProps { onSubmit: (prompt: string, sys: string) => void; }

export const NeuroPanel: React.FC<PanelProps> = ({ onSubmit }) => {
  const [symptoms, setSymptoms] = useState('');
  const [exam, setExam] = useState('');

  const handleSubmit = () => {
    const prompt = `**NEURO LOCALIZATION**\nSymptoms: ${symptoms}\nExam Findings: ${exam}`;
    const sys = `أنت "المحدد العصبي" (Neuro-Localizer). مهمتك تحديد موقع الآفة (The Lesion) بدقة تشريحية مذهلة (Brainstem, Cortex, Cord, Root, Nerve). اشرح لماذا (The Pathway).`;
    onSubmit(prompt, sys);
  };

  return (
    <div className="p-6 animate-in fade-in max-w-2xl mx-auto overflow-y-auto">
      <div className="mb-6 flex items-center gap-4 text-pink-500">
        <Brain size={40} />
        <h2 className="text-3xl font-bold">المحدد العصبي</h2>
      </div>
      <div className="glass-panel p-6 rounded-3xl border border-pink-500/20 space-y-4">
        <div>
          <label className="text-sm text-gray-400">الأعراض (Weakness, Numbness)</label>
          <textarea value={symptoms} onChange={e=>setSymptoms(e.target.value)} className="w-full bg-gray-800 p-3 rounded-xl text-white mt-1 h-24" />
        </div>
        <div>
          <label className="text-sm text-gray-400">الفحص العصبي (Reflexes, Cranial Nerves)</label>
          <textarea value={exam} onChange={e=>setExam(e.target.value)} className="w-full bg-gray-800 p-3 rounded-xl text-white mt-1 h-24" placeholder="e.g. Right Babinski positive, Left 3rd nerve palsy..." />
        </div>
        <button onClick={handleSubmit} className="w-full py-3 bg-pink-600 rounded-xl font-bold text-white">تحديد موقع الإصابة (Localize)</button>
      </div>
    </div>
  );
};