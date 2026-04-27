export interface Team {
  id: string;
  name: string;
  shortName: string;
}

export interface MatchResult {
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  isPlayed: boolean;
}

export interface Standing {
  teamId: string;
  teamName: string;
  mp: number;
  w: number;
  d: number;
  l: number;
  gf: number;
  ga: number;
  gd: number;
  pts: number;
}

export const teams: Team[] = [
  { id: "estevao", name: "Estevao", shortName: "EST" },
  { id: "topalun", name: "Topalun", shortName: "TOP" },
  { id: "topsojat", name: "Topsojat", shortName: "TSJ" },
  { id: "amxspark", name: "AmXSpark", shortName: "AMX" },
  { id: "topaan", name: "Topaan", shortName: "TAA" },
  { id: "shikadot", name: "shikadot", shortName: "SHI" },
  { id: "terusmaju", name: "TerusMaju", shortName: "TM" },
  { id: "spmche", name: "spm che", shortName: "SPM" },
  { id: "atikiataka", name: "Atiki-Ataka", shortName: "ATK" },
];

export const initialMatchweeks: { [key: number]: MatchResult[] } = {
  1: [
    { homeTeam: "estevao", awayTeam: "topalun", homeScore: 1, awayScore: 7, isPlayed: true },
    { homeTeam: "topsojat", awayTeam: "amxspark", homeScore: 2, awayScore: 0, isPlayed: true },
    { homeTeam: "topaan", awayTeam: "shikadot", homeScore: 2, awayScore: 4, isPlayed: true },
    { homeTeam: "terusmaju", awayTeam: "spmche", homeScore: 4, awayScore: 1, isPlayed: true },
  ],
  2: [
    { homeTeam: "topalun", awayTeam: "shikadot", homeScore: 5, awayScore: 4, isPlayed: true },
    { homeTeam: "spmche", awayTeam: "amxspark", homeScore: 2, awayScore: 5, isPlayed: true },
    { homeTeam: "atikiataka", awayTeam: "topsojat", homeScore: 5, awayScore: 1, isPlayed: true },
    { homeTeam: "terusmaju", awayTeam: "topaan", homeScore: 3, awayScore: 2, isPlayed: true },
  ],
  3: [
    { homeTeam: "topsojat", awayTeam: "topalun", homeScore: 1, awayScore: 2, isPlayed: true },
    { homeTeam: "topaan", awayTeam: "estevao", homeScore: 0, awayScore: 0, isPlayed: false },
    { homeTeam: "terusmaju", awayTeam: "amxspark", homeScore: 6, awayScore: 5, isPlayed: true },
    { homeTeam: "atikiataka", awayTeam: "shikadot", homeScore: 3, awayScore: 2, isPlayed: true },
  ],
  4: [
    { homeTeam: "atikiataka", awayTeam: "topalun", homeScore: 2, awayScore: 3, isPlayed: true },
    { homeTeam: "spmche", awayTeam: "topaan", homeScore: 0, awayScore: 0, isPlayed: false },
    { homeTeam: "shikadot", awayTeam: "topsojat", homeScore: 0, awayScore: 0, isPlayed: false },
    { homeTeam: "amxspark", awayTeam: "estevao", homeScore: 0, awayScore: 0, isPlayed: false },
  ],
  5: [
    { homeTeam: "topalun", awayTeam: "topsojat", homeScore: 0, awayScore: 0, isPlayed: false },
    { homeTeam: "estevao", awayTeam: "topaan", homeScore: 0, awayScore: 0, isPlayed: false },
    { homeTeam: "amxspark", awayTeam: "terusmaju", homeScore: 0, awayScore: 0, isPlayed: false },
    { homeTeam: "shikadot", awayTeam: "atikiataka", homeScore: 0, awayScore: 0, isPlayed: false },
  ],
  6: [
    { homeTeam: "topalun", awayTeam: "topaan", homeScore: 0, awayScore: 0, isPlayed: false },
    { homeTeam: "topsojat", awayTeam: "terusmaju", homeScore: 0, awayScore: 0, isPlayed: false },
    { homeTeam: "estevao", awayTeam: "atikiataka", homeScore: 0, awayScore: 0, isPlayed: false },
    { homeTeam: "shikadot", awayTeam: "spmche", homeScore: 0, awayScore: 0, isPlayed: false },
  ],
  7: [
    { homeTeam: "topalun", awayTeam: "spmche", homeScore: 0, awayScore: 0, isPlayed: false },
    { homeTeam: "atikiataka", awayTeam: "amxspark", homeScore: 0, awayScore: 0, isPlayed: false },
    { homeTeam: "terusmaju", awayTeam: "estevao", homeScore: 0, awayScore: 0, isPlayed: false },
    { homeTeam: "topaan", awayTeam: "topsojat", homeScore: 0, awayScore: 0, isPlayed: false },
  ],
  8: [
    { homeTeam: "topalun", awayTeam: "terusmaju", homeScore: 0, awayScore: 0, isPlayed: false },
    { homeTeam: "topaan", awayTeam: "atikiataka", homeScore: 0, awayScore: 0, isPlayed: false },
    { homeTeam: "estevao", awayTeam: "spmche", homeScore: 0, awayScore: 0, isPlayed: false },
    { homeTeam: "amxspark", awayTeam: "shikadot", homeScore: 0, awayScore: 0, isPlayed: false },
  ],
  9: [
    { homeTeam: "atikiataka", awayTeam: "spmche", homeScore: 0, awayScore: 0, isPlayed: false },
    { homeTeam: "terusmaju", awayTeam: "shikadot", homeScore: 0, awayScore: 0, isPlayed: false },
    { homeTeam: "topaan", awayTeam: "amxspark", homeScore: 0, awayScore: 0, isPlayed: false },
    { homeTeam: "topsojat", awayTeam: "estevao", homeScore: 0, awayScore: 0, isPlayed: false },
  ],
  10: [
    { homeTeam: "topalun", awayTeam: "amxspark", homeScore: 0, awayScore: 0, isPlayed: false },
    { homeTeam: "shikadot", awayTeam: "estevao", homeScore: 0, awayScore: 0, isPlayed: false },
    { homeTeam: "spmche", awayTeam: "topsojat", homeScore: 0, awayScore: 0, isPlayed: false },
    { homeTeam: "atikiataka", awayTeam: "terusmaju", homeScore: 0, awayScore: 0, isPlayed: false },
  ],
  11: [
    { homeTeam: "terusmaju", awayTeam: "topalun", homeScore: 0, awayScore: 0, isPlayed: false },
    { homeTeam: "atikiataka", awayTeam: "topaan", homeScore: 0, awayScore: 0, isPlayed: false },
    { homeTeam: "spmche", awayTeam: "estevao", homeScore: 0, awayScore: 0, isPlayed: false },
    { homeTeam: "shikadot", awayTeam: "amxspark", homeScore: 0, awayScore: 0, isPlayed: false },
  ],
  12: [
    { homeTeam: "topaan", awayTeam: "topalun", homeScore: 0, awayScore: 0, isPlayed: false },
    { homeTeam: "terusmaju", awayTeam: "topsojat", homeScore: 0, awayScore: 0, isPlayed: false },
    { homeTeam: "atikiataka", awayTeam: "estevao", homeScore: 0, awayScore: 0, isPlayed: false },
    { homeTeam: "spmche", awayTeam: "shikadot", homeScore: 0, awayScore: 0, isPlayed: false },
  ],
  13: [
    { homeTeam: "spmche", awayTeam: "atikiataka", homeScore: 0, awayScore: 0, isPlayed: false },
    { homeTeam: "shikadot", awayTeam: "terusmaju", homeScore: 0, awayScore: 0, isPlayed: false },
    { homeTeam: "amxspark", awayTeam: "topaan", homeScore: 0, awayScore: 0, isPlayed: false },
    { homeTeam: "estevao", awayTeam: "topsojat", homeScore: 0, awayScore: 0, isPlayed: false },
  ],
  14: [
    { homeTeam: "shikadot", awayTeam: "topalun", homeScore: 0, awayScore: 0, isPlayed: false },
    { homeTeam: "amxspark", awayTeam: "spmche", homeScore: 0, awayScore: 0, isPlayed: false },
    { homeTeam: "topsojat", awayTeam: "atikiataka", homeScore: 0, awayScore: 0, isPlayed: false },
    { homeTeam: "topaan", awayTeam: "terusmaju", homeScore: 0, awayScore: 0, isPlayed: false },
  ],
  15: [
    { homeTeam: "amxspark", awayTeam: "topalun", homeScore: 0, awayScore: 0, isPlayed: false },
    { homeTeam: "estevao", awayTeam: "shikadot", homeScore: 0, awayScore: 0, isPlayed: false },
    { homeTeam: "topsojat", awayTeam: "spmche", homeScore: 0, awayScore: 0, isPlayed: false },
    { homeTeam: "terusmaju", awayTeam: "atikiataka", homeScore: 0, awayScore: 0, isPlayed: false },
  ],
  16: [
    { homeTeam: "topalun", awayTeam: "estevao", homeScore: 0, awayScore: 0, isPlayed: false },
    { homeTeam: "amxspark", awayTeam: "topsojat", homeScore: 0, awayScore: 0, isPlayed: false },
    { homeTeam: "shikadot", awayTeam: "topaan", homeScore: 0, awayScore: 0, isPlayed: false },
    { homeTeam: "spmche", awayTeam: "terusmaju", homeScore: 0, awayScore: 0, isPlayed: false },
  ],
  17: [
    { homeTeam: "spmche", awayTeam: "topalun", homeScore: 0, awayScore: 0, isPlayed: false },
    { homeTeam: "amxspark", awayTeam: "atikiataka", homeScore: 0, awayScore: 0, isPlayed: false },
    { homeTeam: "estevao", awayTeam: "terusmaju", homeScore: 0, awayScore: 0, isPlayed: false },
    { homeTeam: "topsojat", awayTeam: "topaan", homeScore: 0, awayScore: 0, isPlayed: false },
  ],
  18: [
    { homeTeam: "topalun", awayTeam: "atikiataka", homeScore: 0, awayScore: 0, isPlayed: false },
    { homeTeam: "topaan", awayTeam: "spmche", homeScore: 0, awayScore: 0, isPlayed: false },
    { homeTeam: "topsojat", awayTeam: "shikadot", homeScore: 0, awayScore: 0, isPlayed: false },
    { homeTeam: "estevao", awayTeam: "amxspark", homeScore: 0, awayScore: 0, isPlayed: false },
  ],
};