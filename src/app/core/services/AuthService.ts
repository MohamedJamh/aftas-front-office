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
export class AuthService {

  private readonly endpointPrefix = '/auth';
  constructor(private httpClient: HttpClient, private envService: EnvService) {}

  Signup(newUser: User): Observable<HttpResponse<Response<Auth>>> {
    console.log("new user added")
    console.log(newUser)
    return this.httpClient.post<HttpResponse<Response<Auth>>>(this.envService.apiUrl + this.endpointPrefix + '/signup', newUser, {observe: 'body'});
  }

  signin(userCredentials: User): Observable<HttpResponse<Response<Auth>>> {
    return this.httpClient.post<Response<Auth>>(this.envService.apiUrl + this.endpointPrefix + '/signin',
      {
        email: userCredentials.email,
        password: userCredentials.password
      },
      {
        observe: 'response'
      }
    );
  }

}
