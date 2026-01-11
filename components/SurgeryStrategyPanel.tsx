import React, { useState } from 'react';
import { Crosshair, Layers, AlertTriangle, PenTool } from 'lucide-react';

interface SurgeryStrategyPanelProps {
  onSubmit: (prompt: string, systemInstruction?: string) => void;
}

export const SurgeryStrategyPanel: React.FC<SurgeryStrategyPanelProps> = ({ onSubmit }) => {
  const [procedure, setProcedure] = useState('');

  const handleSubmit = () => {
    if (!procedure) return;
    
    const systemInstruction = `
      أنت "الاستراتيجي الجراحي" (Surgical Strategist Master).
      مهمتك: تحضير الجراح ذهنياً وعلمياً للعملية، كما لو كنت بروفيسوراً يشرح لمقيم (Resident).
      
      الهيكل الصارم للإجابة (Genius Level):
      1. **Surgical Anatomy & Landmarks**: التشريح الدقيق، الطبقات، والعلامات الجراحية التي *يجب* رؤيتها.
      2. **The Approach**: وضعية المريض (Positioning)، ومكان الشق الجراحي (Incision).
      3. **Step-by-Step Dissection**: خطوات التسلخ بتسلسل منطقي.
      4. **⛔ DANGER ZONES**: (أهم قسم) ما هي الشرايين والأعصاب القريبة التي قد تُصاب بالخطأ؟ كيف تتجنبها؟
      5. **Closure**: تقنية الإغلاق ونوع الخيوط.
      
      استخدم لغة جراحية إنجليزية تقنية عالية، مع مصطلحات عربية للتوضيح.
    `.trim();

    const prompt = `
**SURGICAL STRATEGY REQUEST**
Procedure: ${procedure}

Provide a masterclass breakdown: Anatomy, Danger Zones, and Operative Steps.
    `.trim();

    onSubmit(prompt, systemInstruction);
  };

  return (
    <div className="flex-1 overflow-y-auto p-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8 flex items-center gap-4">
          <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-emerald-900/30">
            <Crosshair size={32} className="text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-white">المخطط الجراحي العبقري</h2>
            <p className="text-emerald-300">Surgical Masterclass: التشريح، الخطوات، ومناطق الخطر</p>
          </div>
        </div>

        <div className="glass-panel p-8 rounded-3xl border border-white/5 space-y-8 relative overflow-hidden">
            
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none"></div>

            <div className="bg-[#1e293b]/50 p-6 rounded-2xl border border-dashed border-emerald-500/30 flex flex-col items-center text-center gap-4">
               <Layers size={40} className="text-emerald-500" />
               <p className="text-gray-300 text-sm leading-relaxed">
                 أدخل اسم العملية (مثلاً: Laparoscopic Cholecystectomy, Thyroidectomy, Whipple Procedure).
                 سيقوم النظام بتفكيك العملية إلى طبقات تشريحية وتحديد "مناطق الخطر" لتجنب الإصابات.
               </p>
            </div>

            <div className="relative">
              <input 
                type="text" 
                value={procedure}
                onChange={e => setProcedure(e.target.value)}
                className="w-full bg-[#0f172a] border border-gray-700 rounded-2xl py-5 px-6 text-white placeholder-gray-600 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all text-xl font-bold text-center shadow-inner"
                placeholder="Type Procedure Name..."
                onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
              />
            </div>

            <div className="grid grid-cols-3 gap-2 text-[10px] text-gray-500 font-mono uppercase tracking-widest text-center">
               <div className="flex flex-col items-center gap-1">
                 <PenTool size={14} className="text-emerald-400"/> Incision
               </div>
               <div className="flex flex-col items-center gap-1">
                 <AlertTriangle size={14} className="text-red-400"/> Danger Zones
               </div>
               <div className="flex flex-col items-center gap-1">
                 <Layers size={14} className="text-blue-400"/> Closure
               </div>
            </div>

            <button 
              onClick={handleSubmit}
              disabled={!procedure}
              className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all ${
                procedure 
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:shadow-lg hover:shadow-emerald-500/20 hover:scale-[1.01]' 
                  : 'bg-gray-800 text-gray-500 cursor-not-allowed'
              }`}
            >
              <Crosshair size={20} />
              <span>بدء التخطيط الاستراتيجي (Initiate Strategy)</span>
            </button>
        </div>
      </div>
    </div>
  );
};