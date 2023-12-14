import {EquipmentItem} from "./IEquipmentItem";

export interface IOrder{
  id? : number;
  start?: string;
  end?: string;
  orderEquipment?: EquipmentItem[];
}

export class Order implements IOrder{
  constructor(public id?: number,
              public start?: string,
              public end?: string,
              public orderEquipment?: EquipmentItem[]
  ) {}
}
