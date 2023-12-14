import { Component, OnInit } from '@angular/core';
import {RentProgressStateService} from "../rentProgressState.service";

@Component({
  selector: 'app-rent-validation',
  templateUrl: './rent-validation.component.html',
  styleUrls: ['./rent-validation.component.css']
})
export class RentValidationComponent implements OnInit {

  constructor(protected rentProgressState : RentProgressStateService) { }

  ngOnInit(): void {
  }

}
