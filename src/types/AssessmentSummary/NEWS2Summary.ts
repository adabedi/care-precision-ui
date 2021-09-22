export interface NEWS2Summary {
  clinicalRisk: NEWS2SummaryClinicalRisk;
  trend: NEWS2SummarTrend;
  score: Score;
}

interface Score {
  respirationRate: CodeValueOrdinal;
  spoScale_1: CodeValueOrdinal;
  airOrOxygen: CodeValueOrdinal;
  systolicBloodPressure: CodeValueOrdinal;
  pulse: CodeValueOrdinal;
  consciousness: CodeValueOrdinal;
  temperature: CodeValueOrdinal;
  totalScore: number;
}

export enum NEWS2SummaryClinicalRisk {
  LOW = 'Low',
  LOW_MEDIUM = 'Low-medium',
  MEDIUM = 'Medium',
  HIGH = 'High',
}

export enum NEWS2SummarTrend {
  increasing,
  decreasing,
  same,
  first,
}

interface CodeValueOrdinal {
  code: string;
  ordinal: number;
  value: string;
}
