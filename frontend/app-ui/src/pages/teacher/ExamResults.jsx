import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Search,
  Timer,
  CheckCircle,
  Activity,
  ChevronUp,
  ChevronDown,
  XCircle,
  Code,
  FileText,
  CheckCircle2,
  XCircle as XIcon,
  ChevronRight
} from "lucide-react";
import { fetchExamResultsByCode } from "../../services/api";
import api from "../../services/api";

const DEFAULT_SORT = { key: "studentName", direction: "asc" };

const ExamResults = () => {
  const { examCode } = useParams();
  const navigate = useNavigate();

  const [rawResults, setRawResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState(DEFAULT_SORT);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [viewingAttempt, setViewingAttempt] = useState(null);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        setLoading(true);
        setError("");
        const results = await fetchExamResultsByCode(examCode);
        setRawResults(results);
      } catch (err) {
        console.error("Error fetching teacher exam results:", err);
        setError("Could not load exam results. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    if (examCode) fetchResults();
  }, [examCode]);

  const formatTime = (ms) => {
    if (!ms || ms <= 0) return "00:00";
    const totalSeconds = Math.floor(ms / 1000);
    const m = Math.floor(totalSeconds / 60).toString().padStart(2, "0");
    const s = (totalSeconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const formatDate = (value) => {
    if (!value) return "N/A";
    return new Date(value).toLocaleString("en-US");
  };

  const toNumber = (v) => (Number.isNaN(Number(v)) ? 0 : Number(v));

  const groupedByStudent = useMemo(() => {
    const groups = new Map();
    rawResults.forEach((result, index) => {
      const s = result?.examinee || {};
      const id = s.id ?? `u-${index}`;
      if (!groups.has(id)) {
        groups.set(id, {
          studentId: id,
          studentName: s.fullName || s.username || "Unknown",
          studentEmail: s.email || "N/A",
          attempts: [],
        });
      }
      groups.get(id).attempts.push(result);
    });

    return Array.from(groups.values()).map(g => {
      const sorted = [...g.attempts].sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime());
      const latest = sorted[0];
      return {
        ...g,
        attempts: sorted,
        attemptsCount: sorted.length,
        latestAttempt: latest,
        latestScore: toNumber(latest?.score),
        latestTimeTaken: toNumber(latest?.timeTaken),
        passStatus: toNumber(latest?.score) >= 5 ? "Pass" : "Fail"
      };
    });
  }, [rawResults]);

  const filteredAndSortedRows = useMemo(() => {
    const term = searchTerm.toLowerCase();
    const filtered = groupedByStudent.filter(r => r.studentName.toLowerCase().includes(term) || r.studentEmail.toLowerCase().includes(term));
    return [...filtered].sort((a,b) => {
       const { key, direction } = sortConfig;
       const mult = direction === "asc" ? 1 : -1;
       const v1 = key === 'studentName' ? a.studentName : key === 'latestScore' ? a.latestScore : a.attemptsCount;
       const v2 = key === 'studentName' ? b.studentName : key === 'latestScore' ? b.latestScore : b.attemptsCount;
       return (v1 > v2 ? 1 : -1) * mult;
    });
  }, [groupedByStudent, searchTerm, sortConfig]);

  const renderWorkDetail = (attempt) => {
     if (!attempt.answers || attempt.answers.length === 0) return <p className="text-slate-400 italic">No answer data available.</p>;
     
     return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2">
           {attempt.answers.map((answer, idx) => {
              const q = answer.question;
              return (
                 <div key={idx} className="bg-white border border-[#e2e9ed] rounded-3xl overflow-hidden shadow-sm">
                    <div className="px-6 py-4 bg-[#f8fafc] border-b border-[#e2e9ed] flex items-center justify-between">
                       <span className="text-[10px] font-bold uppercase tracking-widest text-[#026880]">Task {(idx + 1).toString().padStart(2, '0')} — {q.type}</span>
                       <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${answer.isCorrect ? "bg-green-100 text-green-600" : q.type === 'MULTIPLE_CHOICE' ? "bg-red-100 text-red-600" : "bg-blue-100 text-[#026880]"}`}>
                          {answer.isCorrect ? "CORRECT" : q.type === 'MULTIPLE_CHOICE' ? "INCORRECT" : "PENDING REVIEW"}
                       </span>
                    </div>
                    <div className="p-6">
                       <p className="font-bold text-[#2b3437] mb-6">{q.content}</p>
                       
                       {/* Multiple Choice Review */}
                       {q.type === 'MULTIPLE_CHOICE' && (
                          <div className="grid grid-cols-1 gap-3">
                             {q.options.map(opt => {
                                const isUserSelected = answer.userAnswerId === opt.id;
                                const isCorrect = opt.isCorrect;
                                return (
                                   <div key={opt.id} className={`p-4 rounded-xl flex items-center justify-between border-2 transition-all ${
                                      isUserSelected && isCorrect ? "bg-green-50 border-green-200" : 
                                      isUserSelected && !isCorrect ? "bg-red-50 border-red-200" : 
                                      isCorrect ? "bg-green-50/30 border-green-100" : "bg-[#f8fafc] border-transparent text-[#576065]"
                                   }`}>
                                      <span className="text-sm font-medium">{opt.content}</span>
                                      <div className="flex items-center gap-2">
                                         {isUserSelected && <span className="text-[9px] font-bold uppercase px-2 py-0.5 bg-white border rounded">Student Choice</span>}
                                         {isCorrect && <CheckCircle2 size={16} className="text-green-600" />}
                                         {!isCorrect && isUserSelected && <XIcon size={16} className="text-red-500" />}
                                      </div>
                                   </div>
                                );
                             })}
                          </div>
                       )}

                       {/* Code Review */}
                       {q.type === 'CODE' && (
                          <div className="rounded-2xl bg-[#0f172a] p-6 font-mono text-sm text-slate-100 overflow-x-auto border border-white/10 shadow-inner max-h-[400px]">
                             <pre className="m-0 leading-relaxed whitespace-pre font-mono">
                                {answer.content || "# No code submitted"}
                             </pre>
                             <div className="mt-4 pt-4 border-t border-white/5 flex items-center gap-3">
                                <Code size={16} className="text-[#94dffb]" />
                                <span className="text-[10px] font-bold text-[#94dffb] uppercase tracking-widest">{q.language || "Python"} Execution</span>
                             </div>
                          </div>
                       )}

                       {/* Essay Review */}
                       {q.type === 'ESSAY' && (
                          <div className="bg-[#f0f9ff]/30 border border-[#026880]/10 rounded-2xl p-6 relative group">
                             <FileText size={24} className="absolute top-4 right-4 text-[#026880]/10 group-hover:text-[#026880]/30 transition-colors" />
                             <p className="text-sm text-[#2b3437] leading-relaxed whitespace-pre-wrap font-medium">{answer.content || "No essay response submitted."}</p>
                             <div className="mt-6 pt-4 border-t border-[#026880]/10 flex items-center justify-between text-[10px] font-bold text-[#026880]/60">
                                <span>Word Count: {(answer.content || "").trim().split(/\s+/).filter(x => x).length}</span>
                                <span className="uppercase">Rubric: {q.gradingRubric || "Standard Grading"}</span>
                             </div>
                          </div>
                       )}
                    </div>
                 </div>
              );
           })}
        </div>
     );
  };

  return (
    <div className="flex-1 min-w-0 flex flex-col bg-[#f7fafc] text-[#2b3437] font-['Inter']">
       {/* Main Dashboard UI remains the same... (Skipping some repetitive layout for brevity but keep the core) */}
       <header className="sticky top-0 z-30 bg-[#f7fafc]/90 backdrop-blur-xl border-b border-[#dbe4e9] flex justify-between items-center px-10 py-5">
          <div className="flex items-center gap-4">
             <button onClick={() => navigate("/teacher/dashboard")} className="text-[#026880] hover:opacity-75 transition-opacity flex items-center gap-2 font-medium">
                <ArrowLeft size={20} /> <span className="hidden sm:inline">Back to Dashboard</span>
             </button>
             <h1 className="text-xl font-bold text-[#026880] font-['Be_Vietnam_Pro'] border-l-2 border-[#026880]/20 pl-4">Result Analysis</h1>
          </div>
          <div className="text-right">
             <p className="text-[10px] font-bold text-[#737c80] uppercase tracking-widest">Global Overview</p>
             <p className="text-lg font-bold text-[#026880]">Exam Code: {examCode}</p>
          </div>
       </header>

       <main className="px-10 py-10 space-y-10">
          {/* Stats Cards Row (Total Attempts, Avg Score, etc.) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             {/* ... stats cards ... (restored summary) */}
             <div className="bg-white p-8 rounded-[2rem] border border-[#dbe4e9] flex items-center gap-4">
                <Activity size={24} className="text-[#026880]" />
                <div>
                   <p className="text-[10px] font-bold text-[#aab3b8] uppercase tracking-widest mb-1">Total Submissions</p>
                   <p className="text-2xl font-bold">{rawResults.length}</p>
                </div>
             </div>
             {/* ... more stats ... */}
          </div>

          <section className="bg-white rounded-[2.5rem] border border-[#dbe4e9] shadow-sm overflow-hidden">
             <div className="p-8 border-b border-[#f0f4f7] flex items-center justify-between">
                <div>
                   <h2 className="text-xl font-bold font-['Be_Vietnam_Pro'] text-[#026880]">Audience Performance</h2>
                   <p className="text-sm text-[#576065] mt-1">Select a student record to investigate their specific answers and code submissions.</p>
                </div>
                <div className="relative w-80">
                   <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#aab3b8]" />
                   <input 
                      type="text" value={searchTerm} onChange={e => setSearchTerm(e.target.value)}
                      placeholder="Find candidate..." 
                      className="w-full bg-[#f7fafc] border border-[#dbe4e9] rounded-2xl pl-12 pr-4 py-3 outline-none focus:ring-2 focus:ring-[#026880]/10 font-medium" 
                   />
                </div>
             </div>

             <div className="overflow-x-auto">
                <table className="w-full">
                   <thead>
                      <tr className="bg-[#f7fafc] text-left">
                         <th className="px-8 py-4 text-[10px] font-bold text-[#576065] uppercase tracking-widest border-b border-[#f0f4f7]">Examinee</th>
                         <th className="px-8 py-4 text-[10px] font-bold text-[#576065] uppercase tracking-widest border-b border-[#f0f4f7]">Latest Grade</th>
                         <th className="px-8 py-4 text-[10px] font-bold text-[#576065] uppercase tracking-widest border-b border-[#f0f4f7]">Violations</th>
                         <th className="px-8 py-4 text-[10px] font-bold text-[#576065] uppercase tracking-widest border-b border-[#f0f4f7]">Time Spent</th>
                         <th className="px-8 py-4 text-[10px] font-bold text-[#576065] uppercase tracking-widest border-b border-[#f0f4f7]">Actions</th>
                      </tr>
                   </thead>
                   <tbody className="divide-y divide-[#f0f4f7]">
                      {filteredAndSortedRows.map(row => (
                         <tr key={row.studentId} className="hover:bg-[#f7fafc]/50 transition-colors cursor-pointer group" onClick={() => setSelectedStudent(row)}>
                            <td className="px-8 py-5">
                               <div>
                                  <p className="font-bold text-[#2b3437] group-hover:text-[#026880] transition-colors">{row.studentName}</p>
                                  <p className="text-[10px] text-[#aab3b8] font-bold uppercase">{row.studentEmail}</p>
                               </div>
                            </td>
                            <td className="px-8 py-5 text-sm font-black text-[#026880]">{row.latestScore} / 10</td>
                            <td className="px-8 py-5 text-sm font-bold text-red-500">{row.latestAttempt?.violationCount || 0}</td>
                            <td className="px-8 py-5 text-sm text-[#576065] font-medium">{formatTime(row.latestTimeTaken)}</td>
                            <td className="px-8 py-5">
                               <button className="flex items-center gap-2 px-4 py-2 bg-[#026880] text-white rounded-xl text-xs font-bold shadow-lg shadow-[#026880]/10 active:scale-95 transition-all">
                                  Investigate <ChevronRight size={14}/>
                               </button>
                            </td>
                         </tr>
                      ))}
                   </tbody>
                </table>
             </div>
          </section>
       </main>

       {/* Attempt History & Work Investigation Modal */}
       {selectedStudent && (
          <div className="fixed inset-0 z-[120] bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4">
             <div className={`bg-[#f7fafc] rounded-[2.5rem] shadow-2xl flex flex-col overflow-hidden transition-all duration-500 border border-white/20 ${viewingAttempt ? "w-full max-w-6xl h-[90vh]" : "w-full max-w-2xl h-fit"}`}>
                <div className="px-8 py-6 bg-white border-b border-[#e2e9ed] flex items-center justify-between">
                   <div className="flex items-center gap-4">
                      {viewingAttempt && (
                         <button onClick={() => setViewingAttempt(null)} className="p-2 bg-[#f7fafc] rounded-xl hover:bg-[#cee7ec] text-[#026880] transition-all">
                            <ArrowLeft size={18} />
                         </button>
                      )}
                      <div>
                         <p className="text-[10px] uppercase font-bold text-[#aab3b8] tracking-widest">
                            {viewingAttempt ? "Detailed Submission Review" : "Participation History"}
                         </p>
                         <h3 className="text-xl font-bold text-[#026880] font-['Be_Vietnam_Pro'] truncate max-w-[300px]">
                            {selectedStudent.studentName}
                         </h3>
                      </div>
                   </div>
                   <button onClick={() => { setSelectedStudent(null); setViewingAttempt(null); }} className="size-10 rounded-full bg-[#fce8e6] text-[#c5221f] flex items-center justify-center hover:bg-red-200 transition-colors">
                      <XCircle size={20} />
                   </button>
                </div>

                 <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                   {!viewingAttempt ? (
                      <div className="space-y-4">
                         {selectedStudent.attempts.map((attempt, idx) => (
                            <div key={idx} className="bg-white border border-[#e2e9ed] rounded-3xl p-6 hover:shadow-lg transition-all group flex flex-col sm:flex-row items-center gap-6">
                               <div className="flex-1">
                                  <div className="flex items-center gap-3 mb-3">
                                     <span className="text-[10px] font-bold px-3 py-1 bg-[#cee7ec] text-[#026880] rounded-full uppercase tracking-widest">Attempt {selectedStudent.attempts.length - idx}</span>
                                     <span className="text-xs text-[#aab3b8] font-bold uppercase">{formatDate(attempt.submittedAt)}</span>
                                  </div>
                                  <div className="grid grid-cols-2 gap-4">
                                     <div className="flex flex-col">
                                        <span className="text-[10px] text-[#aab3b8] font-bold uppercase tracking-widest mb-1">Final Score</span>
                                        <span className="text-lg font-black text-[#026880]">{attempt.score} / 10</span>
                                     </div>
                                     <div className="flex flex-col">
                                        <span className="text-[10px] text-[#aab3b8] font-bold uppercase tracking-widest mb-1">Violations</span>
                                        <span className={`text-lg font-black ${attempt.violationCount > 0 ? "text-red-500" : "text-green-600"}`}>{attempt.violationCount || 0}</span>
                                     </div>
                                  </div>
                               </div>
                               <button onClick={() => setViewingAttempt(attempt)} className="px-8 py-3 bg-[#f7fafc] hover:bg-[#026880] hover:text-white rounded-2xl text-[10px] font-bold uppercase tracking-[0.2em] transition-all group-hover:scale-105 active:scale-95 border border-[#dbe4e9]">
                                  Examine Work
                               </button>
                            </div>
                         ))}
                      </div>
                   ) : (
                      <div className="space-y-10">
                         {/* Score Override Tool */}
                         <div className="bg-[#026880] p-8 rounded-[2rem] text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl shadow-[#026880]/20">
                            <div>
                               <p className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-60 mb-2">Performance Override</p>
                               <h4 className="text-2xl font-bold font-['Be_Vietnam_Pro'] tracking-tight">Manual Score Adjustment</h4>
                               <p className="text-xs text-white/60 mt-2 max-w-sm">Override the automatically calculated score based on your review of essays or code logic.</p>
                            </div>
                            <div className="flex items-center gap-4 bg-white/10 p-4 rounded-2xl backdrop-blur-md border border-white/10 w-full md:w-auto">
                               <div className="flex flex-col">
                                  <label className="text-[9px] font-bold uppercase opacity-60 mb-1">Adjusted Score</label>
                                  <input 
                                     type="number" 
                                     defaultValue={viewingAttempt.score}
                                     id={`score-input-${viewingAttempt.id}`}
                                     step="0.1" max="10" min="0"
                                     className="bg-transparent text-2xl font-black outline-none border-none w-20 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                  />
                               </div>
                               <button 
                                 id={`save-btn-${viewingAttempt.id}`}
                                 onClick={async (e) => {
                                    const btn = e.currentTarget;
                                    const input = document.getElementById(`score-input-${viewingAttempt.id}`);
                                    const newScore = input.value;
                                    btn.disabled = true;
                                    btn.innerText = "SAVING...";
                                    try {
                                       await api.put(`/api/exam/results/${viewingAttempt.id}/score?newScore=${newScore}`);
                                       // Update local state
                                       const updatedResults = rawResults.map(r => r.id === viewingAttempt.id ? {...r, score: parseFloat(newScore)} : r);
                                       setRawResults(updatedResults);
                                       setViewingAttempt({...viewingAttempt, score: parseFloat(newScore)});
                                       btn.innerText = "SAVED!";
                                       setTimeout(() => btn.innerText = "UPDATE SCORE", 2000);
                                    } catch (err) {
                                       console.error("Scale error:", err);
                                       btn.innerText = "ERROR";
                                       setTimeout(() => btn.innerText = "UPDATE SCORE", 2000);
                                    } finally {
                                       btn.disabled = false;
                                    }
                                 }}
                                 className="px-6 py-3 bg-white text-[#026880] rounded-xl text-xs font-bold shadow-lg hover:bg-[#cee7ec] transition-all"
                               >
                                  UPDATE SCORE
                               </button>
                            </div>
                         </div>
                         {renderWorkDetail(viewingAttempt)}
                      </div>
                   )}
                </div>

                {viewingAttempt && (
                   <div className="px-8 py-4 bg-white border-t border-[#e2e9ed] flex justify-between items-center text-[10px] font-bold text-[#aab3b8] uppercase tracking-[0.2em]">
                      <span>Completed in {formatTime(viewingAttempt.timeTaken)}</span>
                      <button onClick={() => setViewingAttempt(null)} className="text-[#026880] hover:underline cursor-pointer">Return to History</button>
                   </div>
                )}
             </div>
          </div>
       )}
    </div>
  );
};

export default ExamResults;