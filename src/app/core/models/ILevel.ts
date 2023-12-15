export interface Ilevel{
    id? : number;
    code? : number;
    description? : string;
    points? : number;
}
export class Level implements Ilevel{
    constructor(
        public id? : number,
        public code? : number,
        public description? : string,
        public points? : number,
    ){}
}
