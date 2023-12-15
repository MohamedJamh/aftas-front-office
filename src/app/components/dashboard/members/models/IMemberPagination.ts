import {Member} from "../../../../core/models/Member";
export interface IMemberPagination {
  members: Member[];
    totalPages?: number;
    totalElements?: number;
    currentPage?: number;
}

export class MemberPagination implements IMemberPagination {
  constructor(
    public members = new Array<Member>(),
    public totalPages?: number,
    public totalElements?: number,
    public currentPage?: number
  ) {}
}
