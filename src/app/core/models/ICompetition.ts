import {EquipmentItem} from "./IEquipmentItem";
import {Time} from "@angular/common";

export interface ICompetition {
    id?: number;
    code?: string;
    date?: string;
    startTime?: string;
    endTime?: string;
    location?: string;
    numberOfParticipants?: number;
    amount?: number;
}

export class Competition implements ICompetition {
    constructor(public id?: number,
                public code?: string,
                public date?: string,
                public startTime?: string,
                public endTime?: string,
                public location?: string,
                public numberOfParticipants?: number,
                public amount?: number
    ) {
    }
}
