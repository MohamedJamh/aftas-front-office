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

@Injectable({
  providedIn: 'root'
})
export class LevelGuard implements CanActivate {
  constructor(
    private userService: UserService,
    private readonly _router: Router,
  ) {}
  canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.userService.canPerform(['level:read','level:all'])) return true;
    else{
      this._router.navigate(['/error']);
      return false;
    }
  }
}
