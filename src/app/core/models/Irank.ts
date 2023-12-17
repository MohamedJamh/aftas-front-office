export interface Irank{
    number?: number;
    firstName?: string;
    lastName?: string;
    score?: number;
    rank?: number;
}
export class Rank implements Irank {

  constructor(public number?: number,
              public firstName?: string,
              public lastName?: string,
              public score?: number,
              public rank?: number
  ) {
  }
}
