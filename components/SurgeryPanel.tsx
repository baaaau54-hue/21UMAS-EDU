import React, { useState } from 'react';
import { Scissors, HeartPulse, Pill, CheckCircle } from 'lucide-react';

interface SurgeryPanelProps {
  onSubmit: (prompt: string, systemInstruction?: string) => void;
}

export const SurgeryPanel: React.FC<SurgeryPanelProps> = ({ onSubmit }) => {
  const [surgery, setSurgery] = useState('');
  const [comorbidities, setComorbidities] = useState('');
  const [meds, setMeds] = useState('');

  const handleSubmit = () => {
    if (!surgery) return;
    
    const systemInstruction = `
      أنت "استشاري الطب المحيط بالجراحة" (Perioperative Medicine Consultant).
      مهمتك: تقديم تقرير تصريح العمليات (Pre-op Clearance) وتقييم المخاطر.
      
      المطلوب:
      1. **Risk Stratification**: حساب مخاطر القلب (RCRI) والرئة.
      2. **Medication Management**: جدول دقيق للأدوية (متى نوقف الأسبرين، الوارفارين، الـ DOACs؟ وهل نحتاج Bridging؟).
      3. **Diabetes Mgmt**: كيفية التعامل مع الأنسولين أو الحبوب صباح العملية.
      4. **Optimisation**: توصيات لتحسين حالة المريض قبل الجراحة.
      5. **Post-op Alerts**: تحذيرات لما بعد العملية (DVT Prophylaxis, Pain control).
    `.trim();

    const prompt = `
**PRE-OP CLEARANCE REQUEST**
- Procedure: ${surgery}
- Patient History: ${comorbidities}
- Current Medications: ${meds}

Assess risk and provide medication instructions (Stop/Go).
    `.trim();

    onSubmit(prompt, systemInstruction);
  };

  return (
    <div className="flex-1 overflow-y-auto p-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8 flex items-center gap-4">
          <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-teal-900/30">
            <Scissors size={32} className="text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-white">تصريح العمليات</h2>
            <p className="text-teal-300">Surgical Clearance: تقييم المخاطر وإدارة الأدوية</p>
          </div>
        </div>

        <div className="glass-panel p-6 rounded-3xl border border-white/5 space-y-6">
          
          <div className="space-y-2">
            <label className="text-sm text-gray-400 font-bold">نوع العملية الجراحية</label>
            <input 
              type="text"
              value={surgery}
              onChange={e => setSurgery(e.target.value)}
              className="w-full bg-[#0f172a] border border-teal-700/50 rounded-xl p-4 text-white focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all text-lg"
              placeholder="مثال: Cholecystectomy, Hip Replacement, Hernia Repair..."
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm text-gray-400 font-bold flex items-center gap-2"><HeartPulse size={16}/> الأمراض المزمنة (Comorbidities)</label>
            <textarea 
              value={comorbidities}
              onChange={e => setComorbidities(e.target.value)}
              className="w-full bg-[#0f172a] border border-gray-700 rounded-xl p-3 text-white focus:border-teal-500 h-20 resize-none"
              placeholder="HTN, DM Type 2, Previous MI, COPD..."
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm text-gray-400 font-bold flex items-center gap-2"><Pill size={16}/> الأدوية الحالية (خاصة المميعات والسكري)</label>
            <textarea 
              value={meds}
              onChange={e => setMeds(e.target.value)}
              className="w-full bg-[#0f172a] border border-gray-700 rounded-xl p-3 text-white focus:border-teal-500 h-20 resize-none"
              placeholder="Warfarin, Aspirin, Metformin, Insulin..."
            />
          </div>

          <button 
            onClick={handleSubmit}
            disabled={!surgery}
            className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all ${
              surgery 
                ? 'bg-gradient-to-r from-teal-600 to-emerald-600 text-white hover:shadow-lg hover:shadow-teal-500/20' 
                : 'bg-gray-800 text-gray-500 cursor-not-allowed'
            }`}
          >
            <CheckCircle size={20} />
            <span>تقييم الجاهزية للجراحة (Evaluate Fitness)</span>
          </button>
        </div>
      </div>
    </div>
  );
};