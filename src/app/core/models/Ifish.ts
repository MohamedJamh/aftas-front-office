import {Level} from "./ILevel";

export interface Ifish {
    id? : number;
    name? : string;
    averageWeight? : number;
    level? : Level;
    image? : string;
}

export class Fish implements Ifish{
    constructor(
        public id? : number,
        public name? : string,
        public averageWeight? : number,
        public level : Level = new Level(),
        public image? : string
    ){}
}
