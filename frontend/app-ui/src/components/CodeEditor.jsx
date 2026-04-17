import React, { useState, useEffect } from "react";
import { Terminal, Copy, Check, RotateCcw, Play } from "lucide-react";

const CodeEditor = ({ 
  value, 
  onChange, 
  language = "java", 
  onRun, 
  readOnly = false,
  placeholder = "// Write your code here..." 
}) => {
  const [copied, setCopied] = useState(false);
  const [lineCount, setLineCount] = useState(1);

  useEffect(() => {
    const lines = value?.split('\n').length || 1;
    setLineCount(Math.max(lines, 15));
  }, [value]);

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col bg-[#0f172a] rounded-xl overflow-hidden shadow-2xl border border-slate-800">
      {/* Editor Header */}
      <div className="flex justify-between items-center px-4 py-2 bg-[#1e293b] border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5 mr-2">
            <div className="w-3 h-3 rounded-full bg-red-400"></div>
            <div className="w-3 h-3 rounded-full bg-amber-400"></div>
            <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
          </div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
            <Terminal size={12} /> {language}
          </span>
        </div>
        
        <div className="flex items-center gap-2">
          {!readOnly && (
            <button 
              onClick={() => onChange("")}
              className="p-1.5 text-slate-400 hover:text-white transition-colors bg-transparent border-none cursor-pointer"
              title="Reset Code"
            >
              <RotateCcw size={14} />
            </button>
          )}
          <button 
            onClick={handleCopy}
            className="p-1.5 text-slate-400 hover:text-white transition-colors bg-transparent border-none cursor-pointer"
            title="Copy Code"
          >
            {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
          </button>
          {!readOnly && onRun && (
            <button 
              onClick={onRun}
              className="ml-2 flex items-center gap-2 px-3 py-1 bg-emerald-500 hover:bg-emerald-600 text-white text-[10px] font-bold rounded shadow-lg shadow-emerald-500/20 border-none cursor-pointer transition-all"
            >
              <Play size={12} fill="currentColor" /> RUN
            </button>
          )}
        </div>
      </div>

      {/* Editor Body */}
      <div className="relative flex flex-1 min-h-[300px]">
        {/* Line Numbers */}
        <div className="w-12 bg-[#0f172a] text-slate-600 font-mono text-[11px] pt-4 flex flex-col items-center select-none border-r border-slate-800">
          {Array.from({ length: lineCount }).map((_, i) => (
            <div key={i} className="h-[21px]">{i + 1}</div>
          ))}
        </div>

        {/* Text Area */}
        <textarea
          className="flex-1 bg-transparent text-slate-300 font-mono text-sm p-4 outline-none border-none resize-none leading-[21px] custom-scrollbar selection:bg-indigo-500/30"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          spellCheck="false"
          readOnly={readOnly}
        ></textarea>
      </div>

      {/* Footer Info */}
      <div className="px-4 py-1.5 bg-[#1e293b] border-t border-slate-800 flex justify-end gap-4">
        <span className="text-[10px] text-slate-500 font-medium">UTF-8</span>
        <span className="text-[10px] text-slate-500 font-medium tracking-tighter">Line: {value?.split('\n').length || 1}</span>
      </div>
      
      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #0f172a;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #334155;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #475569;
        }
      `}} />
    </div>
  );
};

export default CodeEditor;
