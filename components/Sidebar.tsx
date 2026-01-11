import React from 'react';
import { LayoutDashboard, Pill, Stethoscope, Settings, FileText, Search, Wind, Dna, Siren, Microscope, Crosshair, Binary, Ambulance, Flame, Skull, HeartPulse, Baby, Brain, Droplet, Droplets, Hammer, Scissors, Eye, Smile, PersonStanding, ShieldPlus, Plane, Apple, Gavel, ShieldCheck, Scale, LineChart, ClipboardCheck } from 'lucide-react';
import { AppTab } from '../types';

interface SidebarProps {
  activeTab: AppTab;
  onTabChange: (tab: AppTab) => void;
}

type NavGroup = {
  title?: string;
  items: { icon: any; label: string; id: AppTab; color: string }[];
};

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange }) => {

  const navGroups: NavGroup[] = [
    {
      items: [
        { icon: LayoutDashboard, label: 'الرئيسية', id: 'dashboard', color: 'text-sky-400' },
      ]
    },
    {
      title: 'الأدوات الأساسية',
      items: [
        { icon: Stethoscope, label: 'التشخيص', id: 'diagnosis', color: 'text-indigo-400' },
        { icon: Pill, label: 'الأدوية', id: 'drugs', color: 'text-emerald-400' },
        { icon: FileText, label: 'التوثيق', id: 'scribe', color: 'text-pink-400' },
        { icon: Siren, label: 'الطوارئ', id: 'triage', color: 'text-red-500' },
      ]
    },
    {
      title: 'النخبة (Genius)',
      items: [
        { icon: Search, label: 'المحقق', id: 'detective', color: 'text-purple-400' },
        { icon: Wind, label: 'العناية', id: 'ventilator', color: 'text-cyan-400' },
        { icon: Dna, label: 'الجينات', id: 'gene', color: 'text-fuchsia-400' },
        { icon: Crosshair, label: 'الجراحة', id: 'surg_strategy', color: 'text-emerald-400' },
      ]
    },
    {
      title: 'أخرى',
      items: [
         { icon: Microscope, label: 'المختبر', id: 'lab', color: 'text-green-400' },
         { icon: HeartPulse, label: 'القلب', id: 'ecg', color: 'text-rose-500' },
      ]
    }
    // Note: We are keeping the list short for visual simplicity, 
    // but all other tabs work if accessed via Welcome search or logical flows.
  ];

  return (
    <aside className="hidden md:flex flex-col w-20 lg:w-[260px] border-l border-white/5 bg-[#0b1121]/90 backdrop-blur-xl h-full z-50">
      
      {/* Brand */}
      <div className="h-20 flex items-center justify-center lg:justify-start lg:px-6 mb-4">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-sky-500 to-blue-600 flex items-center justify-center shadow-lg shadow-sky-500/20 mr-3">
            <span className="font-bold text-white text-xs">21</span>
        </div>
        <div className="hidden lg:flex flex-col">
           <span className="text-white font-bold text-lg tracking-tight">21UMAS</span>
           <span className="text-[10px] text-gray-500 uppercase tracking-widest">Medical OS</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-4 space-y-6 scrollbar-thin scrollbar-thumb-gray-800">
        {navGroups.map((group, idx) => (
          <div key={idx}>
            {group.title && (
              <div className="hidden lg:block px-2 mb-2 text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                {group.title}
              </div>
            )}
            <div className="space-y-1">
              {group.items.map((item) => {
                const isActive = activeTab === item.id;
                const Icon = item.icon;
                return (
                  <button 
                    key={item.id}
                    onClick={() => onTabChange(item.id)}
                    className={`
                      w-full flex items-center gap-3 p-2.5 rounded-xl transition-all duration-200 group relative
                      ${isActive 
                        ? 'bg-white/10 text-white shadow-inner' 
                        : 'text-gray-400 hover:bg-white/5 hover:text-gray-200'
                      }
                    `}
                    title={item.label}
                  >
                    <Icon size={18} className={`${isActive ? item.color : 'text-gray-500 group-hover:text-gray-300'}`} />
                    <span className="hidden lg:block text-sm font-medium">{item.label}</span>
                    {isActive && <div className="absolute right-0 h-full w-1 bg-sky-500 rounded-l-full"></div>}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-white/5">
        <button className="flex items-center gap-3 w-full p-2 text-gray-400 hover:text-white transition-colors">
          <Settings size={18} />
          <span className="hidden lg:block text-sm">الإعدادات</span>
        </button>
      </div>
    </aside>
  );
};