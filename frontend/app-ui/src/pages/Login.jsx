import React, { useState } from "react";
import {
  BookOpen,
  User,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Loader2,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../services/authService";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await authService.login({ username, password });
      console.log("Login success:", response);

      const user =
        response?.user ||
        response?.data?.user ||
        JSON.parse(localStorage.getItem("user"));

      if (user && user.role === "TEACHER") {
        navigate("/teacher/dashboard");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      setError(err?.message || "Login failed. Please check your credentials.");
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-to-br from-[#f0f9ff] to-[#e0f2fe] font-['Inter']">
      <div className="w-full max-w-md p-10 bg-white shadow-xl rounded-2xl border border-gray-100 animate-[fadeIn_0.4s_ease-out]">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center text-white bg-[#026880] rounded-xl shadow-md">
            <BookOpen size={24} />
          </div>
          <h1 className="text-2xl font-bold text-[#026880] mb-1">
            Assessment Management
          </h1>
          <p className="text-gray-500 text-sm">Welcome back</p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-lg mb-6 text-sm text-center">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">
              Username
            </label>
            <div className="relative flex items-center">
              <User size={18} className="absolute left-4 text-gray-400" />
              <input
                type="text"
                className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#026880]/20 focus:border-[#026880] focus:bg-white outline-none transition-all"
                placeholder="john_doe"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
          </div>

          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">
              Password
            </label>
            <div className="relative flex items-center">
              <Lock size={18} className="absolute left-4 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                className="w-full pl-11 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#026880]/20 focus:border-[#026880] focus:bg-white outline-none transition-all"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="absolute right-4 text-gray-400 hover:text-[#026880] focus:outline-none transition-colors"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="flex justify-between items-center mb-6 text-sm">
            <label className="flex items-center gap-2 cursor-pointer text-gray-500 hover:text-gray-700 font-medium">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 text-[#026880] border-gray-300 rounded focus:ring-[#026880]"
              />
              Remember me
            </label>
            <Link
              to="/forgot-password"
              className="font-bold text-[#026880] hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-3.5 text-white bg-[#026880] hover:bg-[#004d5a] disabled:bg-[#026880]/70 rounded-lg font-bold shadow-lg shadow-[#026880]/20 transition-all active:scale-[0.98] disabled:active:scale-100"
          >
            {loading ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <>
                Sign In <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>

        <p className="text-center mt-8 text-sm text-gray-500 font-medium">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-bold text-[#026880] hover:underline"
          >
            Register now
          </Link>
        </p>
      </div>

      <p className="max-w-[600px] mx-auto text-center text-gray-400 text-sm mt-8 italic leading-relaxed">
        "Silence is not the absence of sound, but the presence of attention."
      </p>

      <footer className="w-full max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center py-8 mt-auto text-xs md:text-sm text-gray-400 font-medium">
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

export default Login;
