"use client";
import { showError, showSuccess } from "@/lib/toastHelper";
import { AuthService } from "@/services/auth/authService";
import { useState } from "react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await AuthService.sendForgotPasswordLink(email);

      if (res.success) {
        showSuccess(res.message || "A reset link has been sent to your email.");
      } else {
        showError(res.message || "Something went wrong.");
      }
    } catch (error) {
        console.log(error)
      showError("Something went wrong.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="max-w-md w-full bg-white p-8 rounded shadow">
        <h2 className="text-2xl font-bold mb-6 text-center">Forgot Password</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email" className="block mb-2 text-sm font-medium">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            className="w-full p-2 mb-4 border border-gray-300 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>
      </div>
    </div>
  );
}
