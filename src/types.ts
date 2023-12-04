export type Event = {
  sport: string;
  participant1?: string;
  participant2?: string;
  score?: string | string[][];
};

export type ParsedResult = {
  name: string;
  score: string;
};
