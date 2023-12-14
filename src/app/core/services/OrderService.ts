import {EnvService} from "./EnvService";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {catchError, Observable} from "rxjs";
import {Response} from "../models/Response";
import {Order} from "../models/IOrder";
@Injectable({
    providedIn: 'root'
})
export class OrderService{
    constructor(private httpClient : HttpClient, private envService : EnvService) {}

    gelAllOrders(): Observable<HttpResponse<Response<Order[]>>>{
        return this.httpClient.get<Response<Order[]>>(this.envService.apiUrl + "/orders", {observe : 'response'})
            .pipe(
                catchError((httpResponse) => {
                    let errorMessage : string = httpResponse.error.message + "\n";
                    for (let err of httpResponse.error.errors) {
                        errorMessage += err.message + "\n";
                    }
                    alert(errorMessage)
                    return new Observable<HttpResponse<Response<Order[]>>>();
                })
            )
    }
}
