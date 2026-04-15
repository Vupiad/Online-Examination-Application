import React, { useState, useEffect } from "react";
import { 
  ArrowLeft, 
  Clock, 
  Calendar, 
  Lock, 
  Users, 
  ChevronRight,
  MoreVertical,
  HelpCircle,
  Edit3,
  Trash2,
  FileText
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";

const ExamDetail = () => {
  const navigate = useNavigate();
  const { examId } = useParams();
  const [exam, setExam] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExam = async () => {
      try {
        const response = await api.get(`/api/exams/${examId}`);
        setExam(response.data);
      } catch (error) {
        console.error("Error fetching exam:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchExam();
  }, [examId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#006070]"></div>
      </div>
    );
  }

  if (!exam) {
    return (
      <div className="p-8 text-center bg-[#f8fafc] min-h-screen">
        <p>Không tìm thấy đề thi.</p>
        <button onClick={() => navigate("/teacher/dashboard")} className="btn btn-primary w-auto mt-4 px-6">Quay về Dashboard</button>
      </div>
    );
  }

  return (
    <div className="bg-[#f8fafc] min-h-screen p-8">
      {/* Header */}
      <div className="max-w-5xl mx-auto mb-8 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate("/teacher/dashboard")}
            className="p-2 bg-white rounded-lg shadow-sm border border-slate-200 text-slate-400 hover:text-slate-600 cursor-pointer"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-2xl font-bold m-0" style={{ color: 'var(--primary)' }}>{exam.title}</h1>
            <p className="text-sm text-grey m-0">{exam.subject} • {exam.durationInMinutes} phút</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 rounded-lg text-sm font-bold text-slate-600">
            <Edit3 size={18} /> Chỉnh sửa
          </button>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-[#ef4444] text-white border-none rounded-lg text-sm font-bold shadow-md shadow-red-100">
            <Trash2 size={18} /> Xóa đề
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left: Info Cards */}
        <div className="md:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="text-sm font-bold mb-4 flex items-center gap-2 text-slate-800">
              <FileText size={18} className="text-[#006070]" /> Thông tin chung
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Clock size={16} className="text-slate-400 mt-0.5" />
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Thời lượng</p>
                  <p className="text-sm font-semibold">{exam.durationInMinutes} phút</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Calendar size={16} className="text-slate-400 mt-0.5" />
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Thời gian thi</p>
                  <p className="text-sm font-semibold">
                    {exam.startTime ? new Date(exam.startTime).toLocaleString('vi-VN') : 'N/A'}<br/>
                    <span className="text-xs text-slate-400">đến</span><br/>
                    {exam.endTime ? new Date(exam.endTime).toLocaleString('vi-VN') : 'N/A'}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Lock size={16} className="text-slate-400 mt-0.5" />
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Mật mã</p>
                  <p className="text-sm font-semibold">{exam.passcode || "Không có"}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#e0f2fe] p-6 rounded-2xl border border-[#bae6fd]">
            <h3 className="text-sm font-bold mb-4 flex items-center gap-2 text-[#0369a1]">
              <Users size={18} /> Thống kê bài thi
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-xs text-[#0c4a6e]">Đã tham gia</span>
                <span className="text-sm font-bold text-[#0369a1]">42 lượt</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-[#0c4a6e]">Điểm trung bình</span>
                <span className="text-sm font-bold text-[#0369a1]">7.8 / 10</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Question List Preview */}
        <div className="md:col-span-2 space-y-6">
           <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <h3 className="text-md font-bold m-0 flex items-center gap-3">
                Danh sách câu hỏi <span className="text-sm font-normal text-slate-400">({exam.questions?.length || 0} câu)</span>
              </h3>
              <button 
                onClick={() => navigate(`/teacher/add-questions/${exam.id}`, { state: { exam } })}
                className="text-xs font-bold text-[#006070] hover:underline bg-transparent border-none cursor-pointer"
              >
                + Thêm câu hỏi
              </button>
           </div>

           {exam.questions && exam.questions.length > 0 ? (
             <div className="space-y-4">
               {exam.questions.map((q, idx) => (
                 <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                   <div className="flex justify-between mb-4">
                     <span className="text-xs font-bold text-[#006070] uppercase tracking-widest">Câu {idx + 1}</span>
                     <span className="text-[10px] bg-slate-100 px-2 py-0.5 rounded text-slate-500 font-bold">{q.type}</span>
                   </div>
                   <p className="text-sm font-medium text-slate-800 mb-6">{q.content}</p>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                     {q.options?.map((opt, oIdx) => (
                       <div key={oIdx} className={`p-3 rounded-lg border text-xs flex items-center gap-3 ${opt.isCorrect ? 'bg-[#f0fdf4] border-[#86efac] text-[#166534]' : 'bg-slate-50 border-slate-100 text-slate-500'}`}>
                         <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${opt.isCorrect ? 'bg-[#166534] border-[#166534]' : 'border-slate-300'}`}>
                           {opt.isCorrect && <div className="w-1.5 h-1.5 bg-white rounded-full"></div>}
                         </div>
                         {opt.content}
                       </div>
                     ))}
                   </div>
                 </div>
               ))}
             </div>
           ) : (
             <div className="p-12 text-center bg-white rounded-2xl border border-dashed border-slate-200">
               <HelpCircle size={48} className="text-slate-200 mx-auto mb-4" />
               <p className="text-slate-400 text-sm font-medium">Chưa có câu hỏi nào cho đề thi này.</p>
               <button 
                onClick={() => navigate(`/teacher/add-questions/${exam.id}`, { state: { exam } })}
                className="btn btn-primary w-auto mx-auto mt-4 px-6 text-xs"
               >
                 Tạo câu hỏi ngay
               </button>
             </div>
           )}
        </div>
      </div>
    </div>
  );
};

export default ExamDetail;
