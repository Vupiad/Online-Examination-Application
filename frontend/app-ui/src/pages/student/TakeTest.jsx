import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Key, Lock, ShieldCheck, Headset, AlertCircle } from "lucide-react";
import api from "../../services/api";

const TakeTest = () => {
  const navigate = useNavigate();
  const [testCode, setTestCode] = useState("");
  const [passcode, setPasscode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await api.get(`/api/exams/${testCode}`);
      const exam = response.data;
      
      if (exam.passcode && exam.passcode !== passcode) {
        setError("Mật mã bài thi không chính xác!");
        setLoading(false);
        return;
      }

      // Navigate to Intro with exam data
      navigate(`/exam-intro/${exam.id}`, { state: { exam } });
    } catch (err) {
      setError("Không tìm thấy bài thi với mã này hoặc có lỗi hệ thống.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 md:p-12 min-h-full">
      {/* Progress Bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-[#dbe4e9]">
        <div className="w-1/4 h-full bg-[#026880] transition-all duration-500"></div>
      </div>

      {/* Central Card */}
      <div className="w-full max-w-2xl z-10 mt-8 md:mt-12">
        <div className="bg-[#ffffff] rounded-xl p-8 md:p-14 shadow-sm transition-all duration-300">
          <div className="mb-12 text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-['Be_Vietnam_Pro'] font-bold text-[#2b3437] tracking-tight mb-4 leading-tight">
              Take a New Test
            </h2>
            <p className="text-[#576065] max-w-lg leading-relaxed">
              Please enter the test code and passcode provided by your
              instructor to start the assessment.
            </p>
          </div>

          {error && (
            <div className="mb-8 p-4 bg-red-50 border border-red-100 rounded-lg flex items-center gap-3 text-red-600 animate-shake">
              <AlertCircle size={20} />
              <p className="text-sm font-bold m-0">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 gap-8">
              {/* Test Code */}
              <div className="group">
                <label className="block text-xs font-semibold text-[#026880] uppercase tracking-widest mb-2 px-1">
                  TEST ID / CODE
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={testCode}
                    onChange={(e) => setTestCode(e.target.value)}
                    className="w-full bg-[#e2e9ed] border-none rounded-md py-4 px-5 text-[#2b3437] placeholder:text-[#aab3b8] focus:ring-2 focus:ring-[#026880]/20 focus:bg-[#ffffff] transition-all outline-none"
                    placeholder="e.g.: 1"
                    required
                  />
                  <Key
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#aab3b8] group-focus-within:text-[#026880] transition-colors"
                    size={20}
                  />
                </div>
              </div>

              {/* Passcode */}
              <div className="group">
                <label className="block text-xs font-semibold text-[#026880] uppercase tracking-widest mb-2 px-1">
                  ACCESS CODE
                </label>
                <div className="relative">
                  <input
                    type="password"
                    value={passcode}
                    onChange={(e) => setPasscode(e.target.value)}
                    className="w-full bg-[#e2e9ed] border-none rounded-md py-4 px-5 text-[#2b3437] placeholder:text-[#aab3b8] focus:ring-2 focus:ring-[#026880]/20 focus:bg-[#ffffff] transition-all outline-none"
                    placeholder="••••••••"
                    required
                  />
                  <Lock
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#aab3b8] group-focus-within:text-[#026880] transition-colors"
                    size={20}
                  />
                </div>
              </div>
            </div>

            <div className="pt-6 flex flex-col md:flex-row items-center gap-6">
              <button
                type="submit"
                disabled={loading}
                className={`w-full md:w-auto px-10 py-4 font-bold shadow-lg rounded-xl transition-all active:scale-[0.98] ${
                  loading ? 'bg-slate-300 cursor-not-allowed shadow-none' : 'bg-[#026880] hover:bg-[#005b70] text-[#f1faff] shadow-[#026880]/10'
                }`}
              >
                {loading ? 'Validating...' : 'Start Test'}
              </button>
            </div>
          </form>
        </div>

        {/* Footer Meta */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 opacity-60">
          <div className="flex items-start gap-4 p-4 rounded-lg bg-[#eff4f7]">
            <ShieldCheck className="text-[#026880] mt-1 shrink-0" size={20} />
            <div>
              <h4 className="text-sm font-bold text-[#2b3437]">
                Secure environment
              </h4>
              <p className="text-xs text-[#576065]">
                The test will be proctored to ensure transparency and fairness.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4 p-4 rounded-lg bg-[#eff4f7]">
            <Headset className="text-[#026880] mt-1 shrink-0" size={20} />
            <div>
              <h4 className="text-sm font-bold text-[#2b3437]">
                Technical support
              </h4>
              <p className="text-xs text-[#576065]">
                Contact the academic department if you encounter issues logging
                in.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Background Decoration */}
      <div className="absolute top-[-10%] right-[-5%] w-[400px] h-[400px] bg-[#94dffb]/20 rounded-full blur-[100px] pointer-events-none -z-10"></div>
      <div className="absolute bottom-[-10%] left-[-5%] w-[300px] h-[300px] bg-[#cee7ec]/30 rounded-full blur-[80px] pointer-events-none -z-10"></div>
    </div>
  );
};

export default TakeTest;
