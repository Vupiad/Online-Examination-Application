import React from "react";
import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, FileText, Settings, LogOut } from "lucide-react";

const Sidebar = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <aside className="hidden md:flex flex-col h-screen w-64 fixed left-0 top-0 bg-[#e8eff2] py-8 transition-all duration-200 ease-in-out z-40 border-r border-[#dbe4e9]">
      <div className="px-6 mb-10">
        <h1 className="text-lg font-black text-[#026880] tracking-tight">
          Student Portal
        </h1>
        <p className="text-xs font-medium text-[#3f5659] opacity-70">
          The Serene Scholar
        </p>
      </div>

      <nav className="flex-grow space-y-1">
        <Link
          to="/dashboard"
          className={`flex items-center py-3 px-6 transition-transform scale-95 active:scale-100 font-['Be_Vietnam_Pro'] text-sm rounded-r-full ${isActive("/dashboard") ? "bg-[#94dffb] text-[#026880] font-semibold" : "text-[#3f5659] hover:bg-[#dbe4e9] font-medium"}`}
        >
          <LayoutDashboard className="mr-3" size={20} />
          Dashboard
        </Link>
        <Link
          to="/taketest"
          className={`flex items-center py-3 px-6 transition-transform scale-95 active:scale-100 font-['Be_Vietnam_Pro'] text-sm rounded-r-full ${isActive("/take-test") ? "bg-[#94dffb] text-[#026880] font-semibold" : "text-[#3f5659] hover:bg-[#dbe4e9] font-medium"}`}
        >
          <FileText className="mr-3" size={20} />
          Take a New Test
        </Link>
      </nav>

      {/* Sidebar Footer */}
      <div className="mt-auto px-6 border-t border-[#aab3b8]/10 pt-6">
        <div className="flex items-center gap-3 mb-6 p-2 rounded-xl bg-[#eff4f7]">
          <div className="w-10 h-10 rounded-full bg-[#94dffb] flex items-center justify-center text-[#026880] font-bold overflow-hidden">
            <span className="text-sm">NV</span>
          </div>
          <div className="overflow-hidden">
            <p className="text-xs font-bold truncate">Nguyễn Văn A</p>
            <p className="text-[10px] text-[#576065] truncate">ID: 20248891</p>
          </div>
        </div>
        <button className="w-full flex items-center text-[#3f5659] hover:bg-[#dbe4e9] py-3 px-2 rounded-lg transition-transform scale-95 active:scale-100 font-['Be_Vietnam_Pro'] text-sm font-medium">
          <LogOut className="mr-3" size={20} />
          Log Out
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
