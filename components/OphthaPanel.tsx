import React, { useState } from 'react';
import { Eye, Search } from 'lucide-react';

interface PanelProps { onSubmit: (prompt: string, sys: string) => void; }

export const OphthaPanel: React.FC<PanelProps> = ({ onSubmit }) => {
  const [symptoms, setSymptoms] = useState('');
  const [exam, setExam] = useState('');

  const handleSubmit = () => {
    const prompt = `**OPHTHALMOLOGY CONSULT**\nSymptoms: ${symptoms}\nExam/Fundoscopy: ${exam}`;
    const sys = `أنت "استشاري العيون" (Ophthalmologist). حلل أعراض العين ووصف قاع العين (Fundus). قدم التشخيص (Glaucoma, Retinal Detachment, Uveitis) والعلاج العاجل.`;
    onSubmit(prompt, sys);
  };

  return (
    <div className="p-6 animate-in fade-in max-w-2xl mx-auto overflow-y-auto">
      <div className="mb-6 flex items-center gap-4 text-sky-300">
        <Eye size={40} />
        <h2 className="text-3xl font-bold">منظار العيون</h2>
      </div>
      <div className="glass-panel p-6 rounded-3xl border border-sky-500/20 space-y-4">
        <textarea value={symptoms} onChange={e=>setSymptoms(e.target.value)} className="w-full bg-gray-800 p-3 rounded-xl text-white h-24" placeholder="Red eye, Vision loss, Pain..." />
        <textarea value={exam} onChange={e=>setExam(e.target.value)} className="w-full bg-gray-800 p-3 rounded-xl text-white h-24" placeholder="Slit lamp or Fundoscopy findings..." />
        <button onClick={handleSubmit} className="w-full py-3 bg-sky-600 rounded-xl font-bold text-white">تشخيص الحالة العينية</button>
      </div>
    </div>
  );
};