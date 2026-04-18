import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  Timer,
  User,
  HelpCircle,
  ChevronRight,
  ArrowLeft,
  ArrowRight,
  Loader2,
  Lock,
  MessageSquare,
  Flag
} from "lucide-react";

import api from "../../services/api";

const TestInterface = () => {
  const navigate = useNavigate();
  const { testCode } = useParams();
  const location = useLocation();

  const examData = location.state?.examData;

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({}); // Stores { questionId: selectedOptionId or textValue }
  const [timeLeft, setTimeLeft] = useState(
    examData?.durationInMinutes ? examData.durationInMinutes * 60 : 0,
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [violationCount, setViolationCount] = useState(0);
  const [runningTests, setRunningTests] = useState(false);
  const [testResults, setTestResults] = useState(null);
  const [flags, setFlags] = useState({}); // Stores { questionId: boolean }


  // Protection: if no exam data, go back
  useEffect(() => {
    if (!examData) {
      navigate("/take-test");
    }
  }, [examData, navigate]);

  // Anti-cheat (Tab switching)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        setViolationCount((prev) => {
          const newCount = prev + 1;
          alert(`VIOLATION WARNING (Attempt ${newCount}):\nYou have left the exam tab. This behavior has been recorded and reported to the instructor.`);
          return newCount;
        });
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  // Timer
  useEffect(() => {
    if (timeLeft <= 0) {
      if (examData && !isSubmitting) handleSubmitExam();
      return;
    }
    const timerId = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timerId);
  }, [timeLeft, examData, isSubmitting]);

  if (!examData) return null;

  const questions = examData.questions || [];
  const currentQuestion = questions[currentQuestionIndex];
  const totalQuestions = questions.length;

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const handleSelectAnswer = (questionId, value, isMultipleChoice = false) => {
    setAnswers((prev) => {
      if (!isMultipleChoice) return { ...prev, [questionId]: value };
      
      const currentArr = prev[questionId] || [];
      if (currentArr.includes(value)) {
        return { ...prev, [questionId]: currentArr.filter(v => v !== value) };
      } else {
        return { ...prev, [questionId]: [...currentArr, value] };
      }
    });
  };

  const handleRunTests = async () => {
    if (!currentQuestion || currentQuestion.type !== "CODE") return;
    
    setRunningTests(true);
    setTestResults(null);
    try {
      const code = answers[currentQuestion.questionId] || currentQuestion.starterCode || "";
      const response = await api.post("/api/judge/run", {
        questionId: currentQuestion.questionId,
        code: code,
        language: currentQuestion.language
      });
      setTestResults(response.data);
    } catch (err) {
      console.error("Error running tests:", err);
      alert("Error connecting to the grading system. Please try again!");
    } finally {
      setRunningTests(false);
    }
  };

  const handleSubmitExam = async () => {
    if (timeLeft > 0 && !window.confirm("Are you sure you want to submit your exam?")) {
      return;
    }

    setIsSubmitting(true);
    try {
      const currentUser = JSON.parse(localStorage.getItem("user"));
      const userId = currentUser?.id || 1;

      // Group answers
      const formattedAnswers = [];
      Object.entries(answers).forEach(([qId, val]) => {
        const q = questions.find(x => x.questionId === parseInt(qId));
        if (q?.type === 'MULTIPLE_CHOICE') {
          if (Array.isArray(val)) {
            val.forEach(optId => {
               formattedAnswers.push({
                 questionId: parseInt(qId),
                 selectedOptionId: parseInt(optId),
                 content: null
               });
            });
          }
        } else {
          formattedAnswers.push({
            questionId: parseInt(qId),
            selectedOptionId: null,
            content: val?.toString() || ""
          });
        }
      });

      const payload = {
        examCode: examData.examCode,
        examineeId: userId,
        startTime: new Date(Date.now() - (examData.durationInMinutes * 60 - timeLeft) * 1000).toISOString(),
        answers: formattedAnswers,
        violationCount: violationCount
      };

      const response = await api.post("/api/exam/submit", payload);
      alert("Exam submitted successfully! Score: " + (response.data.score || "Pending Grading"));
      navigate("/dashboard");
    } catch (err) {
      console.error("Error submitting exam:", err);
      alert("Error during submission. Please check your connection and try again!");
      setIsSubmitting(false);
    }
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const prevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };
  const toggleFlag = (questionId) => {
    setFlags((prev) => ({ ...prev, [questionId]: !prev[questionId] }));
  };

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden bg-[#f7fafc] text-[#2b3437] font-['Inter']">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-[#dbe4e9] z-[60]">
        <div
          className="h-full bg-[#026880] transition-all duration-300"
          style={{ width: `${(Object.keys(answers).length / totalQuestions) * 100}%` }}
        ></div>
      </div>

      {/* Header */}
      <header className="fixed top-0 left-0 w-full h-16 bg-[#f7fafc] flex justify-between items-center px-8 z-50 border-b border-[#dbe4e9]/50 shadow-sm">
        <div className="flex items-center gap-6">
          <h1 className="text-xl font-bold text-[#026880] font-['Be_Vietnam_Pro'] tracking-tight">
            {examData.name || "Exam Session"}
          </h1>
        </div>
        <div className="flex items-center gap-8">
          <div className={`px-4 py-2 rounded-full flex items-center gap-2 border ${timeLeft < 300 ? "bg-red-50 border-red-200 text-red-600 animate-pulse" : "bg-white/80 backdrop-blur-md border-[#aab3b8]/20 text-[#026880]"}`}>
            <Timer size={20} />
            <span className="font-bold tabular-nums">{formatTime(timeLeft)}</span>
          </div>
          <div className="w-10 h-10 rounded-full bg-[#cee7ec] flex items-center justify-center text-[#026880] border border-[#026880]/10 shadow-inner">
            <User size={22} />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 mt-16 pb-24 flex flex-col items-center">
        <div className="max-w-6xl w-full px-6 py-12 flex flex-col lg:flex-row gap-12">
          
          {/* Left Column: Question Rendering */}
          <div className="flex-1 min-w-0">
            {currentQuestion ? (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="mb-6 flex items-center gap-4">
                  <span className="text-4xl font-light text-[#026880] font-['Be_Vietnam_Pro']">
                    {(currentQuestionIndex + 1).toString().padStart(2, "0")}
                  </span>
                  <div className="h-px flex-1 bg-[#dbe4e9]"></div>
                  <span className="text-[10px] font-bold text-[#576065] tracking-[0.2em] uppercase">
                    Question {currentQuestionIndex + 1} / {totalQuestions}
                  </span>
                </div>

                {/* Question Type Badge & Flag */}
                <div className="mb-6 flex items-center justify-between">
                   <span className="text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full bg-[#026880]/10 text-[#026880] border border-[#026880]/5">
                      {currentQuestion.type === "CODE" ? "Programming Task" : 
                       currentQuestion.type === "ESSAY" ? "Essay Response" : "Multiple Choice"}
                   </span>
                   <button 
                    onClick={() => toggleFlag(currentQuestion.questionId)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                      flags[currentQuestion.questionId] 
                        ? "bg-orange-100 text-orange-600 border border-orange-200" 
                        : "bg-gray-100 text-gray-400 border border-gray-200 hover:text-gray-600"
                    }`}
                   >
                     <Flag size={14} fill={flags[currentQuestion.questionId] ? "currentColor" : "none"} />
                     {flags[currentQuestion.questionId] ? "Flagged" : "Flag for review"}
                   </button>
                </div>

                <div className="mb-10 bg-white rounded-3xl p-8 border border-[#aab3b8]/10 shadow-sm">
                  <p className="text-xl font-medium leading-relaxed whitespace-pre-line text-[#2b3437]">
                    {currentQuestion.content}
                  </p>
                </div>

                {/* Editor Area based on Type */}
                <div className="mb-10">
                   {currentQuestion.type === "MULTIPLE_CHOICE" && (
                      <div className="grid grid-cols-1 gap-4">
                        {(currentQuestion.options || []).map((opt, idx) => (
                           <button
                            key={opt.id}
                            onClick={() => handleSelectAnswer(currentQuestion.questionId, opt.id, true)}
                            className={`flex items-center gap-5 p-6 rounded-[1.5rem] border-2 text-left transition-all duration-300 group ${
                              (answers[currentQuestion.questionId] || []).includes(opt.id)
                                ? "bg-[#026880] border-[#026880] text-white shadow-xl shadow-[#026880]/20 scale-[1.02]"
                                : "bg-white border-transparent hover:border-[#026880]/30 hover:bg-[#f7fafc]"
                            }`}
                          >
                            <span className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${
                              (answers[currentQuestion.questionId] || []).includes(opt.id)
                                ? "bg-white/20 text-white"
                                : "bg-[#e2e9ed] text-[#737c80] group-hover:bg-[#026880]/10"
                            }`}>
                              {String.fromCharCode(65 + idx)}
                            </span>
                            <span className="flex-1 font-medium text-lg">{opt.content}</span>
                          </button>
                        ))}
                      </div>
                   )}

                   {currentQuestion.type === "ESSAY" && (
                      <div className="bg-white rounded-[2rem] border border-[#dbe4e9] p-2 shadow-sm focus-within:ring-4 focus-within:ring-[#026880]/5 transition-all">
                        <textarea
                          placeholder="Type your response here..."
                          value={answers[currentQuestion.questionId] || ""}
                          onChange={(e) => handleSelectAnswer(currentQuestion.questionId, e.target.value)}
                          className="w-full min-h-[350px] p-8 bg-transparent border-none outline-none resize-none text-lg font-['Inter'] leading-relaxed"
                        />
                        <div className="flex justify-between px-8 py-3 bg-[#f7fafc] rounded-b-[1.8rem] text-[10px] font-bold text-[#aab3b8] uppercase tracking-[0.2em] border-t border-[#f0f4f7]">
                           <span className="flex items-center gap-2"><MessageSquare size={12}/> Min: {currentQuestion.minWords || 0} words</span>
                           <span>{ (answers[currentQuestion.questionId] || "").trim().split(/\s+/).filter(x => x).length } words written</span>
                        </div>
                      </div>
                   )}

                   {currentQuestion.type === "CODE" && (
                      <div className="flex flex-col gap-6">
                        <div className="flex items-center justify-between px-4">
                           <div className="flex items-center gap-2">
                             <div className="size-2 rounded-full bg-[#026880] shadow-[0_0_8px_rgba(2,104,128,0.5)]"></div>
                             <span className="text-xs font-bold text-[#026880] uppercase tracking-widest">{currentQuestion.language || "Python"} IDE</span>
                           </div>
                           <div className="flex items-center gap-3">
                              <button 
                                onClick={handleRunTests}
                                disabled={runningTests}
                                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                                  runningTests ? "bg-slate-200 text-slate-400 cursor-not-allowed" : "bg-[#026880] text-white hover:bg-[#02566b] shadow-lg shadow-[#026880]/10"
                                }`}
                              >
                                {runningTests ? <Loader2 className="animate-spin" size={14}/> : <ChevronRight size={14}/>}
                                {runningTests ? "Running..." : "Run Tests"}
                              </button>
                           </div>
                        </div>
                        <div className="rounded-[2.5rem] bg-[#0f172a] overflow-hidden shadow-2xl border border-white/5 ring-1 ring-white/10">
                           <div className="flex items-center gap-2 px-6 py-4 border-b border-white/5 bg-white/5">
                             <span className="size-3 rounded-full bg-[#ff5f56]" />
                             <span className="size-3 rounded-full bg-[#ffbd2e]" />
                             <span className="size-3 rounded-full bg-[#27c93f]" />
                           </div>
                           <div className="flex font-mono text-[14px]">
                              {/* Fake Gutter */}
                              <div className="w-14 bg-white/[0.02] text-slate-500 text-right pr-4 py-8 select-none shrink-0 border-r border-white/5">
                                 {Array.from({length: 15}).map((_, i) => <div key={i} className="h-6 leading-6">{i+1}</div>)}
                              </div>
                              <textarea
                                spellCheck={false}
                                value={answers[currentQuestion.questionId] !== undefined ? answers[currentQuestion.questionId] : (currentQuestion.starterCode || "")}
                                onChange={(e) => handleSelectAnswer(currentQuestion.questionId, e.target.value)}
                                className="flex-1 min-h-[400px] bg-transparent border-0 px-8 py-8 focus:ring-0 resize-none text-slate-100 placeholder:text-slate-700 outline-none leading-6 scrollbar-hide"
                                placeholder="# Implement your solution here..."
                              />
                           </div>
                        </div>

                        {/* Test Results Panel */}
                        {testResults && (
                           <div className="animate-in slide-in-from-top-4 duration-300">
                             <div className="bg-white rounded-3xl p-6 border border-[#dbe4e9] shadow-sm">
                                <h4 className="text-xs font-bold uppercase tracking-widest text-[#576065] mb-4 flex items-center gap-2">
                                   Test Results
                                   <span className="text-[10px] px-2 py-0.5 bg-[#cee7ec] text-[#026880] rounded-full">
                                      {testResults.filter(r => r.passed).length}/{testResults.length} Passed
                                   </span>
                                </h4>
                                <div className="space-y-3">
                                   {testResults.map((result, idx) => (
                                      <div key={idx} className={`flex items-center justify-between p-4 rounded-2xl border ${result.passed ? "bg-green-50/50 border-green-100" : "bg-red-50/50 border-red-100"}`}>
                                         <div className="flex items-center gap-3">
                                            <div className={`size-6 rounded-full flex items-center justify-center text-[10px] font-bold ${result.passed ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                                               {result.passed ? "✓" : "✗"}
                                            </div>
                                            <span className="text-sm font-medium text-slate-700">Test Case {idx + 1}</span>
                                         </div>
                                         <div className="flex gap-4 text-[11px]">
                                            <div className="flex flex-col items-end">
                                               <span className="text-slate-400 uppercase font-bold text-[9px]">Input</span>
                                               <code className="text-slate-600">{result.input}</code>
                                            </div>
                                            {!result.passed && (
                                              <div className="flex flex-col items-end">
                                                <span className="text-red-400 uppercase font-bold text-[9px]">Output</span>
                                                <code className="text-red-700 font-bold">{result.actualOutput || "Error"}</code>
                                              </div>
                                            )}
                                         </div>
                                      </div>
                                   ))}
                                </div>
                             </div>
                           </div>
                        )}
                      </div>
                   )}
                </div>

                {/* Footer Navigation */}
                <div className="flex items-center justify-between mt-12 pt-8 border-t border-[#dbe4e9]">
                   <button 
                    disabled={currentQuestionIndex === 0}
                    onClick={prevQuestion}
                    className="flex items-center gap-2 px-8 py-4 rounded-full font-bold text-[#737c80] hover:bg-[#e2e9ed] transition-all disabled:opacity-0"
                   >
                     <ArrowLeft size={20}/> Previous
                   </button>
                   <button 
                    onClick={currentQuestionIndex === totalQuestions - 1 ? handleSubmitExam : nextQuestion}
                    disabled={isSubmitting}
                    className={`flex items-center gap-2 px-10 py-4 rounded-full font-bold text-white shadow-xl transition-all scale-100 active:scale-95 ${
                      currentQuestionIndex === totalQuestions - 1 ? "bg-green-600 shadow-green-600/20" : "bg-[#026880] shadow-[#026880]/20"
                    }`}
                   >
                     {currentQuestionIndex === totalQuestions - 1 ? "Finish Exam" : "Save & Next"}
                     {currentQuestionIndex < totalQuestions - 1 && <ArrowRight size={20}/>}
                   </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-[60vh] text-[#737c80]">
                <Loader2 className="animate-spin mb-4" size={40} />
                <p className="font-medium">Loading question...</p>
              </div>
            )}
          </div>

          {/* Right Column: Navigation Sidebar */}
          <aside className="w-full lg:w-80 shrink-0">
            <div className="sticky top-28 space-y-6">
              <div className="bg-white rounded-[2.5rem] p-8 border border-[#aab3b8]/10 shadow-sm">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="font-bold text-[#2b3437] font-['Be_Vietnam_Pro'] tracking-tight">
                    Navigation
                  </h3>
                  <span className="text-[10px] font-bold px-3 py-1 bg-[#cee7ec] text-[#026880] rounded-full uppercase tracking-widest">
                    {Object.keys(answers).length} / {totalQuestions}
                  </span>
                </div>

                <div className="grid grid-cols-4 gap-3">
                  {questions.map((q, idx) => {
                    const isAnswered = !!answers[q.questionId];
                    const isCurrent = idx === currentQuestionIndex;
                    return (
                      <button
                        key={q.questionId}
                        onClick={() => setCurrentQuestionIndex(idx)}
                        className={`aspect-square flex items-center justify-center rounded-[1rem] font-bold text-sm transition-all duration-300 shadow-sm relative ${
                          isCurrent
                            ? "bg-[#026880] text-white ring-4 ring-[#026880]/10"
                            : isAnswered
                              ? "bg-[#cee7ec] text-[#026880] border border-[#026880]/20"
                              : "bg-[#f7fafc] text-[#aab3b8] border border-transparent hover:border-[#aab3b8]/20"
                        }`}
                      >
                        {idx + 1}
                        {flags[q.questionId] && (
                          <div className="absolute -top-1 -right-1 w-3 h-3 bg-orange-500 rounded-full border-2 border-white shadow-sm"></div>
                        )}
                      </button>

                    );
                  })}
                </div>

                <div className="mt-10 pt-8 border-t border-[#f0f4f7]">
                   <p className="text-[10px] uppercase font-bold text-[#aab3b8] tracking-widest mb-4">Test Status</p>
                   <div className="space-y-3">
                      <div className="flex items-center justify-between text-xs">
                         <span className="text-[#737c80]">Violations Detected</span>
                         <span className={`font-bold ${violationCount > 0 ? "text-red-500" : "text-[#026880]"}`}>{violationCount}</span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                         <span className="text-[#737c80]">Time Progress</span>
                         <span className="font-bold text-[#026880]">{Math.round((timeLeft / (examData.durationInMinutes * 60)) * 100)}%</span>
                      </div>
                   </div>
                </div>
              </div>

              <div className="bg-[#026880] rounded-[2.5rem] p-8 text-white shadow-xl shadow-[#026880]/20">
                 <div className="flex items-center gap-3 mb-4">
                    <HelpCircle size={20}/>
                    <h4 className="font-bold font-['Be_Vietnam_Pro'] tracking-tight">Need help?</h4>
                 </div>
                 <p className="text-sm opacity-80 leading-relaxed mb-6">If you encounter any technical issues, please notify your proctor immediately.</p>
                 <button className="w-full py-3 bg-white/10 hover:bg-white/20 rounded-xl text-sm font-bold transition-all">
                    Testing Guide
                 </button>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default TestInterface;
