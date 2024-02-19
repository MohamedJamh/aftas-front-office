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

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  form!: FormGroup;
  submitted : boolean = false;

  constructor(
    private readonly _formBuilder: FormBuilder,
    private readonly _router: Router,
    private authService: AuthService,
    private userService: UserService,
    private cryptoService: CryptoService
  ) {}

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      identityType: ['', Validators.required],
      identityNumber: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  get formControls() {
    return this.form.controls;
  }

  onSubmit() {
    this.submitted = true;
    console.log("Form submitted!")
    const { email, password } = this.form.value;
    if (this.form.invalid){
      alert('Invalid form')
      return;
    }
    const user = {
      'email': email,
      'password': password
    } as User;
    this.authService.signIn(user)
      .subscribe((response : HttpResponse<Response<Auth>>) => {
        if([200].includes(response.status) && response.body?.result){
          alert("sign-in successful!")
          localStorage.setItem('aftasacctoken', response.body?.result.accessToken!);
          localStorage.setItem('aftasreftoken', response.body?.result.refreshToken!);

          this.userService.profile()
            .pipe(first())
            .subscribe((response : HttpResponse<Response<User>>) => {
              if([200].includes(response.status) && response.body?.result){
                alert("profile fetched successfully!")
                const encryptedUser : string = this.cryptoService.encrypt(JSON.stringify(response.body?.result));
                localStorage.setItem('aftasuser', encryptedUser);
                this._router.navigate(['/dashboard']);
              }
            });
        }else {
          alert("sign-in failed!")
        }
      });
  }
}
