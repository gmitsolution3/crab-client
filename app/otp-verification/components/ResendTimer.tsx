"use client";

import { useState, useEffect } from "react";

interface ResendTimerProps {
  initialTime: number;
  onResend: () => void;
  canResend: boolean;
  setCanResend: (value: boolean) => void;
  disabled: boolean;
}

export default function ResendTimer({
  initialTime,
  onResend,
  canResend,
  setCanResend,
  disabled,
}: ResendTimerProps) {
  const [timeLeft, setTimeLeft] = useState<number>(initialTime);

  useEffect(() => {
    if (timeLeft === 0) {
      setCanResend(true);
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, setCanResend]);

  const handleResend = () => {
    if (canResend && !disabled) {
      setTimeLeft(initialTime);
      setCanResend(false);
      onResend();
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="flex flex-col items-center space-y-3">
      <p className="text-gray-600 text-sm">Didn't receive the code?</p>

      {!canResend ? (
        <div className="flex items-center space-x-2">
          <span className="text-gray-500">Resend OTP in</span>
          <span className="font-mono font-bold text-blue-600">
            {formatTime(timeLeft)}
          </span>
        </div>
      ) : (
        <button
          onClick={handleResend}
          disabled={disabled}
          className={`px-6 py-2 rounded-lg font-medium transition duration-200 ${
            disabled
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-blue-50 text-blue-600 hover:bg-blue-100"
          }`}
        >
          Resend OTP
        </button>
      )}
    </div>
  );
}