import {Injectable} from "@angular/core";
import {catchError, Observable} from "rxjs";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Response} from "../models/Response";
import {Member} from "../models/Member";
import {EnvService} from "./EnvService";


@Injectable({
  providedIn : "root"
})
export class MemberService {

  constructor(private httpClient : HttpClient,private envService : EnvService,) {
  }

  getMembers() : Observable<HttpResponse<Response<Member[]>>> {
    return this.httpClient.get<Response<Member[]>>(this.envService.apiUrl + "/members", {observe : 'response'})
        .pipe(
            catchError((httpResponse) => {
              let errorMessage : string = httpResponse.error.message + "\n";
              for (let err of httpResponse.error.errors) {
                errorMessage += err.message + "\n";
              }
              alert(errorMessage)
              return new Observable<HttpResponse<Response<Member[]>>>();
            })
        )
  }

    addMember(member : Member): Observable<HttpResponse<Response<Member>>> {
      return this.httpClient.post<Response<Member>>(this.envService.apiUrl + "/members", member, {observe : 'response'})
          .pipe(
              catchError((httpResponse) => {
                let errorMessage : string = httpResponse.error.message + "\n";
                for (let err of httpResponse.error.errors) {
                  errorMessage += err.message + "\n";
                }
                alert(errorMessage)
                return new Observable<HttpResponse<Response<Member>>>();
              })
          )
    }
}
