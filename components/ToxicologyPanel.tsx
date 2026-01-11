import React, { useState } from 'react';
import { Skull, Clock, Scale, AlertTriangle } from 'lucide-react';

interface ToxicologyPanelProps {
  onSubmit: (prompt: string, systemInstruction?: string) => void;
}

export const ToxicologyPanel: React.FC<ToxicologyPanelProps> = ({ onSubmit }) => {
  const [substance, setSubstance] = useState('');
  const [amount, setAmount] = useState('');
  const [weight, setWeight] = useState('');
  const [time, setTime] = useState('');

  const handleSubmit = () => {
    if (!substance) return;
    
    const systemInstruction = `
      أنت "خبير السموم والطوارئ" (Clinical Toxicologist).
      مهمتك: تقديم إدارة فورية ومنقذة للحياة لحالات التسمم.
      
      المنهجية الصارمة:
      1. **Resuscitation (ABCs)**: التنبيهات الأولية إذا كانت المادة تؤثر على المجرى الهوائي أو القلب.
      2. **Risk Assessment**: حساب الجرعة السامة لكل كجم (mg/kg) وتحديد درجة الخطورة.
      3. **Decontamination**: هل الفحم المنشط (Activated Charcoal) مفيد الآن؟ هل غسيل المعدة موصى به؟
      4. **Specific Antidote**: اسم الترياق، الجرعة الأولية، وطريقة الإعطاء (مثلاً: NAC للباراسيتامول، Naloxone للأفيونات).
      5. **Nomogram**: إذا كان الباراسيتامول أو الساليسيلات، اطلب مستوى الدواء في الدم وحدد توقيته.
      
      الرد يجب أن يكون عاجلاً، دقيقاً، ومركزاً على إنقاذ الحياة.
    `.trim();

    const prompt = `
**TOXICOLOGY CONSULT - URGENT**
- Substance: ${substance}
- Estimated Amount: ${amount}
- Patient Weight: ${weight}
- Time since ingestion: ${time}

Provide immediate management plan, antidote dosage, and monitoring parameters.
    `.trim();

    onSubmit(prompt, systemInstruction);
  };

  return (
    <div className="flex-1 overflow-y-auto p-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8 flex items-center gap-4">
          <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-2xl shadow-orange-900/30 animate-pulse">
            <Skull size={32} className="text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-white">معالج السموم المتقدم</h2>
            <p className="text-orange-300">إدارة الجرعات الزائدة والترياق (Antidote Management)</p>
          </div>
        </div>

        <div className="glass-panel p-6 rounded-3xl border border-white/5 space-y-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
             <AlertTriangle size={120} className="text-yellow-500" />
          </div>

          <div className="space-y-2 relative z-10">
            <label className="text-sm font-bold text-gray-400">المادة السامة / الدواء</label>
            <input 
              type="text"
              value={substance}
              onChange={e => setSubstance(e.target.value)}
              className="w-full bg-[#0f172a] border border-orange-700/50 rounded-xl p-4 text-white focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all text-lg font-bold"
              placeholder="مثال: Paracetamol, Digoxin, Unknown Pesticide..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative z-10">
            <div className="space-y-2">
               <label className="text-sm text-gray-400 flex items-center gap-1"><Scale size={14}/> الكمية (تقريباً)</label>
               <input 
                 type="text" value={amount} onChange={e => setAmount(e.target.value)}
                 className="w-full bg-[#0f172a] border border-gray-700 rounded-xl p-3 text-white"
                 placeholder="20 tablets / 500mg"
               />
            </div>
            <div className="space-y-2">
               <label className="text-sm text-gray-400 flex items-center gap-1"><Scale size={14}/> وزن المريض</label>
               <input 
                 type="text" value={weight} onChange={e => setWeight(e.target.value)}
                 className="w-full bg-[#0f172a] border border-gray-700 rounded-xl p-3 text-white"
                 placeholder="kg"
               />
            </div>
            <div className="space-y-2">
               <label className="text-sm text-gray-400 flex items-center gap-1"><Clock size={14}/> الوقت المنقضي</label>
               <input 
                 type="text" value={time} onChange={e => setTime(e.target.value)}
                 className="w-full bg-[#0f172a] border border-gray-700 rounded-xl p-3 text-white"
                 placeholder="2 hours ago"
               />
            </div>
          </div>

          <button 
            onClick={handleSubmit}
            disabled={!substance}
            className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all relative z-10 ${
              substance 
                ? 'bg-gradient-to-r from-orange-600 to-red-600 text-white hover:shadow-lg hover:shadow-orange-500/20' 
                : 'bg-gray-800 text-gray-500 cursor-not-allowed'
            }`}
          >
            <Skull size={20} />
            <span>حساب السمية والترياق (Start Management)</span>
          </button>
        </div>
      </div>
    </div>
  );
};