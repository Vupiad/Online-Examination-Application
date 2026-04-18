import React from "react";
import { 
  ArrowLeft, 
  Clock, 
  HelpCircle, 
  ShieldCheck, 
  AlertTriangle,
  Play
} from "lucide-react";
import { useNavigate, useParams, useLocation } from "react-router-dom";

const ExamIntro = () => {
  const navigate = useNavigate();
  const { examId } = useParams();
  const location = useLocation();
  const exam = location.state?.exam;

  if (!exam) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8fafc]">
        <div className="text-center">
          <p className="text-slate-500 mb-4 uppercase text-xs font-bold tracking-widest">Invalid Examination Data</p>
          <button onClick={() => navigate("/student/dashboard")} className="bg-[#026880] text-white px-8 py-3 rounded-xl font-bold text-sm shadow-lg hover:bg-[#005b70] transition-all">Back to Dashboard</button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#f8fafc] min-h-screen p-8 flex items-center justify-center font-['Inter']">
      <div className="max-w-3xl w-full">
        {/* Back Button */}
        <button 
          onClick={() => navigate(-1)}
          className="mb-8 flex items-center gap-2 text-sm font-bold text-[#aab3b8] hover:text-[#026880] bg-transparent border-none cursor-pointer transition-colors"
        >
          <ArrowLeft size={16} /> GO BACK
        </button>

        <div className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/40 overflow-hidden border border-slate-100">
          <div className="p-10 md:p-14">
            <div className="uppercase tracking-[0.2em] text-[10px] font-bold text-[#026880] mb-4">Official Assessment System</div>
            <h1 className="text-3xl md:text-5xl font-bold mb-8 text-slate-800 font-['Be_Vietnam_Pro'] tracking-tight leading-tight">{exam.title || exam.name}</h1>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
              <div className="flex flex-col gap-1.5">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Subject</span>
                <span className="text-sm font-bold text-slate-700">{exam.subject || "General"}</span>
              </div>
              <div className="flex flex-col gap-1.5">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Time Limit</span>
                <span className="text-sm font-bold text-slate-700 flex items-center gap-1.5">
                   <Clock size={14} className="text-[#026880]" /> {exam.durationInMinutes} mins
                </span>
              </div>
              <div className="flex flex-col gap-1.5">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Questions</span>
                <span className="text-sm font-bold text-slate-700 flex items-center gap-1.5">
                   <HelpCircle size={14} className="text-[#026880]" /> {exam.questions?.length || 0} items
                </span>
              </div>
              <div className="flex flex-col gap-1.5">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status</span>
                <span className="text-[10px] font-bold px-3 py-1 bg-green-50 text-green-600 rounded-full w-fit border border-green-100 uppercase tracking-widest">READY</span>
              </div>
            </div>

            <div className="bg-slate-50/50 rounded-3xl p-8 mb-12 border border-slate-100/50">
              <h4 className="text-sm font-bold mb-6 flex items-center gap-2 text-slate-800">
                <ShieldCheck size={18} className="text-[#026880]" /> EXAMINATION RULES
              </h4>
              <ul className="space-y-4 m-0 p-0 list-none">
                <li className="text-sm text-slate-500 font-medium flex items-start gap-3">
                  <div className="size-2 rounded-full bg-[#026880] mt-1.5 shadow-[0_0_8px_rgba(2,104,128,0.4)]"></div>
                  The examination will automatically terminate when the time limit expires.
                </li>
                <li className="text-sm text-slate-500 font-medium flex items-start gap-3">
                  <div className="size-2 rounded-full bg-[#026880] mt-1.5 shadow-[0_0_8px_rgba(2,104,128,0.4)]"></div>
                  Do **NOT** switch tabs or exit the browser. All such actions are recorded as violations.
                </li>
                <li className="text-sm text-slate-500 font-medium flex items-start gap-3">
                  <div className="size-2 rounded-full bg-[#026880] mt-1.5 shadow-[0_0_8px_rgba(2,104,128,0.4)]"></div>
                  Each question may have single or multiple correct answers depending on its type.
                </li>
                <li className="text-sm text-slate-500 font-medium flex items-start gap-3">
                  <div className="size-2 rounded-full bg-[#026880] mt-1.5 shadow-[0_0_8px_rgba(2,104,128,0.4)]"></div>
                  You can navigate between questions using the sidebar during the session.
                </li>
              </ul>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-6">
              <button 
                onClick={() => navigate(`/quiz/${exam.id}`, { state: { exam } })}
                className="w-full md:w-auto px-12 py-5 bg-[#026880] hover:bg-[#005b70] text-white rounded-2x-full font-bold flex items-center justify-center gap-3 shadow-xl shadow-[#026880]/20 transition-all hover:translate-x-1 active:scale-95 border-none cursor-pointer rounded-2xl"
              >
                <Play size={20} fill="currentColor" /> START ASSESSMENT NOW
              </button>
              <div className="flex items-center gap-3 text-[#f59e0b] px-5 py-3 bg-amber-50/50 rounded-2xl border border-amber-100">
                <AlertTriangle size={18} />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-700">Notice: Full-screen mode recommended</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamIntro;
