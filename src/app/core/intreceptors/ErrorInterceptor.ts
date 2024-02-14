import {Injectable} from "@angular/core";
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest, HttpResponse
} from "@angular/common/http";
import {first, map, Observable} from "rxjs";
import {catchError} from "rxjs/operators";
import {AuthService} from "../services/AuthService";
import {Response} from "../models/Response";
import {Auth} from "../models/IAuth";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor() {}
  intercept( request: HttpRequest<any>, next: HttpHandler) : Observable<HttpEvent<Response<any>>> {

    return next.handle(request)
    // .pipe(
    //     catchError((httpResponse) => {
    //         let errorMessage : string = httpResponse.error.message + "\n";
    //         for (let err of httpResponse.error.errors) {
    //             errorMessage += err.message + "\n";
    //         }
    //         alert(errorMessage)
    //         return new Observable<HttpEvent<Response<any>>>();
    //     })
    // )
  }
}
