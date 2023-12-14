import { Component, OnInit } from '@angular/core';
import {Reservation} from "../../../core/models/IReservation";
import {ReservationService} from "../../../core/services/ReservationService";
import {HttpResponse} from "@angular/common/http";
import {Response} from "../../../core/models/Response";

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css']
})
export class ReservationsComponent implements OnInit {


  reservations : Reservation[] = []

  constructor(private reservationService : ReservationService) {}
  ngOnInit(): void {
    this.reservationService.getAllReservations()
        .subscribe((resposne: HttpResponse<Response<Reservation[]>>)  => {
          if(resposne.status == 200 && resposne.body?.result){
            this.reservations = resposne.body.result
          }
        })
  }

}
