"use client";

import { showError, showSuccess } from "@/lib/toastHelper";
import { AuthService } from "@/services/auth/authService";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function ResetPasswordPage() {
  const params = useParams();
  const router = useRouter();
  const otp = params.token as string;
  const emailParam = params.email as string;
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirm, setConfirm] = useState("");
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirm) {
      setMessage("Passwords do not match");
      return;
    }
    if (emailParam != null && newPassword != null && otp != null) {
      const email = decodeURIComponent(emailParam);
      const res = await AuthService.changeForgotPassword({
        email,
        newPassword,
        otp,
      });
      if (res.success) {
        setNewPassword("");
        setConfirm("");
        showSuccess(res.message);
        router.push("/login");
      } else {
        showError(res.message);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="max-w-md w-full bg-white p-8 rounded shadow">
        <h2 className="text-2xl font-bold mb-6 text-center">Reset Password</h2>
        {message && (
          <p className="mb-4 text-center text-sm text-red-600">{message}</p>
        )}
        <form onSubmit={handleSubmit}>
          <div className="relative mb-4">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="New Password"
              className="w-full p-2 border border-gray-300 rounded pr-10"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-2 top-2 text-sm text-gray-600"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          <div className="relative mb-4">
            <input
              type={showConfirm ? "text" : "password"}
              placeholder="Confirm Password"
              className="w-full p-2 border border-gray-300 rounded pr-10"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirm((prev) => !prev)}
              className="absolute right-2 top-2 text-sm text-gray-600"
            >
              {showConfirm ? "Hide" : "Show"}
            </button>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
}
