import React, { useState } from 'react';
import { Trophy, BookOpen, Star, Zap } from 'lucide-react';

interface QuizPanelProps {
  onSubmit: (prompt: string, systemInstruction?: string) => void;
}

export const QuizPanel: React.FC<QuizPanelProps> = ({ onSubmit }) => {
  const [topic, setTopic] = useState('');
  const [level, setLevel] = useState('Resident (Board Level)');

  const handleSubmit = () => {
    if (!topic) return;
    
    const systemInstruction = `
      أنت "الممتحن الطبي الصارم" (Clinical Quiz Master).
      مهمتك: التعليم عبر التحدي.
      
      الأسلوب:
      1. اطرح **سيناريو سريري (Clinical Vignette)** معقد وواقعي (USMLE Style).
      2. قدم 5 خيارات (A, B, C, D, E).
      3. اطلب من المستخدم اختيار الإجابة (لا تقدم الحل فوراً، انتظر تفاعل المستخدم ذهنياً، لكن في هذا النظام قدم السؤال والحل معاً بشكل مخفي أو مفصل في الأسفل لغرض التعلم الذاتي).
      4. **Detailed Explanation**: اشرح بدقة لماذا الإجابة الصحيحة صحيحة، ولماذا كل إجابة خاطئة هي خاطئة (Distractor Analysis).
      5. قدم "High Yield Fact" أو "Clinical Pearl" في النهاية.
    `.trim();

    const prompt = `
**CHALLENGE REQUEST**
Topic: ${topic}
Level: ${level}

Generate a challenging clinical case question with multiple choice options, followed by the answer key and detailed explanation.
    `.trim();

    onSubmit(prompt, systemInstruction);
  };

  return (
    <div className="flex-1 overflow-y-auto p-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8 flex items-center gap-4">
          <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-2xl flex items-center justify-center shadow-2xl shadow-amber-900/30">
            <Trophy size={32} className="text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-white">المنافسة السريرية</h2>
            <p className="text-amber-300">Medi-Quiz: تحديات سريرية لرفع المستوى العلمي</p>
          </div>
        </div>

        <div className="glass-panel p-6 rounded-3xl border border-white/5 space-y-6">
          
          <div className="grid grid-cols-2 gap-4">
             <div className="space-y-2">
               <label className="text-sm text-gray-400 font-bold">التخصص / الموضوع</label>
               <input 
                 type="text" 
                 value={topic} onChange={e => setTopic(e.target.value)}
                 className="w-full bg-[#0f172a] border border-gray-700 rounded-xl p-3 text-white focus:border-amber-500"
                 placeholder="Cardiology, Pharma, ECG..."
               />
             </div>
             <div className="space-y-2">
               <label className="text-sm text-gray-400 font-bold">المستوى</label>
               <select 
                 value={level} onChange={e => setLevel(e.target.value)}
                 className="w-full bg-[#0f172a] border border-gray-700 rounded-xl p-3 text-white focus:border-amber-500"
               >
                 <option>Student (Medical School)</option>
                 <option>Intern (House Officer)</option>
                 <option>Resident (Board Level)</option>
                 <option>Fellow (Sub-specialty)</option>
               </select>
             </div>
          </div>

          <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl flex gap-3 items-center">
             <Star className="text-amber-400 shrink-0" size={24} />
             <div className="text-sm text-gray-300">
               <p className="font-bold text-white mb-1">التعلم النشط (Active Recall)</p>
               <p>سيقوم النظام بتوليد سيناريو سريري مع خيارات. حاول الإجابة بنفسك قبل قراءة الشرح المفصل.</p>
             </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <button onClick={() => setTopic('ECG Interpretation')} className="px-3 py-1 bg-[#1e293b] text-gray-400 hover:text-white rounded-lg text-xs border border-gray-700">ECG Cases</button>
            <button onClick={() => setTopic('Emergency Toxicology')} className="px-3 py-1 bg-[#1e293b] text-gray-400 hover:text-white rounded-lg text-xs border border-gray-700">Toxicology</button>
            <button onClick={() => setTopic('Acid-Base Balance')} className="px-3 py-1 bg-[#1e293b] text-gray-400 hover:text-white rounded-lg text-xs border border-gray-700">Acid-Base</button>
            <button onClick={() => setTopic('Antibiotic Stewardship')} className="px-3 py-1 bg-[#1e293b] text-gray-400 hover:text-white rounded-lg text-xs border border-gray-700">Antibiotics</button>
          </div>

          <button 
            onClick={handleSubmit}
            disabled={!topic}
            className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all ${
              topic 
                ? 'bg-gradient-to-r from-amber-500 to-yellow-600 text-white hover:shadow-lg hover:shadow-amber-500/20' 
                : 'bg-gray-800 text-gray-500 cursor-not-allowed'
            }`}
          >
            <Zap size={20} />
            <span>ابدأ التحدي (Start Quiz)</span>
          </button>
        </div>
      </div>
    </div>
  );
};