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
    <div className="w-full min-h-screen pt-20">
      <div className="container mx-auto px-6 md:px-12 py-12">
        <div className="max-w-md mx-auto">
          <h1 className="text-4xl md:text-5xl font-light mb-6 text-center">
            Login
          </h1>
          <p className="text-gray-600 mb-8 text-center">
            Enter your email to receive a one-time password
          </p>

          {!otpSent ? (
            <form onSubmit={handleSendOTP} className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 focus:border-black focus:ring-0 transition-colors"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full border border-black text-black py-3 px-4 hover:bg-black hover:text-white transition-colors"
              >
                Send OTP
              </button>
              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            </form>
          ) : (
            <form onSubmit={handleSignIn} className="space-y-6">
              <div>
                <label
                  htmlFor="otp"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Enter OTP
                </label>
                <input
                  type="text"
                  id="otp"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 focus:border-black focus:ring-0 transition-colors"
                  placeholder="Enter 6-digit OTP"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full border border-black text-black py-3 px-4 hover:bg-black hover:text-white transition-colors"
              >
                Verify OTP
              </button>
              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
