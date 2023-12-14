export interface IOrganization{
    id?: number ;
    name?: string;
    since? : number;
    industry? : string;
    size? : number;
}

export class Organization implements IOrganization{
    constructor(
        public name?: string,
        public since?: number,
        public industry?: string,
        public size?: number,
        public id?: number
    ){}
}
