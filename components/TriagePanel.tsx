import React, { useState } from 'react';
import { Siren, Activity, HeartPulse, Clock } from 'lucide-react';

interface TriagePanelProps {
  onSubmit: (prompt: string, systemInstruction?: string) => void;
}

export const TriagePanel: React.FC<TriagePanelProps> = ({ onSubmit }) => {
  const [complaint, setComplaint] = useState('');
  const [vitals, setVitals] = useState({ bp: '', hr: '', rr: '', spo2: '', temp: '', gcs: '' });

  const handleSubmit = () => {
    if (!complaint) return;
    
    const systemInstruction = `
      أنت "مسؤول الفرز الطبي" (Triage Officer) تعمل بنظام Manchester Triage System (MTS).
      
      المهمة:
      1. تحديد مستوى الخطورة (اللون): أحمر (فوري)، برتقالي (عاجل جداً)، أصفر (عاجل)، أخضر (قياسي)، أزرق (غير عاجل).
      2. تحديد الوقت الأقصى لانتظار الطبيب.
      3. قائمة إجراءات فورية (Nursing Actions) قبل دخول الطبيب (مثل: ECG، تركيب كانيولا، تحاليل معينة).
      
      الأسلوب: حازم، سريع، ومباشر. استخدم أيقونات وألوان في الرد لتمييز الخطورة.
    `.trim();

    const prompt = `
**طلب فرز طوارئ (ER Triage)**
الشكوى: ${complaint}
العلامات الحيوية:
- BP: ${vitals.bp || '-'}
- HR: ${vitals.hr || '-'}
- RR: ${vitals.rr || '-'}
- SpO2: ${vitals.spo2 || '-'}
- Temp: ${vitals.temp || '-'}
- GCS: ${vitals.gcs || '-'}

حدد درجة الفرز والإجراءات.
    `.trim();

    onSubmit(prompt, systemInstruction);
  };

  return (
    <div className="flex-1 overflow-y-auto p-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8 flex items-center gap-4">
          <div className="w-16 h-16 bg-gradient-to-br from-red-600 to-rose-700 rounded-2xl flex items-center justify-center shadow-2xl shadow-red-900/30 animate-pulse">
            <Siren size={32} className="text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-white">نظام فرز الطوارئ</h2>
            <p className="text-red-300">تحديد الخطورة والأولويات (Triage Protocol)</p>
          </div>
        </div>

        <div className="glass-panel p-6 rounded-3xl border border-white/5 space-y-6">
          
          <div className="space-y-2">
            <label className="text-sm text-gray-400 flex items-center gap-2">
              <Activity size={14} /> الشكوى الرئيسية / آلية الإصابة
            </label>
            <input 
              type="text"
              value={complaint}
              onChange={e => setComplaint(e.target.value)}
              className="w-full bg-[#0f172a] border border-red-900/50 rounded-xl p-4 text-white focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all text-lg font-semibold"
              placeholder="مثال: ألم شديد بالصدر مع تعرق..."
            />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
             <VitalInput label="ضغط الدم (BP)" val={vitals.bp} setVal={v => setVitals({...vitals, bp: v})} ph="120/80" />
             <VitalInput label="النبض (HR)" val={vitals.hr} setVal={v => setVitals({...vitals, hr: v})} ph="80" />
             <VitalInput label="التنفس (RR)" val={vitals.rr} setVal={v => setVitals({...vitals, rr: v})} ph="16" />
             <VitalInput label="الأكسجين (SpO2)" val={vitals.spo2} setVal={v => setVitals({...vitals, spo2: v})} ph="98%" />
             <VitalInput label="الحرارة (Temp)" val={vitals.temp} setVal={v => setVitals({...vitals, temp: v})} ph="37.0" />
             <VitalInput label="الوعي (GCS)" val={vitals.gcs} setVal={v => setVitals({...vitals, gcs: v})} ph="15/15" />
          </div>

          <button 
            onClick={handleSubmit}
            disabled={!complaint}
            className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all ${
              complaint 
                ? 'bg-gradient-to-r from-red-600 to-rose-700 text-white hover:shadow-lg hover:shadow-red-500/20' 
                : 'bg-gray-800 text-gray-500 cursor-not-allowed'
            }`}
          >
            <Clock size={20} />
            <span>تحديد مستوى الخطورة (TRIAGE)</span>
          </button>
        </div>
      </div>
    </div>
  );
};

const VitalInput = ({ label, val, setVal, ph }: any) => (
  <div className="bg-[#1e293b] p-3 rounded-xl border border-gray-700">
    <label className="block text-xs text-gray-500 mb-1">{label}</label>
    <input 
      type="text" 
      value={val} 
      onChange={e => setVal(e.target.value)} 
      placeholder={ph}
      className="w-full bg-transparent text-white font-mono focus:outline-none"
    />
  </div>
);