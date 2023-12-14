export interface IEquipmentItem{
  id?: number;
  equipmentName?: string;
  price?: number | null;
  reference?: string;
}

export class EquipmentItem{
  constructor(public id?: number,
              public equipmentName?: string,
              public price?: number | null,
              public reference?: string) {}
}
