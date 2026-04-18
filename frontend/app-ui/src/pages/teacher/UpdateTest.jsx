import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Settings,
  Trash2,
  Copy,
  PlusCircle,
  Save,
  CheckCircle,
  Share2,
  Loader2,
  ArrowLeft
} from "lucide-react";
import api from "../../services/api";
import { QuestionTypeSelector } from "../../components/teacher/QuestionTypeSelector";
import { EssayQuestion } from "../../components/teacher/EssayQuestion";
import { CodeQuestion } from "../../components/teacher/CodeQuestion";

const UpdateTest = () => {
  const { examCode } = useParams();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [examData, setExamData] = useState({
    name: "",
    durationInMinutes: 60,
    maxAttempts: 1,
    startTime: "",
    endTime: "",
  });

  const [questions, setQuestions] = useState([]);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const fetchExam = async () => {
      try {
        const currentUser = JSON.parse(localStorage.getItem('user'));
        const res = await api.get(`/api/exam/teacher/${examCode}?ownerId=${currentUser.id}`);
        const data = res.data;
        
        setExamData({
          name: data.name,
          durationInMinutes: data.durationInMinutes,
          maxAttempts: data.maxAttempts || 1,
          startTime: data.startTime ? data.startTime.substring(0, 16) : "",
          endTime: data.endTime ? data.endTime.substring(0, 16) : "",
        });

        // Map backend questions to frontend state format
        const mappedQuestions = (data.questions || []).map(q => ({
          id: q.questionId,
          type: q.type,
          content: q.content,
          score: q.score,
          options: q.options || [],
          testCases: q.testCases || [],
          starterCode: q.starterCode || "",
          language: q.language || "Python"
        }));
        setQuestions(mappedQuestions);
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching exam:", err);
        alert("Failed to load exam data.");
        navigate("/teacher/dashboard");
      }
    };
    fetchExam();
  }, [examCode, navigate]);

  const handleExamDataChange = (e) => {
    const { name, value } = e.target;
    setExamData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdateQuestion = (index, updatedQ) => {
    const newQs = [...questions];
    newQs[index] = updatedQ;
    setQuestions(newQs);
  };

  const handleAddQuestion = (type = "MULTIPLE_CHOICE") => {
    const newQuestion = {
      id: Date.now(),
      type: type,
      content: "",
      score: type === "CODE" ? 20.0 : 1.0,
      options: type === "MULTIPLE_CHOICE" ? [
        { id: Math.random(), content: "", isCorrect: false },
        { id: Math.random(), content: "", isCorrect: false },
        { id: Math.random(), content: "", isCorrect: false },
        { id: Math.random(), content: "", isCorrect: false },
      ] : [],
      testCases: type === "CODE" ? [] : [],
      starterCode: "",
      language: "Python",
    };
    setQuestions((prev) => [...prev, newQuestion]);
  };

  const handleRemoveQuestion = (idToRemove) => {
    if (questions.length === 1) return alert("Test must have at least 1 question.");
    setQuestions((prev) => prev.filter((q) => q.id !== idToRemove));
  };

  const handleSaveUpdate = async () => {
    if (!examData.name) return alert("Please enter exam name.");
    if (!examData.name) return alert("Vui lòng nhập tên bài thi.");

    if (examData.startTime && examData.endTime) {
      const start = new Date(examData.startTime);
      const end = new Date(examData.endTime);
      const now = new Date();

      if (start < now) {
          return alert("Thời gian bắt đầu không được ở quá khứ.");
      }
      if (start >= end) {
          return alert("Thời gian bắt đầu phải trước thời gian kết thúc.");
      }
    }

    for (let i = 0; i < questions.length; i++) {
        const q = questions[i];
        if (!q.content) return alert(`Vui lòng nhập nội dung cho câu hỏi số ${i + 1}`);
        if (q.type === "MULTIPLE_CHOICE") {
            const hasCorrect = q.options.some((opt) => opt.isCorrect);
            if (!hasCorrect) return alert(`Vui lòng chọn 1 đáp án đúng cho câu hỏi số ${i + 1}`);
        }
    }

    setIsSaving(true);
    try {
      const currentUser = JSON.parse(localStorage.getItem("user"));
      const ownerId = currentUser?.id || 1;

      const payload = {
        ownerId: ownerId,
        examCode: examCode,
        name: examData.name,
        durationInMinutes: parseInt(examData.durationInMinutes),
        maxAttempts: parseInt(examData.maxAttempts),
        startTime: examData.startTime ? new Date(examData.startTime).toISOString() : null,
        endTime: examData.endTime ? new Date(examData.endTime).toISOString() : null,
        questions: questions.map((q) => ({
          questionId: typeof q.id === 'number' && q.id > 1000000000000 ? null : q.id, // If it's a timestamp Date.now(), it's new
          type: q.type,
          content: q.content,
          score: q.score,
          starterCode: q.starterCode,
          options: q.type === "MULTIPLE_CHOICE" ? q.options.map((opt) => ({
            id: typeof opt.id === 'number' && opt.id > 1000000000000 ? null : opt.id,
            content: opt.content,
            isCorrect: opt.isCorrect,
          })) : [],
          testCases: q.type === "CODE" ? (q.testCases || []).map(tc => ({
            id: typeof tc.id === 'number' && tc.id > 1000000000000 ? null : tc.id,
            input: tc.input,
            expectedOutput: tc.expectedOutput,
            isHidden: tc.isHidden
          })) : [],
        })),
      };

      await api.put("/api/exam/update", payload);
      alert("Exam updated successfully!");
      navigate("/teacher/dashboard");
    } catch (err) {
      console.error("Error updating exam:", err);
      alert("Failed to update exam.");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f7fafc]">
        <Loader2 className="animate-spin text-[#026880]" size={48} />
      </div>
    );
  }

  return (
    <div className="flex-1 min-w-0 flex flex-col relative bg-[#f7fafc] font-['Inter']">
      {/* Header Action Bar */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-[#dbe4e9] px-8 py-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-[#cee7ec] rounded-full transition-colors text-[#026880]">
            <ArrowLeft size={24} />
          </button>
          <div>
            <h1 className="text-xl font-bold text-[#026880] font-['Be_Vietnam_Pro'] tracking-tight">Edit Examination</h1>
            <p className="text-[10px] font-bold text-[#aab3b8] uppercase tracking-widest">CODE: {examCode}</p>
          </div>
        </div>
        <div className="flex gap-4">
          <button
            onClick={handleSaveUpdate}
            disabled={isSaving}
            className="px-8 py-2.5 bg-[#026880] text-white rounded-xl font-bold shadow-lg shadow-[#026880]/20 hover:scale-105 transition-all flex items-center gap-2 disabled:opacity-70"
          >
            {isSaving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
            {isSaving ? "Saving Changes..." : "Save Changes"}
          </button>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto px-6 py-8 md:px-12 lg:px-24">
        {/* Settings Card */}
        <section className="max-w-4xl mx-auto mb-12">
          <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-[#aab3b8]/10">
            <h3 className="text-lg font-bold text-[#026880] mb-6 flex items-center gap-2 font-['Be_Vietnam_Pro']">
              <Settings size={20} /> General Settings
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              <div className="md:col-span-12 space-y-2">
                <label className="text-xs font-bold text-[#737c80] uppercase tracking-wider ml-1">Test Name</label>
                <input
                  type="text"
                  name="name"
                  value={examData.name}
                  onChange={handleExamDataChange}
                  className="w-full bg-[#f7fafc] border border-[#dbe4e9] rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#026880] focus:bg-white transition-all outline-none font-medium"
                />
              </div>
              <div className="md:col-span-3 space-y-2">
                <label className="text-xs font-bold text-[#737c80] uppercase tracking-wider ml-1">Duration (min)</label>
                <input
                  type="number"
                  name="durationInMinutes"
                  value={examData.durationInMinutes}
                  onChange={handleExamDataChange}
                  className="w-full bg-[#f7fafc] border border-[#dbe4e9] rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#026880]/10 outline-none"
                />
              </div>
              <div className="md:col-span-3 space-y-2">
                <label className="text-xs font-bold text-[#737c80] uppercase tracking-wider ml-1">Max Attempts</label>
                <input
                  type="number"
                  name="maxAttempts"
                  value={examData.maxAttempts}
                  onChange={handleExamDataChange}
                  className="w-full bg-[#f7fafc] border border-[#dbe4e9] rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#026880]/10 outline-none"
                />
              </div>
              <div className="md:col-span-3 space-y-2">
                <label className="text-xs font-bold text-[#737c80] uppercase tracking-wider ml-1">Start Time</label>
                <input
                  type="datetime-local"
                  name="startTime"
                  value={examData.startTime}
                  onChange={handleExamDataChange}
                  className="w-full bg-[#f7fafc] border border-[#dbe4e9] rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#026880]/10 outline-none"
                />
              </div>
              <div className="md:col-span-3 space-y-2">
                <label className="text-xs font-bold text-[#737c80] uppercase tracking-wider ml-1">End Time</label>
                 <input
                  type="datetime-local"
                  name="endTime"
                  value={examData.endTime}
                  onChange={handleExamDataChange}
                  className="w-full bg-[#f7fafc] border border-[#dbe4e9] rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#026880]/10 outline-none"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Questions Section */}
        <section className="max-w-4xl mx-auto space-y-8 pb-32">
          {questions.map((q, qIndex) => (
             <div key={q.id}>
                {q.type === "MULTIPLE_CHOICE" && (
                   <div className="bg-white rounded-[2.5rem] shadow-sm relative overflow-hidden group mb-8 border border-[#aab3b8]/10">
                      <div className="p-8 md:p-12">
                         <div className="flex justify-between items-start mb-6">
                            <div className="flex items-center gap-6">
                               <span className="text-3xl font-light text-[#026880]/30 font-['Be_Vietnam_Pro']">{(qIndex+1).toString().padStart(2, '0')}</span>
                               <span className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-[#cee7ec] text-[#026880]">Multiple Choice</span>
                            </div>
                            <button onClick={() => handleRemoveQuestion(q.id)} className="p-2 text-[#aab3b8] hover:text-red-500 transition-colors"><Trash2 size={20}/></button>
                         </div>
                         <div className="space-y-6">
                            <textarea 
                               value={q.content}
                               onChange={(e) => handleUpdateQuestion(qIndex, {...q, content: e.target.value})}
                               className="w-full bg-[#f7fafc] border-none rounded-2xl p-6 focus:ring-2 focus:ring-[#026880]/10 outline-none font-medium text-lg leading-relaxed"
                            />
                            {/* Simplified Option mapping for brevity in this update */}
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {q.options.map((opt, oIndex) => (
                                   <div key={oIndex} className={`flex items-center gap-3 p-4 rounded-xl border ${opt.isCorrect ? "bg-[#cee7ec] border-[#026880]/20" : "bg-[#f7fafc] border-transparent"}`}>
                                      <input 
                                        type="radio" 
                                        readOnly
                                        checked={opt.isCorrect} 
                                        onClick={(e) => {
                                           e.preventDefault();
                                           const newOpts = [...q.options];
                                           newOpts[oIndex].isCorrect = !newOpts[oIndex].isCorrect;
                                           handleUpdateQuestion(qIndex, {...q, options: newOpts});
                                        }}
                                        className="w-5 h-5 text-[#026880] border-[#aab3b8] bg-[#e2e9ed]/50 focus:ring-[#026880] cursor-pointer"
                                      />
                                      <input 
                                        type="text" 
                                        value={opt.content}
                                         onChange={(e) => {
                                           const newOpts = [...q.options];
                                           newOpts[oIndex].content = e.target.value;
                                           handleUpdateQuestion(qIndex, {...q, options: newOpts});
                                        }}
                                        className="bg-transparent border-none flex-1 outline-none font-medium"
                                      />
                                   </div>
                                ))}
                             </div>
                         </div>
                      </div>
                   </div>
                )}
                {q.type === "ESSAY" && (
                   <EssayQuestion 
                      index={qIndex + 1} 
                      question={q} 
                      onChange={(updated) => handleUpdateQuestion(qIndex, updated)}
                      onDelete={() => handleRemoveQuestion(q.id)}
                   />
                )}
                {q.type === "CODE" && (
                   <CodeQuestion 
                      index={qIndex + 1} 
                      question={q} 
                      onChange={(updated) => handleUpdateQuestion(qIndex, updated)}
                      onDelete={() => handleRemoveQuestion(q.id)}
                   />
                )}
             </div>
          ))}

          <div className="flex justify-center gap-4 mt-12 py-12 border-t-2 border-dashed border-[#dbe4e9]">
             <button onClick={() => handleAddQuestion("MULTIPLE_CHOICE")} className="px-6 py-3 bg-white text-[#026880] rounded-full font-bold shadow-sm border border-[#aab3b8]/20 flex items-center gap-2 hover:bg-[#f7fafc] transition-all"><PlusCircle size={18}/> Add Multiple Choice</button>
             <button onClick={() => handleAddQuestion("ESSAY")} className="px-6 py-3 bg-white text-[#026880] rounded-full font-bold shadow-sm border border-[#aab3b8]/20 flex items-center gap-2 hover:bg-[#f7fafc] transition-all"><PlusCircle size={18}/> Add Essay</button>
             <button onClick={() => handleAddQuestion("CODE")} className="px-6 py-3 bg-[#026880] text-white rounded-full font-bold shadow-lg shadow-[#026880]/20 flex items-center gap-2 hover:opacity-90 transition-all"><PlusCircle size={18}/> Add Code</button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default UpdateTest;
