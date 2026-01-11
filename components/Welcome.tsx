import React, { useState, useEffect } from 'react';
import { AppTab } from '../types';
import { 
  Activity, Brain, Zap, Globe, Clock, Shield, 
  Database, Cpu, Wifi, Search, AlertCircle, 
  Thermometer, Droplet, Wind, HeartPulse, 
  Dna, Ambulance, Microscope, FileText, Stethoscope 
} from 'lucide-react';

interface WelcomeProps {
  onNavigate: (tab: AppTab) => void;
}

export const Welcome: React.FC<WelcomeProps> = ({ onNavigate }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col h-full overflow-y-auto scrollbar-none pb-20">
      
      {/* Top HUD */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {/* Time Widget */}
        <div className="glass-panel p-4 rounded-2xl flex items-center justify-between border-l-4 border-l-sky-500 relative overflow-hidden group">
           <div className="absolute inset-0 bg-sky-500/5 translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
           <div className="relative z-10">
             <div className="text-3xl font-black text-white font-mono tracking-widest">{time.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
             <div className="text-xs text-sky-400 font-bold uppercase tracking-widest mt-1">{time.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}</div>
           </div>
           <Clock className="text-sky-500/20 relative z-10" size={48} />
        </div>

        {/* System Status */}
        <div className="glass-panel p-4 rounded-2xl flex flex-col justify-center border-l-4 border-l-emerald-500 relative overflow-hidden group">
           <div className="absolute inset-0 bg-emerald-500/5 translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
           <div className="relative z-10">
             <div className="flex justify-between items-center mb-2">
               <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">System Integrity</span>
               <span className="text-xs font-bold text-emerald-400 flex items-center gap-1"><div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></div> OPTIMAL</span>
             </div>
             <div className="w-full bg-gray-800 rounded-full h-1.5 overflow-hidden">
               <div className="bg-emerald-500 h-full w-[98%] shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
             </div>
             <div className="mt-3 flex gap-4 text-[10px] text-gray-500 font-mono">
               <span className="flex items-center gap-1 text-emerald-500/80"><Cpu size={10}/> 21UMAS-CORE v2.1</span>
               <span className="flex items-center gap-1 text-emerald-500/80"><Wifi size={10}/> 12ms LATENCY</span>
             </div>
           </div>
        </div>

        {/* AI Status */}
        <div className="glass-panel p-4 rounded-2xl flex flex-col justify-center border-l-4 border-l-purple-500 relative overflow-hidden group">
           <div className="absolute inset-0 bg-purple-500/5 translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
           <div className="flex items-center gap-3 relative z-10">
             <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center border border-purple-500/20 shadow-[0_0_15px_rgba(168,85,247,0.15)]">
               <Brain size={24} className="text-purple-400 animate-pulse" />
             </div>
             <div>
               <div className="text-sm font-bold text-white flex items-center gap-2">
                 Gemini 3.0 Pro
                 <span className="px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300 text-[9px] border border-purple-500/30">ONLINE</span>
               </div>
               <div className="text-[10px] text-purple-300/70 uppercase tracking-wider mt-1">Deep Reasoning Engine Active</div>
             </div>
           </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative mb-10 p-8 md:p-10 rounded-3xl overflow-hidden group border border-blue-500/30 shadow-[0_0_50px_rgba(37,99,235,0.1)]">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/90 to-sky-900/90"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20 mix-blend-overlay"></div>
        <div className="absolute -right-20 -bottom-40 w-96 h-96 bg-sky-400/20 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute top-0 right-0 p-10 opacity-10">
           <Activity size={200} className="text-white" />
        </div>
        
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-right w-full">
             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white/80 text-[10px] font-bold uppercase tracking-widest mb-4">
                <Shield size={10} className="text-sky-300" />
                Medical Command Center
             </div>
             <h1 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tight leading-tight">
               21UMAS <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 to-white">NEXUS</span>
             </h1>
             <p className="text-blue-100 text-base md:text-lg max-w-2xl leading-relaxed mb-8">
               نظام التشغيل الطبي المركزي. تشخيص مدعوم بالذكاء الاصطناعي، بروتوكولات علاجية محدثة، وتحليل بيانات سريرية فوري.
             </p>
             <div className="flex flex-wrap gap-3">
               <button onClick={() => onNavigate('diagnosis')} className="bg-white text-blue-900 px-6 py-3 rounded-xl font-bold shadow-[0_10px_20px_rgba(0,0,0,0.2)] hover:shadow-[0_15px_30px_rgba(0,0,0,0.3)] hover:bg-blue-50 hover:-translate-y-1 transition-all flex items-center gap-2 group/btn">
                 <Stethoscope size={20} className="text-blue-600 group-hover/btn:scale-110 transition-transform" /> 
                 <span>تشخيص حالة سريرية</span>
               </button>
               <button onClick={() => onNavigate('research')} className="bg-blue-800/40 backdrop-blur-md text-white border border-white/20 px-6 py-3 rounded-xl font-bold hover:bg-blue-700/50 hover:border-white/40 transition-all flex items-center gap-2">
                 <Search size={20} /> 
                 <span>بحث في المصادر</span>
               </button>
             </div>
          </div>
        </div>
      </div>

      {/* Quick Access Grid */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white flex items-center gap-3">
          <div className="p-2 rounded-lg bg-sky-500/10 text-sky-400">
             <Database size={20} />
          </div>
          <span>الوحدات النشطة (Active Modules)</span>
        </h2>
        <div className="hidden md:flex gap-2 text-[10px] font-mono text-gray-500 uppercase">
           <span className="px-2 py-1 rounded bg-gray-800 border border-gray-700">Genius Tier: UNLOCKED</span>
           <span className="px-2 py-1 rounded bg-gray-800 border border-gray-700">Database: CONNECTED</span>
        </div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
         <ModuleCard icon={<Dna />} label="Genetics" sub="المستشار الجيني" color="fuchsia" onClick={() => onNavigate('gene')} />
         <ModuleCard icon={<Ambulance />} label="Trauma" sub="قائد الصدمات" color="red" onClick={() => onNavigate('trauma')} />
         <ModuleCard icon={<HeartPulse />} label="Cardiology" sub="مايسترو التخطيط" color="pink" onClick={() => onNavigate('ecg')} />
         <ModuleCard icon={<Shield />} label="Antibiotics" sub="حارس المضادات" color="yellow" onClick={() => onNavigate('antibiotic')} />
         <ModuleCard icon={<Wind />} label="Ventilator" sub="طيار العناية" color="cyan" onClick={() => onNavigate('ventilator')} />
         <ModuleCard icon={<Microscope />} label="Lab" sub="محلل المختبر" color="green" onClick={() => onNavigate('lab')} />
         <ModuleCard icon={<FileText />} label="Scribe" sub="الموثق الطبي" color="indigo" onClick={() => onNavigate('scribe')} />
         <ModuleCard icon={<Globe />} label="Travel" sub="طب السفر" color="sky" onClick={() => onNavigate('travel')} />
         <ModuleCard icon={<Thermometer />} label="Triage" sub="فرز الطوارئ" color="rose" onClick={() => onNavigate('triage')} />
         <ModuleCard icon={<Droplet />} label="Fluids" sub="خبير السوائل" color="blue" onClick={() => onNavigate('fluids')} />
      </div>

      {/* Live Data Ticker */}
      <div className="mt-10 border-t border-gray-800 pt-6">
        <div className="flex items-center gap-4 bg-gray-900/50 p-3 rounded-xl border border-gray-800 shadow-inner">
           <div className="bg-red-500/10 text-red-500 border border-red-500/20 px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase shrink-0 flex items-center gap-2 animate-pulse">
             <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
             Live Feed
           </div>
           <div className="overflow-hidden relative w-full h-6 mask-linear-fade">
              <div className="absolute animate-marquee whitespace-nowrap text-sm text-gray-400 font-mono flex items-center gap-12">
                 <span className="flex items-center gap-2"><Globe size={12} className="text-gray-600"/> WHO Alert: Surveillance increased for new viral strain in SE Asia.</span>
                 <span className="flex items-center gap-2"><Zap size={12} className="text-yellow-600"/> 21UMAS Update: New 'Deep Reasoning' model available for complex cases.</span>
                 <span className="flex items-center gap-2"><Database size={12} className="text-blue-600"/> System: Monthly maintenance scheduled for 03:00 AM UTC.</span>
                 <span className="flex items-center gap-2"><AlertCircle size={12} className="text-orange-600"/> Pharmacy: Low stock alert for IV Paracetamol in ER storage.</span>
                 <span className="flex items-center gap-2"><Activity size={12} className="text-green-600"/> ICU Capacity: 85% Occupied. 3 Beds Available.</span>
              </div>
           </div>
        </div>
      </div>

    </div>
  );
};

const ModuleCard = ({ icon, label, sub, color, onClick }: any) => {
    const colorClasses: any = {
        fuchsia: "hover:border-fuchsia-500/50 hover:shadow-[0_0_20px_rgba(217,70,239,0.15)] text-fuchsia-400 bg-fuchsia-500/5",
        red: "hover:border-red-500/50 hover:shadow-[0_0_20px_rgba(239,68,68,0.15)] text-red-400 bg-red-500/5",
        pink: "hover:border-pink-500/50 hover:shadow-[0_0_20px_rgba(236,72,153,0.15)] text-pink-400 bg-pink-500/5",
        yellow: "hover:border-yellow-500/50 hover:shadow-[0_0_20px_rgba(234,179,8,0.15)] text-yellow-400 bg-yellow-500/5",
        cyan: "hover:border-cyan-500/50 hover:shadow-[0_0_20px_rgba(6,182,212,0.15)] text-cyan-400 bg-cyan-500/5",
        green: "hover:border-green-500/50 hover:shadow-[0_0_20px_rgba(34,197,94,0.15)] text-green-400 bg-green-500/5",
        indigo: "hover:border-indigo-500/50 hover:shadow-[0_0_20px_rgba(99,102,241,0.15)] text-indigo-400 bg-indigo-500/5",
        sky: "hover:border-sky-500/50 hover:shadow-[0_0_20px_rgba(14,165,233,0.15)] text-sky-400 bg-sky-500/5",
        rose: "hover:border-rose-500/50 hover:shadow-[0_0_20px_rgba(244,63,94,0.15)] text-rose-400 bg-rose-500/5",
        blue: "hover:border-blue-500/50 hover:shadow-[0_0_20px_rgba(59,130,246,0.15)] text-blue-400 bg-blue-500/5",
    };

    return (
        <button 
            onClick={onClick}
            className={`group relative flex flex-col items-center justify-center p-4 rounded-2xl border border-gray-800 bg-[#151f32] transition-all duration-300 ${colorClasses[color]}`}
        >
            <div className="mb-3 p-3 rounded-xl bg-[#0f172a] group-hover:scale-110 group-hover:bg-gray-900 transition-all duration-300 shadow-inner">
                {React.cloneElement(icon, { size: 24 })}
            </div>
            <div className="text-sm font-bold text-gray-200 group-hover:text-white">{label}</div>
            <div className="text-[10px] text-gray-500 font-mono mt-1 opacity-70 group-hover:opacity-100 transition-opacity">{sub}</div>
        </button>
    )
}