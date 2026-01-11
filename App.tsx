import React, { useState, useRef, useEffect } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { Welcome } from './components/Welcome';
import { MessageBubble } from './components/MessageBubble';
import { ModelSelector } from './components/ModelSelector';
import { DiagnosisPanel } from './components/DiagnosisPanel';
import { DrugPanel } from './components/DrugPanel';
import { LibraryPanel } from './components/LibraryPanel';
import { ScribePanel } from './components/ScribePanel';
import { BoardPanel } from './components/BoardPanel';
import { SimplifierPanel } from './components/SimplifierPanel';
import { OscePanel } from './components/OscePanel';
import { TriagePanel } from './components/TriagePanel';
import { ResearchPanel } from './components/ResearchPanel';
import { LabPanel } from './components/LabPanel';
import { SbarPanel } from './components/SbarPanel';
import { AlgorithmPanel } from './components/AlgorithmPanel';
import { RadiologyPanel } from './components/RadiologyPanel';
import { ProcedurePanel } from './components/ProcedurePanel';
import { LifestylePanel } from './components/LifestylePanel';
import { ToxicologyPanel } from './components/ToxicologyPanel';
import { TranslatorPanel } from './components/TranslatorPanel';
import { EvidencePanel } from './components/EvidencePanel';
import { PediatricPanel } from './components/PediatricPanel';
import { SurgeryPanel } from './components/SurgeryPanel';
import { CalcPanel } from './components/CalcPanel';
import { DermaPanel } from './components/DermaPanel';
import { PsychPanel } from './components/PsychPanel';
import { QuizPanel } from './components/QuizPanel';
import { SurgeryStrategyPanel } from './components/SurgeryStrategyPanel';
import { MnMPanel } from './components/MnMPanel';
import { OpNotePanel } from './components/OpNotePanel';
import { DetectivePanel } from './components/DetectivePanel';
import { AntibioticPanel } from './components/AntibioticPanel';
import { VentilatorPanel } from './components/VentilatorPanel';
import { OrthoPanel } from './components/OrthoPanel';
import { NeuroPanel } from './components/NeuroPanel';
import { OncoPanel } from './components/OncoPanel';
import { HemePanel } from './components/HemePanel';
import { FluidsPanel } from './components/FluidsPanel';
import { OphthaPanel } from './components/OphthaPanel';
import { DentalPanel } from './components/DentalPanel';
import { EthicsPanel } from './components/EthicsPanel';
import { StatsPanel } from './components/StatsPanel';
// New Genius Expansion Imports
import { GenePanel } from './components/GenePanel';
import { TraumaPanel } from './components/TraumaPanel';
import { EcgPanel } from './components/EcgPanel';
import { ObgynPanel } from './components/ObgynPanel';
import { RehabPanel } from './components/RehabPanel';
import { VaxPanel } from './components/VaxPanel';
import { BurnPanel } from './components/BurnPanel';
import { NephroPanel } from './components/NephroPanel';
import { ForensicPanel } from './components/ForensicPanel';
import { TravelPanel } from './components/TravelPanel';

import { ApiKeyModal } from './components/ApiKeyModal';

