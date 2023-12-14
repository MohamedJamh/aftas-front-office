import { Component, OnInit } from '@angular/core';
import {EquipmentFamily} from "../../../core/models/EquipmentFamily";
import {EquipmentFamilyService} from "../../../core/services/EquipmentFamilyService";
import {HttpResponse} from "@angular/common/http";
import {Response} from "../../../core/models/Response";
import {Equipment} from "../../../core/models/IEquipment";
import {EquipmentService} from "../../../core/services/EquipmentService";

@Component({
  selector: 'app-equipments',
  templateUrl: './equipments.component.html',
  styleUrls: ['./equipments.component.css']
})
export class EquipmentsComponent implements OnInit {
  equipments : Equipment[] = [];
  equipmentFamilies : EquipmentFamily[] = [];
  equipment  : Equipment = new Equipment();
  action : string = "Add";

  constructor(private equipmentService : EquipmentService,private equipmentFamilyService : EquipmentFamilyService) { }

  ngOnInit(): void {
    this.equipmentService.getAllEquipments()
        .subscribe((response : HttpResponse<Response<Equipment[]>>) => {
          if( [200].includes(response.status) && response.body?.result){
            this.equipments = response.body.result;
          }
        })
    this.equipmentFamilyService.getAllEquipmentFamilies()
        .subscribe((response : HttpResponse<Response<EquipmentFamily[]>>) => {
          if( [200].includes(response.status) && response.body?.result){
            this.equipmentFamilies = response.body.result;
          }
        })
  }


  trackEquipment(index : number, equipment : Equipment) {
    return equipment.id!;
  }

  prepareForAction( action: string, equipmentId?: number, equipmentName?: string, equipmentQuantity?: number, equipmentFamilyId?: number) {
    if(equipmentId && equipmentName && equipmentQuantity && equipmentFamilyId){
      this.equipment.id = equipmentId;
      this.equipment.name = equipmentName;
      this.equipment.quantity = equipmentQuantity;
      this.equipment.equipmentFamily.id = equipmentFamilyId;

      console.log( typeof this.equipment.equipmentFamily.id)
        console.log(this.equipment)
    }
    this.action = action;
  }

  addEquipment() {
      this.equipmentService.addEquipment(this.equipment).subscribe((response : HttpResponse<Response<Equipment>>) => {
          if( [200,201].includes(response.status) && response.body?.result){
              this.equipments.push(response.body.result);
              alert(response.body.message)
          }
      });
  }

  updateEquipment() {
    this.equipmentService.updateEquipment(this.equipment).subscribe((response : HttpResponse<Response<Equipment>>) => {
      if( response.body?.result && [200,201].includes(response.status)){
        for (let eq of this.equipments) {
          if(eq.id === response.body.result.id){
            eq.name = response.body.result.name;
            eq.quantity = response.body.result.quantity;
            eq.equipmentFamily = response.body.result.equipmentFamily as EquipmentFamily
          }
        }
        alert(response.body.message)
        console.log(this.equipmentFamilies)
      }
    });
  }

}
