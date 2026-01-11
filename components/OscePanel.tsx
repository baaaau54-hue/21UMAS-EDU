import React, { useState } from 'react';
import { GraduationCap, User, Play, RefreshCw } from 'lucide-react';

interface OscePanelProps {
  onSubmit: (prompt: string, systemInstruction?: string) => void;
}

export const OscePanel: React.FC<OscePanelProps> = ({ onSubmit }) => {
  const [difficulty, setDifficulty] = useState('متوسط');
  const [specialty, setSpecialty] = useState('باطنة');

  const startSimulation = () => {
    
    const systemInstruction = `
      أنت الآن تتقمص شخصية "مريض افتراضي" في امتحان OSCE (Objective Structured Clinical Examination).
      
      تعليمات الشخصية:
      1. اسمك: يحدده النظام عشوائياً.
      2. لديك حالة طبية محددة (بناءً على التخصص: ${specialty}) ومستوى صعوبة (${difficulty})، لكن **لا تفصح عنها** للطبيب (المستخدم) مباشرة.
      3. أجب عن أسئلة المستخدم فقط. لا تتطوع بالمعلومات إلا إذا سُئلت عنها.
      4. إذا سألك المستخدم عن الفحص السريري، صف له ما سيجده (مثلاً: "إذا فحصت صدري ستسمع خريراً").
      5. تصرف كإنسان (تألم، اقلق، اسأل "هل سأموت يا دكتور؟").
      
      في نهاية الجلسة، إذا قال المستخدم "إنهاء الحالة" أو "التشخيص هو..."، اخرج من الشخصية وقيم أداءه كأستاذ ممتحن.
    `.trim();

    const prompt = `
**بدء محاكاة OSCE**
التخصص: ${specialty}
الصعوبة: ${difficulty}

ابدأ التقمص فوراً. عرف عن نفسك كمريض يشعر بأعراض (بدون ذكر التشخيص) وانتظر سؤالي الأول.
    `.trim();

    onSubmit(prompt, systemInstruction);
  };

  return (
    <div className="flex-1 overflow-y-auto p-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8 flex items-center gap-4">
          <div className="w-16 h-16 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-purple-900/30">
            <GraduationCap size={32} className="text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-white">محاكي OSCE</h2>
            <p className="text-violet-300">نظام تدريب واختبار سريري تفاعلي</p>
          </div>
        </div>

        <div className="glass-panel p-8 rounded-3xl border border-white/5 space-y-8 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-violet-500 to-transparent opacity-50"></div>
            
            <div className="space-y-4">
               <User size={64} className="mx-auto text-gray-600" />
               <h3 className="text-xl font-bold text-white">إعدادات المريض الافتراضي</h3>
               <p className="text-gray-400 text-sm max-w-md mx-auto">سيقوم النظام بتوليد حالة سريرية سرية. عليك أخذ التاريخ المرضي، طلب الفحص السريري، والوصول للتشخيص.</p>
            </div>

            <div className="grid grid-cols-2 gap-4 text-right">
              <div className="space-y-2">
                 <label className="text-sm text-gray-400">التخصص</label>
                 <select 
                   value={specialty} 
                   onChange={(e) => setSpecialty(e.target.value)}
                   className="w-full bg-[#0f172a] border border-gray-700 rounded-xl p-3 text-white focus:border-violet-500"
                 >
                   <option>باطنة</option>
                   <option>جراحة</option>
                   <option>أطفال</option>
                   <option>نساء وتوليد</option>
                   <option>طب طوارئ</option>
                 </select>
              </div>
              <div className="space-y-2">
                 <label className="text-sm text-gray-400">مستوى الصعوبة</label>
                 <select 
                   value={difficulty} 
                   onChange={(e) => setDifficulty(e.target.value)}
                   className="w-full bg-[#0f172a] border border-gray-700 rounded-xl p-3 text-white focus:border-violet-500"
                 >
                   <option>سهل (حالات كلاسيكية)</option>
                   <option>متوسط</option>
                   <option>صعب (حالات نادرة/تداخلات)</option>
                 </select>
              </div>
            </div>

            <button 
              onClick={startSimulation}
              className="w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all bg-gradient-to-r from-violet-600 to-indigo-600 text-white hover:shadow-lg hover:shadow-violet-500/20 group"
            >
              <Play size={20} className="group-hover:translate-x-1 transition-transform" />
              <span>بدء المحاكاة (Start Simulation)</span>
            </button>

            <div className="text-xs text-gray-500 pt-4 border-t border-gray-800">
               ⚠️ ملاحظة: لإنهاء الاختبار والحصول على التقييم، اكتب "إنهاء الحالة".
            </div>
        </div>
      </div>
    </div>
  );
};