import { Component, OnInit } from '@angular/core';
import {Order} from "../../../core/models/IOrder";
import {HttpResponse} from "@angular/common/http";
import {Response} from "../../../core/models/Response";
import {Equipment} from "../../../core/models/IEquipment";
import {OrderService} from "../../../core/services/OrderService";
import {EquipmentItem} from "../../../core/models/IEquipmentItem";
import {Offer} from "../../../core/models/IOffer";
import {OfferService} from "../../../core/services/OfferService";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  orders : Order[] = [];
  newOffer : Offer = new Offer();

  constructor(private orderService : OrderService,private offerService : OfferService) { }

  ngOnInit(): void {
    this.orderService.gelAllOrders()
        .subscribe((response : HttpResponse<Response<Order[]>>) => {
            if( [200].includes(response.status) && response.body?.result){
                this.orders = response.body.result;
            }
        })
  }

    trackOrder(index : number, order : Order) {
        return order.id!;
    }
    trackEquipmentItem(index : number, equipmentItem : EquipmentItem) {
        return equipmentItem.id!;
    }

    provideOffer(order: Order) {
      this.newOffer.orderId = order.id;
      this.newOffer.negotiable = true;
      if(order.orderEquipment){
        this.newOffer.orderEquipments = order.orderEquipment;
      }
    }

    createOffer() {
        this.offerService.creatOffer(this.newOffer)
            .subscribe((response : HttpResponse<Response<Offer>>) => {
                if( [200].includes(response.status) && response.body?.result){
                    alert(response.body.message)
                }
            })
    }
}
