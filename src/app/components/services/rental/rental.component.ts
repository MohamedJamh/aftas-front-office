import {Component, OnInit } from '@angular/core';
import {inject} from "@angular/core/testing";
import {Router} from "@angular/router";
import {RentProgressStateService} from "./rentProgressState.service";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {EnvService} from "../../../core/services/EnvService";
import {Order} from "../../../core/models/IOrder";
import {Response} from "../../../core/models/Response";
@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css']
})
export class RentalComponent implements OnInit {
  requiredSteps: any[] = [
      {
        title: 'Dates checker',
        description: 'Select the dates you want to rent the equipment at',
        completed: false,
        previousLink: null,
        nextLink: 'equipment-selection'
      },
      {
        title: 'Equipment selection',
        description: 'Select the equipment you want to rent',
        completed: false,
        previousLink: '/',
        nextLink: 'rent-validation'
      },
      {
        title: 'Rent Validation',
        description: 'Validate your order and proceed to payment',
        completed: false,
        previousLink: 'rent-validation',
        nextLink: 'equipment-selection'
      }
  ]

  currentStepIndex: number = 0;

  constructor(private router : Router,protected rentProgressState : RentProgressStateService,private httpClient : HttpClient, private envService : EnvService) {}

  ngOnInit(): void {
    if(this.rentProgressState.dateStart == '' || this.rentProgressState.dateEnd == ''){
      this.router.navigate(['/services/rental/']);
      this.currentStepIndex = 0;
    }
  }


  previousStep() {
    this.router.navigate(['/services/rental/' + this.requiredSteps[this.currentStepIndex].previousLink]);
    this.currentStepIndex--;
  }
  nextStep(): void {
    if(this.currentStepIndex == 0 && this.rentProgressState.dateEnd == '' || this.rentProgressState.dateEnd == ''){
      alert('Please select a date range')
      return;
    }else this.rentProgressState.getAvailableEquipments();
    if(this.currentStepIndex == 1 && this.rentProgressState.equipments.length == 0){
      alert('Please select at least one equipment')
      return;
    }
    this.router.navigate(['/services/rental/' + this.requiredSteps[this.currentStepIndex].nextLink]);
    this.currentStepIndex++;
  }

  rentEquipments() {
    this.httpClient.post<Response<Order>>(this.envService.apiUrl + '/orders',
{
        equipments : this.rentProgressState.equipments,
        startDate : this.rentProgressState.dateStart + 'T00:00:00',
        endDate : this.rentProgressState.dateStart + 'T00:00:00',
      },{observe : 'response'})
      .subscribe((response : HttpResponse<Response<Order>>) => {
        if(response.status == 200) {
          alert('Order successfully created')
          this.router.navigate(['/services/rental/']);
        }
      })
  }
}
