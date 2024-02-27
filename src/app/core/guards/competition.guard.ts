import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import { Observable } from 'rxjs';
import {UserService} from "../services/UserService";
import {AuthService} from "../services/AuthService";

@Injectable({
  providedIn: 'root'
})
export class CompetitionGuard implements CanActivate {
  constructor(
    private userService: UserService,
    private readonly _router: Router,
  ) {}
  canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.userService.canPerform(['competition:read','competition:all'])) return true;
    else{
      this._router.navigate(['/error']);
      return false;
    }
  }
}
