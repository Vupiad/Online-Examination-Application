import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Bell,
  User,
  Timer,
  CheckCircle,
  Activity,
  XCircle,
  Download,
  ChevronUp,
  Check,
  X,
} from "lucide-react";
import api from "../../services/api";

const ResultDetail = () => {
  const { testCode } = useParams();
  const navigate = useNavigate();

  const [resultData, setResultData] = useState(null); 
  const [correctAnswersData, setCorrectAnswersData] = useState([]); 
  const [classResults, setClassResults] = useState([]); // All student results for this exam
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  // Re-saving to clear Vite HMR Dev Server Cache

  // Fetch test result data
  useEffect(() => {
    const fetchResultAndQuestions = async () => {
      try {
        setLoading(true);
        const currentUser = JSON.parse(localStorage.getItem("user"));
        const userId = currentUser?.id || 1;

        // 1. Get student's submission results
        const resultResponse = await api.get(`/api/exam/results`, {
          params: { examCode: testCode, userId: userId },
        });

        // Get the latest attempt
        const latestResult =
          resultResponse.data[resultResponse.data.length - 1];

        if (!latestResult) {
          setError("No test results found for this exam attempt.");
          return;
        }
        setResultData(latestResult);

        // 2. Get original questions + correct answers
        const correctAnswersResponse = await api.post(
          `/api/exam/correct-answers`,
          {
            examCode: testCode,
            requestUserId: userId,
          },
        );

        setCorrectAnswersData(correctAnswersResponse.data);

        // 3. Get all class results for leaderboard
        const allResultsResponse = await api.get(`/api/exam/results`, {
            params: { examCode: testCode }
        });
        // Sort by score descending
        const sorted = (allResultsResponse.data || []).sort((a, b) => b.score - a.score);
        setClassResults(sorted);
      } catch (err) {
        console.error("Error loading results:", err);
        setError("Could not load results. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (testCode) {
      fetchResultAndQuestions();
    }
  }, [testCode]);

  // Grading Rank helper
  const getGradeRank = (score) => {
    if (score >= 8.5)
      return { label: "EXCELLENT", color: "bg-[#cee7ec] text-[#005063]" };
    if (score >= 7.0)
      return { label: "GOOD", color: "bg-[#dbe4e9] text-[#2c4347]" };
    if (score >= 5.0)
      return { label: "AVERAGE", color: "bg-gray-200 text-gray-700" };
    return { label: "NEEDS WORK", color: "bg-[#fa746f] text-white" };
  };

  // --- LOADING & ERROR STATES ---
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f7fafc]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#026880]"></div>
      </div>
    );
  }

  if (error || !resultData) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#f7fafc] p-6">
        <XCircle className="text-red-500 w-16 h-16 mb-4" />
        <h2 className="text-xl font-bold text-gray-800 mb-2">Oops!</h2>
        <p className="text-gray-600 mb-6">{error}</p>
        <button
          onClick={() => navigate("/dashboard")}
          className="px-6 py-2 bg-[#026880] text-white rounded-lg font-medium"
        >
          Back to Dashboard
        </button>
      </div>
    );
  }

  const rank = getGradeRank(resultData.score);

  const formatTime = (ms) => {
    if (!ms) return "N/A";
    const totalSeconds = Math.floor(ms / 1000);
    const m = Math.floor(totalSeconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (totalSeconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const timeSpent = formatTime(resultData.timeTaken) || "Completed";

  const totalQuestions = correctAnswersData.length || 0;
  const correctCount =
    totalQuestions > 0
      ? Math.round((resultData.score / 10) * totalQuestions)
      : 0;
  const accuracy =
    totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;

  // Render detailed question view
  const renderQuestionDetail = (question, index) => {
    const userAnswersForQ = resultData.answers?.filter(
      (a) => a.questionId === question.id,
    ) || [];
    const selectedOptionIds = userAnswersForQ.map(a => a.selectedOptionId).filter(Boolean);

    const correctOptionIds = question.correctOptionIds || [];

    const isUserCorrect = question.type === "MULTIPLE_CHOICE"
      ? (correctOptionIds.length > 0 && correctOptionIds.length === selectedOptionIds.length && correctOptionIds.every(id => selectedOptionIds.includes(id)))
      : userAnswersForQ.length > 0; // For now, if student answered essay/code, we show it

    const numberColorClass = isUserCorrect
      ? "text-[#34a853]/50"
      : "text-[#d93025]/50";

    return (
      <article
        key={question.id}
        className="relative group"
        id={`question-${index + 1}`}
      >
        <div className="flex gap-4 md:gap-8 flex-col md:flex-row">
          <div className="flex-none md:pt-2">
            <span
              className={`${numberColorClass} font-black text-4xl block leading-none font-['Be_Vietnam_Pro']`}
            >
              {(index + 1).toString().padStart(2, "0")}
            </span>
          </div>

          <div className="flex-grow">
            <div className="bg-white md:rounded-[2rem] rounded-xl p-6 md:p-10 border border-[#e2e9ed] shadow-sm">
              <h3 className="text-lg md:text-xl text-[#2b3437] mb-8 font-medium leading-relaxed">
                {question.content}
              </h3>

              <div className="grid grid-cols-1 gap-4">
                {question.type === "MULTIPLE_CHOICE" ? (question.options || []).map((opt, optIndex) => {
                  const isThisSelected = selectedOptionIds.includes(opt.id);
                  const isThisCorrect = correctOptionIds.includes(opt.id);

                  // Define option styles
                   let optionClass = "bg-[#f8fafc] border-transparent";
                  let checkIcon = null;

                  if (isThisCorrect && isThisSelected) {
                    optionClass = "bg-[#f1fcf4] border-[#34a853]/30 border";
                    checkIcon = (
                      <div className="flex items-center gap-2 text-[#137333] font-bold text-xs uppercase tracking-widest">
                        <CheckCircle size={18} className="fill-current" />
                        CORRECT
                      </div>
                    );
                  } else if (isThisSelected && !isThisCorrect) {
                    optionClass = "bg-[#fff1f0] border-[#d93025]/30 border";
                    checkIcon = (
                      <div className="flex items-center gap-2 text-[#c5221f] font-bold text-xs uppercase tracking-widest">
                        <XCircle size={18} className="fill-current" />
                        YOUR CHOICE
                      </div>
                    );
                  } else if (isThisCorrect && !isThisSelected) {
                    optionClass = "bg-[#f1fcf4] border-[#34a853]/30 border";
                    checkIcon = (
                      <div className="flex items-center gap-2 text-[#137333] font-bold text-xs uppercase tracking-widest">
                        CORRECT ANSWER
                      </div>
                    );
                  }

                  const labelLetter = String.fromCharCode(65 + optIndex);

                  let badgeClass = "bg-[#e2e8f0] text-[#64748b]";
                  if (isThisCorrect && isThisSelected)
                    badgeClass = "bg-[#34a853] text-white";
                  else if (isThisSelected && !isThisCorrect)
                    badgeClass = "bg-[#d93025] text-white";
                  else if (isThisCorrect && !isThisSelected)
                    badgeClass = "bg-[#34a853] text-white";

                  return (
                    <div
                      key={opt.id}
                      className={`p-4 md:p-5 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-3 transition-all ${optionClass}`}
                    >
                      <div className="flex items-center gap-5">
                        <div
                          className={`w-9 h-9 shrink-0 rounded-full flex items-center justify-center text-sm font-bold shadow-sm ${badgeClass}`}
                        >
                          {labelLetter}
                        </div>
                        <span
                          className={`text-[#2b3437] font-medium ${isThisSelected ? "font-bold" : ""}`}
                        >
                          {opt.content}
                        </span>
                      </div>
                      {checkIcon && (
                        <div className="ml-14 md:ml-0 self-start md:self-auto">
                          {checkIcon}
                        </div>
                      )}
                    </div>
                  );
                }) : (
                   <div className="space-y-6">
                      <div className="bg-[#f8fafc] p-6 rounded-2xl border border-[#e2e9ed]">
                         <p className="text-[10px] font-bold text-[#737c80] uppercase tracking-widest mb-3">Your Response:</p>
                         <pre className="whitespace-pre-wrap font-mono text-sm text-slate-700 bg-white p-4 rounded-xl border border-slate-100">
                            {userAnswersForQ[0]?.content || "No response provided."}
                         </pre>
                      </div>
                      
                      {question.sampleAnswer && (
                        <div className="bg-[#f0f9ff] p-6 rounded-2xl border border-[#bae6fd]">
                           <p className="text-[10px] font-bold text-[#0369a1] uppercase tracking-widest mb-3">Sample Answer / Correct Solution:</p>
                           <pre className="whitespace-pre-wrap font-mono text-sm text-[#0c4a6e] bg-white p-4 rounded-xl border border-[#e0f2fe]">
                              {question.sampleAnswer}
                           </pre>
                        </div>
                      )}
                   </div>
                )}
              </div>

              {question.explanation && (
                <div className="mt-8 pt-8 border-t border-[#f1f5f9]">
                  <p className="text-[#64748b] text-sm leading-relaxed italic">
                    <strong
                      className={`${isUserCorrect ? "text-[#026880]" : "text-red-600"} not-italic font-bold uppercase tracking-wider mr-2`}
                    >
                      {isUserCorrect ? "Insight:" : "Correction:"}:
                    </strong>{" "}
                    {question.explanation}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </article>
    );
  };

  return (
    <div className="bg-[#f8fafc] text-[#2b3437] font-['Inter'] min-h-screen pb-20 selection:bg-[#94dffb] selection:text-[#005063]">
      {/* Top Navigation */}
      <header className="fixed top-0 w-full z-50 bg-[#f8fafc]/80 backdrop-blur-xl flex justify-between items-center px-6 md:px-10 py-5 border-b border-slate-200/50">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/dashboard")}
            className="text-[#026880] hover:text-[#005b70] transition-colors flex items-center gap-2 font-bold text-sm uppercase tracking-widest"
          >
            <ArrowLeft size={18} strokeWidth={2.5} />
            <span className="hidden sm:inline">DASHBOARD</span>
          </button>
        </div>
        <div className="flex items-center gap-8">
           <h1 className="text-sm font-black tracking-[0.2em] text-[#026880] uppercase hidden md:block">
              SERENE SCHOLAR PORTAL
           </h1>
        </div>
        <div className="flex items-center gap-6">
          <div className="w-10 h-10 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-[#64748b] shadow-sm">
            <User size={22} />
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 pt-32 pb-12 animate-[fadeIn_0.5s_ease-out]">
        {/* Statistics Hero Section */}
        <section className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-10">
          <div className="max-w-2xl">
            <span className="text-[#026880] font-bold tracking-[0.3em] text-[10px] uppercase mb-4 block">
              POST-EXAMINATION REPORT
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-slate-800 mb-6 font-['Be_Vietnam_Pro'] tracking-tighter leading-none">
              Exam: {testCode}
            </h2>
            <p className="text-[#64748b] text-base md:text-lg leading-relaxed max-w-lg font-medium">
               Review your performance metrics and detailed answers below. Learn from the explanations provided for each task.
            </p>
          </div>

          <div className="bg-[#026880] rounded-[2.5rem] p-10 flex flex-col items-center justify-center min-w-[240px] shadow-2xl shadow-[#026880]/20 text-white relative overflow-hidden group">
            <span className="text-white/60 font-bold text-[10px] uppercase tracking-widest mb-2 z-10">
              FINAL SCORE
            </span>
            <div className="flex items-baseline gap-1 z-10">
              <span className="text-7xl font-black font-['Be_Vietnam_Pro'] tracking-tight">
                {resultData.score?.toFixed(1)}
              </span>
              <span className="text-2xl text-white/40 font-bold">/10</span>
            </div>
            <div
              className={`mt-6 px-6 py-2 text-[10px] font-black rounded-full uppercase tracking-[0.2em] z-10 backdrop-blur-md border border-white/20 ${rank.color}`}
            >
              {rank.label}
            </div>
            <div className="absolute -bottom-10 -right-10 size-40 bg-white/5 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
          </div>
        </section>

        {/* Global Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16 md:mb-24">
          <div className="bg-white border border-slate-100 p-8 rounded-[2rem] flex items-center gap-6 shadow-sm group hover:shadow-xl transition-all">
            <div className="w-14 h-14 shrink-0 rounded-2xl bg-[#cee7ec] flex items-center justify-center text-[#026880] group-hover:scale-110 transition-transform">
              <Timer size={28} />
            </div>
            <div>
              <p className="text-[10px] font-black text-[#64748b] uppercase tracking-[0.2em] mb-1">Time Spent</p>
              <p className="text-xl font-bold text-slate-800 font-['Be_Vietnam_Pro'] tracking-tight">
                {Math.floor(resultData.timeTaken / 60).toString().padStart(2, "0")}:{(resultData.timeTaken % 60).toString().padStart(2, "0")}
              </p>
            </div>
          </div>
          <div className="bg-white border border-slate-100 p-8 rounded-[2rem] flex items-center gap-6 shadow-sm group hover:shadow-xl transition-all">
            <div className="w-14 h-14 shrink-0 rounded-2xl bg-[#f1fcf4] flex items-center justify-center text-[#34a853] group-hover:scale-110 transition-transform">
              <CheckCircle size={28} />
            </div>
            <div>
              <p className="text-[10px] font-black text-[#64748b] uppercase tracking-[0.2em] mb-1">Correctness</p>
              <p className="text-xl font-bold text-slate-800 font-['Be_Vietnam_Pro'] tracking-tight">
                {resultData.answers?.filter(a => a.isCorrect).length} / {correctAnswersData.length}
              </p>
            </div>
          </div>
          <div className="bg-white border border-slate-100 p-8 rounded-[2rem] flex items-center gap-6 shadow-sm group hover:shadow-xl transition-all">
            <div className="w-14 h-14 shrink-0 rounded-2xl bg-[#fef7ff] flex items-center justify-center text-[#a142f4] group-hover:scale-110 transition-transform">
              <Activity size={28} />
            </div>
            <div>
              <p className="text-[10px] font-black text-[#64748b] uppercase tracking-[0.2em] mb-1">Precision</p>
              <p className="text-xl font-bold text-slate-800 font-['Be_Vietnam_Pro'] tracking-tight">
                 {((resultData.score / 10) * 100).toFixed(0)}%
              </p>
            </div>
          </div>
        </div>

        {/* Leaderboard Section */}
        <section className="mb-24">
           <div className="flex items-center justify-between mb-8">
              <div>
                 <span className="text-[#026880] font-bold tracking-[0.3em] text-[10px] uppercase mb-2 block">CLASS STANDINGS</span>
                 <h3 className="text-3xl font-black text-slate-800 font-['Be_Vietnam_Pro'] tracking-tighter">Leaderboard</h3>
              </div>
              <div className="text-right">
                 <p className="text-sm font-medium text-slate-500">Class Average</p>
                 <p className="text-2xl font-bold text-[#026880]">
                    {(classResults.reduce((acc, r) => acc + r.score, 0) / (classResults.length || 1)).toFixed(1)}/10
                 </p>
              </div>
           </div>

           <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                 <table className="w-full text-left border-collapse">
                    <thead>
                       <tr className="bg-slate-50/50">
                          <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Rank</th>
                          <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Student</th>
                          <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Score</th>
                          <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Submission Date</th>
                       </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                       {classResults.map((res, i) => (
                          <tr key={res.id} className={`${res.id === resultData.id ? "bg-[#cee7ec]/20" : "hover:bg-slate-50/50 transition-colors"}`}>
                             <td className="px-8 py-6">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                                   i === 0 ? "bg-amber-100 text-amber-600" : 
                                   i === 1 ? "bg-slate-200 text-slate-600" :
                                   i === 2 ? "bg-orange-100 text-orange-600" : "text-slate-400"
                                }`}>
                                   {i + 1}
                                </div>
                             </td>
                             <td className="px-8 py-6">
                                <span className={`font-bold text-slate-700 ${res.id === resultData.id ? "text-[#026880]" : ""}`}>
                                   {res.examinee?.fullName || `Student ID: ${res.examinee?.id}`}
                                   {res.id === resultData.id && " (You)"}
                                </span>
                             </td>
                             <td className="px-8 py-6">
                                <div className="flex items-center gap-2">
                                   <div className="w-12 h-1.5 flex-none bg-slate-100 rounded-full overflow-hidden">
                                      <div className="h-full bg-[#026880]" style={{ width: `${(res.score / 10) * 100}%` }}></div>
                                   </div>
                                   <span className="font-bold text-slate-800">{res.score.toFixed(1)}</span>
                                </div>
                             </td>
                             <td className="px-8 py-6 text-right">
                                <span className="text-slate-400 text-sm font-medium">
                                   {new Date(res.submittedAt).toLocaleDateString()}
                                </span>
                             </td>
                          </tr>
                       ))}
                    </tbody>
                 </table>
              </div>
           </div>
        </section>

        {/* Task Review List */}
        <div className="space-y-16 md:space-y-24">
          {correctAnswersData.length > 0 ? (
            correctAnswersData.map((question, index) =>
              renderQuestionDetail(question, index),
            )
          ) : (
            <div className="text-center py-20 px-10 bg-white rounded-[3rem] border border-slate-100">
               <p className="text-slate-400 font-bold uppercase tracking-widest text-sm">No question data available for review.</p>
            </div>
          )}
        </div>

        {/* Action Summary Footer */}
        <footer className="mt-24 md:mt-32 py-12 border-t border-slate-200 flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="text-slate-400 text-xs font-bold uppercase tracking-[0.2em] text-center md:text-left">
            SUBMISSION DEPOT:{" "}
            <span className="text-slate-800">
              {new Date(resultData.startTime).toLocaleString("en-US", { dateStyle: 'long', timeStyle: 'short' })}
            </span>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <button className="flex justify-center items-center gap-3 px-10 py-4 rounded-2xl border-2 border-[#026880]/10 text-[#026880] font-black text-xs uppercase tracking-widest hover:bg-[#026880] hover:text-white transition-all w-full sm:w-auto active:scale-95">
              <Download size={18} strokeWidth={2.5} />
              SAVE TRANSCRIPT
            </button>
            <button
              onClick={() => navigate("/dashboard")}
              className="flex justify-center items-center px-10 py-4 rounded-2xl bg-[#026880] text-white font-black text-xs uppercase tracking-widest hover:bg-[#005b70] shadow-xl shadow-[#026880]/20 transition-all hover:-translate-y-1 w-full sm:w-auto active:scale-95"
            >
              FINISH REVIEW
            </button>
          </div>
        </footer>
      </main>

      {/* Floating Navigator (Desktop) */}
      <div className="fixed right-10 top-1/2 -translate-y-1/2 hidden xl:flex flex-col gap-4 p-6 bg-white/90 backdrop-blur-2xl rounded-[3rem] border border-slate-200/50 shadow-[0_20px_50px_rgba(0,0,0,0.1)] max-h-[70vh] overflow-y-auto custom-scrollbar">
        <div className="text-center mb-2">
          <span className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em]">
            INDEX
          </span>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {correctAnswersData.map((q, idx) => {
            const userAnswersForQ = resultData.answers?.filter(
              (a) => a.questionId === q.id,
            ) || [];
            const selectedOptionIds = userAnswersForQ.map(a => a.selectedOptionId).filter(Boolean);
            const correctOptionIds = q.correctOptionIds || [];

            let mapBadgeClass = "bg-slate-50 text-slate-300"; 
            if (userAnswersForQ.length > 0 || selectedOptionIds.length > 0) {
              if (q.type === "MULTIPLE_CHOICE") {
                const isCorrect = correctOptionIds.length > 0 && correctOptionIds.length === selectedOptionIds.length && correctOptionIds.every(id => selectedOptionIds.includes(id));
                if (isCorrect) {
                  mapBadgeClass = "bg-green-500 text-white shadow-lg shadow-green-500/20"; 
                } else {
                  mapBadgeClass = "bg-red-500 text-white shadow-lg shadow-red-500/20"; 
                }
              } else {
                 // For essay/code, if they answered, show blue for completed
                 mapBadgeClass = "bg-[#026880] text-white shadow-lg shadow-[#026880]/20";
              }
            }

            return (
              <a
                key={q.id}
                href={`#question-${idx + 1}`}
                className={`w-10 h-10 rounded-2xl flex items-center justify-center text-xs font-black transition-all hover:-translate-y-1 ${mapBadgeClass}`}
              >
                {idx + 1}
              </a>
            );
          })}
        </div>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="mt-4 w-10 h-10 mx-auto rounded-full bg-slate-800 text-white flex items-center justify-center hover:bg-black transition-colors shrink-0"
        >
          <ChevronUp size={20} />
        </button>
      </div>
    </div>
  );
};

export default ResultDetail;
