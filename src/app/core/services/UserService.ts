import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {EnvService} from "./EnvService";
import {Response} from "../models/Response";
import {Observable} from "rxjs";
import {Auth} from "../models/IAuth";
import {User} from "../models/IUser";


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly endpointPrefix = '/users';
  constructor(private httpClient: HttpClient, private envService: EnvService) {}
  profile(): Observable<HttpResponse<Response<User>>> {
    return this.httpClient.get<Response<User>>(this.envService.apiUrl + this.endpointPrefix + '/profile', { observe: 'response' })
  }

}
