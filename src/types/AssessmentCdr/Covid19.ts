export interface Covid19 {
  dateOfFirstSymptoms: string;
  specificSigns: Covid19SpecificSigns;
}

interface Covid19SpecificSigns {
  value: Covid19SpecificSignsValue;
  code: Covid19SpecificSignsCode;
}
enum Covid19SpecificSignsValue {
  FEVER = 'Fever',
  COUGH = 'Cough',
  SORE_THROAT = 'Sore Throat',
  EAR_PAIN = 'Ear pain',
  RUNNY_NOSE = 'Runny Nose',
  MUSCLE_ACHES = 'Muscle aches',
  JOINT_PAIN = 'Joint pain',
  FATIGUE_MALAISE = 'Fatigue/malaise',
  ANOSMIA = 'Anosmia (loss of taste/smell)',
  DIARRHEA = 'Diarrhea',
  ABDOMINAL_PAIN = 'Abdominal pain',
  NAUSEA_AND_VOMITING = 'Nausea and vomiting',
  BLEEDING = 'Bleeding',
  HEADACHE = 'Headache',
  SEIZURES = 'Seizures',
  ALTERED_CONSCIOUSNESS = 'Altered consciousness',
  CHEST_PAIN = 'Chest pain',
  SHORTNESS_OF_BREATH = 'Shortness of breath',
}

enum Covid19SpecificSignsCode {
  FEVER = '386661006',
  COUGH = '49727002',
  SORE_THROAT = '162397003',
  EAR_PAIN = '16001004',
  RUNNY_NOSE = '64531003',
  MUSCLE_ACHES = '68962001',
  JOINT_PAIN = '57676002',
  FATIGUE_MALAISE = '84229001',
  ANOSMIA = '272028008',
  DIARRHEA = '62315008',
  ABDOMINAL_PAIN = '21522001',
  NAUSEA_AND_VOMITING = '16932000',
  BLEEDING = '74474003',
  HEADACHE = '25064002',
  SEIZURES = '91175000',
  ALTERED_CONSCIOUSNESS = '3006004',
  CHEST_PAIN = '29857009',
  SHORTNESS_OF_BREATH = '267036007',
}
