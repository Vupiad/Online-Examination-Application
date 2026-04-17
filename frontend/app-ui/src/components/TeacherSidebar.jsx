import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Settings,
  Plus,
  LogOut,
  User,
} from "lucide-react";

const TeacherSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Lấy thông tin user hiện tại (nếu có)
  const currentUser = JSON.parse(localStorage.getItem("user")) || {
    fullName: "Teacher",
  };

  // Hàm kiểm tra active menu
  const isActive = (path) => location.pathname === path;

  // Hàm đăng xuất
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <aside className="hidden md:flex flex-col p-4 gap-2 h-screen w-64 fixed left-0 top-0 bg-[#e8eff2] z-40 border-r border-[#dbe4e9]">
      {/* Logo & Role */}
      <div className="mb-8 px-2 mt-4">
        <h1 className="font-['Be_Vietnam_Pro'] font-bold text-[#026880] text-xl">
          The Serene Scholar
        </h1>
        <p className="text-[10px] uppercase tracking-widest text-[#737c80] mt-1 font-semibold">
          Teacher Portal
        </p>
      </div>

      {/* User Info Card */}
      <div className="flex items-center gap-3 px-3 py-4 mb-6 bg-white rounded-xl shadow-sm border border-[#aab3b8]/10">
        <div className="w-10 h-10 rounded-full overflow-hidden bg-[#94dffb] flex items-center justify-center text-[#026880]">
          <User size={24} />
        </div>
        <div className="overflow-hidden">
          <p className="font-['Be_Vietnam_Pro'] font-bold text-sm text-[#026880] truncate">
            {currentUser.fullName}
          </p>
          <p className="text-xs text-[#40575b] truncate">Exam Management</p>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 space-y-1.5">
        <Link
          to="/teacher/dashboard"
          className={`flex items-center gap-3 px-4 py-3 transition-all duration-300 rounded-lg font-medium ${isActive("/teacher/dashboard") ? "bg-[#dbe4e9] text-[#026880] shadow-sm" : "text-[#3f5659] hover:bg-[#dbe4e9]/50"}`}
        >
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </Link>
        <Link
          to="/teacher/students"
          className={`flex items-center gap-3 px-4 py-3 transition-all duration-300 rounded-lg font-medium ${isActive("/teacher/students") ? "bg-[#dbe4e9] text-[#026880] shadow-sm" : "text-[#3f5659] hover:bg-[#dbe4e9]/50"}`}
        >
          <Users size={20} />
          <span>Student List</span>
        </Link>
        <Link
          to="/teacher/classes"
          className={`flex items-center gap-3 px-4 py-3 transition-all duration-300 rounded-lg font-medium ${isActive("/teacher/classes") ? "bg-[#dbe4e9] text-[#026880] shadow-sm" : "text-[#3f5659] hover:bg-[#dbe4e9]/50"}`}
        >
          <Settings size={20} />
          <span>Class List</span>
        </Link>
      </nav>

      {/* Main Action Button */}
      <Link
        to="/teacher/create-test"
        className="mt-4 w-full bg-[#026880] text-white py-3 rounded-xl font-['Be_Vietnam_Pro'] font-semibold flex items-center justify-center gap-2 shadow-md shadow-[#026880]/20 hover:bg-[#005b70] transition-colors active:scale-95"
      >
        <Plus size={20} />
        <span>Create New Test</span>
      </Link>

      {/* Logout */}
      <div className="mt-auto pt-4 border-t border-[#aab3b8]/20">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 transition-all duration-300 rounded-lg font-medium"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default TeacherSidebar;
