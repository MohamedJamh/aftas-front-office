import {HttpClient, HttpResponse} from "@angular/common/http";
import {EnvService} from "./EnvService";
import {Injectable} from "@angular/core";
import {Response} from "../models/Response";

@Injectable({
  providedIn: 'root'
})
export class HuntingService {
  constructor(private httpClient : HttpClient, private envService : EnvService) {}

  registerHunt(hunt : any){
    return this.httpClient.post<Response<any>>(this.envService.apiUrl + "/hunts/register", hunt, {observe : 'response'})
  }
}
