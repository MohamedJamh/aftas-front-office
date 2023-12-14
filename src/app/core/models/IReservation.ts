export interface IReservation{
    rentStartDate? : string,
    rentEndDate? : string,
    overallCost? : number,
    firstName? : string,
    lastName? : string,
    organizationName? : string,
}

export class Reservation implements IReservation{
    constructor(
        public rentStartDate? : string,
        public rentEndDate? : string,
        public overallCost? : number,
        public firstName? : string,
        public lastName? : string,
        public organizationName? : string,
    ){}
}
