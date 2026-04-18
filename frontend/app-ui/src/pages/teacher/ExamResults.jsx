import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Search,
  Timer,
  CheckCircle,
  Activity,
  ChevronUp,
  ChevronDown,
  XCircle,
} from "lucide-react";
import { fetchExamResultsByCode, fetchExamInfo } from "../../services/api";

const DEFAULT_SORT = { key: "studentName", direction: "asc" };

const ExamResults = () => {
  const { examCode } = useParams();
  const navigate = useNavigate();

  const [rawResults, setRawResults] = useState([]);
  const [examInfo, setExamInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState(DEFAULT_SORT);
  const [selectedStudent, setSelectedStudent] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError("");

        const [results, info] = await Promise.all([
          fetchExamResultsByCode(examCode),
          fetchExamInfo(examCode).catch(() => null)
        ]);

        setRawResults(results);
        setExamInfo(info);
      } catch (err) {
        console.error("Error fetching teacher exam data:", err);
        setError("Không thể tải danh sách kết quả. Vui lòng thử lại sau.");
      } finally {
        setLoading(false);
      }
    };

    if (examCode) {
      fetchData();
    }
  }, [examCode]);

  const formatTime = (ms) => {
    if (!ms || ms <= 0) return "N/A";
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (totalSeconds % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  const formatDate = (value) => {
    if (!value) return "N/A";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "N/A";
    return date.toLocaleString("vi-VN");
  };

  const toNumber = (value) => {
    const num = Number(value);
    return Number.isNaN(num) ? 0 : num;
  };

  const groupedByStudent = useMemo(() => {
    const groups = new Map();

    rawResults.forEach((result, index) => {
      const student = result?.examinee || {};
      const studentId = student.id ?? `unknown-${index}`;
      const studentName = student.username || `Student ${studentId}`;
      const studentEmail = student.email || "N/A";

      if (!groups.has(studentId)) {
        groups.set(studentId, {
          studentId,
          studentName,
          studentEmail,
          attempts: [],
        });
      }

      groups.get(studentId).attempts.push(result);
    });

    return Array.from(groups.values()).map((studentGroup) => {
      const attempts = [...studentGroup.attempts].sort((a, b) => {
        const t1 = new Date(a?.submittedAt || 0).getTime();
        const t2 = new Date(b?.submittedAt || 0).getTime();
        return t2 - t1;
      });

      const latestAttempt = attempts[0] || null;
      const latestScore = toNumber(latestAttempt?.score);
      const latestTimeTaken = toNumber(latestAttempt?.timeTaken);
      const passStatus = latestScore >= 5 ? "Pass" : "Fail";

      return {
        ...studentGroup,
        attempts,
        attemptsCount: attempts.length,
        latestAttempt,
        latestScore,
        latestTimeTaken,
        passStatus,
      };
    });
  }, [rawResults]);

  const stats = useMemo(() => {
    const totalAttempts = rawResults.length;
    const totalScore = rawResults.reduce(
      (sum, r) => sum + toNumber(r?.score),
      0,
    );
    const passedAttempts = rawResults.filter((r) => toNumber(r?.score) >= 5).length;

    const timeValues = rawResults
      .map((r) => toNumber(r?.timeTaken))
      .filter((v) => v > 0);

    const averageScore = totalAttempts > 0 ? totalScore / totalAttempts : 0;
    const passRate = totalAttempts > 0 ? (passedAttempts / totalAttempts) * 100 : 0;
    const averageTime =
      timeValues.length > 0
        ? timeValues.reduce((sum, v) => sum + v, 0) / timeValues.length
        : 0;

    return {
      totalAttempts,
      averageScore,
      passRate,
      averageTime,
    };
  }, [rawResults]);

  const filteredAndSortedRows = useMemo(() => {
    const normalizedTerm = searchTerm.trim().toLowerCase();

    const filtered = groupedByStudent.filter((row) => {
      if (!normalizedTerm) return true;
      const byName = row.studentName.toLowerCase().includes(normalizedTerm);
      const byEmail = row.studentEmail.toLowerCase().includes(normalizedTerm);
      return byName || byEmail;
    });

    const sorted = [...filtered].sort((a, b) => {
      const { key, direction } = sortConfig;
      const multiplier = direction === "asc" ? 1 : -1;

      const valueMap = {
        studentName: [a.studentName, b.studentName],
        latestScore: [a.latestScore, b.latestScore],
        attemptsCount: [a.attemptsCount, b.attemptsCount],
        latestTimeTaken: [a.latestTimeTaken, b.latestTimeTaken],
        submittedAt: [
          new Date(a.latestAttempt?.submittedAt || 0).getTime(),
          new Date(b.latestAttempt?.submittedAt || 0).getTime(),
        ],
      };

      const [left, right] = valueMap[key] || valueMap.studentName;

      if (typeof left === "string" && typeof right === "string") {
        return left.localeCompare(right) * multiplier;
      }

      return (left - right) * multiplier;
    });

    return sorted;
  }, [groupedByStudent, searchTerm, sortConfig]);

  const handleSort = (key) => {
    setSortConfig((prev) => {
      if (prev.key !== key) {
        return { key, direction: "asc" };
      }
      return { key, direction: prev.direction === "asc" ? "desc" : "asc" };
    });
  };

  const renderSortIcon = (key) => {
    if (sortConfig.key !== key) {
      return <ChevronDown size={16} className="opacity-40" />;
    }
    return sortConfig.direction === "asc" ? (
      <ChevronUp size={16} />
    ) : (
      <ChevronDown size={16} />
    );
  };

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center bg-[#f7fafc]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#026880]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-[#f7fafc] p-6">
        <XCircle className="text-red-500 w-16 h-16 mb-4" />
        <h2 className="text-xl font-bold text-gray-800 mb-2">Oops!</h2>
        <p className="text-gray-600 mb-6 text-center">{error}</p>
        <button
          onClick={() => navigate("/teacher/create-test")}
          className="px-6 py-2 bg-[#026880] text-white rounded-lg font-medium"
        >
          Quay lại Create Test
        </button>
      </div>
    );
  }

  return (
    <div className="flex-1 min-w-0 flex flex-col bg-[#f7fafc] text-[#2b3437] font-['Inter']">
      <header className="sticky top-0 z-30 bg-[#f7fafc]/90 backdrop-blur-xl border-b border-[#dbe4e9]">
        <div className="px-6 md:px-10 py-5 flex items-center justify-between gap-4">
          <button
            onClick={() => navigate("/teacher/create-test")}
            className="text-[#026880] hover:opacity-75 transition-opacity flex items-center gap-2 font-medium"
          >
            <ArrowLeft size={20} />
            <span className="hidden sm:inline">Back to Create Test</span>
          </button>
          <div className="text-right">
            <p className="text-[10px] uppercase tracking-widest font-bold text-[#737c80]">
              Teacher Results Overview
            </p>
            <h1 className="text-xl md:text-2xl font-['Be_Vietnam_Pro'] font-bold text-[#026880]">
              {examInfo?.name || `Exam: ${examCode}`}
            </h1>
          </div>
        </div>
      </header>

      <main className="px-6 md:px-10 py-8 md:py-10 space-y-8">
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
          <div className="bg-[#eff4f7] p-5 md:p-6 rounded-2xl flex items-center gap-4">
            <div className="w-12 h-12 shrink-0 rounded-full bg-[#dbe4e9] flex items-center justify-center text-[#026880]">
              <Timer size={24} />
            </div>
            <div>
              <div className="text-[#576065] text-[10px] md:text-xs font-bold uppercase tracking-wider mb-1">
                AVG TIME
              </div>
              <div className="text-[#2b3437] font-bold text-base md:text-lg">
                {formatTime(stats.averageTime)}
              </div>
            </div>
          </div>

          <div className="bg-[#eff4f7] p-5 md:p-6 rounded-2xl flex items-center gap-4">
            <div className="w-12 h-12 shrink-0 rounded-full bg-[#dbe4e9] flex items-center justify-center text-[#026880]">
              <CheckCircle size={24} />
            </div>
            <div>
              <div className="text-[#576065] text-[10px] md:text-xs font-bold uppercase tracking-wider mb-1">
                TOTAL ATTEMPTS
              </div>
              <div className="text-[#2b3437] font-bold text-base md:text-lg">
                {stats.totalAttempts}
              </div>
            </div>
          </div>

          <div className="bg-[#eff4f7] p-5 md:p-6 rounded-2xl flex items-center gap-4">
            <div className="w-12 h-12 shrink-0 rounded-full bg-[#dbe4e9] flex items-center justify-center text-[#026880]">
              <Activity size={24} />
            </div>
            <div>
              <div className="text-[#576065] text-[10px] md:text-xs font-bold uppercase tracking-wider mb-1">
                AVG SCORE / PASS RATE
              </div>
              <div className="text-[#2b3437] font-bold text-base md:text-lg">
                {stats.averageScore.toFixed(1)} / 10 ({stats.passRate.toFixed(0)}%)
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-[2rem] border border-[#dbe4e9] shadow-sm overflow-hidden">
          <div className="p-5 md:p-6 border-b border-[#e2e9ed] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg md:text-xl font-bold text-[#026880] font-['Be_Vietnam_Pro']">
                Student Results
              </h2>
              <p className="text-sm text-[#576065] mt-1">
                Latest attempt per student. Click a row to view full attempt history.
              </p>
            </div>

            <div className="w-full md:w-[320px] relative">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#737c80]"
              />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by student name or email"
                className="w-full bg-[#e2e9ed] rounded-xl pl-10 pr-4 py-2.5 outline-none focus:ring-2 focus:ring-[#026880]/40"
              />
            </div>
          </div>

          {filteredAndSortedRows.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-[#eff4f7]">
                  <tr className="text-left text-[#4c6367] text-xs uppercase tracking-wider">
                    <th className="px-5 py-3 font-bold">
                      <button
                        onClick={() => handleSort("studentName")}
                        className="flex items-center gap-1"
                      >
                        Student {renderSortIcon("studentName")}
                      </button>
                    </th>
                    <th className="px-5 py-3 font-bold">Email</th>
                    <th className="px-5 py-3 font-bold">
                      <button
                        onClick={() => handleSort("latestScore")}
                        className="flex items-center gap-1"
                      >
                        Score {renderSortIcon("latestScore")}
                      </button>
                    </th>
                    <th className="px-5 py-3 font-bold">
                      <button
                        onClick={() => handleSort("attemptsCount")}
                        className="flex items-center gap-1"
                      >
                        Attempts {renderSortIcon("attemptsCount")}
                      </button>
                    </th>
                    <th className="px-5 py-3 font-bold">
                      <button
                        onClick={() => handleSort("latestTimeTaken")}
                        className="flex items-center gap-1"
                      >
                        Time Spent {renderSortIcon("latestTimeTaken")}
                      </button>
                    </th>
                    <th className="px-5 py-3 font-bold">
                      <button
                        onClick={() => handleSort("submittedAt")}
                        className="flex items-center gap-1"
                      >
                        Latest Submit {renderSortIcon("submittedAt")}
                      </button>
                    </th>
                    <th className="px-5 py-3 font-bold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAndSortedRows.map((row) => (
                    <tr
                      key={row.studentId}
                      onClick={() => setSelectedStudent(row)}
                      className="border-t border-[#eef2f4] hover:bg-[#f9fcfd] transition-colors cursor-pointer"
                    >
                      <td className="px-5 py-4 font-semibold text-[#2b3437]">
                        {row.studentName}
                      </td>
                      <td className="px-5 py-4 text-[#576065]">{row.studentEmail}</td>
                      <td className="px-5 py-4 font-bold text-[#026880]">
                        {row.latestScore.toFixed(1)} / 10
                      </td>
                      <td className="px-5 py-4">{row.attemptsCount}</td>
                      <td className="px-5 py-4">{formatTime(row.latestTimeTaken)}</td>
                      <td className="px-5 py-4 text-[#576065]">
                        {formatDate(row.latestAttempt?.submittedAt)}
                      </td>
                      <td className="px-5 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                            row.passStatus === "Pass"
                              ? "bg-[#e6f4ea] text-[#137333]"
                              : "bg-[#fce8e6] text-[#c5221f]"
                          }`}
                        >
                          {row.passStatus}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-10 text-center text-[#737c80]">
              Không có dữ liệu phù hợp với bộ lọc hiện tại.
            </div>
          )}
        </section>
      </main>

      {selectedStudent && (
        <div className="fixed inset-0 z-[120] bg-[#0b0f11]/45 backdrop-blur-sm p-4 flex items-center justify-center">
          <div className="w-full max-w-2xl bg-white rounded-[2rem] shadow-2xl overflow-hidden">
            <div className="px-6 py-5 border-b border-[#e2e9ed] flex items-start justify-between gap-4">
              <div>
                <p className="text-[10px] uppercase tracking-widest font-bold text-[#737c80]">
                  Attempt History
                </p>
                <h3 className="text-xl font-bold text-[#026880] font-['Be_Vietnam_Pro']">
                  {selectedStudent.studentName}
                </h3>
              </div>
              <button
                onClick={() => setSelectedStudent(null)}
                className="w-9 h-9 rounded-full bg-[#eff4f7] hover:bg-[#e2e9ed] transition-colors flex items-center justify-center"
              >
                <XCircle size={18} className="text-[#576065]" />
              </button>
            </div>

            <div className="max-h-[60vh] overflow-y-auto p-6 space-y-3">
              {selectedStudent.attempts.map((attempt, idx) => (
                <div
                  key={`${selectedStudent.studentId}-${idx}`}
                  className="bg-[#f7fafc] border border-[#e2e9ed] rounded-xl p-4"
                >
                  <div className="flex items-center justify-between gap-3 mb-2">
                    <span className="text-xs font-bold uppercase tracking-widest text-[#737c80]">
                      Attempt {selectedStudent.attempts.length - idx}
                    </span>
                    <span className="text-sm text-[#576065]">
                      {formatDate(attempt?.submittedAt)}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
                    <div>
                      <p className="text-[#737c80]">Score</p>
                      <p className="font-bold text-[#026880]">
                        {toNumber(attempt?.score).toFixed(1)} / 10
                      </p>
                    </div>
                    <div>
                      <p className="text-[#737c80]">Time Spent</p>
                      <p className="font-bold text-[#2b3437]">
                        {formatTime(toNumber(attempt?.timeTaken))}
                      </p>
                    </div>
                    <div>
                      <p className="text-[#737c80]">Status</p>
                      <p
                        className={`font-bold ${
                          toNumber(attempt?.score) >= 5
                            ? "text-[#137333]"
                            : "text-[#c5221f]"
                        }`}
                      >
                        {toNumber(attempt?.score) >= 5 ? "Pass" : "Fail"}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExamResults;