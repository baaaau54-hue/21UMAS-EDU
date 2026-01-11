import React, { useState } from 'react';
import { GitMerge, ArrowDown, ShieldCheck, Clock } from 'lucide-react';

interface AlgorithmPanelProps {
  onSubmit: (prompt: string, systemInstruction?: string) => void;
}

export const AlgorithmPanel: React.FC<AlgorithmPanelProps> = ({ onSubmit }) => {
  const [condition, setCondition] = useState('');

  const handleSubmit = () => {
    if (!condition) return;
    
    const systemInstruction = `
      أنت "مهندس المسارات السريرية" (Clinical Pathway Architect).
      مهمتك: رسم خوارزمية علاجية (Algorithm) دقيقة خطوة بخطوة.
      
      التنسيق المطلوب:
      استخدم الأسهم والرموز النصية لرسم المخطط.
      
      مثال:
      [وصول المريض]
         |
         v
      [التقييم الأولي ABCDE] --> (غير مستقر؟) --> [إنعاش فوري]
         |
         v
      [خط العلاج الأول: دواء X]
         |
         v
      (بعد 5 دقائق: هل تحسن؟)
      /       \
    [نعم: مراقبة]   [لا: انتقل للخط الثاني]
    
    ركز على التوقيت (Timing) والجرعات الدقيقة.
    `.trim();

    const prompt = `
**تصميم مسار علاجي (Clinical Pathway)**
الحالة: ${condition}

قم ببناء الخوارزمية العلاجية القياسية (Standard Treatment Algorithm) لهذه الحالة.
    `.trim();

    onSubmit(prompt, systemInstruction);
  };

  return (
    <div className="flex-1 overflow-y-auto p-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8 flex items-center gap-4">
          <div className="w-16 h-16 bg-gradient-to-br from-indigo-400 to-blue-500 rounded-2xl flex items-center justify-center shadow-2xl shadow-blue-900/30">
            <GitMerge size={32} className="text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-white">مولد المسارات السريرية</h2>
            <p className="text-indigo-300">تصميم خوارزميات العلاج (Step-by-Step Algorithms)</p>
          </div>
        </div>

        <div className="glass-panel p-8 rounded-3xl border border-white/5 space-y-8 text-center">
            
            <div className="bg-[#1e293b]/50 p-6 rounded-2xl border border-dashed border-gray-700 flex flex-col items-center gap-4">
               <Clock size={40} className="text-gray-500" />
               <p className="text-gray-400 text-sm">أدخل اسم الحالة الطبية (مثل: Diabetic Ketoacidosis, Acute Asthma, Status Epilepticus) للحصول على مخطط زمني للإجراءات.</p>
            </div>

            <div className="relative">
              <input 
                type="text" 
                value={condition}
                onChange={e => setCondition(e.target.value)}
                className="w-full bg-[#0f172a] border border-gray-700 rounded-2xl py-4 px-6 text-white placeholder-gray-500 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all text-xl text-center font-bold"
                placeholder="اسم الحالة الطبية..."
                onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
              />
            </div>

            <button 
              onClick={handleSubmit}
              disabled={!condition}
              className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all ${
                condition 
                  ? 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white hover:shadow-lg hover:shadow-blue-500/20' 
                  : 'bg-gray-800 text-gray-500 cursor-not-allowed'
              }`}
            >
              <ArrowDown size={20} />
              <span>رسم المسار (Build Algorithm)</span>
            </button>
        </div>
      </div>
    </div>
  );
};