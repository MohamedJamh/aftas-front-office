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
import {AuthService} from "../services/AuthService";

@Injectable({
  providedIn: 'root'
})
export class LoggedGuardGuard implements CanActivate, CanActivateChild {
  constructor(
    private authService: AuthService,
    private readonly _router: Router,
  ) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree
  {
    return this.checkLogged() ;
  }
  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkLogged()
  }

  private checkLogged() : boolean {
    if(this.authService.isLogged()){
      this._router.navigate(['/dashboard'])
      return false;
    }
    return true;
  }

}
