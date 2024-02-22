import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../core/services/AuthService";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    protected authService : AuthService,
  ) {
  }

  ngOnInit() {
  }

  protected readonly window = window;
}
