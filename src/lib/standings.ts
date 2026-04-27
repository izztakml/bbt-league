import { Standing, MatchResult, Team } from "./data";
import { teams } from "./data";

export function calculateStandings(matches: MatchResult[], allTeams: Team[]): Standing[] {
  const standings: { [key: string]: Standing } = {};

  allTeams.forEach((team) => {
    standings[team.id] = {
      teamId: team.id,
      teamName: team.name,
      mp: 0,
      w: 0,
      d: 0,
      l: 0,
      gf: 0,
      ga: 0,
      gd: 0,
      pts: 0,
    };
  });

  matches.forEach((match) => {
    if (!match.isPlayed) return;

    const home = standings[match.homeTeam];
    const away = standings[match.awayTeam];

    home.mp++;
    away.mp++;
    home.gf += match.homeScore;
    home.ga += match.awayScore;
    away.gf += match.awayScore;
    away.ga += match.homeScore;

    if (match.homeScore > match.awayScore) {
      home.w++;
      away.l++;
      home.pts += 3;
    } else if (match.homeScore < match.awayScore) {
      away.w++;
      home.l++;
      away.pts += 3;
    } else {
      home.d++;
      away.d++;
      home.pts += 1;
      away.pts += 1;
    }
  });

  Object.values(standings).forEach((s) => {
    s.gd = s.gf - s.ga;
  });

  return Object.values(standings).sort((a, b) => {
    if (b.pts !== a.pts) return b.pts - a.pts;
    if (b.gd !== a.gd) return b.gd - a.gd;
    return b.gf - a.gf;
  });
}