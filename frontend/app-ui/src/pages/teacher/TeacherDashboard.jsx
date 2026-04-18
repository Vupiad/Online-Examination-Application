import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  BarChart3, 
  MoreVertical,
  UserCheck,
  CheckCircle2,
  Lightbulb,
  Bell,
  Search,
  Filter,
  Trash2,
  Edit,
  Share2,
  ExternalLink
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../services/api';

const TeacherDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    openExamsCount: 0,
    studentsTestingCount: 0,
    completionRateToday: 0
  });

  const [exams, setExams] = useState([]);
  const [activeMenu, setActiveMenu] = useState(null);
  const [notifications, setNotifications] = useState([]);

  const fetchData = async () => {
    try {
      const statsRes = await api.get('/api/exam/stats');
      setStats(statsRes.data);
      const examsRes = await api.get('/api/exam');
      setExams(examsRes.data);
      
      const currentUser = JSON.parse(localStorage.getItem("user"));
      const notifRes = await api.get(`/api/notifications/user/${currentUser.id}`);
      setNotifications(notifRes.data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDeleteExam = async (examCode) => {
    if (!window.confirm("Are you sure you want to delete this exam? This action cannot be undone.")) return;
    
    try {
      const currentUser = JSON.parse(localStorage.getItem("user"));
      await api.delete(`/api/exam/delete?examCode=${examCode}&ownerId=${currentUser.id}`);
      alert("Exam deleted successfully.");
      fetchData();
    } catch (err) {
      console.error("Error deleting exam:", err);
      alert("Failed to delete exam.");
    }
  };

  const handleCopyLink = (examCode) => {
    const baseUrl = window.location.origin;
    const shareLink = `${baseUrl}/take-test?code=${examCode}`;
    navigator.clipboard.writeText(shareLink);
    alert("Share link copied to clipboard!");
    setActiveMenu(null);
  };

  return (
    <main className="p-10 font-['Inter'] bg-[#f7fafc] min-h-screen">
      {/* Header */}
      <header className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-bold text-[#026880] font-['Be_Vietnam_Pro'] tracking-tight">Teacher Dashboard</h1>
          <p className="text-sm text-[#576065] mt-1">Overview of your current examination activities</p>
        </div>
        <div className="flex items-center gap-5 relative">
          <div 
             className="p-2.5 bg-white rounded-2xl shadow-sm cursor-pointer relative border border-[#dbe4e9] hover:bg-slate-50 transition-colors"
             onClick={() => setActiveMenu(activeMenu === 'notifications' ? null : 'notifications')}
          >
            <Bell size={20} className="text-[#576065]" />
            {notifications.filter(num => !num.isRead).length > 0 && (
               <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            )}
          </div>
          
          {/* Notification Dropdown */}
          {activeMenu === 'notifications' && (
             <div className="absolute top-full right-52 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-[#dbe4e9] z-50 overflow-hidden">
                <div className="p-4 border-b border-[#dbe4e9] flex justify-between items-center bg-[#f7fafc]">
                   <span className="font-bold text-[#2b3437] text-sm">Notifications</span>
                   <button className="text-[10px] uppercase tracking-widest text-[#026880] font-bold hover:text-[#005161]">Mark all as read</button>
                </div>
                <div className="max-h-[350px] overflow-y-auto custom-scrollbar">
                   {notifications.length > 0 ? notifications.map((n) => (
                       <div key={n.id} className={`p-4 border-b border-slate-50 hover:bg-slate-50 cursor-pointer transition-colors ${!n.isRead ? 'bg-[#cee7ec]/20' : ''}`}>
                          <p className={`text-sm font-bold ${!n.isRead ? 'text-[#026880]' : 'text-[#2b3437]'}`}>{n.title}</p>
                          <p className="text-xs text-[#576065] mt-1.5 leading-relaxed">{n.message}</p>
                          <p className="text-[10px] text-[#aab3b8] mt-2 font-bold uppercase tracking-widest">{new Date(n.createdAt).toLocaleString('en-GB')}</p>
                       </div>
                   )) : (
                       <div className="p-8 text-center text-[#aab3b8]">
                          <Bell size={24} className="mx-auto mb-2 opacity-30" />
                          <p className="text-xs font-bold uppercase tracking-widest">No notifications</p>
                       </div>
                   )}
                </div>
             </div>
          )}

          <div className="flex items-center gap-3 bg-white p-1.5 pl-5 rounded-3xl shadow-sm border border-[#dbe4e9]">
            <div className="text-right">
              <p className="text-xs font-bold text-[#2b3437]">Prof. An Nguyen</p>
              <p className="text-[10px] text-[#aab3b8] uppercase font-bold tracking-widest">Senior Lecturer</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-[#cee7ec] flex items-center justify-center text-[#026880] font-bold border border-[#026880]/10">
              AN
            </div>
          </div>
        </div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
        <div className="bg-white p-8 rounded-[2.5rem] border border-[#dbe4e9] shadow-sm flex items-center gap-6 group hover:shadow-xl hover:shadow-[#026880]/5 transition-all duration-300">
          <div className="size-14 rounded-2xl bg-[#cee7ec] text-[#026880] flex items-center justify-center group-hover:scale-110 transition-transform">
            <FileText size={28} />
          </div>
          <div>
            <p className="text-[10px] text-[#aab3b8] font-bold uppercase tracking-[0.2em] mb-1">Active Exams</p>
            <h2 className="text-3xl font-bold text-[#2b3437]">{stats.openExamsCount}</h2>
          </div>
        </div>
        <div className="bg-white p-8 rounded-[2.5rem] border border-[#dbe4e9] shadow-sm flex items-center gap-6 group hover:shadow-xl hover:shadow-green-600/5 transition-all duration-300">
          <div className="size-14 rounded-2xl bg-green-50 text-green-600 flex items-center justify-center group-hover:scale-110 transition-transform">
            <UserCheck size={28} />
          </div>
          <div>
            <p className="text-[10px] text-[#aab3b8] font-bold uppercase tracking-[0.2em] mb-1">Testing Now</p>
            <h2 className="text-3xl font-bold text-[#2b3437]">{stats.studentsTestingCount}</h2>
          </div>
        </div>
        <div className="bg-white p-8 rounded-[2.5rem] border border-[#dbe4e9] shadow-sm flex items-center gap-6 group hover:shadow-xl hover:shadow-purple-600/5 transition-all duration-300">
          <div className="size-14 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform">
            <CheckCircle2 size={28} />
          </div>
          <div>
            <p className="text-[10px] text-[#aab3b8] font-bold uppercase tracking-[0.2em] mb-1">Completion Rate</p>
            <h2 className="text-3xl font-bold text-[#2b3437]">{stats.completionRateToday}%</h2>
          </div>
        </div>
      </div>

      {/* Exam Table Section */}
      <section className="bg-white rounded-[2.5rem] border border-[#dbe4e9] shadow-sm overflow-hidden mb-10 overflow-visible">
        <div className="p-8 border-b border-[#f0f4f7] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#f7fafc] rounded-lg">
              <FileText size={20} className="text-[#026880]" />
            </div>
            <h2 className="text-lg font-bold text-[#2b3437]">Recent Examinations</h2>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={() => navigate('/teacher/create-test')}
              className="flex items-center gap-2 px-6 py-2.5 bg-[#026880] text-white rounded-xl text-sm font-bold shadow-lg shadow-[#026880]/20 hover:bg-[#005161] transition-all"
            >
              Create New Test
            </button>
          </div>
        </div>

        <table className="w-full">
          <thead>
            <tr className="bg-[#f7fafc] text-left">
              <th className="px-8 py-4 text-[10px] font-bold text-[#576065] uppercase tracking-widest border-b border-[#f0f4f7]">Exam Title</th>
              <th className="px-8 py-4 text-[10px] font-bold text-[#576065] uppercase tracking-widest border-b border-[#f0f4f7]">Status</th>
              <th className="px-8 py-4 text-[10px] font-bold text-[#576065] uppercase tracking-widest border-b border-[#f0f4f7]">Duration</th>
              <th className="px-8 py-4 text-[10px] font-bold text-[#576065] uppercase tracking-widest border-b border-[#f0f4f7]">Availability</th>
              <th className="px-8 py-4 text-[10px] font-bold text-[#576065] uppercase tracking-widest border-b border-[#f0f4f7]">Participation</th>
              <th className="px-8 py-4 text-[10px] font-bold text-[#576065] uppercase tracking-widest border-b border-[#f0f4f7] text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#f0f4f7]">
            {exams.length > 0 ? exams.map((exam) => (
              <tr key={exam.id} className="hover:bg-[#f7fafc]/50 transition-colors">
                <td className="px-8 py-5">
                   <div className="flex flex-col">
                      <span className="font-bold text-[#2b3437]">{exam.name}</span>
                      <span className="text-[10px] text-[#aab3b8] uppercase tracking-[0.2em] font-bold">Code: {exam.examCode}</span>
                   </div>
                </td>
                <td className="px-8 py-5">
                   {(() => {
                     const now = new Date();
                     const start = exam.startTime ? new Date(exam.startTime) : null;
                     const end = exam.endTime ? new Date(exam.endTime) : null;
                     
                     if (start && now < start) {
                       return (
                         <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border bg-blue-50 border-blue-100 text-blue-600">
                           Upcoming
                         </span>
                       );
                     } else if (end && now > end) {
                       return (
                         <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border bg-red-50 border-red-100 text-red-600">
                           Closed
                         </span>
                       );
                     } else {
                       return (
                         <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border bg-green-50 border-green-100 text-green-600">
                           Active
                         </span>
                       );
                     }
                   })()}
                </td>
                <td className="px-8 py-5 text-sm font-medium text-[#576065]">
                  <div className="flex flex-col">
                    <span>{exam.durationInMinutes} mins</span>
                    <span className="text-[10px] text-[#aab3b8] font-bold">Limit</span>
                  </div>
                </td>
                <td className="px-8 py-5">
                   <p className="text-xs text-[#576065] font-medium flex flex-col gap-1">
                      <span className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                        {exam.startTime ? new Date(exam.startTime).toLocaleString('en-US', { dateStyle: 'short', timeStyle: 'short' }) : 'N/A'}
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-400"></span>
                        {exam.endTime ? new Date(exam.endTime).toLocaleString('en-US', { dateStyle: 'short', timeStyle: 'short' }) : 'N/A'}
                      </span>
                   </p>
                </td>
                <td className="px-8 py-5">
                   <div className="flex items-center gap-2 text-xs font-bold text-[#026880]">
                      <BarChart3 size={14} />
                      <Link to={`/teacher/results/${exam.examCode}`} className="hover:underline">View Results</Link>
                   </div>
                </td>
                <td className="px-8 py-5 text-right relative overflow-visible">
                   <button 
                     onClick={() => setActiveMenu(activeMenu === exam.id ? null : exam.id)}
                     className="p-2 hover:bg-[#cee7ec] rounded-lg transition-colors inline-flex"
                   >
                      <MoreVertical size={18} className="text-[#aab3b8]" />
                   </button>
                   
                   {activeMenu === exam.id && (
                      <>
                        <div 
                          className="fixed inset-0 z-10" 
                          onClick={() => setActiveMenu(null)}
                        ></div>
                        <div className="absolute right-8 top-12 w-48 bg-white rounded-2xl shadow-2xl border border-[#dbe4e9] py-2 z-20 animate-in fade-in slide-in-from-top-2">
                           <button 
                             onClick={() => handleCopyLink(exam.examCode)}
                             className="w-full flex items-center gap-2 px-4 py-2 text-sm font-medium text-[#576065] hover:bg-[#cee7ec] hover:text-[#026880] transition-colors"
                           >
                              <Share2 size={16} /> Copy Share Link
                           </button>
                           <button 
                             onClick={() => navigate(`/teacher/update-test/${exam.examCode}`)}
                             className="w-full flex items-center gap-2 px-4 py-2 text-sm font-medium text-[#576065] hover:bg-[#cee7ec] hover:text-[#026880] transition-colors"
                           >
                              <Edit size={16} /> Edit Exam
                           </button>
                           <hr className="my-1 border-[#f0f4f7]" />
                           <button 
                             onClick={() => handleDeleteExam(exam.examCode)}
                             className="w-full flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-500 hover:bg-red-50 transition-colors"
                           >
                              <Trash2 size={16} /> Delete Exam
                           </button>
                        </div>
                      </>
                   )}
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan="6" className="p-20 text-center text-[#aab3b8]">
                   <FileText size={48} className="mx-auto mb-4 opacity-20" />
                   <p className="font-medium">No examinations found. Create your first one!</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="bg-white p-10 rounded-[2.5rem] border border-[#dbe4e9] shadow-sm">
          <h3 className="text-lg font-bold text-[#2b3437] mb-8 flex items-center gap-3">
             <Bell size={20} className="text-[#026880]" />
             System Notifications
          </h3>
          <div className="space-y-8 max-h-[400px] overflow-y-auto pr-4 custom-scrollbar">
            {notifications.length > 0 ? notifications.map((notif) => (
               <div key={notif.id} className="flex gap-5 group">
                  <div className={`w-2 h-2 rounded-full mt-2 ring-4 ${notif.isRead ? 'bg-slate-300 ring-slate-50' : 'bg-[#026880] ring-[#cee7ec]'}`}></div>
                  <div>
                    <p className={`text-sm font-bold ${notif.isRead ? 'text-slate-400' : 'text-[#2b3437]'} group-hover:text-[#026880] transition-colors cursor-pointer`}>
                       {notif.title}
                    </p>
                    <p className="text-xs text-[#576065] mt-1.5 leading-relaxed">{notif.message}</p>
                    <p className="text-[10px] text-[#aab3b8] font-bold mt-2 uppercase tracking-widest">{new Date(notif.createdAt).toLocaleString()}</p>
                  </div>
               </div>
            )) : (
               <div className="text-center py-10 opacity-30">
                  <Bell size={40} className="mx-auto mb-4" />
                  <p className="text-sm font-bold uppercase tracking-widest">No notifications yet</p>
               </div>
            )}
          </div>
        </div>

        <div className="bg-[#026880] p-10 rounded-[3rem] shadow-xl shadow-[#026880]/20 relative overflow-hidden group">
          <div className="relative z-10 text-white">
            <div className="flex items-center gap-3 mb-4">
               <Lightbulb size={24} className="text-[#94dffb]" />
               <h3 className="text-xl font-bold font-['Be_Vietnam_Pro'] tracking-tight">Pro Tip for Teachers</h3>
            </div>
            <p className="text-white/80 leading-relaxed mb-10 max-w-sm">
              Sharing a direct link helps ensure all students are on the same page. Remember to set a **Passcode** for extra security!
            </p>
            <button className="px-8 py-3.5 bg-white text-[#026880] rounded-2xl text-sm font-bold shadow-lg hover:bg-[#cee7ec] transition-all active:scale-95">
              Explore Guide
            </button>
          </div>
          <div className="absolute -bottom-10 -right-10 text-white/5 group-hover:rotate-12 group-hover:scale-110 transition-all duration-700">
            <Lightbulb size={240} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default TeacherDashboard;
