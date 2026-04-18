import React, { useState, useEffect } from 'react';
import { 
  Library, 
  Search, 
  Plus, 
  Trash2, 
  Edit, 
  FileText, 
  Tag, 
  ChevronRight,
  Filter,
  CheckCircle2,
  Code
} from 'lucide-react';
import api from '../../services/api';

const QuestionBank = () => {
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("ALL");

  useEffect(() => {
    fetchBank();
  }, []);

  const fetchBank = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const res = await api.get(`/api/question-bank/owner/${user.id}`);
      
      if (!res.data || res.data.length === 0) {
         // Inject dummy data for demonstration purposes as requested by user
         setQuestions([
            { id: 101, type: "MULTIPLE_CHOICE", category: "Calculus", content: "What is the derivative of x^2?" },
            { id: 102, type: "CODE", category: "Data Structures", content: "Implement a Binary Search Tree insertion in C++." },
            { id: 103, type: "MULTIPLE_CHOICE", category: "Software Engineering", content: "Which of the following is NOT an Agile methodology?" },
            { id: 104, type: "ESSAY", category: "Philosophy", content: "Explain the concept of Utilitarianism." }
         ]);
      } else {
         setQuestions(res.data);
      }
      
    } catch (error) {
      console.error("Error fetching question bank:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this question from bank?")) return;
    try {
      await api.delete(`/api/question-bank/${id}`);
      setQuestions(questions.filter(q => q.id !== id));
    } catch (error) {
      console.error("Error deleting question:", error);
    }
  };

  const filteredQuestions = questions.filter(q => {
    const matchesSearch = q.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === "ALL" || q.type === filterType;
    return matchesSearch && matchesType;
  });

  return (
    <main className="p-8 font-['Inter'] bg-[#f7fafc] min-h-screen">
      <header className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-bold text-[#026880] font-['Be_Vietnam_Pro'] tracking-tight">Question Bank</h1>
          <p className="text-sm text-[#576065] mt-1">Manage your reusable collection of exam tasks</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-[#026880] text-white rounded-xl font-bold shadow-lg shadow-[#026880]/20 hover:bg-[#005161] transition-all">
          <Plus size={18} /> Add New Question
        </button>
      </header>

      {/* Control Bar */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-grow">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#aab3b8]" size={18} />
          <input 
            type="text" 
            placeholder="Search questions by content or category..."
            className="w-full pl-12 pr-4 py-3.5 bg-white border border-[#dbe4e9] rounded-2xl outline-none focus:ring-2 focus:ring-[#026880]/10 transition-all font-medium"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <select 
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-6 py-3.5 bg-white border border-[#dbe4e9] rounded-2xl outline-none font-bold text-[#026880] focus:ring-2 focus:ring-[#026880]/10"
          >
            <option value="ALL">All Types</option>
            <option value="MULTIPLE_CHOICE">Multiple Choice</option>
            <option value="ESSAY">Essay</option>
            <option value="CODE">Coding</option>
          </select>
        </div>
      </div>

      {/* Question List */}
      <div className="grid grid-cols-1 gap-6">
        {isLoading ? (
          <div className="text-center py-20 bg-white rounded-[2.5rem] border border-[#dbe4e9]">
             <Library size={48} className="mx-auto mb-4 text-[#026880] opacity-20 animate-pulse" />
             <p className="text-[#aab3b8] font-bold">Synchronizing your bank...</p>
          </div>
        ) : filteredQuestions.length > 0 ? (
          filteredQuestions.map((q) => (
            <div key={q.id} className="bg-white p-8 rounded-[2.5rem] border border-[#dbe4e9] shadow-sm hover:shadow-xl hover:shadow-[#026880]/5 transition-all group flex flex-col md:flex-row md:items-center gap-8">
               <div className="size-12 rounded-2xl bg-[#cee7ec] text-[#026880] flex items-center justify-center shrink-0">
                  {q.type === 'MULTIPLE_CHOICE' ? <CheckCircle2 size={24} /> : q.type === 'CODE' ? <Code size={24} /> : <FileText size={24} />}
               </div>
               
               <div className="flex-grow min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="px-3 py-1 bg-[#f1f5f9] text-[#64748b] rounded-full text-[10px] font-bold uppercase tracking-widest">{q.type.replace('_',' ')}</span>
                    <span className="flex items-center gap-1 text-[10px] font-bold text-[#aab3b8] uppercase tracking-widest">
                       <Tag size={12} /> {q.category || 'General'}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-[#2b3437] truncate">{q.content}</h3>
               </div>

               <div className="flex items-center gap-4 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-3 bg-[#f7fafc] text-[#64748b] hover:bg-[#cee7ec] hover:text-[#026880] rounded-xl transition-all">
                    <Edit size={18} />
                  </button>
                  <button 
                    onClick={() => handleDelete(q.id)}
                    className="p-3 bg-red-50 text-red-500 hover:bg-red-500 hover:text-white rounded-xl transition-all"
                  >
                    <Trash2 size={18} />
                  </button>
               </div>
            </div>
          ))
        ) : (
          <div className="text-center py-32 bg-white rounded-[2.5rem] border border-[#dbe4e9]">
             <Library size={64} className="mx-auto mb-6 text-[#026880] opacity-10" />
             <h3 className="text-xl font-bold text-[#2b3437] mb-2 font-['Be_Vietnam_Pro']">Your Bank is Empty</h3>
             <p className="text-[#576065] mb-8 max-w-sm mx-auto">Start building your question collection to easily create exams in the future.</p>
             <button className="px-10 py-4 bg-[#026880] text-white rounded-2xl font-bold hover:bg-[#005161] transition-all">
                Add Your First Question
             </button>
          </div>
        )}
      </div>
    </main>
  );
};

export default QuestionBank;
