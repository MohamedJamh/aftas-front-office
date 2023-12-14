import {HttpClient, HttpParams, HttpResponse} from "@angular/common/http";
import {EnvService} from "./EnvService";
import {catchError, Observable} from "rxjs";
import {Response} from "../models/Response";
import {EquipmentFamily} from "../models/EquipmentFamily";
import {Injectable} from "@angular/core";
@Injectable({
    providedIn : "root"
})
export class EquipmentFamilyService{

    constructor(private httpClient : HttpClient,private envService : EnvService,) {}

    getAllEquipmentFamilies() : Observable<HttpResponse<Response<EquipmentFamily[]>>> {
        return this.httpClient.get<Response<EquipmentFamily[]>>(this.envService.apiUrl + "/equipment-family", {observe : 'response'})
            .pipe(
                catchError((httpResponse) => {
                    let errorMessage : string = httpResponse.error.message + "\n";
                    for (let err of httpResponse.error.errors) {
                        errorMessage += err.message + "\n";
                    }
                    alert(errorMessage)
                    return new Observable<HttpResponse<Response<EquipmentFamily[]>>>();
                })
            )
    }

    addEquipmentFamily(newFamily : EquipmentFamily): Observable<HttpResponse<Response<EquipmentFamily>>> {
        return this.httpClient.post<Response<EquipmentFamily>>(this.envService.apiUrl + "/equipment-family", newFamily, {observe : 'response'})
            .pipe(
                catchError((httpResponse) => {
                    let errorMessage : string = httpResponse.error.message + "\n";
                    for (let err of httpResponse.error.errors) {
                        errorMessage += err.message + "\n";
                    }
                    alert(errorMessage)
                    return new Observable<HttpResponse<Response<EquipmentFamily>>>();
                })
            )
    }

    updateEquipmentFamily(newEquipmentFamily: EquipmentFamily) {
        return this.httpClient.put<Response<EquipmentFamily>>(this.envService.apiUrl + "/equipment-family/" + newEquipmentFamily.id, newEquipmentFamily, {observe : 'response'})
            .pipe(
                catchError((httpResponse) => {
                    let errorMessage : string = httpResponse.error.message + "\n";
                    for (let err of httpResponse.error.errors) {
                        errorMessage += err.message + "\n";
                    }
                    alert(errorMessage)
                    return new Observable<HttpResponse<Response<EquipmentFamily>>>();
                })
            )
    }
}
