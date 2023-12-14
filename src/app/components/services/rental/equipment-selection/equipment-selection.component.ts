import { Component, OnInit } from '@angular/core';
import {Equipment} from "../../../../core/models/IEquipment";
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

  reservedQuantityChanged(equipment: Equipment) {
    if(equipment.quantityReserved && equipment.quantityReserved > 0 && ! this.rentProgressState.equipments.includes(equipment)){
      this.rentProgressState.equipments.push(equipment);
    }else if(equipment.quantityReserved == 0){
      this.rentProgressState.equipments.splice(this.rentProgressState.equipments.indexOf(equipment),1);
    }
  }
}
