import React, { useState } from 'react';
import { Baby, Zap, Activity, Syringe } from 'lucide-react';

interface PediatricPanelProps {
  onSubmit: (prompt: string, systemInstruction?: string) => void;
}

export const PediatricPanel: React.FC<PediatricPanelProps> = ({ onSubmit }) => {
  const [weight, setWeight] = useState('');
  const [age, setAge] = useState('');

  const handleSubmit = () => {
    if (!weight && !age) return;
    
    const systemInstruction = `
      أنت "منقذ الأطفال" (Pedi-Save Specialist).
      مهمتك: توليد ورقة إنعاش فورية (Resuscitation Sheet) دقيقة جداً.
      
      البيانات المطلوبة بدقة متناهية:
      1. **Airway**: حجم الأنبوب الرغامي (Cuffed & Uncuffed)، حجم LMA، وحجم الـ Blade.
      2. **Circulation**: جرعة السوائل الإسعافية (Fluid Bolus 20ml/kg).
      3. **Defibrillation**: جرعة الصدمة (Joules) الأولى والثانية.
      4. **Critical Meds**: جرعات الأدرينالين (Cardiac Arrest vs Anaphylaxis)، الأتروبين، الأميودارون، والمهدئات (Ketamine/Midazolam).
      5. **Equipment**: مقاس القسطرة البولية والأنبوب المعدي.
      
      تحذير: الأخطاء العشرية ممنوعة. استخدم التنسيق الواضح جداً للطوارئ.
    `.trim();

    const prompt = `
**PEDIATRIC EMERGENCY STAT**
- Weight: ${weight} kg
- Age: ${age}

Generate the Full Resuscitation & Equipment Guide immediately.
    `.trim();

    onSubmit(prompt, systemInstruction);
  };

  return (
    <div className="flex-1 overflow-y-auto p-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8 flex items-center gap-4">
          <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-2xl flex items-center justify-center shadow-2xl shadow-cyan-900/30">
            <Baby size={32} className="text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-white">منقذ الأطفال (Pedi-Save)</h2>
            <p className="text-cyan-300">أداة الإنعاش وحساب الجرعات الدقيقة للأطفال</p>
          </div>
        </div>

        <div className="glass-panel p-8 rounded-3xl border border-white/5 space-y-8 relative overflow-hidden">
            <div className="absolute -right-10 -top-10 text-cyan-500/10">
               <Activity size={200} />
            </div>

            <div className="grid grid-cols-2 gap-6 relative z-10">
               <div className="space-y-2">
                 <label className="text-lg font-bold text-white flex items-center gap-2">
                   <Baby size={20} /> وزن الطفل (Kg)
                 </label>
                 <input 
                   type="number" 
                   value={weight}
                   onChange={e => setWeight(e.target.value)}
                   className="w-full bg-[#1e293b] border-2 border-cyan-600 rounded-2xl py-4 px-6 text-white placeholder-gray-500 focus:border-white focus:ring-0 transition-all text-2xl font-bold text-center"
                   placeholder="0.0"
                 />
                 <p className="text-xs text-gray-400 text-center">الأفضل للدقة</p>
               </div>

               <div className="space-y-2">
                 <label className="text-lg font-bold text-white flex items-center gap-2">
                   <Activity size={20} /> أو العمر
                 </label>
                 <input 
                   type="text" 
                   value={age}
                   onChange={e => setAge(e.target.value)}
                   className="w-full bg-[#1e293b] border border-gray-700 rounded-2xl py-4 px-6 text-white placeholder-gray-500 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all text-xl text-center"
                   placeholder="Years / Months"
                 />
                 <p className="text-xs text-gray-400 text-center">للتقدير التقريبي</p>
               </div>
            </div>

            <div className="p-4 bg-cyan-500/10 border border-cyan-500/20 rounded-xl text-cyan-200 text-sm text-center">
               ستحصل على: حجم الأنبوب (ET Tube)، جرعة الصدمة (Joules)، جرعات الأدرينالين، والسوائل الإسعافية فوراً.
            </div>

            <button 
              onClick={handleSubmit}
              disabled={!weight && !age}
              className={`w-full py-5 rounded-xl font-bold text-xl flex items-center justify-center gap-3 transition-all ${
                weight || age 
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:shadow-lg hover:shadow-cyan-500/30 hover:scale-[1.02]' 
                  : 'bg-gray-800 text-gray-500 cursor-not-allowed'
              }`}
            >
              <Zap size={24} className={weight || age ? 'animate-pulse' : ''} />
              <span>توليد بروتوكول الإنعاش (Generate)</span>
            </button>
        </div>
      </div>
    </div>
  );
};