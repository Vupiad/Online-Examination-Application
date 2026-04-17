import React from "react";
import { Copy, Trash2 } from "lucide-react";

export const QuestionShell = ({ index, badge, children, onDuplicate, onDelete }) => {
  return (
    <article className="relative rounded-[2.5rem] bg-white shadow-sm border border-[#aab3b8]/10 overflow-hidden mb-8">
      {/* Cột màu highlight bên trái */}
      <span className="absolute left-0 top-8 bottom-8 w-1.5 rounded-full bg-[#026880]" />
      
      <div className="p-8 md:p-10 pl-12">
        <div className="flex items-start justify-between gap-4 mb-6">
          <div className="flex items-center gap-4">
            <span className="text-3xl font-light text-[#026880]/40 font-['Be_Vietnam_Pro'] tabular-nums">
              {String(index).padStart(2, "0")}
            </span>
            {badge && (
              <span className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-[#cee7ec] text-[#026880]">
                {badge}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={onDelete} 
              className="p-2.5 rounded-xl text-[#737c80] hover:text-red-500 hover:bg-red-50 transition-all"
              title="Delete Question"
            >
              <Trash2 size={20} />
            </button>
            <button 
              onClick={onDuplicate} 
              className="p-2.5 rounded-xl text-[#737c80] hover:text-[#026880] hover:bg-[#026880]/5 transition-all"
              title="Duplicate Question"
            >
              <Copy size={20} />
            </button>
          </div>
        </div>
        {children}
      </div>
    </article>
  );
};
