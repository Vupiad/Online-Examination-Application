import React, { useState, useEffect } from "react";
import { 
  Timer, 
  User, 
  ChevronLeft, 
  ChevronRight, 
  Flag, 
  HelpCircle,
  Save,
  Send
} from "lucide-react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import api from "../../services/api";

const QuizScreen = () => {
  const navigate = useNavigate();
  const { examId } = useParams();
  const location = useLocation();
  const [exam, setExam] = useState(location.state?.exam || null);
  const [loading, setLoading] = useState(!location.state?.exam);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0); // in seconds
  const [answers, setAnswers] = useState({}); // { questionId: selectedOptionId }

  useEffect(() => {
    if (!exam) {
      const fetchExam = async () => {
        try {
          const response = await api.get(`/api/exams/${examId}`);
          setExam(response.data);
          setTimeLeft(response.data.durationInMinutes * 60);
        } catch (error) {
          console.error("Error fetching exam:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchExam();
    } else {
      setTimeLeft(exam.durationInMinutes * 60);
      setLoading(false);
    }
  }, [examId, exam]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-[#f8fafc]"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#006070]"></div></div>;
  if (!exam || !exam.questions || exam.questions.length === 0) return <div className="p-8 text-center pt-20">Không có câu hỏi cho đề thi này.</div>;

  const currentQuestion = exam.questions[currentQuestionIdx];
  const finishedCount = Object.keys(answers).length;

  const handleOptionClick = (questionId, optionId) => {
    setAnswers({ ...answers, [questionId]: optionId });
  };

  const handleNext = () => {
    if (currentQuestionIdx < exam.questions.length - 1) {
      setCurrentQuestionIdx(currentQuestionIdx + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIdx > 0) {
      setCurrentQuestionIdx(currentQuestionIdx - 1);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-[#f8fafc]">
      {/* Quiz Header */}
      <header className="flex justify-between items-center px-8 py-3 bg-white border-b border-slate-200">
        <div className="flex items-center gap-2">
          <h1 className="text-md font-bold text-[#006070] m-0">{exam.title}</h1>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 bg-[#f0f9ff] text-[#0369a1] px-4 py-1.5 rounded-full font-bold text-sm">
            <Timer size={18} />
            <span>{formatTime(timeLeft)}</span>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-xs font-bold m-0 text-slate-700">Sinh Viên: Test User</p>
              <p className="text-[10px] text-slate-500 m-0">Lớp Phân Phối Trực Tuyến</p>
            </div>
            <div className="w-9 h-9 rounded-full bg-[#94dffb] flex items-center justify-center text-[#026880] font-bold">
              ST
            </div>
          </div>
        </div>
      </header>

      {/* Quiz Content Area */}
      <div className="flex flex-1 overflow-hidden p-8 gap-8">
        {/* Left: Question Content */}
        <div className="flex-1 flex flex-col bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-8 flex-1 overflow-y-auto">
            <div className="flex items-center gap-4 mb-8">
              <h2 className="text-4xl font-bold text-[#006070]">{currentQuestionIdx < 9 ? `0${currentQuestionIdx + 1}` : currentQuestionIdx + 1}</h2>
              <div className="h-0.5 flex-1 bg-slate-100"></div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Câu hỏi {currentQuestionIdx + 1} / {exam.questions.length}</span>
            </div>

            <div className="mb-8">
              <p className="text-md text-slate-800 leading-relaxed mb-6 font-medium">
                {currentQuestion.content}
              </p>
              
              {currentQuestion.imageUrl && (
                <div className="bg-[#f8fafc] p-6 rounded-xl border border-slate-100 flex justify-center mb-8">
                  <img src={currentQuestion.imageUrl} alt="Question" className="max-w-full h-auto rounded-lg shadow-sm" />
                </div>
              )}

              <div className="space-y-3">
                {currentQuestion.options?.map((opt, oIdx) => (
                  <div 
                    key={oIdx} 
                    className={`quiz-option ${answers[currentQuestion.id] === opt.id ? 'selected' : ''}`}
                    onClick={() => handleOptionClick(currentQuestion.id, opt.id)}
                  >
                    <div className={`w-5 h-5 rounded-full border-2 ${answers[currentQuestion.id] === opt.id ? 'border-[#006070] bg-[#006070] flex items-center justify-center' : 'border-slate-200'}`}>
                      {answers[currentQuestion.id] === opt.id && <div className="w-2 h-2 rounded-full bg-white"></div>}
                    </div>
                    <span className={`text-sm ${answers[currentQuestion.id] === opt.id ? 'font-semibold' : 'font-medium'}`}>
                      {String.fromCharCode(65 + oIdx)}. {opt.content}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Question Footer Nav */}
          <div className="px-8 py-4 bg-[#f8fafc] border-t border-slate-100 flex justify-between items-center">
            <button 
              onClick={handlePrev}
              disabled={currentQuestionIdx === 0}
              className={`flex items-center gap-2 font-bold text-sm bg-transparent border-none cursor-pointer transition-colors ${currentQuestionIdx === 0 ? 'text-slate-200 cursor-not-allowed' : 'text-slate-400 hover:text-slate-600'}`}
            >
              <ChevronLeft size={20} /> Câu trước
            </button>
            <button 
              onClick={handleNext}
              disabled={currentQuestionIdx === exam.questions.length - 1}
              className={`flex items-center gap-2 font-bold text-sm bg-transparent border-none cursor-pointer hover:underline ${currentQuestionIdx === exam.questions.length - 1 ? 'text-slate-200 cursor-not-allowed' : 'text-[#006070]'}`}
            >
              Câu sau <ChevronRight size={20} />
            </button>
            <div className="flex gap-3">
              <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-600 shadow-sm hover:bg-slate-50">
                <Save size={16} /> Lưu nháp
              </button>
              <button 
                onClick={() => { if(window.confirm('Bạn có chắc muốn nộp bài?')) navigate('/student/dashboard'); }}
                className="flex items-center gap-2 px-6 py-2.5 bg-[#006070] text-white border-none rounded-lg text-xs font-bold shadow-md shadow-[#006070]/20 hover:bg-[#004d5a]"
              >
                Nộp bài <Send size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Right: Question Navigation */}
        <div className="w-80 flex flex-col gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-sm font-bold m-0 text-slate-800">Danh sách câu hỏi</h3>
              <span className="text-[10px] bg-[#e0f2fe] text-[#0369a1] px-2 py-0.5 rounded font-bold">Đã làm: {finishedCount}/{exam.questions.length}</span>
            </div>

            <div className="question-nav-grid mb-8">
              {exam.questions.map((q, idx) => (
                <button 
                  key={idx} 
                  className={`nav-btn ${idx === currentQuestionIdx ? 'current' : ''} ${answers[q.id] ? 'completed' : ''}`}
                  onClick={() => setCurrentQuestionIdx(idx)}
                >
                  {idx + 1}
                </button>
              ))}
            </div>

            <div className="space-y-3 pt-6 border-t border-slate-100">
              <div className="flex items-center gap-3">
                <div className="status-dot bg-[#006070]"></div>
                <span className="text-xs text-slate-500 font-medium">Đang xem</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="status-dot border-2 border-[#006070] bg-[#e0f2fe]"></div>
                <span className="text-xs text-slate-500 font-medium">Đã trả lời</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="status-dot bg-slate-200"></div>
                <span className="text-xs text-slate-500 font-medium">Chưa trả lời</span>
              </div>
            </div>
          </div>

          <button className="flex items-center justify-between w-full px-6 py-4 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl border-none font-bold text-xs transition-colors group">
            <div className="flex items-center gap-3">
              <HelpCircle size={20} />
              <span>Hướng dẫn làm bài</span>
            </div>
            <ChevronRight size={18} className="text-slate-400 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizScreen;
