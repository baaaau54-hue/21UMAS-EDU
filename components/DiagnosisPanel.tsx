import React, { useState } from 'react';
import { Stethoscope, Activity, User, ClipboardList, ArrowLeft } from 'lucide-react';

interface DiagnosisPanelProps {
  onSubmit: (prompt: string) => void;
}

export const DiagnosisPanel: React.FC<DiagnosisPanelProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    age: '',
    gender: 'male',
    complaint: '',
    history: '',
    vitals: ''
  });

  const handleSubmit = () => {
    if (!formData.complaint) return;
    
    const prompt = `
**طلب تحليل حالة سريرية (Clinical Diagnosis Request)**
يرجى تحليل الحالة التالية بدقة طبية عالية وتقديم تشخيص تفريقي (Differential Diagnosis):

- **بيانات المريض:** ${formData.gender === 'male' ? 'ذكر' : 'أنثى'}، ${formData.age} سنة.
- **الشكوى الرئيسية:** ${formData.complaint}
- **التاريخ المرضي:** ${formData.history || 'لا يوجد'}
- **العلامات الحيوية:** ${formData.vitals || 'غير متوفرة'}

المطلوب:
1. التشخيصات المحتملة (الأكثر احتمالاً أولاً).
2. الفحوصات المقترحة (Lab & Imaging).
3. خطة العلاج الأولية.
    `.trim();

    onSubmit(prompt);
  };

  return (
    <div className="flex-1 overflow-y-auto p-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8 flex items-center gap-4">
          <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-purple-900/30">
            <Stethoscope size={32} className="text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-white">التشخيص الذكي</h2>
            <p className="text-indigo-300">نظام تحليل الأعراض السريرية المدعوم بـ Gemini 3 Pro</p>
          </div>
        </div>

        <div className="glass-panel p-6 rounded-3xl border border-white/5 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm text-gray-400 flex items-center gap-2">
                <User size={14} /> العمر
              </label>
              <input 
                type="number" 
                value={formData.age}
                onChange={e => setFormData({...formData, age: e.target.value})}
                className="w-full bg-[#0f172a] border border-gray-700 rounded-xl p-3 text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                placeholder="مثال: 45"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-gray-400 flex items-center gap-2">
                <User size={14} /> الجنس
              </label>
              <select 
                value={formData.gender}
                onChange={e => setFormData({...formData, gender: e.target.value})}
                className="w-full bg-[#0f172a] border border-gray-700 rounded-xl p-3 text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
              >
                <option value="male">ذكر</option>
                <option value="female">أنثى</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-gray-400 flex items-center gap-2">
              <Activity size={14} /> الشكوى الرئيسية (Chief Complaint)
            </label>
            <textarea 
              value={formData.complaint}
              onChange={e => setFormData({...formData, complaint: e.target.value})}
              className="w-full bg-[#0f172a] border border-gray-700 rounded-xl p-3 text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all h-24 resize-none"
              placeholder="صف الأعراض الرئيسية، مدتها، وشدتها..."
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm text-gray-400 flex items-center gap-2">
              <ClipboardList size={14} /> التاريخ المرضي والعلامات الحيوية (اختياري)
            </label>
            <textarea 
              value={formData.history}
              onChange={e => setFormData({...formData, history: e.target.value})}
              className="w-full bg-[#0f172a] border border-gray-700 rounded-xl p-3 text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all h-24 resize-none"
              placeholder="أمراض مزمنة، عمليات سابقة، ضغط الدم، الحرارة..."
            />
          </div>

          <button 
            onClick={handleSubmit}
            disabled={!formData.complaint}
            className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all ${
              formData.complaint 
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:shadow-lg hover:shadow-purple-500/20 transform hover:-translate-y-1' 
                : 'bg-gray-800 text-gray-500 cursor-not-allowed'
            }`}
          >
            <span>بدء التحليل السريري</span>
            <ArrowLeft size={20} className={formData.complaint ? 'animate-pulse' : ''} />
          </button>
        </div>
      </div>
    </div>
  );
};