import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  Key, 
  Mail, 
  User, 
  ArrowLeft, 
  CheckCircle2, 
  Loader2,
  Lock
} from "lucide-react";
import api from "../services/api";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await api.post("/api/auth/reset-password", {
        username,
        email,
        newPassword
      });
      setStep(2);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to reset password. Please verify your username and email.");
    } finally {
      setLoading(false);
    }
  };

  if (step === 2) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#f0f9ff] to-[#e0f2fe] flex items-center justify-center p-6 font-['Inter']">
        <div className="bg-white rounded-[2.5rem] shadow-2xl p-12 max-w-md w-full text-center animate-in zoom-in duration-300">
          <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle2 size={48} className="text-green-500" />
          </div>
          <h2 className="text-3xl font-bold text-[#026880] mb-4 font-['Be_Vietnam_Pro']">Success!</h2>
          <p className="text-[#576065] leading-relaxed mb-10">
            Your password has been successfully reset. You can now use your new password to log in.
          </p>
          <button
            onClick={() => navigate("/login")}
            className="w-full py-4 bg-[#026880] text-white rounded-2xl font-bold shadow-xl shadow-[#026880]/20 hover:scale-[1.02] transition-all"
          >
            Back to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f0f9ff] to-[#e0f2fe] flex items-center justify-center p-6 font-['Inter']">
      <div className="bg-white rounded-[2.5rem] shadow-2xl p-10 md:p-14 max-w-lg w-full relative overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
        <button 
          onClick={() => navigate("/login")}
          className="absolute top-8 left-8 p-2 text-[#aab3b8] hover:text-[#026880] hover:bg-[#cee7ec] rounded-full transition-all"
        >
          <ArrowLeft size={20} />
        </button>

        <div className="text-center mb-10 mt-4">
          <div className="w-16 h-16 bg-[#cee7ec] rounded-2xl flex items-center justify-center mx-auto mb-6 text-[#026880] transform rotate-3">
             <Key size={32} />
          </div>
          <h1 className="text-3xl font-bold text-[#026880] font-['Be_Vietnam_Pro'] tracking-tight mb-2">Password Recovery</h1>
          <p className="text-[#576065] text-sm leading-relaxed">
            Enter your account details below to reset your password instantly.
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-100 text-red-600 p-4 rounded-xl mb-8 text-sm text-center font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleReset} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#737c80] uppercase tracking-widest ml-1">Username</label>
            <div className="relative group">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-[#aab3b8] group-focus-within:text-[#026880] transition-colors" size={20} />
              <input 
                type="text" 
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-[#f7fafc] border border-[#dbe4e9] rounded-2xl py-4 pl-12 pr-6 outline-none focus:ring-2 focus:ring-[#026880]/10 focus:border-[#026880] transition-all"
                placeholder="john_doe"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-[#737c80] uppercase tracking-widest ml-1">Registered Email</label>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#aab3b8] group-focus-within:text-[#026880] transition-colors" size={20} />
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#f7fafc] border border-[#dbe4e9] rounded-2xl py-4 pl-12 pr-6 outline-none focus:ring-2 focus:ring-[#026880]/10 focus:border-[#026880] transition-all"
                placeholder="john@example.com"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-[#737c80] uppercase tracking-widest ml-1">New Password</label>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#aab3b8] group-focus-within:text-[#026880] transition-colors" size={20} />
              <input 
                type="password" 
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full bg-[#f7fafc] border border-[#dbe4e9] rounded-2xl py-4 pl-12 pr-6 outline-none focus:ring-2 focus:ring-[#026880]/10 focus:border-[#026880] transition-all"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-[#026880] text-white rounded-2xl font-bold shadow-xl shadow-[#026880]/20 hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-center gap-3 mt-10"
          >
            {loading ? <Loader2 size={24} className="animate-spin" /> : null}
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>

        <p className="text-center mt-12 text-sm text-[#aab3b8] font-medium">
          Remembered your password?{" "}
          <Link to="/login" className="text-[#026880] font-bold hover:underline">Log In</Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
