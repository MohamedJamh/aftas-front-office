import { Component, OnInit } from '@angular/core';
import {RentProgressStateService} from "../rentProgressState.service";

@Component({
  selector: 'app-equipment-selection',
  templateUrl: './equipment-selection.component.html',
  styleUrls: ['./equipment-selection.component.css']
})
export class EquipmentSelectionComponent implements OnInit {


  constructor(protected rentProgressState : RentProgressStateService) { }

  ngOnInit(): void {
  }
}
