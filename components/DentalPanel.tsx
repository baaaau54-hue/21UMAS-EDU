import React, { useState } from 'react';
import { Smile, AlertTriangle } from 'lucide-react';

interface PanelProps { onSubmit: (prompt: string, sys: string) => void; }

export const DentalPanel: React.FC<PanelProps> = ({ onSubmit }) => {
  const [trauma, setTrauma] = useState('');

  const handleSubmit = () => {
    const prompt = `**DENTAL/MAXILLOFACIAL CONSULT**\nIssue: ${trauma}`;
    const sys = `أنت "جراح الوجه والفكين". قدم الإسعاف الأولي لكسور الأسنان (Ellis Class) أو كسور الوجه (Le Fort). اشرح كيفية حفظ السن المخلوع (Avulsed Tooth) ومتى يجب التثبيت.`;
    onSubmit(prompt, sys);
  };

  return (
    <div className="p-6 animate-in fade-in max-w-2xl mx-auto overflow-y-auto">
      <div className="mb-6 flex items-center gap-4 text-yellow-200">
        <Smile size={40} />
        <h2 className="text-3xl font-bold">الوجه والفكين</h2>
      </div>
      <div className="glass-panel p-6 rounded-3xl border border-yellow-200/20 space-y-4">
        <textarea value={trauma} onChange={e=>setTrauma(e.target.value)} className="w-full bg-gray-800 p-3 rounded-xl text-white h-40" placeholder="وصف الإصابة: كسر في السن، خلع كامل، ضربة على الفك، تورم..." />
        <button onClick={handleSubmit} className="w-full py-3 bg-yellow-700/80 rounded-xl font-bold text-white">إسعاف وعلاج الإصابة</button>
      </div>
    </div>
  );
};