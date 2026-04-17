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

  const [resultData, setResultData] = useState(null); // Lưu kết quả làm bài (điểm, đáp án user chọn)
  const [correctAnswersData, setCorrectAnswersData] = useState([]); // Lưu đề gốc + đáp án chuẩn
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch dữ liệu kết quả thi
  useEffect(() => {
    const fetchResultAndQuestions = async () => {
      try {
        setLoading(true);
        const currentUser = JSON.parse(localStorage.getItem("user"));
        const userId = currentUser?.id || 1;

        // 1. Lấy kết quả làm bài của học sinh này (lấy theo userId luôn)
        const resultResponse = await api.get(`/api/exam/results`, {
          params: { examCode: testCode, userId: userId },
        });

        // Vì resultResponse.data là array (có thể thi nhiều lần), ta lấy lần thi mới nhất (phần tử đầu tiên hoặc cuối cùng tùy logic BE)
        const latestResult =
          resultResponse.data[resultResponse.data.length - 1];

        if (!latestResult) {
          setError("Không tìm thấy kết quả làm bài của bạn cho bài thi này.");
          return;
        }
        setResultData(latestResult);

        // 2. Lấy bộ đề gốc + đáp án đúng
        const correctAnswersResponse = await api.post(
          `/api/exam/correct-answers`,
          {
            examCode: testCode,
            requestUserId: userId,
          },
        );

        setCorrectAnswersData(correctAnswersResponse.data);
      } catch (err) {
        console.error("Lỗi khi tải kết quả:", err);
        setError("Không thể tải kết quả. Vui lòng thử lại sau.");
      } finally {
        setLoading(false);
      }
    };

    if (testCode) {
      fetchResultAndQuestions();
    }
  }, [testCode]);

  // Hàm xếp loại
  const getGradeRank = (score) => {
    if (score >= 8.5)
      return { label: "EXCELLENT", color: "bg-[#cee7ec] text-[#005063]" };
    if (score >= 7.0)
      return { label: "GOOD", color: "bg-[#dbe4e9] text-[#2c4347]" };
    if (score >= 5.0)
      return { label: "AVERAGE", color: "bg-gray-200 text-gray-700" };
    return { label: "NEEDS WORK", color: "bg-[#fa746f] text-white" };
  };

  // --- CÁC TRẠNG THÁI LOADING & ERROR ---
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
          Quay lại Dashboard
        </button>
      </div>
    );
  }

  // TÍNH TOÁN :D
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

  const timeSpent = formatTime(resultData.timeTaken) || "Hoàn thành";

  const totalQuestions = correctAnswersData.length || 0;
  const correctCount =
    totalQuestions > 0
      ? Math.round((resultData.score / 10) * totalQuestions)
      : 0;
  const accuracy =
    totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;

  // Render một câu hỏi chi tiết
  const renderQuestionDetail = (question, index) => {
    const userAnswer = resultData.answers?.find(
      (a) => a.questionId === question.id,
    );
    const selectedOptionId = userAnswer ? userAnswer.selectedOptionId : null;

    const correctOptionIds =
      question.correctOptions?.map((opt) => opt.id) || [];

    const isUserCorrect =
      selectedOptionId && correctOptionIds.includes(selectedOptionId);

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
                {question.options.map((opt, optIndex) => {
                  const isThisSelected = opt.id === selectedOptionId;
                  const isThisCorrect = correctOptionIds.includes(opt.id);

                  // Xác định Style cho từng ô lựa chọn
                  let optionClass = "bg-[#eff4f7] border-transparent";
                  let checkIcon = null;

                  if (isThisCorrect && isThisSelected) {
                    // Chọn đúng
                    optionClass = "bg-[#e6f4ea] border-[#34a853]/40 border";
                    checkIcon = (
                      <div className="flex items-center gap-2 text-[#137333] font-bold text-xs uppercase tracking-wider">
                        <CheckCircle size={18} className="fill-current" />
                        CORRECT
                      </div>
                    );
                  } else if (isThisSelected && !isThisCorrect) {
                    // Chọn sai
                    optionClass = "bg-[#fce8e6] border-[#d93025]/40 border";
                    checkIcon = (
                      <div className="flex items-center gap-2 text-[#c5221f] font-bold text-xs uppercase tracking-wider">
                        <XCircle size={18} className="fill-current" />
                        YOUR CHOICE
                      </div>
                    );
                  } else if (isThisCorrect && !isThisSelected) {
                    optionClass = "bg-[#e6f4ea] border-[#34a853]/40 border";
                    checkIcon = (
                      <div className="flex items-center gap-2 text-[#137333] font-bold text-xs uppercase tracking-wider">
                        CORRECT ANSWER
                      </div>
                    );
                  }

                  const labelLetter = String.fromCharCode(65 + optIndex);

                  let badgeClass = "bg-[#dbe4e9] text-[#576065]";
                  if (isThisCorrect && isThisSelected)
                    badgeClass = "bg-[#34a853] text-white";
                  else if (isThisSelected && !isThisCorrect)
                    badgeClass = "bg-[#d93025] text-white";
                  else if (isThisCorrect && !isThisSelected)
                    badgeClass = "bg-[#34a853] text-white";

                  return (
                    <div
                      key={opt.id}
                      className={`p-4 md:p-5 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-2 ${optionClass}`}
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-8 h-8 shrink-0 rounded-full flex items-center justify-center text-sm font-bold ${badgeClass}`}
                        >
                          {labelLetter}
                        </div>
                        <span
                          className={`text-[#2b3437] ${isThisSelected ? "font-semibold" : ""}`}
                        >
                          {opt.content}
                        </span>
                      </div>
                      {checkIcon && (
                        <div className="ml-12 md:ml-0 self-start md:self-auto">
                          {checkIcon}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {question.explanation && (
                <div className="mt-8 pt-8 border-t border-[#e2e9ed]">
                  <p className="text-[#576065] text-sm italic leading-relaxed">
                    <strong
                      className={`${isUserCorrect ? "text-[#026880]" : "text-red-600"} not-italic font-bold`}
                    >
                      {isUserCorrect ? "Explanation:" : "Incorrect:"}
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
    <div className="bg-[#f7fafc] text-[#2b3437] font-['Inter'] min-h-screen selection:bg-[#94dffb] selection:text-[#005063] pb-20">
      {/* TopAppBar */}
      <header className="sticky top-0 w-full z-50 bg-[#f7fafc]/80 backdrop-blur-xl flex justify-between items-center px-4 md:px-8 py-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/dashboard")}
            className="text-[#026880] hover:opacity-70 transition-opacity flex items-center gap-2 font-medium"
          >
            <ArrowLeft size={20} />
            <span className="hidden sm:inline">Back to Dashboard</span>
          </button>
        </div>
        <div className="absolute left-1/2 -translate-x-1/2 text-center">
          <h1 className="text-xl font-bold tracking-tight text-[#026880] font-['Be_Vietnam_Pro']">
            The Serene Scholar
          </h1>
        </div>
        <div className="flex items-center gap-6">
          <Bell
            className="text-[#3f5659] cursor-pointer hover:text-[#026880] hidden sm:block"
            size={24}
          />
          <div className="w-8 h-8 rounded-full overflow-hidden bg-[#e2e9ed] flex items-center justify-center text-[#3f5659]">
            <User size={20} />
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 md:px-6 py-8 md:py-12 animate-[fadeIn_0.5s_ease-out]">
        {/* Test Header Section */}
        <section className="mb-12 md:mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-2xl">
            <span className="text-[#026880] font-semibold tracking-widest text-xs uppercase mb-3 block">
              RESULT DETAIL - STUDENT
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#2b3437] mb-4 font-['Be_Vietnam_Pro']">
              Exam: {testCode}
            </h2>
            <p className="text-[#576065] md:text-lg leading-relaxed max-w-xl">
              Đánh giá kết quả làm bài thi của bạn. Dưới đây là chi tiết đáp án
              bạn đã chọn đối chiếu với đáp án chuẩn.
            </p>
          </div>

          <div className="bg-white rounded-[2rem] p-8 flex flex-col items-center justify-center min-w-[200px] border border-[#aab3b8]/20 shadow-sm">
            <span className="text-[#576065] font-medium text-sm mb-1">
              Score
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-5xl font-black text-[#026880]">
                {resultData.score?.toFixed(1)}
              </span>
              <span className="text-xl text-[#737c80] font-bold">/10</span>
            </div>
            <div
              className={`mt-3 px-4 py-1 text-[10px] md:text-xs font-bold rounded-full uppercase tracking-wider ${rank.color}`}
            >
              {rank.label}
            </div>
          </div>
        </section>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 mb-12 md:mb-16">
          <div className="bg-[#eff4f7] p-5 md:p-6 rounded-2xl flex items-center gap-4">
            <div className="w-12 h-12 shrink-0 rounded-full bg-[#dbe4e9] flex items-center justify-center text-[#026880]">
              <Timer size={24} />
            </div>
            <div>
              <div className="text-[#576065] text-[10px] md:text-xs font-bold uppercase tracking-wider mb-1">
                TIME SPENT
              </div>
              <div className="text-[#2b3437] font-bold text-base md:text-lg">
                {timeSpent}
              </div>
            </div>
          </div>
          <div className="bg-[#eff4f7] p-5 md:p-6 rounded-2xl flex items-center gap-4">
            <div className="w-12 h-12 shrink-0 rounded-full bg-[#dbe4e9] flex items-center justify-center text-[#026880]">
              <CheckCircle size={24} />
            </div>
            <div>
              <div className="text-[#576065] text-[10px] md:text-xs font-bold uppercase tracking-wider mb-1">
                CORRECT ANSWERS
              </div>
              <div className="text-[#2b3437] font-bold text-base md:text-lg">
                {correctCount} / {totalQuestions}
              </div>
            </div>
          </div>
          <div className="bg-[#eff4f7] p-5 md:p-6 rounded-2xl flex items-center gap-4">
            <div className="w-12 h-12 shrink-0 rounded-full bg-[#dbe4e9] flex items-center justify-center text-[#026880]">
              <Activity size={24} />
            </div>
            <div>
              <div className="text-[#576065] text-[10px] md:text-xs font-bold uppercase tracking-wider mb-1">
                ACCURACY
              </div>
              <div className="text-[#2b3437] font-bold text-base md:text-lg">
                {accuracy}%
              </div>
            </div>
          </div>
        </div>

        {/* Questions List Render */}
        <div className="space-y-10 md:space-y-16">
          {correctAnswersData.length > 0 ? (
            correctAnswersData.map((question, index) =>
              renderQuestionDetail(question, index),
            )
          ) : (
            <p className="text-center text-gray-500 py-10">
              Không có dữ liệu câu hỏi.
            </p>
          )}
        </div>

        {/* Footer Actions */}
        <footer className="mt-16 md:mt-20 py-8 md:py-12 border-t border-[#dbe4e9] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-[#576065] text-xs md:text-sm text-center md:text-left">
            Thời gian nộp bài:{" "}
            <strong>
              {new Date(resultData.startTime).toLocaleString("vi-VN")}
            </strong>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <button className="flex justify-center items-center gap-2 px-8 py-3 rounded-full border-2 border-[#026880] text-[#026880] font-bold hover:bg-[#cee7ec] transition-colors w-full sm:w-auto">
              <Download size={18} />
              Download (PDF)
            </button>
            <button
              onClick={() => navigate("/dashboard")}
              className="flex justify-center items-center px-8 py-3 rounded-full bg-[#026880] text-white font-bold hover:shadow-lg shadow-[#026880]/30 transition-all hover:-translate-y-0.5 w-full sm:w-auto"
            >
              Back to Dashboard
            </button>
          </div>
        </footer>
      </main>

      {/* Floating Quick Navigation (Desktop only) */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 hidden xl:flex flex-col gap-3 p-4 bg-white/80 backdrop-blur-xl rounded-[2rem] border border-[#aab3b8]/20 shadow-2xl max-h-[80vh] overflow-y-auto custom-scrollbar">
        <div className="text-center mb-1 sticky top-0 bg-white/80 py-1">
          <span className="text-[10px] font-bold text-[#576065] uppercase tracking-widest">
            MAP
          </span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {correctAnswersData.map((q, idx) => {
            const userAnswer = resultData.answers?.find(
              (a) => a.questionId === q.id,
            );
            const correctOptionIds =
              q.correctOptions?.map((opt) => opt.id) || [];

            let mapBadgeClass = "bg-[#e2e9ed] text-[#737c80]"; // Chưa làm
            if (userAnswer) {
              if (correctOptionIds.includes(userAnswer.selectedOptionId)) {
                mapBadgeClass = "bg-[#34a853] text-white shadow-sm"; // Đúng
              } else {
                mapBadgeClass = "bg-[#d93025] text-white shadow-sm"; // Sai
              }
            }

            return (
              <a
                key={q.id}
                href={`#question-${idx + 1}`}
                className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold transition-transform hover:scale-110 ${mapBadgeClass}`}
              >
                {idx + 1}
              </a>
            );
          })}
        </div>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="mt-2 sticky bottom-0 w-8 h-8 mx-auto rounded-full bg-[#026880] text-white flex items-center justify-center hover:bg-[#005063] transition-colors shrink-0"
        >
          <ChevronUp size={20} />
        </button>
      </div>
    </div>
  );
};

export default ResultDetail;
