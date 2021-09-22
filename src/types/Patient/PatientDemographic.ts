export interface PatientDemographic {
  identifier: Identifier;
  birthDate: string;
  name: string;
  gender: Gender;
  location: LocationEnum;
}

enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  NONBINARY = 'nonbinary',
  UNSPECIFIED = 'unspecified',
}

export enum LocationEnum {
  BEDROOM = 'bedroom',
}

export interface Identifier {
  id: string;
  nhsNumber: string;
}
