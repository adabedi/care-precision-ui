export interface News2 {
  temperature: number;
  pulse: number;
  respirationRate: number;
  spO2: number;
  inspiredOxygen: OxygenDeliveryRoomAir | OxygenDelivery;
  acvpu: Acvpu;
  systolic: number;
  diastolic: number;
}

interface Acvpu {
  code: AcvpuCode;
  value: AcvpuValue;
}

enum AcvpuValue {
  ALERT = 'Alert',
  VOICE = 'Voice',
  CONFUSION = 'Confusion',
  PAIN = 'Pain',
  UNRESPONSIVE = 'Unresponsive',
}

enum AcvpuCode {
  ALERT = 'at0005',
  VOICE = 'at0006',
  CONFUSION = 'at0015',
  PAIN = 'at0007',
  UNRESPONSIVE = ' at0008',
}

interface OxygenDeliveryRoomAir {
  oxygenDelivery: OxygenDeliveryRoomAirEnum;
}

interface OxygenDelivery {
  oxygenDelivery: string;
  flowRate: number;
}

enum OxygenDeliveryRoomAirEnum {
  roomAir,
}
