import {Injectable} from "@angular/core";
import {Response} from "../models/Response";
import {catchError, Observable} from "rxjs";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Equipment} from "../models/IEquipment";
import {EnvService} from "./EnvService";

@Injectable({
    providedIn: 'root'
  })
export class EquipmentService{

    constructor(private httpClient : HttpClient,private envService : EnvService,) {}
    getAllEquipments(): Observable<HttpResponse<Response<Equipment[]>>> {
        return this.httpClient.get<Response<Equipment[]>>(this.envService.apiUrl + "/equipment", {observe : 'response'})
            .pipe(
                catchError((httpResponse) => {
                    let errorMessage : string = httpResponse.error.message + "\n";
                    for (let err of httpResponse.error.errors) {
                        errorMessage += err.message + "\n";
                    }
                    alert(errorMessage)
                    return new Observable<HttpResponse<Response<Equipment[]>>>();
                })
            )
    }

    addEquipment(equipment: Equipment): Observable<HttpResponse<Response<Equipment>>> {
        return this.httpClient.post<Response<Equipment>>(this.envService.apiUrl + "/equipment", equipment, {observe : 'response'})
            .pipe(
                catchError((httpResponse) => {
                    let errorMessage : string = httpResponse.error.message + "\n";
                    for (let err of httpResponse.error.errors) {
                        errorMessage += err.message + "\n";
                    }
                    alert(errorMessage)
                    return new Observable<HttpResponse<Response<Equipment>>>();
                })
            )

    }

    updateEquipment(equipment: Equipment): Observable<HttpResponse<Response<Equipment>>> {
        return this.httpClient.put<Response<Equipment>>(this.envService.apiUrl + "/equipment/" + equipment.id,equipment,{observe : 'response'})
            .pipe(
                catchError((httpResponse) => {
                    let errorMessage : string = httpResponse.error.message + "\n";
                    for (let err of httpResponse.error.errors) {
                        errorMessage += err.message + "\n";
                    }
                    alert(errorMessage)
                    return new Observable<HttpResponse<Response<Equipment>>>();
                })
            )
    }
}
