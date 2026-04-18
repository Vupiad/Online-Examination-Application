import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Settings,
  Trash2,
  Copy,
  PlusCircle,
  Save,
  Eye,
  CheckCircle,
  Share2,
} from "lucide-react";
import api from "../../services/api";

const CreateTest = () => {
  const navigate = useNavigate();

  const [examData, setExamData] = useState({
    name: "",
    durationInMinutes: 60,
    maxAttempts: 1,
    startTime: "",
    endTime: "",
  });

  const [questions, setQuestions] = useState([
    {
      id: Date.now(),
      content: "",
      options: [
        { id: 1, content: "", isCorrect: false },
        { id: 2, content: "", isCorrect: false },
        { id: 3, content: "", isCorrect: false },
        { id: 4, content: "", isCorrect: false },
      ],
    },
  ]);

  const [isSaving, setIsSaving] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [createdExamCode, setCreatedExamCode] = useState("");
  const [passcode, setPasscode] = useState("");
  const [isUpdatingPasscode, setIsUpdatingPasscode] = useState(false);

  //  Xử lý Logic

  const handleExamDataChange = (e) => {
    const { name, value } = e.target;
    setExamData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddQuestion = () => {
    setQuestions((prev) => [
      ...prev,
      {
        id: Date.now(),
        content: "",
        options: [
          { id: 1, content: "", isCorrect: false },
          { id: 2, content: "", isCorrect: false },
          { id: 3, content: "", isCorrect: false },
          { id: 4, content: "", isCorrect: false },
        ],
      },
    ]);
  };

  const handleRemoveQuestion = (idToRemove) => {
    if (questions.length === 1)
      return alert("Bài thi phải có ít nhất 1 câu hỏi.");
    setQuestions((prev) => prev.filter((q) => q.id !== idToRemove));
  };

  const handleQuestionChange = (qIndex, newContent) => {
    const updated = [...questions];
    updated[qIndex].content = newContent;
    setQuestions(updated);
  };

  const handleOptionChange = (qIndex, oIndex, newContent) => {
    const updated = [...questions];
    updated[qIndex].options[oIndex].content = newContent;
    setQuestions(updated);
  };

  const handleMarkCorrectOption = (qIndex, oIndex) => {
    const updated = [...questions];
    updated[qIndex].options.forEach((opt) => (opt.isCorrect = false));
    updated[qIndex].options[oIndex].isCorrect = true;
    setQuestions(updated);
  };

  //  Xử lý API Gọi lên Backend

  const generateRandomExamCode = () => {
    return `SCH-${new Date().getFullYear()}-${Math.random().toString(36).substring(2, 5).toUpperCase()}`;
  };

  const handleSaveTest = async () => {
    if (!examData.name) return alert("Vui lòng nhập tên bài thi.");

    for (let i = 0; i < questions.length; i++) {
      if (!questions[i].content)
        return alert(`Vui lòng nhập nội dung cho câu hỏi số ${i + 1}`);
      const hasCorrect = questions[i].options.some((opt) => opt.isCorrect);
      if (!hasCorrect)
        return alert(`Vui lòng chọn 1 đáp án đúng cho câu hỏi số ${i + 1}`);
    }

    setIsSaving(true);
    try {
      const currentUser = JSON.parse(localStorage.getItem("user"));
      const ownerId = currentUser?.id || 1;
      const newExamCode = generateRandomExamCode();

      const payload = {
        ownerId: ownerId,
        examCode: newExamCode,
        name: examData.name,
        durationInMinutes: parseInt(examData.durationInMinutes),
        maxAttempts: parseInt(examData.maxAttempts),
        startTime: examData.startTime
          ? new Date(examData.startTime).toISOString()
          : null,
        endTime: examData.endTime
          ? new Date(examData.endTime).toISOString()
          : null,
        questions: questions.map((q) => ({
          content: q.content,
          options: q.options.map((opt) => ({
            content: opt.content,
            isCorrect: opt.isCorrect,
          })),
        })),
      };

      const res = await api.post("/api/exam/create", payload);
      setCreatedExamCode(res.data.examCode);
      setShowSuccessModal(true);
    } catch (err) {
      console.error("Lỗi lưu bài thi:", err);
      alert(
        "Đã xảy ra lỗi khi tạo bài thi. " + (err.response?.data?.message || ""),
      );
    } finally {
      setIsSaving(false);
    }
  };

  const handleUpdatePasscode = async () => {
    if (!passcode) return alert("Vui lòng nhập passcode để bảo mật bài thi.");

    setIsUpdatingPasscode(true);
    try {
      await api.post("/api/exam/update-passcode", {
        examCode: createdExamCode,
        passcode: passcode,
      });
      alert(
        "Thiết lập thành công! Học sinh đã có thể dùng mã và passcode để thi.",
      );
      navigate("/teacher/dashboard");
    } catch (err) {
      console.error("Lỗi cập nhật passcode:", err);
      alert("Lỗi khi thiết lập passcode.");
    } finally {
      setIsUpdatingPasscode(false);
    }
  };

  return (
    <div className="flex-1 min-w-0 flex flex-col relative bg-[#f7fafc] font-['Inter']">
      {/* --- SUCCESS MODAL OVERLAY --- */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#0b0f11]/40 backdrop-blur-sm animate-[fadeIn_0.3s_ease-out]">
          <div className="bg-white w-full max-w-md rounded-[2rem] shadow-2xl p-8 transform scale-100 transition-transform">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-[#94dffb] rounded-full flex items-center justify-center mb-6">
                <CheckCircle className="text-[#026880] w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold text-[#2b3437] mb-2 font-['Be_Vietnam_Pro']">
                Test Saved Successfully!
              </h3>
              <p className="text-[#4c6367] mb-8">
                Your test has been securely stored in the system.
              </p>

              <div className="w-full space-y-6">
                <div className="bg-[#e8eff2] p-4 rounded-2xl flex items-center justify-between border border-[#aab3b8]/30">
                  <div className="text-left">
                    <p className="text-[10px] font-bold text-[#737c80] uppercase tracking-widest mb-1">
                      Your Test Code
                    </p>
                    <p className="font-bold text-[#026880] text-lg font-['Be_Vietnam_Pro']">
                      {createdExamCode}
                    </p>
                  </div>
                  <button
                    onClick={() =>
                      navigator.clipboard.writeText(createdExamCode)
                    }
                    className="p-2 text-[#026880] hover:bg-[#026880]/10 rounded-full transition-colors"
                  >
                    <Copy size={20} />
                  </button>
                </div>
                <div className="text-left space-y-2">
                  <label className="text-xs font-bold text-[#737c80] uppercase tracking-wider ml-1">
                    Set Passcode (Access Code)
                  </label>
                  <input
                    type="text"
                    value={passcode}
                    onChange={(e) => setPasscode(e.target.value)}
                    className="w-full bg-[#e2e9ed] border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#026880] focus:bg-white transition-all outline-none"
                    placeholder="Enter code for students to join"
                  />
                </div>
              </div>

              <div className="w-full grid grid-cols-2 gap-3 mt-8">
                <button className="px-6 py-3.5 bg-[#cee7ec] text-[#005063] rounded-full font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
                  <Share2 size={18} /> Share code
                </button>
                <button
                  onClick={handleUpdatePasscode}
                  disabled={isUpdatingPasscode}
                  className="px-6 py-3.5 bg-[#026880] text-white rounded-full font-bold shadow-lg shadow-[#026880]/20 hover:bg-[#005b70] transition-all disabled:opacity-70"
                >
                  {isUpdatingPasscode ? "Saving..." : "Confirm & Close"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Builder Content */}
      <div className="flex-1 overflow-y-auto px-6 py-8 md:px-12 lg:px-24">
        {/* Settings Card */}
        <section className="max-w-4xl mx-auto mb-12">
          <div className="bg-white rounded-[2.5rem] p-8 shadow-sm">
            <h3 className="text-lg font-bold text-[#026880] mb-6 flex items-center gap-2 font-['Be_Vietnam_Pro']">
              <Settings size={20} /> Test Settings
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              <div className="md:col-span-5 space-y-2">
                <label className="text-xs font-bold text-[#737c80] uppercase tracking-wider ml-1">
                  Test Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={examData.name}
                  onChange={handleExamDataChange}
                  className="w-full bg-[#e2e9ed] border-none rounded-md px-4 py-3 focus:ring-2 focus:ring-[#026880] focus:bg-white transition-all outline-none"
                  placeholder="e.g. Final Term Exam - Mathematics"
                />
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-xs font-bold text-[#737c80] uppercase tracking-wider ml-1">
                  Duration (min)
                </label>
                <input
                  type="number"
                  name="durationInMinutes"
                  value={examData.durationInMinutes}
                  onChange={handleExamDataChange}
                  className="w-full bg-[#e2e9ed] border-none rounded-md px-4 py-3 focus:ring-2 focus:ring-[#026880] focus:bg-white transition-all outline-none"
                />
              </div>
              <div className="md:col-span-5 space-y-2">
                <label className="text-xs font-bold text-[#737c80] uppercase tracking-wider ml-1">
                  Time Window (Optional)
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="datetime-local"
                    name="startTime"
                    value={examData.startTime}
                    onChange={handleExamDataChange}
                    className="w-full bg-[#e2e9ed] border-none rounded-md px-4 py-3 focus:ring-2 focus:ring-[#026880] focus:bg-white transition-all outline-none text-xs"
                  />
                  <input
                    type="datetime-local"
                    name="endTime"
                    value={examData.endTime}
                    onChange={handleExamDataChange}
                    className="w-full bg-[#e2e9ed] border-none rounded-md px-4 py-3 focus:ring-2 focus:ring-[#026880] focus:bg-white transition-all outline-none text-xs"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Question Builder */}
        <section className="max-w-4xl mx-auto space-y-8 pb-32">
          {questions.map((q, qIndex) => (
            <div
              key={q.id}
              className="bg-white rounded-[2.5rem] shadow-sm relative overflow-hidden group"
            >
              {/* Highlight bar bên trái */}
              <div
                className={`absolute left-0 top-0 bottom-0 w-1 ${qIndex === 0 ? "bg-[#026880]" : "bg-[#aab3b8]/30"}`}
              ></div>

              <div className="p-8 md:p-12">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-6">
                    <span className="text-3xl font-light text-[#005b70]/40 font-['Be_Vietnam_Pro']">
                      {(qIndex + 1).toString().padStart(2, "0")}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleRemoveQuestion(q.id)}
                      className="p-2 text-[#737c80] hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={20} />
                    </button>
                    <button className="p-2 text-[#737c80] hover:text-[#026880] transition-colors">
                      <Copy size={20} />
                    </button>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-[#737c80] uppercase tracking-wider">
                      Question Content
                    </label>
                    <textarea
                      value={q.content}
                      onChange={(e) =>
                        handleQuestionChange(qIndex, e.target.value)
                      }
                      className="w-full bg-[#e2e9ed] border-none rounded-md px-4 py-3 focus:ring-2 focus:ring-[#026880] focus:bg-white transition-all resize-none font-['Inter'] leading-relaxed outline-none"
                      placeholder="Enter question here..."
                      rows="3"
                    ></textarea>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                    {q.options.map((opt, oIndex) => (
                      <div
                        key={opt.id}
                        className={`flex items-center gap-3 p-4 rounded-md transition-colors border ${opt.isCorrect ? "bg-[#94dffb]/20 border-[#026880]" : "bg-[#e8eff2] border-transparent hover:bg-[#e2e9ed]"}`}
                      >
                        <input
                          type="radio"
                          name={`correct_opt_${q.id}`}
                          checked={opt.isCorrect}
                          onChange={() =>
                            handleMarkCorrectOption(qIndex, oIndex)
                          }
                          className="w-5 h-5 text-[#026880] border-[#aab3b8] focus:ring-[#026880] bg-[#dbe4e9]"
                        />
                        <div className="flex-1">
                          <input
                            type="text"
                            value={opt.content}
                            onChange={(e) =>
                              handleOptionChange(qIndex, oIndex, e.target.value)
                            }
                            className="w-full bg-transparent border-none p-0 focus:ring-0 text-[#2b3437] outline-none"
                            placeholder={`Option ${String.fromCharCode(65 + oIndex)}`}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Nút thêm câu hỏi */}
          <button
            onClick={handleAddQuestion}
            className="w-full py-12 border-2 border-dashed border-[#aab3b8]/30 rounded-full flex flex-col items-center justify-center gap-4 text-[#737c80] hover:border-[#026880]/50 hover:text-[#026880] transition-all group"
          >
            <PlusCircle className="w-10 h-10 group-hover:scale-110 transition-transform" />
            <span className="font-bold font-['Be_Vietnam_Pro']">
              Add New Question
            </span>
          </button>
        </section>
      </div>

      {/* Sticky Footer Action */}
      <footer className="sticky bottom-0 left-0 right-0 p-6 bg-white/80 backdrop-blur-xl border-t border-[#e2e9ed] flex justify-center items-center z-40">
        <div className="max-w-4xl w-full flex justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <div className="px-4 py-2 bg-[#e2e9ed] rounded-full text-xs font-bold text-[#4c6367] uppercase tracking-widest">
              {questions.length} Questions
            </div>
          </div>
          <div className="flex gap-4">
            <button className="px-8 py-3 bg-[#cee7ec] text-[#005063] rounded-full font-semibold hover:opacity-90 transition-opacity font-['Be_Vietnam_Pro']">
              Preview
            </button>
            <button
              onClick={handleSaveTest}
              disabled={isSaving}
              className="px-10 py-3 bg-[#026880] text-white rounded-full font-bold shadow-lg shadow-[#026880]/20 flex items-center gap-2 hover:bg-[#005b70] transition-all disabled:opacity-70 font-['Be_Vietnam_Pro']"
            >
              <Save size={20} />
              {isSaving ? "Saving..." : "Save Test"}
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CreateTest;
