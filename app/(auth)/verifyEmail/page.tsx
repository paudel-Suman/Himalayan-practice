"use client";

import { showError, showSuccess } from "@/lib/toastHelper";
import { AuthService } from "@/services/auth/authService";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useMyContext } from "@/app/(root)/context/store";

export default function VerifyEmailOTP() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const [optNumber, setOptNumber] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [canResend, setCanResend] = useState(false);
  const [timer, setTimer] = useState(30);
  const { login } = useMyContext();
  const handleChange = (index: number, value: string) => {
    if (/^\d$/.test(value) || value === "") {
      const updatedOtp = [...optNumber];
      updatedOtp[index] = value;
      setOptNumber(updatedOtp);
      if (value && index < 5) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  const handleSubmit = async () => {
    const code = optNumber.join("");
    if (code.length !== 6) {
      setError("Please enter the 6-digit OTP.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      if (email != null && optNumber.length != 0) {
        const otp: string = optNumber.join("");
        const res = await AuthService.verifyOTP({ email, otp });
        if (res.success) {
          login(
            {
              id: res.data.id,
              name: res.data.name,
              email: res.data.email,
              role: res.data.role,
              avatar: res.data.avatar,
            },
            res.data.token
          );
          showSuccess(res.message);
          router.push("/");
        } else {
          showError(res.message);
        }
      }
    } catch (err) {
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    let countdown: NodeJS.Timeout;

    if (timer > 0) {
      countdown = setTimeout(() => setTimer((prev) => prev - 1), 1000);
    } else {
      setCanResend(true);
    }

    return () => clearTimeout(countdown);
  }, [timer]);

  const handleResend = async () => {
    if (email != null)
      try {
        const res = await AuthService.resendEmailVerifyOTP(email);
        setTimer(30);
        setCanResend(false);
        if (res.success) {
          showSuccess(res.message);
        } else {
          showError(res.message);
        }
      } catch (error) {
        console.error("Failed to resend OTP:", error);
      }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white p-6 rounded-xl shadow-lg max-w-sm w-full text-center">
        <h2 className="text-xl font-bold mb-4">Enter OTP</h2>
        <p className="text-sm text-gray-500 mb-6">
          We sent a 6-digit code to your phone
        </p>

        <div className="flex justify-center gap-2 mb-4">
          {optNumber.map((digit, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              className="w-12 h-12 text-xl text-center border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          ))}
        </div>

        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </button>
        <div className="text-center mt-4">
          <button
            onClick={handleResend}
            disabled={!canResend}
            className={`text-sm font-semibold ${
              canResend ? "text-blue-600" : "text-gray-400 cursor-not-allowed"
            }`}
          >
            {canResend ? "Resend OTP" : `Resend in ${timer}s`}
          </button>
        </div>
      </div>
    </div>
  );
}
