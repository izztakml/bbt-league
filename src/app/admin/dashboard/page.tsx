'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { teams, initialMatchweeks, MatchResult } from "@/lib/data";

const teamColors: { [key: string]: string } = {
  "estevao": "#3b82f6",
  "topalun": "#ef4444",
  "topsojat": "#f97316",
  "amxspark": "#eab308",
  "topaan": "#22c55e",
  "shikadot": "#a855f7",
  "terusmaju": "#06b6d4",
  "spmche": "#eab308",
  "atikiataka": "#78350f",
};

export default function AdminDashboard() {
  const router = useRouter();
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [matches, setMatches] = useState(initialMatchweeks);
  const [selectedWeek, setSelectedWeek] = useState(1);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const auth = sessionStorage.getItem("adminAuth");
    if (!auth) {
      router.push("/admin");
    } else {
      setIsAuth(true);
      fetch("/api/matches")
        .then((res) => res.json())
        .then((data) => {
          if (data.matchweeks && Object.keys(data.matchweeks).length > 0) {
            setMatches(data.matchweeks);
          }
        })
        .catch(() => {})
        .finally(() => setIsLoading(false));
    }
  }, [router]);

  const getTeamName = (teamId: string) => {
    const team = teams.find((t) => t.id === teamId);
    return team?.name || teamId;
  };

  const updateMatch = (week: number, index: number, field: "homeScore" | "awayScore", value: string | number) => {
    const newMatches = { ...matches };
    const updatedMatch = { ...newMatches[week][index] };
    
    updatedMatch[field] = value === "" ? 0 : parseInt(value as string) || 0;
    if (updatedMatch.homeScore > 0 || updatedMatch.awayScore > 0) {
      updatedMatch.isPlayed = true;
    }
    
    newMatches[week][index] = updatedMatch;
    setMatches(newMatches);
    setSaved(false);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/matches", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ matchweeks: matches }),
      });
      if (res.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
      }
    } catch (error) {
      console.error("Error saving:", error);
    }
    setSaving(false);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("adminAuth");
    router.push("/");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)" }}>
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p style={{ color: "#64748b" }}>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!isAuth) return null;

  return (
    <div className="min-h-screen" style={{ background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)" }}>
      <header className="py-4 px-4" style={{ background: "linear-gradient(90deg, #1a1a2e 0%, #16213e 100%)", borderBottom: "1px solid #2a3a5a" }}>
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl overflow-hidden" style={{ backgroundColor: "#1a1a2e" }}>
              <Image src="/bbt.jpg" alt="BBT" width={40} height={40} className="w-full h-full object-cover" />
            </div>
            <div>
              <h1 className="text-lg font-bold" style={{ color: "#ffffff" }}>Admin Dashboard</h1>
              <p className="text-xs" style={{ color: "#64748b" }}>Match Result Manager</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-lg text-sm transition-colors"
            style={{ backgroundColor: "#1e3a5f", color: "#94a3b8" }}
          >
            Logout
          </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-6">
        <div className="rounded-2xl p-6 mb-6" style={{ backgroundColor: "rgba(30, 41, 80, 0.6)", border: "1px solid #2a3a5a" }}>
          <div className="mb-4">
            <h2 className="text-lg font-bold" style={{ color: "#ffffff" }}>Select Matchweek</h2>
          </div>

          <div className="flex flex-wrap gap-2">
            {Array.from({ length: 18 }, (_, i) => i + 1).map((week) => {
              const played = matches[week]?.filter(m => m.isPlayed).length || 0;
              const total = matches[week]?.length || 4;
              const isComplete = played === total && total > 0;
              
              return (
                <button
                  key={week}
                  onClick={() => setSelectedWeek(week)}
                  className="relative px-5 py-3 rounded-xl font-semibold text-sm transition-all"
                  style={{
                    backgroundColor: selectedWeek === week ? "#3b82f6" : "#1e3a5f",
                    color: selectedWeek === week ? "#ffffff" : "#94a3b8"
                  }}
                >
                  <span>Week {week}</span>
                  {isComplete && (
                    <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full" style={{ backgroundColor: "#22c55e", border: "2px solid #1e293b" }}></span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <div className="rounded-2xl p-6 mb-6" style={{ backgroundColor: "rgba(30, 41, 80, 0.6)", border: "1px solid #2a3a5a" }}>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-bold" style={{ color: "#ffffff" }}>Matchweek {selectedWeek}</h2>
              <p className="text-sm" style={{ color: "#64748b" }}>Enter match scores</p>
            </div>
            <button
              onClick={handleSave}
              disabled={saving}
              className="px-6 py-3 font-semibold rounded-xl transition-all"
              style={{ 
                backgroundColor: saving ? "#1e3a5f" : saved ? "#22c55e" : "#3b82f6", 
                color: "#ffffff"
              }}
            >
              {saving ? "Saving..." : saved ? "Saved!" : "Save Changes"}
            </button>
          </div>

          <div className="space-y-4">
            {matches[selectedWeek]?.map((match, index) => (
              <div
                key={index}
                className="p-5 rounded-xl flex items-center justify-between"
                style={{ backgroundColor: "rgba(30, 58, 95, 0.5)", border: "1px solid #2a3a5a" }}
              >
                <div className="flex-1 flex items-center justify-end gap-3">
                  <span className="text-lg font-bold" style={{ color: "#ffffff" }}>{getTeamName(match.homeTeam)}</span>
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: teamColors[match.homeTeam] || "#6b7280" }}></div>
                </div>

                <div className="mx-6 flex items-center gap-4">
                  <input
                    type="number"
                    value={match.homeScore || ""}
                    onChange={(e) => updateMatch(selectedWeek, index, "homeScore", e.target.value)}
                    className="w-20 py-3 px-4 rounded-xl text-center text-2xl font-bold"
                    style={{ backgroundColor: "#1a1a2e", border: "1px solid #2a3a5a", color: "#ffffff" }}
                    placeholder="-"
                  />
                  <span style={{ color: "#64748b", fontSize: "24px" }}>—</span>
                  <input
                    type="number"
                    value={match.awayScore || ""}
                    onChange={(e) => updateMatch(selectedWeek, index, "awayScore", e.target.value)}
                    className="w-20 py-3 px-4 rounded-xl text-center text-2xl font-bold"
                    style={{ backgroundColor: "#1a1a2e", border: "1px solid #2a3a5a", color: "#ffffff" }}
                    placeholder="-"
                  />
                </div>

                <div className="flex-1 flex items-center justify-start gap-3">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: teamColors[match.awayTeam] || "#6b7280" }}></div>
                  <span className="text-lg font-bold" style={{ color: "#ffffff" }}>{getTeamName(match.awayTeam)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end">
          <a href="/" className="flex items-center gap-2 transition-colors" style={{ color: "#64748b" }}>
            <span>View Website</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
      </main>
    </div>
  );
}