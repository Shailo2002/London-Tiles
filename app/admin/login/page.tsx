"use client";

import { useState } from "react";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        "/api/auth/admin/login",
        { email, password },
        { withCredentials: true } // keep this for cookies to be sent properly
      );
      if (res.data.success) {
        alert("Login successful!");
        router.push("/admin/dashboard");
      } else {
        alert("Login failed. Please try again.");
      }
    } catch (err) {
      const error = err as AxiosError<{ error: string }>;
      alert(error.response?.data?.error || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <form
        onSubmit={handleLogin}
        className="bg-white shadow-md rounded p-6 w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Admin Login</h2>

        <label className="block mb-2 text-sm font-medium">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 border rounded mb-4"
          required
        />

        <label className="block mb-2 text-sm font-medium">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 border rounded mb-6"
          required
        />

        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </main>
  );
}
