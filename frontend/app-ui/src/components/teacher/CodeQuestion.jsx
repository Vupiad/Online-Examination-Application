import React from "react";
import { Plus, Trash2, Code2, FlaskConical, Lock, Cpu, MemoryStick } from "lucide-react";
import { QuestionShell } from "./QuestionShell";

const LANGS = ["Python", "JavaScript", "Java", "C++", "C#", "TypeScript", "Go"];

export const CodeQuestion = ({ index, question, onChange, onDelete }) => {
  
  const testCases = question.testCases || [];

  const addTestCase = () => {
    const newCase = { id: Date.now(), input: "", expectedOutput: "", points: 5, isHidden: false };
    onChange({ ...question, testCases: [...testCases, newCase] });
  };

  const removeTestCase = (id) => {
    onChange({ ...question, testCases: testCases.filter(c => c.id !== id) });
  };

  const updateTestCase = (id, patch) => {
    onChange({ ...question, testCases: testCases.map(c => c.id === id ? { ...c, ...patch } : c) });
  };

  return (
    <QuestionShell index={index} badge="Code" onDelete={onDelete}>
      <div className="flex flex-col gap-8">
        {/* Prompt + language */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-8">
          <Field label="Problem statement (Markdown)">
            <textarea
              value={question.content}
              onChange={(e) => onChange({ ...question, content: e.target.value })}
              placeholder={"# Sum of array\nGiven N integers, output their sum..."}
              className="w-full min-h-[180px] bg-[#e2e9ed] border-none rounded-[1.5rem] px-5 py-4 focus:ring-2 focus:ring-[#026880] focus:bg-white transition-all resize-none outline-none font-mono text-[13px]"
            />
          </Field>
          <div className="flex flex-col gap-6">
            <Field label="Language">
              <div className="relative">
                <select 
                  value={question.language || "Python"}
                  onChange={(e) => onChange({ ...question, language: e.target.value })}
                  className="w-full bg-[#cee7ec] text-[#026880] font-bold border-none rounded-xl px-10 py-3.5 appearance-none focus:ring-2 focus:ring-[#026880] transition-all outline-none"
                >
                  {LANGS.map(l => <option key={l} value={l}>{l}</option>)}
                </select>
                <Code2 className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#026880]" size={18} />
              </div>
            </Field>
            <Field label="Total Points">
              <input 
                type="number" 
                value={question.score || 20}
                onChange={(e) => onChange({ ...question, score: parseFloat(e.target.value) })}
                className="w-full bg-[#e2e9ed] border-none rounded-xl px-4 py-3.5 focus:ring-2 focus:ring-[#026880] focus:bg-white transition-all outline-none font-bold text-[#026880]" 
              />
            </Field>
          </div>
        </div>

        {/* Limits */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 rounded-[2rem] bg-[#f7fafc] border border-[#aab3b8]/20 shadow-inner">
          <Field label="Time (ms)">
            <div className="relative">
              <input type="number" defaultValue={1000} className="w-full bg-white rounded-lg px-8 py-2 text-sm border-none shadow-sm" />
              <Cpu className="absolute left-2 top-1/2 -translate-y-1/2 text-[#aab3b8]" size={14} />
            </div>
          </Field>
          <Field label="Memory (MB)">
             <div className="relative">
              <input type="number" defaultValue={256} className="w-full bg-white rounded-lg px-8 py-2 text-sm border-none shadow-sm" />
              <MemoryStick className="absolute left-2 top-1/2 -translate-y-1/2 text-[#aab3b8]" size={14} />
            </div>
          </Field>
          <Field label="Allow stdin">
             <div className="flex items-center h-9"><input type="checkbox" defaultChecked className="w-5 h-5 accent-[#026880]" /></div>
          </Field>
          <Field label="Auto grade">
             <div className="flex items-center h-9"><input type="checkbox" defaultChecked className="w-5 h-5 accent-[#026880]" /></div>
          </Field>
        </div>

        {/* Code blocks */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <CodeBlock 
            label="Starter code (Student sees)" 
            value={question.starterCode || ""} 
            onChange={(v) => onChange({ ...question, starterCode: v })}
            placeholder={"def solve():\n    # your code"}
          />
          <CodeBlock 
            label="Solution code (Private)" 
            value={question.solutionCode || ""} 
            onChange={(v) => onChange({ ...question, solutionCode: v })}
            placeholder={"print(sum(map(int, input().split())))"} 
            locked 
          />
        </div>

        {/* Test cases */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between pb-2 border-b border-[#dbe4e9]">
            <div className="flex items-center gap-2">
              <FlaskConical className="text-[#026880]" size={20} />
              <span className="text-xs font-bold text-[#737c80] uppercase tracking-widest">Test cases ({testCases.length})</span>
            </div>
            <button 
                onClick={addTestCase} 
                className="flex items-center gap-2 px-4 py-2 bg-[#cee7ec] text-[#026880] rounded-full text-xs font-bold hover:bg-[#b8dae6] transition-all"
            >
              <Plus size={14} /> Add case
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {testCases.map((tc, idx) => (
              <div key={tc.id} className="rounded-[1.5rem] bg-[#f7fafc] border border-[#aab3b8]/10 p-5 shadow-sm group">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold text-[#026880]">Case #{idx + 1}</span>
                  <div className="flex items-center gap-4">
                    <label className="flex items-center gap-2 text-[10px] font-bold text-[#737c80] uppercase">
                      <Lock size={12} /> Hidden
                      <input 
                        type="checkbox" 
                        checked={tc.isHidden} 
                        onChange={(e) => updateTestCase(tc.id, { isHidden: e.target.checked })}
                        className="w-4 h-4 accent-[#026880]" 
                      />
                    </label>
                    <div className="flex items-center gap-2">
                        <input 
                            type="number" 
                            value={tc.points} 
                            onChange={(e) => updateTestCase(tc.id, { points: parseInt(e.target.value) })}
                            className="w-16 bg-white rounded-lg px-2 py-1 text-xs text-center border-none shadow-sm"
                        />
                        <span className="text-[10px] font-bold text-[#aab3b8]">PTS</span>
                    </div>
                    <button 
                        onClick={() => removeTestCase(tc.id)} 
                        className="p-1.5 text-[#aab3b8] hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <textarea
                    value={tc.input}
                    onChange={(e) => updateTestCase(tc.id, { input: e.target.value })}
                    placeholder="Input data"
                    className="min-h-[80px] bg-white border-none rounded-xl px-4 py-3 text-xs font-mono shadow-sm outline-none resize-none focus:ring-1 focus:ring-[#026880]"
                  />
                  <textarea
                    value={tc.expectedOutput}
                    onChange={(e) => updateTestCase(tc.id, { expectedOutput: e.target.value })}
                    placeholder="Expected output"
                    className="min-h-[80px] bg-white border-none rounded-xl px-4 py-3 text-xs font-mono shadow-sm outline-none resize-none focus:ring-1 focus:ring-[#026880]"
                  />
                </div>
              </div>
            ))}
          </div>
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

const CodeBlock = ({ label, value, onChange, locked, placeholder }) => (
  <div className="flex flex-col gap-3">
    <div className="flex items-center justify-between ml-1">
      <span className="text-xs font-bold text-[#737c80] uppercase tracking-widest">{label}</span>
      {locked && (
        <span className="text-[10px] uppercase font-bold text-[#e67e22] flex items-center gap-1">
            <Lock size={10} /> Private
        </span>
      )}
    </div>
    <div className="rounded-[1.5rem] bg-[#1e293b] overflow-hidden shadow-xl border border-white/5">
      <div className="flex items-center gap-1.5 px-4 py-3 border-b border-white/5 bg-white/5">
        <span className="size-2 rounded-full bg-red-400/80" />
        <span className="size-2 rounded-full bg-yellow-400/80" />
        <span className="size-2 rounded-full bg-green-400/80" />
        <span className="ml-3 text-[10px] font-mono text-slate-400">code_editor.py</span>
      </div>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        spellCheck={false}
        placeholder={placeholder}
        className="w-full min-h-[220px] bg-transparent border-0 px-6 py-5 focus:ring-0 resize-none font-mono text-[13px] text-slate-100 placeholder:text-slate-600 outline-none leading-relaxed"
      />
    </div>
  </div>
);
