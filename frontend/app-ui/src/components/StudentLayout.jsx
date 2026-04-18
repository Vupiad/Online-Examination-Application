import React from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import Sidebar from "./StudentSidebar";
import {
  Bell,
  CircleHelp,
  LayoutDashboard,
  FileText,
  Settings,
} from "lucide-react";

const StudentLayout = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <div className="bg-[#f7fafc] text-[#2b3437] font-['Inter'] min-h-screen flex">
      {/* Component Sidebar dùng chung cho Desktop */}
      <Sidebar />

      {/* Main Container */}
      <div className="flex-1 md:ml-64 flex flex-col min-h-screen relative">
        {/* Header  */}
        <header className="md:hidden flex justify-between items-center px-8 py-4 w-full top-0 sticky bg-[#f7fafc] z-50 border-b border-[#dbe4e9]">
          <div className="text-xl font-bold text-[#026880] tracking-tight font-['Be_Vietnam_Pro']">
            The Serene Scholar
          </div>
          <button className="flex gap-4">
            <Bell className="text-[#026880]" size={24} />
            <CircleHelp className="text-[#026880]" size={24} />
          </button>
        </header>

        <main className="flex-1 pb-20 md:pb-0 relative overflow-hidden">
          <Outlet />
        </main>

        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-[#f7fafc] flex justify-around py-4 border-t border-[#dbe4e9] z-50">
          <Link
            to="/dashboard"
            className={`flex flex-col items-center gap-1 ${isActive("/dashboard") ? "text-[#026880] font-bold" : "text-[#2b3437] font-medium"}`}
          >
            <LayoutDashboard size={24} />
            <span className="text-[10px]">Dashboard</span>
          </Link>
          <Link
            to="/take-test"
            className={`flex flex-col items-center gap-1 ${isActive("/take-test") ? "text-[#026880] font-bold" : "text-[#2b3437] font-medium"}`}
          >
            <FileText size={24} />
            <span className="text-[10px]">Take Test</span>
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default StudentLayout;
