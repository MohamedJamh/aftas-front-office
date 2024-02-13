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
  signIn(userCredentials: User): Observable<HttpResponse<Response<Auth>>> {
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

  refreshToken(): Observable<HttpResponse<Response<Auth>>> {
    return this.httpClient.post<Response<Auth>>(this.envService.apiUrl + this.endpointPrefix + '/refresh-token',
{
      refreshToken: localStorage.getItem('aftasreftoken')
    },
{observe: 'response'}
    );
  }

  signOut(): void {
    localStorage.removeItem('aftasacctoken');
    localStorage.removeItem('aftasreftoken');
  }

}
