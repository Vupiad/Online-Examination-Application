import React from "react";
import { Users, Search, Plus, Filter, MoreVertical, BookOpen } from "lucide-react";

const ClassList = () => {
  return (
    <main className="p-8 font-['Inter'] bg-[#f7fafc] min-h-screen">
      <header className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-bold text-[#026880] font-['Be_Vietnam_Pro'] tracking-tight">
            Class List
          </h1>
          <p className="text-sm text-[#576065] mt-1">Manage your active classes and groups</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-[#026880] text-white rounded-xl font-bold shadow-lg shadow-[#026880]/20 hover:bg-[#005161] transition-all">
          <Plus size={18} /> Add New Class
        </button>
      </header>

      {/* Control Bar */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-grow">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#aab3b8]" size={18} />
          <input 
            type="text" 
            placeholder="Search classes by name or subject..."
            className="w-full pl-12 pr-4 py-3.5 bg-white border border-[#dbe4e9] rounded-2xl outline-none focus:ring-2 focus:ring-[#026880]/10 transition-all font-medium"
          />
        </div>
        <div className="flex gap-2">
           <button className="flex items-center gap-2 px-6 py-3.5 bg-white border border-[#dbe4e9] rounded-2xl outline-none font-bold text-[#576065] hover:bg-slate-50 transition-all">
              <Filter size={18} /> Filter
           </button>
        </div>
      </div>

      {/* Real Data Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { id: 1, name: "Advanced Calculus CS01", code: "MAT201", students: 45, status: "Active", nextExam: "Midterm (Oct 25)", bg: "bg-[#cee7ec]", progress: 65 },
          { id: 2, name: "Data Structures CS02", code: "COM302", students: 120, status: "Active", nextExam: "Quiz 3 (Oct 18)", bg: "bg-[#94dffb]", progress: 85 },
          { id: 3, name: "Software Engineering CS03", code: "SOF104", students: 85, status: "Active", nextExam: "Final Phase (Nov 01)", bg: "bg-slate-200", progress: 40 },
          { id: 4, name: "Database Systems", code: "DB102", students: 60, status: "Archived", nextExam: "Finished", bg: "bg-slate-100", progress: 100 },
        ].map(cls => (
           <div key={cls.id} className="bg-white rounded-3xl p-8 border border-[#dbe4e9] shadow-sm hover:shadow-xl transition-shadow group relative overflow-hidden">
               <div className="flex justify-between items-start mb-6">
                  <div className={`w-14 h-14 ${cls.bg} rounded-2xl flex items-center justify-center font-bold text-[#026880] text-xl`}>
                     {cls.code.substring(0,2)}
                  </div>
                  <button className="text-[#aab3b8] hover:text-[#2b3437] transition-colors"><MoreVertical size={20}/></button>
               </div>
               <h3 className="text-xl font-bold text-[#2b3437] font-['Be_Vietnam_Pro'] tracking-tight leading-tight mb-2">{cls.name}</h3>
               <p className="text-xs font-bold text-[#aab3b8] uppercase tracking-widest mb-6">Subject Code: {cls.code}</p>
               
               <div className="flex items-center gap-4 mb-6 py-4 border-y border-slate-50">
                   <div className="flex -space-x-2">
                       {Array.from({length: 4}).map((_, i) => (
                          <div key={i} className="w-8 h-8 rounded-full bg-slate-200 border-2 border-white flex items-center justify-center text-[10px] text-slate-500 font-bold">
                             {String.fromCharCode(65+i)}
                          </div>
                       ))}
                   </div>
                   <p className="text-xs font-bold text-slate-400 capitalize">+{cls.students} students</p>
               </div>

               <div className="flex justify-between items-end">
                   <div>
                       <p className="text-[10px] font-bold text-[#aab3b8] uppercase tracking-widest mb-1">Upcoming Exam</p>
                       <p className="text-sm font-bold text-[#026880]">{cls.nextExam}</p>
                   </div>
                   <span className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest border ${cls.status === 'Active' ? 'bg-[#cee7ec]/30 text-[#026880] border-[#026880]/10' : 'bg-slate-50 text-slate-400 border-slate-200'}`}>
                      {cls.status}
                   </span>
               </div>
           </div>
        ))}
      </div>
    </main>
  );
};

export default ClassList;
