import {EnvService} from "./EnvService";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {catchError, Observable} from "rxjs";
import {Response} from "../models/Response";
import {Competition} from "../models/ICompetition";
import {Order} from "../models/IOrder";
@Injectable({
    providedIn: 'root'
})
export class CompetitionService {

  constructor(private httpClient : HttpClient,private envService : EnvService) { }


    getAllCompetitions(): Observable<HttpResponse<Response<Competition[]>>>{
        return this.httpClient.get<Response<Competition[]>>(this.envService.apiUrl + "/competitions", {observe : 'response'})
            .pipe(
                catchError((httpResponse) => {
                    let errorMessage : string = httpResponse.error.message + "\n";
                    for (let err of httpResponse.error.errors) {
                        errorMessage += err.message + "\n";
                    }
                    alert(errorMessage)
                    return new Observable<HttpResponse<Response<Competition[]>>>();
                })
            )
    }
    createCompetition(competition : Competition):Observable<HttpResponse<Response<Competition>>> {
        return this.httpClient.post<Response<Competition>>(this.envService.apiUrl + "/competitions",competition, {observe : 'response'})
            .pipe(
                catchError((httpResponse) => {
                    let errorMessage : string = httpResponse.error.message + "\n";
                    for (let err of httpResponse.error.errors) {
                        errorMessage += err.message + "\n";
                    }
                    alert(errorMessage)
                    return new Observable<HttpResponse<Response<Competition>>>();
                })
            )
    }

  competitionEnroll(competitionIdToEnroll: number, memberId: number): Observable<HttpResponse<Response<null>>> {
    return this.httpClient.get<Response<null>>(this.envService.apiUrl + "/competitions/" + competitionIdToEnroll + "/enroll/" + memberId,  {observe : 'response'})
      .pipe(
        catchError((httpResponse) => {
          let errorMessage : string = httpResponse.error.message + "\n";
          for (let err of httpResponse.error.errors) {
            errorMessage += err.message + "\n";
          }
          alert(errorMessage)
          return new Observable<HttpResponse<Response<null>>>();
        })
      )
  }

  upcomingCompetitions(): Observable<HttpResponse<Response<Competition[]>>> {
    return this.httpClient.get<Response<Competition[]>>(this.envService.apiUrl + "/competitions/upcoming",  {observe : 'response'})
      .pipe(
        catchError((httpResponse) => {
          let errorMessage : string = httpResponse.error.message + "\n";
          for (let err of httpResponse.error.errors) {
            errorMessage += err.message + "\n";
          }
          alert(errorMessage)
          return new Observable<HttpResponse<Response<Competition[]>>>();
        })
      )
  }


  compareCompetitionToCurrentDateTime(currentDate : Date, competitionDate : string , competitionStartTime : string, competitionEndTime : string) : string {
    let starDateTimeToCompare = new Date(competitionDate + " " + competitionStartTime)
    let endDateTimeToCompare = new Date(competitionDate + " " + competitionEndTime)
    if(endDateTimeToCompare < currentDate){
      return "Passed"
    }else if(starDateTimeToCompare <= currentDate &&  currentDate <= endDateTimeToCompare) {
      return "Active"
    }else {
      return "Coming soon"
    }
  }
}
