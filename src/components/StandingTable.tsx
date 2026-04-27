'use client';

import { Standing } from "@/lib/data";

interface StandingTableProps {
  standings: Standing[];
}

const teamColors: { [key: string]: string } = {
  "Estevao": "#3b82f6",
  "Topalun": "#ff0000",
  "Topsojat": "#f97316",
  "AmXSpark": "#eab308",
  "Topaan": "#22c55e",
  "shikadot": "#a855f7",
  "TerusMaju": "#06b6d4",
  "spm che": "#eab308",
  "Atiki-Ataka": "#78350f",
};

export default function StandingTable({ standings }: StandingTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr style={{ borderBottom: "1px solid #2a3a5a" }}>
            <th className="p-3 text-center font-medium text-xs uppercase tracking-wider" style={{ color: "#64748b" }}>Pos</th>
            <th className="p-3 text-left font-medium text-xs uppercase tracking-wider" style={{ color: "#64748b" }}>Club</th>
            <th className="p-3 text-center font-medium text-xs uppercase tracking-wider" style={{ color: "#64748b" }}>P</th>
            <th className="p-3 text-center font-medium text-xs uppercase tracking-wider" style={{ color: "#64748b" }}>W</th>
            <th className="p-3 text-center font-medium text-xs uppercase tracking-wider" style={{ color: "#64748b" }}>D</th>
            <th className="p-3 text-center font-medium text-xs uppercase tracking-wider" style={{ color: "#64748b" }}>L</th>
            <th className="p-3 text-center font-medium text-xs uppercase tracking-wider" style={{ color: "#64748b" }}>GF</th>
            <th className="p-3 text-center font-medium text-xs uppercase tracking-wider" style={{ color: "#64748b" }}>GA</th>
            <th className="p-3 text-center font-medium text-xs uppercase tracking-wider" style={{ color: "#64748b" }}>GD</th>
            <th className="p-3 text-center font-medium text-xs uppercase tracking-wider" style={{ color: "#64748b" }}>Pts</th>
          </tr>
        </thead>
        <tbody>
          {standings.map((team, index) => (
            <tr
              key={team.teamId}
              style={{ borderBottom: "1px solid #2a3a5a" }}
              className="transition-all"
            >
              <td className="p-3 text-center">
                <span 
                  className="inline-flex items-center justify-center w-7 h-7 rounded-full font-bold text-xs"
                  style={{ 
                    backgroundColor: index === 0 ? "#eab308" : index === 1 ? "#9ca3af" : index === 2 ? "#b45309" : index === 3 ? "#3b82f6" : "#1e3a5f",
                    color: index < 4 ? "#000" : "#94a3b8"
                  }}
                >
                  {index + 1}
                </span>
              </td>
              <td className="p-3">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: teamColors[team.teamName] || "#6b7280" }}></div>
                  <span className="font-semibold" style={{ color: "#ffffff" }}>{team.teamName}</span>
                </div>
              </td>
              <td className="p-3 text-center" style={{ color: "#94a3b8" }}>{team.mp}</td>
              <td className="p-3 text-center font-medium" style={{ color: "#22c55e" }}>{team.w}</td>
              <td className="p-3 text-center font-medium" style={{ color: "#eab308" }}>{team.d}</td>
              <td className="p-3 text-center font-medium" style={{ color: "#ef4444" }}>{team.l}</td>
              <td className="p-3 text-center font-medium" style={{ color: "#ffffff" }}>{team.gf}</td>
              <td className="p-3 text-center font-medium" style={{ color: "#ffffff" }}>{team.ga}</td>
              <td className="p-3 text-center font-bold" style={{ color: team.gd >= 0 ? "#22c55e" : "#ef4444" }}>
                {team.gd > 0 ? `+${team.gd}` : team.gd}
              </td>
              <td className="p-3 text-center">
                <span className="inline-block px-3 py-1 rounded-full font-bold text-sm" style={{ backgroundColor: "rgba(59, 130, 246, 0.2)", color: "#60a5fa" }}>
                  {team.pts}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}