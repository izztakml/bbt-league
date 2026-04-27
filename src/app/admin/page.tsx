'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    if (password === "bbt2026") {
      sessionStorage.setItem("adminAuth", "true");
      router.push("/admin/dashboard");
    } else {
      setError("Invalid password. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-3 py-8" style={{ background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)" }}>
      <div className="w-full max-w-sm sm:max-w-md">
        <div className="text-center mb-8">
          <div className="w-14 h-14 sm:w-20 sm:h-20 mx-auto mb-3 rounded-2xl overflow-hidden" style={{ backgroundColor: "#1a1a2e" }}>
            <Image src="/bbt.jpg" alt="BBT League" width={80} height={80} className="w-full h-full object-cover" />
          </div>
          <h1 className="text-xl sm:text-2xl font-bold" style={{ color: "#ffffff" }}>Admin Login</h1>
          <p className="mt-1 text-sm" style={{ color: "#64748b" }}>BBT League 2026</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full px-4 py-3 sm:py-4 rounded-xl transition-all text-base"
              style={{ 
                backgroundColor: "rgba(30, 41, 80, 0.6)", 
                border: "1px solid #2a3a5a", 
                color: "#ffffff"
              }}
            />
          </div>

          {error && (
            <div className="p-3 rounded-lg text-sm text-center" style={{ backgroundColor: "rgba(239, 68, 68, 0.1)", border: "1px solid rgba(239, 68, 68, 0.2)", color: "#ef4444" }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 sm:py-4 font-semibold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed text-base"
            style={{ backgroundColor: "#3b82f6", color: "#ffffff" }}
          >
            {loading ? "Loading..." : "Login"}
          </button>
        </form>

        <div className="text-center mt-6 sm:mt-8">
          <Link href="/" className="text-sm transition-colors" style={{ color: "#64748b" }}>
            ← Back
          </Link>
        </div>
      </div>
    </div>
  );
}