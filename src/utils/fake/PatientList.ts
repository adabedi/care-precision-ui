const PATIENT_LIST = [
  {
    denwis: {
      value: 14,
      trend: 'decreasing',
    },
    location: 'Bedroom',
    name: 'Mrs Fredrica Smith',
    gender: 'female',
    birth_date: '2021-09-19',
    measurements: {
      soft_signs: ['string'],
      frailty: {
        code: 'at0005',
        value: 'Very fit',
      },
      height: 170,
      weight: 60,
    },
    identifier: {
      id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      nhs_number: '3333333333',
    },
  },
  {
    sepsis: {
      value: 'red',
    },
    location: 'Bedroom',
    name: 'Mr Horatio Samson',
    gender: 'male',
    birth_date: '2021-09-19',
    measurements: {
      soft_signs: ['string'],
      frailty: {
        code: 'at0008',
        value: 'Vurnerable',
      },
      height: 155,
      weight: 40,
    },
    identifier: {
      id: '3fa85f64-5717-4562-b3fc-2c963f66afa8',
      nhs_number: '9876543211',
    },
  },
  {
    news2: {
      clinical_risk: 'Low',
      score: {
        respiration_rate: {
          ordinal: 2,
          value: '21-24',
          code: 'at0020',
        },
        spo_scale_1: {
          ordinal: 1,
          value: '94-95',
          code: 'at0031',
        },
        air_or_oxygen: {
          code: 'at0036',
          value: 'Air',
          ordinal: 0,
        },
        systolic_blood_pressure: {
          code: 'at0017',
          ordinal: 3,
          value: '≤90',
        },
        pulse: {
          code: 'at0013',
          ordinal: 0,
          value: '51-90',
        },
        consciousness: {
          ordinal: 0,
          value: 'Alert',
          code: 'at0024',
        },
        temperature: {
          value: '35.1-36.0',
          ordinal: 1,
          code: 'at0023',
        },
        total_score: 3,
      },
      trend: 'increasing',
    },
    location: 'Bedroom',
    name: 'Miss Darlene Cunningham',
    gender: 'female',
    birth_date: '2020-09-19',
    measurements: {
      soft_signs: ['string'],
      frailty: {
        code: 'at0005',
        value: 'Very fit',
      },
      height: 160,
      weight: 40,
    },
    identifier: {
      id: '3fa85f64-5717-4562-b3fc-2c963f66afa9',
      nhs_number: '9876543211',
    },
  },
  {
    covid: {
      suspected_covid_status: 'red',
      covid_test_request: {
        date: '2021-09-19T13:54:22.365Z',
        comment: 'string',
      },
      date_isolation_due_to_end: '2021-09-19T13:54:22.365Z',
    },
    location: 'Bedroom',
    name: 'Miss Delisay Santos',
    gender: 'female',
    birth_date: '2018-09-19',
    measurements: {
      soft_signs: ['string'],
      frailty: {
        code: 'at0005',
        value: 'Very fit',
      },
      height: 166,
      weight: 45,
    },
    identifier: {
      id: '3fa85f64-5717-4562-b3fc-2c963f66afa7',
      nhs_number: '9876543210',
    },
  },
];

export const searchByNameOrNhs = (patients, searchValue) => {
  const filterd = patients.filter(
    patient =>
      patient.name.toUpperCase().includes(searchValue.toUpperCase()) ||
      patient.nhsnumber.toUpperCase().includes(searchValue.toUpperCase()),
  );
  return filterd;
};
export default PATIENT_LIST;
