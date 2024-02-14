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
    }

    addFish(fish: Fish): Observable<HttpResponse<Response<Fish>>> {
        return this.httpClient.post<Response<Fish>>(this.envService.apiUrl + "/fishes", fish, {observe : 'response'})
    }
}
