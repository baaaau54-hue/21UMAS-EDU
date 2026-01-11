import React, { useState } from 'react';
import { Hammer, Bone, Ruler } from 'lucide-react';

interface PanelProps { onSubmit: (prompt: string, sys: string) => void; }

export const OrthoPanel: React.FC<PanelProps> = ({ onSubmit }) => {
  const [bone, setBone] = useState('');
  const [fracture, setFracture] = useState('');

  const handleSubmit = () => {
    const prompt = `**ORTHOPEDIC CONSULT**\nBone: ${bone}\nFracture Description: ${fracture}`;
    const sys = `أنت "المهندس العظمي" (Ortho Architect). صنف الكسر حسب (AO Classification). اقترح خطة التثبيت (Conservative vs Operative). إذا جراحة: Nail vs Plate? حدد الـ Approach والمسامير المطلوبة.`;
    onSubmit(prompt, sys);
  };

  return (
    <div className="p-6 animate-in fade-in max-w-2xl mx-auto overflow-y-auto">
      <div className="mb-6 flex items-center gap-4 text-orange-400">
        <Hammer size={40} />
        <h2 className="text-3xl font-bold">المهندس العظمي</h2>
      </div>
      <div className="glass-panel p-6 rounded-3xl border border-orange-500/20 space-y-4">
        <div>
          <label className="text-sm text-gray-400">العظم المصاب</label>
          <input value={bone} onChange={e=>setBone(e.target.value)} className="w-full bg-gray-800 p-3 rounded-xl text-white mt-1" placeholder="Distal Radius, Femur Shaft..." />
        </div>
        <div>
          <label className="text-sm text-gray-400">وصف الكسر (X-Ray)</label>
          <textarea value={fracture} onChange={e=>setFracture(e.target.value)} className="w-full bg-gray-800 p-3 rounded-xl text-white mt-1 h-32" placeholder="Comminuted, Intra-articular, Open..." />
        </div>
        <button onClick={handleSubmit} className="w-full py-3 bg-orange-600 rounded-xl font-bold text-white">تصنيف وتخطيط الجراحة</button>
      </div>
    </div>
  );
};