import { Message, ModelMode, AppTab } from './types';
import { streamResponse } from './services/geminiService';
import { Send, AlertCircle, Paperclip, X, Mic, Image as ImageIcon } from 'lucide-react';

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mode, setMode] = useState<ModelMode>('pro');
  const [activeTab, setActiveTab] = useState<AppTab>('dashboard');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (activeTab === 'dashboard') {
      scrollToBottom();
    }
  }, [messages, isLoading, activeTab]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError("حجم الملف كبير جداً. الحد الأقصى 5 ميجابايت.");
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        setError(null);
      };
      reader.readAsDataURL(file);
    }
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const executeSendMessage = async (text: string, image?: string | null, customSystemInstruction?: string) => {
    if ((!text.trim() && !image) || isLoading) return;

    const currentMode = mode;
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text.trim(),
      image: image || undefined,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setError(null);
    setActiveTab('dashboard'); 

    // Create placeholder for model response
    const thinkingId = (Date.now() + 1).toString();
    setMessages(prev => [...prev, {
      id: thinkingId,
      role: 'model',
      content: '', // Start empty
      timestamp: new Date(),
      isThinking: true, // Show thinking box immediately
      modelUsed: currentMode === 'pro' ? 'Pro' : 'Flash'
    }]);

    try {
      await streamResponse(
        messages, 
        userMessage.content, 
        image || undefined, 
        currentMode,
        (content, thinking, isDone, sources) => {
            setMessages(prev => prev.map(msg => {
                if (msg.id === thinkingId) {
                    return {
                        ...msg,
                        content: content,
                        thinkingText: thinking,
                        isThinking: !isDone && !content, // Still thinking if no content yet or stream not done
                        groundingSources: sources,
                        // Ensure we keep the modelUsed tag
                        modelUsed: currentMode === 'pro' ? 'Pro' : 'Flash'
                    };
                }
                return msg;
            }));
            
            // Auto scroll on update
            if (activeTab === 'dashboard') {
               // Optional: Throttle this if performance issues arise
               scrollToBottom(); 
            }
        },
        customSystemInstruction
      );
    } catch (err: any) {
      setError(err.message || 'خطأ في الاتصال بالنظام.');
      setMessages(prev => prev.filter(msg => msg.id !== thinkingId));
      
      if (err.message?.includes('Quota') || err.message?.includes('Key')) {
        setTimeout(() => setIsSettingsOpen(true), 2000);
      }
    } finally {
      setIsLoading(false);
      if (activeTab === 'dashboard') {
         setTimeout(() => inputRef.current?.focus(), 100);
      }
    }
  };

  const handleManualSend = () => {
    executeSendMessage(inputValue, selectedImage);
    setInputValue('');
    setSelectedImage(null);
  };

  const handleToolSubmit = (prompt: string, systemInstruction?: string, image?: string | null) => {
    executeSendMessage(prompt, image, systemInstruction);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleManualSend();
    }
  };

  const renderMainContent = () => {
    switch (activeTab) {
      // Existing Routes
      case 'diagnosis': return <DiagnosisPanel onSubmit={handleToolSubmit} />;
      case 'drugs': return <DrugPanel onSubmit={(p) => handleToolSubmit(p)} />;
      case 'library': return <LibraryPanel onSubmit={(p) => handleToolSubmit(p)} />;
      case 'scribe': return <ScribePanel onSubmit={handleToolSubmit} />;
      case 'board': return <BoardPanel onSubmit={handleToolSubmit} />;
      case 'simplifier': return <SimplifierPanel onSubmit={handleToolSubmit} />;
      case 'osce': return <OscePanel onSubmit={handleToolSubmit} />;
      case 'triage': return <TriagePanel onSubmit={handleToolSubmit} />;
      case 'research': return <ResearchPanel onSubmit={handleToolSubmit} />;
      case 'lab': return <LabPanel onSubmit={handleToolSubmit} />;
      case 'sbar': return <SbarPanel onSubmit={handleToolSubmit} />;
      case 'algorithm': return <AlgorithmPanel onSubmit={handleToolSubmit} />;
      case 'radiology': return <RadiologyPanel onSubmit={handleToolSubmit} />;
      case 'procedure': return <ProcedurePanel onSubmit={handleToolSubmit} />;
      case 'lifestyle': return <LifestylePanel onSubmit={handleToolSubmit} />;
      case 'toxicology': return <ToxicologyPanel onSubmit={handleToolSubmit} />;
      case 'translator': return <TranslatorPanel onSubmit={handleToolSubmit} />;
      case 'evidence': return <EvidencePanel onSubmit={handleToolSubmit} />;
      case 'pediatric': return <PediatricPanel onSubmit={handleToolSubmit} />;
      case 'surgery': return <SurgeryPanel onSubmit={handleToolSubmit} />;
      case 'calc': return <CalcPanel onSubmit={handleToolSubmit} />;
      case 'derma': return <DermaPanel onSubmit={handleToolSubmit} />;
      case 'psych': return <PsychPanel onSubmit={handleToolSubmit} />;
      case 'quiz': return <QuizPanel onSubmit={handleToolSubmit} />;
      case 'surg_strategy': return <SurgeryStrategyPanel onSubmit={handleToolSubmit} />;
      case 'mnm': return <MnMPanel onSubmit={handleToolSubmit} />;
      case 'op_note': return <OpNotePanel onSubmit={handleToolSubmit} />;
      case 'detective': return <DetectivePanel onSubmit={handleToolSubmit} />;
      case 'antibiotic': return <AntibioticPanel onSubmit={handleToolSubmit} />;
      case 'ventilator': return <VentilatorPanel onSubmit={handleToolSubmit} />;
      case 'ortho': return <OrthoPanel onSubmit={handleToolSubmit} />;
      case 'neuro': return <NeuroPanel onSubmit={handleToolSubmit} />;
      case 'onco': return <OncoPanel onSubmit={handleToolSubmit} />;
      case 'heme': return <HemePanel onSubmit={handleToolSubmit} />;
      case 'fluids': return <FluidsPanel onSubmit={handleToolSubmit} />;
      case 'ophtha': return <OphthaPanel onSubmit={handleToolSubmit} />;
      case 'dental': return <DentalPanel onSubmit={handleToolSubmit} />;
      case 'ethics': return <EthicsPanel onSubmit={handleToolSubmit} />;
      case 'stats': return <StatsPanel onSubmit={handleToolSubmit} />;

      // New Genius Expansion Routes
      case 'gene': return <GenePanel onSubmit={handleToolSubmit} />;
      case 'trauma': return <TraumaPanel onSubmit={handleToolSubmit} />;
      case 'ecg': return <EcgPanel onSubmit={handleToolSubmit} />;
      case 'obgyn': return <ObgynPanel onSubmit={handleToolSubmit} />;
      case 'rehab': return <RehabPanel onSubmit={handleToolSubmit} />;
      case 'vax': return <VaxPanel onSubmit={handleToolSubmit} />;
      case 'burn': return <BurnPanel onSubmit={handleToolSubmit} />;
      case 'nephro': return <NephroPanel onSubmit={handleToolSubmit} />;
      case 'forensic': return <ForensicPanel onSubmit={handleToolSubmit} />;
      case 'travel': return <TravelPanel onSubmit={handleToolSubmit} />;

      case 'dashboard':
      default:
        return (
          <>
            <div className="flex-1 overflow-y-auto p-4 md:p-8 scroll-smooth scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-transparent">
              <div className="max-w-4xl mx-auto w-full">
                {messages.length === 0 ? (
                  <Welcome onNavigate={setActiveTab} />
                ) : (
                  <>
                    {messages.map((msg) => (
                      <MessageBubble key={msg.id} message={msg} />
                    ))}
                    {error && (
                      <div className="flex items-center justify-between p-4 mb-4 bg-red-500/10 border border-red-500/20 rounded-xl animate-in fade-in">
                        <div className="flex items-center gap-2 text-red-400 text-sm">
                          <AlertCircle size={18} />
                          <span>{error}</span>
                        </div>
                        {(error.includes('Quota') || error.includes('Key')) && (
                          <button 
                            onClick={() => setIsSettingsOpen(true)}
                            className="text-xs bg-red-500/20 hover:bg-red-500/30 text-red-300 px-3 py-1 rounded-lg transition-colors border border-red-500/30"
                          >
                            إضافة مفتاح
                          </button>
                        )}
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </>
                )}
              </div>
            </div>

            <div className="p-4 md:p-6 bg-[#020617]/80 backdrop-blur-xl border-t border-gray-800/50 z-20">
              <div className="max-w-4xl mx-auto w-full flex flex-col gap-3">
                <div className="flex justify-between items-center">
                  <ModelSelector currentMode={mode} onModeChange={setMode} disabled={isLoading} />
                  {selectedImage && (
                    <div className="flex items-center gap-2 bg-gray-800/50 px-3 py-1 rounded-lg border border-gray-700 animate-in fade-in">
                      <ImageIcon size={14} className="text-sky-400" />
                      <span className="text-xs text-gray-300">Image Attached</span>
                      <button onClick={() => setSelectedImage(null)} className="hover:text-red-400">
                        <X size={14} />
                      </button>
                    </div>
                  )}
                </div>
                <div className="relative flex items-end gap-2 bg-[#1e293b]/50 border border-gray-700/50 rounded-2xl p-2 shadow-2xl focus-within:ring-2 focus-within:ring-sky-500/30 focus-within:border-sky-500/30 transition-all">
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center justify-center h-10 w-10 text-gray-400 hover:text-white hover:bg-white/10 rounded-xl transition-all mb-1"
                  >
                    <Paperclip size={20} />
                  </button>
                  <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileSelect} />
                  <textarea
                    ref={inputRef}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={mode === 'pro' ? "اكتب تفاصيل الحالة السريرية للتحليل العميق..." : "اكتب سؤالك هنا للإجابة السريعة..."}
                    className="w-full bg-transparent border-none text-white placeholder-gray-500 focus:ring-0 resize-none max-h-32 py-3 min-h-[44px] leading-relaxed"
                    rows={1}
                    style={{ height: 'auto', minHeight: '44px' }}
                    onInput={(e) => {
                      const target = e.target as HTMLTextAreaElement;
                      target.style.height = 'auto';
                      target.style.height = `${Math.min(target.scrollHeight, 128)}px`;
                    }}
                  />
                  <button className="flex items-center justify-center h-10 w-10 text-gray-400 hover:text-white hover:bg-white/10 rounded-xl transition-all mb-1">
                     <Mic size={20} />
                  </button>
                  <button
                    onClick={handleManualSend}
                    disabled={(!inputValue.trim() && !selectedImage) || isLoading}
                    className={`mb-1 p-2 rounded-xl flex items-center justify-center transition-all duration-300 ${
                      (inputValue.trim() || selectedImage) && !isLoading
                        ? mode === 'pro' 
                          ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-purple-900/20'
                          : 'bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-lg shadow-sky-900/20'
                        : 'bg-gray-800 text-gray-600 cursor-not-allowed'
                    }`}
                  >
                    <Send size={18} className={isLoading ? 'opacity-0' : 'opacity-100'} />
                    {isLoading && (
                       <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                       </div>
                    )}
                  </button>
                </div>
              </div>
              <div className="text-center mt-3 opacity-40">
                 <p className="text-[10px] font-mono tracking-widest uppercase">Secured by 21UMAS Clinical Protocols • v2.1.0</p>
              </div>
            </div>
          </>
        );
    }
  };

  return (
    <div className="flex h-screen bg-[#020617] text-slate-100 font-sans overflow-hidden">
      <div 
        className="absolute inset-0 z-0 pointer-events-none opacity-[0.03]"
        style={{ backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`, backgroundSize: '24px 24px' }}
      ></div>
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="flex-1 flex flex-col h-full relative z-10">
        <Header onOpenSettings={() => setIsSettingsOpen(true)} />
        <main className="flex-1 overflow-hidden relative flex flex-col w-full">
           {renderMainContent()}
        </main>
      </div>

      <ApiKeyModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
    </div>
  );
};

export default App;