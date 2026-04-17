import React, { useState } from "react";
import { User, Mail, Lock, CheckCircle, Shield, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../services/authService";

const Register = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState("student");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Confirm password does not match.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await authService.register({
        username: formData.username,
        fullName: formData.fullName,
        password: formData.password,
        role: role.toUpperCase(),
      });
      console.log("Registration success:", response);
      alert("Registration successful! Please login.");
      navigate("/login");
    } catch (err) {
      // Handle Spring validation errors
      const errorMessage = err?.errors
        ? Object.values(err.errors).join(", ")
        : err?.message || "Registration failed. Please try again.";
      setError(errorMessage);
      console.error("Registration error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#f0f9ff] to-[#e0f2fe] font-['Inter'] animate-[fadeIn_0.4s_ease-out]">
      {/* Navigation Header */}
      <header className="px-[5%] py-6 flex justify-between items-center bg-white/50 backdrop-blur-md border-b border-[#006070]/10 sticky top-0 z-50">
        <h2 className="text-xl font-bold text-[#026880] m-0">
          Assessment Management
        </h2>
        <nav className="hidden md:flex gap-8 text-sm font-medium text-gray-700">
          <Link to="#" className="hover:text-[#026880] transition-colors">
            Explore
          </Link>
          <Link to="#" className="hover:text-[#026880] transition-colors">
            Docs
          </Link>
          <Link to="#" className="hover:text-[#026880] transition-colors">
            Contact
          </Link>
        </nav>
      </header>

      <main className="flex-1 flex items-center justify-center p-8">
        <div className="bg-white rounded-2xl shadow-xl p-10 w-full max-w-[520px] border border-gray-100">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-[#026880] mb-2">
              Create New Account
            </h1>
            <p className="text-gray-500 text-sm">
              Start your peaceful learning journey with us.
            </p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-lg mb-6 text-sm text-center">
              {error}
            </div>
          )}

          <div className="mb-8">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
              WHO ARE YOU?
            </p>
            <div className="flex gap-4">
              <button
                type="button"
                className={`flex-1 h-24 rounded-xl border-2 flex flex-col items-center justify-center gap-2 transition-all ${
                  role === "student"
                    ? "border-[#026880] bg-[#026880] text-white shadow-lg shadow-[#026880]/20"
                    : "border-gray-200 bg-gray-50 text-gray-500 hover:border-gray-300"
                }`}
                onClick={() => setRole("student")}
              >
                <div
                  className={`p-2 rounded-lg ${role === "student" ? "bg-white/20" : "bg-gray-200"}`}
                >
                  <User size={24} />
                </div>
                <span className="text-sm font-bold">I am a Student</span>
              </button>

              <button
                type="button"
                className={`flex-1 h-24 rounded-xl border-2 flex flex-col items-center justify-center gap-2 transition-all ${
                  role === "teacher"
                    ? "border-[#026880] bg-[#026880] text-white shadow-lg shadow-[#026880]/20"
                    : "border-gray-200 bg-gray-50 text-gray-500 hover:border-gray-300"
                }`}
                onClick={() => setRole("teacher")}
              >
                <div
                  className={`p-2 rounded-lg ${role === "teacher" ? "bg-white/20" : "bg-gray-200"}`}
                >
                  <Shield size={24} />
                </div>
                <span className="text-sm font-bold">I am a Teacher</span>
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-700">
                Full Name
              </label>
              <div className="relative flex items-center">
                <User size={18} className="absolute left-4 text-gray-400" />
                <input
                  type="text"
                  className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#026880]/20 focus:border-[#026880] outline-none transition-all"
                  placeholder="John Doe"
                  required
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                />
              </div>
            </div>

            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-700">
                Username
              </label>
              <div className="relative flex items-center">
                <Mail size={18} className="absolute left-4 text-gray-400" />
                <input
                  type="text"
                  className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#026880]/20 focus:border-[#026880] outline-none transition-all"
                  placeholder="john_doe"
                  required
                  value={formData.username}
                  onChange={(e) =>
                    setFormData({ ...formData, username: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-2 text-sm font-semibold text-gray-700">
                  Password
                </label>
                <div className="relative flex items-center">
                  <Lock size={18} className="absolute left-4 text-gray-400" />
                  <input
                    type="password"
                    className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#026880]/20 focus:border-[#026880] outline-none transition-all"
                    placeholder="••••••••"
                    required
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                  />
                </div>
                <p className="text-[11px] text-gray-500 mt-1">
                  * Min 8 chars, uppercase, lowercase & number.
                </p>
              </div>

              <div>
                <label className="block mb-2 text-sm font-semibold text-gray-700">
                  Confirm
                </label>
                <div className="relative flex items-center">
                  <CheckCircle
                    size={18}
                    className="absolute left-4 text-gray-400"
                  />
                  <input
                    type="password"
                    className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#026880]/20 focus:border-[#026880] outline-none transition-all"
                    placeholder="••••••••"
                    required
                    value={formData.confirmPassword}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        confirmPassword: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
            </div>

            <label className="flex items-start gap-3 mt-6 mb-8 cursor-pointer text-xs text-gray-500 leading-relaxed">
              <input
                type="checkbox"
                required
                checked={formData.agreeTerms}
                onChange={(e) =>
                  setFormData({ ...formData, agreeTerms: e.target.checked })
                }
                className="mt-0.5 w-4 h-4 text-[#026880] border-gray-300 rounded focus:ring-[#026880]"
              />
              <span>
                I agree to the{" "}
                <Link
                  to="#"
                  className="text-[#1ea7ca] font-semibold hover:underline"
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  to="#"
                  className="text-[#1ea7ca] font-semibold hover:underline"
                >
                  Privacy Policy
                </Link>{" "}
                of Assessment Management.
              </span>
            </label>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3.5 text-white bg-[#026880] hover:bg-[#004d5a] disabled:bg-[#026880]/70 rounded-lg font-bold shadow-lg shadow-[#026880]/20 transition-all active:scale-[0.98] disabled:active:scale-100"
            >
              {loading ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <>Register</>
              )}
            </button>
          </form>

          <p className="text-center mt-6 text-sm text-gray-500 font-medium">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-[#026880] font-bold hover:underline"
            >
              Sign In
            </Link>
          </p>
        </div>
      </main>

      <div className="flex justify-center gap-8 pb-8 text-slate-400 text-xs font-bold uppercase tracking-widest">
        <div className="flex items-center gap-2">
          <Shield size={16} /> HIGH SECURITY
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle size={16} /> TRUSTED
        </div>
      </div>

      <footer className="px-[5%] py-8 border-t border-black/5 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 font-medium">
        <div className="mb-4 md:mb-0">
          © 2024 Assessment Management. All rights reserved.
        </div>
        <div className="flex gap-6">
          <Link to="#" className="hover:text-[#026880] transition-colors">
            Privacy Policy
          </Link>
          <Link to="#" className="hover:text-[#026880] transition-colors">
            Terms of Service
          </Link>
          <Link to="#" className="hover:text-[#026880] transition-colors">
            Help Center
          </Link>
        </div>
      </footer>
    </div>
  );
};

export default Register;
