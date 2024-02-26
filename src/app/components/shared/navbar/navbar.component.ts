import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../core/services/AuthService";
import {CryptoService} from "../../../core/services/CryptoService";
import {User} from "../../../core/models/IUser";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    protected authService : AuthService,
    private userService: AuthService,
    private cryptoService: CryptoService
  ) {
  }

  ngOnInit() {
  }

  get fullName() :string {
    const user = localStorage.getItem('aftasuser');
    if(user){
      const decryptUser : User = JSON.parse(this.cryptoService.decrypt(user)) as User;
      return `${decryptUser.firstName} ${decryptUser.lastName}`;
    }
    return ''
  }

  get email() :string {
    const user = localStorage.getItem('aftasuser');
    if(user){
      const decryptUser : User = JSON.parse(this.cryptoService.decrypt(user)) as User;
      return `${decryptUser.email}`;
    }
    return ''
  }
}
