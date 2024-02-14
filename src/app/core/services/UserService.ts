import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {EnvService} from "./EnvService";
import {Response} from "../models/Response";
import {Observable} from "rxjs";
import {Auth} from "../models/IAuth";
import {User} from "../models/IUser";
import {CryptoService} from "./CryptoService";


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly endpointPrefix = '/users';
  constructor(
    private httpClient: HttpClient,
    private envService: EnvService,
    private cryptoService: CryptoService
  ) {}
  profile(): Observable<HttpResponse<Response<User>>> {
    return this.httpClient.get<Response<User>>(this.envService.apiUrl + this.endpointPrefix + '/profile', { observe: 'response' })
  }

  get authorities(): string[] {
    let authorities : string[] = [];
    let user = localStorage.getItem('aftasuser');
    if(user){
      const decryptUser : User = JSON.parse(this.cryptoService.decrypt(user)) as User;
      console.log(decryptUser)
      authorities.push(...decryptUser.rolePermissions!);
      authorities.push(...decryptUser.permissionGroupPermissions!);
    }
    return authorities;
  }

}
