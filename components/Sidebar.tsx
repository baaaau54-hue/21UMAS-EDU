import React from 'react';
import { LayoutDashboard, Activity, Pill, Stethoscope, BookOpen, Settings, FileText, Users, Wand2, GraduationCap, Siren, Microscope, TestTube2, GitMerge, Radio, ScanEye, Syringe, Apple, Skull, Languages, Scale, Baby, Scissors, Calculator, Brain, Trophy, Fingerprint, Layers, Crosshair, AlertOctagon, ClipboardCheck, Search, ShieldCheck, Wind, Hammer, Eye, Smile, Droplets, LineChart, Binary, Dna, Ambulance, HeartPulse, PersonStanding, ShieldPlus, Flame, Droplet, Gavel, Plane } from 'lucide-react';
import { AppTab } from '../types';

interface SidebarProps {
  activeTab: AppTab;
  onTabChange: (tab: AppTab) => void;
}

type NavGroup = {
  title: string;
  items: { icon: any; label: string; id: AppTab; color: string }[];
};

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange }) => {

  const navGroups: NavGroup[] = [
    {
      title: 'القيادة والتحكم',
      items: [
        { icon: LayoutDashboard, label: 'مركز القيادة', id: 'dashboard', color: 'text-sky-400' },
      ]
    },
    {
      title: 'النخبة (Genius Tier)',
      items: [
        { icon: Search, label: 'المحقق الطبي', id: 'detective', color: 'text-purple-400' },
        { icon: Wind, label: 'طيار العناية (ICU)', id: 'ventilator', color: 'text-cyan-400' },
        { icon: Dna, label: 'المستشار الجيني', id: 'gene', color: 'text-fuchsia-400' },
        { icon: Binary, label: 'مجلس الأورام', id: 'onco', color: 'text-rose-600' },
        { icon: Crosshair, label: 'المخطط الجراحي', id: 'surg_strategy', color: 'text-emerald-400' },
      ]
    },
    {
      title: 'الطوارئ والإصابات',
      items: [
        { icon: Ambulance, label: 'قائد الصدمات', id: 'trauma', color: 'text-red-600' },
        { icon: Flame, label: 'وحدة الحروق', id: 'burn', color: 'text-orange-500' },
        { icon: Siren, label: 'فرز الطوارئ', id: 'triage', color: 'text-red-500' },
        { icon: Skull, label: 'معالج السموم', id: 'toxicology', color: 'text-orange-400' },
      ]
    },
    {
      title: 'تخصصات دقيقة',
      items: [
        { icon: HeartPulse, label: 'مايسترو التخطيط', id: 'ecg', color: 'text-pink-500' },
        { icon: Baby, label: 'حارس الأمومة', id: 'obgyn', color: 'text-rose-400' },
        { icon: Brain, label: 'المحدد العصبي', id: 'neuro', color: 'text-violet-400' },
        { icon: Droplet, label: 'طيار الكلى', id: 'nephro', color: 'text-blue-600' },
        { icon: Droplets, label: 'هيمي-باث (الدم)', id: 'heme', color: 'text-red-500' },
      ]
    },
    {
      title: 'الجراحة والعظام',
      items: [
        { icon: Hammer, label: 'المهندس العظمي', id: 'ortho', color: 'text-orange-400' },
        { icon: Scissors, label: 'تصريح العمليات', id: 'surgery', color: 'text-teal-400' },
        { icon: Eye, label: 'منظار العيون', id: 'ophtha', color: 'text-blue-300' },
        { icon: Smile, label: 'الوجه والفكين', id: 'dental', color: 'text-yellow-200' },
      ]
    },
    {
      title: 'الوقاية والتأهيل',
      items: [
        { icon: PersonStanding, label: 'مهندس التأهيل', id: 'rehab', color: 'text-lime-400' },
        { icon: ShieldPlus, label: 'استراتيجي اللقاحات', id: 'vax', color: 'text-emerald-500' },
        { icon: Plane, label: 'طب السفر', id: 'travel', color: 'text-sky-500' },
        { icon: Apple, label: 'نمط الحياة', id: 'lifestyle', color: 'text-green-400' },
      ]
    },
    {
      title: 'تحليل وتوثيق',
      items: [
        { icon: Gavel, label: 'المحلل الجنائي', id: 'forensic', color: 'text-slate-400' },
        { icon: ShieldCheck, label: 'حارس المضادات', id: 'antibiotic', color: 'text-yellow-400' },
        { icon: Scale, label: 'المستشار الأخلاقي', id: 'ethics', color: 'text-gray-300' },
        { icon: LineChart, label: 'الساحر الإحصائي', id: 'stats', color: 'text-green-300' },
        { icon: ClipboardCheck, label: 'مُولد Op-Note', id: 'op_note', color: 'text-teal-300' },
      ]
    },
    {
      title: 'أدوات أساسية',
      items: [
        { icon: Stethoscope, label: 'تشخيص ذكي', id: 'diagnosis', color: 'text-indigo-400' },
        { icon: Pill, label: 'دليل الأدوية', id: 'drugs', color: 'text-emerald-400' },
        { icon: ScanEye, label: 'مركز الأشعة', id: 'radiology', color: 'text-blue-400' },
        { icon: TestTube2, label: 'محلل المختبر', id: 'lab', color: 'text-green-400' },
        { icon: Calculator, label: 'مقياس المخاطر', id: 'calc', color: 'text-slate-400' },
      ]
    }
  ];

  return (
    <aside className="hidden md:flex flex-col w-20 lg:w-[280px] border-l border-gray-800 bg-[#020617] h-full transition-all duration-300 relative z-50 shadow-2xl shadow-black/50">
      
      {/* Brand Header */}
      <div className="h-24 flex items-center justify-center lg:justify-start lg:px-6 border-b border-gray-800/50 bg-[#020617] relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-r from-sky-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <div className="relative w-10 h-10 flex items-center justify-center mr-3">
            <div className="absolute inset-0 bg-sky-500/20 rounded-xl blur-md animate-pulse"></div>
            <Activity className="text-sky-400 relative z-10" size={24} />
        </div>
        <div className="hidden lg:flex flex-col">
           <span className="text-white font-black text-xl tracking-wider font-mono">21UMAS<span className="text-sky-500">.OS</span></span>
           <span className="text-[9px] text-gray-500 uppercase tracking-[0.3em] font-bold mt-1">Medical Command</span>
        </div>
      </div>

      {/* Navigation Groups */}
      <nav className="flex-1 py-4 flex flex-col gap-6 px-3 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-800 hover:scrollbar-thumb-gray-700">
        {navGroups.map((group, groupIdx) => (
          <div key={groupIdx} className="flex flex-col gap-1">
            <div className="px-2 mb-2 hidden lg:flex items-center gap-2 text-[10px] font-bold text-gray-600 uppercase tracking-widest border-b border-gray-800/50 pb-1 mx-2">
               <Layers size={10} />
               <span>{group.title}</span>
            </div>
            <div className="flex flex-col gap-1">
              {group.items.map((item) => {
                const isActive = activeTab === item.id;
                const Icon = item.icon;
                return (
                  <button 
                    key={item.id}
                    onClick={() => onTabChange(item.id)}
                    className={`
                      relative flex items-center justify-center lg:justify-start gap-3 p-3 rounded-xl transition-all duration-300 group overflow-hidden
                      ${isActive 
                        ? 'bg-[#1e293b] text-white shadow-lg shadow-black/20 border border-gray-700/50 translate-x-1' 
                        : 'text-gray-400 hover:bg-[#1e293b]/50 hover:text-white border border-transparent hover:translate-x-1'
                      }
                    `}
                    title={item.label}
                  >
                    <Icon size={20} className={`relative z-10 transition-colors duration-300 ${isActive ? item.color : 'group-hover:text-gray-200'}`} />
                    <span className={`relative z-10 hidden lg:block font-medium text-sm ${isActive ? 'text-white' : ''}`}>{item.label}</span>
                    
                    {/* Active Indicator Line */}
                    {isActive && (
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-6 bg-sky-500 rounded-r-full shadow-[0_0_10px_rgba(14,165,233,0.8)]"></div>
                    )}

                    {/* Hover Glow (Desktop) */}
                    <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-800 bg-[#020617]">
        <button className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors w-full p-3 rounded-xl hover:bg-white/5 border border-transparent hover:border-gray-800 group">
          <Settings size={20} className="group-hover:rotate-90 transition-transform duration-500" />
          <span className="hidden lg:block text-sm font-medium">System Config</span>
        </button>
      </div>
    </aside>
  );
};