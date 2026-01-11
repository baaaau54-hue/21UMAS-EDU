import React, { useState } from 'react';
import { Ambulance, AlertTriangle } from 'lucide-react';

interface PanelProps { onSubmit: (prompt: string, sys: string) => void; }

export const TraumaPanel: React.FC<PanelProps> = ({ onSubmit }) => {
  const [mechanism, setMechanism] = useState('');
  const [vitals, setVitals] = useState('');

  const handleSubmit = () => {
    const prompt = `**TRAUMA CALL (ATLS)**\nMechanism: ${mechanism}\nVitals: ${vitals}`;
    const sys = `أنت "قائد الصدمات" (Trauma Team Leader) تعمل ببروتوكول ATLS. قم بإدارة الـ Primary Survey (ABCDE). حدد الفحوصات العاجلة (eFAST, Pan-CT) والإجراءات المنقذة للحياة (Chest Tube, Blood Transfusion).`;
    onSubmit(prompt, sys);
  };

  return (
    <div className="p-6 animate-in fade-in max-w-2xl mx-auto overflow-y-auto">
      <div className="mb-6 flex items-center gap-4 text-red-600">
        <Ambulance size={40} />
        <h2 className="text-3xl font-bold">قائد الصدمات (ATLS)</h2>
      </div>
      <div className="glass-panel p-6 rounded-3xl border border-red-600/20 space-y-4">
        <textarea value={mechanism} onChange={e=>setMechanism(e.target.value)} className="w-full bg-gray-800 p-3 rounded-xl text-white h-24" placeholder="Mechanism (e.g. High speed MVA, Fall from 3rd floor, Stab wound)..." />
        <textarea value={vitals} onChange={e=>setVitals(e.target.value)} className="w-full bg-gray-800 p-3 rounded-xl text-white h-24" placeholder="Vitals & GCS (e.g. BP 80/50, HR 130, GCS 8)..." />
        <button onClick={handleSubmit} className="w-full py-3 bg-red-700 rounded-xl font-bold text-white">إطلاق كود الصدمة (Trauma Code)</button>
      </div>
    </div>
  );
};