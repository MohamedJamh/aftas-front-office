import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {EnvService} from "./EnvService";
import {Response} from "../models/Response";
import {Observable} from "rxjs";
import {Auth} from "../models/IAuth";
import {User} from "../models/IUser";
import {CryptoService} from "./CryptoService";
import {Router} from "@angular/router";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly endpointPrefix : string = '/auth';
  constructor(
    private httpClient: HttpClient,
    private envService: EnvService,
    private cryptoService: CryptoService,
    private readonly _router: Router,
  ) {}
  signIn(userCredentials: User): Observable<HttpResponse<Response<Auth>>> {
    return this.httpClient.post<Response<Auth>>(this.envService.apiUrl + this.endpointPrefix + '/signin', userCredentials,
      {
        observe: 'response'
      }
    );
  }

  signUp(userCredentials: User): Observable<HttpResponse<Response<Auth>>> {
    return this.httpClient.post<Response<Auth>>(this.envService.apiUrl + this.endpointPrefix + '/signup', userCredentials,
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
    localStorage.removeItem('aftasuser');
    localStorage.removeItem('aftasacctoken');
    localStorage.removeItem('aftasreftoken');
    this._router.navigate(['/auth'])
      .then(() => {
        alert('session Timeout')
      });
  }

  isLogged(): boolean {
    const user = localStorage.getItem('aftasuser');
    if(
      localStorage.getItem('aftasacctoken') &&
      localStorage.getItem('aftasreftoken') &&
      user
    ) {
      try {
        const decryptUser : User = JSON.parse(this.cryptoService.decrypt(user)) as User;
        return true;
      }catch (e) {
        this.signOut();
        return false;
      }
    }
    return false;
  }

}
