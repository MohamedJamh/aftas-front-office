import {Injectable} from "@angular/core";
import {Fish} from "../../../core/models/Ifish";
import {BehaviorSubject} from "rxjs";
import {HttpClient, HttpParams, HttpResponse} from "@angular/common/http";
import {Response} from "../../../core/models/Response";
import {EnvService} from "../../../core/services/EnvService";

@Injectable({
  providedIn: 'root'
})
export class RentProgressStateService {
  public dateStart: string = '';
  public dateEnd: string = '';
  public equipments: Fish[] = [];

  public availableEquipments: Fish[] = [];

  constructor(private httpClient : HttpClient, private envService : EnvService) {
  }

  getAvailableEquipments(){
    let params = new HttpParams()
    .set('startDate',this.dateStart + 'T00:00:00')
    .set('endDate',this.dateEnd + 'T00:00:00')
    this.httpClient.get<Response<Fish[]>>(this.envService.apiUrl + '/equipment/available',{observe : 'body', params : params})
    .subscribe((response : Response<Fish[]>) => {
      this.availableEquipments = response.result;
    })
  }
}
