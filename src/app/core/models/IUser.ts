import {Role} from "./IRole";

export interface IUser{
  id?: number;
  num? : number;
  firstName? : string;
  lastName? : string;
  email? : string;
  personalEmail? : string;
  password? : string;
  accessionDate? : string;
  organizationName? : string;
  roles? : Role[];
  rolePermissions?: string[];
  permissionGroupPermissions?: string[];
}
export class User implements IUser {
  constructor(public id?: number,
              public num?: number,
              public firstName? : string,
              public lastName? : string,
              public identityType? : string,
              public identityNumber? : string,
              public nationality? : string,
              public email? : string,
              public personalEmail? : string,
              public password? : string,
              public accessionDate? : string,
              public organizationName? : string,
              public roles? : Role[],
              public rolePermissions?: string[],
              public permissionGroupPermissions?: string[]
  ){}

  setId(id: number): void {
    this.id = id;
  }
}
