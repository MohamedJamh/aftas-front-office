import {EnvService} from "./EnvService";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {catchError, Observable} from "rxjs";
import {Response} from "../models/Response";
import {Offer} from "../models/IOffer";
import {Order} from "../models/IOrder";
@Injectable({
    providedIn: 'root'
})
export class OfferService{

    constructor(private httpClient : HttpClient,private envService : EnvService) { }


    gelAllOffers(): Observable<HttpResponse<Response<Offer[]>>>{
        return this.httpClient.get<Response<Offer[]>>(this.envService.apiUrl + "/offer", {observe : 'response'})
            .pipe(
                catchError((httpResponse) => {
                    let errorMessage : string = httpResponse.error.message + "\n";
                    for (let err of httpResponse.error.errors) {
                        errorMessage += err.message + "\n";
                    }
                    alert(errorMessage)
                    return new Observable<HttpResponse<Response<Offer[]>>>();
                })
            )
    }

    getHistoryOffers(): Observable<HttpResponse<Response<Offer[]>>>{
        return this.httpClient.get<Response<Offer[]>>(this.envService.apiUrl + "/offer/history", {observe : 'response'})
            .pipe(
                catchError((httpResponse) => {
                    let errorMessage : string = httpResponse.error.message + "\n";
                    for (let err of httpResponse.error.errors) {
                        errorMessage += err.message + "\n";
                    }
                    alert(errorMessage)
                    return new Observable<HttpResponse<Response<Offer[]>>>();
                })
            )
    }

    creatOffer(offer : Offer):Observable<HttpResponse<Response<Offer>>> {
        return this.httpClient.post<Response<Offer>>(this.envService.apiUrl + "/offer",offer, {observe : 'response'})
            .pipe(
                catchError((httpResponse) => {
                    let errorMessage : string = httpResponse.error.message + "\n";
                    for (let err of httpResponse.error.errors) {
                        errorMessage += err.message + "\n";
                    }
                    alert(errorMessage)
                    return new Observable<HttpResponse<Response<Offer>>>();
                })
            )
    }

    submitAction(action: string,id:number):Observable<HttpResponse<Response<Offer>>> {
        return this.httpClient.get<Response<Offer>>(this.envService.apiUrl + `/offer/${id}/${action}/`, {observe : 'response'})
            .pipe(
                catchError((httpResponse) => {
                    let errorMessage : string = httpResponse.error.message + "\n";
                    for (let err of httpResponse.error.errors) {
                        errorMessage += err.message + "\n";
                    }
                    alert(errorMessage)
                    return new Observable<HttpResponse<Response<Offer>>>();
                })
            )

    }
}
