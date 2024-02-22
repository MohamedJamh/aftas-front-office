import {User} from "../../../../core/models/IUser";
export interface IUserPagination {
  users: User[];
    totalPages?: number;
    totalElements?: number;
    currentPage?: number;
}

export class UserPagination implements IUserPagination {
  constructor(
    public users = new Array<User>(),
    public totalPages?: number,
    public totalElements?: number,
    public currentPage?: number
  ) {}
}
