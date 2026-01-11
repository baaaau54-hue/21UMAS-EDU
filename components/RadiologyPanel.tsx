import React, { useState, useRef } from 'react';
import { ScanEye, UploadCloud, X, FileImage } from 'lucide-react';

interface RadiologyPanelProps {
  onSubmit: (prompt: string, systemInstruction?: string, image?: string | null) => void;
}

export const RadiologyPanel: React.FC<RadiologyPanelProps> = ({ onSubmit }) => {
  const [modality, setModality] = useState('X-Ray');
  const [region, setRegion] = useState('Chest');
  const [history, setHistory] = useState('');
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
      أنت "استشاري الأشعة" (Consultant Radiologist) في 21UMAS Medical OS.
      مهمتك: كتابة تقرير إشعاعي احترافي للصورة المرفقة.
      
      الهيكل المطلوب للتقرير:
      1. **Modality & Technique**: تأكيد نوع الفحص والجودة.
      2. **Findings**: وصف دقيق ومفصل لكل ما تراه (Systematic Review). استخدم مصطلحات شعاعية دقيقة (Opacities, Lucency, Hyperdense, Hypointense).
      3. **Negative Findings**: ذكر ما هو طبيعي لاستبعاد الحالات الخطرة.
      4. **Impression**: التشخيص النهائي أو القائمة التفريقية.
      5. **Recommendation**: توصيات للمتابعة أو فحوصات أخرى.
      
      اللغة: إنجليزية طبية للتقرير، مع ملخص عربي في النهاية.
    `.trim();

    const prompt = `
**Radiology Report Request**
- **Modality:** ${modality}
- **Region:** ${region}
- **Clinical History:** ${history || 'Not provided'}

Please provide a full formal radiological report for the attached image.
    `.trim();

    onSubmit(prompt, systemInstruction, selectedImage);
  };

  return (
    <div className="flex-1 overflow-y-auto p-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8 flex items-center gap-4">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-2xl flex items-center justify-center shadow-2xl shadow-blue-900/30">
            <ScanEye size={32} className="text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-white">مركز الأشعة الذكي</h2>
            <p className="text-blue-300">تحليل الصور الطبية وكتابة التقارير الإشعاعية</p>
          </div>
        </div>

        <div className="glass-panel p-6 rounded-3xl border border-white/5 space-y-6">
          
          {/* Settings */}
          <div className="grid grid-cols-2 gap-4">
             <div className="space-y-2">
               <label className="text-sm text-gray-400">نوع الفحص (Modality)</label>
               <select 
                 value={modality} onChange={e => setModality(e.target.value)}
                 className="w-full bg-[#0f172a] border border-gray-700 rounded-xl p-3 text-white focus:border-blue-500"
               >
                 <option>X-Ray</option>
                 <option>CT Scan</option>
                 <option>MRI</option>
                 <option>Ultrasound</option>
                 <option>Mammogram</option>
               </select>
             </div>
             <div className="space-y-2">
               <label className="text-sm text-gray-400">المنطقة (Region)</label>
               <input 
                 type="text" 
                 value={region} onChange={e => setRegion(e.target.value)}
                 className="w-full bg-[#0f172a] border border-gray-700 rounded-xl p-3 text-white focus:border-blue-500"
                 placeholder="e.g. Chest, Brain, Knee"
               />
             </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-gray-400">التاريخ السريري (Clinical History)</label>
            <textarea 
              value={history} onChange={e => setHistory(e.target.value)}
              className="w-full bg-[#0f172a] border border-gray-700 rounded-xl p-3 text-white focus:border-blue-500 h-20 resize-none"
              placeholder="قصة المريض، سبب الفحص، الشكوى الحالية..."
            />
          </div>

          {/* Upload Area */}
          <div 
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-2xl h-48 flex flex-col items-center justify-center cursor-pointer transition-all ${
              selectedImage ? 'border-blue-500 bg-blue-500/10' : 'border-gray-700 hover:border-gray-500 hover:bg-[#0f172a]'
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
                 <p className="text-gray-400 font-medium">اضغط لرفع صورة الأشعة</p>
                 <p className="text-xs text-gray-600 mt-2">DICOM not supported, please upload JPG/PNG</p>
               </>
             )}
          </div>

          <button 
            onClick={handleSubmit}
            disabled={!selectedImage}
            className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all ${
              selectedImage 
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:shadow-lg hover:shadow-blue-500/20' 
                : 'bg-gray-800 text-gray-500 cursor-not-allowed'
            }`}
          >
            <FileImage size={20} />
            <span>تحليل الصورة وإصدار التقرير</span>
          </button>
        </div>
      </div>
    </div>
  );
};