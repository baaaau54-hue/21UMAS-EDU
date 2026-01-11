import React, { useState, useEffect } from 'react';
import { AppTab } from '../types';
import { 
  Search, Activity, Brain, Shield, Stethoscope, 
  Pill, FileText, Siren, Microscope, Zap, 
  Dna, HeartPulse, Sparkles, Command, ArrowRight 
} from 'lucide-react';

interface WelcomeProps {
  onNavigate: (tab: AppTab) => void;
}

export const Welcome: React.FC<WelcomeProps> = ({ onNavigate }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('صباح الخير');
    else if (hour < 18) setGreeting('مساء الخير');
    else setGreeting('مساء الخير');
  }, []);

  const allTools = [
    { id: 'diagnosis', label: 'التشخيص الذكي', icon: Stethoscope, color: 'indigo', desc: 'تحليل الأعراض والتشخيص التفريقي' },
    { id: 'drugs', label: 'دليل الأدوية', icon: Pill, color: 'emerald', desc: 'الجرعات، التفاعلات، والآثار الجانبية' },
    { id: 'scribe', label: 'الموثق الطبي', icon: FileText, color: 'pink', desc: 'تحويل الملاحظات إلى تقارير SOAP' },
    { id: 'triage', label: 'فرز الطوارئ', icon: Siren, color: 'red', desc: 'تحديد درجة الخطورة MTS' },
    { id: 'lab', label: 'محلل المختبر', icon: Microscope, color: 'green', desc: 'تفسير النتائج المخبرية' },
    { id: 'ecg', label: 'تحليل تخطيط القلب', icon: HeartPulse, color: 'rose', desc: 'قراءة ECG متقدمة' },
    { id: 'gene', label: 'المستشار الجيني', icon: Dna, color: 'fuchsia', desc: 'تحليل الأمراض الوراثية' },
    { id: 'antibiotic', label: 'حارس المضادات', icon: Shield, color: 'yellow', desc: 'بروتوكولات المضادات الحيوية' },
    { id: 'board', label: 'المجلس الطبي', icon: Brain, color: 'orange', desc: 'استشارة متعددة التخصصات' },
    { id: 'research', label: 'الباحث العلمي', icon: Search, color: 'blue', desc: 'بحث في المصادر الطبية' },
  ];

  const filteredTools = allTools.filter(tool => 
    tool.label.includes(searchQuery) || tool.desc.includes(searchQuery)
  );

  return (
    <div className="flex flex-col h-full overflow-y-auto scrollbar-none pb-32 px-4 md:px-0">
      
      {/* Header Section */}
      <div className="mt-8 mb-10 text-center animate-fade-up">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-bold mb-4">
           <Sparkles size={12} />
           <span>الإصدار الاحترافي 2.1</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-3 tracking-tight">
          {greeting}، دكتور.
        </h1>
        <p className="text-gray-400 text-lg max-w-lg mx-auto leading-relaxed">
          نظام 21UMAS جاهز للمساعدة في التشخيص، العلاج، والبحث العلمي.
        </p>
      </div>

      {/* Search Bar */}
      <div className="max-w-2xl mx-auto w-full mb-10 relative group animate-fade-up" style={{ animationDelay: '0.1s' }}>
        <div className="absolute inset-0 bg-gradient-to-r from-sky-500/20 to-purple-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="relative bg-[#1e293b]/80 backdrop-blur-xl border border-gray-700 rounded-2xl flex items-center p-4 shadow-2xl transition-all focus-within:border-sky-500/50 focus-within:ring-4 focus-within:ring-sky-500/10">
          <Search className="text-gray-400 mr-2" size={24} />
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ابحث عن أداة (مثلاً: تشخيص، أدوية، طوارئ)..." 
            className="bg-transparent border-none outline-none text-white text-lg w-full placeholder-gray-500"
            autoFocus
          />
          <div className="hidden md:flex items-center gap-1 text-xs text-gray-500 bg-gray-800 px-2 py-1 rounded border border-gray-700">
            <Command size={10} />
            <span>K</span>
          </div>
        </div>
      </div>

      {/* Tools Grid */}
      <div className="max-w-4xl mx-auto w-full animate-fade-up" style={{ animationDelay: '0.2s' }}>
        <div className="flex items-center justify-between mb-4 px-2">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            {searchQuery ? 'نتائج البحث' : 'الأدوات الأكثر استخداماً'}
          </h2>
          {!searchQuery && (
            <button className="text-xs text-sky-400 hover:text-sky-300 flex items-center gap-1">
              عرض الكل <ArrowRight size={12} />
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTools.map((tool) => (
            <button
              key={tool.id}
              onClick={() => onNavigate(tool.id as AppTab)}
              className="group flex items-start gap-4 p-4 rounded-2xl bg-[#1e293b]/40 border border-gray-800 hover:bg-[#1e293b] hover:border-gray-700 transition-all duration-300 text-right"
            >
              <div className={`p-3 rounded-xl bg-${tool.color}-500/10 text-${tool.color}-400 group-hover:scale-110 transition-transform duration-300`}>
                {React.createElement(tool.icon, { size: 24 })}
              </div>
              <div>
                <h3 className="text-base font-bold text-gray-200 group-hover:text-white mb-1">
                  {tool.label}
                </h3>
                <p className="text-xs text-gray-500 leading-snug">
                  {tool.desc}
                </p>
              </div>
            </button>
          ))}
          
          {filteredTools.length === 0 && (
            <div className="col-span-full text-center py-10 text-gray-500">
              لا توجد أدوات تطابق بحثك.
            </div>
          )}
        </div>
      </div>

      {/* Quick Status Footer */}
      {!searchQuery && (
        <div className="max-w-4xl mx-auto w-full mt-10 grid grid-cols-2 md:grid-cols-4 gap-4 animate-fade-up" style={{ animationDelay: '0.3s' }}>
           <StatusCard label="حالة النظام" value="نشط" color="emerald" />
           <StatusCard label="نموذج الذكاء" value="Gemini Pro" color="purple" />
           <StatusCard label="زمن الاستجابة" value="< 1.2s" color="sky" />
           <StatusCard label="قاعدة البيانات" value="محدثة" color="blue" />
        </div>
      )}

    </div>
  );
};

const StatusCard = ({ label, value, color }: any) => (
  <div className="bg-[#1e293b]/30 border border-gray-800 rounded-xl p-3 text-center">
    <div className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">{label}</div>
    <div className={`text-sm font-bold text-${color}-400`}>{value}</div>
  </div>
);