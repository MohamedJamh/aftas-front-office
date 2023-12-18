import {HttpClient, HttpResponse} from "@angular/common/http";
import {EnvService} from "./EnvService";
import {Injectable} from "@angular/core";
import {Response} from "../models/Response";
import {catchError, Observable} from "rxjs";
import {Member} from "../models/Member";

@Injectable({
  providedIn: 'root'
})
export class HuntingService {
  constructor(private httpClient : HttpClient, private envService : EnvService) {}

  registerHunt(hunt : any){
    return this.httpClient.post<Response<any>>(this.envService.apiUrl + "/hunts/register", hunt, {observe : 'response'})
      .pipe(
        catchError((httpResponse) => {
          let errorMessage : string = httpResponse.error.message + "\n";
          if(httpResponse.error.errors != undefined ) {
            for (let err of httpResponse.error.errors) {
              errorMessage += err.message + "\n";
            }
          }
          alert(errorMessage)
          return new Observable<HttpResponse<Response<any>>>();
        })
      )
  }
}
