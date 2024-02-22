import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../../core/services/AuthService";
import {UserService} from "../../../core/services/UserService";
import {CryptoService} from "../../../core/services/CryptoService";
import {User} from "../../../core/models/IUser";
import {HttpResponse} from "@angular/common/http";
import {Response} from "../../../core/models/Response";
import {Auth} from "../../../core/models/IAuth";
import {first} from "rxjs";
import {EnvService} from "../../../core/services/EnvService";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private readonly _formBuilder: FormBuilder,
    private readonly _router: Router,
    private authService: AuthService,
    private userService: UserService,
    private cryptoService: CryptoService,
    private envService: EnvService
  ) {}

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      identityType: ['', Validators.required],
      identityNumber: ['', Validators.required],
      nationality: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    const { firstName, lastName, identityType, identityNumber, nationality, email, password, } = this.form.value;
    if (this.form.invalid || ! this.envService.allowedIdentityTypes.includes(identityType.toUpperCase()) ){
      alert('Invalid form')
      return;
    }
    const user = {
      'email': email,
      'password': password,
      'firstName': firstName,
      'lastName': lastName,
      'identityType': identityType,
      'identityNumber': identityNumber,
      'nationality': nationality
    } as User;

    this.authService.signUp(user)
      .subscribe((response : HttpResponse<Response<Auth>>) => {
        if([200].includes(response.status) && response.body?.result){
          alert("sign-up successful! \n" + "Contact aftas stuff to enable your account in order to be able to connect" )
          this._router.navigate(['/auth']);
        }else {
          alert("sign-in failed!")
        }
      });
  }
}
