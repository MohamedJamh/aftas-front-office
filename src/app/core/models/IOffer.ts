import {EquipmentItem} from "./IEquipmentItem";

export interface IOffer {
    id?: number;
    overallCost?: number;
    status?: string;
    negotiable?: boolean;
    orderId?: number;
    orderEquipments?: EquipmentItem[];
}

export class Offer implements IOffer {
    constructor(public id?: number,
                public overallCost?: number,
                public status?: string,
                public negotiable?: boolean,
                public orderId?: number,
                public orderEquipments: EquipmentItem[] = []
    ) {
    }
}
