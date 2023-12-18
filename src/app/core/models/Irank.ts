export interface Irank{
    number?: number;
    num? : number;
    firstName?: string;
    lastName?: string;
    score?: number;
    rank?: number;
    nationality?: string;
}
export class Rank implements Irank {

  constructor(public number?: number,
              public num? : number,
              public firstName?: string,
              public lastName?: string,
              public score?: number,
              public rank?: number,
              public nationality?: string
  ) {
  }
}
