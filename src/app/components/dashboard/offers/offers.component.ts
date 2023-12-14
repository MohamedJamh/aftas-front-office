import { Component, OnInit } from '@angular/core';
import {Offer} from "../../../core/models/IOffer";
import {OfferService} from "../../../core/services/OfferService";
import {Response} from "../../../core/models/Response";
import {HttpResponse} from "@angular/common/http";

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.css']
})
export class OffersComponent implements OnInit {

  offers : Offer[] = [];

  constructor(private offerService : OfferService) { }

  ngOnInit(): void {
    let current : Offer[] = []
    let history : Offer[] = []

    this.offerService.gelAllOffers()
      .subscribe((response : HttpResponse<Response<Offer[]>>) => {
        if( [200].includes(response.status) && response.body?.result){
          current = response.body.result;
          this.offers = current
        }
      })

    this.offerService.getHistoryOffers()
        .subscribe((response : HttpResponse<Response<Offer[]>>) => {
          if( [200].includes(response.status) && response.body?.result){
            history = response.body.result;
            this.offers = this.offers.concat(history)
          }
        })



    this.offers = history.concat(current)
    console.log(this.offers)

  }

  trackOffer(index : number, offer : Offer) {
    return offer.id!;
  }

  submitAnAction(action: string,id: number) {
    this.offerService.submitAction(action,id)
        .subscribe((response : HttpResponse<Response<Offer>>) => {
          if( [200].includes(response.status) && response.body?.result){
            alert(response.body.message)
          }
        })
  }
}
