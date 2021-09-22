import { PatientDemographic } from './PatientDemographic';
import { Measurements } from './Measurements';
import {
  COVIDSummary,
  DENWISSummary,
  NEWS2Summary,
  SepsisSummary,
} from 'types/AssessmentSummary';

export interface Patient extends PatientDemographic {
  measurements: Measurements;
  denwis?: DENWISSummary;
  covid?: COVIDSummary;
  news2?: NEWS2Summary;
  sepsis?: SepsisSummary;
}
