import React from "react";
import { Outlet } from "react-router-dom";
import TeacherSidebar from "./TeacherSidebar";

const TeacherLayout = () => {
  return (
    <div className="bg-[#f7fafc] text-[#2b3437] font-['Inter'] min-h-screen flex">
      {/* Sidebar cố định bên trái */}
      <TeacherSidebar />

      {/* Khu vực nội dung chính (Chừa 64 đơn vị = 16rem = 256px cho Sidebar) */}
      <div className="flex-1 md:ml-64 flex flex-col min-h-screen relative">
        {/* Nội dung của các trang con sẽ được render vào Outlet */}
        <Outlet />
      </div>
    </div>
  );
};

export default TeacherLayout;
