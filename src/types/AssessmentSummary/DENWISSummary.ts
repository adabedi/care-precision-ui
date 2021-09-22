export interface DENWISSummary {
  value: number;
  trend: DENWISTrend;
}

enum DENWISTrend {
  raising,
  same,
  decreasing,
}
