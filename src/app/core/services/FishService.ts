import {Injectable} from "@angular/core";
import {Response} from "../models/Response";
import {catchError, Observable} from "rxjs";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {EnvService} from "./EnvService";
import {Fish} from "../models/Ifish";

@Injectable({
    providedIn: 'root'
  })
export class FishService {

    constructor(private httpClient : HttpClient,private envService : EnvService,) {}
    getAllFishes(): Observable<HttpResponse<Response<Fish[]>>> {
        return this.httpClient.get<Response<Fish[]>>(this.envService.apiUrl + "/fishes", {observe : 'response'})
            .pipe(
                catchError((httpResponse) => {
                    let errorMessage : string = httpResponse.error.message + "\n";
                    for (let err of httpResponse.error.errors) {
                        errorMessage += err.message + "\n";
                    }
                    alert(errorMessage)
                    return new Observable<HttpResponse<Response<Fish[]>>>();
                })
            )
    }

    addEquipment(fish: Fish): Observable<HttpResponse<Response<Fish>>> {
        return this.httpClient.post<Response<Fish>>(this.envService.apiUrl + "/fishes", fish, {observe : 'response'})
            .pipe(
                catchError((httpResponse) => {
                    let errorMessage : string = httpResponse.error.message + "\n";
                    for (let err of httpResponse.error.errors) {
                        errorMessage += err.message + "\n";
                    }
                    alert(errorMessage)
                    return new Observable<HttpResponse<Response<Fish>>>();
                })
            )

    }
}
