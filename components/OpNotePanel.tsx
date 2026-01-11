import React, { useState } from 'react';
import { ClipboardCheck, CheckCircle2, Scissors, FileOutput } from 'lucide-react';

interface OpNotePanelProps {
  onSubmit: (prompt: string, systemInstruction?: string) => void;
}

export const OpNotePanel: React.FC<OpNotePanelProps> = ({ onSubmit }) => {
  const [data, setData] = useState({
    procedure: '',
    findings: '',
    complications: '',
    postOp: ''
  });

  const handleSubmit = () => {
    if (!data.procedure) return;
    
    const systemInstruction = `
      أنت "مساعد التوثيق الجراحي الذكي" (Surgical Documentation Specialist).
      مهمتك: تحويل رؤوس الأقلام إلى تقرير عمليات (Operative Note) رسمي واحترافي.
      
      الهيكل المطلوب للتقرير (Formal Structure):
      1. **Pre-operative Diagnosis**
      2. **Post-operative Diagnosis**
      3. **Procedure Performed**
      4. **Surgeon & Assistants**
      5. **Anesthesia**: (General/Spinal/Local)
      6. **Findings**: وصف دقيق لما وُجد أثناء العملية بناءً على المدخلات.
      7. **Specimens**: (Sent to histopathology if applicable)
      8. **Complications & EBL**: (Estimated Blood Loss).
      9. **Post-operative Plan**: (Antibiotics, Diet, DVT prophylaxis).
      
      الأسلوب: لغة طبية جراحية رسمية (English).
    `.trim();

    const prompt = `
**OPERATIVE NOTE GENERATION**
- Procedure: ${data.procedure}
- Intra-operative Findings: ${data.findings}
- Complications/Issues: ${data.complications || 'Nil'}
- Post-op Instructions: ${data.postOp}

Generate a formal, professional Operative Report based on these details.
    `.trim();

    onSubmit(prompt, systemInstruction);
  };

  return (
    <div className="flex-1 overflow-y-auto p-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8 flex items-center gap-4">
          <div className="w-16 h-16 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-2xl flex items-center justify-center shadow-2xl shadow-cyan-900/30">
            <ClipboardCheck size={32} className="text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-white">الموثق الجراحي الآلي</h2>
            <p className="text-teal-300">Op-Note Genius: حول ملاحظاتك إلى تقرير رسمي فوراً</p>
          </div>
        </div>

        <div className="glass-panel p-6 rounded-3xl border border-white/5 space-y-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/10 rounded-full blur-2xl pointer-events-none"></div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-400 flex items-center gap-2">
              <Scissors size={16} /> اسم العملية (Procedure)
            </label>
            <input 
              type="text"
              value={data.procedure}
              onChange={e => setData({...data, procedure: e.target.value})}
              className="w-full bg-[#0f172a] border border-teal-700/50 rounded-xl p-4 text-white focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all text-lg font-bold"
              placeholder="e.g. Laparoscopic Appendectomy"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-400 flex items-center gap-2">
              <CheckCircle2 size={16} /> الموجودات الجراحية (Intra-operative Findings)
            </label>
            <textarea 
              value={data.findings}
              onChange={e => setData({...data, findings: e.target.value})}
              className="w-full bg-[#0f172a] border border-gray-700 rounded-xl p-3 text-white focus:border-teal-500 h-24 resize-none"
              placeholder="Inflamed appendix at tip, minimal free fluid in pelvis, base healthy..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
               <label className="text-sm font-bold text-gray-400">المضاعفات (Complications)</label>
               <input 
                 type="text" value={data.complications} onChange={e => setData({...data, complications: e.target.value})}
                 className="w-full bg-[#0f172a] border border-gray-700 rounded-xl p-3 text-white focus:border-red-500"
                 placeholder="Nil / Bleeding controlled..."
               />
            </div>
            <div className="space-y-2">
               <label className="text-sm font-bold text-gray-400">خطة ما بعد العملية (Post-op)</label>
               <input 
                 type="text" value={data.postOp} onChange={e => setData({...data, postOp: e.target.value})}
                 className="w-full bg-[#0f172a] border border-gray-700 rounded-xl p-3 text-white focus:border-teal-500"
                 placeholder="Antibiotics, Soft Diet, Discharge tomorrow..."
               />
            </div>
          </div>

          <button 
            onClick={handleSubmit}
            disabled={!data.procedure}
            className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all ${
              data.procedure 
                ? 'bg-gradient-to-r from-teal-600 to-cyan-600 text-white hover:shadow-lg hover:shadow-teal-500/20' 
                : 'bg-gray-800 text-gray-500 cursor-not-allowed'
            }`}
          >
            <FileOutput size={20} />
            <span>صياغة التقرير الرسمي (Generate Formal Note)</span>
          </button>
        </div>
      </div>
    </div>
  );
};