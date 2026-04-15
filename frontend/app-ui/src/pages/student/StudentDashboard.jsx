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

const StudentDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/login');
  };

  const tests = [
    { name: 'Calculus - Chapter 3', code: 'TH-03-2024', date: '15/10/2023', duration: '45 mins', status: 'Submitted', score: '9.0', icon: <TrendingUp size={16} /> },
    { name: 'Literature - Social Discourse', code: 'NV-XL-2023', date: '12/10/2023', duration: '90 mins', status: 'Completed', score: '8.5', icon: <BookOpen size={16} /> },
    { name: 'Physics - Optics', code: 'VL-QH-202', date: '05/10/2023', duration: '60 mins', status: 'Completed', score: '7.8', icon: <HelpCircle size={16} /> },
    { name: 'English - IELTS Simulation', code: 'EN-IELTS-01', date: '28/09/2023', duration: '120 mins', status: 'Submitted', score: '8.0', icon: <BookMarked size={16} /> },
  ];

  return (
    <div className="flex bg-[#f8fafc] min-h-screen">
      {/* Sidebar */}
      <aside className="sidebar w-64 border-r border-slate-200 bg-[#f8fafc]">
        <div className="p-6 mb-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-[#006070] text-white p-2 rounded-lg">
              <BookOpen size={24} />
            </div>
            <div>
              <h2 className="text-sm font-bold m-0" style={{ color: 'var(--primary)' }}>The Serene Scholar</h2>
              <p className="text-[10px] text-grey m-0 uppercase tracking-widest font-bold">Student Portal</p>
            </div>
          </div>
        </div>

        <nav className="flex-grow space-y-2 px-2">
          <Link to="#" className="sidebar-item active">
            <LayoutDashboard size={20} />
            Dashboard
          </Link>
          <Link to="/taketest" className="sidebar-item">
            <FileText size={20} />
            Take a New Test
          </Link>
          <Link to="#" className="sidebar-item">
            <Settings size={20} />
            Settings
          </Link>
        </nav>

        <div className="p-6 mt-auto">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-white shadow-sm border border-slate-100">
            <div className="w-10 h-10 rounded-full bg-[#e0f2fe] flex items-center justify-center text-[#0369a1] font-bold">
              TM
            </div>
            <div>
              <p className="text-xs font-bold m-0">Nguyễn Minh Tâm</p>
              <p className="text-[10px] text-grey m-0">Class 12A1</p>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 mt-4 text-xs font-bold text-red-500 bg-transparent border-none cursor-pointer w-full justify-center py-2 rounded-lg hover:bg-red-50"
          >
            <LogOut size={16} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {/* Header Tabs */}
        <header className="flex justify-between items-center mb-8">
          <div className="flex gap-8 border-b border-transparent">
            <button className="text-sm font-bold text-[#006070] pb-2 border-b-2 border-[#006070] bg-transparent cursor-pointer">Dashboard</button>
            <button className="text-sm font-semibold text-slate-400 pb-2 bg-transparent border-none cursor-pointer hover:text-slate-600 transition-colors">Overview</button>
            <button className="text-sm font-semibold text-slate-400 pb-2 bg-transparent border-none cursor-pointer hover:text-slate-600 transition-colors">Study Materials</button>
            <button className="text-sm font-semibold text-slate-400 pb-2 bg-transparent border-none cursor-pointer hover:text-slate-600 transition-colors">Notifications</button>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="p-2 text-slate-400 hover:text-slate-600 cursor-pointer">
              <Bell size={20} />
            </div>
            <button className="btn btn-primary" style={{ height: '40px', width: 'auto', padding: '0 1.5rem', borderRadius: '10px' }}>
              <Plus size={18} /> New Test
            </button>
          </div>
        </header>

        {/* Welcome & Score Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2 bg-white rounded-2xl p-8 border border-slate-100 shadow-sm flex flex-col justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-800 m-0 mb-4">Good morning, Tam!</h1>
              <p className="text-sm text-slate-500 leading-relaxed max-w-md">
                You have completed <span className="text-[#006070] font-bold">85%</span> of your study goals for this month. Keep up the good work!
              </p>
            </div>
            <div className="flex items-center gap-4 mt-6">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full border-2 border-white bg-blue-100 flex items-center justify-center text-[10px] font-bold">MT</div>
                <div className="w-8 h-8 rounded-full border-2 border-white bg-green-100 flex items-center justify-center text-[10px] font-bold">HN</div>
                <div className="w-8 h-8 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-[10px] font-bold">+6</div>
              </div>
              <p className="text-[11px] text-slate-400 font-medium">You are leading your study group</p>
            </div>
          </div>

          <div className="bg-[#006070] text-white rounded-2xl p-8 shadow-lg shadow-[#006070]/20 relative overflow-hidden">
            <div className="relative z-10">
              <p className="text-xs font-semibold opacity-70 mb-2">Average score</p>
              <h2 className="text-5xl font-bold m-0 mb-8">8.4</h2>
              <div className="flex items-center gap-2 text-xs font-semibold">
                <TrendingUp size={16} />
                <span>+0.3 compared to last month</span>
              </div>
            </div>
            <div className="absolute bottom-4 right-4 flex items-end gap-1 h-32 opacity-20">
              <div className="w-4 h-16 bg-white rounded-t"></div>
              <div className="w-4 h-24 bg-white rounded-t"></div>
              <div className="w-4 h-20 bg-white rounded-t"></div>
              <div className="w-4 h-28 bg-white rounded-t"></div>
            </div>
          </div>
        </div>

        {/* Test List Section */}
        <section className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm mb-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-xl font-bold text-slate-800 m-0">List of your tests</h2>
              <p className="text-xs text-grey m-0 mt-1">Overview of completed tests and results achieved.</p>
            </div>
            <Link to="#" className="text-xs font-bold text-[#006070] decoration-none hover:underline">View all →</Link>
          </div>

          <table className="w-full" style={{ borderCollapse: 'separate', borderSpacing: '0 0.75rem' }}>
            <thead>
              <tr className="text-left text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                <th className="px-6 pb-2">Test Name</th>
                <th className="px-6 pb-2">Date</th>
                <th className="px-6 pb-2">Duration</th>
                <th className="px-6 pb-2">Status</th>
                <th className="px-6 pb-2 text-right">Score</th>
              </tr>
            </thead>
            <tbody>
              {tests.map((test, index) => (
                <tr key={index} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 rounded-l-xl border-y border-l border-slate-50 bg-white shadow-sm first:border-l-0">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-[#f0f9ff] text-[#0369a1] flex items-center justify-center">
                        {test.icon}
                      </div>
                      <div>
                        <p className="text-sm font-bold m-0 text-slate-800">{test.name}</p>
                        <p className="text-[10px] text-grey m-0">Code: {test.code}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 border-y border-slate-50 font-medium text-slate-600 text-sm bg-white shadow-sm">{test.date}</td>
                  <td className="px-6 py-4 border-y border-slate-50 font-medium text-slate-600 text-sm bg-white shadow-sm">{test.duration}</td>
                  <td className="px-6 py-4 border-y border-slate-50 bg-white shadow-sm">
                    <span className={`status-badge ${test.status === 'Submitted' ? 'status-open' : 'status-closed'}`}>
                      {test.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 rounded-r-xl border-y border-r border-slate-50 text-right bg-white shadow-sm first:border-r-0">
                    <span className="text-md font-black text-[#006070]">{test.score}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* Recommendation Section */}
        <section className="bg-[#eef5f8] rounded-2xl p-8 flex items-center justify-between relative overflow-hidden h-64">
           <div className="flex gap-8 items-center relative z-10 w-full">
             <div className="w-48 h-48 bg-slate-900 rounded-2xl shadow-xl flex items-center justify-center overflow-hidden">
                <div className="p-4 text-white text-[8px] font-mono leading-tight opacity-50">
                  {`// Recommendation Algorithm\nfunction improve(skills) {\n  return skills.map(skill => {\n    if (skill.score < 8) {\n      return 'Reviewing...';\n    }\n  });\n}`}
                </div>
             </div>
             <div className="flex-1">
               <p className="text-[10px] font-black tracking-widest text-[#006070] uppercase mb-2">Recommendation for you</p>
               <h2 className="text-2xl font-bold text-slate-800 m-0 mb-4">Improve your Calculus skills</h2>
               <p className="text-sm text-slate-600 leading-relaxed max-w-md mb-8">
                 Based on your latest test results, we suggest you review Higher-Order Derivatives to optimize your score for the upcoming semester exam.
               </p>
               <div className="flex gap-4">
                 <button className="btn btn-primary" style={{ width: 'auto', padding: '0 2rem' }}>View roadmap</button>
                 <button className="btn bg-white text-slate-600 border border-slate-200" style={{ width: 'auto', padding: '0 2rem' }}>Later</button>
               </div>
             </div>
           </div>
           
           <button className="absolute top-8 right-8 w-10 h-10 rounded-full bg-[#006070] text-white flex items-center justify-center border-none shadow-lg cursor-pointer hover:scale-110 active:scale-95 transition-all">
             <Plus size={24} />
           </button>
        </section>
      </main>
    </div>
  );
};

export default StudentDashboard;
