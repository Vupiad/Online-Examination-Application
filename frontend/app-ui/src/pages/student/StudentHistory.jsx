import React, { useState, useEffect } from "react";
import { 
  Search, 
  Calendar, 
  Clock, 
  ChevronRight, 
  FileText, 
  TrendingUp, 
  BookOpen, 
  BookMarked,
  Download,
  Filter
} from "lucide-react";
import api from "../../services/api";

const StudentHistory = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const currentUser = JSON.parse(localStorage.getItem('user')) || { id: null, fullName: 'Student' };

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await api.get(`/api/exam/results/user/${currentUser.id}`);
        setResults(res.data);
      } catch (err) {
        console.error("Error fetching history:", err);
      } finally {
        setLoading(false);
      }
    };
    if (currentUser.id) fetchHistory();
  }, [currentUser.id]);

  const filteredResults = results.filter(r => 
    r.examName?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    r.examCode?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getIcon = (name) => {
    const n = name?.toLowerCase();
    if (n?.includes('calculus') || n?.includes('math')) return <TrendingUp size={20} className="text-[#026880]" />;
    if (n?.includes('english') || n?.includes('ielts')) return <BookMarked size={20} className="text-[#026880]" />;
    return <BookOpen size={20} className="text-[#026880]" />;
  };

  return (
    <div className="p-8 md:p-12 bg-[#f8fafc] min-h-screen font-['Inter']">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-extrabold text-slate-800 font-['Be_Vietnam_Pro'] tracking-tight mb-2">My Assessment Log</h1>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-[0.2em]">Detailed history of all your examination attempts</p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#026880] transition-colors" size={18} />
              <input 
                type="text" 
                placeholder="Search exams..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-white border border-slate-200 rounded-2xl py-3.5 pl-12 pr-6 outline-none focus:ring-4 focus:ring-[#026880]/5 focus:border-[#026880] transition-all w-64 shadow-sm"
              />
            </div>
            <button className="p-3.5 bg-white border border-slate-200 rounded-2xl text-slate-500 hover:text-[#026880] hover:bg-slate-50 transition-all shadow-sm">
              <Filter size={20} />
            </button>
          </div>
        </div>

        {/* Results Container */}
        <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden min-h-[600px] flex flex-col">
          {loading ? (
            <div className="flex-1 flex flex-col items-center justify-center text-slate-400 gap-4">
              <div className="size-12 border-4 border-[#026880]/10 border-t-[#026880] rounded-full animate-spin"></div>
              <p className="font-bold text-sm uppercase tracking-widest">Loading your achievements...</p>
            </div>
          ) : filteredResults.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100">
                    <th className="px-10 py-6 text-left text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Examination Details</th>
                    <th className="px-10 py-6 text-left text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Completion Date</th>
                    <th className="px-10 py-6 text-left text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Duration Taken</th>
                    <th className="px-10 py-6 text-left text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Attempt Efficiency</th>
                    <th className="px-10 py-6 text-right text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Performance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {filteredResults.map((result) => (
                    <tr key={result.id} className="group hover:bg-slate-50/50 transition-colors cursor-pointer">
                      <td className="px-10 py-8">
                        <div className="flex items-center gap-6">
                          <div className="size-14 bg-white rounded-[1.25rem] shadow-sm border border-slate-100 flex items-center justify-center group-hover:scale-110 group-hover:-rotate-3 transition-all duration-300">
                             {getIcon(result.examName)}
                          </div>
                          <div>
                            <p className="text-base font-bold text-slate-800 mb-1">{result.examName}</p>
                            <div className="flex items-center gap-3">
                              <span className="text-[10px] font-black bg-slate-100 text-slate-500 px-2 py-0.5 rounded uppercase tracking-widest">
                                Code: {result.examCode}
                              </span>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-10 py-8">
                        <div className="flex items-center gap-3 text-sm font-bold text-slate-500">
                          <Calendar size={16} className="text-[#aab3b8]" />
                          {new Date(result.submittedAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                        </div>
                      </td>
                      <td className="px-10 py-8">
                         <div className="flex items-center gap-3 text-sm font-bold text-slate-500">
                          <Clock size={16} className="text-[#aab3b8]" />
                          {Math.floor(result.timeTaken / 60)}m {result.timeTaken % 60}s
                        </div>
                      </td>
                      <td className="px-10 py-8">
                         <div className="flex items-center gap-2">
                           <div className="h-1.5 w-24 bg-slate-100 rounded-full overflow-hidden">
                             <div 
                               className="h-full bg-[#026880] rounded-full" 
                               style={{ width: `${(result.score / result.totalScore) * 100}%` }}
                             ></div>
                           </div>
                           <span className="text-[10px] font-bold text-slate-400">{Math.round((result.score / result.totalScore) * 100)}%</span>
                         </div>
                      </td>
                      <td className="px-10 py-8 text-right">
                        <div className="inline-flex items-center gap-6">
                           <div className="text-right">
                             <p className="text-2xl font-black text-[#026880] font-['Be_Vietnam_Pro'] leading-none mb-1">{result.score.toFixed(1)}</p>
                             <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Final Score</p>
                           </div>
                           <button className="p-3 text-slate-300 hover:text-[#026880] transition-colors">
                              <ChevronRight size={20} />
                           </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-20">
              <div className="size-24 bg-slate-50 rounded-full flex items-center justify-center mb-8 text-slate-200">
                <FileText size={48} />
              </div>
              <h3 className="text-xl font-bold text-slate-700 mb-2 font-['Be_Vietnam_Pro']">No results found</h3>
              <p className="text-slate-400 max-w-xs mx-auto">
                We couldn't find any examination attempts matching your search or in your history.
              </p>
            </div>
          )}
          
          {/* Footer of the log */}
          {!loading && filteredResults.length > 0 && (
            <div className="mt-auto px-10 py-6 bg-slate-50/50 border-t border-slate-100 flex justify-between items-center">
               <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                 Showing {filteredResults.length} of {results.length} assessment attempts
               </p>
               <button className="flex items-center gap-2 px-6 py-2 bg-[#026880] text-white rounded-xl text-xs font-bold hover:bg-[#005b70] transition-all shadow-lg shadow-[#026880]/10">
                 <Download size={14} /> Export Report
               </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentHistory;
