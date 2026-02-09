"use client";

import { useEffect, useRef, KeyboardEvent } from "react";

interface OTPInputProps {
  length: number;
  value: string;
  onChange: (value: string) => void;
  onComplete: () => void;
}

export default function OTPInput({
  length,
  value,
  onChange,
  onComplete,
}: OTPInputProps) {
  const inputRefs = useRef<HTMLInputElement[]>([]);

  useEffect(() => {
    if (value.length === length) {
      onComplete();
    }
  }, [value, length, onComplete]);

  const handleChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const newValue = e.target.value.replace(/[^0-9]/g, "");

    if (newValue) {
      // Update OTP value
      const newOtp = value.split("");
      newOtp[index] = newValue;
      const updatedOtp = newOtp.join("");

      if (updatedOtp.length <= length) {
        onChange(updatedOtp);

        // Move to next input
        if (index < length - 1) {
          inputRefs.current[index + 1]?.focus();
        }
      }
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !value[index] && index > 0) {
      // Move to previous input on backspace
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowLeft" && index > 0) {
      e.preventDefault();
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < length - 1) {
      e.preventDefault();
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").replace(/[^0-9]/g, "");

    if (pastedData.length === length) {
      onChange(pastedData);
      inputRefs.current[length - 1]?.focus();
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex justify-center space-x-3 mb-6">
        {Array.from({ length }).map((_, index) => (
          <input
            key={index}
            ref={(el) => {
              if (el) inputRefs.current[index] = el;
            }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={value[index] || ""}
            onChange={(e) => handleChange(index, e)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={index === 0 ? handlePaste : undefined}
            className="w-14 h-14 text-center text-2xl font-bold bg-gray-50 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition duration-200"
            autoFocus={index === 0}
          />
        ))}
      </div>
      <p className="text-sm text-gray-500">Enter {length}-digit code</p>
    </div>
  );
}
