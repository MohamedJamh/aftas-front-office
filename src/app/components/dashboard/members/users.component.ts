import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {User} from "../../../core/models/IUser";
import {EnvService} from "../../../core/services/EnvService";
import { Response } from 'src/app/core/models/Response';
import {UserService} from "../../../core/services/UserService";
import {UserPagination} from "./models/IUserPagination";

@Component({
  selector: 'app-members',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  availableUsers : UserPagination = new UserPagination();
  disabledUsers : UserPagination = new UserPagination();
  newUser  : User = new User();
  searchValue : string = "";

  constructor(private userService : UserService) { }

  ngOnInit(): void {
    this.userService.getUsers()
      .subscribe((response : HttpResponse<Response<UserPagination>>) => {
        if(response.status == 200 && response.body?.result){
            this.availableUsers = response.body.result;
        }
      })
    this.userService.getUsers(true,5)
      .subscribe((response : HttpResponse<Response<UserPagination>>) => {
        if(response.status == 200 && response.body?.result){
          this.disabledUsers = response.body.result;
        }
      })
  }

  addUser() {
      this.userService.addUsers(this.newUser).subscribe((response : HttpResponse<Response<User>>) => {
        if(response.status == 200 && response.body?.result){
          window.alert(response.body.message)
        }
      });
  }

  trackUser(index : number, user : User) {
    return user.id!;
  }
  previousPage(table : string) {
    switch (table)
    {
      case "available":
        this.previousOnAvailablePage();
        break;
      case "disabled":
        this.previousOnDisabledPage();
        break;
    }
  }
  nextPage(table : string) {
    switch (table)
    {
      case "available":
        this.nextOnAvailablePage();
        break;
      case "disabled":
        this.nextOnDisabledPage();
        break;
    }

  }

  searchUser() {
      if(this.searchValue != "" || this.searchValue != null){
          this.userService.searchUsers(this.searchValue)
              .subscribe((response : HttpResponse<Response<UserPagination>>) => {
                  if(response.status == 200 && response.body?.result){
                      this.availableUsers = response.body.result;
                  }else if(response.body?.result == null){
                      this.availableUsers.users = [];
                  }
              })
      }
  }

  resetUserTable() {
    this.searchValue = "";
    this.userService.getUsers()
        .subscribe((response : HttpResponse<Response<UserPagination>>) => {
            if(response.status == 200 && response.body?.result){
                this.availableUsers = response.body.result;
            }
        })
  }

  private previousOnAvailablePage() {
    if(this.availableUsers.currentPage! > 1){
      this.userService.getUsers(false,this.availableUsers.currentPage! - 2)
        .subscribe((response : HttpResponse<Response<UserPagination>>) => {
          if(response.status == 200 && response.body?.result){
            this.availableUsers = response.body.result;
          }
        })
    }
  }
  private previousOnDisabledPage() {
    if(this.disabledUsers.currentPage! > 1){
      this.userService.getUsers(false,this.disabledUsers.currentPage! - 2)
        .subscribe((response : HttpResponse<Response<UserPagination>>) => {
          if(response.status == 200 && response.body?.result){
            this.disabledUsers = response.body.result;
          }
        })
    }
  }
  private nextOnAvailablePage() {
    if(this.availableUsers.currentPage! < this.availableUsers.totalPages!){
      this.userService.getUsers(false,this.availableUsers.currentPage!)
        .subscribe((response : HttpResponse<Response<UserPagination>>) => {
          if(response.status == 200 && response.body?.result){
            this.availableUsers = response.body.result;
          }
        })
    }
  }
  private nextOnDisabledPage() {
    if(this.disabledUsers.currentPage! < this.disabledUsers.totalPages!){
      this.userService.getUsers(false,this.disabledUsers.currentPage!)
        .subscribe((response : HttpResponse<Response<UserPagination>>) => {
          if(response.status == 200 && response.body?.result){
            this.disabledUsers = response.body.result;
          }
        })
    }
  }
}
