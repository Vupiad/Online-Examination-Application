import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Settings,
  Plus,
  BookOpen,
  UserCheck,
  Verified,
  Search,
  Filter,
  MoreVertical,
  Bell,
  UserCircle,
  Lightbulb,
} from "lucide-react";
import api from "../../services/api";

const TeacherDashboard = () => {
  const navigate = useNavigate();
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [userData, setUserData] = useState(JSON.parse(localStorage.getItem("user")) || {});

  useEffect(() => {
    const fetchData = async () => {
      if (!userData.id) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        
        // 1. Refresh User Info (Optional but good if user changed profile)
        try {
          const userRes = await api.get(`/api/users/${userData.id}`);
          if (userRes.data) {
            setUserData(userRes.data);
            localStorage.setItem("user", JSON.stringify(userRes.data));
          }
        } catch (uErr) {
          console.error("Failed to refresh user info:", uErr);
        }

        // 2. Fetch Exams
        const examRes = await api.get(`/api/exam/owner/${userData.id}`);
        
        // Format the data to match frontend expectations
        const formattedExams = examRes.data.map(exam => {
          const now = new Date();
          const start = new Date(exam.startTime);
          const end = new Date(exam.endTime);
          
          let status = "Closed";
          if (now >= start && now <= end) status = "Open";
          else if (now < start) status = "Upcoming";

          return {
            ...exam,
            status: status,
            // Deriving some fields that might not be in the DTO yet
            studentCount: exam.studentCount || "0/0", 
            updatedAt: exam.updatedAt ? new Date(exam.updatedAt).toLocaleDateString() : "Just now",
            startTime: start.toLocaleDateString(),
            endTime: end.toLocaleDateString()
          };
        });

        setExams(formattedExams);
      } catch (err) {
        console.warn("Failed to fetch exams, using fallback data if any", err);
        // Fallback for demo purposes if API fails
        if (exams.length === 0) {
          setExams([
            {
              id: 1,
              name: "Midterm Exam I - Philology 12",
              status: "Open",
              durationInMinutes: 90,
              startTime: "2024-10-10",
              endTime: "2024-10-15",
              studentCount: "42/45",
              updatedAt: "2 hours ago",
            }
          ]);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userData.id]);

  const filteredExams = exams.filter((exam) =>
    exam.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="flex-1 p-8 bg-[#f7fafc]">
      {/* Header Section */}
      <header className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-extrabold text-[#026880] tracking-tight font-['Be_Vietnam_Pro']">
            Dashboard
          </h1>
          <p className="text-[#4c6367] mt-1">
            Overview of current examination activities
          </p>
        </div>
        <div className="flex items-center gap-4">
          <button className="w-10 h-10 flex items-center justify-center rounded-full bg-[#e8eff2] hover:bg-[#e2e9ed] transition-colors text-[#2b3437]">
            <Bell size={20} />
          </button>
          <div className="h-8 w-[1px] bg-[#aab3b8]/30 mx-2"></div>
          <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-full border border-[#aab3b8]/10 shadow-sm">
            <div className="text-right">
              <p className="text-xs font-bold text-[#2b3437]">
                {userData.fullName || "Teacher"}
              </p>
              <p className="text-[10px] text-[#4c6367]">
                {userData.role || "Lecturer"}
              </p>
            </div>
            <UserCircle size={28} className="text-[#026880]" />
          </div>
        </div>
      </header>

      {/* Metrics Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-6 rounded-[0.75rem] border border-[#aab3b8]/10 flex items-center gap-5 shadow-sm">
          <div className="w-14 h-14 rounded-full bg-[#94dffb] flex items-center justify-center text-[#026880]">
            <BookOpen size={28} />
          </div>
          <div>
            <p className="text-sm text-[#4c6367] font-medium">Active tests</p>
            <p className="text-2xl font-bold text-[#2b3437]">12</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-[0.75rem] border border-[#aab3b8]/10 flex items-center gap-5 shadow-sm">
          <div className="w-14 h-14 rounded-full bg-[#cee7ec] flex items-center justify-center text-[#4c6367]">
            <Users size={28} />
          </div>
          <div>
            <p className="text-sm text-[#4c6367] font-medium">
              Students taking tests
            </p>
            <p className="text-2xl font-bold text-[#2b3437]">458</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-[0.75rem] border border-[#aab3b8]/10 flex items-center gap-5 shadow-sm">
          <div className="w-14 h-14 rounded-full bg-[#b8cdf7] flex items-center justify-center text-[#4b5f84]">
            <Verified size={28} />
          </div>
          <div>
            <p className="text-sm text-[#4c6367] font-medium">
              Completion today
            </p>
            <p className="text-2xl font-bold text-[#2b3437]">89%</p>
          </div>
        </div>
      </div>

      {/* Main Data Area */}
      <section className="bg-white rounded-xl border border-[#aab3b8]/10 shadow-sm overflow-hidden">
        <div className="px-8 py-6 flex justify-between items-center bg-[#eff4f7]/50">
          <h3 className="text-xl font-bold text-[#576065] flex items-center gap-2 font-['Be_Vietnam_Pro']">
            <LayoutDashboard size={20} />
            Recent Test List
          </h3>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#737c80]"
                size={16}
              />
              <input
                className="pl-10 pr-4 py-2 bg-[#e2e9ed] rounded-md text-sm border-none focus:ring-2 focus:ring-[#026880]/20 w-64 transition-all"
                placeholder="Search for tests..."
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-[#e2e9ed] text-[#576065] rounded-md text-sm font-medium hover:bg-[#dbe4e9] transition-colors">
              <Filter size={16} />
              Filter
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-xs font-bold text-[#737c80] uppercase tracking-widest border-b border-[#aab3b8]/10">
                <th className="px-8 py-5">Test Name</th>
                <th className="px-8 py-5 text-center">Status</th>
                <th className="px-8 py-5">Duration</th>
                <th className="px-8 py-5">Test Deadline</th>
                <th className="px-8 py-5">Student Count</th>
                <th className="px-8 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#aab3b8]/5">
              {filteredExams.map((exam) => (
                <tr
                  key={exam.id}
                  className="hover:bg-[#eff4f7]/30 transition-colors group"
                >
                  <td className="px-8 py-6">
                    <div>
                      <p className="font-semibold text-[#2b3437] group-hover:text-[#026880] transition-colors">
                        {exam.name}
                      </p>
                      <p className="text-xs text-[#4c6367]/60 mt-1">
                        Updated {exam.updatedAt}
                      </p>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-center">
                    <span
                      className={`px-3 py-1 text-[11px] font-bold rounded-full border whitespace-nowrap ${
                        exam.status === "Open"
                          ? "bg-[#94dffb]/40 text-[#005063] border-[#94dffb]"
                          : "bg-[#dbe4e9] text-[#576065] border-transparent"
                      }`}
                    >
                      {exam.status}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2 font-mono text-sm text-[#576065] bg-[#e8eff2] px-3 py-1.5 rounded w-fit">
                      {exam.durationInMinutes} min
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="text-sm text-[#576065] font-medium">
                      {exam.startTime} - {exam.endTime}
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2">
                      <Users size={14} className="text-[#4c6367]" />
                      <span className="text-sm font-medium">
                        {exam.studentCount} students
                      </span>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <button
                      onClick={() =>
                        navigate(`/teacher/results/${exam.examCode || "hihi"}`)
                      }
                      className="w-8 h-8 rounded-full hover:bg-[#e2e9ed] transition-colors inline-flex items-center justify-center text-[#737c80]"
                    >
                      <MoreVertical size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="px-8 py-6 bg-white flex justify-between items-center border-t border-[#aab3b8]/10">
          <p className="text-xs text-[#4c6367]">
            Showing 1-{filteredExams.length} of {exams.length} tests
          </p>
          <div className="flex gap-2">
            <button className="px-3 py-1 rounded bg-[#e8eff2] text-[#2b3437] text-sm font-medium disabled:opacity-50">
              Previous
            </button>
            <button className="px-3 py-1 rounded bg-[#026880] text-white text-sm font-medium">
              1
            </button>
            <button className="px-3 py-1 rounded bg-[#e8eff2] text-[#2b3437] text-sm font-medium">
              Next
            </button>
          </div>
        </div>
      </section>

      {/* Secondary Info Area */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-10">
        <div className="bg-[#eff4f7] rounded-xl p-8 border border-[#aab3b8]/5">
          <h4 className="font-bold text-lg mb-4 text-[#576065] font-['Be_Vietnam_Pro']">
            System Notifications
          </h4>
          <div className="space-y-4">
            <div className="flex gap-4 items-start">
              <div className="w-2 h-2 rounded-full bg-[#026880] mt-2"></div>
              <div>
                <p className="text-sm font-semibold text-[#2b3437]">
                  New anti-cheating feature update
                </p>
                <p className="text-xs text-[#4c6367] mt-1">
                  The system has added browser tab tracking...
                </p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="w-2 h-2 rounded-full bg-[#a83836] mt-2"></div>
              <div>
                <p className="text-sm font-semibold text-[#2b3437]">
                  Periodic system maintenance
                </p>
                <p className="text-xs text-[#4c6367] mt-1">
                  This Sunday from 02:00 to 04:00 AM...
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#94dffb]/20 rounded-xl p-8 border border-[#94dffb]/30 relative overflow-hidden">
          <div className="relative z-10">
            <h4 className="font-bold text-lg mb-2 text-[#005063] font-['Be_Vietnam_Pro']">
              Tips for teachers
            </h4>
            <p className="text-sm text-[#005063]/80 max-w-xs mb-6">
              Did you know that using a question bank saves 40% of test creation
              time?
            </p>
            <button className="px-6 py-2 bg-[#026880] text-white rounded-full text-sm font-bold shadow-md hover:bg-[#005b70] transition-all">
              Explore Test Bank
            </button>
          </div>
          <div className="absolute -right-8 -bottom-8 opacity-10">
            <Lightbulb size={160} className="text-[#026880]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
