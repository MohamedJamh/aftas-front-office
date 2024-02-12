import {HttpClient, HttpParams, HttpResponse} from "@angular/common/http";
import {EnvService} from "./EnvService";
import {catchError, Observable} from "rxjs";
import {Response} from "../models/Response";
import {Level} from "../models/ILevel";
import {Injectable} from "@angular/core";
@Injectable({
    providedIn : "root"
})
export class LevelService {

    constructor(private httpClient : HttpClient,private envService : EnvService,) {}

    getAllLevels() : Observable<HttpResponse<Response<Level[]>>> {
        return this.httpClient.get<Response<Level[]>>(this.envService.apiUrl + "/levels", {observe : 'response'})
    }

    addLevel(newLevel : Level): Observable<HttpResponse<Response<Level>>> {
        return this.httpClient.post<Response<Level>>(this.envService.apiUrl + "/levels", newLevel, {observe : 'response'})
    }
}
