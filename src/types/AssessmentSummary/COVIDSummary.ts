export interface COVIDSummary {
  suspectedCovidStatus: SuspectedCovidStatus;
  covidTestRequest: string;
  dateIsolationDueToEnd: string;
}

enum SuspectedCovidStatus {
  red,
  greed,
  amber,
  grey,
}
