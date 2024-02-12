import {Injectable} from "@angular/core";
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest, HttpResponse
} from "@angular/common/http";
import {first, Observable} from "rxjs";
import {catchError} from "rxjs/operators";
import {AuthService} from "../services/AuthService";
import {Response} from "../models/Response";
import {Auth} from "../models/IAuth";
import {Router} from "@angular/router";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authService : AuthService, private readonly _router: Router,) {}
  private countError : number = 0
  intercept( request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let token : string | null = localStorage.getItem("aftasacctoken");
    if (token && ! request.url.includes("auth") ) {
      request = request.clone({
        setHeaders: {
          'Authorization': `Bearer ${token}`
        }
      });
    }

    return next.handle(request).pipe(
      catchError((err:HttpErrorResponse) => {
        if(err.status === 401 && this.countError != 1){
          this.countError++;
          this.handle401Error(request, next);
        }else if(this.countError === 1){
          localStorage.removeItem('aftasacctoken');
          localStorage.removeItem('aftasreftoken');
          this.countError = 0;
          alert("You are not authorized to access this resource")
          this._router.navigate(['/auth']);
        }
        throw err;
      })
    );
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    debugger
    this.authService.refreshToken().subscribe((response: HttpResponse<Response<Auth>>) => {
        if([200].includes(response.status) && response.body?.result){
          alert("new acc token")
          localStorage.setItem('aftasacctoken', response.body?.result.accessToken!);
          this._router.navigate(['/dashboard']);
        }
    });
  }

}
