import React, { useState } from 'react';
import { Apple, Heart, Activity } from 'lucide-react';

interface LifestylePanelProps {
  onSubmit: (prompt: string, systemInstruction?: string) => void;
}

export const LifestylePanel: React.FC<LifestylePanelProps> = ({ onSubmit }) => {
  const [diagnosis, setDiagnosis] = useState('');
  const [biometrics, setBiometrics] = useState('');

  const handleSubmit = () => {
    if (!diagnosis) return;
    
    const systemInstruction = `
      أنت "أخصائي طب نمط الحياة" (Lifestyle Medicine Specialist).
      مهمتك: كتابة "وصفة طبية للحياة" (Lifestyle Prescription) مفصلة للمريض.
      
      المحتوى المطلوب:
      1. **Medical Nutrition Therapy**: خطة غذائية محددة للمرض (مسموحات، ممنوعات، جدول مقترح).
      2. **Physical Activity Rx**: نوع الرياضة، المدة، الشدة، ومحاذير (FITT Principle).
      3. **Sleep & Stress**: نصائح للنوم وإدارة القلق.
      4. **Specific Goals**: أهداف رقمية (مثلاً: إنقاص الوزن 5% في 3 أشهر).
      
      الأسلوب: مشجع، عملي، ومبني على الأدلة (Evidence-Based).
    `.trim();

    const prompt = `
**Lifestyle Prescription Request**
- Diagnosis/Condition: ${diagnosis}
- Patient Details: ${biometrics || 'Not provided'}

Create a comprehensive diet and activity plan for this patient.
    `.trim();

    onSubmit(prompt, systemInstruction);
  };

  return (
    <div className="flex-1 overflow-y-auto p-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8 flex items-center gap-4">
          <div className="w-16 h-16 bg-gradient-to-br from-lime-500 to-green-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-lime-900/30">
            <Apple size={32} className="text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-white">وصفة نمط الحياة</h2>
            <p className="text-lime-300">Lifestyle Rx: العلاج بالغذاء والرياضة</p>
          </div>
        </div>

        <div className="glass-panel p-6 rounded-3xl border border-white/5 space-y-6">
          
          <div className="space-y-2">
            <label className="text-sm text-gray-400 flex items-center gap-2">
              <Heart size={14} /> التشخيص / الحالة الطبية
            </label>
            <input 
              type="text"
              value={diagnosis}
              onChange={e => setDiagnosis(e.target.value)}
              className="w-full bg-[#0f172a] border border-gray-700 rounded-xl p-4 text-white focus:border-lime-500 focus:ring-1 focus:ring-lime-500 transition-all text-lg"
              placeholder="مثال: Type 2 Diabetes, Hypertension, CKD Stage 3..."
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm text-gray-400 flex items-center gap-2">
              <Activity size={14} /> بيانات المريض (العمر، الوزن، الطول)
            </label>
            <input 
              type="text"
              value={biometrics}
              onChange={e => setBiometrics(e.target.value)}
              className="w-full bg-[#0f172a] border border-gray-700 rounded-xl p-4 text-white focus:border-lime-500 focus:ring-1 focus:ring-lime-500 transition-all"
              placeholder="مثال: 55 سنة، 90 كجم، لا يستطيع المشي كثيراً..."
            />
          </div>

          <button 
            onClick={handleSubmit}
            disabled={!diagnosis}
            className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all ${
              diagnosis 
                ? 'bg-gradient-to-r from-lime-600 to-green-600 text-white hover:shadow-lg hover:shadow-lime-500/20' 
                : 'bg-gray-800 text-gray-500 cursor-not-allowed'
            }`}
          >
            <Apple size={20} />
            <span>كتابة الوصفة (Generate Rx)</span>
          </button>
        </div>
      </div>
    </div>
  );
};