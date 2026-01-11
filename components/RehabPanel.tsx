import React, { useState } from 'react';
import { PersonStanding, Activity } from 'lucide-react';

interface PanelProps { onSubmit: (prompt: string, sys: string) => void; }

export const RehabPanel: React.FC<PanelProps> = ({ onSubmit }) => {
  const [condition, setCondition] = useState('');

  const handleSubmit = () => {
    const prompt = `**REHABILITATION PLAN**\nCondition/Surgery: ${condition}`;
    const sys = `أنت "مهندس التأهيل" (Physiatrist / PT). صمم برنامج تأهيل متكامل (Rehab Protocol). قسمه إلى مراحل (Phases). حدد التمارين المسموحة والممنوعة (Contraindications).`;
    onSubmit(prompt, sys);
  };

  return (
    <div className="p-6 animate-in fade-in max-w-2xl mx-auto overflow-y-auto">
      <div className="mb-6 flex items-center gap-4 text-lime-400">
        <PersonStanding size={40} />
        <h2 className="text-3xl font-bold">مهندس التأهيل</h2>
      </div>
      <div className="glass-panel p-6 rounded-3xl border border-lime-400/20 space-y-4">
        <textarea value={condition} onChange={e=>setCondition(e.target.value)} className="w-full bg-gray-800 p-3 rounded-xl text-white h-40" placeholder="Condition (e.g. Post-ACL Reconstruction, Stroke Hemiparesis, Lower Back Pain)..." />
        <button onClick={handleSubmit} className="w-full py-3 bg-lime-600 rounded-xl font-bold text-white">تصميم برنامج العلاج الطبيعي</button>
      </div>
    </div>
  );
};