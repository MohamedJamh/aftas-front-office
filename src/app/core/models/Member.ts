import {Organization} from "./Organization";

export interface IMember{
    id?: number | undefined;
    num?: string;
    firstName?: string;
    lastName?: string;
    accessionDate?: Date;
    nationality?: string;
    identityDocumentType?: string;
    identityNumber?: string;
}

export class Member implements IMember{

    constructor(
      public id?: number,
      public num?: string,
      public firstName?: string,
      public lastName?: string,
      public accessionDate?: Date,
      public nationality?: string,
      public identityDocumentType?: string,
      public identityNumber?: string,
    ){}
}
