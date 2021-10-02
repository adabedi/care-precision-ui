export interface Measurements {
  softSigns: string[];
  frailty: Frailty;
  height: number;
  weight: number;
}

export interface Background extends Omit<Measurements, 'softSigns'> {}

export interface Frailty {
  code: FralityCode;
  value: string;
}

export enum FralityCode {
  VERY_FIT = 'at0005',
  WELL = 'at0006',
  MANGING_WELL = 'at0007',
  VURNERABLE = 'at0008',
  MILDLY_FRAIL = 'at0009',
  MODERATELY_FRAIL = 'at0010',
  SEVERELY_FRAIL = 'at0011',
  VERY_SEVERELY_FRAIL = 'at0012',
  TERMINALLY_ILL = 'at0013',
}

export enum FralityValue {
  VERY_FIT = 'Very fit',
  WELL = 'Well',
  MANGING_WELL = 'Manging well',
  VURNERABLE = 'Vurnerable',
  MILDLY_FRAIL = 'Mildly frail',
  MODERATELY_FRAIL = 'Moderately frail',
  SEVERELY_FRAIL = 'Severely frail',
  VERY_SEVERELY_FRAIL = 'Very severely frail',
  TERMINALLY_ILL = 'Terminally ill',
}

export const fralityValueCode = {
  [FralityValue.WELL]: FralityCode.WELL,
  [FralityValue.VERY_FIT]: FralityCode.VERY_FIT,
  [FralityValue.MANGING_WELL]: FralityCode.MANGING_WELL,
  [FralityValue.VURNERABLE]: FralityCode.VURNERABLE,
  [FralityValue.MILDLY_FRAIL]: FralityCode.MILDLY_FRAIL,
  [FralityValue.MODERATELY_FRAIL]: FralityCode.MODERATELY_FRAIL,
  [FralityValue.SEVERELY_FRAIL]: FralityCode.SEVERELY_FRAIL,
  [FralityValue.VERY_SEVERELY_FRAIL]: FralityCode.VERY_SEVERELY_FRAIL,
  [FralityValue.TERMINALLY_ILL]: FralityCode.TERMINALLY_ILL,
};

export enum FralityDesc {
  VERY_FIT = 'People who are robust, active, energetic and motivated. These people commonly exercise regularly. They are among the fittest for their age.',
  WELL = 'People who have no active disease Symptoms but are less fit than category 1 often they Exercise or are very active occasionally e g seasonally',
  MANGING_WELL = 'People whose medical problems are well controlled, but are not regularly active beyond routine walking.',
  VURNERABLE = 'While not dependent on others for daily help, often symptoms limit activities. A common complaint is being “slowed up”, and/or being tired during the day',
  MILDLY_FRAIL = 'These people often have more evident slowing, and need help in high order IADLs (finances, transportation, heavy housework, medications). Typically, mild frailty progressively impairs shopping and walking outside alone, meal preparation and housework',
  MODERATELY_FRAIL = 'People need help with all outside activities and with keeping house. Inside, they often have problems with stairs and need help with bathing and might need minimal assistance (cuing, standby) with dressing.',
  SEVERELY_FRAIL = 'Completely dependent for personal care, from whatever cause (physical or cognitive). Even so, they seem stable and not at high risk of dying (within ~ 6 months).',
  VERY_SEVERELY_FRAIL = 'Completely dependent, approaching the end of life. Typically, they could not recover even from a minor illness.',
  TERMINALLY_ILL = 'pproaching the end of life. This category applies to people with a life expectancy <6 months, who are not otherwise evidently frail.',
}
