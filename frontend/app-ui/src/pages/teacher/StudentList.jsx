import React, { useEffect, useState } from "react";
import { Search, Filter, Users, Mail, GraduationCap, ChevronRight } from "lucide-react";
import api from "../../services/api";

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const classesRes = await api.get("/api/users/classes");
        setClasses(classesRes.data);
        
        const studentsRes = await api.get("/api/users/students");
        setStudents(studentsRes.data);
      } catch (err) {
        console.error("Error fetching student data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchInitialData();
  }, []);

  const handleClassChange = async (className) => {
    setSelectedClass(className);
    setLoading(true);
    try {
      const res = await api.get("/api/users/students", { params: { className } });
      setStudents(res.data);
    } catch (err) {
      console.error("Error filtering by class:", err);
    } finally {
      setLoading(false);
    }
  };

  const filteredStudents = students.filter(s => 
    s.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex-1 min-w-0 bg-[#f7fafc] font-['Inter']">
       <header className="px-10 py-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
             <div>
                <h1 className="text-3xl font-bold text-[#026880] font-['Be_Vietnam_Pro'] tracking-tight">
                   Student Directory
                </h1>
                <p className="text-[#576065] mt-1">Manage and monitor students across all classes</p>
             </div>
             <div className="flex items-center gap-3">
                <div className="bg-white p-1 rounded-2xl border border-[#dbe4e9] flex items-center">
                   <button 
                     onClick={() => handleClassChange("")}
                     className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${!selectedClass ? "bg-[#026880] text-white shadow-lg shadow-[#026880]/10" : "text-[#737c80] hover:bg-[#f7fafc]"}`}
                   >
                     All Classes
                   </button>
                   {classes.map(c => (
                      <button 
                        key={c}
                        onClick={() => handleClassChange(c)}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${selectedClass === c ? "bg-[#026880] text-white shadow-lg shadow-[#026880]/10" : "text-[#737c80] hover:bg-[#f7fafc]"}`}
                      >
                        {c}
                      </button>
                   ))}
                </div>
             </div>
          </div>
       </header>

       <main className="px-10 pb-10">
          <div className="bg-white rounded-[2.5rem] border border-[#dbe4e9] shadow-sm overflow-hidden">
             <div className="p-8 border-b border-[#f0f4f7] flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="relative w-full md:w-96">
                   <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#aab3b8]" />
                   <input 
                      type="text" 
                      placeholder="Search by name or email..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full bg-[#f7fafc] border border-[#dbe4e9] rounded-2xl pl-12 pr-4 py-3 outline-none focus:ring-2 focus:ring-[#026880]/20 transition-all font-medium"
                   />
                </div>
                <div className="flex items-center gap-6 text-[#576065]">
                   <div className="flex items-center gap-2">
                      <Users size={18} className="text-[#026880]" />
                      <span className="text-sm font-bold">{filteredStudents.length} Students</span>
                   </div>
                </div>
             </div>

             {loading ? (
                <div className="p-20 flex flex-col items-center justify-center text-[#aab3b8]">
                   <div className="size-12 rounded-full border-4 border-[#026880]/10 border-t-[#026880] animate-spin mb-4" />
                   <p className="font-bold uppercase tracking-widest text-[10px]">Loading students...</p>
                </div>
             ) : (
                <div className="overflow-x-auto">
                   <table className="w-full">
                      <thead>
                         <tr className="bg-[#f7fafc] text-left">
                            <th className="px-8 py-4 text-[10px] font-bold text-[#576065] uppercase tracking-widest border-b border-[#f0f4f7]">Student Profile</th>
                            <th className="px-8 py-4 text-[10px] font-bold text-[#576065] uppercase tracking-widest border-b border-[#f0f4f7]">Classroom</th>
                            <th className="px-8 py-4 text-[10px] font-bold text-[#576065] uppercase tracking-widest border-b border-[#f0f4f7]">Contact</th>
                            <th className="px-8 py-4 text-[10px] font-bold text-[#576065] uppercase tracking-widest border-b border-[#f0f4f7]">Registration</th>
                            <th className="px-8 py-4 text-[10px] font-bold text-[#576065] uppercase tracking-widest border-b border-[#f0f4f7]">Actions</th>
                         </tr>
                      </thead>
                      <tbody className="divide-y divide-[#f0f4f7]">
                         {filteredStudents.map(student => (
                            <tr key={student.id} className="hover:bg-[#f7fafc]/50 transition-colors group">
                               <td className="px-8 py-5">
                                  <div className="flex items-center gap-4">
                                     <div className="size-10 rounded-full bg-[#cee7ec] flex items-center justify-center text-[#026880] font-bold border border-[#026880]/10">
                                        {student.fullName?.charAt(0)}
                                     </div>
                                     <div>
                                        <p className="font-bold text-[#2b3437]">{student.fullName}</p>
                                        <p className="text-[10px] text-[#aab3b8] uppercase font-bold tracking-widest">ID: {student.username}</p>
                                     </div>
                                  </div>
                               </td>
                               <td className="px-8 py-5">
                                  <div className="flex items-center gap-2 px-3 py-1 bg-[#f7fafc] border border-[#dbe4e9] rounded-full w-fit">
                                     <GraduationCap size={14} className="text-[#026880]" />
                                     <span className="text-xs font-bold text-[#026880]">{student.className || "No Class"}</span>
                                  </div>
                               </td>
                               <td className="px-8 py-5">
                                  <div className="flex items-center gap-2 text-[#576065]">
                                     <Mail size={14} />
                                     <span className="text-sm font-medium">{student.email || "N/A"}</span>
                                  </div>
                               </td>
                               <td className="px-8 py-5">
                                  <span className="text-xs font-medium text-[#737c80]">2026-04-18</span>
                               </td>
                               <td className="px-8 py-5">
                                  <button className="p-2 rounded-xl text-[#aab3b8] hover:bg-[#026880] hover:text-white transition-all shadow-sm">
                                     <ChevronRight size={18} />
                                  </button>
                               </td>
                            </tr>
                         ))}
                      </tbody>
                   </table>
                   {filteredStudents.length === 0 && (
                      <div className="p-20 text-center">
                         <Users size={48} className="mx-auto text-[#dbe4e9] mb-4" />
                         <p className="text-[#aab3b8] font-medium">No students found matching your criteria.</p>
                      </div>
                   )}
                </div>
             )}
          </div>
       </main>
    </div>
  );
};

export default StudentList;
