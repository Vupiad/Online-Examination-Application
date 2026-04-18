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
  LogIn,
} from "lucide-react";
import api from "../../services/api";

const TestInterface = () => {
  const navigate = useNavigate();
  const { testCode } = useParams();
  const location = useLocation();

  const examData = location.state?.examData;

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({}); // Lưu dạng { questionId: selectedOptionId }
  const [timeLeft, setTimeLeft] = useState(
    examData?.durationInMinutes ? examData.durationInMinutes * 60 : 0,
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Bảo vệ Route: Nếu không có dữ liệu bài thi (do f5 hoặc vào trực tiếp link), đẩy về trang nhập mã
  useEffect(() => {
    if (!examData) {
      navigate("/take-test");
    }
  }, [examData, navigate]);

  // Timer
  useEffect(() => {
    if (timeLeft <= 0) {
      if (examData && !isSubmitting) handleSubmitExam();
      return;
    }
    const timerId = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timerId);
  }, [timeLeft]);

  if (!examData) return null;

  const questions = examData.questions || [];
  const currentQuestion = questions[currentQuestionIndex];
  const totalQuestions = questions.length;

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const handleSelectOption = (questionId, optionId) => {
    // ĐÃ SỬA LỖI: Đặt questionId trong ngoặc vuông [] để lấy giá trị biến làm key Object
    setAnswers((prev) => ({ ...prev, [questionId]: optionId }));
  };

  // API Nộp bài
  const handleSubmitExam = async () => {
    if (timeLeft > 0 && !window.confirm("Bạn có chắc chắn muốn nộp bài?")) {
      return;
    }

    setIsSubmitting(true);
    try {
      const currentUser = JSON.parse(localStorage.getItem("user"));
      const userId = currentUser?.id || 1; // Giả lập lấy ID từ local storage

      const formattedAnswers = Object.entries(answers).map(([qId, optId]) => {
        return {
          questionId: parseInt(qId),
          selectedOptionId: parseInt(optId),
        };
      });

      const payload = {
        examCode: examData.examCode,
        examineeId: userId,
        startTime: new Date(
          Date.now() - (examData.durationInMinutes * 60 - timeLeft) * 1000,
        ).toISOString(),
        answers: formattedAnswers,
      };
      console.log(payload);

      const response = await api.post("/api/exam/submit", payload);
      console.log(response);

      alert("Nộp bài thành công! Điểm của bạn: " + response.data.score);

      // ĐÃ SỬA LỖI CHUYỂN HƯỚNG: Chuyển thẳng sang trang Result Detail của bài thi này
      navigate(`/exam/${examData.examCode}/result`);
    } catch (err) {
      console.error("Lỗi khi nộp bài:", err);
      alert("Có lỗi xảy ra khi nộp bài. Vui lòng thử lại!");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden bg-[#f7fafc] text-[#2b3437] font-['Inter']">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-[#dbe4e9] z-[60]">
        <div
          className="h-full bg-[#026880] transition-all duration-300"
          style={{
            width: `${Object.keys(answers).length === 0 ? 2 : (Object.keys(answers).length / totalQuestions) * 100}%`,
          }}
        ></div>
      </div>

      {/* Header */}
      <header className="fixed top-0 left-0 w-full h-16 bg-[#f7fafc] flex justify-between items-center px-8 z-50">
        <div className="flex items-center gap-6">
          <h1 className="text-xl font-bold text-[#026880] font-['Be_Vietnam_Pro'] tracking-tight">
            {examData.name || "Exam"}
          </h1>
        </div>
        <div className="flex items-center gap-8">
          <div
            className={`px-4 py-2 rounded-full flex items-center gap-2 border ${timeLeft < 300 ? "bg-red-50 border-red-200 text-red-600" : "bg-white/80 backdrop-blur-md border-[#aab3b8]/20 text-[#026880]"}`}
          >
            <Timer size={20} />
            <span className="font-bold tabular-nums">
              {formatTime(timeLeft)}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold text-[#2b3437]">Student</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-[#94dffb] flex items-center justify-center text-[#026880] overflow-hidden">
              <User size={24} />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 mt-16 pb-24 flex flex-col items-center">
        <div className="max-w-5xl w-full px-6 py-12 flex flex-col md:flex-row gap-12">
          {/* Left Column: Question Content */}
          <div className="flex-1">
            {currentQuestion ? (
              <>
                <div className="mb-8 flex items-center gap-4">
                  <span className="text-4xl font-light text-[#026880] font-['Be_Vietnam_Pro']">
                    {(currentQuestionIndex + 1).toString().padStart(2, "0")}
                  </span>
                  <div className="h-px flex-1 bg-[#dbe4e9]"></div>
                  <span className="text-sm font-medium text-[#576065] tracking-widest uppercase">
                    QUESTION {currentQuestionIndex + 1} / {totalQuestions}
                  </span>
                </div>

                <div className="bg-white rounded-xl p-8 md:p-12 shadow-sm border border-[#aab3b8]/10">
                  <p className="text-lg leading-relaxed text-[#2b3437] font-medium mb-8">
                    {currentQuestion.content}
                  </p>

                  {/* Options */}
                  <div className="grid grid-cols-1 gap-4 mt-8">
                    {currentQuestion.options?.map((option, index) => (
                      <label
                        key={option.id} // ĐÃ SỬA LỖI: Dùng option.id
                        className={`group flex items-center p-5 rounded-lg cursor-pointer transition-all border ${answers[currentQuestion.id] === option.id ? "bg-[#94dffb]/30 border-[#026880]" : "bg-[#e8eff2] border-transparent hover:bg-[#94dffb]/20"} active:scale-[0.98]`}
                      >
                        <input
                          type="radio"
                          name={`question-${currentQuestion.id}`}
                          className="w-5 h-5 text-[#026880] bg-[#dbe4e9] border-none focus:ring-0 focus:ring-offset-0"
                          checked={
                            answers[currentQuestion.questionId] === option.id // ĐÃ SỬA LỖI: Dùng currentQuestion.id
                          }
                          onChange={() => {
                            handleSelectOption(
                              currentQuestion.questionId, // ĐÃ SỬA LỖI: Dùng currentQuestion.id
                              option.id,
                            );
                          }}
                        />
                        <span className="ml-4 text-[#2b3437] font-medium">
                          {String.fromCharCode(65 + index)}. {option.content}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center h-full">
                Đang tải câu hỏi...
              </div>
            )}
          </div>

          {/* Right Column: Navigation Sidebar */}
          <aside className="w-full md:w-80">
            <div className="sticky top-28 space-y-6">
              <div className="bg-[#eff4f7] rounded-xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-bold text-[#2b3437] font-['Be_Vietnam_Pro']">
                    Question List
                  </h3>
                  <span className="text-xs font-semibold px-2 py-1 bg-[#94dffb] text-[#026880] rounded">
                    Done: {Object.keys(answers).length}/{totalQuestions}
                  </span>
                </div>

                <div className="grid grid-cols-5 gap-2">
                  {questions.map((q, idx) => {
                    const isAnswered = !!answers[q.id];
                    const isCurrent = idx === currentQuestionIndex;
                    return (
                      <button
                        key={q.id}
                        onClick={() => setCurrentQuestionIndex(idx)}
                        className={`aspect-square flex items-center justify-center rounded-lg font-medium text-sm transition-colors ${
                          isCurrent
                            ? "bg-[#026880] text-white font-bold border-2 border-[#026880]"
                            : isAnswered
                              ? "bg-[#026880]/10 text-[#026880] border-2 border-[#026880]"
                              : "bg-[#dbe4e9] text-[#576065] hover:bg-[#aab3b8]/40"
                        }`}
                      >
                        {idx + 1}
                      </button>
                    );
                  })}
                </div>
              </div>

              <button className="w-full flex items-center justify-between p-4 bg-[#dbe4e9]/50 rounded-lg hover:bg-[#dbe4e9] transition-colors group">
                <div className="flex items-center gap-3">
                  <HelpCircle className="text-[#576065]" size={20} />
                  <span className="text-sm font-medium text-[#2b3437]">
                    Testing guide
                  </span>
                </div>
                <ChevronRight
                  className="text-[#576065] group-hover:translate-x-1 transition-transform"
                  size={20}
                />
              </button>
            </div>
          </aside>
        </div>
      </main>

      {/* Footer Controls */}
      <footer className="fixed bottom-0 left-0 w-full bg-[#eff4f7] h-20 flex items-center px-8 z-50 shadow-[0_-4px_24px_rgba(0,0,0,0.03)]">
        <div className="max-w-5xl w-full mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button
              onClick={() =>
                setCurrentQuestionIndex((prev) => Math.max(0, prev - 1))
              }
              disabled={currentQuestionIndex === 0}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-[#4c6367] font-semibold hover:bg-[#cee7ec] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ArrowLeft size={20} />
              <span>Previous</span>
            </button>
            <button
              onClick={() =>
                setCurrentQuestionIndex((prev) =>
                  Math.min(totalQuestions - 1, prev + 1),
                )
              }
              disabled={currentQuestionIndex === totalQuestions - 1}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-[#026880] font-semibold hover:bg-[#94dffb] transition-colors active:scale-95 duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span>Next</span>
              <ArrowRight size={20} />
            </button>
          </div>
          <div className="flex items-center gap-6">
            <button
              onClick={handleSubmitExam}
              disabled={isSubmitting}
              className="flex items-center gap-2 bg-[#026880] text-white px-10 py-3 rounded-xl font-bold font-['Be_Vietnam_Pro'] shadow-lg shadow-[#026880]/20 hover:bg-[#005b70] transition-all active:scale-95 duration-200 disabled:opacity-70"
            >
              {isSubmitting ? (
                <Loader2 size={20} className="animate-spin" />
              ) : null}
              Submit
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default TestInterface;
