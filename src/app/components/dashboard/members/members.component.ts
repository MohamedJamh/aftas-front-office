import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Member} from "../../../core/models/Member";
import {EnvService} from "../../../core/services/EnvService";
import { Response } from 'src/app/core/models/Response';
import {MemberService} from "../../../core/services/MemberService";
import {MemberPagination} from "./models/IMemberPagination";

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {

  memberPagination : MemberPagination = new MemberPagination();
  newMember  : Member = new Member();

  constructor(private userService : MemberService) { }

  ngOnInit(): void {
    this.userService.getMembers()
      .subscribe((response : HttpResponse<Response<MemberPagination>>) => {
        if(response.status == 200 && response.body?.result){
            this.memberPagination = response.body.result;
        }
      })
  }

  addUser() {
      this.userService.addMember(this.newMember).subscribe((response : HttpResponse<Response<Member>>) => {
        if(response.status == 200 && response.body?.result){
          this.memberPagination.members.push(response.body.result);
          window.alert(response.body.message)
        }
      });
  }

  trackMember(index : number, member : Member) {
    return member.id!;
  }

  previousPage() {
    if(this.memberPagination.currentPage! > 1){
      this.userService.getMembers(this.memberPagination.currentPage! - 2)
        .subscribe((response : HttpResponse<Response<MemberPagination>>) => {
          if(response.status == 200 && response.body?.result){
            this.memberPagination = response.body.result;
          }
        })
    }
  }
  nextPage() {
    if(this.memberPagination.currentPage! < this.memberPagination.totalPages!){
      this.userService.getMembers(this.memberPagination.currentPage!)
        .subscribe((response : HttpResponse<Response<MemberPagination>>) => {
          if(response.status == 200 && response.body?.result){
            this.memberPagination = response.body.result;
          }
        })
    }
  }
}
