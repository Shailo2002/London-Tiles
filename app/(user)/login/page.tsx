"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [error, setError] = useState("");

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setOtpSent(true);
        setError("");
      } else {
        const data = await response.json();
        setError(data.error || "Failed to send OTP");
      }
    } catch {
      setError("Failed to connect to server");
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await signIn("credentials", {
      redirect: false,
      email,
      otp,
    });

    console.log("signIn result:", result);

    if (result?.ok) {
      localStorage.setItem("isLoggedIn", "true");
      window.location.href = `/dashboard?email=${email}`;
    } else {
      setError("Invalid OTP or email");
    }
  };

  return (
    <div className="w-full min-h-screen pt-20 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Dark mode toggle */}
      <button
        onClick={() => document.documentElement.classList.toggle("dark")}
        className="absolute top-4 right-4 text-xs border px-3 py-1 rounded bg-white dark:bg-gray-800 dark:text-white"
      >
        Toggle Dark
      </button>

      <div className="container mx-auto px-6 md:px-12 py-12">
        <div className="max-w-md mx-auto bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
          <h1 className="text-3xl font-semibold mb-6 text-center">Login</h1>

          {error && (
            <div className="mb-4 text-sm text-red-600 dark:text-red-400">
              {error}
            </div>
          )}

          <form
            onSubmit={otpSent ? handleSignIn : handleSendOTP}
            className="space-y-6"
          >
            <div>
              <label
                htmlFor="email"
                className="block text-sm mb-1 text-gray-600 dark:text-gray-300"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-black dark:text-white focus:border-blue-600 focus:ring-0 transition-colors"
              />
            </div>

            {otpSent && (
              <div>
                <label
                  htmlFor="otp"
                  className="block text-sm mb-1 text-gray-600 dark:text-gray-300"
                >
                  Enter OTP
                </label>
                <input
                  type="text"
                  id="otp"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-black dark:text-white focus:border-blue-600 focus:ring-0 transition-colors"
                />
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-500 dark:hover:bg-blue-600 py-2 px-4 rounded-lg transition-colors font-medium"
            >
              {otpSent ? "Login" : "Send OTP"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
