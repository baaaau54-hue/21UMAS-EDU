import React, { useState } from 'react';
import { Plane, Globe } from 'lucide-react';

interface PanelProps { onSubmit: (prompt: string, sys: string) => void; }

export const TravelPanel: React.FC<PanelProps> = ({ onSubmit }) => {
  const [destination, setDestination] = useState('');
  const [duration, setDuration] = useState('');

  const handleSubmit = () => {
    const prompt = `**TRAVEL MEDICINE CONSULT**\nDestination: ${destination}\nDuration/Activity: ${duration}`;
    const sys = `أنت "طبيب السفر" (Travel Medicine Specialist). حدد اللقاحات المطلوبة (Yellow Fever, etc). صف الوقاية من الملاريا (Prophylaxis). قدم نصائح صحية خاصة بالوجهة (Food/Water safety).`;
    onSubmit(prompt, sys);
  };

  return (
    <div className="p-6 animate-in fade-in max-w-2xl mx-auto overflow-y-auto">
      <div className="mb-6 flex items-center gap-4 text-sky-500">
        <Plane size={40} />
        <h2 className="text-3xl font-bold">طب السفر</h2>
      </div>
      <div className="glass-panel p-6 rounded-3xl border border-sky-500/20 space-y-4">
        <input value={destination} onChange={e=>setDestination(e.target.value)} className="w-full bg-gray-800 p-3 rounded-xl text-white" placeholder="Destination Country/City" />
        <input value={duration} onChange={e=>setDuration(e.target.value)} className="w-full bg-gray-800 p-3 rounded-xl text-white" placeholder="Duration & Activities (e.g. 2 weeks, Jungle trekking)" />
        <button onClick={handleSubmit} className="w-full py-3 bg-sky-600 rounded-xl font-bold text-white">تحديد اللقاحات والوقاية</button>
      </div>
    </div>
  );
};