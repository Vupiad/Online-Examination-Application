import React from "react";
import { ListChecks, FileText, Code2 } from "lucide-react";

export const QuestionTypeSelector = ({ currentType, onTypeChange, counts }) => {
  const types = [
    { id: "MULTIPLE_CHOICE", label: "Multiple Choice", icon: ListChecks, count: counts.MULTIPLE_CHOICE || 0 },
    { id: "ESSAY", label: "Essay", icon: FileText, count: counts.ESSAY || 0 },
    { id: "CODE", label: "Code", icon: Code2, count: counts.CODE || 0 },
  ];

  return (
    <div className="bg-white rounded-[2rem] p-1.5 shadow-sm border border-[#aab3b8]/10 flex items-center max-w-fit mx-auto mb-8 bg-opacity-80 backdrop-blur-md">
      {types.map((type) => {
        const Icon = type.icon;
        const isActive = currentType === type.id;
        
        return (
          <button
            key={type.id}
            onClick={() => onTypeChange(type.id)}
            className={`
              flex items-center gap-3 px-6 py-3 rounded-[1.5rem] transition-all duration-300 group
              ${isActive 
                ? "bg-[#026880] text-white shadow-lg shadow-[#026880]/20 scale-105 z-10" 
                : "text-[#737c80] hover:text-[#2b3437] hover:bg-[#f7fafc]"}
            `}
          >
            <Icon size={18} className={isActive ? "text-white" : "text-[#aab3b8] group-hover:text-[#026880]"} />
            <span className="font-bold text-sm font-['Be_Vietnam_Pro']">{type.label}</span>
            {type.count > 0 && (
                <span className={`
                    ml-1 px-2 py-0.5 rounded-full text-[10px] font-bold
                    ${isActive ? "bg-white/20 text-white" : "bg-[#e2e9ed] text-[#737c80]"}
                `}>
                    {type.count}
                </span>
            )}
          </button>
        );
      })}
    </div>
  );
};
