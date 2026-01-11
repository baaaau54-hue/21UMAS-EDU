import React, { useState } from 'react';
import { BookOpen, GraduationCap, Search, Globe } from 'lucide-react';

interface LibraryPanelProps {
  onSubmit: (prompt: string) => void;
}

export const LibraryPanel: React.FC<LibraryPanelProps> = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = () => {
    if (!query) return;
    
    const prompt = `
**بحث أكاديمي (Academic Research)**
الموضوع: "${query}"

الرجاء القيام بما يلي:
1. تقديم ملخص شامل عن أحدث الأبحاث والدراسات المتعلقة بهذا الموضوع (2020-2025).
2. استعراض النقاط الجدلية الرئيسية.
3. توفير قائمة بالمراجع الموثوقة (Journals & Guidelines) مع روابط إن وجدت.
    `.trim();

    onSubmit(prompt);
  };

  return (
    <div className="flex-1 overflow-y-auto p-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8 flex items-center gap-4">
          <div className="w-16 h-16 bg-gradient-to-br from-sky-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-blue-900/30">
            <BookOpen size={32} className="text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-white">المكتبة الأكاديمية</h2>
            <p className="text-sky-300">محرك بحث للمصادر الطبية والدراسات الحديثة</p>
          </div>
        </div>

        <div className="glass-panel p-8 rounded-3xl border border-white/5 space-y-8">
            <div className="flex flex-col gap-4 items-center text-center">
              <GraduationCap size={48} className="text-gray-600 mb-2" />
              <h3 className="text-xl font-semibold text-white">عن ماذا تبحث اليوم؟</h3>
              <p className="text-gray-400 text-sm max-w-md">ابحث عن أوراق بحثية، بروتوكولات علاجية، أو شرح لمفاهيم طبية أكاديمية معقدة.</p>
            </div>

            <div className="relative">
              <input 
                type="text" 
                value={query}
                onChange={e => setQuery(e.target.value)}
                className="w-full bg-[#0f172a] border border-gray-700 rounded-2xl py-4 pr-12 pl-4 text-white placeholder-gray-500 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all text-lg"
                placeholder="مثال: Management of Diabetic Ketoacidosis..."
                onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
              />
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={24} />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button onClick={() => setQuery('Latest treatment guidelines for Hypertension')} className="p-3 bg-[#1e293b] rounded-lg text-xs text-gray-400 hover:text-white hover:bg-sky-500/20 border border-transparent hover:border-sky-500/30 transition-all text-right">
                أحدث إرشادات علاج ارتفاع الضغط
              </button>
              <button onClick={() => setQuery('Mechanism of action of SGLT2 inhibitors')} className="p-3 bg-[#1e293b] rounded-lg text-xs text-gray-400 hover:text-white hover:bg-sky-500/20 border border-transparent hover:border-sky-500/30 transition-all text-right">
                آلية عمل مثبطات SGLT2
              </button>
            </div>

            <button 
              onClick={handleSubmit}
              disabled={!query}
              className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all ${
                query 
                  ? 'bg-gradient-to-r from-sky-600 to-blue-600 text-white hover:shadow-lg hover:shadow-blue-500/20' 
                  : 'bg-gray-800 text-gray-500 cursor-not-allowed'
              }`}
            >
              <Globe size={18} />
              <span>بحث في المصادر العالمية</span>
            </button>
        </div>
      </div>
    </div>
  );
};