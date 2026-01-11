import React, { useState } from 'react';
import { Syringe, CheckSquare, AlertOctagon } from 'lucide-react';

interface ProcedurePanelProps {
  onSubmit: (prompt: string, systemInstruction?: string) => void;
}

export const ProcedurePanel: React.FC<ProcedurePanelProps> = ({ onSubmit }) => {
  const [procedure, setProcedure] = useState('');

  const handleSubmit = () => {
    if (!procedure) return;
    
    const systemInstruction = `
      أنت "مُرشد الإجراءات الطبية" (Procedure Pilot).
      مهمتك: تقديم دليل عملي فوري لأي إجراء طبي.
      
      الهيكل المطلوب:
      1. **Indications**: متى نقوم بهذا الإجراء؟
      2. **Contraindications**: متى يمنع (Absolute & Relative)؟
      3. **Equipment Checklist**: قائمة الأدوات المطلوبة بالتفصيل (مقاسات الإبر، الخيوط...).
      4. **Step-by-Step Technique**: خطوات العمل مرقمة بوضوح.
      5. **Safety Pearls**: نصائح ذهبية لتجنب الأخطاء الكارثية.
      
      الأسلوب: مباشر، نقاط محددة، يركز على السلامة.
    `.trim();

    const prompt = `
**Procedure Guide Request**
Procedure Name: ${procedure}

Provide the complete safety guide and checklist for this procedure.
    `.trim();

    onSubmit(prompt, systemInstruction);
  };

  return (
    <div className="flex-1 overflow-y-auto p-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8 flex items-center gap-4">
          <div className="w-16 h-16 bg-gradient-to-br from-fuchsia-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-fuchsia-900/30">
            <Syringe size={32} className="text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-white">مُرشد الإجراءات</h2>
            <p className="text-fuchsia-300">دليل الخطوات وقوائم السلامة (Procedure Safety)</p>
          </div>
        </div>

        <div className="glass-panel p-8 rounded-3xl border border-white/5 space-y-8 text-center">
            
            <div className="bg-[#1e293b]/50 p-6 rounded-2xl border border-dashed border-gray-700 flex flex-col items-center gap-4">
               <AlertOctagon size={40} className="text-gray-500" />
               <p className="text-gray-400 text-sm">أدخل اسم الإجراء الطبي (مثلاً: Central Line, Chest Tube, Lumbar Puncture, Suturing) للحصول على الدليل الكامل.</p>
            </div>

            <div className="relative">
              <input 
                type="text" 
                value={procedure}
                onChange={e => setProcedure(e.target.value)}
                className="w-full bg-[#0f172a] border border-gray-700 rounded-2xl py-4 px-6 text-white placeholder-gray-500 focus:border-fuchsia-500 focus:ring-1 focus:ring-fuchsia-500 transition-all text-xl text-center font-bold"
                placeholder="اسم الإجراء..."
                onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
              />
            </div>

            <button 
              onClick={handleSubmit}
              disabled={!procedure}
              className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all ${
                procedure 
                  ? 'bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white hover:shadow-lg hover:shadow-fuchsia-500/20' 
                  : 'bg-gray-800 text-gray-500 cursor-not-allowed'
              }`}
            >
              <CheckSquare size={20} />
              <span>توليد الدليل (Generate Guide)</span>
            </button>
        </div>
      </div>
    </div>
  );
};