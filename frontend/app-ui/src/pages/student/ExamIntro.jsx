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
          <p className="text-slate-500 mb-4">Dữ liệu bài thi không hợp lệ.</p>
          <button onClick={() => navigate("/student/dashboard")} className="btn btn-primary w-auto px-6">Quay lại Dashboard</button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#f8fafc] min-h-screen p-8 flex items-center justify-center">
      <div className="max-w-3xl w-full">
        {/* Back Button */}
        <button 
          onClick={() => navigate(-1)}
          className="mb-8 flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-slate-600 bg-transparent border-none cursor-pointer"
        >
          <ArrowLeft size={16} /> Quay lại
        </button>

        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 overflow-hidden border border-slate-100">
          <div className="p-10 md:p-14">
            <div className="uppercase tracking-widest text-[10px] font-bold text-[#006070] mb-4">Hệ thống thi trực tuyến</div>
            <h1 className="text-3xl md:text-4xl font-bold mb-6 text-slate-800">{exam.title}</h1>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Môn học</span>
                <span className="text-sm font-bold text-slate-700">{exam.subject}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Thời gian</span>
                <span className="text-sm font-bold text-slate-700 flex items-center gap-1">
                  <Clock size={14} className="text-[#006070]" /> {exam.durationInMinutes} phút
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Số câu hỏi</span>
                <span className="text-sm font-bold text-slate-700 flex items-center gap-1">
                  <HelpCircle size={14} className="text-[#006070]" /> {exam.questions?.length || 0} câu
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Trạng thái</span>
                <span className="text-[10px] font-bold px-2 py-0.5 bg-green-100 text-green-600 rounded-full w-fit">SẴN SÀNG</span>
              </div>
            </div>

            <div className="bg-slate-50 rounded-2xl p-6 mb-10 border border-slate-100">
              <h4 className="text-sm font-bold mb-4 flex items-center gap-2 text-slate-800">
                <ShieldCheck size={18} className="text-[#006070]" /> Hướng dẫn làm bài
              </h4>
              <ul className="space-y-3 m-0 p-0 list-none">
                <li className="text-xs text-slate-500 flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#006070] mt-1.5"></div>
                  Bài thi sẽ tự động kết thúc khi hết thời gian.
                </li>
                <li className="text-xs text-slate-500 flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#006070] mt-1.5"></div>
                  Không chuyển tab hoặc thoát trình duyệt trong khi làm bài (hệ thống sẽ ghi nhận).
                </li>
                <li className="text-xs text-slate-500 flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#006070] mt-1.5"></div>
                  Mỗi câu hỏi có thể có một hoặc nhiều đáp án đúng tùy loại câu hỏi.
                </li>
                <li className="text-xs text-slate-500 flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#006070] mt-1.5"></div>
                  Bạn có thể xem lại các câu hỏi đã làm bằng bảng điều hướng bên phải màn hình thi.
                </li>
              </ul>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-4">
              <button 
                onClick={() => navigate(`/quiz/${exam.id}`, { state: { exam } })}
                className="w-full md:w-auto px-10 py-5 bg-[#006070] hover:bg-[#004d5a] text-white rounded-2xl font-bold flex items-center justify-center gap-3 shadow-xl shadow-[#006070]/20 transition-all hover:-translate-y-1 active:scale-95 border-none cursor-pointer"
              >
                <Play size={20} fill="currentColor" /> Bắt đầu bài thi ngay
              </button>
              <div className="flex items-center gap-2 text-[#f59e0b] px-4 py-2 bg-amber-50 rounded-lg">
                <AlertTriangle size={16} />
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600">Lưu ý: Camera & Microphone có thể được yêu cầu</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamIntro;
