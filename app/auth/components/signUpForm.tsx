"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Eye,
  EyeOff,
  UserPlus,
  Mail,
  Lock,
  User,
  Phone,
  MapPin,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import Link from "next/link";
import { FaHome } from "react-icons/fa";
import { useRouter } from "next/navigation";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [apiError, setApiError] = useState("");
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      password: "",
      confirmPassword: "",
      agreeTerms: false,
    },
  });

  const password = watch("password");

  // const onSubmit = (data: any) => {
  //   setLoading(true);
  //   setTimeout(() => {
  //     setLoading(false);
  //     setSuccessMessage(
  //       "Account created successfully! Redirecting to login..."
  //     );
  //     console.log("Form Data:", data);
  //     setTimeout(() => {
  //       setSuccessMessage("");
  //     }, 3000);
  //   }, 1500);
  // };

  const onSubmit = async (data: any) => {
    setApiError("");
    setLoading(true);

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phone: data.phone,
          address: data.address,
          password: data.password,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        setApiError(result.error || "Failed to create account");
        setLoading(false);
        return;
      }

      setSuccessMessage(
        "Account created successfully! Redirecting to dashboard..."
      );
      setTimeout(() => {
        router.push("/");
      }, 1500);
    } catch (error) {
      setApiError("An error occurred. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="p-5">
        <Link
          className="flex gap-2 max-w-35 items-center px-4 py-2 border border-[#0970B4] rounded-lg hover:bg-[#0970B4] hover:text-white hover:cursor-pointer"
          href="/"
        >
          <FaHome size={20} />
          Go Home
        </Link>
      </div>
      <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 md:p-8 py-8">
        {/* Sign Up Container */}
        <div className="relative w-full max-w-2xl">
          {/* Card */}
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            {/* Top Accent Bar */}
            <div className="h-1 bg-linear-to-r from-[#0970B4] via-[#0855a0] to-[#064a8a]"></div>

            {/* Content */}
            <div className="p-6 sm:p-8 md:p-10">
              {/* Header Section */}
              <div className="text-center mb-8 sm:mb-10">
                <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-linear-to-br from-[#0970B4] to-[#064a8a] rounded-2xl mb-4 shadow-lg">
                  <UserPlus className="text-white" size={32} />
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mt-4">
                  Create Account
                </h1>
                <p className="text-gray-500 text-sm mt-2">
                  Join us today and start managing your business
                </p>
              </div>

              {/* Success Message */}
              {successMessage && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
                  <CheckCircle className="text-green-600 shrink-0" size={20} />
                  <p className="text-green-800 text-sm">{successMessage}</p>
                </div>
              )}
              {/* Error Message */}
              {apiError && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                  <AlertCircle className="text-red-600 shrink-0" size={20} />
                  <p className="text-red-800 text-sm">{apiError}</p>
                </div>
              )}

              {/* Sign Up Form */}
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-5 sm:space-y-6"
              >
                {/* First Name & Last Name */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      First Name *
                    </label>
                    <div className="relative">
                      <User
                        className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                        size={20}
                      />
                      <input
                        type="text"
                        placeholder="John"
                        {...register("firstName", {
                          required: "First name is required",
                          minLength: {
                            value: 2,
                            message: "First name must be at least 2 characters",
                          },
                        })}
                        className={`w-full pl-10 sm:pl-12 pr-4 sm:pr-5 py-2.5 sm:py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-20 transition text-sm sm:text-base ${
                          errors.firstName
                            ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                            : "border-gray-300 focus:border-[#0970B4] focus:ring-[#0970B4]"
                        }`}
                      />
                    </div>
                    {errors.firstName && (
                      <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                        <AlertCircle size={14} />
                        {errors.firstName.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Last Name *
                    </label>
                    <div className="relative">
                      <User
                        className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                        size={20}
                      />
                      <input
                        type="text"
                        placeholder="Doe"
                        {...register("lastName", {
                          required: "Last name is required",
                          minLength: {
                            value: 2,
                            message: "Last name must be at least 2 characters",
                          },
                        })}
                        className={`w-full pl-10 sm:pl-12 pr-4 sm:pr-5 py-2.5 sm:py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-20 transition text-sm sm:text-base ${
                          errors.lastName
                            ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                            : "border-gray-300 focus:border-[#0970B4] focus:ring-[#0970B4]"
                        }`}
                      />
                    </div>
                    {errors.lastName && (
                      <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                        <AlertCircle size={14} />
                        {errors.lastName.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Email Input */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail
                      className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                      size={20}
                    />
                    <input
                      type="email"
                      placeholder="john@example.com"
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Invalid email address",
                        },
                      })}
                      className={`w-full pl-10 sm:pl-12 pr-4 sm:pr-5 py-2.5 sm:py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-20 transition text-sm sm:text-base ${
                        errors.email
                          ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                          : "border-gray-300 focus:border-[#0970B4] focus:ring-[#0970B4]"
                      }`}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                      <AlertCircle size={14} />
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Phone & Address */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <div className="relative">
                      <Phone
                        className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                        size={20}
                      />
                      <input
                        type="tel"
                        placeholder="+880 1234 567890"
                        {...register("phone", {
                          required: "Phone is required",
                          pattern: {
                            value:
                              /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/,
                            message: "Invalid phone number",
                          },
                        })}
                        className={`w-full pl-10 sm:pl-12 pr-4 sm:pr-5 py-2.5 sm:py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-20 transition text-sm sm:text-base ${
                          errors.phone
                            ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                            : "border-gray-300 focus:border-[#0970B4] focus:ring-[#0970B4]"
                        }`}
                      />
                    </div>
                    {errors.phone && (
                      <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                        <AlertCircle size={14} />
                        {errors.phone.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Address
                    </label>
                    <div className="relative">
                      <MapPin
                        className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                        size={20}
                      />
                      <input
                        type="text"
                        placeholder="123 Main Street"
                        {...register("address", {
                          required: "Email is required",
                        })}
                        className="w-full pl-10 sm:pl-12 pr-4 sm:pr-5 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#0970B4] focus:ring-2 focus:ring-[#0970B4] focus:ring-opacity-20 transition text-sm sm:text-base"
                      />
                    </div>
                  </div>
                </div>

                {/* Password Input */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Password *
                  </label>
                  <div className="relative">
                    <Lock
                      className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                      size={20}
                    />
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      {...register("password", {
                        required: "Password is required",
                        minLength: {
                          value: 8,
                          message: "Password must be at least 8 characters",
                        },
                        pattern: {
                          value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                          message:
                            "Password must contain uppercase, lowercase, and number",
                        },
                      })}
                      className={`w-full pl-10 sm:pl-12 pr-12 sm:pr-14 py-2.5 sm:py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-20 transition text-sm sm:text-base ${
                        errors.password
                          ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                          : "border-gray-300 focus:border-[#0970B4] focus:ring-[#0970B4]"
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                      <AlertCircle size={14} />
                      {errors.password.message}
                    </p>
                  )}
                </div>

                {/* Confirm Password Input */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Confirm Password *
                  </label>
                  <div className="relative">
                    <Lock
                      className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                      size={20}
                    />
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="••••••••"
                      {...register("confirmPassword", {
                        required: "Please confirm your password",
                        validate: (value) =>
                          value === password || "Passwords do not match",
                      })}
                      className={`w-full pl-10 sm:pl-12 pr-12 sm:pr-14 py-2.5 sm:py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-20 transition text-sm sm:text-base ${
                        errors.confirmPassword
                          ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                          : "border-gray-300 focus:border-[#0970B4] focus:ring-[#0970B4]"
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={20} />
                      ) : (
                        <Eye size={20} />
                      )}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                      <AlertCircle size={14} />
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>

                {/* Terms Agreement */}
                <div>
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      {...register("agreeTerms", {
                        required: "You must agree to the terms and conditions",
                      })}
                      className="w-4 h-4 mt-1 rounded border-gray-300 cursor-pointer accent-[#0970B4]"
                    />
                    <span className="text-gray-600 text-sm">
                      I agree to the{" "}
                      <a
                        href="#"
                        className="text-[#0970B4] hover:underline font-semibold"
                      >
                        Terms of Service
                      </a>{" "}
                      and{" "}
                      <a
                        href="#"
                        className="text-[#0970B4] hover:underline font-semibold"
                      >
                        Privacy Policy
                      </a>
                    </span>
                  </label>
                  {errors.agreeTerms && (
                    <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                      <AlertCircle size={14} />
                      {errors.agreeTerms.message}
                    </p>
                  )}
                </div>

                {/* Sign Up Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-linear-to-r from-[#0970B4] to-[#064a8a] hover:from-[#0855a0] hover:to-[#053d78] text-white font-semibold py-2.5 sm:py-3 rounded-lg transition duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Creating Account...
                    </>
                  ) : (
                    <>
                      <UserPlus size={20} />
                      Create Account
                    </>
                  )}
                </button>
              </form>

              {/* Login Link */}
              <p className="text-center text-gray-600 text-sm mt-6 sm:mt-8">
                Already have an account?{" "}
                <Link className="text-[#0970B4] font-bold" href="/auth/sign-in">
                  Sign in here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
