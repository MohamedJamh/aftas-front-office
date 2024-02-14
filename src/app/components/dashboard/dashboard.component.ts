import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../core/services/AuthService";
import {UserService} from "../../core/services/UserService";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']

})
export class DashboardComponent implements OnInit {

  constructor(
    private readonly _router: Router,
    private authService : AuthService,
    protected userService: UserService
  ) { }

  ngOnInit() {
  }

  signOut() {
    this.authService.signOut();
    this._router.navigate(['/auth']);
  }
}
