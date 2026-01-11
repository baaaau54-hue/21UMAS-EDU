import React, { useState } from 'react';
import { TestTube2, AlertTriangle, CheckCircle2, Dna, Activity } from 'lucide-react';

interface LabPanelProps {
  onSubmit: (prompt: string, systemInstruction?: string) => void;
}

export const LabPanel: React.FC<LabPanelProps> = ({ onSubmit }) => {
  const [labs, setLabs] = useState({
    wbc: '', hb: '', plt: '',
    na: '', k: '', cr: '', urea: '',
    ast: '', alt: '', trop: '',
    ph: '', pco2: '', hco3: ''
  });

  const handleSubmit = () => {
    // Filter empty values
    const filledLabs = Object.entries(labs)
      .filter(([_, value]) => value !== '')
      .map(([key, value]) => `${key.toUpperCase()}: ${value}`)
      .join(', ');

    if (!filledLabs) return;
    
    const systemInstruction = `
      أنت "محلل الترابط الحيوي" (Bio-Correlator).
      مهمتك ليست قراءة الأرقام، بل اكتشاف العلاقات الخفية بين نتائج المختبر.
      
      المنهجية:
      1. حدد القيم غير الطبيعية.
      2. اربط القيم ببعضها (مثلاً: Anemia + High Urea -> Hemolytic Uremic Syndrome?).
      3. اربط النتائج بغازات الدم (ABG) إن وجدت لتحديد الاضطراب الحمضي/القلوي.
      4. قدم "تفسيراً فيزيولوجياً" (Pathophysiological Explanation).
      5. اقترح التشخيص التفريقي المخبري.
    `.trim();

    const prompt = `
**تحليل مخبري متقدم**
النتائج:
${filledLabs}

قم بالتحليل الشامل واكشف الأنماط المرضية.
    `.trim();

    onSubmit(prompt, systemInstruction);
  };

  return (
    <div className="flex-1 overflow-y-auto p-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8 flex items-center gap-4">
          <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-emerald-900/30">
            <TestTube2 size={32} className="text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-white">محلل المختبر الذكي</h2>
            <p className="text-emerald-300">Bio-Correlator: ربط النتائج واكتشاف المتلازمات</p>
          </div>
        </div>

        <div className="glass-panel p-6 rounded-3xl border border-white/5 space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* CBC */}
            <div className="space-y-3">
              <h3 className="text-emerald-400 font-bold text-sm uppercase tracking-wider flex items-center gap-2">
                <Dna size={14} /> صورة الدم (CBC)
              </h3>
              <LabInput label="WBC" val={labs.wbc} setVal={v => setLabs({...labs, wbc: v})} unit="x10^9/L" />
              <LabInput label="Hb" val={labs.hb} setVal={v => setLabs({...labs, hb: v})} unit="g/dL" />
              <LabInput label="Plt" val={labs.plt} setVal={v => setLabs({...labs, plt: v})} unit="x10^9/L" />
            </div>

            {/* Kidney & lytes */}
            <div className="space-y-3">
              <h3 className="text-blue-400 font-bold text-sm uppercase tracking-wider flex items-center gap-2">
                <Activity size={14} /> الكلى والشوارد
              </h3>
              <LabInput label="Na" val={labs.na} setVal={v => setLabs({...labs, na: v})} unit="mmol/L" />
              <LabInput label="K" val={labs.k} setVal={v => setLabs({...labs, k: v})} unit="mmol/L" />
              <LabInput label="Creatinine" val={labs.cr} setVal={v => setLabs({...labs, cr: v})} unit="umol/L" />
              <LabInput label="Urea" val={labs.urea} setVal={v => setLabs({...labs, urea: v})} unit="mmol/L" />
            </div>

            {/* ABG & Others */}
            <div className="space-y-3">
               <h3 className="text-pink-400 font-bold text-sm uppercase tracking-wider flex items-center gap-2">
                <AlertTriangle size={14} /> غازات الدم (ABG)
              </h3>
              <LabInput label="pH" val={labs.ph} setVal={v => setLabs({...labs, ph: v})} unit="" />
              <LabInput label="pCO2" val={labs.pco2} setVal={v => setLabs({...labs, pco2: v})} unit="mmHg" />
              <LabInput label="HCO3" val={labs.hco3} setVal={v => setLabs({...labs, hco3: v})} unit="mmol/L" />
            </div>

          </div>

          <button 
            onClick={handleSubmit}
            className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all bg-gradient-to-r from-emerald-600 to-green-600 text-white hover:shadow-lg hover:shadow-emerald-500/20`}
          >
            <CheckCircle2 size={20} />
            <span>تحليل الترابط (Run Correlation)</span>
          </button>
        </div>
      </div>
    </div>
  );
};

const LabInput = ({ label, val, setVal, unit }: any) => (
  <div className="flex items-center bg-[#1e293b] rounded-lg border border-gray-700 focus-within:border-emerald-500 overflow-hidden">
    <div className="w-16 px-2 py-2 bg-gray-800 text-gray-400 text-xs font-bold text-center border-l border-gray-700">{label}</div>
    <input 
      type="number" 
      value={val} 
      onChange={e => setVal(e.target.value)} 
      className="flex-1 bg-transparent text-white px-3 py-2 text-sm focus:outline-none"
      placeholder="-"
    />
    <div className="px-2 text-[10px] text-gray-500">{unit}</div>
  </div>
);