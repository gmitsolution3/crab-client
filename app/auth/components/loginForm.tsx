"use client";

import React, { useState } from "react";
import {
  Eye,
  EyeOff,
  LogIn,
  Mail,
  Lock,
  UserPlus,
  UserLock,
} from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import { FaHome } from "react-icons/fa";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = (e: any) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert(`Login successful!\nEmail: ${email}\nPassword: ${password}`);
    }, 1500);
  };

  return (
    <div className="max-w-7xl mx-auto ">
      <div className="p-5">
        <Link
          className="flex gap-2 max-w-35 items-center px-4 py-2 border border-[#0970B4] rounded-lg hover:bg-[#0970B4] hover:text-white hover:cursor-pointer"
          href="/"
        >
          <FaHome size={20}/>
          Go Home
        </Link>
      </div>
      <div className="min-h-screen flex items-center justify-center">
        {/* Login Container */}
        <div className="relative w-full max-w-md">
          {/* Card */}
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            {/* Top Accent Bar */}
            <div className="h-1 bg-linear-to-r from-[#0970B4] via-[#0855a0] to-[#064a8a]"></div>

            {/* Content */}
            <div className="p-6 sm:p-8 md:p-10">
              {/* Logo Section */}
              <div className="text-center mb-8 sm:mb-10">
                <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-linear-to-br from-[#0970B4] to-[#064a8a] rounded-2xl mb-4 shadow-lg">
                  <UserLock className="text-white" size={32} />
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mt-4">
                  Login
                </h1>
                <p className="text-gray-500 text-sm mt-2">Please Login In</p>
              </div>

              {/* Login Form */}
              <div className="space-y-5 sm:space-y-6">
                {/* Email Input */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail
                      className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                      size={20}
                    />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="admin@example.com"
                      className="w-full pl-10 sm:pl-12 pr-4 sm:pr-5 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#0970B4] focus:ring-2 focus:ring-[#0970B4] focus:ring-opacity-20 transition text-sm sm:text-base"
                    />
                  </div>
                </div>

                {/* Password Input */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Lock
                      className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                      size={20}
                    />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-10 sm:pl-12 pr-12 sm:pr-14 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#0970B4] focus:ring-2 focus:ring-[#0970B4] focus:ring-opacity-20 transition text-sm sm:text-base"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 rounded border-gray-300 cursor-pointer accent-[#0970B4]"
                    />
                    <span className="text-gray-600">Remember me</span>
                  </label>
                  <a
                    href="#"
                    className="text-[#0970B4] hover:text-[#064a8a] font-semibold transition"
                  >
                    Forgot password?
                  </a>
                </div>

                {/* Login Button */}
                <button
                  onClick={handleLogin}
                  disabled={loading}
                  className="w-full bg-linear-to-r from-[#0970B4] to-[#064a8a] hover:from-[#0855a0] hover:to-[#053d78] text-white font-semibold py-2.5 sm:py-3 rounded-lg transition duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-[#0970B4] border-t-transparent rounded-full animate-spin"></div>
                      Logging in...
                    </>
                  ) : (
                    <>
                      <LogIn size={20} />
                      Sign In
                    </>
                  )}
                </button>
              </div>

              {/* Divider */}
              <div className="relative my-6 sm:my-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    Or continue with
                  </span>
                </div>
              </div>

              {/* Social Login */}
              <div className="grid gap-3 sm:gap-4">
                <button className="flex items-center justify-center gap-2 px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg transition text-sm sm:text-base font-medium text-gray-700 hover:bg-[#063b5e] hover:text-white hover:cursor-pointer">
                  <span>
                    <FcGoogle size={28} />
                  </span>
                  Google
                </button>
              </div>

              {/* Sign Up Link */}
              <p className="text-center text-gray-600 text-sm mt-6 sm:mt-8">
                Don't have an account?{" "}
                <Link
                  href="/auth/sign-up"
                  className="text-[#0970B4] hover:text-[#064a8a] font-semibold transition"
                >
                  Sign up here
                </Link>
              </p>
            </div>

            {/* Footer */}
            <div className="bg-gray-50 px-6 sm:px-8 md:px-10 py-4 border-t border-gray-200">
              <p className="text-center text-gray-500 text-xs sm:text-sm">
                By signing in, you agree to our{" "}
                <a href="#" className="text-[#0970B4] hover:underline">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="text-[#0970B4] hover:underline">
                  Privacy Policy
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
