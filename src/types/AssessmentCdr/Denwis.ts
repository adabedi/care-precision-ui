export interface Denwis {
  q1Breathing: Q1Breathing;
  q2Circulation: Q2Circulation;
  q3Temperature: Q3Temperature;
  q4Mentation: Q4Mentation;
  q5Agitation: Q5Agitation;
  q6Pain: Q6Pain;
  q7Trajectory: Q7Trajectory;
  q8PatientSubjective: Q8PatientSubjective;
  q9NurseSubjective: Q9NurseSubjective;
  q10OtherComment: string;
  totalScore: number;
}

interface Q1Breathing {
  code: Q1BreathingCode;
  value: Q1BreathingValue;
  ordinal: Q1BreathingOrdinal;
}

enum Q1BreathingValue {
  at0032 = 'No change in breathing',
  at0031 = 'Change in breathing',
}

enum Q1BreathingCode {
  at0032,
  at0031,
}

enum Q1BreathingOrdinal {
  at0032 = 0,
  at0031 = 1,
}

interface Q2Circulation {
  code: Q2CirculationCode;
  value: Q2CirculationValue;
  ordinal: Q2CirculationOrdinal;
}

enum Q2CirculationCode {
  at0037,
  at0036,
}

enum Q2CirculationValue {
  at0037 = 'No change in circulation',
  at0036 = 'Change in circulation',
}

enum Q2CirculationOrdinal {
  at0037 = 0,
  at0036 = 1,
}

interface Q3Temperature {
  code: Q3TemperatureCode;
  value: Q3TemperatureValue;
  ordinal: Q3TemperatureOrdinal;
}

enum Q3TemperatureCode {
  at0042,
  at0105,
}

enum Q3TemperatureValue {
  at0042 = 'No change in temperature',
  at0105 = 'Change in temperature',
}

enum Q3TemperatureOrdinal {
  at0042 = 0,
  at0105 = 1,
}

interface Q4Mentation {
  code: Q4MentationCode;
  value: Q4MentationValue;
  ordinal: Q4MentationOrdinal;
}

enum Q4MentationCode {
  at0046,
  at0045,
}

enum Q4MentationValue {
  at0046 = 'No change in mentation',
  at0045 = 'Change in mentation',
}

enum Q4MentationOrdinal {
  at0046 = 0,
  at0045 = 1,
}

interface Q5Agitation {
  code: Q5AgitationCode;
  value: Q5AgitationValue;
  ordinal: Q5AgitationOrdinal;
}

enum Q5AgitationCode {
  at0048,
  at0049,
}

enum Q5AgitationValue {
  at0048 = 'No agitation',
  at0049 = 'Agitation',
}

enum Q5AgitationOrdinal {
  at0048 = 0,
  at0049 = 1,
}

interface Q6Pain {
  code: Q6PainCode;
  value: Q6PainValue;
  ordinal: Q6PainOrdinal;
}

enum Q6PainCode {
  at0051,
  at0052,
}

enum Q6PainValue {
  at0051 = 'No change in pain',
  at0052 = 'Change in pain',
}

enum Q6PainOrdinal {
  at0051 = 0,
  at0052 = 1,
}
interface Q7Trajectory {
  code: Q7TrajectoryCode;
  value: Q7TrajectoryValue;
  ordinal: Q7TrajectoryOrdinal;
}

enum Q7TrajectoryCode {
  at0054,
  at0055,
}

enum Q7TrajectoryValue {
  at0054 = 'No change in trajectory',
  at0055 = 'Change in trajectory',
}

enum Q7TrajectoryOrdinal {
  at0054 = 0,
  at0055 = 1,
}

interface Q8PatientSubjective {
  code: Q8PatientSubjectiveCode;
  value: Q8PatientSubjectiveValue;
  ordinal: Q8PatientSubjectiveOrdinal;
}

enum Q8PatientSubjectiveCode {
  at0057,
  at0058,
}

enum Q8PatientSubjectiveValue {
  at0057 = 'No subjective patient indicator',
  at0058 = 'Subjective patient indicator',
}

enum Q8PatientSubjectiveOrdinal {
  at0057 = 0,
  at0058 = 1,
}

interface Q9NurseSubjective {
  code: Q9NurseSubjectiveCode;
  value: Q9NurseSubjectiveValue;
  ordinal: Q9NurseSubjectiveOrdinal;
}

enum Q9NurseSubjectiveCode {
  at0060,
  at0061,
}

enum Q9NurseSubjectiveValue {
  at0060 = 'No nurse subjective indicator',
  at0061 = 'Nurse Subjective indicator',
}

enum Q9NurseSubjectiveOrdinal {
  at0060 = 0,
  at0061 = 1,
}
