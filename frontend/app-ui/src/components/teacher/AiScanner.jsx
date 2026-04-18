import React, { useState } from 'react';
import { Sparkles, Upload, Loader2, Camera, X } from 'lucide-react';
import api from '../../services/api';

export const AiScanner = ({ onQuestionsExtracted }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleFileUpload = async (file) => {
    if (!file) return;

    setIsScanning(true);
    try {
      const reader = new FileReader();
      const mimeType = file.type || 'image/jpeg';
      
      reader.onloadend = async () => {
        const base64Data = reader.result;
        try {
          const res = await api.post('/api/ai/scan', { 
            image: base64Data,
            mimeType: mimeType
          });
          
          console.log("AI result:", res.data);
          let rawData = res.data;
          if (typeof rawData === 'string') {
            // Clean up potentially malformed JSON or markdown blocks
            const cleaned = rawData.replace(/```json/g, "").replace(/```/g, "").trim();
            rawData = JSON.parse(cleaned);
          }
          
          if (Array.isArray(rawData)) {
            onQuestionsExtracted(rawData);
          }
        } catch (err) {
          console.error("Scanning error:", err);
          alert("Could not process document. Ensure it's a clear image or PDF.");
        } finally {
          setIsScanning(false);
        }
      };
      reader.readAsDataURL(file);
    } catch (error) {
       console.error("File error:", error);
       setIsScanning(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="mb-10 animate-in fade-in slide-in-from-top-4 duration-500">
      <div 
        className={`relative overflow-hidden rounded-[2.5rem] border-2 border-dashed transition-all duration-300 ${
          dragActive 
            ? "border-[#026880] bg-[#026880]/5" 
            : "border-[#dbe4e9] bg-white hover:border-[#026880]/30"
        }`}
        onDragEnter={() => setDragActive(true)}
        onDragLeave={() => setDragActive(false)}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        <div className="p-10 flex flex-col items-center text-center">
          <div className="size-20 bg-[#cee7ec] rounded-full flex items-center justify-center mb-6 relative">
            <div className="absolute inset-0 bg-[#026880] rounded-full animate-ping opacity-10"></div>
            <Sparkles size={32} className="text-[#026880]" />
          </div>

          <h3 className="text-2xl font-bold font-['Be_Vietnam_Pro'] text-[#2b3437] mb-2 tracking-tight">
            Magical AI Paper Scan
          </h3>
          <p className="text-sm text-[#576065] max-w-sm mb-8 leading-relaxed">
            Upload images or <b>PDF files</b> of your physical exam papers and let our AI digitize the multiple-choice questions for you instantly.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
            <label className={`flex items-center justify-center gap-2 px-8 py-3.5 bg-[#026880] text-white rounded-2xl text-sm font-bold shadow-xl shadow-[#026880]/20 hover:scale-105 transition-all cursor-pointer ${isScanning ? 'opacity-50 pointer-events-none' : ''}`}>
               {isScanning ? <Loader2 className="animate-spin" size={20} /> : <Upload size={20} />}
               {isScanning ? "AI is analyzing..." : "Upload Photo / PDF"}
               <input 
                 type="file" 
                 className="hidden" 
                 accept="image/*,.pdf" 
                 onChange={(e) => handleFileUpload(e.target.files[0])} 
               />
            </label>
            <button className="flex items-center justify-center gap-2 px-8 py-3.5 bg-white text-[#576065] border border-[#dbe4e9] rounded-2xl text-sm font-bold hover:bg-[#f8fafc] transition-all">
              <Camera size={20} />
              Use Camera
            </button>
          </div>

          <div className="mt-8 flex items-center gap-2 text-[10px] font-bold text-[#aab3b8] uppercase tracking-[0.2em]">
             <span className="w-10 h-px bg-[#dbe4e9]"></span>
             Powered by Google Gemini Pro
             <span className="w-10 h-px bg-[#dbe4e9]"></span>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute -top-10 -right-10 size-40 bg-[#94dffb] rounded-full blur-3xl opacity-20"></div>
        <div className="absolute -bottom-10 -left-10 size-40 bg-[#cee7ec] rounded-full blur-3xl opacity-20"></div>
      </div>
    </div>
  );
};
