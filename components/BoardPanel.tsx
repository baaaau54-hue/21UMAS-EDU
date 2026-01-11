import React, { useState } from 'react';
import { Users, MessageSquare, Activity, UserPlus } from 'lucide-react';

interface BoardPanelProps {
  onSubmit: (prompt: string, systemInstruction?: string) => void;
}

export const BoardPanel: React.FC<BoardPanelProps> = ({ onSubmit }) => {
  const [caseDetails, setCaseDetails] = useState('');
  const [specialists, setSpecialists] = useState<string[]>(['أخصائي باطنة', 'استشاري أشعة']);

  const toggleSpecialist = (spec: string) => {
    if (specialists.includes(spec)) {
      setSpecialists(specialists.filter(s => s !== spec));
    } else {
      if (specialists.length < 4) setSpecialists([...specialists, spec]);
    }
  };

  const availableSpecialists = [
    'استشاري قلب', 'أخصائي أعصاب', 'جراح عام', 'أخصائي أورام', 'صيدلي سريري', 'أخصائي أمراض معدية'
  ];

  const handleSubmit = () => {
    if (!caseDetails) return;
    
    const systemInstruction = `
      أنت مدير جلسة "المجلس الطبي الاستشاري" (Medical Consilium).
      دورك هو محاكاة حوار طبي دقيق وعميق بين مجموعة من الاستشاريين لمناقشة حالة المريض.
      
      الاستشاريون الحاضرون: ${specialists.join('، ')}.
      
      القواعد:
      1. قدم الحوار بأسلوب "سيناريو" (Script format).
      2. اجعل كل استشاري يتحدث بناءً على تخصصه فقط.
      3. يجب أن يكون هناك نقاش، واختلاف في وجهات النظر، ثم اتفاق على خطة.
      4. ابدأ بملخص الحالة من "مدير الحالة".
      5. انتهِ بـ "القرار النهائي للمجلس" (Consensus).
    `.trim();

    const prompt = `
**جلسة استشارية عاجلة**
تفاصيل الحالة:
${caseDetails}

ابدأ النقاش بين الاستشاريين الآن.
    `.trim();

    onSubmit(prompt, systemInstruction);
  };

  return (
    <div className="flex-1 overflow-y-auto p-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8 flex items-center gap-4">
          <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-orange-900/30">
            <Users size={32} className="text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-white">المجلس الطبي الذكي</h2>
            <p className="text-orange-300">محاكاة استشارة جماعية بين تخصصات متعددة</p>
          </div>
        </div>

        <div className="glass-panel p-6 rounded-3xl border border-white/5 space-y-6">
          
          <div className="space-y-3">
             <label className="text-sm font-bold text-gray-400 flex items-center gap-2">
               <UserPlus size={16} /> اختر أعضاء المجلس (الاستشاريين)
             </label>
             <div className="flex flex-wrap gap-2">
                {specialists.map(s => (
                  <button key={s} onClick={() => toggleSpecialist(s)} className="px-3 py-1.5 bg-orange-500/20 border border-orange-500 text-orange-400 rounded-lg text-xs font-bold hover:bg-orange-500/30 flex items-center gap-2">
                    {s} <span className="text-orange-500/50">✕</span>
                  </button>
                ))}
             </div>
             <div className="flex flex-wrap gap-2 mt-2 pt-2 border-t border-gray-800">
                {availableSpecialists.map(s => (
                  !specialists.includes(s) && (
                    <button key={s} onClick={() => toggleSpecialist(s)} className="px-3 py-1.5 bg-gray-800 border border-gray-700 text-gray-400 rounded-lg text-xs hover:text-white hover:bg-gray-700 transition-all">
                      + {s}
                    </button>
                  )
                ))}
             </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-400 flex items-center gap-2">
              <Activity size={16} /> تفاصيل الحالة (Case Presentation)
            </label>
            <textarea 
              value={caseDetails}
              onChange={e => setCaseDetails(e.target.value)}
              className="w-full bg-[#0f172a] border border-gray-700 rounded-xl p-4 text-white focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all h-40 resize-none leading-relaxed"
              placeholder="اكتب تفاصيل الحالة هنا (التاريخ المرضي، الفحوصات، الشكوى الحالية، المعضلات التي تواجهها)..."
            />
          </div>

          <button 
            onClick={handleSubmit}
            disabled={!caseDetails}
            className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all ${
              caseDetails 
                ? 'bg-gradient-to-r from-orange-600 to-red-600 text-white hover:shadow-lg hover:shadow-orange-500/20' 
                : 'bg-gray-800 text-gray-500 cursor-not-allowed'
            }`}
          >
            <MessageSquare size={20} />
            <span>عقد الاجتماع وبدء النقاش</span>
          </button>
        </div>
      </div>
    </div>
  );
};