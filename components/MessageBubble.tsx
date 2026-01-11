import React, { useState } from 'react';
import { Message } from '../types';
import { Bot, User, BrainCircuit, Link as LinkIcon, Volume2, Copy, Check, ChevronDown, ChevronRight, Loader2 } from 'lucide-react';
import { MarkdownRenderer } from './MarkdownRenderer';

interface MessageBubbleProps {
  message: Message;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isUser = message.role === 'user';
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSpeak = () => {
    const utterance = new SpeechSynthesisUtterance(message.content);
    utterance.lang = 'ar-SA';
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'} mb-8 animate-in slide-in-from-bottom-2 duration-500 group`}>
      <div className={`flex max-w-[90%] md:max-w-[85%] gap-4 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
        
        {/* Avatar */}
        <div className={`w-10 h-10 rounded-2xl flex-shrink-0 flex items-center justify-center shadow-lg border border-white/5 ${
          isUser 
            ? 'bg-gradient-to-br from-gray-700 to-gray-900 text-gray-300' 
            : message.modelUsed === 'Pro'
              ? 'bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white shadow-purple-500/20'
              : 'bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-emerald-500/20'
        }`}>
          {isUser ? <User size={20} /> : <Bot size={20} />}
        </div>

        {/* Content */}
        <div className="flex flex-col gap-2 min-w-0 flex-1">
          
          {/* Header Name */}
          <div className={`flex items-center gap-2 text-[10px] uppercase tracking-wider text-gray-400 ${isUser ? 'flex-row-reverse' : ''}`}>
            <span className="font-bold">{isUser ? 'User' : '21UMAS System'}</span>
            {!isUser && message.modelUsed && (
              <span className={`px-1.5 py-0.5 rounded text-[9px] border ${
                message.modelUsed === 'Pro' 
                  ? 'border-purple-500/30 text-purple-400 bg-purple-500/10' 
                  : 'border-emerald-500/30 text-emerald-400 bg-emerald-500/10'
              }`}>
                {message.modelUsed === 'Pro' ? 'DEEP REASONING' : 'FAST ENGINE'}
              </span>
            )}
            <span className="opacity-30">|</span>
            <time>{message.timestamp.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</time>
          </div>

          {/* Bubble */}
          <div className={`relative p-5 rounded-3xl shadow-lg border transition-all duration-300 ${
            isUser 
              ? 'bg-[#1e293b] border-gray-700/50 text-white rounded-tr-sm hover:border-gray-600' 
              : 'bg-[#0f172a] border-gray-800 text-gray-100 rounded-tl-sm hover:border-gray-700/50 hover:shadow-xl hover:shadow-sky-900/5'
          }`}>
            
            {/* User uploaded image */}
            {message.image && (
              <div className="mb-4 rounded-xl overflow-hidden border border-gray-700 max-w-sm shadow-md">
                <img src={message.image} alt="User Upload" className="w-full h-auto" />
              </div>
            )}

            {/* Collapsible Thinking Process */}
            {!isUser && (message.isThinking || message.thinkingText) && (
              <details className="mb-4 group/details" open={message.isThinking}>
                <summary className="list-none cursor-pointer">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-900/50 border border-gray-800 hover:bg-gray-800 hover:border-gray-700 transition-all select-none">
                     {message.isThinking ? (
                       <Loader2 size={14} className="text-sky-400 animate-spin" />
                     ) : (
                       <BrainCircuit size={14} className="text-gray-500 group-open/details:text-sky-400" />
                     )}
                     <span className={`text-xs font-mono ${message.isThinking ? 'text-sky-400' : 'text-gray-500 group-open/details:text-sky-400'}`}>
                        {message.isThinking ? 'Thinking Process...' : 'View Reasoning Process'}
                     </span>
                     <ChevronDown size={12} className="text-gray-600 transition-transform group-open/details:rotate-180" />
                  </div>
                </summary>
                
                <div className="mt-2 p-3 bg-[#020617] rounded-xl border border-dashed border-gray-800 text-xs font-mono text-gray-400 leading-relaxed overflow-hidden relative">
                   {message.isThinking && !message.content ? (
                      <div className="flex items-center gap-2">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
                        </span>
                        <span className="animate-pulse">Analyzing clinical data & formulating response...</span>
                      </div>
                   ) : (
                      // If actual thinking text is captured from the model, show it here.
                      // Otherwise, show a completed state log.
                      message.thinkingText ? (
                        <MarkdownRenderer content={message.thinkingText} /> 
                      ) : (
                         <div className="flex flex-col gap-1 text-emerald-500/70">
                           <div className="flex items-center gap-2"><Check size={10} /> Context analyzed</div>
                           <div className="flex items-center gap-2"><Check size={10} /> Medical knowledge retrieval complete</div>
                           <div className="flex items-center gap-2"><Check size={10} /> Response generated successfully</div>
                         </div>
                      )
                   )}
                </div>
              </details>
            )}

            {/* Main Content */}
            <div className="min-h-[20px]">
               {message.content ? (
                 <MarkdownRenderer content={message.content} />
               ) : (
                 message.isThinking && <span className="inline-block w-1.5 h-4 bg-sky-500 animate-pulse rounded-full align-middle ml-1"></span>
               )}
            </div>

            {/* Actions Toolbar */}
            {!isUser && !message.isThinking && (
              <div className="absolute -bottom-8 left-0 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2">
                 <button 
                  onClick={handleSpeak}
                  className="p-1.5 rounded-lg bg-gray-800 text-gray-400 hover:text-sky-400 hover:bg-gray-700 border border-gray-700 transition-colors"
                  title="قراءة صوتية"
                 >
                   <Volume2 size={14} />
                 </button>
                 <button 
                  onClick={handleCopy}
                  className="p-1.5 rounded-lg bg-gray-800 text-gray-400 hover:text-emerald-400 hover:bg-gray-700 border border-gray-700 transition-colors"
                  title="نسخ النص"
                 >
                   {copied ? <Check size={14} /> : <Copy size={14} />}
                 </button>
              </div>
            )}

          </div>

          {/* Sources / Grounding */}
          {!isUser && message.groundingSources && message.groundingSources.length > 0 && (
            <div className="mt-2 p-3 bg-gray-900/30 rounded-xl border border-gray-800/50 backdrop-blur-sm animate-in fade-in">
              <div className="flex items-center gap-2 text-[10px] uppercase font-bold text-gray-500 mb-2">
                <LinkIcon size={10} />
                <span>Verified Sources</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {message.groundingSources.map((source, idx) => (
                  <a 
                    key={idx} 
                    href={source.uri} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-2 py-1 bg-[#1e293b]/50 hover:bg-sky-500/10 border border-gray-700 hover:border-sky-500/30 rounded-md transition-all text-xs text-sky-400/80 hover:text-sky-400 max-w-full truncate"
                  >
                    <span className="truncate max-w-[150px]">{source.title}</span>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};