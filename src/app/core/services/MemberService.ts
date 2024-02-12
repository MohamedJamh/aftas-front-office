import {Injectable} from "@angular/core";
import {catchError, Observable} from "rxjs";
import {HttpClient, HttpParams, HttpResponse} from "@angular/common/http";
import {Response} from "../models/Response";
import {Member} from "../models/Member";
import {EnvService} from "./EnvService";
import {MemberPagination} from "../../components/dashboard/members/models/IMemberPagination";


@Injectable({
  providedIn : "root"
})
export class MemberService {

  private baseEndpoint : string = "/members";

  constructor(private httpClient : HttpClient,private envService : EnvService,) {
  }

  getMembers(pageNo? : number) : Observable<HttpResponse<Response<MemberPagination>>> {
    let fetchEndpoint = this.baseEndpoint;
    if(pageNo){
      fetchEndpoint += "?pageNo=" + pageNo
    }
    return this.httpClient.get<Response<MemberPagination>>(this.envService.apiUrl + fetchEndpoint, {observe : 'response'})
  }

    addMember(member : Member): Observable<HttpResponse<Response<Member>>> {
      return this.httpClient.post<Response<Member>>(this.envService.apiUrl + "/members", member, {observe : 'response'})
    }

    searchMember(searchValue: string) {
      let params = new HttpParams()
            .set('value',searchValue)
        return this.httpClient.get<Response<MemberPagination>>(this.envService.apiUrl + "/members/search", {observe : 'response', params : params})
    }
}
