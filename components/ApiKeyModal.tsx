import React, { useState, useEffect } from 'react';
import { Key, Save, Trash2, X, AlertTriangle, CheckCircle } from 'lucide-react';

interface ApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ApiKeyModal: React.FC<ApiKeyModalProps> = ({ isOpen, onClose }) => {
  const [key, setKey] = useState('');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const storedKey = localStorage.getItem('21umas_user_api_key');
    if (storedKey) {
      setKey(storedKey);
      setSaved(true);
    }
  }, [isOpen]);

  const handleSave = () => {
    if (!key.trim()) return;
    localStorage.setItem('21umas_user_api_key', key.trim());
    setSaved(true);
    setTimeout(() => {
      onClose();
      window.location.reload(); // Reload to apply new key to service
    }, 1000);
  };

  const handleClear = () => {
    localStorage.removeItem('21umas_user_api_key');
    setKey('');
    setSaved(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-[#0f172a] border border-gray-700 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden transform scale-100 transition-all">
        
        {/* Header */}
        <div className="bg-[#1e293b] p-4 flex justify-between items-center border-b border-gray-700">
          <div className="flex items-center gap-2 text-sky-400">
            <Key size={20} />
            <h3 className="font-bold">إعدادات مفتاح النظام (API Key)</h3>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <div className="bg-yellow-500/10 border border-yellow-500/20 p-3 rounded-xl flex gap-3 items-start">
             <AlertTriangle className="text-yellow-500 shrink-0 mt-0.5" size={18} />
             <div className="text-xs text-yellow-200/80 leading-relaxed">
               يواجه النظام أحياناً ضغطاً عالياً (Quota Exceeded). لضمان استمرارية العمل، يمكنك استخدام مفتاح Gemini API الخاص بك مجاناً.
               <br />
               <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noreferrer" className="text-yellow-400 underline hover:text-white mt-1 inline-block">
                 احصل على مفتاح مجاني من هنا
               </a>
             </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-gray-400 font-bold">أدخل المفتاح الخاص بك (Google AI Studio Key)</label>
            <div className="relative">
              <input 
                type="password" 
                value={key}
                onChange={(e) => { setKey(e.target.value); setSaved(false); }}
                className="w-full bg-[#020617] border border-gray-600 rounded-xl p-3 pr-10 text-white focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all font-mono text-sm"
                placeholder="AIzaSy..."
              />
              <div className="absolute left-3 top-1/2 -translate-y-1/2">
                {saved ? <CheckCircle size={16} className="text-emerald-500" /> : <div className="w-2 h-2 rounded-full bg-gray-600"></div>}
              </div>
            </div>
            <p className="text-[10px] text-gray-500">يتم تخزين المفتاح في متصفحك محلياً فقط ولا يتم مشاركته.</p>
          </div>

          <div className="flex gap-3 pt-2">
            <button 
              onClick={handleSave}
              className="flex-1 bg-sky-600 hover:bg-sky-500 text-white py-2.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-colors"
            >
              <Save size={16} />
              <span>حفظ وتفعيل</span>
            </button>
            
            {saved && (
              <button 
                onClick={handleClear}
                className="px-4 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 py-2.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-colors"
                title="حذف المفتاح"
              >
                <Trash2 size={16} />
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};