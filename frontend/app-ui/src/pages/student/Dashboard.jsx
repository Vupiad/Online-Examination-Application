import React, { useState, useEffect } from "react";
import {
  TrendingUp,
  ArrowRight,
  Clock,
  Bell,
  Plus,
  BookOpen,
} from "lucide-react";
import api from "../../services/api";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [stats, setStats] = useState({
    completionRate: 85,
    averageScore: 8.4,
    trend: 0.3,
  });
  const [testHistory, setTestHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  const currentUser = JSON.parse(localStorage.getItem("user")) || {
    fullName: "Student",
    id: 1,
  };

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/api/exam/results`, {
          params: { userId: currentUser.id },
        });

        if (response.data && response.data.length > 0) {
          const formattedData = response.data.map((item) => ({
            id: item.id,
            name: item.examName || "Unnamed Test",
            code: item.examCode,
            date: new Date(item.submittedAt).toLocaleDateString("vi-VN"),
            duration: `${Math.floor(item.timeTaken / 60)} mins`,
            status: "Completed",
            score: item.score,
          }));
          setTestHistory(formattedData);
        }
      } catch (error) {
        console.error("Error fetching dashboard data", error);
        setTestHistory([
          {
            id: 1,
            name: "Calculus - Chapter 3",
            code: "TH-G3-2024",
            date: "15/10/2023",
            duration: "45 mins",
            status: "Submitted",
            score: 9.0,
          },
          {
            id: 2,
            name: "Literature - Social Discourse",
            code: "NV-NL-2023",
            date: "12/10/2023",
            duration: "90 mins",
            status: "Completed",
            score: 8.5,
          },
          {
            id: 3,
            name: "Physics - Optics",
            code: "VL-QH-002",
            date: "05/10/2023",
            duration: "60 mins",
            status: "Completed",
            score: 7.8,
          },
          {
            id: 4,
            name: "English - IELTS Simulation",
            code: "EN-IELTS-01",
            date: "28/09/2023",
            duration: "120 mins",
            status: "Submitted",
            score: 8.0,
          },
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, [currentUser.id]);

  return (
    <div className="min-h-screen bg-[#f7fafc]">
      {/* 1. Header Component (Chỉ gồm Dashboard, Thông báo, New Test) */}
      <header className="w-full sticky top-0 bg-[#eff4f7]/80 backdrop-blur-md z-30 border-b border-[#dbe4e9]">
        <div className="flex justify-between items-center px-8 py-4 max-w-6xl mx-auto">
          <h2 className="font-['Be_Vietnam_Pro'] tracking-tight text-xl font-bold text-[#026880]">
            Dashboard
          </h2>

          <div className="flex items-center gap-4">
            <button className="w-10 h-10 flex items-center justify-center rounded-full text-[#576065] hover:bg-[#dbe4e9] transition-colors">
              <Bell size={20} />
            </button>
            <Link
              to="/taketest"
              className="bg-[#026880] text-white px-5 py-2 rounded-xl text-sm font-semibold flex items-center gap-2 hover:bg-[#005b70] active:scale-95 transition-all shadow-md shadow-[#026880]/10"
            >
              <Plus size={18} />
              <span>New Test</span>
            </Link>
          </div>
        </div>
      </header>

      {/* 2. Main Page Content */}
      <div className="px-8 py-10 max-w-6xl mx-auto space-y-12 animate-in fade-in duration-500">
        {/* Bento Stats Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 bg-white rounded-[2rem] p-8 flex flex-col justify-between min-h-[220px] shadow-sm border border-[#e8eff2]">
            <div>
              <h3 className="font-['Be_Vietnam_Pro'] text-2xl font-bold text-[#026880] mb-2">
                Good morning, {currentUser.fullName.split(" ").pop()}!
              </h3>
              <p className="text-[#576065] max-w-md">
                You have completed{" "}
                <span className="font-bold text-[#2b3437]">
                  {stats.completionRate}%
                </span>{" "}
                of your study goals for this month. Keep up the good work!
              </p>
            </div>
            <div className="flex gap-4 items-center mt-6">
              <div className="flex -space-x-3">
                <div className="w-10 h-10 rounded-full border-2 border-white bg-[#94dffb] flex items-center justify-center text-xs font-bold text-[#003c4b]">
                  MT
                </div>
                <div className="w-10 h-10 rounded-full border-2 border-white bg-[#cee7ec] flex items-center justify-center text-xs font-bold text-[#2c4347]">
                  HN
                </div>
                <div className="w-10 h-10 rounded-full border-2 border-white bg-[#dbe4e9] flex items-center justify-center text-xs font-bold text-[#576065]">
                  +4
                </div>
              </div>
              <span className="text-xs text-[#576065]">
                You are leading your study group
              </span>
            </div>
          </div>

          <div className="bg-[#026880] text-white rounded-[2rem] p-8 flex flex-col justify-between relative overflow-hidden shadow-lg">
            <div className="relative z-10">
              <p className="text-sm opacity-80 mb-1">Average score</p>
              <h4 className="text-5xl font-black">{stats.averageScore}</h4>
            </div>
            <div className="relative z-10 flex items-center gap-2 text-sm">
              <TrendingUp size={18} />
              <span>+{stats.trend} compared to last month</span>
            </div>
            <TrendingUp
              className="absolute -right-4 -bottom-4 opacity-10 rotate-12"
              size={160}
            />
          </div>
        </section>

        {/* List of Tests */}
        <section className="space-y-6">
          <div className="flex justify-between items-end">
            <div>
              <h3 className="font-['Be_Vietnam_Pro'] text-3xl font-extrabold tracking-tight text-[#2b3437]">
                List of your tests
              </h3>
              <p className="text-[#576065]">
                Overview of completed tests and results achieved.
              </p>
            </div>
            <button className="text-[#026880] font-semibold text-sm flex items-center gap-1 hover:underline group">
              View all{" "}
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>
          </div>

          <div className="bg-white rounded-[2rem] overflow-hidden border border-[#aab3b8]/15 shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#e8eff2] border-b border-[#aab3b8]/10">
                    <th className="px-8 py-5 text-sm font-bold text-[#576065] uppercase tracking-wider">
                      TEST NAME
                    </th>
                    <th className="px-6 py-5 text-sm font-bold text-[#576065] uppercase tracking-wider">
                      DATE
                    </th>
                    <th className="px-6 py-5 text-sm font-bold text-[#576065] uppercase tracking-wider">
                      DURATION
                    </th>
                    <th className="px-6 py-5 text-sm font-bold text-[#576065] uppercase tracking-wider">
                      STATUS
                    </th>
                    <th className="px-6 py-5 text-sm font-bold text-[#576065] uppercase tracking-wider text-right">
                      SCORE
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#aab3b8]/5">
                  {testHistory.map((test) => (
                    <tr
                      key={test.id}
                      className="hover:bg-[#eff4f7] transition-colors group cursor-pointer"
                    >
                      <td className="px-8 py-6">
                        <div>
                          <p className="font-bold text-[#2b3437] group-hover:text-[#026880] transition-colors">
                            {test.name}
                          </p>
                          <p className="text-xs text-[#576065]">
                            Code: {test.code}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-6 text-sm text-[#576065]">
                        {test.date}
                      </td>
                      <td className="px-6 py-6 text-sm text-[#576065]">
                        <div className="flex items-center gap-2">
                          <Clock size={14} />
                          {test.duration}
                        </div>
                      </td>
                      <td className="px-6 py-6">
                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                            test.status === "Submitted"
                              ? "bg-[#94dffb]/40 text-[#005063]"
                              : "bg-[#cee7ec] text-[#3f5659]"
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${test.status === "Submitted" ? "bg-[#026880]" : "bg-[#4c6367]"}`}
                          ></span>
                          {test.status}
                        </span>
                      </td>
                      <td className="px-6 py-6 text-right font-['Be_Vietnam_Pro'] text-lg font-bold text-[#2b3437]">
                        {test.score.toFixed(1)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Recommendation Card */}
        <section className="bg-[#e2e9ed] rounded-[2.5rem] p-10 flex flex-col md:flex-row items-center gap-10 shadow-inner">
          <div className="w-48 h-48 flex-shrink-0 bg-white rounded-full flex items-center justify-center p-2 shadow-sm border-4 border-white">
            <img
              alt="Study Material"
              className="w-full h-full object-cover rounded-full"
              src="https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=200&h=200"
            />
          </div>
          <div className="flex-grow text-center md:text-left">
            <span className="text-xs font-bold text-[#026880] uppercase tracking-[0.2em] mb-3 block">
              RECOMMENDATION FOR YOU
            </span>
            <h3 className="font-['Be_Vietnam_Pro'] text-2xl font-bold mb-4 text-[#003c4b]">
              Improve your Calculus skills
            </h3>
            <p className="text-[#576065] mb-6 text-balance">
              Based on your latest test results, we suggest you review{" "}
              <strong>Higher-Order Derivatives </strong>
              to optimize your score for the upcoming semester exam.
            </p>
            <div className="flex gap-4 justify-center md:justify-start">
              <button className="bg-[#026880] text-white px-8 py-3 rounded-full font-bold shadow-lg hover:scale-105 transition-transform">
                View roadmap
              </button>
              <button className="bg-white text-[#2b3437] px-8 py-3 rounded-full font-bold border border-[#aab3b8]/20 hover:bg-[#eff4f7] transition-colors">
                Later
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
