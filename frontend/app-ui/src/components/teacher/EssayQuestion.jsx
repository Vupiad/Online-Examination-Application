import React from "react";
import { Bold, Italic, List, ListOrdered, Quote, Heading2, Image as ImageIcon } from "lucide-react";
import { QuestionShell } from "./QuestionShell";

const tools = [
  { icon: Heading2, label: "H2" },
  { icon: Bold, label: "Bold" },
  { icon: Italic, label: "Italic" },
  { icon: List, label: "List" },
  { icon: ListOrdered, label: "Ordered List" },
  { icon: Quote, label: "Quote" },
  { icon: ImageIcon, label: "Image" }
];

export const EssayQuestion = ({ index, question, onChange, onDelete }) => {
  return (
    <QuestionShell index={index} badge="Essay" onDelete={onDelete}>
      <div className="flex flex-col gap-6">
        {/* Editor Toolbar Simulator */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold text-[#737c80] uppercase tracking-wider ml-1">
            Essay Prompt
          </label>
          <div className="rounded-2xl bg-[#e2e9ed] overflow-hidden border border-transparent focus-within:border-[#026880] focus-within:bg-white transition-all">
            <div className="flex items-center gap-1 px-3 py-2 border-b border-[#aab3b8]/20 bg-[#f7fafc]">
              {tools.map((tool, i) => (
                <button 
                  key={i} 
                  className="size-9 grid place-items-center rounded-lg text-[#737c80] hover:bg-[#cee7ec] hover:text-[#026880] transition-colors"
                  title={tool.label}
                >
                  <tool.icon size={16} />
                </button>
              ))}
              <span className="ml-auto text-[10px] font-bold text-[#aab3b8] uppercase tracking-widest pr-2">Rich text</span>
            </div>
            <textarea
              value={question.content}
              onChange={(e) => onChange({ ...question, content: e.target.value })}
              placeholder="Write the essay prompt. You can guide students with context, sources, or constraints…"
              className="w-full min-h-[160px] bg-transparent border-0 px-5 py-4 focus:ring-0 resize-none font-['Inter'] leading-relaxed outline-none"
            />
          </div>
        </div>

        {/* Word limits & Score */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Field label="Min words">
            <input 
              type="number" 
              value={question.minWords || 150}
              onChange={(e) => onChange({ ...question, minWords: parseInt(e.target.value) })}
              className="w-full bg-[#e2e9ed] border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#026880] focus:bg-white transition-all outline-none font-bold text-[#026880]" 
            />
          </Field>
          <Field label="Max words">
            <input 
              type="number" 
              value={question.maxWords || 800}
              onChange={(e) => onChange({ ...question, maxWords: parseInt(e.target.value) })}
              className="w-full bg-[#e2e9ed] border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#026880] focus:bg-white transition-all outline-none font-bold text-[#026880]" 
            />
          </Field>
          <Field label="Score Points">
            <input 
              type="number" 
              value={question.score || 10}
              onChange={(e) => onChange({ ...question, score: parseFloat(e.target.value) })}
              className="w-full bg-[#e2e9ed] border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#026880] focus:bg-white transition-all outline-none font-bold text-[#026880]" 
            />
          </Field>
        </div>

        {/* Rubrics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Field label="Sample Answer (Private)">
            <textarea 
              value={question.sampleAnswer || ""}
              onChange={(e) => onChange({ ...question, sampleAnswer: e.target.value })}
              placeholder="A model answer used as reference when grading…" 
              className="w-full min-h-[140px] bg-[#e2e9ed] border-none rounded-[1.5rem] px-5 py-4 focus:ring-2 focus:ring-[#026880] focus:bg-white transition-all resize-none outline-none font-['Inter']" 
            />
          </Field>
          <Field label="Grading Rubric">
            <textarea 
              value={question.gradingRubric || ""}
              onChange={(e) => onChange({ ...question, gradingRubric: e.target.value })}
              placeholder={"e.g.\n• Thesis & argument — 4 pts\n• Evidence & reasoning — 3 pts\n• Style & grammar — 3 pts"} 
              className="w-full min-h-[140px] bg-[#e2e9ed] border-none rounded-[1.5rem] px-5 py-4 focus:ring-2 focus:ring-[#026880] focus:bg-white transition-all resize-none outline-none font-mono text-sm leading-relaxed" 
            />
          </Field>
        </div>
      </div>
    </QuestionShell>
  );
};

const Field = ({ label, children }) => (
  <div className="flex flex-col gap-2">
    <label className="text-xs font-bold text-[#737c80] uppercase tracking-wider ml-1">{label}</label>
    {children}
  </div>
);
