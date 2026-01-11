import React, { useState } from 'react';
import { Search, Fingerprint, Dna, FileQuestion } from 'lucide-react';

interface DetectivePanelProps {
  onSubmit: (prompt: string, systemInstruction?: string) => void;
}

export const DetectivePanel: React.FC<DetectivePanelProps> = ({ onSubmit }) => {
  const [symptoms, setSymptoms] = useState('');
  const [negativeFindings, setNegativeFindings] = useState('');
  const [familyHistory, setFamilyHistory] = useState('');

  const handleSubmit = () => {
    if (!symptoms) return;
    
    const systemInstruction = `
      أنت "المحقق الطبي الأسطوري" (Dr. House / Rare Disease Expert).
      مهمتك: حل الألغاز الطبية المستعصية التي حيرت الأطباء الآخرين.
      
      طريقة التفكير (Genius Mode):
      1. تجاهل التشخيصات الشائعة (Unless presented atypically).
      2. ابحث عن "الخيول المخططة" (Zebras): الأمراض الجينية، المناعية الذاتية النادرة، المتلازمات، والعدوى النادرة.
      3. اربط بين الأعراض التي تبدو غير مترابطة (Occam's Razor vs Hickam's Dictum).
      4. قدم قائمة بالتشخيصات المحتملة مع "نسبة احتمال" مبررة.
      5. اقترح "الفحص الذهبي" (Gold Standard Test) لتأكيد كل احتمال.
    `.trim();

    const prompt = `
**RARE DISEASE INVESTIGATION**
- Weird Symptoms: ${symptoms}
- Confirmed Negative Tests: ${negativeFindings || 'None'}
- Family/Social History: ${familyHistory || 'None'}

Think outside the box. What did everyone else miss? Provide a list of rare/complex differentials.
    `.trim();

    onSubmit(prompt, systemInstruction);
  };

  return (
    <div className="flex-1 overflow-y-auto p-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8 flex items-center gap-4">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-indigo-700 rounded-2xl flex items-center justify-center shadow-2xl shadow-purple-900/30">
            <Search size={32} className="text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-white">المحقق الطبي</h2>
            <p className="text-purple-300">Rare Disease Hunter: حل الألغاز الطبية المستعصية</p>
          </div>
        </div>

        <div className="glass-panel p-6 rounded-3xl border border-white/5 space-y-6 relative overflow-hidden">
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="bg-purple-500/10 border border-purple-500/20 rounded-xl p-4 flex gap-3 items-center">
             <Fingerprint size={24} className="text-purple-400" />
             <p className="text-sm text-purple-200">هذه الأداة مخصصة للحالات التي فشل التشخيص التقليدي في حلها. ابحث عن المتلازمات النادرة والربط غير المسبوق.</p>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-400 flex items-center gap-2">
              <FileQuestion size={16} /> الأعراض الغامضة / غير المترابطة
            </label>
            <textarea 
              value={symptoms}
              onChange={e => setSymptoms(e.target.value)}
              className="w-full bg-[#0f172a] border border-gray-700 rounded-xl p-4 text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all h-24 resize-none"
              placeholder="مثال: حمى مجهولة المصدر لمدة 3 أسابيع، طفح جلدي يظهر ويختفي، ألم مفاصل متنقل..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
               <label className="text-sm font-bold text-gray-400">فحوصات سلبية (استبعدنا ماذا؟)</label>
               <input 
                 type="text" value={negativeFindings} onChange={e => setNegativeFindings(e.target.value)}
                 className="w-full bg-[#0f172a] border border-gray-700 rounded-xl p-3 text-white focus:border-purple-500"
                 placeholder="Autoimmune profile negative, CT Chest normal..."
               />
            </div>
            <div className="space-y-2">
               <label className="text-sm font-bold text-gray-400 flex items-center gap-1"><Dna size={14}/> القصة العائلية / السفر</label>
               <input 
                 type="text" value={familyHistory} onChange={e => setFamilyHistory(e.target.value)}
                 className="w-full bg-[#0f172a] border border-gray-700 rounded-xl p-3 text-white focus:border-purple-500"
                 placeholder="Consanguinity, Recent travel to Africa..."
               />
            </div>
          </div>

          <button 
            onClick={handleSubmit}
            disabled={!symptoms}
            className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all ${
              symptoms 
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:shadow-lg hover:shadow-purple-500/20' 
                : 'bg-gray-800 text-gray-500 cursor-not-allowed'
            }`}
          >
            <Search size={20} />
            <span>بدء التحقيق المعمق (Analyze Case)</span>
          </button>
        </div>
      </div>
    </div>
  );
};