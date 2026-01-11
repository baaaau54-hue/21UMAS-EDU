import React, { useState } from 'react';
import { ShieldCheck, Bug, AlertTriangle, Pill } from 'lucide-react';

interface AntibioticPanelProps {
  onSubmit: (prompt: string, systemInstruction?: string) => void;
}

export const AntibioticPanel: React.FC<AntibioticPanelProps> = ({ onSubmit }) => {
  const [site, setSite] = useState('');
  const [patientFactors, setPatientFactors] = useState('');
  const [previousAntibiotics, setPreviousAntibiotics] = useState('');

  const handleSubmit = () => {
    if (!site) return;
    
    const systemInstruction = `
      أنت "حارس المضادات الحيوية" (Antimicrobial Stewardship Expert).
      مهمتك: وصف المضاد الحيوي الأمثل بدقة متناهية لتقليل المقاومة (AMR).
      
      المنهجية:
      1. **Targeted Organisms**: ما هي البكتيريا المسببة المحتملة في هذا الموقع؟
      2. **Risk Stratification**: هل المريض معرض لـ MDR (مثل Pseudomonas أو MRSA)؟
      3. **Empiric Therapy**: العلاج التجريبي الأمثل (الجرعة، التكرار، المدة).
      4. **Renal Dose Adjustment**: تنبيهات الكلى.
      5. **De-escalation Plan**: متى وكيف ننتقل للمضادات الفموية أو الأضيق طيفاً؟
      
      الرد يجب أن يكون جدولاً واضحاً للعلاج.
    `.trim();

    const prompt = `
**ANTIBIOTIC STEWARDSHIP REQUEST**
- Infection Site/Syndrome: ${site}
- Patient Factors (Allergies/Kidney/Immunity): ${patientFactors || 'None'}
- Previous Antibiotics (last 90 days): ${previousAntibiotics || 'None'}

Recommend the best Evidence-Based Empiric Therapy with dosing.
    `.trim();

    onSubmit(prompt, systemInstruction);
  };

  return (
    <div className="flex-1 overflow-y-auto p-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8 flex items-center gap-4">
          <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-2xl flex items-center justify-center shadow-2xl shadow-amber-900/30">
            <ShieldCheck size={32} className="text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-white">حارس المضادات</h2>
            <p className="text-yellow-300">Antibiotic Stewardship: العلاج الأمثل ومحاربة المقاومة</p>
          </div>
        </div>

        <div className="glass-panel p-6 rounded-3xl border border-white/5 space-y-6">
          
          <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl flex gap-3 items-center">
             <Bug className="text-yellow-400 shrink-0" size={24} />
             <p className="text-sm text-yellow-100">
               هذه الأداة لا تقترح المضادات عشوائياً. هي تحلل عوامل الخطر للبكتيريا المقاومة (MDR) وتقترح الجرعات بناءً على وظائف الكلى وموقع العدوى.
             </p>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-400 flex items-center gap-2">
              <Bug size={16} /> موقع العدوى (Infection Source)
            </label>
            <input 
              type="text"
              value={site}
              onChange={e => setSite(e.target.value)}
              className="w-full bg-[#0f172a] border border-gray-700 rounded-xl p-4 text-white focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition-all text-lg"
              placeholder="مثال: Hospital Acquired Pneumonia, Complicated UTI, Septic Shock..."
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-400 flex items-center gap-2">
              <AlertTriangle size={16} /> عوامل المريض (حساسية، كلى، مناعة)
            </label>
            <textarea 
              value={patientFactors}
              onChange={e => setPatientFactors(e.target.value)}
              className="w-full bg-[#0f172a] border border-gray-700 rounded-xl p-3 text-white focus:border-yellow-500 h-20 resize-none"
              placeholder="Penicillin Allergy, Creatinine Clearance 30ml/min, Neutropenic..."
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-400 flex items-center gap-2">
              <Pill size={16} /> مضادات سابقة (آخر 3 شهور)
            </label>
            <input 
              type="text"
              value={previousAntibiotics}
              onChange={e => setPreviousAntibiotics(e.target.value)}
              className="w-full bg-[#0f172a] border border-gray-700 rounded-xl p-3 text-white focus:border-yellow-500"
              placeholder="Ciprofloxacin, Ceftriaxone..."
            />
          </div>

          <button 
            onClick={handleSubmit}
            disabled={!site}
            className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all ${
              site 
                ? 'bg-gradient-to-r from-yellow-500 to-amber-600 text-white hover:shadow-lg hover:shadow-yellow-500/20' 
                : 'bg-gray-800 text-gray-500 cursor-not-allowed'
            }`}
          >
            <ShieldCheck size={20} />
            <span>تصميم النظام العلاجي (Design Regimen)</span>
          </button>
        </div>
      </div>
    </div>
  );
};