import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders, HttpParams, HttpResponse} from "@angular/common/http";
import {EnvService} from "./EnvService";
import {Response} from "../models/Response";
import {Observable} from "rxjs";
import {User} from "../models/IUser";
import {CryptoService} from "./CryptoService";
import {AuthService} from "./AuthService";
import {Router} from "@angular/router";
import {UserPagination} from "../../components/dashboard/members/models/IUserPagination";


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly endpointPrefix: string = '/users';
  constructor(
    private httpClient: HttpClient,
    private envService: EnvService,
    private cryptoService: CryptoService,
    private authService: AuthService,
    private readonly _router: Router,
  ) {}

  getUsers(disabled? : boolean,pageNo? : number, ) : Observable<HttpResponse<Response<UserPagination>>> {
    let fetchEndpoint = this.endpointPrefix;
    if(disabled) fetchEndpoint += "/disabled";
    if(pageNo) fetchEndpoint += "?pageNo=" + pageNo;
    return this.httpClient.get<Response<UserPagination>>(this.envService.apiUrl + fetchEndpoint,
      {observe : 'response'}
    )
  }

  addUsers(user : User): Observable<HttpResponse<Response<User>>> {
    return this.httpClient.post<Response<User>>(this.envService.apiUrl + this.endpointPrefix, user, {observe : 'response'})
  }

  searchUsers(searchValue: string) {
    let params = new HttpParams()
      .set('value',searchValue)
    return this.httpClient.get<Response<UserPagination>>(this.envService.apiUrl + this.endpointPrefix + "/search", {observe : 'response', params : params})
  }
  profile(): Observable<HttpResponse<Response<User>>> {
    return this.httpClient.get<Response<User>>(this.envService.apiUrl + this.endpointPrefix + '/profile', { observe: 'response' })
  }

  enableUser(userNum: number): Observable<HttpResponse<Response<User>>> {
    const fetchEndpoint = this.endpointPrefix + '/' + userNum + '/enable';
    return this.httpClient.post<Response<User>>(this.envService.apiUrl + fetchEndpoint, {}, { observe: 'response' })
  }

  get authorities(): string[] {
    let authorities : string[] = [];
    let user = localStorage.getItem('aftasuser');
    if(user){
      const decryptUser : User = JSON.parse(this.cryptoService.decrypt(user)) as User;
      authorities.push(...decryptUser.rolePermissions!);
      authorities.push(...decryptUser.permissionGroupPermissions!);
    }
    return authorities;
  }

  canPerform(actions:string[]): boolean {
    const allActions = actions.concat(this.envService.superAdminPermissions)
    return this.authorities.filter(authorities => allActions.includes(authorities)).length > 0;
  }

}
