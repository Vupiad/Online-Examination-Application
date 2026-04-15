import React, { useState, useEffect } from "react";
import { 
  ArrowLeft, 
  Plus, 
  Trash2, 
  Check, 
  Save, 
  ChevronRight, 
  Image as ImageIcon,
  Type,
  List as ListIcon
} from "lucide-react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import api from "../../services/api";

const AddQuestions = () => {
  const navigate = useNavigate();
  const { examId } = useParams();
  const location = useLocation();
  const examData = location.state?.exam || { title: "Đề thi mới" };

  const [questions, setQuestions] = useState([
    {
      id: Date.now(),
      content: "",
      type: "SINGLE_CHOICE",
      options: [
        { content: "", isCorrect: true },
        { content: "", isCorrect: false }
      ]
    }
  ]);

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        id: Date.now(),
        content: "",
        type: "SINGLE_CHOICE",
        options: [
          { content: "", isCorrect: true },
          { content: "", isCorrect: false },
          { content: "", isCorrect: false },
          { content: "", isCorrect: false }
        ]
      }
    ]);
  };

  const removeQuestion = (id) => {
    if (questions.length > 1) {
      setQuestions(questions.filter(q => q.id !== id));
    }
  };

  const updateQuestion = (id, field, value) => {
    setQuestions(questions.map(q => q.id === id ? { ...q, [field]: value } : q));
  };

  const updateOption = (qId, oIdx, field, value) => {
    setQuestions(questions.map(q => {
      if (q.id === qId) {
        const newOptions = [...q.options];
        if (field === "isCorrect" && q.type === "SINGLE_CHOICE") {
          newOptions.forEach((o, i) => o.isCorrect = i === oIdx);
        } else {
          newOptions[oIdx] = { ...newOptions[oIdx], [field]: value };
        }
        return { ...q, options: newOptions };
      }
      return q;
    }));
  };

  const addOption = (qId) => {
    setQuestions(questions.map(q => {
      if (q.id === qId) {
        return { ...q, options: [...q.options, { content: "", isCorrect: false }] };
      }
      return q;
    }));
  };

  const handleSaveAll = async () => {
    try {
      // In a real flow, we'd update the existing exam with these questions
      // For now, let's just log and simulate success
      console.log("Saving questions for exam:", examId, questions);
      alert("Đã lưu danh sách câu hỏi thành công!");
      navigate("/teacher/dashboard");
    } catch (error) {
      alert("Lỗi khi lưu câu hỏi");
    }
  };

  return (
    <div className="bg-[#f8fafc] min-h-screen p-8">
      {/* Header */}
      <div className="max-w-5xl mx-auto mb-8 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate(-1)}
            className="p-2 bg-white rounded-lg shadow-sm border border-slate-200 text-slate-400 hover:text-slate-600 cursor-pointer"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-2xl font-bold m-0" style={{ color: 'var(--primary)' }}>Ngân hàng câu hỏi</h1>
            <p className="text-sm text-grey m-0">{examData.title}</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button 
            className="px-6 py-2.5 bg-white border border-slate-200 rounded-lg text-sm font-bold text-slate-600"
            onClick={() => navigate("/teacher/dashboard")}
          >
            Lưu nháp
          </button>
          <button 
            className="px-6 py-2.5 bg-[#006070] text-white border-none rounded-lg text-sm font-bold flex items-center gap-2 shadow-md shadow-[#006070]/20 hover:bg-[#004d5a]"
            onClick={handleSaveAll}
          >
            <Save size={18} /> Hoàn tất đề thi
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Sidebar Progress */}
        <div className="md:col-span-1">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 sticky top-8">
             <div className="flex items-center gap-4 mb-6 opacity-40">
                <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center font-bold text-sm text-white" style={{background: 'var(--success)'}}><Check size={16}/></div>
                <div>
                  <p className="text-xs font-bold m-0 text-slate-500">Bước 1</p>
                  <p className="text-[10px] text-slate-400 m-0">Thông tin chung</p>
                </div>
              </div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-8 h-8 rounded-full bg-[#006070] text-white flex items-center justify-center font-bold text-sm">2</div>
                <div>
                  <p className="text-xs font-bold m-0" style={{ color: 'var(--primary)' }}>Bước 2</p>
                  <p className="text-[10px] text-grey m-0">Ngân hàng câu hỏi</p>
                </div>
                <ChevronRight size={16} className="ml-auto text-slate-300" />
              </div>
              <div className="flex items-center gap-4 opacity-40">
                <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center font-bold text-sm">3</div>
                <div>
                  <p className="text-xs font-bold m-0 text-slate-500">Bước 3</p>
                  <p className="text-[10px] text-slate-400 m-0">Cấu hình bảo mật</p>
                </div>
              </div>
              
              <div className="mt-12 pt-8 border-t border-slate-100">
                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Tổng quan</h4>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs text-slate-500">Số câu hỏi:</span>
                  <span className="text-xs font-bold text-[#006070]">{questions.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-500">Tổng điểm:</span>
                  <span className="text-xs font-bold text-[#006070]">{questions.length * 1}.0</span>
                </div>
              </div>
          </div>
        </div>

        {/* Question List */}
        <div className="md:col-span-3 space-y-6">
          {questions.map((q, idx) => (
            <div key={q.id} className="question-item-card animate-fade-in" style={{animationDelay: `${idx * 0.1}s`}}>
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 bg-[#f0f9ff] text-[#0369a1] rounded-lg flex items-center justify-center font-bold">
                    {idx + 1}
                  </span>
                  <div className="flex gap-2">
                    <button 
                      className={`px-3 py-1 rounded-md text-[10px] font-bold border ${q.type === 'SINGLE_CHOICE' ? 'bg-[#006070] text-white border-[#006070]' : 'bg-white text-slate-400 border-slate-200'}`}
                      onClick={() => updateQuestion(q.id, 'type', 'SINGLE_CHOICE')}
                    >
                      Chọn một
                    </button>
                    <button 
                      className={`px-3 py-1 rounded-md text-[10px] font-bold border ${q.type === 'MULTI_CHOICE' ? 'bg-[#006070] text-white border-[#006070]' : 'bg-white text-slate-400 border-slate-200'}`}
                      onClick={() => updateQuestion(q.id, 'type', 'MULTI_CHOICE')}
                    >
                      Chọn nhiều
                    </button>
                  </div>
                </div>
                <button 
                  onClick={() => removeQuestion(q.id)}
                  className="p-2 text-slate-300 hover:text-red-500 bg-transparent border-none cursor-pointer transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </div>

              <div className="mb-6">
                <div className="relative">
                  <textarea 
                    className="w-full p-4 bg-[#f8fafc] border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-[#006070]/10 min-h-[100px] text-sm"
                    placeholder="Nhập nội dung câu hỏi..."
                    value={q.content}
                    onChange={(e) => updateQuestion(q.id, "content", e.target.value)}
                  ></textarea>
                  <button className="absolute right-4 bottom-4 p-2 bg-white rounded-lg border border-slate-200 text-slate-400 hover:text-[#006070]">
                    <ImageIcon size={16} />
                  </button>
                </div>
              </div>

              <div className="space-y-3 pl-8 relative">
                 <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-slate-100"></div>
                 {q.options.map((opt, oIdx) => (
                   <div key={oIdx} className="option-input-group">
                     <div 
                      className={`correct-indicator ${opt.isCorrect ? 'active' : ''}`}
                      onClick={() => updateOption(q.id, oIdx, "isCorrect", !opt.isCorrect)}
                     >
                       {opt.isCorrect && <Check size={12} />}
                     </div>
                     <input 
                      type="text" 
                      className="flex-1 p-2.5 bg-white border border-slate-200 rounded-lg text-sm outline-none focus:border-[#006070]"
                      placeholder={`Lựa chọn ${String.fromCharCode(65 + oIdx)}...`}
                      value={opt.content}
                      onChange={(e) => updateOption(q.id, oIdx, "content", e.target.value)}
                     />
                     {q.options.length > 2 && (
                       <button 
                        className="text-slate-300 hover:text-red-400 bg-transparent border-none cursor-pointer"
                        onClick={() => {
                          const newOpts = q.options.filter((_, i) => i !== oIdx);
                          updateQuestion(q.id, "options", newOpts);
                        }}
                       >
                         <Trash2 size={14} />
                       </button>
                     )}
                   </div>
                 ))}
                 <button 
                  className="flex items-center gap-2 text-xs font-bold text-[#006070] bg-transparent border-none cursor-pointer mt-4 hover:underline"
                  onClick={() => addOption(q.id)}
                 >
                   <Plus size={14} /> Thêm lựa chọn
                 </button>
              </div>
            </div>
          ))}

          <button 
            className="w-full py-8 border-2 border-dashed border-slate-200 rounded-2xl text-slate-400 hover:text-[#006070] hover:border-[#006070] transition-all bg-white/50 cursor-pointer flex flex-col items-center gap-2"
            onClick={addQuestion}
          >
            <div className="p-3 bg-white rounded-full shadow-sm">
              <Plus size={24} />
            </div>
            <span className="text-sm font-bold">Thêm câu hỏi mới</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddQuestions;
