import React, { useState } from 'react';
import { Wind, Activity, Gauge } from 'lucide-react';

interface PanelProps { onSubmit: (prompt: string, sys: string) => void; }

export const VentilatorPanel: React.FC<PanelProps> = ({ onSubmit }) => {
  const [abg, setAbg] = useState({ ph: '', pco2: '', po2: '', hco3: '' });
  const [settings, setSettings] = useState({ mode: 'SIMV', tv: '', rate: '', peep: '', fio2: '' });

  const handleSubmit = () => {
    const prompt = `**ICU VENTILATOR CONSULT**\nABG: pH ${abg.ph}, pCO2 ${abg.pco2}, pO2 ${abg.po2}\nCurrent Settings: ${settings.mode}, TV ${settings.tv}, RR ${settings.rate}, PEEP ${settings.peep}, FiO2 ${settings.fio2}`;
    const sys = `أنت "طيار العناية المركزة" (ICU Ventilator Specialist). حلل غازات الدم واقترح تعديلات دقيقة على جهاز التنفس. طبق بروتوكول ARDSNet إذا لزم الأمر. حدد إذا كان المريض جاهزاً للفطام (Weaning).`;
    onSubmit(prompt, sys);
  };

  return (
    <div className="p-6 animate-in fade-in max-w-2xl mx-auto overflow-y-auto">
      <div className="mb-6 flex items-center gap-4 text-cyan-400">
        <Wind size={40} />
        <h2 className="text-3xl font-bold">طيار العناية المركزة</h2>
      </div>
      <div className="glass-panel p-6 rounded-3xl border border-cyan-500/20 space-y-4">
        <div className="grid grid-cols-4 gap-2">
           <Input label="pH" val={abg.ph} set={v=>setAbg({...abg, ph:v})} />
           <Input label="pCO2" val={abg.pco2} set={v=>setAbg({...abg, pco2:v})} />
           <Input label="pO2" val={abg.po2} set={v=>setAbg({...abg, po2:v})} />
           <Input label="HCO3" val={abg.hco3} set={v=>setAbg({...abg, hco3:v})} />
        </div>
        <div className="border-t border-gray-700 pt-4 grid grid-cols-2 gap-3">
           <Input label="Mode" val={settings.mode} set={v=>setSettings({...settings, mode:v})} ph="AC/SIMV" />
           <Input label="Tidal Vol" val={settings.tv} set={v=>setSettings({...settings, tv:v})} ph="450" />
           <Input label="Rate (RR)" val={settings.rate} set={v=>setSettings({...settings, rate:v})} ph="16" />
           <Input label="PEEP" val={settings.peep} set={v=>setSettings({...settings, peep:v})} ph="5" />
           <Input label="FiO2 %" val={settings.fio2} set={v=>setSettings({...settings, fio2:v})} ph="40" />
        </div>
        <button onClick={handleSubmit} className="w-full py-3 bg-cyan-600 rounded-xl font-bold text-white mt-4">تحليل وتعديل الإعدادات</button>
      </div>
    </div>
  );
};
const Input = ({label, val, set, ph}:any) => (
  <div className="bg-gray-800 p-2 rounded-lg"><label className="text-xs text-gray-400">{label}</label><input value={val} onChange={e=>set(e.target.value)} placeholder={ph} className="w-full bg-transparent text-white font-mono outline-none"/></div>
);