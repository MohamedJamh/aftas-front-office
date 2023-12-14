import {EquipmentFamily} from "./EquipmentFamily";

export interface IEquipment{
    id? : number;
    name? : string;
    quantity? : number;
    quantityAvailable? : number;
    quantityReserved? : number;
    equipmentFamily : EquipmentFamily;
}

export class Equipment implements IEquipment{
    constructor(
        public id? : number,
        public name? : string,
        public quantity? : number,
        public quantityAvailable? : number,
        public quantityReserved? : number,
        public equipmentFamily : EquipmentFamily = new EquipmentFamily()
    ){}
}
