import React from "react";
import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, FileText, Settings, LogOut, BookOpen } from "lucide-react";

const Sidebar = () => {
  const location = useLocation();
  const currentUser = JSON.parse(localStorage.getItem('user')) || { fullName: 'Nguyen Minh Tam', className: 'Class 12A1' };

  const isActive = (path) => location.pathname === path;

  return (
    <aside className="hidden md:flex flex-col h-screen w-64 fixed left-0 top-0 bg-[#e8eff2] py-10 transition-all duration-200 ease-in-out z-40 border-r border-[#dbe4e9]">
      {/* Brand Header */}
      <div className="px-8 mb-12 flex items-center gap-3">
        <div className="size-10 bg-[#026880] rounded-lg flex items-center justify-center text-white">
          <BookOpen size={24} />
        </div>
        <div>
          <h1 className="text-sm font-black text-[#026880] tracking-tight leading-none mb-1">
            The Serene Scholar
          </h1>
          <p className="text-[10px] font-bold text-[#3f5659] opacity-60 uppercase tracking-wider">
            Student Portal
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-grow px-4 space-y-2">
        <Link
          to="/dashboard"
          className={`flex items-center py-3.5 px-6 transition-all font-['Be_Vietnam_Pro'] text-sm rounded-xl ${
            isActive("/dashboard") 
              ? "bg-[#94dffb] text-[#026880] font-bold shadow-sm" 
              : "text-[#576065] hover:bg-[#dbe4e9] font-medium"
          }`}
        >
          <LayoutDashboard className="mr-4" size={20} />
          Dashboard
        </Link>
        <Link
          to="/take-test"
          className={`flex items-center py-3.5 px-6 transition-all font-['Be_Vietnam_Pro'] text-sm rounded-xl ${
            isActive("/take-test") 
              ? "bg-[#94dffb] text-[#026880] font-bold shadow-sm" 
              : "text-[#576065] hover:bg-[#dbe4e9] font-medium"
          }`}
        >
          <FileText className="mr-4" size={20} />
          Take a New Test
        </Link>
        <Link
          to="/settings"
          className={`flex items-center py-3.5 px-6 transition-all font-['Be_Vietnam_Pro'] text-sm rounded-xl ${
            isActive("/settings") 
              ? "bg-[#94dffb] text-[#026880] font-bold shadow-sm" 
              : "text-[#576065] hover:bg-[#dbe4e9] font-medium"
          }`}
        >
          <Settings className="mr-4" size={20} />
          Settings
        </Link>
      </nav>

      {/* Sidebar Footer - User Profile */}
      <div className="mt-auto px-4">
        <div className="flex items-center gap-3 p-4 rounded-[1.25rem] bg-white/50 border border-white shadow-sm">
          <div className="size-10 rounded-xl bg-[#cee7ec] flex items-center justify-center overflow-hidden border border-[#026880]/10">
            <img 
               src={`https://ui-avatars.com/api/?name=${encodeURIComponent(currentUser.fullName)}&background=cee7ec&color=026880&bold=true`} 
               alt="avatar" 
               className="w-full h-full object-cover"
            />
          </div>
          <div className="overflow-hidden">
            <p className="text-[11px] font-black text-[#2b3437] truncate leading-tight mb-0.5">{currentUser.fullName}</p>
            <p className="text-[9px] font-bold text-[#aab3b8] uppercase tracking-wider truncate">{currentUser.className || 'Class 12A1'}</p>
          </div>
        </div>
        <button 
          onClick={() => {
            localStorage.clear();
            window.location.href = '/login';
          }}
          className="w-full flex items-center justify-center gap-2 text-[#576065] hover:text-red-500 py-4 mt-2 text-xs font-bold transition-colors"
        >
          <LogOut size={16} /> Log Out
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
