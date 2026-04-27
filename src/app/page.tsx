'use client';

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import StandingTable from "@/components/StandingTable";
import Fixtures from "@/components/Fixtures";
import { teams, initialMatchweeks, MatchResult } from "@/lib/data";
import { calculateStandings } from "@/lib/standings";

type TabType = "standings" | "fixtures";

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabType>("standings");
  const [selectedWeek, setSelectedWeek] = useState(1);
  const [matches, setMatches] = useState(initialMatchweeks);

  useEffect(() => {
    fetch("/api/matches")
      .then((res) => res.json())
      .then((data) => {
        if (data.matchweeks && Object.keys(data.matchweeks).length > 0) {
          setMatches(data.matchweeks);
        }
      })
      .catch(() => {});
  }, []);

  const allMatches = Object.values(matches).flat() as MatchResult[];
  const standings = calculateStandings(allMatches, teams);

  return (
    <div className="min-h-screen" style={{ background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)" }}>
      <header className="py-5 px-4" style={{ background: "linear-gradient(90deg, #1a1a2e 0%, #16213e 100%)", borderBottom: "1px solid #2a3a5a" }}>
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl overflow-hidden" style={{ backgroundColor: "#1a1a2e" }}>
              <Image src="/bbt.jpg" alt="BBT League" width={48} height={48} className="w-full h-full object-cover" />
            </div>
            <div>
              <h1 className="text-xl font-bold" style={{ color: "#ffffff" }}>BBT League E-Football</h1>
              <p className="text-xs" style={{ color: "#6b7a99" }}>Season 2026</p>
            </div>
          </div>
          <nav className="flex gap-1 items-center">
            <button
              onClick={() => setActiveTab("standings")}
              className="px-4 py-2 rounded-lg font-semibold text-sm transition-all"
              style={{
                backgroundColor: activeTab === "standings" ? "#3b82f6" : "transparent",
                color: activeTab === "standings" ? "#ffffff" : "#94a3b8"
              }}
            >
              Table
            </button>
            <button
              onClick={() => setActiveTab("fixtures")}
              className="px-4 py-2 rounded-lg font-semibold text-sm transition-all"
              style={{
                backgroundColor: activeTab === "fixtures" ? "#3b82f6" : "transparent",
                color: activeTab === "fixtures" ? "#ffffff" : "#94a3b8"
              }}
            >
              Fixtures
            </button>
            <Link
              href="/admin"
              className="px-4 py-2 rounded-lg font-semibold text-sm ml-2 transition-all"
              style={{ backgroundColor: "#1e3a5f", color: "#60a5fa" }}
            >
              Admin
            </Link>
          </nav>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8">
        {activeTab === "standings" && (
          <div className="rounded-2xl p-6" style={{ backgroundColor: "rgba(30, 41, 80, 0.6)", backdropFilter: "blur(10px)", border: "1px solid #2a3a5a" }}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: "#eab308" }}>
                <div className="w-5 h-5" style={{ backgroundColor: "#000" }}></div>
              </div>
              <h2 className="text-lg font-bold" style={{ color: "#ffffff" }}>Table Standing</h2>
            </div>
            <StandingTable standings={standings} />
          </div>
        )}
        
        {activeTab === "fixtures" && (
          <div className="rounded-2xl p-6" style={{ backgroundColor: "rgba(30, 41, 80, 0.6)", backdropFilter: "blur(10px)", border: "1px solid #2a3a5a" }}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: "#22c55e" }}>
                <div className="w-4 h-4" style={{ backgroundColor: "#fff" }}></div>
              </div>
              <h2 className="text-lg font-bold" style={{ color: "#ffffff" }}>Matchweek Fixtures</h2>
            </div>
            <Fixtures
              matchweeks={matches}
              teams={teams}
              selectedWeek={selectedWeek}
              onWeekChange={setSelectedWeek}
            />
          </div>
        )}
      </main>

      <footer className="py-8 px-4 text-center text-sm mt-8" style={{ borderTop: "1px solid #2a3a5a" }}>
        <p style={{ color: "#64748b" }}>BBT League 2026 E-football</p>
      </footer>
    </div>
  );
}