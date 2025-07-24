export type EquipmentStatus = 'Good' | 'Attention' | 'Broken';

export interface Equipment {
  id: string;
  location: string;
  status: EquipmentStatus;
  lastChecked: string;
}

export interface Operator {
  id: string;
  name: string;
  avatar: string;
  avatarHint: string;
}
