import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../../core/services/AuthService";
import {User} from "../../../core/models/IUser";
import {HttpResponse} from "@angular/common/http";
import {Auth} from "../../../core/models/IAuth";
import {Response} from "../../../core/models/Response";
import {first} from "rxjs";

@Component({
  selector: 'app-signin',
  templateUrl: './sigin.component.html',
  styleUrls: ['./sigin.component.css']
})
export class SiginComponent implements OnInit {
  form!: FormGroup;
  submitted : boolean = false;
  passwordTextType!: boolean;

  constructor(
    private readonly _formBuilder: FormBuilder,
    private readonly _router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  get formControls() {
    return this.form.controls;
  }


  onSubmit() {
    this.submitted = true;
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
        alert("signin successful!")
        localStorage.setItem('aftasacctoken', response.body?.result.accessToken!);
        localStorage.setItem('aftasreftoken', response.body?.result.refreshToken!);
        this._router.navigate(['/dashboard']);
      }
    });
  }
}
