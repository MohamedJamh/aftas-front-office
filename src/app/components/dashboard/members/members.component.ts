import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Member} from "../../../core/models/Member";
import {EnvService} from "../../../core/services/EnvService";
import { Response } from 'src/app/core/models/Response';
import {MemberService} from "../../../core/services/MemberService";

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {

  members : Member[] = [];
  newMember  : Member = new Member();

  constructor(private userService : MemberService) { }

  ngOnInit(): void {
    this.userService.getMembers()
      .subscribe((response : HttpResponse<Response<Member[]>>) => {
        if(response.status == 200 && response.body?.result){
            this.members = response.body.result;
        }
      })
  }

  addUser() {
      this.userService.addMember(this.newMember).subscribe((response : HttpResponse<Response<Member>>) => {
        if(response.status == 200 && response.body?.result){
          this.members.push(response.body.result);
          window.alert(response.body.message)
        }
      });
  }

  trackUser(index : number, user : Member) {
    return user.id!;
  }


}
