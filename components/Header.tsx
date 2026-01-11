import React from 'react';
import { Menu, Share2, Info, Wifi, Battery, Bell } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="h-16 border-b border-gray-800/50 bg-[#020617]/80 backdrop-blur-xl flex items-center justify-between px-6 sticky top-0 z-40">
      
      {/* Left: System Status (Visual Only) */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1e293b]/50 border border-gray-800">
           <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
           <span className="text-[10px] font-mono text-emerald-400 tracking-wider">ONLINE</span>
        </div>
        <div className="hidden md:flex h-4 w-[1px] bg-gray-800"></div>
        <div className="hidden md:flex items-center gap-4 text-gray-500 text-xs font-mono">
           <span className="flex items-center gap-1"><Wifi size={12} /> 14ms</span>
           <span className="flex items-center gap-1"><Battery size={12} /> 100%</span>
        </div>
      </div>
      
      {/* Right: Actions */}
      <div className="flex items-center gap-3">
        <button className="p-2 text-gray-400 hover:text-sky-400 hover:bg-sky-500/10 rounded-lg transition-all relative">
          <Bell size={18} />
          <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-red-500 rounded-full"></span>
        </button>
        
        <a 
          href="https://21umas.edu.ye/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="hidden md:flex items-center gap-2 px-4 py-1.5 rounded-lg bg-sky-600/10 border border-sky-500/20 text-sky-400 hover:bg-sky-600/20 hover:border-sky-500/40 transition-all text-xs font-bold uppercase tracking-wide"
        >
          <span>University Portal</span>
          <Share2 size={12} />
        </a>
      </div>
    </header>
  );
};