import {Injectable} from "@angular/core";
import {Equipment} from "../../../core/models/IEquipment";
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
  public equipments: Equipment[] = [];

  public availableEquipments: Equipment[] = [];

  constructor(private httpClient : HttpClient, private envService : EnvService) {
  }

  getAvailableEquipments(){
    let params = new HttpParams()
    .set('startDate',this.dateStart + 'T00:00:00')
    .set('endDate',this.dateEnd + 'T00:00:00')
    this.httpClient.get<Response<Equipment[]>>(this.envService.apiUrl + '/equipment/available',{observe : 'body', params : params})
    .subscribe((response : Response<Equipment[]>) => {
      this.availableEquipments = response.result;
    })
  }
}
