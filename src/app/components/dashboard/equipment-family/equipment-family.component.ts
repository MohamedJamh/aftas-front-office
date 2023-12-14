import { Component, OnInit } from '@angular/core';
import {HttpResponse} from "@angular/common/http";
import {Response} from "../../../core/models/Response";
import {EquipmentFamilyService} from "../../../core/services/EquipmentFamilyService";
import {EquipmentFamily} from "../../../core/models/EquipmentFamily";
import {Action} from "rxjs/internal/scheduler/Action";


@Component({
  selector: 'app-equipment-family',
  templateUrl: './equipment-family.component.html',
  styleUrls: ['./equipment-family.component.css']
})
export class EquipmentFamilyComponent implements OnInit {
  equipmentFamilies : EquipmentFamily[] = [];
  newEquipmentFamily  : EquipmentFamily = new EquipmentFamily();
  action : string = "Add";

  constructor(private equipmentFamilyService : EquipmentFamilyService) { }

  ngOnInit(): void {
    this.equipmentFamilyService.getAllEquipmentFamilies()
        .subscribe((response : HttpResponse<Response<EquipmentFamily[]>>) => {
          if( [200].includes(response.status) && response.body?.result){
            this.equipmentFamilies = response.body.result;
          }
        })
  }

  addEquipmentFamily() {
    this.equipmentFamilyService.addEquipmentFamily(this.newEquipmentFamily).subscribe((response : HttpResponse<Response<EquipmentFamily>>) => {
      if( [200,201].includes(response.status) && response.body?.result){
        this.equipmentFamilies.push(response.body.result);
        alert(response.body.message)
      }
    });
  }

  trackFamily(index : number, equipmentFamily : EquipmentFamily) {
    return equipmentFamily.id!;
  }

  prepareForAction( action: string, familyName?: string, familyId?: number) {
    if(familyName && familyId){
      this.newEquipmentFamily.name = familyName;
      this.newEquipmentFamily.id = familyId;
    }
    this.action = action;
  }

  updateEquipmentFamily() {
    this.equipmentFamilyService.updateEquipmentFamily(this.newEquipmentFamily).subscribe((response : HttpResponse<Response<EquipmentFamily>>) => {
      if( [200,201].includes(response.status) && response.body?.result){
        for (let family of this.equipmentFamilies) {
          if(family.id === response.body.result.id){
            family.name = response.body.result.name;
          }
        }
        alert(response.body.message)
        console.log(this.equipmentFamilies)
      }
    });
  }
}
