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
  newUser  : User = new User();
  searchValue : string = "";

  constructor(private userService : UserService) { }

  ngOnInit(): void {
    this.fetchAllUsers();
  }

  fetchAllUsers(pageNo? : number) {
    if(!pageNo) pageNo = 0;
    this.userService.getUsers(false,pageNo)
      .subscribe((response : HttpResponse<Response<UserPagination>>) => {
        if(response.status == 200 && response.body?.result){
          this.availableUsers = response.body.result;
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
  trackDisUser(index : number, user : User) {
    return user.id!;
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

  previousPage(table : string) {
    switch (table)
    {
      case "available":
        this.previousOnAvailablePage();
        break;
    }
  }
  nextPage(table : string) {
    switch (table)
    {
      case "available":
        this.nextOnAvailablePage();
        break;
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

  enableUser(user: User) {
    this.userService.enableUser(user.num!).subscribe((response : HttpResponse<Response<User>>) => {
      if([200].includes(response.status) && response.body?.result){
        this.fetchAllUsers(this.availableUsers.currentPage! -1);
        window.alert(response.body.message)
      }
    })
  }
}
