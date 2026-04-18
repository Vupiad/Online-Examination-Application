import React from 'react';
import { 
  LayoutDashboard, 
  FileText, 
  Settings, 
  LogOut, 
  Bell, 
  Plus, 
  BookOpen, 
  Clock, 
  CheckCircle2, 
  BarChart3,
  TrendingUp,
  Search,
  BookMarked,
  HelpCircle,
  MoreVertical
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../services/api';

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [results, setResults] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [notifications, setNotifications] = React.useState([]);
  const [activeMenu, setActiveMenu] = React.useState(null);
  const currentUser = JSON.parse(localStorage.getItem('user')) || { fullName: 'Student User', className: 'N/A' };

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get(`/api/exam/results/user/${currentUser.id}`);
        setResults(res.data);
        
        const notifRes = await api.get(`/api/notifications/user/${currentUser.id}`);
        setNotifications(notifRes.data);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
      } finally {
        setLoading(false);
      }
    };
    if (currentUser.id) fetchData();
  }, [currentUser.id]);

  const calculateGPA = () => {
    if (results.length === 0) return "0.0";
    const total = results.reduce((acc, curr) => acc + curr.score, 0);
    return (total / results.length).toFixed(1);
  };

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    return `${mins} mins`;
  };

  return (
    <div className="flex bg-[#f8fafc] min-h-screen font-['Inter']">
       {/* Main Content */}
      <main className="flex-1 p-10">
        {/* Header Tabs */}
        <header className="flex justify-between items-center mb-10">
          <div className="flex gap-8 border-b border-transparent">
            <button className="text-sm font-bold text-[#026880] pb-2 border-b-2 border-[#026880] bg-transparent cursor-pointer">Dashboard</button>
            <button className="text-sm font-semibold text-slate-400 pb-2 bg-transparent border-none cursor-pointer hover:text-slate-600 transition-colors">Performance</button>
            <button className="text-sm font-semibold text-slate-400 pb-2 bg-transparent border-none cursor-pointer hover:text-slate-600 transition-colors">Study Roadmap</button>
            <button className="text-sm font-semibold text-slate-400 pb-2 bg-transparent border-none cursor-pointer hover:text-slate-600 transition-colors">Messages</button>
          </div>
          
          <div className="flex items-center gap-6 relative">
            <div 
              className="p-2.5 bg-white rounded-xl shadow-sm border border-slate-100 text-slate-400 hover:text-[#026880] cursor-pointer transition-all relative"
              onClick={() => setActiveMenu(activeMenu === 'notifications' ? null : 'notifications')}
            >
              <Bell size={20} />
              {notifications.filter(num => !num.isRead).length > 0 && (
                 <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
              )}
            </div>

            {/* Notification Dropdown */}
            {activeMenu === 'notifications' && (
               <div className="absolute top-full right-44 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-slate-100 z-50 overflow-hidden">
                  <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-[#f8fafc]">
                     <span className="font-bold text-slate-800 text-sm">Notifications</span>
                     <button className="text-[10px] uppercase tracking-widest text-[#026880] font-bold hover:text-[#005161]">Mark all as read</button>
                  </div>
                  <div className="max-h-[350px] overflow-y-auto custom-scrollbar">
                     {notifications.length > 0 ? notifications.map((n) => (
                         <div key={n.id} className={`p-4 border-b border-slate-50 hover:bg-slate-50 cursor-pointer transition-colors ${!n.isRead ? 'bg-[#cee7ec]/20' : ''}`}>
                            <p className={`text-sm font-bold ${!n.isRead ? 'text-[#026880]' : 'text-slate-800'}`}>{n.title}</p>
                            <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">{n.message}</p>
                            <p className="text-[10px] text-slate-400 mt-2 font-bold uppercase tracking-widest">{new Date(n.createdAt).toLocaleString('en-GB')}</p>
                         </div>
                     )) : (
                         <div className="p-8 text-center text-slate-400">
                            <Bell size={24} className="mx-auto mb-2 opacity-30" />
                            <p className="text-xs font-bold uppercase tracking-widest">No notifications</p>
                         </div>
                     )}
                  </div>
               </div>
            )}
            <button 
              onClick={() => navigate('/take-test')}
              className="bg-[#026880] text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-[#026880]/20 hover:bg-[#005b70] transition-all flex items-center gap-2"
            >
              <Plus size={18} /> Take New Test
            </button>
          </div>
        </header>

        {/* Welcome & Score Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
          <div className="lg:col-span-2 bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-sm flex flex-col justify-between group hover:shadow-xl transition-all duration-500">
            <div>
              <h1 className="text-3xl font-bold text-slate-800 m-0 mb-4 font-['Be_Vietnam_Pro'] tracking-tight">Good morning, {currentUser.fullName.split(' ').pop()}!</h1>
              <p className="text-sm text-slate-500 leading-relaxed max-w-md">
                You have completed <span className="text-[#026880] font-bold">{results.length > 0 ? "85%" : "0%"}</span> of your study goals for this month. Keep up the good work!
              </p>
            </div>
            <div className="flex items-center gap-6 mt-8">
              <div className="flex -space-x-3">
                 <div className="w-10 h-10 rounded-full border-[3px] border-white bg-[#cee7ec] flex items-center justify-center text-[11px] font-bold text-[#026880]">MT</div>
                 <div className="w-10 h-10 rounded-full border-[3px] border-white bg-[#94dffb] flex items-center justify-center text-[11px] font-bold text-[#026880]">HN</div>
                 <div className="w-10 h-10 rounded-full border-[3px] border-white bg-slate-100 flex items-center justify-center text-[11px] font-bold text-slate-400">+4</div>
              </div>
              <p className="text-xs text-slate-400 font-bold tracking-tight">You are leading your study group</p>
            </div>
          </div>

          <div className="bg-[#026880] text-white rounded-[2.5rem] p-10 shadow-2xl shadow-[#026880]/20 relative overflow-hidden group">
            <div className="relative z-10">
              <p className="text-xs font-bold uppercase tracking-[0.2em] opacity-60 mb-3">Average score</p>
              <h2 className="text-6xl font-black m-0 mb-8 font-['Be_Vietnam_Pro'] tracking-tighter">{calculateGPA()}</h2>
              <div className="flex items-center gap-2 text-xs font-bold bg-white/10 w-fit px-4 py-2 rounded-full backdrop-blur-md border border-white/10">
                <TrendingUp size={16} className="text-[#94dffb]" />
                <span>+0.3 compared to last month</span>
              </div>
            </div>
            <div className="absolute bottom-4 right-8 flex items-end gap-1.5 h-32 opacity-10 group-hover:opacity-25 transition-opacity">
              <div className="w-5 h-16 bg-white rounded-t-lg"></div>
              <div className="w-5 h-24 bg-white rounded-t-lg"></div>
              <div className="w-5 h-20 bg-white rounded-t-lg"></div>
              <div className="w-5 h-28 bg-white rounded-t-lg"></div>
            </div>
          </div>
        </div>

        {/* Test List Section */}
        <section className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-sm mb-10 overflow-hidden">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h2 className="text-2xl font-bold text-slate-800 font-['Be_Vietnam_Pro'] tracking-tight">List of your tests</h2>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Overview of completed tests and results achieved.</p>
            </div>
            <Link to="/student/history" className="text-xs font-bold text-[#026880] uppercase tracking-widest hover:text-[#005b70] transition-colors border-b-2 border-[#026880]/10 pb-1">View all</Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-separate border-spacing-y-4">
              <thead>
                <tr className="text-left text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em]">
                  <th className="px-8 pb-4">Test Name</th>
                  <th className="px-8 pb-4">Date</th>
                  <th className="px-8 pb-4">Duration</th>
                  <th className="px-8 pb-4">Status</th>
                  <th className="px-8 pb-4 text-right">Score</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan="5" className="text-center py-20 text-slate-400">Loading history...</td></tr>
                ) : results.length > 0 ? results.map((result, index) => (
                  <tr 
                    key={result.id || `result-${index}-${result.examCode}`} 
                    onClick={() => navigate(`/review/${result.examCode}`)}
                    className="group cursor-pointer"
                  >
                    <td className="px-8 py-6 rounded-l-[1.5rem] bg-[#f8fafc]/50 group-hover:bg-[#f1faff] border-y border-l border-[#f1f4f9] group-hover:border-[#026880]/10 transition-all">
                      <div className="flex items-center gap-5">
                        <div className="size-12 rounded-2xl bg-white text-[#026880] flex items-center justify-center shadow-sm border border-slate-100 group-hover:scale-110 transition-transform">
                          {result.examName?.toLowerCase().includes('calculus') ? <TrendingUp size={16}/> : 
                           result.examName?.toLowerCase().includes('english') ? <BookMarked size={16}/> : <BookOpen size={16}/>}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-800 m-0">{result.examName}</p>
                          <p className="text-[10px] text-slate-400 m-0 font-bold tracking-widest">Code: {result.examCode}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6 bg-[#f8fafc]/50 group-hover:bg-[#f1faff] border-y border-[#f1f4f9] group-hover:border-[#026880]/10 text-sm font-bold text-slate-500 transition-all">
                      {new Date(result.submittedAt).toLocaleDateString('en-GB')}
                    </td>
                    <td className="px-8 py-6 bg-[#f8fafc]/50 group-hover:bg-[#f1faff] border-y border-[#f1f4f9] group-hover:border-[#026880]/10 text-sm font-bold text-slate-500 transition-all">
                      {formatDuration(result.timeTaken)}
                    </td>
                    <td className="px-8 py-6 bg-[#f8fafc]/50 group-hover:bg-[#f1faff] border-y border-[#f1f4f9] group-hover:border-[#026880]/10 transition-all">
                      <span className="px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest border bg-blue-50 border-blue-100 text-[#026880]">
                         Submitted
                      </span>
                    </td>
                    <td className="px-8 py-6 rounded-r-[1.5rem] bg-[#f8fafc]/50 group-hover:bg-[#f1faff] border-y border-r border-[#f1f4f9] group-hover:border-[#026880]/10 text-right transition-all">
                      <span className="text-xl font-black text-[#026880] tabular-nums font-['Be_Vietnam_Pro']">{result.score.toFixed(1)}</span>
                    </td>
                  </tr>
                )) : (
                  <tr><td colSpan="5" className="text-center py-20 text-slate-400">No test history found.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* AI Insight Section */}
        <section className="bg-white rounded-[3rem] p-12 flex flex-col lg:flex-row items-center justify-between relative overflow-hidden group border border-slate-100 shadow-sm">
           <div className="flex flex-col lg:flex-row gap-12 items-center relative z-10 w-full">
             <div className="w-64 h-64 bg-[#0f172a] rounded-[2rem] shadow-2xl flex items-center justify-center overflow-hidden rotate-[-2deg] group-hover:rotate-0 transition-transform duration-500">
                <div className="p-6 text-[#94dffb] text-[10px] font-mono leading-relaxed opacity-60">
                  {`/* Study Progress AI Analyzer */\n\nfunction analyzeSkills(user) {\n  const weakPoints = user.getWeaknesses();\n  return generateRoadmap({\n    target: 'Calculus',\n    priority: 'High',\n    nextStep: 'Derivatives Review'\n  });\n}`}
                </div>
             </div>
             <div className="flex-1 text-center lg:text-left">
               <p className="text-[10px] font-bold tracking-[0.3em] text-[#026880] uppercase mb-4">RECOMMENDATION FOR YOU</p>
               <h2 className="text-3xl font-bold text-slate-800 m-0 mb-6 font-['Be_Vietnam_Pro'] tracking-tight">Improve your Calculus skills</h2>
               <p className="text-base text-slate-500 leading-relaxed max-w-lg mb-10">
                 Based on your last test results, we suggest you review **Higher-Order Derivatives** to optimize your score for the upcoming semester exam.
               </p>
               <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                 <button className="px-8 py-4 bg-[#026880] text-white rounded-2xl font-bold text-sm shadow-xl shadow-[#026880]/20 hover:bg-[#005b70] transition-all">View roadmap</button>
                 <button className="px-8 py-4 bg-white text-slate-500 rounded-2xl font-bold text-sm border border-slate-200 hover:bg-slate-100 transition-all">Later</button>
               </div>
             </div>
           </div>
           
           <div className="absolute -top-10 -right-10 size-64 bg-[#cee7ec]/20 rounded-full blur-3xl pointer-events-none group-hover:scale-150 transition-transform duration-1000"></div>
        </section>
      </main>
    </div>
  );
};

export default StudentDashboard;
