import {EnvService} from "./EnvService";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {catchError, Observable} from "rxjs";
import {Response} from "../models/Response";
import {Order} from "../models/IOrder";
import {Reservation} from "../models/IReservation";
import {Injectable} from "@angular/core";
@Injectable({
    providedIn: 'root'
})
export class ReservationService{
    constructor(private httpClient : HttpClient,private envService : EnvService) { }

    getAllReservations(): Observable<HttpResponse<Response<Reservation[]>>>{
        return this.httpClient.get<Response<Reservation[]>>(this.envService.apiUrl + "/reservation", {observe : 'response'})
            .pipe(
                catchError((httpResponse) => {
                    let errorMessage : string = httpResponse.error.message + "\n";
                    for (let err of httpResponse.error.errors) {
                        errorMessage += err.message + "\n";
                    }
                    alert(errorMessage)
                    return new Observable<HttpResponse<Response<Reservation[]>>>();
                })
            )
    }

}
