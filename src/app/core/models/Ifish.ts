import {Level} from "./ILevel";

export interface Ifish {
    id? : number;
    name? : string;
    averageWeight? : number;
    weight? : number;
    level? : Level;
    levelCode?: number;
    image? : string;
}

export class Fish implements Ifish{
    constructor(
        public id? : number,
        public name? : string,
        public averageWeight? : number,
        public weight? : number,
        public level : Level = new Level(),
        public levelCode? : number,
        public image? : string
    ){}
}
