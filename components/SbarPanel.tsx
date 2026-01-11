import React, { useState } from 'react';
import { Radio, Send, UserCheck, ClipboardCheck } from 'lucide-react';

interface SbarPanelProps {
  onSubmit: (prompt: string, systemInstruction?: string) => void;
}

export const SbarPanel: React.FC<SbarPanelProps> = ({ onSubmit }) => {
  const [sbar, setSbar] = useState({ s: '', b: '', a: '', r: '' });

  const handleSubmit = () => {
    if (!sbar.s || !sbar.a) return;
    
    const systemInstruction = `
      أنت "نظام التسليم الرقمي" (Handover Pro).
      مهمتك: صياغة رسالة تسليم احترافية (Handover Note) بين الأطباء باستخدام منهجية SBAR.
      
      المطلوب:
      1. لغة طبية دقيقة وموجزة.
      2. إبراز الأمور العاجلة والخطيرة.
      3. تنسيق النص ليكون جاهزاً للإرسال عبر واتساب أو وضعه في الملف.
    `.trim();

    const prompt = `
**تسليم مناوبة (SBAR Handover)**
- Situation (الوضع الحالي): ${sbar.s}
- Background (الخلفية): ${sbar.b}
- Assessment (التقييم): ${sbar.a}
- Recommendation (التوصيات): ${sbar.r}

قم بصياغة التقرير النهائي للتسليم.
    `.trim();

    onSubmit(prompt, systemInstruction);
  };

  return (
    <div className="flex-1 overflow-y-auto p-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8 flex items-center gap-4">
          <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-amber-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-amber-900/30">
            <Radio size={32} className="text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-white">نظام SBAR</h2>
            <p className="text-amber-300">أداة تسليم المناوبات الطبية الآمنة</p>
          </div>
        </div>

        <div className="glass-panel p-6 rounded-3xl border border-white/5 space-y-4">
          
          <SbarInput label="S - Situation" sub="ماذا يحدث الآن؟ (اسم المريض، المشكلة الحالية)" val={sbar.s} setVal={v => setSbar({...sbar, s: v})} color="text-red-400" />
          <SbarInput label="B - Background" sub="ما هي القصة؟ (تاريخ مرضي، دخول سابق)" val={sbar.b} setVal={v => setSbar({...sbar, b: v})} color="text-blue-400" />
          <SbarInput label="A - Assessment" sub="ما رأيك في المشكلة؟ (تشخيصك، نتائج الفحوصات)" val={sbar.a} setVal={v => setSbar({...sbar, a: v})} color="text-yellow-400" />
          <SbarInput label="R - Recommendation" sub="ماذا تريد أن نفعل؟ (خطة، مراقبة، فحوصات)" val={sbar.r} setVal={v => setSbar({...sbar, r: v})} color="text-green-400" />

          <button 
            onClick={handleSubmit}
            disabled={!sbar.s}
            className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all mt-4 ${
              sbar.s 
                ? 'bg-gradient-to-r from-amber-600 to-yellow-600 text-white hover:shadow-lg hover:shadow-amber-500/20' 
                : 'bg-gray-800 text-gray-500 cursor-not-allowed'
            }`}
          >
            <ClipboardCheck size={20} />
            <span>إعداد تقرير التسليم (Generate Handover)</span>
          </button>
        </div>
      </div>
    </div>
  );
};

const SbarInput = ({ label, sub, val, setVal, color }: any) => (
  <div className="space-y-1">
    <div className="flex justify-between items-baseline">
       <label className={`font-bold text-lg ${color}`}>{label}</label>
       <span className="text-[10px] text-gray-500 uppercase">{sub}</span>
    </div>
    <textarea 
      value={val}
      onChange={e => setVal(e.target.value)}
      className="w-full bg-[#1e293b] border border-gray-700 rounded-xl p-3 text-white focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all h-20 resize-none text-sm"
      placeholder="..."
    />
  </div>
);