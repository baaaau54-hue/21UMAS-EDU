import React from 'react';
import { ModelMode } from '../types';
import { Zap, BrainCircuit } from 'lucide-react';

interface ModelSelectorProps {
  currentMode: ModelMode;
  onModeChange: (mode: ModelMode) => void;
  disabled: boolean;
}

export const ModelSelector: React.FC<ModelSelectorProps> = ({ currentMode, onModeChange, disabled }) => {
  return (
    <div className="flex bg-[#0f172a] p-1 rounded-xl border border-gray-700 w-fit">
      <button
        onClick={() => onModeChange('flash')}
        disabled={disabled}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-300 ${
          currentMode === 'flash' 
            ? 'bg-emerald-500/20 text-emerald-400 shadow-sm' 
            : 'text-gray-500 hover:text-gray-300'
        }`}
      >
        <Zap size={14} />
        <span>Flash (سريع)</span>
      </button>
      
      <button
        onClick={() => onModeChange('pro')}
        disabled={disabled}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-300 ${
          currentMode === 'pro' 
            ? 'bg-sky-500/20 text-sky-400 shadow-sm' 
            : 'text-gray-500 hover:text-gray-300'
        }`}
      >
        <BrainCircuit size={14} />
        <span>Pro (استدلال)</span>
      </button>
    </div>
  );
};