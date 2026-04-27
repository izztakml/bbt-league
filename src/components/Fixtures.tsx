'use client';

import { MatchResult, Team } from "@/lib/data";

interface FixturesProps {
  matchweeks: { [key: number]: MatchResult[] };
  teams: Team[];
  selectedWeek: number;
  onWeekChange: (week: number) => void;
}

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

export default function Fixtures({ matchweeks, teams, selectedWeek, onWeekChange }: FixturesProps) {
  const getTeamName = (teamId: string) => {
    const team = teams.find((t) => t.id === teamId);
    return team?.name || teamId;
  };

  const totalWeeks = 18;
  const weeks = Array.from({ length: totalWeeks }, (_, i) => i + 1);

  const playedCount = matchweeks[selectedWeek]?.filter(m => m.isPlayed).length || 0;
  const totalMatches = matchweeks[selectedWeek]?.length || 4;

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-6">
        {weeks.map((week) => {
          const played = matchweeks[week]?.filter(m => m.isPlayed).length || 0;
          const total = matchweeks[week]?.length || 4;
          const isComplete = played === total && total > 0;
          
          return (
            <button
              key={week}
              onClick={() => onWeekChange(week)}
              className="relative px-4 py-2.5 rounded-xl font-semibold text-sm transition-all"
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

      <div className="mb-4 flex items-center gap-2 text-sm" style={{ color: "#64748b" }}>
        <span>Matchweek {selectedWeek}</span>
        <span>•</span>
        <span>{playedCount}/{totalMatches} matches played</span>
      </div>

      <div className="space-y-3">
        {matchweeks[selectedWeek]?.map((match, index) => (
          <div
            key={index}
            className="relative p-5 rounded-xl flex items-center justify-between"
            style={{ 
              backgroundColor: match.isPlayed ? "rgba(30, 58, 95, 0.6)" : "rgba(30, 58, 95, 0.3)",
              border: "1px solid #2a3a5a"
            }}
          >
            {match.isPlayed && (
              <div className="absolute top-2 right-2">
                <span className="text-[10px] px-2 py-0.5 rounded-full" style={{ backgroundColor: "rgba(34, 197, 94, 0.2)", color: "#22c55e" }}>FT</span>
              </div>
            )}
            
            <div className="flex-1 flex items-center justify-end gap-3">
              <span className="text-lg font-bold" style={{ color: "#ffffff" }}>{getTeamName(match.homeTeam)}</span>
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: teamColors[match.homeTeam] || "#6b7280" }}></div>
            </div>

            <div className="mx-6 flex items-center gap-3">
              <span className="text-3xl font-bold tracking-wider" style={{ 
                color: match.isPlayed
                  ? match.homeScore > match.awayScore
                    ? "#22c55e"
                    : match.homeScore < match.awayScore
                    ? "#ef4444"
                    : "#eab308"
                  : "#64748b"
              }}>
                {match.isPlayed ? match.homeScore : "-"}
              </span>
              <span style={{ color: "#64748b", fontSize: "20px" }}>—</span>
              <span className="text-3xl font-bold tracking-wider" style={{ 
                color: match.isPlayed
                  ? match.awayScore > match.homeScore
                    ? "#22c55e"
                    : match.awayScore < match.homeScore
                    ? "#ef4444"
                    : "#eab308"
                  : "#64748b"
              }}>
                {match.isPlayed ? match.awayScore : "-"}
              </span>
            </div>

            <div className="flex-1 flex items-center justify-start gap-3">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: teamColors[match.awayTeam] || "#6b7280" }}></div>
              <span className="text-lg font-bold" style={{ color: "#ffffff" }}>{getTeamName(match.awayTeam)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}