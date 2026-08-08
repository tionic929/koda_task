import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { login as loginApi } from "../../services/auth.service";
import { Lock, Mail, ArrowRight, Eye, EyeOff, Loader2 } from "lucide-react";
import logoImg from "../../assets/clienttrackerlogo.png";
import type { AuthUser } from "../../types/auth.types";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { login: saveAuth } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await loginApi({ email, password });
      saveAuth(response.user as AuthUser, response.token);
      navigate("/");
    } catch (err: any) {
      setError(
        err?.response?.data?.message ||
          "Login failed. Please check your email and password."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-slate-100/70 to-indigo-50/40 p-4 font-sans text-slate-900 antialiased">
      <div className="w-full max-w-md bg-white border border-slate-200/90 p-8 shadow-xl rounded-2xl space-y-6">
        {/* Header branding */}
        <div className="flex items-center gap-3.5 pb-6 border-b border-slate-100">
          <div className="p-2 bg-slate-50 border border-slate-200/80 rounded-xl shadow-xs">
            <img
              src={logoImg}
              alt="Client Project Tracker Logo"
              className="h-9 w-auto object-contain"
            />
          </div>
          <div>
            <h1 className="text-lg font-bold text-slate-900 tracking-tight">
              Client Project Tracker
            </h1>
            <p className="text-xs text-slate-500 font-medium">
              Management Portal
            </p>
          </div>
        </div>

        {/* Title & Description */}
        <div>
          <h2 className="text-xl font-bold text-slate-900">
            Sign In to your Account
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Enter your email and password to manage client projects.
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="p-3.5 bg-rose-50 border border-rose-200 text-xs font-medium text-rose-700 rounded-xl animate-in fade-in duration-150">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Field */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-700">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Mail className="w-4 h-4" />
              </div>
              <input
                type="email"
                name="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@agency.com"
                className="w-full pl-10 pr-4 py-2.5 border border-slate-200 bg-slate-50/50 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 focus:outline-none transition-all rounded-lg"
              />
            </div>
          </div>

          {/* Password Field with Eye Toggle Icon */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-700">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Lock className="w-4 h-4" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-10 py-2.5 border border-slate-200 bg-slate-50/50 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 focus:outline-none transition-all rounded-lg"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer focus:outline-none"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-2 py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold transition-all disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer rounded-lg shadow-sm hover:shadow"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Signing In...</span>
              </>
            ) : (
              <>
                <span>Sign In</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}