import React, { useState } from "react";
import { User, Mail, Lock, CheckCircle, Shield, Loader2, Book, GraduationCap } from "lucide-react";
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
    email: "",
    className: "",
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
        email: formData.email,
        className: role === "student" ? formData.className : "",
        password: formData.password,
        role: role.toUpperCase(),
      });
      console.log("Registration success:", response);
      alert("Registration successful! Please login.");
      navigate("/login");
    } catch (err) {
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
    <div className="flex flex-col min-h-screen bg-slate-50 font-['Inter'] selection:bg-[#cee7ec]">
      {/* Navigation Header */}
      <header className="px-10 py-6 flex justify-between items-center bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="flex items-center gap-2">
           <div className="size-8 bg-[#026880] rounded-lg flex items-center justify-center text-white">
             <Book size={18} />
           </div>
           <h2 className="text-lg font-bold text-[#026880] m-0 font-['Be_Vietnam_Pro'] tracking-tight">
             Serene Scholar
           </h2>
        </div>
        <nav className="hidden md:flex gap-8 text-xs font-bold uppercase tracking-widest text-slate-400">
          <Link to="/login" className="hover:text-[#026880] transition-colors">Sign In</Link>
          <Link to="#" className="hover:text-[#026880] transition-colors">Guidelines</Link>
          <Link to="#" className="text-slate-800 transition-colors">Create Account</Link>
        </nav>
      </header>

      <main className="flex-1 flex items-center justify-center p-8">
        <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200/50 p-12 w-full max-w-[560px] border border-slate-100">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-slate-800 mb-2 font-['Be_Vietnam_Pro'] tracking-tight">
              Join the Academy
            </h1>
            <p className="text-slate-400 text-sm font-medium">
              Create your account to start participating in assessments.
            </p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-100 text-red-600 p-4 rounded-2xl mb-8 text-xs font-bold text-center animate-in fade-in zoom-in duration-300 uppercase tracking-widest">
              {error}
            </div>
          )}

          <div className="mb-10">
            <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em] mb-4 text-center">
              Account Type
            </p>
            <div className="flex gap-4">
              <button
                type="button"
                className={`flex-1 h-20 rounded-2xl border-2 flex items-center px-6 gap-4 transition-all ${
                  role === "student"
                    ? "border-[#026880] bg-[#026880] text-white shadow-xl shadow-[#026880]/20"
                    : "border-slate-100 bg-slate-50 text-slate-400 hover:border-slate-200"
                }`}
                onClick={() => setRole("student")}
              >
                <div className={`p-2 rounded-xl ${role === "student" ? "bg-white/20" : "bg-white shadow-sm"}`}>
                  <User size={20} />
                </div>
                <span className="text-sm font-bold">Student</span>
              </button>

              <button
                type="button"
                className={`flex-1 h-20 rounded-2xl border-2 flex items-center px-6 gap-4 transition-all ${
                  role === "teacher"
                    ? "border-[#026880] bg-[#026880] text-white shadow-xl shadow-[#026880]/20"
                    : "border-slate-100 bg-slate-50 text-slate-400 hover:border-slate-200"
                }`}
                onClick={() => setRole("teacher")}
              >
                <div className={`p-2 rounded-xl ${role === "teacher" ? "bg-white/20" : "bg-white shadow-sm"}`}>
                  <Shield size={20} />
                </div>
                <span className="text-sm font-bold">Teacher</span>
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-2 text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">
                  Full Name
                </label>
                <div className="relative group">
                  <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#026880] transition-colors" />
                  <input
                    type="text"
                    className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-transparent rounded-xl focus:bg-white focus:border-[#026880]/20 focus:ring-4 focus:ring-[#026880]/5 outline-none transition-all text-sm font-medium"
                    placeholder="John Doe"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="block mb-2 text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">
                  Username
                </label>
                <div className="relative group">
                  <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#026880] transition-colors" />
                  <input
                    type="text"
                    className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-transparent rounded-xl focus:bg-white focus:border-[#026880]/20 focus:ring-4 focus:ring-[#026880]/5 outline-none transition-all text-sm font-medium"
                    placeholder="john_doe"
                    required
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block mb-2 text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">
                Email Address
              </label>
              <div className="relative group">
                <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#026880] transition-colors" />
                <input
                  type="email"
                  className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-transparent rounded-xl focus:bg-white focus:border-[#026880]/20 focus:ring-4 focus:ring-[#026880]/5 outline-none transition-all text-sm font-medium"
                  placeholder="john@university.edu"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            {role === "student" && (
              <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                <label className="block mb-2 text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">
                  Class Name
                </label>
                <div className="relative group">
                  <GraduationCap size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#026880] transition-colors" />
                  <input
                    type="text"
                    className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-transparent rounded-xl focus:bg-white focus:border-[#026880]/20 focus:ring-4 focus:ring-[#026880]/5 outline-none transition-all text-sm font-medium"
                    placeholder="e.g.: CS2024"
                    required
                    value={formData.className}
                    onChange={(e) => setFormData({ ...formData, className: e.target.value })}
                  />
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-2 text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">
                  Password
                </label>
                <div className="relative group">
                  <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#026880] transition-colors" />
                  <input
                    type="password"
                    className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-transparent rounded-xl focus:bg-white focus:border-[#026880]/20 focus:ring-4 focus:ring-[#026880]/5 outline-none transition-all text-sm font-medium"
                    placeholder="••••••••"
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="block mb-2 text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">
                  Confirm
                </label>
                <div className="relative group">
                  <CheckCircle size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#026880] transition-colors" />
                  <input
                    type="password"
                    className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-transparent rounded-xl focus:bg-white focus:border-[#026880]/20 focus:ring-4 focus:ring-[#026880]/5 outline-none transition-all text-sm font-medium"
                    placeholder="••••••••"
                    required
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  />
                </div>
              </div>
            </div>

            <label className="flex items-start gap-3 py-2 cursor-pointer group">
              <input
                type="checkbox"
                required
                checked={formData.agreeTerms}
                onChange={(e) => setFormData({ ...formData, agreeTerms: e.target.checked })}
                className="mt-1 w-4 h-4 text-[#026880] border-slate-200 rounded focus:ring-[#026880]"
              />
              <span className="text-xs text-slate-400 leading-relaxed font-medium group-hover:text-slate-600 transition-colors">
                I acknowledge the <Link to="#" className="text-[#026880] font-bold">Terms of Use</Link> and agree to follow the examination code of conduct.
              </span>
            </label>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 py-4 text-white bg-[#026880] hover:bg-[#004d5a] disabled:bg-slate-300 rounded-[1.2rem] font-bold text-sm shadow-xl shadow-[#026880]/20 transition-all hover:-translate-y-0.5 active:scale-95"
            >
              {loading ? (
                <Loader2 size={20} className="animate-spin" />
              ) : (
                <>Establish Account</>
              )}
            </button>
          </form>

          <p className="text-center mt-10 text-xs font-bold text-slate-400 uppercase tracking-widest">
            Member of the portal?{" "}
            <Link to="/login" className="text-[#026880] hover:underline">
              Sign In Instead
            </Link>
          </p>
        </div>
      </main>

      <footer className="px-10 py-10 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center text-[10px] font-bold text-slate-300 uppercase tracking-[0.2em]">
        <div className="mb-4 md:mb-0">
          © 2024 Serene Scholar Academy.
        </div>
        <div className="flex gap-10">
          <Link to="#" className="hover:text-[#026880] transition-colors">Security</Link>
          <Link to="#" className="hover:text-[#026880] transition-colors">Protocol</Link>
          <Link to="#" className="hover:text-[#026880] transition-colors">Support</Link>
        </div>
      </footer>
    </div>
  );
};

export default Register;
