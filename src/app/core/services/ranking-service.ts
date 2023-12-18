import {HttpClient, HttpResponse} from "@angular/common/http";
import {EnvService} from "./EnvService";
import {Injectable} from "@angular/core";
import {Rank} from "../models/Irank";
import {Response} from "../models/Response";
import {catchError, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RankingService {
  constructor(private httpClient : HttpClient, private envService : EnvService) {}

  getRankings(competitionId : number){
    return this.httpClient.get<Response<Rank[]>>(this.envService.apiUrl + "/rankings/" + competitionId , {observe : 'response'})
      .pipe(
        catchError((httpResponse) => {
          let errorMessage : string = httpResponse.error.message + "\n";
          if(httpResponse.error.errors != undefined ) {
            for (let err of httpResponse.error.errors) {
              errorMessage += err.message + "\n";
            }
          }
          alert(errorMessage)
          return new Observable<HttpResponse<Response<Rank[]>>>();
        })
      )
  }
}
