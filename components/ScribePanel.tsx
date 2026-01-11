import React, { useState } from 'react';
import { FileText, Mic, ArrowRight, Clipboard } from 'lucide-react';

interface ScribePanelProps {
  onSubmit: (prompt: string, systemInstruction?: string) => void;
}

export const ScribePanel: React.FC<ScribePanelProps> = ({ onSubmit }) => {
  const [notes, setNotes] = useState('');

  const handleSubmit = () => {
    if (!notes) return;
    
    const systemInstruction = `
      أنت "الموثق الطبي الذكي" (Smart Medical Scribe).
      مهمتك: تحويل الملاحظات السريرية العشوائية وغير المنظمة إلى تقرير طبي احترافي بصيغة SOAP Note.
      
      الهيكل المطلوب:
      - Subjective (S): شكوى المريض وتاريخه.
      - Objective (O): الفحص السريري والنتائج.
      - Assessment (A): التشخيص المحتمل.
      - Plan (P): خطة العلاج والمتابعة.
      
      استخدم لغة طبية إنجليزية (أو عربية حسب المدخلات) احترافية جداً ومختصرة.
    `.trim();

    const prompt = `
**طلب توثيق (Scribe Request)**
حول الملاحظات التالية إلى SOAP Note احترافي:

"${notes}"
    `.trim();

    onSubmit(prompt, systemInstruction);
  };

  return (
    <div className="flex-1 overflow-y-auto p-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8 flex items-center gap-4">
          <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-rose-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-pink-900/30">
            <FileText size={32} className="text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-white">الموثق السريري</h2>
            <p className="text-pink-300">تحويل الملاحظات العشوائية إلى تقارير SOAP احترافية</p>
          </div>
        </div>

        <div className="glass-panel p-6 rounded-3xl border border-white/5 space-y-6">
          <div className="p-4 bg-pink-500/10 border border-pink-500/20 rounded-xl text-pink-300 text-sm">
             💡 <strong>نصيحة:</strong> يمكنك كتابة الملاحظات بسرعة وبدون ترتيب، أو استخدام الإملاء الصوتي ولصق النص هنا. النظام سيقوم بالترتيب والتنسيق الطبي.
          </div>

          <div className="relative">
            <textarea 
              value={notes}
              onChange={e => setNotes(e.target.value)}
              className="w-full bg-[#0f172a] border border-gray-700 rounded-xl p-4 text-white focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition-all h-64 resize-none font-mono text-sm leading-relaxed"
              placeholder="مثال: مريض 40 سنة يشتكي من الم بطن من امس حرارة 38 ضغط 120/80 بطن لين لا يوجد ارتداد..."
            />
            <div className="absolute bottom-4 right-4 flex gap-2">
               <button className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-gray-400 hover:text-white transition-colors" title="لصق من الحافظة" onClick={async () => {
                 try {
                   const text = await navigator.clipboard.readText();
                   setNotes(prev => prev + text);
                 } catch (e) {}
               }}>
                 <Clipboard size={18} />
               </button>
               <button className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-gray-400 hover:text-white transition-colors" title="إملاء صوتي (محاكاة)">
                 <Mic size={18} />
               </button>
            </div>
          </div>

          <button 
            onClick={handleSubmit}
            disabled={!notes}
            className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all ${
              notes 
                ? 'bg-gradient-to-r from-pink-600 to-rose-600 text-white hover:shadow-lg hover:shadow-pink-500/20' 
                : 'bg-gray-800 text-gray-500 cursor-not-allowed'
            }`}
          >
            <span>توليد التقرير (Generate SOAP)</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};