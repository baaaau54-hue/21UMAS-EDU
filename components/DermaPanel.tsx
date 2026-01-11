import React, { useState, useRef } from 'react';
import { Fingerprint, UploadCloud, X, Search } from 'lucide-react';

interface DermaPanelProps {
  onSubmit: (prompt: string, systemInstruction?: string, image?: string | null) => void;
}

export const DermaPanel: React.FC<DermaPanelProps> = ({ onSubmit }) => {
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    if (!selectedImage) return;
    
    const systemInstruction = `
      أنت "استشاري الأمراض الجلدية" (Consultant Dermatologist).
      مهمتك: تحليل صور الآفات الجلدية بدقة عالية.
      
      المنهجية:
      1. **Lesion Description**: وصف الآفة (Macule, Papule, Nodule, Plaque, Vesicle, Bulla...).
      2. **Characteristics**: اللون، الحدود، التناظر، التوزيع (Dermatomal, Generalized).
      3. **ABCD Rule**: إذا كانت شامة، طبق قاعدة (Asymmetry, Border, Color, Diameter).
      4. **Differential Diagnosis**: قائمة بالتشخيصات المحتملة (الأكثر احتمالاً أولاً).
      5. **Management**: خطة العلاج المبدئية (موضعي، جهازي) ومتى يجب التحويل لأخذ خزعة (Biopsy).
    `.trim();

    const prompt = `
**DERMATOLOGY CONSULT**
- Description: ${description}
- Duration: ${duration}

Analyze the attached skin image and provide a full dermatological report.
    `.trim();

    onSubmit(prompt, systemInstruction, selectedImage);
  };

  return (
    <div className="flex-1 overflow-y-auto p-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8 flex items-center gap-4">
          <div className="w-16 h-16 bg-gradient-to-br from-rose-400 to-pink-500 rounded-2xl flex items-center justify-center shadow-2xl shadow-rose-900/30">
            <Fingerprint size={32} className="text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-white">المحلل الجلدي الذكي</h2>
            <p className="text-rose-300">Derma-Scope: تحليل الآفات الجلدية بصرياً</p>
          </div>
        </div>

        <div className="glass-panel p-6 rounded-3xl border border-white/5 space-y-6">
          
          <div className="space-y-2">
             <label className="text-sm text-gray-400">وصف الأعراض (حكة، ألم، حرقة...)</label>
             <input 
               type="text" 
               value={description} onChange={e => setDescription(e.target.value)}
               className="w-full bg-[#0f172a] border border-gray-700 rounded-xl p-3 text-white focus:border-rose-500"
               placeholder="Severe itching, burning sensation..."
             />
          </div>

          <div className="space-y-2">
             <label className="text-sm text-gray-400">المدة الزمنية</label>
             <input 
               type="text" 
               value={duration} onChange={e => setDuration(e.target.value)}
               className="w-full bg-[#0f172a] border border-gray-700 rounded-xl p-3 text-white focus:border-rose-500"
               placeholder="Started 3 days ago..."
             />
          </div>

          <div 
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-2xl h-64 flex flex-col items-center justify-center cursor-pointer transition-all ${
              selectedImage ? 'border-rose-500 bg-rose-500/10' : 'border-gray-700 hover:border-gray-500 hover:bg-[#0f172a]'
            }`}
          >
             <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileSelect} />
             
             {selectedImage ? (
               <div className="relative h-full w-full p-2 flex items-center justify-center">
                 <img src={selectedImage} alt="Preview" className="max-h-full max-w-full rounded-lg object-contain" />
                 <button 
                    onClick={(e) => { e.stopPropagation(); setSelectedImage(null); }}
                    className="absolute top-4 right-4 p-1 bg-red-500 text-white rounded-full shadow-lg hover:bg-red-600"
                 >
                   <X size={16} />
                 </button>
               </div>
             ) : (
               <>
                 <UploadCloud size={48} className="text-gray-500 mb-4" />
                 <p className="text-gray-400 font-medium">اضغط لرفع صورة الآفة الجلدية</p>
                 <p className="text-xs text-gray-600 mt-2">يرجى استخدام صور عالية الدقة وإضاءة جيدة</p>
               </>
             )}
          </div>

          <button 
            onClick={handleSubmit}
            disabled={!selectedImage}
            className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all ${
              selectedImage 
                ? 'bg-gradient-to-r from-rose-600 to-pink-600 text-white hover:shadow-lg hover:shadow-rose-500/20' 
                : 'bg-gray-800 text-gray-500 cursor-not-allowed'
            }`}
          >
            <Search size={20} />
            <span>تحليل الآفة وتشخيصها (Scan & Diagnose)</span>
          </button>
        </div>
      </div>
    </div>
  );
};